---
keywords: Plugin, Erweiterung, eigener Block, iframe, Entwickler
---

# Block-Erweiterungen

Block-Erweiterungen bringen eigene Blocktypen in den Editor: eine Umfrage, ein Zähler, ein Diagramm aus einer Datenbank, ein Widget eures Teams. Eine Erweiterung ist eine statische Webseite mit einem Manifest. Flowplan zeigt sie abgeschottet in einem Rahmen und spricht nur über Nachrichten mit ihr.

## Für Eigentümer: eine Erweiterung registrieren

1. Die Administration gibt die Adresse frei: entweder über `PLUGIN_ALLOWED_ORIGINS` ([Konfiguration](/configuration-integrations#integrationen)) oder mit dem Schalter **Block-Erweiterungen von jeder HTTPS-Adresse** unter **Administration → Erweiterungen & Domains**.
2. Unter **Einstellungen → Block-Erweiterungen** bei **Adresse der Erweiterung** die Adresse eintragen, z. B. `https://plugins.example.org/umfrage/`, und **Registrieren** wählen. Flowplan lädt `flowplan-plugin.json` von dort, prüft es und zeigt die Erweiterung als eigene Karte: welche Blöcke sie bringt und was sie darf, darunter die Schalter **Aktiv** und **Auch auf veröffentlichten Seiten zeigen**. Entfernt wird sie mit dem Papierkorb-Symbol oben in ihrer Karte.
3. Im Editor erscheinen ihre Blöcke im `/`-Menü unter **Erweiterungen**.

Je Erweiterung gibt es:

- **Aktiv** – ausgeschaltet zeigen ihre Blöcke nur noch ihren Text.
- **Auch auf veröffentlichten Seiten zeigen** – ohne diesen Schalter erscheinen ihre Blöcke auf [veröffentlichten Seiten](/sharing#im-web-veroeffentlichen) nur als Text.
- **Datenbanken, die sie lesen darf** – nur wenn sie Datenbankzugriff anfragt.
- **Einstellungen** – so, wie das Manifest sie beschreibt. Alle, die den Block sehen, sehen auch die Einstellungen: keine Passwörter eintragen.

Erneut registrieren lädt das Manifest neu (neue Version, neue Blocktypen). Entfernen lässt die Blöcke in den Dokumenten stehen; sie zeigen dann ihren Text.

## Was eine Erweiterung darf – und was nicht

Der Rahmen hat `sandbox="allow-scripts"` und nie `allow-same-origin`. Die Erweiterung läuft also in einem eigenen, anonymen Ursprung:

- Sie liest weder Cookies noch Speicher von Flowplan und kann die Seite drumherum nicht verändern.
- Sie kennt weder Namen noch E-Mail-Adresse der lesenden Person.
- Formulare, Pop-ups und das Umleiten der ganzen Seite sind blockiert.
- Alle Nachrichten werden geprüft: Absender (genau dieser Rahmen), Form (zod-Schema), Nonce aus dem Handschlag. Mehr als 60 Nachrichten pro Sekunde werden verworfen.
- Höhe: Die Erweiterung wünscht sich eine Höhe; Flowplan hält sie zwischen 40 px und dem `maxHeight` des Manifests (höchstens 2000 px).

Berechtigungen, die ein Manifest anfragen kann:

| Berechtigung | Bedeutung |
| --- | --- |
| `read:page` | Titel der Seite, auf der der Block steht. |
| `read:selection` | Der im Editor markierte Text. |
| `write:block` | Eigene Daten im Block speichern (JSON, höchstens 64 KB) – nur für Personen mit Bearbeitungsrechten. |
| `read:database:<id>` | Einträge genau dieser Datenbank lesen (ID der Datenbankseite). |
| `read:database` | Einträge der Datenbanken lesen, die ein Eigentümer beim Registrieren auswählt. |

Datenbankabfragen laufen immer mit den Rechten der lesenden Person: private Einträge und Eigenschaften mit Leseregel bleiben verborgen. Auf veröffentlichten Seiten gibt es keine Datenbankabfragen, und Blöcke sind dort immer nur lesbar.

Der Text, den eine Erweiterung mit ihren Daten übergibt, landet in der Suche und im Markdown-Export. Im Export steht statt des Rahmens ein Link auf die Erweiterung.

## Für Entwickler: eine Erweiterung bauen

Eine Erweiterung besteht aus statischen Dateien über HTTPS. Ein vollständiges Beispiel (Zähler und Umfrage) liegt im Repository unter `examples/plugin-hello/`.

### Das Manifest

`flowplan-plugin.json` neben der Einstiegsseite:

```json
{
  "name": "Hello Flowplan",
  "version": "1.0.0",
  "description": "A counter and a small poll",
  "entry": "index.html",
  "blocks": [
    { "type": "counter", "label": "Zähler", "icon": "🔢", "description": "A number to count up" },
    { "type": "poll", "label": "Umfrage", "icon": "📊", "entry": "poll.html" }
  ],
  "permissions": ["read:page", "write:block"],
  "size": { "height": 160, "maxHeight": 600 },
  "settings": {
    "step": { "type": "number", "label": "Counter step", "default": 1 }
  }
}
```

| Feld | Regel |
| --- | --- |
| `name` | 1–60 Zeichen. |
| `version` | `1.2.3`, optional mit Zusatz (`1.2.3-beta.1`). |
| `entry` | Relativer Pfad zur Seite im Rahmen (Standard `index.html`); kein `..`, keine andere Adresse. |
| `blocks` | 1–20 Blocktypen: `type` aus Kleinbuchstaben, Ziffern und `-`; `label`; optional `icon` (Emoji), `description` und ein eigenes `entry`. |
| `permissions` | Siehe oben. |
| `size` | Starthöhe `height` und `maxHeight` in Pixeln (40–2000). |
| `settings` | Bis zu 20 Einstellungen: `string`, `number` oder `boolean` mit `label` und `default`. |

Das Manifest darf nicht auf eine andere Adresse umleiten und höchstens 64 KB groß sein.

### Sicherheitskopfzeilen

Liefere die Seite mit einer strengen Content Security Policy aus, zum Beispiel:

```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'
```

`connect-src 'none'` stellt sicher, dass Blockdaten den Rahmen nicht verlassen. Braucht die Erweiterung einen eigenen Server, nenne ihn dort ausdrücklich.

### Das Nachrichtenprotokoll

Alle Nachrichten sind Objekte mit `protocol: "flowplan-plugin/1"`. Flowplan sendet nach dem Laden:

```js
{ protocol: "flowplan-plugin/1", type: "init", nonce, blockType, readOnly, permissions, settings }
```

Ab dann trägt jede Nachricht der Erweiterung diese `nonce`. Antworte zuerst mit `ready`; Flowplan schickt dann die gespeicherten Daten als `data`.

| Von der Erweiterung | Felder | Antwort |
| --- | --- | --- |
| `ready` | – | `data` mit den gespeicherten Daten |
| `resize` | `height` | – (Höhe wird begrenzt) |
| `getData` | `id` | `response` mit `result` = Daten |
| `setData` | `id`, `data`, optional `text` (Suchtext, bis 2000 Zeichen) | `response`; Fehler `read-only`, `permission:write:block` oder `too-large` |
| `getContext` | `id` | `response` mit `theme`, `locale`, `readOnly`, `blockType`, `page.title` (mit `read:page`), `selection` (mit `read:selection`) |
| `query` | `id`, `databaseId`, optional `limit` (1–200) | `response` mit `fields` und `rows`; Fehler `public` oder `permission:read:database:<id>` |

Antworten haben die Form `{ protocol, nonce, type: "response", id, ok: true, result }` oder `{ …, ok: false, error }`. Ändern andere die Daten (gleichzeitige Bearbeitung, Rückgängig), kommt erneut `data`.

Ein Minimalbeispiel:

```js
const PROTOCOL = "flowplan-plugin/1";
let nonce = null;
const send = (message) => parent.postMessage({ protocol: PROTOCOL, nonce, ...message }, "*");
addEventListener("message", (event) => {
  if (event.source !== parent || event.data?.protocol !== PROTOCOL) return;
  const message = event.data;
  if (message.type === "init" && !nonce) {
    nonce = message.nonce;
    send({ type: "ready" });
  } else if (message.nonce === nonce && message.type === "data") {
    document.body.textContent = JSON.stringify(message.data);
    send({ type: "resize", height: document.documentElement.scrollHeight });
  }
});
```

Nachrichten an Flowplan gehen mit dem Ziel `"*"` hinaus: Der Rahmen hat keinen eigenen Ursprung, den Flowplan nennen könnte. Flowplan erkennt die Absender am Rahmen und an der Nonce.

### Ausprobieren

1. `examples/plugin-hello/` über HTTPS ausliefern (etwa hinter dem Reverse Proxy).
2. `PLUGIN_ALLOWED_ORIGINS=https://plugins.example.org` setzen und Flowplan neu starten.
3. Als Eigentümer `https://plugins.example.org/plugin-hello/` registrieren und im Editor `/zähler` tippen.
