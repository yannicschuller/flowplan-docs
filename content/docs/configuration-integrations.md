---
keywords: SMTP, IMAP, Mailserver, GitHub, Google Kalender, Outlook, Telegram, Workflows, Variablen
---

# Konfiguration: E-Mail, Integrationen und Workflows

Die Umgebungsvariablen für Mailversand und E-Mail-Eingang, Integrationen wie GitHub und Kalender, Chat-Apps und Workflows.

## E-Mail (SMTP)

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `SMTP_HOST` | *leer* | Schaltet den E-Mail-Versand ein: Einladungen und Zusammenfassungen ungelesener Benachrichtigungen. |
| `SMTP_PORT` | `587` | Port. Bei `465` spricht Flowplan direkt TLS, sonst STARTTLS. |
| `SMTP_SECURE` | nach Port | `true`/`false` erzwingt TLS ab Verbindungsbeginn. |
| `SMTP_USER` / `SMTP_PASSWORD` | *leer* | Anmeldung am Mailserver. |
| `SMTP_FROM` | `Flowplan <SMTP_USER>` | Absender, z. B. `Flowplan <flowplan@example.com>`. |

Den Versand prüfst du unter **Administration → E-Mail → Test-E-Mail senden**.

## E-Mail-Eingang (IMAP)

Für den [E-Mail-Eingang](/inbound-email) per Webhook (Mailgun, Postmark, SendGrid, Cloudflare) ist nichts zu setzen. Ein eigenes Postfach fragt Flowplan alle zwei Minuten per IMAP ab:

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `INBOUND_MAIL_DOMAIN` | *leer* | Domain der Eingangsadressen, z. B. `mail.example.com`. Die Einstellungen zeigen dann je Adresse `inbox+<token>@mail.example.com`. |
| `INBOUND_IMAP_HOST` | *leer* | Schaltet die IMAP-Abfrage ein (zusammen mit `INBOUND_IMAP_USER`). |
| `INBOUND_IMAP_PORT` | `993` | Port (`143`, wenn `INBOUND_IMAP_TLS=false`). |
| `INBOUND_IMAP_USER` / `INBOUND_IMAP_PASSWORD` | *leer* | Anmeldung am Postfach. Der Teil vor `@` ist auch der Teil vor `+` in den Adressen. |
| `INBOUND_IMAP_FOLDER` | `INBOX` | Ordner, der abgefragt wird. |
| `INBOUND_IMAP_TLS` | `true` | `false` nur für einen Mailserver auf demselben Rechner oder im selben Netz (ohne Verschlüsselung). |
| `INBOUND_MAIL_AUTHSERV_ID` | *leer* | Kennung (authserv-id) des eigenen empfangenden Mailservers oder Anbieters, mit der sein `Authentication-Results`-Header beginnt, z. B. `mx.example.com`. Gilt auch für den Eingang per Webhook. |

Der Mailserver muss Plus-Adressierung unterstützen (`inbox+irgendwas@…` landet in `inbox@…`); das tun z. B. Dovecot, Postfix, Gmail/Google Workspace und Microsoft 365 (dort einschalten). Flowplan markiert verarbeitete E-Mails als gelesen und löscht nichts.

**Absenderprüfung:** Ob ein Absender als geprüft gilt (SPF/DKIM/DMARC zur From-Domain bestanden), liest Flowplan aus dem `Authentication-Results`-Header. Den kann auch der Absender selbst mitschicken – deshalb zählt nur der oberste Header mit der Kennung aus `INBOUND_MAIL_AUTHSERV_ID`. Ohne die Variable gilt kein Absender als geprüft: Workflows mit **Nur geprüfte Absender** starten dann nie, die Standardeinstellung (alle außer durchgefallenen) läuft weiter. Die Kennung steht am Anfang des Headers, den dein Server in empfangene E-Mails schreibt (`Authentication-Results: mx.example.com; spf=pass …`).

## Integrationen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | *leer* | `true` erlaubt Webhooks an interne Adressen und `http://` – etwa Home Assistant oder n8n im selben Netz. Ohne diese Variable sind nur öffentliche HTTPS-Adressen erlaubt. |
| `SPACE_GIT_EXPORT` | *leer* | `true` schaltet den [Git-Export der Bereiche](/markdown-git-export#git-export-eines-bereichs) ein: Bereichseigentümer übertragen ihren Bereich täglich oder wöchentlich in ein eigenes Repository. |
| `SPACE_GIT_ALLOWED_HOSTS` | *leer* | Erlaubte Git-Server dafür, durch Komma getrennt (z. B. `git.example.org`). Ohne die Variable ist jeder öffentliche `https://`-Server erlaubt; interne Adressen nie. |
| `SPACE_GIT_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `SPACE_GIT_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein Forgejo auf demselben Host, den der Container über `--add-host git.example.org:host-gateway` erreicht. Wirkt nur zusammen mit der Liste; alle anderen Server bleiben auf öffentliche Adressen beschränkt. |
| `ISSUE_SYNC_ALLOWED_HOSTS` | *leer* | Eigene Server für die [Synchronisierung von GitHub-, GitLab- und Forgejo-Issues](/git-and-issues#github-gitlab-und-forgejo-issues-synchronisieren), durch Komma getrennt (z. B. `gitlab.example.org`). github.com, gitlab.com und codeberg.org sind immer erlaubt; andere Server nur, wenn sie hier stehen. |
| `ISSUE_SYNC_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `ISSUE_SYNC_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein GitLab im selben Netz. Wirkt nur zusammen mit der Liste. |
| `NETBOX_ALLOW_PRIVATE` | *leer* | `true` erlaubt den [NetBox-Import auf Whiteboards](/whiteboard-racks#importieren-und-exportieren) auch interne Adressen und `http://` – etwa ein NetBox im selben Netz. Ohne diese Variable nur öffentliche HTTPS-Adressen. Adresse und Token werden nie auf dem Server gespeichert. |
| `PLUGIN_ALLOWED_ORIGINS` | *leer* | HTTPS-Ursprünge, von denen Eigentümer [Block-Erweiterungen](/plugins) registrieren dürfen, durch Komma getrennt (z. B. `https://plugins.example.org`). Ohne die Variable nur, wenn die Administration **Block-Erweiterungen von jeder HTTPS-Adresse** einschaltet. Die Ursprünge werden auch in die `frame-src` der Content Security Policy aufgenommen. |
| `GIPHY_API_KEY` / `TENOR_API_KEY` | *leer* | Schlüssel für die [GIF-Suche auf Whiteboards](/whiteboards#bilder-symbole-und-eintraege) bei GIPHY bzw. Tenor (ist beides gesetzt, gilt GIPHY). Ohne Schlüssel fehlt der Reiter **GIFs**. Gesucht wird über den Server; gewählte GIFs werden bis 8 MB auf dem Server gespeichert. |
| `EXPORT_GIT_*` | *leer* | Veraltet: der Git-Export der ganzen Instanz, siehe [In ein Git-Repository übertragen](/markdown-git-export#in-ein-git-repository-uebertragen). Läuft weiter; besser ist der Git-Export der Bereiche. |

## Kalender-Sync

Zwei-Wege-Synchronisierung von Datenbankansichten mit [Google Kalender und Microsoft Outlook / 365](/views#mit-google-kalender-oder-outlook-synchronisieren). Jede Person verbindet ihr eigenes Konto; ohne Client-ID bleibt der jeweilige Anbieter ausgeblendet. Flowplan fragt alle zehn Minuten nach Änderungen (Push-Benachrichtigungen der Anbieter werden nicht genutzt – sie bräuchten eine öffentlich erreichbare, beim Anbieter bestätigte HTTPS-Adresse).

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `GOOGLE_CALENDAR_CLIENT_ID` / `GOOGLE_CALENDAR_CLIENT_SECRET` | *leer* | OAuth-Client (Typ „Webanwendung“) aus der Google Cloud Console, mit aktivierter Google Calendar API und dem Bereich `…/auth/calendar`. Weiterleitungs-URI: `<APP_URL>/api/calendar-sync/callback/google`. |
| `MS_CALENDAR_CLIENT_ID` / `MS_CALENDAR_CLIENT_SECRET` | *leer* | App-Registrierung in Microsoft Entra ID (Web-Plattform) mit den delegierten Berechtigungen `Calendars.ReadWrite` und `offline_access`. Weiterleitungs-URI: `<APP_URL>/api/calendar-sync/callback/microsoft`. |
| `MS_CALENDAR_TENANT` | `common` | `common` (Geschäfts- und private Konten), `organizations` oder die ID eines Mandanten. |

Die Aktualisierungs-Tokens der Personen liegen versiegelt in der Datenbank (wie alle [gespeicherten Geheimnisse](/configuration-storage#gespeicherte-geheimnisse)).

## Chat-Apps

Benachrichtigungen an [Telegram, Gotify, ntfy und Matrix](/notifications#chat-apps). Alles lässt sich auch unter **Administration → Chat-Apps** einstellen; dort gespeicherte Werte haben Vorrang.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_MESSENGERS` | *alle* | Dienste, die Personen verbinden dürfen, durch Komma getrennt: `telegram`, `gotify`, `ntfy`, `matrix`; `off` für keinen. |
| `FLOWPLAN_TELEGRAM_BOT_TOKEN` | *leer* | Token des Telegram-Bots der Instanz (von @BotFather). Damit verbinden Personen Telegram über einen Link mit Einmal-Code, ohne eigenen Bot. |
| `FLOWPLAN_TELEGRAM_API_URL` | `https://api.telegram.org` | Adresse der Bot-API für den Bot der Instanz – ein selbst betriebener [Telegram-Bot-API-Server](https://github.com/tdlib/telegram-bot-api) oder ein Relay/Proxy. Darf im eigenen Netz liegen und `http://` sein. |
| `FLOWPLAN_MESSENGER_ALLOW_PRIVATE` | wie `FLOWPLAN_WEBHOOK_ALLOW_PRIVATE` | `true`: Personen dürfen Server im eigenen Netz angeben (interne Adressen, `http://`) – etwa Gotify oder ntfy im Heimnetz. Sonst sind interne Adressen gesperrt, auch wenn ein Name später auf eine umgestellt wird. |

**Bot der Instanz ohne öffentliche Adresse:** Flowplan nutzt keinen Webhook, sondern fragt die Nachrichten des Bots mit `getUpdates` ab – nur solange ein Verbindungscode wartet (höchstens 15 Minuten). Ausgehendes HTTPS zur Bot-API genügt. Der Bot darf deshalb nicht gleichzeitig einen Webhook haben oder von einem anderen Programm abgefragt werden (Telegram meldet dann einen Konflikt, die Administration zeigt ihn an) – nimm einen eigenen Bot nur für Flowplan.

**Ausgehende Verbindungen:** zu `api.telegram.org` (oder der eigenen API-Adresse), `ntfy.sh` und den Servern, die Personen angeben. Sie laufen über dieselbe Prüfung wie Link-Vorschauen und Webhooks: Adresse auflösen, interne Adressen abweisen, genau die geprüfte Adresse verwenden, keine Weiterleitungen. Abgewiesene Versuche erscheinen als Sicherheitsereignis „Interne Adresse abgewiesen (SSRF)“.

Die Tokens der Personen und des Bots speichert Flowplan verschlüsselt wie andere [gespeicherte Geheimnisse](/configuration-storage#gespeicherte-geheimnisse). Fehlt der Schlüssel nach einer Wiederherstellung, muss die Administration den Bot-Token neu eingeben; Verbindungen mit eigenem Token werden nach drei Fehlversuchen ausgeschaltet, und ihre Besitzer erfahren es im Posteingang.

## Workflows

Standards für [Workflows](/workflows); die [Administration](/administration#workflows) kann sie überschreiben.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `FLOWPLAN_WORKFLOWS` | `on` | Hauptschalter; `off`: keine neuen Workflow-Seiten, alle pausiert |
| `FLOWPLAN_WORKFLOW_RUNS_PER_MINUTE` | 60 | Läufe je Minute und Workflow |
| `FLOWPLAN_WORKFLOW_WORKSPACE_RUNS_PER_MINUTE` | 600 | Läufe je Minute und Arbeitsbereich |
| `FLOWPLAN_WORKFLOW_STEPS_PER_RUN` | 200 | Schritte je Lauf |
| `FLOWPLAN_WORKFLOW_CASCADE_DEPTH` | 5 | Tiefe gegenseitiger Auslösung |
| `FLOWPLAN_WORKFLOW_FOREACH_MAX` | 100 | Elemente je „Für jedes“ |
| `FLOWPLAN_WORKFLOW_AI_TOKENS_PER_DAY` | 100000 | KI-Tokens je Workflow und Tag (0 = KI-Knoten aus) |
| `FLOWPLAN_WORKFLOW_MAILS_PER_DAY` | 100 | E-Mails je Workflow und Tag |
| `FLOWPLAN_WORKFLOW_RUN_DAYS` | 30 | Aufbewahrung der Läufe in Tagen |
| `FLOWPLAN_WORKFLOW_MAX_WAIT_DAYS` | 365 | längstes Warten bzw. Freigabefrist |
| `FLOWPLAN_WORKFLOW_ACTIVE_PER_WORKSPACE` | 100 | aktive Workflows je Arbeitsbereich |
| `FLOWPLAN_WORKFLOW_WORKERS` | 4 | gleichzeitige Schritte je Instanz |
| `FLOWPLAN_WORKFLOW_HTTP` | `on` | HTTP-Knoten erlaubt |
| `FLOWPLAN_WORKFLOW_HTTP_HOSTS` | leer | nur diese Hosts (kommagetrennt) |
| `FLOWPLAN_WORKFLOW_HTTP_ALLOW_PRIVATE` | `false` | interne Adressen erlauben (Heimnetz, n8n) |
| `FLOWPLAN_WORKFLOW_EXTERNAL_MAIL` | `on` | E-Mails an Adressen außerhalb der Mitglieder |
| `FLOWPLAN_WORKFLOW_TEST_RUNS_PER_MINUTE` | 10 | Test- und Probeläufe je Person und Minute |
