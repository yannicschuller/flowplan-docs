# Whiteboards

An infinite canvas for brainstorming, processes and workshops: sticky notes, shapes, connectors, pen, frames and tables – together and live.

## Tools

| Tool | Key | What for |
| --- | --- | --- |
| Select | <kbd>V</kbd> | Select, move, scale and rotate elements; drag a rectangle to select several |
| Hand | <kbd>H</kbd> | Move the canvas (also with space + drag or two fingers) |
| Sticky note | <kbd>N</kbd> | Coloured notes with text |
| Text | <kbd>T</kbd> | Free text |
| Shape | <kbd>R</kbd> | Rectangle, rounded, ellipse, diamond, triangle, hexagon, star, arrow, cloud |
| Connector | <kbd>L</kbd> | Straight, curved or elbowed; sticks to elements and follows them |
| Pen | <kbd>P</kbd> | Draw freehand |
| Eraser | <kbd>X</kbd> | Delete drawn strokes: just move over them |
| Frame | <kbd>F</kbd> | Group areas – and slides for presenting |
| Table | <kbd>G</kbd> | A simple table on the canvas |
| Comment | <kbd>C</kbd> | Pin a comment to a spot |
| Stamp | <kbd>E</kbd> | A quick reaction (👍 ❤️ ⭐ ✅ ❓ 🔥 💡 🎉) on an element; once more takes it back |
| Laser pointer | <kbd>K</kbd> | Point without changing anything: everyone sees a red trail that fades shortly |

Also in the toolbar: **Insert image**, **Emoji or sticker**, **Link page** (a card linking to a Flowplan page) and **Templates**: retrospective, kanban, mind map, SWOT analysis, flowchart.

## Style elements

Selected elements show a bar with colour, font size, bold, alignment, line width and style, **Bring forward**/**Send backward**, **Duplicate** (<kbd>⌘</kbd> <kbd>D</kbd>) and **Delete** (<kbd>Del</kbd>). Sticky notes and text can also be **hidden** – like a spoiler in a document, revealed with a click.

A double click edits an element's text. Copy and paste work within and between whiteboards.

## Mind maps

Select a sticky note, shape or text and press <kbd>Tab</kbd>: a connected branch appears on the right, ready to be labelled. <kbd>Tab</kbd> on the new branch branches further, <kbd>⌥</kbd> <kbd>Enter</kbd> adds a sibling. The mind map arranges itself: branches sit to the right of their parent, evenly spaced and centred. **Arrange mind map** in an element's bar rearranges the whole tree. Typing on a selected sticky note starts writing right away.

## Align, stack and sort

- When moving, edges and centres snap to other elements; orange **guides** show to which. <kbd>⌥</kbd> while dragging turns snapping off.
- **Snap to grid** (grid button at the bottom) snaps elements without neighbours to the 24-point grid.
- Select several elements → **Arrange**: align left, centre, right, top, middle or bottom, distribute evenly or stack as a row or column.
- For workshops: **Group by colour**, **Group by person** (with headings), **Sort by votes** or **Arrange as a grid**.

## Pen and shape recognition

With a tablet pen (such as an Apple Pencil) the stroke width follows the pressure. Choose the colour in the pen menu; with **Recognise shapes**, drawn lines, rectangles, circles, triangles and diamonds turn into clean shapes (<kbd>⌥</kbd> on release keeps the stroke).

Once you have drawn with a pen on a device, only the pen draws: fingers move and zoom the board, a resting hand leaves no strokes. A hand resting on the screen while the pen draws neither cuts nor moves the stroke. **Draw with the pen only** in the pen menu switches this off – fingers then draw too, except the hand holding the pen: a touch while the pen draws or hovers, or within a moment after lifting it, moves the board instead. A pen touching down lightly does not start the stroke thick, and the width follows the pressure smoothly. Writing with Scribble in an open text on the board may run past its edges; the text stays open. A hovering Apple Pencil (iPad Pro, iPad Air M2 and later) shows where the stroke starts; the eraser end of a pen erases like the **Eraser**. In the [iPad app](/offline-and-apps#apps-for-iphone-ipad-and-android), double-tapping or squeezing the Apple Pencil switches to the eraser and back, to the previous tool or to the pen, as set on the iPad. The same applies when marking up images in documents.

## Images, icons and records

- **Images and icons** (magnifier in the toolbar) searches freely licensed images on Openverse; chosen images are uploaded to the server, and the credit shows as a tooltip on the image. There is also the icon library in ten colours.
- **Link page → Record from "…"** places a database record as a card. The card shows the title and up to three properties and stays up to date when the record changes; a double click opens it.

## Sticky notes as database records

Turn a brainstorm into a backlog: select notes → **As records in database …** (database icon) in the bar. Without a selection the dialog takes the notes in view, with a selected frame the notes in it. This works without any AI.

1. Choose the **target database** – you are offered databases you may add records to.
2. **Mapping:** the note's first line becomes the **title**, further lines the record's content. Optionally the **colour** becomes a select property (one option per note colour; options with the same name such as "Yellow" or "Red" are preselected) and the note's **author** a person property.
3. **Replace with cards** swaps the notes for record cards in the same place – connectors then attach to the card. **Keep and link** leaves the notes and places the cards next to them, joined by a dashed line.

The cards are live: when someone changes the record in the database, the board shows it at once. Others see the new cards like any edit; one <kbd>⌘</kbd> <kbd>Z</kbd> takes the change to the board back in one step (the records stay in the database).

- At most 500 notes at once; the server creates them in batches of 100, progress shows how far it got, **Cancel** stops – whatever was created already goes onto the board.
- Trying again after an error creates nothing twice.
- Values are checked like every edit: locked properties, existing options, only members as people.
- **Split with AI** (when AI is available to you): the AI reads the notes' text and fills further properties – such as assignee, due date or priority. A **preview** first shows the values per note, anything that does not fit is listed with the reason; records are only created after that.
- In the [API](/api-and-webhooks) the command is `whiteboard.toRecords`.

## AI on the whiteboard

When [AI](/ai) is on for you, **AI** in the toolbar (on phones under **More tools**) opens these features. Without AI the button is missing and everything else works as usual; on boards the AI may not read, the entries are greyed out with the reason.

- **Group by theme (AI)** – also in the **Arrange** menu once two notes are selected: the AI finds themes in the selected notes (without a selection: those in view) and arranges them in labelled columns, like **Group by colour**. Notes without text and those that fit nowhere go under "Other".
- **Summarise as a page** – reads the board (or the selection or selected frame) and creates a page next to it: summary, themes, **Decisions**, **Open questions** and **Action items**, with a link back to the board. With **Take over action items** they become real tasks with person and due date where the board names them – they appear in **My tasks**. Frames become sections; the AI reads large boards in parts, and the page says what was left out beyond the limit of 2,000 elements.
- **Create with AI …** – a **mind map** or a **flowchart** from a description, such as "how a holiday request is approved". It appears in the middle of the view (or to the right of it when something is already there) as normal shapes and connectors; the mind map uses the layout of **Arrange mind map**. At most 60 and 40 nodes respectively.

Every action shows its progress and can be **cancelled**; an error shows in the dialog with **Try again**. The result is an ordinary change to the board: everyone sees it live, and **one** <kbd>⌘</kbd> <kbd>Z</kbd> takes it all back. Hidden notes stay hidden from the AI; it reads linked pages and records only when it may read them.

## Navigate

- Zoom with <kbd>⌘</kbd> + scroll wheel, trackpad gestures or the buttons at the bottom right.
- **Show everything** (<kbd>⇧</kbd> <kbd>1</kbd>) fits the view to all elements, <kbd>⇧</kbd> <kbd>2</kbd> to the selection – with a smooth camera move that any input stops at once.
- Undo <kbd>⌘</kbd> <kbd>Z</kbd>, redo <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd>.

## Work together

- **Live cursors**: you see the others' pointers with names in real time, as in Miro. Someone working outside your viewport appears as a marker at the edge; a click on it jumps there.
- Changes appear for everyone within seconds, also after a time without a connection.
- A **timer** for workshop phases, visible to everyone.
- **Voting**: set the votes per person and start; everyone puts dots on elements, and the **result** shows the ranking. **Anonymous voting** shows everyone only their own votes until the vote ends – so nobody influences the others.
- **Follow me** (person icon at the bottom): everyone else sees your viewport and follows you as you pan and zoom. Whoever pans or zooms themselves stops following and can return with **Follow**. **End** lifts it for everyone.
- **Comments** on spots of the canvas, with replies and mentions.

## Present

As soon as there are frames, **Present** appears. The frames are shown one after another in reading order (top to bottom, left to right), filling the screen; arrow keys or the buttons page through, **End presentation** or <kbd>Esc</kbd> closes.

## Import Excalidraw and draw.io

Use **Import …** at the bottom right – or drop the file onto the board – to bring in drawings from:

- **Excalidraw** (`.excalidraw`),
- **draw.io / diagrams.net** (`.drawio`, `.xml`, also compressed and with several pages) and **draw.io SVG exports** with an embedded diagram.

Shapes, texts, arrows with their connections and labels, freehand strokes, frames, colours, stroke widths, dashes and rotations become whiteboard items. Several draw.io pages are placed side by side, each in a frame of its own. What Flowplan doesn't know (stencils, embeds, external images) becomes a note with its text. Embedded pictures (PNG, JPEG, GIF, WebP) are stored as files of the page and count towards the storage quota.

- Dropping such a file into a **document** creates a new whiteboard below it and embeds it right away.
- In the **ZIP import** (see [Import](/import-export-versions#import)) `.excalidraw` and `.drawio` files become whiteboard pages.
- Limits: 20 MB per file (30 MB unpacked), 3,000 elements, 50 pages. Flowplan fetches nothing from the internet during import; texts are taken over as plain text.

## Embed and export

- With `/board` in a document, a whiteboard becomes part of a page; the button at the top right opens it large.
- **Export as PNG** or **Export as SVG** saves the whiteboard as an image. In the [Markdown export](/import-export-versions#export), every whiteboard comes along as an SVG automatically.
- The text on the board is searchable and appears in exports.
