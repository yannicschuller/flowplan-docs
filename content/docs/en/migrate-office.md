---
keywords: Confluence, Evernote, ENEX, Google Docs, Takeout, Word, docx, OneNote, import
---

# From Confluence, Evernote, Google Docs and Word

Step by step from Confluence, Evernote, Google Docs, Microsoft Word and OneNote to Flowplan – with the page tree, images and attachments.

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

If your version of OneNote offers no export as a Word document but only PDF, import the PDF as a notebook (as [from GoodNotes](/migrate-notes#from-goodnotes)) or upload it as a file to a page.
