# Moving from Notion, AppFlowy, AFFiNE, Obsidian, Confluence, Evernote, Google Docs, Microsoft Word and OneNote

Flowplan is an open-source alternative to Notion, Confluence and AppFlowy under the AGPL-3.0. This is how you bring over pages, databases, images and files from the tool you use now.

## Confluence, Evernote, Google Docs and Obsidian

Under **Settings → Import & export → Import** choose the target space at the top and, at **AFFiNE, Confluence, Evernote, Google Docs, Microsoft Word or Obsidian**, the source (or let it be detected) and whether you want a page tree or a **new database**. Then choose the file:

1. Flowplan uploads the file (with a progress bar) and shows a **preview**: how many pages, folders, files (with their size) and tags will be imported, and what will not work – such as encrypted text, unsupported macros or images missing from the export.
2. **Import** creates everything in one step. If something fails, nothing is left half imported.

For all sources:

- End-to-end encrypted spaces cannot be targets (the server sees no plaintext there).
- You need write access to the target space; the workspace's storage quota and your personal limit are checked first (the preview already warns).
- Limits per import: by default 10,000 pages (documents, folders, databases, whiteboards and collections each count as a page; as a database: 10,000 records) and 20,000 files, 5,000 records per table, 10 MB per file in the ZIP. The operator sets pages and files with `FLOWPLAN_IMPORT_MAX_DOCS` and `FLOWPLAN_IMPORT_MAX_FILES` ([Configuration](/configuration#operations)). When a file brings more pages, the preview shows how many, names the limit and the variable, and **Import** stays disabled; files above the limit are left out (the preview says how many). ZIP exports and single files may be up to 100 MB. The **AFFiNE workspace file (`.affine`)** may be as large as the **largest upload** (Administration → [Limits & retention](/administration#limits-retention), can differ per person), but at least 100 MB; `FLOWPLAN_IMPORT_MAX_MB` sets the limit for the whole instance ([Configuration](/configuration#operations)). When a file is too large, the message names the limit and where to change it.
- The file is uploaded only once: the preview keeps it on the server and **Import** uses it. Cancelling deletes it; otherwise it is deleted after six hours at the latest.
- The content is cleaned like when pasting: scripts, forms and embedded foreign pages are dropped. File names are cleaned; files a browser could run (HTML, SVG) are only stored for download.
- Links between imported pages point to the new pages. Images and attachments are uploaded – every file once, even if several pages show it.
- **As a new database**, every note becomes a record with the properties *Tags*, *Created*, *Updated*, *Folder* (the folder path) and – where present – *Source*. As pages, tags become the [page's tags](/pages-and-spaces#tags-and-properties); missing ones are created in the workspace.

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
- Callouts become [callouts](/documents#callouts) and keep their emoji as their symbol.
- Links to headings (`Page.md#heading`) lead to the heading; `notion.so` links to pages of the export lead to the imported page (Notion's Markdown has no block ids, so links to single paragraphs lead to the page).
- Large exports that Notion splits into several ZIP files inside the ZIP are recognised.

Limits per import: 100 MB, by default 10,000 pages (`FLOWPLAN_IMPORT_MAX_DOCS`) and 5,000 records per table. Export larger workspaces in parts, for instance page by page.

## From AppFlowy

1. In AppFlowy, export pages as **Markdown** and databases as **CSV**.
2. Put the files into one folder – sub-folders become sub-pages – and make a ZIP of it.
3. Import it in Flowplan under **Settings → Import & export → Import**.

Markdown becomes pages, CSV becomes databases; linked images and files come along.

## From AFFiNE

1. In the AFFiNE desktop app, choose the export **Full Backup** (“Export a complete workspace backup”) in the **workspace settings**. This gives a file `Name_….affine` – the whole workspace database with documents, folders, collections, journal and files.
   The web app has no such file; there you export documents as a **Snapshot** (ZIP) – this needs **Enable Snapshot Import Export** switched on under the experimental features of the workspace settings. A snapshot contains documents, databases, whiteboards and files, but no folders, collections, journal dates, properties or icons. Only snapshots from AFFiNE versions up to the end of 2024 (with an `info.json` file) contain tags; newer versions no longer write tags into snapshots. To bring tags, properties and icons along, use the workspace file (`.affine`) – the preview points this out.
2. In Flowplan: **Settings → Import & Export → Import**, choose the target space and pick the `.affine` file or the snapshot ZIP under **AFFiNE, Confluence, Evernote, Google Docs or Obsidian** (source **AFFiNE** or automatic).
3. The preview shows what comes along: pages, folders, files, tags, properties, page icons, whiteboards, databases, collections, days for the journal and how many documents become the content of database records – and what cannot be imported. **Import** creates everything in one step.

What it becomes:

- **Where it goes:** a workspace file (`.affine`) with several items at the top – folders, documents outside folders, collections – arrives below **one page named after the AFFiNE workspace**; the preview names it (“Everything below a page …”). A **snapshot** and a workspace with a single item at the top go **straight into the target space** – no empty page above them. A whiteboard counts with its document; journal documents go into the journal.
- **Folders** become pages with their documents below them. A document in several folders lives in the first one; the others link to it. Documents outside folders sit at the top level – below the workspace page, if there is one.
- **Text:** headings, paragraphs, bulleted and numbered lists, **to-dos** with their check mark, toggle lists, quotes, code blocks with their language, callouts (kind by colour: red → caution, orange/yellow → warning, green → tip, purple → important, otherwise note; their emoji becomes the [callout's symbol](/documents#your-own-symbol-and-colour)), dividers, tables, LaTeX (block and inline), bold, italic, underline, strike-through, code, links, text and highlight colours.
- **Links between documents** – in the text (@ references), as linked-doc or synced-doc cards and as AFFiNE app links – point to the imported pages. Synced documents become links. References to a block (references and doc cards with a block, app links with `?blockIds=`) lead to that block; references to shapes on the canvas (`elementIds`) lead to the page.
- **Tags** become the page's tags, with their colours from AFFiNE (as a new database: the *Tags* property).
- **Properties** of a document (text, number, checkbox, date) become [page properties](/pages-and-spaces#tags-and-properties) of the same name; missing ones are created by the import if you may manage the workspace. Deleted properties and AFFiNE's own fields (created by, mode, template …) are left out.
- **Icons:** an emoji as the icon of a document, folder or collection becomes the page's icon. Icons from AFFiNE's own icon library have no counterpart; the preview gives their number.
- **Images and attachments** are uploaded and shown in their place – as when uploading in the editor: images as images, **PDFs with a preview** (they open in the viewer), **audio and video with a player**, other files as links. Bookmarks and embeds (YouTube, Figma, GitHub …) become links.
- **Databases** become a database page below their document and appear in the document at the same place as an embedded database. Columns: title, text, number, select, multi-select, date, checkbox, link (URL), progress (number in percent) and created. Rows keep their content as the record's document. Table views stay tables, kanban views become boards by the same column. Columns keep the order of the AFFiNE view (not the order they were created in); hidden columns stay hidden and column widths are kept (80 to 800 pixels). Image columns are not imported.
- **Documents made from database rows:** if you turned a row of a database into a document of its own in AFFiNE (the row's title is then a reference to the document), that document becomes the **record's content** – text, images, attachments, embedded databases and links, as for any page. It gets **no page of its own**; links to the document (in text, as cards, from collections and on whiteboards) lead to the record, and a folder that held the document lists a link to it. The record keeps the row's title and columns; if the title is nothing but the reference, it takes the document's title. This also applies when the row's only content is the card of a linked or synced document, and to snapshots that contain the document.
  - If such a document consists of nothing but a database (in AFFiNE a database always lives in a document), the record shows that database as an embedded view, and the database itself sits **below the record's database page** – records have no subpages. Documents linked only from such records also go below the database instead of the top of the space, and databases that sit only on a document's whiteboard in AFFiNE become database pages below their document.
- **Templates:** documents marked as templates in AFFiNE become [workspace templates](/templates#your-own-templates) (category *Other*, with emoji and tags) instead of pages; a document that is only a database becomes a database template. Links to a template become text. Only the workspace file (`.affine`) says whether a document is a template – from a snapshot, templates become ordinary pages. If you may not edit the workspace, the templates are saved as "Only me". The import preview shows how many there are.
  - From the workspace file (`.affine`) the document's **emoji icon** (as the record's icon) comes along, its **tags** go into a multi-select column **“Tags”** (or “Schlagwörter”) of the database, and its **properties** into columns of the same name and a matching type where the row has no value – values in the row's own columns always stay as they are. If the database has no such column, the tags or properties are left out; the preview gives their number.
  - If **several rows** refer to the same document, the first one (in the order of the import) gets the content; the others keep their own content and start with a link to that record. A **journal document** stays a day in the journal, and a row that refers to the document holding its own database only gets a link.
  - The document's own databases are created where the document was (in its folder or at the top) and stay embedded in the record; a whiteboard of the document is placed there too, and its card points to the record.
  - When importing **as a new database**, databases are left out; such documents then become records of the new database like all others.
- **Whiteboards (edgeless):** a document's text always becomes a document. If its edgeless canvas holds more than the note with the text – shapes, connectors, texts, images, frames, further notes, drawings, mind maps – or AFFiNE opens the document in edgeless mode, a whiteboard **“Name – Whiteboard”** is created next to it. Document and whiteboard are linked: the document starts with a link to the whiteboard, and a card on the whiteboard points to the document (where the note was). Shapes (rectangle, rounded, ellipse, diamond, triangle) with text and colours, connectors (straight, elbow, curved, with arrows and labels, attached to their shapes), texts, brush strokes, images, frames, further notes (as sticky notes), groups and mind maps (nodes as shapes, branches as connectors) come along. Whatever has no counterpart is left out; the preview gives the number.
- **Collections** each become a page **“Collection: Name”** with links to their documents as of the import: those added by hand and those the rules match (tags, created/updated, title, favourites, journal). The rules are written on the page as text. If not every rule can be evaluated (rules on custom properties, for example), only the documents added by hand are listed, with a note. A collection in a folder lives in that folder.
- **Journal:** AFFiNE's journal documents go into the workspace's [journal](/journal), each into the matching day – the journal in the target space, else one in the workspace you may write in; if there is none, the import creates one. A missing day is created; an existing day gets the text appended at the end (under the AFFiNE document's title).
- Documents in AFFiNE's **trash** are not imported. HTML embeds and data views are left out; the preview names them.
- Whiteboards, databases and journal days only come along when importing **as pages**; as a new database every document becomes a record.
- **Large workspaces:** the `.affine` file may be larger than 100 MB (see the [limits above](#confluence-evernote-google-docs-and-obsidian)). The server writes it straight to disk while it is uploaded, reads the documents one at a time while converting them, and images and attachments one at a time while writing them – memory only ever holds one document and one file. Workspaces with thousands of documents go in one import (up to `FLOWPLAN_IMPORT_MAX_DOCS`, 10,000 pages by default); folders nested deeper than 50 levels are merged into the level above. A reverse proxy in front must let such large requests through (see [Coolify and reverse proxies](/coolify-and-proxy#pangolin-traefik-and-other-proxies)).
- Safety: the file is only read; the size, number and nesting of documents are limited, text never comes in as HTML, and links keep only `http`, `https` and `mailto`.

## From Confluence

1. In Confluence: **Space settings → Export** (Confluence Cloud: **Space settings → Export space**). Choose **HTML** or **XML**, each with all pages.
2. Import the ZIP in Flowplan as above (source **Confluence** or automatic).

What it turns into:

- The space's **page tree** becomes the page tree in Flowplan (from `index.html` or the parent pages in `entities.xml`; where a page is missing there, the breadcrumbs help).
- **Info, tip, note and warning macros** become callouts (info → note, tip → tip, note → warning, warning → caution), **code macros** code blocks, **expand** toggles, **task lists** tasks with their status.
- **Images** and **attachments** are uploaded; attachments the text does not show are listed as links at the end of the page. **Links to other pages** of the space point to the imported pages. Anchor links (`Page.html#Page-Heading`, `#…` on the same page, `ac:anchor` in the XML export) lead to the heading or anchor.
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
2. Import the Takeout ZIP, the web page ZIP or the `.docx` file in Flowplan (source **Google Docs**; single `.docx` files also work with [Microsoft Word](#from-microsoft-word)).

What it turns into:

- Every document becomes a page, **Drive folders** become parent pages.
- Headings, bold, italic, underline, strike-through, **nested lists**, tables and links come along; Google's redirect links point straight to their target again. Links to headings and bookmarks in the same document (`#h.…`, `#kix.…`) stay links to that place.
- **Images** are uploaded – including the ones embedded in the HTML.
- Word files: paragraphs, headings, lists (numbered and bulleted, also nested), tables (with merged columns), links and images. Comments, footnotes and headers/footers are dropped.

## From Microsoft Word

Import Word documents (`.docx`) under **Settings → Import & export → Import** with the source **Microsoft Word** (a `.docx` file is also detected automatically):

- **One document:** choose the `.docx` file. It becomes a page titled by its file name.
- **Several documents:** put the `.docx` files into a ZIP and choose the ZIP. Every document becomes a page, **folders** in the ZIP become parent pages. When everything sits in a single folder, that folder is left out.

Paragraphs, headings, bold, italic, underline, strike-through, lists (numbered and bulleted, also nested), tables (with merged columns), links and images come along. Comments, footnotes, headers and footers are dropped. Word's lock files (`~$….docx`) are skipped.

**Older Word files (`.doc`, Word 97–2003)** cannot be read by Flowplan. Open the file in Word, LibreOffice or Pages and save it as `.docx`, then import it. When a ZIP holds `.doc` or OneNote files next to `.docx` files, the `.docx` files are imported and the others are listed in the preview with the reason.

### OneNote

Flowplan does not read OneNote files (`.one`, `.onetoc2`, `.onepkg`) directly – it recognises them and tells you what to do. The way goes through OneNote's own export:

1. In OneNote for Windows, open the page or section and choose **File → Export**, with **Word Document (.docx)** as the format.
2. Import the `.docx` file (or several as a ZIP) in Flowplan with **Microsoft Word**.

If your version of OneNote offers no export as a Word document but only PDF, upload the PDF as a file to a page.

## From Obsidian and other Markdown folders

- **A vault as pages:** make a ZIP of the vault folder (with its `.obsidian` folder) and import it under **Settings → Import & export → Import** – via **AFFiNE, Confluence, Evernote, Google Docs, Microsoft Word or Obsidian** with a preview, or via the Notion/Markdown import, which recognises a vault as well.
  - **Folders** become pages with their notes below. A **folder note** (`Projects/Projects.md` or `Projects.md` next to the folder) becomes the folder's page itself.
  - **Wikilinks** `[[Page]]`, `[[Page|text]]`, `[[Folder/Page]]` and `[[Page#Heading]]` become links to the imported pages – resolved like Obsidian does, by path or file name. Links to notes that do not exist stay text.
  - `[[Page#Heading]]`, `[[Page#^id]]`, `[[#Heading]]` and Markdown links with `#^id` become links to that heading or block; the `^id` markers at line ends leave the text and become the block's id.
  - **Embedded files** `![[image.png]]` become images, `![[file.pdf]]` file links; embedded notes `![[Note]]` become links.
  - **Callouts** such as `> [!note]` or `> [!warning] Title` become callouts of the matching kind.
  - **Tags** from the frontmatter (`tags:`) and in the text (`#tag`, not in code) are collected: on pages as the page's tags, in a new database in the *Tags* property – together with *Folder* for where a note came from. Further frontmatter keys become [properties](/import-export-versions#frontmatter-records-as-markdown-files) on pages.
- **Notes with frontmatter into an existing database:** in a database choose **Import CSV or Markdown** and pick the `.md` files or a ZIP. The YAML properties become columns – see [Frontmatter](/import-export-versions#frontmatter-records-as-markdown-files).
- **Aliases:** `aliases: [PAC, Pompe à chaleur]` (or `alias:`) in the frontmatter becomes the page's [aliases](/pages-and-spaces#aliases) or the record's [Aliases](/properties-and-formulas#aliases) property. @ mentions, search and unlinked mentions then also find "Chauffage" by "PAC", and the Markdown export writes them back as `aliases:`.

## After the move

- **Check links:** links between imported pages point to the new pages; links to pages outside the export still point to the old tool.
- **Links to blocks and headings are kept.** If a link in the source points to a particular place of another (or the same) page, it points to the same block in Flowplan after the import: a click opens the page and jumps there (see [Links to blocks](/documents#links-to-blocks)). If the place cannot be found (for example because the export does not contain it), the link leads to the page.
- **Set up views:** an import creates one table per database. Add board, calendar, gallery or timeline afterwards – see [Views](/views).
- **Sharing:** permissions are not carried over. Invite members or share single pages – see [Sharing and publishing](/sharing).
- **Your data stays portable:** Flowplan exports again at any time as Markdown with frontmatter, CSV and ZIP, scheduled and pushed to Git if you like – see [Import, export and versions](/import-export-versions).

## Why move?

- **Completely open source:** all of the source code is on [GitHub](https://github.com/yannicschuller/flowplan) under the AGPL-3.0 – with no closed enterprise edition and no features behind a licence.
- **Your data, your server:** hosted on flowplan.org in Germany or as one Docker container on your own server – see [Installation](/installation).
- **No tracking.**
