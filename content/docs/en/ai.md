# AI

Optional AI for writing, summaries, questions to your workspace and databases – off by default, completely local with Ollama if you like, or with a key for OpenAI, Anthropic, Gemini or any OpenAI-compatible service. In the apps for iPhone, iPad and Mac optionally also [right on the device with Apple Intelligence](#on-device-ai-apple).

> [!NOTE]
> **AI in Flowplan is always optional.** After installation it is off. Administrators decide whether it is available, which provider is used, who may use it and which features are allowed. Everyone can switch it off again for themselves and decide which pages the AI may read. With [Ollama](#ollama-completely-local) your text never leaves the server. The one exception to “off by default”: [on-device AI (Apple)](#on-device-ai-apple) is allowed because nothing leaves the device – administrators and everyone can switch it off too.

## Principles

- **Off until someone switches it on** – on the instance and for every person. The one exception is [on-device AI (Apple)](#on-device-ai-apple): it is allowed because nothing leaves the device, and it can be switched off just the same.
- **Every feature separately:** writing assistant, summaries, questions to the workspace, AI in databases, AI actions and AI on whiteboards can each be allowed or switched off by administrators and by every person.
- **Only with your permissions:** the AI never reads more than you may see yourself – and only what you allow it ([What the AI may access](#what-the-ai-may-access)).
- **You see where your text goes:** every AI feature names the provider and whether data leaves the server.
- **Keys stay secret:** API keys are stored encrypted and never shown again ([Security of keys](#security-of-keys)).

## Providers

| Provider | Data leaves the server | Typical address |
| --- | --- | --- |
| **Ollama** | no (when Ollama runs on your own server or network) | `http://ollama:11434` |
| **OpenAI-compatible** | yes, to the chosen service – except for local servers such as LM Studio, vLLM or LocalAI | `https://api.openai.com/v1`, `https://api.mistral.ai/v1`, `https://openrouter.ai/api/v1` |
| **Anthropic** (Claude) | yes, to Anthropic | `https://api.anthropic.com` |
| **Google Gemini** | yes, to Google | `https://generativelanguage.googleapis.com` |

You enter the model freely – any model ID the provider knows. **Test connection** checks address, key and model with a short request.

### Ollama: completely local

[Ollama](https://ollama.com) runs open models on your own server. Flowplan's `compose.yaml` includes a matching service that only starts on request:

```bash
docker compose --profile ai up -d
```

In `.env`:

```env
OLLAMA_URL=http://ollama:11434
```

Then choose the provider **Ollama** under **Administration → AI**. **Load installed models** shows what is there; **Download model** fetches more models with a progress bar, such as `llama3.1`, `qwen2.5` or `mistral`. For [search by meaning](#ask-your-workspace), also download an embedding model such as `nomic-embed-text` and enter it under **Embedding model**.

> [!TIP]
> How well and how fast local models answer depends on the server. Small models (3–8 billion parameters) run on current CPUs; a graphics card makes them much faster. If Ollama runs on another machine in your network, enter its address – addresses in your own network are allowed for the instance provider.

## On-device AI (Apple)

> [!NOTE]
> **Optional and can be switched off at any time.** In the Flowplan apps for iPhone, iPad and Mac, Flowplan can use **Apple Intelligence right on the device**. **The text does not leave the device** – it goes neither to the Flowplan server nor to an AI provider. AI through the server is not affected and stays available.

**What you need:** the Flowplan app for iPhone or iPad with **iOS/iPadOS 26** or later, or the desktop app 1.2.0 or later on a Mac with **macOS 26** or later, a device that supports Apple Intelligence (such as iPhone 15 Pro or later, iPad and Mac with an M chip), and **Apple Intelligence switched on** (Settings → Apple Intelligence & Siri). In the browser and on other devices this path does not exist. The server needs a Flowplan version newer than 0.7.0 (currently the beta image).

**What runs on the device** – the light actions on an open page:

- the [writing assistant](#writing-assistant) for selected text (improve, rephrase, shorten, expand, explain more simply, change tone, translate, as a list/table, your own instruction) and free writing at the cursor,
- the [summary](#summaries) of the open page, a record or a voice note – with key points and **open tasks** that the model extracts in a structured way.

**What stays on the server:** questions to the workspace, AI in databases, AI actions and summaries of database views. They still need an instance provider.

Results from the device carry the label **On this device**, and the bottom line reads “Apple Intelligence · only on this device”. The answer appears piece by piece as usual, and **Stop** cancels on the device too.

**Limits:** the on-device model is small and has little room (about 4,000 tokens for instruction, text and answer together). For the writing assistant that is enough for a few paragraphs; longer pages are summarised in parts. What is too long is taken over by the server if you may use AI there – otherwise Flowplan says the text is too long, or summarises only the beginning. If the model declines a request under Apple's safety rules, it is not sent to the server instead.

**Switching it on and off:**

- **Everyone** under **Settings → AI → On this device (Apple)**: **When possible (default)** – on the device when it can, otherwise on the server; **Only without AI on the server** – the device only when the server offers no AI; **Off** – Flowplan never asks the device. It also shows whether Apple Intelligence on this device is **available**, **turned off in Settings** or **not supported**. Switching off **Use AI features** turns off on-device AI too.
- **Administrators** under **Administration → AI → On-device AI (Apple)** for the whole instance (or with `FLOWPLAN_AI_DEVICE=off`, [configuration](/configuration#ai)). The main switch **Turn on AI** applies to AI through the server; on-device AI has its own switch and is allowed by default – also without a provider.
- **On the Mac** also in the desktop app under **Settings… → Apple Intelligence (optional) → Use Apple Intelligence on this Mac** – on by default where it is available. Off, the app never starts the model and the instance cannot reach it. This switch applies to this Mac only.
- **Pages and spaces closed to the AI** stay closed, as do your own rules, the switches of the individual features, **Selected people** and **Guests too**.

**Encrypted spaces:** in [end-to-end encrypted spaces](/encrypted-spaces) there is otherwise no AI, because the server does not know the text. On the device there is: the writing assistant (AI button in the toolbar) and the summary work with the decrypted text on the device – nothing goes to the server, not even as a fallback.

> [!TIP]
> Apple's **Writing Tools** (proofread, rewrite, summarise in the text menu) also work right in the editor in the app for iPhone and iPad. They are part of the system and run independently of these settings.

## Writing assistant

The writing assistant edits selected text or writes new text at the caret. It is available to people who may edit the page – if administrators allowed AI and the writing assistant and you haven't turned it off under **Settings → AI**.

How to open it:

- Select text → **AI** in the text menu.
- <kbd>⌘</kbd> <kbd>J</kbd> (<kbd>Ctrl</kbd> <kbd>J</kbd>): works on the selection; without one, on the current line; on an empty line, a free prompt opens.
- `/ai` or `/ki` in the block menu: free prompt at the caret.

| Action | What happens |
| --- | --- |
| **Improve** | Fixes spelling, grammar and punctuation and changes as little as possible. |
| **Rephrase** | Same content, other words. |
| **Shorten** | To about half; what matters stays. |
| **Expand** | More explanation and examples, without inventing facts. |
| **Explain more simply** | Short sentences, plain words. |
| **Change tone** | Factual, friendly or casual. |
| **Translate** | Into a language you choose – by default German text to English, other text to German. |
| **As a list** / **As a table** | Restructures the text. |
| **What should the AI do?** | Your own instruction, e.g. "Turn this into an email". |

**Free writing** (`/ai`, <kbd>⌘</kbd> <kbd>J</kbd> on an empty line): describe what you want – e.g. "Write an introduction about …". With **Page as context** (on by default), the page's content is sent along.

The AI answers in the language of the text; for free writing, in the language of your instruction. The answer first appears in a **preview** under the text, not in the document; a pulsing caret shows more is coming, **Stop** ends it early. Then:

- **Replace** (for free writing **Insert**) – the answer replaces the selection or the empty line.
- **Insert below** – under the paragraph or list.
- **Retry** – the same request again; **Other action** – back to the choices; **Discard** – nothing changes.

Headings, lists, tasks, tables, code and callouts are inserted as real blocks. Inserting is a single step that <kbd>⌘</kbd> <kbd>Z</kbd> undoes, and it works during collaboration like any other edit. Inserted blocks briefly light up in the accent colour – display only, not saved and invisible to others.

> [!NOTE]
> Images in answers are not inserted (only their alt text), and links only if they point to `http(s)`, e-mail or Flowplan itself. This stops manipulated content from sending text out through image addresses.

### Linking existing pages

With **Link existing pages** (in the writing assistant, on by default; your browser remembers the choice) Flowplan looks for up to eight pages of the workspace that fit your instruction and the selected text – with the same search as [Ask your workspace](#ask-your-workspace) – and gives the AI their titles and a short excerpt. Where a page really fits, the AI links it in its text. This works for every action, free writing and the summary of a voice note.

- The links already show in the **preview**; below it, **Linked: …** lists the linked pages. They are inserted as real page links – like `[[` in the editor: they appear in backlinks, follow a rename and survive the Markdown export.
- Only pages the AI may read for you are offered (see [What the AI may access](#what-the-ai-may-access)) – never the page you are writing in, and never closed, private, deleted or PIN-protected content. The AI only knows the pages by number; Flowplan sets the links itself. Addresses the AI makes up never become links.
- **Lists of pages:** when you ask for a list ("List all Docker Compose pages with links"), the AI also gets the titles of further matching pages (at most 120, 30 with local AI) – without excerpts. Once the answer is complete, Flowplan links every list item that names exactly the title of a page (also at its start, as in "**Gitea** – Git server"). Upper and lower case, emoji, hyphens and spaces do not matter ("it-tools" finds "🛠️ IT-Tools"). A link is only set when exactly **one** page the AI may read for you has that title – with two pages called "Notes" the item stays text; Flowplan never guesses.
- Introductions and closing lines such as "Sure! Here is the list:" or "I hope this helps!" do not end up in the document – not as a bullet of their own either.
- The **on-device AI** and end-to-end encrypted spaces do not link: that would mean searching the text on the server.
- Administrators can switch the **Link pages** feature off, and so can you under **Settings → AI**.

## Summaries

The AI returns a short **summary**, the **key points** and the **open tasks** – in the language of the content.

- **Page:** page menu **…** → **Summarise with AI**. The result appears in a side panel with **Insert as callout at the top** (summary and key points as a callout at the start of the page), **Insert tasks as checklist** (below the caret), **Copy** and **Retry**.
- **Database:** the AI button in the toolbar summarises the records of the **current view** – with its filters, search and sort order, at most 300 records. The panel says how many were included ("120 of 340 records").
- **Record:** AI button in the record's header; callout and checklist go into the record's document.
- **Voice note:** if the server turns voice notes into text ([Voice notes](/documents#voice-notes-and-meetings)), **Then summarise with AI** summarises the transcript; **Insert below** puts the summary under it.

Long pages are read in parts: each part is summarised, then the parts are merged (in smaller parts with local AI). Very long content is cut after twelve parts, and the panel says so. Records you may not see or that are closed to the AI are left out.

### Where your data goes

Every AI panel names the provider at the bottom, e.g. "Ollama · llama3.1 · local" or "… · Data goes to api.openai.com". With local AI the text stays on your server; otherwise the selected text, your instruction and – with **Page as context** and summaries – the page content go to that provider. Flowplan loads page and database content itself on the server and first checks that the AI may read it.

On pages the AI may not read, every AI entry is greyed out with the hint "The AI has no access to this page" – also for selected text. The server refuses such requests as well.

## Ask your workspace

**Ask AI** (sidebar, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>A</kbd> or <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>A</kbd>, <kbd>⌘</kbd> <kbd>K</kbd> → "Ask AI …" or the button in search) answers questions about your pages and databases – such as "When is the next heating maintenance due?" or "What did we decide about onboarding?".

**A panel at the right edge:** on a computer and an iPad, **Ask AI** opens as a panel to the right of the page; the page gets narrower, nothing is covered. You can keep writing, scrolling and opening other pages while the answer is written – it keeps going, and the conversation stays when you switch pages. A click on a source opens the page beside it, the panel stays open. The panel starts at about 420 px and takes at most 45 % of the window; drag its left edge (or use the arrow keys) to change the width – a double-click resets it – and this browser remembers it. The page beside it lays out for the room it has left: when it gets tight it switches to its narrow layout, and the **table of contents** collapses to a button that opens the outline as a list. In narrow windows (below about 1100 px) the panel lies over the page instead of squeezing it; **Pin** puts it beside the page, **Unpin** over it again – this browser remembers that too. <kbd>Esc</kbd> in the panel, the <kbd>×</kbd> or the same shortcut close it again. **Ask AI** and the **comments** share the right edge: opening one closes the other. In focus mode the panel is hidden. On phones, **Ask AI** is a sheet above the bottom bar; swiping it down (or the arrow at its top) shrinks it to an "AI is answering …" button – the answer keeps going.

- **This page:** with a page open, the **This page** switch sits above the question field – on by default. The whole page then goes to the AI with your question: text, headings, lists, tables and code blocks as Markdown. So the AI answers questions like "What does this code block do?" or "Summarise this page" from the page itself; it appears as source [1], marked **This page**, and the search in the chosen scope runs as well. If the page is too long for the model, only its beginning goes along (about 60,000 characters, 12,000 with local AI), and a note below the answer says so. The server first checks that you may read the page and that the AI may read it; closed pages and end-to-end encrypted spaces have no switch. A click turns it off for this page; when you open another page it is on again.
- **Suggest as changes:** below an answer given with **This page**, this button puts the answer into the page as [suggested changes](/collaboration#suggest-changes) – for example after "Switch the stack to Postgres 16" or "Fix the spelling in the second section". Nothing is overwritten: removed words are struck through, new ones are marked, each change is a suggestion of its own with your name and "(AI)", which you accept or reject one by one in the **Suggestions** bar (or all at once). In a **code block** the lines are compared – only the changed lines are suggested. New paragraphs, list items or code blocks go to the right place; if you reject them they disappear completely. If a passage has changed in the meantime or Flowplan cannot find it again unambiguously, it is not applied – the panel says how many suggestions were inserted and how many were not. The button only appears when you may edit the page (and it is not locked); people who may only read get the answer. It works with every provider, local ones too.
- The answer names its **sources** as numbered references [1], [2] …; a click opens the page or record. The references come from the search, never from the AI's text. Below the answer you see the sources it actually cites; further sources found sit behind **n more sources** and unfold on a click (if an answer cites none, the first three show).
- If the AI finds nothing that fits, it answers "I found nothing about that." instead of making something up.
- **Where to look:** the whole workspace, the open page with its sub-pages, or one space – in the menu at the top left. With **All my workspaces** (its last entry) the question searches every workspace you belong to – each only when AI is usable for you there (not as a guest when guests have no AI, for example), and with your rules for each workspace. Sources from other workspaces carry its name; a click switches there.
- **Questions about Flowplan itself:** The Flowplan help – this documentation, in English and German – is built into the app and searched along with **Whole workspace** and **All my workspaces**. Questions like “How do I set up two-factor sign-in?” or “Where do I choose the AI provider?” are answered from the help; such sources are marked **Flowplan help** and open the matching section on docs.flowplan.org. **Only the Flowplan help** in the menu asks there alone. The help lives in the app itself – no request goes out for it, and it matches the installed version.
- **Journal and dates:** journal days reach the AI with their date, and so does today's date. Questions like “What was the last thing with Batu?” or “What did I last …” take the newest matching day. A name or a rare word finds its pages even when a common word of the question hits many other pages.
- **Formatting:** answers are formatted – bold, italic, lists (also nested), code and links; the source numbers stay clickable.
- **Copy:** **Copy** below the sources takes the whole answer. Each code block also has its own **Copy code** button in its top right corner – handy when the AI puts a command, a snippet or a ready text (such as an issue to file) into a code block. This applies wherever AI answers appear formatted.
- **Propose actions:** below an answer, the AI can propose what to create from it – see [AI actions](#ai-actions).
- **Conversation:** follow-up questions take the last questions and answers into account; **New conversation** starts over. The conversation stays in this browser tab only and is not stored on the server.
- The search uses the full-text index; the best-matching passages go with your question to the provider shown at the top of the panel. The AI only reads what you may read and what is open to the AI ([What the AI may access](#what-the-ai-may-access)). A page's [tags and property values](/pages-and-spaces#tags-and-properties) count as part of its text.
- While the answer is written, a shimmer and a typing cursor show progress; the sources appear one after another.

### Semantic search (optional)

Questions in Chinese, Japanese, Korean or Thai are split into words even though these languages don't use spaces. "浦东新区的发票在哪里" searches for 浦东新区 and 发票; small particles like 的 are left out.

In addition to full text, Flowplan can store content as vectors ("embeddings"). **Ask AI** then also finds passages without the same words – "trip" finds "company outing".

1. Set an **embedding model** at the instance provider:
   - **Ollama:** download `nomic-embed-text` (under **Administration → AI → Download model** or `ollama pull nomic-embed-text`) and enter it.
   - **OpenAI-compatible:** e.g. `text-embedding-3-small`; **Gemini:** `text-embedding-004`. Anthropic has no embeddings.
2. **Turn on semantic search** and save. Or via the environment: `FLOWPLAN_AI_SEMANTIC_SEARCH=on` and `FLOWPLAN_AI_EMBEDDING_MODEL=nomic-embed-text`.

- A background job embeds changed pages and records chunk by chunk; unchanged chunks are not embedded again. At most `FLOWPLAN_AI_EMBED_PER_HOUR` chunks per hour (default 5,000).
- **Never embedded:** journals with a PIN, pages and spaces closed to AI, and the trash. Permissions and personal AI rules apply to every question.
- Semantic search always uses the instance provider. People using their own provider search full text only.
- **Storage:** 4 bytes per dimension and chunk (up to about 900 characters) – with `nomic-embed-text` (768 dimensions) about 3 KB per chunk, roughly three to four times the text; with 1,536 dimensions about 6 KB. Only a checksum of each chunk is stored, not its text. The administration shows the number and size.
- **Switching off** deletes all vectors; **changing the model** rebuilds them.
- For very large instances (hundreds of thousands of chunks) there is no vector index yet; the search stays correct but gets slower.

### Related pages

Below a page and in a database record, **Related pages** shows up to eight pages and records that belong with it. It also works without AI:

- **Without semantic search**, it counts links from the page, links to the page, pages with the same links, the same tags (multi-select) for records, and similar titles in the full-text index.
- **With semantic search**, pages with similar content are added ("by meaning"). Only the vectors already stored are compared – no request goes to the provider, no text leaves the server. The open page must be readable for the AI; every hit passes the same rules as **Ask AI**.

Only what you may read is shown – no private spaces of others, no hidden records, nothing from the trash or locked journals.

## AI actions

From an answer of **Ask AI**, from the writing assistant (**Propose actions** below the answer) or from the transcript of a [meeting](/documents#voice-notes-and-meetings), the AI proposes actions:

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
- only records you may see and the AI may read – no private records of others, nothing from journals with a PIN, from pages and spaces [closed to AI](#close-pages-and-spaces-to-ai), from end-to-end encrypted spaces, from the trash, or from places you excluded in your AI settings,
- only properties visible to you (per-property read permissions apply); relations, formulas, rollups, files, progress, time and sprints are not sent, nor the text of the records' documents,
- the records in the database's order.

Limits: at most 3 databases and 200 records per request and about 40,000 characters (about 8,000 in the writing assistant with a model on your own server). If not everything fits, the data says so ("… and 57 more records") and the AI points it out. Apple's on-device AI does not read databases.

## AI on whiteboards

On [whiteboards](/whiteboards#ai-on-the-whiteboard), **AI** in the toolbar opens three features:

- **Group by theme (AI):** arrange the selected notes – or all in view – by theme in labelled columns.
- **Summarise as a page:** a new page next to the board with summary, themes, decisions, open questions and action items (optionally as real tasks with person and due date), linking back.
- **Create with AI …:** a mind map or a flowchart from a description.

When [creating database records from notes](/whiteboards#sticky-notes-as-database-records) there is also **Split with AI**: the AI fills further properties from the note's text, with a preview before anything is created. Creating the records itself needs no AI.

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

## For admins

Under **Administration → AI**:

1. **Turn on AI.**
2. Choose the **instance provider** (or **No provider**, see below), enter address, model and – if needed – the **API key**. **Test connection.**
3. **Who may use AI:**
   - **All** or **Selected people** – enable the latter per person under **Administration → Users → Manage** (**AI features**).
   - **Guests too** – when off, guests have no AI features.
   - **People may add their own provider/key** – then everyone can set up their own provider with their own key in their settings. This also works with no instance provider at all: people use AI with their own account at a provider, without the instance paying for it.
4. **Features:** allow or forbid each one separately. Optionally turn on [semantic search](#semantic-search-optional).
5. **On-device AI (Apple):** allowed by default, independently of the switch in step 1 ([on-device AI](#on-device-ai-apple)). Switch it off if there should be no AI on the instance at all.
6. **Save.**

This covers three typical setups:

| Setup | Settings |
| --- | --- |
| Everyone uses the same AI | Instance provider, **All** |
| Only certain people | Instance provider, **Selected people**, enable them under Users |
| Everyone with their own solution | **No provider** (or one as well), **People may add their own provider/key** |

All settings can also be preset with [environment variables](/configuration#ai), for instance for automated installations. They apply until someone saves in the administration.

### Close pages and spaces to AI

Owners of a workspace or a space can mark a **page** (in the share dialog) or a **space** (in the space settings) **Closed to AI**. This applies to everyone and to everything below – sub-pages and database records. No AI feature reads this content, even if a person allowed it in their own rules.

New [contacts databases](/contacts) start closed to the AI; whoever manages the page can open them.

## For users

Under **Settings → AI**:

- **Provider in use:** which provider works for you and whether your text leaves the server ("Your text is processed on this server and does not leave it." with Ollama).
- **Use AI features:** switch AI off for yourself entirely – or single features.
- **On this device (Apple):** whether Apple Intelligence is available here and whether Flowplan should use it – **When possible (default)**, **Only without AI on the server** or **Off** ([on-device AI](#on-device-ai-apple)).
- **Set up own provider** (if administrators allow it): provider, address, model and your key. Your own providers need public `https` addresses. If there is an instance provider too, choose under **Which provider to use** between **The instance's** and **My own**.

### What the AI may access

You decide which content the AI may read:

- **Everything I may see** (default) – with exceptions you exclude.
- **Only selected** – only workspaces, spaces, pages and databases you allow.

With **Add rule** you pick a workspace, space, page or database and **allow** or **exclude** it. Rules apply to sub-pages and records too; the closest rule wins. For example, allow a whole workspace and exclude a page with salary data in it.

The AI **never** reads:

- pages and records you may not see,
- other people's private records,
- the trash,
- journals with a PIN lock (even when unlocked),
- pages and spaces closed to AI.

On a page the AI may not read, AI features are greyed out with a note saying why.

## Security of keys

- **Stored encrypted:** API keys – the instance's and everyone's – are only stored encrypted in the database (AES-256-GCM, bound to their owner; a copied value can't be decrypted elsewhere). The key for this comes from `FLOWPLAN_ENCRYPTION_KEY`, `FLOWPLAN_SECRETS_KEY` or the file `secrets.key` in the data folder ([Stored secrets](/configuration#stored-secrets)).
- **Write-only:** a stored key is never shown again – not in the interface, the API, exports, backups or logs. Only "stored · ends in …abcd" with **Replace** and **Remove** is visible.
- **Bound to the address:** if the provider or address changes, the stored key is deleted. A key therefore never goes to a server other than the one it was entered for. Keys are only sent in headers, never in addresses; redirects are not followed.
- **No internal addresses for own providers:** people's own providers only reach public `https` addresses – no addresses in the internal network or of the server itself.
- **From environment variables:** a key from `FLOWPLAN_AI_API_KEY` is never stored in the database and only used for the provider from the variables.
- **Error messages** from providers are cleaned of keys before they are shown or logged.
- **No access with API tokens or in the demo:** API tokens can neither read nor change AI settings and cannot use AI features; in the demo, AI through the server is off (on-device AI is there with the default settings).
- **Limits:** at most 30 requests per minute, 300 per hour (`FLOWPLAN_AI_REQUESTS_PER_HOUR`) and 3 at once per person.
- **Backups:** `secrets.key` is not part of the instance backup. After restoring on another server without this file, Flowplan shows "stored but unreadable – please replace", and the keys are entered again.

## Frequently asked questions

**Do I have to use AI?** No. AI through the server is off until administrators switch it on, and everyone can switch it off for themselves. AI on Apple devices is allowed because the text does not leave the device, and it is just as optional: **Settings → AI → On this device (Apple) → Off**.

**Does anything go to the server with on-device AI?** No. The text is processed on the iPhone, iPad or Mac; the server only learns which setting you chose.

**Does it work without any cloud?** Yes, with Ollama on your own server. Then no text leaves the server.

**Does the provider train on my data?** That depends on the provider's terms. Flowplan only sends what a request needs, and only content the AI may read. If you want to be sure, use Ollama.

**Are conversations stored?** Flowplan does not keep requests and answers permanently; whatever you insert into pages is normal content with version history.

**Can the AI change things by itself?** No. AI actions are proposals; only when you select them and press **Run** are they created with your permissions.

**What about the MCP server?** The [MCP server](/mcp) is a different route: an external assistant such as Claude Desktop works with your Flowplan. It is independent of the settings here.
