---
keywords: timeline, gantt, zoom, milestone, dependencies, critical path, period
---

# Timeline

The timeline shows records with a date range as bars on a time axis – for project plans, roadmaps and schedules.

Bars from a start to an end date field, on one continuous grid.

- **Header** {since=0.10.2}: **‹ Today ›**, the visible period, **Scale**, **Period** and the zoom sit in one line. The sliders icon opens the **timeline settings** (zoom slider, **Go to**, weekends, milestones, properties beside the title, dependencies); the **i** shows the help.
- **Scale** {since=0.10.2}: day, week, 2 weeks, month, quarter, year or 5 years. At every scale you scroll on freely – with trackpad, mouse wheel or a swipe, across month and year ends too.
- **Period** {since=0.10.2}: **Continuous** starts with the current month (or week, quarter, year) and scrolls on across month and year ends without stopping. **From – to** shows a fixed period, say November to March, in one piece. **All records** fits the period to the filtered records, from the first start to the last end with a little margin. The period is saved with the view.
- **Zoom** {since=0.10.2}: between the scales, **−** and **+**, the slider in the settings, <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + mouse wheel or two fingers zoom – around the pointer or the fingers. **Fit** shows the whole period (or all records) at once. The zoom is saved with the view.
- **Titles stay in sight** {since=0.10.2}: when a long bar runs out of view on the left, its title stays at the left edge of the time axis as long as the bar is visible. If the title does not fit into the bar, it stands to its right. Under **Show beside the title** you pick up to four properties (say No. and owner) shown muted after the title.
- **Milestones** {since=0.10.2}: a record with the same start and end appears as a diamond ◆ with its title beside it; dependency arrows attach to the diamond. Under **Milestones** you can also pick a checkbox property – checked records become a diamond on their last day.
- **‹** and **›** scroll by about four fifths of the width, **Today** jumps to the current date, **Go to** to any day. The view remembers where you were on this device. {since=0.10.2}
- The **axis** has two rows that follow the zoom: month and days, month and calendar weeks (from about 10 pixels a day), quarter and months, year and months. {since=0.10.2}
- A bar that goes on beyond the period has an open, dashed edge there. If a record lies entirely outside, **Jump to the period** takes you to it. {since=0.10.2}
- Move bars or drag their edges. On touch devices, hold a bar briefly, then drag it; a quick swipe scrolls the timeline. The handles at the edges drag at once. <kbd>Esc</kbd> cancels a drag in progress. The calendar icon opens a date dialog, also for unscheduled records.
- Weekends can be highlighted.
- When a bar is too short for its title (say one day on the month scale), the title stands beside the bar. {since=0.10.2}
- Keyboard: ++Alt ←/→++ moves by one day, with <kbd>⇧</kbd> it changes the end, with <kbd>Ctrl</kbd> the start. When the timeline has the focus, <kbd>T</kbd> jumps to today, <kbd>F</kbd> fits, <kbd>+</kbd>/<kbd>−</kbd> zoom. {since=0.10.2}

# Dependencies (Gantt)

Records can wait for each other – for example "Print" only after "Proofreading":

- In the timeline's bar, choose a relation of the database to itself under **Dependencies** – or **Set up dependencies** creates a "Dependencies" property.
- **Link by dragging:** drag from the round handle at the end of a bar onto another bar – that one then waits for the first. Links that would create a circle are refused.
- **Arrows** connect the bars; if a record starts before its predecessor ends, the arrow is red. While dragging, the timeline already warns which record would be too early.
- **Move successors along:** moving a record moves every record that waits for it, directly or indirectly, by the same number of days – in one step. What counts is the side the link is attached to: the record's end for "End → start" and "End → end", its start for "Start → start" and "Start → end".
- **Resolve all conflicts** moves every record that starts too early behind its predecessor.
- **Highlight critical path** marks the records and arrows without slack: if one of them is delayed, the end of the whole plan moves.

In embedded views (linked databases), linking by dragging and **Resolve all conflicts** are not available – open the database itself for that.
