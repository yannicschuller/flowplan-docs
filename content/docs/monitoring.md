---
keywords: Überwachung, Monitoring, Statistik, Warnung, Webhook, Prometheus, Grafana, Wartung, Fehler-ID, Neustart, Absturz, OOM
new: fehler-im-detail 2026-11-17, neustarts 2026-11-18
---

# Überwachung und Wartung

Die Instanz live beobachten: Kennzahlen, Statistik, Warnungen per Webhook, Wartungshinweise und Prometheus.

## Administration → Überwachung

**Administration → Überwachung** zeigt die Instanz live – alle 15 Sekunden aktualisiert, pausiert, solange der Tab im Hintergrund liegt:

- **Zustand**: Datenbank, Dateispeicher (mit Belegung des Datenträgers), S3-Spiegel, Sicherung, E-Mail, KI-Anbieter (erreichbar und Antwortzeit, höchstens alle fünf Minuten geprüft), Push-Relay (erreichbar, höchstens jede Minute geprüft, siehe [Push-Benachrichtigungen](/administration#push-benachrichtigungen)), Hintergrunddienste und Aktualisierung. Jede Kachel führt zum zuständigen Bereich.
- **Kennzahlen**: fünf Kacheln in einer Reihe, jede mit Wert und kleinem Verlauf; Speicher, KI-Tokens und Fehler vergleichen mit dem Zeitraum davor, sobald er erfasst ist: **Aktiv 24 Std.** (dazu gerade aktiv und seit Mitternacht), **Speicher** (Veränderung in 7 Tagen, mit Belegung des Datenträgers), **Zustellungen 7 Tage** (dazu aufgegebene), **KI-Tokens 14 Tage** (zur Vorwoche) und **Fehler 24 Std.** (5xx, zum Vortag, mit Fehlerquote). Jede Kachel springt zu ihrer Karte.
- **Diagramme**: über die volle Breite **Anfragen & Fehler** (5xx) – 1 Stunde, 24 Stunden oder 7 Tage, mit Anfragen pro Minute und p95-Antwortzeit –, darunter die Karten in zwei Spalten (auf schmalen Bildschirmen in einer): **Aktive Personen** je Stunde (7 Tage), **Anmeldungen** erfolgreich und fehlgeschlagen je Tag (14 Tage), **Abgewiesene Anfragen**, **Speicher** nach Art und die größten Arbeitsbereiche, **Zustellungen** (Webhooks, Push, E-Mail) je Tag und **KI-Nutzung** (Tokens je Tag und je Funktion). Jedes Diagramm zeigt beim Zeigen, Tippen oder mit den Pfeiltasten die Werte und hat **Als Tabelle**.
- **Warteschlangen**: was gerade auf Bearbeitung wartet – Suchindex, E-Mail-Warteschlange, Push-Zustellung, KI-Felder und KI-Suchindex, S3-Upload, Webhooks in Wiederholung.
- **Ereignisse**: Fehler, Warnungen und Hinweise der letzten 14 Tage, filterbar.
- **Schnellzugriff**: **Jetzt sichern**, **KI-Anbieter prüfen**, **Warnungen prüfen**, **Testwarnung**, der Weg zu Wartung & Hinweise und das Aktivitätsprotokoll als CSV.
- Darunter **Hintergrunddienste**, **Instanz in Zahlen** (Größe von Datenbank und Uploads, Versionen, Laufzeit, Demos …), **Warnungen per Webhook** und **Statistik**.

Im Einzelnen:

- **Abgewiesene Anfragen**: fehlgeschlagene Anmeldungen, Anfragen, die ein Limit mit 429 abgewiesen hat (Anmeldeversuche, Einladungen, KI, MCP, Formulare …), und anonyme Uploads über dem Tagesbudget (Formulare, Freigabelinks) – je Tag der letzten 14 Tage. Ein Anstieg deutet auf Angriffe oder zu knappe Grenzen. Die Zähler werden 35 Tage aufbewahrt und täglich aufgeräumt.
- **Hintergrunddienste**: letzter Lauf und letzter Fehler von Sicherung, Markdown-Export, KI-Hintergrundarbeit, Kalender- und Issue-Synchronisierung und LDAP-Abgleich; „aus“ heißt nicht eingerichtet.
- **Speicher**: Belegung nach Art und die größten Arbeitsbereiche mit Balken gegen das Kontingent (ab 80 % gelb, ab 95 % rot). Kontingente stellst du unter **Administration → Arbeitsbereiche** und **Administration → Grenzen & Aufbewahrung** ein.
- **Zustellungen**: zugestellte Webhooks, Push-Nachrichten und E-Mails je Tag; Wartendes, Aufgegebenes und die letzten Fehler stehen unter **Warteschlangen**. Von Webhook-Adressen erscheint nur der Host, nie Pfad oder Token.

### Fehler im Detail {since=0.10.0}

Unter dem Fehlerdiagramm zeigt **Fehler im Detail**, woher die Fehler (5xx) kommen – je Art eines Fehlers eine Zeile mit Route oder Befehl (etwa `POST /api/command · row.update`), Fehlername und kurzer Meldung, Anzahl und Verlauf im gewählten Zeitraum und wann er zuletzt auftrat; sortiert nach zuletzt aufgetreten oder Anzahl. Ein Klick ins Fehlerdiagramm zeigt nur die Fehler dieses Zeitabschnitts. Die Kachel **Fehler 24 Std.** springt hierher.

Aufgeklappt stehen die **Stelle im Code** (die obersten Stack-Frames in Flowplans eigenem Code, zum Kopieren) und die letzten 20 **Vorkommen** mit Zeit, Fehler-ID, Status, Instanz (im Cluster), Version und Rolle. **Kopieren für ein Issue** kopiert einen Bericht als Text, ohne persönliche Daten. Im Docker-Image stehen kompilierte Dateien und Funktionsnamen da; Quelldateien mit Zeile nur, wenn die Source-Maps des Builds daneben liegen. **Zurücksetzen** löscht alle Fehlerdetails; die Zählung im Diagramm bleibt.

Jede Antwort trägt eine **Fehler-ID** in der Kopfzeile `X-Request-Id`, bei einem Fehler auch im JSON (`requestId`). Die App zeigt sie in der Meldung „Auf dem Server ist etwas schiefgelaufen“ als „Fehler-ID: …“ – damit findest du das Vorkommen.

Erfasst werden Antworten ab 500, Fehler von Hintergrunddiensten und -aufträgen und fehlgeschlagene MCP-Werkzeuge, auch bei ausgeschalteter Statistik. Gespeichert sind nur Route als Muster (ohne IDs und Query), Befehl, Status, Fehlername, die Meldung (höchstens 500 Zeichen; Schlüssel, Token, Passwörter, E-Mail- und IP-Adressen sowie IDs ausgeblendet), Stack-Frames, Datenbank-Fehlercode, Fehler-ID, Instanz, Version und Rolle (Administration, Mitglied, Gast, nicht angemeldet, API-Token, MCP). Nie gespeichert: IP-Adressen, Inhalte von Anfragen, Kopfzeilen oder wer es war. Aufbewahrt werden 14 Tage und höchstens 500 Fehlerarten.

### Neustarts {since=0.10.0}

Startet der Container neu, ohne dass ein Fehler zu sehen war, hilft **Neustarts** unter **Administration → Überwachung** hinterher: Jeder Neustart der letzten 30 Tage steht da mit Zeitpunkt, wie lange Flowplan davor lief, dem Grund und dem Speicher beim letzten Lebenszeichen (Prozess bzw. Container gegen seine Grenze).

| Grund | Bedeutet |
| --- | --- |
| Sauber beendet | Flowplan bekam SIGTERM oder SIGINT und fuhr geordnet herunter – ein Update, `docker stop`, ein Neustart. |
| Absturz | Ein Fehler hat den Prozess beendet; der Fehler mit Stack steht dabei. |
| Vermutlich Speicher voll | Beim letzten Lebenszeichen war der Speicher bei mindestens 90 % der Grenze des Containers (oder des JavaScript-Heaps), oder der Container meldet einen OOM-Kill, oder auf dem ganzen Server waren höchstens 5 % des Speichers frei. |
| Ohne Spur beendet | Weder Signal noch Fehler: etwa `SIGKILL` nach einem fehlgeschlagenen Healthcheck, durch den Host oder `kill -9`, ein Stromausfall – oder ein OOM-Kill, der keine Spur hinterließ. |

Aufgeklappt zeigt ein unerwarteter Neustart die letzten 200 Zeilen des Server-Logs vor dem Ende – Flowplans eigene Ausgabe und die von Litestream – als Text zum Durchscrollen; **Als .txt herunterladen** speichert sie mit Grund und Speicher. Ein sauberer Neustart ist nur ein kurzer Eintrag ohne Zeilen.

So funktioniert es: Flowplan schreibt alle 30 Sekunden ein Lebenszeichen (Zeit, Laufzeit, Speicher des Prozesses und die Grenze des Containers aus cgroup v2 oder v1) nach `/app/data/logs/` und beim Herunterfahren, ob es sauber war. Der nächste Start liest das und trägt den Neustart ein. Daneben liegt das Server-Log: je Container zwei Dateien mit zusammen etwa 2.000 Zeilen (je höchstens 1 MB), für Litestream ebenso (`litestream.log`). Die Ausgabe im Container-Log (`docker logs`) bleibt, wie sie war.

**Geschwärzt** wird, bevor eine Zeile auf die Platte kommt: die Werte von Umgebungsvariablen, deren Name `TOKEN`, `SECRET`, `PASSWORD` oder `KEY` enthält (S3-Schlüssel, Verschlüsselungsschlüssel, Passwörter …), Bearer-Token, Zugangsdaten in Adressen (`https://name:passwort@…`), `password=…` und Ähnliches, E-Mail- und IP-Adressen. Inhalte von Seiten schreibt Flowplan nicht ins Log.

Aufbewahrt werden die Einträge 30 Tage. Im Cluster trägt jede Instanz ihre eigenen Neustarts ein; teilen sich mehrere Container einen Datenordner, tragen die Dateien den Namen ihres Containers (`FLOWPLAN_INSTANCE_ID` oder Hostname). `FLOWPLAN_LOG_FILE=off` schaltet das Log auf der Platte ab – die Neustarts stehen dann ohne Zeilen da.

Ein **Absturz** oder **zwei unerwartete Neustarts innerhalb einer Stunde** sind ein Vorfall: einmal je Vorfall gehen eine Warnung per Webhook (`ops.unexpected_restart`) und eine Nachricht an die Chat-Apps der Administratoren, die Kachel **Überwachung** auf der Startseite der Administration zeigt ihn einen Tag lang, und das Aktivitätsprotokoll hält ihn fest.

> [!NOTE]
> **Grenzen der OOM-Erkennung:** Beendet der Kernel den Prozess wegen Speichermangels, kann Flowplan nichts mehr schreiben. „Vermutlich Speicher voll“ ist deshalb eine Vermutung aus dem letzten Lebenszeichen – bis zu 30 Sekunden alt, ein schneller Anstieg danach bleibt unsichtbar – oder aus dem OOM-Zähler des Containers, den Docker und Kubernetes bei einem Neustart meist zurücksetzen. Sicher sagen es `docker inspect --format '{{.State.OOMKilled}}' <container>` bzw. `kubectl describe pod` („OOMKilled“). Ohne Speichergrenze am Container zählen der JavaScript-Heap und der freie Speicher des ganzen Servers – ist er voll, beendet der Kernel irgendeinen Prozess, etwa Litestream; dann steht `Killed process … (litestream)` in `dmesg`. Und weil Litestream im Container der erste Prozess ist, kann seine allerletzte Zeile beim Beenden in der Datei fehlen.

### Statistik

Für die Diagramme zählt Flowplan Anfragen, Fehler und Antwortzeiten je Minute, aktive Personen je Stunde, Speicher je Tag und KI-Tokens je Funktion – nur Zahlen, ohne IP-Adressen, Pfade, Browserkennungen oder Namen. Wer aktiv war, steht nur für die laufende Stunde im Arbeitsspeicher, damit jede Person einmal zählt. Erfolgreiche Anmeldungen werden mit Zeitpunkt (ohne Person) gezählt. KI-Tokens stammen vom Anbieter, wo er sie meldet, sonst sind sie geschätzt (vier Zeichen je Token).

| Auflösung | Aufbewahrung |
| --- | --- |
| Minuten | 48 Stunden |
| Stunden | 35 Tage |
| Tage (Speicher, KI-Tokens) | 400 Tage |

Ausschalten lässt sich die Statistik unter **Administration → Überwachung → Statistik** (**Nutzungsstatistik erfassen**) oder für die ganze Instanz mit `FLOWPLAN_METRICS=off` (siehe [Konfiguration](/configuration#betrieb)); dann ist der Schalter gesperrt. **Statistik löschen** entfernt alle gezählten Anfragen, aktiven Personen, Speicherstände, KI-Tokens und erfolgreichen Anmeldungen; die Zähler der abgewiesenen Anfragen bleiben.

### Warnungen per Webhook

Unter **Administration → Überwachung → Warnungen per Webhook** trägst du eine `https://`-Adresse ein (mit `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` auch `http://` und interne Adressen) und wählst die Ereignisse:

| Ereignis | Wann |
| --- | --- |
| Backup fehlgeschlagen | Die letzte geplante Sicherung endete mit einem Fehler. |
| Speicher > 90 % | Ein Arbeitsbereich mit Kontingent ist zu mehr als 90 % belegt. |
| Worker-Fehler | Ein eingerichteter Hintergrunddienst meldete in den letzten 24 Stunden einen Fehler. |
| Viele fehlgeschlagene Anmeldungen | 50 oder mehr fehlgeschlagene Anmeldungen in einer Stunde. |
| Sicherheitsvorfälle | Sofort bei jedem neuen Vorfall der [Erkennungsregeln](/security-monitoring#erkennungsregeln) (`ops.security`, mit `rule` und `severity`). |
| Litestream-Replik hängt | Sofort, einmal je Vorfall: Die [Litestream-Replik im Bucket hängt](/storage-and-backups#litestream-zustand-reparieren) (`ops.litestream_stuck`). {since=0.10.0} |
| Unerwartete Neustarts | Sofort, einmal je Vorfall: ein Absturz oder zwei unerwartete [Neustarts](#neustarts) innerhalb einer Stunde (`ops.unexpected_restart`). {since=0.10.0} |

Flowplan prüft alle zehn Minuten und sendet je Ereignis höchstens **eine Nachricht pro Tag** als `POST` mit JSON:

```json
{ "event": "ops.storage_high", "title": "Speicher > 90 %", "detail": "Agentur: 93 %", "instance": "Flowplan", "url": "https://flowplan.example.org", "at": "2026-10-22T08:10:00.000Z" }
```

Die Kopfzeile `X-Flowplan-Signature: sha256=<HMAC-SHA256 des Inhalts>` ist mit dem angezeigten **Signaturschlüssel** gebildet, `X-Flowplan-Event` nennt das Ereignis. **Test senden** schickt sofort `ops.test`, **Jetzt prüfen** prüft außer der Reihe, **Neuer Schlüssel** erzeugt einen neuen Signaturschlüssel. Die letzten gesendeten Warnungen stehen mit Antwortcode darunter. Eine leere Adresse schaltet die Warnungen aus.

### Wartung & Hinweise

Unter **Administration → Wartung & Hinweise** stehen zwei Banner und die Banner zum Wegklicken. Der **Hinweis für alle Personen** – etwa „Ab Montag gilt die neue Ablage“ – bleibt, bis du das Feld leerst. Ein **Wartungshinweis** mit Text, Beginn und Ende erscheint ab dem Speichern allen angemeldeten Personen als Banner oben im Fenster – vor dem Beginn als „Geplante Wartung“, währenddessen als „Wartung läuft“, in Zeitzone und Sprache der jeweiligen Person. Nach dem Ende verschwindet er von selbst, auch in schon geöffneten Fenstern (sie fragen alle fünf Minuten nach). Jede Person kann den Hinweis für sich ausblenden. **Hinweis entfernen** nimmt ihn sofort zurück. Speichern und Entfernen stehen im Aktivitätsprotokoll.

#### Banner zum Wegklicken

Für Neuigkeiten, die jede Person nur einmal sehen soll – etwa „Flowplan gibt es jetzt als App“ oder euer Discord-Server –, legt **Neuer Banner** einen Banner an, den jede Person sieht, bis sie ihn schließt oder seinem Link folgt. Danach erscheint er für sie nie wieder, auf keinem Gerät; wer Flowplan das nächste Mal öffnet, sieht ihn oben im Fenster.

- **Inhalt:** optionale **Überschrift** (fett), **Text** (höchstens 300 Zeichen) und ein optionaler **Link** mit eigener Beschriftung – eine `https://`-Adresse (öffnet in einem neuen Tab) oder eine Seite dieser Instanz (`#…` oder `/…`). Die **Vorschau** zeigt ihn beim Schreiben.
- **Farbe:** Hinweis (blau), Werbung (Akzent), Neuigkeit (grün) oder Wichtig (gelb).
- **Wer und wo:** alle Personen oder nur Administratoren; überall oder **nur im Browser** – dann nicht in der Desktop-App und den Apps, etwa wenn er für die Apps wirbt.
- **Zeitraum:** optional **Ab** und **Bis**; ohne Angaben gilt er sofort und bis du ihn beendest.
- **Vorlagen** füllen das Formular für die Apps (Link zu flowplan.org/download, nur im Browser) oder für Discord vor.

Die Liste zeigt jeden Banner mit Zustand (wird angezeigt, geplant, pausiert, beendet) und wie viele ihn geschlossen haben und wie viele dem Link gefolgt sind. **Pausieren** blendet ihn aus, ohne die Zahlen zu verlieren; **Wieder anzeigen** zeigt ihn allen noch einmal, auch denen, die ihn schon geschlossen haben; **Löschen** entfernt ihn samt Zahlen sofort für alle. Höchstens drei Banner erscheinen gleichzeitig, die neuesten zuerst. Anlegen, Ändern und Löschen stehen im Aktivitätsprotokoll.

### Speicherübersicht

**Administration → Speicher & Sicherung** zeigt in den Karten **Sicherungen**, **Belegung** und **Inhalte**:

- ob der S3-Speicher erreichbar ist, wie lange die Prüfung dauerte und wie viele Dateien noch warten,
- was lokal und was im Bucket liegt: Dateien nach Art (Bilder, Videos, Dokumente …) und die Aufteilung der Datenbank,
- wie viele Arbeitsbereiche, Seiten, Datenbanken, Einträge, Whiteboards, Dateien, Konten und Kommentare es gibt.

## Prometheus

Mit `FLOWPLAN_METRICS_TOKEN` (mindestens 16 Zeichen) liefert `/api/metrics` Kennzahlen: Größen, Warteschlangen, Suchrückstand, Speicher und Kontingent je Arbeitsbereich, `flowplan_object_storage_pending` und `flowplan_build_info` mit Version und Commit.

```yaml
scrape_configs:
  - job_name: flowplan
    metrics_path: /api/metrics
    authorization:
      credentials: <FLOWPLAN_METRICS_TOKEN>
    static_configs:
      - targets: ["flowplan:3000"]
```

Ohne gesetztes Token ist der Endpunkt abgeschaltet. Dasselbe Token schaltet die Details von `/api/health` frei (siehe oben).

> [!NOTE]
> **Für Lasttests:** `FLOWPLAN_METRICS_LOOP=1` misst zusätzlich die Verzögerung und Auslastung der Node-Event-Loop und die Zeit in SQLite und hängt sie an `/api/metrics` an. Die Werte gelten jeweils seit der letzten Abfrage – gedacht für einen einzelnen Abrufer wie das Lasttest-Skript, nicht für einen gemeinsam genutzten Prometheus. Standardmäßig aus.
