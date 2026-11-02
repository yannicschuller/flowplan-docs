# API und Webhooks

Mit persönlichen API-Tokens greifen Skripte, n8n oder Home Assistant auf Flowplan zu; Webhooks melden neue Einträge, Formularantworten und Seiten an andere Dienste.

## API-Tokens

Unter **Einstellungen → API & KI-Assistenten** legst du Tokens an: mit Namen, **Nur lesen**, **Lesen und schreiben** oder **Nur Browser-Erweiterung**. Das Token erscheint nur einmal – danach sieht man nur seinen Anfang. Ein Token **Nur lesen** wird bei jeder schreibenden Anfrage abgewiesen, auch bei Backup-Wiederherstellung und Datei-Uploads.

- **Nur Browser-Erweiterung:** für die [Browser-Erweiterung](/browser-extension). Das Token erreicht nur /api/clipper/targets und /api/clipper/save; überall sonst gilt es als kein Token.

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

Den Header nehmen `POST /api/command`, Uploads (`/api/upload`), Importe, Webhooks, Zeitberichte, die Issue-Synchronisierung, `/api/clipper/save` der Browser-Erweiterung und die Aktionen der Mobil-Apps; das [OpenAPI-Dokument](#openapi-und-sdks) kennzeichnet diese Operationen (`x-idempotent`). Die Web-App, die Mobil-Apps (Widgets, Kurzbefehle, Teilen-Menü, Mitteilungs-Buttons, offline vorgemerkte Änderungen) und die erzeugten SDKs schicken bei jeder Änderung von sich aus einen Schlüssel und behalten ihn, wenn sie wiederholen – ein Doppelklick, ein Tippen bei schwachem Empfang oder ein Wiederverbinden führt eine Änderung nie zweimal aus.

## Webhooks

Webhooks haben einen eigenen Abschnitt: **Einstellungen → Webhooks** (Gruppe „Verbindungen“, nur für Eigentümer). Eigentümer eines Arbeitsbereichs legen dort mit **Webhook anlegen** Webhooks an: Adresse, Ereignisse und optional eine einzelne Datenbank. Die Liste zeigt jeden Webhook mit Format, letzter Zustellung und Ereignissen. Jeder Webhook hat eine eigene Seite (`/#settings/webhooks/<id>`) mit den Karten **Ziel** (Format, Adresse, Datenbank, Zugangsdaten für Slack/Matrix), **Ereignisse** (ein Schalter je Ereignis), **Nachricht** (nur Chat-Formate), **Vorschau** und – bei bestehenden Webhooks – **Zustellung** mit **Testnachricht senden**; gespeichert wird mit **Änderungen speichern**, gelöscht in der **Gefahrenzone** mit **Webhook löschen …**. Der geheime Schlüssel erscheint nach dem Anlegen einmal über der Liste.

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

## Chat-Benachrichtigungen

Statt JSON kann ein Webhook eine fertige Nachricht in einen Chat schicken. Auf der Seite des Webhooks unter **Einstellungen → Webhooks** wählst du in der Karte **Ziel** das **Format**:

| Format | Ziel | Was ankommt |
| --- | --- | --- |
| JSON | n8n, Home Assistant, eigene Dienste | Das signierte JSON oben |
| Slack | Incoming Webhook oder eine Slack-App | Block Kit: Überschrift, Text mit dem Eintrag als Link, Felder für geänderte Eigenschaften, Zeile mit Person und Zeit |
| Matrix | Raum-Webhook (z. B. hookshot) oder die Matrix-Client-API | HTML-Nachricht (`formatted_body`) mit reinem Text als `body` |
| Microsoft Teams | Incoming Webhook bzw. Workflow „Bei Empfang einer Webhook-Anforderung posten“ | Adaptive Card mit Faktenliste und Schaltfläche **In Flowplan öffnen** |
| Discord | Kanal-Webhook | Embed mit Titel, Link, Feldern und Zeitstempel |

Neben dem Formular zeigt eine **Vorschau** die Nachricht für ein Beispielereignis, darunter den Inhalt, der tatsächlich gesendet wird.

### Einrichten

**Slack**

- *Nur Nachrichten:* In Slack eine App anlegen (api.slack.com/apps), **Incoming Webhooks** einschalten, einen Kanal wählen und die Adresse `https://hooks.slack.com/services/…` in Flowplan eintragen.
- *Mit Antworten im Thread:* Der App unter **OAuth & Permissions** das Recht `chat:write` geben, installieren und den **Bot User OAuth Token** (`xoxb-…`) sowie die **Kanal-ID** (in Slack: Kanaldetails, ganz unten) eintragen; den Bot in den Kanal einladen (`/invite @App`). Für Antworten zusätzlich das **Signing Secret** (Basic Information) eintragen. Nach dem Speichern zeigt die Seite des Webhooks (Karte **Zustellung**) eine **Request URL** (`…/api/webhooks/slack/<id>`): In der App unter **Event Subscriptions** einschalten, diese Adresse eintragen und das Bot-Ereignis `message.channels` (bei privaten Kanälen `message.groups`) abonnieren. Antworten im Thread einer Flowplan-Nachricht erscheinen dann als Kommentar am Eintrag – geschrieben im Namen der Person, die den Webhook eingerichtet hat, mit dem Präfix „Slack:“. Threads werden 30 Tage lang zugeordnet.

**Matrix**

- *Raum-Webhook:* Mit einer Brücke wie hookshot einen „generic webhook“ im Raum anlegen und dessen Adresse eintragen. Flowplan sendet `text` und `html` (plus die Felder einer Matrix-Nachricht).
- *Client-API:* Für ein Bot-Konto ein Zugriffstoken erzeugen, das Konto in den Raum einladen und in Flowplan die **Adresse des Homeservers** (z. B. `https://matrix.example.org`), das **Zugriffstoken** und den **Raum** (`!id:server` oder `#alias:server`) eintragen. Flowplan sendet mit `PUT /_matrix/client/v3/rooms/{raum}/send/m.room.message/{txn}`; Wiederholungen derselben Zustellung erzeugen keine doppelten Nachrichten.

**Microsoft Teams**

- In Teams beim Kanal einen Workflow mit der Vorlage „Bei Empfang einer Webhook-Anforderung in einem Kanal posten“ anlegen (oder einen klassischen Incoming Webhook) und die angezeigte Adresse eintragen.

**Discord**

- In den Kanaleinstellungen unter **Integrationen → Webhooks** einen Webhook anlegen und die Adresse `https://discord.com/api/webhooks/…` eintragen. Erwähnungen (@everyone usw.) werden nie ausgelöst.

Zugriffstoken, Bot-Token und Signing Secret werden verschlüsselt gespeichert und nie wieder angezeigt; beim Bearbeiten bleibt ein leeres Feld beim gespeicherten Wert, **Gespeicherte Zugangsdaten entfernen** löscht sie. Auch für Chat-Adressen gilt: nur öffentliches HTTPS, jede Zustellung prüft die Adresse erneut.

### Vorlagen

Für jedes Ereignis gibt es einen Standardtext, den du im Formular ändern kannst (Auswahl **Vorlage für Ereignis**). Die Schaltflächen fügen Platzhalter ein:

| Platzhalter | Inhalt |
| --- | --- |
| `{title}` | Titel des Eintrags oder der Seite |
| `{actor}` | Wer es ausgelöst hat |
| `{page}` | Datenbank bzw. übergeordnete Seite |
| `{changes}` | Geänderte Eigenschaften als Liste (in der Übersicht: die fälligen Einträge) |
| `{url}` | Link in Flowplan |
| `{text}` | Kommentartext bzw. Name der erwähnten Person |
| `{date}` | Datum und Uhrzeit (in der Übersicht: der Tag) |
| `{count}` | Anzahl der Änderungen bzw. fälligen Einträge |

Erlaubt ist ein kleines Markdown: `**fett**`, `_kursiv_`, `` `Code` ``, `[Text](Adresse)`, Zeilen mit `- ` als Liste und `> ` als Zitat. Flowplan übersetzt das in die Auszeichnung der Plattform (Slack mrkdwn, Matrix-HTML, Teams-Markdown, Discord-Markdown). Werte aus Flowplan werden nie als Auszeichnung gelesen – ein `*` im Titel bleibt ein `*`. Steht `{changes}` nicht in der Vorlage, zeigen Slack, Teams und Discord die Änderungen als eigene Felder, Matrix als Liste darunter. Lange Werte werden gekürzt (Titel 200 Zeichen, Kommentar 1.000, höchstens 10 Änderungen und 25 fällige Einträge), damit die Grenzen der Plattformen eingehalten werden. Die **Sprache der Nachrichten** (Standardtexte, Datumsformat) ist je Webhook einstellbar.

Beispiel:

```text
{actor} hat [{title}]({url}) in **{page}** geändert:
{changes}
```

### Tägliche Übersicht

Mit dem Ereignis **Heute fällig** (`digest.due`, „täglich um …“) kommt einmal am Tag zur gewählten Uhrzeit (Zeitzone des Browsers beim Anlegen) eine Liste der offenen Einträge, die heute fällig oder überfällig sind – aus allen Datenbanken des Arbeitsbereichs oder nur der gewählten. Als Fälligkeit zählt die Datumseigenschaft mit „Fällig“, „Due“, „Deadline“ o. Ä. im Namen, sonst die erste Datumseigenschaft; als erledigt gilt, was die Erledigt-Regel der Datenbank sagt. Private Einträge stehen nie in der Übersicht. Ist nichts fällig, wird nichts gesendet.

## E-Mail-Eingang

Eigentümer eines Arbeitsbereichs legen unter **Einstellungen → Allgemein → E-Mail-Eingang** mit **Adresse anlegen** Adressen an, die eingehende E-Mails in Flowplan ablegen:

- **Ziel Seite**: Jede E-Mail wird eine neue Unterseite. Der Betreff ist der Titel, der Text (bereinigtes HTML oder reiner Text) der Inhalt, darüber Absender und Datum. Anhänge werden Dateien der neuen Seite; eingebettete Bilder (`cid:`) erscheinen an ihrer Stelle, alle übrigen Anhänge als Liste darunter.
- **Ziel Datenbank**: Jede E-Mail wird ein Eintrag. Der Betreff ist der Titel, der Text der Inhalt des Eintrags, die Absenderadresse kommt in die erste E-Mail-Eigenschaft (falls vorhanden), das Datum der E-Mail ist das Erstelldatum, Anhänge kommen in die erste Datei-Eigenschaft (sonst als Liste in den Inhalt).
- **Erlaubte Absender**: Adressen (`ada@example.org`) oder Domains (`example.org`, nur genau diese Domain). E-Mails anderer Absender werden nicht gespeichert, sondern im Prüfprotokoll vermerkt.
- **Signaturschlüssel** (optional): siehe unten.

Die Adresse handelt mit den Rechten der Person, die sie angelegt hat. Verliert sie die Schreibrechte auf das Ziel oder wird das Ziel gesperrt, nimmt die Adresse nichts mehr an (die Liste zeigt den Fehler).

Sicherheit und Grenzen:

- Jede Adresse hat ein zufälliges Token aus 32 Zeichen. **Neues Token erzeugen** macht die bisherige Adresse sofort ungültig.
- HTML aus E-Mails wird wie Gastinhalte bereinigt: keine Skripte, Formulare, Stile oder Frames; externe Bilder (z. B. Zählpixel) werden entfernt, Links bleiben.
- Anhänge: höchstens 20 je E-Mail, 10 MB je Datei, 25 MB zusammen; größere werden mit Namen im Text vermerkt. Der Dateityp wird am Inhalt geprüft, Fotos verlieren ihren Standort; im Browser geöffnet werden nur Bilder und PDFs, alles andere wird heruntergeladen. Anhänge zählen zum Speicherkontingent des Arbeitsbereichs und zum Tagesbudget für anonyme Uploads (200 MB je Adresse und Tag, dazu `FLOWPLAN_ANONYMOUS_UPLOAD_MB` für die ganze Instanz).
- Höchstens 60 E-Mails pro Adresse und Stunde (auch abgelehnte zählen); darüber antwortet Flowplan mit 429, und der Anbieter versucht es später erneut.
- Dieselbe `Message-ID` wird je Adresse nur einmal gespeichert. Ohne `Message-ID` zählen Absender, Betreff, Datum und Text.
- Die Absenderadresse einer E-Mail lässt sich fälschen. Die Absenderliste ist eine Vorauswahl; geheim bleiben muss vor allem das Token. Für Webhooks bietet der Signaturschlüssel zusätzlichen Schutz.

### Per Webhook (Mailgun, Postmark, SendGrid, Cloudflare)

Ohne weitere Einrichtung nimmt Flowplan E-Mails per `POST` an der Webhook-Adresse aus der Liste an:

```
https://flowplan.example.com/api/inbound-mail/<token>
```

Flowplan erkennt das Format am Inhalt:

| Anbieter | Einrichtung |
| --- | --- |
| **Mailgun** | *Receiving → Create Route*: Ausdruck z. B. `match_recipient("flowplan@mg.example.com")`, Aktion *Forward* an die Webhook-Adresse. Als Signaturschlüssel den *HTTP webhook signing key* von Mailgun eintragen; Flowplan prüft dann `timestamp`, `token` und `signature` (höchstens 15 Minuten alt). |
| **Postmark** | Server → *Inbound* Stream → *Webhook URL* = Webhook-Adresse. Postmark schickt JSON mit `FromFull`, `TextBody`, `HtmlBody` und `Attachments`. |
| **SendGrid** | *Settings → Inbound Parse → Add Host & URL*: Domain und Webhook-Adresse. Mit *POST the raw, full MIME message* kommt die ganze E-Mail (`email`), sonst die Felder `from`, `subject`, `text`, `html`, `attachment-info` und `attachment1…`. |
| **Cloudflare Email Routing** | Eine Email-Worker-Regel, die die rohe E-Mail weitergibt (Beispiel unten). |
| **Eigene Skripte** | JSON oder `multipart/form-data` mit `from`, `to`, `subject`, `text`, `html`, `messageId`, `date` und `attachments` (JSON: `[{ "filename", "contentType", "content" (base64), "contentId" }]`, Multipart: Dateifelder) – oder die ganze E-Mail als `raw` (Text) bzw. `rawBase64`, oder als Inhalt mit `Content-Type: message/rfc822`. |

Cloudflare Email Worker:

```js
export default {
  async email(message, env) {
    const raw = await new Response(message.raw).arrayBuffer();
    const body = new Uint8Array(raw);
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.FLOWPLAN_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = [...new Uint8Array(await crypto.subtle.sign("HMAC", key, body))].map((b) => b.toString(16).padStart(2, "0")).join("");
    const res = await fetch(env.FLOWPLAN_URL, {
      method: "POST",
      headers: { "Content-Type": "message/rfc822", "X-Flowplan-Signature": `sha256=${sig}` },
      body,
    });
    if (!res.ok) message.setReject(`Flowplan: ${res.status}`);
  },
};
```

**Signaturschlüssel**: Ist für eine Adresse einer gesetzt, braucht jede Zustellung entweder die Kopfzeile `X-Flowplan-Signature: sha256=<hex>` (HMAC-SHA256 des unveränderten Inhalts mit dem Schlüssel, wie bei Flowplans eigenen Webhooks) oder Mailguns Signaturfelder. Sonst antwortet Flowplan mit 401.

Antworten: `200` mit `{"status": "stored" | "duplicate" | "rejected"}` – auch abgelehnte und doppelte E-Mails bekommen 200, damit der Anbieter nicht wiederholt. `401` Signatur ungültig, `404` unbekanntes Token, `409` Ziel nicht beschreibbar, `413` zu groß oder Tagesbudget erreicht, `415` unbekanntes Format, `429` Stundenlimit.

### Per IMAP-Postfach

Statt eines Anbieters kann Flowplan ein eigenes Postfach abfragen (alle zwei Minuten, ungelesene E-Mails). Die Administration setzt dafür `INBOUND_IMAP_HOST`, `INBOUND_IMAP_USER`, `INBOUND_IMAP_PASSWORD` und `INBOUND_MAIL_DOMAIN` ([Konfiguration](/configuration#e-mail-eingang-imap)). Jede Adresse in der Liste lautet dann

```
inbox+<token>@mail.example.com
```

(Plus-Adressierung: der Teil vor `+` ist der Benutzername des Postfachs). Flowplan sucht das Token in `To`, `Cc`, `Delivered-To` und `X-Original-To`. Verarbeitete, doppelte, abgelehnte und nicht zuordenbare E-Mails werden als gelesen markiert; ist das Stundenlimit oder Tagesbudget erreicht, bleiben sie ungelesen und kommen in der nächsten Runde dran.

### Per API

Mit einem **Schreib-Token** eines Eigentümers: `GET /api/inbound-mail?workspace=<id>` listet die Adressen, `POST /api/command` mit `inbound.save` (anlegen oder ändern: `pageId`, `senders`, optional `label`, `secret`, `id`), `inbound.rotate` und `inbound.delete` verwaltet sie.

## OpenAPI und SDKs

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

Beide Clients schicken bei jeder Änderung von selbst einen [`Idempotency-Key`](#idempotency-key-wiederholen-ohne-doppelte) mit und wiederholen selbst – GET-Anfragen und Änderungen nach einem Netzwerkfehler, `429`, `502`, `503`, `504` oder `409`, solange der erste Versuch noch läuft, standardmäßig zweimal (`retries`, `0` schaltet es ab). Änderungen gehen mit demselben Schlüssel erneut und wirken so nur einmal. Um eine Aktion später zu wiederholen, gib einen eigenen Schlüssel mit: `idempotencyKey` (TypeScript, in den Optionen eines Aufrufs) oder `idempotency_key=` (Python).

Wer Flowplan selbst baut, erzeugt die Clients mit `npm run sdk` neu; der Test `tests/openapi.test.ts` schlägt fehl, wenn die eingecheckten Dateien nicht mehr zum Dokument passen.

### Tags und Eigenschaften per API

- `GET /api/tags?workspace=<id>` – Tags (`id`, `name`, `color`, `position`, `pages`, `records`: Zahl der lesbaren Datenbank-Einträge mit dem Tag) und Eigenschaften (`id`, `name`, `type`, `options`) des Arbeitsbereichs. `GET /api/tags/<tagId>?workspace=<id>` liefert zusätzlich die lesbaren Seiten (`pages`) und Einträge (`records`: `page_id`, `row_id`, `title`, `database`, `space_id`, `updated_at`, `tags`) mit diesem Tag.
- `GET /api/pages/<id>` enthält `properties`: `tags` (Tag-IDs), `values` (nach Eigenschafts-ID) und `info` (erstellt/geändert am/von).
- `POST /api/command` mit `page.properties`: `{ "action": "page.properties", "pageId": "…", "addTags": ["Kunde"], "values": { "Status": "Offen", "Budget": 1200 } }`. Tags und Eigenschaften gehen über ID oder Namen; `tags` ersetzt alle Tags, `addTags`/`removeTags` ändern sie, `null` entfernt einen Wert.
- `pages.tag` vergibt oder entfernt Tags auf bis zu 500 Seiten auf einmal.
- Nur Eigentümer: `tag.save`, `tag.delete`, `tag.merge`, `tag.reorder`, `property.save`, `property.delete`, `property.reorder`. Neue Tags (`tag.save` ohne `tagId`) dürfen auch Mitglieder mit Bearbeitungsrecht anlegen.
- Datenbank-Eigenschaften mit den Tags als Optionen: in `database.update` eine `multiselect`-Eigenschaft mit `"tagOptions": true` (ihre `options` setzt der Server). Zellen enthalten Tag-Namen; ein neuer Name in `row.create`, `row.update` oder `rows.bulk` legt den Tag an (Mitglieder mit Bearbeitungsrecht, sonst 403); `rows.import` lässt Namen weg, die kein Tag werden dürfen. MCP nennt solche Eigenschaften in `get_database` mit `tagOptions: true`.
- In `GET /api/search` wirken `#tag`, `-#tag` und `name:wert` als Filter (siehe [Suche](/search-and-notifications#nach-tags-und-eigenschaften-filtern)). MCP-Clients bekommen Tags und Werte mit `read_page` als Frontmatter.

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
