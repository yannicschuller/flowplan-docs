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
- **Bearbeiten:** In der Tabelle speichert <kbd>Enter</kbd> auch Zahlen; ein Doppelklick auf eine Mehrfachauswahl öffnet sie nur, ohne eine Option anzuhaken. <kbd>Esc</kbd> schließt einen geöffneten Eintrag – was du in Titel oder Eigenschaften getippt hast, bleibt gespeichert.
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
- Die Tags der Seite kommen in die (erste) Mehrfachauswahl der Datenbank mit den [Tags des Arbeitsbereichs](#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs), sofern es eine gibt und du sie ändern darfst.
- Kommentare, Textkommentare, Aufgaben und Versionen ziehen mit; Favoriten werden Eintrags-Favoriten.
- Links auf die Seite in allen Seiten und Einträgen des Arbeitsbereichs zeigen danach auf den Eintrag.
- Unterseiten bleiben Seiten und rücken eine Ebene nach oben. Rechte für Personen, die auf der Seite gesetzt waren, gelten für sie weiter – sie werden dadurch weder für mehr noch für weniger Personen sichtbar.
- Freigaben nur dieser Seite (Rechte für Personen, Freigabelinks, Veröffentlichung) enden – der Dialog nennt sie vorher; der Eintrag folgt den Rechten der Datenbank. Die Standardvorlage der Datenbank wird übernommen.
- Die Seite selbst kommt in den Papierkorb.

### Eintrag in eine Seite umwandeln

Umgekehrt macht **In Seite umwandeln …** aus einem Eintrag wieder eine Dokumentseite – im Menü **…** oben im geöffneten Eintrag oder per Rechtsklick auf den Eintrag. Dafür brauchst du Bearbeitungsrechte am Eintrag und Schreibrechte am Zielort:

- Titel, Symbol und Cover werden zu Titel, Symbol und Cover der Seite, das Dokument des Eintrags zu ihrem Inhalt; Dateien und Bilder bleiben dieselben (sie gehören dann zur Seite).
- Die Eigenschaften bleiben als kurze Liste „Eigenschaft: Wert“ oben auf der Seite stehen (auch im Markdown-Export lesbar); im Dialog lassen sie sich stattdessen weglassen.
- Die Tags aus Mehrfachauswahlen mit den [Tags des Arbeitsbereichs](#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) werden zu Tags der Seite.
- Kommentare, Textkommentare, Aufgaben und Versionen ziehen mit; Eintrags-Favoriten werden Seiten-Favoriten.
- Links auf den Eintrag in allen Seiten und Einträgen des Arbeitsbereichs zeigen danach auf die Seite – @-Links und Rückverweise funktionieren weiter.
- Die Seite landet dort, wo die Datenbank liegt, oder an einem anderen Ort deiner Wahl, und folgt dessen Rechten. Eigene Rechte des Eintrags und Relationen anderer Einträge auf ihn enden – der Dialog nennt sie vorher.
- Der Eintrag selbst kommt in den Papierkorb der Datenbank und lässt sich zurückholen.

### Einträge kopieren und verschieben

Ein **Rechtsklick** auf einen Eintrag – in Tabelle, Board, Liste, Galerie, Kalender oder Zeitleiste – öffnet sein Menü: **Öffnen**, **Duplizieren**, **Kopieren nach …**, **Verschieben nach …**, **In Seite umwandeln …** und **Löschen**. Sind mehrere Einträge ausgewählt, gilt das Menü für alle; in der Leiste der Auswahl steht dafür auch **Verschieben / kopieren nach …**.

**Einträge kopieren:** Sind in der Tabellenansicht Einträge ausgewählt, kopiert **Kopieren** in der Leiste der Auswahl (oder <kbd>⌘</kbd>/<kbd>Strg</kbd>+<kbd>C</kbd>, solange kein Text markiert ist) sie in die Zwischenablage – mit den sichtbaren Spalten der Ansicht als Kopfzeile, in der Reihenfolge der Tabelle. In Excel, Numbers oder Google Sheets eingefügt, landet jeder Wert in einer eigenen Zelle; in einem Dokument entsteht eine Tabelle. Werte stehen so drin, wie die Tabelle sie zeigt: Zahlen im Format der Spalte, Auswahl- und Personenspalten mit Namen, Verknüpfungen mit dem Titel des Eintrags, Checkboxen als Ja/Nein.

Im Dialog wählst du die Ziel-Datenbank desselben Arbeitsbereichs:

- **Kopieren** legt neue Einträge an – mit Eigenschaften, Inhalt, Symbol und Cover. Dateien und Bilder werden mitkopiert, die Kopie hängt also nicht an der Quelle.
- **Verschieben** nimmt den Eintrag selbst mit: Inhalt, Kommentare, Versionsverlauf, erfasste Zeiten und Git-Verknüpfungen bleiben erhalten. In der neuen Datenbank bekommt er die nächste Nummer (Ticket-ID).
- Eigenschaften werden **nach Namen** zugeordnet, der Titel immer zum Titel. Passende Typen werden umgewandelt (Text ↔ E-Mail, Auswahl ↔ Mehrfachauswahl, Zahl → Text …); fehlende Auswahloptionen kommen im Ziel dazu. **Fehlende Eigenschaften im Ziel anlegen** erstellt Eigenschaften, die das Ziel noch nicht hat.
- Berechnete Werte (Formeln, Rollups, Fortschritt, Erstellt/Geändert) entstehen im Ziel neu.

Schneller geht es per Ziehen: Einträge am Griff (mit der Maus auch an der Karte) **in eine Datenbank der Seitenleiste ziehen** verschiebt sie dorthin – die Zieldatenbank wird hervorgehoben –, mit gedrückter <kbd>Alt</kbd>-Taste beim Loslassen werden sie kopiert. Vorher sichert Flowplan einen Stand der Quelle.

## Eigenschaften

| Typ | Inhalt |
| --- | --- |
| Text | Formatierter Text: fett, kursiv, durchgestrichen, Code, Links, Zeilenumbrüche (siehe unten) |
| Zahl | Zahlen mit Format: Währung, Prozent, Dezimalstellen, Tausendertrennzeichen |
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

### Formatierter Text

Text-Eigenschaften – alle außer dem Titel – können **fett**, *kursiv*, ~~durchgestrichen~~, `Code`, Links und Zeilenumbrüche enthalten. Es sind nur Auszeichnungen im Text, keine Blöcke: Überschriften, Listen, Zitate oder Tabellen gibt es darin nicht (dafür ist der Text des Eintrags da). Unterstreichen gibt es nicht.

- **Bearbeiten:** In der Tabelle die Zelle anklicken, im Eintrag ins Feld klicken. Ist Text markiert, erscheint darüber eine kleine Leiste mit Fett, Kursiv, Durchgestrichen, Code und Link.
- **Tastenkürzel:** <kbd>⌘</kbd> <kbd>B</kbd> fett, <kbd>⌘</kbd> <kbd>I</kbd> kursiv, <kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>X</kbd> durchgestrichen, <kbd>⌘</kbd> <kbd>E</kbd> Code, <kbd>⌘</kbd> <kbd>K</kbd> verlinkt den markierten Text (ohne Markierung öffnet <kbd>⌘</kbd> <kbd>K</kbd> wie überall die Schnellsuche). Links gehen nur auf `http`, `https` und `mailto`; aus `example.com` wird `https://example.com`, aus einer E-Mail-Adresse ein `mailto:`-Link. Ein leeres Feld entfernt den Link.
- **Zeilenumbruch:** <kbd>⇧</kbd> <kbd>Enter</kbd>. In einer Tabellenzelle beendet <kbd>Enter</kbd> die Bearbeitung und speichert, <kbd>Esc</kbd> verwirft sie. Im Eintrag, im Feed und beim Bearbeiten über einen Freigabelink macht auch <kbd>Enter</kbd> einen Zeilenumbruch; gespeichert wird beim Verlassen des Felds.
- **Anzeige:** formatiert in Tabelle, Board, Galerie, Liste, Feed, im Eintrag, auf veröffentlichten Seiten und in eingebetteten Ansichten. In Tabellenzellen und auf Karten steht ein Zeilenumbruch als Leerzeichen (die Zeile bleibt eine Zeile), im Eintrag und im Feed mit Umbruch. Links öffnen in einem neuen Tab; auf Karten, die selbst ein Link sind, bleiben sie Text.
- **Als reiner Text** zählt der Wert bei Suche, Filtern (*enthält* …), Sortierung, Gruppierung, Formeln (`prop("Notiz")` liefert den Text ohne Formatierung), beim Kopieren in die Zwischenablage, im CSV-Export, in den Widgets der Apps und in Platzhaltern von Vorlagen und Automationen.
- **Einfügen** aus Word, Google Docs oder Webseiten behält Fett, Kursiv, Durchgestrichen, Code und Links; Überschriften werden fett, Absätze und Listenpunkte zu Zeilenumbrüchen, Bilder und Tabellen fallen weg.
- **Import und Export:** CSV (auch Notion-Exporte), Jira und Trello, vCards, LDAP und Formularantworten sind reiner Text – Sternchen und Unterstriche bleiben, wie sie geschrieben sind. Tabellen aus AFFiNE und Tabellen aus Dokumenten (**In Datenbank umwandeln**) behalten ihre Formatierung. Der Markdown-Export schreibt die Formatierung als Markdown, der CSV-Export reinen Text. Ältere Inhaltsarchive kommen als reiner Text herein.
- **Bestehende Werte** aus der Zeit vor dieser Funktion sehen aus wie vorher: `*Sternchen*` bleibt mit Sternchen.
- **Typ ändern:** Wird eine andere Eigenschaft zu Text, bleiben ihre Werte, wie sie geschrieben sind; wird Text zu einem anderen Typ, zählt der Text ohne Formatierung.
- **API und MCP:** Der Wert ist ein String mit Inline-Markdown: `**fett**`, `_kursiv_` (auch `*kursiv*`), `~~durchgestrichen~~`, `` `Code` ``, `[Text](https://…)` und `\n` für einen Zeilenumbruch. Ein Backslash hält `` \ * _ ~ ` [ ] `` als Zeichen fest – reinen Text also maskiert senden. Links mit anderen Schemata (etwa `javascript:`) zeigen nur ihren Text; `# ` oder `- ` am Anfang bleiben Text. Der Titel ist reiner Text.

### Mehrfachauswahl mit den Tags des Arbeitsbereichs

Eine Mehrfachauswahl kann statt einer eigenen Liste die **Tags des Arbeitsbereichs** als Optionen haben – dieselben Tags, die auch Seiten tragen. In den Einstellungen der Eigenschaft (Klick auf die Spaltenüberschrift) unter **Optionen** zwischen **Eigene Liste** und **Tags des Arbeitsbereichs** wählen.

- Die Eigenschaft bietet die Tags an, die im Bereich der Datenbank gelten – die des ganzen Arbeitsbereichs und die des Bereichs (siehe [Geltungsbereich](/pages-and-spaces#geltungsbereich-arbeitsbereich-oder-bereich)) –, mit ihren Farben und in ihrer Reihenfolge; ein neuer Tag aus einem Eintrag gehört zum Bereich der Datenbank; Zellen, Board-Spalten und Karten zeigen die Tag-Farben. Im Eintrag wählst du mit **+ Tag** wie auf Seiten: Tippen schlägt passende Tags vor, <kbd>Enter</kbd> übernimmt.
- Gibt es einen eingegebenen Wert noch nicht, legt er den Tag an – wie auf Seiten dürfen das Mitglieder mit Bearbeitungsrecht. Leser, Gäste und Lese-Tokens wählen nur vorhandene Tags. Auf dem Board legt **+ Gruppe** bei so einer Eigenschaft einen neuen Tag an.
- Es bleibt eine Mehrfachauswahl: Filter, Sortierung, Gruppierung, Board-Spalten, Formeln, Automationen, Import und Export (Markdown, CSV, Git), API und MCP funktionieren wie gewohnt. Gespeichert werden die Tag-Namen.
- **Umbenennen, Zusammenführen und Löschen** eines Tags (Einstellungen → Tags & Eigenschaften) ändert alle Einträge mit diesem Tag gleich mit: Ein umbenannter Tag erscheint unter seinem neuen Namen, beim Zusammenführen wird aus dem einen Tag der andere (ohne Doppel), ein gelöschter Tag verschwindet aus den Einträgen. Filter und Board-Spalten der Ansichten folgen; vorher sichert Flowplan einen Stand jeder betroffenen Datenbank im Versionsverlauf.
- Einträge mit Tags erscheinen in der [Tag-Ansicht](/pages-and-spaces#tag-ansicht) neben den Seiten und werden mit `#Tag` / `-#Tag` in der Suche gefunden.
- **Umstellen** einer vorhandenen Mehrfachauswahl auf die Tags: Ihre Optionen werden den Tags zugeordnet (ohne Rücksicht auf Groß-/Kleinschreibung), fehlende Tags werden angelegt; die Werte der Einträge bleiben und tragen danach den genauen Namen des Tags. **Zurück auf „Eigene Liste“** werden die Tags zu eigenen Optionen – die verwendeten zuerst, höchstens 100; die Werte bleiben.
- Gäste sehen als Optionen nur die Tags, die in den für sie freigegebenen Einträgen vorkommen, und legen keine an. Über Freigabelinks bietet ein Eintrag nur seine eigenen Tags an.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es diese Option nicht (wie Tags auf Seiten).

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
