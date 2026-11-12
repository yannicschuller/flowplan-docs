---
keywords: Ansicht, Kanban, Board, Kalender, Timeline, Gantt, Galerie, Liste
---

# Ansichten

Eine Datenbank kann beliebig viele Ansichten haben. Jede Ansicht zeigt dieselben Einträge mit eigener Darstellung, eigenen Filtern, Sortierungen und Gruppen.

Neue Ansicht: **+** neben den Ansichtsreitern, dann eine der {{facts.views|word}} Darstellungen wählen. **Ansicht und Eigenschaften** steuert, welche Eigenschaften sichtbar sind und in welcher Reihenfolge.

Ein **Rechtsklick auf einen Ansichtsreiter** öffnet sein Menü: **Umbenennen**, **Duplizieren**, **Einstellungen …**, **Als Standardansicht festlegen**, **Nach links**, **Nach rechts** und **Ansicht löschen** (die Einträge bleiben dabei erhalten; die letzte Ansicht lässt sich nicht löschen). Reiter lassen sich mit der Maus auch **per Ziehen neu anordnen**, ein Doppelklick benennt sie um. Auf Touchscreens scrollen die Reiter beim Wischen; langes Drücken öffnet das Menü mit **Nach links** und **Nach rechts**.

**Standardansicht:** Die Ansicht, die beim Öffnen der Datenbank zuerst erscheint – etwa das Board statt der Tabelle. Ohne Einstellung ist es die erste Ansicht. Ein kleiner Stern im Reiter markiert sie; einstellbar auch in den Einstellungen der Ansicht (praktisch auf dem Handy).

## Einträge per Ziehen ordnen

In Tabelle, Liste, Feed, Board und Galerie lassen sich Einträge am **Griff** (⋮⋮) an eine andere Stelle ziehen; Karten im Board und in der Galerie auch mit der Maus an der ganzen Karte.

- **Maus:** Erst nach ein paar Pixeln Bewegung beginnt das Ziehen – ein einfacher Klick öffnet weiterhin den Eintrag bzw. am Griff den Dialog **Eintrag verschieben**. Während des Ziehens zeigt der Mauszeiger die geschlossene Hand, eine leicht angehobene Kopie folgt dem Zeiger, und eine blaue Linie zeigt, wo der Eintrag landet. Über einer Gruppenüberschrift landet er am Ende dieser Gruppe (und wechselt die Gruppe).
- **Am Rand scrollen:** Nahe am Rand der Tabelle, des Boards oder des Fensters scrollt die Ansicht mit, waagrecht wie senkrecht.
- **Abbrechen:** <kbd>Esc</kbd> während des Ziehens legt alles zurück, nichts wird geändert.
- **Touchscreens:** Den Griff kurz halten (etwa 0,3 Sekunden), bis sich der Eintrag abhebt, dann ziehen. Ein schnelles Wischen über den Griff scrollt wie gewohnt; ein kurzes Tippen öffnet **Eintrag verschieben**. Im Board ziehen Griff und Spaltengriff sofort.
- **Tastatur:** Den Griff fokussieren, <kbd>Leertaste</kbd> hebt den Eintrag an, <kbd>↑</kbd>/<kbd>↓</kbd> verschieben ihn (im Board <kbd>←</kbd>/<kbd>→</kbd> in die Nachbarspalte, <kbd>Pos1</kbd>/<kbd>Ende</kbd> an den Anfang oder das Ende), <kbd>Leertaste</kbd> oder <kbd>Enter</kbd> legt ab, <kbd>Esc</kbd> bricht ab. Screenreader hören jede Position. <kbd>Alt</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd> verschiebt weiterhin sofort um eine Stelle.
- Ein Eintrag lässt sich so auch auf eine **Datenbank in der Seitenleiste** ziehen (siehe [Einträge kopieren und verschieben](/databases#eintraege-kopieren-und-verschieben)).

## Tabelle

- Zellen direkt bearbeiten, Einträge über den Titel als Seite öffnen.
- Spalten an ihrer Überschrift auf eine andere Spalte ziehen – sie landen davor (blaue Linie) –, an den Rändern in der Breite ändern. Auf Touchscreens die Überschrift erst kurz halten.
- Unter jeder Spalte eine Berechnung wählen.
- Gruppierte Tabellen klappen Gruppen ein und zeigen Zusammenfassungen je Gruppe.
- Beim seitlichen Scrollen bleibt die Titelspalte stehen. Auf dem Smartphone nimmt sie höchstens etwa 60 % der Tabellenbreite ein, und längere Titel werden mit „…“ gekürzt. Die Spalte mit Auswahlfeld und Ziehgriff scrollt dort mit. So lässt sich die Tabelle überall seitlich wischen, auch auf der Titelspalte.

## Board

Die Kanban-Ansicht gruppiert Karten in Spalten, etwa nach Status, Auswahl, Person oder Relation.

- Karten per Drag and Drop zwischen und innerhalb von Spalten verschieben: Die Karte hebt sich ab, die Zielspalte öffnet eine Lücke, beim Loslassen setzt sich die Karte hinein. Das ändert die gruppierende Eigenschaft.
- **Neu** am Fuß einer Spalte legt einen Eintrag direkt in dieser Gruppe an.
- Spalten umsortieren, ausblenden oder einklappen; „Ohne Gruppe“ sammelt Einträge ohne Wert.
- **Gruppe hinzufügen** rechts neben den Spalten legt einen eigenen Status an, etwa „Warten auf Kunde“: Er wird als neue Option der gruppierenden Auswahl-Eigenschaft gespeichert und erscheint sofort als eigene Spalte.
- Untergruppen teilen das Board zusätzlich in Zeilen (Swimlanes).
- Karten zeigen jede unter **Ansicht → Eigenschaften und Spalten** angehakte Eigenschaft, die einen Wert hat, in dieser Reihenfolge; leere Eigenschaften fallen weg, das Datum steht unten auf der Karte. Mit mehr Eigenschaften wird die Karte höher.
- Bei Mehrfachauswahl und Relationen kann eine Karte in mehreren Spalten erscheinen; Verschieben ersetzt nur die jeweilige Zuordnung.
- Auf Touchgeräten Karten am Griff ziehen (die Karte selbst scrollt beim Wischen), Spalten am Griff ⋮⋮ in ihrer Überschrift; mit der Maus Spalten an der Überschrift. <kbd>Esc</kbd> bricht ab, die Karte kehrt an ihren Platz zurück.

## Kalender

Monats-, Wochen- und Tagesansicht nach einem Datumsfeld.

- Woche und Tag zeigen ein Stundenraster mit Ganztagszeile und nebeneinander angeordneten Überschneidungen.
- Termine in 15-Minuten-Schritten verschieben, an den Rändern verlängern oder verkürzen.
- Ganztägige Einträge (Monatsansicht und Ganztagszeile) mit der Maus auf einen anderen Tag ziehen, auf Touchgeräten am Griff ⋮⋮; der Zieltag ist gestrichelt umrandet, <kbd>Esc</kbd> bricht ab. Mit der Tastatur verschiebt <kbd>Alt</kbd> + <kbd>←</kbd>/<kbd>→</kbd> einen fokussierten Eintrag um einen Tag, <kbd>Alt</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd> in der Monatsansicht um eine Woche.
- Klick auf eine Stunde legt einen Termin an, **Ganztägig +** einen Ganztagseintrag.
- Jede Ansicht hat eine eigene Zeitzone; ohne Einstellung gilt die des Browsers.
- **Wochenbeginn** (Montag oder Sonntag) lässt sich pro Ansicht festlegen; ohne Einstellung folgt er der Sprache der Person, die den Kalender ansieht – Sonntag in [English (US)](/languages), sonst Montag.
- Tastatur: <kbd>Alt</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd> verschiebt um 15 Minuten, <kbd>Alt</kbd> + <kbd>←</kbd>/<kbd>→</kbd> um einen Tag.

### Kalender abonnieren

**Abonnieren** in der Kalenderansicht erzeugt deinen persönlichen Link für Apple Kalender, Google Kalender oder Outlook. Er zeigt die Einträge dieser Ansicht mit ihren Filtern – nur, was du sehen darfst – und Wiederholungen als Serien. Der Link ist geheim und nur einmal sichtbar; **Neuen Link erzeugen** macht den alten ungültig, **Abo beenden** schaltet ihn ab. Verlierst du den Zugriff auf die Datenbank, liefert der Link nichts mehr.

### In beide Richtungen synchronisieren (CalDAV)

Im selben Dialog richtet **Zugang einrichten** eine Synchronisation für Apple Kalender, Thunderbird oder DAVx⁵ (Android) ein. Dort angelegte, verschobene, umbenannte oder gelöschte Termine landen in der Datenbank.

- **Zugangsdaten**: Du bekommst Server, Benutzername und ein Passwort, das nur einmal angezeigt wird.
- **Apple**: **In Apple Kalender einrichten** (in der App, in Safari oder auf dem Mac) lädt ein Konfigurationsprofil mit dem Account – installieren unter Einstellungen → **Profil geladen**. Mehrere Kalender auf einmal: **Einstellungen → Kalender & Issues → Kalender auf iPhone, iPad und Mac**. Von Hand: Account hinzufügen → Andere → CalDAV-Account, Typ „Manuell“.
- **Thunderbird und DAVx⁵**: Sie nehmen die Kalender-Adresse direkt.
- **Mehrere Geräte**: Jedes Profil bekommt einen eigenen Zugang, ein auf dem Mac eingerichteter Kalender läuft also weiter, wenn du das Profil auf dem iPhone installierst. **Zugang beenden** oder **Neues Passwort erzeugen** beendet alle Zugänge zu diesem Kalender, auch die der Profile.
- **Rechte**: Es gelten deine Rechte – wer die Datenbank nur lesen darf, kann im Kalender nichts ändern. Workflow und Automationen gelten wie bei jeder Änderung.

Google Kalender unterstützt keine CalDAV-Konten; dafür gibt es den Kalender-Sync unten.

### Kontakte als Adressbuch (CardDAV)

Kontakte-Datenbanken lassen sich wie Kalender abonnieren – als Adressbuch in Apple Kontakte, Thunderbird oder DAVx⁵, nur lesend, mit denselben Zugängen (Passwort nur einmal sichtbar) und einem Konfigurationsprofil für iPhone, iPad und Mac. Siehe [Als Adressbuch abonnieren](/contacts#als-adressbuch-abonnieren-carddav).

### Mit Google Kalender oder Outlook synchronisieren

Mit dem **Kalender-Sync** hältst du eine Ansicht mit Datum und einen Kalender in Google Kalender oder Microsoft Outlook / 365 in beide Richtungen gleich – persönlich, mit deinem eigenen Konto.

1. **Einstellungen → Kalender & Issues → Kalender verbinden** → **Mit Google Calendar verbinden** bzw. **Mit Microsoft Outlook / 365 verbinden**. Du meldest dich beim Anbieter an und erlaubst den Zugriff auf deine Kalender.
2. In der Datenbank das Kalendersymbol neben **…** (**Kalender-Sync**) öffnen, die Ansicht, das Konto und den Kalender wählen und **Verbinden**.

Was synchronisiert wird:

- **Titel** ↔ Titel des Termins.
- **Datum** ↔ Beginn und Ende: Datum ohne Uhrzeit wird ein ganztägiger Termin, Datum mit Uhrzeit ein Termin mit Uhrzeit. Die Ansicht bestimmt, welche Datumseigenschaften Beginn und Ende sind; die Zeitzone der Kalenderansicht gilt für Termine ohne eigene Zeitzone.
- **Dokument des Eintrags** ↔ Beschreibung, als reiner Text. Am Ende der Beschreibung steht ein Link zurück zum Eintrag.
- **Neu, geändert, gelöscht** – in beide Richtungen. Im Kalender gelöschte Termine landen als Einträge im Papierkorb der Datenbank.

Gut zu wissen:

- Flowplan gleicht **alle zehn Minuten** ab und holt dabei nur Änderungen; **Jetzt synchronisieren** im Dialog sofort.
- **Konflikte**: Ändern beide Seiten denselben Termin, gewinnt die spätere Änderung. Das Protokoll hält jeden Konflikt fest.
- **Rechte**: Nur Einträge, die du sehen und bearbeiten darfst, gehen in den Kalender und werden vom Kalender geändert. Workflow und Automationen gelten wie bei jeder Änderung.
- **Zeitraum**: Termine von 90 Tagen zurück bis ein Jahr voraus. Wiederholte Termine aus dem Kalender kommen als einzelne Einträge an; ein wiederholter Eintrag geht mit seinem ersten Termin in den Kalender.
- **Trennen** unter **Einstellungen → Kalender & Issues** beendet alle Synchronisierungen dieser Verbindung. Den Zugriff kannst du zusätzlich in deinem Google- oder Microsoft-Konto widerrufen.
- Die Administration muss die Anbieter einmal einrichten, siehe [Konfiguration](/configuration-integrations#kalender-sync).

## Sprints

Backlog, Sprints mit Ziel und Zeitraum, Burndown und Velocity – siehe [Projekte, Tickets und Sprints](/projects-and-tickets#sprints).

## Timeline

Balken von einem Beginn- bis zu einem End-Datumsfeld, im Maßstab Woche, Monat, Quartal oder Jahr.

- Balken verschieben oder an den Rändern ziehen. Auf Touchgeräten einen Balken erst kurz halten, dann ziehen; ein schnelles Wischen scrollt die Timeline. Die Griffe an den Rändern ziehen sofort. <kbd>Esc</kbd> bricht ein laufendes Ziehen ab. Das Kalendersymbol öffnet einen Datumsdialog, auch für ungeplante Einträge.
- **Heute** springt zum aktuellen Datum; Wochenenden lassen sich markieren.
- Tastatur: <kbd>Alt</kbd> + <kbd>←</kbd>/<kbd>→</kbd> verschiebt um einen Tag, mit <kbd>⇧</kbd> ändert es das Ende, mit <kbd>Strg</kbd> den Beginn.

### Abhängigkeiten (Gantt)

Einträge können aufeinander warten – etwa „Druck“ erst nach „Korrektur“:

- In der Leiste der Timeline unter **Abhängigkeiten** eine Relation der Datenbank auf sich selbst wählen – oder **Abhängigkeiten einrichten** legt die Eigenschaft „Abhängigkeiten“ an.
- **Verknüpfen per Ziehen:** Vom runden Griff am Ende eines Balkens auf einen anderen Balken ziehen – dieser wartet dann auf den ersten. Verknüpfungen, die einen Kreis ergäben, lehnt Flowplan ab.
- **Pfeile** verbinden die Balken; beginnt ein Eintrag, bevor sein Vorgänger endet, ist der Pfeil rot. Schon beim Ziehen warnt die Timeline, welcher Eintrag zu früh läge.
- **Nachfolger mitverschieben:** Verschiebst du einen Eintrag, rücken alle Einträge, die direkt oder indirekt auf ihn warten, um dieselben Tage mit – in einem Schritt. Maßgeblich ist die Seite, an der die Verknüpfung hängt: bei „Ende → Anfang“ und „Ende → Ende“ das Ende des Eintrags, bei „Anfang → Anfang“ und „Anfang → Ende“ sein Anfang.
- **Alle Konflikte nachziehen** schiebt jeden zu frühen Eintrag hinter seinen Vorgänger.
- **Kritischen Pfad hervorheben** markiert die Einträge und Pfeile ohne Puffer: Verzögert sich einer davon, verschiebt sich das Ende des ganzen Plans.

In eingebetteten Ansichten (verknüpfte Datenbanken) sind Verknüpfen per Ziehen und **Alle Konflikte nachziehen** nicht verfügbar – dafür die Datenbank selbst öffnen.

## Galerie

Karten mit Vorschaubild und allen angehakten Eigenschaften, die einen Wert haben (wie im Board). Das Bild kommt wahlweise aus dem Inhalt des Eintrags, seinem Cover oder einer Dateien-Eigenschaft, füllend oder eingepasst.

## Liste

Kompakte Zeilen mit Titel und bis zu drei ausgefüllten Eigenschaften, gut für lange Sammlungen.

## Feed

Einträge samt Dokumentinhalt untereinander, wie ein Blog oder ein Protokoll. Titel, **Eintrag öffnen** oder die Kommentaranzahl öffnen den vollständigen Eintrag. Weitere Einträge laden in Schritten von 20.

## Diagramm

**Diagramm konfigurieren** wählt Säulen, Balken, Linie oder Donut, die Gruppierung und die Berechnung – Anzahl, Summe, Mittelwert, Minimum, Maximum. Datumswerte lassen sich nach Tag, Woche, Monat oder Jahr zusammenfassen. Ein Klick auf einen Datenpunkt zeigt die zugehörigen Einträge; **Auswertung als CSV** exportiert alle Werte.

- **Datenreihen** teilen jede Gruppe nach einer weiteren Eigenschaft auf, nebeneinander oder gestapelt.
- **Weitere Werte** stellen bis zu vier zusätzliche Berechnungen neben den Hauptwert, etwa „Summe von Kosten“ neben „Summe von Umsatz“ je Monat. Jeder Wert wird eine eigene Reihe mit Legende; beides zusammen – Datenreihen und weitere Werte – geht nicht.

## Formular

Sammelt Einträge über ein Formular, auch von Personen ohne Konto. Siehe [Formulare](/forms).

## Verknüpfte Datenbanken

In einem Dokument zeigt `/db` eine Ansicht einer vorhandenen Datenbank. Die Einbettung hat eigene Ansichten, Filter und Sortierungen; Einträge und ihre Änderungen gehören weiter zur Quelle. Der Quellname im Kopf öffnet die vollständige Datenbank.

Zum Lesen braucht man Zugriff auf Dokument und Quelle. Die Einbettung erteilt keine zusätzlichen Rechte, **Entfernen** löscht nur den Block.
