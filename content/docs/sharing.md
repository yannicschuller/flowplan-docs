---
keywords: Teilen, veröffentlichen, Link, öffentlich, Website, Gäste
---

# Teilen und Veröffentlichen

**Teilen** oben rechts auf jeder Seite (auf dem Telefon oben im Menü `⋯`) öffnet **Seite teilen**. Eine Zeile oben fasst zusammen, wie die Seite gerade geteilt ist – Bereich, Personen, Links und ob sie veröffentlicht ist. Darunter regeln drei Reiter je eine Sache: **Personen** (wer im Arbeitsbereich zugreifen darf), **Links** (benannte Links für Außenstehende; nur für alle, die mehr als lesen dürfen) und **Web** (die Veröffentlichung). Längere Erklärungen stehen hinter dem kleinen **(i)**. Unten kopiert **Link zur Seite kopieren** die Adresse der Seite für alle mit Zugriff, **Fertig** schließt den Dialog.

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

Links mit eigenen Berechtigungen und [Veröffentlichungen](#im-web-veroeffentlichen) können ein **Passwort** und ein **Ablaufdatum** haben – beim Erstellen oder später: bei Links über **⋯ → Passwort und Ablaufdatum**, bei der Veröffentlichung im Reiter **Web** unter **Passwort** und **Läuft ab**. Die Liste zeigt „Passwort“ bzw. „läuft ab am …“.

- Besucher geben das Passwort einmal pro Gerät ein. Es gilt bis zu 12 Stunden und nur für diesen Link; ein neues Passwort meldet alle Besucher ab.
- Zehn falsche Versuche in 15 Minuten sperren die Adresse für diesen Link.
- Bearbeiten-Links haben Tagesbudgets: Gäste laden je Link höchstens 200 MB Dateien pro Tag hoch (20 Dateien je 10 Minuten) und senden höchstens 100 MB Änderungen pro Tag; ein Dokument wächst über einen Link nicht über 3 MB Text hinaus. Für die ganze Instanz gilt zusätzlich `FLOWPLAN_ANONYMOUS_UPLOAD_MB` ([Konfiguration](/configuration)).
- Nach dem Ablaufdatum zeigt der Link nur noch „abgelaufen“ – keine Inhalte, keine Dateien, keine Live-Updates.
- Passwort entfernen oder Ablauf verlängern geht jederzeit.
- Passwortgeschützte Veröffentlichungen lassen sich nicht in andere Arbeitsbereiche kopieren.
- Das Passwort wird nur als Hash gespeichert und nie wieder angezeigt.

## Im Web veröffentlichen

Im Reiter **Web** macht der Schalter **Im Web veröffentlichen** die Seite für alle mit dem Link lesbar. Darauf folgen der öffentliche Link (**Kopieren** oder öffnen) und die Optionen:

- **Aktuell vorhandene Unterseiten mit veröffentlichen**; später angelegte holt **Auswahl um neue Unterseiten ergänzen** dazu.
- **Neue Unterseiten automatisch veröffentlichen** (nur zusammen mit den Unterseiten): Seiten, die später unter der veröffentlichten Seite angelegt, dorthin verschoben, dort dupliziert oder dorthin wiederhergestellt werden – auch von anderen und in jeder Tiefe –, sind ohne weiteren Schritt öffentlich, mit Passwort, Ablauf, Kopier-Einstellung und Aussehen dieser Veröffentlichung. Wird eine solche Seite wieder herausverschoben, ist sie nicht mehr veröffentlicht. Nie automatisch öffentlich werden Seiten, die du selbst nicht veröffentlichen dürftest (ohne deine Schreibrechte), Journale mit PIN, Workflow-Seiten und Seiten verschlüsselter Bereiche. Schaltest du die Option aus, bleiben die bis dahin hinzugekommenen Unterseiten veröffentlicht; neue kommen nicht mehr dazu.
- **Besucher dürfen eine Kopie in ihren Arbeitsbereich übernehmen** – nur das, was die Veröffentlichung zeigt.
- **Pfeil ↗ hinter Links zeigen:** ob Links ins Web auf der veröffentlichten Seite den kleinen Pfeil tragen. Voreingestellt wie deine Einstellung [Symbol bei externen Links](/links-and-mentions#seitenlinks-und-erwaehnungen); Veröffentlichungen von vor dieser Version behalten den Pfeil. {since=0.9.7}
- Datenbanken erscheinen mit ihren Ansichten – Tabelle, Board, Galerie, Liste, Feed, Kalender, Timeline und Diagramm (auch mit Datenreihen und weiteren Werten) –, Einträgen und Eintragsdokumenten. Eine Ansicht wird nur veröffentlicht, wenn alle Eigenschaften, die sie braucht, öffentlich sind. Personen-Eigenschaften, Relationen, Formeln, Rollups und interne Kommentare bleiben privat.
- Die **Timeline** sieht aus wie in der App, nur zum Lesen: mit Zeitraum und Zoom, wie du sie in der Ansicht gespeichert hast, zweizeiliger Achse, Meilensteinen als Raute, Titeln, die am linken Rand stehen bleiben, und den gewählten öffentlichen Eigenschaften daneben, Wochenenden, der Linie für heute und der Sortierung der Ansicht. Einträge außerhalb des Zeitraums bleiben als leere Zeilen stehen, angeschnittene Balken sind markiert. Abhängigkeitspfeile und der kritische Pfad erscheinen wie eingerichtet – nur zwischen veröffentlichten Einträgen, und nicht, wenn eine Leseregel die Abhängigkeits-Eigenschaft schützt. Besucher können scrollen und zoomen; gespeichert wird nichts. {since=0.10.2}
- Dateien, die in veröffentlichten Seiten verlinkt sind, sind öffentlich; andere Uploads nicht.
- Ausschalten, Löschen oder Verschieben aus dem veröffentlichten Baum entzieht den Zugriff sofort, auch auf Dateien.
- Hat eine Seite Überschriften, blenden Besucher über das Listen-Symbol rechts neben dem Text die **Gliederung** ein (auf dem Smartphone der runde Knopf unten rechts). Sie zeigt, wo man gerade liest, und springt per Klick zur Überschrift. Ob sie offen ist, merkt sich der Browser – wie im Editor.

### Hell, dunkel und zurück zur Ansicht {since=0.10.2}

Geteilte und veröffentlichte Seiten – auch [einzeln geteilte Einträge](#einzelne-eintraege-teilen) – haben oben rechts einen kleinen Knopf mit Sonne oder Mond. Er wechselt der Reihe nach zwischen **automatisch** (wie das Gerät des Besuchers), **hell** und **dunkel**. Die Wahl merkt sich der Browser auf diesem Gerät, wie [Hell und dunkel](/offline-and-apps#hell-und-dunkel) in der App (im lokalen Speicher unter `flowplan-theme`, kein Cookie). Eine Vorgabe der veröffentlichenden Person gibt es nicht: Ohne eigene Wahl folgt die Seite dem Gerät.

- **Zurück zur Ansicht:** Öffnet ein Besucher einen Eintrag aus einer Ansicht einer Datenbank, steht über dem Pfad **← Zurück zu <Ansicht>**. Der Link führt in dieselbe Ansicht zurück, mit demselben Monat (Kalender, Timeline) und an die Stelle, an die gescrollt war. Die Ansicht und ihr Monat stehen dafür in der Adresse des Eintrags (`?row=…&view=…&month=…`), die Scrollposition nur in diesem Tab (Sitzungsspeicher). Das gilt für Links mit eigenen Berechtigungen wie für Veröffentlichungen. Über einen Link im Dokument, eine Relation oder eine Adresse ohne Ansicht geöffnet, zeigt der Eintrag nur den Pfad.
- **Titel im Pfad:** Der Pfad endet mit dem Titel des Eintrags statt mit „Eintrag“; lange Titel werden mit „…“ gekürzt, der ganze steht im Tooltip. Ist die Titel-Eigenschaft für Besucher nicht lesbar (etwa mit eingeschränkter [Sichtbarkeit](/properties-and-formulas#sichtbarkeit-von-eigenschaften)), bleibt es bei „Eintrag“.

### Lernkarten über einen Link {since=0.10.0}

Ein [Lernkarten-Stapel](/flashcards) zeigt über einen Link mit eigenen Berechtigungen oder als Veröffentlichung seine Ansicht **Lernen**:

- **Durchblättern**: alle Karten als Raster, je 100 auf einer Seite; ein Klick oder **Umdrehen** zeigt die Rückseite. Ohne JavaScript klappt **Umdrehen** die Rückseite unter der Karte auf. {since=0.10.2}
- **Üben**: der Fokusmodus mit Wertungen, ohne Konto. Der Lernstand liegt nur im Browser des Besuchers (im lokalen Speicher unter `flowplan-study:` und dem Link) – kein Cookie, nichts geht an den Server. Ein Hinweis sagt das einmal; **Fortschritt löschen** entfernt ihn. Erlaubt der Browser keinen Speicher, gilt die Übung nur für diese Sitzung.
- Öffentlich ist eine Lernen-Ansicht nur, wenn alle Eigenschaften der Kartenzuordnung öffentlich sind; private Einträge werden nie zu Karten. Bilder kommen über den Link, Passwort und Ablaufdatum gelten wie für alles andere.
- Wer im Arbeitsbereich angemeldet ist und den Stapel lesen darf, bekommt **In Flowplan lernen** mit dem eigenen Lernstand. Eine Kopie der Veröffentlichung übernimmt die Kartenzuordnung.
- **In Flowplan lernen** öffnet den Stapel in der App auf derselben Lernen-Ansicht und startet gleich den Fokusmodus – auch in der App fürs Smartphone. Gibt es die Ansicht nicht mehr, öffnet sich die erste Lernen-Ansicht des Stapels mit einem Hinweis. Auf einer eigenen Domain gibt es den Knopf nicht. {since=0.10.2}

### Aussehen

Im Reiter **Web** klappt unter den Optionen **Aussehen** auf. Dort legst du das Aussehen der Veröffentlichung fest: **Logo** und **Favicon** (HTTPS-Adresse oder eine hochgeladene Datei, die die Veröffentlichung zeigt), **Akzentfarbe**, **Text in der Fußzeile** und **„Mit Flowplan veröffentlicht“ ausblenden** – übernommen mit **Aussehen speichern**.

### Eigene Domain

Ist es in der Administration eingeschaltet (**Eigene Domains für Veröffentlichungen**), zeigt eine Veröffentlichung sich auch unter deiner Domain, etwa `docs.example.org`:

::: steps

1. Im Reiter **Web** **Eigene Domain** aufklappen, die Domain eintragen und **Domain hinzufügen**.
2. Beim DNS-Anbieter den angezeigten TXT-Eintrag anlegen: Name `_flowplan-verify.docs.example.org`, Wert `flowplan-verify-…`. Nur dieser TXT-Eintrag bestätigt die Domain.
3. Die Domain per CNAME (oder A/AAAA) auf die Flowplan-Instanz zeigen lassen.
4. **Jetzt prüfen** wählen. Das HTTPS-Zertifikat besorgt der Reverse Proxy – siehe [Eigene Domains für Veröffentlichungen](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen).

:::

Eine bestätigte Domain bleibt bestätigt, bis du sie entfernst – auch Domains, die früher auf anderem Weg bestätigt wurden. Eine Domain, die nach 7 Tagen noch nicht bestätigt ist, wird wieder freigegeben; danach kann jemand anderes sie eintragen.

Unter der Domain gibt es kurze Adressen (`/` für die Startseite, `/<Seiten-ID>` für Unterseiten), eine eigene `sitemap.xml` und `robots.txt`, und Suchmaschinen dürfen die Seiten aufnehmen; der `/share/…`-Link nennt sie als kanonische Adresse. Die Domain zeigt nur diese Veröffentlichung: keine Anmeldung, keine App, keine API außer den Lesezugriffen der Veröffentlichung, keine Cookies, und die Seiten lassen sich nicht in fremde Seiten einbetten.

Veröffentlichungen mit Passwort lassen sich nicht unter einer eigenen Domain zeigen. Endet die Veröffentlichung, antwortet die Domain mit 404.

> [!WARNING]
> Eingebettete Videos und externe Bilder laden beim Ansehen Inhalte vom jeweiligen Anbieter. Das gilt auch für veröffentlichte Seiten.

## Einzelne Einträge teilen

Ein Eintrag einer Datenbank lässt sich teilen, ohne die Datenbank zu öffnen: **Teilen** oben im Eintrag (im Dialog das Teilen-Symbol, als ganze Seite der Knopf **Teilen**) öffnet **Eintrag teilen**. Teilen darf, wer den Eintrag bearbeiten darf.

- **Links**: wie bei Seiten – Name, Berechtigung (Lesen, Kommentieren, Bearbeiten), auf Wunsch [Passwort und Ablaufdatum](#passwort-und-ablaufdatum); jeder Link lässt sich einzeln widerrufen.
- **Web**: **Im Web veröffentlichen** macht den Eintrag für alle mit dem Link lesbar, wieder mit Passwort und Ablaufdatum. Gastkommentare bleiben bei den Links; Suchmaschinen nehmen ihn nicht auf.
- **Eigenschaften**: welche Eigenschaften Besucher sehen – für alle Links und die Veröffentlichung dieses Eintrags. Voreingestellt sind alle, die auch eine Veröffentlichung zeigt, dazu die Dateien des Eintrags; leere werden nicht angezeigt. **Relationen** (zeigen die Titel verknüpfter Einträge, ohne Link) und **Personen** (zeigen Namen) erscheinen nur, wenn du sie anhakst. Eigenschaften mit Leserechten und Rollups bleiben immer privat.
- **Unterseiten einbeziehen** (beim Anlegen eines Links; bei der Veröffentlichung als Schalter): Besucher öffnen auch die [Unterseiten des Eintrags](/databases#unterseiten-eines-eintrags) und was darunter liegt – auch später hinzugekommene, solange sie unter dem Eintrag liegen. Unterseiten anderer Einträge, die Datenbank und ihre übrigen Seiten bleiben verborgen.

Besucher sehen Titel, Symbol, Cover, die gewählten Eigenschaften und das Dokument des Eintrags – keine anderen Einträge, keine Ansichten, nicht die Datenbank; der Pfad beginnt beim Eintrag (auf einer Unterseite: Eintrag / Unterseite). Links im Dokument auf andere Seiten oder Einträge sind für sie entfernt, Dateien nur sichtbar, wenn der Eintrag sie selbst verwendet. Mit **Bearbeiten** ändern Gäste das Dokument (live) und die sichtbaren Eigenschaften, aber keine Relationen.

- Mitglieder erreichen den Eintrag wie bisher über die Datenbank und die [Rechte des Eintrags](/databases#rechte-pro-eintrag); Gäste einzelner Einträge gibt es nicht – dafür ist der Link da.
- **Private** Einträge lassen sich nicht teilen; wird ein geteilter Eintrag privat, gelöscht, in eine andere Datenbank verschoben oder die Datenbank gelöscht, enden seine Links und seine Veröffentlichung sofort.
- Deine Links erscheinen unter **Einstellungen → Sicherheit**, alle unter **Administration → Sicherheit**.

## Formulare

Formulare haben einen eigenen Link, siehe [Formulare](/forms#formular-teilen).
