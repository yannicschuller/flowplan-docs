---
keywords: OpenAPI, SDK, TypeScript, Python, Client, Swagger
---

# OpenAPI und SDKs

Jede Instanz beschreibt ihre API selbst, als [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0)-Dokument:

- `GET /api/openapi.json` – das Dokument. Der Eintrag `servers` trägt die Adresse der Instanz (`APP_URL`).
- `/api/docs` – dieselbe Beschreibung zum Lesen: alle Pfade nach Bereichen, Parameter, Anfragen, Antworten und Schemas.

Beides ist nur für Angemeldete und mit einem API-Token (`Authorization: Bearer fp_…`, jede Berechtigung) erreichbar; ohne Anmeldung antwortet `/api/openapi.json` mit `401`, und `/api/docs` bittet um die Anmeldung. Instanzen, die die Beschreibung öffentlich zeigen wollen, setzen `FLOWPLAN_PUBLIC_API_DOCS=true`; Besucher sehen dann unter `info.version` nur die Hauptversion (`0.x`), Angemeldete die genaue.

```sh
curl -H "Authorization: Bearer fp_…" https://flowplan.example.com/api/openapi.json > openapi.json
```

Darin stehen alle Endpunkte, die ein API-Token aufrufen darf: Arbeitsbereich und Seiten, Suche, Dateien, Importe und Exporte, Webhooks, der MCP-Server und `POST /api/command` mit einem Schema je häufig genutzter Aktion (`page.create`, `row.create`, `row.update`, `webhook.delete` …) sowie der Liste aller übrigen Aktionen. Zu jedem Endpunkt sind die Fehlercodes (400, 401, 403, 404, 409, 413, 429) und die Ratenbegrenzungen vermerkt; Kalender-Abos und CalDAV sind als externe Zugänge mit eigenem Link genannt.

Hochgeladene Bilder haben einen Platzhalter: Die Antwort von `POST /api/upload` nennt unter `placeholder` die Größe, in der das Bild erscheint (`w`, `h`), und einen [ThumbHash](https://evanw.github.io/thumbhash/) (`hash`, Base64) – eine unscharfe Vorschau in rund 25 Bytes. `GET /api/files/placeholders?ids=…` liefert dasselbe für bis zu 100 Dateien und Profilbilder (`avatar:<Benutzer-ID>`), aber nur für Dateien, die du auch herunterladen darfst; alles andere fehlt in der Antwort. Für ältere Dateien wird der Platzhalter bei der ersten Anfrage berechnet. Dateien verschlüsselter Bereiche haben nie einen – der Server sieht ihren Inhalt nicht.

Das Dokument entsteht aus dem Code: Wo der Server Eingaben mit `zod` prüft (Eigenschaften und Ansichten einer Datenbank, die Aktionen, Export-Optionen), werden dieselben Schemas übernommen; der Rest ist in `lib/openapi.ts` aus den Routen beschrieben. Ein Test hält beides zusammen – jede Route unter `app/api`, jede Aktion von `command()` und die SDKs.

## Clients

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

Beide Clients schicken bei jeder Änderung von selbst einen [`Idempotency-Key`](/api-and-webhooks#idempotency-key-wiederholen-ohne-doppelte) mit und wiederholen selbst – GET-Anfragen und Änderungen nach einem Netzwerkfehler, `429`, `502`, `503`, `504` oder `409`, solange der erste Versuch noch läuft, standardmäßig zweimal (`retries`, `0` schaltet es ab). Änderungen gehen mit demselben Schlüssel erneut und wirken so nur einmal. Um eine Aktion später zu wiederholen, gib einen eigenen Schlüssel mit: `idempotencyKey` (TypeScript, in den Optionen eines Aufrufs) oder `idempotency_key=` (Python).

Wer Flowplan selbst baut, erzeugt die Clients mit `npm run sdk` neu; der Test `tests/openapi.test.ts` schlägt fehl, wenn die eingecheckten Dateien nicht mehr zum Dokument passen.

## Tags und Eigenschaften per API

- `GET /api/tags?workspace=<id>` – Tags (`id`, `name`, `color`, `position`, `pages`, `records`: Zahl der lesbaren Datenbank-Einträge mit dem Tag) und Eigenschaften (`id`, `name`, `type`, `options`) des Arbeitsbereichs. `GET /api/tags/<tagId>?workspace=<id>` liefert zusätzlich die lesbaren Seiten (`pages`) und Einträge (`records`: `page_id`, `row_id`, `title`, `database`, `space_id`, `updated_at`, `tags`) mit diesem Tag.
- `GET /api/pages/<id>` enthält `properties`: `tags` (Tag-IDs), `values` (nach Eigenschafts-ID) und `info` (erstellt/geändert am/von).
- `POST /api/command` mit `page.properties`: `{ "action": "page.properties", "pageId": "…", "addTags": ["Kunde"], "values": { "Status": "Offen", "Budget": 1200 } }`. Tags und Eigenschaften gehen über ID oder Namen; `tags` ersetzt alle Tags, `addTags`/`removeTags` ändern sie, `null` entfernt einen Wert.
- `POST /api/command` mit `page.collapseProperties`: `{ "action": "page.collapseProperties", "pageId": "…", "collapsed": true }` klappt die Leiste mit Tags und Eigenschaften für dich ein (`false` auf, `null` zurück zur Voreinstellung). Gilt nur für dich, auf allen Geräten; Leserecht auf der Seite genügt.
- `pages.tag` vergibt oder entfernt Tags auf bis zu 500 Seiten auf einmal.
- Eigentümer (für Tags und Eigenschaften eines Bereichs auch dessen Eigentümer): `tag.save`, `tag.delete`, `tag.merge`, `tag.reorder`, `property.save`, `property.delete`, `property.reorder`. Neue Tags (`tag.save` ohne `tagId`) mit `spaceId` dürfen auch Mitglieder anlegen, die in dem Bereich schreiben dürfen; ohne `spaceId` (oder `null`) gilt ein neuer Tag bzw. eine neue Eigenschaft im ganzen Arbeitsbereich (nur Eigentümer).
- Geltungsbereiche ([mehr](/page-tags#geltungsbereich-arbeitsbereich-oder-bereich)): Tags und Eigenschaften in `GET /api/tags` tragen `spaceId` (`null`: ganzer Arbeitsbereich); `GET /api/tags/<id>?sameName=1` nimmt gleichnamige Tags anderer Bereiche dazu. `tag.scope`/`property.scope` (`{ workspaceId, tagId | propertyId, spaceId, resolve?: "block" | "copy" | "remove", mergeSameName? }`, nur Eigentümer) ändern den Geltungsbereich, `meta.usage` (`{ workspaceId, kind, id, spaceId }`) zeigt vorher die Verwendung außerhalb des Ziels.
- Verschieben: `page.moveCheck` (wie `page.move`) listet die Tags und Eigenschaften des bisherigen Bereichs, die das Ziel nicht hat (`foreign`, mit `sameName` und `candidates`). `page.move` und `pages.bulk` nehmen dafür `meta`: `{ "tags": { "<id>": { "action": "map", "to": "<id>" } }, "properties": { "<id>": { "action": "copy" } } }` oder kurz `"auto"` (gleichnamige zuordnen, sonst kopieren), `"copy"`, `"remove"`. Fehlt die Wahl, antwortet `page.move` mit 409 statt Werte zu verwerfen.
- Vorlagen: `template.save` gehört ohne `spaceId` zum Bereich der Seite, mit `spaceId: null` zum ganzen Arbeitsbereich (Eigentümer; Tags des Bereichs: 409 oder `spaceMeta: "remove"`). `template.dependencies` (`{ workspaceId, templateId, spaceId }`) listet, was eine Vorlage eines anderen Bereichs mitbringt (Schlüssel `tag:<name>`, `property:<name>`); `page.create`, `template.apply` und `template.copy` (`{ workspaceId, templateId, spaceId, meta? }`) nehmen die Wahl als `meta`, `template.update` ändert mit `spaceId` den Geltungsbereich einer Vorlage. `GET /api/templates` liefert `space_id` und `space_name`.
- Text-Eigenschaften (außer dem Titel) enthalten Inline-Markdown – in `row.create`, `row.update`, `rows.bulk`, `rows.import`, beim Lesen und in Webhooks: `**fett**`, `_kursiv_`, `~~durchgestrichen~~`, `` `Code` ``, `[Text](https://…)` (nur http, https, mailto), `\n` für einen Zeilenumbruch. Reiner Text wird maskiert gesendet: ein Backslash vor `` \ * _ ~ ` [ ] ``. Siehe [Formatierter Text](/database-properties#formatierter-text).
- Datenbank-Eigenschaften mit den Tags als Optionen: in `database.update` eine `multiselect`-Eigenschaft mit `"tagOptions": true` (ihre `options` setzt der Server). Zellen enthalten Tag-Namen; ein neuer Name in `row.create`, `row.update` oder `rows.bulk` legt den Tag an (Mitglieder mit Bearbeitungsrecht, sonst 403); `rows.import` lässt Namen weg, die kein Tag werden dürfen. MCP nennt solche Eigenschaften in `get_database` mit `tagOptions: true`.
- In `GET /api/search` wirken `#tag`, `-#tag`, `name:wert`, `OR`, `NOT`, Klammern, `created_by:`, `created:`, `type:`, `in:` und `title:` als Filter (Parameter `tz`: Zeitzone für `today` usw.) (siehe [Suche](/search-and-notifications#nach-tags-und-eigenschaften-filtern)). MCP-Clients bekommen Tags und Werte mit `read_page` als Frontmatter.

## Datensatz-Versionen

`row.update` trägt die `version` des Datensatzes, die du gelesen hast. Hat sich der Datensatz seitdem geändert, antwortet der Server mit `409` – außer du schickst zusätzlich `base` mit: die Werte der geänderten Eigenschaften, so wie du sie gelesen hast. Dann wird die Änderung übernommen, solange niemand diese Eigenschaften inzwischen geändert hat; nur ein echter Konflikt (jemand hat dieselbe Eigenschaft geändert) bekommt die `409`. Die Antworten auf `row.update` und die anderen Änderungen eines Datensatzes (`row.move`, `row.schedule` …) enthalten seine neue `rowVersion`; die schickst du mit der nächsten Änderung.

## Sammlungen per API

- `GET /api/collections?workspace=<id>` – deine und die mit dem Arbeitsbereich geteilten Sammlungen in deiner Reihenfolge: `id`, `name`, `icon`, `query`, `shared`, `mine`, `canEdit`, `ownerName`.
- `GET /api/collections/<id>?tz=Europe/Berlin` – führt eine Sammlung aus. Du bekommst `collection`, `items` (`pageId`, `rowId`, `type`, `title`, `icon`, `spaceId`, `database`, `tags`, `createdAt`, `updatedAt`, `createdBy`, `creatorName`; zuletzt geänderte zuerst, höchstens 500), `total`, `truncated` und `encryptedLeftOut`. Die Treffer folgen immer den Rechten des Tokens bzw. der Person.
- `GET /api/collections/preview?workspace=<id>&q=<Abfrage>` – die ersten 50 Treffer einer nicht gespeicherten Abfrage und ihre Normalform (`query`).
- `POST /api/command`:
  - `collection.create` `{ workspaceId, name, query, icon?, shared? }`
  - `collection.update` `{ collectionId, name?, query?, icon?, shared? }`
  - `collection.delete` / `collection.restore` `{ collectionId }`
  - `collection.duplicate` `{ collectionId, name? }`
  - `collection.reorder` `{ workspaceId, order: [ids] }`
  Die Abfrage wird in ihrer Normalform gespeichert und mit `query` zurückgegeben. `search.save` und `search.delete` funktionieren weiter und legen bzw. löschen Sammlungen.
- MCP: `list_collections`, `run_collection` (lesen), `save_collection`, `delete_collection` (schreiben).
