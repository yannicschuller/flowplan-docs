# Journal

A journal is a page with one sub-page per day. In the morning today's page is ready, with yesterday's open tasks already on it.

## Create a journal

**New page → Journal**. The page shows **Today** at the top and the past days below it with relative labels such as "Yesterday". The day pages are named after the date automatically, such as "Saturday, 26 September 2026".

## How a day comes about

- When a new day is opened for the first time, Flowplan creates its page. The day starts at midnight in your time zone.
- **Open tasks** from the last day move over – including nested sub-tasks. A small ↻ at the corner of the checkbox shows that a task was carried over from an earlier day.
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

### Meeting notes

Next to every appointment there is **Create meeting note**. Flowplan creates a page below the journal – with the title and date of the appointment, the **Attendees**, an **Agenda**, **Notes** and **Tasks** – and opens it. Afterwards the appointment shows **Open note**.

- **Attendees**: from the connected Google or Outlook calendar, from the iCal link and from person properties of the record. Whoever is a member of the workspace with that e-mail address is mentioned; others are listed with name and address.
- **Tasks** with @person show up for that person in **My tasks** right away.
- For records of a database the note links the record. A PIN lock of the journal also covers its meeting notes.
- The same outline is available as the template **Meeting note** under **Templates → Meetings**.

## Overview on the journal page

- **Streak**: how many days in a row you have written, plus the longest streak, entries and words.
- **Heatmap**: the last year as squares, the darker the more you wrote. A click opens the day.
- **On this day**: entries from a week, a month, half a year and whole years ago.
- **Last 30 days**: the course of every tracker.
- **List or calendar**: the list shows an excerpt, place, mood and the first photo of each day; the calendar shows a month with photos as backgrounds.

## Review

**Review** sums up a week or a month: days, words, completed and still open tasks, tracker averages, places and photos. **Copy as Markdown** takes the summary along, for example into a weekly report.

## PIN lock

Under **Set up journal → Lock**, a PIN of 6 to 8 digits protects the journal (shorter PINs set earlier keep working): days, search, previews and images stay hidden until the PIN is entered. After 15 minutes or with the lock button it locks itself again. After five wrong attempts there is a five-minute pause, after twenty in one day it is over until the next day – across server restarts too. When another person enters a wrong PIN five times, the person who created the journal gets a notification. Changing or removing it requires the current PIN. The lock also covers sub-pages of days as well as export, the content archive, comments, share links and duplicating – unlock first for those. It protects against glances but is no encryption: whoever has access to the server's backups sees the content.

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
