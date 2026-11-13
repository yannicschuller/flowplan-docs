---
keywords: desktop, mac, macos, windows, linux, app, profiles, window
---

# Desktop app for macOS, Windows and Linux

A slim desktop app wraps your Flowplan instance. On first start it asks for the address and suggests `https://app.flowplan.org` – for your own instance enter its address instead (e.g. `https://flowplan.example.com`). More instances are added as [profiles](#several-instances-profiles).

- All data stays on the server.
- The app remembers the window size and position and opens external links in the default browser. Right-click menu with spelling suggestions, [quick capture from anywhere](/desktop-capture), an icon in the menu bar or notification area, pages in windows of their own and more: see [More from the desktop app](#more-from-the-desktop-app).
- Offline use works in the desktop app too: turn on **Settings → Offline & devices** in the app – it keeps its own offline copies, separate from the browser or the installed web app. Without a connection it then opens the stored copy; its own offline page (**Try again**, **Profiles**) only appears when there is no copy on the device.
- **Notifications:** the app shows new inbox notifications as system notifications and the unread count on the app icon – also with the window minimised or hidden. See [Notifications in the desktop app](#notifications-in-the-desktop-app).
- It only accepts real Flowplan instances – an address running something else or redirecting to another site is refused.
- **Handoff (Mac):** the page open in the window appears on your iPad and iPhone (same Apple Account, Handoff on) and opens there in the Flowplan app – or in the browser without the app. A page open in the iPad or iPhone app appears in the Mac's Dock and opens in the desktop app, in the profile of its instance. See [iPad: windows, keyboard and Handoff](/mobile-capture#ipad-windows-keyboard-and-handoff).
- **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser, where passkeys (iCloud Keychain, Windows Hello, password managers) are available. After **Sign in to the app** the app takes over the sign-in; e-mail and password work directly in the app (**With e-mail and password** opens the form). This needs Flowplan 0.3.3 or newer. If your password manager doesn't fill in anything in the app, **Sign in in the browser** below the form signs you in through the browser as well (Flowplan 0.8.8 or newer).
- **Windows:** with a current desktop app and Flowplan newer than 0.8.13, **Sign in with a passkey** signs you in right in the app window with Windows Hello (face, fingerprint, PIN or security key). If that doesn't work or you cancel, **Sign in in the browser** below it goes through the browser as before. SSO still goes through the browser, and so do passkeys on macOS and Linux.

The apps for macOS, Windows and Linux are at [flowplan.org/download](https://flowplan.org/download) – the page detects your system. Updates install themselves (macOS, Windows installer, Linux AppImage). The Mac app is signed and notarized; with 1.0.5 or older, download the current version once – after that it updates itself. Windows shows SmartScreen. More under [Operations and troubleshooting](/operations#desktop-apps).

> [!NOTE]
> The environment variable `FLOWPLAN_UPDATE_URL` exists twice: on the computer running the desktop app it names another source for app updates (see [Updates](/operations#updates)); on the server, the variable of the same name points the instance's release check at a mirror (see [Configuration](/configuration#operations)). They mean different things and belong in different places.

## Several instances (profiles)

If you work with more than one Flowplan instance, say **Work – flowplan.company.com** and **Private – notes.example**, the desktop app keeps each one as a profile:

- **Add:** menu **Profiles → Add Profile…**, enter the address and, if you like, a name (without one the app shows the address). The address is checked as on first start.
- **Switch:** in the **Profiles** menu (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu), with **Next Profile** (++⌘ ⇧ P++ or ++Ctrl Shift P++), from the Dock icon on the Mac and from the taskbar jump list on Windows.
- **Rename and remove:** **Profiles → Manage Profiles…** (also reachable from the offline page). Removing asks first, signs the profile out and deletes what it stored on this computer. Your data stays on the server.

Every profile has its own sign-in, its own offline copy and its own cookies – also two profiles on the same instance, for example for two accounts. Only the active profile's instance opens in the window; links to another instance go to the browser. With more than one profile, the window title names the active one.

If you had set up an address before, it becomes the first profile after the update – still signed in and with its offline copy.

## Notifications in the desktop app

Browsers receive notifications through Web Push, which the desktop app does not have. It therefore asks your instance itself, about once a minute while it runs:

- **What appears:** each new unread notification once, with the inbox line as title and the record below it (with several profiles also the profile name). Your **notification kinds** under **Settings → Notifications** apply: only kinds with **push** switched on pop up. More than three at once become one notification that opens the inbox.
- **Click:** brings the window to the front, switches to the right profile if needed and opens the page.
- **Count on the icon:** the unread notifications – on the Dock (macOS), in the launcher (Linux, where the desktop shows counts) and as a red dot on the taskbar button (Windows).
- **Settings:** in the **Notifications** menu (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu): **Show Notifications**, **Do Not Disturb** for an hour or until tomorrow morning, and **All Profiles** (otherwise only the active profile). In the app, **Settings → Notifications** shows the same switch instead of Web Push.

Nothing pops up for the window in front – its inbox is in view anyway. What was there at the first start is not shown again, not even after a restart.

On a Mac the app keeps running in the Dock after closing the window and keeps notifying. On Windows and Linux closing the window quits the app; notifications arrive while it runs (minimised is enough) – or, with the [notification area icon](#more-from-the-desktop-app), also without a window.

This needs a Flowplan server 0.7.0 or newer and desktop app 1.0.7 or newer. The app only asks the profile's own instance, with its sign-in; nothing is stored on the server for it.

## Self-signed certificates

The desktop app connects to your server the way Chrome does: it trusts every certificate your system trusts. If your server uses its own certificate authority (CA), install it once in your system's certificate store and everything works without asking:

- **macOS:** double-click the CA file (`.crt`/`.pem`), add it to the "System" keychain in Keychain Access, open it there and set "Trust" to "Always Trust".
- **Windows:** double-click the CA file → "Install Certificate" → "Current User" → "Place all certificates in the following store" → "Trusted Root Certification Authorities".
- **Linux:** `certutil -d sql:$HOME/.pki/nssdb -A -t "C,," -n "My CA" -i ca.crt` (package `libnss3-tools` or `nss-tools`), then restart Flowplan.

If your system does not trust the certificate – a self-signed one, for example –, the app shows it when you add the server: server, issued to, issued by, validity and SHA-256 fingerprint. Compare the fingerprint with the one on your server (`openssl x509 -in cert.pem -noout -fingerprint -sha256`) and choose **Trust This Certificate**. Flowplan then trusts exactly this certificate for exactly this server in this profile. Expired or revoked certificates are never accepted.

If the server later presents a different certificate, the app loads nothing and warns you with the old and the new fingerprint. Only trust the new one if you know the certificate was renewed. **Manage Profiles…** shows which certificate a profile trusts, and **Stop Trusting Certificate** removes it (Flowplan restarts for this). From version 1.3.9.

## More from the desktop app

From desktop app 1.1.0 there is more around the window. Its switches are under **Settings…** (macOS: in the *Flowplan* menu, Windows and Linux: in the *File* menu).

- **Right-click and spelling:** a right click in fields, on links and images shows a system menu – suggestions for a misspelled word, **Add to Dictionary**, cut, copy, paste, **Paste as Plain Text**, open a link in the browser or in a new window, copy or save an image, **Look Up** on a Mac. In the editor Flowplan's own text menu stays; the app's suggestions appear at its top (needs a Flowplan server 0.7.0 or newer). Choose the spell checker's languages – German, English, French – under **Spelling** in the right-click menu, in the *Edit* menu or in the settings. Spell checking covers German, English and French only; Chromium, which the desktop app is built on, has no dictionary for Chinese.
- **Quick capture from anywhere:** ++Ctrl Shift Space++ (Mac: ++⇧ ⌘ Space++) opens a small window above every app – into the inbox, a database, today's journal entry or a page, with shorthand like `tomorrow 3pm #client @anna !high`, links from the clipboard, files, screen regions and voice notes, **Undo** and **Recently captured**, quick actions with shortcuts of their own and an optional AI suggestion. Offline, the capture waits encrypted in a queue and is sent later without arriving twice. Everything about it: [Quick capture (desktop)](/desktop-capture).
- **Icon in the menu bar (Mac) or notification area (Windows, Linux):** **Quick Capture**, the tasks due today or overdue from **My tasks**, the unread notifications, open Flowplan, the profiles and quit. On by default on a Mac, switched on in the settings on Windows and Linux; the app then keeps running in the notification area after its window is closed.
- **Open pages from links:** links like `flowplan://open?instance=…&page=…` open the page in the app, in the profile of its instance. In a browser on a computer, a page's actions (**…** at the top right) offer **Open in desktop app**. For an instance without a profile the app asks first whether to add it.
- **Pages in windows of their own:** **Open Page in New Window** (++⌘ ⇧ N++ or ++Ctrl Shift N++), a <kbd>Shift</kbd>- or middle-click on a link, or **Open in new window** in a page's menu. The app remembers these windows with their size and place and opens them again on the next start.
- **Back and forward:** the *Navigation* menu → **Back** / **Forward** (++⌘ [++ / ++⌘ ]++, Windows and Linux: ++Alt ←++ / ++Alt →++), the mouse's side buttons and, on a Mac, a three-finger swipe take the same steps as the [arrows at the top left](/first-steps#back-and-forward); the menu items are greyed out when there is nothing in that direction. For the swipe, choose **Swipe with two or three fingers** under **System Settings → Trackpad → More Gestures → Swipe between pages**.
- **Drop files:** drop PDFs, images, Markdown and text files on the Dock icon, open them with **Open With → Flowplan**, or drop them on the window where Flowplan does not take them itself. The app asks where to: **Into the Inbox** (one record per file) or **As New Pages** (Markdown becomes a real page). Images and PDFs up to 50 MB, text up to 5 MB, at most 10 files at once.
- **Open at login:** in the settings, optionally **Start without a window**.
- **Print and PDF:** **Print…** shows a preview and prints through the system's dialog, **Save as PDF…** saves the page as a PDF – both without sidebar and tools, as when printing from the browser.
- **Updates without interruptions:** a new update downloads in the background; a small notice at the bottom of the window shows progress, size and speed, and the progress also shows on the app icon. Once it is ready the notice (and the menu) offer **Restart**; otherwise it installs when you quit. No dialog interrupts your typing. **What's new?** in the notice unfolds the release notes of every version between the installed one and the new one, breaking changes highlighted (desktop app 1.3.8 and later). The notes come with the update from the GitHub releases the app checks anyway – no extra request. Whether and what the button shows is set in the app's **Settings** under **Updates → What's new after updates**: **Show all**, **Only breaking changes** or **Never**. What's new in Flowplan itself is shown by the instance after its update ([What's new after updates](/en/offline-and-apps#light-and-dark)).
