---
keywords: slack, microsoft teams, discord, mattermost, chat, webhook
---

# Chat notifications

Instead of JSON, a webhook can post a ready message to a chat. On the webhook's page under **Settings → Webhooks**, choose the **format** in the card **Target**:

| Format | Target | What arrives |
| --- | --- | --- |
| JSON | n8n, Home Assistant, your own services | The signed JSON above |
| Slack | Incoming Webhook or a Slack app | Block Kit: header, text with the record as a link, fields for changed properties, a line with who and when |
| Matrix | Room webhook (e.g. hookshot) or the Matrix client API | HTML message (`formatted_body`) with plain text as `body` |
| Microsoft Teams | Incoming Webhook or the workflow "Post to a channel when a webhook request is received" | Adaptive Card with a fact list and an **Open in Flowplan** button |
| Discord | Channel webhook | Embed with title, link, fields and timestamp |

Next to the form a **preview** shows the message for a sample event, and below it the content that is actually sent.

## Setup

**Slack**

- *Messages only:* Create an app in Slack (api.slack.com/apps), turn on **Incoming Webhooks**, pick a channel and enter the address `https://hooks.slack.com/services/…` in Flowplan.
- *With thread replies:* Give the app the `chat:write` scope under **OAuth & Permissions**, install it and enter the **Bot User OAuth Token** (`xoxb-…`) and the **channel ID** (in Slack: channel details, at the bottom); invite the bot to the channel (`/invite @App`). For replies, also enter the **signing secret** (Basic Information). After saving, the webhook's page (card **Delivery**) shows a **Request URL** (`…/api/webhooks/slack/<id>`): turn on **Event Subscriptions** in the app, enter that address and subscribe to the bot event `message.channels` (`message.groups` for private channels). Replies in the thread of a Flowplan message then appear as a comment on the record – written in the name of the person who set up the webhook, prefixed with "Slack:". Threads are matched for 30 days.

**Matrix**

- *Room webhook:* Create a "generic webhook" in the room with a bridge such as hookshot and enter its address. Flowplan sends `text` and `html` (plus the fields of a Matrix message).
- *Client API:* Create an access token for a bot account, invite the account to the room and enter the **homeserver address** (e.g. `https://matrix.example.org`), the **access token** and the **room** (`!id:server` or `#alias:server`) in Flowplan. Flowplan sends with `PUT /_matrix/client/v3/rooms/{room}/send/m.room.message/{txn}`; retries of the same delivery never create duplicate messages.

**Microsoft Teams**

- In Teams, add a workflow to the channel from the template "Post to a channel when a webhook request is received" (or a classic Incoming Webhook) and enter the address it shows.

**Discord**

- In the channel settings under **Integrations → Webhooks** create a webhook and enter the address `https://discord.com/api/webhooks/…`. Mentions (@everyone etc.) are never triggered.

Access tokens, bot tokens and signing secrets are stored encrypted and never shown again; when editing, an empty field keeps the stored value, and **Remove stored credentials** deletes them. Chat addresses follow the same rule as other webhooks: public HTTPS only, and every delivery checks the address again.

## Templates

Every event has a default text that you can change in the form (**Template for event**). The buttons insert placeholders:

| Placeholder | Content |
| --- | --- |
| `{title}` | Title of the record or page |
| `{actor}` | Who caused it |
| `{page}` | Database or parent page |
| `{changes}` | Changed properties as a list (in the digest: the due records) |
| `{url}` | Link in Flowplan |
| `{text}` | Comment text or the name of the mentioned person |
| `{date}` | Date and time (in the digest: the day) |
| `{count}` | Number of changes or due records |

A small Markdown is allowed: `**bold**`, `_italic_`, `` `code` ``, `[text](address)`, lines starting with `- ` as a list and `> ` as a quote. Flowplan converts it to the platform's markup (Slack mrkdwn, Matrix HTML, Teams Markdown, Discord Markdown). Values from Flowplan are never read as markup – a `*` in a title stays a `*`. When `{changes}` is not in the template, Slack, Teams and Discord show the changes as fields of their own and Matrix as a list below. Long values are shortened (titles 200 characters, comments 1,000, at most 10 changes and 25 due records) so the platforms' limits are kept. The **language of the messages** (default texts, date format) is set per webhook.

Example:

```text
{actor} changed [{title}]({url}) in **{page}**:
{changes}
```

## Daily digest

With the event **Due today** (`digest.due`, "daily at …") a list of the open records that are due today or overdue arrives once a day at the chosen time (the browser's time zone when the webhook was created) – from all databases of the workspace or only the chosen one. The due date is the date property with "Due", "Fällig", "Deadline" or similar in its name, otherwise the first date property; done is what the database's done rule says. Private records are never listed. When nothing is due, nothing is sent.
