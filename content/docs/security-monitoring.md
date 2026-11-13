---
keywords: Sicherheit, Angriffe, Brute Force, fail2ban, CrowdSec, OpenTelemetry, Audit, Logs
---

# Sicherheit und Angriffserkennung

Welche sicherheitsrelevanten Ereignisse Flowplan festhält, wie es Angriffe erkennt und wie du sie in Logs, OpenTelemetry, fail2ban oder CrowdSec weitergibst.

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
| Verschlüsselungsschlüssel zurückgesetzt | ein Konto setzt seinen Schlüssel für [verschlüsselte Bereiche](/encrypted-spaces) zurück (Passphrase und Wiederherstellungsschlüssel verloren) – betrifft nur den eigenen Zugang zu diesen Bereichen | Warnung {since=0.9.6} |
| Mehrere Schlüssel zurückgesetzt | 3 Konten setzen ihren Verschlüsselungsschlüssel innerhalb einer Stunde zurück | kritisch {since=0.9.6} |
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
| `OTEL_EXPORTER_OTLP_LOGS_HEADERS` | `OTEL_EXPORTER_OTLP_HEADERS` | Header für den Collector, nur für die Logs: `api-key=abc,x-scope=flowplan` (kommagetrennt, Werte URL-kodiert). Ohne die Variable gilt `OTEL_EXPORTER_OTLP_HEADERS`. |

Voraussetzung für alles mit Adressen: Der Reverse-Proxy setzt `X-Forwarded-For` und `FLOWPLAN_TRUSTED_PROXIES` stimmt ([Konfiguration](/configuration)). Kommt keine Adresse an, zeigt die Seite einen Hinweis.
