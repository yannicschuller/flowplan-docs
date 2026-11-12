---
keywords: Suche, Schnellsuche, Cmd K, Filter, Sammlung, gespeicherte Suche, Befehle
---

# Schnellsuche und Sammlungen

Die Schnellsuche findet Inhalte bis in Dateianhänge hinein. Posteingang und Push-Nachrichten sagen dir, wenn jemand dich braucht.

**Mehr zum Thema:** [Posteingang und Benachrichtigungen](/notifications)

## Schnellsuche

<kbd>⌘</kbd> <kbd>K</kbd> (Windows/Linux <kbd>Strg</kbd> <kbd>K</kbd>) oder **Suchen** in der Seitenleiste.

Durchsucht werden:

- Seitentitel und [Aliasse](/page-tags#aliasse) sowie Dokumenttexte,
- [Tags und Eigenschaftswerte](/page-tags#tags-und-eigenschaften) von Seiten,
- Datenbankeinträge und ihre Inhalte,
- Kommentare,
- Dateinamen,
- der Text von PDF-Anhängen (bis 50 MB, die ersten 100.000 Zeichen),
- gescannte PDFs und Bilder per Texterkennung (Deutsch und Englisch, auf Wunsch Französisch oder Chinesisch (Kurzzeichen) über `FLOWPLAN_OCR_LANGS`),
- Word-, Excel-, PowerPoint- und OpenDocument-Dateien.

Treffer lassen sich nach Typ und Bereich filtern. [Journaltage](/journal#tage-in-listen-suche-graph-und-export) stehen hinter allen anderen Treffern; **Ohne Journaltage** lässt sie ganz weg und bleibt für die nächste Suche eingeschaltet. Dateitexte werden im Hintergrund erfasst und sind nach wenigen Sekunden auffindbar. Die Suche zeigt nur, was du lesen darfst. <kbd>Enter</kbd> öffnet den ersten Treffer.

Aliasse von Seiten und Einträgen zählen so viel wie der Titel. Passt die Suche nur zu einem Alias, zeigt der Treffer den echten Titel mit dem Alias in Grau, etwa „Chauffage · PAC“. Dasselbe gilt im Dialog der @-Erwähnung.

### Nach Tags und Eigenschaften filtern

Diese Wörter wirken in der Suche als Filter:

| Eingabe | Findet |
| --- | --- |
| `#Kunde` | Seiten mit dem Tag „Kunde“ (Groß-/Kleinschreibung egal) und Datenbank-Einträge, die ihn in einer Mehrfachauswahl mit den Tags des Arbeitsbereichs tragen; Tags mit Leerzeichen als `#"Neue Idee"` |
| `-#Intern` | lässt Seiten und Einträge mit dem Tag weg |
| `Status:Offen` | Eigenschaft „Status“ mit dem Wert „Offen“ (Auswahl und Mehrfachauswahl: genau diese Option; Text, Webadresse, E-Mail, Telefon: enthält) |
| `Budget:>1000`, `Budget:<=50`, `Budget:10..20` | Zahlen vergleichen |
| `Fällig:2026-12`, `Fällig:>2026-11-01`, `Fällig:2026-11-01..2026-11-30` | Datum: Tag, Monat oder Jahr; nach, zwischen (auch `<`, `>=`, `<=`) |
| `Abgerechnet:ja` / `Abgerechnet:nein` | Kontrollkästchen |
| `Verantwortlich:Emil`, `Verantwortlich:ich` | Person nach Namen; `ich` (auch `me`) bist du |
| `Status:*` / `Status:-` | Eigenschaft gesetzt / leer |

Namen mit Leerzeichen stehen in Anführungszeichen: `"Nächster Schritt":Angebot`. Mehrere Filter gelten zusammen; der übrige Text wird wie gewohnt gesucht. Nur Filter ohne Text listen alle passenden Seiten, die zuletzt geänderte zuerst. Einträge zählen dabei mit ihren eigenen Tags und denen ihrer Datenbank-Seite. Wörter, die keinen Tag und keine Eigenschaft nennen (etwa `#123`), bleiben normale Suchwörter.

Tags und Eigenschaften können [nur in einem Bereich gelten](/page-tags#geltungsbereich-arbeitsbereich-oder-bereich), und zwei Bereiche dürfen gleichnamige haben. `#Dringend` ist ein Name: Es findet die Seiten mit jedem Tag dieses Namens, den du sehen darfst – in jedem Bereich den dort geltenden. Die Auswahl **Tag …** neben dem Suchfeld zeigt mit gewähltem Bereich nur dessen Tags und die des Arbeitsbereichs, für alle Bereiche alle mit dem Bereichsnamen als Hinweis. Die [Tag-Ansicht](/page-tags#tag-ansicht) zeigt dagegen genau einen Tag (gleichnamige anderer Bereiche auf Wunsch dazu).

Erkannte Filter erscheinen als Chips unter dem Suchfeld; ✕ nimmt einen wieder heraus. Die Auswahl **Tag …** neben dem Bereich fügt einen Tag-Filter ein. Sammlungen behalten die Filter. Tag-Namen und Werte sind außerdem gewöhnliche Suchwörter der Seite: „Kunde“ findet auch Seiten mit dem Tag „Kunde“.

### Verknüpfen: UND, ODER, NICHT

Bedingungen lassen sich frei kombinieren. Das geht in der Suche und in [Sammlungen](#sammlungen):

| Eingabe | Bedeutung |
| --- | --- |
| `#Kunde #Offen` | beide (UND; ein `AND` dazwischen ist erlaubt) |
| `#Offen OR #Wartet`, `#Offen \| #Wartet` | eines von beiden |
| `-#Intern`, `NOT #Intern`, `-entwurf` | ohne; `-` bzw. `NOT` geht vor jeder Bedingung und vor einer Klammer |
| `(#Offen OR #Wartet) -#Intern` | Klammern gruppieren |
| `created_by:Anna`, `creator:me` | erstellt von (Name oder `me` für dich) |
| `updated_by:Emil`, `editor:me` | zuletzt geändert von |
| `created:-7d`, `updated:this-week` | erstellt bzw. geändert in den letzten 7 Tagen, in dieser Woche |
| `created:2026-03`, `updated:>2026-01-01`, `created:2026-01-01..2026-01-31` | Jahr, Monat oder Tag; danach (`>`, `>=`), davor (`<`, `<=`), Zeitraum |
| `type:document`, `type:database\|whiteboard`, `type:record` | nur Dokumente, Datenbanken, Whiteboards oder Datenbank-Einträge (auch `notebook`, `journal`) |
| `in:"Team Marketing"` | nur in diesem Bereich |
| `title:Angebot` | nur der Titel enthält das Wort |

**Relative Zeiträume:** `-7d`, `-2w`, `-3m` und `-1y` meinen die letzten 7 Tage, 2 Wochen, 3 Monate oder ein Jahr, heute eingeschlossen. Dazu kommen `today`, `yesterday`, `this-week`, `last-week`, `this-month`, `last-month`, `this-year` und `last-year`. Wochen beginnen am Montag. „Heute“ ist der Tag in deiner Zeitzone. Diese Angaben gehen auch bei Datums-Eigenschaften: `Fällig:this-week`.

**Vorrang:** `NOT`/`-` bindet am stärksten, dann UND, dann ODER. `#A #B OR #C` heißt also `(#A #B) OR #C`. Im Zweifel setzt du Klammern. `OR`, `AND` und `NOT` gelten nur in Großbuchstaben. Kleingeschriebenes „or“ bleibt ein Suchwort.

**Wörter:** Wörter direkt hintereinander werden wie bisher als zusammenhängender Ausdruck gesucht. Mit `AND` dazwischen (`Rechnung AND offen`) dürfen sie irgendwo stehen.

**Schlüsselwörter:** `created_by`, `creator`, `updated_by`, `editor`, `created`, `updated`, `type`, `in` und `title` sind englisch. Groß- und Kleinschreibung zählt nicht. Heißt eine Eigenschaft genauso, setzt du ihren Namen in Anführungszeichen: `"Type":Buch`. Bei Datenbank-Einträgen prüft `Eigenschaft:Wert` zuerst die gleichnamige Eigenschaft des Eintrags (z. B. `Priorität:Hoch`), sonst die der Datenbankseite.

Alle bisherigen Suchen funktionieren unverändert. Suchen mit den neuen Bedingungen listen die passenden Seiten und Einträge ohne Textausschnitt, zuletzt geänderte zuerst. Ende-zu-Ende-verschlüsselte Bereiche durchsucht der Server nicht.

### Befehle

Dieselbe Schnellsuche führt auch Befehle aus: Beginnt die Eingabe mit `>`, erscheinen nur Befehle, etwa `> neue datenbank`, `> aufgaben`, `> dunkel` oder `> fokus`; <kbd>Enter</kbd> führt den ersten aus. Passende Befehle erscheinen auch ohne `>` über den Suchtreffern. Mit geöffneter Seite gibt es zusätzlich Seitenbefehle: Favorit, Folgen, Kommentare, Export, Drucken/PDF, Versionsverlauf, Teilen und Fokusmodus.

### Sammlungen

Eine **Sammlung** ist eine gespeicherte Suche mit eigenem Platz in der Seitenleiste. Öffnest du sie, sucht Flowplan jedes Mal neu. Neue und geänderte Seiten und Einträge, die passen, erscheinen von selbst.

- **Anlegen:** In der Schnellsuche **Als Sammlung speichern** (Art und Bereich der Suche werden zu `type:` und `in:`) oder in der Seitenleiste bei **Sammlungen** auf **+**.
- **Filter oder Text:** Im Editor stellst du die Abfrage unter **Filter** zusammen. Gruppen verlangen **alle Bedingungen (UND)** oder **mindestens eine (ODER)**. Jede Bedingung und jede Gruppe lässt sich ausschließen (NICHT). Zur Wahl stehen Tag, Erstellt von, Zuletzt geändert von, Eigenschaft (je nach Typ: Auswahl, Mehrfachauswahl, Text, Zahl, Datum, Kontrollkästchen, Person), Erstellt am, Geändert am (relativ oder fest), Art, Bereich, Titel enthält und Text enthält. Unter **Text** steht dieselbe Abfrage in der Suchsprache. Beide Ansichten bleiben gleich: Was du im Text änderst, zeigen die Filter wieder an. Lässt sich ein Text nicht als Filter darstellen (etwa wegen einer fehlenden Klammer), bleibt der Editor bei Text und sagt das. Darunter siehst du sofort, wie viele Treffer es gibt.
- **Ergebnisse:** Als **Liste** oder **Tabelle** mit Titel, Art, Bereich, Tags, Geändert und Erstellt von. Ein Klick auf die Spaltenüberschrift sortiert. Höchstens 500 Treffer werden gezeigt, zuletzt geänderte zuerst.
- **Verwalten:** Im Menü **…** neben einer Sammlung findest du Bearbeiten (Name, Emoji, Filter, Teilen), Duplizieren, Nach oben/Nach unten und Löschen. Sammlungen lassen sich auch per Ziehen ordnen; die Reihenfolge gilt für dich. Nach dem Löschen bietet **Rückgängig** die Sammlung wieder an.
- **Teilen:** Neue Sammlungen sind privat. Mit **Mit dem Arbeitsbereich teilen** sehen alle Mitglieder sie unter **Geteilt**, Gäste nicht. Ändern und löschen dürfen sie nur du und die Eigentümer des Arbeitsbereichs. Teilen oder das Teilen beenden kannst nur du. Die anderen können **Als meine Sammlung duplizieren**.
- **Rechte:** Jede Person sieht in einer Sammlung nur, was sie selbst lesen darf. Das gilt auch für geteilte Sammlungen: keine privaten Bereiche, keine privaten Einträge anderer, keine verborgenen Eigenschaften, keine Journale hinter einer PIN, nichts aus dem Papierkorb. Ende-zu-Ende-verschlüsselte Bereiche bleiben außen vor; die Sammlung weist darauf hin.
- **Grenzen:** 100 Sammlungen je Person und Arbeitsbereich, 100 geteilte je Arbeitsbereich.

Gespeicherte Suchen aus früheren Versionen sind beim Update zu privaten Sammlungen geworden. Suchen nach Kommentaren oder Dateien behalten ihre Wörter, aber nicht die Art.
