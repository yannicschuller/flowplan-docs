---
keywords: Slack, Microsoft Teams, Discord, Mattermost, Chat, Webhook
---

# Chat-Benachrichtigungen

Statt JSON kann ein Webhook eine fertige Nachricht in einen Chat schicken. Auf der Seite des Webhooks unter **Einstellungen → Webhooks** wählst du in der Karte **Ziel** das **Format**:

| Format | Ziel | Was ankommt |
| --- | --- | --- |
| JSON | n8n, Home Assistant, eigene Dienste | Das signierte JSON oben |
| Slack | Incoming Webhook oder eine Slack-App | Block Kit: Überschrift, Text mit dem Eintrag als Link, Felder für geänderte Eigenschaften, Zeile mit Person und Zeit |
| Matrix | Raum-Webhook (z. B. hookshot) oder die Matrix-Client-API | HTML-Nachricht (`formatted_body`) mit reinem Text als `body` |
| Microsoft Teams | Incoming Webhook bzw. Workflow „Bei Empfang einer Webhook-Anforderung posten“ | Adaptive Card mit Faktenliste und Schaltfläche **In Flowplan öffnen** |
| Discord | Kanal-Webhook | Embed mit Titel, Link, Feldern und Zeitstempel |

Neben dem Formular zeigt eine **Vorschau** die Nachricht für ein Beispielereignis, darunter den Inhalt, der tatsächlich gesendet wird.

## Einrichten

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

## Vorlagen

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

## Tägliche Übersicht

Mit dem Ereignis **Heute fällig** (`digest.due`, „täglich um …“) kommt einmal am Tag zur gewählten Uhrzeit (Zeitzone des Browsers beim Anlegen) eine Liste der offenen Einträge, die heute fällig oder überfällig sind – aus allen Datenbanken des Arbeitsbereichs oder nur der gewählten. Als Fälligkeit zählt die Datumseigenschaft mit „Fällig“, „Due“, „Deadline“ o. Ä. im Namen, sonst die erste Datumseigenschaft; als erledigt gilt, was die Erledigt-Regel der Datenbank sagt. Private Einträge stehen nie in der Übersicht. Ist nichts fällig, wird nichts gesendet.
