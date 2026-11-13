---
keywords: Flowplan docs in AI, MCP server, Claude, ChatGPT, Cursor, llms.txt, Markdown, ask AI
---

# Flowplan docs in your AI

Ask Claude, ChatGPT or your coding assistant about Flowplan directly: the documentation is available as a public MCP server, as buttons on every page and as Markdown for language models.

This page is about this **documentation**. To give your assistant access to your own pages and databases in Flowplan, see [MCP: AI assistants](/mcp).

## The docs' MCP server

The docs are an MCP server (Model Context Protocol) at this address:

```text
https://docs.flowplan.org/mcp
```

It is public, needs no account and no key, and can only read. Your assistant uses it to search the docs itself and read the right pages, instead of answering from memory. It has three tools:

| Tool | What it does |
| --- | --- |
| `search_docs` | Searches every page – with the same search as the search box here – and returns pages and sections with address and snippet |
| `get_page` | Returns a page as Markdown, by its name (`installation`) or its address |
| `list_pages` | Lists every page with title, description and section |

Every page exists in English and German. English is the default; if you write in German, the assistant usually picks the German pages by itself.

### Claude

In Claude (in the browser and in the desktop app), add the server as a custom connector:

::: steps

1. Open **Settings → Connectors** and choose **Add custom connector**.
2. Enter a name, for example *Flowplan docs*, and the address `https://docs.flowplan.org/mcp`.
3. Save. No sign-in is needed.

:::

Whether and how many custom connectors you can add depends on your plan and, for teams, on your organization's settings.

### Claude Code

```bash
claude mcp add --transport http flowplan-docs https://docs.flowplan.org/mcp
```

With `--scope user` the docs are available in all your projects. `/mcp` shows the connection and its tools.

### Cursor

In `.cursor/mcp.json` in your project (or `~/.cursor/mcp.json` for all projects):

```json
{
  "mcpServers": {
    "flowplan-docs": {
      "url": "https://docs.flowplan.org/mcp"
    }
  }
}
```

### VS Code

In `.vscode/mcp.json` in your project:

```json
{
  "servers": {
    "flowplan-docs": {
      "type": "http",
      "url": "https://docs.flowplan.org/mcp"
    }
  }
}
```

### ChatGPT and others

In ChatGPT, custom MCP connectors are available in **developer mode**, depending on your plan and workspace settings. Create a new connector there with the address `https://docs.flowplan.org/mcp` and choose **No authentication**. Where exactly this lives changes from time to time; if in doubt, check ChatGPT's help.

Other clients only need the address: the server speaks **Streamable HTTP** and answers with JSON, without a session and without sign-in.

## Buttons on every page

Below the title of every page there are four buttons:

- **Ask Claude** and **Ask ChatGPT** open the assistant with a ready-made question: it should read the page as Markdown and then answer your questions about it. The question is part of the link's address – you see it before you send it.
- **Copy as Markdown** puts the whole page on the clipboard as Markdown, to paste into any chat.
- **View as Markdown** shows the page as Markdown text.

The buttons are ordinary links. The docs load no script from Anthropic or OpenAI for them and do not count who uses them.

## llms.txt and Markdown

For language models and your own tools, the docs are also available as text:

| Address | Content |
| --- | --- |
| [/llms.txt](/llms.txt) | Index of every page with description and Markdown address ([llmstxt.org](https://llmstxt.org)) |
| [/llms-full.txt](/llms-full.txt) | Every page in one file |
| `/en/installation.md` | One page as Markdown: the page's address with `.md` at the end |

With `/de` in front, `llms.txt`, `llms-full.txt` and the `.md` addresses are in German.

## Privacy

- The MCP server needs no account, no key and no cookies.
- Search queries are answered, not stored or logged.
- A per-minute limit prevents abuse. For it, the server counts requests under a hash of the IP address that changes every day and is only kept in memory; the IP address itself is not stored.
- What you ask your assistant goes to its provider, under that provider's privacy terms.

> [!NOTE]
> The server returns only what is written here. If your assistant tells you something you cannot find on these pages, ask for the source – the tools return the address of every result.
