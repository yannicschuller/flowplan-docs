---
keywords: timeline, gantt, zoom, milestone, dependencies, critical path, period, arrows, hierarchy, summary bar, group, weekends
---

# Timeline

The timeline shows records with a date range as bars on a time axis – for project plans, roadmaps and schedules.

Bars from a start to an end date field, on one continuous grid.

- **Header** {since=0.11.0}: **‹ Today ›**, the visible period, **Scale**, **Period** and the zoom sit in one line. The sliders icon opens the **timeline settings** (zoom slider, **Go to**, weekends, milestones, properties beside the title, hierarchy, groups, colours, dependencies and arrows); the **i** shows the help.
- **Scale** {since=0.11.0}: day, week, 2 weeks, month, quarter, year or 5 years. At every scale you scroll on freely – with trackpad, mouse wheel or a swipe, across month and year ends too.
- **Period** {since=0.11.0}: **Continuous** starts with the current month (or week, quarter, year) and scrolls on across month and year ends without stopping. **From – to** shows a fixed period, say November to March, in one piece. **All records** fits the period to the filtered records, from the first start to the last end with a little margin. The period is saved with the view.
- **Zoom** {since=0.11.0}: between the scales, **−** and **+**, the slider in the settings, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + mouse wheel or two fingers zoom – around the pointer or the fingers. **Fit** shows the whole period (or all records) at once. The zoom is saved with the view.
- **Titles stay in sight** {since=0.11.0}: when a long bar runs out of view on the left, its title stays at the left edge of the time axis as long as the bar is visible. If the title does not fit into the bar, it stands to its right. Under **Show beside the title** you pick up to four properties (say No. and owner) shown muted after the title.
- **Milestones** {since=0.11.0}: a record with the same start and end appears as a diamond ◆ with its title beside it; dependency arrows attach to the diamond. Under **Milestones** you can also pick a checkbox property – checked records become a diamond on their last day. To keep one-day records as bars, check **Only the milestone property makes milestones**. {since=0.11.0}
- **‹** and **›** scroll by about four fifths of the width, **Today** jumps to the current date, **Go to** to any day. The view remembers where you were on this device. {since=0.11.0}
- The **axis** has two rows that follow the zoom: month and days, month and calendar weeks (from about 10 pixels a day), quarter and months, year and months. {since=0.11.0}
- A bar that goes on beyond the period has an open, dashed edge there. If a record lies entirely outside, **Jump to the period** takes you to it. {since=0.11.0}
- Move bars or drag their edges. On touch devices, hold a bar briefly, then drag it; a quick swipe scrolls the timeline. The handles at the edges drag at once. <kbd>Esc</kbd> cancels a drag in progress. The calendar icon opens a date dialog, also for unscheduled records.
- Weekends can be highlighted.
- When a bar is too short for its title (say one day on the month scale), the title stands beside the bar. {since=0.11.0}
- Keyboard: ++Alt ←/→++ moves by one day, with <kbd>⇧</kbd> it changes the end, with <kbd>Ctrl</kbd> the start. When the timeline has the focus, <kbd>T</kbd> jumps to today, <kbd>F</kbd> fits, <kbd>+</kbd>/<kbd>−</kbd> zoom. {since=0.11.0}

# Dependencies (Gantt)

Records can wait for each other – for example "Print" only after "Proofreading":

- In the timeline's bar, choose a relation of the database to itself under **Dependencies** – or **Set up dependencies** creates a "Dependencies" property.
- **Link by dragging:** drag from the round handle at the end of a bar onto another bar – that one then waits for the first. Links that would create a circle are refused.
- **Arrows** connect the bars; if a record starts before its predecessor ends, the arrow is red. While dragging, the timeline already warns which record would be too early.
- **Move successors** {since=0.11.0}: what happens to the records that wait for a moved record – directly or indirectly?
  - **Only when dates overlap:** they move only as far as the link requires; existing slack stays. If you move a record earlier, everything stays put.
  - **Keep the gaps:** they move by the same number of days, the gaps stay the same. What counts is the side the link is attached to: the record's end for "End → start" and "End → end", its start for "Start → start" and "Start → end".
  - **Off:** nothing moves along; the timeline shows conflicts in red.
  - Views that had **Move successors along** checked before are set to **Keep the gaps**, the others to **Off**.
- **Avoid weekends** {since=0.11.0}: records moved along never start or end on a Saturday or Sunday. If the start would fall on a weekend, it moves to the Monday and the record keeps its number of working days (Monday to Friday) – a record from Thursday to Friday then runs from Monday to Tuesday, for example. Records only ever move later, never earlier. This also applies to **Resolve all conflicts** and the button on a single conflict; the record you drag yourself lands exactly where you let go.
- **Undo** {since=0.11.0}: after moving successors, resolving a conflict and **Resolve all conflicts**, a notice says "N dependent records moved". **Undo** puts all records involved back in one step – including the one you dragged. If someone has changed one of them in the meantime, everything stays as it is.
- **Resolve all conflicts** moves every record that starts too early behind its predecessor.
- **Highlight critical path** marks the records and arrows without slack: if one of them is delayed, the end of the whole plan moves.

In embedded views (linked databases), linking by dragging and **Resolve all conflicts** are not available – open the database itself for that.

Dragging (in the calendar too), **Undo**, resolving conflicts and adding or removing dependencies only work on date and dependency properties you may edit; otherwise Flowplan refuses the change. {since=0.11.5}

# Arrows {since=0.11.0}

Many dependencies quickly tangle a plan. In the **timeline settings** you choose for each view how the arrows appear:

- **Show arrows:** **All**, **Only critical path**, **Only for the chosen record** (arrows appear only while you point at a bar, reach it with the keyboard or have it open in the side panel) or **Hide in this view**. Hidden arrows change nothing about the dependencies: conflicts, **Move successors** and the critical path still apply.
- **Arrows over bars:** **Opaque** draws the arrows fully over everything. **Transparent** shows the parts that run over another bar or its title only faintly; between bars they stay strong. **Behind bars** puts the arrows under the bars – the calmest, but they disappear completely under long bars.
- **Routing:** **Orthogonal** leads the arrow, as in most planning tools, out of the end, down and into the start; if the successor starts before the end, the arrow loops over it. **Curved** draws a curve.
- New timeline views start with **Transparent** and **Orthogonal**; existing ones keep their look (**Opaque**, **Curved**) until you change it.
- **Focus:** when you point at a bar (or its record is open in the side panel), its incoming and outgoing arrows get stronger and all others fade. While you point at it or drag it, its days are marked in the axis as well.
- **Removing an arrow:** when you point at an arrow, it and both bars are highlighted and a small **×** appears at its end. It removes the link; **Undo** in the notice brings it back. With the keyboard, the **×** appears for all arrows into a bar as soon as it has the focus.
- **Out of view:** when one end of an arrow lies outside the visible area, the timeline draws only a short stub with the arrowhead at the edge. Rows whose bar lies outside on the left or right show a small **←** or **→** at the edge that jumps to the bar.
- **Redundant links:** when a link already follows from others (A → C when A → B → C exists), the settings list it as a hint. Only what you remove yourself is removed.

# Hierarchy and groups {since=0.11.0}

- **Hierarchy property:** choose a relation of the database to itself that holds the parent record (say "Parent"). Sub-records are indented below their record; **▾**/**▸** collapses and expands them. The view remembers on this device which records are collapsed. **Collapse all** and **Expand all** above the title column show only the top level, or everything again, with one click. The hierarchy property and the dependencies are two different relations.
- **Summary bars:** a parent record shows a thin dark bar with points at both ends. It runs from the earliest start to the latest end of all records below it and follows them when they move – the record's own dates do not count for it. With **Show own dates as a baseline**, they show as a faint line below it when they differ.
- **Expanding and collapsing** is briefly animated: sub-records slide out from under their record, the rows below move along, the arrows follow. For collapsed records, the arrows of their sub-records attach to the summary bar. If "reduce motion" is set on your system, it happens at once.
- **Group by** sorts the records into groups by a property (select, checkbox, text, number …), each with its own summary bar – the lighter option for databases without a hierarchy. Groups can be collapsed as well.
- **Colour by** fills the bars in the colour of an option of a select property (say level or status), legible in the light and the dark theme.
- **Only the milestone property makes milestones:** then only records with the milestone property checked become a diamond; one-day records stay bars.

The shared timeline shows arrows, hierarchy, groups and colours just the same – read-only. Readers can expand and collapse records; nothing is saved.
