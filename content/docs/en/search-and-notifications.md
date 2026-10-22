# Search, inbox and push

The quick search finds content right down into file attachments. The inbox and push notifications tell you when someone needs you.

## Quick search

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux <kbd>Ctrl</kbd> <kbd>K</kbd>) or **Search** in the sidebar.

It searches:

- page titles and [aliases](/pages-and-spaces#aliases) as well as document text,
- database records and their content,
- comments,
- file names,
- the text of PDF attachments (up to 50 MB, the first 100,000 characters),
- scanned PDFs and images with text recognition (German and English, French on request via `FLOWPLAN_OCR_LANGS`),
- Word, Excel, PowerPoint and OpenDocument files.

Hits can be filtered by type and space. File text is indexed in the background and can be found after a few seconds. The search only shows what you may read. <kbd>Enter</kbd> opens the first hit.

Aliases of pages and records weigh as much as the title. When the search only matches an alias, the hit shows the real title with the alias in grey, e.g. "Chauffage · PAC". The same applies in the @ mention dialog.

### Commands

The same quick search also runs commands: if the input starts with `>`, only commands appear, such as `> new database`, `> tasks`, `> dark` or `> focus`; <kbd>Enter</kbd> runs the first one. Matching commands also appear above the search hits without `>`. With a page open there are page commands as well: favourite, follow, comments, export, print/PDF, version history, share and focus mode.

### Saved searches

Save frequent searches including their filters with **Save search**. Saved searches are personal and appear when you open the search.

## Inbox

The **Inbox** collects:

- mentions,
- comments and replies to your posts,
- date reminders,
- comments and records from guests via share links,
- pages and workspaces shared with you,
- changes on pages you follow (you follow your own pages when creating them; the bell at the top right toggles following),
- messages from automations.

**By default**, what concerns you directly – mentions, shared pages, comments, reminders – arrives in the inbox, as push and by e-mail. Guest comments come without e-mail. **Changes on pages you follow and automations only land in the inbox**, so that not every small edit triggers a push message or e-mail. **Settings → Notifications** changes this per kind and channel; **Reset to defaults** restores the starting point.

Unread items are marked and can be filtered. A click opens the spot, for text comments the thread directly.

## E-mail

If a mail server is set up on the instance, unread notifications arrive by e-mail as a digest after ten minutes – one mail for everything that has piled up, each notification at most once. Under **Settings → Notifications**, the **E-mail** column can be switched on and off per kind. Invitations to a workspace and pages shared with you arrive by e-mail right away.

### Weekly digest

Under **Settings → Notifications → Weekly digest** you subscribe to an e-mail that arrives every **Monday at 7 am** in your time zone (your browser's time zone is saved when you switch it on):

- **Changed in pages you follow** – with the workspace and who changed it (changes of the last seven days, by others only),
- **Overdue tasks** and **Open tasks** – as in **My tasks**, across all workspaces.

**With a short AI summary of the changes** (only shown when [AI](/ai) is on for you) puts a few bullet points before the list. The AI only reads pages it may read for you, with your AI provider. If AI is off or the request fails, the e-mail comes as a plain list. If there is nothing to report in a week, no e-mail is sent. The digest needs a mail server to be set up.

## Push notifications

Under **Settings → Notifications**:

1. **Enable push** – the browser asks for permission. This applies per device.
2. In the card **Notification kinds**, set the switches **Inbox**, **Push** and **E-mail** per kind – every change is saved at once. On a phone every kind is a card of its own with three labelled switches.
3. Check it with a test notification.

Push notifications open the page concerned. No document content appears on the lock screen.

> [!NOTE]
> **iPhone and iPad** (iOS 16.4 or later): open Flowplan in Safari over HTTPS, **Add to Home Screen** and start it from that icon. Only there can push be enabled.

Signing out, the end of a session or a locked account end the push subscription; enable it again after the next sign-in if needed.

In the [apps for iPhone, iPad and Android](/offline-and-apps#apps-for-iphone-ipad-and-android), notifications come through the app: it asks for permission after the first sign-in, and the number of unread ones shows on the app icon. **Notification kinds** apply there as well.

The [desktop app](/offline-and-apps#notifications-in-the-desktop-app) has no Web Push. It asks for new notifications itself and shows them as system notifications, with the unread count on the app icon. There, **Settings → Notifications** shows a switch for the app's notifications instead of **Enable push**; **Do Not Disturb** and **All Profiles** are in the app's **Notifications** menu. **Notification kinds** apply here too: only kinds with push pop up.
