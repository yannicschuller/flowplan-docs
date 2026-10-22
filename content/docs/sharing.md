# Teilen und Veröffentlichen

**Teilen** oben rechts auf jeder Seite regelt drei Dinge: wer im Arbeitsbereich zugreifen darf, benannte Links für Außenstehende und die Veröffentlichung im Web.

## Zugriff im Arbeitsbereich

Seiten erben die Rechte ihres Bereichs und ihrer übergeordneten Seiten (**Geerbt**). Zusätzlich lassen sich einzelnen Personen oder Gruppen Rechte geben:

| Rolle | Darf |
| --- | --- |
| **Ansehen** | Lesen und kommentieren |
| **Bearbeiten** | Inhalte, Einträge und Ansichten ändern |

Private Bereiche und Seiten sind nur für Freigegebene sichtbar. Gäste sehen ausschließlich, was ihnen ausdrücklich freigegeben wurde (siehe [Arbeitsbereiche, Mitglieder und Rechte](/workspaces-and-permissions)).

### Eine Seite mit einer Person teilen

Eine Seite oder Datenbank lässt sich mit einer Person teilen, die nicht im Arbeitsbereich ist – ohne sie in den ganzen Arbeitsbereich aufzunehmen. **Teilen → Personen mit Zugriff auf diese Seite**: E-Mail-Adresse eingeben (Mitglieder werden vorgeschlagen), **Ansehen** oder **Bearbeiten** wählen, **Hinzufügen**.

- **Die Person hat schon ein Konto auf dieser Instanz** (mit bestätigter Adresse)**:** Sie hat sofort Zugriff auf die Seite samt Unterseiten und bekommt eine Benachrichtigung im Posteingang („… hat „Seite“ mit dir geteilt“) und – wenn die Instanz E-Mails verschickt – sofort eine E-Mail mit Link zur Seite. Unter **Einstellungen → Benachrichtigungen → Mit dir geteilte Seiten** lässt sich die E-Mail abschalten. Ist sie noch nicht im Arbeitsbereich, kommt sie als **Gast** dazu und sieht nur, was mit ihr geteilt ist.
- **Noch kein Konto:** Sie bekommt eine Einladung per E-Mail (wenn eingerichtet) und steht als „Eingeladen“ in der Liste. Legt sie mit dieser Adresse ein Konto an, ist die Seite sofort da. Das gilt auch für ein Konto, dessen Adresse noch nicht bestätigt ist – dann öffnet erst der Einladungslink (**Einstellungen → Mitglieder → Ausstehende Einladungen → Link kopieren**) die Seite.
- Gäste sehen die Liste der Personen mit Zugriff nicht; E-Mail-Adressen sehen nur, wer teilen darf. Pro Person gehen höchstens einige Dutzend Einladungen pro Stunde hinaus und an jede Adresse wenige E-Mails.
- In der Liste lassen sich Rollen ändern und Personen wieder **Entfernen**. Hat ein Gast danach keine geteilte Seite mehr, ist er auch nicht mehr im Arbeitsbereich.
- Teilen dürfen Eigentümer des Arbeitsbereichs und Eigentümer des Bereichs, in dem die Seite liegt. Alle anderen sehen die Liste nur.

## Links mit eigenen Berechtigungen

Unter **Links mit eigenen Berechtigungen** entstehen beliebig viele benannte Links, z. B. „Feedback vom Kunden“:

| Linkberechtigung | Besucher dürfen |
| --- | --- |
| **Lesen** | die Seite ansehen |
| **Lesen und kommentieren** | zusätzlich kommentieren; Kommentare tragen einen Gastvermerk |
| **Lesen, kommentieren und bearbeiten** | zusätzlich Titel, Text und sichtbare Eigenschaften bestehender Einträge ändern |

- Links funktionieren ohne Konto und lassen sich einzeln widerrufen.
- Mit **Bearbeiten**-Links schreiben Gäste live mit: Änderungen von Mitgliedern und anderen Gästen erscheinen sofort, und die Cursor sind gegenseitig sichtbar – Gäste erscheinen als „Gast · <Linkname>“.
- Optional gelten sie auch für die aktuell vorhandenen Unterseiten; neue Unterseiten kommen nicht automatisch dazu.
- Über Bearbeitungslinks lassen sich keine Rechte, Mitglieder, privaten Relationen oder Dateien-Eigenschaften ändern. Vor jeder Gastbearbeitung sichert Flowplan den bisherigen Inhalt.

### Passwort und Ablaufdatum

Links mit eigenen Berechtigungen und [Veröffentlichungen](#im-web-veroeffentlichen) können ein **Passwort** und ein **Ablaufdatum** haben – beim Erstellen oder später über **Passwort und Ablaufdatum** im Teilen-Dialog. Die Liste zeigt „Passwort“ bzw. „läuft ab am …“.

- Besucher geben das Passwort einmal pro Gerät ein. Es gilt bis zu 12 Stunden und nur für diesen Link; ein neues Passwort meldet alle Besucher ab.
- Zehn falsche Versuche in 15 Minuten sperren die Adresse für diesen Link.
- Bearbeiten-Links haben Tagesbudgets: Gäste laden je Link höchstens 200 MB Dateien pro Tag hoch (20 Dateien je 10 Minuten) und senden höchstens 100 MB Änderungen pro Tag; ein Dokument wächst über einen Link nicht über 3 MB Text hinaus. Für die ganze Instanz gilt zusätzlich `FLOWPLAN_ANONYMOUS_UPLOAD_MB` ([Konfiguration](/configuration)).
- Nach dem Ablaufdatum zeigt der Link nur noch „abgelaufen“ – keine Inhalte, keine Dateien, keine Live-Updates.
- Passwort entfernen oder Ablauf verlängern geht jederzeit.
- Passwortgeschützte Veröffentlichungen lassen sich nicht in andere Arbeitsbereiche kopieren.
- Das Passwort wird nur als Hash gespeichert und nie wieder angezeigt.

## Im Web veröffentlichen

**Öffentlichen Link aktivieren** macht die Seite für alle mit dem Link lesbar.

- **Aktuell vorhandene Unterseiten mit veröffentlichen**; später lassen sich neue Unterseiten zur Auswahl hinzufügen.
- **Besucher dürfen eine Kopie in ihren Arbeitsbereich** übernehmen – nur das, was die Veröffentlichung zeigt.
- Datenbanken erscheinen mit ihren Ansichten – Tabelle, Board, Galerie, Liste, Feed, Kalender, Timeline und Diagramm (auch mit Datenreihen und weiteren Werten) –, Einträgen und Eintragsdokumenten. Eine Ansicht wird nur veröffentlicht, wenn alle Eigenschaften, die sie braucht, öffentlich sind. Personen-Eigenschaften, Relationen, Formeln, Rollups und interne Kommentare bleiben privat.
- Dateien, die in veröffentlichten Seiten verlinkt sind, sind öffentlich; andere Uploads nicht.
- Ausschalten, Löschen oder Verschieben aus dem veröffentlichten Baum entzieht den Zugriff sofort, auch auf Dateien.

### Aussehen

Unter dem öffentlichen Link legst du das Aussehen der Veröffentlichung fest: **Logo** und **Favicon** (HTTPS-Adresse oder eine hochgeladene Datei, die die Veröffentlichung zeigt), **Akzentfarbe**, **Text in der Fußzeile** und **„Mit Flowplan veröffentlicht“ ausblenden**.

### Eigene Domain

Ist es in der Administration eingeschaltet (**Eigene Domains für Veröffentlichungen**), zeigt eine Veröffentlichung sich auch unter deiner Domain, etwa `docs.example.org`:

1. Unter **Eigene Domain** die Domain eintragen.
2. Beim DNS-Anbieter den angezeigten TXT-Eintrag anlegen: Name `_flowplan-verify.docs.example.org`, Wert `flowplan-verify-…`. Alternativ liefert die Domain die Datei `https://docs.example.org/.well-known/flowplan-verify.txt` mit diesem Wert aus.
3. Die Domain per CNAME (oder A/AAAA) auf die Flowplan-Instanz zeigen lassen.
4. **Jetzt prüfen** wählen. Das HTTPS-Zertifikat besorgt der Reverse Proxy – siehe [Eigene Domains für Veröffentlichungen](/coolify-and-proxy#eigene-domains-fuer-veroeffentlichungen).

Unter der Domain gibt es kurze Adressen (`/` für die Startseite, `/<Seiten-ID>` für Unterseiten), eine eigene `sitemap.xml` und `robots.txt`, und Suchmaschinen dürfen die Seiten aufnehmen; der `/share/…`-Link nennt sie als kanonische Adresse. Die Domain zeigt nur diese Veröffentlichung: keine Anmeldung, keine App, keine API außer den Lesezugriffen der Veröffentlichung, keine Cookies, und die Seiten lassen sich nicht in fremde Seiten einbetten.

Veröffentlichungen mit Passwort lassen sich nicht unter einer eigenen Domain zeigen. Endet die Veröffentlichung, antwortet die Domain mit 404.

> [!WARNING]
> Eingebettete Videos und externe Bilder laden beim Ansehen Inhalte vom jeweiligen Anbieter. Das gilt auch für veröffentlichte Seiten.

## Formulare

Formulare haben einen eigenen Link, siehe [Formulare](/forms#formular-teilen).
