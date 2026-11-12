---
keywords: Drucken, PDF, Seitenumbruch, Druckvorlage, Querformat
new: seitenumbruch 2026-11-12
---

# Drucken und PDF

Seiten drucken oder als PDF sichern – mit Druckoptionen, Vorlagen und Seitenumbrüchen dort, wo du sie haben willst.

## Drucken und PDF

**Seitenaktionen → Drucken / PDF** (oder `> drucken` in der Schnellsuche, oder ++⌘ P++ bzw. ++Strg P++ bei geöffneter Seite) öffnet zuerst ein kleines Fenster mit den Druckoptionen; **Drucken** (oder <kbd>Enter</kbd>) öffnet dann den Druckdialog des Browsers, wo du die Seite auch **als PDF sichern** kannst. Seitenleiste, Werkzeugleisten, Griffe, Kommentarleisten, Hinweise und Knöpfe wie „Cover ändern“ oder „+ Tag“ erscheinen nie auf dem Papier; die Farben sind immer hell, Blöcke werden nicht mitten auf der Seite getrennt und lange Codezeilen umbrochen.

**Inhalt** – was mitgedruckt wird:

| Option | Wirkung |
| --- | --- |
| **Titelbild** | Das Cover der Seite oder des Eintrags (beim PDF mit Unterseiten auch die Cover der Kapitel). |
| **Icon** | Das Seitensymbol bzw. das Symbol eines Datenbankeintrags. |
| **Tags** | Die Tags der Seite. |
| **Eigenschaften** | Die Eigenschaften der Seite bzw. die Felder eines Eintrags (Tag-Felder eines Eintrags gehören dazu). |
| **Seitenzahlen** | Eine Seitenzahl unten in der Mitte. |
| **Titelseite**, **Inhaltsverzeichnis** | Nur beim PDF mit Unterseiten und beim Bereich als PDF. |

**Aussehen**: **Papierformat** (Standard – das des Druckers, beim PDF mit Unterseiten A4 –, A4 oder US Letter), **Titelgröße** (Klein, Normal, Groß – für den Seitentitel und die Überschriften), **Schrift für Text** und **Schrift für Überschriften** (Standard, Serifenschrift, serifenlose Schrift oder die [Schriften des Arbeitsbereichs](/workspace-appearance#erscheinungsbild)) und **Links**: Standard (beim Drucken einer Seite wie in Flowplan, beim PDF mit Unterseiten mit der Adresse in Klammern), wie normaler Text, unterstrichen, gestrichelt unterstrichen oder mit der Adresse in Klammern.

Ohne Änderung druckt Flowplan wie bisher, nur mit Seitenzahlen. Deine letzte Auswahl merkt sich Flowplan für dich auf allen Geräten.

> Seitenzahlen in der Fußzeile setzen Chrome und Edge (ab Version 131). Firefox und Safari kennen diese Angabe nicht: Schalte dort im Druckdialog des Browsers **Kopf- und Fußzeilen** ein, dann druckt der Browser seine eigene Seitenzahl (zusammen mit Datum, Titel und Adresse).

### Druckvorlagen

Eine **Druckvorlage** ist eine benannte Auswahl dieser Optionen, etwa „Intern“ (alles) und „Sauber für extern“ (ohne Titelbild, Icon, Tags und Eigenschaften, Links wie Text). Im Druckfenster wählst du sie oben unter **Druckvorlage**; ändert sich danach eine Option, steht dort **Eigene Auswahl**.

- **Als Vorlage speichern …** legt die aktuelle Auswahl als eigene Vorlage an. Eigene Vorlagen umbenennen oder löschen die Stift- und Papierkorb-Knöpfe daneben, verwalten lassen sie sich auch unter **Einstellungen → Drucken / PDF**.
- **Vorlagen des Arbeitsbereichs** legen Eigentümerinnen und Eigentümer an – im Druckfenster (**Speichern für → Für den Arbeitsbereich**) oder unter **Einstellungen → Arbeitsbereich → Druckvorlagen**. Alle Mitglieder und Gäste können sie wählen, aber nicht ändern; im Druckfenster tragen sie das Abzeichen **Arbeitsbereich**. Mit dem Stern wird eine von ihnen zur **Standardvorlage**: Mit ihr beginnt das Druckfenster für alle, die noch nichts gewählt haben.
- Höchstens 30 Vorlagen je Person und je Arbeitsbereich. Die Vorlagen des Arbeitsbereichs kommen im [Inhaltsarchiv](/import-export-versions#inhaltsarchiv) und im JSON-Export mit; beim Import ergänzen sie die vorhandenen (gleichnamige bleiben, wie sie sind).
- Für Skripte: `profile.print` (eigene Auswahl und Vorlagen) und `workspace.printPresets` (Vorlagen des Arbeitsbereichs, nur Eigentümer) über `/api/command`; das PDF mit Unterseiten nimmt die Optionen als JSON im Parameter `print` (`GET /api/export/pdf?page=<id>&children=1&print={"toc":false}`).

## Seitenumbruch

Ein **Seitenumbruch** (`/seitenumbruch`, auch `/umbruch` oder `/pagebreak`) legt fest, wo beim Drucken eine neue Seite beginnt. Im Editor ist er eine feine gestrichelte Linie mit der Aufschrift „Seitenumbruch“; anklicken markiert ihn, <kbd>⌫</kbd> löscht ihn wie eine Trennlinie, am Griff `⋮⋮` lässt er sich verschieben.

- **Drucken / PDF** einer Seite und das [PDF mit Unterseiten](/export#word-pdf-mit-unterseiten-und-e-book) beginnen danach eine neue Seite; die Linie selbst wird nicht gedruckt. Auf dem Bildschirm, auf veröffentlichten Seiten und in der Präsentation bleibt es bei der Linie.
- **Word (DOCX)** bekommt einen echten Seitenumbruch, **E-Books** einen Umbruch, wo das Lesegerät ihn beachtet.
- **Markdown-Export** schreibt `<div style="page-break-after: always"></div>` – das verstehen Pandoc, Typora und die meisten Markdown-zu-PDF-Werkzeuge. Der **Markdown-Import** macht daraus wieder einen Seitenumbruch, ebenso aus `\pagebreak` oder `\newpage` auf einer eigenen Zeile. Eingefügtes HTML aus Word oder Google Docs mit einem Seitenumbruch wird ebenfalls zum Block.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es den Block nicht.
