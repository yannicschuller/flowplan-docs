# Offline, web app and desktop

Flowplan runs in the browser, can be installed as an app and keeps working without a connection.

## Work without a connection

Flowplan always saves documents locally in the browser first (IndexedDB) and syncs them with the server as soon as it can be reached. If the connection drops, you simply keep writing; other people's changes are merged when you reconnect.

### Turn on offline use

Under **Settings → Offline & devices**, the device also stores the app, the workspace, all readable pages and the records and files you open later. Then you can open pages, read documents and databases and edit text even without a connection.

- Online, the current state always comes from the server; the copy only serves without a connection.
- If the sign-in has expired, Flowplan shows the sign-in page online – without a connection, the stored copy still opens.
- The copies contain private content. They are removed when you sign out, when you turn the feature off and when another person signs in.

#### The whole app on the device

The copy holds the whole app – not only the parts you already opened online. The editor, calendar, timeline and gallery views, dashboards, charts, whiteboards, notebooks, math, Mermaid diagrams and the PDF viewer then load without a connection as well.

- **Storage:** about 18 MB on the device (around 5 MB to download), once per version. Flowplan only stores the app's files when the device has enough space.
- **New version:** after an update, Flowplan loads the new version's files with the next refresh; files that did not change are taken over instead of downloaded again. As soon as the new version is stored completely, the old one is removed.
- **Settings → Offline & devices** shows a line like “The app is stored for offline use (version 0.7.0) · 18 MB” – or how many files are still missing.
- If a part is missing without a connection after all, Flowplan shows “Not available offline – try again when you're online” with **Try again** in its place; the rest of the app keeps working, and the part loads by itself once the connection is back. A record whose content is not in the copy shows “This record is not available offline.”

#### The copy stays current

While Flowplan is open, it keeps the copy up to date on its own: at start, when the connection comes back, when you bring the app back to the foreground, and every 6 hours. It only loads what changed since the last update – usually two small requests.

- **New pages** are added; **changed** pages, records and documents are loaded again.
- **Deleted pages** and pages you may no longer read (including a journal behind a PIN) leave the copy together with their records and files.
- When an update takes a moment, **Updating offline copy …** shows briefly in the bottom left corner.
- When the sign-in has expired, Flowplan does not update – the existing copy stays as it is.

**Settings → Offline & devices** shows the state, for example “Offline copy updated 2 h ago · 312 pages · 85 MB”. **Update now** loads every page again.

**Also store record contents and files** also stores the documents of all database records and the files of the pages, even ones you have never opened – at most 200 MB and only while the device has enough space. Without it, only records and files you opened once are kept. Turning it off removes the records and files stored in addition.

Without a connection, Flowplan shows the date of the copy below the offline notice when it is older than 7 days (“Offline copy from Oct 12”).

> [!NOTE]
> Installed as an app (Chrome, Edge, Android), Flowplan also updates the copy in the background while the app is closed, when the browser allows it (Periodic Background Sync). The browser decides whether and how often – usually only for apps used often. Records and files never opened are loaded only by the open app.

### Database records offline

Changes to records without a connection appear in the views right away and are collected on the device. As soon as the connection is back, they go to the server one after another. If someone changed the same record in the meantime, Flowplan merges the changes field by field; if the same field was changed on both sides or the record was deleted, you decide in the conflict dialog.

> [!NOTE]
> A database's schema – properties and views – can only be changed with a connection.

### Offline in the app for iPhone and iPad

The app for iPhone and iPad keeps the offline copy itself – for every instance, self-hosted ones included. (iOS gives apps no service worker for addresses of your choice; in Safari and in the Android app, Flowplan works offline as in the browser.)

- **Turn it on** as everywhere under **Settings → Offline & devices** – per profile of the app. It also says “Stored in the Flowplan app”; state, size, version, **Update now**, **Also store record contents and files** and **Remove offline copies** work as in the browser.
- **Without a connection** – at start or when the instance cannot be reached – the app opens the stored copy: the same page you were on, with the notice “Offline – you see the last saved state”. Pages, databases, records, calendars, dashboards and the editor run from the copy. The app shows its “No connection” screen only when there is no copy for the profile.
- **Changes offline:** text in documents and changes to records are collected on the device as in the browser and synced as soon as the instance answers again. Then the app switches to the current page by itself – once you are not typing.
- **Kept current:** as in the browser while the app is open, and also every time it comes to the foreground; only what changed is loaded.
- **Where it is stored:** in the app's container, encrypted until the first unlock after a restart and not in backups. The copy belongs to the profile: **Sign out** in Flowplan and **Sign out and remove the profile** in the app's settings delete it; another profile never sees it.
- **Limits:** files over 25 MB, the PDF viewer and text recognition (OCR) need a connection in the app; at most 2 GB per profile, and the app always leaves 300 MB free. The copy needs a Flowplan server with this offline support (0.7.0 or newer); with older servers the app shows its “No connection” screen without a connection, as before.

## Install as an app

- **Chrome, Edge**: the install icon in the address bar.
- **Safari on the Mac**: **File → Add to Dock**.
- **iPhone, iPad**: Share → **Add to Home Screen**. Only this way are push notifications possible there.
- **Android**: menu → **Install app**.

The installed app opens in its own window without browser bars.

### Share to Flowplan

When Flowplan is installed as an app on Android (Chrome), it appears in the **Share** menu of other apps. Shared text and links land in a preview; **Save as page** creates a page from it in the chosen space. Without being signed in, you first go to the sign-in and then back to the preview. iOS does not offer this menu to web apps.

The preview asks whether to save **as a page**, **as a record** in a database or – for links – **as a bookmark**. As a record, title, text and link (or the article text) go into the record; the link lands in the database's first URL property, otherwise in the text, and the database's default record template applies. If there is a default capture database (see below), **as a record** is preselected with it. **Include article text** loads the web page on the server and keeps its main text without navigation, ads and scripts (public addresses only).

### Web clipper in the browser

Under **Settings → Web clipper** you find the button **Save to Flowplan**. Dragged into the bookmarks bar, it opens a small window on any web page with the title, address and selected text – the same preview as when sharing. After saving, the window closes.

### Capture into a database

For an inbox, e.g. with PARA: **Quick capture** on the start page, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, `> capture` in the quick search or – with the installed app – a long press on the app icon → its capture shortcut open a small window with title and text. It is saved as a record in the chosen database; without a connection it waits on the device and is created once the connection is back.

**Use as default for capturing** (in the window) or **Settings → Web clipper → Capture** sets the database that share, the web clipper and quick capture preselect – per person and workspace. The database's default record template applies, so new records land e.g. straight in the "Inbox" view.

### Bookmarks

Bookmarks land in the **Bookmarks** database of the chosen space; it is created the first time, with link, website, folder, note, date and "read" as well as the views All, Cards and Unread. The article text that was taken along is in the record. **Choose bookmarks file** imports the HTML file that Chrome, Edge, Firefox and Safari create when exporting bookmarks – including folders and dates; links that already exist are skipped.

## Desktop app for macOS, Windows and Linux

A slim desktop app wraps your Flowplan instance. On first start it asks for the address and suggests `https://app.flowplan.org` – for your own instance enter its address instead (e.g. `https://flowplan.example.com`). More instances are added as [profiles](#several-instances-profiles).

- All data stays on the server.
- The app remembers the window size and position and opens external links in the default browser. Right-click menu with spelling suggestions, [quick capture from anywhere](/desktop-capture), an icon in the menu bar or notification area, pages in windows of their own and more: see [More from the desktop app](#more-from-the-desktop-app).
- Offline use works in the desktop app too: turn on **Settings → Offline & devices** in the app – it keeps its own offline copies, separate from the browser or the installed web app. Without a connection it then opens the stored copy; its own offline page (**Try again**, **Profiles**) only appears when there is no copy on the device.
- **Notifications:** the app shows new inbox notifications as system notifications and the unread count on the app icon – also with the window minimised or hidden. See [Notifications in the desktop app](#notifications-in-the-desktop-app).
- It only accepts real Flowplan instances – an address running something else or redirecting to another site is refused.
- **Handoff (Mac):** the page open in the window appears on your iPad and iPhone (same Apple Account, Handoff on) and opens there in the Flowplan app – or in the browser without the app. A page open in the iPad or iPhone app appears in the Mac's Dock and opens in the desktop app, in the profile of its instance. See [iPad: windows, keyboard and Handoff](#ipad-windows-keyboard-and-handoff).
- **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser, where passkeys (iCloud Keychain, Windows Hello, password managers) are available. After **Sign in to the app** the app takes over the sign-in; e-mail and password work directly in the app. This needs Flowplan 0.3.3 or newer. If your password manager doesn't fill in anything in the app, **Sign in in the browser** below the password field signs you in through the browser as well (Flowplan 0.8.8 or newer).

The apps for macOS, Windows and Linux are at [flowplan.org/download](https://flowplan.org/download) – the page detects your system. Updates install themselves (macOS, Windows installer, Linux AppImage). The Mac app is signed and notarized; with 1.0.5 or older, download the current version once – after that it updates itself. Windows shows SmartScreen. More under [Operations and troubleshooting](/operations#desktop-apps).

> [!NOTE]
> The environment variable `FLOWPLAN_UPDATE_URL` exists twice: on the computer running the desktop app it names another source for app updates (see [Updates](/operations#updates)); on the server, the variable of the same name points the instance's release check at a mirror (see [Configuration](/configuration#operations)). They mean different things and belong in different places.

### Several instances (profiles)

If you work with more than one Flowplan instance, say **Work – flowplan.company.com** and **Private – notes.example**, the desktop app keeps each one as a profile:

- **Add:** menu **Profiles → Add Profile…**, enter the address and, if you like, a name (without one the app shows the address). The address is checked as on first start.
- **Switch:** in the **Profiles** menu (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu), with **Next Profile** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>P</kbd> or <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>), from the Dock icon on the Mac and from the taskbar jump list on Windows.
- **Rename and remove:** **Profiles → Manage Profiles…** (also reachable from the offline page). Removing asks first, signs the profile out and deletes what it stored on this computer. Your data stays on the server.

Every profile has its own sign-in, its own offline copy and its own cookies – also two profiles on the same instance, for example for two accounts. Only the active profile's instance opens in the window; links to another instance go to the browser. With more than one profile, the window title names the active one.

If you had set up an address before, it becomes the first profile after the update – still signed in and with its offline copy.

### Notifications in the desktop app

Browsers receive notifications through Web Push, which the desktop app does not have. It therefore asks your instance itself, about once a minute while it runs:

- **What appears:** each new unread notification once, with the inbox line as title and the record below it (with several profiles also the profile name). Your **notification kinds** under **Settings → Notifications** apply: only kinds with **push** switched on pop up. More than three at once become one notification that opens the inbox.
- **Click:** brings the window to the front, switches to the right profile if needed and opens the page.
- **Count on the icon:** the unread notifications – on the Dock (macOS), in the launcher (Linux, where the desktop shows counts) and as a red dot on the taskbar button (Windows).
- **Settings:** in the **Notifications** menu (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu): **Show Notifications**, **Do Not Disturb** for an hour or until tomorrow morning, and **All Profiles** (otherwise only the active profile). In the app, **Settings → Notifications** shows the same switch instead of Web Push.

Nothing pops up for the window in front – its inbox is in view anyway. What was there at the first start is not shown again, not even after a restart.

On a Mac the app keeps running in the Dock after closing the window and keeps notifying. On Windows and Linux closing the window quits the app; notifications arrive while it runs (minimised is enough) – or, with the [notification area icon](#more-from-the-desktop-app), also without a window.

This needs a Flowplan server 0.7.0 or newer and desktop app 1.0.7 or newer. The app only asks the profile's own instance, with its sign-in; nothing is stored on the server for it.

### More from the desktop app

From desktop app 1.1.0 there is more around the window. Its switches are under **Settings…** (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu).

- **Right-click and spelling:** a right click in fields, on links and images shows a system menu – suggestions for a misspelled word, **Add to Dictionary**, cut, copy, paste, **Paste as Plain Text**, open a link in the browser or in a new window, copy or save an image, **Look Up** on a Mac. In the editor Flowplan's own text menu stays; the app's suggestions appear at its top (needs a Flowplan server 0.7.0 or newer). Choose the spell checker's languages – German, English, French – under **Spelling** in the right-click menu, in the *Edit* menu or in the settings.
- **Quick capture from anywhere:** <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Space</kbd> (Mac: <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Space</kbd>) opens a small window above every app – into the inbox, a database, today's journal entry or a page, with shorthand like `tomorrow 3pm #client @anna !high`, links from the clipboard, files, screen regions and voice notes, **Undo** and **Recently captured**, quick actions with shortcuts of their own and an optional AI suggestion. Offline, the capture waits encrypted in a queue and is sent later without arriving twice. Everything about it: [Quick capture (desktop)](/desktop-capture).
- **Icon in the menu bar (Mac) or notification area (Windows, Linux):** **Quick Capture**, the tasks due today or overdue from **My tasks**, the unread notifications, open Flowplan, the profiles and quit. On by default on a Mac, switched on in the settings on Windows and Linux; the app then keeps running in the notification area after its window is closed.
- **Open pages from links:** links like `flowplan://open?instance=…&page=…` open the page in the app, in the profile of its instance. In a browser on a computer, a page's actions (**…** at the top right) offer **Open in desktop app**. For an instance without a profile the app asks first whether to add it.
- **Pages in windows of their own:** **Open Page in New Window** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>N</kbd> or <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>N</kbd>), a <kbd>Shift</kbd>- or middle-click on a link, or **Open in new window** in a page's menu. The app remembers these windows with their size and place and opens them again on the next start.
- **Drop files:** drop PDFs, images, Markdown and text files on the Dock icon, open them with **Open With → Flowplan**, or drop them on the window where Flowplan does not take them itself. The app asks where to: **Into the Inbox** (one record per file) or **As New Pages** (Markdown becomes a real page). Images and PDFs up to 50 MB, text up to 5 MB, at most 10 files at once.
- **Open at login:** in the settings, optionally **Start without a window**.
- **Print and PDF:** **Print…** shows a preview and prints through the system's dialog, **Save as PDF…** saves the page as a PDF – both without sidebar and tools, as when printing from the browser.
- **Updates without interruptions:** a new update downloads in the background; a small notice at the bottom of the window shows progress, size and speed, and the progress also shows on the app icon. Once it is ready the notice (and the menu) offer **Restart**; otherwise it installs when you quit. No dialog interrupts your typing.

## Apps for iPhone, iPad and Android

> [!NOTE]
> **The iPhone and iPad app is on the App Store:** [Flowplan on the App Store](https://apps.apple.com/app/id6825801344) – open the link on the iPhone or iPad and download the app, or search the App Store for “Flowplan”. New versions arrive through the App Store as with any other app.
>
> **The Android app comes straight from us, without the Play Store:** [flowplan.org/download/android.apk](https://flowplan.org/download/android.apk) or on [flowplan.org/download](https://flowplan.org/download). See [Installing and updating the Android app](#installing-and-updating-the-android-app).

### Installing and updating the Android app

1. On the Android device, open [flowplan.org/download](https://flowplan.org/download) and tap **Download the app**.
2. Open the downloaded file (the browser's notification or *Downloads*).
3. The first time, Android asks whether the browser may install apps: **Settings** → **Allow from this source**, then go back and tap **Install**.
4. If Google Play Protect warns about an unknown app: **More details** → **Install anyway**. The app is signed with our key, just not distributed through Google Play.

**Updates:** once a day the app checks whether there is a new version and then asks: **Download** fetches it in the browser, opening the file and tapping **Update** installs it over the old one – sign-in, profiles and settings stay. **Later** asks again for that version only after a week. New Flowplan features arrive through the server anyway, no app update needed.

You can also do without the Android app: Flowplan can be installed on Android as a web app as described above.

**Requirements:** iPhone and iPad with iOS/iPadOS 16.4 or later (the share sheet and the configurable widgets from iOS 17), Android 8.0 or later.

Like the desktop app, the mobile apps show your Flowplan instance; all data stays on the server and new features arrive without an app update. On top comes what only an app can do:

- **Notifications:** mentions, comments, tasks and reminders arrive as notifications, the number of unread ones shows on the app icon. The app asks for permission once after the first sign-in; a tap opens the page concerned. Which kinds arrive is set as in the browser under **Settings → Notifications**; there, **Send test notification** checks whether notifications reach all your devices and otherwise says why ([more](/search-and-notifications#test-notification)). [Buttons](#buttons-on-notifications) tick off a task, postpone it to tomorrow, answer a comment or mark it read – without opening the app.
- **[Widgets](#widgets)** for the home screen (on the iPhone also for the lock screen), each with settings of its own – tasks to check off, appointments, counters, time tracking and more; plus [widgets for administrators](#widgets-for-administrators).
- **[Live Activities](#live-activities-and-ongoing-notifications):** the timer, focus, the meeting, imports/exports and voice memos on the lock screen and in the Dynamic Island, or as an ongoing notification.
- **[Capture, Siri, Control Center](#capture-siri-control-center):** notes, tasks, voice memos and photos from widgets, Siri, Control Center, the app icon and Android tiles; ask Siri what is due, open a page or search.
- **[Focus filters](#focus-filters)** (iPhone, iPad): one profile or workspace per Focus, optionally without notifications from the others.
- **[Share from other apps](#share-from-other-apps):** text, links, photos and PDFs from any app straight into the inbox, a database or onto a page.
- **[Scanner and Spotlight](#scan-documents-and-spotlight-iphone-and-ipad)** (iPhone, iPad): documents scanned into searchable PDFs, your pages and tasks in the phone's search.
- **[Voice notes](#voice-notes-in-pages)** in pages are recorded by the app; on the iPhone and iPad they become text on the device itself.
- **[On-device AI](#on-device-ai-and-writing-tools-iphone-and-ipad)** (iPhone, iPad, optional): writing assistant and summaries with Apple Intelligence without the text leaving the device; Apple's Writing Tools in the editor.
- **[Calendars in Apple Calendar](#calendars-in-apple-calendar)** with one configuration profile instead of typing CalDAV credentials.
- **App lock:** if you like, Flowplan only unlocks with Face ID, Touch ID, a fingerprint or the device code.
- **Back:** swiping from the left edge (iOS) or the back gesture or button (Android) first closes what is open (menu, dialog, sidebar) and then goes up a level: from a settings section to the overview, from a record to its database, from a page to the previous page.
- **Exports and downloads** go to the system's share menu (e.g. "Save to Files").
- **Without a connection:** the app opens the profile's offline copy, on iPhone and iPad too – see [Offline in the app for iPhone and iPad](#offline-in-the-app-for-iphone-and-ipad).
- **iPad and tablets:** every orientation, Split View, Slide Over and Stage Manager, several windows, a hardware keyboard with the shortcuts listed when you hold <kbd>⌘</kbd>, the trackpad, and Handoff to the Mac – see [iPad: windows, keyboard and Handoff](#ipad-windows-keyboard-and-handoff). With the **Apple Pencil** you write in [notebooks](/notebooks) and drawing blocks, draw on whiteboards and write on PDFs (see [Annotate PDFs](/documents#annotate-pdfs)) with pressure while fingers move the board and a resting hand leaves no marks; double-tap and squeeze switch the tool, Scribble writes into any text field (see [Whiteboards](/whiteboards#pen-and-shape-recognition)). The app recognises your handwriting on the device: search finds it, and **Convert to text** turns selected strokes into text (see [Recognising handwriting](/notebooks#recognising-handwriting-iphone-and-ipad)).
- **iPhone Duo:** open or close it while you work – the page stays as it is (no reload, the same place, the text you are typing) and lays itself out anew: the phone layout with the bottom bar on the closed display and on the open one held upright, the sidebar on the open display held sideways. Content stays clear of the status bar and camera at the side of the closed display. On the open display you can use **several windows** as on the iPad (see [below](#ipad-windows-keyboard-and-handoff)); the closed display has one. Full screen on iPhone Duo needs an app built for iOS 27.1 or later.

Also:

- On first start they ask for the address and suggest `https://app.flowplan.org`. They only accept real Flowplan instances that do not redirect to another site. More instances are saved as [profiles](#profiles-in-the-mobile-apps). **Sign out and remove the profile** in the **app settings** (via **Settings → Notifications → Open app settings**) signs the app out of the active profile's instance and removes it there.
- **Managed devices (MDM/EMM):** through managed app configuration (iOS Managed App Configuration or Android app restrictions), the key `server` presets the address of your own instance; the app suggests it on first start.
- **Sign in with a passkey** and **Sign in with SSO** open the system's sign-in sheet (iOS) or a browser tab (Android); after **Sign in to the app** the app takes over the sign-in. E-mail and password work directly in the app.
- **Password manager not filling in?** Tap **Sign in in the browser** below the password field (or at the two-factor code). The sign-in opens in the same sheet as for passkeys and SSO; there your password manager recognises your instance's address and fills in the password and code. Inside the app itself, iOS only matches saved passwords to addresses built into the app – which isn't possible for self-hosted instances. This needs Flowplan 0.8.8 or newer; the app doesn't need an update.
- Signing in through the browser as well as notifications and widgets (the app interface) need Flowplan 0.4.0 or newer.
- Links to other sites open in the browser; without a connection the app shows a page of its own and reconnects by itself.
- Flowplan appears in other apps' **Share** menu – as **Flowplan** on iPhone and iPad, as **Save to Flowplan** on Android, see [Share from other apps](#share-from-other-apps).

### Buttons on notifications

Long-press a notification (or pull it down) for its buttons. They do their work in the background; the app does not open.

| Notification | Buttons |
| --- | --- |
| **A task is due** (a task assigned to you is due today, a [date reminder](/databases#date-reminders) of a record) | **Done** ticks it off; **Tomorrow** moves its date to tomorrow – the time of day stays, a date further ahead moves one day on |
| **Comment, reply, mention in a comment** | **Reply** – type the answer right in the notification; it goes into the thread (or comments on the page) under your name. **Mark as read** |
| **Everything else** | **Mark as read** |

- Each button also marks the notification as read; the number on the app icon follows.
- **Done**, **Tomorrow** and **Reply** need the phone unlocked; **Mark as read** works on the lock screen.
- **Done** on a record uses the database's “done” state (a status option such as *Done*, or a checkbox *Done*); databases without one only offer **Mark as read**. If the task changed meanwhile, nothing is ticked off – a notification says so, and a tap opens the page.
- Your rights apply as in the browser, and the change shows in the activity, versions and automations like any other.
- **Done**, **Tomorrow** and **Reply** only appear when the notification brings its text along – without it, nobody could tell which task a button acts on. Through the [push relay](/configuration#push-relay-and-end-to-end-encryption) that is the default, because the text is end-to-end encrypted (operators can turn it off with `MOBILE_PUSH_CONTENT=off`); older app versions through Expo only get it with `MOBILE_PUSH_CONTENT=on`. Otherwise there is **Mark as read** only.

**Reminders without push:** if your instance does not send push notifications to the app (switched off by the operators, or a test build without push), the app reminds you of your tasks itself – at 09:00 on the day a task is due, as long as notifications are allowed for Flowplan. It uses the tasks the app knows from its summary (the next eight).

### Widgets

Each widget shows **one thing** and has **settings of its own**. A widget you just added works right away with sensible defaults; small sizes show less. A tap opens the task or page in the app.

- **Change the settings:** iPhone/iPad (iOS 17 or later): long-press the widget → *Edit Widget*. Android: long-press the widget → *Settings* (you can skip this step when adding it).
- The lists to choose from (databases, views, properties, calendars, forms …) come straight from your Flowplan instance.

| Widget | What it shows | Settings |
| --- | --- | --- |
| **Quick capture** | Buttons for note, task, voice memo, photo | Where to save (default: your capture inbox), which buttons |
| **Tasks** | Open tasks – **check them off right in the widget** | My tasks, records of a database (with view) or to-dos of a page; all open, due today or overdue; number |
| **Today** | Appointments and tasks due | Calendars, range (today, 3 days, week), tasks due on/off |
| **Page and favorites** | Your favorites, or one page / database view | Page, view, up to two properties |
| **Database counter** | One number (count, sum, average) with its last 14 days | Database, view, value, group, history |
| **Journal and habits** | Whether today is written, your streak; habits **to check off** | Journal, habit database |
| **Time this week** | Hours this week and today; **start/stop the timer** | Which timer "Start" starts |
| **Mentions** | Who mentioned you or gave you a task; **mark as read** | Mentions and/or new tasks, unread only |
| **Form responses** | New responses to a form | Form |
| **Flowplan** | Tasks due at a glance | With or without the inbox, running timer on/off |
| **Flowplan Inbox** | Number of unread notifications | – |
| **Flowplan Instance, Live, Storage** | [Administrators](#widgets-for-administrators) only: state, one live number, storage | What to show or which metric |

Good to know:

- **Counter history:** Flowplan keeps the value of every day. Days before the widget was set up are estimated and drawn lighter and dashed.
- **Privacy:** widgets only show what you may see in Flowplan. Pages behind a journal PIN or end-to-end encrypted only show their state in a widget, never content.
- **Signed out?** When your session ends (e.g. a short SSO session), every widget shows *Open Flowplan to sign in*. Its settings stay; after signing in, the widgets fill again at once.
- **Profiles:** widgets belong to the active profile. Switching removes what the previous profile showed; on Android every widget keeps its settings per profile.
- **Colours on Android:** from Android 12 all widgets take the system colours (Material You, from the wallpaper or the chosen theme), light and dark. Red, amber and green keep their meaning. After a new wallpaper the widgets follow with their next update.
- **Check off today's tasks:** add the **Tasks** widget and choose *Due today* in its settings.
- **Updates:** when you change something in Flowplan, when the app comes to the foreground, and in the background about every 30 minutes (iOS decides how often).
- **Requirements:** the configurable widgets, the Live Activities other than the timer, and Siri and Shortcuts need a Flowplan server 0.7.0 or newer. *Flowplan*, *Flowplan Inbox* and the running timer work from 0.4.0.

### Widgets for administrators

People who administer the instance (members of the admin group, `OIDC_ADMIN_GROUP`, default `flowplan-admins`) get three more widgets in the app for iPhone, iPad and Android. Each shows one thing big; on the iPhone you choose which in the widget's settings.

| Widget | Sizes (iOS) | Setting (default first) | Tapping opens |
| --- | --- | --- | --- |
| **Flowplan Instance** | small, medium, lock screen | *Show:* state (*All fine*, notices or problems with the most important one), last backup, or version with available update | Administration (Monitoring when there are notices or problems) |
| **Flowplan Live** | small, medium, large, lock screen | *Metric:* active now, requests/min, error rate (1 h) or sign-ins today; from medium up the other numbers small and the requests of the last 24 hours as a chart | Administration → Monitoring |
| **Flowplan Storage** | small, medium, lock screen (ring) | *Metric:* disk used, database and files, or fullest workspace (quota) | Administration → Storage |

- Everyone else sees *Administrators only* in these widgets; without a sign-in they say *Open Flowplan to sign in*.
- Like the other widgets they read their data with the app's device token (`GET /api/mobile/admin-summary`). The instance checks on every call that the person of the session the device is bound to is an administrator right now – leaving the admin group, signing out or removing the device under *Signed-in devices* stops it. API tokens never get this data.
- Only numbers and states are sent – no names, e-mail addresses or workspace names.
- With the statistics switched off (`FLOWPLAN_METRICS=off` or in the administration under *Monitoring → Statistics*), *Flowplan Live* says "Statistics switched off"; state and storage stay.
- Older instances without this endpoint show *Administrators only*.

### Live Activities and ongoing notifications

On iPhone what is running appears on the lock screen and in the Dynamic Island, on Android as a notification (a Live Update on Android 16):

| What runs | Shows | Button |
| --- | --- | --- |
| **Timer** | a running clock | – |
| **Focus** | e.g. 25 minutes of focus, then the break | *End* |
| **Meeting now** | the time left | *Open notes* – creates the meeting note in your journal if there is none yet |
| **Imports and exports** | their progress | – |
| **Voice memo** | recording | *Stop recording* |
| **Incident of the instance** | administrators only, only while it lasts | – |

Meetings, imports/exports and incidents can be switched off in the app settings under *Live Activities*; the timer, focus and voice memos always appear while they run.

If you start or stop the timer or focus elsewhere – in the browser, on another device – or focus moves on to the break, the instance updates the Live Activity on the iPhone by push through the [push relay](/configuration#push-relay-and-end-to-end-encryption), even when the app is not open. By default this push holds only times and the phase; the Live Activity already knows the title and link from when it started on the device.

### Capture, Siri, Control Center

Every way leads to the app's capture screen: type a note or task, record a voice memo (keeps recording with the screen locked; transcribed when your instance can) or take/choose a photo.

| Way | What it offers |
| --- | --- |
| **Quick capture widget** | Note, task, voice memo, photo – into the place chosen in the widget |
| **Siri and Shortcuts** (English, German, French) | "Add a note to Flowplan" (into your capture inbox), "Add a task to Flowplan", "What's on today in Flowplan", "What's due today in Flowplan", "Open a page in Flowplan", "Search Flowplan", "Start the timer in Flowplan", "Stop the timer in Flowplan", "Record a voice memo in Flowplan", "Start focus in Flowplan" |
| **Control Center and the Action button** (iOS 18) | New note, Quick capture, Today's tasks (shows how many are due), Voice memo, Start focus, Timer (a switch) |
| **Long-press the app icon** (iPhone, iPad) | Inbox, My tasks, Search, New note, Switch profile. The iPhone shows the first four of them, *Switch profile* when signed out. |
| **Long-press the app icon** (Android) | *New note* and *Quick capture* (always there, even before the first sign-in), then the **pages you opened last**, Inbox, My tasks, Search, Voice memo and Switch profile. Most launchers show four of them; every shortcut can be dragged to the home screen. Shortcuts to pages of another profile are greyed out until that profile is active again. |
| **Android Quick Settings** | "New note" and "Quick capture" tiles (also from the lock screen). From Android 13, **App settings → Widgets → Add “Quick capture” to Quick Settings** adds the tile with one tap; otherwise use the pencil of Quick Settings. |

**Quick capture** (tile and shortcut on Android) opens a compact window: choose where it goes – the **inbox** (your default capture database, see [Capture into a database](#capture-into-a-database)) or another page or database, with search –, type title and text, take or choose photos if you like, **Save**.

What Siri does without opening the app:

- **Add a task:** Siri asks for the task; in the Shortcuts app you can also set a **due date** and the **list or database** it goes to (otherwise your capture default). In a database the due date goes into its first date property.
- **What's due today:** Siri reads out how many tasks are due today and overdue and the first three, and shows the list.
- **Search Flowplan:** searches pages, records and comments in all your workspaces and shows the best hits; in a shortcut, the hits can be passed on (e.g. to *Open a page*). The action *Search in the app* opens Flowplan's own search with the text instead.
- **Open a page:** Siri asks which page – say part of its title – and opens it in the app. In Shortcuts you pick the page from a list.

Siri, Shortcuts and the controls use the **active** profile. Pages of end-to-end encrypted spaces do not appear (not even their titles). Adding tasks, what's due, opening pages, searching, the new controls and focus filters need a Flowplan server 0.7.0 or newer.

### Focus filters

On the iPhone and iPad, a Focus (Settings → Focus → e.g. *Work* → **Add filter** → **Flowplan**) can choose:

- **Profile or workspace:** a profile ("all workspaces") or one workspace of a profile. When the Focus starts, the app switches to that profile and opens the workspace; when it ends, it goes back to the profile you had before – unless you switched yourself in the meantime.
- **Hide notifications from other workspaces:** while the Focus is on, your instance does not send this phone push notifications from other workspaces – or none at all if the Focus belongs to another profile. They still arrive in the inbox. If the Focus is never switched off, the rule ends by itself after a day.

Workspaces appear in the list once the app has been signed in to that profile; open the app on the profile once if one is missing.

### Share from other apps

In any app that can share (browser, Photos or gallery, Files, mail, scanner …), **Share → Flowplan** (iPhone, iPad) or **Share → Save to Flowplan** (Android) opens a small window with title, text, link and files.

- **What works:** text, links, photos and PDFs – several files at once too (at most 10). Other file types are not taken.
- **Where to:** the **inbox**, your default capture database, is preselected (set it in the browser with **Use as default for capturing**, see [Capture into a database](#capture-into-a-database)). **Save to** (iPhone, iPad) or **Change** (Android) lists every page and database you may write to, with search.
- **What you get:** in a database (the inbox included) a **record** – the link in the first URL property (if there is one), the files in the first files property and in the record itself. On a page a **sub page** with text, link, photos and PDFs.

**On iPhone and iPad** you stay in the app you share from. Flowplan remembers the last choice of where to save per profile. The sheet uses the sign-in of the app: open Flowplan once and sign in, otherwise it asks you to. Photos in HEIC become JPEG.

**On Android** the window lists under *Not taken* what it cannot take (other file types, more than 10 files). PDFs get a preview of their first page in the record. You can change the title; left empty it is the first line of the text, the link's address or the first file name. After **Save**, **Back to the app** returns to the app you shared from; **Open** shows the result in Flowplan. Not signed in yet? Text and links then go to the instance's preview as in the browser and continue after signing in.

The share sheet on iPhone and iPad as well as photos and PDFs on Android need a Flowplan server 0.7.0 or newer. Up to 0.6.0, Android takes only text and links, through the instance's preview.

### Scan documents and Spotlight (iPhone and iPad)

**Scan documents.** In a page, type `/` and choose **Scan document** (only in the iPhone and iPad app). The camera finds the edges and straightens each page; take as many pages as you like. Flowplan recognises the text on the device (German, English, French) and adds one PDF at the end of the page – or of the record you are in. The PDF carries the text invisibly, so you can select and search it in any PDF viewer, and **Flowplan's search finds the scan by its text** right away. The link `flowplan://scan` (e.g. in a shortcut) opens the scanner with the choice of inbox, page or database. The PDF does not stay on the phone after saving.

**Spotlight.** The app puts the titles of your most recently changed pages (up to 500, with where they are and a line of their content) and your open tasks into the phone's search. A tap on a result opens it in Flowplan. Nothing of end-to-end encrypted spaces, pages behind a journal PIN or journal days goes there; signing out or switching profiles empties it. The index stays on the phone.

The scanner and Spotlight need a Flowplan server 0.7.0 or newer.

### Voice notes in pages

In the app, **Voice note** (`/voice`) in a document records with the phone's microphone – up to 30 minutes, also with the screen locked. **Insert** puts the recording into the page as audio:

- **Insert as text** (iPhone and iPad): the spoken words become text on the device with Apple's speech recognition – the recording does not leave the phone for it. The text follows below the audio as a **Transcript** with timestamps. The app asks once for permission to use speech recognition. It works for the languages the device can recognise by itself (set by the device's language; most major languages, depending on the iOS version).
- Where the device cannot (Android, other languages), your instance's speech recognition turns it into text if it is set up ([Voice notes](/documents#voice-notes-and-meetings)); otherwise the audio stays on its own.
- **Then summarise with AI** puts a summary below the text when the [AI](/ai#summaries) is available to you.

This needs a Flowplan server 0.7.0 or newer. In the browser, `/voice` records as before.

### On-device AI and Writing Tools (iPhone and iPad)

**Optional:** on an iPhone or iPad with **iOS/iPadOS 26** or later that supports Apple Intelligence, with **Apple Intelligence switched on** (Settings → Apple Intelligence & Siri), the writing assistant and the summary of open pages run with Apple's language model **on the device**. The text does not leave the device, also in encrypted spaces; the instance needs no AI provider for it. Results carry the label **On this device**. This needs a Flowplan server newer than 0.7.0 (currently the beta image).

- **Switch it off:** **Settings → AI → On this device (Apple) → Off** – Flowplan then never asks the device. It also shows whether Apple Intelligence on this device is available, turned off in Settings or not supported. Administrators can switch it off for the whole instance.
- **Server AI stays:** questions to the workspace, AI in databases and AI actions keep running through the instance when it is set up; it also takes over texts that are too long.
- **Older devices and iOS versions** (from iOS 16.4) use the app as before, just without this path.
- **Writing Tools:** Apple's Writing Tools (proofread, rewrite, summarise) work right in the editor – select text and choose **Writing Tools** in the text menu (from iOS 18 with Apple Intelligence).

More: [on-device AI](/ai#on-device-ai-apple).

### Calendars in Apple Calendar

**Settings → Calendars & issues → Calendars on iPhone, iPad and Mac**: choose calendar views and tap **Set up in Apple Calendar**. The app opens a configuration profile in Safari; confirm the download, then install it under **Settings → Profile Downloaded** (on the Mac: System Settings → Profiles). Each view becomes a CalDAV account in Apple Calendar, in both directions – see [Sync both ways](/views#sync-both-ways-caldav). On a computer the page shows a QR code instead; scan it with the iPhone's camera. The link works once and for ten minutes.

### iPad: windows, keyboard and Handoff

- **Several windows:** in a page's menu (right-click or long-press it in the sidebar), **Open in new window** gives the page a window of its own – side by side in Split View, in Slide Over or in Stage Manager. On iPhone Duo this works on the open display; on the closed one the menu item is not there. Links that would open a new tab do the same. Long-press the app icon → **Show All Windows** lists them. The first window holds the app settings, notifications and widgets; the others show a page and come back with it after a restart. All windows use the active profile and the app lock.
- **Hardware keyboard:** hold <kbd>⌘</kbd> and the iPad lists Flowplan's shortcuts – search <kbd>⌘</kbd> <kbd>K</kbd>, new page <kbd>⌘</kbd> <kbd>N</kbd>, quick capture <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, the overview <kbd>⌘</kbd> <kbd>/</kbd> and the others with <kbd>⌘</kbd>, <kbd>⌃</kbd> or <kbd>⌥</kbd>, including [your own](/keyboard-shortcuts#your-own-shortcuts). A shortcut works in the window in front. The editor's shortcuts (bold, undo …) work as in the browser.
- **Trackpad and mouse:** the pointer hovers over buttons and links as in Safari.
- **Handoff:** the page in front is offered to your Mac and your other devices (same Apple Account, Handoff on under Settings → General → AirPlay & Continuity). On the Mac it opens in the [desktop app](#desktop-app-for-macos-windows-and-linux), without it in the browser. Pages from the Mac or another device open in the app on the profile of their instance; pages of an instance without a profile open in Safari. Pages behind the app lock are not offered while it is locked.

### An instance on your own network without HTTPS

On first start (or under **Add profile**) you enter your instance's address. Without `http://` in front, the app always assumes HTTPS. It accepts a plain `http://` address only when the instance runs **on your local network** – public domains and addresses always need HTTPS.

| Works with `http://` | iPhone and iPad | Android |
| --- | --- | --- |
| Private IP addresses: `192.168.x.x`, `10.x.x.x`, `172.16.x.x`–`172.31.x.x` | yes | yes |
| Tailscale and CGNAT addresses `100.64.x.x`–`100.127.x.x`, link-local `169.254.x.x` | yes | yes |
| Local IPv6 (`fd…`, `fe80…`), `localhost` | yes | yes |
| Names without a dot, e.g. `http://nas:3000` | yes | yes |
| `.local` names, e.g. `http://flowplan.local:3000` | yes | yes |
| `.lan`, `.home.arpa`, `.internal`, e.g. `http://flowplan.lan` | **no** | yes |
| Public domains and IPs, also Tailscale names `*.ts.net` | no (HTTPS only) | no (HTTPS only) |

On iPhone and iPad, iOS allows unencrypted connections only to IP addresses, names without a dot and `.local` names. For an instance at `flowplan.lan`, enter its IP address there (`http://192.168.1.20:3000`) – or set up HTTPS. The app tells you so when connecting instead of showing an empty page. On the first connection iOS also asks whether Flowplan may access devices on your local network: tap **Allow**.

As soon as an `http://` address is in the field, the app warns before connecting:

- **Passwords and all content cross the network unencrypted.** That is fine only on a network you trust.
- **Without HTTPS there are no** passkeys, encrypted spaces, voice notes on pages and, on Android, no offline copy (on iPhone and iPad the app keeps the offline copy itself, so it works there).
- **Notifications** from an instance that is only reachable on your local network usually don't arrive: the [push relay](/configuration#push-relay-and-end-to-end-encryption) has to reach the instance from the internet.

For real use, set up HTTPS, see [Without HTTPS](/installation#without-https). With a Tailscale name (`*.ts.net`) you get HTTPS even without a public domain.

### Profiles in the mobile apps

The apps for iPhone, iPad and Android also keep several instances as profiles:

- **Switch:** tap a profile under **Profiles** in the **app settings**, or long-press the app icon → **Switch profile** (on the iPhone while signed out). The same list is a tap away from the offline page.
- **Before signing in:** at the bottom of the sign-in and registration page (also for "Forgot password", the two-factor code and the new-password page) there is **Other server? Switch profile**. *Cancel* (on Android also the back button) takes you back to the page.
- **Wrong address:** a profile that has never been signed in can be corrected with **Change address** or deleted with **Remove profile** on the profile screen. If no Flowplan answers at the address, the app shows its own page with **Try again** and **Switch profile**.
- **Add:** **App settings → Add profile**, enter the address and, if you like, a name. If the address already has a profile, the app simply switches to it – there is one profile per instance.
- **Rename:** tap **Rename** next to a profile in the app settings.
- **Remove:** **Sign out and remove the profile** applies to the active profile; the next profile then becomes active.

Notifications, widgets, Live Activities, the number on the app icon and the running timer always belong to the **active** profile. On a switch the app unregisters the device from the previous instance's notifications; the sign-in there stays, so you are still signed in when you switch back. What the app keeps for a profile (the device token for widgets, the last summary) is stored separately in the keychain or Keystore and never goes to another instance. An address set up before becomes the first profile after the update.

### What the app keeps on the instance

After signing in, the app registers with the instance: the entry belongs to that sign-in; signing in again on the device moves it to the new session. It disappears with signing out, removing it under *Signed-in devices* or deleting the account. With its device token, widgets, Live Activities and Shortcuts read in the background only what you may see in Flowplan – in small answers of at most ten items per widget – and run their buttons (check off a task or habit, start/stop the timer, mark as read, save what you captured) – as do the buttons on notifications, which name only the notification: what they act on comes from the instance. The share sheet and the scanner save with it as well, and Spotlight reads your page titles and open tasks with it. For notifications the app leaves a token of the [push relay](/configuration#push-relay-and-end-to-end-encryption) (the instance stores it only encrypted) and a public key; the private key stays in the Keychain or Keystore. Notifications thus arrive end-to-end encrypted: the relay, Apple and Google do not see their content, only the app decrypts it. Older app versions get them through Expo's push service – there, as with Web Push, they only say that something new is in the inbox. Operators can turn notifications off or send their text through Expo as well, see [Configuration](/configuration#push-notifications). A [focus filter](#focus-filters) that hides notifications leaves a rule for this device there: which workspace may still notify it, for at most a day.

## Light and dark

Flowplan follows your device's light or dark mode by itself – also when it changes while Flowplan is open (for example automatically in the evening). Under **Settings → Appearance & language → Appearance** you choose a fixed **Light** or **Dark** instead; **Automatic** follows the device again. The choice applies per device. Sign-in, public pages and forms, the website and this documentation follow the device as well, the apps also with their own screens and widgets.

Under **Editor**, **Show line numbers by default** turns on line numbers for every code block without a setting of its own – on this device only, like the appearance.
