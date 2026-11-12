---
keywords: API, REST, Token, Webhook, Idempotenz, n8n, Integration
---

# API und Webhooks

Mit persönlichen API-Tokens greifen Skripte, n8n oder Home Assistant auf Flowplan zu; Webhooks melden neue Einträge, Formularantworten und Seiten an andere Dienste.

**Mehr zum Thema:** [OpenAPI und SDKs](/openapi) · [E-Mail-Eingang](/inbound-email) · [Chat-Benachrichtigungen](/chat-notifications)

## API-Tokens

Unter **Einstellungen → API & KI-Assistenten** legst du Tokens an: mit Namen, **Nur lesen**, **Lesen und schreiben** oder **Nur Browser-Erweiterung**. Das Token erscheint nur einmal – danach sieht man nur seinen Anfang. Ein Token **Nur lesen** wird bei jeder schreibenden Anfrage abgewiesen, auch bei Backup-Wiederherstellung und Datei-Uploads.

- **Nur Browser-Erweiterung:** für die [Browser-Erweiterung](/browser-extension). Das Token erreicht nur /api/clipper/targets und /api/clipper/save; überall sonst gilt es als kein Token.
- **Marketplace-Prüfung:** ein Häkchen beim Anlegen, standardmäßig aus (nicht bei Tokens **Nur Browser-Erweiterung**). Damit erreicht das Token die [Import-Prüfung](/marketplace#import-pruefen) für Marketplace-Pakete (`POST /api/marketplace/check`) – auch als Token **Nur lesen**, denn die Prüfung behält nichts. Einen echten Import erlaubt die Berechtigung nie; dafür braucht es wie bisher ein Token **Lesen und schreiben**. Ohne die Berechtigung antwortet `/api/marketplace/check` mit 403.

Jede Anfrage mit dem Token handelt mit deinen Rechten:

```bash
curl -H "Authorization: Bearer fp_…" https://flowplan.example.com/api/bootstrap
```

- **Lesen**: alle `GET`-Endpunkte, etwa `/api/bootstrap` (Arbeitsbereich, Seiten), `/api/pages/<id>` (Dokument oder Datenbank mit Einträgen).
  In der Antwort einer Datenbank stehen die Einträge unter `rows` (mit `preview` statt des vollständigen Dokuments); `related` enthält verknüpfte Datenbanken, die eigenen Einträge nur unter `rows`.
- **Schreiben**: `POST /api/command` mit derselben Aktion wie die Oberfläche, z. B. einen Eintrag anlegen:

```bash
curl -X POST https://flowplan.example.com/api/command \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"action":"row.create","pageId":"<Datenbank-ID>","cells":{"title":"Aus Home Assistant"}}'
```

**Markdown-Export** geht auch mit einem Lese-Token, denn er liest nur – etwa für einen Cron-Job, der den Export in ein Git-Repository überträgt (oder Flowplan erledigt das selbst, siehe [Markdown-Export und Git](/markdown-git-export)):

```bash
curl -sf -X POST https://flowplan.example.com/api/markdown-export \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"pageId":"<Seiten-ID>","format":"zip","includeSubpages":true,"history":true}' -o export.zip
```

Statt `pageId` exportiert `spaceId` einen ganzen [Bereich](/export#einen-ganzen-bereich-exportieren) in ein ZIP: `{"spaceId":"<Bereichs-ID>","format":"zip","history":true}`.

**Blocklinks:** `GET /api/pages/{pageId}/blocks/{blockId}` liefert Titel und Textanfang eines Blocks (mit `?row=` für Einträge), `GET /api/blocks?workspace=…&q=…` sucht Überschriften und Blöcke, und die Aktion `block.ids` gibt den Blöcken eines älteren Dokuments ihre Kennungen.

Tokens bekommen nie Administratorrechte und können keine weiteren Tokens anlegen. Widerrufen geht jederzeit in derselben Liste; gesperrte Konten verlieren ihre Tokens automatisch.

Um Claude, ChatGPT oder andere KI-Assistenten anzubinden, nutzt du den [MCP-Server](/mcp) mit einem solchen Token.

## Idempotency-Key: Wiederholen ohne Doppelte

Eine Anfrage kann ohne Antwort scheitern – die Verbindung bricht ab, ein Proxy läuft in sein Zeitlimit –, obwohl Flowplan sie schon ausgeführt hat. Damit ein Skript einfach noch einmal senden kann, nimmt jede ändernde Anfrage den Header `Idempotency-Key`: ein Schlüssel pro Vorgang (z. B. eine UUID v4, 8–128 Zeichen aus `A–Z a–z 0–9 _ -`), bei jeder Wiederholung dieses Vorgangs **unverändert** mitgeschickt.

```bash
KEY=$(uuidgen)
curl -X POST https://flowplan.example.com/api/command \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -H "Idempotency-Key: $KEY" \
  -d '{"action":"comment.create","pageId":"<Seiten-ID>","body":"Ausgerollt"}'
# Dieselbe Anfrage mit demselben Schlüssel noch einmal: kein zweiter Kommentar.
```

- **Erste Anfrage:** wird ausgeführt; der Schlüssel wird mit der Antwort gespeichert. Bei `POST /api/command` geschieht das in derselben Transaktion wie die Änderung – beides oder keins.
- **Gleicher Schlüssel, gleiche Anfrage** (Methode, Pfad und Inhalt): die gespeicherte Antwort mit demselben Status, gekennzeichnet mit `Idempotent-Replayed: true`. Nichts wird erneut ausgeführt.
- **Gleicher Schlüssel, andere Anfrage:** `422` (`code: idempotency_key_reused`).
- **Erste Anfrage läuft noch:** `409` mit `Retry-After` (`code: idempotency_in_progress`) – kurz warten und mit demselben Schlüssel erneut senden.
- **Antworten mit Geheimnissen** (ein neues API-Token, eine Abo-Adresse, ein Zugangspasswort) und Antworten über 64 KB werden nicht gespeichert: Eine Wiederholung bekommt `409` (`code: idempotency_already_applied`) statt das Geheimnis ein zweites Mal.
- Ein ungültiger Schlüssel ergibt `400` (`code: idempotency_key_invalid`). Eine gescheiterte Anfrage (4xx, 5xx) hinterlässt keinen Schlüssel – nach Behebung der Ursache geht sie mit demselben Schlüssel erneut.

Schlüssel gehören dem, der sie sendet: der Person in der Web-App, dem API-Token oder der App-Installation (Widgets, Kurzbefehle, Teilen-Menü). Derselbe Schlüssel eines anderen Tokens oder einer anderen Person ist ein anderer Schlüssel. Schlüssel verfallen nach 24 Stunden. Anfragen ohne den Header funktionieren wie bisher.

Den Header nehmen `POST /api/command`, Uploads (`/api/upload`), Importe, Webhooks, Zeitberichte, die Issue-Synchronisierung, `/api/clipper/save` der Browser-Erweiterung und die Aktionen der Mobil-Apps; das [OpenAPI-Dokument](/openapi) kennzeichnet diese Operationen (`x-idempotent`). Die Web-App, die Mobil-Apps (Widgets, Kurzbefehle, Teilen-Menü, Mitteilungs-Buttons, offline vorgemerkte Änderungen) und die erzeugten SDKs schicken bei jeder Änderung von sich aus einen Schlüssel und behalten ihn, wenn sie wiederholen – ein Doppelklick, ein Tippen bei schwachem Empfang oder ein Wiederverbinden führt eine Änderung nie zweimal aus.

## Webhooks

Webhooks haben einen eigenen Abschnitt: **Einstellungen → Webhooks** (Gruppe „Verbindungen“, nur für Eigentümer). Eigentümer eines Arbeitsbereichs legen dort mit **Webhook anlegen** Webhooks an: Adresse, Ereignisse und optional eine einzelne Datenbank. Die Liste zeigt jeden Webhook mit Format, letzter Zustellung und Ereignissen. Jeder Webhook hat eine eigene Seite (`/#settings/webhooks/<id>`) mit den Karten **Ziel** (Format, Adresse, Datenbank, Zugangsdaten für Slack/Matrix), **Ereignisse** (ein Schalter je Ereignis), **Nachricht** (nur Chat-Formate), **Vorschau** und – bei bestehenden Webhooks – **Zustellung** mit **Testnachricht senden**; gespeichert wird mit **Änderungen speichern**, gelöscht in der **Gefahrenzone** mit **Webhook löschen …**. Der geheime Schlüssel erscheint nach dem Anlegen einmal über der Liste.

Gespeicherte Zugangsdaten (das Token für Slack oder Matrix) gehen nie an eine neue Adresse: Wer die Adresse eines Webhooks mit Token oder sein Format ändert, gibt das Token erneut ein, sonst wird nicht gespeichert.

Ein Webhook handelt mit den Rechten der Person, die ihn angelegt hat: Er meldet nur Seiten, Datensätze und Kommentare, die sie lesen darf – Inhalte aus privaten Bereichen anderer bleiben draußen, verborgene Eigenschaften ebenso. Wird diese Person deaktiviert oder verlässt sie den Arbeitsbereich, stellt der Webhook nichts mehr zu. Adresse und geheimer Schlüssel werden verschlüsselt gespeichert.

| Ereignis | Wann |
| --- | --- |
| `row.created` | Neuer Eintrag in einer Datenbank, auch aus einem Formular |
| `row.updated` | Eintrag geändert (`changed` nennt die Eigenschaften) |
| `row.done` | Ein Eintrag wurde erledigt (Status „Erledigt“ o. Ä. oder die eingestellte Erledigt-Regel der Datenbank) |
| `form.submitted` | Formularantwort |
| `page.created` | Neue Seite |
| `comment.created` | Neuer Kommentar an einer Seite oder einem Eintrag (`text`) |
| `mention` | Jemand wurde in einer Seite oder einem Eintrag erwähnt (`userId`, `text` = Name) |
| `digest.due` | Einmal am Tag zur eingestellten Uhrzeit: offene Einträge, die heute fällig oder überfällig sind (`items`) |

Flowplan sendet ein JSON per `POST`:

```json
{
  "event": "row.created",
  "id": "…",
  "createdAt": "2026-09-27T10:00:00.000Z",
  "workspaceId": "…",
  "data": { "pageId": "…", "rowId": "…", "cells": { "title": "Neu" } }
}
```

Die Testnachricht aus den Einstellungen kommt mit dem Ereignis `test`.

### Signatur prüfen

Die Kopfzeile `X-Flowplan-Signature: sha256=<hex>` ist die HMAC-SHA256-Signatur des Inhalts mit dem geheimen Schlüssel, der beim Anlegen einmal angezeigt wird:

```js
import { createHmac, timingSafeEqual } from "node:crypto";
const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
const valid = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers["x-flowplan-signature"]));
```

### Zustellung

- Antworten mit Status 2xx gelten als zugestellt; sonst wiederholt Flowplan bis zu sechs Mal mit wachsendem Abstand.
- Die Liste unter **Einstellungen → Webhooks** zeigt je Webhook Format, letzte Zustellung oder letzten Fehler und die Ereignisse.
- Nur öffentliche HTTPS-Adressen sind erlaubt. Für Dienste im selben Netz (Home Assistant, n8n) setzt die Administration `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true`.
- **Testnachricht senden** in der Liste oder auf der Seite des Webhooks (Karte **Zustellung**) schickt sofort eine Beispielnachricht und zeigt das Ergebnis; sie wird nicht wiederholt. Unter der letzten Zustellung steht außerdem der letzte Fehler mit Zeitpunkt.

### Webhooks per API anlegen

Mit einem **Schreib-Token** eines Eigentümers lassen sich Webhooks auch per API anlegen, ändern und entfernen (`POST /api/webhooks`, `POST /api/webhooks/update`, Testnachricht mit `POST /api/webhooks/test`; Entfernen über `POST /api/command` mit `{"action": "webhook.delete", …}`), etwa von Automatisierungsdiensten. Lese-Tokens dürfen das nicht.

## Workflows

[Workflows](/workflows) lassen sich vollständig per API steuern (alle Routen im OpenAPI-Dokument unter *Workflows*):

| Route | Zweck |
| --- | --- |
| `GET /api/workflows?workspaceId=` | Liste mit Status, „läuft als“ und letztem Lauf |
| `GET /api/workflows/catalog` | Knotenkatalog mit Einstellungen als JSON Schema |
| `GET /api/workflows/{id}` | Status, aktive Version, Entwurf mit Prüfergebnis (Bearbeitende) |
| `POST /api/workflows/{id}/draft` | Entwurf durch ein Graph-JSON ersetzen |
| `POST /api/workflows/{id}/test` | Probe- oder Testlauf des Entwurfs |
| `POST /api/workflows/{id}/activate` | aktivieren – du wirst die ausführende Person (Schreib-Token) |
| `POST /api/workflows/{id}/pause` | pausieren, optional offene Läufe abbrechen |
| `POST /api/workflows/{id}/run` | Workflow mit manuellem Auslöser starten |
| `GET /api/workflows/{id}/runs`, `GET /api/workflow-runs/{runId}` | Läufe und Schritte |
| `POST /api/workflow-runs/{runId}/retry` / `cancel` | wiederholen ab dem fehlgeschlagenen Knoten / abbrechen |
| `GET /api/workflows/{id}/export`, `POST /api/workflows/import` | JSON-Export (ohne Geheimnisse) und Import als Entwurf |

Lese-Tokens lesen nur. Freigaben entscheidet nur eine angemeldete Person, nie ein Token. `activate`, `run` und `import` nehmen einen `Idempotency-Key`. Die SDKs haben dafür eigene Methoden (`saveWorkflowDraft`, `testWorkflow`, `activateWorkflow`, `runWorkflow` …).

### Eingehender Workflow-Webhook

Der Auslöser **Eingehender Webhook** hat eine eigene Adresse `POST /api/workflow-hooks/<token>` (im Knoten zu sehen, rotierbar). Standard ist **signiert**: `X-Flowplan-Timestamp` (Unix-Sekunden, höchstens 5 Minuten alt) und `X-Flowplan-Signature: sha256=<HMAC-SHA256(Geheimnis, Zeitstempel + "." + Körper)>`. Jede Signatur zählt einmal. Die Antwort ist sofort `202` mit der Lauf-ID.

```bash
body='{"title":"Server down","description":"web-1 antwortet nicht"}'
ts=$(date +%s)
sig=$(printf '%s.%s' "$ts" "$body" | openssl dgst -sha256 -hmac "$SECRET" | cut -d' ' -f2)
curl -X POST "$URL" -H "Content-Type: application/json" -H "X-Flowplan-Timestamp: $ts" -H "X-Flowplan-Signature: sha256=$sig" -d "$body"
```

```js
const ts = Math.floor(Date.now() / 1000).toString();
const sig = crypto.createHmac("sha256", secret).update(`${ts}.${body}`).digest("hex");
await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", "X-Flowplan-Timestamp": ts, "X-Flowplan-Signature": `sha256=${sig}` }, body });
```

```python
ts = str(int(time.time()))
sig = hmac.new(secret.encode(), f"{ts}.{body}".encode(), hashlib.sha256).hexdigest()
urllib.request.urlopen(urllib.request.Request(url, body.encode(), {"Content-Type": "application/json", "X-Flowplan-Timestamp": ts, "X-Flowplan-Signature": "sha256=" + sig}))
```

Für Dienste, die nicht signieren können, gibt es bewusst gewählt **Nur Token** (höchstens 10 Aufrufe je Minute). Der HTTP-Knoten eines Workflows schickt ausgehend einen `Idempotency-Key: <Lauf>:<Knoten>:<Durchlauf>`, damit Wiederholungen beim Empfänger nicht doppelt wirken.

## n8n

Für [n8n](https://n8n.io) gibt es den Community-Knoten **`n8n-nodes-flowplan`** (Quellcode unter [`integrations/n8n`](https://github.com/yannicschuller/flowplan/tree/main/integrations/n8n)).

::: steps

1. In n8n unter **Settings → Community Nodes** das Paket `n8n-nodes-flowplan` installieren.
2. Zugangsdaten **Flowplan API** anlegen: Adresse deiner Instanz und ein [API-Token](#api-tokens).
3. Knoten verwenden:
   - **Flowplan** liest Arbeitsbereiche und Seiten, legt Seiten an (optional mit Markdown-Inhalt), liest, erstellt und ändert Datenbankeinträge (Eigenschaften nach Namen) und sucht.
   - **Flowplan Trigger** startet Workflows bei neuen oder geänderten Einträgen, Formularantworten und neuen Seiten. Er legt seinen Webhook beim Aktivieren selbst an (dafür ein Schreib-Token eines Eigentümers), entfernt ihn beim Deaktivieren und weist Zustellungen mit falscher Signatur ab.

:::

Läuft n8n im eigenen Netz, `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` setzen ([Konfiguration](/configuration-integrations#integrationen)).

## Kalender-Abos

Kalenderansichten lassen sich als iCalendar-Link abonnieren, siehe [Ansichten](/views#kalender-abonnieren).
