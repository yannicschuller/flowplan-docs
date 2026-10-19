# Documents and the editor

The editor works with blocks: every paragraph, list, table or embed is a block you can insert, format, indent and move. Everything is saved continuously, even without a connection.

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
| Code | `/code` | Syntax highlighting for 192 languages |
| Table | `/table` | A simple table in the text |
| Image or file | `/image`, `/file` | Upload or pick from the media library |
| Mermaid diagram | `/mermaid` | Flowcharts, sequence and class diagrams as text |
| Formula, inline formula | `/math`, `/inlinemath` | LaTeX, rendered with KaTeX |
| Mention a page, record or person | `/mention` or `@` | A reference to a page, database record or person |
| Whiteboard | `/board` | Embed a whiteboard in the document |
| Linked database | `/db` | A view of an existing database |
| Two columns | `/columns` | Content side by side |
| Embed | `/embed` | Players for YouTube, Vimeo, Loom, Spotify, Figma, CodePen; a link card otherwise |
| Spoiler | `/spoiler` | Hidden text, revealed by a click |
| Voice note | `/voice` | Record and insert as audio, optionally also as text |
| Synced block | `/sync` | Content that stays the same on several pages |
| Insert synced block | `/sync` | Show an existing synced block |
| Divider | `/hr` | A horizontal line |
| AI | `/ai`, `/ki` | Let the [AI](/ai#writing-assistant) write (when switched on) |
| Footnote | `/footnote`, `/fußnote` | Numbered note at the end of the page ([Footnotes](#footnotes)) |
| Citation | `/cite`, `/zitat` | Cite a source – DOI, BibTeX or Zotero ([Citations](#citations-and-bibliography)) |
| Bibliography | `/bibliography`, `/references` | All cited works as a list |

## Voice notes

`/voice` opens the recorder: tap the microphone, speak, **Stop recording** (at most ten minutes). You can listen to the recording or discard it; **Insert** puts it into the page as audio. If speech recognition is set up, the spoken words follow below as text; otherwise the dialog only offers the audio.

## Table of contents

The list icon at the top right of a document opens the **table of contents** beside the text – in every document, journal days and database records included. It is built from the headings and grows while you write, marks the section you are reading and jumps to a heading on click. Whether it is open is remembered in this browser for all documents. On a phone a round button at the bottom right opens it.

## Pasting answers from ChatGPT

Text copied from ChatGPT or another assistant is formatted when pasted: LaTeX formulas (`\[ … \]`, `\( … \)`, `$$ … $$`) become formula blocks and inline formulas, Markdown (headings, **bold**, lists, tables) is applied, lines with tabs become a table, `☐` a task list, and each line becomes its own paragraph. Formulas already rendered on a copied web page stay formulas. This also applies when copying straight from the ChatGPT web page. If formulas are already in the document as text (such as `\[ A(3;2;1) \]`), select them – or everything with <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> – and choose **Turn into formulas** in the text menu. Ordinary text is pasted as before.

## Callouts

Callouts come in five kinds, as on GitHub, Forgejo and Obsidian: **Note** (blue), **Tip** (green), **Important** (purple), **Warning** (yellow) and **Caution** (red). Each kind has its icon and a title in the reader's language. With the cursor in a callout, `/tip`, `/warning` etc. change its kind; so does **Manage blocks → Callout type**.

Markdown export writes callouts as GitHub alerts (`> [!WARNING]`). Import (Markdown, ZIP, Notion) turns `> [!NOTE]` to `> [!CAUTION]` back into callouts of that kind; Obsidian's further kinds map to the nearest one (e.g. `danger` → Caution, `hint` → Tip), and a custom title (`> [!WARNING] Read first`) becomes a bold first line.

## Reading mode

The book icon in the top bar (or <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>, quick search → `> reading`) opens a document **for reading only**: nothing changes by accident, handles and the block menu disappear – handy on the phone and when reading aloud or presenting. The pencil switches back to editing. The device remembers the mode per page; permissions stay the same, and others keep their own mode. Database records have the same book icon at the top of the record (see [Databases](/databases)).

## Focus mode

**Focus mode** (quick search → `> focus`) hides the sidebar, toolbar and page margins; the top bar only appears on hover. At the bottom, a bar counts the words of the page and those added in this session. With a **goal** (e.g. 500 words) a bar shows the progress; the device remembers the goal per page. <kbd>Esc</kbd> ends the mode.

## Synced blocks

A synced block (`/sync` → **Synced block**) is content that is the same in several places – such as contact details, a checklist or a status notice. **Insert synced block** shows it on another page. You can edit it everywhere; the change appears on all pages, live on pages that are open.

- An orange frame marks the block; at the top it shows the number of pages and the page it was created on.
- The trash icon in the frame removes the block only in this place; it stays in the others.
- Permissions come from the page the block was created on: whoever may not read that page sees a notice instead of the content.
- The search finds the text on the original page. The block does not appear on published pages.

## Tasks with assignee and date

A task (`/todo` or `[]` + space) with a mention such as `@Anna` is assigned to Anna: she gets a notification and finds the task under **My tasks** in the sidebar. You set a date while the cursor is in the task, with the calendar button in the toolbar or through the text menu (select text or right-click → **Due date**). The date appears as a chip at the right of the line (highlighted today, red when overdue); a click on it changes the date or removes it with **Remove date**. A new task made with <kbd>Enter</kbd> starts without a date.

**My tasks** collects all tasks given to you, your own tasks with a date and all tasks from your journals (even without @name and without a date) – grouped into Overdue, Today, Next 7 days, Later and No date. Below, **From other workspaces** lists your tasks from your other workspaces, per workspace; clicking the page switches there. Ticking off and changing the date take effect right in the document, also for others who have it open. On the due date a reminder arrives in the morning; the number next to "My tasks" shows how many are due today or overdue.

## Markdown shortcuts

While you type, the editor converts:

| Type | Result |
| --- | --- |
| `#`, `##`, `###` + space | Heading 1–3 |
| `-` or `*` + space | Bulleted list |
| `1.` + space | Numbered list |
| `[]` + space | Task |
| `>` + space | Quote |
| ` ``` ` | Code block |
| `---` | Divider |
| `**bold**`, `*italic*`, `` `code` ``, `~~strike~~` | Formatting in the text |

## Format text

Selecting text – or right-clicking it – opens the text menu: reactions for the paragraph, **bold**, *italic*, underline, strikethrough, highlight, code, link, **Comment** and **Copy**, in tasks also **Due date**. The toolbar above the text adds headings, colour and background colour, superscript and subscript, inline formulas and **Hide (spoiler)**.

- Formatting only applies to the current line. After <kbd>Enter</kbd> the new line starts as normal text – only lists and tasks continue with a new item, and a heading is followed by a paragraph.
- **Turn into**: in the text menu (also on right-click in a line) a line changes its type without losing its text – text, heading 1–3, bulleted list, numbered list, task, quote or code block. The current type is highlighted.

### Spoiler

Hidden text stays hidden while you write. A click on the area reveals it, another one hides it again. <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>H</kbd> hides the selection. Sticky notes and text on whiteboards can be hidden too.

## Indent

- <kbd>Tab</kbd> at the start of a paragraph or heading indents it (up to eight levels), <kbd>⇧</kbd> <kbd>Tab</kbd> outdents it.
- <kbd>Backspace</kbd> at the start of an indented line first removes one level.
- In lists <kbd>Tab</kbd> nests the item below the previous one; in code blocks it inserts two spaces.

## Move blocks

A handle (`⋮⋮`) appears to the left of every block on hover. Dragging shows an insertion line in the middle of the gap between two blocks; when you let go, the block glides to its new place. A click on the handle opens **Manage blocks**: move – also into callouts or columns –, duplicate or delete, one block or several neighbouring ones.

List items and tasks stay what they are when moved: outside their list they form a list of the same kind of their own, and a numbered item keeps its number. Right next to a matching list they become part of it; in another kind of list they adapt.

<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> moves the current block past its neighbour. Every block action can be undone on its own.

## Images, files and embeds

- **Pasting from the clipboard** (<kbd>⌘</kbd> <kbd>V</kbd>) or dragging in uploads images and files. Images can be resized at their edges.
- **Photos are scaled down before uploading**: at most 2560 px on the longer side, stored as WebP. The camera rotation is kept, metadata such as the location is removed. GIFs, SVGs and files that would hardly get smaller stay unchanged. Attachments in file properties and forms are stored as they are.
- **PDFs** appear as a card with a preview of the first page. A click opens the PDF viewer with all pages, zoom (also <kbd>⌘</kbd> <kbd>+</kbd>/<kbd>−</kbd>) and **Download**; <kbd>Esc</kbd> closes it. The same applies to PDFs in the media library, in files properties of databases and on published pages. In editable text, <kbd>⌘</kbd>-click a link to a PDF to open the viewer.
- **Mark up images**: double-click an image (or the pen in the toolbar while the image is selected) to open it for editing – with **pen**, **highlighter**, **arrow**, **rectangle**, **circle** and **text**, seven colours and three line widths, undo with <kbd>⌘</kbd> <kbd>Z</kbd>. **Save** creates a new image with the markings; the original and the markings stay with the image, so you can change or remove them later.
- **Media** in the sidebar collects all uploads of the workspace for reuse.
- **Embed** (`/embed`) takes an address: YouTube, Vimeo, Loom, Spotify, Figma and CodePen appear as players with an adjustable width, other sites as a link card with title and preview image.
- Links to pages and mentions of people show a preview on hover.
- The administrators set the maximum file size (10 MB by default).

## Formulas, diagrams and code

- **Formulas** in LaTeX: as a block with `/math`, inside the text with `/inlinemath`. The preview appears while you type. Building blocks such as fraction, root, superscript, subscript, vector, cross product, ±, π and sum sit above the input.
- **Mermaid diagrams**: a click or <kbd>Enter</kbd> opens the source and preview. Up to 20,000 characters and 500 edges.
- **Code blocks**: choose the language in the header; **Wrap lines** and **Copy** are at hand. <kbd>Tab</kbd> indents by two spaces.
- **Fractions**: `/Fraction` (or `/Bruch`) inserts a formula inside the sentence.

## Calculating in text

Flowplan only calculates when you want it to – exactly, with fractions, in German or English notation (`2,5` or `2.5`, `×`, `²`, `√`, `€`):

- **Hint after "="**: type a calculation followed by `=`, such as `12 × 2,400 € =` or `3/4 + 1/6 =`, and the result appears greyed out behind it. <kbd>Tab</kbd> accepts it, <kbd>Esc</kbd> or typing on dismisses it.
- **Selected text**: select a calculation, a term or an equation; the text menu (also on right-click) shows what is possible under **Calculate** and inserts the result after it with one click:
  - **Result** and **Reduce** as an exact fraction, plus **As a decimal** – `12/18 = 2/3`
  - **Expand**, including the binomial formulas – `(a + b)² = a² + 2ab + b²`
  - **Factor** – `x² − 9 = (x − 3)(x + 3)`, `4x² − 12x + 9 = (2x − 3)²`, `6x² + 9x = 3x(2x + 3)`, also with several variables: `a³ − b³ = (a − b)(a² + ab + b²)`, `x² + 2xy + y² − 1 = (x + y − 1)(x + y + 1)`, by grouping `ax + ay + bx + by = (x + y)(a + b)`; **Factor with roots** splits further into real factors: `x² − 2 = (x − √2)(x + √2)`
  - **Simplify** algebraic fractions – `(x² − 1)/(x − 1) = x + 1`, `1/x + 1/(x + 1) = (2x + 1)/(x(x + 1))`
  - **Solve for x** – linear and quadratic equations exactly (`x² + 2x − 4 = 0 ⇒ x = −1 ± √5`), higher degrees exactly where possible (`x³ = 2 ⇒ x = ∛2`, `x⁴ − 5x² + 6 = 0 ⇒ x = ±√2, ±√3`), otherwise as rounded decimals (`x³ + x − 1 = 0 ⇒ x ≈ 0.682328`); with several variables, for each one that appears linearly. Equations with x in a denominator are solved with the common denominator; values that would make a denominator 0 are excluded and named (`x/(x − 1) = 1/(x − 1) ⇒ no solution (x = 1 excluded)`).
- **Function graph**: select a term in x, such as `x² − 2` or `f(x) = 2x + 1`, and choose **Draw graph** in the text menu – a graph with axes, grid and marked zeros appears below. `/Function graph` inserts one too. The functions are edited below the graph: it changes while you type, **+ Function** adds up to six functions in their own colours (`sin(x)`, `cos`, `tan`, `exp`, `ln`, `abs`, `√` and `π` work). Dragging moves the view, **+**/**−** or <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + scrolling zoom, **⟲** resets the view. On published pages the graph can be moved and zoomed but not changed.
- **Vectors**: write vectors as `(1 | 2 | 3)`, `(1; 2; 3)` or `(1, 2, 3)`. Flowplan calculates sums and multiples (`2 · (1; −2) − (3; 1) = (−1; −5)`), the **dot product** with `·` including the **angle** (`(1, 0) · (0, 1) = 0 ⇒ ∠ = 90°`), the **cross product** with `×` (`(1|0|0) × (0|1|0) = (0 | 0 | 1)`) and the **magnitude** with `|…|` (`|(1, 1)| = √2`). A vector selected on its own shows its magnitude and **unit vector** (`(3, 4) ⇒ v⁰ = (3/5, 4/5)`). **Draw vectors** in the text menu shows vectors in the plane as arrows in a coordinate system – for `(1, 2) + (3, 1)` both vectors and their sum. More vectors such as `(3, 2)` can be entered in the graph next to functions. **Vectors in space** such as `(1, 2, 3)` – cross products too – are drawn in a 3D coordinate system with x, y and z axes, a floor grid and dashed guides to the floor; **dragging turns the view**, and the view is saved with the page. The formula editor has the building blocks **Vector** (column vector), **Vector arrow** and **Cross product**; column vectors in formulas are calculated the same way.
- **In formulas**: the formula editor shows the same options under **Calculate** and appends the result in LaTeX, such as `\frac{3}{4} + \frac{1}{6} = \frac{11}{12}`.

## Dashboards and metrics

**/Metric** inserts a card with a number from a database, **/Dashboard** three side by side. With the gear you choose:

- the **database** (every database in the workspace you can read),
- optionally a **view** – then only the records its filters show count, such as “Open tickets”,
- the **calculation**: number of records, sum, average, minimum or maximum of a number, formula or rollup property,
- a **label**.

The server calculates the number for the person looking at the page and refreshes it every minute; private records only count for people allowed to see them. On published pages, visitors without access see a dash. Add charts by inserting a **linked database** below the metrics and choosing a chart view there – that makes a dashboard from several databases.

## Page links and mentions

`@` searches pages, database records and people – keep typing to narrow the list. Records appear with their database, such as "Heating – maintenance · Notes"; only records you may read are offered. Mentioning a person notifies them in the inbox.

Links to pages and records stay valid even if they are renamed or moved. A link that shows the old title gets the new one on a rename – in all documents and records you may edit; a link with its own text keeps it. The target lists all links to it under **Linked from** – including records whose text contains the link. Records and pages you may not read do not appear there.

## Footnotes

`/footnote`, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>F</kbd> (<kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>F</kbd>) or **Footnote** in the text menu inserts a footnote at the cursor and opens its text.

- The notes appear numbered under **Footnotes** at the end of the page. Numbers follow the order in the text and update by themselves when you move, copy or delete markers.
- Clicking a number jumps to its note, ↩ jumps back. Double-click the number (or press <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>F</kbd> with a footnote selected) to edit or remove it.
- Notes are plain text; web addresses in them become links.
- Footnotes also show on shared and published pages, in print and in the HTML export, and search finds their text.
- In the Markdown export they become `[^1]` with `[^1]: text` at the end; the import reads them back – including Obsidian's short form `^[text]`.

## Citations and bibliography

For papers, theses and research notes you cite sources right in the text:

1. `/cite` (or `/zitat`) opens the workspace's **bibliography**.
2. Search a title, paste a **DOI** (e.g. `10.1000/xyz123` – Flowplan fetches authors, title and year from Crossref and other DOI services) or bring in a whole list via **Import BibTeX or CSL-JSON (Zotero) …**.
3. Optionally add a page and insert.

The text then reads "(Müller 2021)", "(Müller & Schmidt 2021, p. 12)" or "(Müller et al. 2021)"; hovering shows the full reference. `/bibliography` inserts a **bibliography**: all works cited on the page in an APA-like style, updating itself as you cite – also on shared and published pages.

- The bibliography belongs to the workspace; guests don't see it. Each citation carries its details along, so copies, exports and shared pages are complete without the list.
- **Zotero:** export a collection from Zotero as *BibTeX* or *CSL JSON* and import it in the dialog.
- In the **Markdown export** citations become Pandoc citations (`[@key]`, `[@key, p. 12]`) and the bibliography a section of its own – so a text can be processed further with Pandoc.

## Show authors

**Show authors** (in the toolbar or the page menu **…**) colours the text by the person who wrote it – each person always in the same colour. A legend shows names and shares; **Hide authors** turns the colouring off again.

- The content itself doesn't change; the colouring is just a view.
- Recording starts with this feature: older, imported or restored text appears as "earlier", and so does text written by guests through links with their own permissions.
- Images, mentions and other embedded objects are not coloured.
- Only people who may read the page see names.

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

Under **Manage blocks** (click the handle `⋮⋮`) → **Text direction** you set **Automatic**, **Left to right** or **Right to left** for a block and everything inside it. The direction is kept in the HTML export; Markdown has no place for it.

## More blocks

- **Table of contents**: lists the headings of the page and jumps there on click.
- **Two columns**: blocks side by side; stacked on a phone.
- **Linked database**: a view of an existing database with its own filters and sorting; changes to records go to the source. See [Views](/views#linked-databases).
- **Whiteboard**: a whiteboard right in the document; the button at the top right opens it large.
