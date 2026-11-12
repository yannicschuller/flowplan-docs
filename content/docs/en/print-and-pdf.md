---
keywords: print, pdf, page break, print preset, landscape
new: page-break 2026-11-12
---

# Printing and PDF

Print pages or save them as PDF – with print options, presets and page breaks where you want them.

## Print and PDF

**Page actions → Print / PDF** (or `> print` in the quick search, or ++⌘ P++ / ++Ctrl P++ with a page open) first opens a small window with the print options; **Print** (or <kbd>Enter</kbd>) then opens the browser's print dialog, where you can also **save the page as PDF**. The sidebar, toolbars, handles, comment bars, notices and buttons such as “Change cover” or “+ Tag” never appear on paper; colours are always light, blocks are not split in the middle of a page and long code lines wrap.

**Content** – what is printed:

| Option | Effect |
| --- | --- |
| **Cover image** | The cover of the page or record (in the PDF with sub-pages also the chapters' covers). |
| **Icon** | The page icon or the icon of a database record. |
| **Tags** | The page's tags. |
| **Properties** | The page's properties or a record's fields (a record's tag fields included). |
| **Page numbers** | A page number at the bottom centre. |
| **Title page**, **Table of contents** | Only in the PDF with sub-pages and the space as PDF. |

**Look**: **Paper size** (Default – the printer's, A4 for the PDF with sub-pages –, A4 or US Letter), **Title size** (Small, Normal, Large – for the page title and headings), **Body font** and **Heading font** (Default, Serif, Sans-serif or the [workspace's fonts](/workspace-appearance#appearance)) and **Links**: Default (as in Flowplan when printing a page, with the address in brackets in the PDF with sub-pages), like normal text, underlined, dashed underline or with the address in brackets.

Without changes Flowplan prints as before, only with page numbers. Flowplan remembers your last choice for you on all devices.

> Chrome and Edge (version 131 and later) put the page numbers in the footer. Firefox and Safari do not know this setting: turn on **Headers and footers** in the browser's print dialog there, and the browser prints its own page number (together with date, title and address).

### Print presets

A **print preset** is a named choice of these options, such as “Internal” (everything) and “Clean for external” (no cover image, icon, tags or properties, links as text). In the print window you pick it at the top under **Print preset**; once an option changes, it says **Custom**.

- **Save as preset …** saves the current choice as your own preset. The pencil and bin buttons next to it rename or delete your own presets; you can also manage them under **Settings → Print / PDF**.
- **Workspace presets** are created by workspace owners – in the print window (**Save for → For the workspace**) or under **Settings → Workspace → Print presets**. All members and guests can pick them but not change them; in the print window they carry a **Workspace** badge. The star makes one of them the **default preset**: the print window starts with it for everyone who has not chosen yet.
- At most 30 presets per person and per workspace. The workspace's presets travel in the [content archive](/import-export-versions#content-archive) and the JSON export; on import they are added to the existing ones (presets with the same name stay as they are).
- For scripts: `profile.print` (your own choice and presets) and `workspace.printPresets` (the workspace's presets, owners only) via `/api/command`; the PDF with sub-pages takes the options as JSON in the `print` parameter (`GET /api/export/pdf?page=<id>&children=1&print={"toc":false}`).

## Page break

A **page break** (`/page break`, also `/pagebreak`) sets where a new page starts in print. In the editor it is a thin dashed line labelled “Page break”; a click selects it, <kbd>⌫</kbd> deletes it like a divider, and the `⋮⋮` handle moves it.

- **Print / PDF** of a page and the [PDF with sub-pages](/export#word-pdf-with-sub-pages-and-e-book) start a new page after it; the line itself is not printed. On screen, on published pages and in presentations it stays a line.
- **Word (DOCX)** gets a real page break, **e-books** a break where the reader honours it.
- **Markdown export** writes `<div style="page-break-after: always"></div>`, which Pandoc, Typora and most Markdown-to-PDF tools understand. The **Markdown import** turns it back into a page break, as well as `\pagebreak` or `\newpage` on a line of their own. Pasted HTML from Word or Google Docs with a page break also becomes the block.
- There is no page break block in [encrypted spaces](/encrypted-spaces).
