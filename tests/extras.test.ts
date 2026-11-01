import { test } from "node:test";
import assert from "node:assert/strict";
import { docMarkdown, docSearchIndex, docSlugs, INTERFACE_LANGUAGES, llmsFull, loadDoc } from "../lib/docs";
import { FACTS, fillFacts } from "../lib/facts";
import { parseChangelog, releases } from "../lib/changelog";
import { excerpt, expandWord, highlight, synonymKeywords } from "../lib/search";
import { LOCALES } from "../lib/i18n";

// ---- Counts from the app's facts.json ----

test("every {{facts.…}} placeholder is filled, on the page and in the Markdown", () => {
  for (const locale of LOCALES) {
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      // Only facts placeholders: other double braces are text (record
      // template placeholders like {{Title}} on the templates page).
      assert.doesNotMatch(doc.html + doc.leadHtml, /\{\{\s*facts\b/, `${locale}/${slug}`);
      assert.doesNotMatch(docMarkdown(slug, locale), /\{\{\s*facts\b/, `${locale}/${slug}.md`);
    }
    assert.doesNotMatch(llmsFull("https://docs.example", locale), /\{\{\s*facts\b/);
  }
  assert.throws(() => fillFacts("{{facts.nothing}}", "de"), /Unknown fact/);
  assert.equal(fillFacts("{{facts.views|word}} / {{facts.templates}}", "en", { ...FACTS, views: 10, templates: 26 }), "ten / 26");
  assert.equal(fillFacts("{{facts.views|word}}", "de", { ...FACTS, views: 14 }), "14");
});

test("the pages state the counts of facts.json", () => {
  const text = (slug: string, locale: "de" | "en") => loadDoc(slug, locale)!.html;
  assert.match(text("templates", "de"), new RegExp(`${FACTS.templates} eingebaute Vorlagen`));
  assert.match(text("templates", "en"), new RegExp(`${FACTS.templates} built-in templates`));
  assert.match(text("properties-and-formulas", "de"), new RegExp(`${FACTS.fieldTypes} Eigenschaftstypen`));
  assert.match(text("forms", "en"), new RegExp(`${FACTS.questionTypes} question types`));
  assert.match(text("views", "en"), /one of the (ten|\d+) layouts/);
  for (const key of ["views", "fieldTypes", "questionTypes", "languages", "templates", "templateCategories"] as const)
    assert.ok(Number.isInteger(FACTS[key]) && FACTS[key] > 0, key);
});

test("the list of interface languages has as many entries as the app has languages", () => {
  for (const locale of LOCALES) {
    assert.equal(INTERFACE_LANGUAGES[locale].length, FACTS.languages, locale);
    const lead = loadDoc("languages", locale)!.summary;
    for (const name of INTERFACE_LANGUAGES[locale]) assert.ok(lead.includes(name), `${locale}: ${name}`);
  }
});

// ---- Search synonyms and highlighting ----

test("the search index lists synonyms, so other words find the same section", () => {
  assert.match(synonymKeywords("Anmeldung mit Passkeys"), /\blogin\b/);
  assert.match(synonymKeywords("Speicherort der Dateien"), /\bs3\b/);
  assert.match(synonymKeywords("KI-Funktionen"), /\bai\b/);
  assert.doesNotMatch(synonymKeywords("Per E-Mail benachrichtigen"), /(^| )ai( |$)/, "ai is not found inside mail");
  const index = docSearchIndex("de");
  const signIn = index.find((p) => p.slug === "sign-in")!;
  assert.ok(signIn.keywords.includes("login") && signIn.keywords.includes("sso"));
  const config = index.find((p) => p.slug === "configuration")!;
  assert.ok(config.keywords.includes("env"), "Konfiguration ↔ env");
  const storage = index.find((p) => p.slug === "storage-and-backups")!;
  assert.ok(storage.sections.some((s) => s.keywords.includes("speicher")));
});

test("query words expand to their synonyms, and matches are marked in place", () => {
  assert.ok(expandWord("login").includes("anmeldung"));
  assert.ok(expandWord("ki").includes("ai"));
  assert.ok(expandWord("anmel").includes("login"), "a started word expands too");
  assert.deepEqual(expandWord("x"), ["x"]);
  const pieces = highlight("Die Anmeldung über Single Sign-on (OIDC)", ["anmeldung", "oidc"]);
  assert.deepEqual(
    pieces.filter((p) => p.hit).map((p) => p.text),
    ["Anmeldung", "OIDC"],
  );
  assert.equal(pieces.map((p) => p.text).join(""), "Die Anmeldung über Single Sign-on (OIDC)");
  assert.deepEqual(highlight("Größe", ["grosse"]).filter((p) => p.hit).map((p) => p.text), ["Größe"]);
  assert.match(excerpt("a ".repeat(100) + "S3-Speicher", ["speicher"])!, /^… .*S3-Speicher$/);
});

// ---- What's new ----

test("the changelog becomes releases without internal entries", () => {
  const parsed = parseChangelog(
    [
      "# Changelog",
      "",
      "## v1.2.0 – 2026-11-01",
      "",
      "- Boards: drag cards between columns ([abc1234](https://github.com/yannicschuller/flowplan/commit/abc1234def))",
      "- CI: faster runs ([bcd2345](https://github.com/yannicschuller/flowplan/commit/bcd2345))",
      "- Browser tests: more of them",
      "- Text with <script>alert(1)</script> and `code`",
      "",
      "## v1.1.0 – 2026-10-01",
      "",
      "- First",
    ].join("\n"),
  );
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].version, "v1.2.0");
  assert.equal(parsed[0].id, "v1-2-0");
  assert.equal(parsed[0].entries.length, 2);
  assert.equal(parsed[0].hidden, 2);
  assert.deepEqual(parsed[0].entries[0].commit, { hash: "abc1234", url: "https://github.com/yannicschuller/flowplan/commit/abc1234def" });
  assert.equal(parsed[0].entries[0].text, "Boards: drag cards between columns");
  assert.doesNotMatch(parsed[0].entries[1].html, /<script/);
  assert.match(parsed[0].entries[1].html, /<code>code<\/code>/);
});

test("the committed changelog has releases, and they are searchable", () => {
  const all = releases();
  assert.ok(all.length > 0);
  assert.equal(new Set(all.map((r) => r.id)).size, all.length);
  for (const r of all) assert.match(r.date, /^\d{4}-\d{2}-\d{2}$/);
  for (const locale of LOCALES) {
    const entry = docSearchIndex(locale).find((p) => p.slug === "whats-new")!;
    assert.ok(entry, locale);
    assert.equal(entry.sections.length, all.length);
  }
});
