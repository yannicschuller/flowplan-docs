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
| An Journaltag anhängen | `action.journal.append` | Schreibt Markdown mit Platzhaltern in den heutigen, gestrigen oder einen bestimmten Tag eines Journals – am Ende oder unter einer Überschrift. Fehlt der Tag, wird er wie beim Öffnen angelegt. | out | `day`, `date`, `journal`, `created`, `completed` {since=0.9.6} |
| Journaltag lesen | `action.journal.read` | Liest den heutigen, gestrigen oder einen bestimmten Tag eines Journals – seinen Text und was „An diesem Tag erledigt“ wurde – zum Beispiel für einen KI-Schritt. Ändert nichts. | out | `content`, `completed`, `day`, `date`, `journal`, `found` {since=0.9.6} |

**Aufgabe erstellen** schreibt eine Aufgabe in eine gewählte Seite (oder eine aus einem Platzhalter) oder in die eigene Aufgabenseite der Person, als die der Workflow läuft (die Seite „Aufgaben“ aus **Meine Aufgaben**, beim ersten Mal angelegt). Text und Fälligkeit dürfen Platzhalter enthalten; als Person geht eine einzelne – die ausführende Person, wer den Workflow ausgelöst hat, eine Personen-Eigenschaft des Eintrags oder ein Mitglied. Mit **Unter der Überschrift** kommt die Aufgabe ans Ende des Abschnitts unter dieser Überschrift (fehlt sie, wird sie am Ende angelegt); aufeinanderfolgende Aufgaben landen in derselben Liste. Der Knoten handelt mit den Rechten der ausführenden Person: Die Person muss die Zielseite öffnen können, die eigene Aufgabenseite ist privat und nur für die ausführende Person selbst; gesperrte Seiten, Journale mit PIN und verschlüsselte Bereiche lehnt er ab. Ein Probelauf zeigt, was geschrieben würde, und ändert nichts.

**An Journaltag anhängen** schreibt in einen Tag eines Journals. **Tag**: **Heute** oder **Gestern** – in der Zeitzone des Workflows (Workflow-Einstellungen), wie `$today` – oder **Ein bestimmtes Datum** aus einem Datum oder einem Platzhalter (etwa ein Datumsfeld des Eintrags; bei einem Zeitpunkt zählt dessen Tag in dieser Zeitzone). Künftige Tage lehnt der Schritt ab. **Inhalt** ist Markdown – Überschriften, Listen, Aufgaben `- [ ]`, **fett**, Links – mit Platzhaltern. Die Werte der Platzhalter kommen als Text hinein, nie als Formatierung: Ein Wert mit `**` oder `<b>` bleibt genau so stehen, Seiten-Werte werden Links auf die Seite, Zeilenumbrüche im Wert bleiben Zeilenumbrüche. **Stelle**: **Am Ende des Tages** oder **Unter einer Überschrift** – dann ans Ende des Abschnitts unter der Überschrift mit genau diesem Text, sodass spätere Läufe der Reihe nach darunter landen; fehlt sie, ans Ende des Tages. Leere Zeilen am Ende (aus der Vorlage) bleiben unter dem neuen Text. Gibt es den Tag noch nicht, legt der Schritt ihn an: den neuesten Tag so, wie das Öffnen es täte – mit der Vorlage und den offenen Aufgaben des Vortags an der Stelle, die [Übernommene Aufgaben](/journal#tagesvorlage) vorgibt (auch bei „Beim ersten Schreiben“); einen Tag vor einem späteren nur mit der Vorlage, denn dessen Aufgaben sind schon weitergezogen. Ein Tag im Papierkorb bleibt dort, der Schritt schlägt dann fehl. Der Schritt handelt mit den Rechten der ausführenden Person: Sie muss das Journal bearbeiten dürfen; Journale mit PIN, gesperrte Seiten und verschlüsselte Bereiche lehnt er ab. Ausgaben: `day` (die Tagesseite, für Links in späteren Schritten), `date`, `journal` und `created` (ob der Tag gerade angelegt wurde). Ein Probelauf zeigt Tag, Datum und Stelle und ändert nichts – er legt auch keinen Tag an.

{since=0.10.0} Einen leeren Tag, den das Journal selbst in den Papierkorb gelegt hat (siehe [Wie ein Tag entsteht](/journal#wie-ein-tag-entsteht)), holt **An Journaltag anhängen** zurück und schreibt hinein; nur ein Tag, den eine Person gelöscht hat, lässt den Schritt fehlschlagen.

**Journaltag lesen** gibt einen Journaltag an die folgenden Schritte weiter – praktisch, wenn dein Workflow manuell oder per Zeitplan startet und ein KI-Schritt den Tag kennen soll. Journal und Tag wählst du wie bei **An Journaltag anhängen**. Setz `{{…content}}` in die Anweisung, dann bekommt die KI den Text des Tages und die Liste „An diesem Tag erledigt“, so wie du sie unter dem Tag siehst (Nur meine/Alle). `completed` enthält nur die Liste, `found` ist `false`, wenn es den Tag noch nicht gibt (die Liste zählt trotzdem). Der Schritt liest mit den Rechten der ausführenden Person; Journale mit PIN und verschlüsselte Bereiche lehnt er ab. **Neuer Journaltag** und **An Journaltag anhängen** liefern die Liste ebenfalls als `completed`, etwa `{{trigger.completed | join: "\n"}}`. {since=0.9.6}

**Zeitzone und „Heute“**: Uhrzeiten im **Zeitplan** gelten in der Zeitzone des Workflows – neue Workflows bekommen die Zeitzone der Person, die sie anlegt; ändern kannst du sie in den Workflow-Einstellungen unter **Zeitzone**. Weicht sie von deiner ab, zeigt der Zeitplan sie an, etwa „täglich · 23:55 (UTC)“. **Heute** ist bei allen Schritten eines Laufs derselbe Tag: der Tag, an dem der Lauf begann (nach einer Wartezeit oder Freigabe der Tag, an dem er weiterläuft) – auch wenn ein Schritt erst nach Mitternacht dran ist. Ältere Workflows stehen auf UTC, bis du die Zeitzone änderst. {since=0.10.0}

## Benachrichtigen

| Knoten | Typ | Was er tut | Ausgänge | Ausgaben |
| --- | --- | --- | --- | --- |
| Person benachrichtigen ⚡ | `notify.person` | Benachrichtigung in der App, per Push, E-Mail oder Chat-App. | out | `notified` |
| E-Mail senden | `notify.email` | Schickt eine E-Mail an Personen oder Adressen. | out | `sent` |
| Chat-Nachricht | `notify.chat` | Postet in einen Chat-Webhook des Arbeitsbereichs (Slack, Matrix, Teams, Discord). | out | `sent` |

**Empfänger aus Eigenschaften**: Personen-Eigenschaften des Eintrags zählen als Empfänger nur, wenn die ausführende Person sie lesen darf. {since=0.11.5}

**Formatierte Nachricht**: Die Nachricht von **Person benachrichtigen** formatierst du wie [Formularbeschreibungen](/forms) – Text markieren und in der Leiste **fett**, *kursiv*, unterstrichen, durchgestrichen, Code oder Link wählen (⌘/Strg B, I, U, ⇧X, E, K), Enter beginnt eine neue Zeile. Mit `@` (oder dem @-Knopf daneben) erwähnst du ein Mitglied des Arbeitsbereichs: Die Person steht als Chip im Text, wird dadurch aber **nicht benachrichtigt** – Empfänger sind nur die unter **An**. `$x^2$` wird eine Formel wie die Inline-Formeln im Editor; die Leiste macht markierten Text mit **Als Formel** zur Formel. Platzhalter fügst du wie gewohnt mit `{}` oder `{{` ein; sie stehen als Chips im Text, ein Klick macht sie wieder zu Text (etwa für einen Filter). Ihre Werte kommen immer als Text hinein, nie als Formatierung: Ein Titel mit `**`, `$`, `@` oder `[Text](javascript:…)` bleibt genau so stehen – Daten von außen oder eine KI-Antwort können weder Links noch Erwähnungen hinzufügen. Links gehen nur mit http, https oder mailto. Der Posteingang zeigt die Nachricht formatiert: Links öffnen in einem neuen Tab, Erwähnungen sind Personen-Chips, Formeln werden gesetzt. E-Mails sind ebenfalls formatiert, mit der Formel als LaTeX-Text und Erwähnungen als „@Name“. Push, Chat-Apps, die Widgets der Apps und die API bekommen den reinen Text: die Formel als LaTeX, die Erwähnung als „@Name“, einen Link als „Text (Adresse)“. Wer den Arbeitsbereich verlassen hat, erscheint als einfaches „@Name“. Ein Text, der schon vorher Zeichen wie `**` oder `_…_` enthielt, zeigt sie ab jetzt als Formatierung. {since=0.10.0}

**E-Mails nach außen**: An Mitglieder geht eine E-Mail immer. An eine Adresse außerhalb der Mitglieder, die fest im Knoten steht, geht sie, solange die Administration E-Mails nach außen erlaubt. Kommt die Adresse aus einem Platzhalter oder einer Eigenschaft – einer Formularantwort, dem Absender einer E-Mail, einer KI-Antwort –, braucht es zusätzlich den Schalter **… auch an Adressen aus Platzhaltern** in der [Administration](/administration#workflows) (`FLOWPLAN_WORKFLOW_EXTERNAL_MAIL_DYNAMIC`), standardmäßig aus; die Prüfung weist auf solche Knoten hin. Bestimmen Daten von außen den Empfänger, braucht der Workflow außerdem die [Einstellung dafür](/workflows#einstellungen-des-workflows). {since=0.10.0}

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

**Hosts und Weiterleitungen**: Der Host steht als fester Text im Knoten; Platzhalter gehen nur in Pfad, Abfrage, Kopfzeilen und Inhalt. Ein Lauf ruft nur die Hosts auf, die in seiner aktivierten Version fest in den HTTP-Knoten stehen (ein Test die des Entwurfs). Leitet ein Dienst mit 307 oder 308 auf einen anderen Ursprung weiter, geht der Inhalt nicht mit, und die eigenen Kopfzeilen des Knotens – etwa ein eingetragener API-Schlüssel – gehen nur an seinen eigenen Ursprung; 303 sowie 301 und 302 nach einem POST werden wie bisher zu einem GET. Eine KI-Antwort in Pfad oder Abfrage meldet die Prüfung als Hinweis. {since=0.10.0}

⚡ – kann im Sofortteil laufen: direkt beim Speichern eines Eintrags, in derselben Änderung. Einen Eintrag, den die ausführende Person nur ansehen darf, schreibt der Sofortteil nicht. {since=0.11.5}

Jeder Knoten kann **Bei Fehler** wiederholen (bis 5-mal), den Lauf beenden, über den Ausgang `error` weitergehen oder den Fehler übergehen.
