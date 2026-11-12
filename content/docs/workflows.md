# Workflows

Ein Workflow ist ein Ablauf aus Knoten auf einer Fläche: ein **Auslöser** (eine neue Seite, ein geänderter Eintrag, ein Zeitplan, eine E-Mail …), dann **Logik** und **Aktionen** – Einträge und Seiten ändern, Personen benachrichtigen, KI fragen, andere Dienste aufrufen. Ganz ohne Code.

Workflows sind ein eigener Seitentyp. Sie laufen im Hintergrund auf dem Server, Schritt für Schritt, überstehen Neustarts, wiederholen sich bei Fehlern und warten auch Tage auf ein Datum oder eine Freigabe. Ein Workflow kann nie mehr als die Person, die ihn aktiviert hat.

## Erste Schritte: die Vorlage aus dem Issue

So verlinkst du jede neue Unterseite einer Übersichtsseite automatisch dort – mit einem Satz Beschreibung:

1. In der Seitenleiste **+ → Workflow** wählen und einen Titel geben.
2. Auf der leeren Fläche die Vorlage **Unterseiten auf der Übersicht verlinken** wählen.
3. Der kurze Assistent fragt nach der **Übersichtsseite** und ob eine **Kurzbeschreibung mit KI** dazukommt. **Als Entwurf anlegen**.
4. **Probelauf** (nichts wird verändert) oder **Testlauf** (echt, als du) – das Ergebnis steht an jedem Knoten.
5. **Aktivieren**. Ab jetzt landet jede neue Unterseite als „• Link – Kurztext“ auf der Übersicht, nie doppelt.

## Wie ein Workflow beginnt

Eine neue Workflow-Seite zeigt vier Wege:

- **Leer beginnen** – du wählst den Auslöser und baust selbst.
- **Vorlagen** – sechs fertige Abläufe mit Lücken, die ein Assistent abfragt (Seite, Datenbank, Eigenschaft, Person, Chat-Webhook, E-Mail-Adresse):

| Vorlage | Was sie tut |
| --- | --- |
| Unterseiten auf der Übersicht verlinken | Neue Seite direkt unter X → optional KI-Kurzbeschreibung → „• Link – Kurztext“ an X anhängen, nie doppelt |
| Erinnerung vor Fälligkeit | Zwei Tage vor dem Datum um 9:00 → nur wenn nicht erledigt → Verantwortliche per Push erinnern |
| Formular → KI-Kategorie → Zuweisung | Formularantwort → KI ordnet einer Kategorie zu → je Kategorie zuständig machen und benachrichtigen; unklar → Teamleitung |
| Wochenbericht | Freitags 15:00 → diese Woche erledigte Einträge finden → KI fasst zusammen → Berichtsseite anlegen → optional im Chat posten |
| Eingehende Mail → Ticket | E-Mail an die Adresse des Workflows → KI liest Titel, Beschreibung, Dringlichkeit → Eintrag anlegen → Absender bestätigen |
| Webhook → Eintrag | Ein anderer Dienst ruft die Adresse des Workflows auf → Eintrag anlegen |

- **Mit KI entwerfen** – ein Satz genügt, siehe [KI-Builder](#ki-builder).
- **Aus Datei importieren** – eine exportierte Workflow-Datei, siehe [Export und Import](#export-und-import).

Was du wählst, landet als **Entwurf** auf der Fläche – mit **Rückgängig** wieder weg. Aktiv wird ein Workflow nie von selbst.

Weitere Workflows findest du im [Marketplace](/marketplace). Einen eigenen Workflow teilst du über das Marketplace-Symbol im Kopf der Workflow-Seite – ohne Zugangsdaten, Läufe, Webhook-Adressen und Namen von Personen. Übernommene Workflows kommen immer pausiert als Entwurf an; Angaben, die zu deinem Arbeitsbereich gehören (Seite, Datenbank, Person …), legst du danach im Editor fest.

## Die Fläche

- **Knotenliste** links: Auslöser, Logik, Einträge, Seiten, Benachrichtigen, KI, HTTP – mit Suche. Ziehen oder anklicken (hängt hinter dem gewählten Knoten an).
- **Knoten** zeigen Symbol, Bezeichnung und eine Zeile Zusammenfassung; ein Punkt markiert Fehler oder Warnungen der Prüfung. Das ⚡ heißt: läuft sofort beim Speichern des Eintrags (der „Sofortteil“).
- **Seitenpanel** rechts: die Einstellungen des gewählten Knotens, „Bei Fehler“, Notiz und Ein-/Ausgabe des letzten Tests.
- **Liste** zeigt denselben Ablauf als Gliederung – voll per Tastatur bedienbar. **Aufräumen** ordnet die Knoten von links nach rechts.
- Mehrere Personen bearbeiten denselben Entwurf gleichzeitig; was läuft, ändert sich erst mit **Aktivieren**.

## Platzhalter und Filter

In jedem Textfeld fügt **{}** (oder `{{` tippen) Werte früherer Knoten ein, etwa `{{Neue Seite.Titel}}` oder `{{Auslöser.Eintrag.Felder.Status}}`. Filter hängen mit `|` an:

| Filter | Beispiel | Ergebnis |
| --- | --- | --- |
| `truncate` / `kürzen` | `{{KI.summary \| kürzen: 140}}` | höchstens 140 Zeichen |
| `date` / `datum` | `{{$heute \| datum: "dd.MM.yyyy"}}` | Datum in eigener Form |
| `add_days` / `plus_tage` | `{{$heute \| plus_tage: 3}}` | drei Tage später |
| `default` / `standard` | `{{Webhook.body.titel \| standard: "Ohne Titel"}}` | Ersatz für leere Werte |
| `required` / `pflicht` | `{{Webhook.body.titel \| pflicht}}` | Fehler, wenn leer |
| `join`, `first`, `last`, `count` | `{{Finden.records \| verbinden: ", "}}` | Listen zu Text |
| `upper`, `lower`, `trim`, `replace`, `number`, `plain`, `json` | | Text umformen |

Eingebaute Werte: `$heute`, `$jetzt`, `$lauf`, `$workflow`, `$ausführende`, in „Für jedes“ `$element` und `$index`. Platzhalterwerte werden immer als Text eingefügt, nie als HTML.

## Testen

- **Probelauf**: Schreibende Knoten berichten nur, was sie täten („würde Eintrag anlegen …“); E-Mail, Chat und Push gehen nicht raus, Warten wird übersprungen, Freigaben gelten als genehmigt oder abgelehnt (wählbar). KI-Knoten laufen und kosten Tokens.
- **Testlauf**: führt echt aus – als **du**, nicht als die ausführende Person.
- Daten des Auslösers: **Beispiel**, **letztes echtes Ereignis**, ein **Eintrag** oder eine **Seite** zum Auswählen oder **eigene Werte**.

Tests nutzen immer den Entwurf. Das Ergebnis steht als Statusring an jedem Knoten; ein Klick zeigt Ein- und Ausgabe.

## Aktivieren, pausieren, „läuft als“

**Aktivieren** prüft den Entwurf (fehlende Angaben, gelöschte Datenbanken, Seiten ohne Zugriff …) und zeigt, was der Workflow tun wird und **als wer** er läuft: als die Person, die aktiviert. Er sieht und ändert nur, was diese Person darf. Verliert sie ihre Rechte, pausiert der Workflow und meldet sich.

**Pausieren** hält offene Läufe an (wahlweise brechen sie ab); nach dem Aktivieren laufen sie auf ihrer Version weiter. Nach zehn Fehlschlägen in Folge oder wenn die Hälfte der letzten Läufe scheitert, pausiert ein Workflow von selbst.

## Läufe und Versionen

Der Reiter **Läufe** listet jeden Lauf mit Status, Dauer und Version; filtern nach fehlgeschlagen, wartend, offen und Tests, suchen nach Fehlern. Ein Lauf öffnet die Fläche in seiner Version mit der Zeitleiste der Schritte (Versuche, Wartezeiten, Fehler). **Wiederholen ab fehlgeschlagenem Knoten** und **Abbrechen** stehen dort.

Ein- und Ausgaben eines Laufs sieht nur die Person, als die er lief; Kolleginnen sehen Status und Fehler und debuggen mit einem eigenen Testlauf.

**Versionen** zeigt aktivierte Versionen und Entwurfsstände in einer Zeitleiste, vergleicht zwei Stände und stellt einen als Entwurf wieder her.

## KI-Builder

**Mit KI entwerfen** (auf der leeren Fläche oder oben in der Leiste) baut aus einem Satz einen Entwurf – zum Beispiel: *„Wenn im Wiki unter Docker eine Seite entsteht, trage sie mit einem Satz Beschreibung auf der Übersicht ein.“*

- Die KI sieht nur **Namen** von Datenbanken, Eigenschaften, Optionen, Bereichen und Seiten, die du sehen darfst und die für die KI freigegeben sind – keine Inhalte.
- Was sie vorschlägt, wird gegen den Knotenkatalog geprüft: Unbekannte Knoten fallen weg, unbekannte Seiten oder Eigenschaften bleiben leer und sind markiert.
- Du siehst den Vorschlag zuerst; **In den Entwurf übernehmen** fügt ihn als eine Änderung ein. Aktivieren musst du selbst.
- Es zählt dein persönliches KI-Kontingent, nicht das Budget des Workflows. Siehe [KI](/ai#ki-in-workflows).

## Workflow-Knopf auf Seiten

Mit **/Workflow-Knopf** kommt ein Knopf in ein Dokument, der einen Workflow mit dem Auslöser **Manuell starten** startet. Hat der Auslöser Eingabefelder, zeigt der Knopf ein kleines Formular. Nach dem Klick steht dort **Gestartet** – Bearbeitende des Workflows sehen den Weg zu den Läufen.

Wer drücken darf, legt der Auslöser fest: standardmäßig die **Bearbeitenden des Workflows**, umschaltbar auf **alle Mitglieder**, die die Seite mit dem Knopf sehen. Gäste und Freigabelinks sehen den Knopf nie. Der Lauf läuft immer als die ausführende Person; die klickende Person steht als „Gestartet von“ im Lauf.

## Export und Import

**Als JSON exportieren** (Pfeil oben rechts) speichert den Ablauf als `.flowplan-workflow.json`: Bearbeitende bekommen den Entwurf, Lesende die aktive Version. Die Datei nennt die verwendeten Seiten, Datenbanken (mit Eigenschaften) und Personen mit Titel. **Zugangsdaten, Webhook-Adressen und Läufe sind nie enthalten** – Zugangsdaten nur mit Name, Art und Host, damit du sie neu verknüpfen kannst.

**Aus Datei importieren** ordnet Verweise im Arbeitsbereich zu: gleiche ID, sonst gleicher Titel (Seiten, Datenbanken), gleicher Name (Personen, Eigenschaften). Was offen bleibt, fragt der Assistent ab oder bleibt leer. Importiert wird immer als Entwurf.

Fertige Workflows anderer zum Übernehmen findest du im [Flowplan Marketplace](https://marketplace.flowplan.org).

Inhaltsarchive und der [Instanzumzug](/move-instance) nehmen Workflows mit Entwurf und Versionen mit, ohne Läufe und Geheimnisse. Aktive Workflows kommen **pausiert** an, damit auf der neuen Instanz nichts unbeabsichtigt loslegt.

## Telefon und Tablet

- **Telefon**: Status mit Ein/Aus-Schalter, der Ablauf als Liste, Läufe und Freigaben. Bearbeitet wird auf Tablet oder Computer.
- **Freigaben**: Die Benachrichtigung öffnet die Workflow-Seite mit dem Reiter **Freigaben** – Nachricht, Kommentar, **Ablehnen** oder **Genehmigen**.
- **Freigaben in der App**: In der iPhone- und Android-App trägt die Mitteilung die Knöpfe **Genehmigen** und **Ablehnen**, sofern Mitteilungen auf dem Sperrbildschirm ihren Text zeigen. **Genehmigen** fragt vorher Face ID, Touch ID oder den Fingerabdruck ab – ohne Biometrie öffnet sich stattdessen der Reiter **Freigaben**. **Ablehnen** geht ohne Biometrie, das Telefon muss aber entsperrt sein. Das Gerät muss angemeldet und in den letzten 14 Tagen aktiv gewesen sein; auf Android öffnet das allererste Genehmigen einmal den Reiter, weil dabei der Schlüssel angelegt wird.
- **Tablet**: der volle Editor; Verbinden auch per Tippen auf einen Ausgang und dann das Ziel.

## Tastatur

| Taste | Wirkung |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Umschalt</kbd>+<kbd>Tab</kbd> | zwischen Knoten |
| Pfeiltasten (mit <kbd>Umschalt</kbd> weiter) | gewählten Knoten verschieben |
| <kbd>Enter</kbd> / <kbd>Esc</kbd> | Panel öffnen / schließen |
| <kbd>A</kbd> | Knoten anhängen |
| <kbd>C</kbd> | verbinden mit … |
| <kbd>Entf</kbd> | löschen |
| <kbd>Strg</kbd>+<kbd>Z</kbd> / <kbd>Strg</kbd>+<kbd>Y</kbd> | rückgängig / wiederholen |
| <kbd>Strg</kbd>+<kbd>D</kbd> | duplizieren |
| <kbd>L</kbd> | Liste ↔ Fläche |
| <kbd>F</kbd> | Ansicht einpassen |

## Grenzen

| Grenze | Standard |
| --- | --- |
| Läufe je Minute und Workflow | 60 |
| Läufe je Minute und Arbeitsbereich | 600 |
| Schritte je Lauf | 200 |
| Gegenseitige Auslösung (Kaskade) | 5 Ebenen |
| Elemente je „Für jedes“ | 100 |
| KI-Tokens je Workflow und Tag | 100 000 |
| E-Mails je Workflow und Tag | 100 |
| Aufbewahrung der Läufe | 30 Tage |
| Aktive Workflows je Arbeitsbereich | 100 |

Admins ändern die Werte in der [Administration](/administration#workflows) oder per [Umgebungsvariable](/configuration#workflows). Bearbeitende können je Workflow niedrigere Werte setzen.

## API, MCP und SDKs

Workflows lassen sich per [REST-API](/api-and-webhooks#workflows) anlegen, prüfen, testen, **aktivieren** (mit Schreib-Token) und starten; die SDKs bringen fertige Methoden mit. Über [MCP](/mcp#workflows) liest ein KI-Assistent Workflows und Läufe, speichert Entwürfe, testet und startet – aktivieren und Freigaben entscheiden kann er nicht.

## Häufige Fragen

**Ersetzen Workflows die Automationen der Datenbanken?** Nein. Die einfachen Regeln bleiben im Formular unter **… → Automationen** und laufen über dieselbe Engine. Jede Regel lässt sich mit **Im Canvas öffnen** zu einem Workflow erweitern, siehe [Automationen](/projects-and-tickets#automationen).

**Warum sehe ich eine Workflow-Seite nicht?** Gäste sehen keine Workflow-Seiten. Sonst gelten die normalen Seitenrechte.

**Gibt es Workflows in verschlüsselten Bereichen?** Nein – der Server müsste die Inhalte lesen.

Alle Knoten im Einzelnen: [Knoten-Referenz](/workflow-nodes).
