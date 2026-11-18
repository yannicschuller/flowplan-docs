// Searches without results (#366): which terms readers looked for and did
// not find, so the pages can learn the words people use. Only the
// normalised term (lib/track.ts searchTerm: trimmed, lowercase, at most 50
// characters, nothing that looks personal), its language and a counter –
// no address, no cookie, no time, nothing per person.
//
//   POST   /api/search-misses   { term, lang }   counted when the docs' own
//                                                search finds nothing for it
//   GET    /api/search-misses   Authorization: Bearer $SEARCH_MISSES_TOKEN
//   DELETE /api/search-misses   the same; starts the count afresh
//
// Off unless SEARCH_MISSES_TOKEN is set (at least 16 characters): without it
// nobody could read the counts, so none are kept. The counts live in memory
// and are gone with every new container (every push to main); with
// SEARCH_MISSES_FILE pointing into a mounted volume they are written there
// once a minute and when the server stops, and read back on start.
//
// Abuse is bounded: at most MAX_TERMS distinct terms (later new ones are
// only counted as "dropped"), a capped counter per term, a small body and
// 20 requests a minute per client – counted in memory under a daily-keyed
// HMAC of the address (lib/mcp.ts), which is never stored.
import { createHash, timingSafeEqual } from "node:crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { docSearchIndex, type DocSearchPage } from "./docs";
import { isLocale, LOCALES, type Locale } from "./i18n";
import { clientIp, createRateLimiter } from "./mcp";
import { searchDocs } from "./search";
import { REDACTED, searchTerm } from "./track";

export const MISS_LIMITS = { terms: 500, termLength: 50, input: 200, body: 1024, count: 1_000_000, perMinute: 20 };

export type MissStore = {
  since: string;
  dropped: number;
  terms: Map<string, number>; // "en\u0000kanban swimlane" → 3
};
const key = (lang: Locale, term: string) => `${lang}\u0000${term}`;

export function emptyStore(now = new Date()): MissStore {
  return { since: now.toISOString().slice(0, 10), dropped: 0, terms: new Map() };
}

// The term as it is counted, or null when it is not worth counting.
export function missTerm(input: unknown): string | null {
  if (typeof input !== "string" || input.length > MISS_LIMITS.input) return null;
  const term = searchTerm(input);
  if (!term || term === REDACTED) return null;
  return term.slice(0, MISS_LIMITS.termLength);
}

export function countMiss(store: MissStore, lang: Locale, term: string): boolean {
  const k = key(lang, term);
  const count = store.terms.get(k);
  if (count === undefined) {
    if (store.terms.size >= MISS_LIMITS.terms) {
      store.dropped = Math.min(store.dropped + 1, MISS_LIMITS.count);
      return false;
    }
    store.terms.set(k, 1);
  } else store.terms.set(k, Math.min(count + 1, MISS_LIMITS.count));
  return true;
}

// For review: most frequent first, then alphabetical.
export function missReport(store: MissStore) {
  const terms = [...store.terms]
    .map(([k, count]) => {
      const [lang, term] = k.split("\u0000");
      return { term, lang, count };
    })
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term));
  return { since: store.since, distinct: terms.length, limit: MISS_LIMITS.terms, dropped: store.dropped, terms };
}

// The file: { since, dropped, terms: [{ term, lang, count }] }. Anything
// unreadable starts empty; entries are checked like new ones.
export function parseStore(text: string): MissStore {
  const store = emptyStore();
  try {
    const data = JSON.parse(text) as { since?: unknown; dropped?: unknown; terms?: unknown };
    if (typeof data.since === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data.since)) store.since = data.since;
    if (Number.isInteger(data.dropped) && (data.dropped as number) >= 0) store.dropped = Math.min(data.dropped as number, MISS_LIMITS.count);
    for (const entry of Array.isArray(data.terms) ? data.terms : []) {
      const term = missTerm(entry?.term);
      const count = entry?.count;
      if (!term || !isLocale(entry?.lang) || !Number.isInteger(count) || count < 1 || store.terms.size >= MISS_LIMITS.terms) continue;
      store.terms.set(key(entry.lang, term), Math.min(count, MISS_LIMITS.count));
    }
  } catch {}
  return store;
}
export const storeText = (store: MissStore) => {
  const { since, dropped, terms } = missReport(store);
  return JSON.stringify({ since, dropped, terms }) + "\n";
};

// ---- The server's copy ----

export const missesToken = (env = process.env.SEARCH_MISSES_TOKEN) => {
  const token = env?.trim() || "";
  return token.length >= 16 ? token : "";
};
export const missesEnabled = () => !!missesToken();

let store: MissStore | undefined;
let dirty = false;
function file() {
  return process.env.SEARCH_MISSES_FILE?.trim() || "";
}
function save() {
  const path = file();
  if (!path || !dirty || !store) return;
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(`${path}.tmp`, storeText(store));
    renameSync(`${path}.tmp`, path);
    dirty = false;
  } catch (error) {
    console.warn(`search misses: cannot write ${path}: ${(error as Error).message}`);
  }
}
function current(): MissStore {
  if (!store) {
    const path = file();
    store = emptyStore();
    if (path) {
      try {
        store = parseStore(readFileSync(path, "utf8"));
      } catch {}
      setInterval(save, 60_000).unref();
      process.once("exit", save);
    }
  }
  return store;
}

const indexes = new Map<Locale, DocSearchPage[]>();
function findsNothing(lang: Locale, term: string) {
  let pages = indexes.get(lang);
  if (!pages) {
    pages = docSearchIndex(lang);
    indexes.set(lang, pages);
  }
  return searchDocs(pages, term, "", 1).results.length === 0;
}

const HEADERS = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
const empty = (status: number) => new Response(null, { status, headers: HEADERS });
const limiter = createRateLimiter(MISS_LIMITS.perMinute);

// POST: always 204 (or 429/413), so the browser learns nothing either way.
// Tests pass their own limiter and store.
export async function missPost(request: Request, limit = limiter, target?: MissStore): Promise<Response> {
  if (!missesEnabled() && !target) return empty(204);
  if (limit.hit(clientIp(request))) return empty(429);
  const text = await request.text().catch(() => "");
  if (text.length > MISS_LIMITS.body) return empty(413);
  let data: { term?: unknown; lang?: unknown } = {};
  try {
    data = JSON.parse(text);
  } catch {}
  const term = missTerm(data?.term);
  if (term && isLocale(data?.lang) && findsNothing(data.lang, term) && countMiss(target ?? current(), data.lang, term) && !target) dirty = true;
  return empty(204);
}

function authorised(request: Request) {
  const token = missesToken();
  const given = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() || "";
  if (!token || !given) return false;
  const digest = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(digest(token), digest(given));
}
export function missGet(request: Request): Response {
  if (!missesEnabled()) return empty(404);
  if (!authorised(request)) return new Response("Unauthorized\n", { status: 401, headers: { ...HEADERS, "WWW-Authenticate": "Bearer" } });
  return Response.json({ ...missReport(current()), languages: LOCALES }, { headers: HEADERS });
}
export function missDelete(request: Request): Response {
  if (!missesEnabled()) return empty(404);
  if (!authorised(request)) return new Response("Unauthorized\n", { status: 401, headers: { ...HEADERS, "WWW-Authenticate": "Bearer" } });
  store = emptyStore();
  dirty = true;
  save();
  return empty(204);
}
