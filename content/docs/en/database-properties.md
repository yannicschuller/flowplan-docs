---
keywords: property, field, column, type, select, multi-select, rich text
---

# Database properties

A database's property types at a glance, formatted text in fields and multi-selects with the workspace's tags.

## Properties

| Type | Content |
| --- | --- |
| Text | Formatted text: bold, italic, strikethrough, code, links, line breaks (see below) |
| Number | Numbers with a format: currency, percent, decimal places, thousands separators |
| Date | With or without time and end date, time zone, personal reminders, recurrence |
| Select, multi-select | Coloured options, e.g. for status or tags |
| Checkbox, checklist | Tick off; checklists with several items and progress |
| URL, e-mail, phone | Clickable |
| Person | Members of the workspace; assigning someone notifies them |
| Files | Attachments and images right on the record |
| Relation, rollup | A link to records of another database and calculations over them |
| Formula | A value calculated from other properties |
| Created time/by, edited time/by | Maintained automatically |

Relations, rollups and formulas are described under [Properties, formulas and rollups](/properties-and-formulas).

### Collapsing properties in a record

Below a record's title, the **Properties** arrow folds the properties into one line: the two or three most relevant values as small chips (status first, then selects, dates and people) and “+4 properties”. A tap on the line opens it again. The record's content moves up – especially useful on a phone.

- The choice applies to **all records of the database** and is stored in your account, **separately for phone and computer**: collapsing on the phone leaves everything visible on the computer.
- Without a choice of your own, properties are expanded on a computer; on a phone they are collapsed as soon as the record shows more than four properties. A record you have just created always opens expanded so you can fill it in.
- Collapsing changes no values and no permissions and only applies to you. Printing and exports always show all properties – unless you turn them off in the [print options](/print-and-pdf#print-and-pdf).
- Ordinary pages have the same in the [bar with tags and properties](/page-tags#collapsing-the-bar).

### Formatted text

Text properties – all except the title – can contain **bold**, *italic*, ~~strikethrough~~, `code`, links and line breaks. These are marks within the text only, no blocks: headings, lists, quotes or tables are not available there (that is what the record's own text is for). There is no underline.

- **Editing:** click the cell in the table, or the field in the record. When text is selected, a small bar with bold, italic, strikethrough, code and link appears above it.
- **Shortcuts:** <kbd>⌘</kbd> <kbd>B</kbd> bold, <kbd>⌘</kbd> <kbd>I</kbd> italic, <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>X</kbd> strikethrough, <kbd>⌘</kbd> <kbd>E</kbd> code, <kbd>⌘</kbd> <kbd>K</kbd> links the selected text (without a selection <kbd>⌘</kbd> <kbd>K</kbd> opens the quick search as everywhere). Links only go to `http`, `https` and `mailto`; `example.com` becomes `https://example.com`, an e-mail address a `mailto:` link. An empty field removes the link.
- **Line break:** <kbd>⇧</kbd> <kbd>Enter</kbd>. In a table cell <kbd>Enter</kbd> ends editing and saves, <kbd>Esc</kbd> discards it. In the record, in the feed and when editing through a share link, <kbd>Enter</kbd> also makes a line break; the value is saved when you leave the field.
- **Display:** formatted in table, board, gallery, list, feed, the record, published pages and embedded views. In table cells and on cards a line break shows as a space (the row stays one line), in the record and the feed as a break. Links open in a new tab; on cards that are links themselves they stay text.
- **As plain text** the value counts for search, filters (*contains* …), sorting, grouping, formulas (`prop("Note")` returns the text without formatting), copying to the clipboard, the CSV export, the apps' widgets and placeholders in templates and automations.
- **Pasting** from Word, Google Docs or web pages keeps bold, italic, strikethrough, code and links; headings become bold, paragraphs and list items line breaks, images and tables are left out.
- **Import and export:** CSV (including Notion exports), Jira and Trello, vCards, LDAP and form answers are plain text – asterisks and underscores stay as written. Tables from AFFiNE and tables from documents (**Turn into database**) keep their formatting. The Markdown export writes the formatting as Markdown, the CSV export plain text. Older content archives come in as plain text.
- **Existing values** from before this feature look as they did: `*asterisks*` keep their asterisks.
- **Changing the type:** when another property becomes text, its values stay as written; when text becomes another type, the text without formatting counts.
- **API and MCP:** the value is a string with inline Markdown: `**bold**`, `_italic_` (or `*italic*`), `~~strikethrough~~`, `` `code` ``, `[label](https://…)` and `\n` for a line break. A backslash keeps `` \ * _ ~ ` [ ] `` as characters – so send plain text escaped. Links with other schemes (such as `javascript:`) show only their label; `# ` or `- ` at the start stay text. The title is plain text.

### Multi-select with the workspace tags

Instead of its own list, a multi-select can have the **workspace's tags** as its options – the same tags pages carry. In the property's settings (click the column header), under **Options**, choose between **Own list** and **Workspace tags**.

- The property offers the tags that apply in the database's space – those of the whole workspace and those of the space (see [scope](/page-tags#scope-workspace-or-space)) –, with their colours and in their order; a new tag from a record belongs to the database's space; cells, board columns and cards show the tag colours. In a record you pick with **+ Tag** as on pages: typing suggests matching tags, <kbd>Enter</kbd> takes one.
- A value that is not a tag yet creates the tag – as on pages, members with edit rights may do that. Readers, guests and read tokens only pick existing tags. On a board, **+ Group** creates a new tag for such a property.
- It stays a multi-select: filters, sorting, grouping, board columns, formulas, automations, import and export (Markdown, CSV, Git), API and MCP work as usual. The tag names are stored.
- **Renaming, merging and deleting** a tag (Settings → Tags & properties) changes every record with that tag as well: a renamed tag shows under its new name, merging turns the one tag into the other (without duplicates), a deleted tag disappears from the records. Filters and board columns of views follow; Flowplan first keeps a version of every database affected in its version history.
- Records with tags appear in the [tag view](/page-tags#tag-view) next to the pages and are found with `#tag` / `-#tag` in the search.
- **Switching** an existing multi-select to the tags: its options are matched to tags (ignoring case), missing tags are created; the records keep their values, now with the tag's exact name. **Back to “Own list”**, the tags become its own options – the ones in use first, at most 100; the values stay.
- Guests only see the tags used in the records shared with them as options and create none. Through share links a record only offers its own tags.
- In [encrypted spaces](/encrypted-spaces) the option does not exist (like tags on pages).
