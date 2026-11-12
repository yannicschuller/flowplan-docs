---
keywords: brainstorming, live cursors, voting, timer, retro, presentation, frames, template
---

# Whiteboards: together, with AI and presenting

Live on one board with others, sticky notes as database records, AI for ideas and clusters, presenting frames as slides and starting from templates.

## Work together

- **Live cursors**: you see the others' pointers with names in real time, as in Miro. Someone working outside your viewport appears as a marker at the edge; a click on it jumps there.
- Changes appear for everyone within seconds, also after a time without a connection.
- A **timer** for workshop phases, visible to everyone. If you like, **background music** plays along (Calm, Focus or Lo-fi): choose it in the timer window under **Music while the timer runs**. It starts and stops with the timer for everyone; volume and mute are up to each person via the speaker icon in the timer. If the browser blocks sound because nothing on the page has been clicked yet, **Sound on** appears. The music is generated in the browser, without audio files or external services.
- **Voting**: set the votes per person and start; everyone puts dots on elements, and the **result** shows the ranking. **Anonymous voting** shows everyone only their own votes until the vote ends – so nobody influences the others.
- **Follow me** (under **Facilitation**): everyone else sees your viewport and follows you as you pan and zoom. Whoever pans or zooms themselves stops following and can return with **Follow**. **End** lifts it for everyone.
- **Comments** on spots of the canvas, with replies and mentions.
- **Private mode** (crossed-out eye icon) for silent brainstorming: anyone who may edit the whiteboard starts it for the whole whiteboard or just one **frame**. While it runs, everyone sees only their own new notes and elements in that area (outlined, “only you”); of the others' contributions only the **number** shows, as hidden placeholders – no text, no names. **Reveal** shows all contributions to everyone at once and ends the mode; anyone with edit rights can do this, even if the facilitator has left. Private content is stored separately on the server and, until it is revealed, reaches neither the others' browsers nor search, exports, previews, the API or AI features. Reloading, a second tab or joining later are no problem; changes made without a connection are sent afterwards.
- **Estimate (planning poker)**: select notes or record cards – or a frame, then everything in it – and choose **Estimate**. Decks: Fibonacci (1, 2, 3, 5, 8, 13, 21, ?, ☕), T-shirt sizes (XS–XL) or your own values. Everyone picks a card hidden; you only see who has already estimated. **Reveal cards** shows the distribution, average, median and whether there is a **consensus**. **Apply result** writes the value onto the note as a label – for record cards into a number, select or text property of the record (with the usual permissions). Then **Next element** or **Estimate again**.
- **Bring everyone here**: everyone else jumps once to your current view – unlike “Follow me”, they move freely again afterwards. With a frame selected, the magnet icon brings everyone **to this frame**. The others see a notice (“Mara brought everyone here”) and return to where they were with **Back**.

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

When [AI](/ai) is on for you, **AI** under **+** (on phones under **More tools**) opens these features. Without AI the button is missing and everything else works as usual; on boards the AI may not read, the entries are greyed out with the reason.

- **Group by theme (AI)** – also in the **Arrange** menu once two notes are selected: the AI finds themes in the selected notes (without a selection: those in view) and arranges them in labelled columns, like **Group by colour**. Notes without text and those that fit nowhere go under "Other".
- **Summarise as a page** – reads the board (or the selection or selected frame) and creates a page next to it: summary, themes, **Decisions**, **Open questions** and **Action items**, with a link back to the board. With **Take over action items** they become real tasks with person and due date where the board names them – they appear in **My tasks**. Frames become sections; the AI reads large boards in parts, and the page says what was left out beyond the limit of 2,000 elements.
- **Create with AI …** – a **mind map** or a **flowchart** from a description, such as "how a holiday request is approved". It appears in the middle of the view (or to the right of it when something is already there) as normal shapes and connectors; the mind map uses the layout of **Arrange mind map**. At most 60 and 40 nodes respectively.

Every action shows its progress and can be **cancelled**; an error shows in the dialog with **Try again**. The result is an ordinary change to the board: everyone sees it live, and **one** <kbd>⌘</kbd> <kbd>Z</kbd> takes it all back. Hidden notes stay hidden from the AI; it reads linked pages and records only when it may read them.

## Frames panel

**Frames** (in the **…** menu of the bottom bar, **View and actions**) lists all frames with a small preview – on phones as a sheet from the bottom.

- A click on the preview flies to the frame; the name can be renamed right there.
- **Dragging** the grip (or <kbd>⌥</kbd> + arrow keys) changes the order – it is the order of the presentation and is saved with the board. Until someone sorts, reading order applies (top to bottom, left to right).
- **Hide from the presentation** (eye icon) skips a frame when presenting without deleting it.
- **Speaker notes** per frame, shown only in the presentation.
- Also: **Copy link to this element**, **Export frame** and **Present from here**.

## Present

As soon as there are frames, **Present** appears in the bar at the bottom left; the arrows next to it also go to the previous or next frame without presenting. The frames are shown one after another in the order of the frames panel, filling the screen; hidden frames are left out, and everything outside the current frame fades away. Arrow keys or the buttons page through, **End presentation** or <kbd>Esc</kbd> closes.

- **Speaker notes** shows the notes of the frame.
- **Presenter view** opens the same second window as for [documents](/reading-and-presenting#speaker-notes-and-presenter-view): the current and the next slide, the notes and the elapsed time. Both windows stay in step – you can move on in either of them.

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

You'll find more whiteboard templates from the community in the [Flowplan Marketplace](https://marketplace.flowplan.org).
