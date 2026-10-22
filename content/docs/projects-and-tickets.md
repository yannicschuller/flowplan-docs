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

- **Wenn**: ein Eintrag erstellt wird, ein Eintrag über ein Formular kommt, sich eine Eigenschaft ändert (wahlweise auf einen bestimmten Wert), ein Datum überschritten ist oder es nach Zeitplan so weit ist (siehe [Geplante Automationen](#geplante-automationen)).
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
- **… → Zeiten auswerten**: der Zeitbericht dieser Datenbank, umschaltbar auf den ganzen Arbeitsbereich (siehe [Zeitberichte und Abrechnung](#zeitberichte-und-abrechnung)). Den Bericht über alle Datenbanken findest du auch unter **Einstellungen → Zeiten**.

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

## Git-Anbindung

**… → Git-Anbindung** verbindet die Datenbank mit GitHub, GitLab oder Gitea/Forgejo:

1. **Git-Anbindung einrichten** erzeugt eine Webhook-Adresse und ein Secret.
2. **Im Repository** einen Webhook mit beiden anlegen:
   - Content type JSON,
   - Ereignisse für Pushes und Pull bzw. Merge Requests.
   Die genauen Schritte stehen im Dialog.
3. **Commits und Pull Requests**, die eine Ticketnummer dieser Datenbank wie `WEB-123` nennen, erscheinen im Eintrag unter **Entwicklung**. Nummern anderer Datenbanken bleiben unberührt – dort gibt es eine eigene Anbindung.
4. **„closes WEB-123“** (auch *fixes*, *resolves*, *schließt*, *behebt*) setzt den Eintrag auf erledigt. Das geschieht, sobald der Commit im Hauptbranch ist oder der Pull Request zusammengeführt wurde – über den Workflow und die Automationen der Datenbank.

Jede Anfrage wird gegen das Secret geprüft. Adresse und Secret sehen nur Personen, die die Datenbank bearbeiten dürfen. **Neue Adresse und neues Secret** macht die alten ungültig.

## GitHub- und GitLab-Issues synchronisieren

Eine Datenbank kann sich mit den Issues eines GitHub- oder GitLab-Repositorys abgleichen – in beide Richtungen oder nur in eine. Anders als die [Git-Anbindung](#git-anbindung), die Commits und Pull Requests nur verlinkt, werden hier Einträge und Issues gegenseitig angelegt und aktualisiert.

**Verbindung einrichten** (Eigentümer des Arbeitsbereichs und Administratoren):

1. **Einstellungen → API & Webhooks → GitHub oder GitLab verbinden**.
2. Anbieter wählen, bei eigenem Server dessen Adresse eintragen (leer für github.com bzw. gitlab.com), Repository (`besitzer/name`) bzw. Projekt (`gruppe/projekt`) und ein Zugangstoken, das Issues lesen und schreiben darf – bei GitHub ein Fine-grained Token mit *Issues: Read and write*, bei GitLab ein Token mit dem Scope `api`.
3. **Verbindung testen** macht einen Aufruf mit dem Token; **Speichern** legt das Token verschlüsselt ab. Angezeigt wird es danach nie wieder.
4. Optional **Personen**: je Zeile `login = e-mail` eines Mitglieds. Darüber werden Zuständige (Assignees) zugeordnet.
5. Für sofortige Übernahme die angezeigte **Webhook-Adresse** mit dem **Secret** im Repository eintragen – bei GitHub mit Content type JSON und den Ereignissen *Issues* und *Issue comments*, bei GitLab als *Secret token* mit *Issues events* und *Comments*. Ohne Webhook gleicht Flowplan alle 10 Minuten ab.

Die Synchronisierung handelt als die Person, die die Verbindung eingerichtet hat: Sie braucht Bearbeitungsrechte an der Datenbank, und Einträge, die sie nicht lesen darf, werden übersprungen. Ist sie nicht mehr Eigentümer des Arbeitsbereichs, pausiert die Verbindung, bis jemand das Token neu speichert.

**Datenbank zuordnen**: **… → Issues synchronisieren** in der Datenbank. Dort wählst du Verbindung, Repository und Richtung (*beide*, *nur Issues → Datenbank*, *nur Datenbank → Issues*) und ordnest Eigenschaften zu:

| Issue | Eigenschaft |
| --- | --- |
| Titel | Titel |
| Beschreibung (Markdown) | eine Text-Eigenschaft oder das Dokument des Eintrags |
| offen/geschlossen und Labels | eine Auswahl – je Option „offen" oder „geschlossen", optional mit einem Label (z. B. *In Arbeit* → offen + `in progress`) |
| Labels | eine Mehrfachauswahl (nur Labels, die es als Option gibt) |
| Assignee | eine Person (über die Personen-Liste der Verbindung) |
| Fälligkeit des Meilensteins | ein Datum (gesetzt wird ein vorhandener Meilenstein mit diesem Datum) |
| Nummer und Adresse | Zahl/Text bzw. URL – nur lesen |

Dazu kommen zwei Schalter für **Kommentare**: Issue-Kommentare erscheinen als Kommentare am Eintrag (mit Name und Link), und Kommentare am Eintrag gehen als Issue-Kommentare hinaus. **Auch bestehende Issues übernehmen** holt beim ersten Lauf alle vorhandenen Issues; sonst nur, was sich nach dem Speichern ändert. Neue Einträge werden zu Issues, sobald die Zuordnung gespeichert ist – ältere Einträge bleiben, wie sie sind.

**Konflikte**: Wurden Eintrag und Issue seit dem letzten Abgleich beide geändert, gewinnt die spätere Änderung. Die Entscheidung steht im Prüfprotokoll. Jeder Eintrag ist höchstens mit einem Issue verknüpft; der Eintrag zeigt dann einen Chip wie **GitHub #123** mit Link.

**Status**: Der Dialog zeigt den letzten Abruf und die letzte Übertragung, Konflikte, übersprungene Einträge und Fehler; **Jetzt synchronisieren** startet einen Lauf sofort. Meldet der Anbieter ein Ratenlimit, wartet Flowplan die angegebene Zeit ab. Ein Repository lässt sich nur mit einer Datenbank verbinden. **Trennen** beendet den Abgleich; Einträge und Issues bleiben.

Eigene Server (GitHub Enterprise, selbst betriebenes GitLab) gibt die Administration mit [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration#integrationen) frei.

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
