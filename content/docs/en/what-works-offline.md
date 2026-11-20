---
keywords: offline, no connection, no internet, airplane mode, journal offline, new page offline, upload offline, not yet synced, picture offline, template offline
---

# What works offline

What you can edit and create without a connection – and what has to wait for one.

## Without a connection {since=0.10.0}

Offline you keep working with what the device has – in the browser with [offline use](/offline-and-apps#turn-on-offline-use) turned on, in the desktop app and in the apps for iPhone, iPad and Android:

- **Pages and records** in the offline copy open; you edit text in documents and the properties of records.
- **New records** in a database – **New row** in the table, a new card on the board – appear at once and are created once the connection is back (see [Database records offline](/offline-and-apps#database-records-offline)). [Quick capture](/offline-and-apps#capture-into-a-database) waits on the device as well.
- {since=0.11.0} **New pages:** documents (sub-pages too), databases, whiteboards and notebooks you create offline through **New page** as usual – see [Creating offline](#creating-offline).
- {since=0.11.0} **Pictures and files** in documents – new and existing pages – up to 25 MB per file wait on the device and are uploaded as soon as the connection is back.
- **Today's journal entry:** **Today** in the sidebar, the **+** next to a journal, **Today** on the journal page and the day picker open the day – its stored page when the offline copy has it, otherwise an entry on this device. The top bar then says "Offline draft – created once the connection is back". What you write there stays on the device, also when you close the app. As soon as the connection is back, Flowplan creates the day as usual – with its template and carried-over tasks – and adds your text to it; the day's page opens in its place. See also [Journal](/journal).
- {since=0.10.0} **Flashcards:** decks you studied in the last 14 days you keep studying offline; the ratings wait on the device ("2 ratings are waiting for the connection") and go to the server with the connection ([Studying offline](/flashcards-app#studying-offline)).

## Creating offline {since=0.11.0}

**New page** opens without a connection too. A **document**, a **database**, a **whiteboard** or a **notebook** is then made on this device:

- The new page opens at once and is in the sidebar – with a small cloud and, at the top, the note **Not yet synced**. You write, add records to the new database, draw on the whiteboard or in the notebook, rename the page and add sub-pages below it. Everything stays on the device, also when you close the app.
- **From a template:** the built-in templates – say, Meeting notes or Project plan – work offline; their content comes with the app. Saved templates, surveys and the marketplace need the connection; offline they are greyed out in the gallery.
- **Pictures, files and PDFs** you add as usual (paste, drag in, through the menu). A picture shows its copy on the device at once. Up to 25 MB per file and 200 MB in all wait on the device; bigger files need the connection.
- **As soon as the connection is back**, Flowplan creates everything on the server in order: first the page, then its pictures and files, then its content, its records and sub-pages. The cloud goes away, and the page is there for everyone with access. A document gets its pictures only once they are uploaded – others never see a picture the server does not have yet.

The server checks permissions when it creates them. If it refuses a page – the space was deleted meanwhile, you may no longer create pages there –, everything made in it fails along: records, sub-pages, pictures. The page then carries a red warning sign and the reason at the top. Its content stays on the device: **Try again**, **Copy text** or **Discard**. A picture that could not be uploaded you can keep with **Save file**.

> [!NOTE]
> Journals, dashboards and workflows, pages in [encrypted spaces](/encrypted-spaces), databases with AI and notebooks from a PDF need the server – offline, **New page** says so when you create them.

## Only with a connection {since=0.10.0}

Some things need the server. Offline Flowplan then says **Needs a connection – you're offline right now.** instead of doing nothing:

- {since=0.11.0} new journals, dashboards and workflows, pages in encrypted spaces, new spaces and collections
- saved templates and duplicating a page
- {since=0.11.0} uploading files over 25 MB, covers and page icons, pictures on whiteboards and in notebooks, PDFs into notebooks
- imports (export ZIP, Notion, BookStack, Jira, Trello and others)
- answers through a database's form
- changes to a database's schema (properties and views)
- {since=0.10.0} creating flashcards with AI, the Anki import and exporting cards (CSV, Anki package)
