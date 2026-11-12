---
keywords: meeting, minutes, transcript, recording, zoom, teams
---

# Meetings

Type **/meet** in a document or a record's document. The block records a meeting, writes the transcript and then summarises it automatically.

**Header**

- **Event ▾**: a small menu at the calendar icon lists the day's events from your calendars – calendar databases (with a calendar view, including ones synced from Google or Microsoft 365) and calendar subscriptions – grouped by calendar, with the time first. Dated records of other databases (such as a sync log or tasks) appear only under **Other entries of this day**. An event fills in title, date and attendees.
- **Title** (default "New meeting"), the **date** as a date mention, **attendees** (+): the plus opens a search – type a name or e-mail address, pick with ↑ ↓ and Enter. Members become mentions; when nobody matches, the last row **Add guest "…"** adds the person by name.
- **Full page** enlarges the block. **Settings** (gear) opens a menu – a bottom sheet on phones:
  - **Continue recording** (red dot), **Re-generate summary**, **Transcribe again** (while the audio is kept),
  - the meeting's **Language** (for transcription and summary; *Automatic* = the interface language), **Instructions** (presets or *Custom …* with your own text), **Consent** (confirm before recording, notice text, play the notice – applies to the whole workspace), **Upload recording …**, **One combined track** (when the meeting's sound is recorded too),
  - **Copy link to meeting**,
  - **Delete audio now …** and **Delete transcript …** (red, asks first; the transcript comes back with ++⌘ Z++ / ++Ctrl Z++).

  Menus and pickers float above the content; the block does not move. Escape closes them and returns the focus to their button.

**Three tabs**

- **Summary**: always in the same order – first the **action items** as "Owner: task": real tasks you can tick off, with a due date when one was mentioned. The owner is only someone explicitly named in the meeting (or the notes) – Flowplan never guesses; otherwise the item says "Owner: unclear". When the named owner is a member who can read the page, they are mentioned and the task appears in their **My tasks** (with a notification). Then the **decisions** (with the reason below when one was given), the **open questions** (with their context) and finally the **summary by topic**.
- **Notes** (formerly "Agenda"): your own notes – before, during and after the meeting, editable at any time. The summary takes them into account.
- **Transcript**: every passage with time and speaker. It is **locked**, so reading, selecting and copying change nothing. **Edit transcript** (lock) unlocks it: corrected passages get a ✎, and Flowplan remembers that you corrected them. Unlocked, **Find and replace** works across the whole transcript (e.g. "Mayr" → "Maier"), with **Add to the glossary** so speech recognition spells the name right next time (owners only). Lines that speech recognition makes up in silence or noise ("Thanks for watching", "Untertitel im Auftrag des ZDF", "Sous-titres réalisés par …", a lone "Thank you.", the same line many times in a row) are marked *no speech*, hidden and left out of the summary – nothing is deleted: **Show N hidden lines** shows them.

**Sources ①②③**: every item of the summary ends with numbered chips. A number stands for one passage of the transcript and is reused wherever that passage is cited; numbers count per meeting in order of first appearance. Hover shows the passage; a click opens the transcript there (and plays the audio from there when it was kept).

**Recording**

- **Start recording**, **Pause**, **Resume**, **Stop** (asks once "End the meeting?" – then it is transcribed and summarised). While recording, a small **level meter** per source (microphone, system sound) shows that sound arrives; when one source stays silent for more than 30 seconds while the other has sound (a muted or wrong microphone, a tab shared without audio), the block says so. **Continue recording** (in the menu) picks the meeting up later – the transcript continues. When a recording ended unexpectedly (window closed, connection lost), the block offers **Continue**.
- In the **desktop app** (Windows 10+, macOS 13+) the microphone and the **system sound** are recorded as two separate tracks: the microphone is you (your name), the system sound is everyone else ("Others"). With `WHISPER_DIARIZE=on` and a service that separates speakers, the others are told apart ("Others 1", "Others 2"). macOS asks once for "Screen & System Audio Recording"; without it Flowplan records the microphone only and says where to allow it.
- **Headphones** work best. With loudspeakers the microphone hears the others too; Flowplan removes such duplicate passages from the microphone track (same time, nearly the same words).
- In the **browser**, **Start recording** records the microphone (everyone in the room on one track). In **Chrome and Edge**, **Record all participants** also records a tab's or the screen's sound: in the sharing dialog pick the video call's tab (or the screen) and tick the box to share the sound (for a tab, “Share tab audio”); Flowplan drops the picture at once. Firefox and Safari pass no sound there – use the desktop app (also for the sound of other programs). The mobile apps record the microphone only.
- **One combined track** (menu): microphone and meeting sound are mixed into one track instead of two. Speakers are then only told apart by the Whisper service (`WHISPER_DIARIZE=on`); separate tracks stay the default.
- The recording goes to the server in 30-second pieces; when the connection drops, the pieces stay in the browser and are sent later. Up to 3 hours per meeting. The server transcribes the pieces **while you record** – after you stop, only the last piece and the summary are left, so the result is there much sooner. When that does not work (another format, the service briefly unavailable), the whole recording is transcribed at the end; the audio is never lost.
- **Upload recording …** (menu): M4A, MP3, WAV, AAC or WebM – one file with everyone, or two files (the microphone first, then the meeting's sound).

**After the recording**: the block goes quiet – no big button any more, just a line like "41:21 recorded · transcribed · summarised". When processing fails, the error shows there with **Process again**, which only processes what is missing – a track that was already transcribed is not sent again. Instance admins also see the exact cause below it (e.g. "no answer within 504 s", "ECONNREFUSED" or the Whisper service's answer). **Transcribe again** (menu, only while the audio is kept) sends the recording to speech recognition once more, e.g. after adding to the glossary or changing the Whisper service, and then writes the summary anew; the previous one stays in the page's version history. When passages were corrected, Flowplan asks whether to **keep** them (the default) or **replace** them.

**Summary**: written after you stop, in the meeting's language, by your instance's AI provider. It needs at least one minute of recording and reads the transcript **and the notes** – including notes you add after the meeting: **Re-generate summary** always uses the current state. **Instructions**: Automatic, Status meeting, 1:1, Workshop, Customer call, or your own. **Re-generate summary** uses other instructions without transcribing again. **Ask this meeting** answers only from this block's transcript and notes, with source chips.

**In a database**: when the block is in a record's document (e.g. a "Meetings" database), Flowplan fills existing properties after processing: date, attendees (person), duration (number, minutes) and status (an option such as "Done").

**From the journal**: the meeting note of a journal day's event ends with a meeting block holding the event's title, date and attendees.

**Settings → Workspace → Meetings** (owners):

- **Instructions**: the default for new blocks.
- **Vocabulary → Glossary**: names, acronyms and terms speech recognition should spell right – one per line or separated by commas. Flowplan passes them, together with the instance's `WHISPER_PROMPT`, to Whisper as a hint; Whisper reads only about 224 tokens of it (some 550 characters), the rest is cut after the last whole term.
- **Keep audio**: *Delete after the transcript* (default), *Delete after some days* or *Keep*. Kept audio counts against the storage.
- **Consent required** with your own **notice text**: before recording the notice appears with "Everyone being transcribed has agreed"; **Play consent notice** reads it aloud. Who confirmed is stored.

**Who may do what**: whoever can read the page sees the block – guests only on pages shared with them. Recording and processing need edit rights. Locked pages, journals behind a PIN (while locked) and end-to-end encrypted spaces: no recording (the server would hear the audio). Transcription needs `WHISPER_URL`, the summary your instance's AI; neither leaves your server or your configured provider.

## API and MCP

API tokens have a new permission **"AI and transcription"** (Settings → API & AI assistants, when creating a token; off by default). Only tokens with it reach the AI features (`/api/ai/run`, `ask`, `write`, `summarize`), transcription (`/api/transcribe`) and meetings. Administrators can switch the permission off for the whole instance (Administration → AI → "API tokens with 'AI and transcription'"). Requests count against the same AI limits as the interface.

```bash
curl -X POST https://flowplan.example/api/meetings \
  -H "Authorization: Bearer fp_…" \
  -F pageId=<page id> \          # or databaseId=<database id>
  -F title="Kick-off" -F date=2026-11-11 \
  -F attendees='["Ben","anna@example.org"]' \
  -F instructions=status \
  -F me=@microphone.webm -F others=@system.webm   # or -F audio=@everyone.m4a
```

Answer `202 { id, pageId, rowId, status: "transcribing", statusUrl }`. `GET /api/meetings/{id}?content=1` returns the status, the summary (Markdown), `agenda` (the block's Notes) and the transcript. Instead of audio you can send `transcript` as text (one passage per line, optionally `Name: text`). When the workspace requires consent, send `consent=true`. More: `POST /api/meetings/{id}/summarize` (summarise again), `POST /api/meetings/{id}/retranscribe` (transcribe the kept audio again; `{"dryRun": true}` only counts the corrected passages, `{"force": true}` replaces them too), `POST /api/meetings/{id}/ask`. In the transcript (`content=1`) passages carry `hallucination` (no speech) and `edited` (corrected); `errorDetail` is shown to instance admins only.

MCP: **`create_meeting_note`** (audio as base64 in `audio` or `me` + `others`, or `transcript`; target `pageId` or `databaseId`) and **`get_meeting_note`** – only with a write token that has "AI and transcription".

Environment: `FLOWPLAN_AI_TOKENS=off` switches the token permission off by default (until an administrator saves the AI settings).
