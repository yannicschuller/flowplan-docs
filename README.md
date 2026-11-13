# Flowplan documentation

The documentation of [Flowplan](https://github.com/yannicschuller/flowplan) at [docs.flowplan.org](https://docs.flowplan.org), in German and English: every feature, self-hosting, configuration and operations.

## Writing

Pages are Markdown files in `content/docs` (German) and `content/docs/en` (English, same file names), one topic each and at most about 2,600 words. Each starts with front matter listing search keywords (`---`, `keywords: Kanban, Board, …`, `---`), then `# Title` and a one-sentence lead. The three areas (Using, Extending, Running), their groups and the page order are in `lib/docs.ts`; titles come from the pages. Links between pages are written as `/slug` or `/slug#anchor`; `npm test` checks that every link and anchor exists – in the rendered pages (`tests/docs.test.ts`) and in the Markdown, inside callouts, steps and tabs too, where an old anchor of the anchor map counts as well (`tests/links.test.ts`, which also notices a written link that does not render as one). Screenshots live in `public/screenshots` and are written as `![what it shows](/screenshots/name.webp "caption")` in a paragraph of their own: they render as a figure with the caption below, with their width and height read from the file; `npm test` checks that each exists and has a description. Links to other sites open in a new tab (with a hint for screen readers); links to flowplan.org do not.

Under the lead each page shows its reading time (200 words a minute) and the date of its last commit; at its end come up to four related pages (shared keywords, the same group, links between them), an "Edit on GitHub" link and the previous and next page of the same area. "On this page" stays beside the article and marks the section being read; on small screens it is folded above the article. A section added recently gets a "Neu" / "New" badge for 60 days: list it in the front matter as `new: section-id 2026-11-12` (comma-separated; the date is when it was added, `npm test` checks that the heading exists). The dates come from `content/last-modified.json`, which `npm run build` writes from the git history (`scripts/last-modified.mjs`); without a full history (shallow clone, no git) the file stays empty and no dates are shown. The search (the header field, ⌘K / Ctrl+K or `/`) opens a dialog that loads with its first use and fetches its index from `/api/search-index/<lang>` then, so pages stay small. Results are pages and sections ("Page › Section") with the matching sentence; a query without results offers corrections of typos (edit distance on titles, headings and keywords) and a link to open an issue. The start page's tasks and popular pages are in `lib/home.ts`. The index lists synonyms of the terms in each section (`lib/search.ts`: login ↔ Anmeldung, env ↔ Konfiguration, S3 ↔ Speicher, SSO ↔ Single Sign-on, KI ↔ AI …), and results mark the matched words.

**Version markers.** The docs go live on every push, before the release, so whatever describes a feature that is only in the `:beta` image gets a marker with the **next** server version: `{since=0.9.6}` at the end of a heading (`## Tabs {since=0.9.6}`), or right after what is new in a paragraph, list item or table cell (`… drag it to make the column wider. {since=0.9.6} Point at …`, `| Read journal day | … {since=0.9.6} |`). As long as that version is newer than the latest release, the marker shows as an accent badge "Neu in 0.9.6 · im :beta-Image" / "New in 0.9.6 · in the :beta image"; once the release is out it turns into a muted "Seit 0.9.6" / "Since 0.9.6" by itself with the next build – leave the markers in, they are the history. Changed behaviour is marked like new behaviour. Desktop- and mobile-app-only content has its own versions and gets no server marker. A marker is not part of the heading's anchor, the table of contents or the search index; in the Markdown for tools (`.md`, `llms-full.txt`, the MCP server) it reads "(new in 0.9.6, in the :beta image)" or "(since 0.9.6)". Not in a page's title or lead; `npm test` checks the syntax (`tests/release.test.ts`), and the split check ignores markers. The latest release is `content/release.json`, which the build writes from GitHub (below); `FLOWPLAN_RELEASE` overrides it.

**For AI assistants** every page is also Markdown (`/en/slug.md`, `/de/slug.md`; `/llms.txt` and `/llms-full.txt`, German under `/de`), each page has "Ask Claude" / "Ask ChatGPT" links (a prompt pointing at its Markdown, `lib/ask-ai.ts`), "Copy as Markdown" and "View as Markdown" under its lead, and the docs are a public, read-only **MCP server** at `/mcp` (`lib/mcp.ts`, tests in `tests/mcp.test.ts`): Streamable HTTP, stateless, JSON answers to POST, 405 to GET and DELETE, any origin, tools `search_docs` (the site search), `get_page` and `list_pages`. `/mcp` is also the page about the app's own MCP server: `proxy.ts` sends POST, OPTIONS and event-stream GETs to `app/api/mcp`, browsers get the page. Limits: 64 KB per request, 60 requests a minute per client – counted in memory under a daily-keyed HMAC of the address, which is never stored or logged; queries are not stored either.

In November 2026 the long pages were split (`scripts/split`: the manifest says where every old section went). Old pages keep their address as the start of their topic; `content/anchor-map.json` maps their old anchors to the new pages, and a small script on those pages follows them (`/en/documents#format-text` → `/en/formatting#format-text`). `tests/split.test.ts` checks that every heading and block of the old pages still exists (`tests/fixtures/pre-split.json`; remove a key there when you change such a block on purpose) and that every old anchor leads somewhere.

**Reference pages** have a filter field above their tables (front matter `filter: true`; it loads only on those pages and filters as you type, `?filter=…` fills it; without JavaScript the tables stand as they are). Two of them are written from data: `{{reference:slash}}` (every entry of the `/` menu) and `{{reference:env}}` (every environment variable the pages describe in a table whose first column is "Variable", or name in a sentence – with default, first sentence and a link to the section). `content/reference.json` holds what the app's code defines – the `/` menu, the default shortcuts, the workflow nodes and the environment variables it reads; `npm run reference` writes it from a checkout of the app (`FLOWPLAN_DIR`, default `../flowplan`), and it is committed because the build has no checkout. `npm test` checks the pages against it: `/keyboard-shortcuts` names every default shortcut, `/workflow-nodes` every node type with its name, and every variable of the app is described somewhere (`UNDOCUMENTED_ENV` in `tests/reference.test.ts` lists those that are not yet); with a checkout present it also checks that the committed data is current.

Counts that the pages state come from the app's [`facts.json`](https://github.com/yannicschuller/flowplan/blob/main/facts.json): write `{{facts.templates}}` for "26" or `{{facts.views|word}}` for "zehn" / "ten" (keys: `views`, `fieldTypes`, `questionTypes`, `languages`, `templates`, `templateCategories`). **Was ist neu / What's new** (`/whats-new`) lists the releases from the app's `CHANGELOG.md`. Both files are fetched before every build (`scripts/app-files.mjs`, also `npm run app-files`) into `content/facts.json` and `content/changelog.md`, and the tag of the latest published release (GitHub API, or the redirect of the releases page when the API's rate limit hits; `scripts/latest-release.mjs`) into `content/release.json` for the version markers; without network the committed copies are used.

### Building blocks

Besides GitHub Markdown, the pages know a few blocks (`lib/markdown-blocks.ts`, styles in `components/docs/content.module.css`). Everything typed into them is escaped; `npm test` checks the syntax (`tests/blocks.test.ts`).

| Write | Renders as |
| --- | --- |
| `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!IMPORTANT]`, `> [!CAUTION]`, then the text on the next `>` lines (or on the same line) | A callout: Hinweis / Note, Tipp / Tip, Achtung / Warning, Wichtig / Important, Vorsicht / Caution |
| `> [!ADMIN]`, `> [!DESKTOP]` | A callout for whom or where it applies: Nur Admin / Admin only, Nur Desktop / Desktop only |
| `::: steps`, a blank line, a numbered list, a blank line, `:::` | The list as numbered steps; items may hold code blocks and paragraphs (indent them by three spaces) |
| `::: tabs`, then `== Label` before each panel, `:::` at the end | Tabs. Without JavaScript every panel shows under its label as a heading; `public/tabs.js` (loaded only on pages with tabs) turns them into tabs |
| `{since=0.9.6}` after a heading or what is new in a paragraph, list item or table cell | A version badge: "Neu in 0.9.6 · im :beta-Image" until 0.9.6 is released, then "Seit 0.9.6" (see Version markers above) |
| `++⌘ K++`, `++Strg Umschalt P++`, `++⌘/Strg ⇧ V++`, `++⌘ +++` | A key combination: keys are separated by spaces, `⌘/Strg` is one key with alternatives. Plain `<kbd>` still works for single keys |

Containers can be nested (tabs holding steps); `:::` inside fenced code does not count. Tab labels for platforms share the reader's choice: `Web`/`Browser`, `Desktop`, `iPhone`/`iPad`/`iOS`, `Android` (and `macOS`, `Windows`, `Linux` on their own). Picking one remembers it in the browser (localStorage, no cookie) and preselects it in every tab group that has it, on all pages.

A screenshot wrapped in a link to its own file – `[![what it shows](/screenshots/name.webp "caption")](/screenshots/name.webp)` – is a figure that opens the image in full size on click or tap; use it for large diagrams. A screenshot named `name-light.webp` with a `name-dark.webp` next to it follows the reader's colour scheme (`<picture>`). Put a page's key screenshot right after the lead: an image before the first `##` loads at once, all others lazily. Keep screenshots WebP, about 1360 px wide (diagrams 1600 px), under ~60 KB.

## Development

```bash
npm install
npm run dev
```

Checks: `npm run typecheck`, `npm test`, `npm run build`, then `npm run quality` – it starts the production build and opens `/de`, `/en/configuration`, `/de/journal`, `/en/whats-new`, `/de/formatting`, `/en/mobile-apps` (tabs), `/de/installation` and the reference pages `/de/environment-variables` and `/en/slash-commands` at 1280 and 390 px in Chromium: no serious or critical [axe](https://github.com/dequelabs/axe-core) findings (contrast included), nothing focusable inside `aria-hidden`, no horizontal scrolling, at most 150 KB of JavaScript (gzip) per page and a largest contentful paint under 2.5 s. `QUALITY_CHROMIUM` names a Chromium binary when Playwright's own is not installed (`npx playwright install chromium`).

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `WEBSITE_URL` | `https://flowplan.org` | The logo and "Start page" link. |
| `MARKETPLACE_URL` | `https://marketplace.flowplan.org` | The template marketplace: "Marketplace" in the header, a footer link and a line in `llms.txt`. Empty or `off` hides them; links in the pages' text stay. |
| `IMPRINT_URL` | *empty* | Link to the legal notice in the footer, e.g. `https://flowplan.org/impressum`. Hidden when empty. |
| `PRIVACY_URL` | *empty* | Link to the privacy policy in the footer, e.g. `https://flowplan.org/datenschutz`. Hidden when empty. |
| `FLOWPLAN_RELEASE` | *empty* | The latest released Flowplan version, e.g. `0.9.6`, instead of `content/release.json` – for the version markers. Read by the server when it renders a page, so it also works on a running container. |
| `UMAMI_URL` | *empty* | Visitor statistics with a self-hosted [Umami](https://umami.is), without cookies: address of the instance, e.g. `https://stats.example.com`. Off unless `UMAMI_WEBSITE_ID` is set too. |
| `UMAMI_WEBSITE_ID` | *empty* | The site's ID in Umami. Mention the statistics in the privacy policy that `PRIVACY_URL` links to. With Umami on, the docs also send a few events without personal data – `search` (sanitised term, result bucket, language), `search-open`, `copy`, `not-found`, `outbound` and `language`; see `lib/track.ts`. |

## Image

Every push to `main` publishes `ghcr.io/yannicschuller/flowplan-docs:latest` (and `:sha-…`) for `linux/amd64` and `linux/arm64`. The container listens on port 3000 and has a healthcheck on `/api/health`.

After pushing, the workflow rolls the new image out on Coolify. Set two repository secrets (Settings → Secrets and variables → Actions):

- `COOLIFY_WEBHOOK`: the deploy webhook of the Coolify resource (resource → **Webhooks** → Deploy Webhook, `https://<coolify>/api/v1/deploy?uuid=…&force=false`).
- `COOLIFY_TOKEN`: a Coolify API token with the *deploy* permission (**Keys & Tokens → API tokens**; API access must be on under **Settings**).

The Coolify resource must use the `:latest` image. Without the secrets the step is skipped.

To test the webhook or redeploy without building: **Actions → Deploy on Coolify → Run workflow**. It shows Coolify's answer. The workflows run on GitHub's runners, whose addresses change: Coolify's **Settings → Advanced → API access** must allow them (the token still protects the API).

## License

AGPL-3.0, like Flowplan.
