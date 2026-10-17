# Offline, web app and desktop

Flowplan runs in the browser, can be installed as an app and keeps working without a connection.

## Work without a connection

Flowplan always saves documents locally in the browser first (IndexedDB) and syncs them with the server as soon as it can be reached. If the connection drops, you simply keep writing; other people's changes are merged when you reconnect.

### Turn on offline use

Under **Settings → Data → Offline use**, the device also stores the app, the workspace, all readable pages and files you open later. Then you can open pages, read documents and databases and edit text even without a connection.

- Online, the current state always comes from the server; the copy only serves without a connection.
- If the sign-in has expired, Flowplan shows the sign-in page online – without a connection, the stored copy still opens.
- The copies contain private content. They are removed when you sign out, when you turn the feature off and when another person signs in.

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

For links, the preview asks whether to save them **as a page** or **as a bookmark**. **Take the article text** loads the web page on the server and keeps its main text without navigation, ads and scripts (public addresses only).

### Web clipper in the browser

Under **Settings → Data → Web clipper and bookmarks** you find the button **Save to Flowplan**. Dragged into the bookmarks bar, it opens a small window on any web page with the title, address and selected text – the same preview as when sharing. After saving, the window closes.

### Bookmarks

Bookmarks land in the **Bookmarks** database of the chosen space; it is created the first time, with link, website, folder, note, date and "read" as well as the views All, Cards and Unread. The article text that was taken along is in the record. **Choose bookmarks file** imports the HTML file that Chrome, Edge, Firefox and Safari create when exporting bookmarks – including folders and dates; links that already exist are skipped.

## Desktop app for macOS and Windows

A slim desktop app wraps your Flowplan instance. On first start it asks for the address and suggests `https://app.flowplan.org` – for your own instance enter its address instead (e.g. `https://flowplan.example.com`); **Switch server …** in the menu changes it later.

- All data stays on the server.
- The app remembers the window size and position and opens external links in the default browser.
- Without a connection it shows an offline page of its own; offline use of the web app works as in the browser.
- It only accepts real Flowplan instances – an address running something else or redirecting to another site is refused.
- **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser, where passkeys (iCloud Keychain, Windows Hello, password managers) are available. After **Sign in to the desktop app** the app takes over the sign-in; e-mail and password work directly in the app.

The apps for macOS, Windows and Linux are at [flowplan.org/download](https://flowplan.org/download) – the page detects your system; updates install themselves. As long as they are not signed, macOS asks on first opening (right-click → Open) and Windows shows SmartScreen. More under [Operations and troubleshooting](/operations#desktop-apps).

## Apps for iPhone, iPad and Android (in preparation)

> [!NOTE]
> The apps are in preparation and not yet available in the App Store or on Google Play. Until then, Flowplan can be installed as a web app as described above.

Like the desktop app, the mobile apps show your Flowplan instance; all data stays on the server and new features arrive without an app update. On top comes what only an app can do:

- **Notifications:** mentions, comments, tasks and reminders arrive as notifications, the number of unread ones shows on the app icon. The app asks for permission once after the first sign-in; a tap opens the page concerned. Which kinds arrive is set as in the browser under **Settings → Notifications**.
- **Widgets** for the home screen (on the iPhone also for the lock screen): tasks due, the inbox and the running timer. A tap opens the task or page. They update in the background.
- **Running timer:** on the iPhone a running timer of the time tracking appears as a Live Activity on the lock screen and in the Dynamic Island, on Android as a notification with a running clock.
- **Quick actions:** long-press the app icon to open the inbox, My tasks, the search or a new page.
- **App lock:** if you like, Flowplan only unlocks with Face ID, Touch ID, a fingerprint or the device code.
- **Exports and downloads** go to the system's share menu (e.g. "Save to Files").
- **iPad and tablets:** every orientation, Split View, Slide Over and Stage Manager, keyboard and trackpad. With the **Apple Pencil** you draw on whiteboards with pressure while fingers move the board; double-tap and squeeze switch the tool, Scribble writes into any text field (see [Whiteboards](/whiteboards#pen-and-shape-recognition)).

Also:

- On first start they ask for the address and suggest `https://app.flowplan.org`. They only accept real Flowplan instances that do not redirect to another site. The **app settings** (via **Settings → Notifications → Open app settings** or long-press the app icon → **Change server**) change the server; **Sign out and forget the server** signs the app out and removes it from the instance.
- **Sign in with a passkey** and **Sign in with SSO** open the system's sign-in sheet (iOS) or a browser tab (Android); the app then takes over the sign-in. E-mail and password work directly in the app. This needs a Flowplan server newer than 0.3.4; notifications and widgets need a server with the app interface (from the next version).
- Links to other sites open in the browser; without a connection the app shows a page of its own and reconnects by itself.
- On Android, Flowplan appears in other apps' **Share** menu.

### What the app keeps on the instance

After signing in, the app registers with the instance: the entry belongs to that sign-in and disappears with signing out, the end of the session or the deletion of the account. With it, the widgets read only a short summary in the background (unread notifications, open tasks, the running timer). Notifications go through Expo's push service, which hands them to Apple or Google – as with Web Push, they only say that something new is in the inbox. Operators can turn this off or send the text along, see [Configuration](/configuration#push-notifications).

## Light and dark

Flowplan follows your device's light or dark mode by itself – also when it changes while Flowplan is open (for example automatically in the evening). Under **Settings → General → Appearance** you choose a fixed **Light** or **Dark** instead; **Automatic** follows the device again. The choice applies per device. Sign-in, public pages and forms, the website and this documentation follow the device as well, the apps also with their own screens and widgets.
