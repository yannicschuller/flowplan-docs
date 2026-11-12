---
keywords: KI, AI, Ollama, OpenAI, Anthropic, Gemini, Anbieter, einrichten, Datenschutz
---

# KI einrichten

Optionale KI für Texte, Zusammenfassungen, Fragen an den Arbeitsbereich und Datenbanken – standardmäßig aus, auf Wunsch komplett lokal mit Ollama oder mit einem Schlüssel für OpenAI, Anthropic, Gemini oder jeden OpenAI-kompatiblen Dienst. In den Apps für iPhone, iPad und Mac auf Wunsch auch [direkt auf dem Gerät mit Apple Intelligence](#ki-auf-dem-geraet-apple).

> [!NOTE]
> **KI ist in Flowplan immer optional.** Nach der Installation ist sie aus. Die Administration entscheidet, ob es sie gibt, welcher Anbieter verwendet wird, wer sie nutzen darf und welche Funktionen erlaubt sind. Jede Person kann sie für sich wieder ausschalten und festlegen, welche Seiten die KI lesen darf. Mit [Ollama](#ollama-komplett-lokal) verlassen deine Texte den Server nicht. Einzige Ausnahme vom „standardmäßig aus“: [KI auf dem Gerät (Apple)](#ki-auf-dem-geraet-apple) ist erlaubt, weil dabei nichts das Gerät verlässt – Administration und jede Person können auch sie ausschalten.

**Mehr zum Thema:** [Schreibassistent und Zusammenfassungen](/ai-writing) · [Fragen an den Arbeitsbereich](/ask-ai) · [KI-Aktionen, Datenbanken und Workflows](/ai-actions) · [Besprechungen](/meetings)

## Grundsätze

- **Aus, bis jemand sie einschaltet** – auf der Instanz und für jede Person. Einzige Ausnahme ist die [KI auf dem Gerät (Apple)](#ki-auf-dem-geraet-apple): Sie ist erlaubt, weil nichts das Gerät verlässt, und lässt sich ebenso abschalten.
- **Jede Funktion einzeln:** Schreibassistent, Zusammenfassungen, Fragen an den Arbeitsbereich, KI in Datenbanken, KI-Aktionen und KI auf Whiteboards lassen sich von der Administration und von jeder Person getrennt erlauben oder ausschalten.
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

Danach unter **Administration → KI** den Anbieter **Ollama** wählen. **Installierte Modelle laden** zeigt, was schon da ist; unter **Modell herunterladen** lädt Flowplan weitere Modelle mit Fortschrittsanzeige, etwa `llama3.1`, `qwen2.5` oder `mistral`. Für die [Suche nach Bedeutung](/ask-ai) zusätzlich ein Embedding-Modell wie `nomic-embed-text` laden und unter **Modell für Embeddings** eintragen.

> [!TIP]
> Wie gut und schnell lokale Modelle antworten, hängt vom Server ab. Kleine Modelle (3–8 Milliarden Parameter) laufen auf aktuellen CPUs; mit einer Grafikkarte werden sie deutlich schneller. Läuft Ollama auf einem anderen Rechner im Netz, trage dessen Adresse ein – Adressen im eigenen Netz sind für den Anbieter der Instanz erlaubt.

## KI auf dem Gerät (Apple)

> [!NOTE]
> **Optional und jederzeit abschaltbar.** In den Flowplan-Apps für iPhone, iPad und Mac kann Flowplan **Apple Intelligence direkt auf dem Gerät** nutzen. **Der Text verlässt das Gerät dabei nicht** – er geht weder an den Flowplan-Server noch an einen KI-Anbieter. Die KI über den Server bleibt davon unberührt und weiter verfügbar.

**Was du brauchst:** die Flowplan-App für iPhone oder iPad mit **iOS/iPadOS 26** oder neuer bzw. die Desktop-App ab 1.2.0 auf einem Mac mit **macOS 26** oder neuer, ein Gerät, das Apple Intelligence unterstützt (etwa iPhone 15 Pro oder neuer, iPad und Mac mit M-Chip), und **Apple Intelligence eingeschaltet** (Einstellungen → Apple Intelligence & Siri). Im Browser und auf anderen Geräten gibt es diesen Weg nicht. Auf dem Server braucht es eine Flowplan-Version neuer als 0.7.0 (derzeit das Beta-Image).

**Was auf dem Gerät läuft** – die leichten Aktionen auf einer geöffneten Seite:

- der [Schreibassistent](/ai-writing#schreibassistent) für markierten Text (Verbessern, Umformulieren, Kürzen, Erweitern, Einfacher erklären, Ton ändern, Übersetzen, Als Liste/Tabelle, eigene Anweisung) und das freie Schreiben an der Schreibmarke,
- die [Zusammenfassung](/ai-writing#zusammenfassungen) der geöffneten Seite, eines Eintrags oder einer Sprachnotiz – mit Kernpunkten und **offenen Aufgaben**, die das Modell strukturiert herausliest.

**Was auf dem Server bleibt:** Fragen an den Arbeitsbereich, KI in Datenbanken, KI-Aktionen und Zusammenfassungen von Datenbank-Ansichten. Sie brauchen weiter einen Anbieter der Instanz.

Ergebnisse vom Gerät tragen das Kennzeichen **Auf diesem Gerät**, unten steht „Apple Intelligence · nur auf diesem Gerät“. Die Antwort erscheint wie gewohnt Stück für Stück, **Stopp** bricht auch auf dem Gerät ab.

**Grenzen:** Das Modell auf dem Gerät ist klein und hat wenig Platz (etwa 4000 Token für Anweisung, Text und Antwort zusammen). Für den Schreibassistenten reicht das für einige Absätze; längere Seiten fasst es in Teilen zusammen. Was zu lang ist, übernimmt der Server, wenn du dort KI nutzen darfst – sonst sagt Flowplan, dass der Text zu lang ist, bzw. fasst nur den Anfang zusammen. Lehnt das Modell eine Anfrage nach Apples Sicherheitsregeln ab, geht sie nicht stattdessen an den Server.

**Ein- und ausschalten:**

- **Jede Person** unter **Einstellungen → KI → Auf diesem Gerät (Apple)**: **Wenn möglich (Standard)** – auf dem Gerät, wenn es kann, sonst auf dem Server; **Nur ohne KI auf dem Server** – das Gerät nur, wenn der Server keine KI anbietet; **Aus** – Flowplan fragt das Gerät nie. Dort steht auch, ob Apple Intelligence auf diesem Gerät **verfügbar**, **in den Einstellungen ausgeschaltet** oder **nicht unterstützt** ist. **KI-Funktionen verwenden** aus schaltet auch die KI auf dem Gerät ab.
- **Die Administration** unter **Administration → KI → KI auf dem Gerät (Apple)** für die ganze Instanz (oder mit `FLOWPLAN_AI_DEVICE=off`, [Konfiguration](/configuration-ai-push#ki)). Der Hauptschalter **KI einschalten** gilt für die KI über den Server; die KI auf dem Gerät hat ihren eigenen Schalter und ist standardmäßig erlaubt – auch ohne Anbieter.
- **Auf dem Mac** zusätzlich in der Desktop-App unter **Einstellungen … → Apple Intelligence (optional) → Apple Intelligence auf diesem Mac nutzen** – standardmäßig an, wo es verfügbar ist. Aus startet die App das Modell nie, und die Instanz erreicht es nicht. Dieser Schalter gilt nur für diesen Mac.
- **Für KI gesperrte Seiten und Bereiche** bleiben gesperrt, ebenso deine eigenen Regeln, die Schalter der einzelnen Funktionen, **Ausgewählte Personen** und **Auch Gäste**.

**Verschlüsselte Bereiche:** In [Ende-zu-Ende-verschlüsselten Bereichen](/encrypted-spaces) gibt es sonst keine KI, weil der Server den Text nicht kennt. Auf dem Gerät schon: Schreibassistent (KI-Knopf in der Werkzeugleiste) und Zusammenfassung arbeiten mit dem entschlüsselten Text auf dem Gerät – an den Server geht dabei nichts, auch nicht ersatzweise.

> [!TIP]
> Apples **Schreibtools** (Korrekturlesen, Umschreiben, Zusammenfassen im Textmenü) funktionieren in der App für iPhone und iPad ebenfalls direkt im Editor. Sie gehören zum System und laufen unabhängig von diesen Einstellungen.

## Für Admins

Unter **Administration → KI**:

1. **KI einschalten.**
2. **Anbieter der Instanz** wählen (oder **Kein Anbieter**, siehe unten), Adresse, Modell und – falls nötig – den **API-Schlüssel** eintragen. **Verbindung testen.**
3. **Wer KI nutzen darf:**
   - **Alle** oder **Ausgewählte Personen** – Letztere schaltest du unter **Administration → Benutzer** pro Person frei: die Person anklicken, dann **Weitere → KI-Funktionen**.
   - **Auch Gäste** – ausgeschaltet haben Gäste keine KI-Funktionen.
   - **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** – dann richtet jede Person in ihren Einstellungen einen eigenen Anbieter mit eigenem Schlüssel ein. Das geht auch ganz ohne Anbieter der Instanz: So nutzen Personen KI mit ihrem eigenen Konto bei einem Anbieter, ohne dass die Instanz dafür bezahlt.
4. **Funktionen:** jede einzeln erlauben oder verbieten. Optional die [Suche nach Bedeutung](/ask-ai#suche-nach-bedeutung-optional) einschalten.
5. **KI auf dem Gerät (Apple):** standardmäßig erlaubt, unabhängig vom Schalter in Schritt 1 ([KI auf dem Gerät](#ki-auf-dem-geraet-apple)). Ausschalten, wenn es auf der Instanz gar keine KI geben soll.
6. **Speichern.**

So lassen sich drei typische Varianten einrichten:

| Variante | Einstellung |
| --- | --- |
| Alle nutzen dieselbe KI | Anbieter der Instanz, **Alle** |
| Nur bestimmte Personen | Anbieter der Instanz, **Ausgewählte Personen**, unter Benutzer freischalten |
| Jede Person mit eigener Lösung | **Kein Anbieter** (oder zusätzlich einer), **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** |

Alle Einstellungen lassen sich auch über [Umgebungsvariablen](/configuration-ai-push#ki) vorbelegen, etwa für automatisierte Installationen. Sie gelten, bis jemand in der Administration speichert.

### Seiten und Bereiche für die KI sperren

Eigentümer eines Arbeitsbereichs oder eines Bereichs können eine **Seite** (unter **Teilen → Personen**) oder einen **Bereich** (in den Bereichseinstellungen) **für KI sperren**. Das gilt für alle Personen und für alles darunter – Unterseiten und Datenbankeinträge. Keine KI-Funktion liest dann diese Inhalte, auch wenn eine Person sie in ihren eigenen Regeln erlaubt hat.

Neue [Kontakte-Datenbanken](/contacts) sind von Anfang an für die KI gesperrt; wer die Seite verwaltet, kann sie öffnen.

## Für Nutzer

Unter **Einstellungen → KI**:

- **Verwendeter Anbieter:** welcher Anbieter für dich arbeitet und ob deine Texte den Server verlassen („Deine Texte werden auf diesem Server verarbeitet und verlassen ihn nicht.“ bei Ollama).
- **KI-Funktionen verwenden:** KI für dich ganz ausschalten – oder einzelne Funktionen.
- **Auf diesem Gerät (Apple):** ob Apple Intelligence hier verfügbar ist und ob Flowplan es nutzen soll – **Wenn möglich (Standard)**, **Nur ohne KI auf dem Server** oder **Aus** ([KI auf dem Gerät](#ki-auf-dem-geraet-apple)).
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

- **Verschlüsselt gespeichert:** API-Schlüssel – der Instanz und jeder Person – liegen nur verschlüsselt in der Datenbank (AES-256-GCM, an ihren Besitzer gebunden; ein kopierter Wert lässt sich an anderer Stelle nicht entschlüsseln). Der Schlüssel dafür kommt aus `FLOWPLAN_ENCRYPTION_KEY`, `FLOWPLAN_SECRETS_KEY` oder der Datei `secrets.key` im Datenordner ([Gespeicherte Geheimnisse](/configuration-storage#gespeicherte-geheimnisse)).
- **Nur schreibbar:** Ein gespeicherter Schlüssel wird nie wieder angezeigt – weder in der Oberfläche noch über die API, in Exporten, Sicherungen oder Protokollen. Sichtbar ist nur „gespeichert · endet auf …abcd“ mit **Ersetzen** und **Entfernen**.
- **An die Adresse gebunden:** Ändert sich Anbieter oder Adresse, wird der gespeicherte Schlüssel gelöscht. Ein Schlüssel geht also nie an einen anderen Server als den, für den er eingegeben wurde. Schlüssel stehen nur in Kopfzeilen, nie in Adressen; Weiterleitungen werden nicht befolgt.
- **Keine internen Adressen für eigene Anbieter:** Eigene Anbieter von Personen erreichen nur öffentliche `https`-Adressen – keine Adressen im internen Netz oder des Servers selbst.
- **Aus Umgebungsvariablen:** Ein Schlüssel aus `FLOWPLAN_AI_API_KEY` wird nie in der Datenbank gespeichert und nur für den Anbieter aus den Variablen verwendet.
- **Fehlermeldungen** von Anbietern werden von Schlüsseln bereinigt, bevor sie angezeigt oder protokolliert werden.
- **Kein Zugriff über API-Tokens und Demo:** API-Tokens können KI-Einstellungen weder lesen noch ändern und keine KI-Funktionen nutzen; in der Demo ist KI über den Server aus (KI auf dem Gerät gibt es dort mit den Standardeinstellungen).
- **Grenzen:** höchstens 30 Anfragen pro Minute, 300 pro Stunde (`FLOWPLAN_AI_REQUESTS_PER_HOUR`) und 3 gleichzeitig pro Person.
- **Sicherungen:** `secrets.key` ist nicht Teil der Instanzsicherung. Nach einer Wiederherstellung auf einem anderen Server ohne diese Datei zeigt Flowplan „gespeichert, aber nicht lesbar – bitte ersetzen“, und die Schlüssel werden neu eingegeben.

## Häufige Fragen

**Muss ich KI nutzen?** Nein. KI über den Server ist aus, bis die Administration sie einschaltet, und jede Person kann sie für sich ausschalten. Die KI auf Apple-Geräten ist erlaubt, weil der Text das Gerät nicht verlässt, und ebenso optional: **Einstellungen → KI → Auf diesem Gerät (Apple) → Aus**.

**Geht bei der KI auf dem Gerät etwas an den Server?** Nein. Der Text wird auf dem iPhone, iPad oder Mac verarbeitet; der Server erfährt nur, dass du die Einstellung gewählt hast.

**Geht es ganz ohne Cloud?** Ja, mit Ollama auf dem eigenen Server. Dann verlässt kein Text den Server.

**Trainiert der Anbieter mit meinen Daten?** Das regeln die Bedingungen des jeweiligen Anbieters. Flowplan schickt nur, was für eine Anfrage nötig ist, und nur Inhalte, die die KI lesen darf. Wer sicher gehen will, nutzt Ollama.

**Werden Gespräche gespeichert?** Flowplan speichert Anfragen und Antworten nicht dauerhaft; was in Seiten eingefügt wird, ist normaler Inhalt mit Versionsverlauf.

**Kann die KI selbst etwas ändern?** Nein. KI-Aktionen sind Vorschläge; erst wenn du sie auswählst und **Ausführen** drückst, werden sie mit deinen Rechten angelegt.

**Was ist mit dem MCP-Server?** Der [MCP-Server](/mcp) ist ein anderer Weg: Dort arbeitet ein externer Assistent wie Claude Desktop mit deinem Flowplan. Er ist unabhängig von den Einstellungen hier.
