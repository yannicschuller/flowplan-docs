---
keywords: Lernkarten, FSRS, Parameter optimieren, Optimierung, Gewichte, Gedächtnismodell, Behaltensrate empfehlen, optimale Behaltensrate, CMRR, Log-Loss, RMSE, Anki, Unterstapel, Kartentyp, Arbeitsaufwand, Zeitbudget, fsrs-rs
---

# Lernkarten: Parameter optimieren

FSRS plant mit 21 Parametern, die zu den meisten Menschen passen. Hast du genug gelernt, passt Flowplan sie an dein eigenes Gedächtnis an – und schlägt dir eine Behaltensrate vor. Das ist freiwillig; die Standardparameter funktionieren gut.

## Parameter optimieren {since=0.10.0}

In einem Stapel öffnest du **Meine Einstellungen**; unter **Gedächtnismodell (FSRS)** steht, welche Parameter der Stapel für dich nutzt. **Parameter optimieren …** öffnet den Dialog.

1. Wähle, aus welchen Wertungen gelernt wird: **Dieser Stapel** oder **Alle meine Stapel** – {since=0.11.0} oder **Teil des Stapels** (siehe unten). Es zählen nur deine eigenen Wertungen – auch importierte und offline gemachte, nicht rückgängig gemachte.
2. **Optimieren** startet die Rechnung. Sie läuft in deinem Browser, die Seite bleibt bedienbar; bei vielen tausend Wertungen dauert sie ein paar Sekunden. Zum Server gehen nur die 21 Zahlen.
3. Das Ergebnis steht in einem Satz: {since=0.11.0} **Die neuen Parameter passen besser zu dir** – Flowplan sagt damit genauer voraus, wann du eine Karte vergisst – oder **Keine Verbesserung**. **Details zur Berechnung** klappt die Tabelle auf: wie gut das Modell deine Wertungen voraussagt, mit den Standardparametern, den bisherigen (falls du schon optimiert hast) und den neuen. Kleiner ist besser:
   - **Log-Loss**: wie überrascht das Modell im Mittel von deinen Wertungen ist.
   - **RMSE (Klassen)**: wie weit die vorhergesagte Erinnerungswahrscheinlichkeit von deiner tatsächlichen Trefferquote abweicht, in Prozentpunkten.
4. **Parameter übernehmen** speichert die neuen Parameter; **Vorgabe behalten** bzw. **Bisherige behalten** schließt ohne Änderung. Angeboten wird das nur, wenn die neuen Parameter besser sind; sonst schließt **Schließen** den Dialog.

Optimieren braucht **mindestens 1.000 Wertungen** im gewählten Bereich. Darunter sagt der Dialog, wie viele es sind, und bietet nichts an – mit wenigen Wertungen wären die Parameter eher Zufall.

Was danach gilt:

- Parameter für **diesen Stapel** gehen vor, sonst die für **alle Stapel**, sonst die Standardparameter. {since=0.11.0} Noch davor kommen die eines **Teils des Stapels**. Andere Personen behalten ihre eigenen.
- Mit dem Übernehmen rechnet Flowplan Stabilität und Schwierigkeit deiner Karten aus ihrem Verlauf neu, wie Anki. Fälligkeiten bleiben; ab der nächsten Wertung plant FSRS mit den neuen Parametern – auch offline in den Apps.
- **Auf Vorgabe zurücksetzen** im Dialog bringt die Standardparameter zurück.
- Die [Statistik](/flashcards#statistik) des Stapels nennt das Gedächtnismodell: Standard oder deine Parameter, mit Datum und Zahl der Wertungen.

### Teile eines Stapels {since=0.11.0}

Lernst du in einem Stapel sehr Verschiedenes – Vokabeln und Grammatik, leichte und schwere Lektionen, Lückentexte neben Vorder-/Rückseite –, kann jeder Teil eigene Parameter bekommen. **Teil des Stapels** bietet an:

- **Unterstapel:** die Werte der Auswahl, die unter **Karten einrichten → Unterstapel** steht (beim [Anki-Import](/flashcards-import#unterstapel-als-eigene-datenbanken) die Eigenschaft **Deck**).
- **Kartentyp:** jeder Kartentyp, wenn der Stapel mehr als einen hat.

Gelernt wird nur aus den Wertungen der Karten dieses Teils – auch hier mindestens 1.000. Übernommene Parameter gelten für diese Karten: ein Unterstapel vor einem Kartentyp, beide vor dem ganzen Stapel. **Parameter des Stapels nutzen** nimmt sie wieder weg. **Meine Einstellungen** nennt, wie viele Teile eigene Parameter haben. Die Knöpfe der Lernsitzung zeigen die Abstände mit den Parametern der Karte, auch offline.

Später erinnert **Meine Einstellungen** leise daran, neu zu optimieren: nach 1.000 neuen Wertungen oder nach einem Monat mit mindestens 200 neuen. Eine Benachrichtigung gibt es dafür nicht.

## Behaltensrate empfehlen {since=0.10.0}

Nach dem Optimieren nennt der Dialog eine **empfohlene Behaltensrate** zwischen 70 % und 95 %. Dafür spielt Flowplan mit deinen neuen Parametern ein Lernjahr durch und sucht die Rate, bei der du am wenigsten Zeit je behaltener Karte brauchst. Die Zeiten kommen aus deinen eigenen Antwortzeiten; vergessene Karten zählen 2,5-fach, weil Vergessen mehr ärgert als Wiederholen.

{since=0.11.0} Gespielt wird mit den Karten des Stapels, wie sie jetzt stehen – ihre Stabilität, ihre Fälligkeit, die neuen Karten – und mit deinen Tagesgrenzen: Was über die Grenze für Wiederholungen hinausgeht, bleibt fällig, neue Karten kommen höchstens so viele wie erlaubt. Unter der Empfehlung steht, was sie bedeutet: „Bei 84 % sind es im Mittel etwa 42 Karten und 9 Minuten am Tag.“

### Arbeit je Behaltensrate {since=0.11.0}

Die Linie **Karten pro Tag** zeigt für jede Behaltensrate von 70 % bis 95 %, wie viele Karten du im Mittel am Tag lernen würdest; markiert sind die Rate **jetzt** und die **empfohlene**. Fahre mit Maus oder Finger darüber, um die Werte zu lesen; **Als Tabelle** nennt dazu die Minuten am Tag.

Unter **Zeit pro Tag (Minuten, optional)** trägst du ein, wie viel Zeit du täglich hast; **Neu berechnen** spielt das Jahr mit diesem Budget noch einmal. Reicht die Zeit nicht für alles, empfiehlt Flowplan die Rate, mit der du in deiner Zeit am meisten behältst.

{since=0.11.0} **Behaltensrate auf 84 % setzen** (mit der empfohlenen Zahl) setzt sie als deine Behaltensrate in **Meine Einstellungen**. Eine höhere Rate bleibt erlaubt: Sie kostet mehr Wiederholungen, dafür vergisst du seltener.

Die Empfehlung ähnelt Ankis „optimaler Behaltensrate“ und seinem Simulator, ist aber nicht dieselbe Rechnung.

## Wie die Optimierung rechnet

Flowplan sucht die Parameter, mit denen FSRS-6 deine bisherigen Wertungen am besten vorausgesagt hätte – dasselbe Ziel wie Ankis Optimierer, aber in eigenem Code ohne Zusatzprogramm. Gezählt werden Wiederholungen, die mindestens einen Lerntag nach der vorigen kommen; Wiederholungen am selben Tag verändern nur den Zustand der Karte. Die Parameter bleiben in den Grenzen, die FSRS vorgibt, und ein kurzer Verlauf zieht sie nur wenig von den Standardwerten weg. Dieselben Wertungen ergeben immer dieselben Parameter. Die Zahlen sind ähnlich, aber nicht gleich denen von Anki.

{since=0.11.0} Wie Ankis Optimierer (fsrs-rs) schätzt Flowplan zuerst die Anfangsstabilität je erster Wertung (Nochmal, Schwer, Gut, Leicht) aus der ersten Wiederholung nach mindestens einem Tag, und lässt dabei Ausreißer weg: sehr seltene Abstände und Abstände über 100 Tagen (bei Leicht über einem Jahr). Karten mit solchen Abständen zählen auch für die übrigen Parameter nicht. Erst dann werden alle Parameter gemeinsam angepasst.

## API

`study.history` liefert deine Wertungen eines Stapels (`scope: "deck"`) oder aller Stapel (`"all"`) so, wie der Optimierer sie liest; `study.params` speichert 21 Parameter oder setzt mit `weights: null` zurück. {since=0.11.0} Beide nehmen `group` für einen Teil des Stapels (`subdeck:<Wert>` oder `type:<Kartentyp>`; welche es gibt, nennt `study.history` unter `groups`).

{since=0.11.0} `study.optimize` optimiert auf dem Server – mit demselben Optimierer wie im Browser – und liefert Parameter, Güte, empfohlene Behaltensrate und die Arbeit je Rate (`minutesPerDay` für ein Zeitbudget); mit `apply: true` speichert es die Parameter, wenn sie besser sind. Damit der Server nicht leidet, gilt: höchstens 50.000 Wertungen (die der am längsten gelernten Karten), eine Optimierung zugleich je Server, fünf je Person in zehn Minuten, höchstens 30 Sekunden. Im [MCP-Server](/mcp) heißen die Werkzeuge `optimize_flashcard_parameters` (rechnet nur) und `set_flashcard_parameters` (speichert). Siehe [Lernkarten: API und MCP](/flashcards-app#api-und-mcp).
