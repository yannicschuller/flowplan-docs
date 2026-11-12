---
keywords: export, markdown, html, word, docx, e-book, epub, jira, confluence
---

# Export

Export pages, databases and whole spaces as Markdown, HTML, Word, PDF or e-book – and as text for Jira and Confluence.

**Page actions → Export**:

| Format | Content |
| --- | --- |
| **Markdown (.md)** | One file with the page content; databases with an overview, properties and the documents of all records. |
| **Markdown with files (.zip)** | `index.md`, sub-pages under `pages/`, the days of a journal in its folder under `2026/10/2026-10-27.md` (see below), record documents under `records/`, databases also as CSV under `tables/`, attachments under `assets/` – all linked relatively. Every record under `records/` starts with its properties as YAML frontmatter (see below). With **Include comments and earlier versions**, `<file>.comments.md` and `<file>.versions/` come along. |
| **As Word (DOCX)** | A Word document of the page – see [Word, PDF with sub-pages and e-book](#word-pdf-with-sub-pages-and-e-book). |
| **As PDF (with sub-pages)** | The page with its sub-pages as one document with a cover and a table of contents, which the print dialog saves as PDF. |
| **As e-book (EPUB)** | The page with its sub-pages as an e-book for e-readers and e-book apps. |
| **Jira (wiki markup)** | The page as Jira wiki markup to paste into descriptions and comments – see [Jira and Confluence](#jira-and-confluence). |
| **Confluence (storage format)** | The page in Confluence's storage format (XHTML) – see [Jira and Confluence](#jira-and-confluence). |
| **HTML / JSON** | The older format for documents and databases. |

**To the clipboard instead of a file.** For the text formats – Markdown (.md), Jira, Confluence and HTML / JSON – choose between **File** and **Clipboard** under **Destination**. With **Clipboard** the button says **Copy**: the text goes straight to the clipboard, a message confirms it, and you paste it into an e-mail, a chat, a Jira ticket or an editor. HTML also comes along as formatted text, so mail programs and word processors take over headings, lists and tables; a code editor gets the HTML source. Pictures and attachments do not come along – they stay links to Flowplan with their full address and open only for people with access. Flowplan remembers your choice on this device. File formats (Markdown with files, Word, PDF, e-book) are files only. This works in the browser, in the desktop app and in the apps for iPhone, iPad and Android.

**Print / PDF** opens the browser's print view; save as PDF there. First a small window asks for the [print options](/print-and-pdf#print-and-pdf). Home screen apps on iPhone and iPad cannot print themselves: they open the page in Safari under a secret address for 15 minutes. This print view shows content only – no form fields, buttons or scripts – and at the top who created it.

The export respects read permissions and contains all records regardless of view filters. Formulas and Mermaid are kept as source.

**Captions in Markdown**: an image's [caption](/en/formatting#captions) becomes its title, a table's a line `Table: …` below it (as in Pandoc), a code block's `Listing: …`:

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

**Block links in the Markdown export.** Links to blocks become relative links with an anchor in the ZIP, the way Obsidian writes them: `[Project › Goals](<../index.md#^k3x9a2b1>)`. The linked block carries its id as a marker: a paragraph, heading or list item at the end of its line (`Our goals for 2027 ^k3x9a2b1`), any other block (table, code, quote, list …) on a line of its own right below it (`^k3x9a2b1`). Only blocks that a link in the workspace points to are marked – the rest of the Markdown stays clean. Obsidian reads both as block references; other Markdown tools show the short marker as text. On import (ZIP, Obsidian vault, [Git export](/markdown-git-export#push-into-a-git-repository) with taking over changes, **Edit as Markdown**) the marker becomes the block's id again and the links point to it again. Outside a ZIP (a single Markdown file, MCP) the link stays the Flowplan address with `&block=…`.

Limits per export: 500 pages, 200,000 records, 250 MB of content (at most 200 MB of it text); the ZIP may be up to 100 MB. The same limits apply to the [scheduled Markdown export](/markdown-git-export), which backs up whole databases with their comments and versions.

## Word, PDF with sub-pages and e-book

Three more formats for handbooks, reports and everything that is read or edited outside Flowplan. All three start from the same cleaned page content as the Markdown export and respect read permissions in the same way: they contain only what you may read – other people's private records, PIN-locked journals and pictures from pages you may not open stay out (a note stands in for such a picture, and a link to an inaccessible page becomes plain text).

**As Word (DOCX)** – **Page actions → Export → As Word (DOCX)**, for a database also via **Export** in the toolbar, for a single record via the **…** menu in the record's header. The file is written by Flowplan itself, without a Word library, and opens in Word, LibreOffice and Pages:

- Headings (as Word heading styles, so the navigation pane works), paragraphs with alignment, **bold**, *italic*, underline, strikethrough, code, highlights, text colour, superscript and subscript, links.
- Bulleted and numbered lists, also nested, tasks with ☐/☑ and their due date.
- Tables with merged cells and a shaded header row.
- Pictures (PNG, JPEG, GIF, WebP) embedded and scaled to the text width; the page's cover image at the top.
- [Captions](/en/formatting#captions) of images, tables and code in Word's "Caption" style below the block; when the page numbers its captions, the numbers are Word fields (SEQ), so a table of figures in Word picks them up.
- Callouts (note, tip, important, warning, caution) as shaded paragraphs, quotes with a side line, code blocks, formulas and Mermaid diagrams in a monospace style, toggles with their title, columns one after another.
- Footnotes as real Word footnotes, citations and the bibliography as text.
- A database becomes a table of all records followed by every record's document; a single record starts with its properties as a table.
- Not included: whiteboards, embedded videos, audio, PDFs, link cards and linked databases (they stay links to Flowplan), function plots and metrics (a note), comments and versions.

**As PDF (with sub-pages)** – **Page actions → Export → As PDF (with sub-pages)**: the page with all accessible sub-pages (can be turned off) becomes a print view with a cover, a table of contents and every page as a numbered chapter on a new page; links between the pages jump within the document. As with **Print / PDF**, the browser's print dialog opens – **save as PDF** there. Home screen apps on iPhone and iPad open the view in Safari as usual. Whiteboards come along as pictures, databases as a table with the records' documents. Before the print dialog you can choose the title page, table of contents, cover images, page numbers, paper size, fonts and links ([print options](/print-and-pdf#print-and-pdf)). Chrome and Edge put page numbers in the footer; page numbers in the table of contents appear only in renderers that know `target-counter` (Prince, Paged.js). For scripts: `GET /api/export/pdf?page=<id>&children=1` returns the HTML of the print view.

**As e-book (EPUB)** – **Page actions → Export → As e-book (EPUB)**: the page with its sub-pages as EPUB 3 – every page a chapter, the table of contents nested like the page tree, pictures and whiteboards as resources, links between the pages within the book, footnotes at the end of each chapter. Suitable for Apple Books, Kindle (after conversion), Calibre, Thorium and other readers. For scripts: `GET /api/export/epub?page=<id>&children=1`.

Limits: 200 pages per PDF or EPUB export, 5,000 records, 100 MB of attachments (files over 25 MB are left out). Database tables with more than 200 columns cannot be exported to Word.

## Jira and Confluence

Two text formats for teams that work with Atlassian tools. Both export **only the open page** (or a single record), without sub-pages – like **Markdown (.md)**. They respect read permissions like the other exports: pictures from pages you may not open become a note, links to inaccessible pages become text. Links and pictures keep their full address in Flowplan; Jira and Confluence show pictures from Flowplan only while the browser is signed in there.

**Jira (wiki markup)** – to paste into descriptions and comments of Jira Server/Data Center (and Jira Cloud fields that accept wiki markup):

- Headings as `h1.` to `h6.`, `*bold*`, `_italic_`, `-strikethrough-`, `+underline+`, `{{code}}`, superscript and subscript, text colour, links as `[text|address]`.
- Bulleted and numbered lists with `*` and `#`, nested too (`*#`); tasks as `* [ ]` and `* [x]` (cancelled ones struck through).
- Tables with `||head||` and `|cell|`; merged cells become empty cells.
- Code blocks as `{code:language}`, without a language as `{noformat}`; formulas as `{noformat}`, Mermaid as `{code}`.
- Quotes as `{quote}`, callouts as `{info}` (note, important), `{tip}`, `{note}` (warning) and `{warning}` (caution), toggles and meetings as `{panel}`, dividers as `----`.
- Pictures as `!address!`, mentions as the name, footnotes as superscript numbers with a list at the end.
- Characters that would start formatting in Jira (`* _ { } [ ] | ! ^ ~ +`, dashes at the edge of a word, `??`, `(y)` …) are escaped and show exactly as you typed them.

**Confluence (storage format)** – the XHTML Confluence stores its pages in: for the source editor, the REST API (`representation: storage`) or tools that publish to Confluence. Code blocks become the code macro with their language, callouts the info, tip, note and warning macros, toggles "expand", meetings panels, tasks Confluence task lists (with due date), pictures `<ac:image>` with their address in Flowplan. Tables, lists, links, quotes and footnotes stay plain XHTML.

As files the exports are called `<title>.jira.txt` and `<title>.confluence.xhtml`. For scripts: `GET /api/export/jira?page=<id>` or `GET /api/export/confluence?page=<id>`, with `&row=<id>` for a single record of a database; personal API tokens with read access are enough.

## Export a whole space

The download icon next to a space's name in the sidebar (or **Settings → Import & export → Export → One space**) opens the space export. Besides the Markdown ZIP it offers **Space as PDF** (a print view of all pages of the space with a cover and a table of contents, see above) and **Space as e-book (EPUB)** – each with everything you may read, up to 200 pages (`GET /api/export/pdf?space=<id>` or `/api/export/epub?space=<id>`). The Markdown ZIP downloads the whole space as **one** archive – to archive, read offline or put into your own Git repository:

- Every top-level page is in a folder of its own, `<title>-<id>/`, with everything below it – the same layout as the [scheduled Markdown export](/markdown-git-export). Inside, the format of **Markdown with files (.zip)** applies.
- `index.md` at the top lists the space's pages; links between pages of the space are relative, links into other spaces keep pointing to Flowplan.
- Anyone who can read the space may export it, no administrator needed. It contains only what that person may read: other people's private records and PIN-locked journals stay out, and other people's private spaces cannot be exported.
- **Include comments and earlier versions** works as for the page export; the same limits apply, for the whole space.
- For scripts with a read token: `{"spaceId":"…","format":"zip","history":true}` to `/api/markdown-export` (see [API tokens](/api-and-webhooks)). The space's id is shown in the export dialog.
- Regularly into a Git repository, without a script of your own: the [Git export of a space](/markdown-git-export#git-export-of-a-space), set up by the owner of the space.
