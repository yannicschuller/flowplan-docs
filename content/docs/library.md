---
keywords: Bibliothek, Wissensbibliothek, Regal, Regale, Buch, Bücher, Kapitel, Handbuch, Dokumentation, Wiki, BookStack, Weiterlesen, Suche, Rechte, Gruppen, SSO
---

# Bibliothek

Für Wissen mit Hunderten Seiten – Handbücher, Richtlinien, Dokumentation – zeigst du Bereiche als **Bibliothek**: Jeder solche Bereich ist ein **Regal**, seine Seiten oben im Bereich sind die **Bücher**, deren Unterseiten die **Kapitel**. Die Bibliothek in der Navigation zeigt alle Regale auf einen Blick und sucht in allen zugleich.

**Mehr zum Thema:** [Seiten und Bereiche](/pages-and-spaces) · [Teilen](/sharing) · [Im Web veröffentlichen](/publishing) · [Mitglieder, Rollen und Rechte](/workspaces-and-permissions)

## Bereich als Bibliothek {since=0.10.0}

Für Dokumentation mit Hunderten Seiten zeigst du einen Bereich als **Bibliothek**: `…` neben dem Bereich → **Bereich bearbeiten …** → **Als Bibliothek anzeigen**. Eine zweite Ordnung gibt es nicht: Die Seiten oben im Bereich sind die **Bücher**, ihre Unterseiten die **Kapitel**, deren Unterseiten die **Seiten**.

- **Seitenleiste:** Der Bereich bleibt zugeklappt, darunter steht nur **Bibliothek öffnen**. Ein Klick auf den Bereichsnamen klappt den Seitenbaum trotzdem auf, zum Umsortieren.
- **Übersicht:** Jedes Buch ist eine Kachel mit Symbol, Cover, Zahl der Seiten und letzter Bearbeitung, in der Reihenfolge des Seitenbaums. Ein Klick zeigt das Inhaltsverzeichnis mit zuklappbaren Kapiteln, **Lesen beginnen** und **Weiterlesen** (die Seite des Buchs, die du zuletzt geöffnet hast).
- **Lesen:** Über jeder Seite stehen Buch und Kapitel und Pfeile zur vorherigen und nächsten Seite in Lesereihenfolge, unten führt **Weiter** zur nächsten.
- **Suchen:** Das Suchfeld der Bibliothek sucht nur in diesem Bereich.
- **Anlegen:** **Neues Buch** in der Übersicht, **Neues Kapitel** im Buch, **+** an einem Kapitel für eine Seite.

Du siehst nur Seiten, die du sehen darfst; Journaltage stehen nicht in der Bibliothek. Über die API schaltet `space.update` mit `library` die Ansicht um, `GET /api/spaces/{spaceId}/library` liefert Bücher und Kapitel.

## Arbeitsbereich als Bibliothek {since=0.11.7}

Für ein Büro-Handbuch oder eine Wissensbasis zeigst du den ganzen Arbeitsbereich als Bibliothek: **Einstellungen → Arbeitsbereich → Allgemein → Bibliothek → Arbeitsbereich als Bibliothek** (nur Eigentümer). Dann erscheint jeder Bereich als Regal mit Büchern – auch Bereiche, die später dazukommen. Die Einstellung der einzelnen Bereiche bleibt unverändert; schaltest du zurück, ist jeder Bereich wie zuvor. Beim Einschalten wählst du, was für alle Mitglieder aus der Seitenleiste verschwindet: **Meine Aufgaben** und **Journal** sind vorausgewählt, **Lernen** und **Graph** kannst du dazunehmen. Diese Schalter stehen danach unter **In der Seitenleiste ausblenden** und gelten auch ohne Bibliothek. Ausgeblendet heißt: kein Eintrag in der Seitenleiste, in der Schnellsuche, kein Tastenkürzel und kein Widget – gelöscht wird nichts, und Links öffnen weiter.

## Bücher und Kapitel als Übersicht {since=0.11.0}

Bücher und Kapitel sind wie Regalfächer: Sie öffnen sich als **Übersicht**, der Editor erscheint erst mit einer Seite.

- **Neues Buch** fragt in einem kleinen Fenster nur nach dem Namen – Regal und Art stehen schon fest. Danach siehst du die Übersicht des neuen Buchs.
- Die **Übersicht eines Buchs** zeigt Titel, Cover, Zahl der Seiten und Kapitel, **Lesen beginnen** oder **Weiterlesen** und das Inhaltsverzeichnis mit zuklappbaren Kapiteln. **Neues Kapitel** legt ein Kapitel an, **Neue Seite** eine Seite in einem Kapitel, das du auswählst; **+** an einem Kapitel legt die Seite direkt dort an.
- Ein **Kapitel** öffnet sich ebenso als Übersicht seiner Seiten, mit **Lesen beginnen** und **Neue Seite**.
- Eine **Seite** öffnet sich im Editor, wie gewohnt.

{since=0.11.1} Ein Buch oder Kapitel **benennst du um** mit dem Stift neben dem Titel auf seiner Übersicht: Enter oder ein Klick daneben speichert, Esc behält den alten Titel.

Hat ein Buch oder Kapitel eigenen Text – früher geschrieben oder beim Import aus BookStack als Beschreibung übernommen –, steht er schreibgeschützt über dem Inhaltsverzeichnis. **Beschreibung bearbeiten** öffnet ihn im Editor, ohne Text heißt die Aktion **Beschreibung hinzufügen**. Es geht nichts verloren.

Links auf ein Buch oder Kapitel (`#page=…`), Treffer der Suche und der Pfad über einer Seite führen zur Übersicht; ein Link mit `&edit=1` öffnet den Text des Buchs im Editor. **Lesen beginnen**, die Pfeile und **Weiter** gehen von Seite zu Seite und lassen die Übersichten aus; „Seite 3 von 12“ zählt nur die Seiten. Bücher und Kapitel, die keine Dokumente sind – etwa eine Datenbank –, öffnen sich weiter selbst. Bereiche, die nicht als Bibliothek angezeigt werden, bleiben unverändert.

Das Fenster für neue Seiten behält beim Tippen seinen Platz: Es hängt am oberen Rand, statt mittig mitzuwandern, wenn ein Hinweis wie „Ähnliche Einträge gibt es schon“ erscheint oder verschwindet.

## Alle Regale auf einen Blick {since=0.11.0}

Sobald du mindestens einen Bereich als Bibliothek siehst, steht **Bibliothek** in der Navigation unter **Startseite** – am Handy unter **Navigation**. Sie zeigt alle Regale nebeneinander in zwei Gruppen:

- **Meine Regale:** deine privaten Bereiche, die als Bibliothek angezeigt werden.
- **Geteilte Regale:** Bereiche des Teams und private Bereiche, die mit dir geteilt sind.

Auf breiten Bildschirmen stehen die beiden Gruppen nebeneinander, am Handy untereinander. Jedes Regal zeigt seine Bücher als Kacheln mit Cover oder Symbol, Titel, Zahl der Seiten und Kapitel in einer Reihe, die du seitlich weiterschiebst; nach zwölf Büchern führt **Alle n Bücher** ins Regal. Ein Klick auf den Namen des Regals öffnet seine Übersicht, **Alle Regale** führt zurück.

Oben steht **Weiterlesen**: die Bücher, in denen du zuletzt gelesen hast, mit der Seite, auf der du warst, und ihrer Stelle im Buch („Seite 4 von 37“). Ein Klick öffnet genau diese Seite.

In der Seitenleiste bleibt alles, wie es war: Bibliotheken sind zugeklappt, mit **Bibliothek öffnen** darunter. Auch die Befehlspalette kennt **Bibliothek öffnen**.

## In allen Regalen suchen {since=0.11.0}

Das Suchfeld der Bibliothek sucht in allen Regalen zugleich und ordnet die Treffer nach Ebene:

| Gruppe | Was gefunden wird | Ein Klick öffnet |
| --- | --- | --- |
| **Regale** | Namen der Bereiche | die Übersicht des Regals |
| **Bücher** | Titel der Seiten oben im Bereich | das Inhaltsverzeichnis des Buchs |
| **Kapitel** | Titel ihrer Unterseiten | das Kapitel mit der Buchnavigation |
| **Seiten und Inhalte** | Titel weiter unten, dann Text, Einträge, Kommentare und Dateien jeder Seite eines Buchs – mit einem Ausschnitt, das Suchwort markiert | die Seite (ein Eintrag öffnet sich in seiner Datenbank) |

Unter jedem Treffer steht sein Weg: Regal › Buch › Kapitel. Bei Titeln kommen ganze und beginnende Treffer zuerst, dann die Reihenfolge des Seitenbaums; ein Titel, dessen Text ebenfalls passt, erscheint einmal, mit Ausschnitt. Jede Gruppe zeigt höchstens 50 Treffer.

- **Zuklappen:** Ein Klick auf den Namen einer Gruppe klappt sie zu und wieder auf.
- **Tastatur:** <kbd>↓</kbd> springt vom Suchfeld zur ersten Gruppe, <kbd>↑</kbd> und <kbd>↓</kbd> gehen durch Gruppen und Treffer, <kbd>Pos1</kbd> und <kbd>Ende</kbd> zum ersten und letzten, <kbd>Esc</kbd> zurück ins Suchfeld, ein zweites <kbd>Esc</kbd> leert es.
- **Suchsprache:** Für die Inhalte gilt dieselbe wie in der [Suche](/search-and-notifications) – `#tag`, `in:"Bereich"`, `OR`, `-wort` und so weiter; die Titel vergleicht die Bibliothek mit den eingegebenen Wörtern. Journaltage und Bereiche, die keine Bibliothek sind, bleiben außen vor.

Du findest nur, was du auch sonst finden würdest: Die Bibliothek nutzt den Suchindex und dieselben Rechteprüfungen wie die normale Suche.

## Rechte für Regale und Bücher {since=0.11.0}

Die Bibliothek hat keine eigenen Rechte. Ein Regal ist ein Bereich, ein Buch eine Seite – es gelten die [Rechte des Arbeitsbereichs](/workspaces-and-permissions#wie-rechte-zusammenwirken):

- **Wer ein Regal sieht**, legt der Bereich fest: **Gesamtes Team** oder **Nur Berechtigte**, dazu je Gruppe **Ansehen** oder **Bearbeiten** unter **Einstellungen → Gruppen & Rechte → Zugriff auf Bereiche**.
- **Wer ein Buch sieht**, erbt sich vom Regal. Über **Teilen** der Buchseite gibst du zusätzlich Personen oder Gruppen Zugriff; Kapitel und Seiten darunter erben ihn. Wer nur ein Buch eines privaten Regals geteilt bekommt, sieht das Regal mit genau diesem Buch.
- **Wer sieht dieses Regal?** steht für Eigentümer des Bereichs und des Arbeitsbereichs am Regal – auf der Startseite der Bibliothek und in der Übersicht des Regals. Es sagt, wer das Regal sieht, und führt zu **Sichtbarkeit des Bereichs …** und – für Eigentümer des Arbeitsbereichs – zu **Zugriff für Gruppen …**.
- **Wer sieht dieses Buch?** steht im Inhaltsverzeichnis eines Buchs – für Eigentümer des Regals und für dich, wenn du das Buch angelegt hast – und öffnet **Teilen** der Buchseite: Dort steht, wer über den Bereich Zugriff hat, und du fügst Personen oder Gruppen hinzu.

Für unterschiedliche Leserkreise legst du am besten je Kreis ein Regal an (etwa „Handbuch Vertrieb“ privat, für die Gruppe Vertrieb) und teilst einzelne Bücher nur für Ausnahmen.

### Mit SSO-, SCIM- oder LDAP-Gruppen

Gruppen des Identitätsanbieters füllen die Gruppen des Arbeitsbereichs – damit pflegt sich, wer welches Regal sieht, von selbst:

1. **Einstellungen → Gruppen & Rechte → Gruppen:** eine Gruppe anlegen, etwa „Vertrieb“.
2. **SSO-Gruppen:** die Gruppe des Anbieters (z. B. `sales`) dieser Gruppe zuordnen – siehe [SSO-Gruppen zuordnen](/sso-oidc#sso-gruppen-arbeitsbereichen-zuordnen). SCIM-Gruppen und LDAP-Gruppen zählen genauso ([SCIM und LDAP](/scim-and-ldap)).
3. **Zugriff auf Bereiche:** das Regal auf **Nur Berechtigte** stellen und der Gruppe **Ansehen** geben – oder **Bearbeiten** für die, die die Bücher schreiben.

Wer beim Anbieter in die Gruppe kommt, sieht das Regal mit der nächsten Anmeldung (über SCIM sofort, über LDAP mit dem stündlichen Abgleich); wer herausfällt, sieht es nicht mehr. Einzelne Bücher teilst du auf dieselbe Art mit einer Gruppe über **Teilen**.

## API und MCP {since=0.11.0}

- `GET /api/library?workspace=…` liefert die Regale (`personal`, `shared`) mit ihren Büchern, `continueReading` und je Regal `canManage` – ob du seine Rechte ändern darfst.
- `GET /api/library/search?workspace=…&q=…` liefert die Treffer nach Ebene (`shelves`, `books`, `chapters`, `pages`) mit Weg (`path`), Ausschnitt und `total` je Gruppe.
- `GET /api/spaces/{spaceId}/library` liefert ein Regal mit dem Inhaltsverzeichnis jedes Buchs.
- Über [MCP](/mcp): `get_library` mit `workspaceId` für alle Regale oder `spaceId` für eines, `search_library` für die Suche nach Ebene.
