---
keywords: Besprechung, Meeting, Protokoll, Transkript, Aufnahme, Zoom, Teams
---

# Besprechungen

Tippe **/meet** (oder **/besprechung**) in einem Dokument oder im Dokument eines Datensatzes. Der Block nimmt eine Besprechung auf, schreibt das Transkript mit und fasst sie danach automatisch zusammen.

**Kopf des Blocks**

- **Termin ▾**: Ein kleines Menü am Kalendersymbol zeigt die Termine des Tages aus deinen Kalendern – Kalender-Datenbanken (mit Kalenderansicht, auch aus Google oder Microsoft 365 synchronisierte) und Kalender-Abos –, nach Kalender gruppiert, mit der Uhrzeit vorn. Datierte Einträge anderer Datenbanken (etwa ein Sync-Protokoll oder Aufgaben) stehen nur unter **Weitere Einträge dieses Tages**. Ein Termin übernimmt Titel, Datum und Teilnehmende.
- **Titel** (Standard „Neue Besprechung“), **Datum** als Datums-Erwähnung, **Teilnehmende** (+): Das Plus öffnet eine Suche – tippe einen Namen oder eine E-Mail-Adresse, wähle mit ↑ ↓ und Enter. Mitglieder werden zu Erwähnungen; passt niemand, fügt die letzte Zeile **Gast „…“ hinzufügen** die Person mit ihrem Namen hinzu.
- **Ganze Seite** vergrößert den Block. **Einstellungen** (Zahnrad) öffnet ein Menü – auf dem Handy von unten:
  - **Weiter aufnehmen** (roter Punkt), **Zusammenfassung neu erstellen**, **Erneut transkribieren** (solange das Audio aufbewahrt wird),
  - **Sprache** der Besprechung (für Transkription und Zusammenfassung; *Automatisch* = Sprache der Oberfläche), **Anweisungen** (Vorlagen oder *Eigene Anweisung …* mit eigenem Text), **Einwilligung** (vor der Aufnahme bestätigen, Hinweistext, Hinweis abspielen – gilt für den ganzen Arbeitsbereich), **Aufnahme hochladen …**, **Eine gemeinsame Tonspur** (wenn der Ton der Besprechung mit aufgenommen wird),
  - **Link zur Besprechung kopieren**,
  - **Audio jetzt löschen …** und **Transkript löschen …** (rot, mit Rückfrage; das Transkript lässt sich mit ++⌘ Z++ / ++Strg Z++ zurückholen).

  Menüs und Auswahllisten liegen über dem Inhalt; der Block verschiebt sich nicht. Escape schließt sie, der Fokus kehrt zum Knopf zurück.

**Drei Reiter**

- **Zusammenfassung**: immer in derselben Reihenfolge – zuerst die **Aufgaben** als „Person: Aufgabe“: echte Aufgaben zum Abhaken, mit Fälligkeit, wenn eine genannt wurde. Zuständig ist nur, wer in der Besprechung (oder in den Notizen) ausdrücklich genannt wurde – Flowplan rät nie; sonst steht „Zuständig: unklar“ da. Ist die genannte Person Mitglied und darf die Seite lesen, wird sie erwähnt; die Aufgabe erscheint dann in ihren **Meinen Aufgaben** (mit Benachrichtigung). Danach die **Entscheidungen** (mit Begründung darunter, wenn eine genannt wurde), die **offenen Fragen** (mit ihrem Zusammenhang) und zuletzt die **Zusammenfassung nach Themen**.
- **Notizen** (früher „Agenda“): deine eigenen Notizen – vor, während und nach der Besprechung, jederzeit bearbeitbar. Die Zusammenfassung bezieht sie ein.
- **Transkript**: jede Passage mit Uhrzeit und Sprecher. Es ist **gesperrt**, damit Lesen, Markieren und Kopieren nichts verändert. **Transkript bearbeiten** (Schloss) schaltet es frei: Korrigierte Passagen bekommen ein ✎, und Flowplan merkt sich, dass du sie korrigiert hast. Freigeschaltet gibt es **Suchen und ersetzen** über das ganze Transkript (z. B. „Mayr“ → „Maier“), mit **Ins Glossar aufnehmen**, damit die Spracherkennung den Namen künftig richtig schreibt (nur Eigentümer). Zeilen, die die Spracherkennung in Stille oder Rauschen erfindet („Untertitel im Auftrag des ZDF“, „Thanks for watching“, „Sous-titres réalisés par …“, ein allein stehendes „Vielen Dank.“, dieselbe Zeile viele Male hintereinander), werden als *keine Sprache* markiert, ausgeblendet und nicht zusammengefasst – gelöscht wird nichts: **N ausgeblendete Zeilen anzeigen** zeigt sie.

**Quellen ①②③**: Jeder Punkt der Zusammenfassung endet mit nummerierten Chips. Eine Nummer steht für eine Passage des Transkripts und wird überall wiederverwendet, wo diese Passage zitiert wird; die Nummern zählen pro Besprechung in der Reihenfolge ihres ersten Auftretens. Jeder Punkt nennt höchstens drei Passagen – die, die ihn am besten belegen. Beim Darüberfahren erscheint die Passage, ein Klick öffnet das Transkript an dieser Stelle (und spielt das Audio dort ab, wenn es aufbewahrt wurde).

**Aufnehmen**

- **Aufnahme starten**, **Pause**, **Fortsetzen**, **Beenden** (fragt einmal „Besprechung beenden?“ – danach wird transkribiert und zusammengefasst). Während der Aufnahme zeigt je Quelle (Mikrofon, Systemton) eine kleine **Pegelanzeige**, ob Ton ankommt; bleibt eine Quelle über 30 Sekunden still, während die andere Ton hat (stummes oder falsches Mikrofon, Tab ohne geteilten Ton), weist der Block darauf hin. **Weiter aufnehmen** (im Menü) setzt eine Besprechung später fort – das Transkript wird fortgeschrieben. Endete eine Aufnahme unerwartet (Fenster geschlossen, Verbindung weg), bietet der Block **Fortsetzen** an.

Welcher Ton aufgenommen wird, hängt davon ab, wo du aufnimmst:

::: tabs
== Desktop-App
In der **Desktop-App** (Windows 10+, macOS 13+) werden Mikrofon und **Systemton** als zwei getrennte Spuren aufgenommen: Das Mikrofon bist du (dein Name), der Systemton sind die anderen („Andere“). Mit `WHISPER_DIARIZE=on` und einem Dienst, der Sprecher trennt, werden die anderen weiter unterschieden („Andere 1“, „Andere 2“). macOS fragt einmal nach der Berechtigung „Bildschirm- & Systemaudioaufnahme“; fehlt sie, nimmt Flowplan nur das Mikrofon auf und sagt, wo sie sich einschalten lässt.
== Browser
Im **Browser** nimmt **Aufnahme starten** das Mikrofon auf (alle im Raum auf einer Spur); in Chrome und Edge weist der Block vorher darauf hin. In **Chrome und Edge** nimmt **Alle Teilnehmenden aufnehmen** zusätzlich den Ton eines Tabs oder des Bildschirms auf: Im Freigabedialog den Tab der Videokonferenz (oder den Bildschirm) wählen und den Haken zum Teilen des Tons setzen (bei einem Tab „Tab-Audio teilen“); das Bild verwirft Flowplan sofort. Firefox und Safari geben dabei keinen Ton weiter – dort (und für den Ton anderer Programme) die Desktop-App nutzen.
== Mobile Apps
Die Apps für iPhone, iPad und Android nehmen nur das Mikrofon auf.
:::

- **Kopfhörer** sind am besten. Mit Lautsprechern hört das Mikrofon die anderen mit; Flowplan entfernt solche doppelten Passagen aus der Mikrofonspur (gleiche Zeit, nahezu gleicher Text).
- **Eine gemeinsame Tonspur** (Menü): Mikrofon und Ton der Besprechung werden zu einer Spur gemischt statt getrennt aufgenommen. Sprecher unterscheidet dann nur noch der Whisper-Dienst (`WHISPER_DIARIZE=on`); Standard bleiben getrennte Spuren.
- Die Aufnahme geht in 30-Sekunden-Stücken an den Server; bricht die Verbindung ab, bleiben die Stücke im Browser und werden nachgereicht. Bis zu 3 Stunden pro Besprechung. Der Server transkribiert die Stücke schon **während der Aufnahme** – nach dem Beenden bleiben nur das letzte Stück und die Zusammenfassung, das Ergebnis ist also viel schneller da. Klappt das nicht (anderes Format, Dienst kurz weg), wird die ganze Aufnahme am Ende transkribiert; das Audio geht dabei nie verloren.
- **Aufnahme hochladen …** (Menü): M4A, MP3, WAV, AAC oder WebM – eine Datei mit allen oder zwei Dateien (zuerst das Mikrofon, dann der Ton der Besprechung).

**Nach der Aufnahme**: Der Block wird ruhig – kein großer Knopf mehr, nur eine Zeile wie „41:21 aufgenommen · transkribiert · zusammengefasst“. Schlägt die Verarbeitung fehl, steht dort die Fehlermeldung mit **Erneut verarbeiten**; das verarbeitet nur, was fehlt – eine Spur, die schon transkribiert war, wird nicht noch einmal geschickt. Admins der Instanz sehen darunter die genaue Ursache (etwa „no answer within 504 s“, „ECONNREFUSED“ oder die Antwort des Whisper-Dienstes). **Erneut transkribieren** (Menü, nur solange das Audio aufbewahrt wird) schickt die Aufnahme noch einmal an die Spracherkennung, etwa nach einer Ergänzung des Glossars oder einer Änderung am Whisper-Dienst, und schreibt danach die Zusammenfassung neu; die vorige bleibt im Versionsverlauf der Seite. Gibt es korrigierte Passagen, fragt Flowplan, ob sie **behalten** (Standard) oder **ersetzt** werden.

**Zusammenfassung**: entsteht nach dem Beenden in der Sprache der Besprechung, mit dem KI-Anbieter deiner Instanz. Sie braucht mindestens eine Minute Aufnahme und liest Transkript **und Notizen** – auch Notizen, die du nach der Besprechung ergänzt: **Zusammenfassung neu erstellen** nimmt immer den aktuellen Stand. **Anweisungen**: Automatisch, Statusmeeting, 1:1-Gespräch, Workshop, Kundengespräch oder eine eigene Anweisung. **Zusammenfassung neu erstellen** nutzt andere Anweisungen, ohne erneut zu transkribieren. **Frag diese Besprechung** beantwortet Fragen nur aus Transkript und Notizen dieses Blocks, mit Quellen-Chips.

**In einer Datenbank**: Liegt der Block im Dokument eines Datensatzes (z. B. einer Datenbank „Besprechungen“), füllt Flowplan nach der Verarbeitung vorhandene Eigenschaften: Datum, Teilnehmende (Person), Dauer (Zahl, in Minuten) und Status (eine Auswahl wie „Erledigt“).

**Aus dem Journal**: Die Besprechungsnotiz zu einem Termin eines Journaltags enthält am Ende einen Besprechungsblock mit Titel, Datum und Teilnehmenden des Termins.

**Einstellungen → Arbeitsbereich → Besprechungen** (Eigentümer):

- **Anweisungen**: Standard für neue Blöcke.
- **Vokabular → Glossar**: Namen, Abkürzungen und Fachbegriffe, die die Spracherkennung richtig schreiben soll – einer pro Zeile oder durch Kommas getrennt. Flowplan gibt sie zusammen mit dem `WHISPER_PROMPT` der Instanz als Hinweis an Whisper weiter; Whisper liest davon nur rund 224 Token (etwa 550 Zeichen), der Rest wird nach dem letzten ganzen Begriff abgeschnitten.
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

Antwort `202 { id, pageId, rowId, status: "transcribing", statusUrl }`. `GET /api/meetings/{id}?content=1` liefert Status, Zusammenfassung (Markdown), `agenda` (im Block „Notizen“) und Transkript. Statt Audio geht auch `transcript` als Text (eine Passage pro Zeile, optional `Name: Text`). Verlangt der Arbeitsbereich eine Einwilligung, braucht es `consent=true`. Weitere Endpunkte: `POST /api/meetings/{id}/summarize` (neu zusammenfassen), `POST /api/meetings/{id}/retranscribe` (aufbewahrtes Audio erneut transkribieren; `{"dryRun": true}` zählt nur die korrigierten Passagen, `{"force": true}` ersetzt auch sie), `POST /api/meetings/{id}/ask`. Im Transkript (`content=1`) tragen Passagen `hallucination` (keine Sprache) und `edited` (korrigiert); `errorDetail` sehen nur Admins der Instanz.

MCP: **`create_meeting_note`** (Audio als Base64 in `audio` oder `me` + `others`, oder `transcript`; Ziel `pageId` oder `databaseId`) und **`get_meeting_note`** – nur mit einem Schreib-Token mit „KI und Transkription“.

Umgebung: `FLOWPLAN_AI_TOKENS=off` schaltet diese Berechtigung für Tokens standardmäßig ab (bis ein Admin die KI-Einstellungen speichert).
