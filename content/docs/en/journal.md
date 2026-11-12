---
keywords: diary, daily note, tracker, habits, review
---

# Journal

A journal is a page with one sub-page per day. In the morning today's page is ready, with yesterday's open tasks already on it.

## Create a journal

**New page → Journal**. The page shows **Today** at the top and the past days below it with relative labels such as "Yesterday". The day pages are named after the date automatically, such as "Saturday, 26 September 2026".

## How a day comes about

- When a new day is opened for the first time, Flowplan creates its page. The day starts at midnight in your time zone.
- **Open tasks** from the last day move over – including nested sub-tasks. This includes tasks **in progress** `[/]`, **deferred** ones `[>]` and those with another Obsidian symbol such as `[?]`; done and **cancelled** `[-]` tasks stay on their day, as do empty tasks without text. A small ↻ at the corner of the checkbox shows that a task was carried over from an earlier day.
- Completed tasks and the rest of the text stay on their day.
- **Empty days disappear**: if a day got nothing of its own besides carried-over tasks, it is removed again on the next day. This way the journal only contains days on which something happened.

### Create the day's page: automatically or on the first write

Under **Set up journal → Days** you decide when today's page is created:

- **Automatically** (default): as described above, as soon as the day starts and the journal or the app is opened.
- **On the first write**: **Today** first shows a **draft** with the template and the tasks that would be carried over from the last day. Nothing is saved yet – the top bar says "Draft – created when you start writing". Only the first keystroke, a ticked task, a tracker value, a place or a file creates the page. Until then carried-over tasks stay on their day, and the draft appears neither in the sidebar nor in search, graph or export.

The draft is the same on every device: if two devices start writing at the same time, exactly one page is created and both texts end up in it. If what the day starts with changed in the meantime (for example because a task was ticked yesterday on another device), Flowplan opens the stored page and says so. Text typed offline stays on the device and creates the page as soon as the connection is back.

Every day remembers which version of the template it was created from. A day that only holds that template counts as empty even if the template was changed later.

### Remove empty days

**Set up journal → Days → Find empty days** lists old days on which nothing was written: only the template, no open tasks of its own, no tracker values or places, no files, comments, sub-pages, favourites, shares or links from other pages, title and icon unchanged (upper/lower case or spaces do not count as a change). Today always stays. You untick what should stay and move the rest with **Move … days to the trash** – days can be restored from there. Flowplan never removes or merges old days on its own.

## Daily template

**Set up journal** (gear on the journal page) → **Template**: every new day starts with this content, such as "Grateful for", "Focus today" and "Evening review". Ready-made templates are available (gratitude & focus, 5-minute journal, work log, daily review); **Use today** makes the current day the template. Tasks from the template come back every day and are not carried over in addition. A day that only holds the template counts as empty and disappears like any empty day.

## Trackers, place and appointments

Above every day there is a bar:

- **Trackers**: mood (😞 to 😄), scales from 1 to 5, numbers with a unit (e.g. sleep in hours) or yes/no (e.g. sport). You decide which ones exist under **Set up journal → Trackers**.
- **Place**: enter freely; **Location** also stores the device's coordinates with a link to the map.
- **Appointments**: records of all databases with a date that you may see, including recurrences. Under **Set up journal → Calendar** you can also add a calendar via an iCal link (Google, Apple, Outlook, Nextcloud …).

In the settings under **Day bar**, place and appointments can be switched off for the whole journal.

### Completed this day

Below every day, **Completed this day** lists the database records that were completed that day and the tasks ticked off in a document that day – including those of your page "Tasks" from **My tasks** – each with the time, a link and the name of the database or page. Tasks carry a small task symbol. The list is worked out each time the day opens and is not copied into the day; tick a record off elsewhere (in another tab, too) and it is there when you come back.

- A record counts on the day it was last completed, and only while it is still done by its database's done rule – reopen it and it leaves the list. The day follows your time zone.
- **All / Only mine** at the top of the list: **Only mine** (the default) shows the records you completed yourself and those a person property assigns to you, whoever ticked them off. When an automation completes a record, it counts for the person who set up the automation. The choice is yours for this journal, on all devices.
- Only records you may see appear – no private records of others, nothing from locked journals or encrypted spaces. On a day with nothing completed, the list is missing; beyond 100 records it ends with "and … more".
- It can be switched off for the whole journal under **Set up journal → Day bar → Completed this day** (on by default).
- A task counts on the day it was last ticked off, and only while it is done – reopened or **Cancelled**, it drops out. Tasks of the day itself are in the day already and do not appear here. With **Only mine**, the tasks you ticked off or that are given to you count.

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
- **Grouped by year and month**: as above, older days in addition in folders by year and month, such as "October 2026 · 18". The folders only exist in the sidebar, they are not pages – you cannot drag anything into them.
- **All**: every single day, as before.

When a day is open, the sidebar always shows it – also when it is older than 7 days; in the grouped view its year and month unfold. Days can still be dragged, and the arrow keys work in the folders too (→ opens, ← closes or jumps to the folder above).

## From day to day

Above every day page there is a bar:

- **← Previous day** and **Next day →** jump to the previous or next day with an entry – gaps are skipped.
- **Today** opens today's day.
- The **month** (such as "October 2026") opens a small calendar: days with an entry are highlighted and can be opened. The arrow keys move by a day or a week, <kbd>Page ↑</kbd>/<kbd>Page ↓</kbd> by a month; <kbd>Esc</kbd> closes it.

From anywhere, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>Y</kbd> (Windows/Linux: <kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>Y</kbd>) or the command **Journal: Today** in the quick search (<kbd>⌘</kbd> <kbd>K</kbd>) takes you to today – of the journal used last. With several journals the quick search offers one entry per journal. The shortcut can be changed (see [Keyboard shortcuts](/keyboard-shortcuts#your-own-shortcuts)).

## Overview on the journal page

- **Streak**: how many days in a row you have written, plus the longest streak, entries and words.
- **Heatmap**: the last year as squares, the darker the more you wrote. A click opens the day.
- **On this day**: entries from a week, a month, half a year and whole years ago.
- **Last 30 days**: the course of every tracker.
- **List or calendar**: the list shows an excerpt, place, mood and the first photo of each day; the calendar shows a month with photos as backgrounds.

## Review

**Review** sums up a week or a month: days, words, completed and still open tasks, tracker averages, places and photos. **Copy as Markdown** takes the summary along, for example into a weekly report.

### Summarise with AI

**Summarise with AI** in the review has the [AI](/ai-writing#summaries) sum up the week or month shown: highlights and achievements, a chronological overview and what is still open or needs following up – in the interface language. It works from each day's text, the completed and still open tasks, the trackers and places.

- The result appears as a **preview** first; nothing is saved. **Copy**, **Retry** and **Discard** sit below it.
- **Save as page** creates a sub-page of the journal, such as "AI summary October 2026", with a note that it was made with AI. There is one such page per journal and period: ask again for the same period and the review offers **Open** or **Create again and replace**. Replacing changes the page's content; the previous state stays in the version history.
- A journal with a [PIN](#pin-lock) is closed to the AI, even while it is unlocked. Days closed to the AI ([Close pages and spaces to AI](/ai#close-pages-and-spaces-to-ai)) stay out, with everything that belongs to them.
- The button is only there when summaries are available to you and the AI may read the journal; otherwise it is greyed out or missing. The AI reads long periods in parts.

### Monthly summary

In the review of a month, **Create monthly summary** creates a normal sub-page of the journal – not a day – and opens it, such as "Monthly summary October 2026". It holds:

- days, words, completed and still open tasks in numbers,
- **Highlights**: tracker averages, places, photos and the completed tasks with a link to their day,
- **Still open**: tasks from this month that are still open today, with a link to the day they are on now,
- **Days**: every day as a link with the beginning of its text.

The page is built from your entries alone, without AI, and can be edited freely afterwards. If the month already has a summary, the review offers **Open monthly summary**; **Create a new one anyway** deliberately adds another one.

## PIN lock

Under **Set up journal → Lock**, a PIN of 6 to 8 digits protects the journal (shorter PINs set earlier keep working): days, search, previews and images stay hidden until the PIN is entered. After 15 minutes or with the lock button it locks itself again. After five wrong attempts there is a five-minute pause, after twenty in one day it is over until the next day – across server restarts too. When another person enters a wrong PIN five times, the person who created the journal gets a notification. Only the person who created the journal and the workspace owners may set or change a PIN. Changing or removing it requires the current PIN – a wrong one counts against the same limits as when unlocking, and after five wrong ones the person who created the journal is notified as well. If the PIN is forgotten, owners can remove it on the lock screen with **Reset PIN**. Like other important steps, they confirm this once more – with their password, a code from the authenticator app or a passkey, or, without any of these, with a sign-in no more than ten minutes ago. The reset is recorded in the activity log and the journal's creator is notified. The lock also covers sub-pages of days, databases below the journal (their records, relations, calendar subscriptions and CalDAV) as well as export, the content archive, comments and duplicating – unlock first for those. It protects against glances but is no encryption: whoever has access to the server's backups sees the content.

A journal with a PIN stays private: setting the PIN revokes every share link and publication of the journal and the pages below it, switches off public forms of its databases and takes the journal out of links and publications of pages above it. The message after locking says how many there were; the security log records it. No new links, publications or public forms can be created for a journal with a PIN – not even while it is unlocked. Sharing or publishing a page above it with its sub-pages leaves the journal out. Forms for members only stay.

## If today's page was deleted

If today's page is in the trash, the journal says so and offers **Create again** (a fresh page for today; with **On the first write** a new draft) or **Restore from trash**.

## Days in lists, search, graph and export

A journal soon has hundreds of days. So that they do not crowd out other pages:

- **Search and @ mentions**: days come after all other hits. The filter **Without journal days** in the quick search leaves them out completely (it stays on for the next search).
- **@heute**, **@gestern** and **@2026-10-27** (also `@today`, `@yesterday`) insert a link to that day of the journal while writing – the journal in the page's space, otherwise the one written in last. Today works as when opening the journal: the page is created or, with **On the first write**, the link goes to the draft. Days without an entry cannot be linked.
- **Graph**: under **Journal days** the graph hides the days, shows **one dot per month** (default) or **each day**.
- **Counting**: the home page, space settings and administration count days separately, such as "120 pages · 340 journal days".
- **Export**: in the Markdown ZIP, the scheduled export and Git, days sort by path in their journal's folder under `2026/10/2026-10-27.md` – see [Import, export and versions](/import-export-versions).

Journals behind a PIN you have not entered appear in none of these – not even in the numbers.

## Tips

- `/todo` or `[]` + space creates tasks that move along. They also appear under **My tasks**, without any @mention.
- Day pages are normal documents: headings, tables, images, mentions – everything works.
- Journals can be shared like any page. Whoever may only read sees the days but does not create any.
- The quick search finds entries across all days; **Without journal days** hides them.

## Workflows: new journal day

The workflow trigger **New journal day** starts a [workflow](/workflows) when a day's page is created – so when the day is first opened or written in (or automatically, if the journal creates days itself), not at midnight. For fixed times there is the **Schedule** trigger. Journals with a PIN are closed to workflows.
