---
keywords: Lernkarten, FSRS, Parameter optimieren, Optimierung, Gewichte, Gedächtnismodell, Behaltensrate empfehlen, optimale Behaltensrate, CMRR, Log-Loss, RMSE, Anki
---

# Lernkarten: Parameter optimieren

FSRS plant mit 21 Parametern, die zu den meisten Menschen passen. Hast du genug gelernt, passt Flowplan sie an dein eigenes Gedächtnis an – und schlägt dir eine Behaltensrate vor. Das ist freiwillig; die Standardparameter funktionieren gut.

## Parameter optimieren {since=0.10.0}

In einem Stapel öffnest du **Meine Einstellungen**; unter **Gedächtnismodell (FSRS)** steht, welche Parameter der Stapel für dich nutzt. **Parameter optimieren …** öffnet den Dialog.

1. Wähle, aus welchen Wertungen gelernt wird: **Dieser Stapel** oder **Alle meine Stapel**. Es zählen nur deine eigenen Wertungen – auch importierte und offline gemachte, nicht rückgängig gemachte.
2. **Optimieren** startet die Rechnung. Sie läuft in deinem Browser, die Seite bleibt bedienbar; bei vielen tausend Wertungen dauert sie ein paar Sekunden. Zum Server gehen nur die 21 Zahlen.
3. Die Tabelle zeigt, wie gut das Modell deine Wertungen voraussagt – mit den Standardparametern, den bisherigen (falls du schon optimiert hast) und den neuen. Kleiner ist besser:
   - **Log-Loss**: wie überrascht das Modell im Mittel von deinen Wertungen ist.
   - **RMSE (Klassen)**: wie weit die vorhergesagte Erinnerungswahrscheinlichkeit von deiner tatsächlichen Trefferquote abweicht, in Prozentpunkten.
4. **Übernehmen** speichert die neuen Parameter; **Vorgabe behalten** bzw. **Bisherige behalten** schließt ohne Änderung. Übernehmen geht nur, wenn die neuen Parameter besser sind.

Optimieren braucht **mindestens 1.000 Wertungen** im gewählten Bereich. Darunter sagt der Dialog, wie viele es sind, und bietet nichts an – mit wenigen Wertungen wären die Parameter eher Zufall.

Was danach gilt:

- Parameter für **diesen Stapel** gehen vor, sonst die für **alle Stapel**, sonst die Standardparameter. Andere Personen behalten ihre eigenen.
- Mit dem Übernehmen rechnet Flowplan Stabilität und Schwierigkeit deiner Karten aus ihrem Verlauf neu, wie Anki. Fälligkeiten bleiben; ab der nächsten Wertung plant FSRS mit den neuen Parametern – auch offline in den Apps.
- **Auf Vorgabe zurücksetzen** im Dialog bringt die Standardparameter zurück.
- Die [Statistik](/flashcards#statistik) des Stapels nennt das Gedächtnismodell: Standard oder deine Parameter, mit Datum und Zahl der Wertungen.

Später erinnert **Meine Einstellungen** leise daran, neu zu optimieren: nach 1.000 neuen Wertungen oder nach einem Monat mit mindestens 200 neuen. Eine Benachrichtigung gibt es dafür nicht.

## Behaltensrate empfehlen {since=0.10.0}

Nach dem Optimieren nennt der Dialog eine **empfohlene Behaltensrate** zwischen 70 % und 95 %. Dafür spielt Flowplan mit deinen neuen Parametern ein Lernjahr durch und sucht die Rate, bei der du am wenigsten Zeit je behaltener Karte brauchst. Die Zeiten kommen aus deinen eigenen Antwortzeiten; vergessene Karten zählen 2,5-fach, weil Vergessen mehr ärgert als Wiederholen.

**84 % für diesen Stapel übernehmen** (mit der empfohlenen Zahl) setzt sie als deine Behaltensrate in **Meine Einstellungen**. Eine höhere Rate bleibt erlaubt: Sie kostet mehr Wiederholungen, dafür vergisst du seltener.

Die Empfehlung ist eine vereinfachte Form von Ankis „optimaler Behaltensrate“: Sie rechnet ohne die Tagesgrenzen des Stapels und ohne Zeitbudget.

## Wie die Optimierung rechnet

Flowplan sucht die Parameter, mit denen FSRS-6 deine bisherigen Wertungen am besten vorausgesagt hätte – dasselbe Ziel wie Ankis Optimierer, aber in eigenem Code ohne Zusatzprogramm. Gezählt werden Wiederholungen, die mindestens einen Lerntag nach der vorigen kommen; Wiederholungen am selben Tag verändern nur den Zustand der Karte. Die Parameter bleiben in den Grenzen, die FSRS vorgibt, und ein kurzer Verlauf zieht sie nur wenig von den Standardwerten weg. Dieselben Wertungen ergeben immer dieselben Parameter. Die Zahlen sind ähnlich, aber nicht gleich denen von Anki.

## API

`study.history` liefert deine Wertungen eines Stapels (`scope: "deck"`) oder aller Stapel (`"all"`) so, wie der Optimierer sie liest; `study.params` speichert 21 Parameter oder setzt mit `weights: null` zurück. Optimieren selbst geht nur im Browser. Siehe [Lernkarten: API und MCP](/flashcards-app#api-und-mcp).
