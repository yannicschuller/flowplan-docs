---
keywords: Brainstorming, Live-Cursor, Abstimmung, Timer, Retro, Präsentation, Rahmen, Vorlage
---

# Whiteboards: gemeinsam, mit KI und präsentieren

Live mit anderen auf einem Board, Zettel als Datenbankeinträge, KI für Ideen und Gruppen, Rahmen als Folien präsentieren und mit Vorlagen starten.

## Gemeinsam arbeiten

- **Live-Cursor**: Du siehst die Mauszeiger der anderen mit Namen in Echtzeit, wie in Miro. Wer außerhalb deines Ausschnitts arbeitet, erscheint als Markierung am Rand; ein Klick darauf springt hin.
- Änderungen erscheinen bei allen innerhalb von Sekunden, auch nach einer Unterbrechung ohne Verbindung.
- **Timer** für Workshop-Phasen, sichtbar für alle. Auf Wunsch läuft dazu **Hintergrundmusik** (Ruhig, Fokus oder Lo-fi): im Timer-Fenster unter **Musik während des Timers** wählen. Sie startet und endet mit dem Timer für alle; Lautstärke und Stumm stellt jede Person für sich über das Lautsprecher-Symbol im Timer ein. Blockiert der Browser den Ton, weil auf der Seite noch nichts angeklickt wurde, erscheint **Ton an**. Die Musik entsteht im Browser, ohne Audiodateien und ohne externe Dienste.
- **Abstimmung**: Stimmen pro Person festlegen, starten; alle vergeben Punkte auf Elemente, das **Ergebnis** zeigt die Reihenfolge. **Verdeckt abstimmen** zeigt jeder Person nur die eigenen Stimmen, bis die Abstimmung endet – so beeinflusst niemand die anderen.
- **Folge mir** (unter **Moderation**): Alle anderen sehen deinen Ausschnitt und folgen dir beim Verschieben und Zoomen. Wer selbst schiebt oder zoomt, hört auf zu folgen und kann mit **Folgen** zurück. **Beenden** hebt es für alle auf.
- **Kommentare** an Stellen der Fläche, mit Antworten und Erwähnungen.
- **Privater Modus** (Auge-durchgestrichen-Symbol) für stilles Brainstorming: Wer das Whiteboard bearbeiten darf, startet ihn für das ganze Whiteboard oder nur für einen **Rahmen**. Solange er läuft, sieht jede Person nur ihre eigenen neuen Zettel und Elemente in diesem Bereich (gestrichelt markiert, „nur für dich“); von den anderen erscheint nur die **Anzahl** als verdeckte Platzhalter – ohne Text und ohne Namen. **Aufdecken** zeigt alle Beiträge gleichzeitig allen und beendet den Modus; das kann jede Person mit Bearbeitungsrecht, auch wenn die Moderation den Raum verlassen hat. Private Inhalte bleiben auf dem Server getrennt gespeichert und erreichen bis zum Aufdecken weder die Browser der anderen noch Suche, Exporte, Vorschauen, API oder KI-Funktionen. Neu laden, ein zweiter Tab oder später Dazukommende sind kein Problem; Änderungen ohne Verbindung werden nachgereicht.
- **Schätzen (Planning Poker)**: Zettel oder Datensatzkarten auswählen – oder einen Rahmen, dann alle darin – und **Schätzen** wählen. Als Kartensatz gibt es Fibonacci (1, 2, 3, 5, 8, 13, 21, ?, ☕), T-Shirt-Größen (XS–XL) oder eigene Werte. Alle wählen verdeckt eine Karte; zu sehen ist nur, wer schon geschätzt hat. **Karten aufdecken** zeigt die Verteilung, Durchschnitt, Median und ob es einen **Konsens** gibt. **Ergebnis übernehmen** schreibt den Wert als Etikett an den Zettel – bei Datensatzkarten in eine Zahl-, Auswahl- oder Text-Eigenschaft des Eintrags (mit den üblichen Rechten). Danach **Nächstes Element** oder **Neu schätzen**.
- **Alle zu mir holen**: Alle anderen springen einmal zu deinem aktuellen Ausschnitt – anders als bei „Folge mir“ bewegen sie sich danach wieder frei. Mit einem ausgewählten Rahmen holt das Magnet-Symbol alle **zu diesem Rahmen**. Die anderen sehen einen Hinweis („Mara hat alle hierher geholt“) und kommen mit **Zurück** an ihre vorige Stelle.

## Zettel als Datenbankeinträge

Aus einem Brainstorming wird ein Backlog: Zettel auswählen → in der Leiste **Als Einträge in Datenbank …** (Datenbank-Symbol). Ohne Auswahl nimmt der Dialog die Zettel im sichtbaren Bereich, mit einem ausgewählten Rahmen dessen Zettel. Das funktioniert auch ganz ohne KI.

::: steps

1. **Ziel-Datenbank** wählen – angeboten werden Datenbanken, in die du Einträge schreiben darfst.
2. **Zuordnung:** Die erste Zeile des Zettels wird zum **Titel**, weitere Zeilen zum Inhalt des Eintrags. Optional wird die **Farbe** zu einer Auswahl-Eigenschaft (für jede Zettelfarbe eine Option; gleichnamige Optionen wie „Gelb“ oder „Rot“ sind vorbelegt) und der **Autor** des Zettels zu einer Personen-Eigenschaft.
3. **Durch Karten ersetzen** tauscht die Zettel gegen Eintragskarten an derselben Stelle – Verbindungslinien hängen danach an der Karte. **Behalten und verknüpfen** lässt die Zettel stehen und legt die Karten daneben, mit einer gestrichelten Linie verbunden.

:::

Die Karten sind live: Ändert jemand den Eintrag in der Datenbank, zeigt das Board es sofort. Andere sehen die neuen Karten wie jede Änderung; ein ++⌘ Z++ nimmt die Änderung am Board in einem Schritt zurück (die Einträge bleiben in der Datenbank).

- Höchstens 500 Zettel auf einmal; der Server legt sie in Paketen zu 100 an, ein Fortschritt zeigt den Stand, **Abbrechen** hält an – was schon angelegt ist, kommt aufs Board.
- Ein zweiter Versuch nach einem Fehler legt nichts doppelt an.
- Werte werden geprüft wie jede Bearbeitung: gesperrte Eigenschaften, vorhandene Optionen, nur Mitglieder als Personen.
- **Mit KI aufteilen** (wenn KI für dich verfügbar ist): Die KI liest den Text der Zettel und füllt weitere Eigenschaften – etwa Verantwortlich, Fälligkeit oder Priorität. Erst eine **Vorschau** zeigt die Werte je Zettel, Unpassendes steht mit Grund daneben; angelegt wird erst danach.
- Über die [API](/api-and-webhooks) heißt der Befehl `whiteboard.toRecords`.

## KI auf dem Whiteboard

Ist [KI](/ai) für dich eingeschaltet, öffnet **KI** unter **+** (am Handy unter **Weitere Werkzeuge**) diese Funktionen. Ohne KI fehlt der Knopf, alles andere funktioniert wie gewohnt; auf Boards, die die KI nicht lesen darf, sind die Einträge ausgegraut mit dem Grund.

- **Nach Thema gruppieren (KI)** – auch im Menü **Anordnen**, sobald zwei Zettel ausgewählt sind: Die KI findet Themen in den ausgewählten Zetteln (ohne Auswahl: im sichtbaren Bereich) und ordnet sie in beschrifteten Spalten an, wie **Nach Farbe gruppieren**. Zettel ohne Text und solche, die nirgends passen, landen unter „Sonstiges“.
- **Zusammenfassen als Seite** – liest das Board (oder die Auswahl bzw. den ausgewählten Rahmen) und legt daneben eine Seite an: Zusammenfassung, Themen, **Entscheidungen**, **Offene Fragen** und **Aufgaben**, mit einem Link zurück zum Board. Mit **Aufgaben übernehmen** werden die Aufgaben echte Aufgaben mit Person und Termin, wenn das Board sie nennt – sie erscheinen in **Meine Aufgaben**. Rahmen werden zu Abschnitten; große Boards liest die KI in Teilen, und die Seite nennt, was über die Grenze von 2.000 Elementen hinaus weggelassen wurde.
- **Mit KI erzeugen …** – eine **Mindmap** oder ein **Flussdiagramm** aus einer Beschreibung, etwa „Ablauf einer Urlaubsanfrage mit Genehmigung“. Es entsteht in der Mitte des sichtbaren Bereichs (oder rechts daneben, wenn dort schon etwas liegt) aus normalen Formen und Verbindungslinien; die Mindmap nutzt das Layout von **Mindmap anordnen**. Höchstens 60 bzw. 40 Knoten.

Jede Aktion zeigt ihren Fortschritt und lässt sich **abbrechen**; ein Fehler steht mit **Erneut versuchen** im Dialog. Das Ergebnis ist eine gewöhnliche Änderung am Board: Alle sehen sie live, und **ein** ++⌘ Z++ nimmt sie ganz zurück. Verdeckte Zettel bleiben vor der KI verborgen, verknüpfte Seiten und Einträge liest sie nur, wenn sie sie lesen darf.

## Rahmen-Übersicht

**Rahmenübersicht** (im Menü **…** der Leiste unten, **Ansicht und Aktionen**) listet alle Rahmen mit kleiner Vorschau – auf dem Handy als Blatt von unten.

- Ein Klick auf die Vorschau fährt zum Rahmen; der Name lässt sich direkt umbenennen.
- **Ziehen** am Griff (oder <kbd>⌥</kbd> + Pfeiltasten) ändert die Reihenfolge – sie ist die Reihenfolge der Präsentation und wird mit dem Board gespeichert. Solange niemand sortiert, gilt die Leserichtung (von oben nach unten, links nach rechts).
- **In der Präsentation ausblenden** (Augensymbol) lässt einen Rahmen beim Präsentieren aus, ohne ihn zu löschen.
- **Sprechernotizen** je Rahmen, sichtbar nur in der Präsentation.
- Außerdem: **Link zu diesem Element kopieren**, **Rahmen exportieren** und **Ab hier präsentieren**.

## Präsentieren

Sobald es Rahmen gibt, erscheint **Präsentieren** in der Leiste unten links; die Pfeile daneben fahren auch ohne Präsentation zum vorigen bzw. nächsten Rahmen. Die Rahmen werden in der Reihenfolge der Rahmen-Übersicht nacheinander bildschirmfüllend gezeigt, ausgeblendete Rahmen fehlen; alles außerhalb des aktuellen Rahmens tritt zurück. Pfeiltasten oder die Knöpfe blättern, **Präsentation beenden** oder <kbd>Esc</kbd> schließt.

- **Sprechernotizen** blendet die Notizen des Rahmens ein.
- **Referentenansicht** öffnet dieselbe zweite Ansicht wie bei [Dokumenten](/reading-and-presenting#sprechernotizen-und-referentenansicht): aktuelle und nächste Folie, die Notizen und die verstrichene Zeit. Beide Fenster bleiben im Gleichschritt – Blättern geht in jedem von beiden.

## Vorlagen

**Vorlagen** öffnet eine durchsuchbare Galerie mit Vorschau, nach Kategorien sortiert:

| Kategorie | Vorlagen |
| --- | --- |
| Retrospektiven | Retrospektive, 4L-Retrospektive, Seestern-Retrospektive |
| Planung | Kanban, User Story Map, Sprint-Planung, Projektzeitplan, Eisenhower-Matrix, Aufwand-Nutzen-Matrix |
| Strategie | OKR, SWOT-Analyse, Lean Canvas, Business Model Canvas, Customer Journey |
| Ideen | Empathy Map, Brainstorming, Mindmap |
| Diagramme | Flussdiagramm, Entscheidungsbaum, Organigramm |
| Besprechungen | Besprechungsagenda, Eisbrecher |

Eine Vorlage landet in der Mitte der Ansicht und ist danach normaler Inhalt des Boards.

**Eigene Vorlagen**: Unter **Als Vorlage speichern** wird das ganze Board oder die Auswahl zur Vorlage – **Für den Arbeitsbereich** oder **Nur für mich**. Kommentare, Stimmen und Stempel bleiben draußen, Bilder und PDFs bleiben Dateien des Arbeitsbereichs. Eigene Vorlagen stehen im Reiter **Eigene Vorlagen**; löschen können sie die Person, die sie gespeichert hat, und Besitzer. Höchstens 500 Vorlagen je Arbeitsbereich.

Mehr Whiteboard-Vorlagen aus der Community findest du im [Flowplan Marketplace](https://marketplace.flowplan.org).
