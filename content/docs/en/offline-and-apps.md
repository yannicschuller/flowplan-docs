---
keywords: offline, no internet, pwa, install, web app, dark mode
---

# Offline and web app

Flowplan runs in the browser, can be installed as an app and keeps working without a connection.

**More on this topic:** [Desktop app for macOS, Windows and Linux](/desktop-app) · [Apps for iPhone, iPad and Android](/mobile-apps) · [Widgets and notifications in the apps](/mobile-widgets) · [Capturing, sharing and scanning in the apps](/mobile-capture)

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

Changes to records without a connection appear in the views right away and are collected on the device. As soon as the connection is back, they go to the server one after another. If the server is briefly unreachable while they are sent – say, during a restart behind the proxy (answers 502, 503, 504, 429 or 408) –, the changes stay queued and go out on the next attempt instead of being discarded. If someone changed the same record in the meantime, Flowplan merges the changes field by field; if the same field was changed on both sides or the record was deleted, you decide in the conflict dialog.

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

::: tabs

== Browser on a computer

- **Chrome, Edge**: the install icon in the address bar.
- **Safari on the Mac**: **File → Add to Dock**.

== iPhone and iPad

Share → **Add to Home Screen**. Only this way are push notifications possible there.

== Android

Menu → **Install app**.

:::

The installed app opens in its own window without browser bars.

### Share to Flowplan

When Flowplan is installed as an app on Android (Chrome), it appears in the **Share** menu of other apps. Shared text and links land in a preview; **Save as page** creates a page from it in the chosen space. Without being signed in, you first go to the sign-in and then back to the preview. iOS does not offer this menu to web apps.

The preview asks whether to save **as a page**, **as a record** in a database or – for links – **as a bookmark**. As a record, title, text and link (or the article text) go into the record; the link lands in the database's first URL property, otherwise in the text, and the database's default record template applies. If there is a default capture database (see below), **as a record** is preselected with it. **Include article text** loads the web page on the server and keeps its main text without navigation, ads and scripts (public addresses only).

### Web clipper in the browser

Under **Settings → Web clipper** you find the button **Save to Flowplan**. Dragged into the bookmarks bar, it opens a small window on any web page with the title, address and selected text – the same preview as when sharing. After saving, the window closes.

### Capture into a database

For an inbox, e.g. with PARA: **Quick capture** on the start page, ++⌘ ⌥ N++, `> capture` in the quick search or – with the installed app – a long press on the app icon → its capture shortcut open a small window with title and text. It is saved as a record in the chosen database; without a connection it waits on the device and is created once the connection is back.

**Improve text** (with the AI icon) below the fields has the [writing assistant](/ai-writing#writing-assistant) improve the spelling and grammar of title and text. The result appears as a preview: **Use** puts it into the fields, **Keep original** leaves everything as it was – nothing is saved until **Capture**. The AI is told to keep shorthand such as `#tag`, `@person`, `!high` or "tomorrow" and links as they are; if it changed or removed any of them, the preview lists them before you take it. The button is only there with a connection and when the writing assistant is allowed for you and the chosen database; as in the editor, it runs through the server or [on the device](/ai#on-device-ai-apple). The desktop app's capture window gets the same button with its next version (see [Quick capture (desktop)](/desktop-capture#ai-suggestion-optional)).

**Use as default for capturing** (in the window) or **Settings → Web clipper → Capture** sets the database that share, the web clipper and quick capture preselect – per person and workspace. The database's default record template applies, so new records land e.g. straight in the "Inbox" view.

### Bookmarks

Bookmarks land in the **Bookmarks** database of the chosen space; it is created the first time, with link, website, folder, note, date and "read" as well as the views All, Cards and Unread. The article text that was taken along is in the record. **Choose bookmarks file** imports the HTML file that Chrome, Edge, Firefox and Safari create when exporting bookmarks – including folders and dates; links that already exist are skipped.

## Light and dark

Flowplan follows your device's light or dark mode by itself – also when it changes while Flowplan is open (for example automatically in the evening). Under **Settings → Appearance & language → Appearance** you choose a fixed **Light** or **Dark** instead; **Automatic** follows the device again. The choice applies per device. Sign-in, public pages and forms, the website and this documentation follow the device as well, the apps also with their own screens and widgets.

Under **Editor**, **Always show block handles** shows the handle `⋮⋮` next to every block again instead of only at the block under the mouse pointer and the block with the cursor (see [Move blocks](/documents#move-blocks)), and **Show line numbers by default** turns on line numbers for every code block without a setting of its own – both on this device only, like the appearance.

Below pages and records Flowplan shows **Related pages**, **Linked from** and **Unlinked mentions**. If you don't need them, turn off **Settings → Appearance & language → Show related pages and backlinks** – also on this device only. The panels then appear neither below pages nor in records.

**Settings → Appearance & language → Page icon** sets where a page's icon sits: **Above the title** (the default) shows it large above the title, **Next to the title** small to the left of the title on its first line – like a classic document, with less space above the text. This applies to documents, databases, whiteboards, journal days and every other page; a cover stays above it. The choice applies to your account on all devices and only changes what you see: the page's title and icon stay as they are, others keep their own setting, and published pages show the icon above the title.

**Settings → Appearance & language → What's new after updates** decides whether **New in Flowplan** appears once after Flowplan was updated: **Show all** (the default) shows the notes of every skipped version, **Only breaking changes** appears only when one of them has changes you need to adapt to, and shows only those, **Never** does not show the dialog. The choice applies to your account on all devices, including the iPhone, iPad and Android apps. Whatever you choose, **What's new** opens the latest versions' notes any time: in the account menu ⋯ at the bottom of the sidebar (on a phone under **More**), with ++⌘/Ctrl K++ → "What's new", under **Settings → Appearance & language** and under **About Flowplan**. Published pages never show the dialog.

After a reload Flowplan opens the workspace that was last open on this device. For this the browser keeps only the workspace's id in the cookie `flowplan-workspace`; an invitation or a link to a page in another workspace takes precedence.

## Workflows on the phone

On a phone, a [workflow page](/workflows#phone-and-tablet) shows the status, the on/off switch, the flow as a list, the runs and the approvals; editing happens on a tablet or computer. An approval notification opens the page right at the **Approvals** tab. Workflow pages are not available offline.
