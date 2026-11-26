---
keywords: diary, daily note, tracker, habits, review
---

# Journal

A journal is a page with one sub-page per day. In the morning today's page is ready, with yesterday's open tasks already on it.

![A journal's page: "Today" at the top with Wednesday, 4 November, and the start of the day, below it the streak, longest streak, entries and words, a heatmap of the year and the last 30 days of the mood, sleep and exercise trackers](/screenshots/journal.webp "The journal page with today, the streak and the trackers.")

## Create a journal

**New page → Journal**. The page shows **Today** at the top and the past days below it with relative labels such as "Yesterday". The day pages are named after the date automatically, such as "Saturday, 26 September 2026".

## How a day comes about

- When a new day is opened for the first time, Flowplan creates its page. The day starts at midnight in your time zone.
- **Open tasks** from the last day move over – including nested sub-tasks. Tasks **in progress** `[/]`, **deferred** `[>]` or with another Obsidian symbol such as `[?]` count as open; done, **cancelled** `[-]` and empty tasks stay on their day, as does the rest of the text. A small ↻ at the corner of the checkbox shows that a task was carried over from an earlier day.
- **Empty days disappear**: if a day got nothing of its own besides carried-over tasks, it is removed again on the next day. This way the journal only contains days on which something happened.

{since=0.10.0} A day listing something under [Completed this day](#completed-this-day) (as the person opening the journal sees it: **Only mine** or **All**, their time zone) stays. A workflow writing into a day (**Append to journal day**) never removes the day before.

{since=0.10.0} An empty day goes to the [trash](/pages-and-spaces#trash), restorable, without the tasks that moved on. Opening its date again, or a workflow writing into it, brings that day back; a day you deleted yourself stays in the trash.

{since=0.12.0} Each new day re-checks the last week: empty days go too, unless they hold open tasks or you restored them.

### Create the day's page: automatically or on the first write

Under **Set up journal → Days** you decide when today's page is created:

- **Automatically** (default): as described above, as soon as the day starts and the journal or the app is opened.
- **On the first write**: **Today** first shows a **draft** with the template and the tasks that would be carried over from the last day. Nothing is saved yet – the top bar says "Draft – created when you start writing". Only the first keystroke, a ticked task, a tracker value, a place or a file creates the page. Until then carried-over tasks stay on their day, and the draft appears neither in the sidebar nor in search, graph or export.

The draft is the same on every device: if two devices start writing at the same time, exactly one page is created and both texts end up in it. If what the day starts with changed in the meantime (for example because a task was ticked yesterday on another device), Flowplan opens the stored page and says so. Text typed offline stays on the device and creates the page as soon as the connection is back.

Without a connection, **Today** opens even when the draft could not be loaded: you write into an entry on this device, and its text goes into the day once it is created (see [What works offline](/what-works-offline)). {since=0.10.0}

Every day remembers which version of the template it was created from. A day that only holds that template counts as empty even if the template was changed later.

### Remove empty days

**Set up journal → Days → Find empty days** lists old days on which nothing was written: only the template, no open tasks of its own, no tracker values or places, no files, comments, sub-pages, favourites, shares or links from other pages, title and icon unchanged (upper/lower case or spaces do not count as a change). Today always stays. Untick what should stay and move the rest with **Move … days to the trash** (restorable). Flowplan never removes old days on its own.

## Daily template

**Set up journal** (gear on the journal page) → **Template**: every new day starts with this content, such as "Grateful for", "Focus today" and "Evening review". Ready-made templates are available (gratitude & focus, 5-minute journal, work log, daily review); **Save today as template** {since=0.9.8} makes the current day's content the template for every new day. Tasks from the template come back every day and are not carried over in addition.

**Choose from templates …** {since=0.9.8} lists your saved [document templates](/templates#your-own-templates) that apply in the journal's space: those of this space, those of the whole workspace and your private ones. Choosing one copies its content into the daily template. Later changes to the saved template don't change the journal – only when you choose it again. Database templates and templates of other spaces are not offered. **Remove** clears the daily template; new days then start empty.

**Carried-over tasks** (also under **Template**) decides where the open tasks of the day before go in a new day: **At the top** (the default, before the template), **After the template** or **Below the heading …** – the template's headings are offered. With a heading, the list goes directly below it, before the template's content there. Without that heading in the template, they go after it. This also applies to the draft with **On the first write**.

**Open tasks** (right below): **Move** (the default) or **Copy** – copied tasks also stay on the day before, marked as carried over, and no longer count as open there. {since=0.11.5}

The copied original keeps its box (empty or half-filled) with a small ➔ badge, "Continued on …" on hover; it stays closed there even if you change its status. **Unmark as continued** in its status menu (right-click or long-press the box) makes it an ordinary task again. {since=0.11.6}

## Trackers, place and appointments

Above every day there is a bar:

- **Trackers**: mood (😞 to 😄), scales from 1 to 5, numbers with a unit (e.g. sleep in hours) or yes/no (e.g. sport). You decide which ones exist under **Set up journal → Trackers**.
- **Place**: enter freely; **Location** also stores the device's coordinates with a link to the map.
- **Appointments**: records of all databases with a date that you may see, including recurrences. Under **Set up journal → Calendar** you can also add a calendar via an iCal link (Google, Apple, Outlook, Nextcloud …).

In the settings under **Day bar**, place and appointments can be switched off for the whole journal.

### Completed this day

Below every day, **Completed this day** lists the database records that were completed that day and the tasks ticked off in a document that day – including those of your page "Tasks" from **My tasks** – each with the time, a link and the name of the database or page. Tasks carry a small task symbol. The list is built each time the day opens.

- A record counts on the day it was last completed, and only while it is still done by its database's done rule – reopen it and it leaves the list. The day follows your time zone.
- **All / Only mine** at the top of the list: **Only mine** (the default) shows the records you completed yourself and those a person property assigns to you, whoever ticked them off. When an automation completes a record, it counts for the person who set up the automation. The choice is yours for this journal, on all devices.
- Only records you may see appear – no private records of others, nothing from locked journals or encrypted spaces. On a day with nothing completed, the list is missing; beyond 100 records it ends with "and … more".
- It can be switched off for the whole journal under **Set up journal → Day bar → Completed this day** (on by default).
- A task counts on the day it was last ticked off, and only while it is done – reopened or **Cancelled**, it drops out. Tasks of the day itself are in the day already and do not appear here. With **Only mine**, the tasks you ticked off or that are given to you count.
- If you change the text of a completed task, it stays in the list – with its new text.

### Meeting notes

Next to every appointment there is **Create meeting note**. Flowplan creates a page below the journal – with the title and date of the appointment, the **Attendees**, an **Agenda**, **Notes** and **Tasks** – and opens it. Afterwards the appointment shows **Open note**.

- **Attendees**: from the connected Google or Outlook calendar, from the iCal link and from person properties of the record. Whoever is a member of the workspace with that e-mail address is mentioned; others are listed with name and address.
- **Tasks** with @person show up for that person in **My tasks** right away.
- For records of a database the note links the record. A PIN lock of the journal also covers its meeting notes.
- The same outline is available as the template **Meeting note** under **Templates → Meetings**.

## In the sidebar

Even after years with thousands of days, the journal stays short in the sidebar. Below the journal you find:

- **Today** – also when today's page has not been created yet; a click opens the day,
- the **last 7 days**,
- **All days …** with the number of all days: opens the journal page at its list or calendar.

Other sub-pages of the journal (such as meeting notes or monthly summaries) follow below as usual.

Under **Set up journal → Days** you choose for each journal which **days appear in the sidebar**:

- **None**
- **Last 7 days** (the default)
- **Grouped by year and month**: as above, older days in addition in folders by year and month, such as "October 2026 · 18". The folders are not pages – nothing can be dragged into them.
- **All**: every single day, as before.

An open day always shows in the sidebar, even when older; in the grouped view its year and month unfold. Days can still be dragged, and the arrow keys work in the folders too (→ opens, ← closes or jumps to the folder above).

**Day title** below names new days: **Long** (the default, "Thursday, 26 November 2026"), **Date (ISO)**, "2026-11-26", {since=0.12.0} **Short** ("Thu, 26 Nov 2026"), ISO with weekday ("Thu 2026-11-26") or a **Custom pattern** like `ddd DD.MM.YYYY` (YYYY, MMMM, MMM, MM, DD, dddd, ddd …). Existing days keep their title; those of an earlier pattern count as renamed. {since=0.12.1}

## From day to day

Above every day page there is a bar:

- **← Previous day** and **Next day →** jump to the previous or next day with an entry – gaps are skipped.
- **Today** opens today's day.
- The **month** (such as "October 2026") opens a small calendar: days with an entry are highlighted and can be opened. The arrow keys move by a day or a week, <kbd>Page ↑</kbd>/<kbd>Page ↓</kbd> by a month; <kbd>Esc</kbd> closes it.
- **Fill in an earlier day:** if you may write in the journal, a past day without an entry can be chosen in the calendar too (**Create entry**). Flowplan creates the page for that day and opens it – with the [daily template](#daily-template), but without carrying over open tasks. Today works as usual; days after today stay locked, as do days whose page is in the trash and a journal behind its [PIN](#pin-lock). {since=0.9.7}

From anywhere, ++⌘ ⌥ Y++ (Windows/Linux: ++Ctrl Alt Y++) or the command **Journal: Today** in the quick search (++⌘ K++) takes you to today – of the journal used last. With several journals the quick search offers one entry per journal. The shortcut can be changed (see [Keyboard shortcuts](/keyboard-shortcuts#your-own-shortcuts)).

The streak, heatmap and tracker history on the journal page and the review of a week or a month are described in [Overview and review in the journal](/journal-review).

## PIN lock

Under **Set up journal → Lock**, a PIN of 6 to 8 digits protects the journal (shorter PINs set earlier keep working): days, search, previews and images stay hidden until the PIN is entered. After 15 minutes or with the lock button it locks itself again. After five wrong attempts there is a five-minute pause, after twenty in one day it is over until the next day – across server restarts too. Five wrong PINs from another person notify the journal's creator. Only the person who created the journal and the workspace owners may set or change a PIN. Changing or removing it requires the current PIN – a wrong one counts against the same limits as when unlocking, and after five wrong ones the person who created the journal is notified as well. If the PIN is forgotten, owners can remove it on the lock screen with **Reset PIN**. They confirm it with their password, an authenticator code or a passkey (or a sign-in less than ten minutes old). The reset is recorded in the activity log and the journal's creator is notified. The lock also covers sub-pages of days, databases below the journal (their records, relations, calendar subscriptions and CalDAV) as well as export, the content archive, comments and duplicating – unlock first for those. It protects against glances but is no encryption: whoever has access to the server's backups sees the content.

A journal with a PIN stays private: setting the PIN revokes every share link and publication of the journal and the pages below it, switches off public forms of its databases and takes the journal out of links and publications of pages above it. The message after locking says how many there were; the security log records it. No new links, publications or public forms can be created for a journal with a PIN – not even while it is unlocked. Sharing or publishing a page above it with its sub-pages leaves the journal out. Forms for members only stay.

## If today's page was deleted

If today's page is in the trash, the journal says so and offers **Create again** (a fresh page for today; with **On the first write** a new draft) or **Restore from trash**.

## Days in lists, search, graph and export

A journal soon has hundreds of days. So that they do not crowd out other pages:

- **Search and @ mentions**: days come after all other hits. The filter **Without journal days** in the quick search leaves them out completely (it stays on for the next search).
- **@heute**, **@gestern** and **@2026-10-27** (also `@today`, `@yesterday`) insert a link to that day of the journal while writing – the journal in the page's space, otherwise the one written in last. Today works as when opening the journal: the page is created or, with **On the first write**, the link goes to the draft. Days without an entry cannot be linked.
- **Graph**: under **Journal days** the graph hides the days, shows **one dot per month** (default) or **each day**.
- **Counting**: the home page, space settings and the instance settings count days separately, such as "120 pages · 340 journal days".
- **Export**: in the Markdown ZIP, the scheduled export and Git, days sort by path in their journal's folder under `2026/10/2026-10-27.md` – see [Import, export and versions](/import-export-versions).

Journals behind a PIN you have not entered appear in none of these – not even in the numbers.

## Tips

- `/todo` or `[]` + space creates tasks that move along. They also appear under **My tasks**, without any @mention.
- Journals can be shared like any page. Whoever may only read sees the days but does not create any.

## Workflows

The trigger **New journal day** starts a [workflow](/workflows) when a day's page is created (when it is first opened or written in, not at midnight; for fixed times use **Schedule**). The step **Append to journal day** writes into today, yesterday or a given date and creates the day like opening it would – see [Workflow nodes](/workflow-nodes#pages). Journals with a PIN are closed to workflows.
