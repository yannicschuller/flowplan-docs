# Journal

A journal is a page with one sub-page per day. In the morning today's page is ready, with yesterday's open tasks already on it.

## Create a journal

**New page → Journal**. The page shows **Today** at the top and the past days below it with relative labels such as "Yesterday". The day pages are named after the date automatically, such as "Saturday, 26 September 2026".

## How a day comes about

- When a new day is opened for the first time, Flowplan creates its page. The day starts at midnight in your time zone.
- **Open tasks** from the last day move over – including nested sub-tasks. A small ↻ at the corner of the checkbox shows that a task was carried over from an earlier day.
- Completed tasks and the rest of the text stay on their day.
- **Empty days disappear**: if a day got nothing of its own besides carried-over tasks, it is removed again on the next day. This way the journal only contains days on which something happened.

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

## In the sidebar

Even after years with thousands of days, the journal stays short in the sidebar. Below the journal you find:

- **Today** – also when today's page has not been created yet; a click opens the day,
- the **last 7 days**,
- **All days …** with the number of all days: opens the journal page at its list or calendar.

Other sub-pages of the journal (such as meeting notes or monthly summaries) follow below as usual.

Under **Set up journal → Sidebar** you choose for each journal which **days appear in the sidebar**:

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

### Monthly summary

In the review of a month, **Create monthly summary** creates a normal sub-page of the journal – not a day – and opens it, such as "Monthly summary October 2026". It holds:

- days, words, completed and still open tasks in numbers,
- **Highlights**: tracker averages, places, photos and the completed tasks with a link to their day,
- **Still open**: tasks from this month that are still open today, with a link to the day they are on now,
- **Days**: every day as a link with the beginning of its text.

The page is built from your entries alone, without AI, and can be edited freely afterwards. If the month already has a summary, the review offers **Open monthly summary**; **Create a new one anyway** deliberately adds another one.

## PIN lock

Under **Set up journal → Lock**, a PIN of 6 to 8 digits protects the journal (shorter PINs set earlier keep working): days, search, previews and images stay hidden until the PIN is entered. After 15 minutes or with the lock button it locks itself again. After five wrong attempts there is a five-minute pause, after twenty in one day it is over until the next day – across server restarts too. When another person enters a wrong PIN five times, the person who created the journal gets a notification. Changing or removing it requires the current PIN. The lock also covers sub-pages of days as well as export, the content archive, comments, share links and duplicating – unlock first for those. It protects against glances but is no encryption: whoever has access to the server's backups sees the content.

## If today's page was deleted

If today's page is in the trash, the journal says so and offers **Create again** (a fresh page for today) or **Restore from trash**.

## Tips

- `/todo` or `[]` + space creates tasks that move along. They also appear under **My tasks**, without any @mention.
- Day pages are normal documents: headings, tables, images, mentions – everything works.
- Journals can be shared like any page. Whoever may only read sees the days but does not create any.
- The quick search finds entries across all days.
