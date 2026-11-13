---
keywords: Flowplan-Doku in KI, MCP-Server, Claude, ChatGPT, Cursor, llms.txt, Markdown, KI fragen
---

# Flowplan-Doku in deiner KI

Frag Claude, ChatGPT oder deinen Code-Assistenten direkt nach Flowplan: Die Dokumentation gibt es als öffentlichen MCP-Server, als Knopf auf jeder Seite und als Markdown für Sprachmodelle.

Hier geht es um diese **Dokumentation**. Willst du deinem Assistenten Zugriff auf deine eigenen Seiten und Datenbanken in Flowplan geben, lies [MCP: KI-Assistenten](/mcp).

## MCP-Server der Doku

Die Doku ist ein MCP-Server (Model Context Protocol) unter dieser Adresse:

```text
https://docs.flowplan.org/mcp
```

Er ist öffentlich, braucht kein Konto und keinen Schlüssel und kann nur lesen. Dein Assistent sucht damit selbst in der Doku und liest die passenden Seiten, statt aus dem Gedächtnis zu antworten. Er hat drei Werkzeuge:

| Werkzeug | Was es tut |
| --- | --- |
| `search_docs` | Durchsucht alle Seiten – mit derselben Suche wie das Suchfeld hier – und liefert Seiten und Abschnitte mit Adresse und Ausschnitt |
| `get_page` | Liefert eine Seite als Markdown, über ihren Namen (`installation`) oder ihre Adresse |
| `list_pages` | Listet alle Seiten mit Titel, Beschreibung und Bereich |

Jede Seite gibt es auf Englisch und Deutsch. Englisch ist voreingestellt; schreibst du deutsch, nimmt der Assistent meist von selbst die deutschen Seiten.

### Claude

In Claude (im Browser und in der Desktop-App) fügst du den Server als eigenen Connector hinzu:

::: steps

1. Öffne **Einstellungen → Connectors** und wähle **Benutzerdefinierten Connector hinzufügen** (*Add custom connector*).
2. Gib einen Namen ein, zum Beispiel *Flowplan-Doku*, und die Adresse `https://docs.flowplan.org/mcp`.
3. Speichere. Eine Anmeldung ist nicht nötig.

:::

Ob und wie viele eigene Connectors du anlegen kannst, hängt von deinem Plan und bei Teams von den Einstellungen der Organisation ab.

### Claude Code

```bash
claude mcp add --transport http flowplan-docs https://docs.flowplan.org/mcp
```

Mit `--scope user` steht die Doku in all deinen Projekten bereit. `/mcp` zeigt die Verbindung und ihre Werkzeuge.

### Cursor

In `.cursor/mcp.json` im Projekt (oder `~/.cursor/mcp.json` für alle Projekte):

```json
{
  "mcpServers": {
    "flowplan-docs": {
      "url": "https://docs.flowplan.org/mcp"
    }
  }
}
```

### VS Code

In `.vscode/mcp.json` im Projekt:

```json
{
  "servers": {
    "flowplan-docs": {
      "type": "http",
      "url": "https://docs.flowplan.org/mcp"
    }
  }
}
```

### ChatGPT und andere

In ChatGPT gibt es eigene MCP-Connectors im **Entwicklermodus**, je nach Plan und Einstellungen des Arbeitsbereichs. Lege dort einen neuen Connector mit der Adresse `https://docs.flowplan.org/mcp` an und wähle als Authentifizierung **Keine**. Wo genau das steht, ändert sich gelegentlich; sieh im Zweifel in der Hilfe von ChatGPT nach.

Andere Clients brauchen nur die Adresse: Der Server spricht **Streamable HTTP** und antwortet mit JSON, ohne Sitzung und ohne Anmeldung.

## Knöpfe auf jeder Seite

Unter dem Titel jeder Seite stehen vier Knöpfe:

- **In Claude fragen** und **In ChatGPT fragen** öffnen den Assistenten mit einer fertigen Frage: Er soll die Seite als Markdown lesen und dann deine Fragen dazu beantworten. Die Frage steht in der Adresse des Links – du siehst sie, bevor du sie abschickst.
- **Als Markdown kopieren** legt die ganze Seite als Markdown in die Zwischenablage, zum Einfügen in jeden Chat.
- **Markdown öffnen** zeigt die Seite als Markdown-Text.

Die Knöpfe sind gewöhnliche Links. Die Doku lädt dafür kein Skript von Anthropic oder OpenAI und zählt nicht, wer sie benutzt.

## llms.txt und Markdown

Für Sprachmodelle und eigene Werkzeuge liegt die Doku auch als Text bereit:

| Adresse | Inhalt |
| --- | --- |
| [/de/llms.txt](/de/llms.txt) | Verzeichnis aller Seiten mit Beschreibung und Markdown-Adresse ([llmstxt.org](https://llmstxt.org)) |
| [/de/llms-full.txt](/de/llms-full.txt) | Alle Seiten in einer Datei |
| `/de/installation.md` | Eine Seite als Markdown: Seitenadresse mit `.md` am Ende |

Ohne `/de` sind `llms.txt` und `llms-full.txt` englisch, ebenso `/en/….md`.

## Datenschutz

- Der MCP-Server braucht kein Konto, keinen Schlüssel und keine Cookies.
- Suchanfragen werden beantwortet und nicht gespeichert oder protokolliert.
- Gegen Missbrauch gibt es ein Limit pro Minute. Dafür zählt der Server Anfragen unter einem Prüfwert der IP-Adresse, der sich täglich ändert und nur im Arbeitsspeicher liegt; die IP-Adresse selbst wird nicht gespeichert.
- Was du deinen Assistenten fragst, geht an dessen Anbieter. Dafür gelten dessen Datenschutzbestimmungen.

> [!NOTE]
> Der Server liefert nur, was auch hier steht. Antwortet dein Assistent etwas, das du auf den Seiten nicht findest, frag nach der Quelle – die Werkzeuge geben zu jedem Treffer die Adresse mit.
