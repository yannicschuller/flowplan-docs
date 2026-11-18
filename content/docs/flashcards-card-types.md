---
keywords: Lernkarten, Kartentypen, Lückentext, Cloze, Antwort eintippen, Multiple Choice, Anki-Lücken, c1, Antwortoptionen
---

# Lernkarten: Kartentypen

Außer Vorder- und Rückseite kennt Flowplan Lückentext, Antwort eintippen und Multiple Choice – hier, wie du sie schreibst und wie Flowplan sie abfragt. Welcher Typ für einen Eintrag gilt und wie du Stapel anlegst, steht unter [Lernkarten](/flashcards#kartentypen); Bilder lernst du mit der [Bildverdeckung](/flashcards-occlusion).

## Lückentext

Eine Lücke schreibst du in einer Text-Eigenschaft wie in Anki: `{{c1::Paris}} liegt an der {{c2::Seine::Fluss}}`. Die Zahl ist die Nummer der Lücke, nach einem zweiten `::` steht ein Hinweis, der in der Lücke erscheint. Jede Nummer wird eine eigene Karte; dieselbe Nummer zweimal fragt beide Stellen auf einer Karte ab. Die Karte zu `c1` zeigt „[…] liegt an der Seine“ – die anderen Lücken stehen im Klartext –, nach dem Aufdecken ist die Antwort hervorgehoben.

Im Dokument eines Eintrags markierst du den Text und wählst im Textmenü unter **…** **Als Lücke (neue Nummer)** oder **Als Lücke (gleiche Nummer wie vorige)** – oder tippst <kbd>/</kbd> **Lücke**. Mit der Tastatur: ++⌘⌥G++ / ++Strg+Alt+G++ für eine neue Nummer, mit ++Umschalt++ für die Nummer der Lücke davor; auf einer Lücke entfernt dasselbe Kürzel sie wieder. Im Editor sind Lücken getönt und tragen ihre Nummer (c1, c2 …); beim Lesen der Seite sind sie verdeckt wie ein Spoiler, ein Klick zeigt sie. Im Markdown-Export stehen sie als `{{c1::…}}`, und der Markdown-Import macht daraus wieder Lücken.

- Ein Eintrag vom Typ Vorder-/Rückseite mit Lücken auf einer Seite wird von selbst zu Lückentext-Karten – so brauchen importierte Karten keinen eigenen Typ.
- Stehen die Lücken im Dokument (der Rückseite), zeigt die Karte den Titel darüber; stehen sie auf der Vorderseite, kommt die Rückseite nach dem Aufdecken als Ergänzung.
- Lernstände hängen an der Nummer: Nummerierst du Lücken um, gehört der Lernstand zur neuen Nummer.
- Verschachtelte Lücken (`{{c1::… {{c2::…}} …}}`) werden flach gelesen: Die innere zählt als Text der äußeren.
- {since=0.10.0} **Lücke (Lernkarte)** in der Formatierungsleiste tut dasselbe; anfangs ausgeblendet ([Leiste anpassen](/formatting#text-formatieren)).
- {since=0.10.0} Die [Suche](/search-and-notifications#schnellsuche) liest `{{c2::Seine::Fluss}}` als „Seine“.

## Antwort eintippen

Unter der Vorderseite steht ein Eingabefeld; <kbd>Enter</kbd> prüft. Flowplan vergleicht mit der Rückseite (bei einem Dokument mit dessen erstem Absatz) und zeigt die Unterschiede Zeichen für Zeichen – zu viel Getipptes durchgestrichen, Fehlendes unterstrichen. Mehrere richtige Antworten trennst du in der Rückseite mit `|`, etwa `colour | color`.

- **Richtig** schlägt **Gut** vor, **Fast richtig** (ein Zeichen anders, bei Antworten ab sechs Zeichen) **Schwer**, sonst **Nochmal**. Der Vorschlag ist hervorgehoben, <kbd>Enter</kbd> oder <kbd>Leertaste</kbd> übernehmen ihn – du kannst aber jede Wertung wählen.
- Was der Vergleich übergeht, stellst du je Stapel ein: Groß- und Kleinschreibung, Akzente (é = e, voreingestellt aus, weil sie in Sprachen zählen) und Satzzeichen. Leerzeichen am Rand und doppelte Leerzeichen zählen nie.
- <kbd>Esc</kbd> im Feld mit Text verlässt erst das Feld, ein zweites <kbd>Esc</kbd> beendet die Sitzung.
- {since=0.10.2} Steht auf der Rückseite nur die erwartete Antwort, zeigt Flowplan sie nach dem Prüfen nicht ein zweites Mal; Zusatz und Notiz bleiben.

## Multiple Choice

Die Karte zeigt die richtige Antwort (die Rückseite) zwischen falschen. Die falschen kommen aus der Eigenschaft unter **Antwortoptionen** (eine Option je Zeile, in einer Zeile mit `;` getrennt, oder die Werte einer Mehrfachauswahl) – fehlen welche, ergänzt Flowplan Rückseiten anderer Karten desselben Stapels, möglichst mit denselben Tags und ähnlicher Länge. Dabei kommen nur Karten in Frage, die du selbst lernen darfst: keine privaten Einträge anderer, keine verborgenen Eigenschaften, in einem Teilstapel nur seine Karten.

- Die Reihenfolge der Antworten ist bei jeder Abfrage neu gemischt und bleibt, solange die Karte zu sehen ist.
- Wähle mit einem Tipp oder den Tasten <kbd>A</kbd> bis <kbd>E</kbd> (vor dem Aufdecken auch <kbd>1</kbd> bis <kbd>5</kbd>). Richtig schlägt **Gut** vor, falsch **Nochmal**; du kannst anders bewerten.
- {since=0.10.2} Nach der Wahl trägt die richtige Antwort ✓ „richtig“, eine falsche Wahl ✗ „deine Wahl, falsch“ – nicht nur eine Farbe. Ist die Rückseite nur die richtige Antwort, steht sie nicht noch einmal darunter.
- Multiple Choice ist leichter als freies Erinnern – gut für den Einstieg; zum Behalten taugen Vorder-/Rückseite und Antwort eintippen mehr.
