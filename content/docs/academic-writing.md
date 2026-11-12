---
keywords: Fußnote, Zitat, Literaturverzeichnis, BibTeX, Zotero, DOI, Quelle, Abschlussarbeit
---

# Fußnoten, Zitate und Literatur

Für Haus-, Abschluss- und Forschungsarbeiten: Fußnoten, Quellen im Text zitieren und ein Literaturverzeichnis, das sich selbst schreibt.

## Fußnoten

`/fußnote`, ++⌘ ⌥ F++ (++Strg Alt F++) oder **Fußnote** im Textmenü fügt an der Schreibmarke eine Fußnote ein und öffnet ihren Text.

- Die Anmerkungen stehen nummeriert unter **Fußnoten** am Ende der Seite. Die Nummern folgen der Reihenfolge im Text und passen sich beim Verschieben, Kopieren und Löschen von selbst an.
- Ein Klick auf die Nummer springt zur Anmerkung, ↩ wieder zurück. Doppelklick auf die Nummer (oder ++⌘ ⌥ F++ bei ausgewählter Fußnote) bearbeitet oder entfernt sie.
- Anmerkungen sind reiner Text; Webadressen darin werden zu Links.
- Fußnoten erscheinen auch auf geteilten und veröffentlichten Seiten, beim Drucken und im HTML-Export, und die Suche findet ihren Text.
- Im Markdown-Export werden sie zu `[^1]` mit `[^1]: Text` am Ende; der Import liest das wieder ein – auch Obsidians Kurzform `^[Text]`.

## Zitate und Literaturverzeichnis

Für Haus-, Abschluss- und Forschungsarbeiten zitierst du Quellen direkt im Text:

::: steps

1. `/zitat` (oder `/cite`) öffnet die **Literaturliste** des Arbeitsbereichs.
2. Einen Titel suchen, eine **DOI** einfügen (z. B. `10.1000/xyz123` – Flowplan holt Autoren, Titel und Jahr bei Crossref und anderen DOI-Diensten) oder über **BibTeX oder CSL-JSON importieren (Zotero) …** eine ganze Literaturliste übernehmen.
3. Optional eine Seite angeben und einfügen.

:::

Im Text steht dann „(Müller 2021)“, „(Müller & Schmidt 2021, S. 12)“ oder „(Müller et al. 2021)“; beim Überfahren zeigt Flowplan die vollständige Angabe. `/literatur` fügt ein **Literaturverzeichnis** ein: alle auf der Seite zitierten Werke in einem APA-ähnlichen Stil, das sich beim Zitieren selbst aktualisiert – auch auf geteilten und veröffentlichten Seiten.

- Die Literaturliste gehört zum Arbeitsbereich; Gäste sehen sie nicht. Jedes Zitat trägt seine Angaben mit, sodass Kopien, Exporte und geteilte Seiten auch ohne die Liste vollständig sind.
- **Zotero:** In Zotero eine Sammlung als *BibTeX* oder *CSL JSON* exportieren und im Dialog importieren.
- Im **Markdown-Export** werden Zitate zu Pandoc-Zitaten (`[@schlüssel]`, `[@schlüssel, p. 12]`) und das Verzeichnis zu einem eigenen Abschnitt – so lässt sich ein Text mit Pandoc weiterverarbeiten.
