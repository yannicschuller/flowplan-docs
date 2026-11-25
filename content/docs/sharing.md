---
keywords: Teilen, Link, Freigabelink, Gäste, Einladen, Passwort, Ablaufdatum, Rechte
---

# Teilen

**Teilen** oben rechts auf jeder Seite (auf dem Telefon oben im Menü `⋯`) öffnet **Seite teilen**. Eine Zeile oben fasst zusammen, wie die Seite gerade geteilt ist – Bereich, Personen, Links und ob sie veröffentlicht ist. Darunter regeln drei Reiter je eine Sache: **Personen** (wer im Arbeitsbereich zugreifen darf), **Links** (benannte Links für Außenstehende; nur für alle, die mehr als lesen dürfen) und **Web** (die Veröffentlichung). Längere Erklärungen stehen hinter dem kleinen **(i)**. Unten kopiert **Link zur Seite kopieren** die Adresse der Seite für alle mit Zugriff, **Fertig** schließt den Dialog.

Eine Seite für alle mit dem Link öffentlich machen: [Im Web veröffentlichen](/publishing).

## Zugriff im Arbeitsbereich

Seiten erben die Rechte ihres Bereichs und ihrer übergeordneten Seiten; der Reiter **Personen** nennt unter der Liste, wer über den Bereich dazukommt (etwa „Dazu alle 8 Mitglieder des Bereichs Team“, mit **Bereich verwalten** für alle, die das dürfen). Zusätzlich lassen sich einzelnen Personen oder Gruppen Rechte geben:

| Rolle | Darf |
| --- | --- |
| **Ansehen** | Lesen und kommentieren |
| **Bearbeiten** | Inhalte, Einträge und Ansichten ändern |

Private Bereiche und Seiten sind nur für Freigegebene sichtbar. Gäste sehen ausschließlich, was ihnen ausdrücklich freigegeben wurde (siehe [Arbeitsbereiche, Mitglieder und Rechte](/workspaces-and-permissions)).

### Eine Seite mit einer Person teilen

Eine Seite oder Datenbank lässt sich mit einer Person teilen, die nicht im Arbeitsbereich ist – ohne sie in den ganzen Arbeitsbereich aufzunehmen. **Teilen → Personen**: E-Mail-Adresse eingeben (Mitglieder werden vorgeschlagen), **Ansehen** oder **Bearbeiten** wählen, **Hinzufügen**.

- **Die Person hat schon ein Konto auf dieser Instanz** (mit bestätigter Adresse)**:** Sie hat sofort Zugriff auf die Seite samt Unterseiten und bekommt eine Benachrichtigung im Posteingang („… hat „Seite“ mit dir geteilt“) und – wenn die Instanz E-Mails verschickt – sofort eine E-Mail mit Link zur Seite. Unter **Einstellungen → Benachrichtigungen → Mit dir geteilte Seiten** lässt sich die E-Mail abschalten. Ist sie noch nicht im Arbeitsbereich, kommt sie als **Gast** dazu und sieht nur, was mit ihr geteilt ist.
- **Noch kein Konto:** Sie bekommt eine Einladung per E-Mail (wenn eingerichtet) und steht als „Eingeladen“ in der Liste. Legt sie mit dieser Adresse ein Konto an, ist die Seite sofort da. Das gilt auch für ein Konto, dessen Adresse noch nicht bestätigt ist – dann öffnet erst der Einladungslink (**Einstellungen → Mitglieder → Ausstehende Einladungen → Link kopieren**) die Seite.
- Gäste sehen die Liste der Personen mit Zugriff nicht; E-Mail-Adressen sehen nur, wer teilen darf. Pro Person gehen höchstens einige Dutzend Einladungen pro Stunde hinaus und an jede Adresse wenige E-Mails.
- In der Liste lassen sich Rollen ändern und Personen wieder **Entfernen**. Hat ein Gast danach keine geteilte Seite mehr, ist er auch nicht mehr im Arbeitsbereich.
- Teilen dürfen Eigentümer des Arbeitsbereichs und Eigentümer des Bereichs, in dem die Seite liegt. Alle anderen sehen die Liste nur.

## Links mit eigenen Berechtigungen

Im Reiter **Links** entstehen mit **+ Neuer Link** beliebig viele benannte Links, z. B. „Feedback vom Kunden“: Name und Berechtigung wählen, auf Wunsch Unterseiten, Passwort und Ablaufdatum, dann **Link erstellen**. Jeder Link in der Liste hat einen Knopf zum Kopieren und ein Menü **⋯**.

| Linkberechtigung | Besucher dürfen |
| --- | --- |
| **Lesen** | die Seite ansehen |
| **Lesen und kommentieren** | zusätzlich kommentieren; Kommentare tragen einen Gastvermerk |
| **Lesen, kommentieren und bearbeiten** | zusätzlich Titel, Text und sichtbare Eigenschaften bestehender Einträge ändern |

- Links funktionieren ohne Konto und lassen sich einzeln widerrufen (**⋯ → Widerrufen**).
- Mit **Bearbeiten**-Links schreiben Gäste live mit: Änderungen von Mitgliedern und anderen Gästen erscheinen sofort, und die Cursor sind gegenseitig sichtbar – Gäste erscheinen als „Gast · <Linkname>“. Sie schreiben im selben Editor wie im Arbeitsbereich: Werkzeugleiste mit Textstil, Formatierungen, Listen, Ausrichtung, Formel, Diagramm und Datei; `/` oder **+** öffnet das Blockmenü (Überschriften, Listen, Zitat, Hinweis, Code, Trennlinie, Formeln, Mermaid, Datei). {since=0.9.6}
- Optional gelten sie auch für die aktuell vorhandenen Unterseiten; neue Unterseiten kommen nicht automatisch dazu.
- Über Bearbeitungslinks lassen sich keine Rechte, Mitglieder, privaten Relationen oder Dateien-Eigenschaften ändern. Vor jeder Gastbearbeitung sichert Flowplan den bisherigen Inhalt.
- Ein [Journal mit PIN](/journal) lässt sich weder per Link teilen noch veröffentlichen; wer die PIN setzt, widerruft vorhandene Links und Veröffentlichungen. Beim Teilen einer übergeordneten Seite samt Unterseiten bleibt es draußen.

### Whiteboards und Notizbücher mit Gästen bearbeiten {since=0.9.6}

Teilst du ein Whiteboard oder ein Notizbuch per Link mit **Lesen, kommentieren und bearbeiten**, zeigt die Seite für Gäste über dem Vorschaubild den Knopf **Whiteboard bearbeiten** bzw. **Notizbuch bearbeiten**. Dann arbeiten sie ohne Konto im selben Editor wie du – live, ihr seht die Änderungen der anderen sofort.

- **Whiteboard:** Notizen, Texte, Formen, Verbindungen, Rahmen, Tabellen und Emojis anlegen, verschieben und löschen, zeichnen und kommentieren. Ihr Zeiger erscheint als „Gast · <Linkname>“.
- **Notizbuch:** auf den Blättern schreiben und zeichnen sowie Blätter hinzufügen, duplizieren, löschen und umsortieren.
- **Nicht möglich:** Dateien hochladen, Vorlagen, KI- und Moderationsfunktionen (Abstimmungen, Timer, Privatmodus), Seiten verknüpfen und exportieren. Vorhandene Bilder und PDFs sehen Gäste; Verweise auf Seiten außerhalb des Links nicht.
- Ist die Seite gesperrt, der Link abgelaufen oder widerrufen, endet die Bearbeitung sofort. Seiten in verschlüsselten Bereichen und Journale mit PIN lassen sich so nicht bearbeiten.

### Passwort und Ablaufdatum

Links mit eigenen Berechtigungen und [Veröffentlichungen](/publishing) können ein **Passwort** und ein **Ablaufdatum** haben – beim Erstellen oder später: bei Links über **⋯ → Passwort und Ablaufdatum**, bei der Veröffentlichung im Reiter **Web** unter **Passwort** und **Läuft ab**. Die Liste zeigt „Passwort“ bzw. „läuft ab am …“.

- Besucher geben das Passwort einmal pro Gerät ein. Es gilt bis zu 12 Stunden und nur für diesen Link; ein neues Passwort meldet alle Besucher ab.
- Zehn falsche Versuche in 15 Minuten sperren die Adresse für diesen Link.
- Bearbeiten-Links haben Tagesbudgets: Gäste laden je Link höchstens 200 MB Dateien pro Tag hoch (20 Dateien je 10 Minuten) und senden höchstens 100 MB Änderungen pro Tag; ein Dokument wächst über einen Link nicht über 3 MB Text hinaus. Für die ganze Instanz gilt zusätzlich `FLOWPLAN_ANONYMOUS_UPLOAD_MB` ([Konfiguration](/configuration)).
- Nach dem Ablaufdatum zeigt der Link nur noch „abgelaufen“ – keine Inhalte, keine Dateien, keine Live-Updates.
- Passwort entfernen oder Ablauf verlängern geht jederzeit.
- Passwortgeschützte Veröffentlichungen lassen sich nicht in andere Arbeitsbereiche kopieren.
- Das Passwort wird nur als Hash gespeichert und nie wieder angezeigt.

## Einzelne Einträge teilen

Ein Eintrag einer Datenbank lässt sich teilen, ohne die Datenbank zu öffnen: **Teilen** oben im Eintrag (im Dialog das Teilen-Symbol, als ganze Seite der Knopf **Teilen**) öffnet **Eintrag teilen**. Teilen darf, wer den Eintrag bearbeiten darf.

- **Links**: wie bei Seiten – Name, Berechtigung (Lesen, Kommentieren, Bearbeiten), auf Wunsch [Passwort und Ablaufdatum](#passwort-und-ablaufdatum); jeder Link lässt sich einzeln widerrufen.
- **Web**: **Im Web veröffentlichen** macht den Eintrag für alle mit dem Link lesbar, wieder mit Passwort und Ablaufdatum. Gastkommentare bleiben bei den Links; Suchmaschinen nehmen ihn nicht auf.
- **Eigenschaften**: welche Eigenschaften Besucher sehen – für alle Links und die Veröffentlichung dieses Eintrags. Voreingestellt sind alle, die auch eine Veröffentlichung zeigt, dazu die Dateien des Eintrags; leere werden nicht angezeigt. **Relationen** (zeigen die Titel verknüpfter Einträge, ohne Link) und **Personen** (zeigen Namen) erscheinen nur, wenn du sie anhakst. Eigenschaften mit Leserechten und Rollups bleiben immer privat.
- **Unterseiten einbeziehen** (beim Anlegen eines Links; bei der Veröffentlichung als Schalter): Besucher öffnen auch die [Unterseiten des Eintrags](/databases#unterseiten-eines-eintrags) und was darunter liegt – auch später hinzugekommene, solange sie unter dem Eintrag liegen. Unterseiten anderer Einträge, die Datenbank und ihre übrigen Seiten bleiben verborgen.

Besucher sehen Titel, Symbol, Cover, die gewählten Eigenschaften und das Dokument des Eintrags – keine anderen Einträge, keine Ansichten, nicht die Datenbank; der Pfad beginnt beim Eintrag (auf einer Unterseite: Eintrag / Unterseite). Links im Dokument auf andere Seiten oder Einträge sind für sie entfernt, Dateien nur sichtbar, wenn der Eintrag sie selbst verwendet. Mit **Bearbeiten** ändern Gäste das Dokument (live) und die sichtbaren Eigenschaften, aber keine Relationen.

- Mitglieder erreichen den Eintrag wie bisher über die Datenbank und die [Rechte des Eintrags](/databases#rechte-pro-eintrag); Gäste einzelner Einträge gibt es nicht – dafür ist der Link da.
- **Private** Einträge lassen sich nicht teilen; wird ein geteilter Eintrag privat, gelöscht, in eine andere Datenbank verschoben oder die Datenbank gelöscht, enden seine Links und seine Veröffentlichung sofort.
- Deine Links erscheinen unter **Einstellungen → Sicherheit**, alle unter **Einstellungen → Instanz → Sicherheit**.

## Formulare

Formulare haben einen eigenen Link, siehe [Formulare](/forms#formular-teilen).
