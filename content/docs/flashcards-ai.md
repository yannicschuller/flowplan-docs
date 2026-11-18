---
keywords: Lernkarten, Karteikarten, KI, künstliche Intelligenz, Karten erzeugen, Karten aus PDF, Karten aus Text, Lückentext, Multiple Choice, Vokabeln, Lernstoff, Zusammenfassung lernen
---

# Lernkarten mit KI erstellen

Die KI schlägt [Lernkarten](/flashcards) aus deinem Lernstoff vor – aus einer Seite, einem markierten Abschnitt, einem PDF oder eingefügtem Text. Du prüfst jede Karte, bevor etwas angelegt wird.

> [!NOTE]
> Dafür muss die [KI](/ai) eingeschaltet sein und die Funktion **Lernkarten erstellen** erlaubt – von der Administration und in deinen eigenen KI-Einstellungen.

## So geht es {since=0.9.9}

Drei Wege öffnen den Dialog **Lernkarten mit KI erstellen**:

- **Mit KI erstellen** in der Lernen-Ansicht eines Stapels – die Karten kommen in diesen Stapel.
- **Lernkarten erstellen** im Textmenü, wenn du in einem Dokument Text markierst.
- **Lernkarten mit KI erstellen** in der Schnellsuche (++⌘ K++, dann `>`) – für die offene Seite.

Im Dialog wählst du:

1. **Quelle:** **Diese Seite** (oder den Eintrag), **Markierter Text**, **PDF oder Datei** (PDFs, Word- und andere Dokumente der Seite – ihr Text, den Flowplan für die Suche ausliest, auch gescannte über die Texterkennung) oder **Text einfügen**.
2. **Stapel:** einen vorhandenen Lernkarten-Stapel oder **Neuer Stapel …** mit Name und Bereich – er wird eine Datenbank der Art **Lernkarten**.
3. **Höchstens** wie viele Karten (bis 200), welche **Kartentypen** (Vorder-/Rückseite, Lückentext, Antwort eintippen, Multiple Choice) und auf Wunsch einen **Schwerpunkt**, etwa „nur Begriffe und Definitionen“.

Vor dem Senden steht da, wie viele Tokens die Anfrage etwa braucht. **Karten vorschlagen** schickt die Quelle an die KI; lange Quellen gehen in Teilen.

## Prüfen und hinzufügen

Die Vorschläge stehen in einer Liste mit Häkchen:

- **Bearbeiten** ändert Vorder- und Rückseite, den Hinweis und bei Multiple Choice die falschen Antworten.
- **ähnlich zu einer vorhandenen Karte** – die Karte gibt es im Stapel schon (Groß- und Kleinschreibung, Akzente und Satzzeichen zählen nicht); **Ja/Nein-Frage** – solche Karten lernen sich schlecht. Beide sind zuerst nicht angehakt.
- **Quelle** nennt den Abschnitt, aus dem die Karte stammt – zum Gegenprüfen.
- **Neu erzeugen** fragt die KI noch einmal, ohne die schon vorgeschlagenen Karten zu wiederholen.
- **Tags für alle** gibt jeder Karte dieselben Tags, etwa „Kapitel 3“.

Erst **… Karten hinzufügen** legt die angehakten Karten als Einträge des Stapels an – mit deinen Rechten, wie ein Import. Lücken stehen als `{{c1::…}}` in der Vorderseite, der Kartentyp in der Eigenschaft **Kartentyp**, falsche Antworten in den Antwortoptionen, wenn der Stapel eine solche Eigenschaft hat. Stapel, deren Vorder- oder Rückseite aus dem Dokument des Eintrags kommt, nehmen keine KI-Karten an.

## Worauf die KI achtet

- **Nur aus der Quelle:** Die KI soll nichts erfinden und kein Wissen von außen ergänzen; steht wenig in der Quelle, kommen weniger Karten.
- **Eine Tatsache je Karte**, kurze Antworten, keine Ja/Nein-Fragen, keine Karten aus Beispielen oder Fußnoten; Lücken nur um Schlüsselbegriffe.
- **Sprache der Quelle** – die Karten sind in der Sprache des Lernstoffs.
- **Keine Dubletten:** Die Vorderseiten des Stapels gehen mit, damit die KI sie nicht wiederholt; der Server vergleicht danach noch einmal selbst.

Trotzdem gilt: Lies die Karten vor dem Hinzufügen – eine KI kann sich irren.

## Datenschutz und Grenzen

- Die KI liest nur, was du lesen darfst und was sie lesen darf: keine Seiten, die [für die KI gesperrt](/ai#seiten-und-bereiche-fuer-die-ki-sperren) sind, keine [verschlüsselten Bereiche](/encrypted-spaces), keine privaten Einträge anderer. Geheimnisse wie Passwörter und Schlüssel werden vorher geschwärzt.
- Die Vorderseiten des Stapels gehen nur mit, wenn die KI den Stapel lesen darf. Aus deinen Lernsitzungen – Wertungen, Zeiten, Lernstand – geht nie etwas an die KI.
- Es gilt der Anbieter deiner Instanz, auch ein lokaler wie Ollama; die Fußzeile des Dialogs nennt ihn.
- Höchstens 200 Karten je Lauf und 400 000 Zeichen Quelle – bei längeren wähle einen Abschnitt. Jeder Teil zählt wie jede KI-Anfrage zum Limit der Instanz.
- Angelegt wird nur mit Schreibrecht am Stapel; das Prüfprotokoll vermerkt `ai.cards`.
