---
keywords: whisper, transcription, ai, openai, ollama, push, vapid, apns, push relay, variables
---

# Configuration: AI, voice notes and push

The environment variables for AI providers, transcribing voice notes with Whisper and push notifications up to running your own push relay.

## Voice notes (Whisper)

Voice notes in the editor are always stored as audio. With a Whisper service in your own network, Flowplan also turns them into text; the recording never leaves your server.

| Variable | Default | Meaning |
| --- | --- | --- |
| `WHISPER_URL` | *empty* | Address of an OpenAI-compatible Whisper server (`POST /v1/audio/transcriptions`), e.g. `http://whisper:8000`. Turns transcription on. |
| `WHISPER_MODEL` | `Systran/faster-whisper-small` | The model name as the service expects it. |
| `WHISPER_LANGUAGE` | `de` | Language of the recordings (e.g. `en`). |
| `WHISPER_API_KEY` | *empty* | Only if the service requires a key. |
| `WHISPER_MAX_MB` | `200` | Largest recording in MB. |
| `WHISPER_RESPONSE_FORMAT` | `verbose_json` | Response format of speech recognition; falls back to `json` once. |
| `WHISPER_DIARIZE` | *empty* | `on`: ask for speaker separation (`diarize=true`), only for services that support it. |

Example with [speaches](https://github.com/speaches-ai/speaches) (formerly faster-whisper-server) in the same Compose project:

```yaml
  whisper:
    image: ghcr.io/speaches-ai/speaches:latest-cpu
    volumes:
      - whisper-models:/home/ubuntu/.cache/huggingface/hub
    restart: unless-stopped
```

Then set `WHISPER_URL=http://whisper:8000` for Flowplan. Newer speaches versions do not download models by themselves; download it once, for example from the Flowplan container:

```sh
node -e "fetch('http://whisper:8000/v1/models/Systran/faster-whisper-small',{method:'POST'}).then(r=>console.log(r.status))"
```

`small` needs about 1 GB of memory and transcribes roughly in real time on a normal CPU; `base` is faster and less accurate, `medium` more accurate and considerably slower. Do not make the Whisper service publicly reachable – only Flowplan talks to it.

## AI

All optional; the values apply until an admin saves under **Administration → AI**. Details: [AI](/ai).

| Variable | Default | Meaning |
| --- | --- | --- |
| `FLOWPLAN_AI` | *off* | `on` switches AI on. |
| `FLOWPLAN_AI_PROVIDER` | *empty* | `ollama`, `openai` (OpenAI-compatible), `anthropic` or `gemini`. If only `OLLAMA_URL` is set, Ollama is used. |
| `OLLAMA_URL` | *empty* | Address of Ollama, e.g. `http://ollama:11434` with the Compose service. |
| `FLOWPLAN_AI_BASE_URL` | *per provider* | Address of the provider, e.g. `https://api.mistral.ai/v1` for an OpenAI-compatible service. |
| `FLOWPLAN_AI_MODEL` | *empty* | Model, e.g. `llama3.1` or `gpt-4o-mini`. |
| `FLOWPLAN_AI_EMBEDDING_MODEL` | *empty* | Model for semantic search, e.g. `nomic-embed-text` (Ollama). Without it: full-text search only. |
| `FLOWPLAN_AI_API_KEY` / `FLOWPLAN_AI_API_KEY_FILE` | *empty* | The provider's key. Never stored in the database and only used for the provider from the variables. |
| `FLOWPLAN_AI_ACCESS` | `everyone` | `selected`: only people who were enabled. |
| `FLOWPLAN_AI_GUESTS` | *off* | `on`: guests may use AI too. |
| `FLOWPLAN_AI_USER_PROVIDERS` | *off* | `on`: people may add their own provider and key. |
| `FLOWPLAN_AI_FEATURES` | *all* | Allowed features, comma-separated: `write`, `summarize`, `ask`, `database`, `actions`, `whiteboard`. |
| `FLOWPLAN_AI_DEVICE` | *on* | `off`: no [on-device AI](/ai#on-device-ai-apple) in the apps for iPhone, iPad and Mac. Independent of `FLOWPLAN_AI`. |
| `FLOWPLAN_AI_SEMANTIC_SEARCH` | *off* | `on`: [semantic search](/ask-ai#semantic-search-optional) with the embedding model. |
| `FLOWPLAN_AI_EMBED_PER_HOUR` | `5000` | Maximum chunks embedded per hour for semantic search. |
| `FLOWPLAN_AI_REQUESTS_PER_HOUR` | `300` | Maximum AI requests per person and hour (plus 30 per minute, 3 at once). |

## Push notifications

| Variable | Meaning |
| --- | --- |
| `WEB_PUSH_SUBJECT` | Contact for the push services, e.g. `mailto:admin@example.com`. |
| `WEB_PUSH_PUBLIC_KEY` / `WEB_PUSH_PRIVATE_KEY` | VAPID key pair. If not given, Flowplan creates one in `FLOWPLAN_DATA_DIR/web-push-keys.json`. Required in [cluster mode](/cluster#requirements). |
| `MOBILE_PUSH` | Notifications to the apps for iPhone, iPad and Android. Nothing to set up; `off` turns them off altogether. Default: `on`. |
| `PUSH_RELAY_URL` | The [push relay](#push-relay-and-end-to-end-encryption) notifications to the apps go through. An HTTPS origin only (`http` only for `localhost`), without a path. Default: `https://push.flowplan.org`. |
| `PUSH_RELAY` | `off`: no relay. Apps then only get notifications if they have an Expo token (older app versions), through Expo's push service. Default: `on`. |
| `MOBILE_PUSH_CONTENT` | Whether the notification's text comes along – and with it the buttons **Done** and **Tomorrow** on due tasks and **Reply** on comments ([Buttons on notifications](/mobile-widgets#buttons-on-notifications)); **Mark as read** is always there. *Empty* (default): only where it is end-to-end encrypted, i.e. through the relay; through Expo (older apps) only "something new in the inbox" as with Web Push, and Live Activities only with times, no titles. `on`: also through Expo and with titles in Live Activities – readable by Expo, Apple and Google. `off`: never, not even through the relay. |

The VAPID keys must not change, otherwise all browsers lose their subscription. Outgoing HTTPS to the push services of Apple, Google and Mozilla (Web Push) and to the push relay must be possible.

### Push relay and end-to-end encryption

Notifications to the apps go through the Flowplan push relay (`push.flowplan.org`). Only the relay holds the credentials for Apple (APNs) and Google (Firebase); your instance needs none of its own – self-hosted instances, too, reach the apps from the App Store and Google Play this way.

- **End-to-end encrypted:** every app installation creates a key pair (X25519) per instance and gives the instance only the public key. The instance encrypts every notification with it (HKDF-SHA256, AES-256-GCM, a fresh one-time key per notification); only the app on the device decrypts it. The relay, Apple and Google only see ciphertext – plus the kind of message, which buttons it has, the number on the app icon and when it was sent. If a notification cannot be decrypted, the app shows "New notification".
- **Signed:** the instance has a signing key pair of its own (Ed25519), created on first use. The private key is stored only encrypted in the database (like stored secrets, see above); the public key is published at `/.well-known/flowplan-push`. The relay only accepts signed requests, and only for devices that registered for exactly this instance. For this, `APP_URL` must be the public HTTPS address, and `/.well-known/flowplan-push` must be reachable from outside.
- **What is stored:** per app installation the relay token (only encrypted) and the public key. Both go with signing out, removing the device under *Signed-in devices*, or when the relay reports that the device can no longer be reached. Neither tokens nor keys nor content are logged.
- **Live Activities** (iPhone) for the timer and focus are also updated by the instance through the relay when their state changes. iOS renders their content itself – it cannot be encrypted. By default it therefore holds only times and the phase, no titles (`MOBILE_PUSH_CONTENT=on` sends the title along).
- **Older app versions** without the relay keep getting notifications through Expo's push service (`exp.host`), without text by default.
- **Rotating the signing key:** `node --import tsx scripts/push-relay-key.mjs rotate` in the repository, or as an administrator `POST /api/admin/operations` with `{"action":"pushRelay.rotate"}`. The new key is published at once and signs after a little more than an hour; the old one stays listed for 7 days (`--grace-days` or `graceDays`). For a key that may have leaked, `--immediate` or `"immediate": true`: the new one signs at once, all old ones are removed. `{"action":"pushRelay.keys"}` lists the keys (ids and dates only). Or under **Administration → Push notifications → Rotate key …**.
- **Your own relay:** only together with your own app build – see [Running your own push relay](#running-your-own-push-relay).
- **Checking it:** **Settings → Notifications → Send test notification** sends at once through the relay, Expo and Web Push to your own devices and shows the result per device – for example that the relay could not verify the instance (`/.well-known/flowplan-push` not reachable) or cannot be reached. Administrators also see the relay address, whether `/.well-known/flowplan-push` is enabled and the `APP_URL` in use. See [Test notification](/notifications#test-notification).
- **State in the administration:** **Administration → Push notifications** shows the relay in use (official or your own), whether it is on and otherwise why not, whether it is reachable right now (`/healthz`, with response time), whether the instance can fetch its own `/.well-known/flowplan-push` at `APP_URL`, the signing keys with **Rotate key …**, the deliveries of the last 24 hours per channel and the last error. See [Administration → Push notifications](/administration#push-notifications).

**For an instance's privacy policy**, for example: "Push notifications to the Flowplan apps are delivered end-to-end encrypted through Flowplan's push service (push.flowplan.org) and the services of Apple (APNs) or Google (Firebase Cloud Messaging). These services receive a device token, the address of this instance, the time and the kind of the notification, but not its content." – extend it accordingly with `MOBILE_PUSH_CONTENT=on` or notifications through Expo.

### Running your own push relay

The relay is open source ([github.com/yannicschuller/flowplan-push](https://github.com/yannicschuller/flowplan-push)) and can be self-hosted. **The official Flowplan apps (iPhone and iPad from the [App Store](https://apps.apple.com/app/id6825801344), Android from [flowplan.org/download](https://flowplan.org/download)) don't need it** – they only accept notifications through `push.flowplan.org`, because Apple and Google deliver to these apps only with Flowplan's keys. Your own relay makes sense if you build **your own app version** (own bundle ID, own Apple team) or want to reach instances in an internal network.

1. **Start the relay** – as the Docker image `ghcr.io/yannicschuller/flowplan-push:latest` (or built from the repository), e.g. in Coolify at `https://push.example.com`, port `8080`, a volume on `/data`. Environment variables:

   | Variable | Value |
   | --- | --- |
   | `RELAY_STORAGE_KEY` | `openssl rand -base64 32` – encrypts the stored device tokens |
   | `RELAY_PUBLIC_URL` | the relay's public address without a path, e.g. `https://push.example.com` (otherwise `https://push.flowplan.org` applies) |
   | `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY` | your Apple team's APNs key (`.p8`): key ID, team ID and the file's contents (base64 also works) |
   | `ALLOWED_BUNDLE_IDS` | your app's bundle ID, e.g. `com.example.notes` |
   | `FCM_SERVICE_ACCOUNT` | optional, your Firebase project's service-account JSON for Android |
   | `TRUST_PROXY` | `1` behind Coolify/Traefik |
   | `ALLOW_PRIVATE_INSTANCES` | `true` if instances in an internal network (private addresses, `http://localhost`) should send notifications – meant for development and closed networks only, as the relay's README says |

   `https://push.example.com/healthz` answers `{"status":"ok"}`; the start-up log says whether APNs and FCM are set up.
2. **Build the app** – with your bundle ID and Apple team, `PUSH_RELAY_URL=https://push.example.com` (the app's build variable) and, for Android, your `google-services.json`. The app only registers with the relay it was built for.
3. **Configure the instance** – `PUSH_RELAY_URL=https://push.example.com`. `APP_URL` must be the instance's HTTPS address and `/.well-known/flowplan-push` reachable for the relay. An instance can use one relay only: pointed at yours, it no longer reaches the store apps through the relay.
4. **Check** – with the [test notification](/notifications#test-notification).

Operations, key rotation, blocking abusive instances (`node dist/src/cli.js block <origin>` in the container) and backups are described in the relay's README.
