# Projekte, Tickets und Sprints

Werkzeuge für Teams, die mit Tickets arbeiten – alle optional: Eine Datenbank verhält sich wie bisher, bis du eines davon einrichtest.

Die meisten findest du im Menü **…** rechts in der Werkzeugleiste einer Datenbank: Datensatzvorlagen, **Automationen**, **Workflow und Erledigt**, **Zeiten auswerten** und **Git-Anbindung**.

## Ticketnummern

Eine Eigenschaft vom Typ **ID (Ticketnummer)** zeigt für jeden Eintrag eine fortlaufende Nummer wie `WEB-123`.

- Das **Präfix** wählst du beim Anlegen; es ist im Arbeitsbereich eindeutig.
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
- an einer Status-Auswahl mit einer Option wie „Erledigt“ oder „Done“,
- sonst an einer Checkbox „Erledigt“.

Unter **… → Workflow und Erledigt** legst du es fest, wenn es anders sein soll.

## Workflows

Im selben Dialog schaltest du **Erlaubte Wechsel und Pflichtfelder festlegen** ein:

- **Erlaubte Wechsel**: In der Tabelle „von (Zeile) nach (Spalte)“ nimmst du Haken weg, etwa „Offen → Erledigt“. Dann muss ein Eintrag erst „In Arbeit“ gewesen sein.
- **Pflichtfelder**: Ein Status braucht bestimmte Eigenschaften – z. B. „Erledigt nur mit Lösung“.
- **Nur Verantwortliche**: Manche Status setzen nur Personen mit der Rolle *Verantwortlich* der Datenbank.

Die Regeln gelten überall: in Tabelle und Board, bei Sammeländerungen, für Gäste und für die Git-Anbindung. Ein Wechsel, der nicht passt, wird mit einer Erklärung abgelehnt.

## Automationen

**… → Automationen** erledigt wiederkehrende Handgriffe nach dem Muster *Wenn … nur wenn … dann …*:

- **Wenn**: ein Eintrag erstellt wird, ein Eintrag über ein Formular kommt, sich eine Eigenschaft ändert (wahlweise auf einen bestimmten Wert) oder ein Datum überschritten ist.
- **Nur wenn** (optional): Bedingungen wie „Priorität ist Hoch“ oder „Zuständig ist leer“.
- **Dann**: Eigenschaften setzen oder benachrichtigen.
  - Werte für Eigenschaften können fest sein oder *heute*, *jetzt*, *die auslösende Person* oder *der Ersteller* lauten.
  - Benachrichtigt werden können die Person in einer Personen-Eigenschaft, der Ersteller, die auslösende Person oder ein bestimmtes Mitglied.

Vorschläge legen die üblichen Regeln mit einem Klick an:
- „Wenn Status → Erledigt, Datum setzen“,
- „Wenn die Fälligkeit überschritten ist, benachrichtigen“,
- „Neue Formular-Einträge zuweisen“.

Regeln lassen sich einzeln ausschalten.

> [!NOTE]
> Regeln laufen auf dem Server, egal wie ein Eintrag sich ändert. Was eine Regel ändert, löst keine weiteren Regeln aus – so entstehen keine Schleifen. Überfällige Einträge prüft Flowplan alle paar Minuten; jede Regel meldet sich einmal je Eintrag und Datum. Benachrichtigungen erscheinen als „Automationen in Datenbanken“ und lassen sich in den Einstellungen abstellen.

## WIP-Limits

In einem Board legst du unter **Ansicht → WIP-Limits** eine Höchstzahl je Spalte fest, z. B. „In Arbeit: 3“.

- Der Spaltenkopf zeigt dann `2/3`.
- Wird es mehr, ist die Spalte markiert.
- Mit **sperren** nimmt die Spalte keine weiteren Einträge an – egal, von wo sie kommen.

## Sprints

Eine Ansicht vom Typ **Sprints (Backlog und Planung)** plant Arbeit in Zeitabschnitten. **Sprints einrichten** legt beim ersten Mal die Eigenschaft „Sprint“ und den ersten Sprint an.

- **Planen**: Einträge per Drag & Drop aus dem **Backlog** in einen Sprint ziehen – oder über **Verschieben nach**, auch am Handy.
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
- **… → Zeiten auswerten**: Stunden pro Person und Woche sowie Aufwand gegen Schätzung je Eintrag, auch als CSV.

## Git-Anbindung

**… → Git-Anbindung** verbindet die Datenbank mit GitHub, GitLab oder Gitea/Forgejo:

1. **Git-Anbindung einrichten** erzeugt eine Webhook-Adresse und ein Secret.
2. **Im Repository** einen Webhook mit beiden anlegen:
   - Content type JSON,
   - Ereignisse für Pushes und Pull bzw. Merge Requests.
   Die genauen Schritte stehen im Dialog.
3. **Commits und Pull Requests**, die eine Ticketnummer wie `WEB-123` nennen, erscheinen im Eintrag unter **Entwicklung**.
4. **„closes WEB-123“** (auch *fixes*, *resolves*, *schließt*, *behebt*) setzt den Eintrag auf erledigt. Das geschieht, sobald der Commit im Hauptbranch ist oder der Pull Request zusammengeführt wurde – über den Workflow und die Automationen der Datenbank.

Jede Anfrage wird gegen das Secret geprüft. Adresse und Secret sehen nur Personen, die die Datenbank bearbeiten dürfen. **Neue Adresse und neues Secret** macht die alten ungültig.

## Einträge aus allen Datenbanken

**Meine Aufgaben → Einträge aus Datenbanken** zeigt Einträge aus allen Datenbanken des Arbeitsbereichs in einer Liste. Standardmäßig sind das die offenen, die dir zugewiesen sind – über irgendeine Personen-Eigenschaft.

- Filtern kannst du nach Fälligkeit, Datenbank und Text.
- **Als Ansicht speichern** macht daraus eine eigene, persönliche Ansicht, z. B. „Alle meine offenen Tickets in allen Projekten“.

## Import aus Jira und Trello

**Einstellungen → Daten → Aus Jira oder Trello importieren** nimmt einen Jira-CSV-Export (alle Felder) oder einen Trello-JSON-Export.

Daraus entsteht eine neue Datenbank mit Tabelle und Board. Übernommen werden:
- Status bzw. Liste, Priorität, Typ, Labels, Termine und Story Points,
- Zuständige – als Personen-Eigenschaft, wenn alle Mitglieder sind,
- Checklisten und übergeordnete Vorgänge als Unteraufgaben,
- Beschreibungen als Inhalt und Kommentare als Kommentare,
- Anhänge als Links (die Dateien bleiben bei Jira bzw. Trello).
