---
keywords: Timeline, Zeitleiste, Gantt, Zoom, Meilenstein, Abhängigkeiten, kritischer Pfad, Zeitraum, Pfeile, Hierarchie, Sammelbalken, Gruppieren, Wochenenden
---

# Timeline

Die Timeline zeigt Einträge mit Zeitraum als Balken auf einer Zeitachse – für Projektpläne, Roadmaps und Terminpläne.

Balken von einem Beginn- bis zu einem End-Datumsfeld, auf einem durchgehenden Raster.

- **Kopfzeile** {since=0.11.0}: **‹ Heute ›**, der sichtbare Zeitraum, **Maßstab**, **Zeitraum** und der Zoom stehen in einer Zeile. Das Symbol mit den Schiebereglern öffnet die **Timeline-Einstellungen** (Zoom-Regler, **Gehe zu**, Wochenenden, Meilensteine, Eigenschaften neben dem Titel, Hierarchie, Gruppen, Farben, Abhängigkeiten und Pfeile); das **i** zeigt die Bedienhilfe.
- **Maßstab** {since=0.11.0}: Tag, Woche, 2 Wochen, Monat, Quartal, Jahr oder 5 Jahre. In jedem Maßstab scrollst du frei weiter – mit Trackpad, Mausrad oder Wischen, auch über Monats- und Jahresgrenzen.
- **Zeitraum** {since=0.11.0}: **Fortlaufend** beginnt mit dem aktuellen Monat (oder der Woche, dem Quartal, dem Jahr) und scrollt ohne Halt über Monats- und Jahresgrenzen weiter. **Von – bis** zeigt einen festen Zeitraum, etwa November bis März, als ein Stück. **Alle Einträge** passt den Zeitraum an die gefilterten Einträge an, vom ersten Beginn bis zum letzten Ende mit etwas Rand. Der Zeitraum wird mit der Ansicht gespeichert.
- **Zoom** {since=0.11.0}: Zwischen den Maßstäben zoomen **−** und **+**, der Regler in den Einstellungen, <kbd>Strg</kbd>/<kbd>⌘</kbd> + Mausrad oder zwei Finger – um den Mauszeiger bzw. die Finger. **Einpassen** zeigt den ganzen Zeitraum (oder alle Einträge) auf einmal. Der Zoom wird mit der Ansicht gespeichert.
- **Titel bleiben sichtbar** {since=0.11.0}: Läuft ein langer Balken links aus dem Bild, bleibt sein Titel am linken Rand der Zeitachse stehen, solange der Balken zu sehen ist. Passt der Titel nicht in den Balken, steht er rechts daneben. Unter **Neben dem Titel zeigen** wählst du bis zu vier Eigenschaften (etwa Nr. und Zuständig), die gedämpft hinter dem Titel stehen.
- **Meilensteine** {since=0.11.0}: Ein Eintrag mit gleichem Beginn und Ende erscheint als Raute ◆ mit dem Titel daneben; Abhängigkeitspfeile setzen an der Raute an. Unter **Meilensteine** kannst du zusätzlich eine Checkbox-Eigenschaft wählen – angehakte Einträge werden zur Raute an ihrem letzten Tag. Sollen eintägige Einträge Balken bleiben, hake **Nur das Meilensteinfeld macht Meilensteine** an. {since=0.11.0}
- **‹** und **›** scrollen um etwa vier Fünftel der Breite, **Heute** springt zum aktuellen Datum, **Gehe zu** zu einem beliebigen Tag. Wo du zuletzt warst, merkt sich die Ansicht auf diesem Gerät. {since=0.11.0}
- Die **Achse** hat zwei Zeilen, die dem Zoom folgen: Monat und Tage, Monat und Kalenderwochen (ab etwa 10 Pixel pro Tag), Quartal und Monate, Jahr und Monate. {since=0.11.0}
- Ein Balken, der über den Zeitraum hinausgeht, hat dort einen offenen, gestrichelten Rand. Liegt ein Eintrag ganz außerhalb, springt **Zum Zeitraum springen** zu ihm. {since=0.11.0}
- Balken verschieben oder an den Rändern ziehen. Auf Touchgeräten einen Balken erst kurz halten, dann ziehen; ein schnelles Wischen scrollt die Timeline. Die Griffe an den Rändern ziehen sofort. <kbd>Esc</kbd> bricht ein laufendes Ziehen ab. Das Kalendersymbol öffnet einen Datumsdialog, auch für ungeplante Einträge.
- Wochenenden lassen sich markieren.
- Ist ein Balken zu kurz für seinen Titel (etwa ein Tag im Maßstab Monat), steht der Titel neben dem Balken. {since=0.11.0}
- Tastatur: ++Alt ←/→++ verschiebt um einen Tag, mit <kbd>⇧</kbd> ändert es das Ende, mit <kbd>Strg</kbd> den Beginn. Hat die Timeline den Fokus, springt <kbd>T</kbd> zu heute, <kbd>F</kbd> passt ein, <kbd>+</kbd>/<kbd>−</kbd> zoomen. {since=0.11.0}

# Abhängigkeiten (Gantt)

Einträge können aufeinander warten – etwa „Druck“ erst nach „Korrektur“:

- In der Leiste der Timeline unter **Abhängigkeiten** eine Relation der Datenbank auf sich selbst wählen – oder **Abhängigkeiten einrichten** legt die Eigenschaft „Abhängigkeiten“ an.
- **Verknüpfen per Ziehen:** Vom runden Griff am Ende eines Balkens auf einen anderen Balken ziehen – dieser wartet dann auf den ersten. Verknüpfungen, die einen Kreis ergäben, lehnt Flowplan ab.
- **Pfeile** verbinden die Balken; beginnt ein Eintrag, bevor sein Vorgänger endet, ist der Pfeil rot. Schon beim Ziehen warnt die Timeline, welcher Eintrag zu früh läge.
- **Nachfolger verschieben** {since=0.11.0}: Was passiert mit den Einträgen, die auf einen verschobenen Eintrag warten – direkt oder indirekt?
  - **Nur bei Überschneidung:** Sie rücken nur so weit, wie die Verknüpfung es verlangt; vorhandener Puffer bleibt. Verschiebst du einen Eintrag nach vorn, bleibt alles stehen.
  - **Abstände halten:** Sie rücken um dieselben Tage mit, die Abstände bleiben gleich. Maßgeblich ist die Seite, an der die Verknüpfung hängt: bei „Ende → Anfang“ und „Ende → Ende“ das Ende des Eintrags, bei „Anfang → Anfang“ und „Anfang → Ende“ sein Anfang.
  - **Aus:** Nichts rückt mit; Konflikte zeigt die Timeline rot an.
  - Ansichten, in denen früher **Nachfolger mitverschieben** angehakt war, stehen auf **Abstände halten**, die anderen auf **Aus**.
- **Wochenenden meiden** {since=0.11.0}: Mitverschobene Einträge beginnen und enden nie an einem Samstag oder Sonntag. Fiele der Beginn auf ein Wochenende, rückt er auf den Montag, und der Eintrag behält die Zahl seiner Arbeitstage (Montag bis Freitag) – ein Eintrag von Donnerstag bis Freitag läuft dann etwa von Montag bis Dienstag. Einträge rücken dabei nur nach hinten, nie nach vorn. Das gilt auch für **Alle Konflikte nachziehen** und den Knopf am einzelnen Konflikt; den Eintrag, den du selbst ziehst, legt die Timeline genau dorthin, wo du ihn loslässt.
- **Rückgängig** {since=0.11.0}: Nach dem Mitverschieben, nach dem Nachziehen eines Konflikts und nach **Alle Konflikte nachziehen** meldet ein Hinweis „N abhängige Einträge verschoben“. **Rückgängig** setzt alle betroffenen Einträge in einem Schritt zurück – auch den, den du gezogen hast. Hat jemand einen davon inzwischen geändert, bleibt alles, wie es ist.
- **Alle Konflikte nachziehen** schiebt jeden zu frühen Eintrag hinter seinen Vorgänger.
- **Kritischen Pfad hervorheben** markiert die Einträge und Pfeile ohne Puffer: Verzögert sich einer davon, verschiebt sich das Ende des ganzen Plans.

In eingebetteten Ansichten (verknüpfte Datenbanken) sind Verknüpfen per Ziehen und **Alle Konflikte nachziehen** nicht verfügbar – dafür die Datenbank selbst öffnen.

# Pfeile {since=0.11.0}

Viele Abhängigkeiten machen einen Plan schnell unübersichtlich. In den **Timeline-Einstellungen** legst du für jede Ansicht fest, wie die Pfeile erscheinen:

- **Pfeile zeigen:** **Alle**, **Nur kritischer Pfad**, **Nur für den gewählten Eintrag** (Pfeile erscheinen nur, solange du auf einen Balken zeigst, ihn mit der Tastatur ansteuerst oder er im Seitenpanel offen ist) oder **In dieser Ansicht ausblenden**. Ausgeblendete Pfeile ändern nichts an den Abhängigkeiten: Konflikte, **Nachfolger verschieben** und der kritische Pfad gelten weiter.
- **Pfeile über Balken:** **Deckend** zeichnet die Pfeile voll über alles. **Transparent** zeigt die Stücke, die über einen fremden Balken oder seinen Titel laufen, nur blass; dazwischen bleiben sie kräftig. **Hinter Balken** legt die Pfeile unter die Balken – am ruhigsten, aber unter langen Balken verschwinden sie ganz.
- **Linienführung:** **Rechtwinklig** führt den Pfeil wie in den meisten Planungswerkzeugen aus dem Ende heraus, nach unten und in den Anfang hinein; beginnt der Nachfolger vor dem Ende, macht der Pfeil einen Bogen über ihm. **Geschwungen** zeichnet eine Kurve.
- Neue Timeline-Ansichten beginnen mit **Transparent** und **Rechtwinklig**; bestehende behalten ihr Aussehen (**Deckend**, **Geschwungen**), bis du es änderst.
- **Fokus:** Zeigst du auf einen Balken (oder ist sein Eintrag im Seitenpanel offen), werden seine ein- und ausgehenden Pfeile kräftiger, alle anderen blass. Beim Zeigen und beim Ziehen sind seine Tage zugleich in der Achse markiert.
- **Pfeil entfernen:** Zeigst du auf einen Pfeil, werden er und beide Balken hervorgehoben, und am Ende erscheint ein kleines **×**. Es entfernt die Verknüpfung; **Rückgängig** im Hinweis stellt sie wieder her. Mit der Tastatur erscheint das **×** für alle Pfeile in einen Balken, sobald er den Fokus hat.
- **Außerhalb des Bildes:** Liegt ein Ende eines Pfeils außerhalb des sichtbaren Bereichs, zeichnet die Timeline nur einen kurzen Stummel mit Pfeilspitze am Rand. Zeilen, deren Balken links oder rechts außerhalb liegen, zeigen am Rand ein kleines **←** oder **→**, das zum Balken springt.
- **Überflüssige Verknüpfungen:** Folgt eine Verknüpfung schon aus anderen (A → C, wenn es A → B → C gibt), nennen die Einstellungen sie als Hinweis. Entfernt wird nur, was du selbst entfernst.

# Hierarchie und Gruppen {since=0.11.0}

- **Hierarchie-Feld:** Wähle eine Relation der Datenbank auf sich selbst, die den übergeordneten Eintrag hält (etwa „Übergeordnet“). Untereinträge stehen eingerückt unter ihrem Eintrag; **▾**/**▸** klappt sie zu und auf. Welche Einträge zugeklappt sind, merkt sich die Ansicht auf diesem Gerät. **Alle zuklappen** und **Alle aufklappen** über der Titelspalte zeigen mit einem Klick nur die oberste Ebene oder wieder alles. Hierarchie-Feld und Abhängigkeiten sind zwei verschiedene Relationen.
- **Sammelbalken:** Ein übergeordneter Eintrag zeigt einen schmalen dunklen Balken mit Spitzen an beiden Enden. Er reicht vom frühesten Beginn bis zum spätesten Ende aller Einträge darunter und folgt ihnen, wenn sie sich verschieben – die eigenen Daten des Eintrags zählen dafür nicht. Mit **Eigene Daten als Grundlinie zeigen** stehen sie als feine Linie darunter, wenn sie abweichen.
- **Auf- und zuklappen** ist kurz animiert: Untereinträge gleiten unter ihrem Eintrag hervor, die Zeilen darunter rücken mit, die Pfeile folgen. Bei zugeklappten Einträgen setzen die Pfeile ihrer Untereinträge am Sammelbalken an. Ist in deinem System „Bewegung reduzieren“ eingestellt, geschieht es sofort.
- **Gruppieren nach** ordnet die Einträge nach einer Eigenschaft (Auswahl, Checkbox, Text, Zahl …) in Gruppen mit eigenem Sammelbalken – die leichtere Variante für Datenbanken ohne Hierarchie. Gruppen lassen sich ebenfalls zuklappen.
- **Farbe nach** färbt die Balken nach einer Auswahl-Eigenschaft (etwa Ebene oder Status) in der Farbe der Option, im hellen und im dunklen Design gut lesbar.
- **Nur das Meilensteinfeld macht Meilensteine:** Dann werden nur Einträge mit angehakter Meilenstein-Eigenschaft zur Raute; eintägige Einträge bleiben Balken.

Die geteilte Timeline zeigt Pfeile, Hierarchie, Gruppen und Farben genauso – nur lesend. Leser können Einträge auf- und zuklappen; gespeichert wird dabei nichts.
