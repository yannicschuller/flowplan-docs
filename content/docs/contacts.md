---
keywords: Kontakte, CRM, Adressbuch, vCard, CardDAV, LDAP
---

# Kontakte

Eine Kontakte-Datenbank ist ein Adressbuch für Personen: Jeder Eintrag hat eine Profilseite mit Kontaktkarte, darunter Platz für Notizen. Kontakte lassen sich aus einem LDAP-Verzeichnis übernehmen und abgleichen, als vCard importieren und exportieren und als Adressbuch (CardDAV) auf dem Telefon abonnieren.

## Kontakte-Datenbank anlegen

**Neue Seite → Datenbank → Kontakte**. Die Datenbank bringt mit:

| Eigenschaft | Art |
| --- | --- |
| Name | Text – der Anzeigename „Vorname Nachname“ |
| Vorname, Nachname | Text |
| Firma, Position | Text |
| E-Mail | E-Mail |
| Telefon, Mobil | Telefon |
| Straße, PLZ, Ort, Land | Text |
| Geburtstag | Datum |
| Tags | Mehrfachauswahl |

Dazu die Ansichten **Alle Kontakte** (Liste, nach Nachname sortiert), **Tabelle**, **Geburtstage** (Kalender) und **Galerie**. Einträge öffnen als ganze Seite.

- **Name**: Ein neuer Eintrag heißt „Neuer Kontakt“. Tippst du einen vollständigen Namen in den Titel („Anna Maria Schmidt“), füllt Flowplan Vor- und Nachname (das letzte Wort ist der Nachname). Änderst du Vor- oder Nachname, folgt der Titel – bis du ihn selbst anders schreibst, etwa „Dr. A. Schmidt“.
- **Geburtstage** wiederholen sich jährlich: Der Kalender „Geburtstage“ zeigt sie jedes Jahr, mit Alter auf der Kontaktkarte.
- **Für KI gesperrt**: Kontakte sind personenbezogene Daten. Neue Kontakte-Datenbanken sind deshalb [für die KI gesperrt](/ai#seiten-und-bereiche-fuer-die-ki-sperren); wer die Seite verwaltet, kann das aufheben. Wer die Kontakte sieht, bestimmen wie immer die Rechte von Bereich und Seite (und, falls gesetzt, [Rechte pro Eintrag](/databases#rechte-pro-eintrag)).

## Die Profilseite

Oben steht die **Kontaktkarte**: Foto (oder Initialen), Position und Firma, anklickbare Knöpfe für E-Mail (`mailto:`), Telefon und Mobil (`tel:`), die Adresse mit Link zur Karte (OpenStreetMap) und der Geburtstag. Rechts lädt ⤓ den Kontakt als vCard herunter. Darunter folgen die Eigenschaften zum Bearbeiten und das Dokument für Notizen – mit allem, was der Editor kann.

Das Foto ist das Symbol des Eintrags: **Symbol ändern → Bild** setzt eines, beim vCard- oder LDAP-Import kommt es mit.

Die Kontaktkarte ist eine Einstellung des Layouts: **Layout anpassen** (Regler im Eintrag) → **Kontaktkarte oben**. So bekommt auch eine bestehende Datenbank eine Kontaktkarte, wenn sie Eigenschaften mit den Kennungen `firstName`, `lastName`, `company`, `email` … hat.

## Kontakte erwähnen

Mit **@** im Text findest du Kontakte wie jeden anderen Eintrag. Fährst du über die Erwähnung (oder tippst sie an), zeigt eine Karte Name, Position, Firma, E-Mail und Telefon – E-Mail und Telefon sind direkt anklickbar – und **Profil öffnen**. Die Karte zeigt nur, was du lesen darfst.

## vCard importieren und exportieren

Das Adressbuch-Symbol in der Werkzeugleiste der Datenbank öffnet das Menü **Kontakte**:

- **vCard importieren (.vcf)**: Dateien aus Apple Kontakte, Google Kontakte, Outlook oder Thunderbird, vCard 2.1, 3.0 und 4.0, beliebig viele Kontakte je Datei (bis 5 MB). Name, Firma, Position, erste E-Mail, Telefon und Mobil, (geschäftliche) Adresse, Geburtstag, Kategorien als Tags, die Notiz als Text des Eintrags und eingebettete Fotos (JPEG/PNG bis 256 KB) werden übernommen. Fotos über einen Link lädt Flowplan nie nach. Eine Karte, die aus dieser Datenbank exportiert wurde, aktualisiert ihren Eintrag statt einen neuen anzulegen.
- **Alle als vCard exportieren** oder – bei ausgewählten Einträgen – **Auswahl als vCard exportieren**: eine `.vcf`-Datei (vCard 3.0) mit Notiz und Foto. Einzelne Kontakte über ⤓ auf der Kontaktkarte. Exporte enthalten nur Einträge und Eigenschaften, die du lesen darfst, und erscheinen im Sicherheitsprotokoll.

## Als Adressbuch abonnieren (CardDAV)

**Kontakte → Als Adressbuch abonnieren (CardDAV)** macht die Datenbank zu einem Adressbuch in Apple Kontakte, Thunderbird oder DAVx⁵ (Android) – **nur lesend**: Änderungen machst du in Flowplan.

- **Zugang einrichten** zeigt Server, Benutzername und ein Passwort, das nur einmal angezeigt wird, dazu die Adresse des Adressbuchs. **Neues Passwort erzeugen** oder **Zugang beenden** beendet den alten Zugang.
- **Auf iPhone, iPad oder Mac einrichten** lädt ein Konfigurationsprofil mit dem CardDAV-Account (in der App über Safari; am Computer als QR-Code). Der Link gilt einmal und zehn Minuten.
- Von Hand in Apple: **Einstellungen → Kontakte → Accounts → Account hinzufügen → Andere → CardDAV-Account** mit Server, Benutzername und Passwort. Die Erkennung läuft über `/.well-known/carddav`.
- **Rechte**: Jede Abfrage prüft deine Rechte neu. Du siehst nur Einträge und Eigenschaften, die du in Flowplan lesen darfst; verlierst du den Zugriff auf die Datenbank, liefert das Adressbuch nichts mehr.

## Kontakte aus dem LDAP-Verzeichnis

Ist ein LDAP-Verzeichnis eingerichtet (siehe [Kontakte aus LDAP](/scim-and-ldap#kontakte-aus-ldap)), übernehmen Bearbeiter einer Kontakte-Datenbank Personen daraus.

Das Verzeichnis ist nur für Leute aus der Organisation da: Administratoren der Instanz, Konten, die sich mit LDAP anmelden, und Vollmitglieder (keine Gäste) mindestens eines Arbeitsbereichs, den jemand anderes angelegt hat. Gäste des Arbeitsbereichs der Kontakte-Datenbank können es nie durchsuchen oder importieren, und mit einem API-Token geht es auch nicht. Wer keinen Zugriff hat, sieht **Aus LDAP importieren** ausgegraut mit dem Grund.

1. **Kontakte → Aus LDAP importieren** öffnet den Baum der Organisationseinheiten (OU) unter dem Basis-DN; Unter-OUs laden beim Aufklappen.
2. Eine OU wählen: rechts stehen die Personen darin (Suche: in der OU und allen darunter). Bereits übernommene sind markiert.
3. Personen ankreuzen und **übernehmen** – oder **Ganze OU übernehmen (auch künftige)**: alle Personen der OU und ihrer Unter-OUs, neue kommen beim Abgleich dazu.
4. **Zuordnung der Attribute** (aufklappbar) legt fest, welches LDAP-Attribut welche Eigenschaft füllt; das erste Attribut mit Wert gilt. Standard:

| Eigenschaft | LDAP-Attribute |
| --- | --- |
| Name | `displayName`, `cn` |
| Vorname / Nachname | `givenName` / `sn` |
| Firma | `company`, `o` |
| Position | `title` |
| E-Mail | `mail` |
| Telefon / Mobil | `telephoneNumber` / `mobile` |
| Straße | `street`, `streetAddress` |
| PLZ / Ort / Land | `postalCode` / `l` / `co`, `c` |
| Geburtstag | `birthDate`, `dateOfBirth` (falls vorhanden) |
| Foto | `thumbnailPhoto`, `jpegPhoto` (JPEG/PNG bis 256 KB) |

Zuordnen lassen sich nur freigegebene Attribute: die der Standardzuordnung und die, die die Administration zusätzlich freigibt (`LDAP_CONTACTS_ATTRIBUTES` oder **Weitere Attribute**, siehe [Kontakte aus LDAP](/scim-and-ldap#kontakte-aus-ldap)). Der Dialog nennt die erlaubten Attribute; eine Zuordnung mit einem anderen wird abgelehnt. Nimmt die Administration ein Attribut wieder von der Liste, liest auch der Abgleich es nicht mehr.

**Abgleich** – nur Verzeichnis → Flowplan:

- Flowplan gleicht stündlich ab (einstellbar) und auf **Kontakte → Jetzt abgleichen**; das Menü zeigt das letzte Ergebnis.
- Eigenschaften aus dem Verzeichnis sind in Flowplan **schreibgeschützt** und mit **LDAP** markiert, die Kontaktkarte zeigt **aus LDAP**. Notizen, Tags und eigene Eigenschaften bleiben frei.
- Verschwindet ein Eintrag aus dem Verzeichnis, bleibt der Kontakt und bekommt den Tag **Nicht mehr im Verzeichnis**; taucht er wieder auf, verschwindet der Tag. Würde ein Lauf mehr als die Hälfte der Kontakte (mindestens fünf) als verschwunden markieren, bricht er ab – das ist eher eine falsche Konfiguration.
- Kontakte werden über `entryUUID` (OpenLDAP), `objectGUID` (Active Directory) oder `nsUniqueId` (389 DS) wiedergefunden, sonst über den DN – umbenannte oder verschobene Einträge behalten ihren Kontakt.
- Einer OU nicht mehr folgen: im Import-Dialog **Nicht mehr folgen**; die Kontakte bleiben.
- Importe stehen im Sicherheitsprotokoll der Administration.
