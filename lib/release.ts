// Version markers: the docs go live on every push, before the release, so a
// section about a feature that is only in the :beta image says so.
//
//   ## Tabs {since=0.9.6}                       a heading
//   … a new sentence. {since=0.9.6} More text.  right after what is new in
//   - **Copy** … {since=0.9.6}                  a paragraph, list item or
//   | Read journal day | … {since=0.9.6} |       table cell
//
// A version after the latest release renders as "Neu in 0.9.6 · im
// :beta-Image" / "New in 0.9.6 · in the :beta image"; once that version is
// released, as a muted "Seit 0.9.6" / "Since 0.9.6". The Markdown for tools
// (/slug.md, llms-full.txt, the MCP server) gets the same words in brackets.
//
// The latest release is content/release.json, which scripts/app-files.mjs
// writes from GitHub before every build (the committed copy is the
// fallback); FLOWPLAN_RELEASE (e.g. "0.9.6") overrides it, read whenever a
// page is rendered.
import data from "../content/release.json" with { type: "json" };
import type { Locale } from "./i18n";

export const RELEASE: Readonly<{ version: string; tag: string; published: string | null }> = data;
const VERSION = /^\d+\.\d+\.\d+$/;

export function latestRelease(env: string | undefined = process.env.FLOWPLAN_RELEASE) {
  const own = env?.trim().replace(/^v/, "");
  return own && VERSION.test(own) ? own : RELEASE.version;
}

// -1, 0 or 1, part by part ("0.10.0" comes after "0.9.6").
export function compareVersions(a: string, b: string) {
  const x = a.split(".").map(Number);
  const y = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] < y[i] ? -1 : 1;
  return 0;
}
export const isUnreleased = (version: string, latest = latestRelease()) => compareVersions(version, latest) > 0;

// The marker in the Markdown; the whole of it, so "{since=0.9}" stays text
// (and the tests notice it).
export const SINCE_MARK = /\{since=(\d+\.\d+\.\d+)\}/g;
export const SINCE_START = "{since=";

const words: Record<Locale, { beta: [string, string]; since: string }> = {
  de: { beta: ["Neu in", "im :beta-Image"], since: "Seit" },
  en: { beta: ["New in", "in the :beta image"], since: "Since" },
};

// The badge. The dot between the two parts is for the eye; screen readers
// hear a comma.
export function sinceHtml(version: string, locale: Locale, latest = latestRelease()) {
  const w = words[locale];
  if (!isUnreleased(version, latest)) return `<span class="since" data-state="released">${w.since} ${version}</span>`;
  return `<span class="since" data-state="beta">${w.beta[0]} ${version}<span aria-hidden="true"> · </span><span class="sr-only">, </span>${w.beta[1]}</span>`;
}
// The badge's words in brackets, for the Markdown that tools read.
export function sinceWords(version: string, locale: Locale, latest = latestRelease()) {
  const w = words[locale];
  if (!isUnreleased(version, latest)) return `(${w.since.toLowerCase()} ${version})`;
  return `(${w.beta[0].toLowerCase()} ${version}, ${w.beta[1]})`;
}
export const sinceText = (markdown: string, locale: Locale, latest = latestRelease()) =>
  markdown.replace(SINCE_MARK, (_, version: string) => sinceWords(version, locale, latest));

// Without markers: rendered badges (heading ids, the table of contents, the
// search index) and markers in Markdown (headings read elsewhere).
export const SINCE_HTML = /\s*<span class="since" data-state="[a-z]+">(?:[^<]|<span [^>]*>[^<]*<\/span>)*<\/span>/g;
export const stripSinceHtml = (html: string) => html.replace(SINCE_HTML, "");
export const stripSince = (markdown: string) => markdown.replace(/[ \t]*\{since=[^}\n]*\}/g, "");
