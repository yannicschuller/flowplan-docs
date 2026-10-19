# AI

Optional AI for writing, summaries, questions to your workspace and databases – off by default, completely local with Ollama if you like, or with a key for OpenAI, Anthropic, Gemini or any OpenAI-compatible service.

> [!NOTE]
> **AI in Flowplan is always optional.** After installation it is off. Administrators decide whether it is available, which provider is used, who may use it and which features are allowed. Everyone can switch it off again for themselves and decide which pages the AI may read. With [Ollama](#ollama-completely-local) your text never leaves the server.

## Principles

- **Off until someone switches it on** – on the instance and for every person.
- **Every feature separately:** writing assistant, summaries, questions to the workspace and AI in databases can each be allowed or switched off by administrators and by every person.
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

## For admins

Under **Administration → AI**:

1. **Turn on AI.**
2. Choose the **instance provider** (or **No provider**, see below), enter address, model and – if needed – the **API key**. **Test connection.**
3. **Who may use AI:**
   - **All** or **Selected people** – enable the latter per person under **Administration → Users** ("May use AI features").
   - **Guests too** – when off, guests have no AI features.
   - **People may add their own provider/key** – then everyone can set up their own provider with their own key in their settings. This also works with no instance provider at all: people use AI with their own account at a provider, without the instance paying for it.
4. **Features:** allow or forbid each one separately.
5. **Save.**

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
- **No access with API tokens or in the demo:** API tokens can neither read nor change AI settings and cannot use AI features; in the demo, AI is off.
- **Limits:** at most 30 requests per minute, 300 per hour (`FLOWPLAN_AI_REQUESTS_PER_HOUR`) and 3 at once per person.
- **Backups:** `secrets.key` is not part of the instance backup. After restoring on another server without this file, Flowplan shows "stored but unreadable – please replace", and the keys are entered again.

## Frequently asked questions

**Do I have to use AI?** No. It is off until administrators switch it on, and everyone can switch it off for themselves.

**Does it work without any cloud?** Yes, with Ollama on your own server. Then no text leaves the server.

**Does the provider train on my data?** That depends on the provider's terms. Flowplan only sends what a request needs, and only content the AI may read. If you want to be sure, use Ollama.

**Are conversations stored?** Flowplan does not keep requests and answers permanently; whatever you insert into pages is normal content with version history.

**What about the MCP server?** The [MCP server](/mcp) is a different route: an external assistant such as Claude Desktop works with your Flowplan. It is independent of the settings here.
