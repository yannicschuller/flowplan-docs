---
keywords: task, to-do, todo, checklist, check off, assign, due date, my tasks
---

# Tasks in documents

Tasks right in the text: tick them off, assign them to a person, give them a due date and one of five statuses as in Obsidian.

## Tasks with assignee and date

A task (`/todo` or `[]` + space) with a mention such as `@Anna` is assigned to Anna: she gets a notification and finds the task under **My tasks** in the sidebar. You set a date while the cursor is in the task, with the calendar button in the toolbar or through the text menu (select text or right-click → **Due date**). The date appears as a chip at the right of the line (highlighted today, red when overdue); a click on it changes the date or removes it with **Remove date**. A new task made with <kbd>Enter</kbd> starts without a date.

**My tasks** shows everything in one list, grouped by due date (Overdue, Today, Next 7 days, Later, No date): tasks from documents, journals and your page "Tasks", plus records from databases that have a status or a done checkbox. Records of databases without such a field (e.g. documents, contacts, reading lists) are not tasks and don't appear here. {since=0.9.8} Below, **From other workspaces** lists your tasks from your other workspaces, per workspace; clicking the page switches there. Ticking off and changing the date take effect right in the document, also for others who have it open. On the due date a reminder arrives in the morning; the number next to "My tasks" shows how many are due today or overdue.

**On phones** {since=0.11.6} the source (All, Documents, Databases), the due range and **Filters** share one row at the top. **Filters (2)** shows how many more filters are set; behind it are person, **Show completed**, unassigned tasks from your pages, database, search and **Save as view**. The due range opens as a sheet from the bottom.

**Tasks without @name:** A task without a person appears under **My tasks** when it is in a day of your journal, on your page **Tasks** or – with a date – in a page you created. The switch **Also unassigned tasks from my pages** in the filter row adds all open tasks without a person from your pages, also without a date. It is off at first and applies to you on all your devices. {since=0.11.5}

**Tasks of your own, without a document:** At the top of **My tasks** there is the field **Add a task …** – type, press <kbd>Enter</kbd>, done. The task goes to your own page **Tasks**, which Flowplan creates the first time in your private space of the workspace (if you have none yet, a private space "Private" is created). The quick capture shorthand works here too: "Pay taxes tomorrow" or "Call the dentist Friday" set the date. `@name` gives the task only to someone who can open the page – your page is private, so otherwise the name stays in the text and a note says why; write tasks for others in a document you both can see. The page is a normal page: you find it in the sidebar, can rename or move it, and its tasks can do everything tasks can (states, ++Ctrl/⌘ L++, the reminder on the due date, widgets, Siri and Spotlight). If you delete it, the next task creates a new one. Guests and members with read-only access do not see the field.

**Where new tasks go:** The button at the end of the field **Add a task …** (it shows the target, **Tasks** at first) chooses where new tasks go – your page **Tasks** or a task database you may add records to that counts for My tasks (a status or a done checkbox). The task then becomes a record, mapped as in **Move tasks to a database …**: the text becomes the title, the shorthand's date the due date, `@name` the person property (only for someone who can open the database), plus `#tag` and `!priority`. Without `@name` you are the person and the status gets the first open value; the database's default values, default template and automations apply as for any new record. If the database is in the trash, you may no longer add records to it, or it no longer has a status, the task goes to your page **Tasks** and a note below the field says why. The choice is per workspace, only for you, and also applies to quick capture and the apps' widgets. {since=0.11.5}

**Filters** {since=0.9.8}: the filter row above the list has

- **Source:** All, Documents or Databases.
- **Person:** **Assigned to me** shows tasks given to you with @, your own, those from your journals (even without @name and without a date) and records that list you in a person property. **All** adds every record you can see. **My own** shows only your page "Tasks".
- **Due:** Any date, Overdue, Today, Next 7 days, With a date or No date. "Today" and "Next 7 days" also include everything overdue.
- **Show completed.**

Flowplan remembers the filters on this device. The database picker, search and saved views sit under **Databases only:** and apply only to records. You can tick records off right in the list. {since=0.9.8} **Open the page "Tasks"** takes you there.

**New tasks:** When someone gives you a task, a blue number appears next to "My tasks" in the sidebar (on a phone on **Navigation**) until you open My tasks; there the new tasks carry a small **New** while that view is open. The light number next to it still counts what is due today or overdue.

## Task status

A task has one of five statuses, as in Obsidian: **Open** `[ ]`, **In progress** `[/]` (a half-filled box), **Done** `[x]`, **Cancelled** `[-]` (a grey box with ×, struck through) and **Deferred** `[>]` (a box with →).

- Clicking the box ticks the task off or opens it again, as before; a task **in progress** is done with one click.
- **Right-click** the box (on tablets and phones: **long-press** it) to open a small menu with all five statuses.
- ++⌘/Ctrl L++ turns the line with the cursor into a task; on a task it changes the status: open → in progress → done → open. Cancelled and deferred tasks become open again. With several lines selected, all of them get the next status of the first one. In a bulleted or numbered list only that line becomes a task; the list is split there.
- **Reset a whole checklist** {since=0.9.8}: in a task's [block menu](/blocks#block-menu) (the `⋮⋮` handle; on a phone tap the task first), **Mark all as open** sets every task of that list, subtasks included, back to **Open** – handy for packing lists you use again and again. **Check all** marks them all done; cancelled ones stay cancelled. One undo brings the previous state back. With [several blocks selected](/blocks#selecting-several-blocks) (on touch devices via **Select several**) it applies only to the chosen tasks; on a computer both entries are also in a checklist's right-click menu.
- **In progress** and **Deferred** count as open: they are listed under **My tasks** (with their status) and in the app's widgets, get the reminder on their due date and move on to the next day in a journal. **Cancelled** counts as closed but not as done: the task leaves "My tasks", does not move to the next day and is not listed among the completed tasks in the journal review.
- Ticking off a task in progress under **My tasks** or in a widget makes it done.
- Older app and desktop versions show the statuses as ticked (done, cancelled) or open (all others).

## Moving tasks to a database {since=0.11.1}

When a document gets crowded with tasks, move them into a task database: **⋯** → **Move tasks to a database …** (only for documents with tasks that you may edit). Choose a database you may add records to and map the fields:

- The task's text becomes the title, further paragraphs below it the record's content.
- **Done** goes into a status (you pick the option for done and for open tasks) or a checkbox. Cancelled tasks count as done, "In progress" and "Deferred" as open.
- The due date goes into a date property, the mentioned person into a person property. The database's default values apply to everything else.
- Sub-tasks become records of their own – linked to their parent task if the database has a property for parent records.

In the document, Flowplan replaces each task with a link to its record; you can remove them instead or keep them unchanged. **Undo** in the message brings the tasks back and moves the new records to the trash. This is not available in encrypted spaces, because the server cannot read their content.
