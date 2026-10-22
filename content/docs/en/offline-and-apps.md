# Offline, web app and desktop

Flowplan runs in the browser, can be installed as an app and keeps working without a connection.

## Work without a connection

Flowplan always saves documents locally in the browser first (IndexedDB) and syncs them with the server as soon as it can be reached. If the connection drops, you simply keep writing; other people's changes are merged when you reconnect.

### Turn on offline use

Under **Settings → Data → Offline use**, the device also stores the app, the workspace, all readable pages and the records and files you open later. Then you can open pages, read documents and databases and edit text even without a connection.

- Online, the current state always comes from the server; the copy only serves without a connection.
- If the sign-in has expired, Flowplan shows the sign-in page online – without a connection, the stored copy still opens.
- The copies contain private content. They are removed when you sign out, when you turn the feature off and when another person signs in.

#### The copy stays current

While Flowplan is open, it keeps the copy up to date on its own: at start, when the connection comes back, when you bring the app back to the foreground, and every 6 hours. It only loads what changed since the last update – usually two small requests.

- **New pages** are added; **changed** pages, records and documents are loaded again.
- **Deleted pages** and pages you may no longer read (including a journal behind a PIN) leave the copy together with their records and files.
- When an update takes a moment, **Updating offline copy …** shows briefly in the bottom left corner.
- When the sign-in has expired, Flowplan does not update – the existing copy stays as it is.

**Settings → Data → Offline use** shows the state, for example “Offline copy updated 2 h ago · 312 pages · 85 MB”. **Update now** loads every page again.

**Also store record contents and files** also stores the documents of all database records and the files of the pages, even ones you have never opened – at most 200 MB and only while the device has enough space. Without it, only records and files you opened once are kept. Turning it off removes the records and files stored in addition.

Without a connection, Flowplan shows the date of the copy below the offline notice when it is older than 7 days (“Offline copy from Oct 12”).

> [!NOTE]
> Installed as an app (Chrome, Edge, Android), Flowplan also updates the copy in the background while the app is closed, when the browser allows it (Periodic Background Sync). The browser decides whether and how often – usually only for apps used often. Records and files never opened are loaded only by the open app.

### Database records offline

Changes to records without a connection appear in the views right away and are collected on the device. As soon as the connection is back, they go to the server one after another. If someone changed the same record in the meantime, Flowplan merges the changes field by field; if the same field was changed on both sides or the record was deleted, you decide in the conflict dialog.

> [!NOTE]
> A database's schema – properties and views – can only be changed with a connection.

## Install as an app

- **Chrome, Edge**: the install icon in the address bar.
- **Safari on the Mac**: **File → Add to Dock**.
- **iPhone, iPad**: Share → **Add to Home Screen**. Only this way are push notifications possible there.
- **Android**: menu → **Install app**.

The installed app opens in its own window without browser bars.

### Share to Flowplan

When Flowplan is installed as an app on Android (Chrome), it appears in the **Share** menu of other apps. Shared text and links land in a preview; **Save as page** creates a page from it in the chosen space. Without being signed in, you first go to the sign-in and then back to the preview. iOS does not offer this menu to web apps.

The preview asks whether to save **as a page**, **as a record** in a database or – for links – **as a bookmark**. As a record, title, text and link (or the article text) go into the record; the link lands in the database's first URL property, otherwise in the text, and the database's default record template applies. If there is a default capture database (see below), **as a record** is preselected with it. **Take the article text** loads the web page on the server and keeps its main text without navigation, ads and scripts (public addresses only).

### Web clipper in the browser

Under **Settings → Data → Web clipper and bookmarks** you find the button **Save to Flowplan**. Dragged into the bookmarks bar, it opens a small window on any web page with the title, address and selected text – the same preview as when sharing. After saving, the window closes.

### Capture into a database

For an inbox, e.g. with PARA: **Quick capture** on the start page, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>N</kbd>, `> capture` in the quick search or – with the installed app – a long press on the app icon → its capture shortcut open a small window with title and text. It is saved as a record in the chosen database; without a connection it waits on the device and is created once the connection is back.

**Use as default for capturing** (in the window) or **Settings → Data → Web clipper and bookmarks → Capture** sets the database that share, the web clipper and quick capture preselect – per person and workspace. The database's default record template applies, so new records land e.g. straight in the "Inbox" view.

### Bookmarks

Bookmarks land in the **Bookmarks** database of the chosen space; it is created the first time, with link, website, folder, note, date and "read" as well as the views All, Cards and Unread. The article text that was taken along is in the record. **Choose bookmarks file** imports the HTML file that Chrome, Edge, Firefox and Safari create when exporting bookmarks – including folders and dates; links that already exist are skipped.

## Desktop app for macOS, Windows and Linux

A slim desktop app wraps your Flowplan instance. On first start it asks for the address and suggests `https://app.flowplan.org` – for your own instance enter its address instead (e.g. `https://flowplan.example.com`). More instances are added as [profiles](#several-instances-profiles).

- All data stays on the server.
- The app remembers the window size and position and opens external links in the default browser.
- Offline use works in the desktop app too: turn on **Settings → Data → Offline use** in the app – it keeps its own offline copies, separate from the browser or the installed web app. Without a connection it then opens the stored copy; its own offline page (**Try again**, **Profiles**) only appears when there is no copy on the device.
- It only accepts real Flowplan instances – an address running something else or redirecting to another site is refused.
- **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser, where passkeys (iCloud Keychain, Windows Hello, password managers) are available. After **Sign in to the app** the app takes over the sign-in; e-mail and password work directly in the app. This needs Flowplan 0.3.3 or newer.

The apps for macOS, Windows and Linux are at [flowplan.org/download](https://flowplan.org/download) – the page detects your system. On Windows and Linux (AppImage) updates install themselves. The Mac app is not signed yet: macOS asks on first opening (right-click → Open), and for an update the app opens the download page instead of replacing itself. Windows shows SmartScreen. More under [Operations and troubleshooting](/operations#desktop-apps).

> [!NOTE]
> The environment variable `FLOWPLAN_UPDATE_URL` exists twice: on the computer running the desktop app it names another source for app updates (see [Updates](/operations#updates)); on the server, the variable of the same name points the instance's release check at a mirror (see [Configuration](/configuration#operations)). They mean different things and belong in different places.

### Several instances (profiles)

If you work with more than one Flowplan instance, say **Work – flowplan.company.com** and **Private – notes.example**, the desktop app keeps each one as a profile:

- **Add:** menu **Profiles → Add Profile…**, enter the address and, if you like, a name (without one the app shows the address). The address is checked as on first start.
- **Switch:** in the **Profiles** menu (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu), with **Next Profile** (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>P</kbd> or <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd>), from the Dock icon on the Mac and from the taskbar jump list on Windows.
- **Rename and remove:** **Profiles → Manage Profiles…** (also reachable from the offline page). Removing asks first, signs the profile out and deletes what it stored on this computer. Your data stays on the server.

Every profile has its own sign-in, its own offline copy and its own cookies – also two profiles on the same instance, for example for two accounts. Only the active profile's instance opens in the window; links to another instance go to the browser. With more than one profile, the window title names the active one.

If you had set up an address before, it becomes the first profile after the update – still signed in and with its offline copy.

## Apps for iPhone, iPad and Android

> [!NOTE]
> As of today the apps are in preparation and not yet available in the App Store or on Google Play. Until then, Flowplan can be installed as a web app as described above.

Like the desktop app, the mobile apps show your Flowplan instance; all data stays on the server and new features arrive without an app update. On top comes what only an app can do:

- **Notifications:** mentions, comments, tasks and reminders arrive as notifications, the number of unread ones shows on the app icon. The app asks for permission once after the first sign-in; a tap opens the page concerned. Which kinds arrive is set as in the browser under **Settings → Notifications**.
- **Widgets** for the home screen (on the iPhone also for the lock screen): tasks due, the inbox and the running timer. A tap opens the task or page. They update in the background.
- **Running timer:** on the iPhone a running timer of the time tracking appears as a Live Activity on the lock screen and in the Dynamic Island, on Android as a notification with a running clock.
- **Quick actions:** long-press the app icon to open the inbox, My tasks, the search, a new page or **Switch profile**.
- **App lock:** if you like, Flowplan only unlocks with Face ID, Touch ID, a fingerprint or the device code.
- **Exports and downloads** go to the system's share menu (e.g. "Save to Files").
- **iPad and tablets:** every orientation, Split View, Slide Over and Stage Manager, keyboard and trackpad. With the **Apple Pencil** you draw on whiteboards with pressure while fingers move the board; double-tap and squeeze switch the tool, Scribble writes into any text field (see [Whiteboards](/whiteboards#pen-and-shape-recognition)).

Also:

- On first start they ask for the address and suggest `https://app.flowplan.org`. They only accept real Flowplan instances that do not redirect to another site. More instances are saved as [profiles](#profiles-in-the-mobile-apps). **Sign out and remove the profile** in the **app settings** (via **Settings → Notifications → Open app settings**) signs the app out of the active profile's instance and removes it there.
- **Managed devices (MDM/EMM):** through managed app configuration (iOS Managed App Configuration or Android app restrictions), the key `server` presets the address of your own instance; the app suggests it on first start.
- **Sign in with a passkey** and **Sign in with SSO** open the system's sign-in sheet (iOS) or a browser tab (Android); after **Sign in to the app** the app takes over the sign-in. E-mail and password work directly in the app. Signing in through the browser as well as notifications and widgets (the app interface) need Flowplan 0.4.0 or newer.
- Links to other sites open in the browser; without a connection the app shows a page of its own and reconnects by itself.
- On Android, Flowplan appears in other apps' **Share** menu.

### Profiles in the mobile apps

The apps for iPhone, iPad and Android also keep several instances as profiles:

- **Switch:** tap a profile under **Profiles** in the **app settings**, or long-press the app icon → **Switch profile**. The same list is a tap away from the offline page.
- **Add:** **App settings → Add profile**, enter the address and, if you like, a name. If the address already has a profile, the app simply switches to it – there is one profile per instance.
- **Rename:** tap **Rename** next to a profile in the app settings.
- **Remove:** **Sign out and remove the profile** applies to the active profile; the next profile then becomes active.

Notifications, widgets, the number on the app icon and the running timer always belong to the **active** profile. On a switch the app unregisters the device from the previous instance's notifications; the sign-in there stays, so you are still signed in when you switch back. What the app keeps for a profile (the device token for widgets, the last summary) is stored separately in the keychain or Keystore and never goes to another instance. An address set up before becomes the first profile after the update.

### What the app keeps on the instance

After signing in, the app registers with the instance: the entry belongs to that sign-in and disappears with signing out, the end of the session or the deletion of the account. With it, the widgets read only a short summary in the background (unread notifications, open tasks, the running timer). Notifications go through Expo's push service, which hands them to Apple or Google – as with Web Push, they only say that something new is in the inbox. Operators can turn this off or send the text along, see [Configuration](/configuration#push-notifications).

## Light and dark

Flowplan follows your device's light or dark mode by itself – also when it changes while Flowplan is open (for example automatically in the evening). Under **Settings → General → Appearance** you choose a fixed **Light** or **Dark** instead; **Automatic** follows the device again. The choice applies per device. Sign-in, public pages and forms, the website and this documentation follow the device as well, the apps also with their own screens and widgets.
