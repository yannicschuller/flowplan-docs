---
keywords: Whisper, Transkription, KI, OpenAI, Ollama, Push, VAPID, APNs, Push-Relay, Variablen
---

# Konfiguration: KI, Sprachnotizen und Push

Die Umgebungsvariablen für KI-Anbieter, die Transkription von Sprachnotizen mit Whisper und Push-Benachrichtigungen bis zum eigenen Push-Relay.

## Sprachnotizen (Whisper)

Sprachnotizen im Editor werden immer als Audio gespeichert. Mit einem Whisper-Dienst im eigenen Netz macht Flowplan daraus zusätzlich Text; die Aufnahme verlässt dabei deinen Server nicht.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `WHISPER_URL` | *leer* | Adresse eines OpenAI-kompatiblen Whisper-Servers (`POST /v1/audio/transcriptions`), z. B. `http://whisper:8000`. Schaltet die Transkription ein. |
| `WHISPER_MODEL` | `Systran/faster-whisper-small` | Modellname, wie ihn der Dienst erwartet. |
| `WHISPER_LANGUAGE` | `de` | Sprache der Aufnahmen. |
| `WHISPER_API_KEY` | *leer* | Nur falls der Dienst einen Schlüssel verlangt. |
| `WHISPER_MAX_MB` | `200` | Größte Aufnahme in MB. |
| `WHISPER_RESPONSE_FORMAT` | `verbose_json` | Antwortformat der Spracherkennung; bei Fehler einmal `json`. |
| `WHISPER_DIARIZE` | *leer* | `on`: Sprechertrennung anfragen (`diarize=true`), nur bei Diensten, die es können. |
| `WHISPER_TIMEOUT_SECONDS` | *leer* | Wie lange eine Transkription dauern darf, in Sekunden. Ohne Angabe eine Minute pro MB Audio, mindestens 3 Minuten, höchstens 2 Stunden. Für langsame CPUs höher setzen. |
| `WHISPER_PROMPT` | *leer* | Vokabular für alle Arbeitsbereiche (Namen, Abkürzungen, durch Kommas getrennt), geht als `prompt` an Whisper – vor dem Glossar des Arbeitsbereichs, zusammen höchstens etwa 550 Zeichen. |
| `WHISPER_VAD` | *leer* | `on`: Stille vorher überspringen (`vad_filter=true`, faster-whisper/speaches) – weniger erfundene Zeilen. |
| `MEETING_LIVE_TRANSCRIPTION` | `on` | `off`: Besprechungen erst nach dem Beenden transkribieren statt schon während der Aufnahme. |

Beispiel mit [speaches](https://github.com/speaches-ai/speaches) (früher faster-whisper-server) im selben Compose-Projekt:

```yaml
  whisper:
    image: ghcr.io/speaches-ai/speaches:latest-cpu
    volumes:
      - whisper-models:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped
```

Bei Flowplan dann `WHISPER_URL=http://whisper:8000` setzen. Neuere speaches-Versionen laden Modelle nicht selbst; einmalig herunterladen, etwa aus dem Flowplan-Container:

```sh
node -e "fetch('http://whisper:8000/v1/models/Systran/faster-whisper-small',{method:'POST'}).then(r=>console.log(r.status))"
```

`small` braucht rund 1 GB Arbeitsspeicher und transkribiert auf einer normalen CPU etwa in Echtzeit; `base` ist schneller und ungenauer, `medium` genauer und deutlich langsamer. Den Whisper-Dienst nicht öffentlich erreichbar machen – nur Flowplan spricht mit ihm.

**whisper.cpp** als Whisper-Dienst (schnell auf Apple Silicon oder mit GPU): `whisper-server` mit dem OpenAI-Pfad, mit Umwandlung der Aufnahmen (braucht ffmpeg auf dem Rechner des Dienstes, für WebM) und mit Stilleerkennung starten:

```sh
whisper-server -m models/ggml-large-v3-turbo.bin --host 0.0.0.0 --port 8080 \
  --inference-path /v1/audio/transcriptions --convert \
  --vad -vm models/ggml-silero-v5.1.2.bin -mc 0 -ml 400 -sow
```

`--vad -vm …` überspringt Stille (das Silero-Modell lädt das Skript `models/download-vad-model.sh` von whisper.cpp herunter), `-mc 0` verhindert, dass sich Whisper an einer erfundenen Zeile festbeißt und sie wiederholt, `-ml 400 -sow` begrenzt die Länge der Segmente und trennt an Wortgrenzen – das gibt genauere Quellen-Chips. Bei Flowplan dann `WHISPER_URL=http://whisper:8080` setzen. Bei **faster-whisper/speaches** erreichst du dasselbe mit `WHISPER_VAD=on`.

Lange Aufnahmen: whisper.cpp mit large-v3-turbo brauchte auf einem M2 rund 380 Sekunden für 8,4 MB; auf einer CPU dauert es deutlich länger. Flowplan wartet eine Minute pro MB; reicht das nicht, `WHISPER_TIMEOUT_SECONDS` erhöhen. Bricht eine Transkription ab, sehen Admins im Besprechungsblock die Ursache.

## KI

Alles optional; die Werte gelten, bis ein Admin unter **Administration → KI** speichert. Details: [KI](/ai).

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_AI` | *aus* | `on` schaltet KI ein. |
| `FLOWPLAN_AI_PROVIDER` | *leer* | `ollama`, `openai` (OpenAI-kompatibel), `anthropic` oder `gemini`. Ist nur `OLLAMA_URL` gesetzt, gilt Ollama. |
| `OLLAMA_URL` | *leer* | Adresse von Ollama, z. B. `http://ollama:11434` mit dem Compose-Dienst. |
| `FLOWPLAN_AI_BASE_URL` | *je Anbieter* | Adresse des Anbieters, z. B. `https://api.mistral.ai/v1` für einen OpenAI-kompatiblen Dienst. |
| `FLOWPLAN_AI_MODEL` | *leer* | Modell, z. B. `llama3.1` oder `gpt-4o-mini`. |
| `FLOWPLAN_AI_EMBEDDING_MODEL` | *leer* | Modell für die Suche nach Bedeutung, z. B. `nomic-embed-text` (Ollama). Ohne: nur Volltextsuche. |
| `FLOWPLAN_AI_API_KEY` / `FLOWPLAN_AI_API_KEY_FILE` | *leer* | Schlüssel des Anbieters. Wird nie in der Datenbank gespeichert und nur für den Anbieter aus den Variablen verwendet. |
| `FLOWPLAN_AI_ACCESS` | `everyone` | `selected`: nur freigeschaltete Personen. |
| `FLOWPLAN_AI_GUESTS` | *aus* | `on`: auch Gäste dürfen KI nutzen. |
| `FLOWPLAN_AI_USER_PROVIDERS` | *aus* | `on`: Personen dürfen eigene Anbieter und Schlüssel hinterlegen. |
| `FLOWPLAN_AI_FEATURES` | *alle* | Erlaubte Funktionen, durch Komma getrennt: `write`, `summarize`, `ask`, `database`, `actions`, `whiteboard`. |
| `FLOWPLAN_AI_DEVICE` | *an* | `off`: keine [KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple) in den Apps für iPhone, iPad und Mac. Unabhängig von `FLOWPLAN_AI`. |
| `FLOWPLAN_AI_SEMANTIC_SEARCH` | *aus* | `on`: [Suche nach Bedeutung](/ask-ai#suche-nach-bedeutung-optional) mit dem Embedding-Modell. |
| `FLOWPLAN_AI_EMBED_PER_HOUR` | `5000` | Höchstzahl eingebetteter Abschnitte pro Stunde für die Suche nach Bedeutung. |
| `FLOWPLAN_AI_REQUESTS_PER_HOUR` | `300` | Höchstzahl an KI-Anfragen pro Person und Stunde (zusätzlich 30 pro Minute, 3 gleichzeitig). |

## Push-Benachrichtigungen

| Variable | Bedeutung |
| --- | --- |
| `WEB_PUSH_SUBJECT` | Kontakt für die Push-Dienste, z. B. `mailto:admin@example.com`. |
| `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` | VAPID-Schlüsselpaar. Ohne Angabe erzeugt Flowplan eines unter `FLOWPLAN_DATA_DIR/web-push-keys.json`. Im [Cluster-Modus](/cluster#voraussetzungen) Pflicht. |
| `MOBILE_PUSH` | Mitteilungen an die Apps für iPhone, iPad und Android. Nichts einzurichten; `off` schaltet sie ganz ab. Standard: `on`. |
| `PUSH_RELAY_URL` | Das [Push-Relay](#push-relay-und-ende-zu-ende-verschluesselung), über das Mitteilungen an die Apps gehen. Nur ein HTTPS-Origin (`http` nur für `localhost`), ohne Pfad. Standard: `https://push.flowplan.org`. |
| `PUSH_RELAY` | `off`: kein Relay. Apps bekommen Mitteilungen dann nur noch, wenn sie ein Expo-Token haben (ältere App-Versionen), über den Push-Dienst von Expo. Standard: `on`. |
| `MOBILE_PUSH_CONTENT` | Ob der Text der Benachrichtigung mitkommt – und damit die Knöpfe **Erledigt** und **Morgen** an fälligen Aufgaben und **Antworten** an Kommentaren ([Knöpfe an Mitteilungen](/mobile-widgets#knoepfe-an-mitteilungen)); **Als gelesen markieren** gibt es immer. *Leer* (Standard): nur, wo er Ende-zu-Ende-verschlüsselt ist, also über das Relay; über Expo (ältere Apps) wie bei Web-Push nur „Neues im Posteingang“, Live-Aktivitäten nur mit Zeiten, ohne Titel. `on`: auch über Expo und mit Titeln in Live-Aktivitäten – lesbar für Expo, Apple und Google. `off`: nie, auch nicht über das Relay. |

Die VAPID-Schlüssel dürfen sich nicht ändern, sonst verlieren alle Browser ihr Abonnement. Ausgehendes HTTPS zu den Push-Diensten von Apple, Google und Mozilla (Web-Push) und zum Push-Relay muss möglich sein.

### Push-Relay und Ende-zu-Ende-Verschlüsselung

Mitteilungen an die Apps gehen über das Flowplan-Push-Relay (`push.flowplan.org`). Nur das Relay hat die Zugangsdaten für Apple (APNs) und Google (Firebase); deine Instanz braucht keine eigenen – auch selbst gehostete Instanzen schicken so an die Apps aus dem App Store und Google Play.

- **Ende-zu-Ende-verschlüsselt:** Jede App-Installation erzeugt pro Instanz ein Schlüsselpaar (X25519) und gibt der Instanz nur den öffentlichen Schlüssel. Die Instanz verschlüsselt jede Mitteilung damit (HKDF-SHA256, AES-256-GCM, ein neuer Einmalschlüssel je Mitteilung); erst die App auf dem Gerät entschlüsselt sie. Relay, Apple und Google sehen nur Chiffretext – dazu die Art der Mitteilung, welche Knöpfe sie hat, die Zahl am App-Symbol und wann sie geschickt wurde. Lässt sich eine Mitteilung nicht entschlüsseln, zeigt die App „Neue Mitteilung“.
- **Signiert:** Die Instanz hat ein eigenes Signaturschlüsselpaar (Ed25519), das beim ersten Gebrauch entsteht. Der private Schlüssel liegt nur verschlüsselt in der Datenbank (wie gespeicherte Geheimnisse, siehe oben); den öffentlichen veröffentlicht die Instanz unter `/.well-known/flowplan-push`. Das Relay nimmt nur signierte Anfragen an und nur für Geräte, die sich für genau diese Instanz angemeldet haben. Dafür muss `APP_URL` die öffentliche HTTPS-Adresse sein, und `/.well-known/flowplan-push` muss von außen erreichbar sein.
- **Was gespeichert wird:** Pro App-Installation das Relay-Token (nur verschlüsselt) und der öffentliche Schlüssel. Beides verschwindet mit dem Abmelden, dem Entfernen unter *Angemeldete Geräte* oder wenn das Relay meldet, dass das Gerät nicht mehr erreichbar ist. Protokolliert werden weder Tokens noch Schlüssel noch Inhalte.
- **Live-Aktivitäten** (iPhone) für Zeiterfassung und Fokus aktualisiert die Instanz ebenfalls über das Relay, wenn sich der Zustand ändert. Ihren Inhalt zeichnet iOS selbst – er lässt sich nicht verschlüsseln. Deshalb enthält er standardmäßig nur Zeiten und die Phase, keine Titel (`MOBILE_PUSH_CONTENT=on` schickt den Titel mit).
- **Ältere App-Versionen** ohne Relay bekommen Mitteilungen weiter über den Push-Dienst von Expo (`exp.host`), standardmäßig ohne Text.
- **Signaturschlüssel wechseln:** `node --import tsx scripts/push-relay-key.mjs rotate` im Repository bzw. als Administrator `POST /api/admin/operations` mit `{"action":"pushRelay.rotate"}`. Der neue Schlüssel wird sofort veröffentlicht und signiert nach gut einer Stunde; der alte bleibt 7 Tage gelistet (`--grace-days` bzw. `graceDays`). Bei einem womöglich bekannt gewordenen Schlüssel `--immediate` bzw. `"immediate": true`: der neue signiert sofort, alle alten verschwinden. `{"action":"pushRelay.keys"}` listet die Schlüssel (nur IDs und Daten). Oder unter **Administration → Push-Benachrichtigungen → Schlüssel wechseln …**.
- **Eigenes Relay:** nur zusammen mit einer eigenen App-Version – siehe [Eigenes Push-Relay betreiben](#eigenes-push-relay-betreiben).
- **Prüfen:** **Einstellungen → Benachrichtigungen → Testbenachrichtigung senden** schickt sofort über Relay, Expo und Web-Push an die eigenen Geräte und zeigt je Gerät das Ergebnis – etwa dass das Relay die Instanz nicht verifizieren konnte (`/.well-known/flowplan-push` nicht erreichbar) oder nicht erreichbar ist. Administratoren sehen dazu Relay-Adresse, ob `/.well-known/flowplan-push` aktiv ist, und die verwendete `APP_URL`. Siehe [Testbenachrichtigung](/notifications#testbenachrichtigung).
- **Zustand in der Administration:** **Administration → Push-Benachrichtigungen** zeigt das verwendete Relay (offiziell oder eigenes), ob es an ist und sonst warum, ob es gerade erreichbar ist (`/healthz`, mit Antwortzeit), ob die Instanz ihr `/.well-known/flowplan-push` unter `APP_URL` selbst abrufen kann, die Signaturschlüssel mit **Schlüssel wechseln …**, die Zustellungen der letzten 24 Stunden je Kanal und den letzten Fehler. Siehe [Administration → Push-Benachrichtigungen](/administration#push-benachrichtigungen).

**Für die Datenschutzerklärung** einer Instanz etwa: „Push-Mitteilungen an die Flowplan-Apps werden Ende-zu-Ende-verschlüsselt über den Push-Dienst von Flowplan (push.flowplan.org) und die Dienste von Apple (APNs) bzw. Google (Firebase Cloud Messaging) zugestellt. Diese Dienste erhalten ein Geräte-Token, die Adresse dieser Instanz, den Zeitpunkt und die Art der Mitteilung, nicht aber ihren Inhalt.“ – mit `MOBILE_PUSH_CONTENT=on` oder Mitteilungen über Expo entsprechend ergänzen.

### Eigenes Push-Relay betreiben

Das Relay ist Open Source ([github.com/yannicschuller/flowplan-push](https://github.com/yannicschuller/flowplan-push)) und lässt sich selbst betreiben. **Für die offiziellen Flowplan-Apps (iPhone und iPad aus dem [App Store](https://apps.apple.com/app/id6825801344), Android von [flowplan.org/download](https://flowplan.org/download)) brauchst du das nicht** – sie nehmen nur Mitteilungen über `push.flowplan.org` an, denn Apple und Google stellen an diese Apps nur mit Flowplans Schlüsseln zu. Ein eigenes Relay ist sinnvoll, wenn du **eine eigene App-Version** baust (eigene Bundle-ID, eigenes Apple-Team) oder Instanzen im internen Netz erreichen willst.

1. **Relay starten** – als Docker-Image `ghcr.io/yannicschuller/flowplan-push:latest` (oder selbst aus dem Repository gebaut), z. B. in Coolify unter `https://push.example.com`, Port `8080`, ein Volume auf `/data`. Umgebungsvariablen:

   | Variable | Wert |
   | --- | --- |
   | `RELAY_STORAGE_KEY` | `openssl rand -base64 32` – verschlüsselt die gespeicherten Geräte-Tokens |
   | `RELAY_PUBLIC_URL` | die öffentliche Adresse des Relays ohne Pfad, z. B. `https://push.example.com` (sonst gilt `https://push.flowplan.org`) |
   | `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY` | APNs-Schlüssel (`.p8`) deines Apple-Teams: Key ID, Team ID und Inhalt der Datei (auch als Base64) |
   | `ALLOWED_BUNDLE_IDS` | die Bundle-ID deiner App, z. B. `com.example.notes` |
   | `FCM_SERVICE_ACCOUNT` | optional, Dienstkonto-JSON deines Firebase-Projekts für Android |
   | `TRUST_PROXY` | `1` hinter Coolify/Traefik |
   | `ALLOW_PRIVATE_INSTANCES` | `true`, wenn Instanzen im internen Netz (private Adressen, `http://localhost`) Mitteilungen schicken sollen – laut README des Relays nur für Entwicklung und geschlossene Netze gedacht |

   `https://push.example.com/healthz` antwortet mit `{"status":"ok"}`; im Log steht beim Start, ob APNs und FCM eingerichtet sind.
2. **App bauen** – mit deiner Bundle-ID und deinem Apple-Team sowie `PUSH_RELAY_URL=https://push.example.com` (Build-Variable der App) und für Android deiner `google-services.json`. Die App meldet sich nur bei dem Relay an, mit dem sie gebaut wurde.
3. **Instanz einstellen** – `PUSH_RELAY_URL=https://push.example.com`. `APP_URL` muss die HTTPS-Adresse der Instanz sein und `/.well-known/flowplan-push` für das Relay erreichbar. Eine Instanz kann nur ein Relay nutzen: Zeigt sie auf dein Relay, bekommen die Store-Apps von ihr keine Mitteilungen mehr über das Relay.
4. **Prüfen** – mit der [Testbenachrichtigung](/notifications#testbenachrichtigung).

Betrieb, Schlüsselwechsel, Sperren missbräuchlicher Instanzen (`node dist/src/cli.js block <origin>` im Container) und Sicherungen beschreibt die README des Relays.
