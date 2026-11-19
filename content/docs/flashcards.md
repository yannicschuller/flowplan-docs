---
keywords: Lernkarten, Karteikarten, Vokabeln, Lernen, Wiederholung in Abständen, Spaced Repetition, FSRS, Anki, Stapel, Lückentext, Cloze, Multiple Choice, Quizlet, CSV, Statistik
---

# Lernkarten

Jede Datenbank kann ein Kartenstapel werden: Ein Eintrag ist eine Karte, die Ansicht **Lernen** fragt dich ab. Flowplan plant mit dem Verfahren FSRS, wann du eine Karte wiedersiehst – kurz bevor du sie vergessen würdest. Jede Person hat ihren eigenen Lernstand; zum Lernen reicht Leserecht.

## Einen Stapel anlegen {since=0.10.0}

Mehrere Wege führen zu einem Stapel:

- **Neue Seite → Datenbank → Lernkarten**: Die Datenbank bringt die Eigenschaften **Vorderseite** (der Titel), **Rückseite**, **Tags** und {since=0.10.0} **Kartentyp** mit, dazu die Ansichten **Lernen** und **Alle Karten**. Die Karten sind schon eingerichtet.
- **Vorlage „Lernkarten-Datenbank“** (Kategorie Wissen): wie oben, mit den Eigenschaften **Beispiel** und **Falsche Antworten** und {since=0.10.0} einer Beispielkarte je Kartentyp. Mehr Stapel: [Vorlagen](/templates#lernkarten-als-vorlage).
- {since=0.10.0} **Karten importieren** in der Lernen-Ansicht holt Karten aus CSV, Quizlet und anderem Text ([Lernkarten importieren](/flashcards-import)), **Aus Anki importieren** auf der Seite [Lernen](#alle-stapel-lernen) ganze Anki-Stapel ([Aus Anki importieren](/flashcards-import#aus-anki-importieren)).
- {since=0.10.0} **Mit KI erstellen** schlägt Karten aus einer Seite, einer Auswahl oder einem PDF vor ([Lernkarten mit KI](/flashcards-ai)).
- **Eine vorhandene Datenbank**: Über **Ansicht hinzufügen → Lernen** bekommt sie eine Lernen-Ansicht. Ist noch nichts eingerichtet, öffnet sich gleich **Karten einrichten**.

## Karten einrichten

**Karten einrichten** legt fest, was auf eine Karte kommt. Das gilt für die ganze Datenbank, nicht nur für eine Ansicht – so lernen zwei Lernen-Ansichten derselben Datenbank dieselben Karten mit demselben Lernstand.

| Einstellung | Bedeutung |
| --- | --- |
| Vorderseite | eine Eigenschaft (meist der Titel) oder das Dokument des Eintrags oberhalb einer Linie |
| Rückseite | eine Eigenschaft, das ganze Dokument des Eintrags oder das Dokument unterhalb einer Linie |
| Hinweis | eine Eigenschaft, die du vor dem Aufdecken auf Wunsch einblendest |
| Zusatz | eine Eigenschaft, die nach dem Aufdecken unter der Antwort steht |
| Kartentyp {since=0.10.0} | für alle Einträge gleich oder aus einer Auswahl-Eigenschaft ([Kartentypen](#kartentypen)) |
| Antwortoptionen {since=0.10.0} | für Multiple Choice: eine Eigenschaft mit den falschen Antworten; ohne sie nimmt Flowplan die Rückseiten anderer Karten |
| Tags {since=0.10.0} | eine Auswahl- oder Mehrfachauswahl-Eigenschaft; erzeugte Antwortoptionen kommen bevorzugt aus Karten mit denselben Tags |
| Unterstapel {since=0.10.2} | eine Auswahl-Eigenschaft, deren Werte Unterstapel sind; jeder kann [eigene Parameter](/flashcards-optimize#teile-eines-stapels) bekommen |
| Antwort eintippen: ignorieren {since=0.10.0} | was der Vergleich übergeht: Groß- und Kleinschreibung (an), Akzente (aus), Satzzeichen (an) |
| Auch umgekehrt lernen | eine zweite Karte je Eintrag: Rückseite → Vorderseite |
| Neue Karten pro Tag | Vorgabe 20 |
| Wiederholungen pro Tag | Vorgabe 200 |
| Behaltensrate | Vorgabe 90 % |

Als Seiten eignen sich Text, Zahl, Auswahl, Mehrfachauswahl, URL, E-Mail und Telefon. Vorder- und Rückseite brauchen verschiedene Inhalte. Ein Eintrag wird nur zur Karte, wenn beide Seiten etwas enthalten.

Einrichten darf, wer die Datenbank bearbeiten darf. Änderst du die Zuordnung später, bleibt der Lernstand aller erhalten – die Karten behalten ihre Schlüssel.

### Inhalte aus dem Dokument

Für Bilder, Formeln, Code oder längere Antworten nimmst du das Dokument des Eintrags. Die einfachste Form: **Titel als Vorderseite, Dokument als Rückseite**. Brauchst du auch auf der Vorderseite mehr als einen Satz, teile das Dokument mit einer horizontalen Linie – `---` tippen, wie beim [Präsentieren](/reading-and-presenting). Alles über der ersten Linie ist die Frage, alles darunter die Antwort. Ohne Linie ist das ganze Dokument die Antwort.

## Kartentypen {since=0.10.0}

| Kartentyp | So fragt Flowplan | Karten je Eintrag |
| --- | --- | --- |
| Vorder-/Rückseite | Vorderseite zeigen, Antwort aufdecken, selbst bewerten | 1, umgekehrt 2 |
| Lückentext | den Text mit einer verdeckten Lücke zeigen | eine je Lückennummer |
| Antwort eintippen | die Antwort in ein Feld tippen, Flowplan vergleicht | 1, umgekehrt 2 |
| Multiple Choice | drei bis fünf Antworten zur Wahl | 1 |
| Bildverdeckung | ein Bild mit verdeckten Bereichen ([Bildverdeckung](/flashcards-occlusion)) | eine je Maske oder Gruppe |

Unter **Kartentyp** in **Karten einrichten** gilt ein Typ für alle Einträge, oder er kommt aus einer Auswahl-Eigenschaft: Optionen mit den Namen „Lückentext“, „Antwort eintippen“, „Multiple Choice“ oder „Bildverdeckung“ (auch englisch) erkennt Flowplan von selbst, andere ordnest du im Dialog einem Typ zu; leer heißt Vorder-/Rückseite. Wechselst du zwischen Vorder-/Rückseite und Antwort eintippen, bleibt der Lernstand.

Wie du Lücken schreibst und wie Flowplan getippte Antworten vergleicht oder Antworten zur Wahl stellt, steht unter [Kartentypen](/flashcards-card-types).

## Teilstapel über Filter

Eine Lernen-Ansicht lernt die Karten, die zu ihren [Filtern](/views) passen. Mit dem Filter **Tags enthält „Kapitel 3“** wird sie ein Teilstapel. Teilstapel teilen sich die Tagesgrenzen des Stapels. In den Einstellungen der Ansicht wählst du außerdem, ob neue Karten zwischen, vor oder nach den Wiederholungen kommen und ob in der Reihenfolge des Hinzufügens oder zufällig.

## Die Übersicht

Die Lernen-Ansicht zeigt, was heute noch zu tun ist: **neu**, **in der Lernphase** und **fällig**, jeweils schon innerhalb deiner Tagesgrenzen. Darunter stehen die Zahl der Karten, deine Grenzen und die Behaltensrate.

{since=0.10.2} Sortieren und Suchen gibt es in einer Lernen-Ansicht nicht – die Reihenfolge plant FSRS. Der Filter bleibt; auf dem Telefon steht er als Symbol in einer Zeile mit den übrigen Knöpfen, darunter gleich **Lernen starten**.

- **Lernen starten** öffnet den Fokusmodus.
- **Heute mehr lernen** gibt dir für heute **+10 neue Karten** oder **+50 Wiederholungen** – am nächsten Lerntag gilt wieder die normale Grenze.
- **Meine Einstellungen**: eigene Grenzen und eine eigene Behaltensrate für diesen Stapel. Ein leeres Feld übernimmt die Vorgabe des Stapels. Das ändert nichts für andere.
- {since=0.10.0} **Statistik** klappt die [Statistik](#statistik) des Stapels auf, **Karten importieren** öffnet den [Import](/flashcards-import), **Mit KI erstellen** die [KI-Vorschläge](/flashcards-ai), **Exportieren** lädt die Karten als CSV oder Anki-Paket.

## Lernen im Fokusmodus

Der Fokusmodus füllt den Bildschirm mit einer Karte. {since=0.10.2} Oben stehen die Zähler als drei farbige Zahlen – **Neu** · **In der Lernphase** · **Fällig** –, die Art der Karte, die du gerade siehst, ist unterstrichen. Auf dem Telefon zeigt ein Tipp auf die Zahlen ihre Namen. Darunter steht der Fortschritt als Leiste mit „1 / 20“, rechts oben **Rückgängig**.

1. Lies die Vorderseite und erinnere dich an die Antwort.
2. Decke auf: <kbd>Leertaste</kbd>, <kbd>Enter</kbd>, ein Tipp auf die Karte oder **Antwort zeigen**.
3. Bewerte dich ehrlich. Unter jedem Knopf steht, wann die Karte wiederkommt, etwa „10 Min“ oder „10 Tage“.

| Wertung | Taste | Wischen | Bedeutung |
| --- | --- | --- | --- |
| Nochmal | <kbd>1</kbd> | nach links | nicht gewusst – kommt in wenigen Minuten wieder |
| Schwer | <kbd>2</kbd> | nach unten | mit Mühe gewusst |
| Gut | <kbd>3</kbd>, <kbd>Leertaste</kbd> | nach rechts | gewusst |
| Leicht | <kbd>4</kbd> | nach oben | sofort gewusst – der Abstand wächst stärker |

- <kbd>Z</kbd> (oder ++⌘/Strg Z++) macht die letzte Wertung rückgängig; die Karte kommt unbewertet zurück. Das geht für die letzten Wertungen der Sitzung, höchstens 24 Stunden zurück.
- <kbd>H</kbd> zeigt den Hinweis, <kbd>Esc</kbd> beendet die Sitzung.
- **Wischen** auf Telefon und Tablet geht erst nach dem Aufdecken. Eine Geste, die am Bildschirmrand (24 Pixel) beginnt, gehört dem System oder der App – etwa „Zurück“ – und bewegt die Karte nicht. Die Knöpfe sind immer da.
- {since=0.10.2} Beim Wischen färbt sich die Karte in der Farbe der Wertung und zeigt sie groß in der Mitte. Auf Touch-Geräten erinnert eine Zeile über den Knöpfen an die Richtungen: „← Nochmal · ↑ Leicht · ↓ Schwer · Gut →“.
- {since=0.10.2} Am Ende zeigt eine Zusammenfassung, wie viele Karten du gelernt hast (jede Karte einmal gezählt, dazu wie viele davon neu waren), die Lernzeit, den Anteil „gewusst“ (Gut oder Leicht) und deine Serie. Darunter verteilen sich deine Wertungen auf Nochmal, Schwer, Gut und Leicht, und es steht da, wie viele Karten morgen fällig sind.
- {since=0.10.0} Sind nur noch Karten in der Lernphase übrig, die erst später wiederkommen, zeigt die Sitzung **Nächste Karte in 25 Min** und lädt sie zur Zeit von selbst. **Früher zeigen** (oder <kbd>Leertaste</kbd>) holt sie sofort.

Der Fokusmodus ist vollständig mit Tastatur und Screenreader bedienbar: Die Antwort wird nach dem Aufdecken vorgelesen, jeder Knopf nennt Wertung und nächsten Termin. {since=0.10.2} Beim Aufdecken klappt die Antwort kurz unter der Frage auf; die Frage bleibt an ihrem Platz. Wer in den Einstellungen weniger Bewegung wählt oder sie im System reduziert, sieht keine Animationen.

## Wie Flowplan plant

Flowplan nutzt **FSRS-6**, das Verfahren, das auch Anki anbietet. Es schätzt für jede Karte, wie stabil sie in deinem Gedächtnis ist, und legt die nächste Wiederholung so, dass du sie mit der gewählten Behaltensrate (90 %) noch weißt. Eine höhere Rate heißt öfter wiederholen und seltener vergessen. [Optimieren](/flashcards-optimize) passt FSRS an dich an.

- **Neu**: noch nie gelernt. Neue Karten zählen erst gegen die Tagesgrenze, wenn du sie zum ersten Mal bewertest.
- **Lernschritte**: Eine neue Karte kommt nach 1 und 10 Minuten wieder, eine vergessene nach 10 Minuten. Lernschritte zählen nicht gegen die Grenzen.
- **Wiederholung**: Danach kommt die Karte nach Tagen, Wochen oder Monaten. Damit nicht alle Karten eines Tages am selben Tag wiederkommen, streut Flowplan die Abstände leicht.
- **Geschwister**: Lernst du eine Karte eines Eintrags, wartet seine umgekehrte Karte bis zum nächsten Lerntag.
- **Der Lerntag beginnt um 04:00** in deiner Zeitzone – wer nach Mitternacht lernt, lernt noch für den Vortag. Die Zeitzone nimmt Flowplan von deinem Gerät.

## Alle Stapel: Lernen {since=0.10.0}

**Lernen** unten in der Seitenleiste (oder „Lernen: fällige Karten“ in der Schnellsuche, eine eigene Tastenkombination in den [Tastenkürzeln](/keyboard-shortcuts)) zeigt alle Stapel des Arbeitsbereichs mit dem, was heute noch übrig ist: neu, in der Lernphase, fällig – innerhalb deiner Tagesgrenzen. {since=0.10.2} Oben steht **Heute dran: … Karten** – alle drei zusammen; **fällig** meint nur die Wiederholungen. **Lernen** neben einem Stapel startet ihn, **Alle Stapel lernen** lernt die Stapel nacheinander, jeden mit seinen Grenzen; am Ende eines Stapels geht es mit **Weiter mit …** zum nächsten. Darunter steht die Statistik aller Stapel und oben deine Serie.

Die Zahlen gelten für den ganzen Stapel. Eine Lernen-Ansicht mit Filtern lernt davon nur einen Teil, und Geschwister einer schon gelernten Karte warten bis morgen – eine Sitzung kann deshalb etwas weniger Karten zeigen.

Auf der [Startseite](/first-steps#startseite-anpassen) zeigt das Widget **Fällige Karten** dasselbe: wie viele Karten heute fällig sind, die Stapel mit neuen und fälligen Karten, deine Serie und **Lernen**. In den Einstellungen des Widgets wählst du alle Stapel oder bestimmte.

{since=0.10.0} Die [Schnellsuche](/search-and-notifications#befehle) bietet jeden Stapel mit Karten für heute als Befehl an, etwa **Lernen: Spanisch A1**.

## Erinnerung, App und offline {since=0.10.0}

Lernerinnerung, Widget **Karten fällig**, Lernen ohne Verbindung sowie API und MCP: [Lernkarten: Erinnerung, App, offline und API](/flashcards-app).

## Statistik {since=0.10.0}

Die Statistik zeigt nur deine eigenen Zahlen – für einen Stapel (**Statistik** in der Lernen-Ansicht) oder für alle (unter **Lernen**):

| Kennzahl | Bedeutung |
| --- | --- |
| Heute | Wertungen, neue Karten, Minuten und Anteil richtig |
| Serie | Lerntage in Folge bis heute; lernst du heute noch nicht, zählt die Serie bis gestern weiter |
| Wertungen pro Tag | ein Jahr als Kästchen, je dunkler, desto mehr; als Tabelle pro Monat |
| Fällig in den nächsten 30 Tagen | Karten je Lerntag; überfällige zählen heute |
| Wahre Behaltensrate | Anteil der Wiederholungen, die du nicht mit „Nochmal“ bewertet hast, über 7, 30 und 365 Tage – neben deiner Zielrate. {since=0.10.2} Mit weniger als 20 Wiederholungen in 30 Tagen zeigt die Kachel statt einer Zahl **Noch zu wenige Wiederholungen** |
| Karten nach Zustand | neu, in der Lernphase, jung (unter 21 Tagen im Gedächtnis, also Stabilität unter 21 Tagen), reif (ab 21 Tagen), ausgesetzt |

Tage sind Lerntage (Beginn 04:00). Zu jedem Diagramm gibt es eine Tabelle für Screenreader.

## Im Journal {since=0.10.0}

Unter jedem Journaltag steht bei [An diesem Tag erledigt](/journal#an-diesem-tag-erledigt) eine Zeile je Stapel, in dem du an diesem Tag gelernt hast, etwa **32 Karten gelernt** in Spanisch A1 – mit Uhrzeit der letzten Wertung und Link zum Stapel. Das Journal zählt nach dem **Kalendertag** in deiner Zeitzone wie alle seine Einträge, nicht nach dem Lerntag: Wer um 01:30 lernt, findet die Zeile am neuen Tag, die Statistik zählt die Karten noch zum Vortag. Die Zeile gehört immer dir – auch bei **Alle** sieht niemand, was andere gelernt haben. Ein Tag, an dem du nur gelernt hast, ist nicht leer und bleibt.

## Importieren und exportieren {since=0.10.0}

CSV, TSV, Quizlet und Anki hinein, CSV und Anki-Pakete hinaus: [Lernkarten importieren und exportieren](/flashcards-import).

## Teilen und veröffentlichen {since=0.10.0}

Geteilt oder veröffentlicht lässt sich ein Stapel ohne Konto durchblättern und üben: [Lernkarten über einen Link](/sharing#lernkarten-ueber-einen-link).

{since=0.10.2} Im [Marketplace](/marketplace#lernkarten-stapel) teilst du einen Stapel als Vorlage – mit Karten, Bildern und Masken, ohne Lernstände und ohne Angaben zu Personen. Die Seite der Vorlage zeigt ein paar Beispielkarten; wer den Stapel übernimmt, beginnt mit neuen Karten.

## Wer was sieht

- **Lernen** darf jede Person, die die Datenbank lesen darf – Mitglieder, Gäste einer [freigegebenen Seite](/sharing) und Leserinnen und Leser. Der Lernstand gehört nur dir: Niemand sonst sieht ihn, auch keine Eigentümer des Arbeitsbereichs und keine Administration.
- **Einrichten und Karten bearbeiten** braucht Schreibrecht. Eine Wertung ist keine Bearbeitung: Sie erscheint nicht in der Aktivität der Seite.
- Private Einträge anderer und [verborgene Eigenschaften](/database-properties) werden nie zu Karten. Ist eine Kartenseite für dich verborgen, gibt es für dich keine Karten.
- Ein Eintrag im Papierkorb verschwindet aus dem Stapel; stellst du ihn wieder her, ist der Lernstand wieder da. Verlässt du den Arbeitsbereich, wird dein Lernstand dort gelöscht. Beim Löschen des Kontos geht alles.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es keine Lernkarten.
