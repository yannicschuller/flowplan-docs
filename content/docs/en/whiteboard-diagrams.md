---
keywords: mind map, flowchart, uml, bpmn, mermaid, plantuml, excalidraw, draw.io, wireframe, roadmap
---

# Diagrams, mind maps and prototypes

On the whiteboard: mind maps with Tab, shape libraries for flowcharts and networks, Mermaid, PlantUML, Excalidraw and draw.io, wireframes and roadmaps.

## Mind maps

Select a sticky note, shape or text and press <kbd>Tab</kbd>: a connected branch appears on the right, ready to be labelled. <kbd>Tab</kbd> on the new branch branches further, <kbd>⌥</kbd> <kbd>Enter</kbd> adds a sibling. The mind map arranges itself: branches sit to the right of their parent, evenly spaced and centred. **Arrange mind map** in an element's bar rearranges the whole tree. Typing on a selected sticky note starts writing right away.

## Diagrams: shape libraries

**Shape library** under **+** (or **More shapes …** in the shape menu) opens a searchable side panel – a sheet from the bottom on phones. A click or <kbd>Enter</kbd> puts the shape in the middle of the view, or drag it where you want it; arrow keys move between the shapes. Search works in English and German (“decision”, “Raute”, “gateway” …).

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

Simply paste Mermaid or PlantUML text onto the board (<kbd>⌘</kbd> <kbd>V</kbd>), drop a `.mmd` or `.puml` file on it or choose **Import Mermaid/PlantUML …** under **+**. It becomes editable shapes and connectors, laid out automatically:

- **Mermaid**: `flowchart`/`graph` (with shapes, labels, subgraphs as frames), `sequenceDiagram`, `classDiagram`, `erDiagram` (with crow's feet), `stateDiagram`, `mindmap`.
- **PlantUML**: activity diagrams (`start`, `:action;`, `if`/`else`, `while`, `fork` …), sequence, class, use case and component diagrams and `@startmindmap`.

Everything is read on your device – no PlantUML server, no Java. The dialog shows beforehand what was detected. Lines Flowplan does not understand are skipped and listed with their line numbers; pure styling (`style`, `skinparam`, themes) is ignored silently. Limits: 100,000 characters, 400 shapes, 800 connectors, 40 participants in a sequence diagram, files up to 200 KB.

**Copy as Mermaid** (in the export menu) copies the selected shapes with their connectors – or the whole board – to the clipboard as a Mermaid flowchart, for example for a Mermaid diagram in a document.

## Import Excalidraw and draw.io

Use **Import …** under **+** – or drop the file onto the board – to bring in drawings from:

- **Excalidraw** (`.excalidraw`),
- **draw.io / diagrams.net** (`.drawio`, `.xml`, also compressed and with several pages) and **draw.io SVG exports** with an embedded diagram.

Shapes, texts, arrows with their connections and labels, freehand strokes, frames, colours, stroke widths, dashes and rotations become whiteboard items. Several draw.io pages are placed side by side, each in a frame of its own. What Flowplan doesn't know (stencils, embeds, external images) becomes a note with its text. Embedded pictures (PNG, JPEG, GIF, WebP) are stored as files of the page and count towards the storage quota.

- Dropping such a file into a **document** creates a new whiteboard below it and embeds it right away.
- In the **ZIP import** (see [Import](/import-export-versions#import)) `.excalidraw` and `.drawio` files become whiteboard pages.
- Limits: 20 MB per file (30 MB unpacked), 3,000 elements, 50 pages. Flowplan fetches nothing from the internet during import; texts are taken over as plain text.

## Wireframes and clickable prototypes

Sketch screens with the wireframe shapes, ideally one **frame** per screen (with the smartphone frame inside, for example). Select an element – a button, a shape, a sticky note – and set **On click → frame** in the bar, or **On click → back**. A small arrow badge on the element shows the link.

**Play prototype** (shown once there are frames) shows the selected frame – or the first one – full screen. Clicks on linked elements change the screen; a click elsewhere or the **Show clickable areas** button briefly highlights everything clickable. **Back** (<kbd>←</kbd>), **Restart** (<kbd>Home</kbd>) and <kbd>Esc</kbd> to close. Linked elements can be reached with the keyboard too (<kbd>Tab</kbd>, <kbd>Enter</kbd>).

When copying, duplicating and pasting, links point to the frames copied along; archives and exports keep them.

## Timelines (roadmaps)

**Timeline** under **+** (or in the shape library under “Planning”) adds a roadmap with a time scale, lanes and bars. While the timeline is selected, move bars right on the board – into another lane, too – and drag their ends to change the start or end. A red line marks today.

A double click or **Edit timeline** opens the settings: title, scale (**weeks**, **months**, **quarters**), period (up to about three years), today marker, lanes and bars with title, lane, dates and colour (up to 40 lanes and 400 bars).

As the **source** you can choose a **database** instead of own bars: records with a date become bars (start, optional end), a select property provides the lanes. The timeline is live: it shows the current state, and anyone who may edit the records moves a record's dates by moving its bar (a time of day is kept). Everyone sees only the records they may read in the database; the records are not stored in the board and therefore do not appear in the board's exports or search.
