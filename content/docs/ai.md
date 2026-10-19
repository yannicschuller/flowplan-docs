# KI

Optionale KI für Texte, Zusammenfassungen, Fragen an den Arbeitsbereich und Datenbanken – standardmäßig aus, auf Wunsch komplett lokal mit Ollama oder mit einem Schlüssel für OpenAI, Anthropic, Gemini oder jeden OpenAI-kompatiblen Dienst.

> [!NOTE]
> **KI ist in Flowplan immer optional.** Nach der Installation ist sie aus. Die Administration entscheidet, ob es sie gibt, welcher Anbieter verwendet wird, wer sie nutzen darf und welche Funktionen erlaubt sind. Jede Person kann sie für sich wieder ausschalten und festlegen, welche Seiten die KI lesen darf. Mit [Ollama](#ollama-komplett-lokal) verlassen deine Texte den Server nicht.

## Grundsätze

- **Aus, bis jemand sie einschaltet** – auf der Instanz und für jede Person.
- **Jede Funktion einzeln:** Schreibassistent, Zusammenfassungen, Fragen an den Arbeitsbereich und KI in Datenbanken lassen sich von der Administration und von jeder Person getrennt erlauben oder ausschalten.
- **Nur mit deinen Rechten:** Die KI liest nie mehr, als du selbst sehen darfst – und nur, was du ihr erlaubst ([Worauf die KI zugreifen darf](#worauf-die-ki-zugreifen-darf)).
- **Du siehst, wohin deine Texte gehen:** Jede KI-Funktion nennt den Anbieter und ob die Daten den Server verlassen.
- **Schlüssel bleiben geheim:** API-Schlüssel werden verschlüsselt gespeichert und nie wieder angezeigt ([Sicherheit der Schlüssel](#sicherheit-der-schluessel)).

## Anbieter

| Anbieter | Daten verlassen den Server | Typische Adresse |
| --- | --- | --- |
| **Ollama** | nein (wenn Ollama auf dem eigenen Server oder im eigenen Netz läuft) | `http://ollama:11434` |
| **OpenAI-kompatibel** | ja, an den gewählten Dienst – außer bei lokalen Servern wie LM Studio, vLLM oder LocalAI | `https://api.openai.com/v1`, `https://api.mistral.ai/v1`, `https://openrouter.ai/api/v1` |
| **Anthropic** (Claude) | ja, an Anthropic | `https://api.anthropic.com` |
| **Google Gemini** | ja, an Google | `https://generativelanguage.googleapis.com` |

Das Modell trägst du frei ein – jede Modell-ID, die der Anbieter kennt. **Verbindung testen** prüft Adresse, Schlüssel und Modell mit einer kurzen Anfrage.

### Ollama: komplett lokal

[Ollama](https://ollama.com) führt offene Modelle auf deinem eigenen Server aus. Die `compose.yaml` von Flowplan bringt einen passenden Dienst mit, der nur auf Wunsch startet:

```bash
docker compose --profile ai up -d
```

In der `.env`:

```env
OLLAMA_URL=http://ollama:11434
```

Danach unter **Administration → KI** den Anbieter **Ollama** wählen. **Installierte Modelle laden** zeigt, was schon da ist; unter **Modell herunterladen** lädt Flowplan weitere Modelle mit Fortschrittsanzeige, etwa `llama3.1`, `qwen2.5` oder `mistral`. Für die [Suche nach Bedeutung](#fragen-an-den-arbeitsbereich) zusätzlich ein Embedding-Modell wie `nomic-embed-text` laden und unter **Modell für Embeddings** eintragen.

> [!TIP]
> Wie gut und schnell lokale Modelle antworten, hängt vom Server ab. Kleine Modelle (3–8 Milliarden Parameter) laufen auf aktuellen CPUs; mit einer Grafikkarte werden sie deutlich schneller. Läuft Ollama auf einem anderen Rechner im Netz, trage dessen Adresse ein – Adressen im eigenen Netz sind für den Anbieter der Instanz erlaubt.

## Schreibassistent

Der Schreibassistent bearbeitet markierten Text oder schreibt neuen Text an der Schreibmarke. Er steht Personen zur Verfügung, die die Seite bearbeiten dürfen – wenn die Administration KI und den Schreibassistenten erlaubt hat und du ihn unter **Einstellungen → KI** nicht ausgeschaltet hast.

So öffnest du ihn:

- Text markieren → im Textmenü **KI**.
- <kbd>⌘</kbd> <kbd>J</kbd> (<kbd>Strg</kbd> <kbd>J</kbd>): wirkt auf die Markierung, ohne Markierung auf die aktuelle Zeile; in einer leeren Zeile öffnet sich ein freies Eingabefeld.
- `/ki` oder `/ai` im Blockmenü: freies Eingabefeld an der Schreibmarke.

| Aktion | Was passiert |
| --- | --- |
| **Verbessern** | Korrigiert Rechtschreibung, Grammatik und Zeichensetzung und ändert so wenig wie möglich. |
| **Umformulieren** | Gleicher Inhalt, andere Worte. |
| **Kürzen** | Etwa auf die Hälfte; das Wesentliche bleibt. |
| **Erweitern** | Mehr Erklärung und Beispiele, ohne Fakten zu erfinden. |
| **Einfacher erklären** | Kurze Sätze, einfache Wörter. |
| **Ton ändern** | Sachlich, freundlich oder locker. |
| **Übersetzen** | In eine wählbare Sprache – voreingestellt deutscher Text nach Englisch, anderer Text nach Deutsch. |
| **Als Liste** / **Als Tabelle** | Gliedert den Text um. |
| **Was soll die KI tun?** | Eine eigene Anweisung, z. B. „Mach daraus eine E-Mail“. |

**Freies Schreiben** (`/ki`, <kbd>⌘</kbd> <kbd>J</kbd> in einer leeren Zeile): Beschreibe, was entstehen soll – etwa „Schreib eine Einleitung über …“. Mit **Seite als Kontext** (voreingestellt an) geht der Inhalt der Seite mit an die KI.

Die KI antwortet in der Sprache des Textes, beim freien Schreiben in der Sprache deiner Anweisung. Die Antwort erscheint zuerst in einer **Vorschau** unter dem Text, nicht direkt im Dokument; ein pulsierender Cursor zeigt, dass noch Text folgt, **Stopp** bricht ab. Danach:

- **Ersetzen** (beim freien Schreiben **Einfügen**) – die Antwort ersetzt die Markierung bzw. die leere Zeile.
- **Darunter einfügen** – unter dem Absatz bzw. der Liste.
- **Erneut** – dieselbe Anfrage noch einmal; **Andere Aktion** – zurück zur Auswahl; **Verwerfen** – nichts ändert sich.

Überschriften, Listen, Aufgaben, Tabellen, Code und Hinweise werden als echte Blöcke eingefügt. Das Einfügen ist ein einziger Schritt, den <kbd>⌘</kbd> <kbd>Z</kbd> zurücknimmt, und funktioniert beim gemeinsamen Bearbeiten wie jede andere Änderung. Eingefügte Blöcke leuchten kurz in der Akzentfarbe auf – nur als Anzeige, nicht gespeichert und für andere unsichtbar.

> [!NOTE]
> Bilder aus Antworten werden nicht übernommen (nur ihr Alternativtext), Links nur, wenn sie auf `http(s)`, E-Mail oder Flowplan selbst zeigen. So kann ein manipulierter Text keine Inhalte über Bildadressen nach außen schicken.

## Zusammenfassungen

Die KI liefert eine kurze **Zusammenfassung**, die **Kernpunkte** und die **offenen Aufgaben** – in der Sprache des Inhalts.

- **Seite:** Seitenmenü **…** → **Mit KI zusammenfassen**. Das Ergebnis erscheint in einer Seitenleiste mit **Als Callout oben einfügen** (Zusammenfassung und Kernpunkte als Hinweis am Seitenanfang), **Aufgaben als Checkliste einfügen** (unter der Schreibmarke), **Kopieren** und **Erneut**.
- **Datenbank:** Der KI-Knopf in der Werkzeugleiste fasst die Einträge der **aktuellen Ansicht** zusammen – mit ihren Filtern, ihrer Suche und Sortierung, höchstens 300 Einträge. Die Leiste nennt, wie viele es waren („120 von 340 Einträgen“).
- **Eintrag:** KI-Knopf im Kopf des Eintrags; Callout und Checkliste landen im Dokument des Eintrags.
- **Sprachnotiz:** Wandelt der Server Sprachnotizen in Text um ([Sprachnotizen](/documents#sprachnotizen)), fasst **Danach mit KI zusammenfassen** das Transkript zusammen; **Darunter einfügen** setzt die Zusammenfassung unter das Transkript.

Lange Seiten werden abschnittsweise gelesen: Jeder Teil wird zusammengefasst, dann werden die Teile zusammengeführt (bei lokaler KI in kleineren Teilen). Sehr lange Inhalte werden nach zwölf Teilen abgeschnitten; die Leiste weist darauf hin. Einträge, die du nicht sehen darfst oder die für die KI gesperrt sind, bleiben außen vor.

### Wohin die Daten gehen

Jedes KI-Fenster nennt unten den Anbieter, etwa „Ollama · llama3.1 · lokal“ oder „… · Daten gehen an api.openai.com“. Bei lokaler KI bleibt der Text auf deinem Server; sonst gehen der markierte Text, deine Anweisung und – bei **Seite als Kontext** und Zusammenfassungen – der Seiteninhalt an diesen Anbieter. Flowplan lädt Seiten- und Datenbankinhalte selbst auf dem Server und prüft vorher, ob die KI sie lesen darf.

Auf Seiten, die die KI nicht lesen darf, sind alle KI-Einträge ausgegraut mit dem Hinweis „KI hat keinen Zugriff auf diese Seite“ – auch für markierten Text. Der Server lehnt solche Anfragen ebenfalls ab.

## Fragen an den Arbeitsbereich

**KI fragen** (Seitenleiste, <kbd>⌘</kbd> <kbd>K</kbd> → „KI fragen …“ oder der Knopf in der Suche) beantwortet Fragen zu deinen Seiten und Datenbanken – etwa „Wann ist die nächste Wartung der Heizung fällig?“ oder „Was haben wir zum Thema Onboarding beschlossen?“.

- Die Antwort nennt ihre **Quellen** als nummerierte Verweise [1], [2] …; ein Klick öffnet die Seite oder den Eintrag. Die Verweise stammen aus der Suche, nie aus dem Text der KI.
- Findet die KI nichts Passendes, antwortet sie „Dazu habe ich nichts gefunden.“ statt etwas zu erfinden.
- **Wo gesucht wird:** ganzer Arbeitsbereich, die geöffnete Seite mit ihren Unterseiten oder ein Bereich.
- **Gespräch:** Rückfragen beziehen die letzten Fragen und Antworten ein; **Neues Gespräch** beginnt von vorn. Das Gespräch bleibt nur in diesem Browser-Tab und wird nicht auf dem Server gespeichert.
- Gesucht wird über den Volltextindex; die passendsten Absätze gehen mit deiner Frage an den Anbieter, der oben im Fenster steht. Die KI liest dabei nur, was du lesen darfst und was für die KI freigegeben ist ([Worauf die KI zugreifen darf](#worauf-die-ki-zugreifen-darf)).
- Während die Antwort entsteht, zeigen ein Schimmer und ein Schreibcursor den Fortschritt; die Quellen erscheinen nacheinander.

### Suche nach Bedeutung (optional)

Zusätzlich zum Volltext kann Flowplan Inhalte als Vektoren („Embeddings“) speichern. Dann findet **KI fragen** passende Stellen auch ohne gleiche Wörter – „Reise“ findet „Betriebsausflug“.

1. Beim Anbieter der Instanz ein **Modell für Embeddings** eintragen:
   - **Ollama:** `nomic-embed-text` herunterladen (unter **Administration → KI → Modell herunterladen** oder `ollama pull nomic-embed-text`) und eintragen.
   - **OpenAI-kompatibel:** z. B. `text-embedding-3-small`; **Gemini:** `text-embedding-004`. Anthropic bietet keine Embeddings.
2. **Suche nach Bedeutung einschalten** und speichern. Alternativ per Umgebung: `FLOWPLAN_AI_SEMANTIC_SEARCH=on` und `FLOWPLAN_AI_EMBEDDING_MODEL=nomic-embed-text`.

- Ein Hintergrundauftrag bettet geänderte Seiten und Einträge abschnittsweise ein; unveränderte Abschnitte werden nicht erneut eingebettet. Höchstens `FLOWPLAN_AI_EMBED_PER_HOUR` Abschnitte pro Stunde (Standard 5.000).
- **Nie eingebettet** werden Journale mit PIN, für die KI gesperrte Seiten und Bereiche und der Papierkorb. Rechte und persönliche KI-Regeln gelten bei jeder Frage.
- Die Suche nach Bedeutung nutzt immer den Anbieter der Instanz. Wer einen eigenen Anbieter verwendet, sucht nur im Volltext.
- **Speicherbedarf:** 4 Byte je Dimension und Abschnitt (bis etwa 900 Zeichen) – mit `nomic-embed-text` (768 Dimensionen) rund 3 KB je Abschnitt, etwa das Drei- bis Vierfache des Textes; mit 1.536 Dimensionen rund 6 KB. Gespeichert wird nur ein Prüfwert jedes Abschnitts, nicht sein Text. Die Administration zeigt Anzahl und Größe.
- **Ausschalten** löscht alle Vektoren; ein **Modellwechsel** baut sie neu auf.
- Für sehr große Instanzen (Hunderttausende Abschnitte) gibt es noch keinen Vektorindex; die Suche bleibt dann korrekt, wird aber langsamer.

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

## Für Admins

Unter **Administration → KI**:

1. **KI einschalten.**
2. **Anbieter der Instanz** wählen (oder **Kein Anbieter**, siehe unten), Adresse, Modell und – falls nötig – den **API-Schlüssel** eintragen. **Verbindung testen.**
3. **Wer KI nutzen darf:**
   - **Alle** oder **Ausgewählte Personen** – Letztere schaltest du unter **Administration → Benutzer** pro Person frei („Darf KI-Funktionen nutzen“).
   - **Auch Gäste** – ausgeschaltet haben Gäste keine KI-Funktionen.
   - **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** – dann richtet jede Person in ihren Einstellungen einen eigenen Anbieter mit eigenem Schlüssel ein. Das geht auch ganz ohne Anbieter der Instanz: So nutzen Personen KI mit ihrem eigenen Konto bei einem Anbieter, ohne dass die Instanz dafür bezahlt.
4. **Funktionen:** jede einzeln erlauben oder verbieten. Optional die [Suche nach Bedeutung](#suche-nach-bedeutung-optional) einschalten.
5. **Speichern.**

So lassen sich drei typische Varianten einrichten:

| Variante | Einstellung |
| --- | --- |
| Alle nutzen dieselbe KI | Anbieter der Instanz, **Alle** |
| Nur bestimmte Personen | Anbieter der Instanz, **Ausgewählte Personen**, unter Benutzer freischalten |
| Jede Person mit eigener Lösung | **Kein Anbieter** (oder zusätzlich einer), **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** |

Alle Einstellungen lassen sich auch über [Umgebungsvariablen](/configuration#ki) vorbelegen, etwa für automatisierte Installationen. Sie gelten, bis jemand in der Administration speichert.

### Seiten und Bereiche für die KI sperren

Eigentümer eines Arbeitsbereichs oder eines Bereichs können eine **Seite** (im Teilen-Dialog) oder einen **Bereich** (in den Bereichseinstellungen) **für KI sperren**. Das gilt für alle Personen und für alles darunter – Unterseiten und Datenbankeinträge. Keine KI-Funktion liest dann diese Inhalte, auch wenn eine Person sie in ihren eigenen Regeln erlaubt hat.

## Für Nutzer

Unter **Einstellungen → KI**:

- **Verwendeter Anbieter:** welcher Anbieter für dich arbeitet und ob deine Texte den Server verlassen („Deine Texte werden auf diesem Server verarbeitet und verlassen ihn nicht.“ bei Ollama).
- **KI-Funktionen verwenden:** KI für dich ganz ausschalten – oder einzelne Funktionen.
- **Eigenen Anbieter einrichten** (wenn die Administration es erlaubt): Anbieter, Adresse, Modell und dein Schlüssel. Eigene Anbieter müssen öffentliche `https`-Adressen haben. Gibt es auch einen Anbieter der Instanz, wählst du unter **Welchen Anbieter verwenden** zwischen **Den der Instanz** und **Meinen eigenen**.

### Worauf die KI zugreifen darf

Du bestimmst, welche Inhalte die KI lesen darf:

- **Alles, was ich sehen darf** (Standard) – mit Ausnahmen, die du ausschließt.
- **Nur ausgewählte** – nur Arbeitsbereiche, Bereiche, Seiten und Datenbanken, die du erlaubst.

Mit **Regel hinzufügen** wählst du einen Arbeitsbereich, Bereich, eine Seite oder Datenbank und **erlauben** oder **ausschließen**. Regeln gelten für Unterseiten und Einträge mit; die nächstgelegene Regel gewinnt. So lässt sich etwa ein ganzer Arbeitsbereich erlauben und darin eine Seite mit Gehaltsdaten ausschließen.

**Nie** liest die KI:

- Seiten und Einträge, die du nicht sehen darfst,
- private Einträge anderer Personen,
- den Papierkorb,
- Journale mit PIN-Sperre (auch entsperrt),
- Seiten und Bereiche, die für KI gesperrt sind.

Auf einer Seite, die die KI nicht lesen darf, sind KI-Funktionen ausgegraut, mit dem Hinweis, warum.

## Sicherheit der Schlüssel

- **Verschlüsselt gespeichert:** API-Schlüssel – der Instanz und jeder Person – liegen nur verschlüsselt in der Datenbank (AES-256-GCM, an ihren Besitzer gebunden; ein kopierter Wert lässt sich an anderer Stelle nicht entschlüsseln). Der Schlüssel dafür kommt aus `FLOWPLAN_ENCRYPTION_KEY`, `FLOWPLAN_SECRETS_KEY` oder der Datei `secrets.key` im Datenordner ([Gespeicherte Geheimnisse](/configuration#gespeicherte-geheimnisse)).
- **Nur schreibbar:** Ein gespeicherter Schlüssel wird nie wieder angezeigt – weder in der Oberfläche noch über die API, in Exporten, Sicherungen oder Protokollen. Sichtbar ist nur „gespeichert · endet auf …abcd“ mit **Ersetzen** und **Entfernen**.
- **An die Adresse gebunden:** Ändert sich Anbieter oder Adresse, wird der gespeicherte Schlüssel gelöscht. Ein Schlüssel geht also nie an einen anderen Server als den, für den er eingegeben wurde. Schlüssel stehen nur in Kopfzeilen, nie in Adressen; Weiterleitungen werden nicht befolgt.
- **Keine internen Adressen für eigene Anbieter:** Eigene Anbieter von Personen erreichen nur öffentliche `https`-Adressen – keine Adressen im internen Netz oder des Servers selbst.
- **Aus Umgebungsvariablen:** Ein Schlüssel aus `FLOWPLAN_AI_API_KEY` wird nie in der Datenbank gespeichert und nur für den Anbieter aus den Variablen verwendet.
- **Fehlermeldungen** von Anbietern werden von Schlüsseln bereinigt, bevor sie angezeigt oder protokolliert werden.
- **Kein Zugriff über API-Tokens und Demo:** API-Tokens können KI-Einstellungen weder lesen noch ändern und keine KI-Funktionen nutzen; in der Demo ist KI aus.
- **Grenzen:** höchstens 30 Anfragen pro Minute, 300 pro Stunde (`FLOWPLAN_AI_REQUESTS_PER_HOUR`) und 3 gleichzeitig pro Person.
- **Sicherungen:** `secrets.key` ist nicht Teil der Instanzsicherung. Nach einer Wiederherstellung auf einem anderen Server ohne diese Datei zeigt Flowplan „gespeichert, aber nicht lesbar – bitte ersetzen“, und die Schlüssel werden neu eingegeben.

## Häufige Fragen

**Muss ich KI nutzen?** Nein. Sie ist aus, bis die Administration sie einschaltet, und jede Person kann sie für sich ausschalten.

**Geht es ganz ohne Cloud?** Ja, mit Ollama auf dem eigenen Server. Dann verlässt kein Text den Server.

**Trainiert der Anbieter mit meinen Daten?** Das regeln die Bedingungen des jeweiligen Anbieters. Flowplan schickt nur, was für eine Anfrage nötig ist, und nur Inhalte, die die KI lesen darf. Wer sicher gehen will, nutzt Ollama.

**Werden Gespräche gespeichert?** Flowplan speichert Anfragen und Antworten nicht dauerhaft; was in Seiten eingefügt wird, ist normaler Inhalt mit Versionsverlauf.

**Was ist mit dem MCP-Server?** Der [MCP-Server](/mcp) ist ein anderer Weg: Dort arbeitet ein externer Assistent wie Claude Desktop mit deinem Flowplan. Er ist unabhängig von den Einstellungen hier.
