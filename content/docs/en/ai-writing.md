---
keywords: writing assistant, rewrite, translate, summary, chatgpt
---

# Writing assistant and summaries

The AI writes, shortens, translates and improves text at the cursor and summarises pages, meetings and comments.

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

With **Link existing pages** (in the writing assistant, on by default; your browser remembers the choice) Flowplan looks for up to eight pages of the workspace that fit your instruction and the selected text – with the same search as [Ask your workspace](/ask-ai) – and gives the AI their titles and a short excerpt. Where a page really fits, the AI links it in its text. This works for every action, free writing and the summary of a voice note.

- The links already show in the **preview**; below it, **Linked: …** lists the linked pages. They are inserted as real page links – like `[[` in the editor: they appear in backlinks, follow a rename and survive the Markdown export.
- Only pages the AI may read for you are offered (see [What the AI may access](/ai#what-the-ai-may-access)) – never the page you are writing in, and never closed, private, deleted or PIN-protected content. The AI only knows the pages by number; Flowplan sets the links itself. Addresses the AI makes up never become links.
- **Lists of pages:** when you ask for a list ("List all Docker Compose pages with links"), the AI also gets the titles of further matching pages (at most 120, 30 with local AI) – without excerpts. Once the answer is complete, Flowplan links every list item that names exactly the title of a page (also at its start, as in "**Gitea** – Git server"). Upper and lower case, emoji, hyphens and spaces do not matter ("it-tools" finds "🛠️ IT-Tools"). A link is only set when exactly **one** page the AI may read for you has that title – with two pages called "Notes" the item stays text; Flowplan never guesses.
- Introductions and closing lines such as "Sure! Here is the list:" or "I hope this helps!" do not end up in the document – not as a bullet of their own either.
- The **on-device AI** and end-to-end encrypted spaces do not link: that would mean searching the text on the server.
- Administrators can switch the **Link pages** feature off, and so can you under **Settings → AI**.

## Summaries

The AI returns a short **summary**, the **key points** and the **open tasks** – in the language of the content.

- **Page:** page menu **…** → **Summarise with AI**. The result appears in a side panel with **Insert as callout at the top** (summary and key points as a callout at the start of the page), **Insert tasks as checklist** (below the caret), **Copy** and **Retry**.
- **Database:** the AI button in the toolbar summarises the records of the **current view** – with its filters, search and sort order, at most 300 records. The panel says how many were included ("120 of 340 records").
- **Record:** AI button in the record's header; callout and checklist go into the record's document.
- **Voice note:** if the server turns voice notes into text ([Voice notes](/media-and-files#voice-notes-and-meetings)), **Then summarise with AI** summarises the transcript; **Insert below** puts the summary under it.

Long pages are read in parts: each part is summarised, then the parts are merged (in smaller parts with local AI). Very long content is cut after twelve parts, and the panel says so. Records you may not see or that are closed to the AI are left out.

### Where your data goes

Every AI panel names the provider at the bottom, e.g. "Ollama · llama3.1 · local" or "… · Data goes to api.openai.com". With local AI the text stays on your server; otherwise the selected text, your instruction and – with **Page as context** and summaries – the page content go to that provider. Flowplan loads page and database content itself on the server and first checks that the AI may read it.

On pages the AI may not read, every AI entry is greyed out with the hint "The AI has no access to this page" – also for selected text. The server refuses such requests as well.
