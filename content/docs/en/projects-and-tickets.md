# Projects, tickets and sprints

Tools for teams that work with tickets – all optional: a database behaves as before until you set one of them up.

Most of them sit in the **…** menu on the right of a database's toolbar: record templates, **Automations**, **Workflow and done**, **Time report** and **Git connection**.

## Ticket numbers

A property of the type **ID (ticket number)** shows a running number for every record, such as `WEB-123`.

- You choose the **prefix** when adding the property; it is unique in the workspace.
- Numbers are never handed out twice, not even after deleting. A restored record keeps its number.
- **In text**, `WEB-123` is highlighted in every document: hovering shows title and status, <kbd>⌘</kbd>/<kbd>Ctrl</kbd>-click opens the record. This also works for text written before the ID property existed.
- **Search** finds records by their number, and **Git commits** can refer to them (see below).

## Subtasks and epics

The type **Parent record (subtasks)** lets records sit below another record of the same database – for example epic → story → task. Flowplan refuses loops.

- **In the record**, the **Subtasks** section lists everything below it with its state; you add new subtasks right there.
- **In tables**, **View → Show subtasks as a tree** indents records and lets you fold them.
- **Subtask progress** is a property of its own: it shows the share of done work across all levels as a bar.
- **On boards**, **Swimlanes by** with the parent property gives epic swimlanes.

## When is a record done?

Sprints, progress, overdue records and “My tasks” need to know when a record is done. Flowplan detects it:
- from a status select with an option like “Done” or “Erledigt”,
- otherwise from a “Done” checkbox.

Set it under **… → Workflow and done** when it should be different.

## Workflows

In the same dialog, switch on **Set allowed changes and required properties**:

- **Allowed changes**: in the “from (row) to (column)” table, untick changes such as “Open → Done”. A record then has to be “In progress” first.
- **Required properties**: a status needs certain properties – e.g. “Done only with a solution”.
- **Owners only**: some statuses can only be set by people with the *owner* role on the database.

The rules apply everywhere: table and board, bulk edits, guests and the Git connection. A change that does not fit is refused with an explanation.

## Automations

**… → Automations** takes care of recurring steps in the form *When … only if … then …*:

- **When**: a record is created, a record arrives through a form, a property changes (optionally to a certain value) or a date has passed.
- **Only if** (optional): conditions such as “Priority is High” or “Assignee is empty”.
- **Then**: set properties or notify.
  - Values for properties can be fixed, or *today*, *now*, *the person who triggered it* or *the creator*.
  - You can notify the person in a person property, the creator, the person who triggered it or a specific member.

Suggestions add the usual rules in one click:
- “When Status → Done, set a date”,
- “When the due date has passed, notify”,
- “Assign new form records”.

Each rule can be switched off on its own.

> [!NOTE]
> Rules run on the server, however a record changes. What a rule changes does not trigger further rules, so rules cannot loop. Flowplan checks overdue records every few minutes; each rule fires once per record and date. Notifications appear as “Database automations” and can be switched off in the settings.

## WIP limits

On a board, **View → WIP limits** sets a maximum per column, e.g. “In progress: 3”.

- The column header then shows `2/3`.
- When it holds more, the column is marked.
- With **lock**, the column takes no further records – wherever they come from.

## Sprints

A view of the type **Sprints (backlog and planning)** plans work in time boxes. **Set up sprints** adds the “Sprint” property and the first sprint the first time.

- **Planning**: drag records from the **backlog** into a sprint – or use **Move to**, also on phones.
- **A sprint** has a name, start, end and goal; **+ Sprint** adds the next one.
- **Start** and **Complete**: when completing, choose where unfinished records go – the next sprint or back to the backlog.
- **Measure size in**: number of records or a number property such as story points.
- **Burndown**: the running sprint shows the work left per day against the ideal line.
- **Velocity**: closed sprints show what was committed and what was completed.

## Time tracking

A property of the type **Time tracking** adds up the time worked on a record. Optionally it shows an estimate from a number property in hours next to it.

- **In the record**: **Start** and **Stop** – each person has at most one running timer, a new one stops the old one.
- **Add time**: a duration as `45`, `1:30` or `1.5h`, with a date and a note.
- **Correcting**: you delete your own entries; owners can correct everyone's.
- **… → Time report**: hours per person and week and effort against estimate per record, also as CSV.

## Git connection

**… → Git connection** connects the database to GitHub, GitLab or Gitea/Forgejo:

1. **Set up Git connection** creates a webhook address and a secret.
2. **In the repository**, add a webhook with both:
   - content type JSON,
   - events for pushes and pull or merge requests.
   The exact steps are in the dialog.
3. **Commits and pull requests** that mention a ticket number like `WEB-123` appear in the record under **Development**.
4. **“closes WEB-123”** (also *fixes*, *resolves*) marks the record done. This happens once the commit is on the default branch or the pull request is merged – through the database's workflow and automations.

Every request is checked against the secret. Only people who may edit the database see the address and the secret. **New address and secret** invalidates the old ones.

## Records from all databases

**My tasks → Records from databases** shows records from every database of the workspace in one list. By default these are the open ones assigned to you – through any person property.

- You can filter by due date, database and text.
- **Save as view** turns a filter into a personal view of its own, e.g. “All my open tickets in all projects”.

## Import from Jira and Trello

**Settings → Data → Import from Jira or Trello** takes a Jira CSV export (all fields) or a Trello JSON export.

It becomes a new database with a table and a board. It brings over:
- status or list, priority, type, labels, dates and story points,
- assignees – as a person property when they are all members,
- checklists, and parent issues as subtasks,
- descriptions as content and comments as comments,
- attachments as links (the files stay at Jira or Trello).
