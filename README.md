# Flowplan documentation

The documentation of [Flowplan](https://github.com/yannicschuller/flowplan) at [docs.flowplan.org](https://docs.flowplan.org), in German and English: every feature, self-hosting, configuration and operations.

## Writing

Pages are Markdown files in `content/docs` (German) and `content/docs/en` (English, same file names), one topic each and at most about 2,600 words. Each starts with front matter listing search keywords (`---`, `keywords: Kanban, Board, …`, `---`), then `# Title` and a one-sentence lead. The three areas (Using, Extending, Running), their groups and the page order are in `lib/docs.ts`; titles come from the pages. Links between pages are written as `/slug` or `/slug#anchor`; `npm test` checks that every link and anchor exists. Screenshots live in `public/screenshots` and are written as `![what it shows](/screenshots/name.webp "caption")` in a paragraph of their own: they render as a figure with the caption below, with their width and height read from the file; `npm test` checks that each exists and has a description. Links to other sites open in a new tab (with a hint for screen readers); links to flowplan.org do not.

Under the lead each page shows its reading time (200 words a minute) and the date of its last commit; at its end come up to four related pages (shared keywords, the same group, links between them), an "Edit on GitHub" link and the previous and next page of the same area. "On this page" stays beside the article and marks the section being read; on small screens it is folded above the article. A section added recently gets a "Neu" / "New" badge for 60 days: list it in the front matter as `new: section-id 2026-11-12` (comma-separated; the date is when it was added, `npm test` checks that the heading exists). There is no "valid from version" line: the docs are not versioned with the app's releases. The dates come from `content/last-modified.json`, which `npm run build` writes from the git history (`scripts/last-modified.mjs`); without a full history (shallow clone, no git) the file stays empty and no dates are shown. The search (the header field, ⌘K / Ctrl+K or `/`) opens a dialog that loads with its first use and fetches its index from `/api/search-index/<lang>` then, so pages stay small. Results are pages and sections ("Page › Section") with the matching sentence; a query without results offers corrections of typos (edit distance on titles, headings and keywords) and a link to open an issue. The start page's tasks and popular pages are in `lib/home.ts`. The index lists synonyms of the terms in each section (`lib/search.ts`: login ↔ Anmeldung, env ↔ Konfiguration, S3 ↔ Speicher, SSO ↔ Single Sign-on, KI ↔ AI …), and results mark the matched words.

In November 2026 the long pages were split (`scripts/split`: the manifest says where every old section went). Old pages keep their address as the start of their topic; `content/anchor-map.json` maps their old anchors to the new pages, and a small script on those pages follows them (`/en/documents#format-text` → `/en/formatting#format-text`). `tests/split.test.ts` checks that every heading and block of the old pages still exists (`tests/fixtures/pre-split.json`; remove a key there when you change such a block on purpose) and that every old anchor leads somewhere.

**Reference pages** have a filter field above their tables (front matter `filter: true`; it loads only on those pages and filters as you type, `?filter=…` fills it; without JavaScript the tables stand as they are). Two of them are written from data: `{{reference:slash}}` (every entry of the `/` menu) and `{{reference:env}}` (every environment variable the pages describe in a table whose first column is "Variable", or name in a sentence – with default, first sentence and a link to the section). `content/reference.json` holds what the app's code defines – the `/` menu, the default shortcuts, the workflow nodes and the environment variables it reads; `npm run reference` writes it from a checkout of the app (`FLOWPLAN_DIR`, default `../flowplan`), and it is committed because the build has no checkout. `npm test` checks the pages against it: `/keyboard-shortcuts` names every default shortcut, `/workflow-nodes` every node type with its name, and every variable of the app is described somewhere (`UNDOCUMENTED_ENV` in `tests/reference.test.ts` lists those that are not yet); with a checkout present it also checks that the committed data is current.

Counts that the pages state come from the app's [`facts.json`](https://github.com/yannicschuller/flowplan/blob/main/facts.json): write `{{facts.templates}}` for "26" or `{{facts.views|word}}` for "zehn" / "ten" (keys: `views`, `fieldTypes`, `questionTypes`, `languages`, `templates`, `templateCategories`). **Was ist neu / What's new** (`/whats-new`) lists the releases from the app's `CHANGELOG.md`. Both files are fetched before every build (`scripts/app-files.mjs`, also `npm run app-files`) into `content/facts.json` and `content/changelog.md`; without network the committed copies are used.

## Development

```bash
npm install
npm run dev
```

Checks: `npm run typecheck`, `npm test`, `npm run build`, then `npm run quality` – it starts the production build and opens `/de`, `/en/configuration`, `/de/journal`, `/en/whats-new`, `/de/formatting` and the reference pages `/de/environment-variables` and `/en/slash-commands` at 1280 and 390 px in Chromium: no serious or critical [axe](https://github.com/dequelabs/axe-core) findings (contrast included), nothing focusable inside `aria-hidden`, no horizontal scrolling, at most 150 KB of JavaScript (gzip) per page and a largest contentful paint under 2.5 s. `QUALITY_CHROMIUM` names a Chromium binary when Playwright's own is not installed (`npx playwright install chromium`).

## Configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `WEBSITE_URL` | `https://flowplan.org` | The logo and "Start page" link. |
| `MARKETPLACE_URL` | `https://marketplace.flowplan.org` | The template marketplace: "Marketplace" in the header, a footer link and a line in `llms.txt`. Empty or `off` hides them; links in the pages' text stay. |
| `IMPRINT_URL` | *empty* | Link to the legal notice in the footer, e.g. `https://flowplan.org/impressum`. Hidden when empty. |
| `PRIVACY_URL` | *empty* | Link to the privacy policy in the footer, e.g. `https://flowplan.org/datenschutz`. Hidden when empty. |
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
