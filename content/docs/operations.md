---
keywords: Betrieb, Healthcheck, Fehlersuche, Logs, Desktop-Apps, Prometheus
---

# Betrieb und Fehlersuche

Healthcheck, Kennzahlen, Speicherübersicht und die häufigsten Ursachen, wenn etwas nicht läuft.

**Mehr zum Thema:** [Überwachung und Wartung](/monitoring) · [Sicherheit und Angriffserkennung](/security-monitoring)

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
- `version`, `commit`, `builtAt`: welche Version aus welchem Commit hier läuft (leer, wenn das Image sie nicht mitbringt) – etwa um zu prüfen, ob ein Deployment aktuell ist.

```sh
curl -H "Authorization: Bearer $FLOWPLAN_METRICS_TOKEN" https://flowplan.example.com/api/health
```

Persönliche API-Tokens schalten die Details nicht frei.

Für Kubernetes und Load Balancer gibt es zusätzlich `/api/health/live` (der Prozess antwortet) und `/api/health/ready` (Datenbank und im Cluster Redis und Bucket erreichbar; `503` beim Herunterfahren), siehe [Cluster-Modus](/cluster#gesundheit-bereitschaft-und-herunterfahren).

## Nach dem ersten Start prüfen

- `/api/health` liefert `200`.
- Die Anmeldung funktioniert und landet wieder in Flowplan.
- Das erste Konto (bei SSO: ein Mitglied der Admin-Gruppe) sieht **Administration**.
- Eine Datei hochladen, den Container neu starten, die Datei wieder öffnen – dann ist das Volume richtig eingebunden.
- Mit S3: `objectStorage.pending` sinkt auf `0`; im Bucket liegen `flowplan/uploads/` und `flowplan/db/`; das Log zeigt beim Start Zeilen von `litestream`.

## Workflows

[Workflows](/workflows) laufen im Server-Prozess. Ein Neustart verliert nichts: laufende Schritte ohne gültige Lease kommen nach spätestens zwei Minuten zurück in die Warteschlange, wartende Läufe (Warten, Freigabe) laufen zu ihrem Zeitpunkt weiter, Zeitpläne holen den letzten verpassten Termin einmal nach. Unter **Administration → Grenzen & Aufbewahrung → Workflows** zeigt die Überwachung wartende Schritte, die älteste fällige Aufgabe, nicht verteilte Ereignisse und die Fehlerquote. Läufe werden nach 30 Tagen gelöscht (`FLOWPLAN_WORKFLOW_RUN_DAYS`), wartende nie.

## Fehlersuche

| Symptom | Ursache und Lösung |
| --- | --- |
| Login endet mit Fehler zur Redirect-URI | URI beim Anbieter ≠ `APP_URL` + `/api/auth/callback`. |
| „Ungültiger Anfrageursprung“ beim Speichern | `APP_URL` weicht von der aufgerufenen Adresse ab. |
| Keine Administration sichtbar | Bei SSO fehlt die Gruppe im Token: `OIDC_SCOPES`, `OIDC_GROUPS_CLAIM`, `OIDC_ADMIN_GROUP` prüfen und neu anmelden. Bei E-Mail-Konten gibt ein Admin das Recht unter **Benutzer**. |
| Nach Neustart ist alles leer | Volume ist nicht auf `/app/data` eingehängt. |
| `SQLITE_READONLY`, `EACCES` oder `unable to open database file` im Log, im Datenordner entsteht nichts | Der eingebundene Host-Ordner gehört nicht dem Benutzer, als der Flowplan läuft (meist mit `user:` gestartet): `PUID`/`PGID` statt `user:` setzen (Flowplan übernimmt den Ordner dann selbst), Flowplan mit `user: "UID:GID"` als Besitzer starten, `sudo chown -R 1000:1000 /pfad/zu/flowplan-data` oder ein benanntes Docker-Volume nehmen ([Volume-Rechte](/coolify-and-proxy#volume-rechte)). Neuere Images melden das beim Start und beenden sich. |
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

Die Desktop-App kann mehrere Instanzen als Profile speichern (Bedienung: [Mehrere Instanzen](/desktop-app#mehrere-instanzen-profile)). Technisch:

- Jedes Profil hat eine eigene Electron-Sitzung (`persist:profile-<id>`): Cookies, Service Worker, Offline-Kopie, IndexedDB und Cache sind getrennt, auch für zwei Profile auf derselben Instanz. Berechtigungen (Mitteilungen, Mikrofon) bekommt nur die Instanz des aktiven Profils, eine im Browser begonnene Anmeldung verfällt beim Wechsel.
- Die Profile stehen in `config.json` im Benutzerordner der App (`profiles`, `activeProfile`). Eine Adresse aus Version 1.0.4 oder älter wird beim ersten Start automatisch zum ersten Profil und behält die bisherige Sitzung; `server` spiegelt weiterhin das aktive Profil, damit eine ältere Version nach einem Downgrade eine Adresse findet.
- `--profile=<ID oder Name>` startet die App mit einem gespeicherten Profil oder wechselt in einer laufenden App dorthin, etwa aus einem Starter unter Linux. Neue Adressen nimmt die App so nicht an; die schlägt weiterhin nur `--server=<URL>` bzw. `FLOWPLAN_SERVER` beim ersten Start vor.
- Ein Profil entfernen meldet es bei der Instanz ab und leert seine Sitzung auf diesem Rechner.

### Updates

Die App prüft 15 Sekunden nach dem Start, danach alle sechs Stunden und über **Nach Updates suchen …** im Menü, ob es ein neueres Release gibt:

| Installiert als | Was passiert |
| --- | --- |
| Windows-Installer | Lädt im Hintergrund, mit Fortschritt in einem kleinen Hinweis im Fenster und am Taskleisten-Symbol; dann bieten Hinweis, Menü und Infobereich **Neu starten**, sonst wird beim Beenden installiert. |
| Linux-AppImage | Genauso – das AppImage ersetzt sich selbst. |
| macOS (ab 1.0.6, signiert) | Genauso. |
| macOS bis 1.0.5 (unsigniert), Windows-ZIP, Linux-`.tar.gz` | Ein Hinweis im Fenster nennt die neue Version und führt zur Download-Seite (bis 1.0.8 war das ein Dialog). macOS lässt nur signierte Apps sich selbst ersetzen – von 1.0.5 oder älter also einmal 1.0.6 herunterladen, danach aktualisiert sich die App selbst. |

Ab der Version nach 1.0.8 unterbricht kein Dialog mehr: Auch die Antwort auf **Nach Updates suchen …** erscheint als Hinweis im Fenster. Ohne Verbindung bleibt die Prüfung still und versucht es später erneut. Mit `FLOWPLAN_UPDATE_URL` auf dem Rechner der App holt sie Updates aus einer anderen Quelle – einem Ordner mit denselben Dateien (`latest*.yml` und die Installer), etwa einem Spiegel im Firmennetz. Nicht zu verwechseln mit der gleichnamigen Variable des Servers, die den Spiegel für den Release-Check der Instanz nennt (siehe [Konfiguration](/configuration#betrieb)). Ein Spiegel kann Versionshinweise im Feld releaseNotes seiner latest*.yml mitgeben (Markdown oder HTML); die App zeigt sie unter **Was ist neu?** als reinen Text.

### Einstellungen, Links und Autostart

- Die Einstellungen der App (Symbol im Infobereich, Beim Anmelden öffnen, Tastenkürzel für Schnell erfassen, Sprachen der Rechtschreibprüfung) stehen in `config.json` unter `settings`, die Seiten in eigenen Fenstern je Profil unter `pageWindows`. Die App prüft beides beim Lesen; Unbekanntes fällt weg.
- `flowplan://open?instance=<Adresse>&page=<ID>` öffnet eine Seite (siehe [flowplan-desktop → Links](https://github.com/yannicschuller/flowplan-desktop#links-to-pages-flowplan)). Eine Instanz ohne Profil wird erst nach Rückfrage und derselben Prüfung wie beim Einrichten hinzugefügt. Unter Linux braucht das, wie die Anmeldung über den Browser, die registrierte Desktop-Datei.
- **Beim Anmelden öffnen** trägt die App unter macOS und Windows als Anmeldeobjekt ein, unter Linux schreibt sie `~/.config/autostart/flowplan.desktop` (bzw. unter `$XDG_CONFIG_HOME`).
- Schnell erfassen und Dateien gehen mit der Anmeldung des Profils an dessen eigene Instanz, über dieselben Endpunkte wie die Web-App (`capture.record`, `/api/upload`, Markdown-Import, `/api/import/source`); auf dem Server wird dafür nichts eingerichtet.

### Signieren und neue Versionen

Neue Versionen entstehen im Repository flowplan-desktop über **Actions → Release → Run workflow**: Die Version steigt, die Apps werden für alle drei Systeme gebaut und angehängt, und erst wenn alles da ist, wird das Release veröffentlicht. Installierte Apps finden es innerhalb von sechs Stunden.

Signiert werden die Apps, sobald dort die Secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, für die Notarisierung zusätzlich `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`) bzw. `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) hinterlegt sind; eine signierte Mac-App aktualisiert sich dann wie unter Windows selbst. Selbst bauen: im Repository `npm run dist:mac`, `dist:win` oder `dist:linux`.
