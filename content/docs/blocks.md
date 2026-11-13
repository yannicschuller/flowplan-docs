---
keywords: Block, Griff, Blockmenü, verschieben, ziehen, auswählen, duplizieren, einrücken, Textrichtung, Tabs, Reiter
new: mehrere-bloecke-auswaehlen 2026-11-13
---

# Blöcke bearbeiten

Jeder Block hat links einen Griff: Daran ziehst du ihn an eine andere Stelle, ein Klick öffnet das Blockmenü zum Umwandeln, Färben, Duplizieren und Verschieben. Mehrere Blöcke wählst du mit der Maus oder der Tastatur auf einmal aus.

**Mehr zum Thema:** [Dokumente und Editor](/documents) · [Formatieren, Hinweise und Beschriftungen](/formatting) · [Tastenkürzel](/keyboard-shortcuts#im-dokument)

## Griff und Ziehen

Links neben einem Block erscheinen **+** und ein Griff (`⋮⋮`) – damit die Seite ruhig bleibt, nur am Block unter dem Mauszeiger (irgendwo in seiner Zeile, auch im Rand links davon); beim Tippen verschwinden sie, bis du die Maus wieder bewegst. Der Griff steht dort, wo der Text des Blocks beginnt, bei einem eingerückten Absatz also direkt neben dem Text. Auch Blöcke in aufklappbaren Blöcken, Hinweisen und Zitaten haben einen eigenen Griff; der Kasten selbst behält seinen. Ein [Besprechungsblock](/meetings) hat einen Griff in seiner Titelzeile für den ganzen Block; die Blöcke in seiner Zusammenfassung behalten ihre. Blöcke in einem zugeklappten Block haben keinen Griff, bis er aufgeklappt ist. Mit der Tastatur erreichst du die Griffe weiterhin (<kbd>Tab</kbd> außerhalb des Textes); ein Griff mit Tastaturfokus ist immer sichtbar und umrandet. Auf Touch-Geräten hat nur der Block mit dem Cursor einen Griff, groß genug zum Antippen – tippe also zuerst in den Block. Leere Absätze haben keinen Griff, solange der Cursor nicht darin steht. Wer alle Griffe sehen möchte, schaltet **Einstellungen → Darstellung & Sprache → Editor → Griffe immer anzeigen** ein (auf diesem Gerät). Im Lesemodus und auf gesperrten Seiten gibt es keine Griffe.

- **+** fügt darunter einen leeren Block ein und öffnet gleich das [Blockmenü mit /](/documents#das-blockmenue-mit); mit gedrückter <kbd>⌥</kbd>/<kbd>Alt</kbd> darüber. Das geht unter jedem Block, auch unter Tabellen, Bildern, Einbettungen und Spalten. Blöcke in Spalten haben kein eigenes **+** – dort gehen <kbd>Enter</kbd> und `/`. {since=0.9.6}
- **Ziehen** am Griff zeigt eine Einfügelinie – auch in Hinweise, Zitate oder Spalten hinein. Wie weit links oder rechts du ziehst, bestimmt die Ebene: Nach rechts über einem Listenpunkt wird der Block sein Unterpunkt (die Linie rückt ein), nach links landet er eine Ebene höher – so verschachtelst du Listen und ziehst Blöcke in aufklappbare Blöcke hinein oder heraus. Der Block, der das Abgelegte aufnimmt – Listenpunkt, Liste, aufklappbarer Block, Hinweis, Zitat oder Spalte –, ist beim Ziehen leicht hinterlegt. Am linken oder rechten Rand eines Blocks entstehen Spalten. Mit gedrückter <kbd>⌥</kbd>/<kbd>Alt</kbd> beim Loslassen wird eine **Kopie** eingefügt, das Original bleibt.

Listenpunkte und Aufgaben bleiben beim Verschieben, was sie sind: Außerhalb ihrer Liste bilden sie eine eigene Liste derselben Art, ein nummerierter Punkt behält seine Nummer. Direkt neben einer passenden Liste werden sie Teil davon; in einer anderen Listenart passen sie sich an. In eine Liste abgelegte Blöcke landen auf der Ebene der Einfügelinie, ohne leere Punkte: Absätze werden Listenpunkte, andere Blöcke wie Tabellen gehören zum Punkt davor.

++⌘ ⇧ ↑/↓++ verschiebt den aktuellen Block unter seinen Nachbarn. Jede Blockaktion lässt sich einzeln rückgängig machen.

**Zwischen zwei Blöcken ohne Text** (etwa einer Tabelle und einem Bild) genügt ein Klick in den Zwischenraum oder an die Kante. Mit der Tastatur gehst du mit den Pfeiltasten bis zur blinkenden Linie und tippst los oder drückst <kbd>Enter</kbd>. <kbd>Enter</kbd> auf einem ausgewählten Bild fügt darunter einen Absatz ein. Das **+** der [Werkzeugleiste](/formatting#text-formatieren) über dem Text fügt den gewählten Block unter dem aktuellen ein – nur in einem leeren Absatz ersetzt es ihn. Umwandeln kannst du einen Block mit **Umwandeln in …** im Blockmenü. {since=0.9.6}

## Blockmenü

Ein Klick auf den Griff wählt den Block aus und öffnet das **Blockmenü** (am Handy von unten). <kbd>Esc</kbd> schließt das Menü, der Block bleibt [ausgewählt](#mehrere-bloecke-auswaehlen). {since=0.9.6} Mit der Maus öffnet es sich links vom Griff, damit der Block sichtbar bleibt; nur wenn links kein Platz ist, rechts davon. Oben steht, was für ein Block es ist. Oben steht ein **Suchfeld**: Tippen filtert alle Aktionen und Blocktypen, <kbd>Enter</kbd> führt den ersten Treffer aus. Mit der Maus öffnen sich Untermenüs seitlich – weiter links oder, wenn dort kein Platz ist, über dem Menü, nie über dem Block; am Handy an Ort und Stelle. Neben den Einträgen stehen ihre Tastenkürzel.

- **Umwandeln in …** – Text, Überschrift 1–4, Aufzählung, nummerierte Liste, Aufgabenliste, [aufklappbarer Block](/documents#aufklappbare-bloecke), aufklappbare Überschrift 1–4, Zitat, Hinweis, Code, Formel, **Seite** (der Block wird eine Unterseite, ein Link darauf bleibt stehen) oder **2 bzw. 3 Spalten**; Listenpunkte werden zum aufklappbaren Block mit ihren Unterpunkten als Inhalt, Zitate und Hinweise lassen sich auflösen
- **Farbe** – Text- oder Hintergrundfarbe für den ganzen Block (siehe [Blockfarben](/formatting#blockfarben))
- **Block darunter einfügen** und **Block darüber einfügen** – ein leerer Block mit dem Blockmenü mit /, auch auf Touch-Geräten {since=0.9.6}
- **Kopieren** (++⌘ C++), **Ausschneiden** (++⌘ X++) {since=0.9.6}, **Duplizieren** (++⌘ D++), **Verschieben** (nach oben, nach unten, unter eine Überschrift der Seite, an den Anfang oder ans Ende), **Kommentieren**, **KI fragen**, **Link zum Block kopieren** und **Löschen**
- **Hinweistyp**, **Symbol** und **Farbe** (Hinweise), **Breite** (Videos und Einbettungen) und **Textrichtung**, wo sie passen
- **Mehrere auswählen** – der Auswahlmodus auf Touch-Geräten

## Mehrere Blöcke auswählen

Mit der Maus ziehst du aus dem Rand oder einer freien Stelle ein **Rechteck** auf: Jeder Block, den es berührt, wird ausgewählt und hellblau hinterlegt. <kbd>Esc</kbd> in einem Block oder ein Klick auf seinen Griff wählt ihn aus (nach dem Klick schließt <kbd>Esc</kbd> zuerst das Blockmenü, die Auswahl bleibt). ++↑++/++↓++ wählen den Block davor oder danach, ++⇧ ↑++/++⇧ ↓++ oder ++⇧++-Klick auf einen Griff erweitern die Auswahl, ++⌘ A++ (++Strg A++) wählt alle Blöcke. Im Text wählt das erste ++⌘ A++ den Text des Blocks, das zweite alle Blöcke. {since=0.9.6} Für die Auswahl gelten <kbd>Entf</kbd>, ++⌘ D++ (duplizieren), ++⌘ ⇧ ↑/↓++ (verschieben), <kbd>Tab</kbd>/++⇧ Tab++ (einrücken), ++⌘ C++/++⌘ X++/++⌘ V++ (Blöcke kopieren, ausschneiden, dahinter einfügen) und `/` (Blockmenü für alle); Ziehen an einem ihrer Griffe verschiebt alle. Kopierte oder ausgeschnittene Blöcke kommen beim Einfügen wieder als Blöcke an, auch in einer anderen Seite; andere Apps erhalten den Text. Ein Klick in den Text oder <kbd>Esc</kbd> beendet die Auswahl.

Auf Touch-Geräten startet **Mehrere auswählen** im Blockmenü den **Auswahlmodus**: Kreise stehen statt der Griffe, ein Tipp wählt einen Block aus, ein weiterer erweitert die Auswahl bis dorthin; sind alle Punkte einer Liste gewählt, gilt die ganze Liste. Die Leiste unten verschiebt, kopiert, dupliziert, verschiebt unter eine Überschrift oder löscht die Auswahl, **⋯** hat den Rest des Blockmenüs, darunter **Ausschneiden**. {since=0.9.6} **Fertig** oder <kbd>Esc</kbd> beendet den Modus.

## Einrücken

- <kbd>Tab</kbd> am Anfang eines Absatzes oder einer Überschrift rückt ein (bis zu acht Stufen), ++⇧ Tab++ rückt zurück. Steht direkt darüber ein [aufklappbarer Block](/documents#aufklappbare-bloecke), schiebt <kbd>Tab</kbd> den Block stattdessen hinein und ++⇧ Tab++ wieder heraus. Früher eingerückte Zeilen bleiben, wie sie sind.
- <kbd>Backspace</kbd> am Anfang einer eingerückten Zeile nimmt zuerst eine Stufe weg.
- In Listen verschachtelt <kbd>Tab</kbd> den Eintrag unter den vorigen; geht das nicht, passiert nichts – <kbd>Tab</kbd> verlässt den Text nie. <kbd>Enter</kbd> in einem leeren Listenpunkt rückt nur diesen Punkt eine Ebene höher, eine Ebene pro <kbd>Enter</kbd>; auf der obersten Ebene wird er ein normaler Absatz. <kbd>Enter</kbd> am Ende eines Punkts mit Unterpunkten beginnt einen neuen ersten Unterpunkt. In Codeblöcken fügt <kbd>Tab</kbd> zwei Leerzeichen ein, in Tabellen springt es zur nächsten Zelle. Über die [Blockauswahl](#mehrere-bloecke-auswaehlen) schiebt <kbd>Tab</kbd> auch Codeblöcke und Tabellen in einen aufklappbaren Block.

## Tabs {since=0.9.6}

Mit dem Block **Tabs** legst du Inhalte in Reitern übereinander – etwa Anleitungen für verschiedene Systeme oder Varianten eines Textes. Tippe `/tabs`, um ihn einzufügen. Jeder Tab hat einen Titel und kann beliebige Blöcke enthalten: Absätze, Listen, Tabellen, Bilder, aufklappbare Blöcke und sogar weitere Tabs.

- **Hinzufügen:** **+** rechts in der Tableiste – den Namen tippst du gleich ein.
- **Umbenennen:** Doppelklick auf den Tab oder <kbd>F2</kbd>.
- **Verschieben:** den Tab mit der Maus ziehen oder ++⌘ ⇧ ←++/++⌘ ⇧ →++ (Windows/Linux: <kbd>Strg</kbd>+<kbd>Umschalt</kbd>+<kbd>←</kbd>/<kbd>→</kbd>).
- **Löschen:** <kbd>Entf</kbd> auf dem Tab; **Rückgängig** holt ihn zurück. Der letzte Tab bleibt – den ganzen Block löschst du über sein Blockmenü.
- **Am Handy:** Die Tableiste lässt sich wischen, alle Aktionen stehen im Menü **⋯**.
- **Tastatur:** <kbd>←</kbd>/<kbd>→</kbd>, <kbd>Pos1</kbd> und <kbd>Ende</kbd> wechseln den Tab, <kbd>Enter</kbd> springt in seinen Inhalt.

Welchen Tab du siehst, merkt sich Flowplan für dich auf diesem Gerät. Andere sehen ihren eigenen Tab, und durchs Umschalten entsteht keine neue Version. Ihr könnt gleichzeitig in verschiedenen Tabs schreiben.

**Umwandeln in → Tabs** macht aus markierten Blöcken Tabs: Jede Überschrift beginnt einen neuen Tab. **Umwandeln in → Überschriften mit Inhalt** macht daraus wieder normalen Text.

Beim Drucken, als PDF, in E-Books, im HTML-Export und auf veröffentlichten Seiten stehen alle Tabs untereinander, jeweils mit ihrem Titel als Überschrift; Word, Confluence und Jira bekommen ebenso eine Überschrift pro Tab.

**Markdown:** Flowplan schreibt und liest das Format des Obsidian-Plugins „Tabs“:

````markdown
```tabs
tab: Windows
Lade das Installationsprogramm herunter.

tab: Linux
Installiere das Paket mit deinem Paketmanager.
```
````

Enthält ein Tab selbst Codeblöcke, wird der äußere Zaun länger (`` ````tabs ``) – oder du nimmst `~~~tabs`. Eine Optionszeile des Plugins wie `top, multi` wird beim Import ignoriert.

## Textrichtung

Absätze, Überschriften, Listen, Zitate, Hinweise und Tabellenzellen in Arabisch, Hebräisch oder Persisch laufen **automatisch von rechts nach links**: Die Richtung folgt dem ersten Buchstaben des Blocks. Aufzählungszeichen, Kästchen, Zitatbalken, Hinweissymbole und Blockgriffe stehen dann rechts.

Im Blockmenü (Klick auf den Griff `⋮⋮`) → **Textrichtung** legst du für einen Block und alles darin **Automatisch**, **Links nach rechts** oder **Rechts nach links** fest. Die Richtung bleibt im HTML-Export erhalten; Markdown kennt sie nicht.
