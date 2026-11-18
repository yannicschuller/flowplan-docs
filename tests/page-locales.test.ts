// Single pages in a further language (#367, PAGE_LOCALES in lib/i18n.ts):
// /fr/first-steps and /zh/first-steps, the rest of the site in English.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NextRequest } from "next/server";
import { docSlugs, frontMatter, hasTranslation, loadDoc, loadTranslation, pageTranslations, translationMarkdown, translationSource } from "../lib/docs";
import { PAGE_LOCALES, PAGE_LOCALE_NOTES } from "../lib/i18n";
import { LOCALE_HEADER, PAGE_LOCALE_HEADER } from "../lib/i18n-server";
import { proxy } from "../proxy";

test("first steps exist in every further language, as plain Markdown", () => {
  for (const lang of PAGE_LOCALES) {
    assert.ok(hasTranslation("first-steps", lang), lang);
    const text = readFileSync(translationSource("first-steps", lang), "utf8");
    const { keywords, body } = frontMatter(text);
    assert.ok(keywords.length >= 3, `${lang}: keywords`);
    // Callouts, steps and tabs would be labelled in English; facts and
    // markers are not filled in for these pages.
    assert.doesNotMatch(body, /^> \[!|^:::|\{\{|\{since=/m, lang);
    const doc = loadTranslation("first-steps", lang)!;
    const english = loadDoc("first-steps", "en")!;
    assert.notEqual(doc.title, english.title, `${lang}: own title`);
    assert.ok(doc.summary.length > 20 && doc.toc.length >= 5, lang);
    assert.equal(doc.group, english.group, "same place in the navigation");
    assert.ok(doc.minutes >= 2 && doc.minutes <= 15, `${lang}: ${doc.minutes} min`);
    assert.match(translationMarkdown("first-steps", lang)!, /^# /m);
    assert.ok(PAGE_LOCALE_NOTES[lang].only && PAGE_LOCALE_NOTES[lang].missing);
  }
  assert.deepEqual(pageTranslations("first-steps"), PAGE_LOCALES);
  assert.deepEqual(pageTranslations("databases"), []);
  assert.equal(loadTranslation("databases", "fr"), null);
  assert.equal(hasTranslation("no-such-page", "fr"), false);
});

test("links of the translated pages lead to existing English pages and sections", () => {
  const ids = (slug: string) => new Set([...loadDoc(slug, "en")!.html.matchAll(/<h\d id="([^"]+)"/g)].map((m) => m[1]));
  for (const lang of PAGE_LOCALES) {
    const doc = loadTranslation("first-steps", lang)!;
    const own = new Set(doc.toc.map((e) => e.id));
    for (const [, slug, id] of doc.html.matchAll(/href="\/([a-z0-9-]*)(?:#([^"]+))?"/g)) {
      if (!slug) {
        assert.ok(id && own.has(id), `${lang}: #${id}`);
        continue;
      }
      assert.ok(docSlugs.includes(slug), `${lang}: /${slug}`);
      if (id) assert.ok(ids(slug).has(id), `${lang}: /${slug}#${id}`);
    }
    // Words, roughly: French by spaces, Chinese by characters.
    const text = doc.html.replace(/<[^>]+>/g, " ");
    const size = lang === "zh" ? (text.match(/\p{Script=Han}/gu)?.length ?? 0) / 2 : text.split(/\s+/).length;
    assert.ok(size <= 2800, `${lang}: ${size}`);
  }
});

test("/fr and /zh are English addresses that know their language", () => {
  const rewrite = (path: string) => {
    const res = proxy(new NextRequest(`http://docs.test${path}`, { headers: { [PAGE_LOCALE_HEADER]: "zh" } }));
    return {
      to: res.headers.get("x-middleware-rewrite"),
      locale: res.headers.get(`x-middleware-request-${LOCALE_HEADER}`),
      page: res.headers.get(`x-middleware-request-${PAGE_LOCALE_HEADER}`),
    };
  };
  assert.deepEqual(rewrite("/fr/first-steps"), { to: "http://docs.test/first-steps", locale: "en", page: "fr" });
  assert.deepEqual(rewrite("/zh/databases"), { to: "http://docs.test/databases", locale: "en", page: "zh" });
  assert.deepEqual(rewrite("/fr/first-steps.md"), { to: "http://docs.test/markdown/first-steps", locale: "en", page: "fr" });
  assert.deepEqual(rewrite("/de/first-steps"), { to: "http://docs.test/first-steps", locale: "de", page: null }, "a sent header is dropped");
});
