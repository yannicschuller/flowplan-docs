---
keywords: capture, siri, shortcuts, share sheet, scan, spotlight, ipad, handoff, apple calendar
---

# Capturing, sharing and scanning in the apps

Capture notes, tasks and voice notes quickly, share from other apps, scan documents – and what the apps on iPhone and iPad can do on top.

## Capture, Siri, Control Center

Every way leads to the app's capture screen: type a note or task, record a voice memo (keeps recording with the screen locked; transcribed when your instance can) or take/choose a photo.

| Way | What it offers |
| --- | --- |
| **Quick capture widget** | Note, task, voice memo, photo – into the place chosen in the widget |
| **Siri and Shortcuts** (English, German, French) | "Add a note to Flowplan" (into your capture inbox), "Add a task to Flowplan", "What's on today in Flowplan", "What's due today in Flowplan", "Open a page in Flowplan", "Search Flowplan", "Start the timer in Flowplan", "Stop the timer in Flowplan", "Record a voice memo in Flowplan", "Start focus in Flowplan" |
| **Control Center and the Action button** (iOS 18) | New note, Quick capture, Today's tasks (shows how many are due), Voice memo, Start focus, Timer (a switch) |
| **Long-press the app icon** (iPhone, iPad) | Inbox, My tasks, Search, New note, Switch profile. The iPhone shows the first four of them, *Switch profile* when signed out. |
| **Long-press the app icon** (Android) | *New note* and *Quick capture* (always there, even before the first sign-in), then the **pages you opened last**, Inbox, My tasks, Search, Voice memo and Switch profile. Most launchers show four of them; every shortcut can be dragged to the home screen. Shortcuts to pages of another profile are greyed out until that profile is active again. |
| **Android Quick Settings** | "New note" and "Quick capture" tiles (also from the lock screen). From Android 13, **App settings → Widgets → Add “Quick capture” to Quick Settings** adds the tile with one tap; otherwise use the pencil of Quick Settings. |

**Quick capture** (tile and shortcut on Android) opens a compact window: choose where it goes – the **inbox** (your default capture database, see [Capture into a database](/offline-and-apps#capture-into-a-database)) or another page or database, with search –, type title and text, take or choose photos if you like, **Save**.

What Siri does without opening the app:

- **Add a task:** Siri asks for the task; in the Shortcuts app you can also set a **due date** and the **list or database** it goes to (otherwise your capture default). In a database the due date goes into its first date property.
- **What's due today:** Siri reads out how many tasks are due today and overdue and the first three, and shows the list.
- **Search Flowplan:** searches pages, records and comments in all your workspaces and shows the best hits; in a shortcut, the hits can be passed on (e.g. to *Open a page*). The action *Search in the app* opens Flowplan's own search with the text instead.
- **Open a page:** Siri asks which page – say part of its title – and opens it in the app. In Shortcuts you pick the page from a list.

Siri, Shortcuts and the controls use the **active** profile. Pages of end-to-end encrypted spaces do not appear (not even their titles). Adding tasks, what's due, opening pages, searching, the new controls and focus filters need a Flowplan server 0.7.0 or newer.

## Share from other apps

In any app that can share (browser, Photos or gallery, Files, mail, scanner …), **Share → Flowplan** (iPhone, iPad) or **Share → Save to Flowplan** (Android) opens a small window with title, text, link and files.

- **What works:** text, links, photos and PDFs – several files at once too (at most 10). Other file types are not taken.
- **Where to:** the **inbox**, your default capture database, is preselected (set it in the browser with **Use as default for capturing**, see [Capture into a database](/offline-and-apps#capture-into-a-database)). **Save to** (iPhone, iPad) or **Change** (Android) lists every page and database you may write to, with search.
- **What you get:** in a database (the inbox included) a **record** – the link in the first URL property (if there is one), the files in the first files property and in the record itself. On a page a **sub page** with text, link, photos and PDFs.

**On iPhone and iPad** you stay in the app you share from. Flowplan remembers the last choice of where to save per profile. The sheet uses the sign-in of the app: open Flowplan once and sign in, otherwise it asks you to. Photos in HEIC become JPEG.

**On Android** the window lists under *Not taken* what it cannot take (other file types, more than 10 files). PDFs get a preview of their first page in the record. You can change the title; left empty it is the first line of the text, the link's address or the first file name. After **Save**, **Back to the app** returns to the app you shared from; **Open** shows the result in Flowplan. Not signed in yet? Text and links then go to the instance's preview as in the browser and continue after signing in.

The share sheet on iPhone and iPad as well as photos and PDFs on Android need a Flowplan server 0.7.0 or newer. Up to 0.6.0, Android takes only text and links, through the instance's preview.

## Scan documents and Spotlight (iPhone and iPad)

**Scan documents.** In a page, type `/` and choose **Scan document** (only in the iPhone and iPad app). The camera finds the edges and straightens each page; take as many pages as you like. Flowplan recognises the text on the device (German, English, French) and adds one PDF at the end of the page – or of the record you are in. The PDF carries the text invisibly, so you can select and search it in any PDF viewer, and **Flowplan's search finds the scan by its text** right away. The link `flowplan://scan` (e.g. in a shortcut) opens the scanner with the choice of inbox, page or database. The PDF does not stay on the phone after saving.

**Spotlight.** The app puts the titles of your most recently changed pages (up to 500, with where they are and a line of their content) and your open tasks – including database records assigned to you, those with a due date first – into the phone's search. A tap on a result opens it in Flowplan. Nothing of end-to-end encrypted spaces, pages behind a journal PIN or journal days goes there; signing out or switching profiles empties it. The index stays on the phone.

The scanner and Spotlight need a Flowplan server 0.7.0 or newer.

## Voice notes in pages

In the app, **Voice note** (`/voice`) in a document records with the phone's microphone – up to 30 minutes, also with the screen locked. **Insert** puts the recording into the page as audio:

- **Insert as text** (iPhone and iPad): the spoken words become text on the device with Apple's speech recognition – the recording does not leave the phone for it. The text follows below the audio as a **Transcript** with timestamps. The app asks once for permission to use speech recognition. It works for the languages the device can recognise by itself (set by the device's language; most major languages, depending on the iOS version).
- Where the device cannot (Android, other languages), your instance's speech recognition turns it into text if it is set up ([Voice notes](/media-and-files#voice-notes-and-meetings)); otherwise the audio stays on its own.
- **Then summarise with AI** puts a summary below the text when the [AI](/ai-writing#summaries) is available to you.

This needs a Flowplan server 0.7.0 or newer. In the browser, `/voice` records as before.

## On-device AI and Writing Tools (iPhone and iPad)

**Optional:** on an iPhone or iPad with **iOS/iPadOS 26** or later that supports Apple Intelligence, with **Apple Intelligence switched on** (Settings → Apple Intelligence & Siri), the writing assistant and the summary of open pages run with Apple's language model **on the device**. The text does not leave the device, also in encrypted spaces; the instance needs no AI provider for it. Results carry the label **On this device**. This needs a Flowplan server newer than 0.7.0 (currently the beta image).

- **Switch it off:** **Settings → AI → On this device (Apple) → Off** – Flowplan then never asks the device. It also shows whether Apple Intelligence on this device is available, turned off in Settings or not supported. Administrators can switch it off for the whole instance.
- **Server AI stays:** questions to the workspace, AI in databases and AI actions keep running through the instance when it is set up; it also takes over texts that are too long.
- **Older devices and iOS versions** (from iOS 16.4) use the app as before, just without this path.
- **Writing Tools:** Apple's Writing Tools (proofread, rewrite, summarise) work right in the editor – select text and choose **Writing Tools** in the text menu (from iOS 18 with Apple Intelligence).

More: [on-device AI](/ai#on-device-ai-apple).

## Calendars in Apple Calendar

**Settings → Calendars & issues → Calendars on iPhone, iPad and Mac**: choose calendar views and tap **Set up in Apple Calendar**. The app opens a configuration profile in Safari; confirm the download, then install it under **Settings → Profile Downloaded** (on the Mac: System Settings → Profiles). Each view becomes a CalDAV account in Apple Calendar, in both directions – see [Sync both ways](/views#sync-both-ways-caldav). On a computer the page shows a QR code instead; scan it with the iPhone's camera. The link works once and for ten minutes.

## iPad: windows, keyboard and Handoff

- **Several windows:** in a page's menu (right-click or long-press it in the sidebar), **Open in new window** gives the page a window of its own – side by side in Split View, in Slide Over or in Stage Manager. On iPhone Duo this works on the open display; on the closed one the menu item is not there. Links that would open a new tab do the same. Long-press the app icon → **Show All Windows** lists them. The first window holds the app settings, notifications and widgets; the others show a page and come back with it after a restart. All windows use the active profile and the app lock.
- **Hardware keyboard:** hold <kbd>⌘</kbd> and the iPad lists Flowplan's shortcuts – search <kbd>⌘</kbd> <kbd>K</kbd>, new page <kbd>⌘</kbd> <kbd>N</kbd>, quick capture <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, the overview <kbd>⌘</kbd> <kbd>/</kbd> and the others with <kbd>⌘</kbd>, <kbd>⌃</kbd> or <kbd>⌥</kbd>, including [your own](/keyboard-shortcuts#your-own-shortcuts). A shortcut works in the window in front. The editor's shortcuts (bold, undo …) work as in the browser.
- **Trackpad and mouse:** the pointer hovers over buttons and links as in Safari.
- **Handoff:** the page in front is offered to your Mac and your other devices (same Apple Account, Handoff on under Settings → General → AirPlay & Continuity). On the Mac it opens in the [desktop app](/desktop-app), without it in the browser. Pages from the Mac or another device open in the app on the profile of their instance; pages of an instance without a profile open in Safari. Pages behind the app lock are not offered while it is locked.
