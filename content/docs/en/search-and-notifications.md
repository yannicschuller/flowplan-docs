# Search, inbox and push

The quick search finds content right down into file attachments. The inbox and push notifications tell you when someone needs you.

## Quick search

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux <kbd>Ctrl</kbd> <kbd>K</kbd>) or **Search** in the sidebar.

It searches:

- page titles and [aliases](/pages-and-spaces#aliases) as well as document text,
- [tags and property values](/pages-and-spaces#tags-and-properties) of pages,
- database records and their content,
- comments,
- file names,
- the text of PDF attachments (up to 50 MB, the first 100,000 characters),
- scanned PDFs and images with text recognition (German and English, French or Chinese (Simplified) on request via `FLOWPLAN_OCR_LANGS`),
- Word, Excel, PowerPoint and OpenDocument files.

Hits can be filtered by type and space. [Journal days](/journal#days-in-lists-search-graph-and-export) come after all other hits; **Without journal days** leaves them out completely and stays on for the next search. File text is indexed in the background and can be found after a few seconds. The search only shows what you may read. <kbd>Enter</kbd> opens the first hit.

Aliases of pages and records weigh as much as the title. When the search only matches an alias, the hit shows the real title with the alias in grey, e.g. "Chauffage · PAC". The same applies in the @ mention dialog.

### Filter by tags and properties

These words act as filters in the search:

| Input | Finds |
| --- | --- |
| `#customer` | pages with the tag “customer” (case does not matter) and database records carrying it in a multi-select with the workspace's tags; tags with spaces as `#"New idea"` |
| `-#internal` | leaves out pages and records with the tag |
| `Status:Open` | property “Status” with the value “Open” (select and multi-select: exactly this option; text, URL, email, phone: contains) |
| `Budget:>1000`, `Budget:<=50`, `Budget:10..20` | compare numbers |
| `Due:2026-12`, `Due:>2026-11-01`, `Due:2026-11-01..2026-11-30` | dates: day, month or year; after, between (also `<`, `>=`, `<=`) |
| `Billed:yes` / `Billed:no` | checkbox |
| `Owner:Emil`, `Owner:me` | person by name; `me` is you |
| `Status:*` / `Status:-` | property set / empty |

Names with spaces go in quotes: `"Next step":Offer`. Several filters apply together; the remaining text is searched as usual. Filters without text list all matching pages, most recently changed first. Records count with their own tags and those of their database page. Words that name no tag and no property (like `#123`) stay ordinary search words.

Recognised filters appear as chips under the search field; ✕ removes one. The **Tag …** choice next to the space adds a tag filter. Collections keep the filters. Tag names and values are also ordinary words of the page: “customer” also finds pages tagged “customer”.

### Combine: AND, OR, NOT

Conditions combine freely, in the search and in [collections](#collections):

| Input | Meaning |
| --- | --- |
| `#customer #open` | both (AND; you may write `AND` between them) |
| `#open OR #waiting`, `#open \| #waiting` | either |
| `-#internal`, `NOT #internal`, `-draft` | without; `-` or `NOT` works before any condition and before parentheses |
| `(#open OR #waiting) -#internal` | parentheses group |
| `created_by:Anna`, `creator:me` | created by (a name, or `me` for you) |
| `updated_by:Emil`, `editor:me` | last changed by |
| `created:-7d`, `updated:this-week` | created or changed in the last 7 days, this week |
| `created:2026-03`, `updated:>2026-01-01`, `created:2026-01-01..2026-01-31` | year, month or day; after (`>`, `>=`), before (`<`, `<=`), a range |
| `type:document`, `type:database\|whiteboard`, `type:record` | only documents, databases, whiteboards or database records (also `notebook`, `journal`) |
| `in:"Team Marketing"` | only in this space |
| `title:offer` | only the title contains the word |

**Relative dates:** `-7d`, `-2w`, `-3m` and `-1y` mean the last 7 days, 2 weeks, 3 months or a year, including today. You can also use `today`, `yesterday`, `this-week`, `last-week`, `this-month`, `last-month`, `this-year` and `last-year`. Weeks start on Monday. "Today" is the day in your time zone. These also work for date properties: `Due:this-week`.

**Precedence:** `NOT`/`-` binds tightest, then AND, then OR. So `#A #B OR #C` means `(#A #B) OR #C`. Use parentheses when in doubt. `OR`, `AND` and `NOT` only count in capitals. A lower-case "or" stays a search word.

**Words:** Words right next to each other are searched as one phrase, as before. With `AND` between them (`invoice AND open`), they can appear anywhere.

**Keys:** `created_by`, `creator`, `updated_by`, `editor`, `created`, `updated`, `type`, `in` and `title` are English and ignore case. If a property has the same name, put its name in quotes: `"Type":Book`. For database records, `Property:value` first checks the record's own property of that name (e.g. `Priority:High`), then the database page's.

All existing searches work as before. Searches that use the new conditions list the matching pages and records without a text snippet, most recently changed first. The server does not search end-to-end encrypted spaces.

### Commands

The same quick search also runs commands: if the input starts with `>`, only commands appear, such as `> new database`, `> tasks`, `> dark` or `> focus`; <kbd>Enter</kbd> runs the first one. Matching commands also appear above the search hits without `>`. With a page open there are page commands as well: favourite, follow, comments, export, print/PDF, version history, share and focus mode.

### Collections

A **collection** is a saved search with its own place in the sidebar. Each time you open it, Flowplan searches again. New and changed pages and records that match appear by themselves.

- **Create:** In the quick search, choose **Save as collection** (the search's kind and space become `type:` and `in:`), or select **+** next to **Collections** in the sidebar.
- **Filters or text:** In the editor, build the query under **Filters**. Groups require **all conditions (AND)** or **any condition (OR)**. You can exclude any condition or group (NOT). The conditions are tag, created by, last edited by, property (by type: select, multi-select, text, number, date, checkbox, person), created and updated (relative or fixed), type, space, title contains and text contains. **Text** shows the same query in the search language. Both views stay in step: what you change in the text shows up in the filters again. If a text cannot be shown as filters (for example because of a missing parenthesis), the editor stays in text mode and says so. Below the query you see right away how many matches there are.
- **Results:** As a **list** or a **table** with title, type, space, tags, updated and created by. Select a column heading to sort. At most 500 matches are shown, most recently changed first.
- **Manage:** The **…** menu next to a collection has Edit (name, emoji, filters, sharing), Duplicate, Move up/Move down and Delete. You can also drag collections into order; the order is yours alone. After you delete a collection, **Undo** brings it back.
- **Sharing:** New collections are private. With **Share with the workspace**, all members see it under **Shared**; guests do not. Only you and the workspace's owners can change or delete it. Only you can share it or stop sharing it. Others can choose **Duplicate as my collection**.
- **Permissions:** In a collection, each person sees only what they may read themselves. This also applies to shared collections: no private spaces, no private records of others, no hidden properties, no journals behind a PIN, nothing from the trash. End-to-end encrypted spaces are left out, and the collection says so.
- **Limits:** 100 collections per person and workspace, 100 shared ones per workspace.

Saved searches from earlier versions became private collections when you updated. Searches for comments or files keep their words, but not the kind.

## Inbox

The **Inbox** collects:

- mentions,
- comments and replies to your posts,
- date reminders,
- comments and records from guests via share links,
- pages and workspaces shared with you,
- changes on pages you follow (you follow your own pages when creating them; the bell at the top right toggles following),
- messages from automations.

**By default** what concerns you directly – mentions, shared pages, comments, reminders – arrives in the inbox, as push, by e-mail and in connected [chat apps](#chat-apps). Guest comments come without e-mail and chat app. **Changes on pages you follow and automations only land in the inbox**, so that not every small edit triggers a notification or mail. Under **Settings → Notifications** this can be changed per kind and channel; **Reset to defaults** restores the initial state.

**For administrators: security incidents of the instance.** Admins see their own row **Security incidents of the instance** among the notification kinds: what the [detection rules](/operations#security) find on the whole instance (password guessing, new admin rights, probing …). Each admin chooses how incidents arrive – inbox, push, e-mail and chat apps are on by default – and which: **All incidents** (default) or **Critical only**. The choice applies to every channel of this kind; every incident still shows under **Administration → Threats & incidents**. Clicking or tapping the notification opens the incident's page. The row **Security notices** is only about your own account (a new sign-in, a wrong journal PIN, a chat app switched off); whoever had switched channels off there before the update has them off for security incidents too. Other people don't see the row.

Unread items are marked and can be filtered. A click opens the spot, for text comments the thread directly. Notifications without a page lead to their place in the app: a security incident to its page under **Administration → Threats & incidents**, a new sign-in to the signed-in devices, a chat app switched off to its connections – also when tapping the push notification and through the link in e-mails and chat apps.

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
3. Use **Send test notification** to check that everything arrives (see [below](#test-notification)).

Push notifications open the page concerned. No document content appears on the lock screen.

> [!NOTE]
> **iPhone and iPad** (iOS 16.4 or later): open Flowplan in Safari over HTTPS, **Add to Home Screen** and start it from that icon. Only there can push be enabled.

Signing out, the end of a session or a locked account end the push subscription; enable it again after the next sign-in if needed.

In the [apps for iPhone, iPad and Android](/offline-and-apps#apps-for-iphone-ipad-and-android), notifications come through the app: it asks for permission after the first sign-in, and the number of unread ones shows on the app icon. **Notification kinds** apply there as well. These notifications are end-to-end encrypted and therefore show their text – the relay, Apple and Google cannot read it, see [Push relay](/configuration#push-relay-and-end-to-end-encryption).

### Test notification

**Settings → Notifications → Send test notification** immediately sends a notification "Test notification – everything works." to all your push targets: every browser with push enabled and every [app](/offline-and-apps#apps-for-iphone-ipad-and-android) with notifications allowed. It takes the same way as every notification – Web Push, the [push relay](/configuration#push-relay-and-end-to-end-encryption) or Expo – but leaves nothing in the inbox. Tapping it opens these settings.

After at most ten seconds, each device is listed with the channel it went through (**Relay · end-to-end encrypted**, **Expo** or **Web Push**) and what happened:

- **Delivered** – handed to Apple, Google or the browser's push service. If nothing shows up anyway, check the device: are notifications allowed for Flowplan? An active Focus is mentioned.
- **Registration expired** – open the app once, it registers again. For a browser whose subscription expired, enable push there again.
- **Notifications turned off** – allow them in the app or in the device's system settings.
- **Push relay not set up, unreachable or instance not verified** – this concerns the instance, not your device; the message gives the reason (e.g. `PUSH_RELAY=off`, `APP_URL` without HTTPS, `/.well-known/flowplan-push` not reachable). See [Configuration](/configuration#push-relay-and-end-to-end-encryption).
- **No devices registered** – enable push above or open the app and allow notifications.

The test only goes to your own devices, regardless of **Notification kinds** and Focus filters – the device's own permission and Focus still apply. At most five tests in ten minutes. The result never shows tokens or keys; administrators also see a diagnostics line with the relay address, whether `/.well-known/flowplan-push` is enabled and the instance's address (`APP_URL`).

The [desktop app](/offline-and-apps#notifications-in-the-desktop-app) has no Web Push. It asks for new notifications itself and shows them as system notifications, with the unread count on the app icon. There, **Settings → Notifications** shows a switch for the app's notifications instead of **Enable push**; **Do Not Disturb** and **All Profiles** are in the app's **Notifications** menu. **Notification kinds** apply here too: only kinds with push pop up.

## Chat apps

Instead of (or besides) push and e-mail, notifications arrive right away in a chat app: **Telegram**, **Gotify**, **ntfy** or **Matrix**. Under **Settings → Notifications → Chat apps** you connect one target per service; which kinds arrive there you choose in the **Notification kinds** card, column **Chat apps**. By default these are mentions, shared pages, comments, reminders and security notices – not guest comments, changes on pages you follow or automations. What is switched off for the inbox does not reach the chat app either.

| Service | What you enter |
| --- | --- |
| **Telegram – the instance's bot** | Nothing: **Create a connection link**, open the link on the device with Telegram and tap **Start** (or send the bot `/start <code>`). The code is valid for 15 minutes and only once. Only available when the administration has set up a bot. |
| **Telegram – own bot** | Bot token (from @BotFather), your chat ID (e.g. from @userinfobot) or `@channelname`, optionally an own API address – for a self-hosted Bot API server or a relay/proxy. Message your bot once so it may write to you. |
| **Gotify** | Server address and app token (create one in Gotify under *Apps*). Tapping the notification opens Flowplan. |
| **ntfy** | Server (empty: `https://ntfy.sh`), topic, optionally an access token or user and password. On ntfy.sh every topic is public – choose a name that is hard to guess, or your own server with authentication. |
| **Matrix** | Homeserver, room ID (`!abc:example.org`, in Element under *Room settings → Advanced*) and the access token of an account that is in the room – preferably a separate bot account. |

**Send test message** sends a message right away and shows the outcome: delivered, *Credentials refused (HTTP 401)*, *Not found (HTTP 404)* (address, topic, room or chat ID), *Server not reachable* or *Internal addresses are blocked*. **Change** takes new details; an empty token field keeps the stored token. **Disconnect** deletes the connection with its credentials.

**What a message says:** as with push, the kind, a short excerpt of the notification and a link to the place. With **Include the text** off, only “New notification in Flowplan” with the link. Notifications from [end-to-end encrypted spaces](/encrypted-spaces) **always** arrive without content. Tokens or other secrets are never part of a message.

**Credentials** (bot, app and access tokens, passwords) are stored only encrypted, like other [stored secrets](/configuration#stored-secrets), and never shown again – only “Token set (…abcd)”. Connecting and disconnecting appear under **Settings → Security check → Sign-ins & changes**.

**Delivery:** messages go through a queue like push and e-mail. If the service does not answer, Flowplan retries with growing pauses and gives up after six attempts; if the service throttles (HTTP 429), Flowplan waits as long as asked. At most 20 messages a minute go to one target. What you already read in the app is not sent any more. If the service refuses a target three times in a row (401/403/404 or a blocked internal address), **Flowplan switches it off** and tells you in the inbox; **Switch on again** resumes it once fixed.

**For administrators:** the switch **Operations alerts** sends failed backups, full storage, errors of background workers and many failed sign-ins (at most once a day per alert) to your chat apps – also without a webhook under [Monitoring](/administration#monitoring). Security incidents arrive through the row **Security incidents of the instance** of the notification kinds, not twice.

Which services and servers are allowed is up to the administration ([Administration → Chat apps](/administration#chat-apps)).
