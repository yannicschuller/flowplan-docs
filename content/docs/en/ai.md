---
keywords: ai, ollama, openai, anthropic, gemini, provider, set up, privacy
---

# Setting up AI

Optional AI for writing, summaries, questions to your workspace and databases – off by default, completely local with Ollama if you like, or with a key for OpenAI, Anthropic, Gemini or any OpenAI-compatible service. In the apps for iPhone, iPad and Mac optionally also [right on the device with Apple Intelligence](#on-device-ai-apple).

> [!NOTE]
> **AI in Flowplan is always optional.** After installation it is off. Administrators decide whether it is available, which provider is used, who may use it and which features are allowed. Everyone can switch it off again for themselves and decide which pages the AI may read. With [Ollama](#ollama-completely-local) your text never leaves the server. The one exception to “off by default”: [on-device AI (Apple)](#on-device-ai-apple) is allowed because nothing leaves the device – administrators and everyone can switch it off too.

**More on this topic:** [Writing assistant and summaries](/ai-writing) · [Ask your workspace](/ask-ai) · [AI actions, databases and workflows](/ai-actions) · [Meetings](/meetings)

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

Then choose the provider **Ollama** under **Administration → AI**. **Load installed models** shows what is there; **Download model** fetches more models with a progress bar, such as `llama3.1`, `qwen2.5` or `mistral`. For [search by meaning](/ask-ai), also download an embedding model such as `nomic-embed-text` and enter it under **Embedding model**.

> [!TIP]
> How well and how fast local models answer depends on the server. Small models (3–8 billion parameters) run on current CPUs; a graphics card makes them much faster. If Ollama runs on another machine in your network, enter its address – addresses in your own network are allowed for the instance provider.

## On-device AI (Apple)

> [!NOTE]
> **Optional and can be switched off at any time.** In the Flowplan apps for iPhone, iPad and Mac, Flowplan can use **Apple Intelligence right on the device**. **The text does not leave the device** – it goes neither to the Flowplan server nor to an AI provider. AI through the server is not affected and stays available.

**What you need:** the Flowplan app for iPhone or iPad with **iOS/iPadOS 26** or later, or the desktop app 1.2.0 or later on a Mac with **macOS 26** or later, a device that supports Apple Intelligence (such as iPhone 15 Pro or later, iPad and Mac with an M chip), and **Apple Intelligence switched on** (Settings → Apple Intelligence & Siri). In the browser and on other devices this path does not exist. The server needs a Flowplan version newer than 0.7.0 (currently the beta image).

**What runs on the device** – the light actions on an open page:

- the [writing assistant](/ai-writing#writing-assistant) for selected text (improve, rephrase, shorten, expand, explain more simply, change tone, translate, as a list/table, your own instruction) and free writing at the cursor,
- the [summary](/ai-writing#summaries) of the open page, a record or a voice note – with key points and **open tasks** that the model extracts in a structured way.

**What stays on the server:** questions to the workspace, AI in databases, AI actions and summaries of database views. They still need an instance provider.

Results from the device carry the label **On this device**, and the bottom line reads “Apple Intelligence · only on this device”. The answer appears piece by piece as usual, and **Stop** cancels on the device too.

**Limits:** the on-device model is small and has little room (about 4,000 tokens for instruction, text and answer together). For the writing assistant that is enough for a few paragraphs; longer pages are summarised in parts. What is too long is taken over by the server if you may use AI there – otherwise Flowplan says the text is too long, or summarises only the beginning. If the model declines a request under Apple's safety rules, it is not sent to the server instead.

**Switching it on and off:**

- **Everyone** under **Settings → AI → On this device (Apple)**: **When possible (default)** – on the device when it can, otherwise on the server; **Only without AI on the server** – the device only when the server offers no AI; **Off** – Flowplan never asks the device. It also shows whether Apple Intelligence on this device is **available**, **turned off in Settings** or **not supported**. Switching off **Use AI features** turns off on-device AI too.
- **Administrators** under **Administration → AI → On-device AI (Apple)** for the whole instance (or with `FLOWPLAN_AI_DEVICE=off`, [configuration](/configuration-ai-push#ai)). The main switch **Turn on AI** applies to AI through the server; on-device AI has its own switch and is allowed by default – also without a provider.
- **On the Mac** also in the desktop app under **Settings… → Apple Intelligence (optional) → Use Apple Intelligence on this Mac** – on by default where it is available. Off, the app never starts the model and the instance cannot reach it. This switch applies to this Mac only.
- **Pages and spaces closed to the AI** stay closed, as do your own rules, the switches of the individual features, **Selected people** and **Guests too**.

**Encrypted spaces:** in [end-to-end encrypted spaces](/encrypted-spaces) there is otherwise no AI, because the server does not know the text. On the device there is: the writing assistant (AI button in the toolbar) and the summary work with the decrypted text on the device – nothing goes to the server, not even as a fallback.

> [!TIP]
> Apple's **Writing Tools** (proofread, rewrite, summarise in the text menu) also work right in the editor in the app for iPhone and iPad. They are part of the system and run independently of these settings.

## For admins

Under **Administration → AI**:

1. **Turn on AI.**
2. Choose the **instance provider** (or **No provider**, see below), enter address, model and – if needed – the **API key**. **Test connection.**
3. **Who may use AI:**
   - **All** or **Selected people** – enable the latter per person under **Administration → Users**: click the person, then **More → AI features**.
   - **Guests too** – when off, guests have no AI features.
   - **People may add their own provider/key** – then everyone can set up their own provider with their own key in their settings. This also works with no instance provider at all: people use AI with their own account at a provider, without the instance paying for it.
4. **Features:** allow or forbid each one separately. Optionally turn on [semantic search](/ask-ai#semantic-search-optional).
5. **On-device AI (Apple):** allowed by default, independently of the switch in step 1 ([on-device AI](#on-device-ai-apple)). Switch it off if there should be no AI on the instance at all.
6. **Save.**

This covers three typical setups:

| Setup | Settings |
| --- | --- |
| Everyone uses the same AI | Instance provider, **All** |
| Only certain people | Instance provider, **Selected people**, enable them under Users |
| Everyone with their own solution | **No provider** (or one as well), **People may add their own provider/key** |

All settings can also be preset with [environment variables](/configuration-ai-push#ai), for instance for automated installations. They apply until someone saves in the administration.

### Close pages and spaces to AI

Owners of a workspace or a space can mark a **page** (under **Share → People**) or a **space** (in the space settings) **Closed to AI**. This applies to everyone and to everything below – sub-pages and database records. No AI feature reads this content, even if a person allowed it in their own rules.

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

- **Stored encrypted:** API keys – the instance's and everyone's – are only stored encrypted in the database (AES-256-GCM, bound to their owner; a copied value can't be decrypted elsewhere). The key for this comes from `FLOWPLAN_ENCRYPTION_KEY`, `FLOWPLAN_SECRETS_KEY` or the file `secrets.key` in the data folder ([Stored secrets](/configuration-storage#stored-secrets)).
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
