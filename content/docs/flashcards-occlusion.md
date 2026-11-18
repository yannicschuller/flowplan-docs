---
keywords: Lernkarten, Bildverdeckung, Image Occlusion, Masken, Bild verdecken, Anatomie, Landkarte, Diagramm beschriften, Bereiche abfragen, Anki Image Occlusion, Polygon, Ellipse
---

# Lernkarten: Bildverdeckung

Mit der **Bildverdeckung** lernst du Bilder: Masken verdecken Teile eines Diagramms, einer Landkarte oder eines Anatomie-Atlas, und jede Karte fragt einen davon ab. Die Masken liegen über dem Bild – das Bild selbst bleibt unverändert. Grundlagen der Stapel stehen unter [Lernkarten](/flashcards).

## Masken zeichnen {since=0.10.0}

1. Richte im Stapel unter **Karten einrichten** den **Kartentyp** **Bildverdeckung** ein – für alle Einträge oder als Option der Auswahl **Kartentyp** („Bildverdeckung“ oder „Image occlusion“ erkennt Flowplan von selbst).
2. Öffne einen Eintrag und füge in sein Dokument ein Bild ein.
3. Wähle das Bild, dann in den Bildwerkzeugen **…** → **Bildverdeckung bearbeiten (Lernkarten)**.
4. Zeichne Masken und **Speichern**.

| Werkzeug | So geht es |
| --- | --- |
| Rechteck, Ellipse | über das Bild ziehen |
| Polygon | die Ecken nacheinander antippen; ein Tipp auf die erste Ecke, ein Doppelklick, <kbd>Enter</kbd> oder **Polygon fertig** schließt es |
| Auswählen und verschieben | eine Maske ziehen; die gewählte an ihren Ecken größer oder kleiner ziehen |
| Maske hinzufügen | legt ein Rechteck in die Mitte – ohne Maus |
| Gruppieren, Gruppe lösen | mehrere Masken werden eine Karte („gemeinsam abfragen“) |
| Vorschau der Karte | zeigt die gewählte Karte, wie sie im Fokusmodus kommt |

Neben dem Bild steht die Liste der Masken mit ihrer Kartennummer. Dort gibst du jeder Maske eine **Beschriftung** – sie ist die Antwort auf der Rückseite – und wählst auf dem Telefon mehrere Masken zum Gruppieren aus. **Abfrage** gilt für das ganze Bild:

- **Alle verdecken, eine abfragen** (Vorgabe): Alle Masken sind zu, die abgefragte ist hervorgehoben.
- **Eine verdecken, Rest sichtbar**: Nur die abgefragte Maske ist zu.

Mit der Tastatur: Die Pfeiltasten verschieben die Auswahl (mit <kbd>Umschalt</kbd> weiter, mit <kbd>Alt</kbd> ändern sie die Größe), <kbd>Entf</kbd> löscht, <kbd>G</kbd> gruppiert oder löst die Gruppe, ++⌘/Strg Z++ macht rückgängig, <kbd>Esc</kbd> bricht ein Polygon oder die Auswahl ab.

## Karten und Lernstand {since=0.10.0}

Jede Maske ist eine eigene Karte, jede Gruppe zusammen eine. Ein Eintrag kann mehrere Bilder mit Masken haben. Die Karten zählen wie Lücken eines Lückentexts – in den Zählern, in **Neue Karten pro Tag** und **Wiederholungen pro Tag** und in der Statistik.

Masken behalten ihre Kennung: Verschiebst du eine Maske, änderst ihre Größe oder Beschriftung, bleibt ihr Lernstand. Eine neue Maske ist eine neue Karte, eine gelöschte ruht mit ihrem Lernstand. Fasst du Masken zu einer Gruppe zusammen, lernst du die Gruppe neu; die Gruppe behält ihren Stand, solange sie besteht.

Vorder- und Rückseite des Eintrags gibt es weiter: Die Vorderseite – etwa der Titel „Welche Region ist markiert?“ – steht über dem Bild, die Rückseite kommt nach dem Aufdecken unter der Beschriftung. Nimmt eine Seite das Dokument, zählt das Bild mit Masken nicht zu ihrem Text.

## Lernen {since=0.10.0}

Im [Fokusmodus](/flashcards#lernen-im-fokusmodus) zeigt die Karte das Bild mit den verdeckten Masken, die abgefragte farbig hervorgehoben. **Antwort zeigen** öffnet sie – sie bleibt umrandet – und zeigt die Beschriftung. Gewertet wird wie bei jeder Karte. Das geht auch [offline](/flashcards-app#offline-lernen): Die Bilder der Karten kommen mit dem gespeicherten Stapel aufs Gerät.

Auf dem Telefon oder Tablet zoomst du das Bild mit zwei Fingern – nur das Bild, nicht die Seite. Ist es vergrößert, verschiebt ein Finger das Bild, statt die Karte zu werten; ein Doppeltipp zeigt wieder das ganze Bild. Ohne Zoom wertet Wischen die Karte wie immer. Jede neue Karte beginnt ohne Zoom. {since=0.10.2}

Für Screenreader: Das Bild wird mit seinem Alternativtext angesagt, dazu „Bereich 3 von 7 verdeckt“, nach dem Aufdecken die Beschriftung. Gib dem Bild im Editor der Bildverdeckung einen **Alternativtext**; fehlt er, weist der Editor darauf hin.

## Anki {since=0.10.0}

Notizen vom Typ **Image Occlusion** (Anki 23.10 und neuer) kommen beim [Anki-Import](/flashcards-import#aus-anki-importieren) mit ihren Masken: Rechtecke, Ellipsen und Polygone, Masken mit derselben Nummer als Gruppe, Ankis „Alle verdecken“ als **Alle verdecken, eine abfragen**. Der Lernstand gilt je Maske. Textfelder auf dem Bild kommen als **Texte auf dem Bild** mit, an ihrem Platz und in ihrer Größe: Sie stehen auf beiden Seiten der Karte über den Masken und werden nie abgefragt; Screenreader lesen sie mit. Im Editor der Bildverdeckung änderst du ihren Wortlaut oder entfernst sie. {since=0.10.2} Nur Formen unbekannter Art übernimmt Flowplan nicht; der Bericht nennt ihre Zahl. Der [Export als Anki-Paket](/flashcards-import#als-anki-paket-exportieren) schreibt die Karten als Image-Occlusion-Notizen zurück, eine je Bild – die Texte auf dem Bild als Ankis Textfelder. {since=0.10.2}
