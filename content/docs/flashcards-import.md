---
keywords: Lernkarten, Karteikarten, Import, Export, CSV, TSV, Quizlet, Anki, Brainscape, Vokabeln importieren, Lernstand exportieren
---

# Lernkarten importieren und exportieren

Karten für einen [Lernkarten-Stapel](/flashcards) kommen nicht nur einzeln: Der Assistent **Karten importieren** liest Text aus CSV, TSV, Quizlet und anderen Lernprogrammen, **Exportieren** gibt die Karten eines Stapels als CSV zurück – auf Wunsch mit deinem Lernstand.

## Karten importieren: CSV und Quizlet {since=0.9.9}

**Karten importieren** in der Lernen-Ansicht (mit Schreibrecht) legt Einträge aus Text an:

1. Füge Text ein oder wähle eine Datei (CSV, TSV, TXT, bis 5 MB).
2. Flowplan erkennt die Trennzeichen – zwischen Begriff und Definition Tab, Komma oder Semikolon, zwischen Karten neue Zeile oder Semikolon – und ob die erste Zeile die Spalten benennt. Beides lässt sich ändern, auch auf eigene Trennzeichen.
3. Ordne jede Spalte einer Eigenschaft zu oder lass sie weg. Vorgeschlagen werden Vorder- und Rückseite, Hinweis, Zusatz, Tags, Kartentyp und Antwortoptionen nach den Spaltennamen („Front“, „Back“, „Term“, „Definition“, die Namen deiner Eigenschaften …), ohne Kopfzeile die erste Spalte als Vorder- und die zweite als Rückseite.
4. Die Vorschau zeigt die ersten Karten und jede Zeile, die keine Karte wird – mit Nummer und Grund (Vorder- oder Rückseite fehlt, Wert zu lang). Doppelte Zeilen kommen nur einmal.
5. **… Karten importieren** legt die Einträge an, höchstens 5000 auf einmal.

**Quizlet**: Öffne das Set, wähle **Exportieren** und kopiere den Text – Tab zwischen Begriff und Definition, neue Zeile oder Semikolon zwischen Karten. Bilder kommen so nicht mit. Dasselbe Formular passt für den Textexport von Anki, Brainscape und anderen. Lücken in Anki-Schreibweise (`{{c1::…}}`) bleiben erhalten und werden Lückentext-Karten. Tags in einer Spalte trennst du mit Komma oder Semikolon, sonst mit Leerzeichen (wie bei Anki).

Der Import schreibt in Eigenschaften; eine Kartenseite aus dem Dokument des Eintrags füllt er nicht. Werte, die keine Option einer Auswahl sind, werden neue Optionen.

### Als CSV exportieren

**Exportieren → Karten als CSV** lädt eine Zeile je Karte, die du lernen darfst (auch ausgesetzte): Vorderseite, Rückseite, Hinweis, Zusatz, Tags, Kartentyp und Karte (leer für die Karte, `r` für die umgekehrte, `c1`, `c2` … für Lücken). Dokumente stehen als Markdown darin, Lücken als `{{c1::…}}`. **Karten mit meinem Lernstand als CSV** hängt deinen eigenen Stand an: Zustand, fällig, Stabilität, Schwierigkeit, Wiederholungen, Vergessen, ausgesetzt – nie den Stand anderer. Die Datei lässt sich mit **Karten importieren** wieder einlesen; die Zeilen der Geschwister einer Karte werden dabei zu einem Eintrag.
