---
keywords: veröffentlichen, öffentlich, Website, Web, öffentlicher Link, eigene Domain, Aussehen, Suchmaschinen, publish
---

# Im Web veröffentlichen

Eine Seite samt Unterseiten für alle mit dem Link lesbar machen – mit eigenem Aussehen und auf Wunsch unter deiner Domain. Personen und Links mit eigenen Berechtigungen stehen unter [Teilen](/sharing).

Im Reiter **Web** macht der Schalter **Im Web veröffentlichen** die Seite für alle mit dem Link lesbar. Darauf folgen der öffentliche Link (**Kopieren** oder öffnen) und die Optionen:

- **Aktuell vorhandene Unterseiten mit veröffentlichen**; später angelegte holt **Auswahl um neue Unterseiten ergänzen** dazu.
- **Neue Unterseiten automatisch veröffentlichen** (nur zusammen mit den Unterseiten): Seiten, die später unter der veröffentlichten Seite angelegt, dorthin verschoben, dort dupliziert oder dorthin wiederhergestellt werden – auch von anderen und in jeder Tiefe –, sind ohne weiteren Schritt öffentlich, mit Passwort, Ablauf, Kopier-Einstellung und Aussehen dieser Veröffentlichung. Wird eine solche Seite wieder herausverschoben, ist sie nicht mehr veröffentlicht. Nie automatisch öffentlich werden Seiten, die du selbst nicht veröffentlichen dürftest (ohne deine Schreibrechte), Journale mit PIN, Workflow-Seiten und Seiten verschlüsselter Bereiche. Schaltest du die Option aus, bleiben die bis dahin hinzugekommenen Unterseiten veröffentlicht; neue kommen nicht mehr dazu.
- **Besucher dürfen eine Kopie in ihren Arbeitsbereich übernehmen** – nur das, was die Veröffentlichung zeigt.
- **Pfeil ↗ hinter Links zeigen:** ob Links ins Web auf der veröffentlichten Seite den kleinen Pfeil tragen. Voreingestellt wie deine Einstellung [Symbol bei externen Links](/links-and-mentions#seitenlinks-und-erwaehnungen); Veröffentlichungen von vor dieser Version behalten den Pfeil. {since=0.9.7}
- Datenbanken erscheinen mit ihren Ansichten – Tabelle, Board, Galerie, Liste, Feed, Kalender, Timeline und Diagramm (auch mit Datenreihen und weiteren Werten) –, Einträgen und Eintragsdokumenten. Eine Ansicht wird nur veröffentlicht, wenn alle Eigenschaften, die sie braucht, öffentlich sind. Personen-Eigenschaften, Relationen, Formeln, Rollups und interne Kommentare bleiben privat. Datenbankseiten nutzen die volle Fensterbreite, wie in der App. {since=0.11.0}
- Die **Timeline** sieht aus wie in der App, nur zum Lesen: mit Zeitraum und Zoom, wie du sie in der Ansicht gespeichert hast, zweizeiliger Achse, Meilensteinen als Raute, Titeln, die am linken Rand stehen bleiben, und den gewählten öffentlichen Eigenschaften daneben, Wochenenden, der Linie für heute und der Sortierung der Ansicht. Einträge außerhalb des Zeitraums bleiben als leere Zeilen stehen, angeschnittene Balken sind markiert. Abhängigkeitspfeile und der kritische Pfad erscheinen wie eingerichtet – nur zwischen veröffentlichten Einträgen, und nicht, wenn eine Leseregel die Abhängigkeits-Eigenschaft schützt. Besucher können scrollen und zoomen; gespeichert wird nichts. {since=0.11.0}
- Dateien, die in veröffentlichten Seiten verlinkt sind, sind öffentlich; andere Uploads nicht.
- Ausschalten, Löschen oder Verschieben aus dem veröffentlichten Baum entzieht den Zugriff sofort, auch auf Dateien.
- Hat eine Seite Überschriften, blenden Besucher über das Listen-Symbol rechts neben dem Text die **Gliederung** ein (auf dem Smartphone der runde Knopf unten rechts). Sie zeigt, wo man gerade liest, und springt per Klick zur Überschrift. Ob sie offen ist, merkt sich der Browser – wie im Editor.

## Wer veröffentlichen darf {since=0.11.6}

Veröffentlichen braucht Bearbeitungsrechte auf der Seite, wie das Erstellen von Links – wer die Seite nur lesen darf, kann sie nicht öffentlich machen. Das geht auch, während die Seite im Lesemodus offen ist.

Ist der Schalter **Im Web veröffentlichen** ausgegraut, steht darunter der Grund:

- **Die Seite ist gesperrt:** Entsperre sie im Seitenmenü ([Seitenaktionen](/pages-and-spaces#seitenaktionen)). Eine gesperrte Seite lässt sich gar nicht ändern – auch nicht, wer sie sehen darf.
- **Die Funktion ist für die Instanz ausgeschaltet** (**Einstellungen → Instanz → Name & Version → [Funktionen dieser Instanz](/instance-features)**): Seiten einer abgeschalteten Funktion öffnen nur zum Lesen und lassen sich nicht veröffentlichen.
- **Dir fehlen Bearbeitungsrechte** auf der Seite.

Wer den Link hat, kann ihn weitergeben – eine veröffentlichte Seite ist öffentlich. Willst du steuern, wer sie sieht, nimm einen Link mit [Passwort und Ablaufdatum](/sharing#passwort-und-ablaufdatum) oder [lade Personen ein](/sharing#eine-seite-mit-einer-person-teilen).

## Hell, dunkel und zurück zur Ansicht {since=0.11.0}

Geteilte und veröffentlichte Seiten – auch [einzeln geteilte Einträge](/sharing#einzelne-eintraege-teilen) – haben oben rechts einen kleinen Knopf mit Sonne oder Mond. Er wechselt der Reihe nach zwischen **automatisch** (wie das Gerät des Besuchers), **hell** und **dunkel**. Die Wahl merkt sich der Browser auf diesem Gerät, wie [Hell und dunkel](/offline-and-apps#hell-und-dunkel) in der App (im lokalen Speicher unter `flowplan-theme`, kein Cookie). Eine Vorgabe der veröffentlichenden Person gibt es nicht: Ohne eigene Wahl folgt die Seite dem Gerät.

- **Zurück zur Ansicht:** Öffnet ein Besucher einen Eintrag aus einer Ansicht einer Datenbank, steht über dem Pfad **← Zurück zu <Ansicht>**. Der Link führt in dieselbe Ansicht zurück, mit demselben Monat (Kalender, Timeline) und an die Stelle, an die gescrollt war. Die Ansicht und ihr Monat stehen dafür in der Adresse des Eintrags (`?row=…&view=…&month=…`), die Scrollposition nur in diesem Tab (Sitzungsspeicher). Das gilt für Links mit eigenen Berechtigungen wie für Veröffentlichungen. Über einen Link im Dokument, eine Relation oder eine Adresse ohne Ansicht geöffnet, zeigt der Eintrag nur den Pfad.
- **Eintrag daneben:** In Fenstern ab 1000 Pixel Breite öffnet ein Eintrag aus einer Ansicht im Seitenfenster neben der Ansicht – mit Titel, öffentlichen Eigenschaften und Text; <kbd>↑</kbd>/<kbd>↓</kbd> blättern durch die Einträge der Ansicht, **Als Seite öffnen** führt zur eigenen Seite des Eintrags. Schmalere Fenster und ⌘/Strg-Klick öffnen ihn wie bisher als Seite. {since=0.11.0}
- **Titel im Pfad:** Der Pfad endet mit dem Titel des Eintrags statt mit „Eintrag“; lange Titel werden mit „…“ gekürzt, der ganze steht im Tooltip. Ist die Titel-Eigenschaft für Besucher nicht lesbar (etwa mit eingeschränkter [Sichtbarkeit](/properties-and-formulas#sichtbarkeit-von-eigenschaften)), bleibt es bei „Eintrag“.

## Lernkarten über einen Link {since=0.10.0}

Ein [Lernkarten-Stapel](/flashcards) zeigt über einen Link mit eigenen Berechtigungen oder als Veröffentlichung seine Ansicht **Lernen**:

- **Durchblättern**: alle Karten als Raster, je 100 auf einer Seite; ein Klick oder **Umdrehen** zeigt die Rückseite. Ohne JavaScript klappt **Umdrehen** die Rückseite unter der Karte auf. {since=0.11.0}
- **Üben**: der Fokusmodus mit Wertungen, ohne Konto. Der Lernstand liegt nur im Browser des Besuchers (im lokalen Speicher unter `flowplan-study:` und dem Link) – kein Cookie, nichts geht an den Server. Ein Hinweis sagt das einmal; **Fortschritt löschen** entfernt ihn. Erlaubt der Browser keinen Speicher, gilt die Übung nur für diese Sitzung.
- Öffentlich ist eine Lernen-Ansicht nur, wenn alle Eigenschaften der Kartenzuordnung öffentlich sind; private Einträge werden nie zu Karten. Bilder kommen über den Link, Passwort und Ablaufdatum gelten wie für alles andere.
- Wer im Arbeitsbereich angemeldet ist und den Stapel lesen darf, bekommt **In Flowplan lernen** mit dem eigenen Lernstand. Eine Kopie der Veröffentlichung übernimmt die Kartenzuordnung.
- **In Flowplan lernen** öffnet den Stapel in der App auf derselben Lernen-Ansicht und startet gleich den Fokusmodus – auch in der App fürs Smartphone. Gibt es die Ansicht nicht mehr, öffnet sich die erste Lernen-Ansicht des Stapels mit einem Hinweis. Auf einer eigenen Domain gibt es den Knopf nicht. {since=0.11.0}

## Wie die Seite für andere aussieht {since=0.11.6}

Veröffentlichte und per Link geteilte Seiten sehen so aus, wie du sie siehst: Seitensymbol über oder neben dem Titel, deine Schriftart und ob erledigte Aufgaben durchgestrichen sind, kommen beim Veröffentlichen bzw. Erstellen des Links aus deinen Einstellungen unter **Darstellung & Sprache**. Im Reiter **Web** des Teilen-Dialogs änderst du sie für diese Veröffentlichung (**Seitensymbol**, **Schriftart**, **Erledigte Aufgaben durchstreichen**), ohne deine eigenen Einstellungen zu ändern. Hell/Dunkel und Sprache wählen Besucher selbst.

## Vorschau in Messengern und sozialen Netzwerken {since=0.11.6}

Teilst du die Adresse einer Veröffentlichung in einem Messenger oder sozialen Netzwerk, zeigt die Vorschau den Titel der Seite, den Anfang ihres Textes (etwa 200 Zeichen) und ihr Cover-Bild. Eine Seite ohne Text oder mit einer Cover-Farbe statt eines Bildes zeigt nur den Titel. Steht die Veröffentlichung hinter einem Passwort oder ist sie abgelaufen, zeigt die Vorschau nichts von der Seite, nur die allgemeine von Flowplan. Das gilt auch für benannte Links aus dem Reiter **Links**.

## Aussehen

Im Reiter **Web** klappt unter den Optionen **Aussehen** auf. Dort legst du das Aussehen der Veröffentlichung fest: **Logo** und **Favicon** (HTTPS-Adresse oder eine hochgeladene Datei, die die Veröffentlichung zeigt), **Akzentfarbe**, **Text in der Fußzeile** und **„Mit Flowplan veröffentlicht“ ausblenden** – übernommen mit **Aussehen speichern**.

## Eigene Domain

Ist es unter **Einstellungen → Instanz → Erweiterungen & Domains** eingeschaltet (**Eigene Domains für Veröffentlichungen**), zeigt eine Veröffentlichung sich auch unter deiner Domain, etwa `docs.example.org`:

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
