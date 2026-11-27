---
keywords: MCP, Claude, ChatGPT, Cursor, KI-Assistent, Model Context Protocol
---

# MCP: KI-Assistenten

Verbinde Claude, ChatGPT und andere KI-Assistenten über das Model Context Protocol (MCP) mit deinem Flowplan. Sie suchen, lesen und schreiben mit genau deinen Rechten und nicht mehr.

Suchst du stattdessen diese Doku in deinem Assistenten? Das steht unter [Flowplan-Doku in deiner KI](/docs-in-your-ai).

Neben der optionalen [eingebauten KI](/ai) kannst du über MCP den Assistenten anbinden, den *du* wählst. Er arbeitet mit deinen Seiten, Datenbanken und Aufgaben. Er sieht nur, was du in Flowplan sehen kannst.

## Einrichten

::: steps

1. Lege unter **Einstellungen → API & KI-Assistenten** ein [persönliches API-Token](/api-and-webhooks) für den Assistenten an. Wähle **Nur lesen**, wenn der Assistent nur suchen und lesen soll. Wähle **Lesen und schreiben**, wenn er auch Seiten und Datensätze anlegen soll.
2. Kopiere die Adresse unter **KI-Assistenten (MCP)**. Sie besteht aus deiner Flowplan-Adresse und `/api/mcp`, zum Beispiel `https://flowplan.example.com/api/mcp`.
3. Trage beides in deinen Client ein (Beispiele unten). Die Einstellungsseite zeigt für jeden Client eine fertige Konfiguration und setzt ein gerade erstelltes Token gleich ein.

:::

Nimm für jeden Assistenten ein eigenes Token. So siehst du, wann welcher zuletzt zugegriffen hat, und kannst einen widerrufen, ohne die anderen zu treffen.

### Claude Code

```bash
claude mcp add --transport http flowplan https://flowplan.example.com/api/mcp \
  --header "Authorization: Bearer fp_…"
```

Mit `--scope user` steht die Verbindung in all deinen Projekten bereit. In Claude Code zeigt `/mcp` die Verbindung und ihre Werkzeuge.

### Claude Desktop

Claude Desktop verbindet sich mit entfernten MCP-Servern, die ein Token verwenden, über die kleine Brücke `mcp-remote`, die Node.js benötigt. Öffne **Einstellungen → Entwickler → Konfiguration bearbeiten**, trage Folgendes in `claude_desktop_config.json` ein und starte Claude neu:

```json
{
  "mcpServers": {
    "flowplan": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://flowplan.example.com/api/mcp", "--header", "Authorization:${FLOWPLAN_AUTH}"],
      "env": { "FLOWPLAN_AUTH": "Bearer fp_…" }
    }
  }
}
```

Das Token steht in `env` und nicht in `args`: So taucht es nicht in der Prozessliste auf.

### ChatGPT

In ChatGPT gibt es eigene MCP-Konnektoren im **Entwicklermodus**, je nach Tarif und Workspace-Einstellungen. Lege unter **Einstellungen → Apps & Konnektoren** einen neuen Konnektor mit der Adresse `https://flowplan.example.com/api/mcp` an. Bietet ChatGPT eine Anmeldung per Token oder API-Schlüssel an, trage dort `fp_…` ein.

Bietet deine ChatGPT-Version nur OAuth oder „Keine Authentifizierung“ an, kann sich ChatGPT noch nicht mit Flowplan verbinden. Flowplan meldet derzeit nur mit persönlichen Tokens an (siehe [Was unterstützt wird](#was-unterstuetzt-wird)). Schreibe das Token nie als Umweg in die Adresse: Adressen landen in Protokollen.

### Cursor, VS Code, Windsurf und andere

Clients, die Streamable HTTP sprechen und eigene Kopfzeilen erlauben, nutzen diese Konfiguration (die genaue Datei hängt vom Client ab, z. B. `.cursor/mcp.json` oder `.vscode/mcp.json`):

```json
{
  "mcpServers": {
    "flowplan": {
      "type": "http",
      "url": "https://flowplan.example.com/api/mcp",
      "headers": { "Authorization": "Bearer fp_…" }
    }
  }
}
```

## Werkzeuge

| Werkzeug | Was es tut | Token |
| --- | --- | --- |
| `list_workspaces` | Deine Arbeitsbereiche mit deiner Rolle und den Bereichen, die du siehst | Lesen |
| `list_pages` | Seiten eines Arbeitsbereichs, optional in einem Bereich oder unter einer Seite | Lesen |
| `get_library` | Ein Bereich als [Bibliothek](/library#bereich-als-bibliothek): Bücher, Kapitel und Seiten, die du lesen darfst, mit ihren Zahlen {since=0.10.0}; mit `workspaceId` statt `spaceId` alle Regale des Arbeitsbereichs, deine eigenen und die geteilten, und „Weiterlesen“ {since=0.11.0} | Lesen |
| `search_library` | Sucht in allen Regalen der [Bibliothek](/library#in-allen-regalen-suchen) und ordnet die Treffer nach Ebene: Regale, Bücher, Kapitel, Seiten und Inhalte mit Ausschnitt {since=0.11.0} | Lesen |
| `search` | Volltextsuche über Seiten, Datensätze, Kommentare und Dateiinhalte; versteht auch #Tag, OR, NOT, created_by:, created:, type:, in:, title: | Lesen |
| `list_collections` | Sammlungen eines Arbeitsbereichs (eigene und geteilte) mit ihrer Abfrage | Lesen |
| `run_collection` | Die Seiten und Datensätze, die jetzt zu einer Sammlung passen, mit deinen Rechten | Lesen |
| `read_page` | Eine Seite als Markdown; Datenbanken mit ihren Datensätzen, Whiteboards mit ihren Racks, Geräten, Ports und Kabeln | Lesen |
| `query_database` | Datensätze mit Eigenschaften nach Namen, Eigenschaftsdefinitionen, Ansichten; Textfilter, eine gespeicherte Ansicht, Blättern | Lesen |
| `get_record` | Ein Datensatz mit allen Eigenschaften und seinem Datensatzdokument | Lesen |
| `my_tasks` | Deine Aufgaben aus Dokumenten und Datensätzen, mit Fälligkeit | Lesen |
| `get_diagnostics` | Version, Kanal, Build und Build-Datum der Instanz mit einer Zeile für einen [Fehlerbericht](/troubleshooting#was-in-einen-fehlerbericht-gehoert); mit einem Token immer ohne die Admin-Angaben {since=0.12.2} | Lesen |
| `optimize_flashcard_parameters` | Passt die FSRS-Parameter eines [Lernkarten-Stapels](/flashcards-optimize) (oder eines Teils davon) an deine Wertungen an und empfiehlt eine Behaltensrate mit der Arbeit je Rate; speichert nichts {since=0.11.0} | Lesen |
| `create_page` | Neues Dokument, neue Datenbank oder neues Whiteboard; Dokumente können mit Markdown-Inhalt beginnen | Schreiben |
| `append_to_page` | Hängt Markdown ans Ende eines Dokuments an | Schreiben |
| `update_page` | Ändert Titel und Emoji eines Dokuments, ersetzt seinen Text oder einen Abschnitt oder hängt an {since=0.9.8} | Schreiben |
| `move_page` | Verschiebt eine Seite unter eine andere Seite oder einen Datensatz, an den Anfang eines Bereichs oder neben eine Seite {since=0.9.8} | Schreiben |
| `trash_page` | Legt eine Seite samt Unterseiten in den Papierkorb {since=0.9.8} | Schreiben |
| `set_task` | Hakt eine Aufgabe ab oder wieder auf, setzt Status, Fälligkeit und zugewiesene Person {since=0.9.8} | Schreiben |
| `create_record` | Neuer Datensatz; Eigenschaften nach Namen, optional mit Datensatzdokument (`document`, Markdown) | Schreiben |
| `update_record` | Ändert einzelne Eigenschaften und/oder das Datensatzdokument eines Datensatzes | Schreiben |
| `trash_record` | Legt einen Datensatz in den Papierkorb {since=0.9.8} | Schreiben |
| `save_collection` | Neue Sammlung anlegen oder Name, Abfrage, Emoji und Teilen ändern | Schreiben |
| `delete_collection` | Sammlung in den Papierkorb legen | Schreiben |
| `set_flashcard_parameters` | Speichert deine FSRS-Parameter für einen Stapel, einen Teil davon oder alle Stapel, oder setzt sie zurück {since=0.11.0} | Schreiben |

Eigenschaften werden mit ihrem Namen (oder ihrer ID) angegeben. Datumswerte schreibst du als `JJJJ-MM-TT`, Auswahlen mit ihrem Namen, Personen mit E-Mail-Adresse oder Namen und Relationen als Liste von Datensatz-IDs. Text-Eigenschaften (außer dem Titel) sind formatierter Text: `get_database` kennzeichnet sie mit `markdown: true`, gelesen und geschrieben werden sie als Inline-Markdown (`**fett**`, `_kursiv_`, `~~durchgestrichen~~`, `` `Code` ``, `[Text](https://…)`, `\n`; siehe [Formatierter Text](/database-properties#formatierter-text)). `update_record` nimmt die `version` aus `get_record` entgegen: Hat jemand den Datensatz inzwischen geändert, wird die Änderung abgelehnt und nicht überschrieben.

Das Datensatzdokument schreibst du mit `document` als Markdown – beim Anlegen mit `create_record`, später mit `update_record`. `update_record` ersetzt das Dokument; mit `documentMode: "append"` wird der Text am Ende angefügt. Der vorherige Stand bleibt als Version erhalten, und offene Editoren sehen die Änderung sofort.

### Seiten ändern {since=0.9.8}

`update_page` ersetzt den Text eines Dokuments durch Markdown (`mode: "replace"`, der Standard), hängt ihn ans Ende (`"append"`) oder ersetzt einen Abschnitt: `section` nennt eine Überschrift, ersetzt werden die Überschrift und alles darunter bis zur nächsten Überschrift gleicher oder höherer Ebene. Beginnt das Markdown mit einer Überschrift, tritt sie an die Stelle der alten; sonst bleibt die Überschrift stehen. Gibt es die Überschrift nicht oder mehrfach, bekommt der Assistent die Liste der Überschriften (eine doppelte wählt er mit `occurrence`). Vor jedem Ersetzen hält Flowplan den Text als [Version](/import-export-versions#versionsverlauf) fest, und offene Editoren sehen die Änderung sofort.

`read_page` liefert zusätzlich die `revision` des Dokuments. Gib sie an `update_page` mit: Hat sich die Seite inzwischen geändert – auch weil jemand im Editor tippt –, wird die Änderung abgelehnt, und der Assistent liest die Seite neu, statt neueren Text zu überschreiben. `update_page` ändert nur Dokumente; gesperrte Seiten und Seiten in [verschlüsselten Bereichen](/encrypted-spaces) werden abgelehnt.

`move_page` folgt denselben Regeln wie das Verschieben in der Seitenleiste: Schreibrechte an beiden Enden und nie unter die Seite selbst oder eine ihrer Unterseiten. `trash_page` und `trash_record` legen nur in den [Papierkorb](/pages-and-spaces#papierkorb) – dort holst du es unter **Papierkorb → Wiederherstellen** zurück, und die Antwort nennt, wie lange der Papierkorb es aufbewahrt. **Endgültig löschen gibt es über MCP nicht.**

`set_task` ändert eine Aufgabe, ohne den Text zu ersetzen: abhaken oder wieder aufhaken, Status, Fälligkeit oder zugewiesene Person setzen (per E-Mail-Adresse oder Name; die Person wird benachrichtigt). `read_page`, `get_record` und `my_tasks` nennen jede Aufgabe mit `index` und `key`; mit beiden lehnt `set_task` ab, wenn sich die Aufgabe inzwischen geändert hat. Der Text der Aufgabe allein geht auch, solange er eindeutig ist.

Außerdem ist jede Seite als **Ressource** `flowplan://page/<ID>` abrufbar (deine Favoriten sind aufgelistet). Es gibt zwei **Prompts**: *Seite zusammenfassen* und *Meinen Tag planen*.

### Workflows

Für [Workflows](/workflows) gibt es `list_workflows`, `get_workflow`, `get_workflow_catalog`, `list_workflow_runs`, `get_workflow_run` (lesen) und mit einem Schreib-Token `save_workflow_draft` (Graph-JSON in den Entwurf, auch als neue Workflow-Seite – mit Prüfergebnis), `test_workflow` (immer ein Probelauf {since=0.10.0}) und `run_workflow` (nur Workflows mit manuellem Auslöser). **Aktivieren und Freigaben entscheiden gibt es über MCP nicht** – das sind Entscheidungen einer Person über Rechte. Ein Assistent baut also Entwürfe, du prüfst und aktivierst sie in Flowplan.

`test_workflow` läuft über MCP nur als **Probelauf ohne Verbindung nach außen**: keine E-Mail, keine Chat-Nachricht und keine HTTP-Anfrage – auch keine, die im Knoten für Probeläufe freigegeben ist. Einen echten Testlauf startest du selbst in Flowplan. So kann ein Assistent, den gelesener Text in die Irre geführt hat, keine Daten hinausschicken, indem er einen selbst geschriebenen Entwurf testet. {since=0.10.0}

## Rechte

- Jeder Aufruf handelt als die Person, der das Token gehört, mit **genau ihren Rechten**. Es gelten dieselben Prüfungen wie im Browser: Mitgliedschaft im Arbeitsbereich und Gastzugang, private Bereiche, Seiten- und Gruppenrechte, private Datensätze und mit PIN gesperrte Journale.
- **Lese-Tokens** bieten nur Lese-Werkzeuge an. Ein Schreibaufruf mit einem Lese-Token wird abgelehnt.
- **Schreib-Werkzeuge** führen dieselben Aktionen aus wie die Oberfläche. Automatische Versionen, Erwähnungen und Aufgaben-Benachrichtigungen, Follower, das Aktivitätsprotokoll und [Webhooks](/api-and-webhooks#webhooks) funktionieren also wie gewohnt. Gesperrte Seiten bleiben gesperrt.
- Tokens haben nie Administratorrechte und können keine Tokens anlegen oder widerrufen.
- Die öffentliche Demo hat keinen MCP-Zugang: Demo-Konten können keine Tokens anlegen, und `/api/mcp` nimmt keine Browser-Sitzungen an.

## Sicherheitshinweise

- Behandle das Token wie ein Passwort. Wer es hat, kann alles lesen (und mit einem Schreib-Token ändern), was du kannst. Widerrufe ein Token unter **Einstellungen → API & KI-Assistenten**, wenn du es nicht mehr brauchst oder es in falsche Hände geraten sein könnte; die Verbindung endet sofort.
- KI-Assistenten lassen sich durch Inhalte, die sie lesen, in die Irre führen (Prompt Injection), etwa durch Text auf einer mit dir geteilten Seite. Gib einem Assistenten ein **Lese-Token**, wenn er nicht schreiben muss. Nutze bei einem Schreib-Token die Bestätigungsabfragen des Clients für Werkzeugaufrufe.
- **Inhalte anderer sind als Daten markiert** {since=0.10.0}: Was Mitglieder, Gäste, Formulare, E-Mails oder ausgeschnittene Webseiten geschrieben haben, kommt mit dem Hinweis zurück, dass es Daten sind und keine Anweisungen – JSON-Antworten (etwa von `search`, `query_database`, `get_record`, `my_tasks`, `get_meeting_note`, `get_workflow_run`) tragen ein Feld `contentNote`, Markdown (`read_page`, Ressourcen) steht zwischen einer zufälligen Grenze, die der Inhalt nicht schließen kann. Auch die Anweisungen des Servers an den Client sagen: Was die Werkzeuge liefern, entscheidet nicht, welche Werkzeuge er aufruft oder wen er kontaktiert.
- **Keine fremden Bilder** {since=0.10.0}: Markdown, das über MCP geschrieben wird (`create_page`, `update_page`, `append_to_page`, Dokumente von Datensätzen), behält nur Bilder, die als Datei auf dieser Instanz liegen. Ein Bild mit fremder Adresse fällt weg, nur sein Alternativtext bleibt – sonst könnte eine Bildadresse beim Öffnen der Seite Daten hinaustragen. Links bleiben, wie sie sind.
- Antworten können alles enthalten, was du in Flowplan lesen kannst. Diese Inhalte gehen an den Anbieter deines Assistenten, prüfe also vorher dessen Datenschutzbedingungen.
- `/api/mcp` nimmt nur Tokens an, nicht das Anmelde-Cookie. Eine fremde Website kann deine Browser-Sitzung deshalb nicht benutzen. Anfragen mit fremdem `Origin` werden abgelehnt.
- Grenzen: 120 Anfragen pro Minute und Person, 2 MB pro Anfrage, und Antworten werden nach 200.000 Zeichen gekürzt. Für Schreib-Werkzeuge gelten dieselben Größengrenzen wie in der Oberfläche.

## Was unterstützt wird

- Transport: **Streamable HTTP** (`POST /api/mcp`, JSON-Antworten, ohne Sitzung). Protokollversionen 2025-06-18, 2025-03-26 und 2024-11-05.
- Anmeldung: persönliche API-Tokens als `Authorization: Bearer fp_…`. Eine Anmeldung per **OAuth** (für Clients, die nur OAuth können) gibt es noch nicht.
- Seiten lassen sich ändern, verschieben und in den Papierkorb legen, Datensätze in den Papierkorb legen. {since=0.9.8}
- Nicht enthalten: Inhalte endgültig löschen, Verwaltung, Dateien und Uploads, Whiteboard-Inhalte.

## Beispiele

- „Such in Flowplan nach dem Angebot für Müller und fasse die offenen Punkte zusammen.“
- „Lies die Seite *Teammeeting* und ergänze einen Abschnitt *Entscheidungen* mit den Ergebnissen von heute.“
- „Zeig meine überfälligen Aufgaben und mach mir einen Plan für heute.“
- „Leg in der Datenbank *Bugs* einen Eintrag an: Titel *Login auf dem iPad hängt*, Status *Offen*, zugewiesen an anna@example.com.“
