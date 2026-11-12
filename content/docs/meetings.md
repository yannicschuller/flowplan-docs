---
keywords: Besprechung, Meeting, Protokoll, Transkript, Aufnahme, Zoom, Teams
---

# Besprechungen

Tippe **/meet** (oder **/besprechung**) in einem Dokument oder im Dokument eines Datensatzes. Der Block nimmt eine Besprechung auf, schreibt das Transkript mit und fasst sie danach automatisch zusammen.

**Kopf des Blocks**

- **Termin ▾**: übernimmt Titel, Datum und Teilnehmende eines Termins aus deinen Kalender-Datenbanken (auch aus Google oder Microsoft 365 synchronisierte).
- **Titel** (Standard „Neue Besprechung“), **Datum** als Datums-Erwähnung, **Teilnehmende** (+): Mitglieder werden zu Erwähnungen, andere Personen stehen mit Namen da.
- **Ganze Seite** vergrößert den Block, **Einstellungen** (Zahnrad): Anweisungen, Aufnahme hochladen, Zusammenfassung neu erstellen, aufbewahrtes Audio löschen.

**Drei Reiter**

- **Zusammenfassung**: zuerst die **Aufgaben** – echte Aufgaben zum Abhaken, mit zuständiger Person und Fälligkeit. Ist die Person Mitglied und darf die Seite lesen, wird sie erwähnt; die Aufgabe erscheint dann in ihren **Meinen Aufgaben** (mit Benachrichtigung). Danach die **Themen** (jeweils als ### Abschnitt) und die **offenen Punkte**.
- **Agenda**: deine eigenen Notizen – vor, während und nach der Besprechung. Sie fließen in die Zusammenfassung ein.
- **Transkript**: jede Passage mit Uhrzeit und Sprecher.

**Quellen ①②③**: Jeder Punkt der Zusammenfassung endet mit nummerierten Chips. Eine Nummer steht für eine Passage des Transkripts und wird überall wiederverwendet, wo diese Passage zitiert wird; die Nummern zählen pro Besprechung in der Reihenfolge ihres ersten Auftretens. Beim Darüberfahren erscheint die Passage, ein Klick öffnet das Transkript an dieser Stelle (und spielt das Audio dort ab, wenn es aufbewahrt wurde).

**Aufnehmen**

- **Aufnahme starten**, **Pause**, **Fortsetzen**, **Beenden**. **Weiter aufnehmen** setzt eine Besprechung später fort – das Transkript wird fortgeschrieben.
- In der **Desktop-App** (Windows 10+, macOS 13+) werden Mikrofon und **Systemton** als zwei getrennte Spuren aufgenommen: Das Mikrofon bist du (dein Name), der Systemton sind die anderen („Andere“). Mit `WHISPER_DIARIZE=on` und einem Dienst, der Sprecher trennt, werden die anderen weiter unterschieden („Andere 1“, „Andere 2“). macOS fragt einmal nach der Berechtigung „Bildschirm- & Systemaudioaufnahme“; fehlt sie, nimmt Flowplan nur das Mikrofon auf und sagt, wo sie sich einschalten lässt.
- **Kopfhörer** sind am besten. Mit Lautsprechern hört das Mikrofon die anderen mit; Flowplan entfernt solche doppelten Passagen aus der Mikrofonspur (gleiche Zeit, nahezu gleicher Text).
- Im **Browser** und in den Apps wird nur das Mikrofon aufgenommen (alle im Raum auf einer Spur).
- Die Aufnahme geht in 30-Sekunden-Stücken an den Server; bricht die Verbindung ab, bleiben die Stücke im Browser und werden nachgereicht. Bis zu 3 Stunden pro Besprechung.
- **Aufnahme hochladen** (Einstellungen): M4A, MP3, WAV, AAC oder WebM – eine Datei mit allen oder zwei Dateien (zuerst das Mikrofon, dann der Ton der Besprechung).

**Zusammenfassung**: entsteht nach dem Beenden in der Sprache der Besprechung, mit dem KI-Anbieter deiner Instanz. Sie braucht mindestens eine Minute Aufnahme. **Anweisungen**: Automatisch, Statusmeeting, 1:1-Gespräch, Workshop, Kundengespräch oder eine eigene Anweisung. **Zusammenfassung neu erstellen** nutzt andere Anweisungen, ohne erneut zu transkribieren. **Frag diese Besprechung** beantwortet Fragen nur aus Transkript und Agenda dieses Blocks, mit Quellen-Chips.

**In einer Datenbank**: Liegt der Block im Dokument eines Datensatzes (z. B. einer Datenbank „Besprechungen“), füllt Flowplan nach der Verarbeitung vorhandene Eigenschaften: Datum, Teilnehmende (Person), Dauer (Zahl, in Minuten) und Status (eine Auswahl wie „Erledigt“).

**Aus dem Journal**: Die Besprechungsnotiz zu einem Termin eines Journaltags enthält am Ende einen Besprechungsblock mit Titel, Datum und Teilnehmenden des Termins.

**Einstellungen → Arbeitsbereich → Besprechungen** (Eigentümer):

- **Anweisungen**: Standard für neue Blöcke.
- **Audio aufbewahren**: *Nach dem Transkript löschen* (Standard), *Nach einigen Tagen löschen* oder *Behalten*. Aufbewahrtes Audio zählt zum Speicher.
- **Einwilligung erforderlich** mit eigenem **Hinweistext**: Vor der Aufnahme erscheint der Hinweis mit „Alle, die transkribiert werden, haben zugestimmt“; **Einwilligungshinweis abspielen** liest ihn vor. Wer zugestimmt hat, wird gespeichert.

**Wer was darf**: Wer die Seite lesen darf, sieht den Block – Gäste also nur auf mit ihnen geteilten Seiten. Aufnehmen und Verarbeiten braucht Bearbeitungsrechte. Gesperrte Seiten, Journale mit PIN (gesperrt) und Ende-zu-Ende-verschlüsselte Bereiche: keine Aufnahme (der Server würde das Audio hören). Transkription braucht `WHISPER_URL`, die Zusammenfassung die KI der Instanz; beides verlässt nie deinen Server bzw. deinen konfigurierten Anbieter.

## API und MCP

Für API-Tokens gibt es die Berechtigung **„KI und Transkription“** (Einstellungen → API & KI-Assistenten, beim Erstellen eines Tokens; standardmäßig aus). Nur Tokens mit dieser Berechtigung erreichen KI-Funktionen (`/api/ai/run`, `ask`, `write`, `summarize`), die Transkription (`/api/transcribe`) und Besprechungen. Die Administration kann die Berechtigung für die ganze Instanz abschalten (Administration → KI → „API-Tokens mit ‚KI und Transkription‘“). Anfragen zählen gegen dieselben KI-Grenzen wie die Oberfläche.

```bash
curl -X POST https://flowplan.example/api/meetings \
  -H "Authorization: Bearer fp_…" \
  -F pageId=<Seiten-ID> \        # oder databaseId=<Datenbank-ID>
  -F title="Kick-off" -F date=2026-11-11 \
  -F attendees='["Ben","anna@example.org"]' \
  -F instructions=status \
  -F me=@mikrofon.webm -F others=@systemton.webm   # oder -F audio=@alle.m4a
```

Antwort `202 { id, pageId, rowId, status: "transcribing", statusUrl }`. `GET /api/meetings/{id}?content=1` liefert Status, Zusammenfassung (Markdown), Agenda und Transkript. Statt Audio geht auch `transcript` als Text (eine Passage pro Zeile, optional `Name: Text`). Verlangt der Arbeitsbereich eine Einwilligung, braucht es `consent=true`. Weitere Endpunkte: `POST /api/meetings/{id}/summarize` (neu zusammenfassen), `POST /api/meetings/{id}/ask`.

MCP: **`create_meeting_note`** (Audio als Base64 in `audio` oder `me` + `others`, oder `transcript`; Ziel `pageId` oder `databaseId`) und **`get_meeting_note`** – nur mit einem Schreib-Token mit „KI und Transkription“.
