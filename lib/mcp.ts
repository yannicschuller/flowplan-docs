// The documentation as a remote MCP server (Model Context Protocol) at
// https://docs.flowplan.org/mcp: AI assistants search and read the pages
// themselves. Public, read-only, no account and no cookies.
//
// Transport: Streamable HTTP without sessions and without a server-sent
// event stream. Every JSON-RPC request comes as a POST and its answer as
// JSON in the response; notifications get 202 without a body; GET (the
// optional event stream) and DELETE (ending a session) get 405. proxy.ts
// sends POST, OPTIONS and event-stream GETs on /mcp here (app/api/mcp);
// browsers opening /mcp still get the page about Flowplan's own MCP.
//
// Privacy: queries are answered and forgotten – nothing is logged or
// stored. The rate limit counts per client under a keyed hash of the IP
// address whose key is random per process and changes every day; the
// address itself is never kept.
import { createHmac, randomBytes } from "node:crypto";
import { docAreas, docMarkdown, docSearchIndex, docSlugs, docTitle, type DocSearchPage } from "./docs";
import { isLocale, type Locale } from "./i18n";
import { docsUrl } from "./links";
import { editDistance, searchDocs, suggest } from "./search";

// Newest first; an unknown version asked for gets the newest.
export const MCP_PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
export const MCP_LIMITS = {
  body: 64 * 1024,
  response: 400_000,
  page: 150_000,
  query: 200,
  ref: 300,
  results: 20,
  defaultResults: 8,
  perMinute: 60,
};

export const CORS_HEADERS: Record<string, string> = {
  // Public and read-only, without cookies or sign-in: any site may call it.
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};
const BASE_HEADERS = { ...CORS_HEADERS, "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

export { mcpUrl } from "./mcp-request";

// ---- Rate limit ----

// Requests per client and minute, in memory only. The key is an HMAC of the
// address with a random per-process secret and the day, so the counters say
// nothing about anyone and are useless the next day; they are dropped then.
export function createRateLimiter(max = MCP_LIMITS.perMinute, windowMs = 60_000) {
  const secret = randomBytes(32);
  let day = -1;
  const hits = new Map<string, { start: number; count: number }>();
  const keyOf = (ip: string, at: number) => createHmac("sha256", secret).update(`${Math.floor(at / 86_400_000)}:${ip}`).digest("base64url").slice(0, 22);
  return {
    // Seconds to wait, or 0 when the request may go ahead.
    hit(ip: string, at = Date.now()): number {
      const today = Math.floor(at / 86_400_000);
      if (today !== day) {
        hits.clear();
        day = today;
      }
      const key = keyOf(ip, at);
      const entry = hits.get(key);
      if (!entry || at - entry.start >= windowMs) {
        if (hits.size >= 50_000) for (const [k, e] of hits) if (at - e.start >= windowMs) hits.delete(k);
        hits.set(key, { start: at, count: 1 });
        return 0;
      }
      if (entry.count >= max) return Math.max(1, Math.ceil((entry.start + windowMs - at) / 1000));
      entry.count++;
      return 0;
    },
    size: () => hits.size,
    keys: () => [...hits.keys()],
  };
}
const limiter = createRateLimiter();

// The client's address as the reverse proxy (Coolify's Traefik) passes it on.
export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

// ---- Data ----

const indexes = new Map<Locale, DocSearchPage[]>();
function index(locale: Locale) {
  let pages = indexes.get(locale);
  if (!pages) {
    pages = docSearchIndex(locale);
    indexes.set(locale, pages);
  }
  return pages;
}
const pageUrl = (locale: Locale, slug: string) => `${docsUrl()}/${locale}/${slug}`;
const markdownUrl = (locale: Locale, slug: string) => `${docsUrl()}/${locale}/${slug}.md`;

// "first-steps", "/en/first-steps", "https://docs.flowplan.org/de/first-steps.md#x",
// "/markdown/first-steps" → slug, language in the address, anchor.
export function parsePageRef(ref: string): { slug: string; locale?: Locale; anchor?: string } | null {
  let path = ref.trim();
  if (/^https?:\/\//i.test(path)) {
    let url: URL;
    try {
      url = new URL(path);
    } catch {
      return null;
    }
    const own = new URL(docsUrl()).hostname;
    if (url.hostname !== own && !/(^|\.)flowplan\.org$/.test(url.hostname)) return null;
    path = url.pathname + url.hash;
  }
  const [rest, hash] = path.split("#");
  const m = rest.match(/^\/?(?:(de|en)\/)?(?:docs\/|markdown\/)?([a-z0-9-]+?)(?:\.md)?\/?$/i);
  if (!m) return null;
  return { slug: m[2].toLowerCase(), locale: m[1] ? (m[1].toLowerCase() as Locale) : undefined, anchor: hash || undefined };
}

// ---- Tools ----

type Args = Record<string, unknown>;
type ToolResult = { content: { type: "text"; text: string }[]; structuredContent?: Record<string, unknown>; isError?: boolean };
class ArgError extends Error {}

const LANGUAGE_SCHEMA = {
  type: "string",
  enum: ["en", "de"],
  default: "en",
  description: "Language of the pages: \"en\" (English, default) or \"de\" (German). Use \"de\" when the user writes German.",
};
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

function language(args: Args): Locale {
  const value = args.language;
  if (value === undefined || value === null || value === "") return "en";
  if (typeof value === "string" && isLocale(value.toLowerCase())) return value.toLowerCase() as Locale;
  throw new ArgError('"language" must be "en" or "de".');
}
function text(args: Args, name: string, max: number, required: boolean) {
  const value = args[name];
  if (value === undefined || value === null) {
    if (required) throw new ArgError(`"${name}" is required.`);
    return undefined;
  }
  if (typeof value !== "string") throw new ArgError(`"${name}" must be a string.`);
  if (value.length > max) throw new ArgError(`"${name}" may be at most ${max} characters long.`);
  return value;
}
const json = (value: Record<string, unknown>): ToolResult => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }], structuredContent: value });

function searchTool(args: Args): ToolResult {
  const query = text(args, "query", MCP_LIMITS.query, true)!.trim();
  if (!query) throw new ArgError('"query" must not be empty.');
  const locale = language(args);
  let limit = MCP_LIMITS.defaultResults;
  if (args.limit !== undefined && args.limit !== null) {
    if (typeof args.limit !== "number" || !Number.isInteger(args.limit) || args.limit < 1) throw new ArgError('"limit" must be a whole number from 1 to 20.');
    limit = Math.min(args.limit, MCP_LIMITS.results);
  }
  const pages = index(locale);
  // The same search and ranking as the search box on the site.
  const { results } = searchDocs(pages, query, "", limit);
  const hits = results.map((hit) => ({
    title: hit.page,
    ...(hit.section ? { heading: hit.parent ? `${hit.parent} › ${hit.section}` : hit.section } : {}),
    url: `${docsUrl()}/${locale}${hit.href}`,
    slug: hit.slug,
    group: hit.group,
    ...(hit.snippet ? { snippet: hit.snippet } : {}),
  }));
  return json({
    query,
    language: locale,
    results: hits,
    ...(hits.length ? {} : { suggestions: suggest(pages, query), hint: "No page matches every word. Try fewer or other words, the other language, or list_pages." }),
  });
}

function getPageTool(args: Args): ToolResult {
  const ref = text(args, "slug", MCP_LIMITS.ref, false) ?? text(args, "url", MCP_LIMITS.ref, false);
  if (!ref?.trim()) throw new ArgError('Give "slug" (e.g. "first-steps") or "url" (e.g. "https://docs.flowplan.org/en/first-steps").');
  const parsed = parsePageRef(ref);
  const asked = args.language === undefined || args.language === null || args.language === "" ? undefined : language(args);
  if (!parsed || !docSlugs.includes(parsed.slug)) {
    const wanted = parsed?.slug ?? ref.trim().toLowerCase();
    const close = docSlugs
      .map((slug) => ({ slug, d: editDistance(wanted, slug, 3) }))
      .filter((x) => x.d <= 3)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .map((x) => x.slug);
    return {
      isError: true,
      content: [{ type: "text", text: `No documentation page "${ref.trim()}".${close.length ? ` Did you mean: ${close.join(", ")}?` : ""} Use list_pages or search_docs to find the slug.` }],
    };
  }
  const locale = asked ?? parsed.locale ?? "en";
  let markdown = docMarkdown(parsed.slug, locale).trim();
  const truncated = markdown.length > MCP_LIMITS.page;
  if (truncated) markdown = `${markdown.slice(0, MCP_LIMITS.page)}\n\n[… truncated – the full page is at ${markdownUrl(locale, parsed.slug)}]`;
  const header = [
    `URL: ${pageUrl(locale, parsed.slug)}${parsed.anchor ? `#${parsed.anchor}` : ""}`,
    `Markdown: ${markdownUrl(locale, parsed.slug)}`,
    `Language: ${locale}`,
    `Other language: ${pageUrl(locale === "en" ? "de" : "en", parsed.slug)}`,
  ];
  return { content: [{ type: "text", text: `${header.join("\n")}\n\n---\n\n${markdown}\n` }] };
}

function listPagesTool(args: Args): ToolResult {
  const locale = language(args);
  const summaries = new Map(index(locale).map((p) => [p.slug, p.summary]));
  const pages = docAreas(locale).flatMap((area) =>
    area.groups.flatMap((group) =>
      group.pages.map((page) => ({
        slug: page.slug,
        title: docTitle(page.slug, locale),
        description: summaries.get(page.slug) ?? "",
        section: `${area.title} › ${group.title}`,
        url: pageUrl(locale, page.slug),
      })),
    ),
  );
  return json({ language: locale, count: pages.length, pages });
}

const TOOLS = [
  {
    name: "search_docs",
    title: "Search the Flowplan docs",
    description:
      "Full-text search of the official Flowplan documentation. Flowplan is an open-source, self-hostable workspace app (documents, databases, whiteboards, journal, workflows, optional AI). " +
      "The docs cover using Flowplan, self-hosting it (Docker, reverse proxy, backups, PostgreSQL), configuration (environment variables), the API, webhooks and integrations. " +
      "Use this first for any question about Flowplan; it returns ranked pages and sections with URL (with anchor) and a snippet. Then call get_page for the full text before answering. " +
      "Words are matched as typed, plus synonyms in both languages (e.g. login/Anmeldung); use short keyword queries.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", minLength: 1, maxLength: MCP_LIMITS.query, description: "Keywords, e.g. \"oidc sign-in\", \"backup s3\", \"kanban view\"." },
        language: LANGUAGE_SCHEMA,
        limit: { type: "integer", minimum: 1, maximum: MCP_LIMITS.results, default: MCP_LIMITS.defaultResults, description: "Maximum number of results (1–20)." },
      },
      required: ["query"],
      additionalProperties: false,
    },
    annotations: { ...annotations, title: "Search the Flowplan docs" },
    run: searchTool,
  },
  {
    name: "get_page",
    title: "Read a Flowplan docs page",
    description:
      "Returns one page of the Flowplan documentation as Markdown, with its canonical URL. Pass the slug (from search_docs or list_pages, e.g. \"installation\") or any docs URL " +
      "(https://docs.flowplan.org/en/installation, …/de/installation.md, with or without #anchor). The language comes from \"language\", else from the URL, else English.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", maxLength: MCP_LIMITS.ref, description: "Page slug, e.g. \"first-steps\"." },
        url: { type: "string", maxLength: MCP_LIMITS.ref, description: "A docs URL instead of the slug." },
        language: { ...LANGUAGE_SCHEMA, default: undefined, description: "\"en\" or \"de\"; overrides the language of the URL. Default English." },
      },
      additionalProperties: false,
    },
    annotations: { ...annotations, title: "Read a Flowplan docs page" },
    run: getPageTool,
  },
  {
    name: "list_pages",
    title: "List all Flowplan docs pages",
    description:
      "Lists every page of the Flowplan documentation with slug, title, one-line description, section (area › group) and URL – the table of contents. " +
      "Use it to get an overview or to find a page when search_docs finds nothing.",
    inputSchema: { type: "object", properties: { language: LANGUAGE_SCHEMA }, additionalProperties: false },
    annotations: { ...annotations, title: "List all Flowplan docs pages" },
    run: listPagesTool,
  },
];
export const MCP_TOOL_NAMES = TOOLS.map((t) => t.name);

const INSTRUCTIONS =
  "The official documentation of Flowplan (https://flowplan.org), an open-source workspace app for documents, databases, whiteboards and a daily journal that people use at app.flowplan.org or host themselves. " +
  "Use search_docs to find the relevant pages, then get_page to read them before answering; link the page URLs you used. list_pages shows the whole table of contents. " +
  "Every page exists in English (language \"en\", default) and German (\"de\"). Read-only and public; queries are not stored.";

// ---- JSON-RPC ----

class RpcError extends Error {
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
  }
}
type Message = { jsonrpc?: unknown; id?: unknown; method?: unknown; params?: unknown };
const validId = (id: unknown) => typeof id === "string" || (typeof id === "number" && Number.isFinite(id));

function dispatch(method: string, params: Args) {
  switch (method) {
    case "initialize": {
      if (typeof params.protocolVersion !== "string") throw new RpcError(-32602, "initialize needs params.protocolVersion.");
      const asked = params.protocolVersion;
      return {
        protocolVersion: MCP_PROTOCOL_VERSIONS.includes(asked) ? asked : MCP_PROTOCOL_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "flowplan-docs", title: "Flowplan documentation", version: "1.0.0", websiteUrl: docsUrl() },
        instructions: INSTRUCTIONS,
      };
    }
    case "ping":
      return {};
    case "tools/list":
      return { tools: TOOLS.map(({ run: _run, ...tool }) => tool) };
    case "tools/call": {
      if (typeof params.name !== "string") throw new RpcError(-32602, "tools/call needs params.name.");
      const tool = TOOLS.find((t) => t.name === params.name);
      if (!tool) throw new RpcError(-32602, `Unknown tool: ${params.name.slice(0, 80)}`);
      const args = params.arguments ?? {};
      if (typeof args !== "object" || Array.isArray(args)) throw new RpcError(-32602, "params.arguments must be an object.");
      try {
        return tool.run(args as Args);
      } catch (e) {
        // Wrong arguments are a tool error the model can read and correct.
        if (e instanceof ArgError) return { isError: true, content: [{ type: "text", text: `Invalid arguments: ${e.message}` }] } satisfies ToolResult;
        throw e;
      }
    }
    default:
      throw new RpcError(-32601, `Method not found: ${method.slice(0, 80)}`);
  }
}

// One parsed JSON-RPC message; null when it needs no answer (notification,
// or a response from the client).
export function handleMessage(input: unknown): Record<string, unknown> | null {
  const msg = (input && typeof input === "object" && !Array.isArray(input) ? input : null) as Message | null;
  const id = msg && validId(msg.id) ? msg.id : null;
  const error = (code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });
  if (!msg || msg.jsonrpc !== "2.0") return error(-32600, "Invalid request: expected a JSON-RPC 2.0 message.");
  if (msg.method === undefined && ("result" in msg || "error" in msg)) return null;
  if (typeof msg.method !== "string") return error(-32600, "Invalid request: method missing.");
  if (msg.id === undefined) return null;
  if (!validId(msg.id)) return error(-32600, "Invalid request: id must be a string or a number.");
  if (msg.params !== undefined && (typeof msg.params !== "object" || msg.params === null || Array.isArray(msg.params)))
    return error(-32602, "params must be an object.");
  try {
    return { jsonrpc: "2.0", id, result: dispatch(msg.method, (msg.params ?? {}) as Args) };
  } catch (e) {
    if (e instanceof RpcError) return error(e.code, e.message);
    return error(-32603, "Internal error.");
  }
}

// ---- HTTP ----

const reply = (status: number, body?: unknown, headers: Record<string, string> = {}) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { ...BASE_HEADERS, ...(body === undefined ? {} : { "Content-Type": "application/json; charset=utf-8" }), ...headers },
  });
const rpcError = (status: number, code: number, message: string, headers?: Record<string, string>) =>
  reply(status, { jsonrpc: "2.0", id: null, error: { code, message } }, headers);

async function readBody(request: Request): Promise<string | null> {
  if (Number(request.headers.get("content-length") || 0) > MCP_LIMITS.body) return null;
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MCP_LIMITS.body) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function mcpPost(request: Request, limit = limiter): Promise<Response> {
  const wait = limit.hit(clientIp(request));
  if (wait) return rpcError(429, -32000, "Too many requests. Please wait a moment.", { "Retry-After": String(wait) });
  const type = request.headers.get("content-type");
  if (type && !/json/i.test(type)) return rpcError(415, -32700, "Send the JSON-RPC message as application/json.");
  const header = request.headers.get("mcp-protocol-version");
  const body = await readBody(request);
  if (body === null) return rpcError(413, -32600, `Request too large (at most ${MCP_LIMITS.body} bytes).`);
  let input: unknown;
  try {
    input = JSON.parse(body);
  } catch {
    return rpcError(400, -32700, "Parse error.");
  }
  // Batches were removed from the protocol in 2025-06-18.
  if (Array.isArray(input)) return rpcError(400, -32600, "Batch requests are not supported.");
  const isInitialize = !!input && typeof input === "object" && (input as Message).method === "initialize";
  if (header && !isInitialize && !MCP_PROTOCOL_VERSIONS.includes(header))
    return rpcError(400, -32600, `Unsupported MCP-Protocol-Version ${header.slice(0, 40)}; supported: ${MCP_PROTOCOL_VERSIONS.join(", ")}.`);
  const answer = handleMessage(input);
  if (!answer) return reply(202);
  const error = answer.error as { code: number } | undefined;
  const status = error && (error.code === -32600 || error.code === -32700) ? 400 : 200;
  const text = JSON.stringify(answer);
  if (text.length > MCP_LIMITS.response)
    return reply(200, { jsonrpc: "2.0", id: answer.id, error: { code: -32603, message: "The answer is too large; ask for fewer results." } });
  return new Response(text, { status, headers: { ...BASE_HEADERS, "Content-Type": "application/json; charset=utf-8" } });
}

// No event stream and no sessions: every answer comes with its POST.
export const mcpNotAllowed = () => reply(405, { jsonrpc: "2.0", id: null, error: { code: -32000, message: "Method not allowed: send JSON-RPC messages as POST." } }, { Allow: "POST, OPTIONS" });
export const mcpOptions = () => new Response(null, { status: 204, headers: { ...BASE_HEADERS, Allow: "POST, GET, OPTIONS" } });
