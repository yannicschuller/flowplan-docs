# Moving from Notion, AppFlowy, AFFiNE, Obsidian, Confluence, Evernote and Google Docs

Flowplan is an open-source alternative to Notion, Confluence and AppFlowy under the AGPL-3.0. This is how you bring over pages, databases, images and files from the tool you use now.

## Confluence, Evernote, Google Docs and Obsidian

Under **Settings → Import & export → Import** choose the target space at the top and, at **AFFiNE, Confluence, Evernote, Google Docs or Obsidian**, the source (or let it be detected) and whether you want a page tree or a **new database**. Then choose the file:

1. Flowplan uploads the file (with a progress bar) and shows a **preview**: how many pages, folders, files (with their size) and tags will be imported, and what will not work – such as encrypted text, unsupported macros or images missing from the export.
2. **Import** creates everything in one step. If something fails, nothing is left half imported.

For all sources:

- End-to-end encrypted spaces cannot be targets (the server sees no plaintext there).
- You need write access to the target space; the workspace's storage quota and your personal limit are checked first (the preview already warns).
- Limits per import: 100 MB, 500 pages (as a database: 5,000 records), 10 MB per file in the ZIP.
- The content is cleaned like when pasting: scripts, forms and embedded foreign pages are dropped. File names are cleaned; files a browser could run (HTML, SVG) are only stored for download.
- Links between imported pages point to the new pages. Images and attachments are uploaded – every file once, even if several pages show it.
- **As a new database**, every note becomes a record with the properties *Tags*, *Created*, *Updated*, *Folder* (the folder path) and – where present – *Source*. As pages, tags appear as `#tag` at the top of the page.

## From Notion

1. In Notion: **Settings → Export** (for the whole workspace) or **Export** in a page's **…** menu. Choose the format **Markdown & CSV** and turn on **Include subpages**.
2. In Flowplan: **Settings → Import & export → Import**, choose the target space at the top and the ZIP at **Notion, AppFlowy or Markdown export (ZIP)**.
3. Done – the import runs in one step. If it fails, nothing is left half imported.

What it turns into:

- Every Markdown file becomes a page, every folder named like a page holds its sub-pages. The IDs Notion appends to file and folder names are dropped.
- Every CSV file becomes a database. When both versions are there, Flowplan takes `Name_all.csv` (all records) instead of the current view.
- Columns get a fitting type: numbers, checkboxes, dates (also in Notion's format "September 24, 2026") and selects with their options; the rest stays text.
- Record pages are matched to their records as their document.
- Images and files the pages refer to are uploaded.
- Large exports that Notion splits into several ZIP files inside the ZIP are recognised.

Limits per import: 100 MB, 500 pages and 5,000 records per table. Export larger workspaces in parts, for instance page by page.

## From AppFlowy

1. In AppFlowy, export pages as **Markdown** and databases as **CSV**.
2. Put the files into one folder – sub-folders become sub-pages – and make a ZIP of it.
3. Import it in Flowplan under **Settings → Import & export → Import**.

Markdown becomes pages, CSV becomes databases; linked images and files come along.

## From AFFiNE

1. In the AFFiNE desktop app, choose the export **Full Backup** (“Export a complete workspace backup”) in the **workspace settings**. This gives a file `Name_….affine` – the whole workspace database with documents, folders, collections, journal and files.
   The web app has no such file; there you export documents as a **Snapshot** (ZIP) – this needs **Enable Snapshot Import Export** switched on under the experimental features of the workspace settings. A snapshot contains documents, databases, whiteboards and files, but no folders, collections or journal dates.
2. In Flowplan: **Settings → Import & Export → Import**, choose the target space and pick the `.affine` file or the snapshot ZIP under **AFFiNE, Confluence, Evernote, Google Docs or Obsidian** (source **AFFiNE** or automatic).
3. The preview shows what comes along: pages, folders, files, tags, whiteboards, databases, collections and days for the journal – and what cannot be imported. **Import** creates everything in one step.

What it becomes:

- **Everything lands below one page** named after the AFFiNE workspace. **Folders** become pages with their documents below them. A document in several folders lives in the first one; the others link to it. Documents outside folders sit directly below the workspace page.
- **Text:** headings, paragraphs, bulleted and numbered lists, **to-dos** with their check mark, toggle lists, quotes, code blocks with their language, callouts (by colour: red → caution, orange/yellow → warning, green → tip, purple → important, otherwise note), dividers, tables, LaTeX (block and inline), bold, italic, underline, strike-through, code, links, text and highlight colours.
- **Links between documents** – in the text (@ references), as linked-doc or synced-doc cards and as AFFiNE app links – point to the imported pages. Synced documents become links.
- **Tags** appear as `#tag` at the top of the page (as a new database: the *Tags* property).
- **Images and attachments** are uploaded and shown in their place (images as images, other files as links). Bookmarks and embeds (YouTube, Figma, GitHub …) become links.
- **Databases** become a database page below their document and appear in the document at the same place as an embedded database. Columns: title, text, number, select, multi-select, date, checkbox, link (URL), progress (number in percent) and created. Rows keep their content as the record's document. Table views stay tables, kanban views become boards by the same column. Image columns are not imported.
- **Whiteboards (edgeless):** a document's text always becomes a document. If its edgeless canvas holds more than the note with the text – shapes, connectors, texts, images, frames, further notes, drawings, mind maps – or AFFiNE opens the document in edgeless mode, a whiteboard **“Name – Whiteboard”** is created next to it. Document and whiteboard are linked: the document starts with a link to the whiteboard, and a card on the whiteboard points to the document (where the note was). Shapes (rectangle, rounded, ellipse, diamond, triangle) with text and colours, connectors (straight, elbow, curved, with arrows and labels, attached to their shapes), texts, brush strokes, images, frames, further notes (as sticky notes), groups and mind maps (nodes as shapes, branches as connectors) come along. Whatever has no counterpart is left out; the preview gives the number.
- **Collections** each become a page **“Collection: Name”** with links to their documents as of the import: those added by hand and those the rules match (tags, created/updated, title, favourites, journal). The rules are written on the page as text. If not every rule can be evaluated (rules on custom properties, for example), only the documents added by hand are listed, with a note. A collection in a folder lives in that folder.
- **Journal:** AFFiNE's journal documents go into the workspace's [journal](/journal), each into the matching day – the journal in the target space, else one in the workspace you may write in; if there is none, the import creates one. A missing day is created; an existing day gets the text appended at the end (under the AFFiNE document's title).
- Documents in AFFiNE's **trash** are not imported. HTML embeds and data views are left out; the preview names them.
- Whiteboards, databases and journal days only come along when importing **as pages**; as a new database every document becomes a record.
- Safety: the file is only read; the size, number and nesting of documents are limited, text never comes in as HTML, and links keep only `http`, `https` and `mailto`.

## From Confluence

1. In Confluence: **Space settings → Export** (Confluence Cloud: **Space settings → Export space**). Choose **HTML** or **XML**, each with all pages.
2. Import the ZIP in Flowplan as above (source **Confluence** or automatic).

What it turns into:

- The space's **page tree** becomes the page tree in Flowplan (from `index.html` or the parent pages in `entities.xml`; where a page is missing there, the breadcrumbs help).
- **Info, tip, note and warning macros** become callouts (info → note, tip → tip, note → warning, warning → caution), **code macros** code blocks, **expand** toggles, **task lists** tasks with their status.
- **Images** and **attachments** are uploaded; attachments the text does not show are listed as links at the end of the page. **Links to other pages** of the space point to the imported pages.
- In the XML export only the current version of each page counts; older versions and blog posts are skipped. Creation and modification dates are kept.
- Macros without a counterpart (such as table of contents or Jira queries) are dropped; the preview names them.

## From Evernote

1. In Evernote, save a notebook via **… → Export notebook** as **ENEX**. Put several notebooks into one ZIP.
2. Import the `.enex` file or the ZIP in Flowplan.

What it turns into:

- Every **note** becomes a page; with several notebooks, every notebook becomes a page with its notes below.
- The note text (ENML) becomes normal text with formatting, lists and tables; **checkboxes** become tasks.
- **Images and attachments** (embedded in the ENEX file) are uploaded and shown where they were in the text; PDFs and other files as links. Attachments without a place in the text go to the end.
- **Tags**, **created**/**updated** and the **source address** are kept – best import as a new database, then they are properties to filter and sort by.
- Encrypted text cannot be imported; the preview warns.

## From Google Docs

1. At [takeout.google.com](https://takeout.google.com) choose **Drive** and set the format for documents to **HTML** (recommended) or **Microsoft Word**. Single documents also work via **File → Download → Web page (.html, zipped)** or **Microsoft Word (.docx)**.
2. Import the Takeout ZIP, the web page ZIP or the `.docx` file in Flowplan (source **Google Docs**).

What it turns into:

- Every document becomes a page, **Drive folders** become parent pages.
- Headings, bold, italic, underline, strike-through, **nested lists**, tables and links come along; Google's redirect links point straight to their target again.
- **Images** are uploaded – including the ones embedded in the HTML.
- Word files: paragraphs, headings, lists (numbered and bulleted, also nested), tables (with merged columns), links and images. Comments, footnotes and headers/footers are dropped.

## From Obsidian and other Markdown folders

- **A vault as pages:** make a ZIP of the vault folder (with its `.obsidian` folder) and import it under **Settings → Import & export → Import** – via **AFFiNE, Confluence, Evernote, Google Docs or Obsidian** with a preview, or via the Notion/Markdown import, which recognises a vault as well.
  - **Folders** become pages with their notes below. A **folder note** (`Projects/Projects.md` or `Projects.md` next to the folder) becomes the folder's page itself.
  - **Wikilinks** `[[Page]]`, `[[Page|text]]`, `[[Folder/Page]]` and `[[Page#Heading]]` become links to the imported pages – resolved like Obsidian does, by path or file name. Links to notes that do not exist stay text.
  - **Embedded files** `![[image.png]]` become images, `![[file.pdf]]` file links; embedded notes `![[Note]]` become links.
  - **Callouts** such as `> [!note]` or `> [!warning] Title` become callouts of the matching kind.
  - **Tags** from the frontmatter (`tags:`) and in the text (`#tag`, not in code) are collected: on pages as `#tag` at the top, in a new database in the *Tags* property – together with *Folder* for where a note came from.
- **Notes with frontmatter into an existing database:** in a database choose **Import CSV or Markdown** and pick the `.md` files or a ZIP. The YAML properties become columns – see [Frontmatter](/import-export-versions#frontmatter-records-as-markdown-files).
- **Aliases:** `aliases: [PAC, Pompe à chaleur]` (or `alias:`) in the frontmatter becomes the page's [aliases](/pages-and-spaces#aliases) or the record's [Aliases](/properties-and-formulas#aliases) property. @ mentions, search and unlinked mentions then also find "Chauffage" by "PAC", and the Markdown export writes them back as `aliases:`.

## After the move

- **Check links:** links between imported pages point to the new pages; links to pages outside the export still point to the old tool.
- **Set up views:** an import creates one table per database. Add board, calendar, gallery or timeline afterwards – see [Views](/views).
- **Sharing:** permissions are not carried over. Invite members or share single pages – see [Sharing and publishing](/sharing).
- **Your data stays portable:** Flowplan exports again at any time as Markdown with frontmatter, CSV and ZIP, scheduled and pushed to Git if you like – see [Import, export and versions](/import-export-versions).

## Why move?

- **Completely open source:** all of the source code is on [GitHub](https://github.com/yannicschuller/flowplan) under the AGPL-3.0 – with no closed enterprise edition and no features behind a licence.
- **Your data, your server:** hosted on flowplan.org in Germany or as one Docker container on your own server – see [Installation](/installation).
- **No tracking.**
