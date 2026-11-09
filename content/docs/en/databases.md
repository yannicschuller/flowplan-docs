# Databases

A database is a collection of records with properties. The same records can be shown as a table, board, calendar, timeline, gallery, list, feed, chart or form.

## Create a database

**New page → Database** shows the **Kind** right below as one row to choose from, with the properties of the chosen one underneath:

| Kind | Properties | First view |
| --- | --- | --- |
| **Tasks** | Task, Status, Priority, Due, Assignee, Tags | Table "All tasks", plus board, calendar, timeline … |
| **Documents** | Title, Tags, Created, Edited | List "All documents" (last edited first), gallery, table; records open as a full page, empty properties are hidden |
| **Contacts** | Name, First name, Last name, Company, Position, E-mail, Phone, Mobile, Street, Postal code, City, Country, Birthday, Tags | List “All contacts” (by last name), Table, calendar “Birthdays”, Gallery; records open as a profile page with a contact card – see [Contacts](/contacts) |
| **Empty** | only a title | Table |

Below are **Your templates**: saved database templates, such as your own "Notes (PARA)" database with relations and views. The device remembers the last choice. Alternatively use a [template](/templates), such as "Tasks" or "Projects", or import a CSV file (see [Import, export and versions](/import-export-versions)).

## Records

- **New** at the bottom of the table or at the top right creates a record and opens it with the title selected – just start typing, <kbd>Enter</kbd> saves.
- **Editing:** in the table <kbd>Enter</kbd> saves numbers too; a double-click on a multi-select only opens it without ticking an option. <kbd>Esc</kbd> closes an open record – what you typed into the title or properties stays saved.
- A click on the title opens the record as a page: the title at the top to edit directly, the properties below it, and below them a full document with the same editor as every other page – including comments, version history and editing together.
- At the top right of a record: how it opens (as a dialog, in the side panel or as a full page – the choice applies to you in this browser; the database's default is marked "default"), the star for favourites, **Copy link** for the record's address, the lock for the record's permissions and the sliders for the layout of all records. **Icon** and **Cover** appear when the pointer is over the title.
- **Reading mode** (book icon at the top of the record or <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>) opens a record's text for reading only, as for pages; the device remembers it per record. Opened as a full page, **Full width** uses the whole screen – the properties keep a readable width, the text gets the space.
- An open record has its own address (`/#page=<database>&row=<record>`) – whether it opens as a dialog, in the side panel or as a full page. It can be shared, bookmarked or linked in texts with `@`. Below the properties, **Linked from** shows which records refer to it through a relation and which pages and records link to it in their text.
- **Record templates** give new records properties and content. One template can be the default for new records.
- Select several records (checkboxes on the left) and edit, duplicate or delete them together – up to 500 at once. Flowplan saves a state beforehand that can be restored from the version history.
- Deleted records sit in the database's trash and can be brought back. Right after deleting it is quicker: **Undo** in the notice at the bottom (or <kbd>⌘</kbd> <kbd>Z</kbd> while it shows). A bulk edit of several records, a record dragged into another column, a removed date and a deleted property can be taken back the same way.

### Move a page into a database

**Page actions → Move into database …** turns a document page into a record of a database you may write to – for example to bring grown documentation into a notes database:

- Title, icon and cover become the record's title, icon and cover, the content its document; files and images stay the same files (they then belong to the database).
- The page's tags go into the database's (first) multi-select with the [workspace's tags](#multi-select-with-the-workspace-tags), if there is one and you may change it.
- Comments, text comments, tasks and versions come along; favourites become record favourites.
- Links to the page in all pages and records of the workspace then point to the record.
- Sub-pages stay pages and move up one level. Permissions for people set on the page keep applying to them – so they become visible to neither more nor fewer people.
- Sharing of only this page (permissions for people, share links, publication) ends – the dialog lists it first; the record follows the database's permissions. The database's default record template applies.
- The page itself goes to the trash.

### Turn a record into a page

The other way round, **Turn into page …** makes a record a document page again – in the **…** menu at the top of the open record or with a right-click on the record. You need edit access to the record and write access at the target location:

- Title, icon and cover become the page's title, icon and cover, the record's document its content; files and images stay the same files (they then belong to the page).
- The properties stay as a short "Property: value" list at the top of the page (readable in a Markdown export too); in the dialog you can drop them instead.
- The tags from multi-selects with the [workspace's tags](#multi-select-with-the-workspace-tags) become the page's tags.
- Comments, text comments, tasks and versions come along; record favourites become page favourites.
- Links to the record in all pages and records of the workspace then point to the page – @ links and backlinks keep working.
- The page goes where the database is, or to another location of your choice, and follows its permissions. The record's own permissions and relations from other records to it end – the dialog lists them first.
- The record itself goes to the database's trash and can be brought back.

### Copy and move records

A **right-click** on a record – in a table, board, list, gallery, calendar or timeline – opens its menu: **Open**, **Duplicate**, **Copy to …**, **Move to …**, **Turn into page …** and **Delete**. When several records are selected, the menu applies to all of them; the selection bar also has **Move / copy to …**.

**Copying records:** with records selected in the table view, **Copy** in the selection bar (or <kbd>⌘</kbd>/<kbd>Ctrl</kbd>+<kbd>C</kbd> while no text is selected) puts them on the clipboard – with the view's visible columns as the header row, in the table's order. Pasted into Excel, Numbers or Google Sheets, every value lands in its own cell; in a document it becomes a table. Values come out as the table shows them: numbers in the column's format, select and person columns by name, relations by the record's title, checkboxes as Yes/No.

In the dialog you choose the target database in the same workspace:

- **Copy** creates new records – with properties, content, icon and cover. Files and images of the source database are copied too, so the copy does not depend on the source. Only files that belong to the source database, that you may see and that are not in the trash are copied; a reference to any other file stays a reference and keeps that file's permissions.
- **Move** takes the record itself: content, comments, version history, tracked time and Git links stay with it. In the new database it gets the next number (ticket ID).
- Properties are matched **by name**, the title always to the title. Compatible types are converted (text ↔ e-mail, select ↔ multi-select, number → text …); missing select options are added to the target. **Create missing properties in the target** adds properties the target does not have yet.
- Calculated values (formulas, rollups, progress, created/edited) are worked out again in the target.

Dragging is quicker: **drag records by their handle (with the mouse also by the card) onto a database in the sidebar** to move them there – the target database is highlighted; hold <kbd>Alt</kbd> when you let go to copy them instead. Flowplan saves a state of the source beforehand.

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

- The property offers the tags that apply in the database's space – those of the whole workspace and those of the space (see [scope](/pages-and-spaces#scope-workspace-or-space)) –, with their colours and in their order; a new tag from a record belongs to the database's space; cells, board columns and cards show the tag colours. In a record you pick with **+ Tag** as on pages: typing suggests matching tags, <kbd>Enter</kbd> takes one.
- A value that is not a tag yet creates the tag – as on pages, members with edit rights may do that. Readers, guests and read tokens only pick existing tags. On a board, **+ Group** creates a new tag for such a property.
- It stays a multi-select: filters, sorting, grouping, board columns, formulas, automations, import and export (Markdown, CSV, Git), API and MCP work as usual. The tag names are stored.
- **Renaming, merging and deleting** a tag (Settings → Tags & properties) changes every record with that tag as well: a renamed tag shows under its new name, merging turns the one tag into the other (without duplicates), a deleted tag disappears from the records. Filters and board columns of views follow; Flowplan first keeps a version of every database affected in its version history.
- Records with tags appear in the [tag view](/pages-and-spaces#tag-view) next to the pages and are found with `#tag` / `-#tag` in the search.
- **Switching** an existing multi-select to the tags: its options are matched to tags (ignoring case), missing tags are created; the records keep their values, now with the tag's exact name. **Back to “Own list”**, the tags become its own options – the ones in use first, at most 100; the values stay.
- Guests only see the tags used in the records shared with them as options and create none. Through share links a record only offers its own tags.
- In [encrypted spaces](/encrypted-spaces) the option does not exist (like tags on pages).

## Large databases

Tables, lists and galleries first show 100 records; the next 100 follow as you scroll, and groups and board columns have **Show more**. Search, filters, sorting and column calculations still always apply to all records. This way even databases with thousands of records open in a fraction of a second.

## Filter, sort, group

Every view has its own settings:

- **Filters** with AND/OR groups; for date fields also relative periods ("this week", "last 30 days") that update themselves every day.
- **Dates and time zone:** on **Created at**, **Edited at** and date fields with a time, *is*, *is not*, *before*, *after*, *on or before*, *on or after* and *is between* count the day the moment falls on in the filter's time zone – a record from 11:30 pm belongs to that day, not the next. The default is your browser's time zone; it shows in the filter and can be changed there, as for relative periods. Dates without a time stay calendar days. Older filters keep using the UTC day until you edit them. The same goes for conditions in automations.
- **Sorting** by several properties.
- **Grouping** by almost any property (except files and checklists), with up to five levels in tables and lists; boards show the second level as rows (swimlanes).
- **Search** within the database, also in the text of the record documents.
- **Column calculations** below table columns: sum, average, median, minimum, maximum, percentages, earliest and latest dates and more.

## Recurring records

Date fields can repeat daily, weekly, monthly or yearly. Calendar and timeline show the occurrences; it remains a single record. If needed, a single occurrence can be detached as a record of its own.

### Repeating tasks

For tasks that are ticked off one by one each time (“monthly closing”, “server updates”), set a rhythm in the record under **Repeating task**: daily, weekly (optionally on certain weekdays, e.g. Mo, We, Fr), monthly or yearly, each every N days, weeks, months or years. With several date fields you choose which one moves on.

As soon as the record is done (status or checkbox, see [When is a record done?](/projects-and-tickets#when-is-a-record-done)), Flowplan creates the next record: a copy with the status it had before, the chosen date on the next occurrence and every other date field moved by as many days. The rhythm moves to the new record; reopening and completing the old one again creates nothing more.

- Month ends are clamped but the day is kept: 31 January → 28 February → 31 March.
- 29 February becomes the 28th in common years and the 29th again in leap years.

New records at fixed times – whether or not the last one is done – come from [scheduled automations](/projects-and-tickets#scheduled-automations).

## Date reminders

In a record, everyone can set a personal reminder for every filled date field – for times at the appointment or 5 minutes to 1 week before, for all-day dates on the day or 1, 2 or 7 days before at 09:00. Reminders appear in the inbox and as a push notification and do not change the record.

## Permissions per record

The permissions icon at the top of a record restricts a record beyond the permissions of the database:

- **Same as database**: the default.
- **Read-only record**: only its managers (page owners and the person who created the record) and people it is explicitly shared with may change it.
- **Private record**: only its managers and people it is shared with see it – together with its comments, tasks and files (in the file list, search, media library, copies, templates and backups).

Shares with people or groups never go beyond their role on the database page.

## Automations and workflows

Recurring steps of a database – set a date, notify, apply a template – are done by [automations](/projects-and-tickets#automations) under **… → Automations**. For longer flows with branches, waits, approvals, AI, e-mails or other services there are [workflows](/workflows); every rule can be extended into one with **Open in canvas**.
