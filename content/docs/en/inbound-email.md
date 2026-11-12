---
keywords: e-mail, mail to flowplan, mailgun, postmark, imap, inbound
---

# Inbound e-mail

Workspace owners create addresses with **Create address** under **Settings → General → Inbound e-mail** that file incoming e-mail in Flowplan:

- **Target page**: every e-mail becomes a new subpage. The subject is the title, the text (cleaned HTML or plain text) the content, with sender and date above it. Attachments become files of the new page; embedded images (`cid:`) appear in place, all other attachments as a list below.
- **Target database**: every e-mail becomes a record. The subject is the title, the text the record's content, the sender address goes into the first e-mail property (if there is one), the e-mail's date is the creation date, and attachments go into the first files property (otherwise as a list into the content).
- **Allowed senders**: addresses (`ada@example.org`) or domains (`example.org`, exactly that domain). E-mails from other senders are not stored but noted in the audit log.
- **Signing key** (optional): see below.

The address acts with the permissions of the person who created it. If they lose write access to the target or the target is locked, the address stops accepting mail (the list shows the error).

Security and limits:

- Every address has a random 32-character token. **Generate a new token** invalidates the current address at once.
- HTML from e-mails is cleaned like guest content: no scripts, forms, styles or frames; remote images (e.g. tracking pixels) are removed, links stay.
- Attachments: at most 20 per e-mail, 10 MB per file, 25 MB together; larger ones are named in the text. The file type is checked against the content, photos lose their location; only images and PDFs open in the browser, everything else is downloaded. Attachments count towards the workspace's storage quota and the daily budget for anonymous uploads (200 MB per address and day, plus `FLOWPLAN_ANONYMOUS_UPLOAD_MB` for the whole instance).
- At most 60 e-mails per address and hour (rejected ones count too); beyond that Flowplan answers 429 and the provider retries later.
- The same `Message-ID` is stored only once per address. Without a `Message-ID`, sender, subject, date and text count.
- The sender address of an e-mail can be forged. The sender list is a pre-filter; above all the token must stay secret. For webhooks the signing key adds protection.

## Via webhook (Mailgun, Postmark, SendGrid, Cloudflare)

Without further setup Flowplan accepts e-mail as a `POST` to the webhook address shown in the list:

```
https://flowplan.example.com/api/inbound-mail/<token>
```

Flowplan recognises the format from the content:

| Provider | Setup |
| --- | --- |
| **Mailgun** | *Receiving → Create Route*: an expression such as `match_recipient("flowplan@mg.example.com")`, action *Forward* to the webhook address. Enter Mailgun's *HTTP webhook signing key* as the signing key; Flowplan then checks `timestamp`, `token` and `signature` (at most 15 minutes old). |
| **Postmark** | Server → *Inbound* stream → *Webhook URL* = the webhook address. Postmark sends JSON with `FromFull`, `TextBody`, `HtmlBody` and `Attachments`. |
| **SendGrid** | *Settings → Inbound Parse → Add Host & URL*: domain and webhook address. With *POST the raw, full MIME message* the whole e-mail arrives (`email`), otherwise the fields `from`, `subject`, `text`, `html`, `attachment-info` and `attachment1…`. |
| **Cloudflare Email Routing** | An Email Worker rule that passes on the raw e-mail (example below). |
| **Your own scripts** | JSON or `multipart/form-data` with `from`, `to`, `subject`, `text`, `html`, `messageId`, `date` and `attachments` (JSON: `[{ "filename", "contentType", "content" (base64), "contentId" }]`, multipart: file fields) – or the whole e-mail as `raw` (text) or `rawBase64`, or as the body with `Content-Type: message/rfc822`. |

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

**Signing key**: when an address has one, every delivery needs either the header `X-Flowplan-Signature: sha256=<hex>` (HMAC-SHA256 of the unchanged body with the key, as with Flowplan's own webhooks) or Mailgun's signature fields. Otherwise Flowplan answers 401.

Answers: `200` with `{"status": "stored" | "duplicate" | "rejected"}` – rejected and duplicate e-mails get 200 too, so the provider does not retry. `401` invalid signature, `404` unknown token, `409` target not writable, `413` too large or daily budget reached, `415` unknown format, `429` hourly limit.

## Via an IMAP mailbox

Instead of a provider, Flowplan can poll a mailbox of your own (every two minutes, unread e-mail). The administrators set `INBOUND_IMAP_HOST`, `INBOUND_IMAP_USER`, `INBOUND_IMAP_PASSWORD` and `INBOUND_MAIL_DOMAIN` for it ([Configuration](/configuration-integrations#inbound-e-mail-imap)). Each address in the list then reads

```
inbox+<token>@mail.example.com
```

(plus addressing: the part before `+` is the mailbox's user name). Flowplan looks for the token in `To`, `Cc`, `Delivered-To` and `X-Original-To`. Processed, duplicate, rejected and unroutable e-mails are marked as read; when the hourly limit or daily budget is reached they stay unread for the next round.

## Via the API

With an owner's **write token**: `GET /api/inbound-mail?workspace=<id>` lists the addresses; `POST /api/command` with `inbound.save` (create or change: `pageId`, `senders`, optionally `label`, `secret`, `id`), `inbound.rotate` and `inbound.delete` manages them.
