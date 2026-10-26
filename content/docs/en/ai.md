# AI

Optional AI for writing, summaries, questions to your workspace and databases – off by default, completely local with Ollama if you like, or with a key for OpenAI, Anthropic, Gemini or any OpenAI-compatible service. In the apps for iPhone, iPad and Mac optionally also [right on the device with Apple Intelligence](#on-device-ai-apple).

> [!NOTE]
> **AI in Flowplan is always optional.** After installation it is off. Administrators decide whether it is available, which provider is used, who may use it and which features are allowed. Everyone can switch it off again for themselves and decide which pages the AI may read. With [Ollama](#ollama-completely-local) your text never leaves the server. The one exception to “off by default”: [on-device AI (Apple)](#on-device-ai-apple) is allowed because nothing leaves the device – administrators and everyone can switch it off too.

## Principles

- **Off until someone switches it on** – on the instance and for every person.
- **Every feature separately:** writing assistant, summaries, questions to the workspace, AI in databases and AI actions can each be allowed or switched off by administrators and by every person.
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

**Ask AI** (sidebar, <kbd>⌘</kbd> <kbd>K</kbd> → "Ask AI …" or the button in search) answers questions about your pages and databases – such as "When is the next heating maintenance due?" or "What did we decide about onboarding?".

- The answer names its **sources** as numbered references [1], [2] …; a click opens the page or record. The references come from the search, never from the AI's text.
- If the AI finds nothing that fits, it answers "I found nothing about that." instead of making something up.
- **Where to look:** the whole workspace, the open page with its sub-pages, or one space. With **All workspaces** the question searches every workspace you belong to – each only when AI is usable for you there (not as a guest when guests have no AI, for example), and with your rules for each workspace. Sources from other workspaces carry its name; a click switches there.
- **Propose actions:** below an answer, the AI can propose what to create from it – see [AI actions](#ai-actions).
- **Conversation:** follow-up questions take the last questions and answers into account; **New conversation** starts over. The conversation stays in this browser tab only and is not stored on the server.
- The search uses the full-text index; the best-matching passages go with your question to the provider shown at the top of the panel. The AI only reads what you may read and what is open to the AI ([What the AI may access](#what-the-ai-may-access)).
- While the answer is written, a shimmer and a typing cursor show progress; the sources appear one after another.

### Semantic search (optional)

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

**Do I have to use AI?** No. It is off until administrators switch it on, and everyone can switch it off for themselves. AI on Apple devices is optional too: **Settings → AI → On this device (Apple) → Off**.

**Does anything go to the server with on-device AI?** No. The text is processed on the iPhone, iPad or Mac; the server only learns which setting you chose.

**Does it work without any cloud?** Yes, with Ollama on your own server. Then no text leaves the server.

**Does the provider train on my data?** That depends on the provider's terms. Flowplan only sends what a request needs, and only content the AI may read. If you want to be sure, use Ollama.

**Are conversations stored?** Flowplan does not keep requests and answers permanently; whatever you insert into pages is normal content with version history.

**Can the AI change things by itself?** No. AI actions are proposals; only when you select them and press **Run** are they created with your permissions.

**What about the MCP server?** The [MCP server](/mcp) is a different route: an external assistant such as Claude Desktop works with your Flowplan. It is independent of the settings here.
