---
keywords: KI-Aktion, KI-Eigenschaft, automatisch ausfüllen, KI-Knoten, Agent
---

# KI-Aktionen, Datenbanken und Workflows

Aus einer Antwort der KI werden Aufgaben, Einträge und Seiten; dazu KI-Eigenschaften in Datenbanken, KI auf Whiteboards und KI-Knoten in Workflows.

## KI-Aktionen

Aus einer Antwort von **KI fragen**, aus dem Schreibassistenten (**Aktionen vorschlagen** unter der Antwort) oder aus dem Transkript einer [Besprechung](/media-and-files#sprachnotizen-und-besprechungen) schlägt die KI Aktionen vor:

| Aktion | Was passiert |
| --- | --- |
| **Seite anlegen** | Neue Seite mit Titel und Inhalt in einem Bereich, in dem du Seiten anlegen darfst. |
| **Aufgaben anlegen** | Aufgaben am Ende eines Dokuments, auf Wunsch mit verantwortlicher Person (@Erwähnung) und Fälligkeitsdatum – sie erscheinen in **Meine Aufgaben** wie selbst geschriebene. |
| **Text anfügen** | Etwa eine Zusammenfassung am Ende eines Dokuments. |
| **Eintrag anlegen** / **Eintrag ändern** | In einer Datenbank, nur in Eigenschaften, die du ändern darfst, und nur mit gültigen Werten (vorhandene Auswahloptionen, Mitglieder, Datumsangaben). |

**Nichts geschieht ohne dich:** Die Vorschläge erscheinen als **Vorschau mit Kästchen**. Was nicht möglich ist – etwa ein Bereich ohne Schreibrecht, eine gesperrte Eigenschaft oder eine für die KI gesperrte Datenbank –, steht ausgegraut mit dem Grund daneben. Erst **Ausführen** legt die gewählten Aktionen an.

- Ausgeführt wird **in deinem Namen und mit deinen Rechten**; der Server prüft jede Aktion beim Ausführen noch einmal. Versionsverlauf, Benachrichtigungen, Automationen und Webhooks laufen wie bei einer eigenen Änderung, das Protokoll vermerkt `ai.action`.
- **Rückgängig:** Angelegte Seiten und Einträge lassen sich direkt im Ergebnis zurücknehmen (sie landen im Papierkorb); angefügter Text und geänderte Einträge stehen im Versionsverlauf.
- Die KI sieht nur einen Katalog der Bereiche, Datenbanken, Eigenschaften und Mitglieder, in die du schreiben darfst und die die KI lesen darf – keine Inhalte darüber hinaus. Die Antwort der KI ist reines JSON und wird nie direkt ausgeführt.
- Die Funktion **KI-Aktionen** lässt sich wie alle anderen von der Administration und unter **Einstellungen → KI** ausschalten.

### Daten aus Datenbanken verwenden

Wenn du eine Datenbank in deinem Auftrag nennst, liest die KI ihre Einträge und arbeitet mit den echten Werten statt mit einer Vorlage voller Platzhalter. Beispiel: „Erstelle eine Dokumentation aus der Tabelle Server“ ergibt eine Tabelle mit deinen Servern, ihren IP-Adressen und URLs.

Die KI liest eine Datenbank, wenn
- du ihren Titel im Auftrag nennst (Groß- und Kleinschreibung egal, gern in Anführungszeichen, z. B. „Server“),
- du sie im Auftrag oder im Text verlinkst (Seitenlink mit `[[`),
- sie im geöffneten Dokument verlinkt oder als Ansicht eingebettet ist und dein Auftrag von einer Tabelle oder Datenbank spricht („Fasse die verlinkte Tabelle zusammen“) – im Schreibassistenten nur mit „Seite als Kontext“,
- bei „KI fragen“ die Frage auf die geöffnete Datenbank beschränkt ist, oder eine gefundene Quelle die Datenbank selbst ist.

Das gilt für KI-Aktionen, den Schreibassistenten (freier Auftrag mit `/ki` und eigene Anweisung zu einer Auswahl) und „KI fragen“. Unter der Antwort bzw. über den vorgeschlagenen Aktionen steht, welche Daten gelesen wurden, z. B. „Daten aus: Server (12 Einträge)“. Bei „KI fragen“ erscheint die Datenbank als Quelle.

Was die KI sieht:
- nur Einträge, die du sehen darfst und die die KI lesen darf – keine privaten Einträge anderer, nichts aus Journalen mit PIN, aus Seiten und Bereichen, die [für KI gesperrt](/ai#seiten-und-bereiche-fuer-die-ki-sperren) sind, aus Ende-zu-Ende-verschlüsselten Bereichen, aus dem Papierkorb oder aus Bereichen, die du in deinen KI-Einstellungen ausgeschlossen hast,
- nur Eigenschaften, die für dich sichtbar sind (Lese-Rechte pro Eigenschaft gelten); Verknüpfungen, Formeln, Rollups, Dateien, Fortschritt, Zeit und Sprints werden nicht mitgeschickt, ebenso wenig der Text in den Eintragsdokumenten,
- die Einträge in der Reihenfolge der Datenbank.

Grenzen: höchstens 3 Datenbanken und 200 Einträge pro Anfrage und etwa 40 000 Zeichen (mit einem Modell auf dem eigenen Server im Schreibassistenten etwa 8 000). Passt nicht alles hinein, steht das in den Daten („… und 57 weitere Einträge“), und die KI weist darauf hin. Die Apple-KI auf dem Gerät liest keine Datenbanken.

## KI auf Whiteboards

Auf [Whiteboards](/whiteboard-collaboration#ki-auf-dem-whiteboard) öffnet **KI** in der Werkzeugleiste drei Funktionen:

- **Nach Thema gruppieren (KI):** ausgewählte Zettel – oder alle im sichtbaren Bereich – nach Themen in beschrifteten Spalten ordnen.
- **Zusammenfassen als Seite:** eine neue Seite neben dem Board mit Zusammenfassung, Themen, Entscheidungen, offenen Fragen und Aufgaben (auf Wunsch als echte Aufgaben mit Person und Termin), mit Link zurück.
- **Mit KI erzeugen …:** eine Mindmap oder ein Flussdiagramm aus einer Beschreibung.

Dazu kommt beim Anlegen von [Datenbankeinträgen aus Zetteln](/whiteboard-collaboration#zettel-als-datenbankeintraege) **Mit KI aufteilen**: Die KI füllt aus dem Zetteltext weitere Eigenschaften, mit Vorschau vor dem Anlegen. Das Anlegen selbst braucht keine KI.

- Nutzen können es Personen, die das Board bearbeiten dürfen. Die Antwort der KI wird streng geprüft (nur bekannte Zettel, Formen und Eigenschaften, Höchstgrenzen) und dann wie eine eigene Änderung angewendet – live für alle, mit einem Schritt rückgängig zu machen.
- An den Anbieter gehen nur die Texte der betroffenen Elemente – ohne verdeckte Zettel und ohne verknüpfte Seiten oder Einträge, die die KI nicht lesen darf. Beim Erzeugen geht nur deine Beschreibung hin, nichts vom Board. Das Protokoll vermerkt `ai.whiteboard`.
- Die Funktion **KI auf Whiteboards** lässt sich wie alle anderen von der Administration und unter **Einstellungen → KI** ausschalten; sie ist an, sobald KI an ist.

## KI in Datenbanken

### KI-Eigenschaft

Beim Hinzufügen einer Eigenschaft **KI-Eigenschaft** wählen und einen Auftrag schreiben, der andere Eigenschaften in geschweiften Klammern nennt:

- `Fasse {Beschreibung} in einem Satz zusammen`
- `Kategorie aus {Titel}: eine von Roman, Sachbuch, Krimi`
- `{Inhalt}` steht für den Seiteninhalt des Eintrags.

Die **Ausgabe** ist Text, Auswahl, Mehrfachauswahl (nur vorhandene Optionen – erfundene werden verworfen) oder Zahl. Da eine KI-Eigenschaft eine normale Eigenschaft ist, funktionieren Filter, Sortierung, Gruppierung, Formulare und Exporte wie gewohnt.

- **Für alle ausfüllen** im Eigenschaftsdialog berechnet alle Einträge im Hintergrund; eine Anzeige nennt, wie viele Werte noch berechnet werden.
- Im Eintrag berechnet **Neu berechnen** einen Wert sofort und zeigt, wann und mit welchem Modell er entstand.
- **Automatisch neu berechnen, wenn sich verwendete Eigenschaften ändern:** Werte folgen Änderungen mit kurzer Verzögerung und im Rahmen der KI-Grenzen. Das läuft im Namen der Person, die es eingeschaltet oder den Auftrag zuletzt geändert hat. Verliert sie den Zugriff, stoppt es; ist KI auf der Instanz aus, pausiert es.
- Werte entstehen wie Bearbeitungen: mit Versionsverlauf, Automationen und Webhooks. Frisch berechnete Zellen leuchten kurz auf.
- Leser, Gäste und API-Tokens können keine KI-Werte schreiben. Private Einträge und für die KI gesperrte Datenbanken werden übersprungen.

### Felder mit KI ausfüllen

Einträge in der Tabelle auswählen → **Mit KI ausfüllen** → eine Eigenschaft wählen (etwa Tags). Die KI füllt nur **leere** Felder – aus Titel, übrigen Eigenschaften und Inhalt; bei Auswahlen nur mit vorhandenen Optionen.

### Datenbank mit KI erstellen

Neue Seite → Datenbank → **Mit KI erstellen** und beschreiben, z. B. „Leseliste mit Autor, Genre, Status, Bewertung“. Die KI schlägt Eigenschaften mit Typen, Auswahloptionen und ein paar Beispieleinträge vor. Du benennst um, entfernst Eigenschaften oder lässt die Beispiele weg – erst **Seite erstellen** legt die Datenbank an. Der Vorschlag wird streng geprüft (erlaubte Typen, höchstens 25 Eigenschaften und 30 Optionen, passende Beispielwerte); aus der Antwort der KI wird nichts ausgeführt.

## KI in Workflows

[Workflows](/workflows) haben vier KI-Knoten: **Zusammenfassen**, **Einordnen** (in Kategorien oder die Optionen einer Auswahl, mit Ausgang „unklar“), **Felder auslesen** und **Eigene Anweisung** (Text oder JSON). Sie nutzen die KI-Funktion **KI in Workflows** – Admins schalten sie unter Administration → KI ab, jede Person für sich in den eigenen KI-Einstellungen.

- **Budget**: höchstens 100 000 Tokens je Workflow und Tag (`FLOWPLAN_WORKFLOW_AI_TOKENS_PER_DAY`); ist es aufgebraucht, scheitert der Knoten mit einer Meldung.
- **Was die KI liest**: nur Seiten und Einträge, die die ausführende Person sehen darf und die für die KI freigegeben sind; gesperrte Seiten und Journale mit PIN bleiben draußen.
- **Prompt-Injection**: Fremder Text (E-Mails, Webhooks, Seiteninhalte) steht im Prompt markiert als Daten. Die KI liefert nur Daten, nie Aktionen – was sie antwortet, wird geprüft (Kategorien aus der Liste, typisierte Felder). Bestimmt eine KI-Ausgabe Empfänger, eine Adresse oder ein Ziel, warnt die Prüfung vor dem Aktivieren.
- **KI-Builder**: „Mit KI entwerfen“ baut aus einem Satz einen Entwurf; die KI sieht dabei nur Namen von Datenbanken, Eigenschaften und Seiten, keine Inhalte, und es zählt dein persönliches KI-Kontingent.
