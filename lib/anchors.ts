// Old addresses with an anchor, from before the long pages were split
// (content/anchor-map.json, written by scripts/split/split-docs.ts): per old
// page the headings that moved to another page or got another id –
// [German id, English id, new page, new German id, new English id]. An
// empty new id means the heading became the new page's title.
//
// The Flowplan app, GitHub replies and help texts link to addresses such as
// /en/documents#formatting-text. The old page still exists (it keeps the
// topic's start), so the server answers it; a small script on the page
// (components/docs/anchor-redirect.tsx) then sends the reader on – the
// anchor never reaches the server.
import type { Locale } from "./i18n";

export type AnchorRow = [de: string, en: string, slug: string, deId: string, enId: string];
export type AnchorMap = Record<string, AnchorRow[]>;

// Where an anchor of an old page leads now: "page#id", "page" for a heading
// that became a page, or null when it is not in the map. An anchor in the
// other language (a German link opened in English) is found too and leads
// to the heading in the reader's language.
export function resolveAnchor(rows: AnchorRow[] | undefined, hash: string, locale: Locale): { slug: string; id: string } | null {
  if (!rows || !hash) return null;
  const own = locale === "en" ? 1 : 0;
  const row = rows.find((r) => r[own] === hash) ?? rows.find((r) => r[1 - own] === hash);
  if (!row) return null;
  return { slug: row[2], id: locale === "en" ? row[4] : row[3] };
}
