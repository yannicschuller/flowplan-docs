---
keywords: iphone, ipad, android, app, apk, app store, mobile, phone
---

# Apps for iPhone, iPad and Android

The apps for iPhone, iPad and Android: install and update them, connect them to your own instance, several instances as profiles.

![Flowplan on two phones: the roadmap as a board with the columns Backlog and Planned on the left, the team wiki with a task list on the right; each with the bottom bar with Home, Search, New page, Inbox and Navigation](/screenshots/phone-light.webp "Board and wiki in the app, with the phone's bottom bar.")

::: tabs

== iPhone and iPad

**The iPhone and iPad app is on the App Store:** [Flowplan on the App Store](https://apps.apple.com/app/id6825801344) – open the link on the iPhone or iPad and download the app, or search the App Store for “Flowplan”. New versions arrive through the App Store as with any other app.

== Android

**The Android app comes straight from us, without the Play Store:** [flowplan.org/download/android.apk](https://flowplan.org/download/android.apk) or on [flowplan.org/download](https://flowplan.org/download). See [Installing and updating the Android app](#installing-and-updating-the-android-app).

:::

## Installing and updating the Android app

::: steps

1. On the Android device, open [flowplan.org/download](https://flowplan.org/download) and tap **Download the app**.
2. Open the downloaded file (the browser's notification or *Downloads*).
3. The first time, Android asks whether the browser may install apps: **Settings** → **Allow from this source**, then go back and tap **Install**.
4. If Google Play Protect warns about an unknown app: **More details** → **Install anyway**. The app is signed with our key, just not distributed through Google Play.

:::

**Updates:** once a day the app checks whether there is a new version and then asks: **Download** fetches it in the browser, opening the file and tapping **Update** installs it over the old one – sign-in, profiles and settings stay. **Later** asks again for that version only after a week. New Flowplan features arrive through the server anyway, no app update needed.

You can also do without the Android app: Flowplan can be installed on Android as a web app as described above.

**Requirements:** iPhone and iPad with iOS/iPadOS 16.4 or later (the share sheet and the configurable widgets from iOS 17), Android 8.0 or later.

Like the desktop app, the mobile apps show your Flowplan instance; all data stays on the server and new features arrive without an app update. On top comes what only an app can do:

- **Notifications:** mentions, comments, tasks and reminders arrive as notifications, the number of unread ones shows on the app icon. The app asks for permission once after the first sign-in; a tap opens the page concerned. Which kinds arrive is set as in the browser under **Settings → Notifications**; there, **Send test notification** checks whether notifications reach all your devices and otherwise says why ([more](/notifications#test-notification)). [Buttons](/mobile-widgets#buttons-on-notifications) tick off a task, postpone it to tomorrow, answer a comment or mark it read – without opening the app.
- **[Widgets](/mobile-widgets#widgets)** for the home screen (on the iPhone also for the lock screen), each with settings of its own – tasks to check off, appointments, counters, time tracking and more; plus [widgets for administrators](/mobile-widgets#widgets-for-administrators).
- **[Live Activities](/mobile-widgets#live-activities-and-ongoing-notifications):** the timer, focus, the meeting, imports/exports and voice memos on the lock screen and in the Dynamic Island, or as an ongoing notification.
- **[Capture, Siri, Control Center](/mobile-capture#capture-siri-control-center):** notes, tasks, voice memos and photos from widgets, Siri, Control Center, the app icon and Android tiles; ask Siri what is due, open a page or search.
- **[Focus filters](/mobile-widgets#focus-filters)** (iPhone, iPad): one profile or workspace per Focus, optionally without notifications from the others.
- **[Share from other apps](/mobile-capture#share-from-other-apps):** text, links, photos and PDFs from any app straight into the inbox, a database or onto a page.
- **[Scanner and Spotlight](/mobile-capture#scan-documents-and-spotlight-iphone-and-ipad)** (iPhone, iPad): documents scanned into searchable PDFs, your pages and tasks in the phone's search.
- **[Voice notes](/mobile-capture#voice-notes-in-pages)** in pages are recorded by the app; on the iPhone and iPad they become text on the device itself.
- **[On-device AI](/mobile-capture#on-device-ai-and-writing-tools-iphone-and-ipad)** (iPhone, iPad, optional): writing assistant and summaries with Apple Intelligence without the text leaving the device; Apple's Writing Tools in the editor.
- **[Calendars in Apple Calendar](/mobile-capture#calendars-in-apple-calendar)** with one configuration profile instead of typing CalDAV credentials.
- **Staying signed in and app lock:** the app stays signed in while you use it or its widgets (default: 90 days without use, see [Stay signed in](/sessions)). If you like, Flowplan only unlocks with Face ID, Touch ID, a fingerprint or the device code – on iPhone, iPad and Android, again after more than a minute in the background.
- **Back:** swiping from the left edge (iOS) or the back gesture or button (Android) first closes what is open (menu, dialog, sidebar) and then goes up a level: from a settings section to the overview, from a record to its database, from a page to the previous page.
- **Exports and downloads** go to the system's share menu (e.g. "Save to Files").
- **Without a connection:** the app opens the profile's offline copy, on iPhone and iPad too – see [Offline in the app for iPhone and iPad](/offline-and-apps#offline-in-the-app-for-iphone-and-ipad).
- **iPad and tablets:** every orientation, Split View, Slide Over and Stage Manager, several windows, a hardware keyboard with the shortcuts listed when you hold <kbd>⌘</kbd>, the trackpad, and Handoff to the Mac – see [iPad: windows, keyboard and Handoff](/mobile-capture#ipad-windows-keyboard-and-handoff). With the **Apple Pencil** you write in [notebooks](/notebooks) and drawing blocks, draw on whiteboards and write on PDFs (see [Annotate PDFs](/media-and-files#annotate-pdfs)) with pressure while fingers move the board and a resting hand leaves no marks; double-tap and squeeze switch the tool, Scribble writes into any text field (see [Whiteboards](/whiteboards#pen-and-shape-recognition)). The app recognises your handwriting on the device: search finds it, and **Convert to text** turns selected strokes into text (see [Recognising handwriting](/notebooks#recognising-handwriting-iphone-and-ipad)).
- **iPhone Duo:** open or close it while you work – the page stays as it is (no reload, the same place, the text you are typing) and lays itself out anew: the phone layout with the bottom bar on the closed display and on the open one held upright, the sidebar on the open display held sideways. Content stays clear of the status bar and camera at the side of the closed display. On the open display you can use **several windows** as on the iPad (see [below](/mobile-capture#ipad-windows-keyboard-and-handoff)); the closed display has one. Full screen on iPhone Duo needs an app built for iOS 27.1 or later.

Also:

- On first start they ask for the address and suggest `https://app.flowplan.org`. They only accept real Flowplan instances that do not redirect to another site. More instances are saved as [profiles](#profiles-in-the-mobile-apps). **Sign out and remove the profile** in the **app settings** (via **Settings → Notifications → Open app settings**) signs the app out of the active profile's instance and removes it there.
- **Managed devices (MDM/EMM):** through managed app configuration (iOS Managed App Configuration or Android app restrictions), the key `server` presets the address of your own instance; the app suggests it on first start.
- **Sign in with a passkey** and **Sign in with SSO** open the system's sign-in sheet (iOS) or a browser tab (Android); after **Sign in to the app** the app takes over the sign-in. E-mail and password work directly in the app: **With e-mail and password** opens the form.
- **Password manager not filling in?** Tap **With e-mail and password** first, then **Sign in in the browser** below the form (or at the two-factor code). The sign-in opens in the same sheet as for passkeys and SSO; there your password manager recognises your instance's address and fills in the password and code. Inside the app itself, iOS only matches saved passwords to addresses built into the app – which isn't possible for self-hosted instances. This needs Flowplan 0.8.8 or newer; the app doesn't need an update.
- Signing in through the browser as well as notifications and widgets (the app interface) need Flowplan 0.4.0 or newer.
- Links to other sites open in the browser; without a connection the app shows a page of its own and reconnects by itself.
- Flowplan appears in other apps' **Share** menu – as **Flowplan** on iPhone and iPad, as **Save to Flowplan** on Android, see [Share from other apps](/mobile-capture#share-from-other-apps).

## An instance on your own network without HTTPS

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
- **Notifications** from an instance that is only reachable on your local network usually don't arrive: the [push relay](/configuration-ai-push#push-relay-and-end-to-end-encryption) has to reach the instance from the internet.

For real use, set up HTTPS, see [Without HTTPS](/installation#without-https). With a Tailscale name (`*.ts.net`) you get HTTPS even without a public domain.

## Profiles in the mobile apps

The apps for iPhone, iPad and Android also keep several instances as profiles:

- **Switch:** tap a profile under **Profiles** in the **app settings**, or long-press the app icon → **Switch profile** (on the iPhone while signed out). The same list is a tap away from the offline page.
- **Before signing in:** at the bottom of the sign-in and registration page (also for "Forgot password", the two-factor code and the new-password page) there is **Other server? Switch profile**. *Cancel* (on Android also the back button) takes you back to the page.
- **Wrong address:** a profile that has never been signed in can be corrected with **Change address** or deleted with **Remove profile** on the profile screen. If no Flowplan answers at the address, the app shows its own page with **Try again** and **Switch profile**.
- **Add:** **App settings → Add profile**, enter the address and, if you like, a name. If the address already has a profile, the app simply switches to it – there is one profile per instance.
- **Rename:** tap **Rename** next to a profile in the app settings.
- **Remove:** **Sign out and remove the profile** applies to the active profile; the next profile then becomes active.

Notifications, widgets, Live Activities, the number on the app icon and the running timer always belong to the **active** profile. On a switch the app unregisters the device from the previous instance's notifications; the sign-in there stays, so you are still signed in when you switch back. What the app keeps for a profile (the device token for widgets, the last summary) is stored separately in the keychain or Keystore and never goes to another instance. An address set up before becomes the first profile after the update.

## What the app keeps on the instance

After signing in, the app registers with the instance: the entry belongs to that sign-in; signing in again on the device moves it to the new session. It disappears with signing out, removing it under *Signed-in devices* or deleting the account. With its device token, widgets, Live Activities and Shortcuts read in the background only what you may see in Flowplan – in small answers of at most ten items per widget – and run their buttons (check off a task or habit, start/stop the timer, mark as read, save what you captured) – as do the buttons on notifications, which name only the notification: what they act on comes from the instance. The share sheet and the scanner save with it as well, and Spotlight reads your page titles and open tasks with it. For notifications the app leaves a token of the [push relay](/configuration-ai-push#push-relay-and-end-to-end-encryption) (the instance stores it only encrypted) and a public key; the private key stays in the Keychain or Keystore. Notifications thus arrive end-to-end encrypted: the relay, Apple and Google do not see their content, only the app decrypts it. Older app versions get them through Expo's push service – there, as with Web Push, they only say that something new is in the inbox. Operators can turn notifications off or send their text through Expo as well, see [Configuration](/configuration-ai-push#push-notifications). A [focus filter](/mobile-widgets#focus-filters) that hides notifications leaves a rule for this device there: which workspace may still notify it, for at most a day.
