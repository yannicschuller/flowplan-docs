---
keywords: move, import, Notion, AppFlowy, AFFiNE, Obsidian, Evernote, Confluence, BookStack, switch, migration, Notion API, import report
---

# Moving to Flowplan

Flowplan is an open-source alternative to Notion, Confluence and AppFlowy under the AGPL-3.0. This is how you bring over pages, databases, images and files from the tool you use now.

**More on this topic:** [Terms when moving](/migrate-glossary) · [From AFFiNE](/migrate-affine) · [From Confluence, BookStack, Evernote, Google Docs and Word](/migrate-office) · [From Obsidian and GoodNotes](/migrate-notes)

## How to move {since=0.9.7}

Three ways lead over:

- **In the introduction:** right after creating your account, the [introduction](/settings#the-introduction) asks **Where are you coming from?** – Notion, AFFiNE, Obsidian, Evernote, Confluence, Google Docs / Word, BookStack {since=0.9.9} or **Start fresh**. It shows step by step where the tool keeps its export, imports the file right into your first space and then explains under **What it's called here** what the things you know are called in Flowplan ([Terms when moving](/migrate-glossary)).
- **At any time** under **Settings → Import & export → Import**, with target space, preview and every source – see below.
- **Notion and BookStack without an export:** straight through the Notion API with an integration token ([Through the Notion API](#through-the-notion-api)) or through the BookStack API with an API token ([From BookStack](/migrate-office#from-bookstack)). {since=0.9.9}

| From | What you need | Guide |
| --- | --- | --- |
| Notion | ZIP export (HTML is best) or an integration token | [From Notion](#from-notion) |
| AFFiNE | the workspace's `.affine` file or a snapshot ZIP | [From AFFiNE](/migrate-affine) |
| Obsidian | the vault's folder as a ZIP | [From Obsidian](/migrate-notes#from-obsidian-and-other-markdown-folders) |
| Evernote | an `.enex` file or a ZIP with several | [From Evernote](/migrate-office#from-evernote) |
| Confluence | the space export's ZIP | [From Confluence](/migrate-office#from-confluence) |
| Google Docs, Word | Takeout ZIP, `.docx` or HTML file | [From Google Docs](/migrate-office#from-google-docs), [From Word](/migrate-office#from-microsoft-word) |
| BookStack | the instance's address and an API token {since=0.9.9} | [From BookStack](/migrate-office#from-bookstack) |
| AppFlowy | Markdown and CSV as a ZIP | [From AppFlowy](#from-appflowy) |
| GoodNotes | the notebooks' export | [From GoodNotes](/migrate-notes#from-goodnotes) |

What an import could not carry over, or only approximately, is listed afterwards in the [import report](#import-report) at the top of the target space.

## Confluence, Evernote, Google Docs and Obsidian

Under **Settings → Import & export → Import** choose the target space at the top and, at **AFFiNE, Confluence, Evernote, Google Docs, GoodNotes, Microsoft Word or Obsidian**, the source (or let it be detected) and whether you want a page tree or a **new database**. Then choose the file:

1. Flowplan uploads the file (with a progress bar) and shows a **preview**: how many pages, folders, files (with their size) and tags will be imported, and what will not work – such as encrypted text, unsupported macros or images missing from the export.
2. **Import** creates everything in one step. If something fails, nothing is left half imported.

For all sources:

- End-to-end encrypted spaces cannot be targets (the server sees no plaintext there).
- You need write access to the target space; the workspace's storage quota and your personal limit are checked first (the preview already warns).
- Limits per import: by default 10,000 pages (documents, folders, databases, whiteboards and collections each count as a page; as a database: 10,000 records) and 20,000 files, 5,000 records per table, per file in the ZIP as much as the largest upload, at least 10 MB (PDFs and ZIPs inside the ZIP, such as Notion's “Export-…-Part-1.zip”, up to 100 MB – all within the import's overall limits). The operator sets pages and files with `FLOWPLAN_IMPORT_MAX_DOCS` and `FLOWPLAN_IMPORT_MAX_FILES` ([Configuration](/configuration#operations)). When a file brings more pages, the preview shows how many, names the limit and the variable, and **Import** stays disabled; files above the limit are left out (the preview says how many). ZIP exports and single files may be up to 100 MB. The **AFFiNE workspace file (`.affine`)** may be as large as the **largest upload** (Administration → [Limits & retention](/administration#limits-retention), can differ per person), but at least 100 MB; `FLOWPLAN_IMPORT_MAX_MB` sets the limit for the whole instance ([Configuration](/configuration#operations)). When a file is too large, the message names the limit and where to change it.
- **Preview and import run in the background.** After the upload the page shows the progress and then the preview or the result. A reverse proxy timeout (such as a 504) no longer cancels the import; keep the page open until it is done. Each person can run one import at a time. While Flowplan creates the pages, the server doesn't answer for a moment – with very large workspaces for longer.
- If there isn't enough memory for a very large workspace, Flowplan refuses the import with a message naming what it needs, instead of crashing. Give Flowplan more memory with `NODE_OPTIONS=--max-old-space-size=<MB>` (e.g. `4096`) in the container, or export the workspace in several parts.
- The file is uploaded only once: the preview keeps it on the server and **Import** uses it. Cancelling deletes it; otherwise it is deleted after six hours at the latest.
- The content is cleaned like when pasting: scripts, forms and embedded foreign pages are dropped. File names are cleaned; files a browser could run (HTML, SVG) are only stored for download.
- Links between imported pages point to the new pages. Images and attachments are uploaded – every file once, even if several pages show it.
- **As a new database**, every note becomes a record with the properties *Tags*, *Created*, *Updated*, *Folder* (the folder path) and – where present – *Source*. As pages, tags become the [page's tags](/page-tags#tags-and-properties); missing ones are created in the workspace.

## From Notion

::: steps

1. In Notion: **Settings → Export** (for the whole workspace) or **Export** in a page's **…** menu. Choose the format **HTML** (recommended) or **Markdown & CSV** and turn on **Include subpages**. Only the HTML export keeps toggles, toggle headings and colours.
2. In Flowplan: **Settings → Import & export → Import**, choose the target space at the top and the ZIP at **Notion, AppFlowy or Markdown export (ZIP)**.
3. Done – the import runs in one step. If it fails, nothing is left half imported.

:::

What it turns into:

- Every HTML or Markdown file becomes a page, every folder named like a page holds its sub-pages. The IDs Notion appends to file and folder names are dropped.
- From the HTML export: toggles become [toggles](/documents#toggles), toggle headings become headings that fold (or, where their content does not reach the next heading, toggles with the heading as their title). Text and background colours, tasks, nested lists, tables, formulas and image captions are kept.
- Every CSV file becomes a database. When both versions are there, Flowplan takes `Name_all.csv` (all records) instead of the current view.
- Properties get their type. From the HTML export, Flowplan reads it from the tables' icons and the rows of the record pages: select and status, multi-select with Notion's colours, date with time and ranges, number with its format, checkbox, URL, e-mail, phone, person (when every name is a member of the workspace); created and last edited time become the record's timestamps. Without HTML, Flowplan recognises numbers, checkboxes, dates (also in Notion's format "September 24, 2026"), selects, multi-selects, links, e-mails and relations from the values; the rest stays text. {since=0.9.7}
- **Relations** point to the imported records – through the record pages' paths, Notion addresses or titles, also between databases of the same export. The export holds formulas and rollups only as values: they come as text and are listed in the [import report](#import-report). {since=0.9.7}
- Record pages are matched to their records as their document. Pages below a record in Notion (the folder named like the record) become its [sub-pages](/databases#sub-pages-of-a-record) – no loose pages and no stand-in pages any more.
- Images and files the pages refer to are uploaded.
- Callouts become [callouts](/formatting#callouts) and keep their emoji as their symbol.
- Links to headings (`Page.md#heading`) lead to the heading; `notion.so` links to pages of the export lead to the imported page (Notion's Markdown has no block ids, so links to single paragraphs lead to the page).
- Large exports that Notion splits into several ZIP files inside the ZIP are recognised.

Limits per import: 100 MB, by default 10,000 pages (`FLOWPLAN_IMPORT_MAX_DOCS`) and 5,000 records per table. Export larger workspaces in parts, for instance page by page.

### Through the Notion API {since=0.9.7}

Instead of an export file, Flowplan can also fetch pages and databases straight from Notion – with the token of an internal integration you create in Notion.

::: steps

1. In Notion, open **notion.so/profile/integrations** and create an **internal** integration for your workspace with **New integration**.
2. Give it the capability **Read content**; with **Read user information**, Flowplan can match person properties to your workspace's members. Copy the secret under **Configuration** – it starts with `ntn_`.
3. In Notion, share the pages and databases with the integration: on the page, **…** at the top right → **Connections** → choose the integration. Sub-pages are included.
4. In Flowplan: **Settings → Import & export → Import**, choose the target space at the top, **Notion (API)** as the source, paste the token into the **Integration token** field and choose **Load shared pages**.
5. **What to import** lists the top-level shared pages and databases, all ticked. Untick what should stay behind, then **Import …**. If the integration sees nothing, Flowplan tells you to share the pages via **Connections** first.

:::

> [!WARNING]
> The token reads everything shared with the integration. Paste it only into the **Integration token** field in Flowplan – nowhere else, not into chats, issues or e-mails either. Flowplan uses it for this import only and neither stores nor logs it. If you no longer need the integration afterwards, delete it in Notion.

The import runs in the background like a file import and fetches everything below the chosen pages: paragraphs, headings (toggle headings too), lists, to-dos, toggles, quotes, callouts, code, equations, dividers, tables, images and files, sub-pages and databases inside pages, synced blocks with the original's content, columns one after the other, page links and mentions as links to the imported pages, text styles and colours, emoji icons and covers. Bookmarks and embeds become links. Files Notion hosts itself are downloaded during the import (up to the limit for the largest file); files from elsewhere stay links. Databases keep their properties' types, options and colours; relations to databases imported along, rollups with calculations Flowplan knows, and formulas Flowplan can read become their counterparts, the rest text – listed in the [import report](#import-report). Notion allows at most three requests a second, so large workspaces take a while.

## From AppFlowy

::: steps

1. In AppFlowy, export pages as **Markdown** and databases as **CSV**.
2. Put the files into one folder – sub-folders become sub-pages – and make a ZIP of it.
3. Import it in Flowplan under **Settings → Import & export → Import**.

:::

Markdown becomes pages, CSV becomes databases; linked images and files come along.

## Import report {since=0.9.7}

What an import could not carry over, or only approximately, Flowplan collects on a page **Import report: …** with 📋 at the top of the target space, such as "Import report: Notion". It is grouped by kind, with the count: **Blocks not carried over**, **Synced blocks (content copied)**, **Embeds and bookmarks kept as links**, **Formulas** and **Rollups without counterpart (values as text)**, **Properties with an approximated type**, **Relations that could not be resolved** and **Files too large, missing or not downloaded** – each item with a link to the page or record concerned. Under **Settings → Import & export** the result names the count with a link to it ("12 notes in the import report"). With nothing to report, no page is created.

The report is written by the Notion import (export and API), the Markdown ZIP import and the imports from AFFiNE, Obsidian, Evernote and BookStack {since=0.9.9} – in the introduction too. It is an ordinary page: work through it and delete it when you are done.

## After the move

- **Check links:** links between imported pages point to the new pages; links to pages outside the export still point to the old tool.
- **Links to blocks and headings are kept.** If a link in the source points to a particular place of another (or the same) page, it points to the same block in Flowplan after the import: a click opens the page and jumps there (see [Links to blocks](/links-and-mentions#links-to-blocks)). If the place cannot be found (for example because the export does not contain it), the link leads to the page.
- **Set up views:** an import creates one table per database. Add board, calendar, gallery or timeline afterwards – see [Views](/views).
- **Sharing:** permissions are not carried over. Invite members or share single pages – see [Sharing and publishing](/sharing).
- **Your data stays portable:** Flowplan exports again at any time as Markdown with frontmatter, CSV and ZIP, scheduled and pushed to Git if you like – see [Import, export and versions](/import-export-versions).

## Why move?

- **Completely open source:** all of the source code is on [GitHub](https://github.com/yannicschuller/flowplan) under the AGPL-3.0 – with no closed enterprise edition and no features behind a licence.
- **Your data, your server:** hosted on flowplan.org in Germany or as one Docker container on your own server – see [Installation](/installation).
- **No tracking.**
