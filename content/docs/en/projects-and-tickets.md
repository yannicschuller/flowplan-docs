# Projects, tickets and sprints

Tools for teams that work with tickets – all optional: a database behaves as before until you set one of them up.

Most of them sit in the **…** menu on the right of a database's toolbar: record templates, **Automations**, **Status rules and done**, **Time report** and **Git connection**.

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

## Status rules

In the same dialog, switch on **Set allowed changes and required properties**:

- **Allowed changes**: in the “from (row) to (column)” table, untick changes such as “Open → Done”. A record then has to be “In progress” first.
- **Required properties**: a status needs certain properties – e.g. “Done only with a solution”.
- **Owners only**: some statuses can only be set by people with the *owner* role on the database.

The rules apply everywhere: table and board, bulk edits, guests and the Git connection. A change that does not fit is refused with an explanation.

## Automations

**… → Automations** takes care of recurring steps in the form *When … only if … then …*:

- **When**: a record is created, a record arrives through a form, a property changes (optionally to a certain value), a date has passed or it is time according to a schedule (see [Scheduled automations](#scheduled-automations)).
- **Only if** (optional): conditions such as “Priority is High” or “Assignee is empty”.
- **Then**: set properties, notify or **apply a template**.
  - Values for properties can be fixed, or *today*, *now*, *the person who triggered it* or *the creator*.
  - You can notify the person in a person property, the creator, the person who triggered it or a specific member.
  - **Apply template** puts a [record template](/templates#record-templates) on the triggering record – with its [placeholders](/templates#placeholders) filled in. Either **only if the content is empty** (existing text then stays untouched) or **append below**. Empty properties get the template's values. Each rule applies a template to a record only once – even if the status later goes back and forth.

Suggestions add the usual rules in one click:
- “When Status → Done, set a date”,
- “When the due date has passed, notify”,
- “Assign new form records”,
- “When Status → Approved, apply a template” (when the database has record templates).

Example: *When* Status changes to “Approved”, *only if* Company is not empty, *then* apply the template “Kickoff”. Every approved record gets its kickoff page with the company name and date. Applied templates are recorded in the [activity log](/administration#activity-log) (`row.template.applied`).

Each rule can be switched off on its own.

### Open in canvas: a rule becomes a workflow

When a rule is not enough any more – several steps, waits, approvals, AI, e-mails or other services –, the **Open in canvas** icon next to the rule opens it as a [workflow](/workflows): a workflow page next to the database with the rule as its draft. The rule keeps running until you activate the workflow; then it is replaced by a reference in the same change (“Extended as a workflow”). So both never run at once, and never neither.

The difference: a rule acts for the database, a workflow runs as the person who activates it – the activate dialog says so.

> [!NOTE]
> Rules run on the server, however a record changes. What a rule changes does not trigger further rules, so rules cannot loop. Flowplan checks overdue records every few minutes; each rule fires once per record and date. Notifications appear as “Database automations” and can be switched off in the settings.

### Scheduled automations

With the trigger **it is time (schedule)** a rule creates a new record regularly, for weekly reports, monthly closings or maintenance:

- **When**: daily or every N days, weekly or every N weeks on a weekday, or monthly or every N months on a day (the 31st becomes the last day in shorter months), each at a time in your time zone. Examples: “Every Monday at 09:00”, “Monthly on day 1”, “Every 3 days”.
- **Then**: **Create a record** from a record template (properties and text) or empty. Date fields can be set relative to the run, e.g. “Due: +3 days”; 0 means the same day.

The suggestion “Create a record every Monday at 09:00” sets this up with the default template.

> [!NOTE]
> A scheduled rule runs once per date – also after a restart – and only from the moment it was saved. Dates on which the server was not running are not made up one by one; the latest missed one runs once. The rule creates records on behalf of the person who last changed it; if they lose edit rights or the database is locked, the rule rests. Switching it on or off does not change the person.

Repeating tasks, whose next record only appears once the previous one is done, are set in the record, see [Repeating tasks](/databases#repeating-tasks).

## WIP limits

On a board, **View → WIP limits** sets a maximum per column, e.g. “In progress: 3”.

- The column header then shows `2/3`.
- When it holds more, the column is marked.
- With **lock**, the column takes no further records – wherever they come from.

## Sprints

A view of the type **Sprints (backlog and planning)** plans work in time boxes. **Set up sprints** adds the “Sprint” property and the first sprint the first time.

- **Planning**: drag records from the **backlog** into a sprint – with the mouse by the record, on touch devices hold the ⋮⋮ handle briefly and drag – or use **Move to**, also on phones. With the keyboard: focus the handle, press <kbd>Space</kbd>, choose the section with <kbd>↑</kbd>/<kbd>↓</kbd>, <kbd>Space</kbd> or <kbd>Enter</kbd> drops, <kbd>Esc</kbd> cancels.
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
- **… → Time report**: the time report of this database, switchable to the whole workspace (see [Time reports and billing](#time-reports-and-billing)). The report across all databases is also under **Settings → Time**; there the filters carry their labels above the report, two side by side on phones.

### Time reports and billing

The time report sums up the time entries of a database or of the whole workspace.

- **Period**: This week (from Monday), This month, Last month or a custom period with start and end date (at most three years). The server's time zone applies.
- **Filters**: person, database (in the workspace), project, billing status and billable yes/no. **Project** is the record a record's first relation points to (not the parent relation of subtasks) – such as the project of a task. Records without a relation are listed under **No project**.
- **Group** by person, project, record, database, day or week. The totals come first (total, open, billed, not billable and – with hourly rates – the amount), then a bar chart and a table per group. Clicking a bar filters by that person, project or database.
- **Time entries**: the single entries with date, person, record, project, note, duration and billing status (the first 1000; the export contains all).
- **Export**: **CSV** (commas, decimal points) for spreadsheets and scripts, **CSV for Excel** with semicolons, decimal commas and a BOM, as a German Excel opens it correctly with a double click. Cells a spreadsheet would run as a formula start with an apostrophe.
- **Print** outputs totals, chart and table (also save as PDF); expanded time entries come along.

**Who sees what**: everyone sees their own time entries and the entries of others on records they may read. If the permissions of the property (who may read it, see [Property visibility](/properties-and-formulas#property-visibility)) hide the time property from someone, they only see their own time there. Own time on a record that has become private since appears without a title as “Record without access”.

**Billing status**: every time entry is **open**, **billed** or **not billable**. Whoever may edit the record and the time property changes the status – one by one in the list of time entries, or with **Mark as billed** for all open entries of the current selection. Entries that are not billable stay as they are, as do running timers. Every change is in the activity log (`time.billing`).

**Hourly rates** (optional): workspace owners set a rate per person and/or per project under **Hourly rates**, plus the currency (e.g. EUR, CHF). A project's rate takes precedence over the person's. Members with edit rights in the workspace see amounts; readers and guests see hours only.

> Through the API: `GET /api/time-reports` with `page` or `workspace` and the same filters (`format=csv` or `format=excel` for the files), `POST /api/time-reports` with `{ "action": "billing", "status": "billed", "filter": { … } }`.

## Git connection

**… → Git connection** connects the database to GitHub, GitLab or Gitea/Forgejo:

1. **Set up Git connection** creates a webhook address and a secret.
2. **In the repository**, add a webhook with both:
   - content type JSON,
   - events for pushes and pull or merge requests.
   The exact steps are in the dialog.
3. **Commits and pull requests** that mention a ticket number of this database like `WEB-123` appear in the record under **Development**. Numbers of other databases are left alone – they have their own connection.
4. **“closes WEB-123”** (also *fixes*, *resolves*) marks the record done. This happens once the commit is on the default branch or the pull request is merged – through the database's workflow and automations.

Every request is checked against the secret. Only people who may edit the database see the address and the secret. **New address and secret** invalidates the old ones.

## Sync GitHub, GitLab and Forgejo issues

A database can keep itself in step with the issues of a GitHub, GitLab or Forgejo/Gitea repository – both ways or only one. Unlike the [Git connection](#git-connection), which only links commits and pull requests, records and issues are created and updated on both sides here.

**Setting up the connection** (workspace owners and administrators):

1. **Settings → Calendars & issues → Connect GitHub, GitLab or Forgejo**.
2. Choose the provider; for an own server enter its address (empty for github.com or gitlab.com), the repository (`owner/name`) or project (`group/project`) and an access token that may read and write issues – on GitHub a fine-grained token with *Issues: Read and write*, on GitLab a token with the `api` scope. For **Forgejo / Gitea** the server address is required (e.g. `https://codeberg.org`); create the token there under **Settings → Applications → Generate token** with `write:issue` and `read:repository` (`read:organization` optional, so organisation labels are found too).
3. **Test connection** makes one call with the token; **Save** stores the token encrypted. It is never shown again.
4. Optional **People**: one `login = e-mail` of a member per line. Assignees are matched through it.
5. For immediate updates, add the shown **webhook address** with the **secret** in the repository – on GitHub with content type JSON and the events *Issues* and *Issue comments*, on GitLab as *Secret token* with *Issues events* and *Comments*, on Forgejo/Gitea under **Settings → Webhooks → Add webhook → Forgejo** (or Gitea) with POST, content type `application/json`, the secret and the custom events *Issues* and *Issue comments*. Without a webhook, Flowplan syncs every 10 minutes.

The sync acts as the person who set up the connection: they need edit rights on the database, and records they may not read are skipped. If they are no longer an owner of the workspace, the connection pauses until someone saves the token again.

**Mapping a database**: **… → Sync issues** in the database. There you choose the connection, repository and direction (*both ways*, *only issues → database*, *only database → issues*) and map properties:

| Issue | Property |
| --- | --- |
| Title | Title |
| Description (Markdown) | a text property or the record's document |
| Open/closed and labels | a select – per option "open" or "closed", optionally with a label (e.g. *Doing* → open + `in progress`) |
| Labels | a multi-select (only labels that exist as options) |
| Assignee | a person (through the connection's people list) |
| Milestone due date | a date (an existing milestone with that date is set) |
| Number and address | number/text or URL – read-only |

Two switches handle **comments**: issue comments appear as record comments (with name and link), and record comments go out as issue comments. **Also take over existing issues** fetches all existing issues on the first run; otherwise only what changes after saving. New records become issues once the mapping is saved – older records stay as they are.

**Conflicts**: if both the record and the issue changed since the last sync, the later change wins. The decision is written to the audit log. Each record is linked to at most one issue; the record then shows a chip like **GitHub #123** with a link.

**Status**: the dialog shows the last pull and push, conflicts, skipped records and errors; **Sync now** starts a run right away. When the provider reports a rate limit, Flowplan waits for the time it gives. A repository can only be connected to one database. **Disconnect** ends the sync; records and issues stay.

Pull requests are not synced. Administrators allow own servers (GitHub Enterprise, self-hosted GitLab, your own Forgejo or Gitea) with [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration#integrations).

## Records from all databases

**My tasks → Records from databases** shows records from every database of the workspace in one list. By default these are the open ones assigned to you – through any person property.

- You can filter by due date, database and text.
- **Save as view** turns a filter into a personal view of its own, e.g. “All my open tickets in all projects”.

## Import from Jira and Trello

**Settings → Import & export → Import → Jira or Trello** takes a Jira CSV export (all fields) or a Trello JSON export.

It becomes a new database with a table and a board. It brings over:
- status or list, priority, type, labels, dates and story points,
- assignees – as a person property when they are all members,
- checklists, and parent issues as subtasks,
- descriptions as content and comments as comments,
- attachments as links (the files stay at Jira or Trello).
