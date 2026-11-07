# Import, export and versions

Content comes in as Markdown, CSV or an archive and goes out again as Markdown, PDF or a complete archive. The version history brings back earlier states.

## Export

**Page actions → Export**:

| Format | Content |
| --- | --- |
| **Markdown (.md)** | One file with the page content; databases with an overview, properties and the documents of all records. |
| **Markdown with files (.zip)** | `index.md`, sub-pages under `pages/`, the days of a journal in its folder under `2026/10/2026-10-27.md` (see below), record documents under `records/`, databases also as CSV under `tables/`, attachments under `assets/` – all linked relatively. Every record under `records/` starts with its properties as YAML frontmatter (see below). With **Include comments and earlier versions**, `<file>.comments.md` and `<file>.versions/` come along. |
| **As Word (DOCX)** | A Word document of the page – see [Word, PDF with sub-pages and e-book](#word-pdf-with-sub-pages-and-e-book). |
| **As PDF (with sub-pages)** | The page with its sub-pages as one document with a cover and a table of contents, which the print dialog saves as PDF. |
| **As e-book (EPUB)** | The page with its sub-pages as an e-book for e-readers and e-book apps. |
| **HTML / JSON** | The older format for documents and databases. |

**Print / PDF** opens the browser's print view; save as PDF there. Home screen apps on iPhone and iPad cannot print themselves: they open the page in Safari under a secret address for 15 minutes. This print view shows content only – no form fields, buttons or scripts – and at the top who created it.

The export respects read permissions and contains all records regardless of view filters. Formulas and Mermaid are kept as source.

**Captions in Markdown**: an image's [caption](/en/documents#captions) becomes its title, a table's a line `Table: …` below it (as in Pandoc), a code block's `Listing: …`:

    ![Alt text](<assets/logo.png> "The Flowplan logo")

    | Item | Amount |
    | --- | --- |
    | Server | €40 |

    Table: Costs at a glance

    ```ts
    const x = 1;
    ```

    Listing: An example

The Markdown import (also ZIP, Git and **Edit as Markdown**) reads these back as captions, as well as Pandoc's short form `: …` below a table. The title of an image from other sources (`![Alt](image.png "Title")`) becomes its caption. A plain paragraph that happens to start with `Table:` or `Listing:` right below a table or code block without a caption is exported as `Table\:` and so stays a paragraph. When the page numbers its captions, the frontmatter says so (`flowplan: captions: numbered`); the numbers themselves are not written into the text, so an import doesn't make them part of the caption.

**Whiteboards** come along in the ZIP as SVG images under `assets/`: a whiteboard page shows its image, and a whiteboard embedded in a document becomes the image with a link to the board in Flowplan. The image is cropped like **Export as SVG** in the board; pictures on the board sit next to it under `assets/`. Covered items stay covered, comment pins are not included; an empty board gives a short note instead of an image. Since SVG is text, Git shows changes to a board as a readable diff. The board cannot be edited outside Flowplan.

**Journal days** sort by path in the ZIP, in their journal's folder: `2026/10/2026-10-27.md` next to the `index.md` of an exported journal, for a journal below another page under `pages/<title>-<id>/2026/10/…`. The heading is the day's title in the export's language ("Tuesday, 27 October 2026"; a renamed day keeps its title), the frontmatter names id and date (`flowplan: id, date`). This applies to the page and space export, the scheduled export and Git. The ZIP import turns them back into a journal with its days, without folder pages "2026" or "10"; a second file of the same date does not become a second day.

**Block links in the Markdown export.** Links to blocks become relative links with an anchor in the ZIP, the way Obsidian writes them: `[Project › Goals](<../index.md#^k3x9a2b1>)`. The linked block carries its id as a marker: a paragraph, heading or list item at the end of its line (`Our goals for 2027 ^k3x9a2b1`), any other block (table, code, quote, list …) on a line of its own right below it (`^k3x9a2b1`). Only blocks that a link in the workspace points to are marked – the rest of the Markdown stays clean. Obsidian reads both as block references; other Markdown tools show the short marker as text. On import (ZIP, Obsidian vault, [Git export](/storage-and-backups#push-into-a-git-repository) with taking over changes, **Edit as Markdown**) the marker becomes the block's id again and the links point to it again. Outside a ZIP (a single Markdown file, MCP) the link stays the Flowplan address with `&block=…`.

Limits per export: 500 pages, 200,000 records, 250 MB of content (at most 200 MB of it text); the ZIP may be up to 100 MB. The same limits apply to the [scheduled Markdown export](/storage-and-backups#markdown-export-and-git), which backs up whole databases with their comments and versions.

### Word, PDF with sub-pages and e-book

Three more formats for handbooks, reports and everything that is read or edited outside Flowplan. All three start from the same cleaned page content as the Markdown export and respect read permissions in the same way: they contain only what you may read – other people's private records, PIN-locked journals and pictures from pages you may not open stay out (a note stands in for such a picture, and a link to an inaccessible page becomes plain text).

**As Word (DOCX)** – **Page actions → Export → As Word (DOCX)**, for a database also via **Export** in the toolbar, for a single record via the **…** menu in the record's header. The file is written by Flowplan itself, without a Word library, and opens in Word, LibreOffice and Pages:

- Headings (as Word heading styles, so the navigation pane works), paragraphs with alignment, **bold**, *italic*, underline, strikethrough, code, highlights, text colour, superscript and subscript, links.
- Bulleted and numbered lists, also nested, tasks with ☐/☑ and their due date.
- Tables with merged cells and a shaded header row.
- Pictures (PNG, JPEG, GIF, WebP) embedded and scaled to the text width; the page's cover image at the top.
- [Captions](/en/documents#captions) of images, tables and code in Word's "Caption" style below the block; when the page numbers its captions, the numbers are Word fields (SEQ), so a table of figures in Word picks them up.
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

- **Markdown, text or HTML**: **Markdown, text or HTML files**. Headings, lists, tasks, tables, code and formulas become blocks; Mermaid code (` ```mermaid `, in HTML `<pre><code class="language-mermaid">` or `<div class="mermaid">`) becomes a code block that shows the diagram – the code is one click away ([preview](/en/documents#formulas-diagrams-and-code)). This applies to every import, including AFFiNE, Notion, Obsidian, Confluence (the language of code macros) and pasted Markdown. Image titles and `Table:`/`Listing:` lines become [captions](/en/documents#captions), in HTML `<figure>`/`<figcaption>` and `<caption>`. The AFFiNE import takes over the captions of images and code blocks.
- **Notion, AppFlowy or Markdown export**: **Notion, AppFlowy or Markdown export (ZIP)** accepts a ZIP with Markdown and CSV files. Markdown becomes pages, CSV databases, days of a Flowplan journal (`…/2026/10/2026-10-27.md` below the journal) days of that journal again, Excalidraw and draw.io files [whiteboards](/whiteboards#import-excalidraw-and-draw-io), folders sub-pages; linked images and files are uploaded, and Notion record pages are matched to their records. Up to 100 MB, by default 10,000 pages (`FLOWPLAN_IMPORT_MAX_DOCS`) and 5,000 records per table; you choose the target space beforehand.
- **Jira or Trello**: **Jira or Trello** – see [Projects, tickets and sprints](/projects-and-tickets#import-from-jira-and-trello).
- **CSV**: in a database, choose **Import CSV or Markdown** and pick a CSV file; the rows become records. A CSV exported from Flowplan comes back as it was: text that looks like a formula (`=…`, `+…`, `@…`) gets a protective apostrophe on export, which the import removes again; tags containing a comma (such as “Night, Weekend”) stay one tag when the column's options include it.
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

When importing records (Markdown, CSV) into a [multi-select with the workspace's tags](/databases#multi-select-with-the-workspace-tags), the values stay names; missing tags are created if you may create tags (members with edit rights) – otherwise such values are left out.

Before the import, a preview shows which properties match and which are missing. **Create missing properties** adds them with a fitting type: list → multi-select, ISO date → date, `true`/`false` → checkbox, number → number, address → URL, a few recurring values → select, otherwise text. Up to 5,000 files and 100 MB per import.

**Export:** in the ZIP export, every record under `records/` starts with `title:` and its properties: select as text, multi-select and relations (titles of the linked records) as lists, dates as ISO dates. Aliases are written under Obsidian's key `aliases:` as a list, so they survive a trip to Obsidian and back. Computed values and the record's id are below `flowplan:` and are skipped on import. When a record exported this way is imported into the same database again, the preview offers **update instead of adding**: the record with the same id gets the file's properties and text, and the previous state stays as a version. Without this choice it is added as a new record.

**Pages:** a page's [aliases](/pages-and-spaces#aliases), [tags and properties](/pages-and-spaces#tags-and-properties) are written by the Markdown export (single page, space export, scheduled export and Git export) as frontmatter at the top of the file – the way Obsidian reads them:

```markdown
---
tags:
  - Customer
  - Offer
Status: Sent
Budget: 12500
Due: 2026-12-01
Owner: Emil Example
---
# Offer Müller Ltd
```

People appear by name, multi-selects as a list, checkboxes as `true`/`false`; the automatic properties (created at …) are left out. Pages without aliases, tags and values keep no frontmatter.

When importing Markdown files, Markdown ZIPs and Obsidian vaults under **Settings → Import & export**, `aliases:`/`alias:` becomes the new page's aliases and `tags:` (or `tag:`, as a list or “a, b”) its tags; missing tags are created. Further keys become properties: if the workspace already has a property with that name, the page gets its value there. Unknown keys are created as new properties only by workspace **owners** – the type follows the value (`true` → checkbox, number → number, `2026-12-01` → date, list → multi-select, URL, email, otherwise text). Keys of publishing tools (`cssclass`, `publish`, `permalink`, `layout`, `slug`, `draft` …) never become properties. When the whole frontmatter is taken over, it disappears from the text; otherwise it stays in the text as before. The Git export reads aliases, tags and values of changed pages back from the repository.

**Where to export:** in a database's toolbar, **Export** opens a menu with **CSV (current view)**, **Markdown with files (.zip)**, **Markdown (.md)** and **As Word (DOCX)**. A single record is exported from the **…** menu in its header: **Export as Markdown (.md)** (with frontmatter), **Markdown with files (.zip)**, **As Word (DOCX)** (properties as a table, then the document) or **Print / PDF**.

**From Obsidian:** links in the text are read as standard Markdown links. Convert wikilinks (`[[…]]`, `![[…]]`) first – in Obsidian, *Settings → Files and links*, turn off “Use [[Wikilinks]]” and choose relative paths.
## Content archive

Under **Settings → Import & export → Export → Workspace as ZIP** you download a ZIP of your workspace. To bring it back – also into another Flowplan instance – use **Backups → Restore a Flowplan archive**: the archive is created as a copy in new private spaces.

Backing up the whole instance (with accounts and permissions) is up to the administration: **Administration → Storage & backup**. The card **Trash & retention** leads to the trash and says how long things are kept: deleted pages and spaces until someone deletes them permanently, deleted database records 30 days; how long earlier versions stay is set by the administration.

It contains: accessible pages including the trash, databases with views and records, document content, relations, templates, comments, versions, favourites and form options, plus all files with checksums. Also the settings of databases (done rule, workflow, automations, sprints, story points – never the Git token), time entries and the status history behind burndown charts, the settings and trackers of journals with each day's values and place, handwriting on PDFs and your [home page](/first-steps#customize-your-home-page) (applied only when the person importing has none of their own yet).

The workspace's tags and properties (unused ones too) and every page's tags and values come along as well. Importing creates missing tags, and missing properties only if you own the target workspace; existing ones with the same name are reused.

The archive only holds what you may see yourself: other people's private records with their comments and files are left out, as are journals behind a PIN you have not unlocked right now. Versions of a database are included only for owners, because they contain every record. Each version holds the whole database; when not all of them fit into the archive of a large database, the newest come along and older ones stay behind – the current records are always included.

- Importing creates new IDs; internal links and relations are rewritten – embedded whiteboards, synced blocks, metrics, drawing blocks and records on whiteboard cards too.
- If the archive comes from someone else, their assignments and mentions become yours; tasks in documents show under **My tasks** right away.
- Older archives import as before; older servers skip what they do not know.
- Imported spaces and templates are private, shares and forms are not active.
- A failed import is rolled back completely.
- Limits: 2 GB ZIP, 20,000 files, 50,000 pages, 200,000 records per database and 30 MB for pages, records, comments and versions without the files – depending on the content, enough for around 50,000 records.

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
