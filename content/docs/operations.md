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
- `version`, `commit`, `builtAt`: welche Version aus welchem Commit hier läuft (leer, wenn das Image sie nicht mitbringt) – etwa um zu prüfen, ob ein Deployment aktuell ist.

```sh
curl -H "Authorization: Bearer $FLOWPLAN_METRICS_TOKEN" https://flowplan.example.com/api/health
```

Persönliche API-Tokens schalten die Details nicht frei.

Für Kubernetes und Load Balancer gibt es zusätzlich `/api/health/live` (der Prozess antwortet) und `/api/health/ready` (Datenbank und im Cluster Redis und Bucket erreichbar; `503` beim Herunterfahren), siehe [Cluster-Modus](/cluster#gesundheit-bereitschaft-und-herunterfahren).

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
| Sicherheitsvorfälle | Sofort bei jedem neuen Vorfall der [Erkennungsregeln](#erkennungsregeln) (`ops.security`, mit `rule` und `severity`). |

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

## Sicherheit

Flowplan hält sicherheitsrelevante Ereignisse fest, erkennt typische Angriffe daran und gibt beides an deine eigenen Werkzeuge weiter. Alles läuft ohne Einrichtung; die Variablen unten sind nur für die Anbindung nach außen.

### Was festgehalten wird

- **Anmeldung:** erfolgreich, fehlgeschlagen, abgewiesen (Limit oder Sperre), von einem neuen Gerät
- **Konto:** Passwort geändert oder zurückgesetzt, Passkey hinzugefügt oder entfernt, Zwei-Faktor an oder aus, API-Token erstellt oder widerrufen, Sitzungen beendet, Konto gelöscht
- **Rechte:** Adminrechte vergeben oder entzogen (auch über SSO- oder LDAP-Gruppen bei der Anmeldung), Rollen, Einladungen, Konten durch Admins gesperrt oder zurückgesetzt
- **Freigaben und Daten:** Freigabelinks, veröffentlichte Seiten, alle Exporte und Sicherungen
- **Abgewehrtes:** Anfragen von fremder Herkunft, interne Adressen (SSRF), Skripte in eingereichten Inhalten, viele abgewiesene API-Anfragen einer Adresse
- **Administration:** LDAP, SCIM, Wiederherstellung, Erweiterungen, Domains, KI-Anbieter, Warnungen und weitere sicherheitsrelevante Einstellungen

**Datenschutz:** In der Datenbank steht von einer Adresse nur ihr Netz (IPv4 `/24`, IPv6 `/48`) und ein Hash mit einem Schlüssel der Instanz – genug zum Gruppieren und Sperren, nicht die Adresse selbst. Konten fehlgeschlagener Anmeldungen stehen nur maskiert da (`ma***@example.com`). Nach 90 Tagen werden die Ereignisse gelöscht (`FLOWPLAN_SECURITY_RETENTION_DAYS`).

### Administration → Angriffe & Vorfälle

Die Seite `/#admin/threats` (Gruppe **Sicherheit**) fasst zusammen und aktualisiert sich alle 30 Sekunden:

- **Zustand:** offene Vorfälle (kritische rot), Hinweise auf fehlende Anbindung, Kennzahlen der letzten 24 Stunden und die Anmeldungen je Stunde
- **Vorfälle** der Erkennungsregeln, mit Aktionen direkt daneben: erledigt, Adresse oder Netz 24 Stunden sperren, alle Sitzungen der Person beenden, Konto sperren. **Details & nächste Schritte** öffnet die eigene Seite eines Vorfalls (`/#admin/threats/incident/<id>`): links, was passiert ist – warum die Regel angeschlagen hat (mit ihren Schwellen), Zeitraum, Herkunft und ob sie schon gesperrt ist, die probierten Konten, erfolgreiche Anmeldungen im selben Zeitraum (rot, wenn danach ein Konto übernommen sein könnte), Netze, Länder, Geräte und der Verlauf aller zugehörigen Ereignisse; beim Abtasten zusätzlich die abgefragten Pfade mit Antwort und Anzahl (IDs und Tokens ersetzt durch `:id`, `:n` und `:token`). Rechts steht, was der Vorfall bedeutet, wann er harmlos ist und was du Schritt für Schritt tun solltest – mit der passenden Aktion (Adresse sperren, Sitzungen beenden, Konto sperren, erledigt) oder dem Link dorthin direkt am Schritt.
- **Adressen mit Fehlversuchen**, **Ereignisse** mit Filtern (Schwere, Art) und Export als CSV oder JSON
- **Angemeldete Personen** (Admins zuerst), **offene Zugänge** (API-Tokens, Freigabelinks, öffentliche Seiten der ganzen Instanz) zum Widerrufen
- **Sperren** von Adressen und Netzen, befristet oder unbefristet. Gesperrte Adressen bekommen nur noch `403` – auch angemeldete Personen darin. Die eigene Adresse und das eigene Netz lassen sich nicht sperren.

Neue Vorfälle gehen an alle Instanz-Admins als Mitteilung der Art **Sicherheitsvorfälle der Instanz**. Wie, stellt jeder Admin selbst unter **Einstellungen → Benachrichtigungen** ein: die Kanäle (standardmäßig Posteingang, Push, E-Mail und Chat-Apps) und ob **alle Vorfälle** oder **nur kritische** ankommen; die Mitteilung führt direkt zur Seite des Vorfalls, und oben in der Liste der Vorfälle steht, wie du gerade benachrichtigt wirst. Ist unter **Überwachung → Warnungen per Webhook** ein Webhook eingerichtet, geht jeder Vorfall außerdem sofort dorthin (Ereignis `ops.security` mit `rule` und `severity`). Höchstens 30 Meldungen pro Stunde, damit ein Angriff niemanden flutet.

Wer sich mit einem Gerät anmeldet, das 90 Tage nicht dabei war, bekommt selbst einen Sicherheitshinweis – so fällt die Übernahme eines Kontos oft dem Konto selbst zuerst auf.

### Erkennungsregeln

| Regel | Auslöser | Schwere |
| --- | --- | --- |
| Passwort-Raten bei einem Konto | 10 Fehlversuche bei einem Konto in 15 Minuten | Warnung |
| Viele Fehlversuche von einer Adresse | 20 Fehlversuche von einer Adresse in 15 Minuten | Warnung |
| Viele Konten von einer Adresse | 5 verschiedene Konten von einer Adresse in 15 Minuten (Credential Stuffing) | kritisch |
| Anmeldung nach vielen Fehlversuchen | erfolgreiche Anmeldung nach 5 Fehlversuchen beim selben Konto | kritisch |
| Admin von neuem Gerät | ein Admin meldet sich mit einem Gerät an, das 90 Tage nicht dabei war | Warnung |
| Zwei Länder kurz nacheinander | Anmeldungen aus zwei Ländern innerhalb von 2 Stunden (braucht `FLOWPLAN_COUNTRY_HEADER`) | kritisch |
| Rechte geändert | Adminrechte, LDAP/SCIM, Wiederherstellung, Erweiterungen, Domains | kritisch |
| Viele Exporte | mehr als 20 Exporte einer Person in einer Stunde (und weit über ihrem Üblichen) | Warnung |
| Abtasten | 60 abgewiesene API-Anfragen (401/403/404) einer Adresse in 10 Minuten | Warnung |
| Angriffe über Inhalte | 5 abgewehrte Skripte oder interne Adressen in einer Stunde | Warnung |

Gleiches innerhalb eines Tages zählt beim offenen Vorfall weiter, statt einen neuen zu öffnen.

### Logs (stdout, JSON)

Jedes Ereignis ist eine JSON-Zeile auf stdout – Docker, Loki, Elastic, Graylog oder Datadog sammeln sie ohne weiteres ein:

```json
{"ts":"2026-10-30T19:11:27.536Z","level":"warn","logger":"flowplan.security","event":"login.failure","severity":"warn","ip":"203.0.113.7","network":"203.0.113.0/24","subject":"ma***@example.com","device":"Chrome · macOS","detail":"password"}
```

Weitere Felder je nach Ereignis: `user` (Konto-ID), `country`. Die volle Adresse (`ip`) steht nur in dieser Zeile – für fail2ban und CrowdSec. `FLOWPLAN_SECURITY_LOG=anonymous` lässt sie weg, `=off` schreibt keine Zeilen.

### OpenTelemetry

Mit `OTEL_EXPORTER_OTLP_ENDPOINT` (oder `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`) schickt Flowplan die Ereignisse als OTLP-Logs (HTTP/JSON, `/v1/logs`) an deinen Collector, etwa Grafana Alloy, den OpenTelemetry Collector, Grafana Cloud, Honeycomb oder Datadog. Zugangsdaten in `OTEL_EXPORTER_OTLP_HEADERS` (`api-key=…,x-scope-orgid=…`), der Dienstname in `OTEL_SERVICE_NAME` (Standard `flowplan`). Die Felder der Log-Zeile kommen als Attribute `flowplan.*`.

### Prometheus

`/api/metrics` enthält dazu `flowplan_security_events_total{event,severity}`, `flowplan_security_incidents_open{rule,severity}` und `flowplan_security_blocks`. Eine Warnung in Prometheus oder Grafana:

```yaml
- alert: FlowplanSecurityIncident
  expr: sum(flowplan_security_incidents_open{severity="critical"}) > 0
  for: 1m
```

### fail2ban

Mit dem Logging-Treiber `journald` (`logging: { driver: journald }` im Compose-Service) liest fail2ban die Zeilen direkt:

```ini
# /etc/fail2ban/filter.d/flowplan.conf
[Definition]
failregex = "logger":"flowplan\.security","event":"login\.(failure|refused)","severity":"[a-z]+","ip":"<HOST>"
            "logger":"flowplan\.security","event":"request\.probing","severity":"[a-z]+","ip":"<HOST>"

# /etc/fail2ban/jail.d/flowplan.conf
[flowplan]
enabled = true
backend = systemd
journalmatch = CONTAINER_NAME=flowplan
filter = flowplan
maxretry = 10
findtime = 10m
bantime = 1h
```

Sperrt fail2ban per Firewall vor dem Reverse-Proxy, kommt die Anfrage gar nicht erst an. Die Sperren in Flowplan selbst wirken auch hinter Cloudflare oder einem Proxy, den fail2ban nicht steuert.

### CrowdSec

Ein Parser für die Log-Zeilen und ein Szenario für Passwort-Raten (Beispiel; die Erfassung mit `labels: { type: flowplan }`):

```yaml
# parsers/s01-parse/flowplan.yaml
name: flowplan/flowplan-logs
description: "Flowplan security events"
filter: "evt.Line.Labels.type == 'flowplan'"
onsuccess: next_stage
nodes:
  - filter: "UnmarshalJSON(evt.Line.Raw, evt.Unmarshaled, 'flowplan') in ['', nil] && evt.Unmarshaled.flowplan.logger == 'flowplan.security'"
    statics:
      - meta: log_type
        expression: "'flowplan_' + replace(evt.Unmarshaled.flowplan.event, '.', '_')"
      - meta: source_ip
        expression: evt.Unmarshaled.flowplan.ip

# scenarios/flowplan-bf.yaml
type: leaky
name: flowplan/login-bf
description: "Flowplan password guessing"
filter: "evt.Meta.log_type in ['flowplan_login_failure', 'flowplan_login_refused']"
groupby: evt.Meta.source_ip
capacity: 10
leakspeed: 30s
blackhole: 5m
labels:
  remediation: true
```

### Weitere Variablen

| Variable | Standard | Wirkung |
| --- | --- | --- |
| `FLOWPLAN_SECURITY_LOG` | `on` | `on` (mit Adresse), `anonymous` (ohne), `off` (keine Log-Zeilen) |
| `FLOWPLAN_SECURITY_RETENTION_DAYS` | `90` | Wie lange die Ereignisse in der Datenbank bleiben (mindestens 7) |
| `FLOWPLAN_COUNTRY_HEADER` | *leer* | Header des Proxys mit dem Land der Anfrage, z. B. `CF-IPCountry` hinter Cloudflare – schaltet die Regel „zwei Länder“ ein. Nur setzen, wenn der Proxy den Header selbst setzt. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | *leer* | OTLP-Collector für die Ereignisse (siehe oben) |

Voraussetzung für alles mit Adressen: Der Reverse-Proxy setzt `X-Forwarded-For` und `FLOWPLAN_TRUSTED_PROXIES` stimmt ([Konfiguration](/configuration)). Kommt keine Adresse an, zeigt die Seite einen Hinweis.

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

Die Desktop-App kann mehrere Instanzen als Profile speichern (Bedienung: [Mehrere Instanzen](/offline-and-apps#mehrere-instanzen-profile)). Technisch:

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

Ab der Version nach 1.0.8 unterbricht kein Dialog mehr: Auch die Antwort auf **Nach Updates suchen …** erscheint als Hinweis im Fenster. Ohne Verbindung bleibt die Prüfung still und versucht es später erneut. Mit `FLOWPLAN_UPDATE_URL` auf dem Rechner der App holt sie Updates aus einer anderen Quelle – einem Ordner mit denselben Dateien (`latest*.yml` und die Installer), etwa einem Spiegel im Firmennetz. Nicht zu verwechseln mit der gleichnamigen Variable des Servers, die den Spiegel für den Release-Check der Instanz nennt (siehe [Konfiguration](/configuration#betrieb)).

### Einstellungen, Links und Autostart

- Die Einstellungen der App (Symbol im Infobereich, Beim Anmelden öffnen, Tastenkürzel für Schnell erfassen, Sprachen der Rechtschreibprüfung) stehen in `config.json` unter `settings`, die Seiten in eigenen Fenstern je Profil unter `pageWindows`. Die App prüft beides beim Lesen; Unbekanntes fällt weg.
- `flowplan://open?instance=<Adresse>&page=<ID>` öffnet eine Seite (siehe [flowplan-desktop → Links](https://github.com/yannicschuller/flowplan-desktop#links-to-pages-flowplan)). Eine Instanz ohne Profil wird erst nach Rückfrage und derselben Prüfung wie beim Einrichten hinzugefügt. Unter Linux braucht das, wie die Anmeldung über den Browser, die registrierte Desktop-Datei.
- **Beim Anmelden öffnen** trägt die App unter macOS und Windows als Anmeldeobjekt ein, unter Linux schreibt sie `~/.config/autostart/flowplan.desktop` (bzw. unter `$XDG_CONFIG_HOME`).
- Schnell erfassen und Dateien gehen mit der Anmeldung des Profils an dessen eigene Instanz, über dieselben Endpunkte wie die Web-App (`capture.record`, `/api/upload`, Markdown-Import, `/api/import/source`); auf dem Server wird dafür nichts eingerichtet.

### Signieren und neue Versionen

Neue Versionen entstehen im Repository flowplan-desktop über **Actions → Release → Run workflow**: Die Version steigt, die Apps werden für alle drei Systeme gebaut und angehängt, und erst wenn alles da ist, wird das Release veröffentlicht. Installierte Apps finden es innerhalb von sechs Stunden.

Signiert werden die Apps, sobald dort die Secrets `CSC_LINK`/`CSC_KEY_PASSWORD` (macOS, für die Notarisierung zusätzlich `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`) bzw. `WIN_CSC_LINK`/`WIN_CSC_KEY_PASSWORD` (Windows) hinterlegt sind; eine signierte Mac-App aktualisiert sich dann wie unter Windows selbst. Selbst bauen: im Repository `npm run dist:mac`, `dist:win` oder `dist:linux`.

