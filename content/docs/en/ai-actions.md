---
keywords: ai action, ai property, autofill, ai node, agent
---

# AI actions, databases and workflows

An AI answer becomes tasks, records and pages; plus AI properties in databases, AI on whiteboards and AI nodes in workflows.

## AI actions

From an answer of **Ask AI**, from the writing assistant (**Propose actions** below the answer) or from the transcript of a [meeting](/media-and-files#voice-notes-and-meetings), the AI proposes actions:

| Action | What happens |
| --- | --- |
| **Create page** | A new page with title and content in a space where you may create pages. |
| **Create tasks** | Tasks at the end of a document, optionally with an assignee (@mention) and due date – they appear in **My tasks** like ones you wrote. |
| **Append text** | A summary, for example, at the end of a document. |
| **Create record** / **Change record** | In a database, only in properties you may change and only with valid values (existing options, members, dates). |

**Nothing happens without you:** the proposals appear as a **preview with checkboxes**. What is not possible – a space without write access, a restricted property or a database closed to the AI – is greyed out with the reason. Only **Run** creates the chosen actions.

- Actions run **in your name and with your permissions**; the server checks each action again when running it. Version history, notifications, automations and webhooks work as for your own change; the audit log records `ai.action`.
- **Undo:** created pages and records can be taken back right in the result (they go to the trash); appended text and changed records are in the version history.
- The AI only sees a catalogue of the spaces, databases, properties and members you may write to and the AI may read – no content beyond that. The AI's answer is plain JSON and is never executed directly.
- Like every other feature, **AI actions** can be switched off by the administration and under **Settings → AI**.

### Using data from databases

When you name a database in your request, the AI reads its records and works with the real values instead of a template full of placeholders. Example: "Create documentation from the Server table" gives you a table of your servers with their IP addresses and URLs.

The AI reads a database when
- you name its title in the request (case does not matter, quotes are fine, e.g. "Server"),
- you link it in the request or the text (page link with `[[`),
- it is linked or embedded as a view in the open document and your request speaks of a table or database ("Summarise the linked table") – in the writing assistant only with "Page as context",
- in "Ask AI" the question is limited to the open database, or a source found is the database itself.

This applies to AI actions, the writing assistant (free prompt with `/ai` and a custom instruction for a selection) and "Ask AI". Below the answer or above the proposed actions you see which data was read, e.g. "Data from: Server (12 records)". In "Ask AI" the database is listed as a source.

What the AI sees:
- only records you may see and the AI may read – no private records of others, nothing from journals with a PIN, from pages and spaces [closed to AI](/ai#close-pages-and-spaces-to-ai), from end-to-end encrypted spaces, from the trash, or from places you excluded in your AI settings,
- only properties visible to you (per-property read permissions apply); relations, formulas, rollups, files, progress, time and sprints are not sent, nor the text of the records' documents,
- the records in the database's order.

Limits: at most 3 databases and 200 records per request and about 40,000 characters (about 8,000 in the writing assistant with a model on your own server). If not everything fits, the data says so ("… and 57 more records") and the AI points it out. Apple's on-device AI does not read databases.

## AI on whiteboards

On [whiteboards](/whiteboard-collaboration#ai-on-the-whiteboard), **AI** in the toolbar opens three features:

- **Group by theme (AI):** arrange the selected notes – or all in view – by theme in labelled columns.
- **Summarise as a page:** a new page next to the board with summary, themes, decisions, open questions and action items (optionally as real tasks with person and due date), linking back.
- **Create with AI …:** a mind map or a flowchart from a description.

When [creating database records from notes](/whiteboard-collaboration#sticky-notes-as-database-records) there is also **Split with AI**: the AI fills further properties from the note's text, with a preview before anything is created. Creating the records itself needs no AI.

- People who may edit the board can use it. The AI's answer is strictly checked (only known notes, shapes and properties, limits) and then applied like your own edit – live for everyone, undone in one step.
- Only the text of the elements concerned goes to the provider – without hidden notes and without linked pages or records the AI may not read. When creating, only your description goes there, nothing from the board. The audit log records `ai.whiteboard`.
- The **AI on whiteboards** feature can be switched off like all others by administrators and under **Settings → AI**; it is on as soon as AI is on.

## AI in databases

### AI property

When adding a property, choose **AI property** and write an instruction naming other properties in curly braces:

- `Summarize {Description} in one sentence`
- `Category from {Title}: one of Novel, Non-fiction, Crime`
- `{Content}` stands for the record's page content.

The **output** is text, select, multi-select (existing options only – invented ones are dropped) or number. Since an AI property is a normal property, filters, sorting, grouping, forms and exports work as usual.

- **Fill in for all** in the property dialog computes all records in the background; an indicator shows how many values are still being computed.
- In a record, **Recompute** computes one value right away and shows when and with which model it was made.
- **Recompute automatically when the properties used change:** values follow changes with a short delay and within the AI limits. This runs in the name of the person who switched it on or last changed the instruction. If they lose access, it stops; if AI is off on the instance, it pauses.
- Values are written like edits: with version history, automations and webhooks. Freshly computed cells light up briefly.
- Viewers, guests and API tokens cannot write AI values. Private records and databases closed to AI are skipped.

### Fill in fields with AI

Select records in the table → **Fill in with AI** → choose a property (e.g. tags). The AI fills only **empty** cells – from the title, the other properties and the content; for selects only with existing options.

### Create a database with AI

New page → Database → **Create with AI** and describe it, e.g. "Reading list with author, genre, status, rating". The AI proposes properties with types, select options and a few example records. You rename, remove properties or leave out the examples – only **Create page** creates the database. The proposal is checked strictly (allowed types, at most 25 properties and 30 options, matching example values); nothing from the AI's answer is executed.

## AI in workflows

[Workflows](/workflows) have four AI nodes: **Summarize**, **Classify** (into categories or the options of a select, with an “unclear” port), **Extract fields** and **Custom prompt** (text or JSON). They use the AI feature **AI in workflows** – admins switch it off under Administration → AI, everyone for themselves in their own AI settings.

- **Budget**: at most 100,000 tokens per workflow and day (`FLOWPLAN_WORKFLOW_AI_TOKENS_PER_DAY`); when it is used up, the node fails with a message.
- **What the AI reads**: only pages and records the person the workflow runs as may see and that are open to the AI; blocked pages and journals with a PIN stay out.
- **Prompt injection**: foreign text (e-mails, webhooks, page contents) is marked in the prompt as data. The AI only returns data, never actions – its answer is checked (categories from the list, typed fields). Where an AI output decides recipients, an address or a target, the check warns before activating.
- **AI builder**: “Draft with AI” builds a draft from one sentence; the AI only sees names of databases, properties and pages, no contents, and it counts against your personal AI allowance.
