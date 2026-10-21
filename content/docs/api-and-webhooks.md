# API und Webhooks

Mit persönlichen API-Tokens greifen Skripte, n8n oder Home Assistant auf Flowplan zu; Webhooks melden neue Einträge, Formularantworten und Seiten an andere Dienste.

## API-Tokens

Unter **Einstellungen → API & Webhooks** legst du Tokens an: mit Namen, **Nur lesen** oder **Lesen und schreiben**. Das Token erscheint nur einmal – danach sieht man nur seinen Anfang. Ein Token **Nur lesen** wird bei jeder schreibenden Anfrage abgewiesen, auch bei Backup-Wiederherstellung und Datei-Uploads.

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

**Markdown-Export** geht auch mit einem Lese-Token, denn er liest nur – etwa für einen Cron-Job, der den Export in ein Git-Repository überträgt (oder Flowplan erledigt das selbst, siehe [Markdown-Export und Git](/storage-and-backups#markdown-export-und-git)):

```bash
curl -sf -X POST https://flowplan.example.com/api/markdown-export \
  -H "Authorization: Bearer fp_…" -H "Content-Type: application/json" \
  -d '{"pageId":"<Seiten-ID>","format":"zip","includeSubpages":true,"history":true}' -o export.zip
```

Statt `pageId` exportiert `spaceId` einen ganzen [Bereich](/import-export-versions#einen-ganzen-bereich-exportieren) in ein ZIP: `{"spaceId":"<Bereichs-ID>","format":"zip","history":true}`.

Tokens bekommen nie Administratorrechte und können keine weiteren Tokens anlegen. Widerrufen geht jederzeit in derselben Liste; gesperrte Konten verlieren ihre Tokens automatisch.

Um Claude, ChatGPT oder andere KI-Assistenten anzubinden, nutzt du den [MCP-Server](/mcp) mit einem solchen Token.

## Webhooks

Eigentümer eines Arbeitsbereichs legen Webhooks an: Adresse, Ereignisse und optional eine einzelne Datenbank.

| Ereignis | Wann |
| --- | --- |
| `row.created` | Neuer Eintrag in einer Datenbank, auch aus einem Formular |
| `row.updated` | Eintrag geändert (`changed` nennt die Eigenschaften) |
| `form.submitted` | Formularantwort |
| `page.created` | Neue Seite |

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

### Signatur prüfen

Die Kopfzeile `X-Flowplan-Signature: sha256=<hex>` ist die HMAC-SHA256-Signatur des Inhalts mit dem geheimen Schlüssel, der beim Anlegen einmal angezeigt wird:

```js
import { createHmac, timingSafeEqual } from "node:crypto";
const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
const valid = timingSafeEqual(Buffer.from(expected), Buffer.from(req.headers["x-flowplan-signature"]));
```

### Zustellung

- Antworten mit Status 2xx gelten als zugestellt; sonst wiederholt Flowplan bis zu sechs Mal mit wachsendem Abstand.
- Die Liste zeigt je Webhook die letzte Zustellung oder den letzten Fehler.
- Nur öffentliche HTTPS-Adressen sind erlaubt. Für Dienste im selben Netz (Home Assistant, n8n) setzt die Administration `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true`.

### Webhooks per API anlegen

Mit einem **Schreib-Token** eines Eigentümers lassen sich Webhooks auch per API anlegen und entfernen (`POST /api/webhooks`, Entfernen über `POST /api/command` mit `{"action": "webhook.delete", …}`), etwa von Automatisierungsdiensten. Lese-Tokens dürfen das nicht.

## OpenAPI und SDKs

Jede Instanz beschreibt ihre API selbst, als [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0)-Dokument:

- `GET /api/openapi.json` – das Dokument, öffentlich und eine Stunde zwischengespeichert. Der Eintrag `servers` trägt die Adresse der Instanz (`APP_URL`).
- `/api/docs` – dieselbe Beschreibung zum Lesen: alle Pfade nach Bereichen, Parameter, Anfragen, Antworten und Schemas.

Darin stehen alle Endpunkte, die ein API-Token aufrufen darf: Arbeitsbereich und Seiten, Suche, Dateien, Importe und Exporte, Webhooks, der MCP-Server und `POST /api/command` mit einem Schema je häufig genutzter Aktion (`page.create`, `row.create`, `row.update`, `webhook.delete` …) sowie der Liste aller übrigen Aktionen. Zu jedem Endpunkt sind die Fehlercodes (400, 401, 403, 404, 409, 413, 429) und die Ratenbegrenzungen vermerkt; Kalender-Abos und CalDAV sind als externe Zugänge mit eigenem Link genannt.

Das Dokument entsteht aus dem Code: Wo der Server Eingaben mit `zod` prüft (Eigenschaften und Ansichten einer Datenbank, die Aktionen, Export-Optionen), werden dieselben Schemas übernommen; der Rest ist in `lib/openapi.ts` aus den Routen beschrieben. Ein Test hält beides zusammen – jede Route unter `app/api`, jede Aktion von `command()` und die SDKs.

### Clients

Aus dem Dokument entstehen zwei schlanke Clients ohne Abhängigkeiten, im Quellcode unter [`sdk/`](https://github.com/yannicschuller/flowplan/tree/main/sdk):

- **TypeScript** (`sdk/typescript/flowplan.ts`): eine Datei, ESM, auf `fetch` aufgebaut, mit Typen für alle Antworten und Aktionen. Die Datei ins Projekt kopieren, fertig:

```ts
import { FlowplanClient } from "./flowplan.js";
const client = new FlowplanClient({ baseUrl: "https://flowplan.example.com", token: "fp_…" });
const { workspace, pages } = await client.bootstrap();
const { id } = await client.command({ action: "row.create", pageId: "<Datenbank-ID>", cells: { title: "Aus dem SDK" } });
```

- **Python** (`sdk/python/flowplan_client.py`): nur Standardbibliothek (`urllib`), Python 3.11 oder neuer, `TypedDict`s für die Antworten:

```python
from flowplan_client import FlowplanClient
client = FlowplanClient("https://flowplan.example.com", token="fp_…")
shell = client.bootstrap()
created = client.command({"action": "row.create", "pageId": "<Datenbank-ID>", "cells": {"title": "Aus dem SDK"}})
```

Die Methoden heißen wie die `operationId` des Dokuments (`getPage` / `get_page`, `search`, `uploadFile` / `upload_file`, `markdownExport` / `markdown_export` …). Antworten außerhalb von 2xx werfen `FlowplanError` mit Status, Meldung des Servers und bei 429 der Wartezeit. Jedes SDK bringt eine README und ein Beispielskript mit.

Wer Flowplan selbst baut, erzeugt die Clients mit `npm run sdk` neu; der Test `tests/openapi.test.ts` schlägt fehl, wenn die eingecheckten Dateien nicht mehr zum Dokument passen.

## n8n

Für [n8n](https://n8n.io) gibt es den Community-Knoten **`n8n-nodes-flowplan`** (Quellcode unter [`integrations/n8n`](https://github.com/yannicschuller/flowplan/tree/main/integrations/n8n)).

1. In n8n unter **Settings → Community Nodes** das Paket `n8n-nodes-flowplan` installieren.
2. Zugangsdaten **Flowplan API** anlegen: Adresse deiner Instanz und ein [API-Token](#api-tokens).
3. Knoten verwenden:
   - **Flowplan** liest Arbeitsbereiche und Seiten, legt Seiten an (optional mit Markdown-Inhalt), liest, erstellt und ändert Datenbankeinträge (Eigenschaften nach Namen) und sucht.
   - **Flowplan Trigger** startet Workflows bei neuen oder geänderten Einträgen, Formularantworten und neuen Seiten. Er legt seinen Webhook beim Aktivieren selbst an (dafür ein Schreib-Token eines Eigentümers), entfernt ihn beim Deaktivieren und weist Zustellungen mit falscher Signatur ab.

Läuft n8n im eigenen Netz, `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE=true` setzen ([Konfiguration](/configuration#integrationen)).

## Kalender-Abos

Kalenderansichten lassen sich als iCalendar-Link abonnieren, siehe [Ansichten](/views#kalender-abonnieren).
