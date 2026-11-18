---
keywords: Lernkarten, Karteikarten, Import, Export, CSV, TSV, Quizlet, Anki, apkg, colpkg, Anki-Stapel, Brainscape, Vokabeln importieren, Lernstand exportieren, Lernstand übernehmen
---

# Lernkarten importieren und exportieren

Karten für einen [Lernkarten-Stapel](/flashcards) kommen nicht nur einzeln: Der Assistent **Karten importieren** liest Text aus CSV, TSV, Quizlet und anderen Lernprogrammen, **Aus Anki importieren** übernimmt ganze Anki-Stapel mit Bildern, Tönen und auf Wunsch deinem Lernstand. **Exportieren** gibt die Karten eines Stapels als CSV zurück – auf Wunsch mit deinem Lernstand – oder als Anki-Paket. Karten aus einer Seite oder einem PDF schlägt die [KI](/flashcards-ai) vor.

## Karten importieren: CSV und Quizlet {since=0.10.0}

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

## Aus Anki importieren {since=0.10.0}

**Aus Anki importieren** oben auf der Seite [Lernen](/flashcards#alle-stapel-lernen) – oder unter **Einstellungen → Import & Export → Import** mit der Quelle **Anki (Lernkarten)** – macht aus Anki-Stapeln Lernkarten-Datenbanken:

1. Exportiere in Anki über **Datei → Exportieren …** ein **Anki-Stapelpaket (.apkg)** oder die ganze Sammlung (**.colpkg**). Flowplan liest das alte und das neue Format (Anki 2.1.50 und neuer), mit oder ohne „Ältere Anki-Versionen unterstützen“.
2. Wähle die Datei und den Zielbereich. Die Vorschau zeigt die Stapel mit ihren Unterstapeln, die Zahl der Notizen, Karten und Mediendateien und Hinweise.
3. Prüfe je Notiztyp, was seine Felder werden – **Vorderseite**, **Rückseite**, **Hinweis**, **Zusatz** oder **nicht übernehmen** –, dazu den Kartentyp und **Auch umgekehrt abfragen** (nicht bei Lückentext und Bildverdeckung). Vorgeschlagen wird, was Anki selbst vorne und hinten zeigt; darunter steht eine Beispielkarte. {since=0.10.2} Lücken zeigt sie als **[…]** und aufgedeckt markiert, Masken einer Bildverdeckung als **Maske 1** usw. – nicht als `{{c1::…}}`.
4. Auf Wunsch **Meinen Lernstand übernehmen**.
5. **… Notizen importieren**. Danach öffnet **Stapel öffnen** den ersten Stapel. {since=0.10.2} Enthält das Paket keine Notizen, sagt der Assistent das, statt einen Knopf anzubieten.

| Anki | Flowplan |
| --- | --- |
| oberster Stapel | eine Lernkarten-Datenbank mit den Ansichten **Lernen** und **Alle Karten** |
| Unterstapel (`Spanisch::Lektion 1`) | ein Wert der Auswahl **Deck** (`Lektion 1`) – zum Filtern einer [Lernen-Ansicht](/flashcards#teilstapel-ueber-filter) |
| Basic, Basic (and reversed card) | Vorder-/Rückseite, mit umgekehrter Karte |
| Basic (type in the answer) | Antwort eintippen |
| Cloze | Lückentext, `{{c1::…}}` bleibt |
| Image Occlusion {since=0.10.0} | [Bildverdeckung](/flashcards-occlusion#anki) mit den Masken; auf Wunsch Vorder-/Rückseite mit dem Bild, ohne Masken |
| eigener Notiztyp | nach seinen Vorlagen: Felder der Frage vorne, Felder nur der Antwort hinten, `{{hint:…}}` als Hinweis |
| Tags | die Mehrfachauswahl **Tags** |
| Bilder, Töne (`[sound:…]`) | Dateien des Stapels, Töne als Audio-Block |

- **Eigenschaft oder Dokument:** Eine Kartenseite mit einfacher Formatierung (fett, kursiv, Links) wird eine Eigenschaft. Hat sie irgendwo im Stapel Bilder, Töne, Formeln (`\(…\)`), Listen, Tabellen oder Hoch- und Tiefstellung, kommt sie ins Dokument des Eintrags – die Vorderseite über einer Linie, die Rückseite darunter.
- **Bereinigt:** Skripte, Stile, Schriften und Farben aus Anki fallen weg, Bilder aus dem Netz bleiben ein Link.
- **Umgekehrte Karten** gelten in Flowplan für den ganzen Stapel. Mischt ein Stapel Notizen mit und ohne Rückwärtskarte, entscheidet die Mehrheit – die Vorschau sagt es.
- **Lernstand:** Flowplan spielt Ankis Wiederholungsprotokoll mit FSRS nach und kennt so für jede Karte Stabilität, Schwierigkeit und Fälligkeit – nur für dich; niemand sonst bekommt einen Lernstand. Hat Anki schon FSRS-Werte gespeichert, gelten diese. Ausgesetzte Karten bleiben ausgesetzt, neue Karten bleiben neu.
- **Grenzen:** Pakete bis 100 MB und 50 000 Notizen. Jede Mediendatei darf so groß sein wie ein Upload und zählt zum Speicherplatz; nicht verwendete kommen nicht mit. Fehlende Dateien und was nur angenähert übernommen wurde, listet der Importbericht.

### Als Anki-Paket exportieren {since=0.10.0}

**Exportieren → Als Anki-Paket (.apkg)** lädt die Karten der Ansicht als Paket, das jede Anki-Version (Desktop, AnkiDroid, AnkiMobile) importiert: eine Notiz je Eintrag mit den Notiztypen Basic, Basic mit umgekehrter Karte, Antwort eintippen und Cloze, Multiple Choice als Basic mit den Optionen auf der Vorderseite, Bildverdeckung als Image Occlusion (eine Notiz je Bild, ab Anki 23.10). Hinweis und Zusatz werden eigene Felder, Tags bleiben Tags, die Auswahl **Deck** wird zu Unterstapeln, Bilder und Töne des Stapels kommen als Medien mit. Der Lernstand bleibt in Flowplan – in Anki sind die Karten neu.
