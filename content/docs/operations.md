# Betrieb und Fehlersuche

Healthcheck, Kennzahlen, Speicherübersicht und die häufigsten Ursachen, wenn etwas nicht läuft.

## Healthcheck

`GET /api/health` antwortet ohne Anmeldung mit `200` oder bei Problemen mit `503` und verrät dabei nichts über die Instanz:

```json
{"service":"flowplan","status":"ok"}
```

Bei `503` steht `"status":"error"` darin. Für Docker-/Podman-Healthchecks, Kubernetes-Probes, Coolify, Gatus und Uptime-Monitore reicht der Statuscode; die Desktop- und Mobil-Apps erkennen eine Flowplan-Instanz an `"service":"flowplan"`.

Die Details gibt es nur mit dem Token aus `FLOWPLAN_METRICS_TOKEN` (`Authorization: Bearer <Token>`, wie für `/api/metrics`) oder für angemeldete Instanz-Admins:

- `checks.database`: Datenbank erreichbar und beschreibbar,
- `checks.storage`: Upload-Verzeichnis beschreibbar,
- `searchBacklog`: Rückstand des Suchindex,
- `failedPushDeliveries`: fehlgeschlagene Push-Zustellungen,
- `objectStorage`: mit S3 `pending` (noch hochzuladende Dateien) und `retrying`, sonst `"off"`,
- `uptimeSeconds`: Laufzeit des Servers.

```sh
curl -H "Authorization: Bearer $FLOWPLAN_METRICS_TOKEN" https://flowplan.example.com/api/health
```

Persönliche API-Tokens schalten die Details nicht frei.

## Administration → Überwachung

**Administration → Überwachung** zeigt die Instanz live – alle 15 Sekunden aktualisiert, pausiert, solange der Tab im Hintergrund liegt:

- **Zustand**: Datenbank, Dateispeicher (mit Belegung des Datenträgers), S3-Spiegel, Sicherung, E-Mail, KI-Anbieter (erreichbar und Antwortzeit, höchstens alle fünf Minuten geprüft), Push-Relay (erreichbar, höchstens jede Minute geprüft, siehe [Push-Benachrichtigungen](/administration#push-benachrichtigungen)), Hintergrunddienste und Aktualisierung. Jede Kachel führt zum zuständigen Bereich.
- **Kennzahlen**: gerade aktiv, Anfragen pro Minute (mit Fehlerquote und p95-Antwortzeit), Anmeldungen heute, Speicher mit Veränderung in 7 Tagen.
- **Diagramme**: **Anfragen & Fehler** (5xx) – 1 Stunde, 24 Stunden oder 7 Tage –, **Aktive Personen** je Stunde (7 Tage), **Anmeldungen** erfolgreich und fehlgeschlagen je Tag (14 Tage), **Abgewiesene Anfragen**, **Speicher** nach Art und die größten Arbeitsbereiche, **Zustellungen** (Webhooks, Push, E-Mail) je Tag und **KI-Nutzung** (Tokens je Tag und je Funktion). Jedes Diagramm zeigt beim Zeigen, Tippen oder mit den Pfeiltasten die Werte und hat **Als Tabelle**.
- **Warteschlangen**: was gerade auf Bearbeitung wartet – Suchindex, E-Mail-Warteschlange, Push-Zustellung, KI-Felder und KI-Suchindex, S3-Upload, Webhooks in Wiederholung.
- **Ereignisse**: Fehler, Warnungen und Hinweise der letzten 14 Tage, filterbar.
- **Schnellzugriff**: **Jetzt sichern**, **KI-Anbieter prüfen**, **Warnungen prüfen**, **Testwarnung**, der Weg zu Wartung & Hinweise und das Aktivitätsprotokoll als CSV.
- Darunter **Hintergrunddienste**, **Instanz in Zahlen** (Größe von Datenbank und Uploads, Versionen, Laufzeit, Demos …), **Warnungen per Webhook** und **Statistik**.

Im Einzelnen:

- **Abgewiesene Anfragen**: fehlgeschlagene Anmeldungen, Anfragen, die ein Limit mit 429 abgewiesen hat (Anmeldeversuche, Einladungen, KI, MCP, Formulare …), und anonyme Uploads über dem Tagesbudget (Formulare, Freigabelinks) – je Tag der letzten 14 Tage. Ein Anstieg deutet auf Angriffe oder zu knappe Grenzen. Die Zähler werden 35 Tage aufbewahrt und täglich aufgeräumt.
- **Hintergrunddienste**: letzter Lauf und letzter Fehler von Sicherung, Markdown-Export, KI-Hintergrundarbeit, Kalender- und Issue-Synchronisierung und LDAP-Abgleich; „aus“ heißt nicht eingerichtet.
- **Speicher**: Belegung nach Art und die größten Arbeitsbereiche mit Balken gegen das Kontingent (ab 80 % gelb, ab 95 % rot). Kontingente stellst du unter **Administration → Arbeitsbereiche** und **Administration → Grenzen & Aufbewahrung** ein.
- **Zustellungen**: zugestellte Webhooks, Push-Nachrichten und E-Mails je Tag; Wartendes, Aufgegebenes und die letzten Fehler stehen unter **Warteschlangen**. Von Webhook-Adressen erscheint nur der Host, nie Pfad oder Token.

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

Flowplan prüft alle zehn Minuten und sendet je Ereignis höchstens **eine Nachricht pro Tag** als `POST` mit JSON:

```json
{ "event": "ops.storage_high", "title": "Speicher > 90 %", "detail": "Agentur: 93 %", "instance": "Flowplan", "url": "https://flowplan.example.org", "at": "2026-10-22T08:10:00.000Z" }
```

Die Kopfzeile `X-Flowplan-Signature: sha256=<HMAC-SHA256 des Inhalts>` ist mit dem angezeigten **Signaturschlüssel** gebildet, `X-Flowplan-Event` nennt das Ereignis. **Test senden** schickt sofort `ops.test`, **Jetzt prüfen** prüft außer der Reihe, **Neuer Schlüssel** erzeugt einen neuen Signaturschlüssel. Die letzten gesendeten Warnungen stehen mit Antwortcode darunter. Eine leere Adresse schaltet die Warnungen aus.

### Wartung & Hinweise

Unter **Administration → Wartung & Hinweise** stehen zwei Banner. Der **Hinweis für alle Personen** – etwa „Ab Montag gilt die neue Ablage“ – bleibt, bis du das Feld leerst. Ein **Wartungshinweis** mit Text, Beginn und Ende erscheint ab dem Speichern allen angemeldeten Personen als Banner oben im Fenster – vor dem Beginn als „Geplante Wartung“, währenddessen als „Wartung läuft“, in Zeitzone und Sprache der jeweiligen Person. Nach dem Ende verschwindet er von selbst, auch in schon geöffneten Fenstern (sie fragen alle fünf Minuten nach). Jede Person kann den Hinweis für sich ausblenden. **Hinweis entfernen** nimmt ihn sofort zurück. Speichern und Entfernen stehen im Aktivitätsprotokoll.

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

## Nach dem ersten Start prüfen

- `/api/health` liefert `200`.
- Die Anmeldung funktioniert und landet wieder in Flowplan.
- Das erste Konto (bei SSO: ein Mitglied der Admin-Gruppe) sieht **Administration**.
- Eine Datei hochladen, den Container neu starten, die Datei wieder öffnen – dann ist das Volume richtig eingebunden.
- Mit S3: `objectStorage.pending` sinkt auf `0`; im Bucket liegen `flowplan/uploads/` und `flowplan/db/`; das Log zeigt beim Start Zeilen von `litestream`.

## Fehlersuche

| Symptom | Ursache und Lösung |
| --- | --- |
| Login endet mit Fehler zur Redirect-URI | URI beim Anbieter ≠ `APP_URL` + `/api/auth/callback`. |
| „Ungültiger Anfrageursprung“ beim Speichern | `APP_URL` weicht von der aufgerufenen Adresse ab. |
| Keine Administration sichtbar | Bei SSO fehlt die Gruppe im Token: `OIDC_SCOPES`, `OIDC_GROUPS_CLAIM`, `OIDC_ADMIN_GROUP` prüfen und neu anmelden. Bei E-Mail-Konten gibt ein Admin das Recht unter **Benutzer**. |
| Nach Neustart ist alles leer | Volume ist nicht auf `/app/data` eingehängt. |
| `SQLITE_READONLY` oder `EACCES` im Log | Host-Ordner gehört nicht UID 1000. |
| Container „degraded“ in Coolify | Healthcheck-Port leer (= 80); `3000` eintragen. |
| 404 über den vorderen Proxy | Keine Route beim inneren Proxy: Host-Header setzen, TLS zum Ziel ausschalten, Container muss gesund sein. |
| `objectStorage.retrying: true` | Bucket nicht erreichbar oder Schlüssel falsch. Uploads werden mit wachsendem Abstand wiederholt, lokal geht nichts verloren. Endpoint vom Container aus prüfen (Tippfehler, Dienst nur an interne IP gebunden). |
| Container startet nicht, Log zeigt `litestream` | Endpoint, Bucket oder Schlüssel für die Datenbanksicherung falsch; zum Eingrenzen `FLOWPLAN_LITESTREAM=off`. |
| Push kommt nicht an | `WEB_PUSH_SUBJECT` fehlt, Schlüssel haben sich geändert oder ausgehendes HTTPS ist gesperrt. |
| Hohe CPU-Last nach Uploads | Texterkennung gescannter PDFs; bei Bedarf `FLOWPLAN_OCR=0`. |
| Änderungen anderer oder Live-Cursor kommen nur verzögert an | Proxy puffert Server-Sent Events (`/api/documents/live`, `/api/whiteboards/…/cursors`); Pufferung abschalten. Ohne den Kanal gleicht Flowplan weiter im Abstand von Sekunden ab. |

## Desktop-Apps

Die Desktop-App für macOS, Windows und Linux ist ein schlankes Fenster um eine Flowplan-Instanz. Alle Daten bleiben auf dem Server; neue Flowplan-Funktionen kommen mit dem Server und brauchen kein App-Update. Die App hat ein eigenes Repository: [flowplan-desktop](https://github.com/yannicschuller/flowplan-desktop).

**Offline-Nutzung:** funktioniert in der Desktop-App wie im Browser, auch im AppImage unter Linux. Sie wird in der App selbst unter **Einstellungen → Offline & Geräte** eingeschaltet, denn App, Browser und installierte Web-App speichern getrennt. Ohne Verbindung öffnet die App die Kopie aus dem Service Worker der Instanz, auch wenn eine andere Seite der Instanz nicht lädt; die eigene Offline-Seite der App erscheint nur ohne Kopie. Fehlt die Option, ist die Adresse kein HTTPS mit gültigem Zertifikat (der Service Worker braucht eine sichere Verbindung; `http://localhost` geht für Tests). Siehe [Offline arbeiten](/offline-and-apps#offline-nutzung-einschalten).

### Herunterladen

[flowplan.org/download](https://flowplan.org/download) erkennt das System und lädt die neueste Version; darunter stehen alle Dateien. Dieselben Dateien liegen im [neuesten Release](https://github.com/yannicschuller/flowplan-desktop/releases/latest):

| System | Datei | Architektur |
| --- | --- | --- |
| macOS 12 oder neuer | `Flowplan-<Version>-mac.dmg` | Apple Silicon und Intel in einer App |
| Windows 10 oder neuer | `Flowplan-<Version>-windows-setup.exe`, ohne Installation die `.zip` | x64 und ARM in einem Installer |
| Linux | `Flowplan-<Version>-linux-<Arch>.AppImage`, oder die `.tar.gz` | x64 und ARM |

Beim ersten Start fragt die App immer nach der Adresse der Instanz und schlägt `https://app.flowplan.org` vor (HTTPS, für lokale Tests auch `http://localhost`); weitere Instanzen kommen als Profile dazu (siehe unten). Für verteilte Installationen schlägt `--server=<URL>` oder die Umgebungsvariable `FLOWPLAN_SERVER` stattdessen die eigene Adresse vor – bestätigt wird sie beim ersten Start trotzdem. Die App prüft, ob dort wirklich Flowplan läuft (`/api/health` antwortet mit `"service": "flowplan"`), und lehnt Adressen ab, die auf eine andere Seite weiterleiten.

**Anmeldung mit Passkey und SSO:** Passkeys und Anbieter, die einen Passkey verlangen, funktionieren nur in einem echten Browser. Die App öffnet die Anmeldung deshalb im Standardbrowser: Sie erzeugt ein zufälliges Geheimnis, öffnet `/api/auth/desktop` mit dessen Hash, nach der Anmeldung bestätigt man **In der App anmelden**, und der Browser gibt über `flowplan://sign-in` einen Einmalcode an die App zurück. Der Code gilt eine Minute, nur einmal und nur zusammen mit dem Geheimnis, das die App nie verlässt. Fragt der Browser, ob er Flowplan öffnen darf, ist das dieser Schritt.

Die Mac-App ist ab Version 1.0.6 mit einer Developer ID signiert und von Apple notarisiert; macOS öffnet sie ohne Rückfrage. Nur Versionen bis 1.0.5 waren unsigniert: Dort blockiert macOS den ersten Start (ab macOS 15 unter **Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen** freigeben, bis macOS 14 Rechtsklick → **Öffnen**; meldet macOS „beschädigt“, hilft `xattr -dr com.apple.quarantine /Applications/Flowplan.app`). Selbst gebaute Apps ohne Zertifikat verhalten sich genauso, siehe [flowplan-desktop → Signing](https://github.com/yannicschuller/flowplan-desktop#signing). Windows zeigt SmartScreen (**Weitere Informationen → Trotzdem ausführen**), und ein AppImage muss vorher ausführbar sein (`chmod +x`).

### Profile

Die Desktop-App kann mehrere Instanzen als Profile speichern (Bedienung: [Mehrere Instanzen](/offline-and-apps#mehrere-instanzen-profile)). Technisch:

- Jedes Profil hat eine eigene Electron-Sitzung (`persist:profile-<id>`): Cookies, Service Worker, Offline-Kopie, IndexedDB und Cache sind getrennt, auch für zwei Profile auf derselben Instanz. Berechtigungen (Mitteilungen, Mikrofon) bekommt nur die Instanz des aktiven Profils, eine im Browser begonnene Anmeldung verfällt beim Wechsel.
- Die Profile stehen in `config.json` im Benutzerordner der App (`profiles`, `activeProfile`). Eine Adresse aus Version 1.0.4 oder älter wird beim ersten Start automatisch zum ersten Profil und behält die bisherige Sitzung; `server` spiegelt weiterhin das aktive Profil, damit eine ältere Version nach einem Downgrade eine Adresse findet.
- `--profile=<ID oder Name>` startet die App mit einem gespeicherten Profil oder wechselt in einer laufenden App dorthin, etwa aus einem Starter unter Linux. Neue Adressen nimmt die App so nicht an; die schlägt weiterhin nur `--server=<URL>` bzw. `FLOWPLAN_SERVER` beim ersten Start vor.
- Ein Profil entfernen meldet es bei der Instanz ab und leert seine Sitzung auf diesem Rechner.

### Updates

Die App prüft 15 Sekunden nach dem Start, danach alle sechs Stunden und über **Nach Updates suchen …** im Menü, ob es ein neueres Release gibt:

| Installiert als | Was passiert |
| --- | --- |
| Windows-Installer | Lädt im Hintergrund; ein Dialog bietet **Jetzt neu starten**, sonst wird beim nächsten Start installiert. |
| Linux-AppImage | Genauso – das AppImage ersetzt sich selbst. |
| macOS (ab 1.0.6, signiert) | Genauso. |
| macOS bis 1.0.5 (unsigniert), Windows-ZIP, Linux-`.tar.gz` | Ein Dialog nennt die neue Version und öffnet die Download-Seite. macOS lässt nur signierte Apps sich selbst ersetzen – von 1.0.5 oder älter also einmal 1.0.6 herunterladen, danach aktualisiert sich die App selbst. |

Ohne Verbindung bleibt die Prüfung still und versucht es später erneut. Mit `FLOWPLAN_UPDATE_URL` auf dem Rechner der App holt sie Updates aus einer anderen Quelle – einem Ordner mit denselben Dateien (`latest*.yml` und die Installer), etwa einem Spiegel im Firmennetz. Nicht zu verwechseln mit der gleichnamigen Variable des Servers, die den Spiegel für den Release-Check der Instanz nennt (siehe [Konfiguration](/configuration#betrieb)).

### Signieren und neue Versionen

Neue Versionen entstehen im Repository flowplan-desktop über **Actions → Release → Run workflow**: Die Version steigt, die Apps werden für alle drei Systeme gebaut und angehängt, und erst wenn alles da ist, wird das Release veröffentlicht. Installierte Apps finden es innerhalb von sechs Stunden.

Signiert werden die Apps, sobald dort die Secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, für die Notarisierung zusätzlich `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`) bzw. `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) hinterlegt sind; eine signierte Mac-App aktualisiert sich dann wie unter Windows selbst. Selbst bauen: im Repository `npm run dist:mac`, `dist:win` oder `dist:linux`.

