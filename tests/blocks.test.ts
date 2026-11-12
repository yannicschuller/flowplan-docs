// The content building blocks of the Markdown pages (lib/markdown-blocks.ts):
// callouts, steps, tabs with their no-JavaScript fallback, keys, pictures
// for light and dark – and that nothing a writer types in them becomes HTML.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { darkVariant, docSlugs, loadDoc, renderMarkdown } from "../lib/docs";
import { keysHtml, platformKey, readContainer, splitTabs } from "../lib/markdown-blocks";
import { LOCALES } from "../lib/i18n";

const html = (md: string, locale: "de" | "en" = "de") => renderMarkdown(md, locale).html;

test("callouts: every kind, in both languages, other blockquotes stay", () => {
  const kinds = { NOTE: ["Hinweis", "Note"], TIP: ["Tipp", "Tip"], WARNING: ["Achtung", "Warning"], ADMIN: ["Nur Admin", "Admin only"], DESKTOP: ["Nur Desktop", "Desktop only"] };
  for (const [kind, [de, en]] of Object.entries(kinds)) {
    const md = `> [!${kind}]\n> Der **Text**.`;
    const out = html(md);
    assert.match(out, /^<div class="callout" role="note" data-kind="[a-z]+">/);
    assert.match(out, new RegExp(`<svg[^>]*aria-hidden="true"[^>]*>.*</svg>${de}</strong><p>Der <strong>Text</strong>.</p>`));
    assert.ok(html(md, "en").includes(`</svg>${en}</strong>`));
  }
  assert.match(html("> [!TIP] Gleich in der Zeile."), /Tipp<\/strong><p>Gleich in der Zeile.<\/p>/);
  assert.equal(html("> Ein Zitat."), "<blockquote><p>Ein Zitat.</p>\n</blockquote>\n");
  assert.match(html("> [!UNKNOWN]\n> x"), /^<blockquote>/);
});

test("steps: a numbered list in a container", () => {
  const out = html("::: steps\n\n1. Öffnen\n2. **Speichern**\n\n:::\n");
  assert.equal(out, '<div class="steps"><ol>\n<li>Öffnen</li>\n<li><strong>Speichern</strong></li>\n</ol>\n</div>\n');
  // Unclosed containers stay text instead of swallowing the page.
  assert.match(html("::: steps\n\n1. a\n"), /<p>::: steps<\/p>/);
});

test("tabs: panels with headings (no-JS fallback), platform keys, unique ids", () => {
  const md = "## Abschnitt\n\n::: tabs\n== Web\nIm **Browser**.\n== iPhone und iPad\nIn der App.\n== Android\nAuch.\n:::\n\n::: tabs\n== Desktop-App\nA\n== Web\nB\n:::\n";
  const out = html(md);
  assert.equal((out.match(/<section class="tab-panel"/g) || []).length, 5);
  // Every panel is in the HTML and visible: no hidden attribute before the script runs.
  assert.ok(!/<section[^>]* hidden/.test(out));
  assert.match(out, /<div class="tabs" data-tabs id="tabs-1"><section class="tab-panel" id="tabs-1-web" data-tab="web"><div class="tab-title" role="heading" aria-level="3">Web<\/div><p>Im <strong>Browser<\/strong>.<\/p>/);
  assert.match(out, /id="tabs-1-ios" data-tab="ios"/);
  assert.match(out, /id="tabs-2-desktop" data-tab="desktop"/);
  assert.match(out, /id="tabs-2-web"/);
  // The tab script is a separate file; no inline script in the HTML.
  assert.ok(!out.includes("<script"));
  assert.deepEqual(["Web", "Im Browser", "iOS", "iPhone", "iPad", "Android", "macOS, Windows, Linux", "Desktop-App", "macOS", "Windows", "Browser am Computer", "Self-hosted"].map(platformKey), [
    "web",
    "web",
    "ios",
    "ios",
    "ios",
    "android",
    "desktop",
    "desktop",
    "macos",
    "windows",
    "web",
    "self-hosted",
  ]);
  // Two tabs with the same platform still get their own ids.
  assert.match(html("::: tabs\n== iPhone\na\n== iPad\nb\n:::\n"), /id="tabs-1-ios".*id="tabs-1-ios-2"/s);
});

test("containers: nesting and fenced code inside", () => {
  const c = readContainer("::: tabs\n== A\n::: steps\n1. x\n:::\n```\n:::\n== B\n```\n== C\ny\n:::\nafter");
  assert.ok(c);
  assert.equal(c.name, "tabs");
  assert.ok(c.raw.endsWith(":::\n") && !c.raw.includes("after"));
  assert.deepEqual(
    splitTabs(c.body).map((p) => p.label),
    ["A", "C"],
  );
  const out = html("::: tabs\n== Code\n```sh\n== kein Tab\n:::\n```\n:::\n");
  assert.match(out, /== kein Tab\n:::<\/code>/);
});

test("keys: one kbd per key, alternatives, the + key, ordinary text untouched", () => {
  assert.equal(html("++⌘ K++"), '<p><kbd class="keys"><kbd>⌘</kbd><kbd>K</kbd></kbd></p>\n');
  assert.equal(keysHtml("⌘/Strg ⇧ V"), '<kbd class="keys"><kbd>⌘</kbd>/<kbd>Strg</kbd><kbd>⇧</kbd><kbd>V</kbd></kbd>');
  assert.equal(keysHtml("⌘ /"), '<kbd class="keys"><kbd>⌘</kbd><kbd>/</kbd></kbd>');
  assert.match(html("Zoom ++⌘ +++ mehr"), /<kbd>⌘<\/kbd><kbd>\+<\/kbd><\/kbd> mehr/);
  assert.equal(html("C++ und C++ bleiben, a ++ b auch."), "<p>C++ und C++ bleiben, a ++ b auch.</p>\n");
  assert.equal(html("`++⌘ K++`"), "<p><code>++⌘ K++</code></p>\n");
});

test("nothing typed in the new syntax becomes HTML", () => {
  const evil = '<img src=x onerror=alert(1)>"\'&';
  const keys = html(`++${evil.replace(/\s/g, "")}++`);
  assert.ok(!keys.includes("<img"), keys);
  assert.match(keys, /&lt;img/);
  const tabs = html(`::: tabs\n== ${evil}\nText\n== B"><script>x</script>\nmehr\n:::\n`);
  assert.ok(!tabs.includes("<img") && !tabs.includes("<script"), tabs);
  assert.match(tabs, /aria-level="2">&lt;img src=x onerror=alert\(1\)&gt;&quot;&#39;&amp;<\/div>/);
  // Ids come from the label as letters and digits only.
  for (const [, id] of tabs.matchAll(/ id="([^"]*)"/g)) assert.match(id, /^[a-z0-9-]+$/);
  // A callout's kind is from a fixed list; anything else stays a quote.
  assert.match(html('> [!NOTE" onclick="x]\n> y'), /^<blockquote>/);
});

test("pictures: a -light image with a -dark sibling follows the colour scheme; the top image loads first", () => {
  assert.equal(darkVariant("/screenshots/document-light.webp"), "/screenshots/document-dark.webp");
  assert.equal(darkVariant("/screenshots/notebook.webp"), undefined);
  assert.equal(darkVariant("/screenshots/../x-light.webp"), undefined);
  const out = html('![Ein Dokument](/screenshots/document-light.webp "Ein Dokument.")\n\n## A\n\n![Notizbuch](/screenshots/notebook.webp)');
  assert.match(out, /^<figure class="shot"><picture><source media="\(prefers-color-scheme: dark\)" srcset="\/screenshots\/document-dark.webp"><img src="\/screenshots\/document-light.webp" alt="Ein Dokument" width="\d+" height="\d+" fetchpriority="high" decoding="async"><\/picture><figcaption>/);
  assert.match(out, /notebook.webp" alt="Notizbuch" width="\d+" height="\d+" loading="lazy"/);
});

for (const locale of LOCALES)
  test(`the pages use the building blocks correctly (${locale})`, () => {
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      const prose = doc.html.replace(/<code>[\s\S]*?<\/code>|<pre[^>]*>[\s\S]*?<\/pre>/g, "");
      assert.ok(!/\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|ADMIN|DESKTOP)\]/.test(prose), `${slug}: callout renders`);
      assert.ok(!/<p>:::|^:::/m.test(prose), `${slug}: container closed`);
      assert.ok(!/<p>== /.test(prose), `${slug}: tab label outside tabs`);
      for (const [, body] of prose.matchAll(/<div class="tabs"[^>]*>([\s\S]*?)<\/section><\/div>/g))
        assert.ok((body.match(/class="tab-panel"/g) || []).length >= 2, `${slug}: tabs need two panels`);
      for (const [, body] of prose.matchAll(/<div class="steps">([\s\S]*?)<\/div>/g)) assert.match(body, /^<ol/, `${slug}: steps hold a numbered list`);
    }
  });

test("the tab script stores the choice only in localStorage, guarded", () => {
  const js = readFileSync(join(process.cwd(), "public", "tabs.js"), "utf8");
  assert.ok(!/document\.cookie|fetch\(|XMLHttpRequest|sendBeacon/.test(js));
  assert.equal((js.match(/localStorage\./g) || []).length, 2);
  assert.equal((js.match(/try \{/g) || []).length, 2);
});
