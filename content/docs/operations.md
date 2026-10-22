# Betrieb und Fehlersuche

Healthcheck, Kennzahlen, Speicherübersicht und die häufigsten Ursachen, wenn etwas nicht läuft.

## Healthcheck

`GET /api/health` antwortet ohne Anmeldung mit `200` oder bei Problemen mit `503`. Er meldet nur Zustände, keine Inhalte:

- Datenbank erreichbar und beschreibbar,
- Upload-Verzeichnis beschreibbar,
- Rückstand des Suchindex,
- fehlgeschlagene Push-Zustellungen,
- mit S3: `objectStorage.pending` (noch hochzuladende Dateien) und `retrying`.

## Administration → Betrieb

Admins sehen dort Größe von Datenbank und Uploads, Warteschlangen, Suchindex, Versionen und Laufzeit, außerdem:

- **Abgewiesene Anfragen**: fehlgeschlagene Anmeldungen, Anfragen, die ein Limit mit 429 abgewiesen hat (Anmeldeversuche, Einladungen, KI, MCP, Formulare …), und anonyme Uploads über dem Tagesbudget (Formulare, Freigabelinks) – je in der letzten Stunde, in 24 Stunden und in 7 Tagen, dazu ein Diagramm der letzten 14 Tage. Die Zähler werden 35 Tage aufbewahrt und täglich aufgeräumt.
- **Hintergrunddienste**: letzter Lauf und letzter Fehler von Sicherung, Markdown-Export, KI-Hintergrundarbeit, Kalender- und Issue-Synchronisierung und LDAP-Abgleich; „aus“ heißt nicht eingerichtet.
- **Speicher je Arbeitsbereich** mit Balken gegen das Kontingent (ab 80 % gelb, ab 95 % rot).
- **Zustellung**: die E-Mail-Warteschlange (wartend, aufgegeben, gesendet, letzter Fehler) und Webhooks in Wiederholung oder aufgegeben, mit den letzten Fehlern. Von Webhook-Adressen erscheint nur der Host, nie Pfad oder Token.

### Warnungen per Webhook

Unter **Warnungen per Webhook** trägst du eine `https://`-Adresse ein (mit `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` auch `http://` und interne Adressen) und wählst die Ereignisse:

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

### Wartungshinweis

Ein **Wartungshinweis** mit Text, Beginn und Ende erscheint ab dem Speichern allen angemeldeten Personen als Banner oben im Fenster – vor dem Beginn als „Geplante Wartung“, währenddessen als „Wartung läuft“, in Zeitzone und Sprache der jeweiligen Person. Nach dem Ende verschwindet er von selbst, auch in schon geöffneten Fenstern (sie fragen alle fünf Minuten nach). Jede Person kann den Hinweis für sich ausblenden. **Hinweis entfernen** nimmt ihn sofort zurück. Speichern und Entfernen stehen im Aktivitätsprotokoll.

### Speicherübersicht

Die **Speicherübersicht** zeigt:

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

Ohne gesetztes Token ist der Endpunkt abgeschaltet.

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

**Offline-Nutzung:** funktioniert in der Desktop-App wie im Browser, auch im AppImage unter Linux. Sie wird in der App selbst unter **Einstellungen → Daten → Offline-Nutzung** eingeschaltet, denn App, Browser und installierte Web-App speichern getrennt. Ohne Verbindung öffnet die App die Kopie aus dem Service Worker der Instanz, auch wenn eine andere Seite der Instanz nicht lädt; die eigene Offline-Seite der App erscheint nur ohne Kopie. Fehlt die Option, ist die Adresse kein HTTPS mit gültigem Zertifikat (der Service Worker braucht eine sichere Verbindung; `http://localhost` geht für Tests). Siehe [Offline arbeiten](/offline-and-apps#offline-nutzung-einschalten).

### Herunterladen

[flowplan.org/download](https://flowplan.org/download) erkennt das System und lädt die neueste Version; darunter stehen alle Dateien. Dieselben Dateien liegen im [neuesten Release](https://github.com/yannicschuller/flowplan-desktop/releases/latest):

| System | Datei | Architektur |
| --- | --- | --- |
| macOS 12 oder neuer | `Flowplan-<Version>-mac.dmg` | Apple Silicon und Intel in einer App |
| Windows 10 oder neuer | `Flowplan-<Version>-windows-setup.exe`, ohne Installation die `.zip` | x64 und ARM in einem Installer |
| Linux | `Flowplan-<Version>-linux-<Arch>.AppImage`, oder die `.tar.gz` | x64 und ARM |

Beim ersten Start fragt die App immer nach der Adresse der Instanz und schlägt `https://app.flowplan.org` vor (HTTPS, für lokale Tests auch `http://localhost`); ändern über das Menü **Server wechseln …**. Für verteilte Installationen schlägt `--server=<URL>` oder die Umgebungsvariable `FLOWPLAN_SERVER` stattdessen die eigene Adresse vor – bestätigt wird sie beim ersten Start trotzdem. Die App prüft, ob dort wirklich Flowplan läuft (`/api/health` antwortet mit `"service": "flowplan"`), und lehnt Adressen ab, die auf eine andere Seite weiterleiten.

**Anmeldung mit Passkey und SSO:** Passkeys und Anbieter, die einen Passkey verlangen, funktionieren nur in einem echten Browser. Die App öffnet die Anmeldung deshalb im Standardbrowser: Sie erzeugt ein zufälliges Geheimnis, öffnet `/api/auth/desktop` mit dessen Hash, nach der Anmeldung bestätigt man **In der App anmelden**, und der Browser gibt über `flowplan://sign-in` einen Einmalcode an die App zurück. Der Code gilt eine Minute, nur einmal und nur zusammen mit dem Geheimnis, das die App nie verlässt. Fragt der Browser, ob er Flowplan öffnen darf, ist das dieser Schritt.

Solange die Apps nicht signiert und notarisiert sind, blockiert macOS den ersten Start: ab macOS 15 unter **Systemeinstellungen → Datenschutz & Sicherheit → Dennoch öffnen** freigeben (bis macOS 14 genügt Rechtsklick → **Öffnen**); meldet macOS, die App sei „beschädigt“, entfernt `xattr -dr com.apple.quarantine /Applications/Flowplan.app` die Quarantäne-Markierung. Mit Signatur und Notarisierung entfällt das, siehe [flowplan-desktop → Signing](https://github.com/yannicschuller/flowplan-desktop#signing). Windows zeigt SmartScreen (**Weitere Informationen → Trotzdem ausführen**), und ein AppImage muss vorher ausführbar sein (`chmod +x`).

### Updates

Die App prüft 15 Sekunden nach dem Start, danach alle sechs Stunden und über **Nach Updates suchen …** im Menü, ob es ein neueres Release gibt:

| Installiert als | Was passiert |
| --- | --- |
| Windows-Installer | Lädt im Hintergrund; ein Dialog bietet **Jetzt neu starten**, sonst wird beim nächsten Start installiert. |
| Linux-AppImage | Genauso – das AppImage ersetzt sich selbst. |
| macOS, signiert | Genauso. |
| macOS unsigniert, Windows-ZIP, Linux-`.tar.gz` | Ein Dialog nennt die neue Version und öffnet die Download-Seite. macOS lässt nur signierte Apps sich selbst ersetzen. |

Ohne Verbindung bleibt die Prüfung still und versucht es später erneut. Mit `FLOWPLAN_UPDATE_URL` auf dem Rechner der App holt sie Updates aus einer anderen Quelle – einem Ordner mit denselben Dateien (`latest*.yml` und die Installer), etwa einem Spiegel im Firmennetz. Nicht zu verwechseln mit der gleichnamigen Variable des Servers, die den Spiegel für den Release-Check der Instanz nennt (siehe [Konfiguration](/configuration#betrieb)).

### Signieren und neue Versionen

Neue Versionen entstehen im Repository flowplan-desktop über **Actions → Release → Run workflow**: Die Version steigt, die Apps werden für alle drei Systeme gebaut und angehängt, und erst wenn alles da ist, wird das Release veröffentlicht. Installierte Apps finden es innerhalb von sechs Stunden.

Signiert werden die Apps, sobald dort die Secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, für die Notarisierung zusätzlich `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`) bzw. `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) hinterlegt sind; eine signierte Mac-App aktualisiert sich dann wie unter Windows selbst. Selbst bauen: im Repository `npm run dist:mac`, `dist:win` oder `dist:linux`.

