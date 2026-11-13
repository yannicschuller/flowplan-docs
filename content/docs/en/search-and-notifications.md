---
keywords: search, quick search, cmd k, filter, collection, saved search, commands
new: order-path-and-recently-viewed 2026-11-13
---

# Quick search and collections

The quick search finds content right down into file attachments. The inbox and push notifications tell you when someone needs you.

**More on this topic:** [Inbox and notifications](/notifications)

## Quick search

++⌘ K++ (Windows/Linux ++Ctrl K++) or **Search** in the sidebar.

It searches:

- page titles and [aliases](/page-tags#aliases) as well as document text,
- [tags and property values](/page-tags#tags-and-properties) of pages,
- database records and their content,
- comments,
- file names,
- the text of PDF attachments (up to 50 MB, the first 100,000 characters),
- scanned PDFs and images with text recognition (German and English, French or Chinese (Simplified) on request via `FLOWPLAN_OCR_LANGS`),
- Word, Excel, PowerPoint and OpenDocument files.

Hits can be filtered by type and space. [Journal days](/journal#days-in-lists-search-graph-and-export) come after all other hits; **Without journal days** leaves them out completely and stays on for the next search. File text is indexed in the background and can be found after a few seconds. The search only shows what you may read. <kbd>Enter</kbd> opens the first hit.

Aliases of pages and records weigh as much as the title. When the search only matches an alias, the hit shows the real title with the alias in grey, e.g. "Chauffage · PAC". The same applies in the @ mention dialog.

### Order, path and recently viewed

Hits whose title is exactly your search come first, then titles that start with it (or have a word that does), then other title hits, and hits only in the text last. Within these, pages and records **you** open often and recently move up; pages you edited lately and your favourites count a little too. Each hit shows its path (space / … / parent page, for records including the database) and when it was last edited. Above the list are the number of hits and the order: **Best match**, **Last edited** or **Recently created**.

With nothing typed, the quick search lists the pages and records you opened last (up to 20, newest first), grouped by day: Today, Yesterday, then the date.

For this, Flowplan keeps the times of your last ten visits per page and record (to the minute). This history is yours alone: it only affects your own search and nobody else sees it, not even administrators in the app. Visits older than 180 days are deleted, and at most 500 pages and records per person are kept; the history goes when you leave a workspace and when your account is deleted. Access through API tokens does not count.

### Filter by tags and properties

These words act as filters in the search:

| Input | Finds |
| --- | --- |
| `#customer` | pages with the tag “customer” (case does not matter) and database records carrying it in a multi-select with the workspace's tags; tags with spaces as `#"New idea"` |
| `-#internal` | leaves out pages and records with the tag |
| `Status:Open` | property “Status” with the value “Open” (select and multi-select: exactly this option; text, URL, email, phone: contains) |
| `Budget:>1000`, `Budget:<=50`, `Budget:10..20` | compare numbers |
| `Due:2026-12`, `Due:>2026-11-01`, `Due:2026-11-01..2026-11-30` | dates: day, month or year; after, between (also `<`, `>=`, `<=`) |
| `Billed:yes` / `Billed:no` | checkbox |
| `Owner:Emil`, `Owner:me` | person by name; `me` is you |
| `Status:*` / `Status:-` | property set / empty |

Names with spaces go in quotes: `"Next step":Offer`. Several filters apply together; the remaining text is searched as usual. Filters without text list all matching pages, most recently changed first. Records count with their own tags and those of their database page. Words that name no tag and no property (like `#123`) stay ordinary search words.

Tags and properties can [apply in one space only](/page-tags#scope-workspace-or-space), and two spaces may have ones of the same name. `#Urgent` is a name: it finds the pages with any tag of that name you may see – in each space the one that applies there. The **Tag …** choice next to the search field shows, with a space chosen, only its tags and the workspace's; for all spaces all of them with the space's name as a hint. The [tag view](/page-tags#tag-view), in contrast, shows exactly one tag (same-named ones of other spaces on request).

Recognised filters appear as chips under the search field; ✕ removes one. The **Tag …** choice next to the space adds a tag filter. Collections keep the filters. Tag names and values are also ordinary words of the page: “customer” also finds pages tagged “customer”.

### Combine: AND, OR, NOT

Conditions combine freely, in the search and in [collections](#collections):

| Input | Meaning |
| --- | --- |
| `#customer #open` | both (AND; you may write `AND` between them) |
| `#open OR #waiting`, `#open \| #waiting` | either |
| `-#internal`, `NOT #internal`, `-draft` | without; `-` or `NOT` works before any condition and before parentheses |
| `(#open OR #waiting) -#internal` | parentheses group |
| `created_by:Anna`, `creator:me` | created by (a name, or `me` for you) |
| `updated_by:Emil`, `editor:me` | last changed by |
| `created:-7d`, `updated:this-week` | created or changed in the last 7 days, this week |
| `created:2026-03`, `updated:>2026-01-01`, `created:2026-01-01..2026-01-31` | year, month or day; after (`>`, `>=`), before (`<`, `<=`), a range |
| `type:document`, `type:database\|whiteboard`, `type:record` | only documents, databases, whiteboards or database records (also `notebook`, `journal`) |
| `in:"Team Marketing"` | only in this space |
| `title:offer` | only the title contains the word |

**Relative dates:** `-7d`, `-2w`, `-3m` and `-1y` mean the last 7 days, 2 weeks, 3 months or a year, including today. You can also use `today`, `yesterday`, `this-week`, `last-week`, `this-month`, `last-month`, `this-year` and `last-year`. Weeks start on Monday. "Today" is the day in your time zone. These also work for date properties: `Due:this-week`.

**Precedence:** `NOT`/`-` binds tightest, then AND, then OR. So `#A #B OR #C` means `(#A #B) OR #C`. Use parentheses when in doubt. `OR`, `AND` and `NOT` only count in capitals. A lower-case "or" stays a search word.

**Words:** Words right next to each other are searched as one phrase, as before. With `AND` between them (`invoice AND open`), they can appear anywhere.

**Keys:** `created_by`, `creator`, `updated_by`, `editor`, `created`, `updated`, `type`, `in` and `title` are English and ignore case. If a property has the same name, put its name in quotes: `"Type":Book`. For database records, `Property:value` first checks the record's own property of that name (e.g. `Priority:High`), then the database page's.

All existing searches work as before. Searches that use the new conditions list the matching pages and records without a text snippet, most recently changed first. The server does not search end-to-end encrypted spaces.

### Commands

The same quick search also runs commands: if the input starts with `>`, only commands appear, such as `> new database`, `> tasks`, `> dark` or `> focus`; <kbd>Enter</kbd> runs the first one. Matching commands also appear above the search hits without `>`. With a page open there are page commands as well: favourite, follow, comments, export, print/PDF, version history, share and focus mode.

### Collections

A **collection** is a saved search with its own place in the sidebar. Each time you open it, Flowplan searches again. New and changed pages and records that match appear by themselves.

- **Create:** In the quick search, choose **Save as collection** (the search's kind and space become `type:` and `in:`), or select **+** next to **Collections** in the sidebar.
- **Filters or text:** In the editor, build the query under **Filters**. Groups require **all conditions (AND)** or **any condition (OR)**. You can exclude any condition or group (NOT). The conditions are tag, created by, last edited by, property (by type: select, multi-select, text, number, date, checkbox, person), created and updated (relative or fixed), type, space, title contains and text contains. **Text** shows the same query in the search language. Both views stay in step: what you change in the text shows up in the filters again. If a text cannot be shown as filters (for example because of a missing parenthesis), the editor stays in text mode and says so. Below the query you see right away how many matches there are.
- **Results:** As a **list** or a **table** with title, type, space, tags, updated and created by. Most recently changed come first; select a column heading to sort the matches loaded so far. You see 500 matches at first. If more match, the end shows “500 of N matches” and **Load more** – each click appends the next 500 until all are there. When something changes in the workspace meanwhile, every match you have loaded stays.
- **Manage:** The **…** menu next to a collection has Edit (name, emoji, filters, sharing), Duplicate, Move up/Move down and Delete. You can also drag collections into order; the order is yours alone. After you delete a collection, **Undo** brings it back.
- **Sharing:** New collections are private. With **Share with the workspace**, all members see it under **Shared**; guests do not. Only you and the workspace's owners can change or delete it. Only you can share it or stop sharing it. Others can choose **Duplicate as my collection**.
- **Permissions:** In a collection, each person sees only what they may read themselves. This also applies to shared collections: no private spaces, no private records of others, no hidden properties, no journals behind a PIN, nothing from the trash. End-to-end encrypted spaces are left out, and the collection says so.
- **Limits:** 100 collections per person and workspace, 100 shared ones per workspace.

Saved searches from earlier versions became private collections when you updated. Searches for comments or files keep their words, but not the kind.
