---
keywords: Eigenschaft, Feld, Spalte, Typ, Auswahl, Mehrfachauswahl, Rich Text, Farbe
new: farben-der-optionen 2026-11-13
---

# Eigenschaften von Datenbanken

Die Eigenschaftstypen einer Datenbank im Überblick, Farben für Auswahl-Optionen, formatierter Text in Feldern und Mehrfachauswahlen mit den Tags des Arbeitsbereichs.

## Eigenschaften

| Typ | Inhalt |
| --- | --- |
| Text | Formatierter Text: fett, kursiv, durchgestrichen, Code, Links, Zeilenumbrüche (siehe unten) |
| Zahl | Zahlen mit Format: Währung, Prozent, Dezimalstellen, Tausendertrennzeichen, eigene Einheit (kg, m …) |
| Datum | Mit oder ohne Uhrzeit und Enddatum, Zeitzone, persönliche Erinnerungen, Wiederholung |
| Auswahl, Mehrfachauswahl | Optionen mit eigener Farbe ([siehe unten](#farben-der-optionen)), z. B. für Status oder Schlagworte |
| Checkbox, Checkliste | Abhaken; Checklisten mit mehreren Punkten und Fortschritt |
| URL, E-Mail, Telefon | Anklickbar |
| Person | Mitglieder des Arbeitsbereichs; Zuweisung benachrichtigt |
| Dateien | Anhänge und Bilder direkt am Eintrag |
| Relation, Rollup | Verknüpfung mit Einträgen einer anderen Datenbank und Berechnungen darüber |
| Formel | Berechneter Wert aus anderen Eigenschaften |
| Erstellt am/von, Bearbeitet am/von | Werden automatisch gepflegt |

Relationen, Rollups und Formeln sind unter [Eigenschaften, Formeln und Rollups](/properties-and-formulas) beschrieben.

### Eigenschaften im Eintrag {since=0.11.6}

Im geöffneten Eintrag (Seitenansicht, ganze Seite, Telefon) steht jede Eigenschaft als kompakte Zeile: Symbol des Typs, Name und der Wert als Text oder Chips; leere Werte heißen „Leer“. Ein Klick oder Tipp auf den Wert öffnet seinen Editor als kleines Feld, auf dem Telefon als Blatt von unten (Tastatur: mit Tab zum Wert, Enter oder Leertaste). Escape oder ein Klick daneben schließt ihn, Änderungen werden wie gewohnt gespeichert. Auswahl und Mehrfachauswahl öffnen direkt die Suche der Optionen, Relationen Suche und Liste der Einträge, ein Datum bietet dort **Datum entfernen** und **+ Uhrzeit**. Häkchen, Sterne und Checklisten ändern sich weiter mit einem Tipp; Links (Web, E-Mail, Telefon, Dateien) öffnen sich beim Klick, der Rest der Zeile bearbeitet. Berechnete Werte und Eigenschaften, die du nicht ändern darfst, stehen ohne Editor da.

**Wiederholung** steht unter dem ersten Datum, **Wiederkehrende Aufgabe** nur in Datenbanken mit Erledigt-Status oder -Häkchen. Ohne Regel zählen beide als leere Eigenschaften und verschwinden mit **Leere Eigenschaften ausblenden**, bis du die leeren Eigenschaften einblendest.

### Eigenschaften im Eintrag einklappen

Unter dem Titel eines Eintrags klappt der Pfeil **Eigenschaften** die Eigenschaften zu einer Zeile zusammen: die zwei bis drei wichtigsten Werte als kleine Chips (zuerst der Status, dann Auswahl, Datum und Person) und „+4 Eigenschaften“. Ein Tipp auf die Zeile klappt sie wieder auf. Der Inhalt des Eintrags rückt so nach oben – gerade auf dem Telefon.

- Die Wahl gilt für **alle Einträge der Datenbank** und wird in deinem Konto gespeichert, **getrennt für Telefon und Computer**: Wer auf dem Telefon einklappt, sieht am Computer weiter alles.
- Ohne eigene Wahl sind die Eigenschaften am Computer aufgeklappt, auf dem Telefon eingeklappt, sobald der Eintrag mehr als vier Eigenschaften zeigt. Ein gerade angelegter Eintrag öffnet immer aufgeklappt, damit du ihn ausfüllen kannst.
- Einklappen ändert keine Werte und keine Rechte und gilt nur für dich. Drucken und Exporte zeigen immer alle Eigenschaften – außer du schaltest sie in den [Druckoptionen](/print-and-pdf#drucken-und-pdf) ab.
- Für normale Seiten gibt es dasselbe in der [Leiste mit Tags und Eigenschaften](/page-tags#leiste-einklappen).

### Standardwerte {since=0.11.1}

In den Einstellungen einer Eigenschaft (Klick auf die Spaltenüberschrift) legt **Standardwert** fest, was ein neuer Eintrag bekommt, wenn er für die Eigenschaft keinen Wert hat.

- **Feste Werte** für Text, Zahl, Auswahl (auch Status), Mehrfachauswahl, Kontrollkästchen und Datum – etwa „Offen“ als Status oder angehakt.
- **Dynamisch:** **Heute** für ein Datum ohne Uhrzeit, **Jetzt** für eines mit Uhrzeit; **Ersteller** für eine Person – wer den Eintrag anlegt.
- **Wann:** nur beim **Anlegen** eines Eintrags, wenn der Wert fehlt oder leer ist – in Tabelle, Board und jeder anderen Ansicht, über [Formulare](/forms) (auch für ausgeblendete und leer gelassene Fragen; eine anonyme Antwort hat keinen Ersteller), Automationen und [Workflows](/workflows), Schnellerfassung, [E-Mail-Eingänge](/inbound-email), Freigabelinks, MCP und die API. Werte einer [Datensatzvorlage](/templates#datensatzvorlagen) gehen vor. **Vorhandene Einträge ändern sich nie** – auch nicht, wenn du einen Standardwert neu setzt.
- **Import:** CSV-, Markdown- und vCard-Importe füllen nur Eigenschaften, für die die Datei keine Spalte hat. Ist eine Spalte in einer Zeile leer, bleibt der Wert leer – die Datei sagt es so. Kopien, Wiederherstellungen, Duplikate, wiederkehrende Einträge und Abgleiche mit Kalendern, Issue-Trackern oder LDAP behalten, was sie mitbringen.
- **Offline** angelegte Einträge zeigen ihre Standardwerte sofort; **Heute** und **Jetzt** zählen ab dem Moment, in dem du den Eintrag angelegt hast, nicht ab dem Senden.
- Wird eine Option umbenannt, zieht der Standardwert mit; wird sie gelöscht oder der Typ geändert, entfällt er.
- **API und MCP:** `database.update` nimmt und liefert `defaultValue` je Eigenschaft: `{"kind": "value", "value": "Offen"}`, `{"kind": "now"}` oder `{"kind": "creator"}`.

### Pflichtfelder {since=0.11.3}

In den Einstellungen einer Eigenschaft schaltest du **Pflichtfeld – Darf nicht leer sein** ein – möglich bei Text, Zahl, Datum, Auswahl (auch Status), Mehrfachauswahl, Link, E-Mail, Telefon, Person, Relation und Dateien.

- **Neue Einträge** bekommen den [Standardwert](#standardwerte) der Eigenschaft; ohne Standardwert bekommt eine Auswahl ihre erste Option. Das gilt überall, wo Einträge entstehen: in Ansichten, [Formularen](/forms), Vorlagen, Automationen, [Workflows](/workflows), Importen, über die API und offline. Andere Eigenschaften ohne Standardwert bleiben leer und werden als **Wert fehlt** markiert.
- **Leeren geht nicht mehr** – auch nicht über die API, per Massenbearbeitung oder durch Verschieben einer Karte in die leere Spalte eines Boards. Ein Workflow-Schritt, der den Wert leeren würde, schlägt mit dieser Meldung fehl.
- **Gruppieren:** Gruppierst du nach einem Pflichtfeld, entfällt die Gruppe ohne Wert. Nur solange ältere Einträge noch leer sind, erscheint sie als **Wert fehlt (Pflichtfeld)**.
- **Beim Einschalten** zeigen die Einstellungen, wie viele Einträge noch keinen Wert haben. Sie bleiben unverändert, bis du sie ausfüllst.
- **In Formularen** ist ein Pflichtfeld automatisch eine Pflichtfrage.

### Optionen suchen und anlegen {since=0.11.1}

Bei vielen Optionen musst du nicht mehr scrollen: Klickst du in der Tabelle auf eine Zelle einer Auswahl oder Mehrfachauswahl – oder im Eintrag und im Feed auf den Wert –, öffnet sich die Liste der Optionen mit einem Suchfeld.

- **Tippen filtert:** Groß- und Kleinschreibung und Akzente zählen nicht („cafe“ findet „Café“); Optionen, die mit dem Getippten beginnen, stehen oben. Mit den Pfeiltasten wählst du aus, <kbd>Enter</kbd> übernimmt, <kbd>Esc</kbd> schließt ohne Änderung. Auf dem Telefon tippst du auf die Option.
- **Neue Option:** Gibt es das Getippte noch nicht, steht in der Liste **„…“ anlegen** – <kbd>Enter</kbd> oder ein Tipp darauf legt die Option in der Eigenschaft an (mit der nächsten Farbe der Reihe, wie in den Einstellungen) und setzt sie gleich im Eintrag. Den Umweg über die Spaltenüberschrift brauchst du dafür nicht mehr.
- **Mehrfachauswahl:** Die Liste bleibt nach jeder Wahl offen, damit du gleich die nächste Option suchen kannst. <kbd>Esc</kbd> schließt.
- **Abwählen:** Was gewählt ist, steht beim Öffnen als Chips über dem Suchfeld – auch bei langen Listen, ohne zu scrollen. ✕ am Chip entfernt den Wert. Mit der Tastatur: <kbd>Rückschritt</kbd> im leeren Suchfeld entfernt den zuletzt gewählten Wert (bei einer Auswahl leert er das Feld); <kbd>←</kbd> springt vom leeren Suchfeld zu den Chips, <kbd>←</kbd> und <kbd>→</kbd> wechseln zwischen ihnen, <kbd>Entf</kbd> oder <kbd>Rückschritt</kbd> entfernt den Chip, auf dem du stehst. Wie jede Änderung an einem Eintrag lässt sich das rückgängig machen.
- **Wer darf anlegen:** Nur wer die Eigenschaften der Datenbank ändern darf. Alle anderen, die Einträge bearbeiten (etwa in einer [verknüpften Datenbank](/views#verknuepfte-datenbanken)), finden nur vorhandene Optionen; Leser ändern nichts.
- Eine Option, die es in anderer Schreibweise schon gibt („erledigt“ neben „Erledigt“), wird nicht doppelt angelegt – die vorhandene wird gewählt. Optionen sind höchstens 100 Zeichen lang.

### Farben der Optionen

Jede Option einer Auswahl oder Mehrfachauswahl kann ihre eigene Farbe haben – Grau, Blau, Grün, Rot, Gelb, Orange, Lila, Rosa oder Türkis, dieselben Farben wie bei den [Tags](/page-tags). Die Farbe zeigt sich überall, wo der Wert steht: Tabelle, Board-Spalten, Liste, Galerie, Feed, Gruppen, Filter, im Eintrag, bei Mehrfachauswahlen in Formularen und auf veröffentlichten Seiten.

- **Ändern:** In den Einstellungen der Eigenschaft (Klick auf die Spaltenüberschrift) steht unter den Optionen jede Option als Chip – ein Klick darauf öffnet die Farben. Schneller geht es am Wert selbst: Rechtsklick auf einen Chip in der Tabelle oder auf die Überschrift einer Board-Spalte, Farbe wählen. Das wird sofort gespeichert; **Rückgängig** im Hinweis stellt die alte Farbe wieder her.
- **Neue Optionen** bekommen von selbst die nächste Farbe der Reihe – ob du sie in den Einstellungen tippst, auf dem Board eine Spalte anlegst, [beim Auswählen anlegst](#optionen-suchen-und-anlegen) oder sie per Import, API oder KI dazukommen. Eine umbenannte Option behält ihre Farbe.
- **Farben automatisch vergeben** färbt alle Optionen der Eigenschaft auf einmal der Reihe nach (vorhandene Farben werden ersetzt). **Rückgängig** daneben oder Schließen ohne Speichern verwirft das, **Speichern** übernimmt es.
- **Bestehende Datenbanken** sehen aus wie vorher, bis du Farben setzt: Optionen ohne Farbe sind grau, nur einige feste Wörter wie „Erledigt“ oder „Hoch“ sind farbig.
- **Import:** Der HTML-Export von Notion bringt die Farben der Optionen mit (Notions Braun wird Orange, „Standard“ Grau), ebenso AFFiNE; CSV, Markdown, Jira und Trello bekommen Farben der Reihe nach. Beim Verschieben oder Kopieren von Einträgen in eine andere Datenbank nehmen neue Optionen ihre Farbe mit. Der CSV-Export enthält keine Farben.
- **API und MCP:** `database.update` nimmt und liefert `optionColors`, z. B. `{"Offen": "blue"}`. Ohne `optionColors` bleiben die gespeicherten Farben, `{}` entfernt sie.
- Eine Mehrfachauswahl mit den Tags des Arbeitsbereichs ([unten](#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs)) zeigt die Farben der Tags.

### Formatierter Text

Text-Eigenschaften – alle außer dem Titel – können **fett**, *kursiv*, ~~durchgestrichen~~, `Code`, Links und Zeilenumbrüche enthalten. Es sind nur Auszeichnungen im Text, keine Blöcke: Überschriften, Listen, Zitate oder Tabellen gibt es darin nicht (dafür ist der Text des Eintrags da). Unterstreichen gibt es nicht.

- **Bearbeiten:** In der Tabelle die Zelle anklicken, im Eintrag ins Feld klicken. Ist Text markiert, erscheint darüber eine kleine Leiste mit Fett, Kursiv, Durchgestrichen, Code und Link.
- **Tastenkürzel:** ++⌘ B++ fett, ++⌘ I++ kursiv, ++⌘ ⇧ X++ durchgestrichen, ++⌘ E++ Code, ++⌘ K++ verlinkt den markierten Text (ohne Markierung öffnet ++⌘ K++ wie überall die Schnellsuche). Links gehen nur auf `http`, `https` und `mailto`; aus `example.com` wird `https://example.com`, aus einer E-Mail-Adresse ein `mailto:`-Link. Ein leeres Feld entfernt den Link.
- **Zeilenumbruch:** ++⇧ Enter++. In einer Tabellenzelle beendet <kbd>Enter</kbd> die Bearbeitung und speichert, <kbd>Esc</kbd> verwirft sie. Im Eintrag, im Feed und beim Bearbeiten über einen Freigabelink macht auch <kbd>Enter</kbd> einen Zeilenumbruch; gespeichert wird beim Verlassen des Felds.
- **Anzeige:** formatiert in Tabelle, Board, Galerie, Liste, Feed, im Eintrag, auf veröffentlichten Seiten und in eingebetteten Ansichten. In Tabellenzellen und auf Karten steht ein Zeilenumbruch als Leerzeichen (die Zeile bleibt eine Zeile), im Eintrag und im Feed mit Umbruch. Links öffnen in einem neuen Tab; auf Karten, die selbst ein Link sind, bleiben sie Text.
- **Als reiner Text** zählt der Wert bei Suche, Filtern (*enthält* …), Sortierung, Gruppierung, Formeln (`prop("Notiz")` liefert den Text ohne Formatierung), beim Kopieren in die Zwischenablage, im CSV-Export, in den Widgets der Apps und in Platzhaltern von Vorlagen und Automationen.
- **Einfügen** aus Word, Google Docs oder Webseiten behält Fett, Kursiv, Durchgestrichen, Code und Links; Überschriften werden fett, Absätze und Listenpunkte zu Zeilenumbrüchen, Bilder und Tabellen fallen weg.
- **Import und Export:** CSV (auch Notion-Exporte), Jira und Trello, vCards, LDAP und Formularantworten sind reiner Text – Sternchen und Unterstriche bleiben, wie sie geschrieben sind. Tabellen aus AFFiNE und Tabellen aus Dokumenten (**In Datenbank umwandeln**) behalten ihre Formatierung. Der Markdown-Export schreibt die Formatierung als Markdown, der CSV-Export reinen Text. Ältere Inhaltsarchive kommen als reiner Text herein.
- **Bestehende Werte** aus der Zeit vor dieser Funktion sehen aus wie vorher: `*Sternchen*` bleibt mit Sternchen.
- **Typ ändern:** Wird eine andere Eigenschaft zu Text, bleiben ihre Werte, wie sie geschrieben sind; wird Text zu einem anderen Typ, zählt der Text ohne Formatierung.
- **API und MCP:** Der Wert ist ein String mit Inline-Markdown: `**fett**`, `_kursiv_` (auch `*kursiv*`), `~~durchgestrichen~~`, `` `Code` ``, `[Text](https://…)` und `\n` für einen Zeilenumbruch. Ein Backslash hält `` \ * _ ~ ` [ ] `` als Zeichen fest – reinen Text also maskiert senden. Links mit anderen Schemata (etwa `javascript:`) zeigen nur ihren Text; `# ` oder `- ` am Anfang bleiben Text. Der Titel ist reiner Text.

### Mehrfachauswahl mit den Tags des Arbeitsbereichs

Eine Mehrfachauswahl kann statt einer eigenen Liste die **Tags des Arbeitsbereichs** als Optionen haben – dieselben Tags, die auch Seiten tragen. In den Einstellungen der Eigenschaft (Klick auf die Spaltenüberschrift) unter **Optionen** zwischen **Eigene Liste** und **Tags des Arbeitsbereichs** wählen.

- Die Eigenschaft bietet die Tags an, die im Bereich der Datenbank gelten – die des ganzen Arbeitsbereichs und die des Bereichs (siehe [Geltungsbereich](/page-tags#geltungsbereich-arbeitsbereich-oder-bereich)) –, mit ihren Farben und in ihrer Reihenfolge; ein neuer Tag aus einem Eintrag gehört zum Bereich der Datenbank; Zellen, Board-Spalten und Karten zeigen die Tag-Farben. Im Eintrag wählst du mit **+ Tag** wie auf Seiten: Tippen schlägt passende Tags vor, <kbd>Enter</kbd> übernimmt.
- Gibt es einen eingegebenen Wert noch nicht, legt er den Tag an – wie auf Seiten dürfen das Mitglieder mit Bearbeitungsrecht. Leser, Gäste und Lese-Tokens wählen nur vorhandene Tags. Auf dem Board legt **+ Gruppe** bei so einer Eigenschaft einen neuen Tag an.
- Es bleibt eine Mehrfachauswahl: Filter, Sortierung, Gruppierung, Board-Spalten, Formeln, Automationen, Import und Export (Markdown, CSV, Git), API und MCP funktionieren wie gewohnt. Gespeichert werden die Tag-Namen.
- **Umbenennen, Zusammenführen und Löschen** eines Tags (Einstellungen → Tags & Eigenschaften) ändert alle Einträge mit diesem Tag gleich mit: Ein umbenannter Tag erscheint unter seinem neuen Namen, beim Zusammenführen wird aus dem einen Tag der andere (ohne Doppel), ein gelöschter Tag verschwindet aus den Einträgen. Filter und Board-Spalten der Ansichten folgen; vorher sichert Flowplan einen Stand jeder betroffenen Datenbank im Versionsverlauf.
- Einträge mit Tags erscheinen in der [Tag-Ansicht](/page-tags#tag-ansicht) neben den Seiten und werden mit `#Tag` / `-#Tag` in der Suche gefunden.
- **Umstellen** einer vorhandenen Mehrfachauswahl auf die Tags: Ihre Optionen werden den Tags zugeordnet (ohne Rücksicht auf Groß-/Kleinschreibung), fehlende Tags werden angelegt; die Werte der Einträge bleiben und tragen danach den genauen Namen des Tags. **Zurück auf „Eigene Liste“** werden die Tags zu eigenen Optionen – die verwendeten zuerst, höchstens 100; die Werte bleiben. Die Optionen behalten dabei die Farben der Tags.
- Gäste sehen als Optionen nur die Tags, die in den für sie freigegebenen Einträgen vorkommen, und legen keine an. Über Freigabelinks bietet ein Eintrag nur seine eigenen Tags an.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es diese Option nicht (wie Tags auf Seiten).
