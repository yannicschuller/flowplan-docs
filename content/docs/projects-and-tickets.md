---
keywords: Projekt, Ticket, Sprint, Scrum, Jira, Epic, Zeiterfassung, Automation, Fälligkeitsdatum, erledigt
new: wann-ist-ein-eintrag-faellig 2026-11-13
---

# Projekte, Tickets und Sprints

Werkzeuge für Teams, die mit Tickets arbeiten – alle optional: Eine Datenbank verhält sich wie bisher, bis du eines davon einrichtest.

Die meisten findest du im Menü **…** rechts in der Werkzeugleiste einer Datenbank: Datensatzvorlagen, **Automationen**, **Statusregeln und Erledigt**, **Zeiten auswerten** und **Git-Anbindung**.

**Mehr zum Thema:** [Git und Issues](/git-and-issues)

## Ticketnummern

Eine Eigenschaft vom Typ **ID (Ticketnummer)** zeigt für jeden Eintrag eine fortlaufende Nummer wie `WEB-123`.

- Das **Präfix** wählst du beim Anlegen; es ist im Arbeitsbereich eindeutig. Eine kopierte Datenbank, eine aus einer Vorlage angelegte und eine wiederhergestellte, deren Präfix inzwischen vergeben ist, bekommen das nächste freie (`WEB2`, `WEB3`, …).
- Nummern werden nie doppelt vergeben, auch nicht nach dem Löschen. Ein wiederhergestellter Eintrag behält seine Nummer.
- **Im Text** wird `WEB-123` in jedem Dokument hervorgehoben: Beim Darüberfahren siehst du Titel und Status, <kbd>⌘</kbd>/<kbd>Strg</kbd>-Klick öffnet den Eintrag. Das klappt auch für Text, der vor der ID-Eigenschaft geschrieben wurde.
- Die **Suche** findet Einträge über ihre Nummer, und **Git-Commits** können darauf verweisen (siehe unten).

## Unteraufgaben und Epics

Der Typ **Übergeordneter Eintrag (Unteraufgaben)** lässt Einträge unter einem anderen Eintrag derselben Datenbank stehen – etwa Epic → Story → Aufgabe. Schleifen lehnt Flowplan ab.

- **Im Eintrag** listet der Abschnitt **Unteraufgaben** alle darunterliegenden Einträge mit ihrem Stand; neue legst du dort direkt an.
- **In Tabellen** zeigt **Ansicht → Unteraufgaben als Baum zeigen** die Einträge eingerückt und auf- und zuklappbar.
- **Fortschritt der Unteraufgaben** ist eine eigene Eigenschaft: Sie zeigt den erledigten Anteil über alle Ebenen als Balken.
- **Auf Boards** entstehen Epic-Swimlanes mit **Swimlanes nach** und der Eigenschaft für den übergeordneten Eintrag.

## Wann ist ein Eintrag erledigt?

Sprints, Fortschritt, überfällige Einträge und „Meine Aufgaben“ müssen wissen, wann ein Eintrag erledigt ist. Flowplan erkennt das selbst:
- an einer Status-Auswahl mit einer Option wie „Erledigt“, „Done“, „Terminé“, „Fermé“, „Completato“, „Hecho“ oder „已完成“,
- sonst an einer Checkbox „Erledigt“ (oder „Done“, „Terminé“ …).

Unter **… → Statusregeln und Erledigt** legst du es fest, wenn es anders sein soll. Status wie „Abgelaufen“, „Expiré“ oder „Utilisé“ zählen nicht von selbst als erledigt – sollen sie das, hakst du sie dort an.

## Wann ist ein Eintrag fällig?

„Meine Aufgaben“, die Erinnerungen an fällige Einträge (auch die tägliche Übersicht für Chat-Apps und Webhooks), die Widgets der App und die Schnellerfassung nehmen das Fälligkeitsdatum einer Datenbank. Unter **… → Statusregeln und Erledigt → Fälligkeitsdatum** wählst du:
- **Automatisch** (Standard): eine Datums-Eigenschaft, die wie ein Fälligkeitsdatum heißt – etwa „Fällig“, „Deadline“, „Frist“, „Échéance“, „Date limite“, „Scadenza“, „Vencimiento“ oder „截止日期“, danach Namen wie „Termin“, „Gültig bis“ oder „Fin de validité“ –, sonst die erste Datums-Eigenschaft. Die Auswahl zeigt, welche das gerade ist.
- **Eine bestimmte Datums-Eigenschaft**, z. B. „Fin de validité“ statt „Date d'achat“.
- **Kein Fälligkeitsdatum**: Einträge erscheinen ohne Datum in „Meine Aufgaben“ und in den Widgets und lösen keine Erinnerungen an Fälligkeiten aus.

Wird die gewählte Eigenschaft gelöscht, gilt wieder **Automatisch**.

## Statusregeln

Im selben Dialog schaltest du **Erlaubte Wechsel und Pflichtfelder festlegen** ein:

- **Erlaubte Wechsel**: In der Tabelle „von (Zeile) nach (Spalte)“ nimmst du Haken weg, etwa „Offen → Erledigt“. Dann muss ein Eintrag erst „In Arbeit“ gewesen sein.
- **Pflichtfelder**: Ein Status braucht bestimmte Eigenschaften – z. B. „Erledigt nur mit Lösung“.
- **Nur Verantwortliche**: Manche Status setzen nur Personen mit der Rolle *Verantwortlich* der Datenbank.

Die Regeln gelten überall: in Tabelle und Board, bei Sammeländerungen, für Gäste und für die Git-Anbindung. Ein Wechsel, der nicht passt, wird mit einer Erklärung abgelehnt.

## Automationen

**… → Automationen** erledigt wiederkehrende Handgriffe nach dem Muster *Wenn … nur wenn … dann …*:

- **Wenn**: ein Eintrag erstellt wird, ein Eintrag über ein Formular kommt, sich eine Eigenschaft ändert (wahlweise auf einen bestimmten Wert), ein Datum überschritten ist oder es nach Zeitplan so weit ist (siehe [Geplante Automationen](#geplante-automationen)).
- **Nur wenn** (optional): Bedingungen wie „Priorität ist Hoch“ oder „Zuständig ist leer“.
- **Dann**: Eigenschaften setzen, benachrichtigen oder eine **Vorlage anwenden**.
  - Werte für Eigenschaften können fest sein oder *heute*, *jetzt*, *die auslösende Person* oder *der Ersteller* lauten.
  - Benachrichtigt werden können die Person in einer Personen-Eigenschaft, der Ersteller, die auslösende Person oder ein bestimmtes Mitglied.
  - **Vorlage anwenden** setzt eine [Datensatzvorlage](/templates#datensatzvorlagen) auf den auslösenden Eintrag – mit ausgefüllten [Platzhaltern](/templates#platzhalter). Wahlweise **nur wenn der Inhalt leer ist** (vorhandener Text bleibt dann unberührt) oder **unten anhängen**. Leere Eigenschaften erhalten die Werte der Vorlage. Jede Regel wendet eine Vorlage pro Eintrag nur einmal an – auch wenn der Status später hin- und herwechselt.

Vorschläge legen die üblichen Regeln mit einem Klick an:
- „Wenn Status → Erledigt, Datum setzen“,
- „Wenn die Fälligkeit überschritten ist, benachrichtigen“,
- „Neue Formular-Einträge zuweisen“,
- „Wenn Status → Genehmigt, Vorlage anwenden“ (wenn die Datenbank Datensatzvorlagen hat).

Beispiel: *Wenn* Status sich auf „Genehmigt“ ändert, *nur wenn* Firma nicht leer ist, *dann* Vorlage „Kickoff“ anwenden. Jeder genehmigte Eintrag bekommt so seine Kickoff-Seite mit Firmenname und Termin. Angewendete Vorlagen stehen im [Aktivitätsprotokoll](/administration#aktivitaetsprotokoll) (`row.template.applied`).

Regeln lassen sich einzeln ausschalten.

### Im Canvas öffnen: aus einer Regel wird ein Workflow

Reicht eine Regel nicht mehr – mehrere Schritte, Warten, Freigaben, KI, E-Mails oder andere Dienste –, öffnet das Symbol **Im Canvas öffnen** neben der Regel sie als [Workflow](/workflows): eine Workflow-Seite neben der Datenbank mit der Regel als Entwurf. Die Regel läuft weiter, bis du den Workflow aktivierst; dann wird sie in derselben Änderung durch einen Verweis ersetzt („Erweitert als Workflow“). So läuft nie beides und nie keins von beiden.

Der Unterschied: Eine Regel handelt für die Datenbank, ein Workflow läuft als die Person, die ihn aktiviert – der Aktivieren-Dialog sagt das.

> [!NOTE]
> Regeln laufen auf dem Server, egal wie ein Eintrag sich ändert. Was eine Regel ändert, löst keine weiteren Regeln aus – so entstehen keine Schleifen. Überfällige Einträge prüft Flowplan alle paar Minuten; jede Regel meldet sich einmal je Eintrag und Datum. Benachrichtigungen erscheinen als „Automationen in Datenbanken“ und lassen sich in den Einstellungen abstellen.

### Geplante Automationen

Mit dem Auslöser **es so weit ist (Zeitplan)** legt eine Regel regelmäßig einen neuen Eintrag an, etwa für Wochenberichte, Monatsabschlüsse oder Wartungen:

- **Wann**: täglich bzw. alle N Tage, wöchentlich bzw. alle N Wochen an einem Wochentag oder monatlich bzw. alle N Monate an einem Tag (der 31. wird in kürzeren Monaten zum letzten Tag), jeweils zu einer Uhrzeit in deiner Zeitzone. Beispiele: „Jeden Montag 09:00“, „Monatlich am 1.“, „Alle 3 Tage“.
- **Dann**: **Datensatz anlegen** aus einer Datensatzvorlage (Eigenschaften und Text) oder leer. Datumsfelder lassen sich relativ zum Termin setzen, z. B. „Fällig: +3 Tage“; 0 heißt am Tag selbst.

Der Vorschlag „Jeden Montag 09:00 einen Datensatz anlegen“ richtet das mit der Standardvorlage ein.

> [!NOTE]
> Eine geplante Regel läuft einmal je Termin – auch nach einem Neustart – und erst ab dem Zeitpunkt, an dem sie gespeichert wurde. Termine, an denen der Server nicht lief, werden nicht einzeln nachgeholt; der letzte verpasste läuft einmal. Die Einträge legt die Regel im Namen der Person an, die sie zuletzt geändert hat; hat diese kein Bearbeitungsrecht mehr oder ist die Datenbank gesperrt, ruht die Regel. Ein- und Ausschalten ändert die Person nicht.

Wiederkehrende Aufgaben, deren nächster Eintrag erst entsteht, wenn der vorige erledigt ist, stellst du im Eintrag ein, siehe [Wiederkehrende Aufgaben](/databases#wiederkehrende-aufgaben).

## WIP-Limits

In einem Board legst du unter **Ansicht → WIP-Limits** eine Höchstzahl je Spalte fest, z. B. „In Arbeit: 3“.

- Der Spaltenkopf zeigt dann `2/3`.
- Wird es mehr, ist die Spalte markiert.
- Mit **sperren** nimmt die Spalte keine weiteren Einträge an – egal, von wo sie kommen.

## Sprints

Eine Ansicht vom Typ **Sprints (Backlog und Planung)** plant Arbeit in Zeitabschnitten. **Sprints einrichten** legt beim ersten Mal die Eigenschaft „Sprint“ und den ersten Sprint an.

- **Planen**: Einträge aus dem **Backlog** in einen Sprint ziehen – mit der Maus am Eintrag, auf Touchgeräten den Griff ⋮⋮ kurz halten und ziehen –, oder über **Verschieben nach**, auch am Handy. Mit der Tastatur: Griff fokussieren, <kbd>Leertaste</kbd>, mit <kbd>↑</kbd>/<kbd>↓</kbd> den Abschnitt wählen, <kbd>Leertaste</kbd> oder <kbd>Enter</kbd> legt ab, <kbd>Esc</kbd> bricht ab.
- **Sprint**: Name, Start, Ende und Ziel; **+ Sprint** schließt den nächsten an.
- **Starten** und **Abschließen**: Beim Abschluss wählst du, wohin Offenes geht – in den nächsten Sprint oder zurück ins Backlog.
- **Umfang messen in**: Anzahl Einträge oder eine Zahl-Eigenschaft wie Story Points.
- **Burndown**: Der laufende Sprint zeigt die verbleibende Arbeit pro Tag gegen die ideale Linie.
- **Velocity**: Abgeschlossene Sprints zeigen, was geplant und was erledigt wurde.

## Zeiterfassung

Eine Eigenschaft vom Typ **Zeiterfassung** summiert die Zeit, die an einem Eintrag gearbeitet wurde. Optional zeigt sie daneben eine Schätzung aus einer Zahl-Eigenschaft in Stunden.

- **Im Eintrag**: **Start** und **Stopp** – jede Person hat höchstens einen laufenden Timer, ein neuer stoppt den alten.
- **Nachtragen**: Dauer als `45`, `1:30` oder `1,5h`, mit Datum und Notiz.
- **Korrigieren**: Eigene Einträge löschst du selbst; Verantwortliche können alle korrigieren.
- **… → Zeiten auswerten**: der Zeitbericht dieser Datenbank, umschaltbar auf den ganzen Arbeitsbereich (siehe [Zeitberichte und Abrechnung](#zeitberichte-und-abrechnung)). Den Bericht über alle Datenbanken findest du auch unter **Einstellungen → Zeiten**; dort stehen die Filter mit Beschriftung über der Auswertung, auf dem Handy zwei nebeneinander.

### Zeitberichte und Abrechnung

Der Zeitbericht fasst die Zeiteinträge einer Datenbank oder des ganzen Arbeitsbereichs zusammen.

- **Zeitraum**: Diese Woche (ab Montag), Dieser Monat, Letzter Monat oder ein eigener Zeitraum mit Start- und Enddatum (höchstens drei Jahre). Es gilt die Zeitzone des Servers.
- **Filter**: Person, Datenbank (im Arbeitsbereich), Projekt, Abrechnungsstatus und abrechenbar ja/nein. **Projekt** ist der Eintrag, auf den die erste Relation eines Eintrags zeigt (nicht die Eltern-Relation von Unteraufgaben) – etwa das Projekt einer Aufgabe. Einträge ohne Relation stehen unter **Ohne Projekt**.
- **Gruppieren** nach Person, Projekt, Eintrag, Datenbank, Tag oder Woche. Oben stehen die Summen (gesamt, offen, abgerechnet, nicht abrechenbar und – mit Stundensätzen – der Betrag), darunter ein Balkendiagramm und eine Tabelle je Gruppe. Ein Klick auf einen Balken filtert auf diese Person, dieses Projekt oder diese Datenbank.
- **Zeiteinträge**: die einzelnen Einträge mit Datum, Person, Eintrag, Projekt, Notiz, Dauer und Abrechnungsstatus (die ersten 1000; der Export enthält alle).
- **Export**: **CSV** (Komma, Dezimalpunkt) für Tabellenprogramme und Skripte, **CSV für Excel** mit Semikolon, Dezimalkomma und BOM, wie es ein deutsches Excel per Doppelklick richtig öffnet. Zellen, die eine Tabellenkalkulation als Formel ausführen würde, beginnen mit einem Apostroph.
- **Drucken** gibt Summen, Diagramm und Tabelle aus (auch als PDF speichern); aufgeklappte Zeiteinträge kommen mit.

**Wer was sieht**: Jede Person sieht ihre eigenen Zeiteinträge und die Einträge anderer an Datensätzen, die sie lesen darf. Ist die Zeiterfassungs-Eigenschaft durch die Rechte der Eigenschaft (wer sie lesen darf, siehe [Sichtbarkeit von Eigenschaften](/properties-and-formulas#sichtbarkeit-von-eigenschaften)) für jemanden verborgen, sieht er dort nur seine eigenen Zeiten. Eigene Zeiten an einem Datensatz, der inzwischen privat ist, erscheinen ohne Titel als „Eintrag ohne Zugriff“.

**Abrechnungsstatus**: Jeder Zeiteintrag ist **offen**, **abgerechnet** oder **nicht abrechenbar**. Den Status ändert, wer den Datensatz und die Zeiterfassungs-Eigenschaft bearbeiten darf – einzeln in der Liste der Zeiteinträge oder mit **Als abgerechnet markieren** für alle offenen Einträge der aktuellen Auswahl. Nicht abrechenbare Einträge bleiben dabei unverändert, laufende Timer ebenfalls. Jede Änderung steht im Aktivitätsprotokoll (`time.billing`).

**Stundensätze** (optional): Eigentümer des Arbeitsbereichs legen unter **Stundensätze** einen Satz je Person und/oder je Projekt fest, dazu die Währung (z. B. EUR, CHF). Ein Projektsatz geht dem Satz der Person vor. Beträge sehen Mitglieder mit Bearbeitungsrechten im Arbeitsbereich; Leserinnen, Leser und Gäste sehen nur Stunden.

> Über die API: `GET /api/time-reports` mit `page` oder `workspace` und denselben Filtern (`format=csv` bzw. `format=excel` für die Dateien), `POST /api/time-reports` mit `{ "action": "billing", "status": "billed", "filter": { … } }`.

## Einträge aus allen Datenbanken

**Meine Aufgaben → Einträge aus Datenbanken** zeigt Einträge aus allen Datenbanken des Arbeitsbereichs in einer Liste. Standardmäßig sind das die offenen, die dir zugewiesen sind – über irgendeine Personen-Eigenschaft.

- Filtern kannst du nach Fälligkeit, Datenbank und Text.
- Welches Datum als Fälligkeit gilt, legt jede Datenbank fest – siehe [Wann ist ein Eintrag fällig?](#wann-ist-ein-eintrag-faellig)
- **Als Ansicht speichern** macht daraus eine eigene, persönliche Ansicht, z. B. „Alle meine offenen Tickets in allen Projekten“.

## Import aus Jira und Trello

**Einstellungen → Import & Export → Import → Jira oder Trello** nimmt einen Jira-CSV-Export (alle Felder) oder einen Trello-JSON-Export.

Daraus entsteht eine neue Datenbank mit Tabelle und Board. Übernommen werden:
- Status bzw. Liste, Priorität, Typ, Labels, Termine und Story Points,
- Zuständige – als Personen-Eigenschaft, wenn alle Mitglieder sind,
- Checklisten und übergeordnete Vorgänge als Unteraufgaben,
- Beschreibungen als Inhalt und Kommentare als Kommentare,
- Anhänge als Links (die Dateien bleiben bei Jira bzw. Trello).
