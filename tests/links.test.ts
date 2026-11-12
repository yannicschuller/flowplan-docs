// The link checker: every internal link written in a page's Markdown – in
// paragraphs, lists, tables, callouts, steps and tabs, German and English –
// leads to an existing page and, with an anchor, to a heading there (or to
// where content/anchor-map.json sends an old anchor). It reads the Markdown
// with the same building blocks as the renderer, and also counts the links
// written in the text, so a link a block swallows (shown as text instead of
// a link) is noticed too. tests/docs.test.ts checks the rendered HTML.
import { test } from "node:test";
import assert from "node:assert/strict";
import { Marked, type Token, type Tokens } from "marked";
import { docAnchors, docMarkdown, docSlugs, loadDoc, WHATS_NEW } from "../lib/docs";
import { resolveAnchor } from "../lib/anchors";
import { releases } from "../lib/changelog";
import { contentBlocks } from "../lib/markdown-blocks";
import { LOCALES, type Locale } from "../lib/i18n";

const idsOf = (html: string) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const pageIds = Object.fromEntries(
  LOCALES.map((locale) => [
    locale,
    new Map<string, Set<string>>([
      ...docSlugs.map((slug) => [slug, idsOf(loadDoc(slug, locale)!.html)] as const),
      [WHATS_NEW.slug, new Set(releases().map((r) => r.id))],
      ["", new Set<string>()],
    ]),
  ]),
) as Record<Locale, Map<string, Set<string>>>;

// The internal links of a Markdown text, as the renderer's lexer sees them.
export function markdownLinks(markdown: string) {
  const marked = new Marked({ gfm: true });
  marked.use(contentBlocks({ depth: 1, tabs: 0 }));
  const links: string[] = [];
  marked.walkTokens(marked.lexer(markdown), (token: Token) => {
    if (token.type === "link") links.push((token as Tokens.Link).href);
    else if (token.type === "html") for (const m of token.raw.matchAll(/\shref="([^"]*)"/g)) links.push(m[1]);
  });
  return links.filter((href) => /^[/#]/.test(href) && !href.startsWith("//"));
}
// The same links counted in the plain text: "](/…)" and "](#…)", with code
// (blocks and spans, as the lexer finds them) taken out.
export function writtenLinks(markdown: string) {
  const marked = new Marked({ gfm: true });
  marked.use(contentBlocks({ depth: 1, tabs: 0 }));
  let text = markdown;
  marked.walkTokens(marked.lexer(markdown), (token: Token) => {
    if (token.type === "code" || token.type === "codespan") text = text.replace(token.raw.trim(), " ");
  });
  return [...text.matchAll(/\]\((<)?([/#][^)\s>]*)/g)].map((m) => m[2]).filter((href) => !href.startsWith("//") && !href.startsWith("/screenshots/"));
}

// Why a link does not lead anywhere, or undefined.
export function linkProblem(href: string, locale: Locale, slug: string): string | undefined {
  const [path, hash] = href.split("#");
  const anchor = hash === undefined ? undefined : decodeURIComponent(hash);
  let target = slug;
  if (path) {
    if (/^\/(screenshots|icons|fonts)\//.test(path) || /^(\/(de|en))?\/llms(-full)?\.txt$/.test(path)) return;
    const page = path.match(/^(?:\/(de|en))?(?:\/([a-z0-9-]*?)(\.md)?)?\/?$/);
    if (!page) return `not a page address: ${href}`;
    if (page[1] && page[1] !== locale) return `links to the other language: ${href}`;
    target = page[2] ?? "";
    if (!pageIds[locale].has(target)) return `missing page: ${href}`;
    if (page[3] && anchor !== undefined) return `anchor on a Markdown address: ${href}`;
  }
  if (anchor === undefined) return;
  if (!anchor) return `empty anchor: ${href}`;
  if (pageIds[locale].get(target)!.has(anchor)) return;
  // An old anchor that the anchor map sends on.
  const moved = resolveAnchor(docAnchors(target), anchor, locale);
  if (moved && pageIds[locale].get(moved.slug)?.has(moved.id || "")) return;
  if (moved && !moved.id && pageIds[locale].has(moved.slug)) return;
  return `missing heading: ${href}${path ? "" : ` (on ${slug})`}`;
}

for (const locale of LOCALES)
  test(`every internal link in the Markdown resolves (${locale})`, () => {
    const problems: string[] = [];
    let count = 0,
      anchors = 0;
    for (const slug of docSlugs) {
      const doc = loadDoc(slug, locale)!;
      const markdown = docMarkdown(slug, locale);
      const links = markdownLinks(markdown);
      for (const href of links) {
        count++;
        if (href.includes("#")) anchors++;
        const problem = linkProblem(href, locale, slug);
        if (problem) problems.push(`${doc.source}: ${problem}`);
      }
      // Every link written in the text is a link for the renderer as well.
      const written = writtenLinks(markdown).sort();
      const seen = links.filter((href) => !href.startsWith("/screenshots/")).sort();
      if (written.join(" ") !== seen.join(" ")) problems.push(`${doc.source}: written ${written.length} links, renderer sees ${seen.length}`);
    }
    assert.deepEqual(problems, []);
    assert.ok(count > 500 && anchors > 250, `${count} links, ${anchors} with anchor`);
  });

test("the link checker finds broken links, also inside callouts, steps and tabs", () => {
  const sample = [
    "> [!NOTE]",
    "> See [x](/nope) and [y](#nope).",
    "",
    "::: steps",
    "",
    "1. Open [z](/mcp#nope).",
    "",
    ":::",
    "",
    "::: tabs",
    "== Web",
    "Read [w](/de/mcp).",
    "== Android",
    "Fine: [v](/mcp).",
    ":::",
    "",
    "`[code](/nope)` and",
    "",
    "```",
    "[fence](/nope)",
    "```",
  ].join("\n");
  const links = markdownLinks(sample);
  assert.deepEqual(links, ["/nope", "#nope", "/mcp#nope", "/de/mcp", "/mcp"]);
  assert.deepEqual(writtenLinks(sample).sort(), [...links].sort());
  assert.deepEqual(
    links.map((href) => linkProblem(href, "en", "mcp")).filter(Boolean).length,
    4,
  );
  // Old anchors that the map sends on are fine; so are files and the start page.
  assert.equal(linkProblem("/documents#format-text", "en", "mcp"), undefined);
  assert.equal(linkProblem("/documents#markdown-kuerzel", "de", "mcp"), undefined);
  assert.equal(linkProblem("/screenshots/notebook.webp", "en", "mcp"), undefined);
  assert.equal(linkProblem("/en", "en", "mcp"), undefined);
  assert.equal(linkProblem("/en/whats-new", "en", "mcp"), undefined);
  assert.match(linkProblem("/documents#gibt-es-nicht", "de", "mcp")!, /missing heading/);
  // A link the text has but the lexer does not see is counted.
  assert.notEqual(writtenLinks("> [!NOTE]\n> [a](/mcp)\n\n\\[b](/x)").length, markdownLinks("> [!NOTE]\n> [a](/mcp)\n\n\\[b](/x)").length);
});
