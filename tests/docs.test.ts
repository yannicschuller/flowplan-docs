import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { docGroups, docSearchIndex, docSlugs, headingId, languageList, llmsIndex, loadDoc, ownSite } from "../lib/docs";
import { LOCALES } from "../lib/i18n";

for (const locale of LOCALES)
  test(`every documentation page loads with title, lead and content (${locale})`, () => {
    assert.ok(docSlugs.length >= 20);
    assert.equal(new Set(docSlugs).size, docSlugs.length);
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      assert.ok(doc, slug);
      const listed = docGroups(locale).flatMap((g) => g.pages).find((p) => p.slug === slug)!;
      assert.equal(doc.title, listed.title, `${slug}: title matches the navigation`);
      assert.ok(doc.summary.length > 30, `${slug}: lead`);
      assert.ok(doc.html.length > 500, `${slug}: content`);
      // Alerts render as callouts; in code they may be shown as written.
      const prose = doc.html.replace(/<code>[\s\S]*?<\/code>|<pre>[\s\S]*?<\/pre>/g, "");
      assert.ok(!prose.includes("[!NOTE]") && !prose.includes("[!WARNING]"), `${slug}: callouts render`);
    }
    assert.equal(loadDoc("../package", locale), null);
  });

test("every page has an English translation without German left in it", () => {
  for (const slug of docSlugs) {
    assert.ok(existsSync(join(process.cwd(), "content", "docs", "en", `${slug}.md`)), `${slug}: English file`);
    const doc = loadDoc(slug, "en")!;
    const text = (doc.leadHtml + doc.html)
      .replace(/<code>[\s\S]*?<\/code>|<pre>[\s\S]*?<\/pre>/g, "")
      .replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /\b(und|der|die|das|nicht|mit|für|oder|wird|werden|eine?n?)\b/, `${slug}: German words`);
  }
});

for (const locale of LOCALES)
  test(`links between documentation pages point at existing pages and sections (${locale})`, () => {
    const anchors = new Map(
      docSlugs.map((slug) => [slug, new Set([...loadDoc(slug, locale)!.html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]))]),
    );
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      for (const [, target, anchor] of (doc.html + doc.leadHtml).matchAll(/href="\/([a-z-]+)(?:#([a-z0-9-]+))?"/g)) {
        assert.ok(anchors.has(target), `${slug} links to missing page ${target}`);
        if (anchor) assert.ok(anchors.get(target)!.has(anchor), `${slug} links to missing section ${target}#${anchor}`);
      }
    }
  });

test("the search index covers section text", () => {
  const index = docSearchIndex("de");
  const storage = index.find((p) => p.slug === "storage-and-backups")!;
  assert.ok(storage.sections.some((s) => s.text === "Garage" && s.body.includes("garage bucket create")));
  const config = index.find((p) => p.slug === "configuration")!;
  assert.match(config.sections.find((s) => s.id === "s3-und-datenbanksicherung")!.body, /S3_BUCKET \S/);
  const english = docSearchIndex("en").find((p) => p.slug === "configuration")!;
  assert.equal(english.title, "Configuration");
});

test("the navigation has small groups with an intro each, and keeps every page", () => {
  for (const locale of LOCALES) {
    const groups = docGroups(locale);
    assert.ok(groups.length >= 5);
    for (const group of groups) {
      assert.ok(group.intro.length > 10, `${group.title}: intro`);
      assert.ok(group.pages.length >= 3 && group.pages.length <= 8, `${group.title}: ${group.pages.length} pages`);
    }
  }
  assert.equal(docGroups("en").find((g) => g.title === "Getting started")!.pages.map((p) => p.slug)[0], "first-steps");
  assert.ok(docGroups("en").find((g) => g.title === "Getting started")!.pages.some((p) => p.slug === "workspaces-and-permissions"));
});

test("the mobile apps keep a stable anchor while their status is a note", () => {
  const ids = { de: "apps-fuer-iphone-ipad-und-android", en: "apps-for-iphone-ipad-and-android" } as const;
  for (const locale of LOCALES) {
    const doc = loadDoc("offline-and-apps", locale)!;
    const heading = doc.toc.find((e) => e.id === ids[locale]);
    assert.ok(heading, `${locale}: section ${ids[locale]}`);
    assert.doesNotMatch(heading!.text, /\(/, `${locale}: no status in the heading`);
    assert.equal(headingId(heading!.text), ids[locale]);
    // Other pages link to it.
    for (const slug of ["whiteboards", "search-and-notifications"])
      assert.ok(loadDoc(slug, locale)!.html.includes(`/offline-and-apps#${ids[locale]}`), `${locale}: ${slug} links to the apps`);
  }
});

test("links to other sites open in a new tab and say so; Flowplan's own sites do not", () => {
  assert.ok(ownSite("https://flowplan.org/download") && ownSite("https://app.flowplan.org/x") && !ownSite("https://github.com/x"));
  const de = loadDoc("offline-and-apps", "de")!.html;
  assert.match(de, /<a href="https:\/\/flowplan\.org\/download">flowplan\.org\/download<\/a>/);
  assert.match(loadDoc("configuration", "de")!.html, /href="https:\/\/github\.com\/[^"]+" target="_blank" rel="noreferrer">[^<]*<span class="sr-only"> \(öffnet in neuem Tab\)<\/span><\/a>/);
  assert.match(loadDoc("configuration", "en")!.html, /<span class="sr-only"> \(opens in a new tab\)<\/span>/);
});

test("llms.txt names every interface language from one list", () => {
  assert.equal(languageList("de"), "Deutsch, Englisch und Französisch");
  assert.equal(languageList("en"), "German, English and French");
  assert.match(llmsIndex("https://docs.example", "de"), /Oberfläche auf Deutsch, Englisch und Französisch\./);
  assert.match(llmsIndex("https://docs.example", "en"), /Interface in German, English and French\./);
});

test("pages know their source file and whether they are translated", () => {
  const de = loadDoc("journal", "de")!,
    en = loadDoc("journal", "en")!;
  assert.equal(de.source, "content/docs/journal.md");
  assert.equal(en.source, "content/docs/en/journal.md");
  assert.ok(de.translated && en.translated);
});

test("self-hosting is documented for everyone, in both languages", () => {
  const selfHosting = docGroups("en").find((g) => g.title === "Self-hosting")!.pages.map((p) => p.slug);
  for (const slug of ["installation", "configuration", "storage-and-backups", "coolify-and-proxy", "operations", "sign-in", "administration"])
    assert.ok(selfHosting.includes(slug), slug);
  for (const locale of LOCALES)
    assert.match(loadDoc("installation", locale)!.html, /ghcr\.io\/yannicschuller\/flowplan/);
});
