// "What's new": the releases from the app's CHANGELOG.md (copied into
// content/changelog.md before every build by scripts/app-files.mjs, with the
// committed copy as fallback). The changelog is written in English and
// generated from the commits; entries that only concern the project itself
// (CI, tests, README, release workflow) are left out here.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";

export const CHANGELOG_URL = "https://github.com/yannicschuller/flowplan/blob/main/CHANGELOG.md";
const RELEASES_URL = "https://github.com/yannicschuller/flowplan/releases/tag/";

export type ChangeEntry = { html: string; text: string; commit?: { hash: string; url: string } };
export type Release = { version: string; date: string; id: string; url: string; entries: ChangeEntry[]; hidden: number };

// Project housekeeping rather than changes to Flowplan.
const INTERNAL = /^(CI|Browser tests?|Tests?|Release workflow|README( media)?|Contributing guide|Review fixes?|Error translations)\b/i;

const inline = new Marked({ gfm: true });
const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

export function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  let current: Release | undefined;
  for (const line of markdown.split("\n")) {
    const head = line.match(/^## (v\d+\.\d+\.\d+\S*)\s*[–-]\s*(\d{4}-\d{2}-\d{2})/);
    if (head) {
      current = { version: head[1], date: head[2], id: head[1].replace(/\./g, "-"), url: RELEASES_URL + head[1], entries: [], hidden: 0 };
      releases.push(current);
      continue;
    }
    const item = line.match(/^[-*] (.+)$/);
    if (!item || !current) continue;
    let text = item[1].trim();
    // The commit link at the end: ([7af5d69](https://github.com/…/commit/…)).
    let commit: ChangeEntry["commit"];
    const link = text.match(/\s*\(\[([0-9a-f]{7,40})\]\((https:\/\/github\.com\/[^)\s]+)\)\)\s*$/);
    if (link) {
      commit = { hash: link[1], url: link[2] };
      text = text.slice(0, link.index).trim();
    }
    if (INTERNAL.test(text)) {
      current.hidden++;
      continue;
    }
    // Markdown, but no raw HTML from outside this repository.
    const html = inline.parseInline(text.replace(/</g, "&lt;"), { async: false }) as string;
    current.entries.push({ html, text: plain(html), commit });
  }
  return releases;
}

let cached: Release[] | undefined;
export function releases(): Release[] {
  if (!cached) {
    let markdown = "";
    try {
      markdown = readFileSync(join(process.cwd(), "content", "changelog.md"), "utf8");
    } catch {}
    cached = parseChangelog(markdown);
  }
  return cached;
}
