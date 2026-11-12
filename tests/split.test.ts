// The restructuring of November 2026: the long pages were split into pages
// with one topic each (scripts/split). Nothing of the old pages may be lost,
// and every old address – with or without anchor – must still lead to the
// right place.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { docAnchors, docAreas, docKeywords, docMarkdown, docSearchIndex, docSlugs, frontMatter, headingId, loadDoc } from "../lib/docs";
import { resolveAnchor, type AnchorMap } from "../lib/anchors";
import { editDistance, searchDocs, sentence, suggest } from "../lib/search";
import { LOCALES, type Locale } from "../lib/i18n";
import { blockKey } from "../scripts/split/block-key";

type Fixture = { base: string } & Record<Locale, Record<string, { headings: string[]; blocks: string[] }>>;
const fixture = JSON.parse(readFileSync(join(process.cwd(), "tests", "fixtures", "pre-split.json"), "utf8")) as Fixture;
const map = JSON.parse(readFileSync(join(process.cwd(), "content", "anchor-map.json"), "utf8")) as AnchorMap;
const OLD = Object.keys(fixture.de);
const file = (slug: string, locale: Locale) => join(process.cwd(), "content", "docs", ...(locale === "en" ? ["en"] : []), `${slug}.md`);

// Headings and blocks of the pages as they are now (raw Markdown, like the
// fixture, so the counts in {{facts.…}} do not matter).
function current(locale: Locale) {
  const headings = new Set<string>();
  const blocks = new Set<string>();
  for (const slug of docSlugs) {
    const { body } = frontMatter(readFileSync(file(slug, locale), "utf8"));
    for (const token of new Marked({ gfm: true }).lexer(body)) {
      if (token.type === "space") continue;
      if (token.type === "heading") headings.add(token.text.replace(/\]\([^)]*\)/g, "]()"));
      else blocks.add(blockKey(token.raw));
    }
  }
  return { headings, blocks };
}

for (const locale of LOCALES)
  test(`every heading and paragraph of the old pages is still there (${locale})`, () => {
    const now = current(locale);
    const missing: string[] = [];
    let count = 0;
    for (const slug of OLD) {
      const old = fixture[locale][slug];
      for (const h of old.headings) {
        count++;
        if (!now.headings.has(h)) missing.push(`${slug}: heading "${h}"`);
      }
      old.blocks.forEach((key, i) => {
        count++;
        if (!now.blocks.has(key)) missing.push(`${slug}: block ${i + 1} (${key})`);
      });
    }
    // If a block was changed on purpose later, remove its key from
    // tests/fixtures/pre-split.json.
    assert.deepEqual(missing, []);
    assert.ok(count > 2000, `${count} headings and blocks checked`);
  });

test("the check notices a lost paragraph", () => {
  const now = current("de");
  assert.ok(!now.blocks.has(blockKey("Ein Absatz, den es nie gab.")));
  assert.equal(blockKey("Text mit [Link](/a#b)"), blockKey("Text  mit [Link](/c#d)"), "links may point elsewhere now");
});

test("every old page still exists", () => {
  for (const slug of OLD) assert.ok(docSlugs.includes(slug), slug);
  assert.ok(docSlugs.length >= OLD.length + 30, `${docSlugs.length} pages`);
});

// The ids of an old page's headings, as the renderer made them.
function oldIds(headings: string[], locale: Locale) {
  const used = new Set<string>();
  return headings.map((text) => {
    const base = headingId(new Marked({ gfm: true }).parseInline(text, { async: false }) as string);
    let id = base || (locale === "en" ? "section" : "abschnitt");
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  });
}
const idsOn = (slug: string, locale: Locale) => new Set([...loadDoc(slug, locale)!.html.matchAll(/<h\d id="([^"]+)"/g)].map((m) => m[1]));

for (const locale of LOCALES)
  test(`every old anchor leads to a heading or page (${locale})`, () => {
    const problems: string[] = [];
    let moved = 0;
    for (const slug of OLD) {
      const here = idsOn(slug, locale);
      for (const id of oldIds(fixture[locale][slug].headings, locale)) {
        const target = resolveAnchor(map[slug], id, locale);
        if (!target) {
          if (!here.has(id)) problems.push(`${slug}#${id}: neither on the page nor in the map`);
          continue;
        }
        moved++;
        if (!docSlugs.includes(target.slug)) problems.push(`${slug}#${id} → missing page ${target.slug}`);
        else if (target.id && !idsOn(target.slug, locale).has(target.id)) problems.push(`${slug}#${id} → ${target.slug}#${target.id}: no such heading`);
        // An anchor that still exists on its page is never redirected.
        if (here.has(id) && !(target.slug === slug && target.id === id)) problems.push(`${slug}#${id} is on the page and in the map`);
      }
    }
    assert.deepEqual(problems, []);
    assert.ok(moved > 150, `${moved} moved headings`);
  });

test("old anchors resolve, also in the other language", () => {
  const rows = docAnchors("documents");
  assert.ok(rows && rows.length >= 25);
  assert.deepEqual(resolveAnchor(rows, "text-formatieren", "de"), { slug: "formatting", id: "text-formatieren" });
  assert.deepEqual(resolveAnchor(rows, "format-text", "en"), { slug: "formatting", id: "format-text" });
  // A German anchor on an English address leads to the English heading.
  assert.deepEqual(resolveAnchor(rows, "text-formatieren", "en"), { slug: "formatting", id: "format-text" });
  assert.deepEqual(resolveAnchor(docAnchors("offline-and-apps"), "desktop-app-fuer-macos-windows-und-linux", "de"), { slug: "desktop-app", id: "" });
  assert.equal(resolveAnchor(rows, "gibt-es-nicht", "de"), null);
  assert.equal(resolveAnchor(undefined, "x", "de"), null);
  // Addresses the Flowplan app links to.
  assert.equal(resolveAnchor(docAnchors("whiteboards"), "racks-and-cabling", "en")!.slug, "whiteboard-racks");
  assert.equal(resolveAnchor(docAnchors("installation"), "deploy-in-one-click", "en")!.slug, "one-click-deploy");
  assert.equal(resolveAnchor(docAnchors("sign-in"), "user-provisioning-scim", "en")!.slug, "scim-and-ldap");
  assert.equal(resolveAnchor(docAnchors("operations"), "statistics", "en")!.slug, "monitoring");
  assert.equal(resolveAnchor(docAnchors("ai"), "where-your-data-goes", "en")!.slug, "ai-writing");
});

test("pages are at most about 2,600 words, in both languages", () => {
  for (const locale of LOCALES)
    for (const slug of docSlugs) {
      const words = docMarkdown(slug, locale).split(/\s+/).length;
      assert.ok(words <= 2800, `${locale}/${slug}: ${words} words`);
    }
});

test("every page has keywords, in both languages, and sits in one group of one area", () => {
  for (const locale of LOCALES) {
    const areas = docAreas(locale);
    assert.deepEqual(areas.map((a) => a.id), ["use", "extend", "run"]);
    const listed = areas.flatMap((a) => a.groups.flatMap((g) => g.pages.map((p) => p.slug)));
    assert.deepEqual([...listed].sort(), [...docSlugs].sort());
    for (const slug of docSlugs) assert.ok(docKeywords(slug, locale).length >= 3, `${locale}/${slug}: keywords`);
  }
  assert.ok(docKeywords("views", "en").includes("kanban"));
  // Front matter stays out of the Markdown served to tools.
  assert.doesNotMatch(docMarkdown("views", "de"), /^---|keywords:/);
});

// ---- Search over sections

const index = { de: docSearchIndex("de"), en: docSearchIndex("en") };

test("the search index has sections with their level-2 heading, and page keywords", () => {
  const formatting = index.de.find((p) => p.slug === "formatting")!;
  assert.ok(formatting.sections.some((s) => s.id === "text-formatieren" && !s.parent));
  assert.ok(formatting.sections.some((s) => s.text === "Spoiler" && s.parent === "Text formatieren"));
  assert.ok(index.en.find((p) => p.slug === "views")!.tags.includes("kanban"));
  // Lazy and still reasonable in size.
  for (const locale of LOCALES) {
    const kb = Buffer.byteLength(JSON.stringify(index[locale])) / 1024;
    assert.ok(kb < 2600, `${locale}: ${Math.round(kb)} KB`);
  }
});

test("search finds sections with page and section, and keywords lead to pages", () => {
  const { results } = searchDocs(index.en, "kanban");
  assert.equal(results[0].slug, "views", "Kanban → views");
  assert.equal(searchDocs(index.de, "notion").results[0].slug, "migrate");
  const spoiler = searchDocs(index.en, "spoiler", "/en").results.find((r) => r.section === "Spoiler")!;
  assert.equal(spoiler.href, "/en/formatting#spoiler");
  assert.equal(spoiler.page, "Formatting, callouts and captions");
  assert.equal(spoiler.parent, "Format text");
  assert.ok(spoiler.snippet && spoiler.snippet.length < 260);
  // Synonyms still work.
  assert.ok(searchDocs(index.de, "login").results.some((r) => r.slug === "sign-in"));
});

test("the matching sentence is the snippet", () => {
  assert.equal(sentence("Erster Satz. Hier steht Kanban drin. Dritter Satz.", ["kanban"]), "… Hier steht Kanban drin. …");
  assert.equal(sentence("Nur ein Satz mit Board.", ["board"]), "Nur ein Satz mit Board.");
  assert.equal(sentence("Nichts", ["x"]), undefined);
});

test("a typo finds suggestions that have results", () => {
  assert.equal(editDistance("kanbna", "kanban"), 1);
  assert.equal(editDistance("pasword", "password"), 1);
  assert.ok(editDistance("abc", "xyzuvw") > 2);
  assert.equal(searchDocs(index.en, "kanbna").results.length, 0);
  assert.ok(suggest(index.en, "kanbna").includes("kanban"));
  assert.ok(suggest(index.de, "whitebaord").includes("whiteboard"));
  assert.deepEqual(suggest(index.en, "qqqqqqqq"), []);
});
