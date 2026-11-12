---
keywords: Knoten, Auslöser, Aktion, Bedingung, Schleife, HTTP
filter: true
---

# Workflow-Knoten

Alle Knoten, die ein [Workflow](/workflows) kennt – mit Typ (so steht er im JSON und in der API), Ausgängen und den Ausgaben, die spätere Knoten als Platzhalter nutzen.

Diese Liste wird aus dem Knotenkatalog von Flowplan erzeugt; die Einstellungen jedes Knotens als JSON Schema liefert `GET /api/workflows/catalog`.

## Auslöser

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Neuer Eintrag ⚡ | `trigger.record.created` | Ein Eintrag wird in einer Datenbank angelegt. | out | `record`, `actor`, `via` |
| Eintrag geändert ⚡ | `trigger.record.changed` | Eigenschaften eines Eintrags ändern sich. | out | `record`, `before`, `changed`, `actor` |
| Eintrag erledigt ⚡ | `trigger.record.done` | Ein Eintrag wird erledigt. | out | `record`, `actor` |
| Datum erreicht | `trigger.record.date` | Ein Datum eines Eintrags ist erreicht oder überfällig. | out | `record`, `date` |
| Formularantwort ⚡ | `trigger.form.submitted` | Jemand schickt das Formular einer Datenbank ab. | out | `record`, `answers`, `respondent` |
| Zeitplan | `trigger.schedule` | Täglich, wöchentlich oder monatlich zu einer Uhrzeit. | out | `slot` |
| Neue Seite | `trigger.page.created` | Eine Seite wird angelegt. | out | `page`, `actor` |
| Seite geändert | `trigger.page.changed` | Titel oder Inhalt einer Seite ändert sich (2 Minuten nach der letzten Änderung). | out | `page`, `actor`, `changes` |
| Seite verschoben | `trigger.page.moved` | Eine Seite bekommt eine neue Elternseite oder einen neuen Bereich. | out | `page`, `from`, `to`, `actor` |
| Tag hinzugefügt | `trigger.page.tagged` | Eine Seite bekommt einen Tag. | out | `page`, `tag`, `actor` |
| Neuer Kommentar | `trigger.comment.created` | Jemand kommentiert eine Seite oder einen Eintrag. | out | `comment`, `page`, `record`, `actor` |
| Erwähnung | `trigger.mention` | Jemand wird in einer Seite, einem Eintrag oder Kommentar erwähnt. | out | `page`, `record`, `mentioned`, `actor` |
| Manuell starten | `trigger.manual` | Startet über „Ausführen“, die API oder einen Knopf. | out | `inputs`, `startedBy`, `source` |
| Eingehender Webhook | `trigger.webhook` | Ein anderer Dienst ruft die Adresse des Workflows auf. | out | `body`, `query`, `headers`, `receivedAt` |
| E-Mail empfangen | `trigger.mail.received` | Eine E-Mail kommt an einer Adresse an, die an diesen Workflow geht. | out | `mail`, `authenticated` |
| Neuer Journaltag | `trigger.journal.day` | Die Seite eines Tages wird im Journal angelegt. | out | `day`, `date`, `journal` |

## Logik

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Wenn ⚡ | `logic.if` | Verzweigt nach Bedingungen. | true, false | `matched` |
| Werte setzen ⚡ | `logic.set` | Benannte Werte für spätere Knoten. | out | – |
| Beenden ⚡ | `logic.stop` | Beendet den Lauf erfolgreich oder als Fehler. | – | – |
| Unterscheiden ⚡ | `logic.switch` | Verzweigt nach dem ersten passenden Fall. | case:…, default | `case` |
| Für jedes | `logic.foreach` | Führt die folgenden Knoten für jedes Element einer Liste aus. | item, done | `count`, `results` |
| Warten | `logic.wait` | Wartet eine Dauer, bis zu einem Zeitpunkt oder bis zur nächsten Uhrzeit. | out | `waitedUntil` |
| Freigabe | `logic.approval` | Wartet, bis eine Person genehmigt oder ablehnt. | approved, rejected, timeout | `decidedBy`, `comment`, `decidedAt` |

## Einträge

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Eintrag anlegen | `action.record.create` | Legt einen Eintrag in einer Datenbank an. | out | `record` |
| Eintrag ändern ⚡ | `action.record.update` | Ändert Eigenschaften eines Eintrags. | out | `record`, `before` |
| Einträge finden | `action.record.find` | Sucht Einträge nach Bedingungen. | out | `records`, `first`, `count` |
| Vorlage anwenden ⚡ | `action.record.template` | Wendet eine Eintragsvorlage auf einen Eintrag an. | out | `record` |

## Seiten

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Seite anlegen | `action.page.create` | Legt eine Seite unter einer Elternseite an, auf Wunsch aus einer Seitenvorlage. Der Titel (mit Platzhaltern) gilt auch dann; der Name der Vorlage nur, wenn er leer bleibt. | out | `page` |
| An Seite anhängen | `action.page.append` | Fügt Blöcke am Ende, am Anfang oder unter einer Überschrift ein. | out | `page`, `appended` |
| Seite taggen | `action.page.tag` | Fügt einer Seite Tags hinzu oder entfernt sie. | out | `page` |
| Seite verschieben | `action.page.move` | Verschiebt eine Seite unter eine neue Elternseite. | out | `page` |
| Aufgabe erstellen | `action.task.create` | Schreibt eine Aufgabe in eine Seite, auf Wunsch mit Person und Fälligkeit. | out | `page`, `task` |

**Aufgabe erstellen** schreibt eine Aufgabe in eine gewählte Seite (oder eine aus einem Platzhalter) oder in die eigene Aufgabenseite der Person, als die der Workflow läuft (die Seite „Aufgaben“ aus **Meine Aufgaben**, beim ersten Mal angelegt). Text und Fälligkeit dürfen Platzhalter enthalten; als Person geht eine einzelne – die ausführende Person, wer den Workflow ausgelöst hat, eine Personen-Eigenschaft des Eintrags oder ein Mitglied. Mit **Unter der Überschrift** kommt die Aufgabe ans Ende des Abschnitts unter dieser Überschrift (fehlt sie, wird sie am Ende angelegt); aufeinanderfolgende Aufgaben landen in derselben Liste. Der Knoten handelt mit den Rechten der ausführenden Person: Die Person muss die Zielseite öffnen können, die eigene Aufgabenseite ist privat und nur für die ausführende Person selbst; gesperrte Seiten, Journale mit PIN und verschlüsselte Bereiche lehnt er ab. Ein Probelauf zeigt, was geschrieben würde, und ändert nichts.

## Benachrichtigen

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Person benachrichtigen ⚡ | `notify.person` | Benachrichtigung in der App, per Push, E-Mail oder Chat-App. | out | `notified` |
| E-Mail senden | `notify.email` | Schickt eine E-Mail an Personen oder Adressen. | out | `sent` |
| Chat-Nachricht | `notify.chat` | Postet in einen Chat-Webhook des Arbeitsbereichs (Slack, Matrix, Teams, Discord). | out | `sent` |

## KI

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| KI: Zusammenfassen | `ai.summarize` | Fasst einen Text zusammen. | out | `summary` |
| KI: Einordnen | `ai.classify` | Ordnet einen Text einer der Kategorien zu. | out, unclear | `category`, `categories`, `confidence` |
| KI: Felder auslesen | `ai.extract` | Liest benannte Werte aus einem Text. | out | `fields`, `missing` |
| KI: Eigene Anweisung | `ai.prompt` | Eine eigene Anweisung, Antwort als Text oder JSON. | out | `text`, `json` |

## HTTP

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| HTTP-Anfrage | `http.request` | Ruft eine HTTPS-Adresse auf (fester Host). | out | `status`, `headers`, `body`, `json` |

⚡ – kann im Sofortteil laufen: direkt beim Speichern eines Eintrags, in derselben Änderung.

Jeder Knoten kann **Bei Fehler** wiederholen (bis 5-mal), den Lauf beenden, über den Ausgang `error` weitergehen oder den Fehler übergehen.
