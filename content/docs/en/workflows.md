---
keywords: workflow, automation, zapier, n8n, trigger, canvas
---

# Workflows

A workflow is a flow of nodes on a canvas: a **trigger** (a new page, a changed record, a schedule, an e-mail …), then **logic** and **actions** – change records and pages, notify people, ask the AI, call other services. No code at all.

Workflows are a page type of their own. They run in the background on the server, step by step, survive restarts, retry on errors and can wait days for a date or an approval. A workflow can never do more than the person who activated it.

## First steps: the template from the issue

This links every new sub-page of an overview page there automatically – with a one-sentence description:

1. In the sidebar choose **+ → Workflow** and give it a title.
2. On the empty canvas, pick the template **Link sub-pages on the overview**.
3. The short assistant asks for the **overview page** and whether a **short description with AI** comes along. **Create the draft**.
4. **Dry run** (nothing changes) or **Test run** (for real, as you) – the result shows at every node.
5. **Activate**. From now on every new sub-page lands on the overview as “• link – short text”, never twice.

## How a workflow starts

A new workflow page offers four ways:

- **Start blank** – choose the trigger and build it yourself.
- **Templates** – six ready flows with gaps an assistant asks for (page, database, property, person, chat webhook, e-mail address):

| Template | What it does |
| --- | --- |
| Link sub-pages on the overview | New page directly below X → optional AI short description → append “• link – short text” to X, never twice |
| Reminder before the due date | Two days before the date at 9:00 → only if not done → remind the people responsible by push |
| Form → AI category → assignment | Form answer → the AI picks a category → per category make someone responsible and notify them; unclear → team lead |
| Weekly report | Fridays 15:00 → find records completed this week → the AI summarises → create a report page → optionally post to the chat |
| Inbound e-mail → ticket | E-mail to the workflow's address → the AI reads title, description, urgency → create a record → confirm to the sender |
| Webhook → record | Another service calls the workflow's address → create a record |

- **Draft with AI** – one sentence is enough, see [AI builder](#ai-builder).
- **Import from a file** – an exported workflow file, see [Export and import](#export-and-import).

Whatever you choose lands on the canvas as a **draft** – **Undo** takes it away again. A workflow never becomes active by itself.

Find more workflows in the [marketplace](/marketplace). Share one of your own with the marketplace icon in the head of the workflow page – without credentials, runs, webhook addresses and names of people. Workflows you take over always arrive paused, as a draft; what belongs to your workspace (page, database, person …) you set in the editor afterwards.

## The canvas

- **Node list** on the left: triggers, logic, records, pages, notify, AI, HTTP – with a search. Drag, or click (appends after the selected node).
- **Nodes** show an icon, a label and a one-line summary; a dot marks errors or warnings of the check. The ⚡ means: runs right away when the record is saved (the “immediate part”).
- **Side panel** on the right: the settings of the selected node, “On error”, a note and the input and output of the last test.
- **List** shows the same flow as an outline – fully usable with the keyboard. **Tidy up** arranges the nodes from left to right.
- Several people edit the same draft at the same time; what runs only changes with **Activate**.

## Placeholders and filters

In every text field, **{}** (or typing `{{`) inserts values of earlier nodes, such as `{{New page.Title}}` or `{{Trigger.Record.Fields.Status}}`. Filters follow a `|`:

| Filter | Example | Result |
| --- | --- | --- |
| `truncate` | `{{AI.summary \| truncate: 140}}` | at most 140 characters |
| `date` | `{{$today \| date: "yyyy-MM-dd"}}` | a date in your own form |
| `add_days` | `{{$today \| add_days: 3}}` | three days later |
| `default` | `{{Webhook.body.title \| default: "Untitled"}}` | a stand-in for empty values |
| `required` | `{{Webhook.body.title \| required}}` | an error when empty |
| `join`, `first`, `last`, `count` | `{{Find.records \| join: ", "}}` | lists to text |
| `upper`, `lower`, `trim`, `replace`, `number`, `plain`, `json` | | reshape text |

Built-in values: `$today`, `$now`, `$run`, `$workflow`, `$runner`, and inside “For each” `$item` and `$index`. Placeholder values are always inserted as text, never as HTML.

## Testing

- **Dry run**: writing nodes only report what they would do (“would create record …”); e-mail, chat and push are not sent, waits are skipped, approvals count as approved or rejected (your choice). AI nodes run and cost tokens.
- **Test run**: acts for real – as **you**, not as the person the workflow runs as.
- Trigger data: **example**, the **last real event**, a **record** or **page** to pick, or **your own values**.

Tests always use the draft. The result shows as a status ring at every node; a click shows input and output.

## Activate, pause, “runs as”

**Activate** checks the draft (missing settings, deleted databases, pages without access …) and shows what the workflow will do and **who it runs as**: the person who activates it. It only sees and changes what this person may. If they lose their rights, the workflow pauses and says so.

**Pause** holds open runs (or cancels them, if you choose); after activating they continue on their version. After ten failures in a row, or when half of the recent runs fail, a workflow pauses itself.

## Runs and versions

The **Runs** tab lists every run with status, duration and version; filter by failed, waiting, open and tests, search for errors. A run opens the canvas in its version with the timeline of its steps (attempts, waits, errors). **Retry from the failed node** and **Cancel** are there.

Inputs and outputs of a run are only shown to the person it ran as; colleagues see status and errors and debug with a test run of their own.

**Versions** shows activated versions and draft states in one timeline, compares two of them and restores one as the draft.

## AI builder

**Draft with AI** (on the empty canvas or in the bar at the top) builds a draft from one sentence – for example: *“When a page is created below Docker in the wiki, add it with a one-sentence description to the overview.”*

- The AI only sees **names** of databases, properties, options, spaces and pages you may see and that are open to the AI – no contents.
- Its proposal is checked against the node catalogue: unknown nodes are left out, unknown pages or properties stay empty and are marked.
- You see the proposal first; **Use as draft** inserts it as one change. Activating is up to you.
- It counts against your personal AI allowance, not the workflow's budget. See [AI](/ai-actions#ai-in-workflows).

## Workflow button on pages

**/Workflow button** puts a button into a document that starts a workflow with the trigger **Start manually**. If the trigger has input fields, the button shows a small form. After the click it says **Started** – editors of the workflow see the way to the runs.

The trigger decides who may press it: by default the **editors of the workflow**, switchable to **all members** who see the page with the button. Guests and share links never see the button. The run always runs as the workflow's runner; the person who clicked is recorded as “Started by”.

## Export and import

**Export as JSON** (the arrow at the top right) saves the flow as `.flowplan-workflow.json`: editors get the draft, readers the active version. The file names the pages, databases (with their properties) and people it uses, with their titles. **Credentials, webhook addresses and runs are never included** – credentials only with name, kind and host, so you can link them again.

**Import from a file** matches references in the workspace: same ID, otherwise same title (pages, databases), same name (people, properties). What stays open, the assistant asks for, or it stays empty. An import is always a draft.

You'll find ready-made workflows shared by others in the [Flowplan Marketplace](https://marketplace.flowplan.org).

Content archives and the [instance move](/move-instance) take workflows along with their draft and versions, without runs and secrets. Active workflows arrive **paused**, so nothing starts unexpectedly on the new instance.

## Phone and tablet

- **Phone**: status with an on/off switch, the flow as a list, runs and approvals. Editing happens on a tablet or computer.
- **Approvals**: the notification opens the workflow page on the **Approvals** tab – message, comment, **Reject** or **Approve**.
- **Approvals in the app**: in the iPhone and Android app, the notification carries **Approve** and **Reject** buttons, as long as notifications show their text on the lock screen. **Approve** asks for Face ID, Touch ID or a fingerprint first – without biometrics the **Approvals** tab opens instead. **Reject** needs no biometrics, but the phone has to be unlocked. The device must be signed in and active within the last 14 days; on Android the very first Approve opens the tab once, because that is when the key is created.
- **Tablet**: the full editor; connecting also works by tapping an output, then the target.

## Keyboard

| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | between nodes |
| Arrow keys (further with <kbd>Shift</kbd>) | move the selected node |
| <kbd>Enter</kbd> / <kbd>Esc</kbd> | open / close the panel |
| <kbd>A</kbd> | append a node |
| <kbd>C</kbd> | connect to … |
| <kbd>Delete</kbd> | delete |
| <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd> | undo / redo |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | duplicate |
| <kbd>L</kbd> | list ↔ canvas |
| <kbd>F</kbd> | fit the view |

## Limits

| Limit | Default |
| --- | --- |
| Runs per minute and workflow | 60 |
| Runs per minute and workspace | 600 |
| Steps per run | 200 |
| Workflows triggering each other (cascade) | 5 levels |
| Items per “For each” | 100 |
| AI tokens per workflow and day | 100,000 |
| E-mails per workflow and day | 100 |
| Keeping runs | 30 days |
| Active workflows per workspace | 100 |

Admins change them in the [administration](/administration#workflows) or with an [environment variable](/configuration-integrations#workflows). Editors can set lower values per workflow.

## API, MCP and SDKs

Workflows can be created, checked, tested, **activated** (with a write token) and started through the [REST API](/api-and-webhooks#workflows); the SDKs come with ready methods. Through [MCP](/mcp#workflows), an AI assistant reads workflows and runs, saves drafts, tests and starts them – it cannot activate them or decide approvals.

## Frequently asked questions

**Do workflows replace the automations of databases?** No. The simple rules stay in the form under **… → Automations** and run on the same engine. Every rule can be extended into a workflow with **Open in canvas**, see [Automations](/projects-and-tickets#automations).

**Why can't I see a workflow page?** Guests see no workflow pages. Otherwise the normal page permissions apply.

**Are there workflows in encrypted spaces?** No – the server would have to read the contents.

Every node in detail: [Node reference](/workflow-nodes).
