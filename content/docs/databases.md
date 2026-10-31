# Datenbanken

Eine Datenbank ist eine Sammlung von Einträgen mit Eigenschaften. Dieselben Einträge lassen sich als Tabelle, Board, Kalender, Timeline, Galerie, Liste, Feed, Diagramm oder Formular zeigen.

## Datenbank anlegen

**Neue Seite → Datenbank** fragt nach der Art:

| Art | Eigenschaften | Erste Ansicht |
| --- | --- | --- |
| **Aufgaben** | Aufgabe, Status, Priorität, Fällig am, Verantwortlich, Tags | Tabelle „Alle Aufgaben“, dazu Board, Kalender, Timeline … |
| **Dokumente** | Titel, Tags, Erstellt, Bearbeitet | Liste „Alle Dokumente“ (zuletzt bearbeitet oben), Galerie, Tabelle; Einträge öffnen als ganze Seite, leere Eigenschaften sind ausgeblendet |
| **Kontakte** | Name, Vorname, Nachname, Firma, Position, E-Mail, Telefon, Mobil, Straße, PLZ, Ort, Land, Geburtstag, Tags | Liste „Alle Kontakte“ (nach Nachname), Tabelle, Kalender „Geburtstage“, Galerie; Einträge öffnen als Profilseite mit Kontaktkarte – siehe [Kontakte](/contacts) |
| **Leer** | nur ein Titel | Tabelle |

Darunter stehen **Deine Vorlagen**: gespeicherte Datenbank-Vorlagen, etwa eine eigene „Notizen (PARA)“-Datenbank mit Relationen und Ansichten. Die letzte Wahl merkt sich das Gerät. Alternativ eine [Vorlage](/templates) verwenden, etwa „Aufgaben“ oder „Projekte“, oder eine CSV-Datei importieren (siehe [Import, Export und Versionen](/import-export-versions)).

## Einträge

- **Neu** unten in der Tabelle oder oben rechts legt einen Eintrag an und öffnet ihn mit markiertem Titel – einfach lostippen, <kbd>Enter</kbd> speichert.
- Ein Klick auf den Titel öffnet den Eintrag als Seite: oben der Titel zum direkten Bearbeiten, darunter die Eigenschaften, darunter ein vollständiges Dokument mit demselben Editor wie jede andere Seite – samt Kommentaren, Versionsverlauf und gemeinsamer Bearbeitung.
- Oben rechts im Eintrag: wie er sich öffnet (als Dialog, in der Seitenleiste oder als ganze Seite – die Wahl gilt für dich in diesem Browser; die Voreinstellung der Datenbank ist mit „Standard“ markiert), der Stern für die Favoriten, **Link kopieren** für die Adresse des Eintrags, das Schloss für die Rechte des Eintrags und die Regler für das Layout aller Einträge. **Symbol** und **Cover** erscheinen, wenn der Mauszeiger über dem Titel steht.
- **Lesemodus** (Buch-Symbol oben im Eintrag oder <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>E</kbd>) öffnet den Text eines Eintrags nur zum Lesen, wie bei Seiten; das Gerät merkt es sich pro Eintrag. Als ganze Seite geöffnet, nutzt **Volle Breite** den ganzen Bildschirm – die Eigenschaften bleiben lesbar schmal, der Text bekommt die Breite.
- Ein geöffneter Eintrag hat seine eigene Adresse (`/#page=<Datenbank>&row=<Eintrag>`) – egal ob als Dialog, in der Seitenleiste oder als ganze Seite. Sie lässt sich teilen, als Lesezeichen speichern oder per `@` in Texten verlinken. Unter den Eigenschaften zeigt **Verknüpft von**, welche Einträge per Relation und welche Seiten und Einträge per Link im Text auf ihn verweisen.
- **Datensatzvorlagen** geben neuen Einträgen Eigenschaften und Inhalt vor. Eine Vorlage kann Standard für neue Einträge sein.
- Mehrere Einträge auswählen (Kästchen links) und gemeinsam bearbeiten, duplizieren oder löschen – bis zu 500 auf einmal. Vorher sichert Flowplan einen Stand, der sich über den Versionsverlauf wiederherstellen lässt.
- Gelöschte Einträge liegen im Papierkorb der Datenbank und lassen sich zurückholen. Gleich nach dem Löschen geht das schneller: **Rückgängig** im Hinweis unten (oder <kbd>⌘</kbd> <kbd>Z</kbd>, solange er sichtbar ist). Ebenso lassen sich eine gemeinsame Bearbeitung mehrerer Einträge, ein in eine andere Spalte gezogener Eintrag, ein entferntes Datum und eine gelöschte Eigenschaft zurücknehmen.

### Seite in eine Datenbank verschieben

**Seitenaktionen → In Datenbank verschieben …** macht aus einer Dokumentseite einen Eintrag einer Datenbank, in die du schreiben darfst – etwa um gewachsene Dokumentation in eine Notizen-Datenbank zu holen:

- Titel, Symbol und Cover werden zu Titel, Symbol und Cover des Eintrags, der Inhalt zu seinem Dokument; Dateien und Bilder bleiben dieselben (sie gehören dann zur Datenbank).
- Kommentare, Textkommentare, Aufgaben und Versionen ziehen mit; Favoriten werden Eintrags-Favoriten.
- Links auf die Seite in allen Seiten und Einträgen des Arbeitsbereichs zeigen danach auf den Eintrag.
- Unterseiten bleiben Seiten und rücken eine Ebene nach oben. Rechte für Personen, die auf der Seite gesetzt waren, gelten für sie weiter – sie werden dadurch weder für mehr noch für weniger Personen sichtbar.
- Freigaben nur dieser Seite (Rechte für Personen, Freigabelinks, Veröffentlichung) enden – der Dialog nennt sie vorher; der Eintrag folgt den Rechten der Datenbank. Die Standardvorlage der Datenbank wird übernommen.
- Die Seite selbst kommt in den Papierkorb.

### Eintrag in eine Seite umwandeln

Umgekehrt macht **In Seite umwandeln …** aus einem Eintrag wieder eine Dokumentseite – im Menü **…** oben im geöffneten Eintrag oder per Rechtsklick auf den Eintrag. Dafür brauchst du Bearbeitungsrechte am Eintrag und Schreibrechte am Zielort:

- Titel, Symbol und Cover werden zu Titel, Symbol und Cover der Seite, das Dokument des Eintrags zu ihrem Inhalt; Dateien und Bilder bleiben dieselben (sie gehören dann zur Seite).
- Die Eigenschaften bleiben als kurze Liste „Eigenschaft: Wert“ oben auf der Seite stehen (auch im Markdown-Export lesbar); im Dialog lassen sie sich stattdessen weglassen.
- Kommentare, Textkommentare, Aufgaben und Versionen ziehen mit; Eintrags-Favoriten werden Seiten-Favoriten.
- Links auf den Eintrag in allen Seiten und Einträgen des Arbeitsbereichs zeigen danach auf die Seite – @-Links und Rückverweise funktionieren weiter.
- Die Seite landet dort, wo die Datenbank liegt, oder an einem anderen Ort deiner Wahl, und folgt dessen Rechten. Eigene Rechte des Eintrags und Relationen anderer Einträge auf ihn enden – der Dialog nennt sie vorher.
- Der Eintrag selbst kommt in den Papierkorb der Datenbank und lässt sich zurückholen.

### Einträge kopieren und verschieben

Ein **Rechtsklick** auf einen Eintrag – in Tabelle, Board, Liste, Galerie, Kalender oder Zeitleiste – öffnet sein Menü: **Öffnen**, **Duplizieren**, **Kopieren nach …**, **Verschieben nach …**, **In Seite umwandeln …** und **Löschen**. Sind mehrere Einträge ausgewählt, gilt das Menü für alle; in der Leiste der Auswahl steht dafür auch **Verschieben / kopieren nach …**.

Im Dialog wählst du die Ziel-Datenbank desselben Arbeitsbereichs:

- **Kopieren** legt neue Einträge an – mit Eigenschaften, Inhalt, Symbol und Cover. Dateien und Bilder werden mitkopiert, die Kopie hängt also nicht an der Quelle.
- **Verschieben** nimmt den Eintrag selbst mit: Inhalt, Kommentare, Versionsverlauf, erfasste Zeiten und Git-Verknüpfungen bleiben erhalten. In der neuen Datenbank bekommt er die nächste Nummer (Ticket-ID).
- Eigenschaften werden **nach Namen** zugeordnet, der Titel immer zum Titel. Passende Typen werden umgewandelt (Text ↔ E-Mail, Auswahl ↔ Mehrfachauswahl, Zahl → Text …); fehlende Auswahloptionen kommen im Ziel dazu. **Fehlende Eigenschaften im Ziel anlegen** erstellt Eigenschaften, die das Ziel noch nicht hat.
- Berechnete Werte (Formeln, Rollups, Fortschritt, Erstellt/Geändert) entstehen im Ziel neu.

Schneller geht es mit der Maus: Einträge am Griff **in eine Datenbank der Seitenleiste ziehen** verschiebt sie dorthin, mit gedrückter <kbd>Alt</kbd>-Taste werden sie kopiert. Vorher sichert Flowplan einen Stand der Quelle.

## Eigenschaften

| Typ | Inhalt |
| --- | --- |
| Text, Zahl | Zahlen mit Format: Währung, Prozent, Dezimalstellen, Tausendertrennzeichen |
| Datum | Mit oder ohne Uhrzeit und Enddatum, Zeitzone, persönliche Erinnerungen, Wiederholung |
| Auswahl, Mehrfachauswahl | Farbige Optionen, z. B. für Status oder Schlagworte |
| Checkbox, Checkliste | Abhaken; Checklisten mit mehreren Punkten und Fortschritt |
| URL, E-Mail, Telefon | Anklickbar |
| Person | Mitglieder des Arbeitsbereichs; Zuweisung benachrichtigt |
| Dateien | Anhänge und Bilder direkt am Eintrag |
| Relation, Rollup | Verknüpfung mit Einträgen einer anderen Datenbank und Berechnungen darüber |
| Formel | Berechneter Wert aus anderen Eigenschaften |
| Erstellt am/von, Bearbeitet am/von | Werden automatisch gepflegt |

Relationen, Rollups und Formeln sind unter [Eigenschaften, Formeln und Rollups](/properties-and-formulas) beschrieben.

## Große Datenbanken

Tabellen, Listen und Galerien zeigen zuerst 100 Einträge; beim Scrollen folgen die nächsten 100, Gruppen und Board-Spalten haben **Weitere anzeigen**. Suche, Filter, Sortierung und Spaltenberechnungen gelten trotzdem immer für alle Einträge. So öffnen sich auch Datenbanken mit Tausenden Einträgen in Sekundenbruchteilen.

## Filtern, sortieren, gruppieren

Jede Ansicht hat eigene Einstellungen:

- **Filter** mit UND/ODER-Gruppen, für Datumsfelder auch relative Zeiträume („diese Woche“, „letzte 30 Tage“), die sich täglich selbst aktualisieren.
- **Sortierung** nach mehreren Eigenschaften.
- **Gruppierung** nach fast jeder Eigenschaft (außer Dateien und Checklisten), mit bis zu fünf Ebenen in Tabellen und Listen; Boards zeigen die zweite Ebene als Zeilen (Swimlanes).
- **Suche** innerhalb der Datenbank, auch im Text der Eintragsdokumente.
- **Spaltenberechnungen** unter Tabellenspalten: Summe, Durchschnitt, Median, Minimum, Maximum, Anteile, früheste und späteste Daten und mehr.

## Wiederkehrende Einträge

Datumsfelder lassen sich täglich, wöchentlich, monatlich oder jährlich wiederholen. Kalender und Timeline zeigen die Wiederholungen; es bleibt ein einziger Eintrag. Eine einzelne Wiederholung lässt sich bei Bedarf als eigener Eintrag lösen.

### Wiederkehrende Aufgaben

Für Aufgaben, die jedes Mal einzeln abgehakt werden („Monatsabschluss“, „Server-Updates“), stellst du im Eintrag unter **Wiederkehrende Aufgabe** einen Rhythmus ein: täglich, wöchentlich (wahlweise an bestimmten Wochentagen, z. B. Mo, Mi, Fr), monatlich oder jährlich, jeweils alle N Tage, Wochen, Monate oder Jahre. Gibt es mehrere Datumsfelder, wählst du, welches weiterrückt.

Sobald der Eintrag erledigt ist (Status oder Häkchen, siehe [Wann ist ein Eintrag erledigt?](/projects-and-tickets#wann-ist-ein-eintrag-erledigt)), legt Flowplan den nächsten Eintrag an: eine Kopie mit dem Status von vorher, das gewählte Datum auf dem nächsten Termin und alle anderen Datumsfelder um gleich viele Tage verschoben. Der Rhythmus wandert zum neuen Eintrag; wird der alte noch einmal geöffnet und erledigt, entsteht kein weiterer.

- Monatsenden werden gekappt, der Tag bleibt erhalten: 31. Januar → 28. Februar → 31. März.
- Der 29. Februar wird in Nicht-Schaltjahren zum 28. und in Schaltjahren wieder zum 29.

Neue Einträge zu festen Zeiten – unabhängig davon, ob der letzte erledigt ist – legen [geplante Automationen](/projects-and-tickets#geplante-automationen) an.

## Datums-Erinnerungen

Im Eintrag kann jede Person für jedes gefüllte Datumsfeld eine persönliche Erinnerung setzen – bei Uhrzeiten zum Termin oder 5 Minuten bis 1 Woche vorher, bei ganztägigen Daten am Tag oder 1, 2 bzw. 7 Tage vorher um 09:00. Erinnerungen erscheinen im Posteingang und als Push-Nachricht und ändern den Eintrag nicht.

## Rechte pro Eintrag

Über das Rechte-Symbol oben im Eintrag lässt sich ein Eintrag über die Rechte der Datenbank hinaus einschränken:

- **Rechte wie Datenbank**: Standard.
- **Schreibgeschützter Eintrag**: nur die Verwaltenden (Seiteneigentümer und die Person, die den Eintrag angelegt hat) und ausdrücklich Freigegebene ändern ihn.
- **Privater Eintrag**: nur Verwaltende und Freigegebene sehen ihn – samt seinen Kommentaren, Aufgaben und Dateien (in Dateiliste, Suche, Mediathek, Kopien, Vorlagen und Sicherungen).

Freigaben an Personen oder Gruppen gehen nie über die Rolle an der Datenbankseite hinaus.
