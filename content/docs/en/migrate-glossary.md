---
keywords: terms, glossary, moving, Notion, AFFiNE, Obsidian, Evernote, Confluence, Google Docs, Word, counterpart
---

# Terms when moving

What you know from Notion, AFFiNE, Obsidian, Evernote, Confluence or Google Docs – and what it is called in Flowplan.

The [introduction](/settings#the-introduction) shows the same overview in the step **What it's called here**, after you picked a tool under **Where are you coming from?**. **The same** means the same idea under this name; **similar**: close, with the difference in the note; **no counterpart**: Flowplan has nothing comparable – the note says what to use instead. How to bring your content over is in [Moving to Flowplan](/migrate).

## What stays the same everywhere {since=0.9.7}

- “/” on an empty line opens all blocks – as you are used to.
- “@” mentions pages, records, people and dates; “[[” links a page.
- Markdown shortcuts such as #, - and [] work while typing; “>” makes a toggle (or a quote, as you choose).

## Notion {since=0.9.7}

How to move: [Notion](/migrate#from-notion).

| In Notion | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Workspace | Workspace | the same |  |
| Teamspace | Space | the same | Spaces are for a team or private. |
| Page | Page | the same | Pages nest as deep as you like. |
| Database | Database | the same | Table, board, calendar, gallery, list, timeline, form, chart and feed as views. |
| Linked view of database | Linked database | the same |  |
| Relation / Rollup | Relation / Rollup | the same | Relations between databases of the same import are connected. Rollups come from the export only as values (text); through the Notion API they become rollups where Flowplan knows the calculation. |
| Formula | Formula | the same | The export brings only the results (as text); you set up the formula again. Through the Notion API, formulas that Flowplan can read come along. |
| Synced block | Synced block | the same |  |
| Toggle / toggle heading | Toggle | the same |  |
| Callout | Callout | the same |  |
| Database templates | Templates | the same | Save a record as a template, with placeholders like `{{Today}}`. |
| Database automations | Automations | the same |  |
| Buttons | Workflow button | similar | A button in the document starts a workflow. |
| Sub-items | Subtasks | the same |  |
| Inbox / Updates | Inbox | the same |  |
| Page history | Versions | the same |  |
| Publish / Sites | Publish on the web | similar | Publish pages one by one, with or without sub-pages; no separate websites with navigation. |
| Notion Calendar / Mail | – | no counterpart | No separate apps for this – databases have a calendar view and can be subscribed to as a calendar. |

## AFFiNE {since=0.9.7}

How to move: [AFFiNE](/migrate-affine).

| In AFFiNE | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Workspace | Workspace | the same |  |
| Doc / Page mode | Page | the same |  |
| Edgeless mode | Whiteboard | similar | In Flowplan a whiteboard is a page of its own, not a second mode of the same document; the import turns it into whiteboards. |
| Frame (Edgeless) | Frames | the same | Also for presentations. |
| Collections | Collections | similar | Collections are saved searches in the sidebar; the import creates AFFiNE collections as pages with links. |
| Folders (Organize) | Sub-pages | similar | Folders become pages with their documents below them. |
| Journals | Journal | the same |  |
| Database block | Database | the same |  |
| Doc properties | Properties | the same |  |
| Tags | Tags | the same |  |
| Linked doc | Page link (@ or [[) | the same |  |
| Templates | Templates | the same |  |
| Favorites | Favourites | the same |  |
| Trash | Trash | the same |  |

## Obsidian {since=0.9.7}

How to move: [Obsidian](/migrate-notes#from-obsidian-and-other-markdown-folders).

| In Obsidian | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Vault | Space | similar | A vault becomes a page tree in a space; several vaults fit into one workspace. |
| Note | Page | the same |  |
| Folder | Sub-pages | similar | A folder becomes a page with its notes as sub-pages. |
| `[[Wikilinks]]` | Page link ([[ or @) | the same | Links follow renames. |
| Backlinks | Linked from | the same |  |
| Graph view | Graph | the same |  |
| Daily notes | Journal | the same |  |
| Canvas | Whiteboard | similar | Canvas files are not imported; a whiteboard is a page of its own. |
| Callouts (`> [!note]`) | Callout | the same |  |
| Properties (frontmatter) | Properties | the same |  |
| `#tags` | Tags | the same |  |
| Embeds (`![[…]]`) | Synced block | similar | Embedded images and files stay; to embed one note in another, use a synced block. |
| Community plugins | Extensions | similar | Obsidian plugins do not run in Flowplan; extensions are in the marketplace. |
| Local files | – | no counterpart | Flowplan stores on the server, not as Markdown files; export as Markdown at any time, offline on request. |

## Evernote {since=0.9.7}

How to move: [Evernote](/migrate-office#from-evernote).

| In Evernote | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Notebook | Page | similar | A notebook becomes a page with its notes as sub-pages. |
| Stack | Space | similar | Group notebooks in a space or below a page. |
| Note | Page | the same |  |
| Tags | Tags | the same |  |
| Shortcuts | Favourites | the same |  |
| Tasks | Task list | the same | Task lists in pages; what is assigned to you is collected in “My tasks”. |
| Reminders | Reminder | similar | Reminders belong to dates and due dates. |
| Web Clipper | Web clipper | the same |  |
| Spaces | Space | the same |  |
| Search in images and PDFs | Search | the same | Full-text search also finds text in PDFs and images. |

## Confluence {since=0.9.7}

How to move: [Confluence](/migrate-office#from-confluence).

| In Confluence | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Space | Space | the same |  |
| Page / page tree | Page | the same |  |
| Blog post | – | no counterpart | No separate blog type – use a database with a date and a feed view. |
| Info / note / warning panel | Callout | the same |  |
| Expand macro | Toggle | the same |  |
| Macros | Blocks (/) | similar | Info, code and expand macros become blocks; what other macros show comes as plain content or is missing. |
| Labels | Tags | the same |  |
| Page restrictions | Permissions (Share) | the same |  |
| Page history | Versions | the same |  |
| Inline comments | Comments | the same |  |
| Whiteboards | Whiteboard | the same |  |
| Jira issue macro | – | no counterpart | No Jira macro; Jira issues can be imported as CSV into a database. |

## Google Docs / Word {since=0.9.7}

How to move: [Google Docs / Word](/migrate-office#from-google-docs).

| In Google Docs / Word | Flowplan | Match | Note |
| --- | --- | --- | --- |
| Document | Page | the same |  |
| Folder (Drive) | Sub-pages | similar | Folders become pages with the documents below them. |
| Suggesting / Track changes | Suggest as changes | the same |  |
| Comments | Comments | the same |  |
| Version history | Versions | the same |  |
| Footnotes | Footnote | the same |  |
| Smart chips (@) | @ mentions | the same |  |
| Page setup / print layout | Print / PDF | similar | Pages flow on screen; paper size, page numbers and page breaks come with printing. |
| Google Sheets / Excel | Database | similar | A database has properties per column and formulas per record, but no free cell formulas. |
| Google Forms | Form | the same |  |
