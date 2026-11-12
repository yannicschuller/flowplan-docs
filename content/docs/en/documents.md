---
keywords: editor, blocks, block menu, slash command, markdown, write, paragraph
new: toggles 2026-11-12
---

# Documents and the editor

The editor works with blocks: every paragraph, list, table or embed is a block you can insert, format, indent and move. Everything is saved continuously, even without a connection.

![A project page in the editor: the toolbar at the top, below it a blue note block with the goal, a line with four mentioned people and a date, headings and a bulleted list; the space's page tree on the left](/screenshots/document-light.webp "A document with the toolbar, a note block, mentions and headings.")

**More on this topic:** [Formatting, callouts and captions](/formatting) · [Tasks in documents](/tasks-in-documents) · [Images, files and voice notes](/media-and-files) · [Math, diagrams, code and calculations](/math-and-code) · [Links, mentions and the graph](/links-and-mentions) · [Footnotes, citations and bibliography](/academic-writing) · [Reading, presenting and overview](/reading-and-presenting) · [Printing and PDF](/print-and-pdf)

## The block menu with /

At the start of a line or after a space, `/` opens the block menu right at the cursor. Keep typing to filter: `/h2`, `/todo`, `/code`, `/tab`. Arrow keys choose, <kbd>Enter</kbd> or <kbd>Tab</kbd> inserts, <kbd>Esc</kbd> closes.

> [!TIP]
> To type a plain slash, type a space after `/` or close the menu with <kbd>Esc</kbd>. In code blocks `/` is always an ordinary character.

| Block | Shortcut in the menu | What for |
| --- | --- | --- |
| Text | `/text` | A normal paragraph |
| Heading 1–3 | `/h1`, `/h2`, `/h3` | Structure; they appear in the table of contents |
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

**Tables:** with the cursor in a table, a small bar appears right below it: insert a row above or below, a column left or right; under **…** turn the header row on or off and delete a row, a column or the whole table. When the end of the table is off screen, the bar stays at the bottom of the visible area – above the keyboard on phones. <kbd>Tab</kbd> moves to the next cell and adds a row in the last one.

**Convert a table to a database:** when a table outgrows itself, choose **Convert to database** under **…** in the table bar. Flowplan creates a [database](/databases) from it below the document and puts an embedded view of it where the table was. The first row gives the column names, the first column becomes the records' titles. The other columns get their type from the filled cells: number (German or English separators), date (`2026-11-04` or `04.11.2026`), checkbox (✓, x, yes/no, ja/nein, true/false), URL, otherwise text. The database is named after the table's caption, else the nearest heading above it, else "Table". <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>Z</kbd> brings the table back. Limits as for CSV import: up to 80 columns and 5,000 rows. Encrypted spaces don't offer it; in a database record the new database goes to the top of the space.

**Hiding the keyboard (phone):** while you write, the formatting bar sits above the on-screen keyboard. Its last button on the right, **Hide keyboard**, closes the keyboard so you see more of the document; the text and the cursor position stay. A tap into the text brings it back. In the content of a database record the bar sits above the keyboard in the same way while you write. For every other text field – titles of pages, databases and records, tags, properties, the name in the **New page** dialog, search fields, comments – the same button appears as a round button on the right, just above the keyboard. This works in the browser and in the apps.

## Toggles

A **toggle** has a title and content below it that folds in and out. Insert one with `/toggle`, or type `>` and a space at the start of an empty line. The cursor lands in the empty title (grey "Toggle"); text already after the `>` becomes the title.

- **Collapse and expand:** click (or tap) the arrow in front of the title. By keyboard: <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Enter</kbd> (Windows/Linux: <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>Enter</kbd>) in the content collapses it and puts the cursor in the title, where the same keys expand it again.
- **Edit the title:** a click in the title puts the cursor there. In an expanded toggle, <kbd>Enter</kbd> or <kbd>↓</kbd> moves into the content, and <kbd>↑</kbd> at the start of the content moves back to the title. In a collapsed toggle, <kbd>↓</kbd> expands it and moves into the content.
- **A list of toggles:** <kbd>Enter</kbd> at the end of the title of a **collapsed** toggle adds a new collapsed toggle right below it, with the cursor in its title – handy for an FAQ. <kbd>Enter</kbd> in an **empty** title ends the list: the toggle becomes a normal paragraph, its content stays below.
- **From existing text:** in the block menu, **Turn into … → Toggle** turns a paragraph into a toggle with the text as its title. A list item becomes a toggle with the item's text as its title, and its indented sub-items go into the content. A single **Undo** reverses it.
- **Nothing gets lost:** when the cursor gets into a collapsed toggle (arrow keys, undo) or **Find on page** goes to a match in it, it expands. Collapse it while the cursor is inside, and the cursor moves in front of the toggle.
- **Just for you:** as with [collapsed sections](/reading-and-presenting#collapsing-sections), collapsing does not change the document – others editing at the same time keep their own state. Your browser or the app remembers what you collapsed on this device for your account, so it is still collapsed the next time you open the page. On another device the toggles are expanded. A toggle is always stored, exported (Markdown `<details>`, HTML) and published expanded; readers collapse it there themselves. A toggle without a title is exported to Markdown with an empty `<summary></summary>` and comes back the same way on import.
- In **reading mode** a click on the whole title line collapses and expands it.

## Pasting answers from ChatGPT

Text copied from ChatGPT or another assistant is formatted when pasted: LaTeX formulas (`\[ … \]`, `\( … \)`, `$$ … $$`) become formula blocks and inline formulas, Markdown (headings, **bold**, lists, tables) is applied, lines with tabs become a table, `☐` a task list, and each line becomes its own paragraph. Formulas already rendered on a copied web page stay formulas. This also applies when copying straight from the ChatGPT web page. If formulas are already in the document as text (such as `\[ A(3;2;1) \]`), select them – or everything with <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> – and choose **Turn into formulas** in the text menu. Ordinary text is pasted as before.

## Synced blocks

A synced block (`/sync` → **Synced block**) is content that is the same in several places – such as contact details, a checklist or a status notice. **Insert synced block** shows it on another page. You can edit it everywhere; the change appears on all pages, live on pages that are open.

- An orange frame marks the block; at the top it shows the number of pages and the page it was created on.
- The trash icon in the frame removes the block only in this place; it stays in the others.
- Permissions come from the page the block was created on: whoever may not read that page sees a notice instead of the content.
- The search finds the text on the original page. The block does not appear on published pages.

## Markdown shortcuts

While you type, the editor converts:

| Type | Result |
| --- | --- |
| `#`, `##`, `###` + space | Heading 1–3 |
| `-` or `*` + space | Bulleted list |
| `1.` + space | Numbered list |
| `[]` + space | Task |
| `>` + space | [Toggle](#toggles) (or quote, see below) |
| `"` + space | Quote (also with „ “ ”) |
| ` ``` ` | Code block |
| `---` | Divider |
| `**bold**`, `*italic*`, `` `code` ``, `~~strike~~` | Formatting in the text |

**`>` as a quote:** if you are used to `>` for quotes from Markdown, switch **Settings → Appearance & language → Editor → “>” creates** to **Quote**. The setting applies to your account on all devices. It only affects typing: in imported Markdown files and in answers pasted from ChatGPT & co., `> text` becomes a quote as before, and the Markdown export still writes quotes as `> text`.

Code blocks carry their language in the fence: ` ```python `, ` ```typescript `, ` ```terraform `. The export writes the ids of VS Code/Shiki; the import also understands aliases and older names (`js`, `ts`, `py`, `sh`, `yml`, `cpp`, `csharp`, `plaintext` …) and stores them with the full id (` ```js ` becomes JavaScript, exported again as ` ```javascript `). Unknown languages are kept and show as "(imported)" in the block, without highlighting.

Line numbers, highlighted lines, the view and collapsing follow the language in the fence, in the usual notation: ` ```ts {3-5} showLineNumbers startLine=10 `, plus `view=preview`/`view=split`/`view=code`, `collapsed` and `collapsedLines=15`. The import also understands `showLineNumbers{10}` (rehype-pretty-code), `showLineNumbers=10` and `hl_lines="3 4"`/`linenums="10"` (MkDocs). The numbers in `{…}` count from the block's first line, whatever its start number. ` ```mermaid ` fences become code blocks that show the diagram.

## Indent

- <kbd>Tab</kbd> at the start of a paragraph or heading indents it (up to eight levels), <kbd>⇧</kbd> <kbd>Tab</kbd> outdents it.
- <kbd>Backspace</kbd> at the start of an indented line first removes one level.
- In lists <kbd>Tab</kbd> nests the item below the previous one; in code blocks it inserts two spaces.

## Move blocks

A handle (`⋮⋮`) appears to the left of a block – to keep the page calm, only where you are: at the block under the mouse pointer and at the block with the cursor. You can still reach the handles by keyboard (<kbd>Tab</kbd> outside the text); a handle with keyboard focus always shows, with a ring. On touch devices only the block with the cursor has a handle, large enough to tap – so tap into the block first. Empty paragraphs have no handle unless the cursor is in them. To see every handle as before, turn on **Settings → Appearance & language → Editor → Always show block handles** (on this device). Reading mode and locked pages have no handles.

Dragging shows an insertion line in the middle of the gap between two blocks – also into callouts, quotes or columns; when you let go, the block glides to its new place.

A click on the handle opens the **block menu** (from the bottom on phones):

- **Move up** / **Move down** – past the neighbour
- **Move below …** – right below a heading of the page, to the top or to the end
- **Duplicate** and **Delete**
- **Turn into …** – text, heading 1–3, bulleted list, numbered list, task list, quote, callout, [toggle](#toggles) or code; list items switch the kind of list or become a toggle (with their sub-items as its content), quotes and callouts can be dissolved
- **Callout type**, **Symbol** and **Colour** (callouts), **Width** (videos and embeds) and **Text direction** where they fit
- **Select several** – the selection mode

In the **selection mode** circles take the place of the handles. A tap selects a block, another one extends the selection up to it; when all items of a list are chosen, the whole list is. The bar at the bottom moves, duplicates, moves below a heading or deletes the selection, **⋯** holds the rest of the block menu. **Done** or <kbd>Esc</kbd> ends the mode.

List items and tasks stay what they are when moved: outside their list they form a list of the same kind of their own, and a numbered item keeps its number. Right next to a matching list they become part of it; in another kind of list they adapt.

<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> moves the current block past its neighbour. Every block action can be undone on its own.

## Edit as Markdown

**Page menu … → Edit as Markdown** shows the whole page as Markdown text with line numbers – handy for big rearrangements, find and replace, or if you prefer writing Markdown.

- **Apply** (<kbd>⌘</kbd> <kbd>Enter</kbd>) saves a version first and replaces the content in one step; **Undo** takes the change back.
- Blocks without a Markdown form – embeds, whiteboards, linked databases, synced blocks, columns, tables with merged cells or widths, sized images, function graphs, metrics and bibliographies – appear as a marker `<!-- flowplan:block … -->`. You can move or delete them but not change them; they come back unchanged. If one is deleted, Flowplan asks before applying.
- Formatting without a Markdown form (colours, superscript, spoilers, mentions, citations) is kept as HTML in the text.
- **Alignment, indent, text direction and reactions** are lost when applying; the view says beforehand what is affected.
- If someone changes the page while you write in Markdown, a notice appears; **Apply anyway** then overwrites their changes.
- People who may only read – also on locked pages and in reading mode – see **View as Markdown** without Apply.

## Text direction

Paragraphs, headings, lists, quotes, callouts and table cells in Arabic, Hebrew or Persian run **right to left automatically**: the direction follows the block's first letter. Bullets, checkboxes, quote bars, callout icons and block handles are then on the right.

In the block menu (click the handle `⋮⋮`) → **Text direction** you set **Automatic**, **Left to right** or **Right to left** for a block and everything inside it. The direction is kept in the HTML export; Markdown has no place for it.

## More blocks

- **Table of contents**: lists the headings of the page and jumps there on click.
- **Two columns**: blocks side by side; stacked on a phone.
- **Linked database**: a view of an existing database with its own filters and sorting; changes to records go to the source. See [Views](/views#linked-databases).
- **Whiteboard**: a whiteboard right in the document; the button at the top right opens it large.
- **Draw** (`/draw`): a block for handwriting across the full width, blank, lined or grid, with a height you drag; several people draw at once without overwriting each other. See [Handwriting in documents](/notebooks#handwriting-in-documents).
