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
| AI | `/ai`, `/ki` | Let the [AI](/ai#writing-assistant) write (when switched on) |
| Footnote | `/footnote`, `/fußnote` | Numbered note at the end of the page ([Footnotes](#footnotes)) |
| Citation | `/cite`, `/zitat` | Cite a source – DOI, BibTeX or Zotero ([Citations](#citations-and-bibliography)) |
| Bibliography | `/bibliography`, `/references` | All cited works as a list |

**Tables:** with the cursor in a table, a small bar appears right below it: insert a row above or below, a column left or right; under **…** turn the header row on or off and delete a row, a column or the whole table. When the end of the table is off screen, the bar stays at the bottom of the visible area – above the keyboard on phones. <kbd>Tab</kbd> moves to the next cell and adds a row in the last one.

**Convert a table to a database:** when a table outgrows itself, choose **Convert to database** under **…** in the table bar. Flowplan creates a [database](/databases) from it below the document and puts an embedded view of it where the table was. The first row gives the column names, the first column becomes the records' titles. The other columns get their type from the filled cells: number (German or English separators), date (`2026-11-04` or `04.11.2026`), checkbox (✓, x, yes/no, ja/nein, true/false), URL, otherwise text. The database is named after the table's caption, else the nearest heading above it, else "Table". <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>Z</kbd> brings the table back. Limits as for CSV import: up to 80 columns and 5,000 rows. Encrypted spaces don't offer it; in a database record the new database goes to the top of the space.

## Voice notes and meetings

`/voice` opens the recorder: tap the microphone, speak, **Stop recording** – up to **two hours**, enough for a meeting. You can listen to the recording or discard it; **Insert** puts it into the page as audio (within the instance's upload limit). If speech recognition is set up, the spoken words follow below as text; otherwise the dialog only offers the audio.

- **Long recordings** go to the server in parts; it puts them together and sends them to speech recognition. `WHISPER_MAX_MB` limits the size (default 200).
- **Transcript with timestamps:** if speech recognition returns segments with times (OpenAI-compatible `verbose_json`, e.g. faster-whisper-server, speaches or whisper.cpp), a collapsible **Transcript · duration** block appears with one paragraph per passage and its timestamp (`00:04`, `1:02:05`).
- **Speakers:** only when the service itself separates speakers (diarization, switched on with `WHISPER_DIARIZE=on` for servers that know `diarize`) and returns a speaker per segment, each passage starts with **Speaker 1**, **Speaker 2** … Flowplan never guesses speakers from pauses. If the service only knows plain JSON, the text is inserted as paragraphs as before.
- **Then summarise with AI** summarises the transcript ([Summaries](/ai#summaries)).
- **In the apps** for iPhone, iPad and Android the app records; iPhone and iPad turn the words into text on the device, without speech recognition on the server ([Voice notes in pages](/offline-and-apps#voice-notes-in-pages)).
- **Generate tasks and summary** (when [AI actions](/ai#ai-actions) are on for you): the AI proposes a summary with decisions and a task list with assignees and dates – as a preview with checkboxes; only **Run** adds them to the page.

## Table of contents

The list icon at the top right of a document opens the **table of contents** beside the text – in every document, journal days and database records included. It is built from the headings and grows while you write, marks the section you are reading and jumps to a heading on click. Whether it is open is remembered in this browser for all documents. On a phone a round button at the bottom right opens it.

## Collapsing sections

Every heading can be **collapsed**: the small arrow to the left of a heading (it shows on hover; on touch devices and for collapsed headings always) hides everything below it – up to the next heading of the same or a higher level. A collapsed heading shows how much is hidden behind it (**… 3 blocks**); another click expands it again. With the cursor in the heading, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Enter</kbd> does the same. On a phone the arrow sits at the end of the heading, in right-to-left text on the other side.

- **Collapse / expand all sections:** in a document's page menu `⋯`, at the top of the [table of contents](#table-of-contents), in quick search (`> sections`) or with <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>X</kbd> and <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>O</kbd> ([changeable](/keyboard-shortcuts#your-own-shortcuts)). With a database record open, it applies to the record's text.
- **Just for you:** what is collapsed is remembered on this device (per page or record) – it does not change the document, others still see everything. Documents you open for the first time are expanded.
- **Nothing gets lost:** when the cursor gets into a collapsed part (arrow keys, undo, a click in the table of contents), it expands. So it does when **Find on page** (<kbd>⌘</kbd> <kbd>F</kbd>) goes to a match inside, or a search hit, backlink or notification leads there. You can keep typing in the collapsed heading itself; it stays collapsed.
- **Moving:** dragging a collapsed heading by its handle `⋮⋮` (or moving it with <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd>) takes its whole section along.
- **Printing and PDF** always show everything; so do export, presentations and published pages.
- Headings directly in the document collapse – in reading mode and in [encrypted spaces](/encrypted-spaces) too. Headings inside callouts, toggles, tables, columns or lists have no arrow; such blocks simply belong to the section they are in.

## Pasting answers from ChatGPT

Text copied from ChatGPT or another assistant is formatted when pasted: LaTeX formulas (`\[ … \]`, `\( … \)`, `$$ … $$`) become formula blocks and inline formulas, Markdown (headings, **bold**, lists, tables) is applied, lines with tabs become a table, `☐` a task list, and each line becomes its own paragraph. Formulas already rendered on a copied web page stay formulas. This also applies when copying straight from the ChatGPT web page. If formulas are already in the document as text (such as `\[ A(3;2;1) \]`), select them – or everything with <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>A</kbd> – and choose **Turn into formulas** in the text menu. Ordinary text is pasted as before.

## Callouts

Callouts come in five kinds, as on GitHub, Forgejo and Obsidian: **Note** (blue), **Tip** (green), **Important** (purple), **Warning** (yellow) and **Caution** (red). Each kind has its icon and a title in the reader's language. With the cursor in a callout, `/tip`, `/warning` etc. change its kind; so does the block menu (click the handle `⋮⋮`) → **Callout type**.

### Your own symbol and colour

So that a callout serves other purposes too – an idea 💡, a date 📅, a key point ★ –, the block menu gives it a symbol and a colour of its own:

- **Symbol** → **Choose emoji or character …** opens the emoji picker (the same as for page icons, with search, categories and skin tone). Under **Or a character of your own** you can also type a character such as ★, → or ✓ – exactly one emoji or symbol character is allowed, no letters, digits, punctuation or spaces. **Remove symbol** brings back the icon of the kind.
- **Colour** offers the nine text colours (grey, brown, orange, yellow, green, blue, purple, pink, red); **Default** goes back to the kind's colour. The colours read well in the light and the dark theme.

The kind stays: it gives the title (“Tip”, “Warning” …) and is used for the Markdown export. Symbol and colour are kept when copying, duplicating, in templates, versions, published pages, when printing and in the PDF, EPUB and Word export. [Encrypted spaces](/encrypted-spaces) have no callouts.

### Callouts in Markdown

Markdown export writes callouts as GitHub alerts (`> [!WARNING]`). A symbol of its own leads the text, a colour of its own follows as a comment at the end that GitHub does not show:

```markdown
> [!TIP]
>
> 💡 The / menu is quicker.
>
> <!-- flowplan:callout color=green -->
```

Import (Markdown, ZIP, Notion) turns `> [!NOTE]` to `> [!CAUTION]` back into callouts of that kind; Obsidian's further kinds map to the nearest one (e.g. `danger` → Caution, `hint` → Tip), and a custom title (`> [!WARNING] Read first`) becomes a bold first line. A single emoji or symbol followed by a space at the start of the text becomes the callout's symbol; the colour comment restores the colour. Callouts from Notion's Markdown export (`<aside>💡 …</aside>`) become callouts with their emoji.

## Reading mode

The book icon in the top bar (or <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>, quick search → `> reading`) opens a document **for reading only**: nothing changes by accident, handles and the block menu disappear – handy on the phone and when reading aloud or presenting. The pencil switches back to editing. The device remembers the mode per page; permissions stay the same, and others keep their own mode. Database records have the same book icon at the top of the record (see [Databases](/databases)).

Reading mode also covers everything embedded in the page: in **linked databases** you can't edit cells, add, delete or move records, or change views; a record opened from there is read-only too. Other people's changes keep showing up live. Synced blocks, drawings, metrics, function graphs and extension blocks are locked in reading mode as well.

## Focus mode

**Focus mode** (quick search → `> focus`) hides the sidebar, toolbar and page margins; the top bar only appears on hover. At the bottom, a bar counts the words of the page and those added in this session. With a **goal** (e.g. 500 words) a bar shows the progress; the device remembers the goal per page. <kbd>Esc</kbd> ends the mode.

## Present

**Present** in the `…` menu at the top right (or <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>P</kbd>, quick search → `> present`) shows a document as full-screen slides – without rebuilding it:

- Each **heading 1** starts a new slide. If the document has none, each **heading 2** does. A **divider** (`---`) always starts a new slide.
- Whatever comes before the first heading becomes a title slide with the page title.
- Images, tables, code, formulas and diagrams are scaled down so the whole slide fits on the screen.

| Key | Effect |
| --- | --- |
| <kbd>→</kbd>, <kbd>↓</kbd>, <kbd>Space</kbd>, <kbd>Page Down</kbd> | Next slide |
| <kbd>←</kbd>, <kbd>↑</kbd>, <kbd>Page Up</kbd> | Previous slide |
| <kbd>Home</kbd> / <kbd>End</kbd> | First / last slide |
| <kbd>Esc</kbd> | End the presentation |

A click into the right two thirds of the slide moves on, into the left third back. At the bottom, a counter and a bar show where you are; the bar of buttons fades out while the mouse rests. It also switches between **light and dark slides**. If “Reduce motion” is set on your system, slides change without a fade.

### Speaker notes and presenter view

A **callout** (`/callout`, kind “Note”) as the last block of a slide holds the **speaker notes**: it does not appear on the slide. **Presenter view** (notepad icon in the bar) opens a second window with the current and the next slide, the notes and the elapsed time – handy on the laptop while the projector shows the slides. Both windows stay in step: you can move on in either of them.

### Slides as PDF

The printer icon in the bar prints the slides – each on its own page in **landscape**. Choose **Save as PDF** in the print dialog to pass the slides on.

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

Code blocks carry their language in the fence: ` ```python `, ` ```typescript `, ` ```terraform `. The export writes the ids of VS Code/Shiki; the import also understands aliases and older names (`js`, `ts`, `py`, `sh`, `yml`, `cpp`, `csharp`, `plaintext` …) and stores them with the full id (` ```js ` becomes JavaScript, exported again as ` ```javascript `). Unknown languages are kept and show as "(imported)" in the block, without highlighting.

Line numbers, highlighted lines, the view and collapsing follow the language in the fence, in the usual notation: ` ```ts {3-5} showLineNumbers startLine=10 `, plus `view=preview`/`view=split`/`view=code`, `collapsed` and `collapsedLines=15`. The import also understands `showLineNumbers{10}` (rehype-pretty-code), `showLineNumbers=10` and `hl_lines="3 4"`/`linenums="10"` (MkDocs). The numbers in `{…}` count from the block's first line, whatever its start number. ` ```mermaid ` fences become code blocks that show the diagram.

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

A handle (`⋮⋮`) appears to the left of every block on hover. Dragging shows an insertion line in the middle of the gap between two blocks – also into callouts, quotes or columns; when you let go, the block glides to its new place.

A click on the handle opens the **block menu** (from the bottom on phones):

- **Move up** / **Move down** – past the neighbour
- **Move below …** – right below a heading of the page, to the top or to the end
- **Duplicate** and **Delete**
- **Turn into …** – text, heading 1–3, bulleted list, numbered list, task list, quote, callout or code; list items switch the kind of list, quotes and callouts can be dissolved
- **Callout type**, **Symbol** and **Colour** (callouts), **Width** (videos and embeds) and **Text direction** where they fit
- **Select several** – the selection mode

In the **selection mode** circles take the place of the handles. A tap selects a block, another one extends the selection up to it; when all items of a list are chosen, the whole list is. The bar at the bottom moves, duplicates, moves below a heading or deletes the selection, **⋯** holds the rest of the block menu. **Done** or <kbd>Esc</kbd> ends the mode.

List items and tasks stay what they are when moved: outside their list they form a list of the same kind of their own, and a numbered item keeps its number. Right next to a matching list they become part of it; in another kind of list they adapt.

<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> moves the current block past its neighbour. Every block action can be undone on its own.

## Images, files and embeds

- **Pasting from the clipboard** (<kbd>⌘</kbd> <kbd>V</kbd>) or dragging in uploads images and files. Images can be resized at their edges.
- **Photos are scaled down before uploading**: at most 2560 px on the longer side, stored as WebP. The camera rotation is kept, metadata such as the location is removed. GIFs, SVGs and files that would hardly get smaller stay unchanged. Attachments in file properties and forms are stored as they are.
- **PDFs** appear as a card with a preview of the first page. A click opens the PDF viewer with all pages, zoom (also <kbd>⌘</kbd> <kbd>+</kbd>/<kbd>−</kbd>) and **Download**; <kbd>Esc</kbd> closes it. The same applies to PDFs in the media library, in files properties of databases and on published pages. In editable text, <kbd>⌘</kbd>-click a link to a PDF to open the viewer. In the viewer you can write on the PDF – see [Annotate PDFs](#annotate-pdfs).
- **Mark up images**: double-click an image (or the pen in the toolbar while the image is selected) to open it for editing – with **pen**, **highlighter**, **arrow**, **rectangle**, **circle** and **text**, seven colours and three line widths, undo with <kbd>⌘</kbd> <kbd>Z</kbd>. **Save** creates a new image with the markings; the original and the markings stay with the image, so you can change or remove them later.
- **Media** in the sidebar collects all uploads of the workspace for reuse.
- **Embed** (`/embed`) takes an address: YouTube, Vimeo, Loom, Spotify, Figma and CodePen appear as players with an adjustable width, other sites as a link card with title and preview image.
- Links to pages and mentions of people show a preview on hover.
- The administrators set the maximum file size (10 MB by default).

### Annotate PDFs

If you may edit the page a PDF belongs to, the PDF viewer shows **Annotate** (not in [encrypted spaces](/encrypted-spaces) and on locked pages). A toolbar appears below it: **Pen** (with the Apple Pencil or another tablet pen, the line width follows the pressure), **Highlighter** (translucent, stays under the text and the ink), **Eraser** (**Whole strokes** or **Partial** – then only what is under the eraser goes), **Lasso**, **Text** and **Laser pointer** (points at something without staying). Plus colours, three widths, undo and redo (<kbd>⌘</kbd> <kbd>Z</kbd>, <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd>).

![A research paper in the PDF viewer while annotating: highlighted sentences, a circled number in a table and handwritten notes](/screenshots/pdf-annotate.webp "A PDF annotated with highlighter and pen – saved as a version.")

- **Favourite pens**: the three pens next to the tools remember colour and width; change them while one is chosen and the favourite changes with it. They apply on this device.
- **Shapes**: hold the pen still for a moment at the end of a stroke – a drawn line becomes straight, a rectangle, circle, triangle or diamond becomes the clean shape. Switch this off in the **Pen settings** (gear).
- **Lasso**: draw around strokes and text to move them, resize them with the handle at the bottom right, recolour, copy (<kbd>⌘</kbd> <kbd>C</kbd>, paste with <kbd>⌘</kbd> <kbd>V</kbd> – also on another page), duplicate or delete them.
- **Text** is placed with a tap on the page; a tap on existing text changes it. On the iPad, Scribble writes into it with the pen.
- **Draw with the pen only**: once you have written with the pen on a device, only the pen writes – fingers scroll and zoom, a resting hand leaves no marks. PDFs, whiteboards and images share the setting; switch it off in the **Pen settings**, then a finger writes too, and two fingers scroll and zoom.
- **Apple Pencil**: the eraser end of a pen erases. In the iPad app, double-tap or squeeze switches to the eraser and back – as set in the iPad settings, or in the **Pen settings** always to the eraser, the last tool or nothing.

The annotations belong to the page of the PDF, not to the screen: they stay in place at any zoom and apply to everyone who opens the PDF – readers see them but cannot change them. The PDF itself stays unchanged. **Done** (or <kbd>⌘</kbd> <kbd>S</kbd>) saves; every save is a version you can load again from the clock icon. If someone else saved the annotations in the meantime, your version wins and a notice says who; theirs is kept as a version. Search finds text you write on a PDF – in the app for iPhone and iPad also the handwriting itself, and **Convert to text** turns selected handwriting into typed text (see [Recognising handwriting](/notebooks#recognising-handwriting-iphone-and-ipad)).

To turn a PDF into a notebook you write in page by page and add sheets to, open it as a [notebook](/notebooks#creating-a-notebook): every PDF page becomes a sheet.

**Download** still downloads the original. **Download with annotations** (next to it once there are annotations) creates a new PDF with the same pages and the annotations on top as vector graphics – they stay sharp when zooming in. Protected (encrypted) PDFs can only be downloaded without annotations; text appears in Helvetica, characters outside the Western European character set as “?”.

## Captions

Images, tables and code blocks can have a short **caption** – one line that says what the block shows. It appears small and muted below the block.

- **Add**: point at the block or put the cursor in it (tapping an image is enough), and **Add caption** appears below it. Or use the block menu (handle `⋮⋮`) → **Add caption**.
- **Typing**: a caption is plain text on one line (up to 500 characters). <kbd>Enter</kbd> or <kbd>↓</kbd> continue below the block, <kbd>Esc</kbd> or <kbd>↑</kbd> go back into it. Others see the caption right away when editing together; <kbd>⌘</kbd> <kbd>Z</kbd> in the document undoes changes.
- **Remove**: delete the text and leave the field (or press <kbd>⌫</kbd> in the empty field), or block menu → **Remove caption**.
- **Images**: the caption does not replace the alt text for screen readers. When an image has a caption, the block menu offers **Use caption as alt text**.
- Captions are kept when copying and pasting, moving, duplicating, in templates, versions, on published pages, when printing and in every export, and search finds them. From HTML (for example pasted web pages or Notion's HTML export), `<figure>` with `<figcaption>` and tables with `<caption>` become captions.

### Numbering captions

**Page actions (…) → Number captions** puts a number in front of the captions of a page: "Figure 1", "Table 1", "Listing 1" (for code). Each kind is counted separately in document order, and only blocks that have a caption count. The label follows the language Flowplan is shown in (English: Figure/Table/Listing, German: Abbildung/Tabelle/Listing, French: Figure/Tableau/Listing). The switch applies to the whole page and everyone who reads it – also on published pages, when printing and in the exports. Copies of the page keep it. Record documents in databases don't have it.

## Formulas, diagrams and code

- **Formulas** in LaTeX: as a block with `/math`, inside the text with `/inlinemath`. The preview appears while you type. Building blocks such as fraction, root, superscript, subscript, vector, cross product, ±, π and sum sit above the input.
- **Mermaid diagrams**: a click or <kbd>Enter</kbd> opens the source and preview. Up to 20,000 characters and 500 edges.
- **draw.io diagrams** (`/drawio`): open the draw.io editor in a large window; **Save** applies the diagram as one step you can undo. A double-click, <kbd>Enter</kbd> or the pencil on the block opens it again. Flowplan stores the drawing and a picture of it: when viewing – on shared pages, in presentations and offline too – it doesn't load draw.io at all and only shows the picture (cleaned, without scripts and without content from elsewhere). Drawing and picture may each be up to 800 kB.
  - **Where draw.io runs:** by default Flowplan uses `embed.diagrams.net`. While you draw, the diagram's content goes to that service; the window says so. With `DRAWIO_URL` the instance points to its own draw.io (for example the `jgraph/drawio` container), and everything stays with you (see [Configuration](/configuration#legal-and-interface)).
  - **Look:** under **Settings → Appearance → Editor**: **draw.io theme** *Automatic* (follows Flowplan), *Light* or *Dark*, and **draw.io interface** *Default*, *Minimal* or *Sketch*. The choice applies to this device.
  - **Export:** in the ZIP export every diagram becomes a `.drawio.svg` file that draw.io can open again; in a single Markdown file and in the Git export it is a ` ```drawio ` block with the drawing, which the import turns back into a diagram (the picture is made the next time it is saved). PDF and EPUB show the picture.
- **Code blocks**: the language is shown in the block's header with its full name ("JavaScript", "C++", "Angular TypeScript", "Plain text"). A click opens a list with a search – it finds names, aliases and file extensions (`ts`, `py`, `yml`, `tf`, `.rs` …). The languages you chose last come first (remembered in this browser). There are more than 240 languages with the same grammars as in VS Code – among them Svelte, Vue, Astro, JSX/TSX, Terraform, TOML, Typst, Zig, Prisma, GDScript, Nushell, systemd units, SSH config, Git commit messages, log files, CSV/TSV and .env files. **Line wrap** and **Copy** are at hand. <kbd>Tab</kbd> indents by two spaces.
- **Language detection**: when you paste code into a block without a language (plain text), Flowplan suggests a language if it is clearly recognisable – "Looks like Python – set?". One click sets it, the × dismisses the suggestion. Flowplan never changes the language by itself.
- **Preview**: code blocks in HTML, SVG (language XML with `<svg>`), Markdown, Mermaid, LaTeX and Typst show the switch **Code / Preview / Split** in their header. *Split* puts code and preview side by side, on a phone one below the other. The view is stored in the block; people who only read a page (read access, published pages, presentations) see the preview unless the block says otherwise, and can switch for themselves without changing anything. Errors (such as a typo in the diagram or in Typst, with the line number) show in place of the preview.
  - **HTML** runs in a sealed frame: no scripts, no forms, no access to Flowplan or the network. Pictures from the web stay blank; embedded pictures (`data:`) and styles work. The height follows the content.
  - **SVG**, **Mermaid** and **Typst** show as a picture – without scripts or links.
  - **Markdown** is converted as on import, **LaTeX** shows formulas with KaTeX (separated by blank lines, with or without `$$ … $$`; not whole LaTeX documents with `\documentclass`).
  - **Typst** loads the first time it is used (a few MB, from your own server, not from the web); Typst packages (`@preview/…`) and files are not available.
  - New Mermaid code blocks (` ```mermaid ` or the language *Mermaid* chosen) show the diagram right away, empty ones code and diagram side by side. The separate Mermaid block (`/mermaid`) stays.
- **Line numbers**: the **…** menu in a code block's header turns **Line numbers** on or off for that block, sets the **First line number** (say 10 for an excerpt) and **highlights lines** – e.g. `3-5, 8`, counted as shown. The numbers cannot be selected and are not copied; with line wrap they stand at the first row of a wrapped line. Blocks without a setting of their own follow **Settings → Appearance & language → Editor → Show line numbers by default** (on this device).
- **Collapse**: code blocks with more than 25 lines appear collapsed – 10 lines high, scrolling inside, faded at the bottom. **Show all N lines** expands them, **Collapse** folds them again (both reachable by keyboard). People who may edit store the state in the block; readers only expand for themselves. The **…** menu sets **Collapsed** and the **Collapsed height** (5, 10, 15, 20 or 30 lines). Printing and every export always show the whole code.
- A language's highlighting loads with the first code block of that language; until then the code shows briefly without colours. Very long code blocks (more than 50,000 characters) stay without highlighting.
- **Fractions**: `/Fraction` (or `/Bruch`) inserts a formula inside the sentence.

![A Markdown code block in the split view: the code with line numbers and a highlighted line on the left, the rendered release notes on the right](/screenshots/code-preview.webp "A code block in Markdown, with line numbers, a highlighted line and the preview beside it.")

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

`@` searches pages, database records and people – keep typing to narrow the list. Journal days come after the other pages. `@today`, `@yesterday` (also `@heute`, `@gestern`) or a date such as `@2026-10-27` offer a link to that day of the [journal](/journal#days-in-lists-search-graph-and-export) under **Journal**. Records appear with their database, such as "Heating – maintenance · Notes"; only records you may read are offered. Mentioning a person notifies them in the inbox.

Links to pages and records stay valid even if they are renamed or moved. A link that shows the old title gets the new one on a rename – in all documents and records you may edit; a link with its own text keeps it. The target lists all links to it under **Linked from** – including records whose text contains the link. Records and pages you may not read do not appear there.

A link to a page or record shows the target's icon in front of its text: its emoji, symbol or own picture – without one, the sign of its kind (document, database, whiteboard, record). When someone changes the icon, every link follows, just as the title does on a rename. This also applies in reading mode, comments, published pages, the hover preview, the `@` list, **Linked from**, **Related pages** and search. A link to a block keeps its paragraph mark unless the page has its own icon. For pages and records you may not read, the link shows only the general link sign. Printing includes the icons; Markdown exports contain only the link text.

## Links to blocks

Every block can be linked: a paragraph, a heading, a list item, a table, an image, a diagram … The link is the page's address with the block, such as `https://flowplan.example.org/#page=…&block=k3x9a2b1` (records add `&row=…`), and works anywhere in the same workspace.

**Copying a link**

- in the block menu (the ⠿ handle left of the block, tap it on a phone): **Copy link to block**,
- for headings via the link symbol that appears after the heading on hover,
- in the [table of contents](#table-of-contents) via the link symbol next to each heading (always visible on phones),
- with <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> (Windows/Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>L</kbd>) for the block the cursor is in.

The address is copied; pasted into other apps (mail, chat, Word) it shows as a link with the text "Page › start of the block".

**Pasting a link**

Paste a copied block link into a document or record of the same workspace (<kbd>⌘</kbd> <kbd>V</kbd>): it becomes a link styled like a page link, with the text "Page › start of the block". If text is selected, that text becomes the link. `@` also finds headings and blocks of other pages: `@Project › Goals` (or `@Project#Goals`) shows the headings of the page "Project" that contain "Goals"; a single search word also finds paragraphs with that text. Headings of the current page are listed as "This page › …".

When the linked page (or record) is renamed, the page title in the link text changes along; the part after "›" stays as it is. On hover, the preview shows the block's current text.

**Opening a link**

A click opens the page (for a record, the record in its dialog), scrolls to the block and briefly highlights it. A block in a collapsed section is expanded. If the block no longer exists, the page opens with the notice "This block no longer exists – the page is open."

**Good to know**

- A block keeps its link when it is edited, moved (also cut and pasted) or turned into another kind. Copies – **Duplicate** or copy and paste within the same document – get a link of their own. When Enter splits a block, the link stays with the first part.
- Preview and link text only show what you may read: for a page you cannot read, only "Linked block" appears, without text.
- In [encrypted spaces](/encrypted-spaces) block links work within the space as well; the server does not know the text there, so there is no text preview.
- People who may only read a page can copy links to its blocks, too.
- **Align left** no longer has a keyboard shortcut (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> now copies the block link); left is the default alignment and stays in the toolbar.

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

In the block menu (click the handle `⋮⋮`) → **Text direction** you set **Automatic**, **Left to right** or **Right to left** for a block and everything inside it. The direction is kept in the HTML export; Markdown has no place for it.

## More blocks

- **Table of contents**: lists the headings of the page and jumps there on click.
- **Two columns**: blocks side by side; stacked on a phone.
- **Linked database**: a view of an existing database with its own filters and sorting; changes to records go to the source. See [Views](/views#linked-databases).
- **Whiteboard**: a whiteboard right in the document; the button at the top right opens it large.
- **Draw** (`/draw`): a block for handwriting across the full width, blank, lined or grid, with a height you drag; several people draw at once without overwriting each other. See [Handwriting in documents](/notebooks#handwriting-in-documents).
