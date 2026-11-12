# Vorlagen

Vorlagen sind gespeicherte Seiten – Dokumente, Datenbanken oder ganze Seitenbäume –, aus denen neue Seiten entstehen. Dazu kommen Datensatzvorlagen innerhalb einer Datenbank.

Mehr Vorlagen – aus der Community und offizielle von Flowplan, auch für Workflows, Whiteboards, Erscheinungsbilder und automatische Links – findest du im [Flowplan Marketplace](https://marketplace.flowplan.org).

## Startervorlagen

**Vorlagen** in der Seitenleiste – oder **Aus Vorlage** im Dialog **Neue Seite** – zeigt {{facts.templates}} eingebaute Vorlagen in {{facts.templateCategories|word}} Kategorien, jeweils mit Beispieleinträgen und passenden Ansichten:

| Kategorie | Vorlagen |
| --- | --- |
| Projekte | Projektplanung, Produkt-Roadmap, Sprint-Board, Projektsteckbrief |
| Meetings | Meeting-Notizen, Besprechungsnotiz, 1:1-Gespräch, Retrospektive, Besprechungsprotokolle |
| Wissen & Dokumentation | Team-Wiki, Anleitung, Diagramm-Seite, Entscheidungsprotokoll, FAQ |
| Planung & Ziele | OKR-Ziele, Quartalsplanung, Content-Kalender, Budgetplanung |
| Persönlich | Aufgabenliste, Leseliste, Gewohnheiten-Tracker, Reiseplanung |
| Sonstiges | Kontakte & Kunden, Bewerbungen, Inventar, Eventplanung |

Ein Klick öffnet den Dialog **Neue Seite** mit der gewählten Vorlage. Hast du dort schon einen Namen eingegeben, bleibt er stehen; sonst steht der Name der Vorlage im Feld – markiert, sodass du ihn einfach überschreibst. **Enter** legt die Seite an. Datumswerte der Beispiele werden relativ zum heutigen Tag gesetzt.

Die **Diagramm-Seite** ist eine Seite in voller Breite mit einem leeren [draw.io-Diagramm](/documents#formeln-diagramme-und-code); draw.io öffnet sich, sobald die Seite angelegt ist (wenn die Instanz draw.io nutzt).

Sobald es [eigene Vorlagen](#eigene-vorlagen) gibt, steht gleich nach **Alle** die Kategorie **Eigene Vorlagen**: Sie zeigt nur die gespeicherten Vorlagen – deine eigenen („Nur für mich“), die des Arbeitsbereichs und die für alle Arbeitsbereiche – ohne die eingebauten.

Öffnest du die Galerie aus dem Dialog **Neue Seite**, landet die Seite dort, wo du sie anlegen wolltest – im gewählten Bereich und unter der gewählten Seite –, auch mit einer eigenen Vorlage. Schließt du die Galerie, bist du wieder im Dialog.

Das gilt genauso für eigene Vorlagen: **Verwenden** führt in den Dialog **Neue Seite**, wo du der Seite einen eigenen Namen gibst, bevor sie entsteht. Der Name der Vorlage ist nur der Vorschlag.

## Eigene Vorlagen

1. Auf einer Seite **Seitenaktionen → Als Vorlage speichern**.
2. Name, Kategorie und Sichtbarkeit wählen:
   - **Nur für mich**,
   - **Arbeitsbereich**: alle Mitglieder dieses Arbeitsbereichs,
   - **Alle Arbeitsbereiche** der Instanz,
   - **Öffentliche Galerie** (nur Admins): auch ohne Konto sichtbar.

### Vorlagen eines Bereichs oder des ganzen Arbeitsbereichs

Wie [Tags und Eigenschaften](/pages-and-spaces#geltungsbereich-arbeitsbereich-oder-bereich) gehört eine eigene Vorlage **zu einem Bereich** oder **zum ganzen Arbeitsbereich**. Beim Speichern ist **Nur in diesem Bereich** (dem Bereich der Seite) voreingestellt; **Im ganzen Arbeitsbereich** speichern nur Eigentümer (private Vorlagen jeder). Was es vor dieser Unterscheidung gab, gilt im ganzen Arbeitsbereich.

- **Die Galerie** zeigt zuerst die Vorlagen des Bereichs, in dem die neue Seite entsteht, und die des Arbeitsbereichs; **Alle Bereiche** zeigt auch die anderer Bereiche. Ein Etikett nennt den Bereich oder „Arbeitsbereich“. Vorlagen eines Bereichs sehen nur, wer ihn öffnen darf.
- **Vorlagen für den ganzen Arbeitsbereich** verwenden nur Tags und Eigenschaften des ganzen Arbeitsbereichs. Trägt die Seite Tags oder Eigenschaften ihres Bereichs, nennt Flowplan sie; **Speichern** nimmt sie dann aus der Vorlage (oder du machst sie vorher arbeitsbereichsweit).
- **Eine Vorlage aus einem anderen Bereich verwenden:** Bringt sie Tags oder Eigenschaften ihres Bereichs mit, fragt ein Zwischenschritt für jede: **zuordnen** (zu einem gleichnamigen oder anderen Tag bzw. einer Eigenschaft gleichen Typs im Zielbereich), **kopieren** (in den Zielbereich, Voreinstellung ohne gleichnamigen) oder **entfernen**.
- **Kopieren** legt eine Kopie der Vorlage für einen anderen Bereich (oder den Arbeitsbereich) an – mit demselben Zwischenschritt; kopierte Tags und Eigenschaften entstehen dabei gleich im Zielbereich. **Bearbeiten → Gilt** verschiebt die Vorlage selbst dorthin.

Vorlagen speichern eigene Kopien der Dateien und bleiben verwendbar, auch wenn die Quellseite gelöscht wird. Auch die [Tags und Eigenschaftswerte](/pages-and-spaces#tags-und-eigenschaften) der Seite kommen mit; neue Seiten aus der Vorlage bekommen sie (fehlende Tags werden angelegt). Datenbank-Vorlagen enthalten Ansichten, Einträge samt Inhalten, Datensatzvorlagen und die Formulargestaltung. Vorlagen lassen sich umbenennen, privat oder geteilt schalten und in den Papierkorb legen. Im **Vorlagen-Papierkorb** holt **Wiederherstellen** eine Vorlage zurück, **Endgültig löschen** löscht sie samt ihren Dateien, und **Vorlagen-Papierkorb leeren** löscht alle, die du verwalten darfst (deine eigenen; als Eigentümer alle des Arbeitsbereichs; Vorlagen für alle Arbeitsbereiche nur Admins). Bereits erstellte Seiten bleiben erhalten. Nach der [Papierkorb-Frist](/pages-and-spaces#papierkorb) (Standard 30 Tage) werden Vorlagen im Papierkorb automatisch gelöscht.

## Datensatzvorlagen

In einer Datenbank öffnet **Datensatzvorlagen** die Vorlagen für Einträge: Eigenschaftswerte und Inhalt werden bei jedem neuen Eintrag übernommen. Eine Vorlage kann Standard sein, sodass **Neu** sie automatisch nutzt.

Eine Vorlage entsteht aus einem Eintrag: Inhalt schreiben, dann **Als Vorlage speichern**. Zum Ändern wählst du in **Datensatzvorlagen** bei der Vorlage **Bearbeiten** – ein Entwurf öffnet sich als Eintrag; speichere ihn mit **Als Vorlage speichern** und unter **Speichern als** mit **„…“ ersetzen**. Die Vorlage behält dabei ihre Rolle als Standardvorlage und in Automationen. Den Entwurfseintrag kannst du danach löschen.

### Platzhalter

Text in doppelten geschweiften Klammern wird beim Anwenden durch die Werte des Eintrags ersetzt – im Titel, in Überschriften, im Text, in Tabellen und Hinweisen sowie in Text-Eigenschaften der Vorlage. Beispiel: *„Kickoff {{Firma}} am {{Termin}}“*.

- **`{{Eigenschaft}}`** – der Wert einer Eigenschaft der Datenbank. Groß- und Kleinschreibung spielen keine Rolle.
- **`{{Titel}}`**, **`{{Heute}}`** (auch `{{Datum}}`), **`{{Jetzt}}`**, **`{{Ersteller}}`**, **`{{Ich}}`** (wer die Vorlage anwendet) und **`{{Datenbank}}`** sind eingebaut. Die englischen Namen (`{{Title}}`, `{{Today}}`, `{{Date}}`, `{{Now}}`, `{{Creator}}`, `{{Me}}`, `{{Database}}`) funktionieren ebenso. Heißt eine Eigenschaft genauso (etwa „Datum“), gilt die Eigenschaft.
- Das Symbol **{ }** neben **Inhalt** eines Eintrags (**Platzhalter einfügen**) setzt Platzhalter an der Schreibmarke ein und listet alle Eigenschaften der Datenbank.

Werte erscheinen wie in der Tabelle: Datumsangaben in deiner Sprache und im Datumsformat der Eigenschaft, Mehrfachauswahl durch Kommas getrennt, Verknüpfungen als Titel der verknüpften Einträge, Personen mit Namen, Kontrollkästchen als ✓ oder ✗. Leere Eigenschaften ergeben leeren Text; unbekannte Platzhalter bleiben stehen. Werte werden immer als reiner Text eingesetzt, nie als Formatierung oder HTML. Eigenschaften, die nur bestimmte Personen sehen dürfen, bleiben leer – der Text ist für alle sichtbar, die den Eintrag sehen.

Eigenschaften umbenennen ist kein Problem: Vorlagen merken sich die Eigenschaft, nicht nur ihren Namen. Im Entwurf einer Vorlage bleiben die Platzhalter stehen.

### Vorlage auf einen bestehenden Eintrag anwenden

Im Menü **…** eines geöffneten Eintrags oder per Rechtsklick auf eine Zeile wählst du **Vorlage anwenden …**, dann die Vorlage und was mit dem vorhandenen Inhalt geschieht:

- **Nur anwenden, wenn der Inhalt leer ist** – hat der Eintrag schon Text, sagt Flowplan das und ändert nichts.
- **Unten anhängen** – der Text der Vorlage kommt unter den vorhandenen Text.

Vorhandener Text wird nie überschrieben, ausgefüllte Eigenschaften bleiben; nur leere Eigenschaften erhalten die Werte der Vorlage. Der vorherige Inhalt bleibt als Version erhalten, und **Rückgängig** im Hinweis stellt ihn wieder her. Dafür braucht es Bearbeitungsrechte am Eintrag; Workflow-Regeln der Datenbank gelten auch hier. Automatisch geht das mit einer [Automation](/projects-and-tickets#automationen).

## Öffentliche Vorlagengalerie

Unter `/templates` stehen die eingebauten Vorlagen und alle Vorlagen mit der Sichtbarkeit **Öffentliche Galerie** auch ohne Konto bereit, nach Kategorien gefiltert, jeweils mit Vorschau. **In meinem Arbeitsbereich verwenden** öffnet nach der Anmeldung den Dialog **Neue Seite** mit der Vorlage – Name prüfen oder überschreiben, dann **Seite erstellen**. Nur Admins können eigene Vorlagen in die Galerie geben.

## Whiteboard-Vorlagen

Im Whiteboard fügt **Vorlagen** eine Retrospektive, ein Kanban, eine Mindmap, eine SWOT-Analyse oder ein Flussdiagramm an der aktuellen Stelle ein.

## Workflow-Vorlagen

Eine neue Workflow-Seite bietet sechs Vorlagen – von „Unterseiten auf der Übersicht verlinken“ bis „Webhook → Eintrag“. Ein kurzer Assistent fragt die Lücken ab (Seite, Datenbank, Eigenschaft, Person …) und legt den Entwurf an. Siehe [Workflows](/workflows#wie-ein-workflow-beginnt).
