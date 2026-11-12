---
keywords: E-Mail, Mail an Flowplan, Mailgun, Postmark, IMAP, Posteingang
---

# E-Mail-Eingang

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

## Per Webhook (Mailgun, Postmark, SendGrid, Cloudflare)

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

## Per IMAP-Postfach

Statt eines Anbieters kann Flowplan ein eigenes Postfach abfragen (alle zwei Minuten, ungelesene E-Mails). Die Administration setzt dafür `INBOUND_IMAP_HOST`, `INBOUND_IMAP_USER`, `INBOUND_IMAP_PASSWORD` und `INBOUND_MAIL_DOMAIN` ([Konfiguration](/configuration-integrations#e-mail-eingang-imap)). Jede Adresse in der Liste lautet dann

```
inbox+<token>@mail.example.com
```

(Plus-Adressierung: der Teil vor `+` ist der Benutzername des Postfachs). Flowplan sucht das Token in `To`, `Cc`, `Delivered-To` und `X-Original-To`. Verarbeitete, doppelte, abgelehnte und nicht zuordenbare E-Mails werden als gelesen markiert; ist das Stundenlimit oder Tagesbudget erreicht, bleiben sie ungelesen und kommen in der nächsten Runde dran.

## Per API

Mit einem **Schreib-Token** eines Eigentümers: `GET /api/inbound-mail?workspace=<id>` listet die Adressen, `POST /api/command` mit `inbound.save` (anlegen oder ändern: `pageId`, `senders`, optional `label`, `secret`, `id`), `inbound.rotate` und `inbound.delete` verwaltet sie.
