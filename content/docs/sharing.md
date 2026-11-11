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
- Mit **Bearbeiten**-Links schreiben Gäste live mit: Änderungen von Mitgliedern und anderen Gästen erscheinen sofort, und die Cursor sind gegenseitig sichtbar – Gäste erscheinen als „Gast · <Linkname>“.
- Optional gelten sie auch für die aktuell vorhandenen Unterseiten; neue Unterseiten kommen nicht automatisch dazu.
- Über Bearbeitungslinks lassen sich keine Rechte, Mitglieder, privaten Relationen oder Dateien-Eigenschaften ändern. Vor jeder Gastbearbeitung sichert Flowplan den bisherigen Inhalt.
- Ein [Journal mit PIN](/journal) lässt sich weder per Link teilen noch veröffentlichen; wer die PIN setzt, widerruft vorhandene Links und Veröffentlichungen. Beim Teilen einer übergeordneten Seite samt Unterseiten bleibt es draußen.

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
- **Besucher dürfen eine Kopie in ihren Arbeitsbereich übernehmen** – nur das, was die Veröffentlichung zeigt.
- Datenbanken erscheinen mit ihren Ansichten – Tabelle, Board, Galerie, Liste, Feed, Kalender, Timeline und Diagramm (auch mit Datenreihen und weiteren Werten) –, Einträgen und Eintragsdokumenten. Eine Ansicht wird nur veröffentlicht, wenn alle Eigenschaften, die sie braucht, öffentlich sind. Personen-Eigenschaften, Relationen, Formeln, Rollups und interne Kommentare bleiben privat.
- Dateien, die in veröffentlichten Seiten verlinkt sind, sind öffentlich; andere Uploads nicht.
- Ausschalten, Löschen oder Verschieben aus dem veröffentlichten Baum entzieht den Zugriff sofort, auch auf Dateien.
- Hat eine Seite Überschriften, blenden Besucher über das Listen-Symbol rechts neben dem Text die **Gliederung** ein (auf dem Smartphone der runde Knopf unten rechts). Sie zeigt, wo man gerade liest, und springt per Klick zur Überschrift. Ob sie offen ist, merkt sich der Browser – wie im Editor.

### Aussehen

Im Reiter **Web** klappt unter den Optionen **Aussehen** auf. Dort legst du das Aussehen der Veröffentlichung fest: **Logo** und **Favicon** (HTTPS-Adresse oder eine hochgeladene Datei, die die Veröffentlichung zeigt), **Akzentfarbe**, **Text in der Fußzeile** und **„Mit Flowplan veröffentlicht“ ausblenden** – übernommen mit **Aussehen speichern**.

### Eigene Domain

Ist es in der Administration eingeschaltet (**Eigene Domains für Veröffentlichungen**), zeigt eine Veröffentlichung sich auch unter deiner Domain, etwa `docs.example.org`:

1. Im Reiter **Web** **Eigene Domain** aufklappen, die Domain eintragen und **Domain hinzufügen**.
2. Beim DNS-Anbieter den angezeigten TXT-Eintrag anlegen: Name `_flowplan-verify.docs.example.org`, Wert `flowplan-verify-…`. Nur dieser TXT-Eintrag bestätigt die Domain.
3. Die Domain per CNAME (oder A/AAAA) auf die Flowplan-Instanz zeigen lassen.
4. **Jetzt prüfen** wählen. Das HTTPS-Zertifikat besorgt der Reverse Proxy – siehe [Eigene Domains für Veröffentlichungen](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen).

Eine bestätigte Domain bleibt bestätigt, bis du sie entfernst – auch Domains, die früher auf anderem Weg bestätigt wurden. Eine Domain, die nach 7 Tagen noch nicht bestätigt ist, wird wieder freigegeben; danach kann jemand anderes sie eintragen.

Unter der Domain gibt es kurze Adressen (`/` für die Startseite, `/<Seiten-ID>` für Unterseiten), eine eigene `sitemap.xml` und `robots.txt`, und Suchmaschinen dürfen die Seiten aufnehmen; der `/share/…`-Link nennt sie als kanonische Adresse. Die Domain zeigt nur diese Veröffentlichung: keine Anmeldung, keine App, keine API außer den Lesezugriffen der Veröffentlichung, keine Cookies, und die Seiten lassen sich nicht in fremde Seiten einbetten.

Veröffentlichungen mit Passwort lassen sich nicht unter einer eigenen Domain zeigen. Endet die Veröffentlichung, antwortet die Domain mit 404.

> [!WARNING]
> Eingebettete Videos und externe Bilder laden beim Ansehen Inhalte vom jeweiligen Anbieter. Das gilt auch für veröffentlichte Seiten.

## Formulare

Formulare haben einen eigenen Link, siehe [Formulare](/forms#formular-teilen).
