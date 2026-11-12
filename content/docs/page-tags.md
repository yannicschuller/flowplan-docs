---
keywords: Tags, Schlagwörter, Etiketten, Eigenschaften, Alias, Prüfdatum, Besitzer, Wiki
---

# Tags, Eigenschaften und Aliasse

Tags und Eigenschaften ordnen jede Seite quer zu Bereichen und Seitenbaum; Aliasse geben ihr weitere Namen, ein Besitzer und ein Prüfdatum halten sie aktuell.

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
- **Einstellungen → Tags & Eigenschaften** ändern Eigentümer des Arbeitsbereichs (alles) und Eigentümer eines Bereichs (die Tags und Eigenschaften ihres Bereichs); andere sehen die Listen. Dort werden Tags umbenannt, eingefärbt (neun Farben), sortiert, zusammengeführt und gelöscht, Eigenschaften angelegt, in Typ und Optionen geändert, sortiert und gelöscht. Ein geänderter Typ oder eine entfernte Option wandelt Werte um, wo es geht, und entfernt die übrigen; eine gelöschte Eigenschaft verschwindet samt ihren Werten von allen Seiten. Umbenennen, Zusammenführen und Löschen ändert auch die Einträge von Datenbank-Eigenschaften, die die Tags als Optionen haben (siehe [Mehrfachauswahl mit den Tags des Arbeitsbereichs](/database-properties#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs)).
- Werte liest, wer die Seite lesen darf. Tag-Ansicht, Suche und Zähler zeigen nur Seiten, die du lesen darfst; Gäste sehen nur die Tags und Eigenschaften der Seiten und Einträge, die für sie freigegeben sind.

Seiten in [verschlüsselten Bereichen](/encrypted-spaces) haben keine Tags und Eigenschaften – der Server müsste sie im Klartext speichern.

### Geltungsbereich: Arbeitsbereich oder Bereich

Bereiche trennen Themen und Rechte – Tags und Eigenschaften können das auch. Jeder Tag und jede Eigenschaft gilt entweder

- **im ganzen Arbeitsbereich** – für alle Seiten aller Bereiche, oder
- **nur in einem Bereich** – nur Seiten dieses Bereichs (und die Datenbanken darin) verwenden sie.

Neue Tags und Eigenschaften gehören **zum Bereich**, in dem du sie anlegst; was es vor dieser Unterscheidung schon gab, gilt weiter im ganzen Arbeitsbereich. Listen zeigen den Geltungsbereich mit einem kleinen Etikett: dem Bereichsnamen (gestrichelt) oder „Arbeitsbereich“.

- **Gleiche Namen:** Zwei Bereiche dürfen je einen eigenen Tag „Dringend“ haben – es sind verschiedene Tags. Innerhalb dessen, was eine Seite sieht (ihr Bereich plus der Arbeitsbereich), ist ein Name aber eindeutig, ohne Rücksicht auf Groß-/Kleinschreibung: Ein Bereich kann keinen Tag „kunde“ anlegen, wenn es „Kunde“ im ganzen Arbeitsbereich gibt. Gleichnamige werden nie von selbst zusammengelegt.
- **Sichtbarkeit:** Die Tags und Eigenschaften eines Bereichs sehen nur, wer den Bereich öffnen darf (und wer eine Seite lesen darf, die sie trägt), sowie die Eigentümer des Arbeitsbereichs.
- **Datenbanken** mit den [Tags als Optionen](/database-properties#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) bieten die Tags ihres Bereichs und des Arbeitsbereichs an.
- **Einstellungen → Tags & Eigenschaften** filtert nach Geltungsbereich. Der neue Tag oder die neue Eigenschaft bekommt dort einen Geltungsbereich (Eigentümer eines Bereichs: nur ihren Bereich). Zusammenführen geht nur in einen Tag des ganzen Arbeitsbereichs oder desselben Bereichs.

**Geltungsbereich ändern** (Pfeil-Symbol in den Einstellungen, nur Eigentümer des Arbeitsbereichs):

- **Vom Bereich in den Arbeitsbereich** (befördern) geht immer. Haben andere Bereiche einen gleichnamigen Tag, nennt der Dialog sie; **Gleichnamige zusammenführen** übernimmt ihre Seiten in den beförderten Tag (Eigenschaften nur bei gleichem Typ) – sonst bleibt alles, wie es ist.
- **Vom Arbeitsbereich in einen Bereich** (oder in einen anderen Bereich) zeigt erst, wo der Tag oder die Eigenschaft **außerhalb des Zielbereichs** verwendet wird (Bereiche, Seiten, Einträge). Dann wählst du: **Für die anderen Bereiche kopieren** (jeder Bereich bekommt einen eigenen gleichnamigen Tag bzw. eine eigene Eigenschaft samt Werten), **Dort entfernen** oder **Nicht ändern, solange es dort verwendet wird**.

> [!NOTE]
> Über die API: `tag.save` und `property.save` nehmen `spaceId` (ohne oder `null`: ganzer Arbeitsbereich), `tag.scope`/`property.scope` ändern den Geltungsbereich (`resolve`: `block`, `copy`, `remove`; `mergeSameName`), `meta.usage` zeigt vorher, wo etwas verwendet wird. `GET /api/tags` liefert `spaceId` zu jedem Tag und jeder Eigenschaft. Siehe [API und Webhooks](/openapi#tags-und-eigenschaften-per-api).

### Tag-Ansicht

**Tags** (Etikett-Symbol unten in der Seitenleiste oder `> tags` in der Schnellsuche) zeigt alle Tags mit der Zahl ihrer Seiten und Einträge. Ein Tag öffnet die Liste seiner Seiten, die zuletzt geänderte zuerst, und darunter die **Einträge** aus Datenbanken, deren Mehrfachauswahl die [Tags des Arbeitsbereichs](/database-properties#mehrfachauswahl-mit-den-tags-des-arbeitsbereichs) als Optionen hat (mit Datenbank und Bereich; ein Klick öffnet den Eintrag). Es erscheinen nur Einträge, die du lesen darfst – keine privaten Einträge anderer, keine Eigenschaften, die für dich ausgeblendet sind, nichts hinter einer Journal-PIN oder im Papierkorb. Darüber engst du die Liste mit Text oder weiteren Tags ein („Und: + Angebot“). Ein Tag ist genau dieser Tag: Haben andere Bereiche einen gleichnamigen, nimmt **Auch den gleichnamigen Tag eines anderen Bereichs** dessen Seiten und Einträge dazu. Eigentümer kommen über **Tags verwalten** zu den Einstellungen. Die Ansicht hat eine eigene Adresse (`#tags/<id>`), die du teilen oder als Lesezeichen speichern kannst. In der Suche findet `#Tag` dasselbe, siehe [Nach Tags und Eigenschaften filtern](/search-and-notifications#nach-tags-und-eigenschaften-filtern).

### Kopien, Vorlagen und Papierkorb

Duplizieren übernimmt Tags und Werte (in einen anderen Bereich oder Arbeitsbereich über den Namen: die gleichnamigen dort, fehlende Tags und Eigenschaften eines Bereichs werden im Zielbereich angelegt). [Seitenvorlagen](/templates#eigene-vorlagen) speichern Tags und Werte mit und setzen sie auf neue Seiten aus der Vorlage; Vorlagen eines anderen Bereichs fragen, was aus dessen Tags und Eigenschaften wird. Im Papierkorb bleiben sie erhalten und kommen beim Wiederherstellen zurück; erst endgültiges Löschen entfernt sie. Über die API setzt der Befehl `page.properties` Tags und Werte, siehe [API und Webhooks](/openapi#tags-und-eigenschaften-per-api).
