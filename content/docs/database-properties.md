---
keywords: Eigenschaft, Feld, Spalte, Typ, Auswahl, Mehrfachauswahl, Rich Text
---

# Eigenschaften von Datenbanken

Die Eigenschaftstypen einer Datenbank im Überblick, formatierter Text in Feldern und Mehrfachauswahlen mit den Tags des Arbeitsbereichs.

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

### Eigenschaften im Eintrag einklappen

Unter dem Titel eines Eintrags klappt der Pfeil **Eigenschaften** die Eigenschaften zu einer Zeile zusammen: die zwei bis drei wichtigsten Werte als kleine Chips (zuerst der Status, dann Auswahl, Datum und Person) und „+4 Eigenschaften“. Ein Tipp auf die Zeile klappt sie wieder auf. Der Inhalt des Eintrags rückt so nach oben – gerade auf dem Telefon.

- Die Wahl gilt für **alle Einträge der Datenbank** und wird in deinem Konto gespeichert, **getrennt für Telefon und Computer**: Wer auf dem Telefon einklappt, sieht am Computer weiter alles.
- Ohne eigene Wahl sind die Eigenschaften am Computer aufgeklappt, auf dem Telefon eingeklappt, sobald der Eintrag mehr als vier Eigenschaften zeigt. Ein gerade angelegter Eintrag öffnet immer aufgeklappt, damit du ihn ausfüllen kannst.
- Einklappen ändert keine Werte und keine Rechte und gilt nur für dich. Drucken und Exporte zeigen immer alle Eigenschaften – außer du schaltest sie in den [Druckoptionen](/print-and-pdf#drucken-und-pdf) ab.
- Für normale Seiten gibt es dasselbe in der [Leiste mit Tags und Eigenschaften](/page-tags#leiste-einklappen).

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

- Die Eigenschaft bietet die Tags an, die im Bereich der Datenbank gelten – die des ganzen Arbeitsbereichs und die des Bereichs (siehe [Geltungsbereich](/page-tags#geltungsbereich-arbeitsbereich-oder-bereich)) –, mit ihren Farben und in ihrer Reihenfolge; ein neuer Tag aus einem Eintrag gehört zum Bereich der Datenbank; Zellen, Board-Spalten und Karten zeigen die Tag-Farben. Im Eintrag wählst du mit **+ Tag** wie auf Seiten: Tippen schlägt passende Tags vor, <kbd>Enter</kbd> übernimmt.
- Gibt es einen eingegebenen Wert noch nicht, legt er den Tag an – wie auf Seiten dürfen das Mitglieder mit Bearbeitungsrecht. Leser, Gäste und Lese-Tokens wählen nur vorhandene Tags. Auf dem Board legt **+ Gruppe** bei so einer Eigenschaft einen neuen Tag an.
- Es bleibt eine Mehrfachauswahl: Filter, Sortierung, Gruppierung, Board-Spalten, Formeln, Automationen, Import und Export (Markdown, CSV, Git), API und MCP funktionieren wie gewohnt. Gespeichert werden die Tag-Namen.
- **Umbenennen, Zusammenführen und Löschen** eines Tags (Einstellungen → Tags & Eigenschaften) ändert alle Einträge mit diesem Tag gleich mit: Ein umbenannter Tag erscheint unter seinem neuen Namen, beim Zusammenführen wird aus dem einen Tag der andere (ohne Doppel), ein gelöschter Tag verschwindet aus den Einträgen. Filter und Board-Spalten der Ansichten folgen; vorher sichert Flowplan einen Stand jeder betroffenen Datenbank im Versionsverlauf.
- Einträge mit Tags erscheinen in der [Tag-Ansicht](/page-tags#tag-ansicht) neben den Seiten und werden mit `#Tag` / `-#Tag` in der Suche gefunden.
- **Umstellen** einer vorhandenen Mehrfachauswahl auf die Tags: Ihre Optionen werden den Tags zugeordnet (ohne Rücksicht auf Groß-/Kleinschreibung), fehlende Tags werden angelegt; die Werte der Einträge bleiben und tragen danach den genauen Namen des Tags. **Zurück auf „Eigene Liste“** werden die Tags zu eigenen Optionen – die verwendeten zuerst, höchstens 100; die Werte bleiben.
- Gäste sehen als Optionen nur die Tags, die in den für sie freigegebenen Einträgen vorkommen, und legen keine an. Über Freigabelinks bietet ein Eintrag nur seine eigenen Tags an.
- In [verschlüsselten Bereichen](/encrypted-spaces) gibt es diese Option nicht (wie Tags auf Seiten).
