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

Also in the toolbar: **Insert image**, **Emoji or sticker**, **Link page** (a card linking to a Flowplan page), **Shape library**, **Timeline**, **Racks** (plan server racks, see [Racks and cabling](#racks-and-cabling)), **Embed** (video, web page or PDF, see [below](#embed-videos-web-pages-and-pdfs)) and **Templates** (see [Templates](#templates)).

## Style elements

Selected elements show a bar with colour, font size, bold, alignment, line width and style, **Bring forward**/**Send backward**, **Duplicate** (<kbd>⌘</kbd> <kbd>D</kbd>) and **Delete** (<kbd>Del</kbd>). Sticky notes and text can also be **hidden** – like a spoiler in a document, revealed with a click.

A double click edits an element's text. Copy and paste work within and between whiteboards. **Italic** and **Underline** apply to the whole text of an element, like **Bold**.

## Group

Select several elements and press <kbd>⌘</kbd> <kbd>G</kbd> (or **Group** in the bar): from then on they behave like one. A click selects the whole group, and it is moved, scaled at the corners, duplicated, copied, locked and deleted together. Groups can be combined into larger groups.

- A **double click** on a grouped element enters the group: a dashed outline shows it, and clicks now select single elements inside (in nested groups, the next level). <kbd>Esc</kbd> or a click elsewhere leaves the group.
- <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>G</kbd> or **Ungroup** dissolves the outermost group of the selection.
- Copies of a group are a new group of their own. Like every change, grouping is shared live and can be undone with <kbd>⌘</kbd> <kbd>Z</kbd>.

## Lists, links and tags

Sticky notes, shapes and texts know a few formats right in the text:

| You write | Result |
| --- | --- |
| `- item` | Bulleted list (the **Bulleted list** and **Numbered list** buttons in the bar set it for the marked lines) |
| `1. item` | Numbered list; <kbd>Enter</kbd> continues the list, an empty line ends it |
| `**bold**`, `*italic*`, `__underline__` | Emphasise single words – while typing with <kbd>⌘</kbd> <kbd>B</kbd>, <kbd>⌘</kbd> <kbd>I</kbd>, <kbd>⌘</kbd> <kbd>U</kbd> |
| `[text](https://…)` | Link – **Insert a link into the text** in the bar puts it around the marked text |

Links may only point to `https://`, `http://` and `mailto:` or to an element of the same board (see below); other addresses stay plain text. Web links open in a new tab. In addition, every element can carry a **link** of its own (chain icon in the bar); a small icon at its corner leads there.

**Tags** on sticky notes show as coloured chips along the bottom edge – a tag always has the same colour. In the board search, **Only notes tagged** highlights all notes with that tag and dims the rest.

## Links to frames and elements

**Copy link to this element** (in the bar of a selected element or in the frames panel) copies an address like `…/#page=…&item=…`. Whoever opens it sees the board zoomed to the element and selected – provided they may read the board.

Inside the board, links to elements fly there: in an element's link field or in the text as `[To the goal](#item=…)`. If the element is gone, a note says so.

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

## Racks and cabling

On a whiteboard you plan server racks: racks with their rack units (U), devices in them, ports on the devices and cables from port to port. Racks and devices are elements like sticky notes and shapes – combine them freely with notes, text, frames and network diagrams from the [shape library](#diagrams-shape-libraries). Working together, undo, comments, presenting and the export as SVG, PNG or PDF work as for every other element.

### Adding racks

**Racks** in the toolbar opens the device library (on phones under **More tools**, as a sheet). At the top you add a **Rack 42U**, **Rack 24U** or a **Wall cabinet 12U** – with a click next to the last rack, or by dragging it to a spot. Several racks stand side by side this way.

A selected rack shows its **details** on the right: name, location, height in U (1–60), width (10″, 19″ or 23″), **View** front or rear, **Max. power** (W) and **Max. weight** (kg), plus the units used, the total power and weight and the list of devices. You also change the height with the handles at the top and bottom of the rack. **Front/Rear** in the bar above the rack turns it around.

### Mounting devices

The library contains servers (1, 2 and 4U), storage/NAS, switches (24 and 48 ports, 24 × SFP+, each with SFP uplinks and console), patch panels (24 and 48 ports, fibre with 24 × LC), router, firewall, UPS, PDU (1U and vertical as 0U), blanking panels, cable managers and shelves – each with height, ports, power and weight.

- **Drag** a device to a spot: over a rack it snaps to whole units, next to it it lies freely on the board.
- **Click** it (or press <kbd>Enter</kbd> in the search field) to put it into the selected rack – or the rack in the middle of the view – at the highest free place. When the rack is full, the device lies next to it.
- Move mounted devices with the mouse to other units or another rack; with <kbd>↑</kbd>/<kbd>↓</kbd> by one unit (<kbd>⇧</kbd>: five units), <kbd>⌥</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> changes the height. The handles at the top and bottom change the height in whole units too.
- **Duplicate** (<kbd>⌘</kbd> <kbd>D</kbd>) puts the copy at the next free place of the same rack. Deleting a rack deletes its devices.
- When two devices overlap or one sticks out of the rack, both are hatched red and marked with **!**; the rack counts them in its details.

Devices can have **half depth** (mounted at the front or the rear): a front and a rear device then share the same units. In the other view they only show as a dashed outline. Vertical PDUs are mounted as **0U left/right** in the side channel.

A device's **details**: name, kind, manufacturer, model, serial number, height, position (lowest U), mounting, depth, colour, power (W), weight (kg), notes – for PDUs and UPSs also **Capacity** (W) with the current load. **Take out of the rack** puts it next to the rack.

**Save as own device** stores the device with its ports and values in the workspace's library (section **Own devices**). The person who saved it and owners of the workspace can delete it.

### Ports

Every device has ports with name, type (RJ45, SFP, SFP+, SFP28, QSFP+, QSFP28, LC, SC, MPO, console, USB, C13, C14, C19, C20, Schuko, DC), side (front or rear), label and VLAN. The ports of the side the rack shows are drawn; connected ports take the colour of their cable, a tooltip shows name, type and label. In the details you change or remove ports and add several at once with **Add ports** (count, type, side, prefix such as `Gi1/0/`). Clicking a port on the board shows it in the details.

### Cables

Cables are connectors whose ends sit on ports: with the **connector tool** (<kbd>L</kbd>) you drag from one port to another – also between two racks. A line that starts or ends on a port becomes a cable; its type follows the ports (power, console, fibre, DAC or Cat6a). Without drawing, use a device's details: **Connect …** at the port, then choose the device and a free port.

Cables run like in a tidy rack: from the port to the edge of its device, through the side channel and, between racks, over the top of the racks; every cable has its own lane. Colour and stroke follow the type (e.g. OM3 aqua, OM4 violet, OS2 yellow, power thick, DAC dashed); a colour of its own takes precedence. Hovering or selecting a cable highlights both ends. **Show cables** in the view menu hides and shows all cables (the choice applies in this browser).

A cable's **details**: its two ends (a click jumps to the device and port), cable type (Cat5e, Cat6, Cat6a, Cat7, Cat8, OM3, OM4, OM5, OS2, DAC, AOC, power, console, other), colour, label, length in metres, VLAN and notes. If more than one cable is plugged into a port, the details point it out.

### Power and weight

The power and weight of the devices add up per rack (in the rack's header and details). Power cables from a PDU or UPS to a device make up the PDU's load: a device with two power supplies on two PDUs shares its power between both, a PDU on a UPS passes its whole load on to the UPS. When a rack exceeds its **Max. power** or **Max. weight**, or a PDU/UPS its capacity, a warning shows in the rack's header, on the device and in the details.

### Ports and cables at a glance

**Ports & cables** (in the view menu and the device library) shows all ports of the board as a table – rack, device, port, type, connected to, cable, VLAN – and all cables with label, type, ends, length and VLAN. Filter by text, category (network, fibre, power) and assignment (connected, free), sort by clicking the column headers; clicking a row shows the device or cable on the board. **Export as CSV** downloads the filtered list, **Print labels** prints one label per cable end (label, this end, the other end, type, length, VLAN).

### Import and export

- **Export JSON** (device library) saves the racks with devices, ports and cables – the selected ones or all – as a file; **Import JSON** places them on a board. This way you move racks to other boards and workspaces.
- **From NetBox …** fetches racks from [NetBox](https://netboxlabs.com/): enter the NetBox address, an API token (read-only is enough) and optionally a site (slug) and rack names. Flowplan queries racks, devices, device types (height, depth, weight), interfaces, front and rear ports, console and power ports and cables once and places them on the board (up to 20 racks). The address and token are used for this request only and are not stored on the server; **Remember the address and token in this browser** keeps them in your browser only. NetBox has to be reachable at a public HTTPS address – for a NetBox in the internal network see `NETBOX_ALLOW_PRIVATE` in the [configuration](/en/configuration#integrations).
- The board's **SVG, PNG and PDF export** shows the racks as they stand on the board. The **Markdown export** adds a section **Racks and cabling** to the board's SVG picture, with the devices per rack, the port assignments and the cable list as tables.

The AI and [MCP](/en/mcp) (`read_page`) read a board's racks, devices, ports and cables as text. On phones you view and edit racks: tapping selects a device, **Details** in the bar opens the details as a sheet, and the device library is under **More tools**.

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
- **Crop** (in the bar of an image): choose the part with the mouse, a finger or the arrow keys (<kbd>⇧</kbd> resizes). The image itself stays unchanged – **Show the whole image** undoes the crop at any time, and exports show the cropped part too.
- **GIFs**: when the instance has a key for GIPHY or Tenor (see [Configuration](/configuration#integrations)), **Images and icons** gets a **GIFs** tab. The search runs through the server; a chosen GIF is stored on the server like the Openverse images (up to 8 MB), and afterwards the board loads nothing from the provider. Without a key the tab is hidden.
- **Link page → Record from "…"** places a database record as a card. The card shows the title and up to three properties and stays up to date when the record changes; a double click opens it.

Cards of linked documents that are tall enough show the first lines of the page as a small preview.

## Embed videos, web pages and PDFs

**Embed** in the toolbar (on phones under **More tools**) takes a link:

- **Videos and web pages** from YouTube, Vimeo, Loom, Spotify, Figma and CodePen – the same list as for embeds in documents. Other addresses are refused. The board first shows only a preview with the provider; the content loads only after a click on **Load**, in an isolated frame (sandbox), and **Close embed** unloads it again. YouTube runs through `youtube-nocookie.com`.
- **PDFs**: **Upload PDF …** or drag a PDF file onto the board. The file is stored in the page and counts towards the storage quota; the board shows one page as a preview, with arrows to page through. A double click opens the PDF viewer.

Exports show a card with the provider and link instead of the player.

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
- **Minimap** (map icon at the bottom right, on narrow boards in the **View and actions** menu): a small overview of all elements with the visible part. Click or drag to go there; with the focus on the minimap the arrow keys move the view. The browser remembers whether it is open.
- **Search the board** (<kbd>⌘</kbd> <kbd>F</kbd> on the board, or the magnifier at the bottom): searches sticky notes, shapes, texts, tables, frames, comments, embeds and page and record cards. <kbd>Enter</kbd> and <kbd>⇧</kbd> <kbd>Enter</kbd> (or the arrows) jump to the next or previous match, which is highlighted; <kbd>Esc</kbd> closes the search.

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

## Frames panel

**Frames** (bottom right, or in the **View and actions** menu) lists all frames with a small preview – on phones as a sheet from the bottom.

- A click on the preview flies to the frame; the name can be renamed right there.
- **Dragging** the grip (or <kbd>⌥</kbd> + arrow keys) changes the order – it is the order of the presentation and is saved with the board. Until someone sorts, reading order applies (top to bottom, left to right).
- **Hide from the presentation** (eye icon) skips a frame when presenting without deleting it.
- **Speaker notes** per frame, shown only in the presentation.
- Also: **Copy link to this element**, **Export frame** and **Present from here**.

## Present

As soon as there are frames, **Present** appears. The frames are shown one after another in the order of the frames panel, filling the screen; hidden frames are left out, and everything outside the current frame fades away. Arrow keys or the buttons page through, **End presentation** or <kbd>Esc</kbd> closes.

- **Speaker notes** shows the notes of the frame.
- **Presenter view** opens the same second window as for [documents](/documents#speaker-notes-and-presenter-view): the current and the next slide, the notes and the elapsed time. Both windows stay in step – you can move on in either of them.

## Templates

**Templates** opens a searchable gallery with previews, sorted by category:

| Category | Templates |
| --- | --- |
| Retrospectives | Retrospective, 4L retrospective, starfish retrospective |
| Planning | Kanban, user story map, sprint planning, project timeline, Eisenhower matrix, impact/effort matrix |
| Strategy | OKRs, SWOT analysis, lean canvas, business model canvas, customer journey |
| Ideas | Empathy map, brainstorm, mind map |
| Diagrams | Flowchart, decision tree, org chart |
| Meetings | Meeting agenda, icebreaker |

A template lands in the middle of the view and is ordinary board content afterwards.

**Own templates**: **Save as template** turns the whole board or the selection into a template – **For the workspace** or **Only for me**. Comments, votes and stamps stay out; images and PDFs remain files of the workspace. Own templates are in the **Own templates** tab; the person who saved one and owners can delete it. At most 500 templates per workspace.

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
- **Export as PNG** or **Export as SVG** saves the whiteboard as an image.
- **Export … (PNG, SVG, PDF)** opens the export dialog: what (**Whole board**, **Selection** or a single frame), the format and, for PNG, the **Resolution** 1×, 2× or 4×. As a **PDF** the board comes **Everything on one page** or with **One page per frame** in presentation order (hidden frames left out). The export is made in the browser; the server sees nothing of it.
- In the [Markdown export](/import-export-versions#export), every whiteboard comes along as an SVG automatically.
- The text on the board is searchable and appears in exports.
- **Copy as Mermaid** takes shapes and connectors along as a Mermaid flowchart (see above).
