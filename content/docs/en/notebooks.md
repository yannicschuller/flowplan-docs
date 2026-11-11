# Notebooks and handwriting

A **notebook** is a page of sheets to write on – with the Apple Pencil, another tablet pen, a mouse or a finger, like a paper notebook. The sheets sit one below the other and you scroll through them. Each sheet has its paper (lined, grid, dotted, Cornell, music staff …) or a page of a PDF as its background. There is also **handwriting in documents**: a drawing block in the middle of the text.

![A notebook: the page overview with two sheets on the left, a sheet of lined paper with handwritten lecture notes, a boxed formula, highlights and a sketch on the right](/screenshots/notebook.webp "A notebook: lined paper with pen and highlighter; a rectangle has snapped around the formula.")

## Creating a notebook

**New page** → **Notebook** (or **New notebook** in the command palette). A new notebook starts with one sheet of lined A4 paper.

**From a PDF:** in the same dialog, choose a file under **Open a PDF as the notebook**. Every page of the PDF becomes a sheet with that page as its background – lecture slides, worksheets or forms are then written on as if printed. **⋯ → Import PDF …** adds more PDF pages to an existing notebook, after the current sheet. Up to 500 pages per import and 1000 sheets per notebook.

**From GoodNotes and other note apps:** export the notebooks as PDF and import them under **Settings → Import & export → Import** with the source **GoodNotes** – several at once or as a ZIP, every PDF becomes a notebook. Step by step: [Moving from GoodNotes](/migrate#from-goodnotes).

## Paper

| Template | Looks like |
| --- | --- |
| Blank | no lines |
| Lined (college) | lines 7.1 mm apart (college ruled) with a margin |
| Lined (wide) | lines 8.7 mm apart (wide ruled) with a margin |
| Grid (5 mm) | squared paper |
| Dotted | dots every 5 mm |
| Cornell notes | title band, cue column on the left, summary at the bottom |
| Music staff | 12 staves (8 in landscape) |

Plus **A4** or **Letter**, **portrait** or **landscape**, and **light** or **dark**. On dark paper, black ink shows light and the highlighter glows.

The lines icon in the toolbar (or **Change paper …** in a sheet's menu) opens the choice. **Apply to**:

- **This sheet** – only the current sheet gets its own paper;
- **Notebook default** – for all sheets without their own paper and for new sheets;
- **All sheets** – sets the default and removes every sheet's own paper.

Sheets from a PDF keep their PDF page and its size.

## Writing

Whoever may edit the page writes right away – there is no "Annotate" step as in the PDF viewer. At the top is the toolbar: **Pen** (with pressure), **Highlighter**, **Eraser** (whole strokes or partial), **Lasso** (move, resize, recolour, copy, duplicate, delete), **Text** and **Laser pointer**, three favourite pens, colours, widths and the pen settings. They work as when [annotating PDFs](/documents#annotate-pdfs): only the pen writes once you have used it, fingers scroll and zoom, a resting hand leaves no marks; holding still at the end of a stroke straightens it into a line, rectangle, ellipse …

Everything is saved as you write (on the right of the toolbar: *Saved*). Every change of a sheet is a version. When two people write on the same sheet at the same time, both keep their strokes; a notice says that someone wrote along. What others write appears after a few seconds.

Readers of the page see all sheets, zoom and export, but no tools.


Besides the preset widths, the slider button sets any line width, with a preview. The **+** after the colours opens a custom colour (colour field, hue, hex value); your recent custom colours are remembered on the device. For **Text** you choose the size (8–96 pt) and the font there: Default, Instrument Sans, Instrument Serif, JetBrains Mono, Caveat or Patrick Hand. In the PDF export Caveat and Patrick Hand come out as Helvetica, Instrument Serif as Times and JetBrains Mono as Courier.

With 'Insert PDF …' (in the plus menu or under 'More actions') you add a PDF to an existing notebook – before the first sheet, after any sheet or at the end; in the page overview, a sheet's menu offers 'Insert PDF before/after …' directly. Each PDF page becomes a sheet of its own with the page as background that you write on as usual (at most 500 pages per PDF, 1000 sheets per notebook). Two fingers zoom smoothly at the spot between them and move the sheets; on a trackpad, pinch or use Ctrl + scroll, and the Apple Pencil keeps writing undisturbed.
### Keyboard shortcuts

| Key | Does |
| --- | --- |
| <kbd>P</kbd> <kbd>H</kbd> <kbd>E</kbd> <kbd>L</kbd> <kbd>T</kbd> <kbd>K</kbd> | Pen, highlighter, eraser, lasso, text, laser pointer |
| <kbd>⌘</kbd> <kbd>Z</kbd> / <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd> | Undo / redo |
| <kbd>⌘</kbd> <kbd>C</kbd>, <kbd>⌘</kbd> <kbd>V</kbd>, <kbd>⌘</kbd> <kbd>D</kbd>, <kbd>Delete</kbd> | Copy, paste, duplicate, delete the selection |
| <kbd>⌘</kbd> <kbd>+</kbd> / <kbd>⌘</kbd> <kbd>−</kbd> / <kbd>⌘</kbd> <kbd>0</kbd> | Zoom in, zoom out, fit to width |
| <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>↵</kbd> | New sheet after the current one |
| <kbd>⌥</kbd> <kbd>↓</kbd> / <kbd>⌥</kbd> <kbd>↑</kbd> | Next / previous sheet |
| <kbd>⌘</kbd> <kbd>S</kbd> | Save now |

On Windows and Linux use <kbd>Ctrl</kbd> instead of <kbd>⌘</kbd> and <kbd>Alt</kbd> instead of <kbd>⌥</kbd>. On an iPad with a keyboard the same shortcuts apply.

### Tools, favourite pens and eraser

Tap the selected tool again (or the gear) to open its settings: line width with presets and a slider, colour with a custom colour (colour area, hex value, eyedropper where the browser has one), and for text the size and font. + saves the current setting as a favourite pen (up to 8, text too); favourites appear in the toolbar and can be reordered or removed with the pencil button next to them. Favourites are kept per device. The eraser has three kinds: whole strokes, parts only (strokes are split, adjustable size) and highlighter only – the writing underneath stays. "Clear page" deletes everything on the sheet after asking; Undo brings it back.

**Restyle text afterwards.** With the Text tool, tap an existing text box: it opens for editing with a bar above it – font, size (presets, slider or a number, 8–96 pt), **bold**, *italic*, underline, alignment (left, centre, right) with line spacing, and colour; ⌘B, ⌘I and ⌘U work while typing. Several text boxes at once: select them with the lasso – the selection bar then shows a second row with the same settings, applied to every selected text box; where they differ it shows "—". Each change can be undone on its own. "Edit text" in the selection bar opens a single text box for typing. The Text tool's panel sets how new text looks. In the PDF export, bold and italic use the standard Helvetica, Times and Courier fonts; the handwriting fonts appear as Helvetica there. Older app versions show such text without this styling; if they save the page, the text stays but the styling is lost.

### Shapes and ruler

Hold the pen still at the end of a stroke and it straightens into a line, arrow, rectangle, circle, triangle, diamond, polygon or star – squares and circles come out exact, lines snap to 15° steps, ends attach to the corners of other shapes. Keep moving without lifting to resize; Undo brings back the freehand stroke. The **Shapes** tool (S key) draws shapes directly or recognises them when you lift, optionally with a semi-transparent fill or dashed lines; in the tool's panel you pick the line style by its line sample (the name shows as a tooltip). Tap a shape with the lasso to move its corners, rotate or resize it, or change its colour, fill, line style and arrow heads. The **ruler** in the toolbar lies on the page at real scale (cm or inches): move it with one finger, turn it with two (it snaps at 0/15/30/45/60/90°); strokes along its edge come out straight and show their length. The **set square** measures angles between lines, and the **compass** draws circles and arcs of a set radius.

### Selecting with the lasso
With the lasso (key L), tap a stroke or text to select just it, or draw a loop around several. Drag the selection to move it; the four corners resize it (Shift or a finger keeps the proportions), the round handle above it rotates it (snapping to 15° steps). On the iPad, two fingers on the selection scale and rotate it. The bar above the selection changes the colour (custom colours too) and line width, cuts, copies, duplicates, brings to front or sends to back, and deletes. Paste cut ink onto another sheet: tap the sheet, then ⌘V or "Paste". Copied ink is also put on the clipboard as a picture for other apps. Every action can be undone on its own.
### Converting handwriting to text
When AI is set up on your instance and allowed for the page, "Convert to text" turns the selected handwriting into text with the instance's AI model (it must understand images, e.g. a vision model in Ollama). The selected snippet is sent to the model as a picture. You can edit the recognised text, then insert it in place of the handwriting or next to it, or copy it. The feature is not offered in journals with a PIN or on pages closed to the AI.

### Pictures, stickers and own paper templates

**Pictures and stickers.** Use **Insert** (picture icon) to put a picture from a file, straight from the camera, from the page's pictures, or a sticker on the sheet; you can also paste pictures (⌘V) or drag them onto a sheet. A picture appears in a frame: drag to move, drag a corner to resize (Shift: freely), use the handle above to rotate. The frame offers crop, bring to front/send to back (over or under the handwriting), opacity, duplicate, delete and "Save as sticker". Tap a picture with the lasso to edit it again. Pictures are attachments of the page, included in search and in the PDF export. Your own stickers (from pictures or lasso selections) are visible only to you, in every notebook of the workspace.

**Own paper templates.** In the paper dialog, **Own › Add template …** turns a picture or a PDF page (a planner page, say) into paper, stretched or tiled. Templates belong to the workspace; whoever added one (or an owner) can rename or delete it. Sheets keep their paper even when the template is deleted.

### Recording audio

Tap the microphone in the notebook bar and choose **Start recording**. While it runs (up to three hours), Flowplan remembers for everything you write the moment in the recording. The bar shows the time and the level; you can pause and stop. When you stop, the recording is uploaded and attached to the notebook; it counts against your storage. If the page reloads or the connection drops, the recording stays on the device and Flowplan offers to save it the next time you open the notebook.

To play it, choose the recording in the list. What was written during it starts out faded and appears as the recording reaches it. With **Play from here** (hand icon) or a long press with your finger you jump to the moment something was written. Speed: 1×, 1.5×, 2×. Recordings can be renamed, downloaded and deleted (they go to the trash); they come along with copies and exports of the notebook. In the app, Flowplan needs access to the microphone (Settings › Flowplan › Microphone).

## Page overview

**Overview, contents and presenting.** "All sheets and contents" opens every sheet as a grid. Tap a sheet's bookmark and filter with "Bookmarks only". Search finds titles, typed text and recognised handwriting and marks the matches. To reorder, drag a sheet with the mouse, hold and drag it with a finger or the Pencil, or move it with Alt + arrow keys. Under "Select" (Shift for a range) you duplicate, move or copy several sheets to another notebook, change their paper, export them as PDF or delete them. Deleting can be undone at once and restored for 30 days from "Deleted sheets …". The "Contents" tab lists your chapters (a sheet's menu → "Mark page as a chapter", indent, outdent, rename) and your bookmarks; a tap jumps there. "Insert link …" links to another sheet or page. "Present" shows the notebook full screen, sheet by sheet (arrow keys, Page Up/Down, swipe), with a laser pointer and a marker that fades after a few seconds. Anyone who has the notebook open, even read-only, sees "Follow" and then your sheet and pointer live. Select typed text with the lasso and 'Add to the contents as a heading' adds an entry to the contents that jumps to that spot. With several sheets selected in the overview, 'Paper …' changes the paper of all of them at once.

The sidebar icon on the left of the toolbar shows all sheets as previews; a tap jumps to the sheet. With **⋯** on a preview: **New sheet after**, **Duplicate** (with everything on it), **Change paper …**, **Move up**, **Move down** and **Delete**. You also change the order by dragging a preview or with <kbd>⌥</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> on the focused preview. **+** in the toolbar adds a sheet **after the current sheet** or **at the end**, as does **Add sheet** below the last sheet.

## Exporting as PDF

**⋯ → Export as PDF** downloads the notebook as a PDF: one page per sheet in the sheet's size, paper and handwriting as vectors (sharp at any zoom), PDF sheets with their original page including its text. The Markdown export puts the notebook into the ZIP as a PDF as well and writes a short Markdown file with a link to it and the recognised text. The PDF, Word and EPUB exports show the sheets as pictures (Word: only their text). Published and shared notebooks are read-only.

## Handwriting in documents

Type `/draw` in a document (also `/zeichnen`, `/dessin`, `/handwriting` or `/sketch`): a **drawing block** across the full width appears. With a pen you write on it right away; with a mouse or finger after a tap into the block (or on **Draw**) – so a finger keeps scrolling the document. Then the toolbar appears with the block's **paper** (**Blank**, **Lined**, **Grid**) and **Done**. Drag the bottom edge to change the **height** (or use the arrow keys on the handle).

![A drawing block on grid paper in a document: three sketched app screens with arrows and a red note, the toolbar above it](/screenshots/draw-block.webp "A drawing block in the middle of a document, with Grid paper and the toolbar.")

The handwriting belongs to the block and is saved as you draw. For working together this means: when several people draw in the same block at once, their strokes are merged instead of overwritten; the text around it you edit together as always. Copied or duplicated blocks (also into another document) take their drawing along and are independent afterwards. Permissions, locking and the trash work as for the document; on published pages, in share links and in exports the block shows as a picture.

## Recognising handwriting (iPhone and iPad)

In the Flowplan app for iPhone and iPad the device itself recognises what you write – the strokes do not leave the device for this:

- **Search:** shortly after saving, the handwriting of a sheet, a drawing block or a PDF page is recognised and its text saved along. Search then also finds notebooks, documents and PDFs by what is handwritten.
- **Convert to text:** select handwriting with the **lasso** and choose **Convert to text** (the *Aa* icon) in the selection's bar. In a notebook and on PDFs, typed text replaces the strokes in their place; in a drawing block the text becomes a paragraph below the block. Undo brings the strokes back.

In the browser and the desktop app there is no recognition; **Convert to text** does not appear there. Text typed on sheets, in drawing blocks and on PDFs is searchable everywhere.

## Limits

- [Encrypted spaces](/encrypted-spaces) have no notebooks and no drawing blocks.
- Locked pages show the handwriting; it can be changed after unlocking.
- A notebook's page versions only hold its appearance; each sheet has its own versions of the handwriting.
- Drawing blocks exist in documents and journal days, not in the documents of database records.
