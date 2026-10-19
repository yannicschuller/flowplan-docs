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

## Für Admins

Unter **Administration → KI**:

1. **KI einschalten.**
2. **Anbieter der Instanz** wählen (oder **Kein Anbieter**, siehe unten), Adresse, Modell und – falls nötig – den **API-Schlüssel** eintragen. **Verbindung testen.**
3. **Wer KI nutzen darf:**
   - **Alle** oder **Ausgewählte Personen** – Letztere schaltest du unter **Administration → Benutzer** pro Person frei („Darf KI-Funktionen nutzen“).
   - **Auch Gäste** – ausgeschaltet haben Gäste keine KI-Funktionen.
   - **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** – dann richtet jede Person in ihren Einstellungen einen eigenen Anbieter mit eigenem Schlüssel ein. Das geht auch ganz ohne Anbieter der Instanz: So nutzen Personen KI mit ihrem eigenen Konto bei einem Anbieter, ohne dass die Instanz dafür bezahlt.
4. **Funktionen:** jede einzeln erlauben oder verbieten.
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
