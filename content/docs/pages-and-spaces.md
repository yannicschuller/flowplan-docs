# Seiten und Bereiche

Alles in Flowplan ist eine Seite in einem Baum. Bereiche gliedern den Baum, Arbeitsbereiche trennen Teams voneinander.

## Aufbau

| Ebene | Was sie ist |
| --- | --- |
| **Arbeitsbereich** | Getrennte Welt mit eigenen Mitgliedern, Gruppen, Vorlagen und Speicherkontingent. Wechsel über den Namen oben in der Seitenleiste. |
| **Bereich** | Abschnitt in der Seitenleiste, z. B. „Teamspace“ oder „Privat“. Öffentlich für alle Mitglieder oder privat. |
| **Seite** | Dokument, Datenbank, Whiteboard, Journal oder Dashboard. Seiten können beliebig tief Unterseiten haben. |

## Seitentypen

- **Dokument**: Text mit Blöcken – Überschriften, Listen, Aufgaben, Tabellen, Code, Formeln, Diagramme, Einbettungen. Siehe [Dokumente und Editor](/documents).
- **Datenbank**: Einträge mit Eigenschaften, gezeigt als Tabelle, Board, Kalender, Timeline, Galerie, Liste, Feed, Diagramm oder Formular. Siehe [Datenbanken](/databases).
- **Whiteboard**: unendliche Fläche mit Notizzetteln, Formen, Verbindungen, Stift und Rahmen. Siehe [Whiteboards](/whiteboards).
- **Journal**: eine Seite pro Tag, offene Aufgaben wandern mit. Siehe [Journal](/journal).
- **Dashboard**: Kacheln mit Kennzahlen, Diagrammen, Datenbankansichten, fälligen Aufgaben und Notizen. Siehe [Dashboards](/dashboards).

## Seitenaktionen

Das Menü `…` oben rechts auf jeder Seite bietet:

| Aktion | Wirkung |
| --- | --- |
| Icon ändern, Cover ändern | Emoji, Symbol oder eigenes Bild; Titelbild hochladen oder ein vorhandenes Bild wählen und die Position einstellen. |
| Volle Breite | Inhalt nutzt die ganze Fensterbreite. |
| Schrift wechseln | Standard, Serif oder Mono für diese Seite. |
| Seite sperren | Schützt vor versehentlichen Änderungen, bis jemand entsperrt. |
| Duplizieren | Kopie samt Unterseiten, Datenbanken und Dateien; interne Links zeigen auf die Kopien. |
| Verschieben | Unter eine andere Seite, in einen anderen Bereich oder Arbeitsbereich. |
| Als Vorlage speichern | Siehe [Vorlagen](/templates). |
| Exportieren, Drucken / PDF | Siehe [Import, Export und Versionen](/import-export-versions). |
| Präsentieren | Ein Dokument als Folien im Vollbild zeigen, siehe [Präsentieren](/documents#praesentieren). |
| Seite daneben öffnen … | Eine zweite Seite in der [geteilten Ansicht](#geteilte-ansicht) rechts daneben öffnen. |
| Besitzer und Prüfung … | Wer sich um die Seite kümmert und wann sie wieder geprüft werden soll, siehe [Besitzer und Prüfdatum](#besitzer-und-pruefdatum). |
| Versionsverlauf | Frühere Stände vergleichen und wiederherstellen. |
| In den Papierkorb | Seite samt Unterseiten entfernen, wiederherstellbar. |

### Rechtsklick in der Seitenleiste

Ein Rechtsklick auf eine Seite im Seitenbaum oder unter Favoriten – auf dem Smartphone langes Drücken – öffnet ihre Aktionen direkt: **In neuem Tab öffnen**, **In geteilter Ansicht öffnen**, **Link kopieren**, **Zu Favoriten**, **Teilen**, **Unterseite hinzufügen**, **Icon ändern**, **Duplizieren**, **Verschieben**, **Exportieren**, **Seite sperren** und **In den Papierkorb**. Aktionen mit Dialog öffnen die Seite vorher.

### Seiten filtern

Das Feld **Seiten filtern** über dem Seitenbaum blendet alles aus, was nicht passt; übergeordnete Seiten der Treffer bleiben sichtbar und aufgeklappt. <kbd>Esc</kbd> leert den Filter. Vorlagen, Medien, Papierkorb, Einstellungen und Administration liegen als Symbolleiste unten in der Seitenleiste.

## Geteilte Ansicht

Zwei Seiten nebeneinander – etwa Notizen links und die Aufgaben-Datenbank rechts. Eine Seite öffnet sich rechts daneben mit:

- **In geteilter Ansicht öffnen** im Rechtsklick-Menü einer Seite im Seitenbaum,
- <kbd>⌘</kbd>-Klick (Windows/Linux: <kbd>Strg</kbd>-Klick) auf eine Seite im Seitenbaum, unter Favoriten oder auf einen Seitenlink im Text,
- Ziehen einer Seite aus dem Seitenbaum an den **rechten Fensterrand** (dort erscheint eine Ablagefläche),
- <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>S</kbd> oder **Seite daneben öffnen …** im Menü `…`: Die Schnellsuche öffnet die gewählte Seite rechts.

Jede Hälfte hat eine eigene Kopfzeile mit Titel und **×**. Das **×** links schließt die linke Seite, die rechte rückt in die Hauptansicht; der Pfeil rechts holt die rechte Seite in die Hauptansicht. Dokumente lassen sich in beiden Hälften bearbeiten, Datenbanken, Whiteboards und Dashboards funktionieren wie gewohnt.

Die **Trennlinie** zwischen beiden Hälften lässt sich mit der Maus ziehen; mit der Tastatur: Tab bis zur Linie, dann <kbd>←</kbd> / <kbd>→</kbd> (mit <kbd>⇧</kbd> in großen Schritten), <kbd>Pos1</kbd> / <kbd>Ende</kbd> für die schmalste und breiteste Stellung, <kbd>Enter</kbd> oder Doppelklick für halbe-halbe. Die Breite merkt sich das Gerät.

Eine Seite aus dem Seitenbaum in ein Dokument der anderen Hälfte zu ziehen, fügt dort einen **Link** auf sie ein; markierter Text und Blöcke lassen sich zwischen den beiden Dokumenten ziehen (dabei wird kopiert).

Die rechte Seite steht in der Adresse (`?split=…`): Neu laden und Lesezeichen behalten die geteilte Ansicht. In Fenstern bis 1024 Pixel Breite und auf dem Smartphone gibt es sie nicht – dort öffnen dieselben Wege die Seite ganz normal.

> [!NOTE]
> Weil <kbd>⌘</kbd>/<kbd>Strg</kbd>-Klick im Seitenbaum jetzt die geteilte Ansicht öffnet, beginnt eine Mehrfachauswahl mit <kbd>⇧</kbd>-Klick oder dem Häkchen-Symbol am Bereich; danach fügt auch <kbd>⌘</kbd>/<kbd>Strg</kbd>-Klick weitere Seiten hinzu.

## Ordnen und verschieben

- In der Seitenleiste Seiten per Drag and Drop umsortieren oder auf eine andere Seite ziehen, um sie unterzuordnen.
- **Seiten auswählen** (Häkchen-Symbol am Bereich) oder <kbd>⇧</kbd>-Klick markiert mehrere Seiten, die sich gemeinsam verschieben oder löschen lassen.
- **Verschieben** in einen anderen Arbeitsbereich nimmt Unterseiten, Datenbankeinträge und Dateien mit. Freigaben für Gruppen oder Personen, die dort nicht Mitglied sind, entfallen. Datenbanken mit Relationen zu zurückbleibenden Datenbanken müssen vorher gelöst werden.
- **In einen anderen Bereich** (oder Arbeitsbereich) verschoben, behalten Seiten die [Tags und Eigenschaften des ganzen Arbeitsbereichs](#geltungsbereich-arbeitsbereich-oder-bereich). Tragen sie (oder ihre Unterseiten und die Einträge ihrer Datenbanken) Tags oder Eigenschaften, die **nur im bisherigen Bereich** gelten, fragt ein Zwischenschritt **Tags und Eigenschaften mitnehmen** für jeden davon:
  - **Zuordnen** zu einem Tag bzw. einer Eigenschaft gleichen Typs am Ziel – vorgeschlagen ist der gleichnamige, wenn es ihn gibt,
  - **Nach „Ziel“ kopieren** – ein eigener Tag bzw. eine eigene Eigenschaft im Zielbereich, mit allen Werten (Voreinstellung, wenn es am Ziel nichts Gleichnamiges gibt; ist der Name dort schon vergeben, bekommt die Kopie den Namen des alten Bereichs dazu, z. B. „Phase (Vertrieb)“),
  - **Entfernen** – die Werte gehen dann verloren.

  Ohne diese Wahl wird nichts verschoben – auch nicht per Drag and Drop, beim Verschieben mehrerer Seiten oder über die API: Werte gehen nie stillschweigend verloren. **Rückgängig** holt die Seiten zurück und ordnet ihre Tags wieder den gleichnamigen des alten Bereichs zu. Die Originale im alten Bereich bleiben bestehen.

> [!NOTE]
> Beim Verschieben behalten Seiten ihre Adresse. Links auf die Seite funktionieren weiter, sofern die lesende Person Zugriff im neuen Arbeitsbereich hat.

## Besitzer und Prüfdatum

Damit Anleitungen, Richtlinien und Wissensseiten nicht unbemerkt veralten, kann jede Seite einen **Besitzer** und ein **Prüfdatum** haben. Beides stellst du unter **… → Besitzer und Prüfung …** ein (Bearbeitungsrecht nötig):

- **Besitzer**: ein Mitglied des Arbeitsbereichs (kein Gast), das die Seite lesen darf.
- **Nächste Prüfung am**: ein festes Datum, einmalig oder
- **Danach alle … Tage**: ein Rhythmus, z. B. 30, 90, 180 Tage oder jährlich. Ohne Datum beginnt er heute.

Ist das Prüfdatum erreicht, zeigt die Seite oben den Hinweis „Diese Seite wartet auf eine Prüfung (Besitzer: …)“. **Geprüft** verschiebt das Datum um den Rhythmus ab heute; ein einmaliges Datum verschwindet. Der Besitzer bekommt am Fälligkeitstag eine Erinnerung („„Titel“ wartet auf deine Prüfung“) – einmal je Prüfdatum, im Posteingang und je nach Einstellung als Push oder E-Mail (Art „Datums-Erinnerungen“).

> [!NOTE]
> Über die API setzen die Befehle `page.owner` und `page.review` Besitzer und Prüfdatum. Ein Restore-Archiv nimmt Prüfdatum und Rhythmus mit, den Besitzer nicht – er gehört zum alten Arbeitsbereich.

## Aliasse

Unter **… → Aliasse …** bekommt eine Seite weitere Namen, etwa Abkürzungen („PAC“ für „Chauffage“). Bis zu 10 Aliasse mit je bis zu 100 Zeichen; <kbd>Enter</kbd> oder ein Komma trennt sie, doppelte fallen weg. Ändern dürfen sie alle mit Bearbeitungsrecht.

@-Erwähnungen, die Schnellsuche und **Nicht verlinkte Erwähnungen** finden die Seite über ihre Aliasse wie über den Titel; Treffer zeigen „Titel · Alias“. Wählst du in der @-Erwähnung einen Treffer über einen Alias, wird der Alias zum Linktext. Der Markdown-Export schreibt Aliasse als Frontmatter (`aliases: [PAC]`) an den Anfang der Seite – nur bei Seiten, die welche haben. Für Einträge gibt es dafür den Eigenschaftstyp [Aliasse](/properties-and-formulas#aliasse); eine Seite, die zum Eintrag wird, nimmt ihre Aliasse dorthin mit, und umgekehrt.

> [!NOTE]
> Über die API setzt der Befehl `page.aliases` (`{ pageId, aliases: [...] }`) die Aliasse einer Seite; eine leere Liste entfernt sie. Ein Restore-Archiv nimmt sie mit.

## Tags und Eigenschaften

Jede Seite – Dokument, Datenbank, Whiteboard, Notizbuch, Dashboard, Journaltag – kann **Tags** und **Eigenschaften** tragen. Ein Tag „Kunde“ ist auf allen Seiten, für die er gilt, derselbe; eine Eigenschaft „Status“ hat dort überall dieselben Optionen. Ob sie im ganzen Arbeitsbereich oder nur in einem Bereich gelten, regelt ihr [Geltungsbereich](#geltungsbereich-arbeitsbereich-oder-bereich). (Die Eigenschaften von Datenbank-Einträgen sind davon getrennt, siehe [Eigenschaften, Formeln und Rollups](/properties-and-formulas).)

Unter dem Seitentitel steht dafür eine schmale Leiste:

- **+ Tag** öffnet ein Eingabefeld, das die Tags vorschlägt, die für die Seite gelten (die des Arbeitsbereichs und die ihres Bereichs; Tags des Bereichs mit einem kleinen Ordner-Symbol). <kbd>↑</kbd>/<kbd>↓</kbd> wählen, <kbd>Enter</kbd> übernimmt, <kbd>Esc</kbd> schließt. Gibt es den Namen noch nicht, legt **„Name“ in diesem Bereich anlegen** (<kbd>Enter</kbd>) den Tag für den Bereich der Seite an; Eigentümer können ihn stattdessen **im ganzen Arbeitsbereich anlegen**. Das Feld bleibt offen, sodass du mehrere Tags nacheinander vergibst. Das ✕ am Tag nimmt ihn von der Seite.
- Ein Klick auf einen Tag öffnet die [Tag-Ansicht](#tag-ansicht) mit allen Seiten, die ihn tragen.
- **+ Eigenschaft** zeigt die Eigenschaften, die für die Seite gelten und die sie noch nicht hat; Eigentümer des Arbeitsbereichs und des Bereichs können dort auch **Neue Eigenschaft …** anlegen – mit der Wahl **Nur in diesem Bereich** (Voreinstellung) oder **Im ganzen Arbeitsbereich** (nur Eigentümer des Arbeitsbereichs). Werte bearbeitest du direkt in der Leiste – mit denselben Feldern wie in Datenbanken. Das ✕ neben einem Wert entfernt ihn.

Hat eine Seite weder Tags noch Werte, ist die Leiste nur eine blasse Zeile mit **+ Tag** und **+ Eigenschaft**; im Lesemodus, ohne Bearbeitungsrecht und auf gesperrten Seiten ist sie dann ganz ausgeblendet.

### Leiste einklappen

Mit vielen Tags und Eigenschaften wird die Leiste lang. Der Pfeil ganz links klappt sie zu einer Zeile ein: Sie zeigt die ersten Tags als kleine Etiketten (auf dem Handy zwei, sonst drei), „+3“ für die übrigen und die Zahl der Eigenschaften, z. B. „6 Eigenschaften“. Ein Klick auf die Zeile – oder <kbd>Enter</kbd>/<kbd>Leertaste</kbd>, wenn sie den Fokus hat – klappt die Leiste wieder auf.

- **Deine Wahl gilt pro Seite und nur für dich.** Sie wird in deinem Konto gespeichert und gilt so auf allen deinen Geräten; andere sehen die Seite weiter so, wie sie es selbst gewählt haben. Das geht auch im Lesemodus und ohne Bearbeitungsrecht.
- **Ohne eigene Wahl** ist die Leiste aufgeklappt, solange sie klein ist, und eingeklappt, wenn die Seite **mehr als vier Eigenschaften** zeigt (mitgezählt werden Eigenschaften mit Wert und die automatischen wie „Erstellt am“; leere nicht). Das wird beim Öffnen der Seite entschieden – die Leiste klappt also nicht weg, während du Werte einträgst.
- Eine leere Leiste (nur **+ Tag** und **+ Eigenschaft**) lässt sich nicht einklappen.
- **Drucken und Exporte** zeigen immer alle Tags und Eigenschaften, auch wenn die Leiste eingeklappt ist.
- Über geteilte Links sehen Gäste ohne Konto keine Leiste; es gibt dort also nichts zu merken.
- Über die API setzt der Befehl `page.collapseProperties` die Wahl für dich: `{ "action": "page.collapseProperties", "pageId": "…", "collapsed": true }` – `false` klappt auf, `null` vergisst die Wahl (dann gilt wieder die Regel oben).

| Eigenschaftstyp | Wert |
| --- | --- |
| Text, Webadresse, E-Mail, Telefon | Text bis 2.000 Zeichen; Webadresse, E-Mail und Telefon als Link |
| Zahl | eine Zahl |
| Datum | ein Tag, auf Wunsch mit Uhrzeit |
| Auswahl / Mehrfachauswahl | eine bzw. mehrere der festgelegten Optionen |
| Kontrollkästchen | ja oder nein |
| Person | ein Mitglied des Arbeitsbereichs |
| Erstellt am, Geändert am, Erstellt von, Geändert von | werden automatisch aus der Seite gelesen |

**Wer was darf:**

- **Tags und Werte einer Seite** setzt, wer die Seite bearbeiten darf – auch Gäste mit Bearbeitungsrecht auf der Seite.
- **Neue Tags** legen Mitglieder mit Bearbeitungsrecht beim Vergeben an – für den Bereich der Seite. Tags für den ganzen Arbeitsbereich legen nur Eigentümer an. Gäste und Leser wählen nur vorhandene.
- **Einstellungen → Tags & Eigenschaften** ändern Eigentümer des Arbeitsbereichs (alles) und Eigentümer eines Bereichs (die Tags und Eigenschaften ihres Bereichs); andere sehen die Listen. Dort werden Tags umbenannt, eingefärbt (neun Farben), sortiert, zusammengeführt und gelöscht, Eigenschaften angelegt, in Typ und Optionen geändert, sortiert und gelöscht. Ein geänderter Typ oder eine entfernte Option wandelt Werte um, wo es geht, und entfernt die übrigen; eine gelöschte Eigenschaft verschwindet samt ihren Werten von allen Seiten. Umbenennen, Zusammenführen und Löschen ändert auch die Einträge von Datenbank-Eigenschaften, die die Tags als Optionen haben (siehe [Mehrfachauswahl mit den Tags des Arbeitsbereichs](/databases#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs)).
- Werte liest, wer die Seite lesen darf. Tag-Ansicht, Suche und Zähler zeigen nur Seiten, die du lesen darfst; Gäste sehen nur die Tags und Eigenschaften der Seiten und Einträge, die für sie freigegeben sind.

Seiten in [verschlüsselten Bereichen](/encrypted-spaces) haben keine Tags und Eigenschaften – der Server müsste sie im Klartext speichern.

### Geltungsbereich: Arbeitsbereich oder Bereich

Bereiche trennen Themen und Rechte – Tags und Eigenschaften können das auch. Jeder Tag und jede Eigenschaft gilt entweder

- **im ganzen Arbeitsbereich** – für alle Seiten aller Bereiche, oder
- **nur in einem Bereich** – nur Seiten dieses Bereichs (und die Datenbanken darin) verwenden sie.

Neue Tags und Eigenschaften gehören **zum Bereich**, in dem du sie anlegst; was es vor dieser Unterscheidung schon gab, gilt weiter im ganzen Arbeitsbereich. Listen zeigen den Geltungsbereich mit einem kleinen Etikett: dem Bereichsnamen (gestrichelt) oder „Arbeitsbereich“.

- **Gleiche Namen:** Zwei Bereiche dürfen je einen eigenen Tag „Dringend“ haben – es sind verschiedene Tags. Innerhalb dessen, was eine Seite sieht (ihr Bereich plus der Arbeitsbereich), ist ein Name aber eindeutig, ohne Rücksicht auf Groß-/Kleinschreibung: Ein Bereich kann keinen Tag „kunde“ anlegen, wenn es „Kunde“ im ganzen Arbeitsbereich gibt. Gleichnamige werden nie von selbst zusammengelegt.
- **Sichtbarkeit:** Die Tags und Eigenschaften eines Bereichs sehen nur, wer den Bereich öffnen darf (und wer eine Seite lesen darf, die sie trägt), sowie die Eigentümer des Arbeitsbereichs.
- **Datenbanken** mit den [Tags als Optionen](/databases#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) bieten die Tags ihres Bereichs und des Arbeitsbereichs an.
- **Einstellungen → Tags & Eigenschaften** filtert nach Geltungsbereich. Der neue Tag oder die neue Eigenschaft bekommt dort einen Geltungsbereich (Eigentümer eines Bereichs: nur ihren Bereich). Zusammenführen geht nur in einen Tag des ganzen Arbeitsbereichs oder desselben Bereichs.

**Geltungsbereich ändern** (Pfeil-Symbol in den Einstellungen, nur Eigentümer des Arbeitsbereichs):

- **Vom Bereich in den Arbeitsbereich** (befördern) geht immer. Haben andere Bereiche einen gleichnamigen Tag, nennt der Dialog sie; **Gleichnamige zusammenführen** übernimmt ihre Seiten in den beförderten Tag (Eigenschaften nur bei gleichem Typ) – sonst bleibt alles, wie es ist.
- **Vom Arbeitsbereich in einen Bereich** (oder in einen anderen Bereich) zeigt erst, wo der Tag oder die Eigenschaft **außerhalb des Zielbereichs** verwendet wird (Bereiche, Seiten, Einträge). Dann wählst du: **Für die anderen Bereiche kopieren** (jeder Bereich bekommt einen eigenen gleichnamigen Tag bzw. eine eigene Eigenschaft samt Werten), **Dort entfernen** oder **Nicht ändern, solange es dort verwendet wird**.

> [!NOTE]
> Über die API: `tag.save` und `property.save` nehmen `spaceId` (ohne oder `null`: ganzer Arbeitsbereich), `tag.scope`/`property.scope` ändern den Geltungsbereich (`resolve`: `block`, `copy`, `remove`; `mergeSameName`), `meta.usage` zeigt vorher, wo etwas verwendet wird. `GET /api/tags` liefert `spaceId` zu jedem Tag und jeder Eigenschaft. Siehe [API und Webhooks](/api-and-webhooks#tags-und-eigenschaften-per-api).

### Tag-Ansicht

**Tags** (Etikett-Symbol unten in der Seitenleiste oder `> tags` in der Schnellsuche) zeigt alle Tags mit der Zahl ihrer Seiten und Einträge. Ein Tag öffnet die Liste seiner Seiten, die zuletzt geänderte zuerst, und darunter die **Einträge** aus Datenbanken, deren Mehrfachauswahl die [Tags des Arbeitsbereichs](/databases#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) als Optionen hat (mit Datenbank und Bereich; ein Klick öffnet den Eintrag). Es erscheinen nur Einträge, die du lesen darfst – keine privaten Einträge anderer, keine Eigenschaften, die für dich ausgeblendet sind, nichts hinter einer Journal-PIN oder im Papierkorb. Darüber engst du die Liste mit Text oder weiteren Tags ein („Und: + Angebot“). Ein Tag ist genau dieser Tag: Haben andere Bereiche einen gleichnamigen, nimmt **Auch den gleichnamigen Tag eines anderen Bereichs** dessen Seiten und Einträge dazu. Eigentümer kommen über **Tags verwalten** zu den Einstellungen. Die Ansicht hat eine eigene Adresse (`#tags/<id>`), die du teilen oder als Lesezeichen speichern kannst. In der Suche findet `#Tag` dasselbe, siehe [Nach Tags und Eigenschaften filtern](/search-and-notifications#nach-tags-und-eigenschaften-filtern).

### Kopien, Vorlagen und Papierkorb

Duplizieren übernimmt Tags und Werte (in einen anderen Bereich oder Arbeitsbereich über den Namen: die gleichnamigen dort, fehlende Tags und Eigenschaften eines Bereichs werden im Zielbereich angelegt). [Seitenvorlagen](/templates#eigene-vorlagen) speichern Tags und Werte mit und setzen sie auf neue Seiten aus der Vorlage; Vorlagen eines anderen Bereichs fragen, was aus dessen Tags und Eigenschaften wird. Im Papierkorb bleiben sie erhalten und kommen beim Wiederherstellen zurück; erst endgültiges Löschen entfernt sie. Über die API setzt der Befehl `page.properties` Tags und Werte, siehe [API und Webhooks](/api-and-webhooks#tags-und-eigenschaften-per-api).

## Favoriten und „Verlinkt von“

Der Stern in der Kopfzeile legt eine Seite unter **Favoriten** in der Seitenleiste ab – persönlich, andere sehen deine Favoriten nicht. Unten auf jeder Seite zeigt **Verlinkt von**, welche Seiten und Datenbank-Einträge auf diese verweisen.

## Bereiche verwalten

Über `…` neben einem Bereich → **Bereich bearbeiten …** oder **Einstellungen → Bereiche**:

- umbenennen, Emoji oder Symbol und eine von neun Farben vergeben,
- Sichtbarkeit zwischen öffentlich (alle Mitglieder) und privat wechseln,
- **Bereich duplizieren**: unabhängige Kopie aller aktiven Seiten, Einträge und Anhänge; Kommentare, Versionen und Freigaben werden nicht übernommen,
- **Git-Export** (nur für die Eigentümerin oder den Eigentümer des Bereichs, wenn die Administration ihn eingeschaltet hat): den Bereich täglich oder wöchentlich in ein Git-Repository übertragen, siehe [Git-Export eines Bereichs](/storage-and-backups#git-export-eines-bereichs),
- in den Papierkorb verschieben. Der letzte aktive Bereich bleibt erhalten, bis ein weiterer existiert.

### Reihenfolge der Bereiche

Eigentümerinnen und Eigentümer des Arbeitsbereichs legen fest, in welcher Reihenfolge die Bereiche in der Seitenleiste stehen – für alle Mitglieder gleich:

- **Ziehen**: einen Bereich an seiner Kopfzeile (Name und Symbol) fassen und über oder unter einem anderen Bereich ablegen. Eine blaue Linie zeigt, wo er landet.
- **Tastatur und Smartphone**: `…` neben dem Bereich → **Nach oben** oder **Nach unten**. Ein Bildschirmleser sagt die neue Position an.
- **Einstellungen → Bereiche** zeigt die Bereiche in derselben Reihenfolge, mit Pfeilen zum Verschieben.

Andere Mitglieder sehen die neue Reihenfolge nach wenigen Sekunden, ohne neu zu laden. Wo Bereiche zur Auswahl stehen – Verschieben, Teilen, die Browser-Erweiterung, Eintrag als Seite – gilt dieselbe Reihenfolge.

- Neue Bereiche kommen ans Ende, ein **duplizierter** Bereich direkt hinter sein Original.
- Ein Bereich aus dem **Papierkorb** kehrt an seinen alten Platz zurück.
- Ein **Restore-Archiv** nimmt die Reihenfolge seiner Bereiche mit; sie kommen beim Import ans Ende. Ältere Archive ohne Reihenfolge behalten ihre bisherige.
- Bereiche, die du nicht siehst – private Bereiche anderer, verschlüsselte Bereiche ohne Schlüssel –, behalten ihren Platz. Ihre Namen erscheinen nirgends; die Sichtbarkeit ändert sich durchs Umsortieren nicht.

> [!NOTE]
> Über die API setzt der Befehl `space.reorder` (`{ workspaceId, order: [spaceIds] }`) die Reihenfolge der Bereiche, die du in der Seitenleiste siehst; nur Eigentümerinnen und Eigentümer des Arbeitsbereichs dürfen das. Die Antwort nennt die sichtbaren Bereiche in neuer Reihenfolge.

### Seitenleiste ein- und ausklappen

Ein Klick auf den Namen eines Bereichs klappt seine Seiten zu oder wieder auf, ebenso bei **Favoriten** und **Sammlungen**; der Pfeil vor einer Seite zeigt oder verbirgt ihre Unterseiten. Seiten mit Unterseiten sind anfangs zugeklappt.

Flowplan merkt sich, was du auf- und zugeklappt hast – in deinem Konto, je Arbeitsbereich, und damit gleich auf allen Geräten (Browser, Smartphone, Desktop-App), auch nach dem Neuladen. Das gilt für Seiten, Bereiche, Favoriten, Sammlungen und die Jahres- und Monatsordner von Journalen. Andere sehen deine Auswahl nicht.

- **Geöffnete Seite:** Öffnest du eine Seite, klappen ihr Bereich und die Seiten darüber auf, damit sie in der Seitenleiste zu sehen ist; anderes klappt dabei nicht zu. Dieses Aufklappen gilt nur für den Besuch – nach dem Neuladen bleibt nur offen, was du selbst aufgeklappt hast (und der Weg zur gerade geöffneten Seite).
- **Alle aufklappen / Alle zuklappen:** im Menü **…** eines Bereichs, für alle Seiten des Bereichs.
- Beim Filtern des Seitenbaums ist alles mit Treffern offen.
- Gelöschte Seiten und Bereiche fallen aus der gemerkten Auswahl heraus.

> [!NOTE]
> Über die API speichert der Befehl `sidebar.state` (`{ workspaceId, changes: { "<Schlüssel>": true|false } }`) Änderungen dieser Auswahl; die Schlüssel sind `p:<Seite>` (aufgeklappt), `s:<Bereich>` (zugeklappt), `g:favorites`, `g:collections` sowie `jo:`/`jc:` für Journalordner. Der Bootstrap liefert die Auswahl als `sidebar`.

## Papierkorb

Gelöschte Seiten und Bereiche landen im **Papierkorb** unten in der Seitenleiste, gelöschte [Datenbankeinträge](/databases) darunter unter **Gelöschte Einträge**. Aus den [Medien](/documents#medien-loeschen) gelöschte Dateien stehen unter **Gelöschte Dateien**. Dort lassen sie sich wiederherstellen oder endgültig löschen. Veröffentlichungen, Freigabelinks und Formulare werden beim Löschen deaktiviert und bei der Wiederherstellung nicht automatisch wieder eingeschaltet.

- **Endgültig löschen** neben einer Seite löscht sie samt ihren Unterseiten im Papierkorb. Der Dialog nennt die Seite und wie viele Unterseiten mitgehen. Dazu brauchst du dasselbe Recht wie zum Löschen: Bearbeiten der Seite. Unterseiten, die du nicht bearbeiten darfst, bleiben einzeln im Papierkorb.
- **Papierkorb leeren** löscht alles im Papierkorb, was du löschen darfst: Seiten, die du bearbeiten darfst, Bereiche, die du verwaltest, und gelöschte Einträge, die du bearbeiten darfst. Der Dialog zeigt vorher die Anzahl. Seiten aus privaten Bereichen anderer und Seiten, die du nur lesen kannst, bleiben unberührt.
- Endgültig gelöscht werden die Seite mit Inhalt, Versionen, Kommentaren und Randkommentaren, bei Datenbanken Eigenschaften, Ansichten und Einträge, dazu hochgeladene Dateien, Favoriten, Veröffentlichungen, Freigabelinks, Benachrichtigungen und Suchtreffer. Links aus anderen Seiten zeigen danach auf eine gelöschte Seite. Das lässt sich nicht rückgängig machen; eine [Sicherung](/storage-and-backups) bleibt der einzige Weg zurück.
- Nach **30 Tagen** im Papierkorb wird alles automatisch endgültig gelöscht – Seiten, Bereiche, Einträge, Dateien und [Vorlagen](/templates#eigene-vorlagen). Die Zeile oben nennt die Frist, jede Seite zeigt, wie viele Tage ihr noch bleiben. Admins ändern die Frist unter [Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung) (0 = nie automatisch).

Direkt nach dem Löschen zeigt Flowplan unten einen Hinweis wie „„Notizen“ in den Papierkorb gelegt“ mit **Rückgängig** – etwa sechs Sekunden lang, solange der Mauszeiger oder der Fokus darauf liegt auch länger. **Rückgängig** oder <kbd>⌘</kbd> <kbd>Z</kbd> (außerhalb von Textfeldern) holt die Seite samt Unterseiten zurück und öffnet sie wieder. Dasselbe gilt fürs Verschieben von Seiten im Seitenbaum und für mehrere Seiten auf einmal.

## Graph der Verlinkungen

Das Netz-Symbol unten in der Seitenleiste (oder `> graph` in der Schnellsuche) zeigt alle Seiten als Punkte und ihre Links als Linien. Datenbank-Einträge erscheinen als eigene Punkte, sobald sie verlinken oder verlinkt sind; ein Klick öffnet den Eintrag. Große Punkte haben viele Verbindungen; Farben unterscheiden Dokumente, Datenbanken, Einträge, Whiteboards und Journale.

- Ziehen verschiebt, Mausrad oder zwei Finger zoomen, ein Klick öffnet die Seite.
- Überfahren hebt eine Seite und ihre Nachbarn hervor; **Hervorheben** markiert Seiten nach Titel.
- **Unterseiten verbinden** zeigt zusätzlich die Seitenhierarchie (gestrichelt), **Seiten ohne Verbindung** blendet einzelne Seiten ein oder aus.
- **Journaltage** steuert die Tage von [Journalen](/journal): **ausblenden**, **je Monat ein Punkt** (Standard; der Punkt sammelt die Links aller Tage des Monats, ein Klick öffnet das Journal) oder **einzeln zeigen**. Die Zeile oben nennt Seiten und Journaltage getrennt.
- Als Verbindung zählen Links auf Seiten und Einträge (auch aus dem Text eines Eintrags), eingebettete Whiteboards, verknüpfte Datenbanken und synchronisierte Blöcke. Der Graph zeigt nur, was du sehen darfst.

## Nicht verlinkte Erwähnungen

Unter **Verlinkt von** am Seitenende listet **Nicht verlinkte Erwähnungen** Dokumente und Einträge, in denen der Titel dieser Seite vorkommt, ohne dass er verlinkt ist (Titel ab vier Zeichen), oder einer ihrer [Aliasse](#aliasse) als ganzes Wort (ab zwei Zeichen); der gefundene Alias steht grau neben dem Treffer. **Verlinken** macht die erste Erwähnung dort zu einem Link auf diese Seite, zuerst über den Titel, sonst über einen Alias – der Text bleibt, wie er dasteht. Ein geöffneter Eintrag zeigt dasselbe für seinen Titel und seine Aliasse unter seinen Eigenschaften.

