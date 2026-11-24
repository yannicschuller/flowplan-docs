---
keywords: nodes, trigger, action, condition, loop, http
filter: true
---

# Workflow nodes

Every node a [workflow](/workflows) knows – with its type (as it appears in the JSON and the API), its ports and the values later nodes use as placeholders.

This list is generated from Flowplan's node catalogue; `GET /api/workflows/catalog` returns every node's settings as JSON Schema.

## Triggers

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| New record ⚡ | `trigger.record.created` | A record is created in a database. | out | `record`, `actor`, `via` |
| Record changed ⚡ | `trigger.record.changed` | Properties of a record change. | out | `record`, `before`, `changed`, `actor` |
| Record done ⚡ | `trigger.record.done` | A record becomes done. | out | `record`, `actor` |
| Date reached | `trigger.record.date` | A date of a record is reached or overdue. | out | `record`, `date` |
| Form answer ⚡ | `trigger.form.submitted` | Someone submits a database's form. | out | `record`, `answers`, `respondent` |
| Schedule | `trigger.schedule` | Daily, weekly or monthly at a time. | out | `slot` |
| New page | `trigger.page.created` | A page is created. | out | `page`, `actor` |
| Page changed | `trigger.page.changed` | A page's title or content changes (2 minutes after the last change). | out | `page`, `actor`, `changes` |
| Page moved | `trigger.page.moved` | A page gets a new parent or space. | out | `page`, `from`, `to`, `actor` |
| Tag added | `trigger.page.tagged` | A page gets a tag. | out | `page`, `tag`, `actor` |
| New comment | `trigger.comment.created` | Someone comments on a page or record. | out | `comment`, `page`, `record`, `actor` |
| Mention | `trigger.mention` | Someone is mentioned in a page, record or comment. | out | `page`, `record`, `mentioned`, `actor` |
| Start manually | `trigger.manual` | Starts with “Run”, the API or a button. | out | `inputs`, `startedBy`, `source` |
| Inbound webhook | `trigger.webhook` | Another service calls the workflow’s address. | out | `body`, `query`, `headers`, `receivedAt` |
| E-mail received | `trigger.mail.received` | An e-mail arrives at an address that goes to this workflow. | out | `mail`, `authenticated` |
| New journal day | `trigger.journal.day` | A day’s page is created in a journal. | out | `day`, `date`, `journal` |

## Logic

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| If ⚡ | `logic.if` | Branches on conditions. | true, false | `matched` |
| Set values ⚡ | `logic.set` | Named values for later nodes. | out | – |
| Stop ⚡ | `logic.stop` | Ends the run as succeeded or failed. | – | – |
| Switch ⚡ | `logic.switch` | Branches on the first matching case. | case:…, default | `case` |
| For each | `logic.foreach` | Runs the following nodes for every item of a list. | item, done | `count`, `results` |
| Wait | `logic.wait` | Waits for a duration, until a point in time or until the next time of day. | out | `waitedUntil` |
| Approval | `logic.approval` | Waits until a person approves or rejects. | approved, rejected, timeout | `decidedBy`, `comment`, `decidedAt` |

## Records

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| Create record | `action.record.create` | Creates a record in a database. | out | `record` |
| Update record ⚡ | `action.record.update` | Changes properties of a record. | out | `record`, `before` |
| Find records | `action.record.find` | Finds records by conditions. | out | `records`, `first`, `count` |
| Apply template ⚡ | `action.record.template` | Applies a record template to a record. | out | `record` |

## Pages

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| Create page | `action.page.create` | Creates a page below a parent page, from a page template if you like. The title (with placeholders) applies then as well; the template's name only when it comes out empty. | out | `page` |
| Append to page | `action.page.append` | Adds blocks at the end, the start or below a heading. | out | `page`, `appended` |
| Tag page | `action.page.tag` | Adds tags to a page or removes them. | out | `page` |
| Move page | `action.page.move` | Moves a page below a new parent. | out | `page` |
| Create task | `action.task.create` | Writes a task into a page, with a person and a due date if you like. | out | `page`, `task` |
| Append to journal day | `action.journal.append` | Writes Markdown with placeholders into today's, yesterday's or a given day of a journal – at the end or below a heading. A missing day is created as opening it would. | out | `day`, `date`, `journal`, `created`, `completed` {since=0.9.6} |
| Read journal day | `action.journal.read` | Reads today's, yesterday's or a given day of a journal – its text and what was "Completed this day" – for an AI step, for example. Changes nothing. | out | `content`, `completed`, `day`, `date`, `journal`, `found` {since=0.9.6} |

**Create task** writes a task into a chosen page (or one from a placeholder) or into the own task page of the person the workflow runs as (the page "Tasks" from **My tasks**, created the first time). Text and due date may contain placeholders; the person is a single one – the person it runs as, whoever triggered it, a person property of the record or a member. With **Below the heading**, the task goes to the end of the section under that heading (created at the end when missing); consecutive tasks join the same list. The node acts with the rights of the person it runs as: the assignee must be able to open the target page, the own task page is private and only for the person it runs as; locked pages, journals with a PIN and encrypted spaces are refused. A dry run shows what would be written and changes nothing.

**Append to journal day** writes into a day of a journal. **Day**: **Today** or **Yesterday** – in the workflow's time zone (workflow settings), like `$today` – or **A given date** from a date or a placeholder (such as a date property of the record; for a moment in time, its day in that time zone counts). Future days are refused. **Content** is Markdown – headings, lists, tasks `- [ ]`, **bold**, links – with placeholders. The placeholders' values go in as text, never as formatting: a value with `**` or `<b>` stays exactly as it is, page values become links to the page, line breaks in a value stay line breaks. **Place**: **At the end of the day** or **Below a heading** – then at the end of the section under the heading with exactly that text, so later runs line up below in order; without that heading, at the end of the day. Empty lines at the end (from the template) stay below the new text. If the day does not exist yet, the step creates it: the newest day the way opening it would – with the template and the open tasks of the day before where [Carried-over tasks](/journal#daily-template) puts them (also with "On the first write"); a day before a later one with the template only, since its tasks have moved on already. A day in the trash stays there and the step fails. The step acts with the rights of the person it runs as: they must be able to edit the journal; journals with a PIN, locked pages and encrypted spaces are refused. Outputs: `day` (the day page, for links in later steps), `date`, `journal` and `created` (whether the day was just created). A dry run shows the day, date and place and changes nothing – it does not create a day either.

{since=0.10.0} An empty day the journal moved to the trash by itself (see [How a day comes about](/journal#how-a-day-comes-about)) is brought back by **Append to journal day**, which then writes into it; only a day a person deleted makes the step fail.

**Read journal day** hands a journal day to the next steps – useful when your workflow starts manually or on a schedule and an AI step should know the day. Pick the journal and the day as in **Append to journal day**. Put `{{…content}}` into the prompt and the AI gets the day's text plus the "Completed this day" list, just as you see it below the day (Only mine/All). `completed` holds only the list; `found` is `false` when the day doesn't exist yet (the list still counts). The step reads with the rights of the person the workflow runs as; journals with a PIN and encrypted spaces are refused. **New journal day** and **Append to journal day** also output the list as `completed`, e.g. `{{trigger.completed | join: "\n"}}`. {since=0.9.6}

**Time zone and “Today”**: times in a **Schedule** are in the workflow's time zone – new workflows get the zone of the person who creates them; change it in the workflow settings under **Time zone**. If it differs from yours, the schedule shows it, such as “daily · 23:55 (UTC)”. **Today** is the same day for every step of a run: the day the run started (after a wait or approval, the day it continues) – even if a step only runs after midnight. Older workflows stay on UTC until you change the zone. {since=0.10.0}

## Notify

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| Notify person ⚡ | `notify.person` | A notification in the app, by push, email or chat app. | out | `notified` |
| Send e-mail | `notify.email` | Sends an e-mail to people or addresses. | out | `sent` |
| Chat message | `notify.chat` | Posts to a chat webhook of the workspace (Slack, Matrix, Teams, Discord). | out | `sent` |

**Recipients from properties**: person properties of the record only count as recipients if the person the workflow runs as may read them. {since=0.11.5}

**Formatted message**: you format the message of **Notify person** like [form descriptions](/forms) – select text and choose **bold**, *italic*, underline, strikethrough, code or link in the bar (⌘/Ctrl B, I, U, ⇧X, E, K); Enter starts a new line. With `@` (or the @ button next to it) you mention a member of the workspace: the person shows as a chip in the text but is **not notified** by it – the recipients are only those under **To**. `$x^2$` becomes a formula like the inline formulas in the editor; **As a formula** in the bar turns selected text into one. You insert placeholders as usual with `{}` or `{{`; they show as chips in the text, and a click turns one back into text (for a filter, say). Their values always go in as text, never as formatting: a title with `**`, `$`, `@` or `[text](javascript:…)` stays exactly as it is – outside data or an AI answer can add neither links nor mentions. Links work only with http, https or mailto. The inbox shows the message formatted: links open in a new tab, mentions are person chips, formulas are typeset. E-mails are formatted too, with the formula as LaTeX text and mentions as “@Name”. Push, chat apps, the apps' widgets and the API get the plain text: the formula as LaTeX, the mention as “@Name”, a link as “text (address)”. Someone who has left the workspace shows as a plain “@Name”. A text that already contained characters like `**` or `_…_` now shows them as formatting. {since=0.10.0}

**E-mail to outside addresses**: e-mail to members always goes out. To an address outside the members that is written in the node, it goes out as long as the administration allows outside e-mail. When the address comes from a placeholder or a property – a form answer, the sender of an e-mail, an AI answer –, the switch **… also to addresses from placeholders** in the [administration](/administration#workflows) (`FLOWPLAN_WORKFLOW_EXTERNAL_MAIL_DYNAMIC`) is needed as well, off by default; the check points out such nodes. When outside data choose the recipient, the workflow also needs the [setting for that](/workflows#workflow-settings). {since=0.10.0}

## AI

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| AI: Summarize | `ai.summarize` | Summarizes a text. | out | `summary` |
| AI: Classify | `ai.classify` | Puts a text into one of the categories. | out, unclear | `category`, `categories`, `confidence` |
| AI: Extract fields | `ai.extract` | Reads named values from a text. | out | `fields`, `missing` |
| AI: Custom prompt | `ai.prompt` | A prompt of your own, answered as text or JSON. | out | `text`, `json` |

## HTTP

| Node | Type | What it does | Ports | Outputs |
| --- | --- | --- | --- | --- |
| HTTP request | `http.request` | Calls an HTTPS address (fixed host). | out | `status`, `headers`, `body`, `json` |

**Hosts and redirects**: the host is fixed text in the node; placeholders only go into the path, query, headers and body. A run calls only the hosts written as fixed text in the HTTP nodes of its activated version (a test: those of the draft). When a service redirects with 307 or 308 to another origin, the body does not go along, and the node's own headers – an API key typed in, say – go to its own origin only; 303, and 301 or 302 after a POST, still become a GET. The check reports an AI answer in the path or query as a note. {since=0.10.0}

⚡ – can run in the immediate part: right when a record is saved, in the same change. The immediate part does not write a record the person the workflow runs as may only view. {since=0.11.5}

Every node can **On error** retry (up to 5 times), end the run, continue through the `error` port or skip the error.
