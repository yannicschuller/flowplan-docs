---
keywords: offline, ohne Internet, PWA, installieren, Web-App, dunkler Modus
---

# Offline und Web-App

Flowplan läuft im Browser, lässt sich als App installieren und funktioniert auch ohne Verbindung weiter.

**Mehr zum Thema:** [Desktop-App für macOS, Windows und Linux](/desktop-app) · [Apps für iPhone, iPad und Android](/mobile-apps) · [Widgets und Mitteilungen in den Apps](/mobile-widgets) · [Erfassen, Teilen und Scannen in den Apps](/mobile-capture)

## Ohne Verbindung arbeiten

Dokumente speichert Flowplan immer zuerst lokal im Browser (IndexedDB) und gleicht sie mit dem Server ab, sobald er erreichbar ist. Bricht die Verbindung ab, schreibst du einfach weiter; Änderungen anderer werden beim Wiederverbinden zusammengeführt.

### Offline-Nutzung einschalten

Unter **Einstellungen → Offline & Geräte** speichert das Gerät zusätzlich die App, den Arbeitsbereich, alle lesbaren Seiten und später geöffnete Einträge und Dateien. Dann lassen sich auch ohne Verbindung Seiten öffnen, Dokumente und Datenbanken lesen und Text bearbeiten.

- Online kommt immer der aktuelle Stand vom Server; die Kopie dient nur ohne Verbindung.
- Ist die Anmeldung abgelaufen, zeigt Flowplan online die Anmeldeseite – ohne Verbindung öffnet die gespeicherte Kopie trotzdem.
- Die Kopien enthalten private Inhalte. Sie werden beim Abmelden, beim Ausschalten und bei der Anmeldung einer anderen Person entfernt.

#### Die ganze App auf dem Gerät

Zur Kopie gehört die ganze App – nicht nur die Teile, die du online schon geöffnet hast. Auch Editor, Kalender-, Zeitleisten- und Galerieansichten, Dashboards, Diagramme, Whiteboards, Notizbücher, Formeln, Mermaid-Diagramme und der PDF-Viewer laden dann ohne Verbindung.

- **Speicherbedarf:** etwa 18 MB auf dem Gerät (rund 5 MB Download), einmal je Version. Flowplan speichert die App-Dateien nur, wenn das Gerät genug Platz hat.
- **Neue Version:** Nach einem Update lädt Flowplan beim nächsten Abgleich die Dateien der neuen Version; was sich nicht geändert hat, wird übernommen statt neu geladen. Sobald die neue Version vollständig gespeichert ist, entfernt es die alte.
- Unter **Einstellungen → Offline & Geräte** steht dazu eine Zeile wie „Die App ist für die Offline-Nutzung gespeichert (Version 0.7.0) · 18 MB“ – oder wie viele Dateien noch fehlen.
- Fehlt ohne Verbindung doch einmal ein Teil, zeigt Flowplan an seiner Stelle „Nicht offline verfügbar – versuche es wieder, wenn du online bist“ mit **Erneut versuchen**; der Rest der App bleibt bedienbar, und sobald die Verbindung zurück ist, lädt der Teil von selbst. Ein Eintrag, dessen Inhalt nicht in der Kopie liegt, zeigt „Dieser Eintrag ist offline nicht verfügbar.“

#### Die Kopie bleibt aktuell

Solange Flowplan geöffnet ist, gleicht es die Kopie selbst ab: beim Start, wenn die Verbindung zurückkommt, wenn du die App wieder in den Vordergrund holst, und alle 6 Stunden. Dabei lädt es nur, was sich seit dem letzten Abgleich geändert hat – meist zwei kleine Anfragen.

- **Neue Seiten** kommen dazu, **geänderte** Seiten, Einträge und Dokumente werden neu geladen.
- **Gelöschte Seiten** und Seiten, die du nicht mehr lesen darfst (auch ein Journal hinter einer PIN), verschwinden samt ihren Einträgen und Dateien aus der Kopie.
- Läuft ein Abgleich länger, steht unten links kurz **Offline-Kopie wird aktualisiert …**.
- Ist die Anmeldung abgelaufen, gleicht Flowplan nicht ab – die vorhandene Kopie bleibt unverändert.

Unter **Einstellungen → Offline & Geräte** steht der Stand, etwa „Offline-Kopie aktualisiert vor 2 Std. · 312 Seiten · 85 MB“. **Jetzt aktualisieren** lädt alle Seiten neu.

**Auch Eintragsinhalte und Dateien speichern** legt zusätzlich die Dokumente aller Datenbank-Einträge und die Dateien der Seiten ab, auch wenn du sie noch nie geöffnet hast – höchstens 200 MB und nur, solange das Gerät genug Platz hat. Ohne Haken bleiben nur Einträge und Dateien, die du schon einmal geöffnet hast. Ausschalten entfernt die zusätzlich gespeicherten Einträge und Dateien.

Ohne Verbindung zeigt Flowplan unter dem Offline-Hinweis das Datum der Kopie, wenn sie älter als 7 Tage ist („Offline-Kopie vom 12. Okt.“).

> [!NOTE]
> Als App installiert (Chrome, Edge, Android), gleicht Flowplan die Kopie auf Wunsch des Browsers auch im Hintergrund ab, wenn die App geschlossen ist (Periodic Background Sync). Ob und wie oft, entscheidet der Browser – meist nur bei häufig genutzten Apps. Einträge und Dateien, die noch nie geöffnet wurden, lädt erst die geöffnete App.

### Datenbank-Einträge offline

Änderungen an Einträgen ohne Verbindung erscheinen sofort in den Ansichten und werden auf dem Gerät gesammelt. Sobald die Verbindung zurück ist, gehen sie der Reihe nach an den Server. Ist der Server dabei kurz nicht erreichbar – etwa während eines Neustarts hinter dem Proxy (Antworten 502, 503, 504, 429 oder 408) –, bleiben die Änderungen in der Warteschlange und gehen beim nächsten Versuch hinaus, statt verworfen zu werden. Hat jemand denselben Eintrag inzwischen geändert, führt Flowplan die Änderungen Feld für Feld zusammen; wurde dasselbe Feld auf beiden Seiten geändert oder der Eintrag gelöscht, entscheidest du im Konfliktdialog.

> [!NOTE]
> Das Schema einer Datenbank – Eigenschaften und Ansichten – lässt sich nur mit Verbindung ändern.

### Offline in der App für iPhone und iPad

Die App für iPhone und iPad hält die Offline-Kopie selbst – für jede Instanz, auch eine selbst gehostete. (iOS erlaubt Apps keinen Service Worker für frei gewählte Adressen; in Safari und in der Android-App arbeitet Flowplan offline wie im Browser.)

- **Einschalten** wie überall unter **Einstellungen → Offline & Geräte** – je Profil der App. Dort steht zusätzlich „In der Flowplan-App gespeichert“; Stand, Größe, Version, **Jetzt aktualisieren**, **Auch Eintragsinhalte und Dateien speichern** und **Offline-Kopien entfernen** funktionieren wie im Browser.
- **Ohne Verbindung** – beim Start oder wenn die Instanz nicht erreichbar ist – öffnet die App die gespeicherte Kopie: dieselbe Seite, auf der du warst, mit dem Hinweis „Offline – du siehst den zuletzt gespeicherten Stand“. Seiten, Datenbanken, Einträge, Kalender, Dashboards und der Editor laufen aus der Kopie. Den Bildschirm „Keine Verbindung“ zeigt die App nur noch, wenn es für das Profil keine Kopie gibt.
- **Offline ändern:** Text in Dokumenten und Änderungen an Einträgen werden wie im Browser auf dem Gerät gesammelt und abgeglichen, sobald die Instanz wieder antwortet. Danach wechselt die App von selbst zur aktuellen Seite – erst, wenn du gerade nicht tippst.
- **Aktuell halten:** wie im Browser, solange die App offen ist, und zusätzlich jedes Mal, wenn sie in den Vordergrund kommt; nur Geändertes wird geladen.
- **Speicherort:** im Container der App, verschlüsselt bis zum ersten Entsperren nach einem Neustart und nicht in Backups. Die Kopie gehört zum Profil: **Abmelden** in Flowplan und **Abmelden und Profil entfernen** in den Einstellungen der App löschen sie; ein anderes Profil sieht sie nie.
- **Grenzen:** Dateien über 25 MB, der PDF-Viewer und die Texterkennung (OCR) brauchen in der App eine Verbindung; pro Profil höchstens 2 GB, und die App lässt immer 300 MB frei. Die Kopie braucht einen Flowplan-Server mit dieser Offline-Unterstützung (ab 0.7.0); mit älteren Servern zeigt die App ohne Verbindung ihren Bildschirm „Keine Verbindung“ wie bisher.

## Als App installieren

::: tabs

== Browser am Computer

- **Chrome, Edge**: Installieren-Symbol in der Adressleiste.
- **Safari auf dem Mac**: **Ablage → Zum Dock hinzufügen**.

== iPhone und iPad

Teilen → **Zum Home-Bildschirm**. Nur so sind dort Push-Nachrichten möglich.

== Android

Menü → **App installieren**.

:::

Die installierte App öffnet in einem eigenen Fenster ohne Browserleisten.

### Teilen an Flowplan

Ist Flowplan auf Android (Chrome) als App installiert, erscheint es im **Teilen**-Menü anderer Apps. Geteilte Texte und Links landen in einer Vorschau; **Als Seite speichern** legt daraus eine Seite im gewählten Bereich an. Ohne Anmeldung geht es erst zur Anmeldung und danach zurück zur Vorschau. iOS bietet Web-Apps dieses Menü nicht an.

Die Vorschau fragt, ob gespeichert wird **als Seite**, **als Eintrag** in einer Datenbank oder – bei Links – **als Lesezeichen**. Als Eintrag kommen Titel, Text und Link (bzw. der Artikeltext) in den Eintrag; der Link landet in der ersten URL-Eigenschaft der Datenbank, sonst im Text, und die Standardvorlage der Datenbank wird übernommen. Gibt es eine Standard-Datenbank zum Erfassen (siehe unten), ist **als Eintrag** mit ihr vorgewählt. **Artikeltext übernehmen** lädt die Webseite auf dem Server und übernimmt ihren Haupttext ohne Navigation, Werbung und Skripte (nur öffentliche Adressen).

### Web-Clipper im Browser

Unter **Einstellungen → Web-Clipper** liegt der Knopf **In Flowplan speichern**. In die Lesezeichenleiste gezogen, öffnet er auf jeder Webseite ein kleines Fenster mit Titel, Adresse und dem markierten Text – dieselbe Vorschau wie beim Teilen. Nach dem Speichern schließt sich das Fenster.

### Erfassen in eine Datenbank

Für einen Eingang („Inbox“), etwa nach PARA: **Schnell erfassen** auf der Startseite, ++⌘ ⌥ N++, `> erfassen` in der Schnellsuche oder – bei der installierten App – ein langer Druck auf das App-Symbol → **Erfassen** öffnen ein kleines Fenster mit Titel und Text. Gespeichert wird als Eintrag in der gewählten Datenbank; ohne Verbindung wartet er auf dem Gerät und wird angelegt, sobald die Verbindung zurück ist.

**Text verbessern** (mit dem KI-Symbol) unter den Feldern lässt den [Schreibassistenten](/ai-writing#schreibassistent) Rechtschreibung und Grammatik von Titel und Text verbessern. Das Ergebnis erscheint als Vorschau: **Übernehmen** setzt es in die Felder, **Original behalten** lässt alles, wie es war – gespeichert wird erst mit **Erfassen**. Kürzel wie `#tag`, `@Person`, `!hoch` oder „morgen“ und Links soll die KI unverändert lassen; hat sie eines davon verändert oder entfernt, nennt die Vorschau es, bevor du übernimmst. Den Knopf gibt es nur mit Verbindung und wenn der Schreibassistent für dich und die gewählte Datenbank erlaubt ist; er läuft wie im Editor über den Server oder [auf dem Gerät](/ai#ki-auf-dem-geraet-apple). Das Erfassen-Fenster der Desktop-App bekommt denselben Knopf mit der nächsten Version (siehe [Schnell erfassen (Desktop)](/desktop-capture#ki-vorschlag-optional)).

**Als Standard zum Erfassen verwenden** (im Fenster) oder **Einstellungen → Web-Clipper → Erfassen** legt die Datenbank fest, die Teilen, Web-Clipper und Schnell erfassen vorwählen – je Person und Arbeitsbereich. Die Standardvorlage der Datenbank wird übernommen, so landen neue Einträge zum Beispiel direkt in der Ansicht „Eingang“.

### Lesezeichen

Lesezeichen landen in der Datenbank **Lesezeichen** des gewählten Bereichs; sie entsteht beim ersten Mal von selbst, mit Link, Website, Ordner, Notiz, Datum und „Gelesen“ sowie den Ansichten Alle, Karten und Ungelesen. Der mitgenommene Artikeltext steht im Eintrag. **Lesezeichen-Datei wählen** importiert die HTML-Datei, die Chrome, Edge, Firefox und Safari beim Exportieren der Lesezeichen erzeugen – samt Ordnern und Datum; Links, die schon da sind, werden übersprungen.

## Hell und dunkel

Flowplan folgt von sich aus dem Hell- oder Dunkelmodus deines Geräts – auch wenn er sich ändert, während Flowplan offen ist (etwa abends automatisch). Unter **Einstellungen → Darstellung & Sprache → Erscheinungsbild** wählst du stattdessen fest **Hell** oder **Dunkel**; **Automatisch** folgt wieder dem Gerät. Die Wahl gilt pro Gerät. Anmeldung, öffentliche Seiten und Formulare, die Webseite und diese Dokumentation folgen ebenfalls dem Gerät, die Apps auch mit ihren eigenen Bildschirmen und Widgets.

Unter **Editor** zeigt **Griffe immer anzeigen** den Griff `⋮⋮` wieder neben jedem Block statt nur am Block unter dem Mauszeiger und am Block mit dem Cursor (siehe [Blöcke bearbeiten](/blocks)), und **Zeilennummern standardmäßig anzeigen** schaltet die Zeilennummern für alle Codeblöcke ohne eigene Einstellung ein – beides nur auf diesem Gerät, wie das Erscheinungsbild. **Formatierungsleiste** blendet die feste Leiste über dem Text aus oder ein; ausgeblendet trägt das Textmenü alle Formatierungen (siehe [Text formatieren](/formatting#text-formatieren)). Diese Wahl gilt für dein Konto auf allen Geräten.

Unter Seiten und Einträgen zeigt Flowplan **Verwandte Seiten**, **Verlinkt von** bzw. **Verknüpft von** und **Nicht verlinkte Erwähnungen**. Wer sie nicht braucht, schaltet **Einstellungen → Darstellung & Sprache → Verwandte Seiten und Rückverweise anzeigen** aus – auch das nur auf diesem Gerät. Dann erscheinen die Bereiche weder unter Seiten noch im Eintrag.

**Einstellungen → Darstellung & Sprache → Seitensymbol** legt fest, wo das Symbol einer Seite steht: **Über dem Titel** (Standard) zeigt es groß über dem Titel, **Neben dem Titel** klein links neben dem Titel in seiner ersten Zeile – wie in einem klassischen Dokument und mit weniger Platz über dem Text. Das gilt für Dokumente, Datenbanken, Whiteboards, Journal-Tage und alle anderen Seiten; ein Cover bleibt darüber. Die Wahl gilt für dein Konto auf allen Geräten und ändert nur deine Ansicht: Titel und Symbol der Seite bleiben, wie sie sind, andere sehen weiter ihre eigene Einstellung und veröffentlichte Seiten zeigen das Symbol über dem Titel.

**Einstellungen → Darstellung & Sprache → Neuigkeiten nach Updates** legt fest, ob nach einem Update von Flowplan einmal **Neu in Flowplan** erscheint: **Alle anzeigen** (Standard) zeigt die Hinweise aller übersprungenen Versionen, **Nur Breaking Changes** erscheint nur, wenn eine davon Änderungen enthält, auf die du dich einstellen musst, und zeigt nur diese, **Nie** zeigt den Dialog nicht. Die Wahl gilt für dein Konto auf allen Geräten, auch in den Apps für iPhone, iPad und Android. Unabhängig davon öffnet **Was ist neu** die Hinweise der letzten Versionen jederzeit: im Kontomenü ⋯ unten in der Seitenleiste (auf dem Telefon unter **Mehr**), mit ++⌘/Strg K++ → „Was ist neu“, unter **Einstellungen → Darstellung & Sprache** und unter **Über Flowplan**. Veröffentlichte Seiten zeigen den Dialog nie.

Nach dem Neuladen öffnet Flowplan den Arbeitsbereich, der zuletzt auf diesem Gerät offen war. Dafür merkt sich der Browser im Cookie `flowplan-workspace` nur die Kennung des Arbeitsbereichs; eine Einladung oder ein Link auf eine Seite in einem anderen Arbeitsbereich gehen vor. Die Breite der Seitenleiste sowie Breite und Anheften der Leiste **KI fragen** merkt sich das Cookie `flowplan-layout` – ein funktionales Cookie mit nur drei Zahlen, gültig für ein Jahr.

## Workflows auf dem Telefon

Auf dem Telefon zeigt eine [Workflow-Seite](/workflows#telefon-und-tablet) Status, den Ein/Aus-Schalter, den Ablauf als Liste, die Läufe und die Freigaben; bearbeitet wird auf Tablet oder Computer. Eine Freigabe-Benachrichtigung öffnet die Seite direkt beim Reiter **Freigaben**. Workflow-Seiten sind nicht offline verfügbar.
