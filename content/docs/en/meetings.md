---
keywords: meeting, minutes, transcript, recording, zoom, teams
---

# Meetings

Type **/meet** in a document or a record's document. The block records a meeting, writes the transcript and then summarises it automatically.

**Header**

- **Event ▾**: takes title, date and attendees of an event from your calendar databases (including ones synced from Google or Microsoft 365).
- **Title** (default "New meeting"), the **date** as a date mention, **attendees** (+): members become mentions, other people are listed by name.
- **Full page** enlarges the block; **settings** (gear): instructions, upload a recording, re-generate the summary, delete kept audio.

**Three tabs**

- **Summary**: **action items** first – real tasks you can tick off, with owner and due date. When the owner is a member who can read the page, they are mentioned and the task appears in their **My tasks** (with a notification). Then the **topics** (each a ### section) and the **open points**.
- **Agenda**: your own notes – before, during and after the meeting. They go into the summary.
- **Transcript**: every passage with time and speaker.

**Sources ①②③**: every item of the summary ends with numbered chips. A number stands for one passage of the transcript and is reused wherever that passage is cited; numbers count per meeting in order of first appearance. Hover shows the passage; a click opens the transcript there (and plays the audio from there when it was kept).

**Recording**

- **Start recording**, **Pause**, **Resume**, **Stop**. **Continue recording** picks the meeting up later – the transcript continues.
- In the **desktop app** (Windows 10+, macOS 13+) the microphone and the **system sound** are recorded as two separate tracks: the microphone is you (your name), the system sound is everyone else ("Others"). With `WHISPER_DIARIZE=on` and a service that separates speakers, the others are told apart ("Others 1", "Others 2"). macOS asks once for "Screen & System Audio Recording"; without it Flowplan records the microphone only and says where to allow it.
- **Headphones** work best. With loudspeakers the microphone hears the others too; Flowplan removes such duplicate passages from the microphone track (same time, nearly the same words).
- In the **browser** and the mobile apps only the microphone is recorded (everyone in the room on one track).
- The recording goes to the server in 30-second pieces; when the connection drops, the pieces stay in the browser and are sent later. Up to 3 hours per meeting.
- **Upload recording** (settings): M4A, MP3, WAV, AAC or WebM – one file with everyone, or two files (the microphone first, then the meeting's sound).

**Summary**: written after you stop, in the meeting's language, by your instance's AI provider. It needs at least one minute of recording. **Instructions**: Automatic, Status meeting, 1:1, Workshop, Customer call, or your own. **Re-generate summary** uses other instructions without transcribing again. **Ask this meeting** answers only from this block's transcript and agenda, with source chips.

**In a database**: when the block is in a record's document (e.g. a "Meetings" database), Flowplan fills existing properties after processing: date, attendees (person), duration (number, minutes) and status (an option such as "Done").

**From the journal**: the meeting note of a journal day's event ends with a meeting block holding the event's title, date and attendees.

**Settings → Workspace → Meetings** (owners):

- **Instructions**: the default for new blocks.
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

Answer `202 { id, pageId, rowId, status: "transcribing", statusUrl }`. `GET /api/meetings/{id}?content=1` returns the status, the summary (Markdown), the agenda and the transcript. Instead of audio you can send `transcript` as text (one passage per line, optionally `Name: text`). When the workspace requires consent, send `consent=true`. More: `POST /api/meetings/{id}/summarize` (summarise again), `POST /api/meetings/{id}/ask`.

MCP: **`create_meeting_note`** (audio as base64 in `audio` or `me` + `others`, or `transcript`; target `pageId` or `databaseId`) and **`get_meeting_note`** – only with a write token that has "AI and transcription".

Environment: `FLOWPLAN_AI_TOKENS=off` switches the token permission off by default (until an administrator saves the AI settings).
