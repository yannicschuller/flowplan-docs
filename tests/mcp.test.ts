// The docs' MCP server (lib/mcp.ts) and the "Ask AI" links (lib/ask-ai.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter, CORS_HEADERS, handleMessage, mcpNotAllowed, mcpOptions, mcpPost, MCP_LIMITS, MCP_PROTOCOL_VERSIONS, parsePageRef } from "../lib/mcp";
import { isMcpRequest } from "../lib/mcp-request";
import { askLinks, askPrompt } from "../lib/ask-ai";
import { docMarkdown, docSearchIndex, docSlugs, llmsIndex } from "../lib/docs";
import { searchDocs } from "../lib/search";

const URL_ = "https://docs.example/mcp";
let n = 0;
const post = (body: unknown, headers: Record<string, string> = {}, limiter = createRateLimiter(1000)) =>
  mcpPost(
    new Request(URL_, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", "X-Forwarded-For": "203.0.113.7", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
    limiter,
  );
const rpc = async (method: string, params?: unknown, headers?: Record<string, string>) => {
  const res = await post({ jsonrpc: "2.0", id: ++n, method, ...(params === undefined ? {} : { params }) }, headers);
  return { res, body: (await res.json()) as { id: unknown; result?: any; error?: { code: number; message: string } } };
};
const call = async (name: string, args?: unknown) => (await rpc("tools/call", { name, ...(args === undefined ? {} : { arguments: args }) })).body;
const textOf = (result: any) => result.content.map((c: { text: string }) => c.text).join("");

test("initialize negotiates the protocol version and names the server", async () => {
  const { res, body } = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type")!, /application\/json/);
  assert.equal(body.result.protocolVersion, "2025-06-18");
  assert.equal(body.result.serverInfo.name, "flowplan-docs");
  assert.deepEqual(body.result.capabilities, { tools: { listChanged: false } });
  assert.match(body.result.instructions, /search_docs/);
  // An unknown version gets the newest one.
  const other = await rpc("initialize", { protocolVersion: "1999-01-01" });
  assert.equal(other.body.result.protocolVersion, MCP_PROTOCOL_VERSIONS[0]);
  for (const v of MCP_PROTOCOL_VERSIONS) assert.equal((await rpc("initialize", { protocolVersion: v })).body.result.protocolVersion, v);
  // The version is required.
  assert.equal((await rpc("initialize", {})).body.error!.code, -32602);
});

test("notifications and client responses get 202 without a body; ping answers", async () => {
  const res = await post({ jsonrpc: "2.0", method: "notifications/initialized" });
  assert.equal(res.status, 202);
  assert.equal(await res.text(), "");
  assert.equal((await post({ jsonrpc: "2.0", id: 5, result: {} })).status, 202);
  const ping = await rpc("ping");
  assert.deepEqual(ping.body.result, {});
});

test("tools/list has the three read-only tools with schemas and descriptions", async () => {
  const { body } = await rpc("tools/list");
  const tools = body.result.tools as { name: string; description: string; inputSchema: { type: string }; annotations: { readOnlyHint: boolean } }[];
  assert.deepEqual(tools.map((t) => t.name), ["search_docs", "get_page", "list_pages"]);
  for (const t of tools) {
    assert.equal(t.inputSchema.type, "object");
    assert.ok(t.description.length > 80, t.name);
    assert.equal(t.annotations.readOnlyHint, true);
    assert.ok(!("run" in t));
  }
  assert.match(tools[0].description, /self-host/);
});

test("search_docs ranks like the site search and links with anchors", async () => {
  const result = (await call("search_docs", { query: "oidc", language: "en", limit: 5 })).result;
  assert.ok(!result.isError);
  const hits = result.structuredContent.results as { title: string; url: string; slug: string; heading?: string; snippet?: string }[];
  assert.ok(hits.length > 0 && hits.length <= 5);
  const site = searchDocs(docSearchIndex("en"), "oidc", "", 5).results;
  assert.deepEqual(hits.map((h) => h.slug), site.map((h) => h.slug));
  assert.ok(hits.every((h) => h.url.startsWith("https://docs.flowplan.org/en/")));
  assert.ok(hits.some((h) => h.url.includes("#") && h.heading));
  assert.deepEqual(JSON.parse(textOf(result)), result.structuredContent);
  // German, default limit, and the default language English.
  const de = (await call("search_docs", { query: "Anmeldung", language: "de" })).result.structuredContent;
  assert.ok(de.results.length > 0 && de.results.length <= MCP_LIMITS.defaultResults);
  assert.ok(de.results.every((h: { url: string }) => h.url.includes("/de/")));
  assert.equal((await call("search_docs", { query: "backup" })).result.structuredContent.language, "en");
  // The limit is capped.
  assert.ok((await call("search_docs", { query: "a", limit: 500 })).result.structuredContent.results.length <= MCP_LIMITS.results);
  // Nothing found: suggestions and a hint.
  const none = (await call("search_docs", { query: "kanbna" })).result.structuredContent;
  assert.equal(none.results.length, 0);
  assert.ok(none.hint);
  assert.ok(none.suggestions.includes("kanban"));
});

test("get_page returns the Markdown of /markdown/[slug] with the canonical URL, by slug or URL", async () => {
  const bySlug = (await call("get_page", { slug: "installation" })).result;
  assert.ok(!bySlug.isError);
  const text = textOf(bySlug);
  assert.match(text, /^URL: https:\/\/docs\.flowplan\.org\/en\/installation\n/);
  assert.ok(text.includes(docMarkdown("installation", "en").trim()));
  const byUrl = textOf((await call("get_page", { url: "https://docs.flowplan.org/de/installation.md#docker" })).result);
  assert.match(byUrl, /^URL: https:\/\/docs\.flowplan\.org\/de\/installation#docker\n/);
  assert.ok(byUrl.includes(docMarkdown("installation", "de").trim()));
  // "language" wins over the address.
  assert.match(textOf((await call("get_page", { url: "/de/installation", language: "en" })).result), /Language: en/);
  // Unknown pages: a tool error with close slugs.
  const missing = (await call("get_page", { slug: "instalation" })).result;
  assert.equal(missing.isError, true);
  assert.match(textOf(missing), /installation/);
  assert.equal((await call("get_page", { url: "https://evil.example/en/installation" })).result.isError, true);
});

test("page references parse from slugs and docs URLs", () => {
  assert.deepEqual(parsePageRef("first-steps"), { slug: "first-steps", locale: undefined, anchor: undefined });
  assert.deepEqual(parsePageRef("/en/first-steps.md"), { slug: "first-steps", locale: "en", anchor: undefined });
  assert.deepEqual(parsePageRef("https://docs.flowplan.org/de/views#kanban"), { slug: "views", locale: "de", anchor: "kanban" });
  assert.equal(parsePageRef("/markdown/views")!.slug, "views");
  assert.equal(parsePageRef("../../etc/passwd"), null);
  assert.equal(parsePageRef("https://example.com/en/views"), null);
});

test("list_pages lists every page with title, description and section", async () => {
  for (const language of ["en", "de"]) {
    const result = (await call("list_pages", { language })).result.structuredContent;
    assert.equal(result.count, docSlugs.length);
    assert.deepEqual(result.pages.map((p: { slug: string }) => p.slug), docSlugs);
    for (const p of result.pages) {
      assert.ok(p.title && p.description && p.section.includes("›"), p.slug);
      assert.equal(p.url, `https://docs.flowplan.org/${language}/${p.slug}`);
    }
  }
});

test("wrong arguments are tool errors; unknown tools and methods are protocol errors", async () => {
  for (const [name, args] of [
    ["search_docs", {}],
    ["search_docs", { query: "" }],
    ["search_docs", { query: 5 }],
    ["search_docs", { query: "x".repeat(MCP_LIMITS.query + 1) }],
    ["search_docs", { query: "backup", language: "fr" }],
    ["search_docs", { query: "backup", limit: 0 }],
    ["search_docs", { query: "backup", limit: 2.5 }],
    ["get_page", {}],
    ["get_page", { slug: "x".repeat(MCP_LIMITS.ref + 1) }],
    ["list_pages", { language: "xx" }],
  ] as const) {
    const result = (await call(name, args)).result;
    assert.equal(result.isError, true, `${name} ${JSON.stringify(args)}`);
    assert.match(textOf(result), /Invalid arguments|Give/);
  }
  assert.equal((await call("delete_everything", {})).error!.code, -32602);
  assert.equal((await rpc("tools/call", {})).body.error!.code, -32602);
  assert.equal((await call("search_docs", "query")).error!.code, -32602);
  assert.equal((await rpc("tools/list", [1, 2])).body.error!.code, -32602);
  const unknown = await rpc("resources/list");
  assert.equal(unknown.res.status, 200);
  assert.equal(unknown.body.error!.code, -32601);
});

test("invalid JSON-RPC, batches, wrong content types and large bodies are refused", async () => {
  const parse = await post("{not json");
  assert.equal(parse.status, 400);
  assert.equal(((await parse.json()) as any).error.code, -32700);
  const invalid = await post({ id: 1, method: "ping" });
  assert.equal(invalid.status, 400);
  assert.equal(((await invalid.json()) as any).error.code, -32600);
  assert.equal(((await (await post({ jsonrpc: "2.0", id: {}, method: "ping" })).json()) as any).error.code, -32600);
  const batch = await post([{ jsonrpc: "2.0", id: 1, method: "ping" }]);
  assert.equal(batch.status, 400);
  assert.equal((await post("x", { "Content-Type": "text/plain" })).status, 415);
  const big = await post({ jsonrpc: "2.0", id: 1, method: "ping", params: { pad: "x".repeat(MCP_LIMITS.body) } });
  assert.equal(big.status, 413);
  // An unsupported protocol version header after initialize.
  const header = await rpc("ping", undefined, { "MCP-Protocol-Version": "1999-01-01" });
  assert.equal(header.res.status, 400);
  assert.equal((await rpc("ping", undefined, { "MCP-Protocol-Version": "2025-06-18" })).res.status, 200);
  // handleMessage on its own.
  assert.equal(handleMessage(null)!.error && (handleMessage(null)!.error as { code: number }).code, -32600);
  assert.equal(handleMessage({ jsonrpc: "2.0", method: "anything" }), null);
});

test("every answer allows any origin; OPTIONS, GET and DELETE answer as they should", async () => {
  const res = (await rpc("ping")).res;
  for (const [name, value] of Object.entries(CORS_HEADERS)) assert.equal(res.headers.get(name), value);
  assert.equal(res.headers.get("access-control-allow-origin"), "*");
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.equal(res.headers.get("set-cookie"), null);
  // A browser client: its Origin is fine.
  assert.equal((await post({ jsonrpc: "2.0", id: 1, method: "ping" }, { Origin: "https://inspector.example" })).status, 200);
  const options = mcpOptions();
  assert.equal(options.status, 204);
  assert.equal(options.headers.get("access-control-allow-origin"), "*");
  assert.match(options.headers.get("access-control-allow-headers")!, /Mcp-Protocol-Version/);
  const get = mcpNotAllowed();
  assert.equal(get.status, 405);
  assert.match(get.headers.get("allow")!, /POST/);
  assert.equal(get.headers.get("access-control-allow-origin"), "*");
});

test("the rate limit counts per client under a daily keyed hash, never the address", async () => {
  const limiter = createRateLimiter(3, 60_000);
  const at = Date.UTC(2026, 10, 13, 12);
  assert.equal(limiter.hit("203.0.113.7", at), 0);
  assert.equal(limiter.hit("203.0.113.7", at + 1), 0);
  assert.equal(limiter.hit("203.0.113.7", at + 2), 0);
  assert.ok(limiter.hit("203.0.113.7", at + 3) > 0);
  assert.equal(limiter.hit("198.51.100.1", at + 4), 0, "another client");
  assert.equal(limiter.hit("203.0.113.7", at + 60_000), 0, "a new minute");
  assert.ok(limiter.keys().every((k) => !k.includes("203") && !k.includes("198") && k.length === 22));
  // The next day everything is forgotten.
  limiter.hit("203.0.113.7", at + 86_400_000);
  assert.equal(limiter.size(), 1);
  // Over HTTP: 429 with Retry-After, as a JSON-RPC error.
  const tight = createRateLimiter(1);
  assert.equal((await post({ jsonrpc: "2.0", id: 1, method: "ping" }, {}, tight)).status, 200);
  const limited = await post({ jsonrpc: "2.0", id: 2, method: "ping" }, {}, tight);
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("retry-after")) >= 1);
  assert.equal(((await limited.json()) as any).error.code, -32000);
  assert.equal(limited.headers.get("access-control-allow-origin"), "*");
  assert.equal((await post({ jsonrpc: "2.0", id: 3, method: "ping" }, { "X-Forwarded-For": "198.51.100.1" }, tight)).status, 200);
});

test("/mcp goes to the server for MCP clients and stays the page for browsers", () => {
  assert.ok(isMcpRequest("POST", "application/json, text/event-stream"));
  assert.ok(isMcpRequest("OPTIONS", null));
  assert.ok(isMcpRequest("DELETE", null));
  assert.ok(isMcpRequest("GET", "text/event-stream"));
  assert.ok(!isMcpRequest("GET", "text/html,application/xhtml+xml,*/*;q=0.8"));
  assert.ok(!isMcpRequest("GET", null));
  assert.ok(!isMcpRequest("HEAD", "*/*"));
});

test("llms.txt names the MCP server", () => {
  for (const locale of ["en", "de"] as const) assert.ok(llmsIndex("https://docs.example", locale).includes("https://docs.example/mcp"), locale);
});

test("Ask Claude and Ask ChatGPT carry a prompt in the page's language", () => {
  const page = {
    title: "Installation",
    markdownUrl: "https://docs.flowplan.org/de/installation.md",
    llmsUrl: "https://docs.flowplan.org/de/llms.txt",
    mcpUrl: "https://docs.flowplan.org/mcp",
  };
  const de = askPrompt("de", page);
  assert.match(de, /Lies die Seite „Installation“/);
  assert.ok(de.includes(page.markdownUrl) && de.includes(page.mcpUrl) && de.includes(page.llmsUrl));
  const en = askPrompt("en", { ...page, markdownUrl: "https://docs.flowplan.org/en/installation.md", llmsUrl: "https://docs.flowplan.org/llms.txt" });
  assert.match(en, /^Read the page “Installation”/);
  const links = askLinks("en", { ...page, title: "A & B?#" });
  assert.ok(links.claude.startsWith("https://claude.ai/new?q="));
  assert.ok(links.chatgpt.startsWith("https://chatgpt.com/?q="));
  const q = new URL(links.claude).searchParams.get("q")!;
  assert.equal(q, askPrompt("en", { ...page, title: "A & B?#" }));
  assert.equal(new URL(links.chatgpt).searchParams.get("q"), q);
  assert.ok(!links.claude.includes(" ") && !links.claude.includes("#"));
});
