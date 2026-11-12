import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { docGroups, docSearchIndex, docSlugs, headingId, languageList, llmsIndex, loadDoc, ownSite, plain, WHATS_NEW } from "../lib/docs";
import { releases } from "../lib/changelog";
import { LOCALES, type Locale } from "../lib/i18n";

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
      const prose = doc.html.replace(/<code>[\s\S]*?<\/code>|<pre[^>]*>[\s\S]*?<\/pre>/g, "");
      assert.ok(!prose.includes("[!NOTE]") && !prose.includes("[!WARNING]"), `${slug}: callouts render`);
    }
    assert.equal(loadDoc("../package", locale), null);
  });

test("every page has an English translation without German left in it", () => {
  for (const slug of docSlugs) {
    assert.ok(existsSync(join(process.cwd(), "content", "docs", "en", `${slug}.md`)), `${slug}: English file`);
    const doc = loadDoc(slug, "en")!;
    const text = (doc.leadHtml + doc.html)
      .replace(/<code>[\s\S]*?<\/code>|<pre[^>]*>[\s\S]*?<\/pre>/g, "")
      .replace(/<[^>]+>/g, " ");
    assert.doesNotMatch(text, /\b(und|der|die|das|nicht|mit|für|oder|wird|werden|eine?n?)\b/, `${slug}: German words`);
  }
});

// Every link and image of a rendered page that stays on this site: pages in
// the page's language (/slug, /en/slug on English pages, /de/slug on German
// ones), their sections, sections of the same page, the Markdown and
// llms.txt addresses, and files in public/. Offline: other sites are skipped.
const headingIds = (html: string) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const sectionsOf = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    new Map<string, Set<string>>([
      ...docSlugs.map((slug) => [slug, headingIds(loadDoc(slug, locale)!.html)] as const),
      [WHATS_NEW.slug, new Set(releases().map((r) => r.id))],
      ["", new Set<string>()],
    ]),
  ]),
) as Record<Locale, Map<string, Set<string>>>;
function linkProblems(html: string, locale: Locale, slug: string) {
  const problems: string[] = [];
  const checked = { pages: 0, sections: 0, files: 0 };
  // A heading's own "#" link is made from its id, so it cannot break.
  const prose = html.replace(/<a class="anchor" href="#[^"]*"/g, "<a");
  for (const [, attr, raw] of prose.matchAll(/\s(href|src)="([^"]*)"/g)) {
    const href = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|\/\/)/.test(href)) continue;
    const [path, hash] = href.split("#");
    const section = hash === undefined ? undefined : decodeURIComponent(hash);
    if (!path) {
      checked.sections++;
      if (!sectionsOf[locale].get(slug)?.has(section!)) problems.push(`missing section on the same page: ${href}`);
      continue;
    }
    if (!path.startsWith("/")) {
      problems.push(`relative ${attr}: ${href}`);
      continue;
    }
    const page = path.match(/^(?:\/(de|en))?(?:\/([a-z0-9-]*?)(\.md)?)?$/);
    if (page || /^(\/(de|en))?\/llms(-full)?\.txt$/.test(path)) {
      checked.pages++;
      if (!page) continue;
      const [, lang, target = "", md] = page;
      if (lang && lang !== locale) problems.push(`links to the other language: ${href}`);
      if (!sectionsOf[locale].has(target) || (md && !target)) problems.push(`missing page: ${href}`);
      else if (section !== undefined) {
        checked.sections++;
        if (md || !sectionsOf[locale].get(target)!.has(section)) problems.push(`missing section: ${href}`);
      }
      continue;
    }
    checked.files++;
    const file = decodeURIComponent(path);
    if (file.includes("..") || !existsSync(join(process.cwd(), "public", file))) problems.push(`missing file in public/: ${href}`);
  }
  return { problems, checked };
}

for (const locale of LOCALES)
  test(`links point at existing pages, sections and files, in the page's language (${locale})`, () => {
    const total = { pages: 0, sections: 0, files: 0, prefixed: 0 };
    const problems: string[] = [];
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      const html = doc.leadHtml + doc.html;
      const result = linkProblems(html, locale, slug);
      problems.push(...result.problems.map((p) => `${doc.source}: ${p}`));
      for (const key of ["pages", "sections", "files"] as const) total[key] += result.checked[key];
      total.prefixed += [...html.matchAll(/href="\/(de|en)\//g)].length;
    }
    assert.deepEqual(problems, []);
    // The check sees the links at all.
    assert.ok(total.pages > 200 && total.sections > 200 && total.files >= 4, JSON.stringify(total));
    if (locale === "en") assert.ok(total.prefixed > 5, "English pages link to /en/ pages");
  });

test("the link check finds wrong pages, sections, languages and files", () => {
  const html = [
    "/en/mcp#nope",
    "#nope",
    "/de/mcp",
    "mcp",
    "/nope",
    "/screenshots/missing.webp",
    "/../package.json",
    "/en/mcp.md#x",
  ]
    .map((href) => `<a href="${href}">x</a>`)
    .join("");
  assert.equal(linkProblems(html, "en", "mcp").problems.length, 8);
  const fine = ["/en/mcp", "/mcp", "#" + [...sectionsOf.en.get("mcp")!][0], "/en/whats-new", "/en", "/en/mcp.md", "/llms.txt"];
  assert.deepEqual(linkProblems(fine.map((href) => `<a href="${href}">x</a>`).join("") + '<img src="/screenshots/notebook.webp">', "en", "mcp").problems, []);
});

test("the fonts and icons the layout uses exist in public/", () => {
  const css = readFileSync(join(process.cwd(), "public", "fonts.css"), "utf8");
  const files = [...css.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]);
  assert.ok(files.length >= 4);
  const layout = readFileSync(join(process.cwd(), "app", "layout.tsx"), "utf8");
  files.push(...[...layout.matchAll(/["'](\/[\w/.-]+\.(?:css|ico|png|svg|webp|woff2))["']/g)].map((m) => m[1]));
  assert.ok(files.includes("/icons/apple-touch-icon.png") && files.includes("/fonts.css"));
  for (const file of files) assert.ok(existsSync(join(process.cwd(), "public", file)), file);
});

test("the search index covers section text", () => {
  const index = docSearchIndex("de");
  const storage = index.find((p) => p.slug === "storage-and-backups")!;
  assert.ok(storage.sections.some((s) => s.text === "Garage" && s.body.includes("garage bucket create")));
  const config = index.find((p) => p.slug === "configuration-storage")!;
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

test("the mobile apps have their own page, and the old section leads there", () => {
  const ids = { de: "apps-fuer-iphone-ipad-und-android", en: "apps-for-iphone-ipad-and-android" } as const;
  const map = JSON.parse(readFileSync(join(process.cwd(), "content", "anchor-map.json"), "utf8")) as Record<string, string[][]>;
  const row = map["offline-and-apps"].find((r) => r[0] === ids.de)!;
  assert.deepEqual(row, [ids.de, ids.en, "mobile-apps", "", ""]);
  for (const locale of LOCALES) {
    const doc = loadDoc("mobile-apps", locale)!;
    // The status is a note, not part of the title.
    assert.doesNotMatch(doc.title, /\(/, `${locale}: no status in the title`);
    // Other pages link to it.
    for (const slug of ["whiteboards", "notifications"])
      assert.ok(loadDoc(slug, locale)!.html.includes(`href="/mobile-apps"`), `${locale}: ${slug} links to the apps`);
  }
});

test("links to other sites open in a new tab and say so; Flowplan's own sites do not", () => {
  assert.ok(ownSite("https://flowplan.org/download") && ownSite("https://app.flowplan.org/x") && !ownSite("https://github.com/x"));
  const de = loadDoc("mobile-apps", "de")!.html;
  // Own sites open in the same tab; links to them count as "outbound" (lib/track.ts).
  assert.match(de, /<a href="https:\/\/flowplan\.org\/download" data-umami-event="outbound" data-umami-event-target="website">flowplan\.org\/download<\/a>/);
  const config = (locale: Locale) => docSlugs.filter((slug) => slug.startsWith("configuration")).map((slug) => loadDoc(slug, locale)!.html).join("");
  assert.match(config("de"), /href="https:\/\/github\.com\/[^"]+" target="_blank" rel="noreferrer" data-umami-event="outbound" data-umami-event-target="github">[^<]*<span class="sr-only"> \(öffnet in neuem Tab\)<\/span><\/a>/);
  assert.match(config("en"), /<span class="sr-only"> \(opens in a new tab\)<\/span>/);
});

test("llms.txt names every interface language from one list", () => {
  assert.equal(languageList("de"), "Deutsch, Englisch, Französisch und vereinfachtes Chinesisch");
  assert.equal(languageList("en"), "German, English, French and Simplified Chinese");
  assert.match(llmsIndex("https://docs.example", "de"), /Oberfläche auf Deutsch, Englisch, Französisch und vereinfachtes Chinesisch\./);
  assert.match(llmsIndex("https://docs.example", "en"), /Interface in German, English, French and Simplified Chinese\./);
});

test("pages know their source file and whether they are translated", () => {
  const de = loadDoc("journal", "de")!,
    en = loadDoc("journal", "en")!;
  assert.equal(de.source, "content/docs/journal.md");
  assert.equal(en.source, "content/docs/en/journal.md");
  assert.ok(de.translated && en.translated);
});

test("self-hosting is documented for everyone, in both languages", () => {
  const selfHosting = docGroups("en").filter((g) => g.area === "run").flatMap((g) => g.pages.map((p) => p.slug));
  for (const slug of ["installation", "configuration", "storage-and-backups", "coolify-and-proxy", "operations", "sign-in", "administration"])
    assert.ok(selfHosting.includes(slug), slug);
  for (const locale of LOCALES)
    assert.match(loadDoc("installation", locale)!.html, /ghcr\.io\/yannicschuller\/flowplan/);
});

for (const locale of LOCALES)
  test(`screenshots exist, say what they show and keep their place while loading (${locale})`, () => {
    let count = 0;
    for (const slug of docSlugs)
      for (const [tag] of loadDoc(slug, locale)!.html.matchAll(/<img [^>]*>/g)) {
        count++;
        const src = tag.match(/src="([^"]+)"/)![1];
        assert.ok(existsSync(join(process.cwd(), "public", src)), `${slug}: ${src} exists`);
        assert.match(tag, /alt="[^"]{20,}"/, `${slug}: ${src} has a description`);
        assert.match(tag, /width="\d+" height="\d+"/, `${slug}: ${src} has its size`);
        // Lazy, except an image at the top of the page (before the first section).
        assert.match(tag, /loading="lazy"|fetchpriority="high"/);
      }
    assert.ok(count >= 4, `${count} screenshots`);
    const notebook = loadDoc("notebooks", locale)!.html;
    assert.match(notebook, /<figure class="shot"><img src="\/screenshots\/notebook\.webp"[^>]*><figcaption>[^<]+<\/figcaption><\/figure>/);
  });

test("text of rendered HTML decodes each entity once", () => {
  assert.equal(plain("<code>&amp;lt;b&amp;gt;</code> &amp;amp; &lt;i&gt; &quot;q&quot;"), '&lt;b&gt; &amp; <i> "q"');
});

test("the search index route answers plain JSON, even to browsers that accept gzip", async () => {
  // Next drops a route handler's Content-Encoding header, so a body the
  // route gzipped itself reached the browser as unreadable JSON.
  const { GET } = await import("../app/api/search-index/[lang]/route");
  for (const lang of LOCALES) {
    const request = new Request(`https://docs.example/api/search-index/${lang}?v=1`, { headers: { "Accept-Encoding": "gzip, deflate, br, zstd" } });
    const response = await GET(request, { params: Promise.resolve({ lang }) });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-encoding"), null);
    const index = JSON.parse(await response.text());
    assert.equal(index.length, docSlugs.length + 1, lang);
  }
  const missing = await GET(new Request("https://docs.example/api/search-index/xx"), { params: Promise.resolve({ lang: "xx" }) });
  assert.equal(missing.status, 404);
});
