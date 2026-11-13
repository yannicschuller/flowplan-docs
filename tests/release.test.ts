// Version markers {since=X.Y.Z} (lib/release.ts): a badge on the page, words
// in the Markdown for tools, compared with the latest release
// (content/release.json, written by scripts/latest-release.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Marked } from "marked";
import { docMarkdown, docSearchIndex, docSlugs, docSource, frontMatter, headingId, llmsFull, loadDoc, renderMarkdown } from "../lib/docs";
import { compareVersions, isUnreleased, latestRelease, RELEASE, sinceHtml, sinceText, stripSince, stripSinceHtml } from "../lib/release";
import { handleMessage } from "../lib/mcp";
import { LOCALES } from "../lib/i18n";
import { blockKey } from "../scripts/split/block-key";
import { fetchLatestRelease, parseRelease, releaseFile, releaseVersion } from "../scripts/latest-release.mjs";

// Runs fn with FLOWPLAN_RELEASE set, so the tests do not depend on what the
// latest release is today.
function withRelease<T>(version: string, fn: () => T): T {
  const before = process.env.FLOWPLAN_RELEASE;
  process.env.FLOWPLAN_RELEASE = version;
  try {
    return fn();
  } finally {
    if (before === undefined) delete process.env.FLOWPLAN_RELEASE;
    else process.env.FLOWPLAN_RELEASE = before;
  }
}

test("versions compare part by part; the latest release comes from release.json or FLOWPLAN_RELEASE", () => {
  assert.equal(compareVersions("0.9.6", "0.9.5"), 1);
  assert.equal(compareVersions("0.9.5", "0.9.5"), 0);
  assert.equal(compareVersions("0.10.0", "0.9.6"), 1);
  assert.equal(compareVersions("0.9.10", "1.0.0"), -1);
  assert.match(RELEASE.version, /^\d+\.\d+\.\d+$/);
  assert.equal(latestRelease(""), RELEASE.version);
  assert.equal(latestRelease("v0.9.7"), "0.9.7");
  assert.equal(latestRelease("beta"), RELEASE.version, "an invalid override is ignored");
  assert.equal(isUnreleased("0.9.6", "0.9.5"), true);
  assert.equal(isUnreleased("0.9.6", "0.9.6"), false);
  assert.equal(isUnreleased("0.9.5", "0.9.6"), false);
});

test("the badge: new in the :beta image before the release, a quiet since afterwards", () => {
  const beta = sinceHtml("0.9.6", "en", "0.9.5");
  assert.match(beta, /^<span class="since" data-state="beta">New in 0\.9\.6/);
  assert.match(beta, /in the :beta image<\/span>$/);
  assert.match(beta, /<span aria-hidden="true"> · <\/span><span class="sr-only">, <\/span>/, "the dot is not read out");
  assert.match(sinceHtml("0.9.6", "de", "0.9.5"), /Neu in 0\.9\.6.*im :beta-Image/);
  assert.equal(sinceHtml("0.9.6", "en", "0.9.6"), '<span class="since" data-state="released">Since 0.9.6</span>');
  assert.equal(sinceHtml("0.9.6", "de", "1.0.0"), '<span class="since" data-state="released">Seit 0.9.6</span>');
  for (const html of [beta, sinceHtml("0.9.6", "de", "0.9.6")]) assert.equal(stripSinceHtml(`Tabs ${html}`), "Tabs");
});

test("in Markdown for tools the marker becomes words", () => {
  const md = "## Tabs {since=0.9.6}\n\nText. {since=0.9.6} More.";
  assert.equal(sinceText(md, "en", "0.9.5"), "## Tabs (new in 0.9.6, in the :beta image)\n\nText. (new in 0.9.6, in the :beta image) More.");
  assert.equal(sinceText(md, "de", "0.9.5"), "## Tabs (neu in 0.9.6, im :beta-Image)\n\nText. (neu in 0.9.6, im :beta-Image) More.");
  assert.equal(sinceText(md, "en", "0.9.6"), "## Tabs (since 0.9.6)\n\nText. (since 0.9.6) More.");
  assert.equal(sinceText(md, "de", "0.9.7"), "## Tabs (seit 0.9.6)\n\nText. (seit 0.9.6) More.");
  assert.equal(sinceText("{since=0.9}", "en", "0.9.5"), "{since=0.9}", "only a full version is a marker");
  assert.equal(stripSince(md), "## Tabs\n\nText. More.");
});

test("rendered: the badge follows the heading, but the id and the table of contents stay as they were", () => {
  const md = "## Tabs {since=0.9.6}\n\n- Item {since=0.9.6}\n\n| A | B |\n| --- | --- |\n| row | new {since=0.9.6} |\n\n`{since=0.9.6}` in code stays.";
  const beta = withRelease("0.9.5", () => renderMarkdown(md, "en"));
  assert.match(beta.html, /<h2 id="tabs">.*Tabs <span class="since" data-state="beta">New in 0\.9\.6.*<\/h2>/);
  assert.deepEqual(beta.toc, [{ id: "tabs", text: "Tabs", depth: 2 }]);
  assert.match(beta.html, /<li>Item <span class="since" data-state="beta">/);
  assert.match(beta.html, /<td>new <span class="since" data-state="beta">/);
  assert.match(beta.html, /<code>\{since=0\.9\.6\}<\/code>/);
  const released = withRelease("0.9.6", () => renderMarkdown(md, "de"));
  assert.match(released.html, /<h2 id="tabs">.*Tabs <span class="since" data-state="released">Seit 0\.9\.6<\/span><\/h2>/);
  assert.doesNotMatch(released.html, /data-state="beta"/);
  assert.equal(headingId("Tabs {since=0.9.6}"), "tabs");
});

test("the blocks page marks the Tabs block, at its old address", () => {
  for (const locale of LOCALES) {
    const doc = withRelease("0.9.5", () => loadDoc("blocks", locale)!);
    assert.match(doc.html, /<h2 id="tabs"><a class="anchor" href="#tabs"[^>]*>#<\/a>Tabs <span class="since" data-state="beta">/);
    assert.ok(doc.toc.some((e) => e.id === "tabs" && e.text === "Tabs"));
    const later = withRelease("0.9.6", () => loadDoc("blocks", locale)!);
    assert.match(later.html, /Tabs <span class="since" data-state="released">(Seit|Since) 0\.9\.6<\/span>/);
  }
});

test("every marker is a full version, and none sits in a title or a lead", () => {
  for (const locale of LOCALES)
    for (const slug of docSlugs) {
      const { body } = frontMatter(readFileSync(docSource(slug, locale), "utf8"));
      for (const m of body.matchAll(/\{since[^}]*\}/g)) assert.match(m[0], /^\{since=\d+\.\d+\.\d+\}$/, `${locale}/${slug}: ${m[0]}`);
      assert.doesNotMatch(body.match(/^# .+$/m)?.[0] ?? "", /\{since/, `${locale}/${slug}: title`);
      const doc = loadDoc(slug, locale)!;
      assert.doesNotMatch(doc.leadHtml, /\{since/, `${locale}/${slug}: lead`);
      // A marker the renderer did not take (a typo, a wrong place) would show as text.
      assert.doesNotMatch(doc.html.replace(/<code>[\s\S]*?<\/code>/g, ""), /\{since/, `${locale}/${slug}: rendered`);
    }
});

test("search, .md, llms-full.txt and the MCP server read words instead of markers", () => {
  withRelease("0.9.5", () => {
    for (const locale of LOCALES) {
      const tabs = docSearchIndex(locale).find((p) => p.slug === "blocks")!.sections.find((s) => s.id === "tabs")!;
      assert.equal(tabs.text, "Tabs");
      assert.doesNotMatch(tabs.body, /beta|0\.9\.6/);
      for (const slug of docSlugs) assert.doesNotMatch(docMarkdown(slug, locale), /\{since=/, `${locale}/${slug}.md`);
      assert.doesNotMatch(llmsFull("https://docs.example", locale), /\{since=/);
    }
    assert.match(docMarkdown("blocks", "en"), /^## Tabs \(new in 0\.9\.6, in the :beta image\)$/m);
    assert.match(docMarkdown("blocks", "de"), /^## Tabs \(neu in 0\.9\.6, im :beta-Image\)$/m);
    assert.match(llmsFull("https://docs.example", "en"), /## Tabs \(new in 0\.9\.6, in the :beta image\)/);
    const answer = handleMessage({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_page", arguments: { slug: "blocks" } } }) as any;
    const text = answer.result.content.map((c: { text: string }) => c.text).join("");
    assert.match(text, /## Tabs \(new in 0\.9\.6, in the :beta image\)/);
    assert.doesNotMatch(text, /\{since=/);
  });
  withRelease("0.9.6", () => assert.match(docMarkdown("blocks", "en"), /^## Tabs \(since 0\.9\.6\)$/m));
});

test("a marker does not change a block for the split check", () => {
  const lex = (md: string) => new Marked({ gfm: true }).lexer(stripSince(md)).filter((t) => t.type !== "space");
  const [marked] = lex("Some text. {since=0.9.6} More text.");
  const [plain] = lex("Some text. More text.");
  assert.equal(blockKey(marked.raw), blockKey(plain.raw));
  assert.equal((lex("## Tabs {since=0.9.6}")[0] as { text: string }).text, "Tabs");
});

test("the build reads the latest release from GitHub, and keeps the committed one when it cannot", async () => {
  assert.equal(releaseVersion("v0.9.5"), "0.9.5");
  assert.equal(releaseVersion("0.9.5"), "0.9.5");
  assert.equal(releaseVersion("v0.9.5-beta.1"), undefined);
  assert.deepEqual(parseRelease({ tag_name: "v0.9.5", published_at: "2026-11-13T15:47:42Z", draft: false, prerelease: false }), {
    version: "0.9.5",
    tag: "v0.9.5",
    published: "2026-11-13T15:47:42Z",
  });
  assert.throws(() => parseRelease({ tag_name: "v1.0.0", prerelease: true }), /pre-release/);
  assert.throws(() => parseRelease({ tag_name: "nightly" }), /not vX\.Y\.Z/);

  const seen: { url: string; headers: Record<string, string> }[] = [];
  const fake = (status: number, body: unknown): typeof fetch => async (url, init) => {
    seen.push({ url: String(url), headers: (init?.headers ?? {}) as Record<string, string> });
    return new Response(JSON.stringify(body), { status });
  };
  const release = await fetchLatestRelease({ fetch: fake(200, { tag_name: "v0.9.6", published_at: "2026-11-20T10:00:00Z" }), url: "https://api.example/latest", page: "", token: "t0ken" });
  assert.deepEqual(release, { version: "0.9.6", tag: "v0.9.6", published: "2026-11-20T10:00:00Z" });
  assert.equal(seen[0].url, "https://api.example/latest");
  assert.equal(seen[0].headers.Authorization, "Bearer t0ken");
  await assert.rejects(fetchLatestRelease({ fetch: fake(403, { message: "rate limit" }), url: "https://api.example/latest", page: "", token: "" }), /HTTP 403/);
  assert.equal(seen[1].headers.Authorization, undefined);
  // A token that does not fit: asked again without it.
  seen.length = 0;
  await assert.rejects(fetchLatestRelease({ fetch: fake(401, {}), url: "https://api.example/latest", page: "", token: "stale" }), /HTTP 401/);
  assert.deepEqual(seen.map((s) => s.headers.Authorization), ["Bearer stale", undefined]);
  // Rate limited: the release page's redirect names the tag.
  const limited: typeof fetch = async (url) => {
    if (String(url).startsWith("https://api.example")) return new Response("{}", { status: 403 });
    const res = new Response(null, { status: 200 });
    Object.defineProperty(res, "url", { value: "https://github.example/o/r/releases/tag/v0.9.6" });
    return res;
  };
  assert.deepEqual(await fetchLatestRelease({ fetch: limited, url: "https://api.example/latest", page: "https://github.example/o/r/releases/latest", token: "" }), {
    version: "0.9.6",
    tag: "v0.9.6",
    published: null,
  });
  // No release at all: the page stays at /releases.
  const none: typeof fetch = async (url) => {
    if (String(url).startsWith("https://api.example")) return new Response("{}", { status: 404 });
    const res = new Response(null, { status: 200 });
    Object.defineProperty(res, "url", { value: "https://github.example/o/r/releases" });
    return res;
  };
  await assert.rejects(fetchLatestRelease({ fetch: none, url: "https://api.example/latest", page: "https://github.example/o/r/releases/latest", token: "" }), /HTTP 404; release page: no release tag/);
  // The committed file has the shape the script writes.
  assert.equal(readFileSync("content/release.json", "utf8"), releaseFile(RELEASE));
});
