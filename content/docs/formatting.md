---
keywords: fett, kursiv, Farbe, Markieren, Spoiler, Hinweis, Callout, Beschriftung, Abbildung, Formatierungsleiste, Blockfarbe, Inline-Code
new: blockfarben 2026-11-13
---

# Formatieren, Hinweise und Beschriftungen

Text formatieren, Hinweise in fünf Arten und mit eigenem Symbol, Bilder und Tabellen beschriften und nummerieren.

## Text formatieren

Die **Werkzeugleiste** über dem Text hat alle Formatierungen und Blöcke: Fett, Kursiv, Unterstrichen, Durchgestrichen, Markieren, Farbe und Hintergrundfarbe, Hoch- und Tiefgestellt, **Verdecken (Spoiler)**, Link, Überschrift, Aufgabe, Ausrichtung, Listen, Inline-Formel und weitere Blöcke. Text markieren – oder ein Rechtsklick hinein – öffnet das **Textmenü** mit den schnellen Aktionen direkt am Text: Reaktionen für den Absatz, **Fett**, *Kursiv*, Link, Code, **Kommentieren**, **Fußnote** und **Kopieren**, bei markierten Rechnungen die Ergebnisse, in Aufgaben auch **Fälligkeit**. Das Textmenü erscheint über der Markierung – direkt unter der Werkzeugleiste darunter, damit es sie nicht verdeckt. Unterstrichen, Durchgestrichen und Markieren erreichst du über die Werkzeugleiste oder die Tastenkürzel (++Strg/⌘ U++, ++Strg/⌘ ⇧ S++, ++Strg/⌘ ⇧ H++); wo keine Werkzeugleiste zu sehen ist (etwa im Fokusmodus), bietet das Textmenü sie zusätzlich an.

- **Menü bei Textauswahl**: Unter **Einstellungen → Darstellung & Sprache → Editor → Menü bei Textauswahl** legst du fest, wann das Textmenü beim Markieren erscheint – **Immer**, **Nur am Computer** (Standard) oder **Nie**. „Nur am Computer“ richtet sich danach, womit du markierst: mit Maus, Trackpad oder Tastatur (<kbd>⇧</kbd> + Pfeiltasten) erscheint das Menü, mit dem Finger auf Smartphone oder Tablet nicht – dort übernehmen das Auswahlmenü des Systems (Ausschneiden, Kopieren, Einfügen) und die Werkzeugleiste über der Tastatur mit Formatierung und **Kommentieren**. Auf einem iPad mit Trackpad erscheint es also beim Markieren mit dem Trackpad, nicht beim Markieren mit dem Finger. Ein **Rechtsklick** öffnet das Textmenü in jeder Einstellung, auch bei „Nie“. Die Einstellung gilt für dein Konto auf allen Geräten.
- **Formatierungsleiste**: Unter **Einstellungen → Darstellung & Sprache → Editor → Formatierungsleiste** blendest du die feste Leiste über dem Text von Seiten und Einträgen aus (**Anzeigen** ist Standard, **Ausblenden**). Ausgeblendet bietet das Textmenü über markiertem Text alle Formatierungen, wie im Fokusmodus: vorne **Umwandeln in** mit dem aktuellen Blocktyp („Text ⌄“ – Text, Überschrift 1–3, Aufzählung, nummerierte Liste, Aufgabenliste, aufklappbarer Block, Zitat, Hinweis, Code, Formel), dann **Fett**, *Kursiv*, Unterstrichen, Durchgestrichen, Code, Markieren, **Farbe** (Text und Hintergrund), Link, **Inline-Formel** und **Formatierung entfernen** (Links und Kommentare bleiben). Unter **…** liegen Hoch- und Tiefgestellt, Verdecken (Spoiler), Ausrichtung, Block nach oben/unten, Vorschlagen, Autoren anzeigen und das Inhaltsverzeichnis. Kommentieren, KI, Fußnote und Kopieren bleiben wie gewohnt; Rückgängig und Wiederholen gehen mit ++⌘ Z++ und ++⌘ ⇧ Z++. Auf dem Handy bleibt die Leiste über der Tastatur – dort ist sie die Formatierungsreihe der Tastatur. Die Einstellung gilt für dein Konto auf allen Geräten.
- **Auf dem Smartphone**: **Kommentieren** steht in der Werkzeugleiste über der Tastatur (und als **Text kommentieren** unter dem Dokument), **Fußnote** im **+**-Menü bzw. mit `/fußnote`. Reaktionen erreichst du über das Textmenü – mit **Immer** beim Markieren, auf Android auch per langem Druck, wenn der Browser ihn als Rechtsklick meldet.

- Formatierungen gelten nur für die aktuelle Zeile. Nach <kbd>Enter</kbd> beginnt die neue Zeile als normaler Text – nur Listen und Aufgaben setzen sich mit einem neuen Eintrag fort, nach einer Überschrift folgt ein Absatz.
- **Umwandeln in**: Im Textmenü (auch per Rechtsklick in eine Zeile; bei ausgeblendeter Formatierungsleiste oder im Fokusmodus vorne als Liste „Text ⌄“) wechselt eine Zeile ihren Typ, ohne dass der Text verloren geht – Text, Überschrift 1–3, Aufzählung, nummerierte Liste, Aufgabe, Zitat oder Codeblock. Der aktuelle Typ ist hervorgehoben.
- **Verschachtelte Listen** wechseln je Ebene ihre Zeichen: nummeriert 1. → a. → i., Aufzählungen • → ◦ → ▪, ab der vierten Ebene wieder von vorn. Die Ebene zählt über Listenarten hinweg – eine nummerierte Liste unter einer Aufzählung oder Aufgabe beginnt mit a. So sieht es auch auf veröffentlichten Seiten, im Druck, im PDF und in Word aus; der Markdown-Export schreibt weiter `1.`.
- **Code und Markieren**: Inline-Code erscheint in einer Akzentfarbe auf grauem Grund und lässt sich mit Fett, Kursiv, Durchgestrichen und Links kombinieren (auch beim Markdown-Import von `**`code`**`). Eine Markierung ohne Farbe ist gelb, im dunklen Modus durchscheinend.

### Spoiler

Verdeckter Text bleibt auch beim Schreiben verdeckt. Ein Klick auf die Fläche deckt ihn auf, ein weiterer verdeckt ihn wieder. ++⌘ ⌥ H++ verdeckt die Auswahl. Auch auf Whiteboards lassen sich Zettel und Texte verdecken.

### Blockfarben

Im [Blockmenü](/blocks#blockmenue) gibt **Farbe** einem ganzen Block (Absatz, Überschrift, Listenpunkt, Zitat, aufklappbarer Block) eine **Textfarbe** oder eine **Hintergrundfarbe** – dieselben neun Farben wie beim Text, **Standard** nimmt sie wieder weg. Mehrere [ausgewählte Blöcke](/blocks#mehrere-bloecke-auswaehlen) färbst du auf einmal. Die Farben passen sich dem hellen und dunklen Design an.

Beim Markdown-Export steht die Farbe als Kommentar vor dem Block, bei Listenpunkten am Ende der Zeile; andere Programme zeigen ihn nicht, der Import liest ihn wieder:

```markdown
<!-- flowplan:color red-background -->

Wichtiger Absatz
```

## Hinweise

Hinweise gibt es in fünf Arten, wie bei GitHub, Forgejo und Obsidian: **Hinweis** (blau), **Tipp** (grün), **Wichtig** (lila), **Warnung** (gelb) und **Achtung** (rot). Jede Art hat ihr Symbol und ihren Titel in der Sprache der Lesenden. Steht der Cursor in einem Hinweis, ändert `/tipp`, `/warnung` usw. seine Art; ebenso das Blockmenü (Klick auf den Griff `⋮⋮`) → **Hinweistyp**.

### Eigenes Symbol und eigene Farbe

Damit ein Hinweis auch für anderes taugt – eine Idee 💡, ein Termin 📅, ein Merksatz ★ –, bekommt er im Blockmenü ein eigenes Symbol und eine eigene Farbe:

- **Symbol** → **Emoji oder Zeichen wählen …** öffnet die Emoji-Auswahl (dieselbe wie für Seitensymbole, mit Suche, Kategorien und Hautton). Unter **Oder ein eigenes Zeichen** tippst du auch ein Zeichen wie ★, → oder ✓ ein – erlaubt ist genau ein Emoji oder Symbolzeichen, keine Buchstaben, Ziffern, Satzzeichen oder Leerzeichen. **Symbol entfernen** stellt das Symbol der Art wieder her.
- **Farbe** bietet die neun Textfarben (Grau, Braun, Orange, Gelb, Grün, Blau, Lila, Pink, Rot); **Standard** nimmt wieder die Farbe der Art. Die Farben sind im hellen und im dunklen Design gut lesbar.

Die Art bleibt dabei erhalten: Sie gibt den Titel („Tipp“, „Warnung“ …) und gilt beim Markdown-Export. Symbol und Farbe bleiben beim Kopieren, Duplizieren, in Vorlagen, Versionen, veröffentlichten Seiten, beim Drucken sowie im PDF-, EPUB- und Word-Export erhalten. In [verschlüsselten Bereichen](/encrypted-spaces) gibt es keine Hinweise.

### Hinweise in Markdown

Beim Markdown-Export werden Hinweise zu GitHub-Hinweisen (`> [!WARNING]`). Ein eigenes Symbol steht am Anfang des Textes, eine eigene Farbe als Kommentar am Ende, den GitHub nicht anzeigt:

```markdown
> [!TIP]
>
> 💡 Mit / geht es schneller.
>
> <!-- flowplan:callout color=green -->
```

Beim Import (Markdown, ZIP, Notion) werden `> [!NOTE]` bis `> [!CAUTION]` wieder zu Hinweisen der passenden Art; die weiteren Arten von Obsidian landen bei der nächstliegenden (etwa `danger` → Achtung, `hint` → Tipp), ein eigener Titel (`> [!WARNING] Vorher lesen`) wird zur fetten ersten Zeile. Steht am Anfang des Textes ein einzelnes Emoji oder Symbol mit Leerzeichen dahinter, wird es zum Symbol des Hinweises; der Farbkommentar stellt die Farbe wieder her. Hinweise aus Notions Markdown-Export (`<aside>💡 …</aside>`) werden zu Hinweisen mit ihrem Emoji.

## Beschriftungen

Bilder, Tabellen und Codeblöcke können eine kurze **Beschriftung** bekommen – eine Zeile, die beschreibt, was der Block zeigt. Sie steht klein und gedämpft unter dem Block.

- **Hinzufügen**: bei Bildern über **Beschriftung** in der [Bildleiste](/media-and-files#bilder-dateien-und-einbettungen) oben rechts, bei Tabellen über **Beschriftung** im Menü eines Zeilen- oder Spaltengriffs, bei Codeblöcken über **Beschriftung hinzufügen** unten in der Ecke des Blocks (beim Zeigen oder mit dem Cursor darin). Alternativ im Blockmenü (Griff `⋮⋮`) → **Beschriftung hinzufügen**.
- **Tippen**: Die Beschriftung ist reiner Text in einer Zeile (bis 500 Zeichen). <kbd>Enter</kbd> oder <kbd>↓</kbd> gehen unter dem Block weiter, <kbd>Esc</kbd> oder <kbd>↑</kbd> zurück in den Block. Andere sehen die Beschriftung beim gemeinsamen Bearbeiten sofort; ++⌘ Z++ im Dokument macht Änderungen rückgängig.
- **Entfernen**: Text löschen und das Feld verlassen (oder <kbd>⌫</kbd> im leeren Feld), oder Blockmenü → **Beschriftung entfernen**.
- **Bilder**: Die Beschriftung ersetzt nicht den Alternativtext für Screenreader. Hat ein Bild eine Beschriftung, bietet das Blockmenü **Beschriftung als Alternativtext** an.
- Beschriftungen bleiben beim Kopieren und Einfügen, Verschieben, Duplizieren, in Vorlagen, Versionen, auf veröffentlichten Seiten, beim Drucken und in allen Exporten erhalten, und die Suche findet sie. Aus HTML (etwa beim Einfügen von Webseiten oder dem Notion-HTML-Export) werden `<figure>` mit `<figcaption>` und Tabellen mit `<caption>` zu Beschriftungen.

### Beschriftungen nummerieren

**Seitenaktionen (…) → Beschriftungen nummerieren** stellt den Beschriftungen einer Seite eine Nummer voran: „Abbildung 1“, „Tabelle 1“, „Listing 1“ (für Code). Gezählt wird je Art in der Reihenfolge des Dokuments, und nur Blöcke, die eine Beschriftung haben. Die Bezeichnung folgt der Sprache, in der Flowplan angezeigt wird (Deutsch: Abbildung/Tabelle/Listing, Englisch: Figure/Table/Listing, Französisch: Figure/Tableau/Listing). Der Schalter gilt für die ganze Seite und für alle, die sie lesen – auch auf veröffentlichten Seiten, beim Drucken und in den Exporten. Kopien der Seite übernehmen ihn. In Eintragsdokumenten von Datenbanken gibt es ihn nicht.
