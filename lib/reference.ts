// The reference pages: tables written from content/reference.json (read
// from the app's code by scripts/reference-data.mjs) and from the docs'
// own tables. In Markdown a page writes {{reference:slash}} for every entry
// of the "/" menu or {{reference:env}} for every environment variable; the
// placeholder becomes Markdown tables, so the page, its Markdown address,
// llms-full.txt and the search all have the same rows.
import { Marked } from "marked";
import data from "../content/reference.json" with { type: "json" };
import type { Locale } from "./i18n";

type Pair = [string, string];
export type SlashEntry = { id: string; group: string; name: Pair; keywords: string[]; description: Pair; note?: Pair; children?: Omit<SlashEntry, "group">[] };
export type Reference = {
  source: string;
  slash: { groups: Record<string, Pair>; commands: SlashEntry[] };
  shortcuts: { global: { id: string; name: Pair; combos: string[] }[]; editor: { combo: string; id: string; name: Pair }[] };
  workflow: { categories: string[]; nodes: { type: string; category: string; name: Pair; description: Pair }[] };
  env: string[];
};
export const REFERENCE = data as unknown as Reference;

const pick = (locale: Locale, [de, en]: Pair) => (locale === "en" ? en : de);
// A table cell: no line breaks, "|" escaped.
const cell = (text: string) => text.replace(/\s+/g, " ").replace(/\|/g, "\\|").trim();
const code = (text: string) => (text.includes("`") ? `\`\` ${text} \`\`` : `\`${text}\``);

// ------------------------------------------------------------ "/" menu
export function slashMarkdown(locale: Locale, ref: Reference = REFERENCE) {
  const de = locale === "de";
  const head = de ? "| Block | Eintippen | Was er macht |\n| --- | --- | --- |" : "| Block | Type | What it does |\n| --- | --- | --- |";
  const typed = (e: { keywords: string[] }) =>
    // Words first (/todo before /[]), at most four.
    [...e.keywords.filter((k) => !/\s/.test(k))]
      .sort((a, b) => Number(!/[a-z]/i.test(a)) - Number(!/[a-z]/i.test(b)))
      .slice(0, 4)
      .map((k) => code(`/${k}`))
      .join(", ");
  const row = (e: Omit<SlashEntry, "group">, prefix = "") =>
    `| ${cell(prefix + pick(locale, e.name))} | ${cell(typed(e)) || "–"} | ${cell(pick(locale, e.description))}${e.note ? ` *(${cell(pick(locale, e.note))})*` : ""} |`;
  const sections: string[] = [];
  for (const [group, title] of Object.entries(ref.slash.groups)) {
    const entries = ref.slash.commands.filter((c) => c.group === group);
    if (!entries.length) continue;
    const rows = entries.flatMap((e) => [row(e), ...(e.children ?? []).map((c) => row(c, `${pick(locale, e.name)}: `))]);
    sections.push(`## ${pick(locale, title)}\n\n${head}\n${rows.join("\n")}`);
  }
  return sections.join("\n\n");
}

// ------------------------------------------------- environment variables
export type PageText = { slug: string; title: string; body: string };
export type EnvRow = { name: string; slug: string; section: string; heading: string; fallback?: string; meaning: string };

const ENV_NAME = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;
// Splits a table line into cells (backslash-escaped "|" stays in its cell).
const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim());
// The sentences of a text. Dots in code, links and abbreviations ("z. B.",
// "e.g.", "bzw.") do not end one.
const ABBREVIATIONS = /\b(?:z\.\s?B|d\.\s?h|u\.\s?a|o\.\s?ä|s\.\s?u|e\.\s?g|i\.\s?e|bzw|ggf|inkl|evtl|usw|etc|vs|ca|max|min|Std|Nr|bspw)\./g;
export function sentencesOf(text: string) {
  const masked = text
    .replace(/`[^`]*`|\]\([^)]*\)/g, (m) => m.replace(/[.!?]/g, "\u0000"))
    .replace(ABBREVIATIONS, (m) => m.replace(/\./g, "\u0000"));
  const out: string[] = [];
  let from = 0;
  for (const m of masked.matchAll(/[.!?](?=\s+[A-ZÄÖÜ„"*[(`]|\s*$)/g)) {
    out.push(text.slice(from, m.index + 1).trim());
    from = m.index + 1;
  }
  if (from < text.length && text.slice(from).trim()) out.push(text.slice(from).trim());
  return out.length ? out : [text];
}
export const firstSentence = (text: string) => sentencesOf(text)[0];
const heading = new Marked({ gfm: true });

// Every environment variable the docs describe: rows of tables whose first
// column is "Variable", with the default (a "Standard" / "Default" column)
// and the first sentence of the meaning; then each variable of the app
// (content/reference.json) that only the text mentions, with the sentence
// that does. `headingId` is lib/docs.ts's, so the sections match the page.
export function envRows(pages: PageText[], headingId: (html: string) => string, ref: Reference = REFERENCE): EnvRow[] {
  const rows = new Map<string, EnvRow>();
  const mentions = new Map<string, EnvRow>();
  const known = new Set(ref.env);
  for (const page of pages) {
    const used = new Set<string>();
    let section = "",
      title = page.title,
      fence = false,
      header: string[] | undefined;
    // Links to a section of the same page lead there from the reference page.
    const here = (text: string) => text.replace(/\]\(#/g, `](/${page.slug}#`);
    const where = () => (section ? `${page.title} › ${title}` : page.title);
    // A variable of the app that the text names (`X` or `X=value`), with
    // the sentence that does, from a paragraph, list item or table cell.
    const mention = (line: string) => {
      for (const m of line.matchAll(/`([A-Z][A-Z0-9_]+)(=[^`]*)?`/g)) {
        const name = m[1];
        if (!known.has(name) || mentions.has(name)) continue;
        const text = line.replace(/^\s*([-*]|\d+\.)\s+/, "").trim();
        const sentence = sentencesOf(text).find((s) => s.includes(m[0])) ?? text;
        mentions.set(name, { name, slug: page.slug, section, heading: where(), meaning: here(sentence.length > 320 ? `${sentence.slice(0, 300).replace(/\s\S*$/, "")} …` : sentence) });
      }
    };
    for (const line of page.body.split("\n")) {
      if (/^\s*(```|~~~)/.test(line)) fence = !fence;
      if (fence) continue;
      const h = line.match(/^(#{2,6}) (.+)$/);
      if (h) {
        const inner = heading.parseInline(h[2], { async: false }) as string;
        let id = headingId(inner) || "abschnitt";
        for (let n = 2; used.has(id); n++) id = `${headingId(inner)}-${n}`;
        used.add(id);
        section = id;
        title = inner.replace(/<[^>]+>/g, "");
        header = undefined;
        continue;
      }
      if (line.startsWith("|")) {
        const c = cells(line);
        if (!header) {
          header = c;
          continue;
        }
        if (c.every((x) => /^:?-+:?$/.test(x))) continue;
        const names = [...c[0].matchAll(/`([^`]+)`/g)].map((m) => m[1]).filter((n) => ENV_NAME.test(n));
        // A "Variable" table, or a row that names only variables of the app
        // ("Quelle | Bedeutung" with `FLOWPLAN_SECRETS_KEY` / `…_FILE`).
        const variables =
          /^variable$/i.test(header[0]) || (names.length > 0 && names.every((n) => known.has(n)) && /^(`[^`]+`|\s|\/|,|oder|or)+$/.test(c[0]));
        if (!variables || !names.length) {
          for (const x of c) mention(x);
          continue;
        }
        const col = header.findIndex((x) => /^(standard|default)$/i.test(x));
        for (const name of names)
          if (!rows.has(name))
            rows.set(name, { name, slug: page.slug, section, heading: where(), fallback: col > 0 ? c[col] : undefined, meaning: here(firstSentence(c[c.length - 1])) });
        for (const x of c.slice(1)) mention(x);
        continue;
      }
      header = undefined;
      mention(line);
    }
  }
  for (const [name, row] of mentions) if (!rows.has(name)) rows.set(name, row);
  return [...rows.values()].sort((a, b) => a.name.localeCompare(b.name));
}
export function envMarkdown(locale: Locale, rows: EnvRow[]) {
  const de = locale === "de";
  const head = de
    ? "| Variable | Standard | Bedeutung | Beschrieben in |\n| --- | --- | --- | --- |"
    : "| Variable | Default | Meaning | Described in |\n| --- | --- | --- | --- |";
  const lines = rows.map(
    (r) =>
      `| \`${r.name}\` | ${cell(r.fallback || "–")} | ${cell(r.meaning)} | [${cell(r.heading)}](/${r.slug}${r.section ? `#${r.section}` : ""}) |`,
  );
  return `${head}\n${lines.join("\n")}`;
}
// The app's variables the docs do not mention anywhere.
export const undocumentedEnv = (rows: EnvRow[], ref: Reference = REFERENCE) => {
  const described = new Set(rows.map((r) => r.name));
  return ref.env.filter((name) => !described.has(name));
};

// Fills {{reference:slash}} and {{reference:env}}; an unknown name is an error.
export function fillReference(text: string, locale: Locale, env: () => EnvRow[]) {
  return text.replace(/\{\{\s*reference:([a-z]+)\s*\}\}/g, (match, kind: string) => {
    if (kind === "slash") return slashMarkdown(locale);
    if (kind === "env") return envMarkdown(locale, env());
    throw new Error(`Unknown reference in ${match}`);
  });
}
export const hasReference = (text: string) => /\{\{\s*reference:/.test(text);
