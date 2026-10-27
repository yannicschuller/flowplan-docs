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

Also in the toolbar: **Insert image**, **Emoji or sticker**, **Link page** (a card linking to a Flowplan page), **Shape library**, **Timeline** and **Templates**: retrospective, kanban, mind map, SWOT analysis, flowchart.

## Style elements

Selected elements show a bar with colour, font size, bold, alignment, line width and style, **Bring forward**/**Send backward**, **Duplicate** (<kbd>⌘</kbd> <kbd>D</kbd>) and **Delete** (<kbd>Del</kbd>). Sticky notes and text can also be **hidden** – like a spoiler in a document, revealed with a click.

A double click edits an element's text. Copy and paste work within and between whiteboards.

## Mind maps

Select a sticky note, shape or text and press <kbd>Tab</kbd>: a connected branch appears on the right, ready to be labelled. <kbd>Tab</kbd> on the new branch branches further, <kbd>⌥</kbd> <kbd>Enter</kbd> adds a sibling. The mind map arranges itself: branches sit to the right of their parent, evenly spaced and centred. **Arrange mind map** in an element's bar rearranges the whole tree. Typing on a selected sticky note starts writing right away.

## Diagrams: shape libraries

**Shape library** in the toolbar (or **More shapes …** in the shape menu) opens a searchable side panel – a sheet from the bottom on phones. A click or <kbd>Enter</kbd> puts the shape in the middle of the view, or drag it where you want it; arrow keys move between the shapes. Search works in English and German (“decision”, “Raute”, “gateway” …).

| Library | Shapes |
| --- | --- |
| Flowchart | Process, decision, start/end, data, document(s), predefined process, manual input and operation, database, preparation, delay, display, connector, off-page connector, internal storage, merge, loop limit, annotation |
| BPMN | Start, intermediate, end, timer and message events, task, subprocess, user and service task, exclusive, parallel and inclusive gateway, data object, data store, pool, lane, group |
| UML | Class (with compartments), interface, enumeration, actor, use case, component, package, note, lifelines, activation, initial and final node, state, decision, fork, node, combined fragment |
| ER diagram | Entity with attribute rows, weak entity, relationship, (key, multivalued) attribute |
| Org chart | Person, team, open position |
| Network | Server, database server, internet, firewall, router, switch, laptop, workstation, smartphone, tablet, user, Wi-Fi, printer, web |
| Cloud architecture | Compute, object storage, managed database, queue, function, CDN, load balancer, container, API gateway, cache, monitoring, secrets, virtual network, events |
| Wireframes | Browser, smartphone and tablet frames, dialog, buttons, input and search field, checkbox, radio button, toggle, dropdown, tabs, navigation bar, card, list, image and icon placeholders, avatar, text, slider, progress bar |

All shapes are vector graphics, take fill, line colour and width from the bar, can be connected and look the same in the SVG, PNG and Markdown exports. A double click edits the text; in classes and entities a line `--` separates the compartments (name, attributes, methods). The cloud icons are neutral icons drawn for Flowplan – no logos or icon sets of AWS, Azure or Google Cloud.

**Line ends**: for selected connectors you choose the start and end separately: arrow, open arrow, triangle (inheritance), diamond (aggregation), filled diamond (composition), circle, dot, cross and the crow's-foot ends for ER diagrams (one, exactly one, zero or one, many, one or many, zero or many).

## Arrange automatically

Select several connected shapes → **Arrange automatically** → **Top to bottom** or **Left to right**. Flowplan arranges the diagram in layers (with as few crossings as it can), the top left corner stays where it was and connectors stay attached. One <kbd>⌘</kbd> <kbd>Z</kbd> undoes it all at once. Locked elements stay put.

## Import Mermaid and PlantUML

Simply paste Mermaid or PlantUML text onto the board (<kbd>⌘</kbd> <kbd>V</kbd>), drop a `.mmd` or `.puml` file on it or choose **Import Mermaid/PlantUML …** in the menu at the bottom right. It becomes editable shapes and connectors, laid out automatically:

- **Mermaid**: `flowchart`/`graph` (with shapes, labels, subgraphs as frames), `sequenceDiagram`, `classDiagram`, `erDiagram` (with crow's feet), `stateDiagram`, `mindmap`.
- **PlantUML**: activity diagrams (`start`, `:action;`, `if`/`else`, `while`, `fork` …), sequence, class, use case and component diagrams and `@startmindmap`.

Everything is read on your device – no PlantUML server, no Java. The dialog shows beforehand what was detected. Lines Flowplan does not understand are skipped and listed with their line numbers; pure styling (`style`, `skinparam`, themes) is ignored silently. Limits: 100,000 characters, 400 shapes, 800 connectors, 40 participants in a sequence diagram, files up to 200 KB.

**Copy as Mermaid** (in the export menu) copies the selected shapes with their connectors – or the whole board – to the clipboard as a Mermaid flowchart, for example for a Mermaid diagram in a document.

## Wireframes and clickable prototypes

Sketch screens with the wireframe shapes, ideally one **frame** per screen (with the smartphone frame inside, for example). Select an element – a button, a shape, a sticky note – and set **On click → frame** in the bar, or **On click → back**. A small arrow badge on the element shows the link.

**Play prototype** (shown once there are frames) shows the selected frame – or the first one – full screen. Clicks on linked elements change the screen; a click elsewhere or the **Show clickable areas** button briefly highlights everything clickable. **Back** (<kbd>←</kbd>), **Restart** (<kbd>Home</kbd>) and <kbd>Esc</kbd> to close. Linked elements can be reached with the keyboard too (<kbd>Tab</kbd>, <kbd>Enter</kbd>).

When copying, duplicating and pasting, links point to the frames copied along; archives and exports keep them.

## Timelines (roadmaps)

**Timeline** in the toolbar (or in the shape library under “Planning”) adds a roadmap with a time scale, lanes and bars. While the timeline is selected, move bars right on the board – into another lane, too – and drag their ends to change the start or end. A red line marks today.

A double click or **Edit timeline** opens the settings: title, scale (**weeks**, **months**, **quarters**), period (up to about three years), today marker, lanes and bars with title, lane, dates and colour (up to 40 lanes and 400 bars).

As the **source** you can choose a **database** instead of own bars: records with a date become bars (start, optional end), a select property provides the lanes. The timeline is live: it shows the current state, and anyone who may edit the records moves a record's dates by moving its bar (a time of day is kept). Everyone sees only the records they may read in the database; the records are not stored in the board and therefore do not appear in the board's exports or search.

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

## Navigate

- Zoom with <kbd>⌘</kbd> + scroll wheel, trackpad gestures or the buttons at the bottom right.
- **Show everything** (<kbd>⇧</kbd> <kbd>1</kbd>) fits the view to all elements, <kbd>⇧</kbd> <kbd>2</kbd> to the selection – with a smooth camera move that any input stops at once.
- Undo <kbd>⌘</kbd> <kbd>Z</kbd>, redo <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Z</kbd>.

## Work together

- **Live cursors**: you see the others' pointers with names in real time, as in Miro. Someone working outside your viewport appears as a marker at the edge; a click on it jumps there.
- Changes appear for everyone within seconds, also after a time without a connection.
- A **timer** for workshop phases, visible to everyone. If you like, **background music** plays along (Calm, Focus or Lo-fi): choose it in the timer window under **Music while the timer runs**. It starts and stops with the timer for everyone; volume and mute are up to each person via the speaker icon in the timer. If the browser blocks sound because nothing on the page has been clicked yet, **Sound on** appears. The music is generated in the browser, without audio files or external services.
- **Voting**: set the votes per person and start; everyone puts dots on elements, and the **result** shows the ranking. **Anonymous voting** shows everyone only their own votes until the vote ends – so nobody influences the others.
- **Follow me** (person icon at the bottom): everyone else sees your viewport and follows you as you pan and zoom. Whoever pans or zooms themselves stops following and can return with **Follow**. **End** lifts it for everyone.
- **Comments** on spots of the canvas, with replies and mentions.
- **Private mode** (crossed-out eye icon) for silent brainstorming: anyone who may edit the whiteboard starts it for the whole whiteboard or just one **frame**. While it runs, everyone sees only their own new notes and elements in that area (outlined, “only you”); of the others' contributions only the **number** shows, as hidden placeholders – no text, no names. **Reveal** shows all contributions to everyone at once and ends the mode; anyone with edit rights can do this, even if the facilitator has left. Private content is stored separately on the server and, until it is revealed, reaches neither the others' browsers nor search, exports, previews, the API or AI features. Reloading, a second tab or joining later are no problem; changes made without a connection are sent afterwards.
- **Estimate (planning poker)**: select notes or record cards – or a frame, then everything in it – and choose **Estimate**. Decks: Fibonacci (1, 2, 3, 5, 8, 13, 21, ?, ☕), T-shirt sizes (XS–XL) or your own values. Everyone picks a card hidden; you only see who has already estimated. **Reveal cards** shows the distribution, average, median and whether there is a **consensus**. **Apply result** writes the value onto the note as a label – for record cards into a number, select or text property of the record (with the usual permissions). Then **Next element** or **Estimate again**.
- **Bring everyone here**: everyone else jumps once to your current view – unlike “Follow me”, they move freely again afterwards. With a frame selected, the magnet icon brings everyone **to this frame**. The others see a notice (“Mara brought everyone here”) and return to where they were with **Back**.

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
- **Copy as Mermaid** takes shapes and connectors along as a Mermaid flowchart (see above).
