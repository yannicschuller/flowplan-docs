---
keywords: Confluence, BookStack, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, import
---

# From Confluence, BookStack, Evernote, Google Docs and Word

Step by step from Confluence, BookStack, Evernote, Google Docs, Microsoft Word and OneNote to Flowplan – with the page tree, images and attachments.

## From Confluence

::: steps

1. In Confluence: **Space settings → Export** (Confluence Cloud: **Space settings → Export space**). Choose **HTML** or **XML**, each with all pages.
2. Import the ZIP in Flowplan as above (source **Confluence** or automatic).

:::

What it turns into:

- The space's **page tree** becomes the page tree in Flowplan (from `index.html` or the parent pages in `entities.xml`; where a page is missing there, the breadcrumbs help).
- **Info, tip, note and warning macros** become callouts (info → note, tip → tip, note → warning, warning → caution), **code macros** code blocks, **expand** toggles, **task lists** tasks with their status.
- **Images** and **attachments** are uploaded; attachments the text does not show are listed as links at the end of the page. **Links to other pages** of the space point to the imported pages. Anchor links (`Page.html#Page-Heading`, `#…` on the same page, `ac:anchor` in the XML export) lead to the heading or anchor.
- In the XML export only the current version of each page counts; older versions and blog posts are skipped. Creation and modification dates are kept.
- Macros without a counterpart (such as table of contents or Jira queries) are dropped; the preview names them.

## From BookStack {since=0.9.9}

Flowplan brings pages over from BookStack once, through BookStack's REST API – without an export file, with shelves, books, chapters, images, attachments and tags. There is no ongoing sync: what you change in BookStack afterwards does not come over.

::: steps

1. In BookStack, your account's role needs the permission **Access system API** (**Settings → Roles**, among the system permissions). Exactly what your account may see is imported.
2. In your profile (top right → **My Account** → **Access & Security**, in older versions **Edit Profile**), create a token under **API Tokens** with **Create Token** and copy the **Token ID** and **Token Secret** – BookStack shows the secret only once.
3. In Flowplan: **Settings → Import & export → Import**, choose the target space at the top, **BookStack (API)** as the source, enter the **BookStack address** (such as `https://wiki.example.org`, also with a path like `https://example.org/wiki`), the **Token ID** and **Token secret** and choose **Load shelves and books**.
4. **What to import** lists the shelves with their books and the **Books without a shelf**, all ticked. Untick what should stay behind – ticking or unticking a shelf takes its books along –, then **Check**.
5. The **preview** counts shelves, books, chapters, pages, images, attachments and tags and names notes, such as books on several shelves. **Import** creates everything; then the first imported page opens.

:::

> [!WARNING]
> The token may do everything your account may do in BookStack. Enter it only into the **Token ID** and **Token secret** fields in Flowplan – nowhere else. Flowplan sends it only to the address you gave, uses it for this import only and neither stores nor logs it. If you no longer need it afterwards, delete it in BookStack.

### What it becomes {since=0.9.9}

- Each **shelf** becomes a top-level page with its **books** below it, in the shelf's order. A book on several shelves comes only once, below the first (shelves by name); the preview names these books. Books on no shelf become top-level pages.
- **Chapters** become sub-pages of their book, **pages** sub-pages of their chapter or book – in BookStack's order. The **description** of a shelf, book or chapter becomes the text of its page.
- **Content:** headings, lists, task lists, tables, code blocks with their language, quotes, collapsible blocks and callouts (info, success, warning, danger become note, tip, warning and caution) become their blocks. Pages from the Markdown editor come through their Markdown as long as it holds no HTML, otherwise through their HTML like the others.
- **Images** from BookStack (gallery and draw.io drawings, in original size) and **file attachments** are downloaded and stored as files of the page, each at most as large as the largest upload. Attachments linked in the text link to the file, the others are listed below the text; **link attachments** stay links, images from other addresses stay where they are. What cannot be downloaded is named as a note in the result and in the [import report](/migrate#import-report) – the import carries on regardless.
- **Links** to pages (`/books/…/page/…`, `/link/123`), chapters, books and shelves of the import lead to the new pages, links to a paragraph (`#bkmrk-…`) to the same block. Links to anything not imported stay links to BookStack.
- **Tags** become [tags of the page](/page-tags#tags-and-properties): `name` stays `name`, a tag with a value becomes `name: value`.
- Drafts, earlier revisions, comments, permissions and the recycle bin are not imported; templates come as ordinary pages.

### Time and limits {since=0.9.9}

Preview and import run in the background, one at a time per person; the preview does not download images and attachments yet. BookStack limits API requests per minute (180 by default) – when it answers "too many requests", Flowplan waits as long as asked (at most a minute per request). A few hundred pages therefore take a few minutes. The limits of every import apply (`FLOWPLAN_IMPORT_MAX_DOCS`, `FLOWPLAN_IMPORT_MAX_FILES`); shelves, books and chapters count as pages.

### BookStack in your own network {since=0.9.9}

For the import, Flowplan only calls public HTTPS addresses. If BookStack runs in your local network or a VPN (such as `http://192.168.1.20`), the administration has to set `FLOWPLAN_IMPORT_ALLOW_PRIVATE=true` ([Configuration](/configuration#operations)) – then internal addresses and `http://` are allowed as well. Without the variable, Flowplan refuses such addresses with a note pointing to it.

## From Evernote

::: steps

1. In Evernote, save a notebook via **… → Export notebook** as **ENEX**. Put several notebooks into one ZIP.
2. Import the `.enex` file or the ZIP in Flowplan.

:::

What it turns into:

- Every **note** becomes a page; with several notebooks, every notebook becomes a page with its notes below.
- The note text (ENML) becomes normal text with formatting, lists and tables; **checkboxes** become tasks.
- **Images and attachments** (embedded in the ENEX file) are uploaded and shown where they were in the text; PDFs and other files as links. Attachments without a place in the text go to the end.
- **Tags**, **created**/**updated** and the **source address** are kept – best import as a new database, then they are properties to filter and sort by.
- Encrypted text cannot be imported; the preview warns.

## From Google Docs

::: steps

1. At [takeout.google.com](https://takeout.google.com) choose **Drive** and set the format for documents to **HTML** (recommended) or **Microsoft Word**. Single documents also work via **File → Download → Web page (.html, zipped)** or **Microsoft Word (.docx)**.
2. Import the Takeout ZIP, the web page ZIP or the `.docx` file in Flowplan (source **Google Docs**; single `.docx` files also work with [Microsoft Word](#from-microsoft-word)).

:::

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

::: steps

1. In OneNote for Windows, open the page or section and choose **File → Export**, with **Word Document (.docx)** as the format.
2. Import the `.docx` file (or several as a ZIP) in Flowplan with **Microsoft Word**.

:::

If your version of OneNote offers no export as a Word document but only PDF, import the PDF as a notebook (as [from GoodNotes](/migrate-notes#from-goodnotes)) or upload it as a file to a page.
