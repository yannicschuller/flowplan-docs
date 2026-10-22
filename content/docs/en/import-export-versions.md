# Import, export and versions

Content comes in as Markdown, CSV or an archive and goes out again as Markdown, PDF or a complete archive. The version history brings back earlier states.

## Export

**Page actions → Export**:

| Format | Content |
| --- | --- |
| **Markdown (.md)** | One file with the page content; databases with an overview, properties and the documents of all records. |
| **Markdown with files (.zip)** | `index.md`, sub-pages under `pages/`, record documents under `records/`, databases also as CSV under `tables/`, attachments under `assets/` – all linked relatively. Every record under `records/` starts with its properties as YAML frontmatter (see below). With **Include comments and earlier versions**, `<file>.comments.md` and `<file>.versions/` come along. |
| **As Word (DOCX)** | A Word document of the page – see [Word, PDF with sub-pages and e-book](#word-pdf-with-sub-pages-and-e-book). |
| **As PDF (with sub-pages)** | The page with its sub-pages as one document with a cover and a table of contents, which the print dialog saves as PDF. |
| **As e-book (EPUB)** | The page with its sub-pages as an e-book for e-readers and e-book apps. |
| **HTML / JSON** | The older format for documents and databases. |

**Print / PDF** opens the browser's print view; save as PDF there. Home screen apps on iPhone and iPad cannot print themselves: they open the page in Safari under a secret address for 15 minutes. This print view shows content only – no form fields, buttons or scripts – and at the top who created it.

The export respects read permissions and contains all records regardless of view filters. Formulas and Mermaid are kept as source.

**Whiteboards** come along in the ZIP as SVG images under `assets/`: a whiteboard page shows its image, and a whiteboard embedded in a document becomes the image with a link to the board in Flowplan. The image is cropped like **Export as SVG** in the board; pictures on the board sit next to it under `assets/`. Covered items stay covered, comment pins are not included; an empty board gives a short note instead of an image. Since SVG is text, Git shows changes to a board as a readable diff. The board cannot be edited outside Flowplan.

Limits per export: 500 pages, 5,000 records, 250 MB of content.

### Word, PDF with sub-pages and e-book

Three more formats for handbooks, reports and everything that is read or edited outside Flowplan. All three start from the same cleaned page content as the Markdown export and respect read permissions in the same way: they contain only what you may read – other people's private records, PIN-locked journals and pictures from pages you may not open stay out (a note stands in for such a picture, and a link to an inaccessible page becomes plain text).

**As Word (DOCX)** – **Page actions → Export → As Word (DOCX)**, for a database also via **Export** in the toolbar, for a single record via the **…** menu in the record's header. The file is written by Flowplan itself, without a Word library, and opens in Word, LibreOffice and Pages:

- Headings (as Word heading styles, so the navigation pane works), paragraphs with alignment, **bold**, *italic*, underline, strikethrough, code, highlights, text colour, superscript and subscript, links.
- Bulleted and numbered lists, also nested, tasks with ☐/☑ and their due date.
- Tables with merged cells and a shaded header row.
- Pictures (PNG, JPEG, GIF, WebP) embedded and scaled to the text width; the page's cover image at the top.
- Callouts (note, tip, important, warning, caution) as shaded paragraphs, quotes with a side line, code blocks, formulas and Mermaid diagrams in a monospace style, toggles with their title, columns one after another.
- Footnotes as real Word footnotes, citations and the bibliography as text.
- A database becomes a table of all records followed by every record's document; a single record starts with its properties as a table.
- Not included: whiteboards, embedded videos, audio, PDFs, link cards and linked databases (they stay links to Flowplan), function plots and metrics (a note), comments and versions.

**As PDF (with sub-pages)** – **Page actions → Export → As PDF (with sub-pages)**: the page with all accessible sub-pages (can be turned off) becomes a print view with a cover, a table of contents and every page as a numbered chapter on a new page; links between the pages jump within the document. As with **Print / PDF**, the browser's print dialog opens – **save as PDF** there. Home screen apps on iPhone and iPad open the view in Safari as usual. Whiteboards come along as pictures, databases as a table with the records' documents. Page numbers in the table of contents and the footer appear only in renderers that know `target-counter` (Prince, Paged.js); browsers leave them out. For scripts: `GET /api/export/pdf?page=<id>&children=1` returns the HTML of the print view.

**As e-book (EPUB)** – **Page actions → Export → As e-book (EPUB)**: the page with its sub-pages as EPUB 3 – every page a chapter, the table of contents nested like the page tree, pictures and whiteboards as resources, links between the pages within the book, footnotes at the end of each chapter. Suitable for Apple Books, Kindle (after conversion), Calibre, Thorium and other readers. For scripts: `GET /api/export/epub?page=<id>&children=1`.

Limits: 200 pages per PDF or EPUB export, 5,000 records, 100 MB of attachments (files over 25 MB are left out). Database tables with more than 200 columns cannot be exported to Word.

### Export a whole space

The download icon next to a space's name in the sidebar (or **Settings → Import & export → Export → One space**) opens the space export. Besides the Markdown ZIP it offers **Space as PDF** (a print view of all pages of the space with a cover and a table of contents, see above) and **Space as e-book (EPUB)** – each with everything you may read, up to 200 pages (`GET /api/export/pdf?space=<id>` or `/api/export/epub?space=<id>`). The Markdown ZIP downloads the whole space as **one** archive – to archive, read offline or put into your own Git repository:

- Every top-level page is in a folder of its own, `<title>-<id>/`, with everything below it – the same layout as the [scheduled Markdown export](/storage-and-backups#markdown-export-and-git). Inside, the format of **Markdown with files (.zip)** applies.
- `index.md` at the top lists the space's pages; links between pages of the space are relative, links into other spaces keep pointing to Flowplan.
- Anyone who can read the space may export it, no administrator needed. It contains only what that person may read: other people's private records and PIN-locked journals stay out, and other people's private spaces cannot be exported.
- **Include comments and earlier versions** works as for the page export; the same limits apply, for the whole space.
- For scripts with a read token: `{"spaceId":"…","format":"zip","history":true}` to `/api/markdown-export` (see [API tokens](/api-and-webhooks)). The space's id is shown in the export dialog.
- Regularly into a Git repository, without a script of your own: the [Git export of a space](/storage-and-backups#git-export-of-a-space), set up by the owner of the space.

### Print and PDF

**Page actions → Print** (or `> print` in the quick search) prints the page as a clean A4 document – in the print dialog it can also be **saved as PDF**. The sidebar, toolbars, handles, comment bars and notices disappear; colours are always light, blocks are not split in the middle of a page, long code lines wrap and external links are written out with their address.

## Import

All imports are under **Settings → Import & export → Import**; at the top you choose the **Target space** once for all of them.

- **Markdown, text or HTML**: **Markdown, text or HTML files**. Headings, lists, tasks, tables, code (also `mermaid`) and formulas become blocks.
- **Notion, AppFlowy or Markdown export**: **Notion, AppFlowy or Markdown export (ZIP)** accepts a ZIP with Markdown and CSV files. Markdown becomes pages, CSV databases, Excalidraw and draw.io files [whiteboards](/whiteboards#import-excalidraw-and-draw-io), folders sub-pages; linked images and files are uploaded, and Notion record pages are matched to their records. Up to 100 MB, 500 pages and 5,000 records per table; you choose the target space beforehand.
- **Jira or Trello**: **Jira or Trello** – see [Projects, tickets and sprints](/projects-and-tickets#import-from-jira-and-trello).
- **CSV**: in a database, choose **Import CSV or Markdown** and pick a CSV file; the rows become records.
- **Markdown with frontmatter into a database** (such as notes from Obsidian): in the database, choose **Import CSV or Markdown** and pick one or more `.md` files or a ZIP – see below.
- **Content archive** (see below).


### Frontmatter: records as Markdown files

Notes from Obsidian, Logseq, Jekyll or Hugo carry their properties as YAML frontmatter at the top of the file:

```markdown
---
para: Resource
area: House
tags: [heating, maintenance]
created: 2026-03-14
---
# Heating – maintenance
…
```

**Import into a database:** every file becomes a record. The title comes from `title:`, otherwise from the first `#` heading or the file name; the rest of the text becomes the record's document, linked images and files from the ZIP are uploaded, and links between the imported files become links to the new records. Keys are matched to properties of the same name (case does not matter):

- select and multi-select take the values and add unknown ones as new options (so `tags:` lands in **Tags**);
- relations find the linked record by its title (also as `[[Title]]`), people by name or e-mail;
- dates are read as ISO dates, `true`/`false` as checkboxes, numbers as numbers;
- `aliases:` (a list or one text, separated by commas) and `alias:` together fill the property of type [Aliases](/properties-and-formulas#aliases), whatever its name; if there is none, **Create missing properties** adds one. A database without an aliases property but with a property named "aliases" gets the values there, as before;
- computed properties (formulas, rollups, timestamps) are not overwritten.

Before the import, a preview shows which properties match and which are missing. **Create missing properties** adds them with a fitting type: list → multi-select, ISO date → date, `true`/`false` → checkbox, number → number, address → URL, a few recurring values → select, otherwise text. Up to 5,000 files and 100 MB per import.

**Export:** in the ZIP export, every record under `records/` starts with `title:` and its properties: select as text, multi-select and relations (titles of the linked records) as lists, dates as ISO dates. Aliases are written under Obsidian's key `aliases:` as a list, so they survive a trip to Obsidian and back. Computed values and the record's id are below `flowplan:` and are skipped on import. When a record exported this way is imported into the same database again, the preview offers **update instead of adding**: the record with the same id gets the file's properties and text, and the previous state stays as a version. Without this choice it is added as a new record.

**Pages:** when a page has [aliases](/pages-and-spaces#aliases), its Markdown file (single page, space export and scheduled export) starts with frontmatter that only holds `aliases:`; pages without aliases keep no frontmatter. The ZIP import under **Settings → Import & export** reads a note's `aliases:`/`alias:` as the aliases of the new page; frontmatter holding nothing but aliases is removed from the text, other frontmatter stays in the text as before. The Git export reads aliases of changed pages back as well.

**Where to export:** in a database's toolbar, **Export** opens a menu with **CSV (current view)**, **Markdown with files (.zip)**, **Markdown (.md)** and **As Word (DOCX)**. A single record is exported from the **…** menu in its header: **Export as Markdown (.md)** (with frontmatter), **Markdown with files (.zip)**, **As Word (DOCX)** (properties as a table, then the document) or **Print / PDF**.

**From Obsidian:** links in the text are read as standard Markdown links. Convert wikilinks (`[[…]]`, `![[…]]`) first – in Obsidian, *Settings → Files and links*, turn off “Use [[Wikilinks]]” and choose relative paths.
## Content archive

Under **Settings → Import & export → Export → Workspace as ZIP** you download a ZIP of your workspace. To bring it back – also into another Flowplan instance – use **Backups → Restore a Flowplan archive**: the archive is created as a copy in new private spaces.

Backing up the whole instance (with accounts and permissions) is up to the administration: **Administration → Storage & backup**. The card **Trash & retention** leads to the trash and says how long things are kept: deleted pages and spaces until someone deletes them permanently, deleted database records 30 days; how long earlier versions stay is set by the administration.

It contains: accessible pages including the trash, databases with views and records, document content, relations, templates, comments, versions, favourites and form options, plus all files with checksums.

The archive only holds what you may see yourself: other people's private records with their comments and files are left out, as are journals behind a PIN you have not unlocked right now. Versions of a database are included only for owners, because they contain every record.

- Importing creates new IDs; internal links and relations are rewritten.
- Imported spaces and templates are private, shares and forms are not active.
- A failed import is rolled back completely.
- Limits: 2 GB ZIP, 500 pages, 20,000 files, 5,000 records per database.

Accounts, sessions and sign-in are not part of it – operations back them up every day with the whole instance.

## Version history

**Page actions → Version history**:

- Documents save automatically at most every five minutes, databases before the first change after ten quiet minutes.
- **Save current version** creates a state at any time; manually saved versions are kept permanently.
- **Changes** compares a version with the current state or with any other version (**Compare with**): added and removed text, for databases new, changed and removed records and properties.
- **The comparison in detail**: it walks the document block by block – headings, paragraphs, list items, table cells, quotes and code stay recognisable as such – and marks the single words inside a changed block: additions green, deletions red and struck through; unchanged blocks are dimmed. A summary states how many words came and went (for example "+120 words · −35 words"), and the arrows jump from change to change, also by keyboard. The same applies to the versions of a record document. Very long documents (more than 60,000 words on both sides together) or versions that differ in too many places are reported as too large to compare; they can still be restored.
- **Bring back single paragraphs**: compared with the current state, every removed or changed paragraph has a **Restore** button. The paragraph returns to its old place with its formatting; the rest of the page stays as it is.
- **Restore** sets the page back to that state. The [authors view](/documents#show-authors) then starts over; the restored text appears as "earlier".

Automatic versions are thinned out to one per day after seven days and deleted after 180 days (adjustable in the administration).
