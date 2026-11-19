---
keywords: Timeline, Zeitleiste, Gantt, Zoom, Meilenstein, Abhängigkeiten, kritischer Pfad, Zeitraum
---

# Timeline

Die Timeline zeigt Einträge mit Zeitraum als Balken auf einer Zeitachse – für Projektpläne, Roadmaps und Terminpläne.

Balken von einem Beginn- bis zu einem End-Datumsfeld, auf einem durchgehenden Raster.

- **Kopfzeile** {since=0.10.2}: **‹ Heute ›**, der sichtbare Zeitraum, **Maßstab**, **Zeitraum** und der Zoom stehen in einer Zeile. Das Symbol mit den Schiebereglern öffnet die **Timeline-Einstellungen** (Zoom-Regler, **Gehe zu**, Wochenenden, Meilensteine, Eigenschaften neben dem Titel, Abhängigkeiten); das **i** zeigt die Bedienhilfe.
- **Maßstab** {since=0.10.2}: Tag, Woche, 2 Wochen, Monat, Quartal, Jahr oder 5 Jahre. In jedem Maßstab scrollst du frei weiter – mit Trackpad, Mausrad oder Wischen, auch über Monats- und Jahresgrenzen.
- **Zeitraum** {since=0.10.2}: **Fortlaufend** beginnt mit dem aktuellen Monat (oder der Woche, dem Quartal, dem Jahr) und scrollt ohne Halt über Monats- und Jahresgrenzen weiter. **Von – bis** zeigt einen festen Zeitraum, etwa November bis März, als ein Stück. **Alle Einträge** passt den Zeitraum an die gefilterten Einträge an, vom ersten Beginn bis zum letzten Ende mit etwas Rand. Der Zeitraum wird mit der Ansicht gespeichert.
- **Zoom** {since=0.10.2}: Zwischen den Maßstäben zoomen **−** und **+**, der Regler in den Einstellungen, <kbd>Strg</kbd>/<kbd>⌘</kbd> + Mausrad oder zwei Finger – um den Mauszeiger bzw. die Finger. **Einpassen** zeigt den ganzen Zeitraum (oder alle Einträge) auf einmal. Der Zoom wird mit der Ansicht gespeichert.
- **Titel bleiben sichtbar** {since=0.10.2}: Läuft ein langer Balken links aus dem Bild, bleibt sein Titel am linken Rand der Zeitachse stehen, solange der Balken zu sehen ist. Passt der Titel nicht in den Balken, steht er rechts daneben. Unter **Neben dem Titel zeigen** wählst du bis zu vier Eigenschaften (etwa Nr. und Zuständig), die gedämpft hinter dem Titel stehen.
- **Meilensteine** {since=0.10.2}: Ein Eintrag mit gleichem Beginn und Ende erscheint als Raute ◆ mit dem Titel daneben; Abhängigkeitspfeile setzen an der Raute an. Unter **Meilensteine** kannst du zusätzlich eine Checkbox-Eigenschaft wählen – angehakte Einträge werden zur Raute an ihrem letzten Tag.
- **‹** und **›** scrollen um etwa vier Fünftel der Breite, **Heute** springt zum aktuellen Datum, **Gehe zu** zu einem beliebigen Tag. Wo du zuletzt warst, merkt sich die Ansicht auf diesem Gerät. {since=0.10.2}
- Die **Achse** hat zwei Zeilen, die dem Zoom folgen: Monat und Tage, Monat und Kalenderwochen (ab etwa 10 Pixel pro Tag), Quartal und Monate, Jahr und Monate. {since=0.10.2}
- Ein Balken, der über den Zeitraum hinausgeht, hat dort einen offenen, gestrichelten Rand. Liegt ein Eintrag ganz außerhalb, springt **Zum Zeitraum springen** zu ihm. {since=0.10.2}
- Balken verschieben oder an den Rändern ziehen. Auf Touchgeräten einen Balken erst kurz halten, dann ziehen; ein schnelles Wischen scrollt die Timeline. Die Griffe an den Rändern ziehen sofort. <kbd>Esc</kbd> bricht ein laufendes Ziehen ab. Das Kalendersymbol öffnet einen Datumsdialog, auch für ungeplante Einträge.
- Wochenenden lassen sich markieren.
- Ist ein Balken zu kurz für seinen Titel (etwa ein Tag im Maßstab Monat), steht der Titel neben dem Balken. {since=0.10.2}
- Tastatur: ++Alt ←/→++ verschiebt um einen Tag, mit <kbd>⇧</kbd> ändert es das Ende, mit <kbd>Strg</kbd> den Beginn. Hat die Timeline den Fokus, springt <kbd>T</kbd> zu heute, <kbd>F</kbd> passt ein, <kbd>+</kbd>/<kbd>−</kbd> zoomen. {since=0.10.2}

# Abhängigkeiten (Gantt)

Einträge können aufeinander warten – etwa „Druck“ erst nach „Korrektur“:

- In der Leiste der Timeline unter **Abhängigkeiten** eine Relation der Datenbank auf sich selbst wählen – oder **Abhängigkeiten einrichten** legt die Eigenschaft „Abhängigkeiten“ an.
- **Verknüpfen per Ziehen:** Vom runden Griff am Ende eines Balkens auf einen anderen Balken ziehen – dieser wartet dann auf den ersten. Verknüpfungen, die einen Kreis ergäben, lehnt Flowplan ab.
- **Pfeile** verbinden die Balken; beginnt ein Eintrag, bevor sein Vorgänger endet, ist der Pfeil rot. Schon beim Ziehen warnt die Timeline, welcher Eintrag zu früh läge.
- **Nachfolger mitverschieben:** Verschiebst du einen Eintrag, rücken alle Einträge, die direkt oder indirekt auf ihn warten, um dieselben Tage mit – in einem Schritt. Maßgeblich ist die Seite, an der die Verknüpfung hängt: bei „Ende → Anfang“ und „Ende → Ende“ das Ende des Eintrags, bei „Anfang → Anfang“ und „Anfang → Ende“ sein Anfang.
- **Alle Konflikte nachziehen** schiebt jeden zu frühen Eintrag hinter seinen Vorgänger.
- **Kritischen Pfad hervorheben** markiert die Einträge und Pfeile ohne Puffer: Verzögert sich einer davon, verschiebt sich das Ende des ganzen Plans.

In eingebetteten Ansichten (verknüpfte Datenbanken) sind Verknüpfen per Ziehen und **Alle Konflikte nachziehen** nicht verfügbar – dafür die Datenbank selbst öffnen.
