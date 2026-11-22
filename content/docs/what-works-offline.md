---
keywords: offline, ohne Verbindung, Speicherbudget, Offline behalten, dauerhaft speichern, kein Internet, Flugmodus, Journal offline, neue Seite offline, hochladen offline, nicht synchronisiert, Bild offline, Vorlage offline
---

# Was offline geht

Was du ohne Verbindung bearbeiten und anlegen kannst – und was erst wieder mit Verbindung geht.

## Ohne Verbindung {since=0.10.0}

Offline arbeitest du mit dem weiter, was das Gerät hat – im Browser mit eingeschalteter [Offline-Nutzung](/offline-and-apps#offline-nutzung-einschalten), in der Desktop-App und in den Apps für iPhone, iPad und Android:

- **Seiten und Einträge** der Offline-Kopie öffnen sich; du bearbeitest Text in Dokumenten und die Eigenschaften von Einträgen.
- **Neue Einträge** in einer Datenbank – **Neue Zeile** in der Tabelle, eine neue Karte im Board – erscheinen sofort und werden angelegt, sobald die Verbindung zurück ist (siehe [Datenbank-Einträge offline](/offline-and-apps#datenbank-eintraege-offline)). Auch das [Erfassen](/offline-and-apps#erfassen-in-eine-datenbank) wartet auf dem Gerät. {since=0.11.1} Der **Inhalt** eines neuen Eintrags öffnet sich als leeres Dokument, in das du gleich schreibst; der Text geht direkt nach dem Eintrag an den Server. **Datensatz-Versionen** und **Als Vorlage speichern** gibt es, sobald der Eintrag synchronisiert ist. Hat das Gerät keinen Platz mehr, steht beim Inhalt „Nur in diesem Fenster – auf dem Gerät ist kein Platz“: Der Text geht dann an den Server, solange das Fenster bis zur Verbindung offen bleibt.
- {since=0.11.0} **Neue Seiten:** Dokumente (auch Unterseiten), Datenbanken, Whiteboards und Notizbücher legst du offline wie gewohnt über **Neue Seite** an – siehe [Offline neu anlegen](#offline-neu-anlegen).
- {since=0.11.0} **Bilder und Dateien** in Dokumenten – neue und bestehende Seiten – bis 25 MB je Datei warten auf dem Gerät und werden hochgeladen, sobald die Verbindung zurück ist.
- **Der heutige Journal-Eintrag:** **Heute** in der Seitenleiste, das **+** neben einem Journal, **Heute** auf der Journalseite und die Tagesauswahl öffnen den Tag – seine gespeicherte Seite, wenn die Offline-Kopie sie hat, sonst einen Eintrag auf diesem Gerät. Oben steht dann „Offline-Entwurf – wird angelegt, sobald die Verbindung zurück ist“. Was du dort schreibst, bleibt auf dem Gerät, auch wenn du die App schließt. Sobald die Verbindung zurück ist, legt Flowplan den Tag wie gewohnt an – mit Vorlage und übernommenen Aufgaben – und fügt deinen Text darin ein; die Seite des Tages öffnet sich an seiner Stelle. Siehe auch [Journal](/journal).
- {since=0.10.0} **Lernkarten:** Stapel, in denen du in den letzten 14 Tagen gelernt hast, lernst du offline weiter; die Wertungen warten auf dem Gerät („2 Wertungen warten auf Verbindung“) und gehen mit der Verbindung an den Server ([Offline lernen](/flashcards-app#offline-lernen)).

## Offline neu anlegen {since=0.11.0}

**Neue Seite** öffnet sich auch ohne Verbindung. Ein **Dokument**, eine **Datenbank**, ein **Whiteboard** oder ein **Notizbuch** entsteht dann auf diesem Gerät:

- Die neue Seite öffnet sich sofort und steht in der Seitenleiste – mit einer kleinen Wolke und oben dem Hinweis **Noch nicht synchronisiert**. Du schreibst, legst Einträge in der neuen Datenbank an, zeichnest auf dem Whiteboard oder im Notizbuch, benennst die Seite um und legst Unterseiten darunter an. Alles bleibt auf dem Gerät, auch wenn du die App schließt.
- **Aus Vorlage:** Die eingebauten Vorlagen – etwa Meeting-Notizen oder Projektplanung – gehen offline, ihr Inhalt kommt mit der App. Gespeicherte Vorlagen, Umfragen und der Marketplace brauchen die Verbindung; in der Galerie sind sie offline ausgegraut.
- **Bilder, Dateien und PDFs** fügst du wie gewohnt ein (einfügen, hineinziehen, über das Menü). Ein Bild zeigt sofort seine Kopie auf dem Gerät. Bis 25 MB je Datei und 200 MB insgesamt warten auf dem Gerät; größere Dateien gehen nur mit Verbindung.
- **Sobald die Verbindung zurück ist**, legt Flowplan alles der Reihe nach auf dem Server an: erst die Seite, dann ihre Bilder und Dateien, dann ihren Inhalt, ihre Einträge und Unterseiten. Die Wolke verschwindet, und die Seite ist für alle mit Zugriff da. Ein Dokument bekommt die Bilder erst, wenn sie hochgeladen sind – andere sehen nie ein Bild, das es auf dem Server noch nicht gibt.

Die Rechte prüft der Server beim Anlegen. Lehnt er eine Seite ab – der Bereich wurde inzwischen gelöscht, du darfst dort nichts mehr anlegen –, scheitert alles mit, was in ihr entstanden ist: Einträge, Unterseiten, Bilder. Die Seite trägt dann ein rotes Warnzeichen und oben den Grund. Ihr Inhalt bleibt auf dem Gerät: **Erneut versuchen**, **Text kopieren** oder **Verwerfen**. Ein Bild, das nicht hochgeladen werden konnte, kannst du mit **Datei speichern** auf dem Gerät sichern.

> [!NOTE]
> Journale, Dashboards und Workflows, Seiten in [verschlüsselten Bereichen](/encrypted-spaces), Datenbanken mit KI und Notizbücher aus einem PDF brauchen den Server – offline sagt **Neue Seite** das beim Erstellen.

## Nur mit Verbindung {since=0.10.0}

Manches braucht den Server. Offline sagt Flowplan dann **Geht nur mit Verbindung – du bist gerade offline.**, statt nichts zu tun:

- {since=0.11.0} neue Journale, Dashboards und Workflows, Seiten in verschlüsselten Bereichen, neue Bereiche und Sammlungen
- gespeicherte Vorlagen und das Duplizieren einer Seite
- {since=0.11.0} Dateien über 25 MB, Titelbilder und Seiten-Icons hochladen, Bilder auf Whiteboards und in Notizbüchern, PDFs in Notizbücher
- Importe (Export-ZIP, Notion, BookStack, Jira, Trello und andere)
- Antworten über das Formular einer Datenbank
- Änderungen am Schema einer Datenbank (Eigenschaften und Ansichten)
- {since=0.10.0} Lernkarten mit KI erstellen, der Anki-Import und der Export von Karten (CSV, Anki-Paket)

## Offline-Speicher {since=0.11.1}

Wie viel Platz die [Offline-Kopie](/offline-and-apps#offline-nutzung-einschalten) auf einem Gerät belegt, was zuerst gespeichert wird und wie sie dauerhaft bleibt.

### Speicherbudget {since=0.11.1}

Das **Speicherbudget** unter **Einstellungen → Offline & Geräte** legt fest, wie viel Platz Eintragsinhalte und Dateien auf diesem Gerät höchstens belegen: **200 MB**, **1 GB**, **2 GB**, **5 GB** oder **10 GB**. Seiten und die App selbst zählen nicht mit, sie werden immer gespeichert. Ohne **Auch Eintragsinhalte und Dateien speichern** zählt nur, was du [offline behältst](#offline-behalten); was du geöffnet hast, bleibt dann wie bisher außerhalb des Budgets.

- **Standard:** in der Desktop-App 2 GB, im Browser und in der installierten Web-App 200 MB. In der App für iPhone und iPad stehen 200 MB und 1 GB zur Wahl, weil die App für die ganze Kopie eines Profils höchstens 2 GB belegt.
- Die Wahl gilt nur für dieses Gerät und dieses Profil (im Browser: diesen Browser). Ein Balken zeigt, wie viel davon belegt ist.
- Der freie Platz des Geräts begrenzt das Budget zusätzlich: Flowplan lässt immer etwas Platz frei.
- Ein kleineres Budget gibt beim nächsten Abgleich frei, was darüber liegt – zuerst, was du nicht offline behältst.

### Platz je Bereich {since=0.11.1}

Unter dem Budget zeigt eine Tabelle für jeden Bereich, wie viel Platz seine **Seiten**, **Einträge** und **Dateien** auf dem Gerät belegen, und wie viel im Speicherbudget noch frei ist. Die Zahlen kommen aus dem letzten Abgleich.

### Dauerhaft speichern {since=0.11.1}

Beim Einschalten und bei jedem Start fragt Flowplan den Browser, die Kopie dauerhaft aufzubewahren. Unter **Speicher auf diesem Gerät** steht das Ergebnis: **Dauerhaft gespeichert**, oder **Kann vom Browser bei Platzmangel gelöscht werden** – dann darf der Browser die Kopie entfernen, wenn der Speicher knapp wird. Ob er zustimmt, entscheidet der Browser; Firefox fragt einmal nach, Chrome und Edge entscheiden selbst, als installierte App meist mit Ja. Die App für iPhone und iPad bewahrt ihre Kopie ohnehin dauerhaft auf.

### Offline behalten {since=0.11.1}

**Offline behalten** speichert für einen Bereich, eine Seite mit allen Unterseiten oder eine Datenbank auch die Eintragsinhalte und Dateien, die du noch nie geöffnet hast – etwa die Wissensdatenbank und ein Lernprojekt mit seinen PDFs auf dem Laptop, die Familienarchive aber nicht.

- **Einschalten:** im Menü `…` eines Bereichs in der Seitenleiste oder im Menü `…` einer Seite oder Datenbank, jeweils **Offline behalten**. Bereiche schaltest du auch in der Tabelle [Platz je Bereich](#platz-je-bereich) unter **Einstellungen → Offline & Geräte** um; dort stehen auch die behaltenen Seiten und Datenbanken mit **Nicht mehr offline behalten**. Den Eintrag gibt es, solange auf dem Gerät die Offline-Nutzung an ist.
- **Zuerst im Budget:** Was du offline behältst, kommt vor allem anderen ins Speicherbudget. Ist das Budget voll und **Auch Eintragsinhalte und Dateien speichern** an, macht es Platz, indem andere Eintragsinhalte und Dateien gehen (sie kommen beim nächsten Öffnen mit Verbindung wieder). Der Rest bleibt wie bisher: was du geöffnet hast, und mit **Auch Eintragsinhalte und Dateien speichern** alles Weitere, solange Platz ist.
- **Nur, was du lesen darfst:** Flowplan lädt die Einträge und Dateien mit deinen Rechten; private Einträge anderer und Felder, die du nicht sehen darfst, bleiben draußen.
- **Ausschalten:** Beim nächsten Abgleich gehen die Einträge und Dateien, die nur deshalb auf dem Gerät lagen – auch geöffnete; sie kommen beim nächsten Öffnen wieder. Was du offline geändert und noch nicht gesendet hast, bleibt immer.
- Die Auswahl gilt nur für dieses Gerät und dieses Profil – es geht um seinen Speicher. Abmelden oder **Offline-Kopien entfernen** löscht sie mit der Kopie.
- **Verschlüsselte Bereiche** bleiben nur online: Dort ist **Offline behalten** ausgegraut, mit dem Hinweis „Verschlüsselte Bereiche bleiben nur online.“

Neue Einträge und Dateien eines behaltenen Bereichs lädt die geöffnete App beim Abgleich; der Abgleich im Hintergrund ([im Hintergrund](/offline-and-apps#die-kopie-bleibt-aktuell)) aktualisiert nur, was schon auf dem Gerät liegt.
