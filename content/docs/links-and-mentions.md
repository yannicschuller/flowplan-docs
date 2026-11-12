---
keywords: Link, Erwähnung, @, Backlinks, Wikilink, Blocklink, Graph, Verlinkt von
---

# Links, Erwähnungen und Graph

Seiten, Einträge und Personen mit @ verlinken, auf einzelne Blöcke zeigen und im Graph sehen, wie alles zusammenhängt.

## Seitenlinks und Erwähnungen

`@` sucht Seiten, Einträge aus Datenbanken und Personen – einfach weitertippen, um die Liste zu filtern. Die Pfeiltasten wandern durch die Treffer, <kbd>Enter</kbd> fügt den markierten ein. `@` öffnet die Liste am Zeilenanfang, nach einem Leerzeichen oder nach einer öffnenden Klammer oder einem Anführungszeichen; mitten im Wort – etwa in einer E-Mail-Adresse wie `ada@example.org` – wird `@` einfach geschrieben. <kbd>Esc</kbd> (oder <kbd>Enter</kbd> ohne Treffer) schließt die Liste und schreibt `@` und den gesuchten Text in den Text. Journaltage stehen hinter den übrigen Seiten. `@heute`, `@gestern` oder ein Datum wie `@2026-10-27` bieten unter **Journal** einen Link auf diesen Tag des [Journals](/journal#tage-in-listen-suche-graph-und-export) an. Einträge erscheinen mit ihrer Datenbank, etwa „Heizung – Wartung · Notizen“; angeboten werden nur Einträge, die du lesen darfst. Eine Erwähnung einer Person benachrichtigt sie im Posteingang.

Links auf Seiten und Einträge bleiben gültig, auch wenn sie umbenannt oder verschoben werden. Steht im Link der alte Titel, wird er beim Umbenennen durch den neuen ersetzt – in allen Dokumenten und Einträgen, die du bearbeiten darfst; ein Link mit eigenem Text behält ihn. Das Ziel zeigt alle Links darauf unter **Verlinkt von** (Seiten) bzw. **Verknüpft von** (Einträge). Dort stehen auch Einträge, in deren Text der Link steht. Wer einen verlinkenden Eintrag oder seine Seite nicht lesen darf, sieht ihn dort nicht.

Ein Link auf eine Seite oder einen Eintrag zeigt vor dem Text das Icon des Ziels: sein Emoji, sein Symbol oder sein eigenes Bild – ohne eigenes Icon das Zeichen seiner Art (Dokument, Datenbank, Whiteboard, Eintrag). Ändert jemand das Icon, ändert es sich in allen Links mit, wie der Titel beim Umbenennen. Das gilt auch im Lesemodus, in Kommentaren, auf veröffentlichten Seiten, in der Vorschau beim Darüberfahren, in der `@`-Liste, unter **Verlinkt von**, bei **Verwandte Seiten** und in der Suche. Ein Link auf einen Block behält sein Absatzzeichen, solange die Seite kein eigenes Icon hat. Für Seiten und Einträge, die du nicht lesen darfst, zeigt der Link nur das allgemeine Link-Zeichen. Beim Drucken erscheinen die Icons mit; Markdown-Exporte enthalten nur den Linktext.

Links ins Web sind unterstrichen und tragen hinter dem Text einen kleinen Pfeil nach außen. Wer den Pfeil nicht sehen möchte, schaltet unter **Einstellungen → Darstellung & Sprache → Symbol bei externen Links** aus – die Links bleiben dann farbig und unterstrichen, nur der Pfeil fehlt, in Dokumenten, Einträgen, Kommentaren und im Lesemodus. Die Einstellung gilt für dein Konto auf allen Geräten und nur für deine Ansicht: Veröffentlichte Seiten zeigen ihren Besuchern den Pfeil weiter. Gedruckt wird der Pfeil nie; beim Drucken steht hinter einem Link seine Adresse.

### Automatische Links

Hat ein Eigentümer [automatische Links](/workspace-appearance#automatische-links) eingerichtet, wird passender Text zum Link, sobald du danach ein Leerzeichen, ein Satzzeichen oder <kbd>Enter</kbd> tippst, und ebenso beim Einfügen – in Seiten, in Dokumenten von Datenbankeinträgen und in Kommentaren. Es ist ein gewöhnlicher Link: Er bleibt beim Zusammenarbeiten, offline und in den Apps erhalten und lässt sich wie jeder andere bearbeiten oder entfernen. <kbd>⌘</kbd> <kbd>Z</kbd> (<kbd>Strg</kbd> <kbd>Z</kbd>) direkt danach nimmt nur den Link zurück, der Text bleibt. Text, der schon dasteht, ändert sich nicht; in Code, vorhandenen Links, Formeln, Titeln und Tabellenzellen von Datenbanken wird nichts verlinkt.

## Links auf Blöcke

Jeder Block lässt sich verlinken: ein Absatz, eine Überschrift, ein Listenpunkt, eine Tabelle, ein Bild, ein Diagramm … Der Link ist die Adresse der Seite mit dem Block, etwa `https://flowplan.example.org/#page=…&block=k3x9a2b1` (bei Einträgen mit `&row=…`), und funktioniert überall im selben Arbeitsbereich.

**Link kopieren**

- im Blockmenü (Griff ⠿ links neben dem Block, auf dem Handy antippen): **Link zum Block kopieren**,
- bei Überschriften über das Link-Symbol, das beim Darüberfahren hinter der Überschrift erscheint,
- im [Inhaltsverzeichnis](/reading-and-presenting#inhaltsverzeichnis) über das Link-Symbol neben jeder Überschrift (auf dem Handy immer sichtbar),
- mit <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>Umschalt</kbd> <kbd>L</kbd>) für den Block, in dem der Cursor steht.

Kopiert wird die Adresse; in andere Programme eingefügt (Mail, Chat, Word) erscheint sie als Link mit dem Text „Seite › Anfang des Blocks“.

**Link einfügen**

Einen kopierten Blocklink einfach in ein Dokument oder einen Eintrag desselben Arbeitsbereichs einfügen (<kbd>⌘</kbd> <kbd>V</kbd>): Er wird zu einem Link wie ein Seitenlink, mit dem Text „Seite › Anfang des Blocks“. Ist vorher Text markiert, wird dieser Text zum Link. Über `@` lassen sich auch Überschriften und Blöcke anderer Seiten suchen: `@Projekt › Ziele` (oder `@Projekt#Ziele`) zeigt die Überschriften der Seite „Projekt“, die „Ziele“ enthalten; ein Suchwort allein findet auch Absätze mit diesem Text. Überschriften der eigenen Seite stehen als „Diese Seite › …“ dabei.

Wird die verlinkte Seite (oder der Eintrag) umbenannt, ändert sich der Seitentitel im Linktext mit; der Teil hinter „›“ bleibt, wie er ist. Beim Darüberfahren zeigt die Vorschau den aktuellen Text des Blocks.

**Link öffnen**

Ein Klick öffnet die Seite (bei einem Eintrag den Eintrag im Dialog), scrollt zum Block und hebt ihn kurz hervor. Ein Block in einem eingeklappten Abschnitt wird dabei aufgeklappt. Gibt es den Block nicht mehr, öffnet sich die Seite mit dem Hinweis „Diesen Block gibt es nicht mehr – die Seite ist geöffnet.“

**Gut zu wissen**

- Ein Block behält seinen Link beim Bearbeiten, Verschieben (auch Ausschneiden und Einfügen) und Umwandeln. Kopien – **Duplizieren** oder Kopieren und Einfügen im selben Dokument – bekommen einen eigenen Link. Wird ein Block mit Enter geteilt, bleibt der Link beim ersten Teil.
- Vorschau und Linktext zeigen nur, was du lesen darfst: Für eine Seite ohne Leserecht erscheint nur „Verlinkter Block“, ohne Text.
- In [verschlüsselten Bereichen](/encrypted-spaces) funktionieren Blocklinks innerhalb des Bereichs ebenso; der Server kennt den Text dort nicht, deshalb gibt es keine Textvorschau.
- Auch wer eine Seite nur lesen darf, kann Links auf ihre Blöcke kopieren.
- Für **Text links ausrichten** gibt es kein Tastenkürzel mehr (<kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>L</kbd> kopiert jetzt den Blocklink); links ist die Standardausrichtung, die Werkzeugleiste bietet sie weiter an.

## Graph der Verlinkungen

Das Netz-Symbol unten in der Seitenleiste (oder `> graph` in der Schnellsuche) zeigt alle Seiten als Punkte und ihre Links als Linien. Datenbank-Einträge erscheinen als eigene Punkte, sobald sie verlinken oder verlinkt sind; ein Klick öffnet den Eintrag. Große Punkte haben viele Verbindungen; Farben unterscheiden Dokumente, Datenbanken, Einträge, Whiteboards und Journale.

- Ziehen verschiebt, Mausrad oder zwei Finger zoomen, ein Klick öffnet die Seite.
- Überfahren hebt eine Seite und ihre Nachbarn hervor; **Hervorheben** markiert Seiten nach Titel.
- **Unterseiten verbinden** zeigt zusätzlich die Seitenhierarchie (gestrichelt), **Seiten ohne Verbindung** blendet einzelne Seiten ein oder aus.
- **Journaltage** steuert die Tage von [Journalen](/journal): **ausblenden**, **je Monat ein Punkt** (Standard; der Punkt sammelt die Links aller Tage des Monats, ein Klick öffnet das Journal) oder **einzeln zeigen**. Die Zeile oben nennt Seiten und Journaltage getrennt.
- Als Verbindung zählen Links auf Seiten und Einträge (auch aus dem Text eines Eintrags), eingebettete Whiteboards, verknüpfte Datenbanken und synchronisierte Blöcke. Der Graph zeigt nur, was du sehen darfst.

## Nicht verlinkte Erwähnungen

Unter **Verlinkt von** am Seitenende listet **Nicht verlinkte Erwähnungen** Dokumente und Einträge, in denen der Titel dieser Seite vorkommt, ohne dass er verlinkt ist (Titel ab vier Zeichen), oder einer ihrer [Aliasse](/page-tags#aliasse) als ganzes Wort (ab zwei Zeichen); der gefundene Alias steht grau neben dem Treffer. **Verlinken** macht die erste Erwähnung dort zu einem Link auf diese Seite, zuerst über den Titel, sonst über einen Alias – der Text bleibt, wie er dasteht. Ein geöffneter Eintrag zeigt dasselbe für seinen Titel und seine Aliasse unter seinen Eigenschaften.
