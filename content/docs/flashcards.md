---
keywords: Lernkarten, Karteikarten, Vokabeln, Lernen, Wiederholung in Abständen, Spaced Repetition, FSRS, Anki, Stapel
---

# Lernkarten

Jede Datenbank kann ein Kartenstapel werden: Ein Eintrag ist eine Karte, die Ansicht **Lernen** fragt dich ab. Flowplan plant mit dem Verfahren FSRS, wann du eine Karte wiedersiehst – kurz bevor du sie vergessen würdest. Jede Person hat ihren eigenen Lernstand; zum Lernen reicht Leserecht.

## Einen Stapel anlegen {since=0.9.9}

Drei Wege führen zu einem Stapel:

- **Neue Seite → Datenbank → Lernkarten**: Die Datenbank bringt die Eigenschaften **Vorderseite** (der Titel), **Rückseite** und **Tags** mit, dazu die Ansichten **Lernen** und **Alle Karten**. Die Karten sind schon eingerichtet.
- **Vorlage „Lernkarten-Datenbank“** (Kategorie Wissen): wie oben, mit einer Eigenschaft **Beispiel** und sechs Beispielkarten zum Ausprobieren.
- **Eine vorhandene Datenbank**: Über **Ansicht hinzufügen → Lernen** bekommt sie eine Lernen-Ansicht. Ist noch nichts eingerichtet, öffnet sich gleich **Karten einrichten**.

## Karten einrichten

**Karten einrichten** legt fest, was auf eine Karte kommt. Das gilt für die ganze Datenbank, nicht nur für eine Ansicht – so lernen zwei Lernen-Ansichten derselben Datenbank dieselben Karten mit demselben Lernstand.

| Einstellung | Bedeutung |
| --- | --- |
| Vorderseite | eine Eigenschaft (meist der Titel) oder das Dokument des Eintrags oberhalb einer Linie |
| Rückseite | eine Eigenschaft, das ganze Dokument des Eintrags oder das Dokument unterhalb einer Linie |
| Hinweis | eine Eigenschaft, die du vor dem Aufdecken auf Wunsch einblendest |
| Zusatz | eine Eigenschaft, die nach dem Aufdecken unter der Antwort steht |
| Auch umgekehrt lernen | eine zweite Karte je Eintrag: Rückseite → Vorderseite |
| Neue Karten pro Tag | Vorgabe 20 |
| Wiederholungen pro Tag | Vorgabe 200 |
| Behaltensrate | Vorgabe 90 % |

Als Seiten eignen sich Text, Zahl, Auswahl, Mehrfachauswahl, URL, E-Mail und Telefon. Vorder- und Rückseite brauchen verschiedene Inhalte. Ein Eintrag wird nur zur Karte, wenn beide Seiten etwas enthalten.

Einrichten darf, wer die Datenbank bearbeiten darf. Änderst du die Zuordnung später, bleibt der Lernstand aller erhalten – die Karten behalten ihre Schlüssel.

### Inhalte aus dem Dokument

Für Bilder, Formeln, Code oder längere Antworten nimmst du das Dokument des Eintrags. Die einfachste Form: **Titel als Vorderseite, Dokument als Rückseite**. Brauchst du auch auf der Vorderseite mehr als einen Satz, teile das Dokument mit einer horizontalen Linie – `---` tippen, wie beim [Präsentieren](/reading-and-presenting). Alles über der ersten Linie ist die Frage, alles darunter die Antwort. Ohne Linie ist das ganze Dokument die Antwort.

## Teilstapel über Filter

Eine Lernen-Ansicht lernt die Karten, die zu ihren [Filtern](/views) passen. Mit dem Filter **Tags enthält „Kapitel 3“** wird sie ein Teilstapel. Teilstapel teilen sich die Tagesgrenzen des Stapels. In den Einstellungen der Ansicht wählst du außerdem, ob neue Karten zwischen, vor oder nach den Wiederholungen kommen und ob in der Reihenfolge des Hinzufügens oder zufällig.

## Die Übersicht

Die Lernen-Ansicht zeigt, was heute noch zu tun ist: **neu**, **in Lernschritten** und **fällig**, jeweils schon innerhalb deiner Tagesgrenzen. Darunter stehen die Zahl der Karten, deine Grenzen und die Behaltensrate.

- **Lernen starten** öffnet den Fokusmodus.
- **Heute mehr lernen** gibt dir für heute **+10 neue Karten** oder **+50 Wiederholungen** – am nächsten Lerntag gilt wieder die normale Grenze.
- **Meine Einstellungen**: eigene Grenzen und eine eigene Behaltensrate für diesen Stapel. Ein leeres Feld übernimmt die Vorgabe des Stapels. Das ändert nichts für andere.

## Lernen im Fokusmodus

Der Fokusmodus füllt den Bildschirm mit einer Karte. Oben stehen die Zähler (neu · Lernen · fällig), rechts **Rückgängig**.

1. Lies die Vorderseite und erinnere dich an die Antwort.
2. Decke auf: <kbd>Leertaste</kbd>, <kbd>Enter</kbd>, ein Tipp auf die Karte oder **Antwort zeigen**.
3. Bewerte dich ehrlich. Unter jedem Knopf steht, wann die Karte wiederkommt.

| Wertung | Taste | Wischen | Bedeutung |
| --- | --- | --- | --- |
| Nochmal | <kbd>1</kbd> | nach links | nicht gewusst – kommt in wenigen Minuten wieder |
| Schwer | <kbd>2</kbd> | nach unten | mit Mühe gewusst |
| Gut | <kbd>3</kbd>, <kbd>Leertaste</kbd> | nach rechts | gewusst |
| Leicht | <kbd>4</kbd> | nach oben | sofort gewusst – der Abstand wächst stärker |

- <kbd>Z</kbd> (oder ++⌘/Strg Z++) macht die letzte Wertung rückgängig; die Karte kommt unbewertet zurück. Das geht für die letzten Wertungen der Sitzung, höchstens 24 Stunden zurück.
- <kbd>H</kbd> zeigt den Hinweis, <kbd>Esc</kbd> beendet die Sitzung.
- **Wischen** auf Telefon und Tablet geht erst nach dem Aufdecken. Eine Geste, die am Bildschirmrand (24 Pixel) beginnt, gehört dem System oder der App – etwa „Zurück“ – und bewegt die Karte nicht. Die Knöpfe sind immer da.
- Am Ende zeigt eine Zusammenfassung, wie viele Karten du in wie vielen Minuten gelernt hast, wie oft „Nochmal“ und wie viele morgen fällig sind.

Der Fokusmodus ist vollständig mit Tastatur und Screenreader bedienbar: Die Antwort wird nach dem Aufdecken vorgelesen, jeder Knopf nennt Wertung und nächsten Termin. Wer in den Einstellungen weniger Bewegung wählt oder sie im System reduziert, sieht keine Animationen.

## Wie Flowplan plant

Flowplan nutzt **FSRS-6**, das Verfahren, das auch Anki anbietet. Es schätzt für jede Karte, wie stabil sie in deinem Gedächtnis ist, und legt die nächste Wiederholung so, dass du sie mit der gewählten Behaltensrate (90 %) noch weißt. Eine höhere Rate heißt öfter wiederholen und seltener vergessen.

- **Neu**: noch nie gelernt. Neue Karten zählen erst gegen die Tagesgrenze, wenn du sie zum ersten Mal bewertest.
- **Lernschritte**: Eine neue Karte kommt nach 1 und 10 Minuten wieder, eine vergessene nach 10 Minuten. Lernschritte zählen nicht gegen die Grenzen.
- **Wiederholung**: Danach kommt die Karte nach Tagen, Wochen oder Monaten. Damit nicht alle Karten eines Tages am selben Tag wiederkommen, streut Flowplan die Abstände leicht.
- **Geschwister**: Lernst du eine Karte eines Eintrags, wartet seine umgekehrte Karte bis zum nächsten Lerntag.
- **Der Lerntag beginnt um 04:00** in deiner Zeitzone – wer nach Mitternacht lernt, lernt noch für den Vortag. Die Zeitzone nimmt Flowplan von deinem Gerät.

## Wer was sieht

- **Lernen** darf jede Person, die die Datenbank lesen darf – Mitglieder, Gäste einer [freigegebenen Seite](/sharing) und Leserinnen und Leser. Der Lernstand gehört nur dir: Niemand sonst sieht ihn, auch keine Eigentümer des Arbeitsbereichs und keine Administration.
- **Einrichten und Karten bearbeiten** braucht Schreibrecht. Eine Wertung ist keine Bearbeitung: Sie erscheint nicht in der Aktivität der Seite.
- Private Einträge anderer und [verborgene Eigenschaften](/database-properties) werden nie zu Karten. Ist eine Kartenseite für dich verborgen, gibt es für dich keine Karten.
- Ein Eintrag im Papierkorb verschwindet aus dem Stapel; stellst du ihn wieder her, ist der Lernstand wieder da. Verlässt du den Arbeitsbereich, wird dein Lernstand dort gelöscht. Beim Löschen des Kontos geht alles.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es keine Lernkarten.

## API und MCP

Über die [API](/api-and-webhooks) lernst du auch aus eigenen Programmen: `study.queue` (oder `GET /api/pages/{id}/study`) liefert die nächsten Karten mit Zählern, `study.review` bewertet, `study.undo` macht rückgängig, `study.prefs` setzt eigene Grenzen, `study.settings` richtet die Karten ein. Tokens mit Nur-Lesen-Recht können Karten und Zähler lesen, aber nicht bewerten. Der [MCP-Server](/mcp) hat das Werkzeug `study_decks`: deine Stapel eines Arbeitsbereichs mit dem, was heute fällig ist. Alle Formen stehen in der [OpenAPI-Beschreibung](/openapi).
