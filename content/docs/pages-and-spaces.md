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

## Favoriten und „Verlinkt von“

Der Stern in der Kopfzeile legt eine Seite unter **Favoriten** in der Seitenleiste ab – persönlich, andere sehen deine Favoriten nicht. Unten auf jeder Seite zeigt **Verlinkt von**, welche Seiten und Datenbank-Einträge auf diese verweisen.

## Bereiche verwalten

Über `…` neben einem Bereich oder **Einstellungen → Bereiche**:

- umbenennen, Emoji oder Symbol und eine von neun Farben vergeben,
- Sichtbarkeit zwischen öffentlich (alle Mitglieder) und privat wechseln,
- **Bereich duplizieren**: unabhängige Kopie aller aktiven Seiten, Einträge und Anhänge; Kommentare, Versionen und Freigaben werden nicht übernommen,
- **Git-Export** (nur für die Eigentümerin oder den Eigentümer des Bereichs, wenn die Administration ihn eingeschaltet hat): den Bereich täglich oder wöchentlich in ein Git-Repository übertragen, siehe [Git-Export eines Bereichs](/storage-and-backups#git-export-eines-bereichs),
- in den Papierkorb verschieben. Der letzte aktive Bereich bleibt erhalten, bis ein weiterer existiert.

## Papierkorb

Gelöschte Seiten und Bereiche landen im **Papierkorb** unten in der Seitenleiste. Dort lassen sie sich wiederherstellen oder endgültig löschen. Veröffentlichungen, Freigabelinks und Formulare werden beim Löschen deaktiviert und bei der Wiederherstellung nicht automatisch wieder eingeschaltet.

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

