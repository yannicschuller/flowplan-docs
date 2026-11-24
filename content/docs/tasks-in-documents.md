---
keywords: Aufgabe, To-do, Checkliste, abhaken, zuweisen, fällig, Meine Aufgaben
---

# Aufgaben in Dokumenten

Aufgaben mitten im Text: abhaken, einer Person zuweisen, mit Fälligkeitsdatum versehen und mit fünf Status wie in Obsidian.

## Aufgaben mit Person und Datum

Eine Aufgabe (`/todo` oder `[]` + Leerzeichen) mit einer Erwähnung wie `@Anna` ist Anna zugewiesen: Sie bekommt eine Benachrichtigung und findet die Aufgabe unter **Meine Aufgaben** in der Seitenleiste. Ein Datum setzt du, während der Cursor in der Aufgabe steht, mit dem Kalender-Knopf in der Werkzeugleiste oder über das Textmenü (Text markieren oder Rechtsklick → **Fälligkeit**). Das Datum erscheint als Chip rechts in der Zeile (heute hervorgehoben, überfällig rot); ein Klick darauf ändert es oder entfernt es mit **Datum entfernen**. Eine neue Aufgabe per <kbd>Enter</kbd> beginnt ohne Datum.

**Meine Aufgaben** zeigt alles in einer Liste, nach Fälligkeit gruppiert (Überfällig, Heute, Nächste 7 Tage, Später, Ohne Datum): Aufgaben aus Dokumenten, Journalen und deiner Seite „Aufgaben“ sowie Einträge aus Datenbanken, die einen Status oder ein Erledigt-Häkchen haben. Einträge aus Datenbanken ohne so ein Feld (z. B. Dokumente, Kontakte, Leselisten) sind keine Aufgaben und erscheinen hier nicht. {since=0.9.8} Darunter folgen unter **Aus anderen Arbeitsbereichen** deine Aufgaben aus den übrigen Arbeitsbereichen, je Arbeitsbereich; ein Klick auf die Seite wechselt dorthin. Abhaken und Datum ändern wirkt direkt im Dokument, auch bei anderen, die es gerade geöffnet haben. Am Fälligkeitstag kommt morgens eine Erinnerung; die Zahl neben „Meine Aufgaben“ zeigt, wie viele heute fällig oder überfällig sind.

**Aufgaben ohne @Name:** Eine Aufgabe ohne Person erscheint unter **Meine Aufgaben**, wenn sie in einem Tag deines Journals steht, auf deiner Seite **Aufgaben** oder – mit Datum – in einer Seite, die du angelegt hast. Mit dem Schalter **Auch Aufgaben ohne Person aus meinen Seiten** in der Filterzeile kommen alle offenen Aufgaben ohne Person aus deinen Seiten dazu, auch ohne Datum. Er ist anfangs aus und gilt für dich auf allen Geräten. {since=0.11.5}

**Eigene Aufgaben ohne Dokument:** Oben in **Meine Aufgaben** steht das Feld **Aufgabe hinzufügen …** – Text eingeben, <kbd>Enter</kbd>, fertig. Die Aufgabe landet auf deiner eigenen Seite **Aufgaben**, die Flowplan beim ersten Mal in deinem privaten Bereich des Arbeitsbereichs anlegt (hast du noch keinen, entsteht ein privater Bereich „Privat“). Die Kurzschreibweise der Schnellerfassung gilt auch hier: „Steuer abgeben morgen“ oder „Zahnarzt anrufen Freitag“ setzen das Datum. `@Name` vergibt die Aufgabe nur an jemanden, der die Seite öffnen kann – deine Seite ist privat, deshalb bleibt der Name sonst im Text und ein Hinweis sagt warum; Aufgaben für andere schreibst du in ein Dokument, das ihr beide seht. Die Seite ist eine ganz normale Seite: Du findest sie in der Seitenleiste, kannst sie umbenennen oder verschieben, und ihre Aufgaben können alles, was Aufgaben können (Status, ++Strg/⌘ L++, Erinnerung am Fälligkeitstag, Widgets, Siri und Spotlight). Löschst du sie, legt die nächste Aufgabe eine neue an. Gäste und Mitglieder mit Leserechten sehen das Feld nicht.

**Wohin neue Aufgaben gehen:** Mit dem Knopf am Ende des Feldes **Aufgabe hinzufügen …** (er zeigt das Ziel, anfangs **Aufgaben**) wählst du, wohin neue Aufgaben gehen – auf deine Seite **Aufgaben** oder in eine Aufgaben-Datenbank, in der du Einträge anlegen darfst und die für Meine Aufgaben zählt (ein Status oder ein Erledigt-Häkchen). Die Aufgabe wird dann ein Eintrag, zugeordnet wie bei **Aufgaben in Datenbank verschieben …**: Der Text wird zum Titel, das Datum der Kurzschreibweise zur Fälligkeit, `@Name` zur Personen-Eigenschaft (nur für jemanden, der die Datenbank öffnen kann), dazu `#Tag` und `!Priorität`. Ohne `@Name` stehst du selbst in der Personen-Eigenschaft, der Status bekommt den ersten offenen Wert; Standardwerte, Standard-Vorlage und Automationen der Datenbank gelten wie bei jedem neuen Eintrag. Liegt die Datenbank im Papierkorb, darfst du dort nichts mehr anlegen oder hat sie keinen Status mehr, landet die Aufgabe auf deiner Seite **Aufgaben**, und ein Hinweis unter dem Feld sagt warum. Die Wahl gilt je Arbeitsbereich, nur für dich und auch für die Schnellerfassung und die Widgets der Apps. {since=0.11.5}

**Filter** {since=0.9.8}: Die Filterzeile über der Liste hat

- **Quelle:** Alle, Dokumente oder Datenbanken.
- **Person:** **Mir zugewiesen** zeigt dir mit @ gegebene Aufgaben, deine eigenen, die aus deinen Journalen (auch ohne @Name und ohne Datum) und Einträge, in denen du in einer Personen-Eigenschaft stehst. **Alle** zeigt dazu jeden Eintrag, den du sehen kannst. **Eigene** zeigt nur deine Seite „Aufgaben“.
- **Fälligkeit:** Beliebig, Überfällig, Heute, Nächste 7 Tage, Mit Datum oder Ohne Datum. „Heute“ und „Nächste 7 Tage“ enthalten auch alles Überfällige.
- **Erledigte zeigen.**

Flowplan merkt sich die Filter auf diesem Gerät. Datenbank-Auswahl, Suche und gespeicherte Ansichten stehen unter **Nur Datenbanken:** und gelten nur für Einträge. Einträge hakst du direkt in der Liste ab. {since=0.9.8} **Seite „Aufgaben“ öffnen** springt zur Seite.

**Neue Aufgaben:** Gibt dir jemand eine Aufgabe, steht neben „Meine Aufgaben“ in der Seitenleiste eine blaue Zahl (auf dem Handy auf **Navigation**), bis du „Meine Aufgaben“ öffnest; dort tragen die neuen Aufgaben ein kleines **Neu**, solange die Ansicht offen ist. Die helle Zahl daneben zählt wie bisher, was heute fällig oder überfällig ist.

## Status einer Aufgabe

Eine Aufgabe hat einen von fünf Status, wie in Obsidian: **Offen** `[ ]`, **In Arbeit** `[/]` (halb gefülltes Kästchen), **Erledigt** `[x]`, **Abgebrochen** `[-]` (graues Kästchen mit ×, durchgestrichen) und **Verschoben** `[>]` (Kästchen mit →).

- Ein Klick auf das Kästchen hakt die Aufgabe wie bisher ab oder öffnet sie wieder; eine Aufgabe **in Arbeit** wird mit einem Klick erledigt.
- **Rechtsklick** auf das Kästchen (auf Tablet und Handy: **lange drücken**) öffnet ein kleines Menü mit allen fünf Status.
- ++⌘/Strg L++ macht aus der Zeile mit dem Cursor eine Aufgabe; auf einer Aufgabe wechselt es den Status: offen → in Arbeit → erledigt → offen. Abgebrochene und verschobene Aufgaben werden wieder offen. Sind mehrere Zeilen markiert, bekommen alle den nächsten Status der ersten. In einer Aufzählung oder nummerierten Liste wird nur die Zeile zur Aufgabe; die Liste wird dort geteilt.
- **Ganze Checkliste zurücksetzen** {since=0.9.8}: Im [Blockmenü](/blocks#blockmenue) einer Aufgabe (Griff `⋮⋮`, auf dem Handy erst die Aufgabe antippen) setzt **Alle als offen markieren** alle Aufgaben dieser Liste samt Unteraufgaben auf **Offen** – praktisch für Packlisten, die du immer wieder brauchst. **Alle abhaken** macht alle erledigt, abgebrochene bleiben abgebrochen. Ein Rückgängig holt den vorigen Stand zurück. Mit [mehreren ausgewählten Blöcken](/blocks#mehrere-bloecke-auswaehlen) (auf Touch-Geräten über **Mehrere auswählen**) gilt es nur für die gewählten Aufgaben; am Computer stehen beide Einträge auch im Rechtsklick-Menü einer Checkliste.
- **In Arbeit** und **Verschoben** zählen als offen: Sie stehen unter **Meine Aufgaben** (mit ihrem Status), in den Widgets der App, bekommen die Erinnerung am Fälligkeitstag und ziehen im Journal auf den nächsten Tag um. **Abgebrochen** zählt als abgeschlossen, aber nicht als erledigt: Die Aufgabe verschwindet aus „Meine Aufgaben“, zieht nicht um und erscheint im Rückblick des Journals nicht bei den erledigten Aufgaben.
- Abhaken unter **Meine Aufgaben** oder in einem Widget macht eine Aufgabe in Arbeit zu einer erledigten.
- Ältere Apps und Desktop-Versionen zeigen die Status als abgehakt (erledigt, abgebrochen) oder offen (alle anderen).

## Aufgaben in eine Datenbank verschieben {since=0.11.1}

Wird ein Dokument mit vielen Aufgaben zu voll, verschiebst du sie in eine Aufgaben-Datenbank: **⋯** → **Aufgaben in Datenbank verschieben …** (nur bei Dokumenten mit Aufgaben, die du bearbeiten darfst). Wähle eine Datenbank, in der du Einträge anlegen darfst, und ordne die Felder zu:

- Der Text der Aufgabe wird zum Titel, weitere Absätze darunter zum Inhalt des Eintrags.
- **Erledigt** kommt in einen Status (du wählst die Option für erledigte und für offene Aufgaben) oder in ein Häkchen. Abgebrochene Aufgaben zählen als erledigt, „In Arbeit“ und „Verschoben“ als offen.
- Das Fälligkeitsdatum kommt in eine Datums-, die erwähnte Person in eine Personen-Eigenschaft. Standardwerte der Datenbank gelten für alles Übrige.
- Unteraufgaben werden eigene Einträge – mit ihrer übergeordneten Aufgabe verknüpft, wenn die Datenbank eine Eigenschaft für übergeordnete Einträge hat.

Im Dokument ersetzt Flowplan jede Aufgabe durch einen Link auf ihren Eintrag; du kannst sie stattdessen entfernen oder unverändert lassen. **Rückgängig** in der Meldung holt die Aufgaben zurück und legt die neuen Einträge in den Papierkorb. In verschlüsselten Bereichen geht das nicht, weil der Server ihren Inhalt nicht lesen kann.
