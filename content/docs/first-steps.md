# Erste Schritte

Vom ersten Anmelden bis zur ersten eigenen Seite: was du in den ersten zehn Minuten mit Flowplan tust.

## Anmelden oder registrieren

Du meldest dich mit E-Mail und Passwort an, mit einem Passkey (Fingerabdruck, Gesicht oder Geräte-PIN) oder – wenn deine Organisation das eingerichtet hat – über **Mit SSO anmelden** beim Login deiner Organisation (OpenID Connect, etwa Keycloak, Authentik, Zitadel oder Entra ID). Ein Konto legst du mit **Konto erstellen** an, sofern die Instanz die Registrierung erlaubt oder du eingeladen wurdest. Passkeys richtest du danach unter **Einstellungen → Konto & Sicherheit** ein. Alles Weitere unter [Anmeldung](/sign-in).

Auf einer ganz neuen Instanz legst du das erste Konto an – es verwaltet die Instanz. Ziehst du um oder installierst neu, wählst du dort stattdessen **Aus Sicherung wiederherstellen** ([Beim Einrichten wiederherstellen](/storage-and-backups#beim-einrichten-wiederherstellen)).

Beim ersten Anmelden legt Flowplan einen privaten Arbeitsbereich mit Beispielseiten an. Bei Single Sign-on kommen Name, E-Mail-Adresse und – falls vorhanden – das Profilbild vom Login-Anbieter.

> [!TIP]
> Bietet die Instanz eine **Demo** an, kannst du Flowplan ohne Konto ausprobieren. Die Demo bekommt einen eigenen Beispiel-Arbeitsbereich und wird beim Beenden, beim Abmelden oder nach 45 Minuten ohne Aktivität vollständig gelöscht.

**Sprache:** Flowplan folgt der Sprache deines Browsers. Unter **Einstellungen → Darstellung & Sprache → Sprache** wählst du aus der Liste Deutsch 🇩🇪, Englisch 🇬🇧, English (US) 🇺🇸, Französisch 🇫🇷 oder Chinesisch 🇨🇳 – dann gilt sie auf allen Geräten, auch für E-Mails und Push-Hinweise. Weitere Sprachen lassen sich hinzufügen: [Sprachen und Übersetzungen](/languages).

## Die Einführung

Nach dem Anlegen eines Kontos führt Flowplan einmal kurz durch das Wichtigste. Jeder Schritt lässt sich überspringen, und alles ist später in den Einstellungen änderbar:

1. **Willkommen**: Sprache und Erscheinungsbild (automatisch, hell oder dunkel).
2. **Womit möchtest du starten?** Den Namen des Arbeitsbereichs festlegen (als Eigentümer) und auf Wunsch gleich Seiten anlegen: eine **Aufgaben**-Datenbank, eine **Notizen**-Datenbank, ein **Journal** oder ein **Whiteboard**.
3. **Das kann Flowplan**: eine kurze Tour durch Seiten und Blöcke, Datenbanken, Whiteboards, Journal, Zusammenarbeit, Teilen, Suche und Offline – mit einem Tipp und einem Link in diese Dokumentation.
4. **Benachrichtigungen**: E-Mail-Zusammenfassungen (wenn die Instanz E-Mails verschickt) und Push auf diesem Gerät.
5. **Fertig**: die angelegten Seiten zum Öffnen und die wichtigsten Tastenkürzel.

Später öffnet **Einstellungen → Darstellung & Sprache → Einführung starten** (oder „Einführung“ in der Suche mit `⌘/Strg + K`) sie wieder. Konten, die es schon vor der Einführung gab, sehen sie nicht automatisch.

Die Einstellungen öffnen mit einer Übersicht: je Abschnitt eine Kachel, gruppiert in **Persönlich**, **Verbindungen**, **Arbeitsbereich** und **Hilfe & Info**. Oben hilft die Suche („Einstellung suchen …“) – „Passkeys“ findet etwa **Konto & Sicherheit** –, und jeder Abschnitt hat einen eigenen Link, z. B. `/#settings/notifications`.

## Die Oberfläche

- **Seitenleiste** links: Arbeitsbereich-Wechsel, Suche, Startseite, Posteingang, deine Bereiche mit dem Seitenbaum, darunter Vorlagen, Medien, Papierkorb und Einstellungen.
- **Startseite**: zuletzt bearbeitete Seiten, Schnellstarts für eine neue Idee oder ein Projekt und alle Seiten deines Arbeitsbereichs – mit Widgets nach deinen Wünschen anpassbar (siehe [Startseite anpassen](#startseite-anpassen)).
- **Kopfzeile** einer Seite: Pfad, Teilen, Kommentare, Favorit und das Menü **Seitenaktionen** (`…`).

Am Computer ziehst du den rechten Rand der Seitenleiste, um sie breiter oder schmaler zu machen (200 bis 480 Pixel); ein Doppelklick auf den Rand stellt die ursprüngliche Breite wieder her. Die Breite merkt sich Flowplan pro Gerät. Auf dem Smartphone klappt die Seitenleiste ein: Das Symbol oben links öffnet sie, ebenso ein Wischen nach rechts, das knapp neben dem linken Bildschirmrand beginnt (oder **Navigation** in der Leiste unten). Ganz am Rand bleibt auf dem iPhone die Zurück-Geste. Nach links gewischt oder mit einem Tipp daneben schließt sie wieder. Für iPhone und iPad gibt es außerdem eine **App im App Store**, für Android eine **App zum Herunterladen** ([Apps für iPhone, iPad und Android](/offline-and-apps#apps-fuer-iphone-ipad-und-android)).

### Zurück und vorwärts

Oben links, neben dem Symbol der Seitenleiste, führen die Pfeile **←** und **→** zur zuvor geöffneten Seite und wieder vor. Jeder Ort mit eigener Adresse ist ein Schritt: Seiten, Datenbanken, Journal-Tage, Whiteboards, ein geöffneter Eintrag einer Datenbank, die Startseite, Posteingang, Meine Aufgaben, Tags, Sammlungen, Medien, Papierkorb und die Bereiche der Einstellungen. Dialoge, Menüs und die Suche zählen nicht mit, und wer einen Eintrag schließt, den er in seiner Datenbank geöffnet hat, ist wieder dort, ohne einen Schritt mehr. Gibt es in einer Richtung nichts, ist der Pfeil ausgegraut.

- **Liste:** Ein Rechtsklick oder langes Drücken auf einen Pfeil zeigt die letzten (bis zu zehn) Seiten in dieser Richtung mit Symbol und Titel – ein Klick springt direkt dorthin.
- **Tastenkürzel:** <kbd>⌘</kbd> <kbd>[</kbd> und <kbd>⌘</kbd> <kbd>]</kbd> oder <kbd>⌥</kbd> <kbd>←</kbd> und <kbd>⌥</kbd> <kbd>→</kbd> (Windows und Linux: <kbd>Alt</kbd> <kbd>←</kbd> / <kbd>Alt</kbd> <kbd>→</kbd> oder <kbd>Strg</kbd> <kbd>[</kbd> / <kbd>Strg</kbd> <kbd>]</kbd>). Beim Schreiben bewegt <kbd>⌥</kbd>/<kbd>Alt</kbd> mit Pfeil wie gewohnt den Cursor; ändern lassen sich die Kürzel wie alle anderen ([Tastenkürzel](/keyboard-shortcuts)).
- **Browser:** Die Pfeile gehen denselben Weg wie die Zurück- und Vorwärts-Knöpfe des Browsers und die Seitentasten der Maus – beides lässt sich mischen.
- **Desktop-App:** zusätzlich das Menü *Navigation* → **Zurück** / **Vorwärts**, die Seitentasten der Maus und auf dem Mac das Wischen auf dem Trackpad ([Mehr aus der Desktop-App](/offline-and-apps#mehr-aus-der-desktop-app)).
- **Smartphone:** Dort gibt es die Pfeile nicht – zurück geht es mit der Zurück-Geste (iPhone) oder der Zurück-Taste (Android).

Kurze Animationen zeigen, was sich gerade bewegt hat: Karten und Zeilen gleiten an ihren neuen Platz, mitverschobene Balken in der Timeline rücken sichtbar nach, und das Ziel eines Sprungs – aus dem Inhaltsverzeichnis, der Suche oder einer Benachrichtigung – leuchtet kurz auf. Beim Wechsel zu einer anderen Seite blendet der Inhaltsbereich kurz über; öffnest du eine Seite im Seitenbaum, fliegen ihr Symbol und ihr Titel an ihren Platz, und eine Karte aus Board oder Galerie wächst zum Eintrag (auf dem Smartphone kommt er als Blatt von unten). Ein Tippen oder eine Taste beendet so einen Übergang sofort, und wer schnell hintereinander klickt, wechselt ohne Übergang. Hochgeladene Bilder zeigen, solange sie laden, eine unscharfe Vorschau in ihrer endgültigen Größe und blenden dann ein – nichts darunter verrutscht. Die Animationen folgen der Systemeinstellung **Bewegung reduzieren**: Ist sie aktiv, springt alles ohne Bewegung an sein Ziel, und Sprungziele werden nur kurz ruhig hervorgehoben.

## Startseite anpassen

Die Startseite gehört dir: Mit **Anpassen** oben rechts (oder „Startseite anpassen“ in der Schnellsuche) ordnest du sie aus Widgets so an, wie du arbeitest. Auf dem Smartphone steht alles in einer Spalte, auf dem Tablet in zwei, auf großen Bildschirmen in drei oder vier – in der App für iPhone, iPad und Android und in der Desktop-App siehst du dieselbe Startseite.

![Die Startseite beim Anpassen: Leiste mit Widget, Darstellung, Abbrechen und Fertig, ein Kopfbereich mit Verlauf und Widgets mit Griff, Pfeilen, Größe, Einstellungen und Entfernen](/screenshots/home-customize.webp "Die Startseite beim Anpassen: Begrüßung, Meine Aufgaben, Notizzettel, Fokus & Zeit, Termine und Journal heute.")

Im Bearbeitungsmodus:

- **Widget** öffnet die Auswahl: Begrüßung, Zuletzt bearbeitet oder angesehen, Favoriten, Seiten des Arbeitsbereichs, Meine Aufgaben, Posteingang, Journal heute, Termine, Datenbankansicht, angeheftete Seite, Schnell erfassen, Fokus & Zeit, Gewohnheiten, Zähler, Notizzettel, Aktivität, Meine Aktivität, Diese Woche, Links und – für die Administration – der Instanz-Status.
- **Verschieben**: am Griff ziehen, mit den Pfeilen nach oben/unten oder mit der Tastatur – Griff fokussieren, dann Pfeiltasten, <kbd>Pos1</kbd> und <kbd>Ende</kbd>.
- **Größe**: klein (eine Spalte), mittel (zwei), groß (drei) oder volle Breite. Ein Widget wird nie breiter als der Platz.
- **Einstellungen** (Zahnrad): eine eigene Überschrift und was das Widget zeigt – etwa bei **Meine Aufgaben** „Heute fällig und überfällig“, „Heute fällig“, „Überfällig“ oder „Alle offenen“, aus deinen Aufgaben oder den offenen Einträgen einer Datenbankansicht; bei **Termine** den Zeitraum (heute, 3 oder 7 Tage) und welche Kalender- und Zeitleistenansichten (auch mit Google, Microsoft 365 oder CalDAV verbundene) zählen.
- **Darstellung**: Kopfbereich mit Farbe, Verlauf oder dem Coverbild einer Seite, ein Emoji als Symbol, großzügige oder kompakte Abstände, ein dezenter Hintergrund (Punkte, Raster, getönt) und normale oder breite Seite.
- **Fertig** speichert, **Abbrechen** verwirft. Im Menü **…** speicherst du die Startseite **für alle deine Arbeitsbereiche** (sonst gilt sie nur für diesen) oder setzt sie **zurück**.

**Meine Aktivität** zeigt, wie viele Seiten du erstellt und bearbeitet hast – pro Woche, Monat oder Jahr (im Widget umschaltbar), mit einem Verlauf und dem Vergleich zum gleichen Abschnitt des vorigen Zeitraums. Eine bearbeitete Seite zählt höchstens einmal pro Tag, automatisches Speichern zählt nicht extra. Die Zahlen sieht nur du; Flowplan erfasst dafür nichts Neues und keine Zeiten, es zählt aus dem, was ohnehin gespeichert ist (Ersteller, Versionen, Aktivitätsprotokoll).

Aufgaben hakst du direkt im Widget ab, Gewohnheiten ebenso; im Journal-Widget schreibst du ein paar Zeilen in den heutigen Eintrag, im Notizzettel notierst du, was nirgends sonst hinpasst – er wird beim Tippen gespeichert und ist auf allen Geräten gleich.

Widgets zeigen nur, was du ohnehin sehen darfst: Seiten anderer Arbeitsbereiche erscheinen nicht, Journale hinter einer PIN zeigen nur ihren Namen, und von Ende-zu-Ende-verschlüsselten Bereichen sieht die Startseite keinen Inhalt.

> [!TIP]
> Eigentümerinnen und Eigentümer eines Arbeitsbereichs legen über **… → Als Standard für Mitglieder festlegen** die Startseite fest, die neue Mitglieder (und alle ohne eigene) sehen. Persönliche Notizen werden dabei nicht übernommen.

## Die erste Seite

1. Neben einem Bereich in der Seitenleiste auf **+** klicken oder auf der Startseite **Neue Seite** wählen.
2. Oben einen Namen eingeben und darunter die Art wählen: **Dokument**, **Datenbank**, **Whiteboard**, **Journal**, **Dashboard**, **Notizbuch**, **Workflow** oder **Aus Vorlage** (mit den Pfeiltasten geht es auch per Tastatur). Eine Zeile darunter beschreibt die gewählte Art, bei Datenbank und Notizbuch folgen gleich dort ihre Optionen; **Bereich** legt fest, wo die Seite entsteht.
3. **Seite erstellen** (auf dem Telefon bleiben die Knöpfe über der Bildschirmtastatur) und losschreiben. Gespeichert wird automatisch, auch ohne Verbindung.

Im Dokument öffnet `/` das Blockmenü: `/h2`, `/todo` oder `/tabelle` tippen und mit Enter einfügen. Wie der Editor im Detail funktioniert, steht unter [Dokumente und Editor](/documents).

## Finden statt suchen

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux: <kbd>Strg</kbd> <kbd>K</kbd>) öffnet die Schnellsuche über Titel, Texte, Datenbankeinträge, Kommentare und sogar den Inhalt hochgeladener PDFs und Office-Dateien. Mehr dazu unter [Suche, Posteingang und Push](/search-and-notifications).

## Wie es weitergeht

- [Seiten und Bereiche](/pages-and-spaces): Seitenbaum, Favoriten, Verschieben und Papierkorb.
- [Datenbanken](/databases): Tabellen, Boards, Kalender und mehr aus denselben Einträgen.
- [Zusammenarbeit und Kommentare](/collaboration): gemeinsam schreiben, kommentieren, erwähnen.

## Hilfe und Community

Fragen, Ideen oder einfach Hallo sagen: Im **[Flowplan-Discord](https://discord.gg/bCEdB6MPrR)** helfen sich Nutzerinnen, Nutzer und Admins gegenseitig. Fehler und Funktionswünsche am besten als [GitHub-Issue](https://github.com/yannicschuller/flowplan/issues) melden, damit nichts verloren geht.

### Über Flowplan

**Einstellungen → Hilfe & Info → Über Flowplan** (`/#settings/about`, auch im Kontomenü ⋯ unten in der Seitenleiste und mit `⌘/Strg + K` → „Über Flowplan“) zeigt:

- **Version:** die laufende Version, den Commit und das Build-Datum, bei unseren Docker-Images auch, ob es eine **Beta** (`:beta`) oder ein **Release** ist. Admins sehen hier zusätzlich, wenn eine neuere Version bekannt ist. Bei einer Fehlermeldung die Version am besten mit angeben.
- **Lizenz & Quellcode:** Flowplan ist freie Software unter der GNU AGPL-3.0 – mit Link zum Lizenztext und zum Quellcode des Codes, der auf dieser Instanz läuft.
- **Links:** Website, Dokumentation, Discord und „Fehler melden“ (GitHub Issues).
- **Flowplan unterstützen ♥:** ein Link zu GitHub Sponsors. In den Apps für iPhone, iPad und Android erscheint er nie (Regeln der App Stores); Admins können ihn mit `FLOWPLAN_HIDE_SPONSOR=true` ausblenden ([Konfiguration](/configuration#rechtliches-und-oberflaeche)).

Die Suche findet die Seite unter „Über“, „Version“, „Lizenz“, „Quellcode“, „Unterstützen“ oder „Sponsor“. Die Anmeldeseite nennt unten ebenfalls Lizenz (AGPL-3.0) und Quellcode.
