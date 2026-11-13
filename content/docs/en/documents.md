---
keywords: editor, blocks, block menu, slash command, markdown, write, paragraph, table, toggle
new: toggles 2026-11-12
---

# Documents and the editor

The editor works with blocks: every paragraph, list, table or embed is a block you can insert, format, indent and [move](/blocks). Everything is saved continuously, even without a connection.

![A project page in the editor: the toolbar at the top, below it a blue note block with the goal, a line with four mentioned people and a date, headings and a bulleted list; the space's page tree on the left](/screenshots/document-light.webp "A document with the toolbar, a note block, mentions and headings.")

**More on this topic:** [Working with blocks](/blocks) · [Markdown in the editor](/markdown-editor) · [Formatting, callouts and captions](/formatting) · [Tasks in documents](/tasks-in-documents) · [Images, files and voice notes](/media-and-files) · [Math, diagrams, code and calculations](/math-and-code) · [Links, mentions and the graph](/links-and-mentions) · [Footnotes, citations and bibliography](/academic-writing) · [Reading, presenting and overview](/reading-and-presenting) · [Printing and PDF](/print-and-pdf)

## The block menu with /

At the start of a line or after a space, `/` opens the block menu right at the cursor. Keep typing to filter: `/h2`, `/todo`, `/code`, `/tab`. Arrow keys choose, <kbd>Enter</kbd> or <kbd>Tab</kbd> inserts, <kbd>Esc</kbd> closes.

> [!TIP]
> To type a plain slash, type a space after `/` or close the menu with <kbd>Esc</kbd>. In code blocks `/` is always an ordinary character.

| Block | Shortcut in the menu | What for |
| --- | --- | --- |
| Text | `/text` | A normal paragraph |
| Heading 1–4 | `/h1`, `/h2`, `/h3`, `/h4` | Structure; they appear in the table of contents |
| Task list | `/todo` | Tasks to tick off |
| Bulleted list, numbered list | `/ul`, `/ol` | Lists, nested as deep as you like |
| Quote | `/quote` | A highlighted quotation |
| Note, Tip, Important, Warning, Caution | `/note`, `/tip`, `/important`, `/warning`, `/caution` | A coloured box with icon and title – the five kinds of GitHub alerts |
| Toggle | `/toggle` | Content that folds in and out |
| Code | `/code` | Syntax highlighting for more than 240 languages (as in VS Code), preview for HTML, SVG, Markdown, Mermaid, LaTeX and Typst |
| Table | `/table` | A simple table in the text |
| Image or file | `/image`, `/file` | Upload or pick from the media library |
| Mermaid diagram | `/mermaid` | Flowcharts, sequence and class diagrams as text |
| draw.io diagram | `/drawio` | Draw diagrams with the draw.io editor |
| Formula, inline formula | `/math`, `/inlinemath` | LaTeX, rendered with KaTeX |
| Mention a page, record or person | `/mention` or `@` | A reference to a page, database record or person |
| Whiteboard | `/board` | Embed a whiteboard in the document |
| Draw | `/draw`, `/sketch`, `/handwriting` | Handwriting and sketches with a pen or finger ([Handwriting in documents](/notebooks#handwriting-in-documents)) |
| Linked database | `/db` | A view of an existing database |
| Two columns | `/columns` | Content side by side |
| Embed | `/embed` | Players for YouTube, Vimeo, Loom, Spotify, Figma, CodePen; a link card otherwise |
| Spoiler | `/spoiler` | Hidden text, revealed by a click |
| Voice note | `/voice` | Record (up to two hours) and insert as audio, optionally also as a transcript |
| Synced block | `/sync` | Content that stays the same on several pages |
| Insert synced block | `/sync` | Show an existing synced block |
| Divider | `/hr` | A horizontal line |
| Page break | `/page break`, `/pagebreak` | Continue on a new page in print, PDF and Word ([Page break](/print-and-pdf#page-break)) |
| AI | `/ai`, `/ki` | Let the [AI](/ai-writing#writing-assistant) write (when switched on) |
| Footnote | `/footnote`, `/fußnote` | Numbered note at the end of the page ([Footnotes](/academic-writing#footnotes)) |
| Citation | `/cite`, `/zitat` | Cite a source – DOI, BibTeX or Zotero ([Citations](/academic-writing#citations-and-bibliography)) |
| Bibliography | `/bibliography`, `/references` | All cited works as a list |

**Tables:** tables are compact – low rows, a left-aligned header, as wide as their content (dragged column widths stay). Point at a cell and two handles ⋮⋮ appear: on the left edge of its row and on the top edge of its column. A click selects the row or column (outlined in blue) and opens its menu: a search field, **Colour** (text or background), **Insert row above/below** or **Insert column left/right**, **Duplicate** (++⌘ D++), **Clear contents**, **Delete row/column**, **Header row** or **Header column**, **Caption** and **Convert to database**. Drag a handle to move the row or column – a line shows where it lands; the header row stays the first row. With a row selected, ++⌘ ⇧ ↑/↓++ moves it (++⌘ ⇧ ←/→++ a column). The **+** bars below the table and at its right edge add a row or a column at the end. Drag across several cells and the selection gets a button at its top right with **Colour**, **Clear contents**, **Merge cells** and **Split cell**. Rows across merged cells, and columns in tables with merged cells, cannot be moved. On phones and tablets the handles and **+** bars belong to the cell you tap; the menu opens as a sheet from the bottom. Cell colours survive the Markdown export (as a comment before the table that other tools ignore) and come back as colours on import. <kbd>Tab</kbd> moves to the next cell and adds a row in the last one.

**Convert a table to a database:** when a table outgrows itself, choose **Convert to database** in the menu of a row or column handle. Flowplan creates a [database](/databases) from it below the document and puts an embedded view of it where the table was. The first row gives the column names, the first column becomes the records' titles. The other columns get their type from the filled cells: number (German or English separators), date (`2026-11-04` or `04.11.2026`), checkbox (✓, x, yes/no, ja/nein, true/false), URL, otherwise text. The database is named after the table's caption, else the nearest heading above it, else "Table". ++⌘/Ctrl Z++ brings the table back. Limits as for CSV import: up to 80 columns and 5,000 rows. Encrypted spaces don't offer it; in a database record the new database goes to the top of the space.

**Hiding the keyboard (phone):** while you write, the formatting bar sits above the on-screen keyboard. Its last button on the right, **Hide keyboard**, closes the keyboard so you see more of the document; the text and the cursor position stay. A tap into the text brings it back. In the content of a database record the bar sits above the keyboard in the same way while you write. For every other text field – titles of pages, databases and records, tags, properties, the name in the **New page** dialog, search fields, comments – the same button appears as a round button on the right, just above the keyboard. This works in the browser and in the apps.

## Toggles

A **toggle** has a title and content below it that folds in and out. Insert one with `/toggle`, or type `>` and a space at the start of an empty line. The cursor lands in the empty title (grey "Toggle"); text already after the `>` becomes the title.

- **Collapse and expand:** click (or tap) the arrow in front of the title. By keyboard: ++⌘ ⌥ Enter++ (Windows/Linux: ++Ctrl Alt Enter++) in the content collapses it and puts the cursor in the title, where the same keys expand it again.
- **Edit the title:** a click in the title puts the cursor there. In an expanded toggle, <kbd>Enter</kbd> or <kbd>↓</kbd> moves into the content, and <kbd>↑</kbd> at the start of the content moves back to the title. In a collapsed toggle, <kbd>↓</kbd> expands it and moves into the content.
- **A list of toggles:** <kbd>Enter</kbd> at the end of the title of a **collapsed** toggle adds a new collapsed toggle right below it, with the cursor in its title – handy for an FAQ. <kbd>Enter</kbd> in an **empty** title ends the list: the toggle becomes a normal paragraph, its content stays below.
- **From existing text:** in the block menu, **Turn into … → Toggle** turns a paragraph into a toggle with the text as its title. A list item becomes a toggle with the item's text as its title, and its indented sub-items go into the content. A single **Undo** reverses it.
- **Toggle headings:** **Turn into … → Toggle heading 1–4** shows the title as a heading. In Markdown it is then a heading inside `<summary>` (`<summary><h2>Title</h2></summary>`), as GitHub renders it.
- **Back to text:** **Turn into** also makes a toggle text, a heading, a list, a quote, a callout or code again: the title becomes the block, its content follows below. <kbd>⌫</kbd> at the start of the title turns it into plain text in the same way.
- **Move in with Tab:** <kbd>Tab</kbd> at the start of a block right below a toggle moves the block into the toggle, as the last block of its content. This works with paragraphs, headings, quotes, callouts, other toggles and the first items of a list; a collapsed toggle expands. So what is indented belongs to the toggle and hides with it when you collapse it. ++⇧ Tab++ moves a block back out, right below the toggle; the blocks after it stay inside. One **Undo** reverts each step.
- **Nesting:** <kbd>Tab</kbd> in a toggle's title moves the whole toggle into the toggle above it (or under the last item of a list above it), ++⇧ Tab++ moves it back out. The cursor stays in the title, and from there <kbd>Tab</kbd> never moves the focus out of the document. To undo, press <kbd>Esc</kbd> first – in the title, ++⌘/Ctrl Z++ only undoes typing in the title.
- **What belongs to it:** when the mouse is over a toggle's arrow or its ⋮⋮ handle, the whole toggle (title and content) is lightly shaded. The content is indented by exactly one Tab step.
- **Nothing gets lost:** when the cursor gets into a collapsed toggle (arrow keys, undo) or **Find on page** goes to a match in it, it expands. Collapse it while the cursor is inside, and the cursor moves in front of the toggle.
- **Just for you:** as with [collapsed sections](/reading-and-presenting#collapsing-sections), collapsing does not change the document – others editing at the same time keep their own state. Your browser or the app remembers what you collapsed on this device for your account, so it is still collapsed the next time you open the page. On another device the toggles are expanded. A toggle is always stored, exported (Markdown `<details>`, HTML) and published expanded; readers collapse it there themselves. What you collapsed is remembered on imported and API-created pages too. A toggle without a title is exported to Markdown with an empty `<summary></summary>` and comes back the same way on import.
- In **reading mode** a click on the whole title line collapses and expands it.

## Synced blocks

A synced block (`/sync` → **Synced block**) is content that is the same in several places – such as contact details, a checklist or a status notice. **Insert synced block** shows it on another page. You can edit it everywhere; the change appears on all pages, live on pages that are open.

- An orange frame marks the block; at the top it shows the number of pages and the page it was created on.
- The trash icon in the frame removes the block only in this place; it stays in the others.
- Permissions come from the page the block was created on: whoever may not read that page sees a notice instead of the content.
- The search finds the text on the original page. The block does not appear on published pages.

## More blocks

- **Table of contents**: lists the headings of the page and jumps there on click.
- **Two columns**: blocks side by side; stacked on a phone.
- **Linked database**: a view of an existing database with its own filters and sorting; changes to records go to the source. See [Views](/views#linked-databases).
- **Whiteboard**: a whiteboard right in the document; the button at the top right opens it large.
- **Draw** (`/draw`): a block for handwriting across the full width, blank, lined or grid, with a height you drag; several people draw at once without overwriting each other. See [Handwriting in documents](/notebooks#handwriting-in-documents).
