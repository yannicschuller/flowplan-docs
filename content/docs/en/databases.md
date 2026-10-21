# Databases

A database is a collection of records with properties. The same records can be shown as a table, board, calendar, timeline, gallery, list, feed, chart or form.

## Create a database

**New page → Database** asks for the kind:

| Kind | Properties | First view |
| --- | --- | --- |
| **Tasks** | Task, Status, Priority, Due, Assignee, Tags | Table "All tasks", plus board, calendar, timeline … |
| **Documents** | Title, Tags, Created, Edited | List "All documents" (last edited first), gallery, table; records open as a full page, empty properties are hidden |
| **Empty** | only a title | Table |

Below are **Your templates**: saved database templates, such as your own "Notes (PARA)" database with relations and views. The device remembers the last choice. Alternatively use a [template](/templates), such as "Tasks" or "Projects", or import a CSV file (see [Import, export and versions](/import-export-versions)).

## Records

- **New** at the bottom of the table or at the top right creates a record and opens it with the title selected – just start typing, <kbd>Enter</kbd> saves.
- A click on the title opens the record as a page: the title at the top to edit directly, the properties below it, and below them a full document with the same editor as every other page – including comments, version history and editing together.
- At the top right of a record: how it opens (as a dialog, in the side panel or as a full page – the choice applies to you in this browser; the database's default is marked "default"), the star for favourites, **Copy link** for the record's address, the lock for the record's permissions and the sliders for the layout of all records. **Icon** and **Cover** appear when the pointer is over the title.
- **Reading mode** (book icon at the top of the record or <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>) opens a record's text for reading only, as for pages; the device remembers it per record. Opened as a full page, **Full width** uses the whole screen – the properties keep a readable width, the text gets the space.
- An open record has its own address (`/#page=<database>&row=<record>`) – whether it opens as a dialog, in the side panel or as a full page. It can be shared, bookmarked or linked in texts with `@`. Below the properties, **Linked from** shows which records refer to it through a relation and which pages and records link to it in their text.
- **Record templates** give new records properties and content. One template can be the default for new records.
- Select several records (checkboxes on the left) and edit, duplicate or delete them together – up to 500 at once. Flowplan saves a state beforehand that can be restored from the version history.
- Deleted records sit in the database's trash and can be brought back.

### Move a page into a database

**Page actions → Move into database …** turns a document page into a record of a database you may write to – for example to bring grown documentation into a notes database:

- Title, icon and cover become the record's title, icon and cover, the content its document; files and images stay the same files (they then belong to the database).
- Comments, text comments, tasks and versions come along; favourites become record favourites.
- Links to the page in all pages and records of the workspace then point to the record.
- Sub-pages stay pages and move up one level. Permissions for people set on the page keep applying to them – so they become visible to neither more nor fewer people.
- Sharing of only this page (permissions for people, share links, publication) ends – the dialog lists it first; the record follows the database's permissions. The database's default record template applies.
- The page itself goes to the trash.

### Turn a record into a page

The other way round, **Turn into page …** makes a record a document page again – in the **…** menu at the top of the open record or with a right-click on the record. You need edit access to the record and write access at the target location:

- Title, icon and cover become the page's title, icon and cover, the record's document its content; files and images stay the same files (they then belong to the page).
- The properties stay as a short "Property: value" list at the top of the page (readable in a Markdown export too); in the dialog you can drop them instead.
- Comments, text comments, tasks and versions come along; record favourites become page favourites.
- Links to the record in all pages and records of the workspace then point to the page – @ links and backlinks keep working.
- The page goes where the database is, or to another location of your choice, and follows its permissions. The record's own permissions and relations from other records to it end – the dialog lists them first.
- The record itself goes to the database's trash and can be brought back.

### Copy and move records

A **right-click** on a record – in a table, board, list, gallery, calendar or timeline – opens its menu: **Open**, **Duplicate**, **Copy to …**, **Move to …**, **Turn into page …** and **Delete**. When several records are selected, the menu applies to all of them; the selection bar also has **Move / copy to …**.

In the dialog you choose the target database in the same workspace:

- **Copy** creates new records – with properties, content, icon and cover. Files and images are copied too, so the copy does not depend on the source.
- **Move** takes the record itself: content, comments, version history, tracked time and Git links stay with it. In the new database it gets the next number (ticket ID).
- Properties are matched **by name**, the title always to the title. Compatible types are converted (text ↔ e-mail, select ↔ multi-select, number → text …); missing select options are added to the target. **Create missing properties in the target** adds properties the target does not have yet.
- Calculated values (formulas, rollups, progress, created/edited) are worked out again in the target.

With the mouse it is quicker: **drag records by their handle onto a database in the sidebar** to move them there; hold <kbd>Alt</kbd> to copy them instead. Flowplan saves a state of the source beforehand.

## Properties

| Type | Content |
| --- | --- |
| Text, number | Numbers with a format: currency, percent, decimal places, thousands separators |
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

## Large databases

Tables, lists and galleries first show 100 records; the next 100 follow as you scroll, and groups and board columns have **Show more**. Search, filters, sorting and column calculations still always apply to all records. This way even databases with thousands of records open in a fraction of a second.

## Filter, sort, group

Every view has its own settings:

- **Filters** with AND/OR groups; for date fields also relative periods ("this week", "last 30 days") that update themselves every day.
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
