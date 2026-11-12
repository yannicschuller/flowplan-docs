// Applies scripts/split/manifest.mjs to the pages as they were at BASE (read
// from git) and writes
//   content/docs/*.md, content/docs/en/*.md   the new pages, with front matter
//   content/anchor-map.json                   old page + heading → new page + heading
//   tests/fixtures/pre-split.json             headings and paragraphs of the old pages
//
//   node --import tsx scripts/split/split-docs.ts
//
// Text moves verbatim: only heading levels (a moved level-3 section becomes
// level 2), links to moved sections and a "More on this topic" line on the
// pages that gave sections away change.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { headingId } from "../../lib/docs";
import { BASE, PAGES } from "./manifest.mjs";
import { blockKey } from "./block-key";

type Locale = "de" | "en";
const LOCALES: Locale[] = ["de", "en"];
type Entry = { slug: string; hub?: boolean; title?: [string, string]; lead?: [string, string]; sections?: string[]; page?: string; kw: [string, string] };
const pages = PAGES as Entry[];

const root = process.cwd();
const git = (path: string) => execFileSync("git", ["show", `${BASE}:${path}`], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 });
const fileOf = (slug: string, locale: Locale) => (locale === "en" ? `content/docs/en/${slug}.md` : `content/docs/${slug}.md`);
const OLD_SLUGS = execFileSync("git", ["ls-tree", "--name-only", `${BASE}:content/docs`], { cwd: root, encoding: "utf8" })
  .split("\n")
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3));

// ---------------------------------------------------------------- old pages
type Node = { depth: number; text: string; id: string; start: number; contentEnd: number; end: number; children: Node[]; index: number };
type Old = { slug: string; locale: Locale; lines: string[]; title: string; leadEnd: number; introEnd: number; nodes: Node[]; top: Node[] };
const inline = new Marked({ gfm: true });
const idOf = (text: string) => headingId(inline.parseInline(text, { async: false }) as string);

function headings(lines: string[], from: number) {
  const out: { line: number; depth: number; text: string }[] = [];
  let fence: string | null = null;
  for (let i = from; i < lines.length; i++) {
    const l = lines[i];
    const f = l.match(/^\s*(```|~~~)/);
    if (f) {
      if (!fence) fence = f[1];
      else if (l.trim().startsWith(fence)) fence = null;
      continue;
    }
    if (fence) continue;
    const m = l.match(/^(#{2,6}) (.+?)\s*#*\s*$/);
    if (m) out.push({ line: i, depth: m[1].length, text: m[2] });
  }
  return out;
}

function parseOld(slug: string, locale: Locale): Old {
  const lines = git(fileOf(slug, locale)).split("\n");
  const t = lines.findIndex((l) => l.startsWith("# "));
  let i = t + 1;
  while (!lines[i].trim()) i++;
  while (i < lines.length && lines[i].trim()) i++;
  const leadEnd = i;
  const hs = headings(lines, leadEnd);
  const used = new Set<string>();
  const nodes: Node[] = hs.map((h, index) => {
    let id = idOf(h.text) || (locale === "en" ? "section" : "abschnitt");
    for (let n = 2; used.has(id); n++) id = `${idOf(h.text)}-${n}`;
    used.add(id);
    return { depth: h.depth, text: h.text, id, start: h.line, contentEnd: 0, end: 0, children: [], index };
  });
  const top: Node[] = [];
  const stack: Node[] = [];
  nodes.forEach((n, k) => {
    n.contentEnd = k + 1 < nodes.length ? nodes[k + 1].start : lines.length;
    let e = nodes.findIndex((m, j) => j > k && m.depth <= n.depth);
    n.end = e < 0 ? lines.length : nodes[e].start;
    while (stack.length && stack[stack.length - 1].depth >= n.depth) stack.pop();
    (stack.length ? stack[stack.length - 1].children : top).push(n);
    stack.push(n);
  });
  return { slug, locale, lines, title: lines[t].slice(2).trim(), leadEnd, introEnd: nodes[0]?.start ?? lines.length, nodes, top };
}

const old: Record<Locale, Record<string, Old>> = { de: {}, en: {} };
for (const locale of LOCALES) for (const slug of OLD_SLUGS) old[locale][slug] = parseOld(slug, locale);
for (const slug of OLD_SLUGS) {
  const de = old.de[slug].nodes,
    en = old.en[slug].nodes;
  if (de.length !== en.length || de.some((n, i) => n.depth !== en[i].depth)) throw new Error(`${slug}: German and English headings differ`);
}

// ---------------------------------------------------------------- claims
const ref = (r: string) => {
  const [slug, text] = r.split("#");
  const page = old.de[slug];
  if (!page) throw new Error(`unknown page in ${r}`);
  // A level-2 heading wins over a level-3 one of the same name.
  let found = page.nodes.filter((n) => n.text === text && n.depth <= 3);
  if (found.length > 1) found = found.filter((n) => n.depth === 2);
  if (found.length !== 1) throw new Error(`${r}: ${found.length} headings`);
  return { slug, index: found[0].index };
};
const key = (slug: string, index: number) => `${slug}#${index}`;
const claimedBy = new Map<string, string>();
const claim = (r: string, by: string) => {
  const { slug, index } = ref(r);
  const k = key(slug, index);
  if (claimedBy.has(k)) throw new Error(`${r} claimed twice`);
  claimedBy.set(k, by);
  return { slug, index };
};
const slugs = new Set<string>();
for (const p of pages) {
  if (slugs.has(p.slug)) throw new Error(`duplicate ${p.slug}`);
  slugs.add(p.slug);
  if (p.page && p.sections) throw new Error(`${p.slug}: page and sections`);
  if (p.page) claim(p.page, p.slug);
  for (const s of p.sections || []) claim(s, p.slug);
}
for (const slug of OLD_SLUGS) if (!slugs.has(slug)) throw new Error(`old page ${slug} is not in the manifest`);
const split = new Set([...claimedBy.keys()].map((k) => k.split("#")[0]));
for (const slug of split) if (!pages.find((p) => p.slug === slug)?.hub) throw new Error(`${slug} gives sections away but is no hub`);

// ---------------------------------------------------------------- assembling
type Line = { text: string; origin: string; node?: number; depth?: number };
const pick = (locale: Locale, pair: [string, string]) => (locale === "de" ? pair[0] : pair[1]);

function emit(o: Old, node: Node, shift: number, by: string, out: Line[], withHeading = true) {
  if (withHeading) out.push({ text: `${"#".repeat(node.depth - shift)} ${node.text}`, origin: o.slug, node: node.index, depth: node.depth - shift });
  for (let i = node.start + 1; i < node.contentEnd; i++) out.push({ text: o.lines[i], origin: o.slug });
  for (const child of node.children) {
    const owner = claimedBy.get(key(o.slug, child.index));
    if (owner && owner !== by) continue;
    emit(o, child, shift, by, out);
  }
}
// Every line of a page; the title separately.
function assemble(p: Entry, locale: Locale): { title: string; lines: Line[]; titleNode?: { slug: string; index: number } } {
  const out: Line[] = [];
  if (p.page) {
    const { slug, index } = ref(p.page);
    const o = old[locale][slug];
    const node = o.nodes[index];
    if (p.lead) out.push({ text: pick(locale, p.lead), origin: slug }, { text: "", origin: slug });
    else {
      let i = node.start + 1;
      while (!o.lines[i].trim()) i++;
      if (/^\s*([-*+]\s|\||>|\d+\.\s|```|<)/.test(o.lines[i])) throw new Error(`${p.slug}: section starts with no paragraph, give it a lead`);
    }
    emit(o, node, node.depth - 1, p.slug, out, false);
    return { title: node.text, lines: out, titleNode: { slug, index } };
  }
  if (p.sections) {
    out.push({ text: pick(locale, p.lead!), origin: "" }, { text: "", origin: "" });
    for (const r of p.sections) {
      const { slug, index } = ref(r);
      const o = old[locale][slug];
      const node = o.nodes[index];
      emit(o, node, node.depth - 2, p.slug, out);
      if (out[out.length - 1].text.trim()) out.push({ text: "", origin: slug });
    }
    return { title: pick(locale, p.title!), lines: out };
  }
  // A kept page, or a hub: lead, intro and every section nobody else took.
  const o = old[locale][p.slug];
  for (let i = o.lines.findIndex((l) => l.startsWith("# ")) + 1; i < o.introEnd; i++) out.push({ text: o.lines[i], origin: o.slug });
  if (p.hub) {
    // Pages made mainly from this one first, then those that took a section.
    const refs = (q: Entry) => [q.page, ...(q.sections || [])].filter(Boolean) as string[];
    const given = pages.filter((q) => q.slug !== p.slug && refs(q).some((r) => r.startsWith(`${p.slug}#`)));
    given.sort((a, b) => Number(!refs(a)[0].startsWith(`${p.slug}#`)) - Number(!refs(b)[0].startsWith(`${p.slug}#`)));
    while (out.length && !out[out.length - 1].text.trim()) out.pop();
    out.push({ text: "", origin: "" }, { text: `@@MORE ${given.map((q) => q.slug).join(" ")}`, origin: "" }, { text: "", origin: "" });
  }
  for (const node of o.top) {
    const owner = claimedBy.get(key(o.slug, node.index));
    if (owner && owner !== p.slug) continue;
    emit(o, node, 0, p.slug, out);
  }
  return { title: p.title ? pick(locale, p.title) : o.title, lines: out };
}

const built: Record<Locale, Map<string, ReturnType<typeof assemble>>> = { de: new Map(), en: new Map() };
// old slug + heading index → new slug + id, per language
const moved: Record<Locale, Map<string, { slug: string; id: string }>> = { de: new Map(), en: new Map() };
for (const locale of LOCALES)
  for (const p of pages) {
    const page = assemble(p, locale);
    built[locale].set(p.slug, page);
    const used = new Set<string>();
    let fence = false;
    for (const line of page.lines) {
      if (/^\s*(```|~~~)/.test(line.text)) fence = !fence;
      if (fence) continue;
      const m = line.text.match(/^(#{2,6}) (.+?)\s*#*\s*$/);
      if (!m) continue;
      let id = idOf(m[2]) || (locale === "en" ? "section" : "abschnitt");
      for (let n = 2; used.has(id); n++) id = `${idOf(m[2])}-${n}`;
      used.add(id);
      if (line.node !== undefined) moved[locale].set(key(line.origin, line.node), { slug: p.slug, id });
    }
    if (page.titleNode) moved[locale].set(key(page.titleNode.slug, page.titleNode.index), { slug: p.slug, id: "" });
  }
for (const locale of LOCALES)
  for (const slug of OLD_SLUGS) for (const n of old[locale][slug].nodes) if (!moved[locale].has(key(slug, n.index))) throw new Error(`${locale} ${slug}#${n.id} got lost`);

const target = (locale: Locale, slug: string, id: string) => {
  const n = old[locale][slug]?.nodes.find((x) => x.id === id);
  return n ? moved[locale].get(key(slug, n.index)) : undefined;
};

// Links to moved sections; same-page links of moved text.
function rewrite(text: string, origin: string, locale: Locale, here: string) {
  if (!origin) return text;
  return text
    .replace(/\]\(((?:\/(?:de|en))?)\/([a-z0-9-]+)#([^)\s]+)\)/g, (all, lang: string, slug: string, hash: string) => {
      const t = target(locale, slug, decodeURIComponent(hash));
      if (!t) return all;
      if (t.slug === here) return t.id ? `](#${t.id})` : `](${lang}/${here})`;
      return `](${lang}/${t.slug}${t.id ? `#${t.id}` : ""})`;
    })
    .replace(/\]\(#([^)\s]+)\)/g, (all, hash: string) => {
      const t = target(locale, origin, decodeURIComponent(hash));
      if (!t) return all;
      if (t.slug === here) return t.id ? `](#${t.id})` : `](/${here})`;
      return `](/${t.slug}${t.id ? `#${t.id}` : ""})`;
    });
}

const MORE: Record<Locale, string> = { de: "Mehr zum Thema", en: "More on this topic" };
for (const locale of LOCALES) {
  for (const p of pages) {
    const page = built[locale].get(p.slug)!;
    let fence = false;
    const body = page.lines.map((line) => {
      if (/^\s*(```|~~~)/.test(line.text)) fence = !fence;
      if (fence && !/^\s*(```|~~~)/.test(line.text)) return line.text;
      if (line.text.startsWith("@@MORE ")) {
        const links = line.text
          .slice(7)
          .split(" ")
          .map((s) => `[${built[locale].get(s)!.title}](/${s})`);
        return `**${MORE[locale]}:** ${links.join(" · ")}`;
      }
      return rewrite(line.text, line.origin, locale, p.slug);
    });
    const text = `---\nkeywords: ${pick(locale, p.kw)}\n---\n\n# ${page.title}\n\n${body.join("\n").replace(/^\n+/, "").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
    writeFileSync(join(root, fileOf(p.slug, locale)), text);
  }
}

// ---------------------------------------------------------------- anchor map
// { "documents": [["text-formatieren", "formatting-text", "formatting", "text-formatieren", "formatting-text"], …] }
// [German id, English id, new page, new German id, new English id]; only
// headings that moved or changed their id.
const anchors: Record<string, string[][]> = {};
for (const slug of OLD_SLUGS) {
  const rows: string[][] = [];
  old.de[slug].nodes.forEach((n, i) => {
    const e = old.en[slug].nodes[i];
    const d = moved.de.get(key(slug, i))!,
      t = moved.en.get(key(slug, i))!;
    if (d.slug !== t.slug) throw new Error(`${slug}#${n.id}: languages disagree`);
    if (d.slug === slug && d.id === n.id && t.id === e.id) return;
    rows.push([n.id, e.id, d.slug, d.id, t.id]);
  });
  if (rows.length) anchors[slug] = rows;
}
writeFileSync(join(root, "content", "anchor-map.json"), JSON.stringify(anchors, null, 0).replace(/\],\[/g, "],\n[").replace(/":\[\[/g, '":[\n[') + "\n");

// ---------------------------------------------------------------- fixture
// Every heading and block of the old pages, the blocks as short hashes of
// their text with link targets left out (links may point elsewhere now).
// tests/split.test.ts checks that each of them is still somewhere.
const fixture: Record<string, Record<string, { headings: string[]; blocks: string[] }>> = { de: {}, en: {} };
for (const locale of LOCALES)
  for (const slug of OLD_SLUGS) {
    const o = old[locale][slug];
    const body = o.lines.slice(o.lines.findIndex((l) => l.startsWith("# ")) + 1).join("\n");
    const headingsList: string[] = [];
    const blocks: string[] = [];
    for (const token of new Marked({ gfm: true }).lexer(body)) {
      if (token.type === "space") continue;
      if (token.type === "heading") headingsList.push(token.text.replace(/\]\([^)]*\)/g, "]()"));
      else blocks.push(blockKey(token.raw));
    }
    fixture[locale][slug] = { headings: headingsList, blocks };
  }
mkdirSync(join(root, "tests", "fixtures"), { recursive: true });
writeFileSync(join(root, "tests", "fixtures", "pre-split.json"), JSON.stringify({ base: BASE, ...fixture }) + "\n");

const stats = { pages: pages.length, old: OLD_SLUGS.length, moved: Object.values(anchors).reduce((n, r) => n + r.length, 0) };
console.log(`split: ${stats.old} old pages → ${stats.pages} pages; ${stats.moved} headings in the anchor map`);
