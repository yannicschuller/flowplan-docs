---
keywords: Ask Flo, Flo, docs assistant, chat, question, answer, Claude, Anthropic, sources, privacy, limits, Discord /ask, AI help
---

# Ask Flo

Flo is the assistant of these docs: ask a question about Flowplan in your own words and get a short answer from these pages, with links to the sections it comes from.

## What Flo is

Flo – the small otter with the notepad – lives in the **Ask Flo** button at the bottom right of every page. Click it, type your question and press Enter. Flo answers in a few sentences and lists the pages under **Sources**, so you can read on there. Links to these docs open in the same tab, and the conversation is still there when you open Flo again on the next page.

You can also start from the search: type what you are looking for (⌘K, Ctrl+K or `/`) and choose **Ask Flo: …** at the end of the results. Flo opens with your search term in the question box – you can still change it, and it goes to Flo only when you send it.

Flo understands follow-up questions – "and on Android?" – because the last few questions and answers of the conversation go along with the next question. **Start over** clears the conversation. On a phone, Flo opens as a sheet from the bottom of the screen.

Flo answers in German or English, depending on the language you read the docs in and write your question in.

## How Flo answers

Flo answers **only from these docs**. For each question, the Flo service searches the public pages of docs.flowplan.org, picks the sections that fit best and hands them to the language model Claude by Anthropic together with your question. Claude is told to answer only from those sections and to name the pages it used. Flo has no web access, cannot use tools and cannot see your Flowplan instance, your pages or your account.

If the docs do not cover something, Flo says so and points you to the docs, the community on Discord or GitHub. Questions that are not about Flowplan get a short refusal.

Answers are plain text with a little formatting – lists, bold, code – and only links to the docs, flowplan.org, Flowplan's GitHub repositories and the Discord invite. Everything else in an answer is shown as text, never as a working link or as code that runs.

> [!WARNING]
> Answers can be wrong. A language model can misread a section, mix up two features or leave out a condition. For anything important – an update, a backup, a setting on your server – read the linked section before you act on it.

## Privacy

The short version, shown under the question box too: **your question goes to Anthropic (Claude) and is answered only from the public docs.**

What goes to Anthropic:

- your question,
- the last few questions and answers of this conversation (at most the last six messages – each question and each answer counts as one – and at most about 4,000 characters together), so follow-ups work,
- the excerpts from these docs that Flo picked for the answer.

What does not go to Anthropic: your name, your IP address, cookies, the session key described below or anything else about you. Flo cannot tell who you are, and it does not need to. Do not put personal or confidential information into a question – it would be sent along as part of the text.

What stays in your browser:

- **No cookie.** Flo sets none and sends none. Requests go out without cookies and without the page's address; only the name of the page you are reading goes along, as a hint for finding the right sections.
- **The conversation stays in this tab.** It is kept in the tab's session storage, so it survives moving between pages, and it is gone when you close the tab – or as soon as you choose **Start over**.
- **A session key.** Before the first question, your browser solves a small computing task, which takes about a second ("Getting Flo ready …"). In return, the service hands out a session key valid for two hours. It is bound to nothing personal and also only kept in the tab. It keeps automated scripts from asking in bulk and lets the service count the limits below.
- **Nothing is counted on this site.** Questions are not part of the docs' visitor statistics.

On the Flo service:

- **Limits** are counted per session key, and – as a fallback – under a keyed hash of the IP address. The IP address itself is never stored.
- **Logging is off by default.** If the operator turns it on to improve Flo, only anonymised question–answer pairs are kept – without session key, address or any identifier – and they are deleted automatically after a set number of days.

Anthropic processes the text it receives under the terms for its API.

## Limits

So that Flo stays available to everyone and its costs stay predictable, there are limits:

| Limit | What happens |
| --- | --- |
| Length of a question | About 500 characters by default; the counter under the box shows how many are left |
| Questions per session | A few per minute, hour and day. When you reach one, Flo tells you from what time you can ask again |
| All questions together | A daily and monthly limit for everyone. When it is reached, Flo takes a break and the button disappears until then |
| Monthly budget | When the month's budget is used up, Flo pauses until the next month |

When Flo takes a break, the panel closes, a short note tells you why and the button disappears. The docs, the search and every other feature of this site work as always.

## Flo on Discord

In the [Flowplan Discord](https://discord.gg/bCEdB6MPrR), Flo answers with the slash command `/ask` in the channels meant for it: type `/ask` followed by your question. The answer opens a **public thread** in the channel – everyone in the channel can read your question and the answer – and you can ask follow-up questions right in the thread.

The same rules apply there: answers only from these docs, with sources, and limits per person and overall. Flo does not send your Discord name or ID to Anthropic; the service only receives a pseudonymous key that the Discord bot derives from your account to count the limits. When Flo is off or has reached a limit, `/ask` tells you so in a message only you can see.

## Other ways to ask

- [Flowplan docs in your AI](/docs-in-your-ai): use these docs in Claude, ChatGPT, Cursor or another assistant of your own, as an MCP server or with the **Ask Claude** and **Ask ChatGPT** buttons under every page title.
- The community on [Discord](https://discord.gg/bCEdB6MPrR) – people who use and run Flowplan help each other there.
- A bug or something missing from the docs: open an issue on [GitHub](https://github.com/yannicschuller/flowplan/issues).
