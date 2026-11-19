// „Frag Flo“ / "Ask Flo": the docs assistant. The answers come from the
// separate service flowplan-ask (ASK_URL, default https://ask.flowplan.org),
// which retrieves these docs itself and asks Claude; this site only shows
// the button, the panel and the answers. What is shared with the service's
// contract lives here, free of React and the DOM, so tests/flo.test.ts can
// check it: the address, the status, the answers and errors, the bounded
// conversation and which links an answer may contain.
import { DISCORD_URL } from "./links";
import type { Locale } from "./i18n";

// ------------------------------------------------------------ address
export const ASK_DEFAULT = "https://ask.flowplan.org";
// ASK_URL changes the service's address (https, or http on localhost for
// tests); empty, "off" or "false" turns Flo off – no button, no request.
// Read by the server when it renders a page, so it also works on a running
// container (a NEXT_PUBLIC_ variable would be frozen into the image).
export function askUrl(env: Record<string, string | undefined> = process.env): string | null {
  const value = env.ASK_URL;
  if (value === undefined) return ASK_DEFAULT;
  const trimmed = value.trim();
  if (!trimmed || /^(off|false|0|no)$/i.test(trimmed)) return null;
  try {
    const url = new URL(trimmed);
    const local = url.hostname === "127.0.0.1" || url.hostname === "localhost";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) return null;
    return url.origin + url.pathname.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

// ------------------------------------------------------------ limits
// The service's defaults (admin can change them); a response that names
// another maximum replaces them for the tab.
export const DEFAULT_MAX_QUESTION = 500;
// History entries sent along (a question or an answer each).
export const MAX_TURNS = 6;
export const MAX_CONVERSATION_CHARS = 4000;
// Exchanges kept in the tab for showing (the request sends fewer, above).
export const MAX_KEPT = 12;
// The service's session token lives 2 hours; renew a little earlier.
export const SESSION_MS = 110 * 60 * 1000;
// The status check is in its own small module: the button loads with every
// page, the rest of this file only with the panel.
export { STATUS_MS, statusAllowsDocs } from "./flo-status";

// ------------------------------------------------------------ answers
export type FloSource = { title: string; url: string };
export type FloAnswer = { answer: string; sources: FloSource[] };

// POST /api/ask → { answer, sources, usage }. Sources keep only allowed
// links (below) with a title; at most 8, no duplicates.
export function parseAnswer(data: unknown): FloAnswer | null {
  if (!data || typeof data !== "object") return null;
  const { answer, sources } = data as { answer?: unknown; sources?: unknown };
  if (typeof answer !== "string" || !answer.trim()) return null;
  const seen = new Set<string>();
  const list: FloSource[] = [];
  for (const item of Array.isArray(sources) ? sources : []) {
    if (!item || typeof item !== "object") continue;
    const { title, url } = item as { title?: unknown; url?: unknown };
    const href = typeof url === "string" ? allowedLink(url) : null;
    if (!href || seen.has(href)) continue;
    seen.add(href);
    list.push({ title: typeof title === "string" && title.trim() ? title.trim().slice(0, 140) : href, url: href });
    if (list.length >= 8) break;
  }
  return { answer: answer.slice(0, 20000), sources: list };
}

// What a failed request means for the reader. 429 { error: "limit", scope,
// retryAt }, 503 { error: "off" }; 401 an expired or unknown session
// (invalid_session: solve a new challenge once); 400 too_long with the
// maximum (`max`); anything else (403 cross_origin, 502 upstream, …) is an
// error to try again later.
export type FloProblem =
  | { kind: "limit"; scope: "subject" | "global"; retryAt: Date | null }
  | { kind: "off" }
  | { kind: "budget" }
  | { kind: "session" }
  | { kind: "too-long"; max: number | null }
  | { kind: "error"; status: number };

export function describeProblem(status: number, data: unknown): FloProblem {
  const body = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  if (status === 429 || body.error === "limit") {
    if (body.scope === "budget") return { kind: "budget" };
    const at = typeof body.retryAt === "string" ? new Date(body.retryAt) : null;
    const retryAt = at && Number.isFinite(at.getTime()) ? at : null;
    return { kind: "limit", scope: body.scope === "global" ? "global" : "subject", retryAt };
  }
  if (status === 503 || body.error === "off") return { kind: "off" };
  if (status === 401 || body.error === "invalid_session") return { kind: "session" };
  if (body.error === "too_long") {
    return { kind: "too-long", max: maxQuestionFrom(body) };
  }
  if (status === 400) {
    const max = maxQuestionFrom(body);
    if (max) return { kind: "too-long", max };
  }
  return { kind: "error", status };
}

// The longest question the service takes, when a response names it.
export function maxQuestionFrom(body: Record<string, unknown>): number | null {
  for (const key of ["maxQuestionChars", "max", "limit"]) {
    const value = body[key];
    if (typeof value === "number" && Number.isInteger(value) && value >= 20 && value <= 10000) return value;
  }
  return null;
}

// "14:30" today, otherwise "Fr., 14:30" / "Fri 2:30 PM"; in the reader's
// time zone.
export function retryText(at: Date, locale: Locale, now = new Date(), timeZone?: string): string {
  const tag = locale === "de" ? "de-DE" : "en-GB";
  const time = new Intl.DateTimeFormat(tag, { hour: "2-digit", minute: "2-digit", timeZone }).format(at);
  const day = (d: Date) => new Intl.DateTimeFormat("en-CA", { dateStyle: "short", timeZone }).format(d);
  if (day(at) === day(now)) return time;
  const days = (at.getTime() - now.getTime()) / 86400000;
  const date = new Intl.DateTimeFormat(tag, days < 6 ? { weekday: "short", timeZone } : { day: "numeric", month: "short", timeZone }).format(at);
  return `${date}, ${time}`;
}

// ------------------------------------------------------------ conversation
export type FloTurn = { question: string; answer: string; sources: FloSource[] };
export type FloHistoryItem = { role: "user" | "assistant"; text: string };

// The history sent with a follow-up, bounded like the service bounds it
// (flowplan-ask: maxTurns, maxConversationChars): the newest MAX_TURNS
// entries – each question and each answer counts as one – then the oldest
// dropped until all fit into MAX_CONVERSATION_CHARS characters.
export function historyFor(turns: FloTurn[], maxEntries = MAX_TURNS, maxChars = MAX_CONVERSATION_CHARS): FloHistoryItem[] {
  const entries = turns
    .flatMap((turn): FloHistoryItem[] => [
      { role: "user", text: turn.question },
      { role: "assistant", text: turn.answer },
    ])
    .slice(-maxEntries);
  let used = entries.reduce((n, e) => n + e.text.length, 0);
  while (entries.length && used > maxChars) used -= entries.shift()!.text.length;
  return entries;
}

// The conversation as stored in sessionStorage – checked when read back,
// since anything can be in there.
export function parseTurns(raw: string | null): FloTurn[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data
      .filter((t): t is FloTurn => !!t && typeof t.question === "string" && typeof t.answer === "string")
      .map((t) => ({ question: t.question, answer: t.answer, sources: parseAnswer({ answer: "x", sources: t.sources })?.sources ?? [] }))
      .slice(-MAX_KEPT);
  } catch {
    return [];
  }
}

// ------------------------------------------------------------ links
// An answer may link only to these docs, the website, Flowplan's GitHub
// repositories and the Discord invite; everything else stays plain text.
// Relative links (/installation) mean these docs.
const DOCS_HOST = "docs.flowplan.org";
export function allowedLink(href: string): string | null {
  const value = href.trim();
  // Backslashes and protocol-relative addresses (//host) could leave the
  // site once a docs link becomes a local path (docsPath).
  if (value.includes("\\") || value.startsWith("//")) return null;
  let url: URL;
  try {
    url = new URL(value.startsWith("/") ? `https://${DOCS_HOST}${value}` : value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  if (url.pathname.includes("//") || /%2f|%5c/i.test(url.pathname)) return null;
  const host = url.hostname.toLowerCase();
  const ok =
    host === DOCS_HOST ||
    host === "flowplan.org" ||
    host === "www.flowplan.org" ||
    (host === "github.com" && /^\/yannicschuller\/flowplan[a-z0-9-]*(\/|$)/i.test(url.pathname)) ||
    url.href.replace(/\/$/, "") === DISCORD_URL;
  return ok ? url.href : null;
}

// A docs link opens on this site, in the same tab and the reader's language
// prefix: https://docs.flowplan.org/en/installation#x → /en/installation#x
// (or /installation#x under the adaptive addresses).
export function docsPath(href: string, prefix: string): string | null {
  const url = new URL(href);
  if (url.hostname !== DOCS_HOST || url.pathname.includes("//")) return null;
  const fixed = url.pathname.match(/^\/(de|en)(\/.*)?$/);
  const rest = fixed ? fixed[2] || "/" : url.pathname;
  const lang = fixed ? `/${fixed[1]}` : prefix;
  const path = `${lang}${rest === "/" && lang ? "" : rest}${url.search}${url.hash}` || "/";
  // Exactly one slash first – never a protocol-relative //host.
  return /^\/(?![/\\])/.test(path) ? path : null;
}
