# Views

A database can have as many views as you like. Every view shows the same records with its own layout, filters, sorting and groups.

New view: **+** next to the view tabs, then choose one of the {{facts.views|word}} layouts. **View and properties** controls which properties are visible and in which order.

A **right-click on a view tab** opens its menu: **Rename**, **Duplicate**, **Settings …**, **Set as default view**, **Move left**, **Move right** and **Delete view** (the records are kept; the last view cannot be deleted). Tabs can also be **reordered by dragging**, and a double-click renames them.

**Default view:** the view that appears first when the database is opened – the board instead of the table, for example. Without it, the first view opens. A small star in the tab marks it; it can also be set in the view settings (handy on a phone).

## Table

- Edit cells directly; open records as a page via their title.
- Move columns by drag and drop, resize them at their edges.
- Choose a calculation below every column.
- Grouped tables fold groups and show summaries per group.

## Board

The kanban view groups cards into columns, for example by status, select, person or relation.

- Move cards between and within columns by drag and drop: the card lifts, the target column opens a gap, and on release the card settles in. This changes the grouping property.
- **New** at the foot of a column creates a record right in that group.
- Reorder, hide or collapse columns; "No group" collects records without a value.
- **Add group** to the right of the columns creates your own status, such as "Waiting for customer": it is saved as a new option of the grouping select property and appears right away as a column of its own.
- Sub-groups also split the board into rows (swimlanes).
- With multi-select and relations, a card can appear in several columns; moving it only replaces the respective assignment.
- Cards can be dragged on touch devices too.

## Calendar

Month, week and day view by a date field.

- Week and day show an hourly grid with an all-day row and overlaps placed side by side.
- Move appointments in 15-minute steps, extend or shorten them at their edges.
- A click on an hour creates an appointment, **All day +** an all-day record.
- Every view has its own time zone; without a setting the browser's applies.
- Keyboard: <kbd>Alt</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd> moves by 15 minutes, <kbd>Alt</kbd> + <kbd>←</kbd>/<kbd>→</kbd> by one day.

### Subscribe to a calendar

**Subscribe** in the calendar view creates your personal link for Apple Calendar, Google Calendar or Outlook. It shows the records of this view with its filters – only what you may see – and recurrences as series. The link is secret and shown only once; **Create new link** invalidates the old one, **End subscription** switches it off. If you lose access to the database, the link returns nothing anymore.

### Sync both ways (CalDAV)

In the same dialog, **Set up access** sets up sync with Apple Calendar, Thunderbird or DAVx⁵ (Android). Events you add, move, rename or delete there land in the database.

- **Credentials**: you get a server, a username and a password that is shown only once.
- **Apple**: **Set up in Apple Calendar** (in the app, in Safari or on a Mac) downloads a configuration profile with the account – install it under Settings → **Profile Downloaded**. Several calendars at once: **Settings → Calendars & issues → Calendars on iPhone, iPad and Mac**. By hand: Add account → Other → CalDAV account, type “Manual”.
- **Thunderbird and DAVx⁵**: they take the calendar address directly.
- **Several devices**: each profile gets its own access, so a calendar set up on the Mac keeps working when you install the profile on the iPhone. **End access** or **Create new password** ends all accesses to this calendar, those of profiles included.
- **Permissions**: your own rights apply – whoever can only read the database cannot change anything from the calendar. Workflow and automations apply as for any change.

Google Calendar does not support CalDAV accounts; use the calendar sync below for it.

### Sync with Google Calendar or Outlook

**Calendar sync** keeps a view with a date and a calendar in Google Calendar or Microsoft Outlook / 365 in step both ways – personally, with your own account.

1. **Settings → Calendars & issues → Connect calendar** → **Connect Google Calendar** or **Connect Microsoft Outlook / 365**. You sign in with the provider and allow access to your calendars.
2. In the database, open the calendar icon next to **…** (**Calendar sync**), pick the view, the account and the calendar, and **Connect**.

What is synced:

- **Title** ↔ event title.
- **Date** ↔ start and end: a date without a time becomes an all-day event, a date with a time a timed event. The view decides which date properties are start and end; the time zone of the calendar view applies to dates without their own time zone.
- **The record's document** ↔ description, as plain text. The description ends with a link back to the record.
- **New, changed, deleted** – both ways. Events deleted in the calendar move their records to the database's trash.

Good to know:

- Flowplan syncs **every ten minutes** and only fetches changes; **Sync now** in the dialog syncs right away.
- **Conflicts**: when both sides change the same event, the later change wins. The audit log records every conflict.
- **Permissions**: only records you may see and edit go to the calendar and are changed by it. Workflow and automations apply as for any change.
- **Range**: events from 90 days back to one year ahead. Recurring events from the calendar arrive as single records; a recurring record goes to the calendar with its first date.
- **Disconnect** under **Settings → Calendars & issues** ends every sync of that connection. You can also revoke access in your Google or Microsoft account.
- An administrator sets up the providers once, see [Configuration](/configuration#calendar-sync).

## Sprints

Backlog, sprints with goal and period, burndown and velocity – see [Projects, tickets and sprints](/projects-and-tickets#sprints).

## Timeline

Bars from a start to an end date field, on a scale of week, month, quarter or year.

- Move bars or drag their edges; the calendar icon opens a date dialog, also for unscheduled records.
- **Today** jumps to the current date; weekends can be highlighted.
- Keyboard: <kbd>Alt</kbd> + <kbd>←</kbd>/<kbd>→</kbd> moves by one day, with <kbd>⇧</kbd> it changes the end, with <kbd>Ctrl</kbd> the start.

### Dependencies (Gantt)

Records can wait for each other – for example "Print" only after "Proofreading":

- In the timeline's bar, choose a relation of the database to itself under **Dependencies** – or **Set up dependencies** creates a "Dependencies" property.
- **Link by dragging:** drag from the round handle at the end of a bar onto another bar – that one then waits for the first. Links that would create a circle are refused.
- **Arrows** connect the bars; if a record starts before its predecessor ends, the arrow is red. While dragging, the timeline already warns which record would be too early.
- **Move successors along:** moving a record moves every record that waits for it, directly or indirectly, by the same number of days – in one step. What counts is the side the link is attached to: the record's end for "End → start" and "End → end", its start for "Start → start" and "Start → end".
- **Resolve all conflicts** moves every record that starts too early behind its predecessor.
- **Highlight critical path** marks the records and arrows without slack: if one of them is delayed, the end of the whole plan moves.

In embedded views (linked databases), linking by dragging and **Resolve all conflicts** are not available – open the database itself for that.

## Gallery

Cards with a preview image and selected properties. The image comes from the record's content, its cover or a files property, filling the card or fitted in.

## List

Compact rows with the title and a few properties, good for long collections.

## Feed

Records including their document content one below the other, like a blog or a log. The title, **Open record** or the comment count opens the full record. More records load in steps of 20.

## Chart

**Configure chart** chooses columns, bars, line or donut, the grouping and the calculation – count, sum, average, minimum, maximum. Date values can be summarised by day, week, month or year. A click on a data point shows the records behind it; **Export as CSV** exports all values.

- **Series** split every group by another property, side by side or stacked.
- **More values** put up to four additional calculations next to the main value, such as "sum of costs" next to "sum of revenue" per month. Every value becomes a series of its own with a legend; series and more values cannot be combined.

## Form

Collects records through a form, also from people without an account. See [Forms](/forms).

## Linked databases

In a document, `/db` shows a view of an existing database. The embed has its own views, filters and sorting; records and their changes still belong to the source. The source name in the header opens the full database.

Reading it requires access to both the document and the source. The embed grants no additional permissions; **Remove** only deletes the block.
