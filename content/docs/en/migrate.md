---
keywords: move, import, Notion, AppFlowy, switch, migration
---

# Moving to Flowplan

Flowplan is an open-source alternative to Notion, Confluence and AppFlowy under the AGPL-3.0. This is how you bring over pages, databases, images and files from the tool you use now.

**More on this topic:** [From AFFiNE](/migrate-affine) · [From Confluence, Evernote, Google Docs and Word](/migrate-office) · [From Obsidian and GoodNotes](/migrate-notes)

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

1. In Notion: **Settings → Export** (for the whole workspace) or **Export** in a page's **…** menu. Choose the format **HTML** (recommended) or **Markdown & CSV** and turn on **Include subpages**. Only the HTML export keeps toggles, toggle headings and colours.
2. In Flowplan: **Settings → Import & export → Import**, choose the target space at the top and the ZIP at **Notion, AppFlowy or Markdown export (ZIP)**.
3. Done – the import runs in one step. If it fails, nothing is left half imported.

What it turns into:

- Every HTML or Markdown file becomes a page, every folder named like a page holds its sub-pages. The IDs Notion appends to file and folder names are dropped.
- From the HTML export: toggles become [toggles](/documents#toggles), toggle headings become headings that fold (or, where their content does not reach the next heading, toggles with the heading as their title). Text and background colours, tasks, nested lists, tables, formulas and image captions are kept.
- Every CSV file becomes a database. When both versions are there, Flowplan takes `Name_all.csv` (all records) instead of the current view.
- Columns get a fitting type: numbers, checkboxes, dates (also in Notion's format "September 24, 2026") and selects with their options; the rest stays text.
- Record pages are matched to their records as their document.
- Images and files the pages refer to are uploaded.
- Callouts become [callouts](/formatting#callouts) and keep their emoji as their symbol.
- Links to headings (`Page.md#heading`) lead to the heading; `notion.so` links to pages of the export lead to the imported page (Notion's Markdown has no block ids, so links to single paragraphs lead to the page).
- Large exports that Notion splits into several ZIP files inside the ZIP are recognised.

Limits per import: 100 MB, by default 10,000 pages (`FLOWPLAN_IMPORT_MAX_DOCS`) and 5,000 records per table. Export larger workspaces in parts, for instance page by page.

## From AppFlowy

1. In AppFlowy, export pages as **Markdown** and databases as **CSV**.
2. Put the files into one folder – sub-folders become sub-pages – and make a ZIP of it.
3. Import it in Flowplan under **Settings → Import & export → Import**.

Markdown becomes pages, CSV becomes databases; linked images and files come along.

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
