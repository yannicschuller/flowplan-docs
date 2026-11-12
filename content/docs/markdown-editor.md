---
keywords: Markdown, Kürzel, Markdown-Kürzel, Quelltext, ChatGPT, einfügen, Codeblock
---

# Markdown im Editor

Der Editor versteht Markdown: Kürzel beim Tippen, ganze Seiten als Markdown-Text bearbeiten und Antworten aus ChatGPT, die beim Einfügen formatiert ankommen.

## Markdown-Kürzel

Beim Tippen wandelt der Editor um:

| Tippen | Ergebnis |
| --- | --- |
| `#`, `##`, `###` + Leerzeichen | Überschrift 1–3 |
| `-` oder `*` + Leerzeichen | Aufzählung |
| `1.` + Leerzeichen | Nummerierte Liste |
| `[]` + Leerzeichen | Aufgabe |
| `>` + Leerzeichen | [Aufklappbarer Block](/documents#aufklappbare-bloecke) (oder Zitat, siehe unten) |
| `"` + Leerzeichen | Zitat (auch mit „ “ ”) |
| ` ``` ` | Codeblock |
| `---` | Trennlinie |
| `**fett**`, `*kursiv*`, `` `code` ``, `~~durch~~` | Formatierung im Text |

**`>` als Zitat:** Wer `>` wie in Markdown für Zitate gewohnt ist, stellt unter **Einstellungen → Darstellung & Sprache → Editor → „>“ erzeugt** auf **Zitat** um. Die Einstellung gilt für dein Konto auf allen Geräten. Sie betrifft nur das Tippen: In importierten Markdown-Dateien und in eingefügten Antworten aus ChatGPT & Co. wird `> Text` wie bisher ein Zitat, und der Markdown-Export schreibt Zitate weiter als `> Text`.

Codeblöcke tragen ihre Sprache im Zaun: ` ```python `, ` ```typescript `, ` ```terraform `. Der Export schreibt die Kennungen von VS Code bzw. Shiki; der Import versteht auch Kürzel und ältere Namen (`js`, `ts`, `py`, `sh`, `yml`, `cpp`, `csharp`, `plaintext` …) und speichert sie mit der vollen Kennung (` ```js ` wird zu JavaScript, beim nächsten Export ` ```javascript `). Unbekannte Sprachen bleiben erhalten und erscheinen im Block als „(importiert)“, ohne Hervorhebung.

Zeilennummern, hervorgehobene Zeilen, Ansicht und Einklappen stehen hinter der Sprache im Zaun, in der üblichen Schreibweise: ` ```ts {3-5} showLineNumbers startLine=10 `, dazu `view=preview`/`view=split`/`view=code`, `collapsed` und `collapsedLines=15`. Der Import versteht auch `showLineNumbers{10}` (rehype-pretty-code), `showLineNumbers=10` und `hl_lines="3 4"`/`linenums="10"` (MkDocs). Die Nummern in `{…}` zählen ab der ersten Zeile des Blocks, unabhängig von der Startnummer. ` ```mermaid `-Zäune werden zu Codeblöcken, die das Diagramm zeigen.

## Als Markdown bearbeiten

**Seitenmenü … → Als Markdown bearbeiten** zeigt die ganze Seite als Markdown-Text mit Zeilennummern – praktisch für große Umbauten, Suchen und Ersetzen oder wenn du lieber in Markdown schreibst.

- **Übernehmen** (++⌘ Enter++) speichert vorher eine Version und ersetzt den Inhalt in einem Schritt; **Rückgängig** nimmt die Änderung zurück.
- Blöcke ohne Markdown-Form – Einbettungen, Whiteboards, verknüpfte Datenbanken, synchronisierte Blöcke, Spalten, Tabellen mit verbundenen Zellen oder Breiten, Bilder mit Größe, Funktionsgraphen, Kennzahlen und Literaturverzeichnisse – stehen als Markierung `<!-- flowplan:block … -->` im Text. Du kannst sie verschieben oder löschen, aber nicht ändern; sie kommen unverändert zurück. Wird eine gelöscht, fragt Flowplan vor dem Übernehmen nach.
- Formatierungen ohne Markdown-Form (Farben, Hochstellen, Spoiler, Erwähnungen, Zitate) bleiben als HTML im Text erhalten.
- **Ausrichtung, Einzug, Textrichtung und Reaktionen** gehen beim Übernehmen verloren; die Ansicht nennt vorher, was betroffen ist.
- Ändert jemand die Seite, während du im Markdown schreibst, erscheint ein Hinweis; **Trotzdem übernehmen** überschreibt dann deren Änderungen.
- Wer nur lesen darf – auch bei gesperrten Seiten und im Lesemodus –, sieht **Als Markdown anzeigen** ohne Übernehmen.

## Antworten aus ChatGPT einfügen

Text, den du aus ChatGPT oder einem anderen Assistenten kopierst, wird beim Einfügen formatiert: Formeln in LaTeX (`\[ … \]`, `\( … \)`, `$$ … $$`) werden zu Formelblöcken und Formeln im Satz, Markdown (Überschriften, **fett**, Listen, Tabellen) wird umgesetzt, Zeilen mit Tabulatoren werden zur Tabelle, `☐` zur Aufgabenliste, und jede Zeile wird ein eigener Absatz. Aus der Webseite kopierte, bereits gerenderte Formeln bleiben als Formel erhalten. Das gilt auch für das Kopieren direkt aus der ChatGPT-Webseite. Stehen Formeln schon als Text im Dokument (etwa `\[ A(3;2;1) \]`), markiere sie – oder alles mit ++⌘/Strg A++ – und wähle im Textmenü **In Formeln umwandeln**. Gewöhnlicher Text wird wie bisher eingefügt.
