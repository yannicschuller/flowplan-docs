# Quick capture (desktop)

A shortcut opens a small window above every app: a thought, a task, a link, a file, a screen region or a voice note – into the inbox, a database, today's journal entry or a page. Offline too.

Quick capture is part of the [desktop app for macOS, Windows and Linux](/offline-and-apps#desktop-app-for-macos-windows-and-linux). It saves straight to your instance with the active profile's sign-in; nothing goes to third parties.

## At a glance

| Key | What happens |
| --- | --- |
| <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Space</kbd> (Mac: <kbd>⇧</kbd> <kbd>⌘</kbd> <kbd>Space</kbd>) | opens the window above every app – also while Flowplan is minimised, hidden or (Mac, tray icon) closed |
| <kbd>Enter</kbd> | saves |
| <kbd>Shift</kbd> <kbd>Enter</kbd> | new line |
| <kbd>Tab</kbd> | choose the target: typing filters, <kbd>↑</kbd> <kbd>↓</kbd> moves, <kbd>Enter</kbd> takes it |
| <kbd>Alt</kbd> <kbd>↑</kbd> / <kbd>↓</kbd> | previous / next target without opening the list |
| <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>V</kbd> | paste the clipboard – a link gets its title |
| hold <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>R</kbd> | record a voice note, release to stop |
| <kbd>↓</kbd> in the empty field | **Recently captured** |
| <kbd>Esc</kbd> | closes an open list, otherwise the window – the text stays as a draft |

The buttons in the window do the same: **Paste**, **Attach…**, **Region**, **Hold to talk**, **Suggest** and **As a task for today**. The first line becomes the title, the rest the text.

## Where it goes: targets

The top right shows where the capture goes. You can choose:

| Target | What is created |
| --- | --- |
| **Inbox** (default) | a record in your capture database – the default chosen under **Capture** (see [Capture into a database](/offline-and-apps#capture-into-a-database)) |
| a **database** | a new record; its default template applies, shorthand fills its properties |
| a **journal** | appended to **today's entry** – if the day does not exist yet, Flowplan creates it |
| a **page** | appended at the end of the page, as a new paragraph (or as a task) |

The list only shows where you may write. Recently used targets come first; the app remembers them per profile and starts with the last target next time.

> [!NOTE]
> **End-to-end encrypted spaces are not in the list.** The server cannot write into them, and the capture window – unlike the Flowplan window – has no keys. The list says how many pages are missing for that reason. For encrypted spaces, capture directly in the Flowplan window. Journals behind a PIN are left out too.

**As a task for today** turns the first line into an open task – due today or on the day from the text, assigned to you or to the person from the text. It shows up at once under **My tasks** and in the app's tray icon.

## Shorthand in the text

Flowplan reads what you type as you type and shows it as **chips** below the text – for example for “Write offer tomorrow 3pm #client @anna !high”:

`Due: Tue, Oct 27, 3:00 PM` · `Tags: Client` · `Assignee: Anna Schmidt` · `Priority: High`

What a chip takes over disappears from the title. The **×** on a chip keeps the text exactly as typed. Shorthand only fills properties the target has – otherwise the text stays, and the chip says “stays text”.

| Shorthand | Examples (German · English · French) | Becomes |
| --- | --- | --- |
| Days | `heute`, `morgen`, `übermorgen` · `today`, `tomorrow`, `day after tomorrow` · `aujourd'hui`, `demain`, `après-demain` | due date |
| Weekdays | `Freitag`, `nächsten Montag` · `friday`, `next monday` · `vendredi`, `lundi prochain` | the next such day |
| Spans | `in 3 Tagen`, `nächste Woche` · `in two weeks`, `next week` · `dans une semaine`, `la semaine prochaine` | a day (next week: its Monday) |
| Dates | `24.12.`, `24.12.2026`, `2026-12-24`, `24. Dezember` · `12/24`, `Dec 24th` · `24/12`, `le 5 novembre` | that day (without a year: the next one) |
| Times | `15 Uhr`, `um 15:30` · `3pm`, `at 3:30 pm` · `15h`, `à 9h30` | time of the date (alone: today) |
| Tag | `#client` | an option of a multi-select (“Tags” first), if it exists |
| Person | `@anna` | a person property (“Assignee” first) – first name, full name without spaces or e-mail name, when exactly one person matches |
| Priority | `!hoch`, `!niedrig` · `!high`, `!urgent`, `!low` · `!haute`, `!basse` · `!1`–`!4`, `!!!`, `!!` | an option of a “Priority” select (or one with priority options) |

- The due date goes into the first date property (first one named “Due”, “Fällig”, “Échéance” …). A time counts in your computer's time zone, also when the record is only sent later from the queue.
- `#27` is a number, not a tag; `name@example.org` stays an e-mail address; an exclamation mark at the end of a sentence stays one.
- Offline the window shows no chips; the shorthand is read when the capture is sent – with the day and time zone of capturing.
- The server reads the shorthand (one place for all apps). Older servers without this feature take only text into the inbox – the window says so.

## Clipboard and links

<kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>V</kbd> or **Paste** inserts the clipboard text. If it is a link (`https://…`), it appears as a link chip with title and provider – **your instance fetches the preview** (like link cards in the editor, protected against internal addresses), never the app itself. It is saved into the database's link property (otherwise into the text) and as a link card; with an empty text, the page's title becomes the title. Offline, the link is saved without a title.

## Files, screen regions and voice notes

- **Files:** drop images (PNG, JPEG, GIF, WebP, AVIF, HEIC), PDFs, Markdown and text files on the window, or choose them with **Attach…**. They are checked as when [dropping files on the main window](/offline-and-apps#more-from-the-desktop-app): extension **and** content, images and PDFs up to 50 MB, text up to 5 MB (the instance may allow less), at most 10 attachments. The list below the text shows them, **×** removes one. Images and PDFs go into the database's files property and into the text; Markdown and text become text.
- **Screen region:** **Region** – the window steps aside and you drag a region; it is attached as a PNG. On the Mac this uses the system's screenshot tool (Space picks a window, <kbd>Esc</kbd> cancels); on Windows and Linux Flowplan shows the screen under the pointer, you drag the region, <kbd>Enter</kbd> takes the whole screen, <kbd>Esc</kbd> cancels. Temporary files sit only briefly in the app's data folder and are deleted right away.
- **Voice note:** press and hold **Hold to talk** (or <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>R</kbd>), release to stop. If your instance has transcription (Whisper, see [Configuration](/configuration)), the recording becomes text there and appears in the field – to check before saving. Without transcription, offline or if it fails, the recording is attached; the instance tries again when it is saved.

### Permissions per system

| System | Screen region | Microphone |
| --- | --- | --- |
| **macOS** | **System Settings → Privacy & Security → Screen & System Audio Recording** → switch on Flowplan, then restart Flowplan. Without it the window says so and opens the page with **Open System Settings**. | macOS asks the first time (“Flowplan uses the microphone for voice notes.”). Declined: **System Settings → Privacy & Security → Microphone**. |
| **Windows** | no permission needed | **Settings → Privacy & security → Microphone** must allow desktop apps |
| **Linux** | X11: none. Wayland: the desktop asks (portal) and often offers a screen or a window – Flowplan takes what it hands over. | depends on the desktop (PipeWire/PulseAudio) |

Flowplan never uses the camera, and the capture window may only use the microphone – and only while you hold the button.

## Offline: the queue

If the instance cannot be reached, the capture goes into a **queue** – with text, target, shorthand, link and attachments. The window says “No connection to … – queued, sent automatically”, the top shows “1 queued”, and the tray icon and the settings show the number too.

- **Sent by itself:** as soon as the connection is back, the computer wakes up or is unlocked, otherwise with growing pauses (5 s, 15 s, 30 s … at most every 15 minutes). **Send now** (window, tray icon, settings) tries right away.
- **Nothing twice:** every capture has its own key (`Idempotency-Key`) from the first moment, and every attempt sends exactly the same request. If an answer gets lost after the instance has already saved it, the next attempt receives the stored answer instead of a second record.
- **Nothing lost:** if the instance refuses something for good (target deleted, file too large), it stays in the queue and the window shows it with **Copy** (back into the field) and **Discard**. While signed out, the capture waits until you are signed in again.
- **Stored encrypted:** the queue and “Recently captured” are kept per profile in the app's data folder (`capture/`), encrypted with the system's key store (macOS Keychain, Windows DPAPI, Secret Service/KWallet on Linux). Without a key store on Linux they are stored unencrypted, readable only by your user account – the settings say which applies. Removing a profile deletes them.

## Undo and “Recently captured”

After saving, the window shows “✓ Saved to …” with **Open** (the record or page in the Flowplan window) and **Undo** – for ten seconds. Then the window goes away unless you started something new.

- **Undo** moves a captured record to the database's trash (restorable from there) and removes appended content from a page or the journal again – as long as it is still unchanged at the end. If someone has written on since, it stays, and the window says so. A capture still in the queue is simply not sent.
- **Recently captured:** <kbd>↓</kbd> in the empty field shows the profile's last 20 captures with target and time; <kbd>Enter</kbd> or **Open** opens one. The same list (the last 8) is in the menu bar or tray icon under **Recently Captured**; waiting ones are marked with ⏳.

## Quick actions

Under **Settings → Quick actions** you add more shortcuts that open the window ready for one thing:

| Quick action | Opens the window … |
| --- | --- |
| **Task** | with **As a task for today** and the chosen target |
| **Journal entry** | with the chosen journal – appended to today's entry |
| **Bookmark** | with the link from the clipboard and its title |
| **Meeting note** | with a chosen database and one of its templates (default, or e.g. “Meeting”), the text starting with “Meeting: ” |
| **Note** | with a fixed target, optionally as a task |

Each has a name, a target, a shortcut (**Change**, **Off**), **Try it** and **Remove**. None is active without a shortcut – after the update only the main shortcut is on. If another app already holds a shortcut, the action says so; a shortcut always belongs to one action only and never also to the main shortcut. At most eight quick actions.

## AI suggestion (optional)

**Suggest** asks an AI where the text belongs: database, a short title and properties the text clearly names. The result appears as chips with **✓** (accept) and **×** (ignore) – **nothing is applied by itself**. Every suggestion is checked on the server: only databases you may write to, only existing options, only real people and days.

- **Where the AI runs:** through your instance's AI (the **AI actions** feature, see [AI](/ai#ai-actions)) – or on a Mac with macOS 26 and Apple Intelligence switched on, **on the Mac itself** ([On-device AI](/ai#on-device-ai-apple)): the instance only builds the question, the Mac answers it, and the text reaches no AI on the server. Which is preferred follows your setting for on-device AI.
- **What the AI sees:** the text in the window and the names of the databases, their properties and options – no content. Databases closed to the AI are left out.
- **Off:** the button is missing when the administration or you switched off AI (or AI actions).

## Setup and the one-time hint

After the first sign-in the app shows one more step: **How Flowplan should run on this computer** – **Turn on quick capture** (with the shortcut, **Change**, **Try it now**; a taken shortcut is reported), **Icon in the menu bar / notification area**, **Start when you sign in to the computer** and **Start minimized / in the background** (only together with starting at sign-in). The switches start with your system's defaults (icon: on for Mac, off for Windows and Linux), everything can be skipped and changed later under **Settings** – they are the same settings.

People who had the app before and never captured see “New: quick capture with …” once in the lower left of the window, with **Try it** and **Settings**. After closing it, a click or the first capture, the hint never comes back.

## Privacy

- Captures are only stored on your instance, with the profile's sign-in and its origin check. Link previews, transcription and AI run through the instance (or on the Mac); the app itself fetches no other addresses.
- The computer only keeps the queue and “Recently captured” (encrypted, see above), the recently used targets (identifiers only) and, briefly, screen regions. The window has a session of its own without cookies or storage.
- End-to-end encrypted spaces are never a target.

## Requirements

The desktop app after 1.2.0 and a Flowplan server newer than 0.7.0. With an older server the window takes text (and **As a task for today**) into the inbox and says that targets, shorthand, links and attachments need a server update. Voice notes as text need transcription on the server; the AI suggestion needs AI actions switched on, or Apple Intelligence on the Mac.
