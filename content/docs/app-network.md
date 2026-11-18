---
keywords: Apps, HTTP, HTTPS, eigenes Netz, LAN, Heimnetz, Zertifikat, selbstsigniert, eigene CA, Fingerabdruck
---

# Apps: eigenes Netz und Zertifikate

Die Apps für iPhone, iPad, Android und den Desktop verbinden sich auch mit einer Instanz im eigenen Netz ohne HTTPS oder mit eigenem Zertifikat. Wie die Apps sonst funktionieren, steht unter [Mobile Apps](/mobile-apps) und [Desktop-App](/desktop-app).

## Instanz im eigenen Netz ohne HTTPS

Beim ersten Start (oder unter **Profil hinzufügen**) gibst du die Adresse deiner Instanz ein. Ohne `http://` davor nimmt die App immer HTTPS an. Eine reine `http://`-Adresse nimmt sie nur an, wenn die Instanz **im lokalen Netz** läuft – öffentliche Domains und Adressen brauchen immer HTTPS.

| Funktioniert mit `http://` | iPhone und iPad | Android |
| --- | --- | --- |
| Private IP-Adressen: `192.168.x.x`, `10.x.x.x`, `172.16.x.x`–`172.31.x.x` | ja | ja |
| Tailscale- und CGNAT-Adressen `100.64.x.x`–`100.127.x.x`, Link-local `169.254.x.x` | ja | ja |
| IPv6 im lokalen Netz (`fd…`, `fe80…`), `localhost` | ja | ja |
| Namen ohne Punkt, z. B. `http://nas:3000` | ja | ja |
| `.local`-Namen, z. B. `http://flowplan.local:3000` | ja | ja |
| `.lan`, `.home.arpa`, `.internal`, z. B. `http://flowplan.lan` | **nein** | ja |
| Öffentliche Domains und IPs, auch Tailscale-Namen `*.ts.net` | nein (nur HTTPS) | nein (nur HTTPS) |

Auf iPhone und iPad erlaubt iOS unverschlüsselte Verbindungen nur zu IP-Adressen, Namen ohne Punkt und `.local`-Namen. Für eine Instanz unter `flowplan.lan` gibst du dort die IP-Adresse ein (`http://192.168.1.20:3000`) – oder richtest HTTPS ein. Die App sagt das beim Verbinden, statt eine leere Seite zu zeigen. Beim ersten Verbinden fragt iOS außerdem, ob Flowplan auf Geräte im lokalen Netz zugreifen darf: **Erlauben** tippen.

Sobald eine `http://`-Adresse im Feld steht, warnt die App vor dem Verbinden:

- **Passwörter und alle Inhalte gehen unverschlüsselt durchs Netz.** Das ist nur in einem Netz in Ordnung, dem du vertraust.
- **Ohne HTTPS fehlen** Passkeys, verschlüsselte Bereiche, Sprachnotizen in Seiten und auf Android die Offline-Kopie (auf iPhone und iPad hält die App die Offline-Kopie selbst, sie funktioniert auch so).
- **Mitteilungen** kommen von einer Instanz, die nur im lokalen Netz erreichbar ist, meist nicht an: Das [Push-Relay](/configuration-ai-push#push-relay-und-ende-zu-ende-verschluesselung) muss die Instanz aus dem Internet erreichen.

Für den echten Betrieb richte HTTPS ein, siehe [Ohne HTTPS](/installation#ohne-https). Mit einem Tailscale-Namen (`*.ts.net`) bekommst du HTTPS auch ohne öffentliche Domain.

## Eigene Zertifikate

Nutzt deine Instanz ein selbstsigniertes Zertifikat oder eine eigene Zertifizierungsstelle (CA), installierst du das CA-Zertifikat am besten auf dem Gerät:

- **iPhone/iPad:** Lade es (z. B. in Safari oder per AirDrop), installiere es unter **Einstellungen → Allgemein → VPN und Geräteverwaltung** und schalte unter **Einstellungen → Allgemein → Info → Zertifikatsvertrauenseinstellungen** das volle Vertrauen ein. iOS verlangt den Servernamen im Feld „Alternativer Name“ (subjectAltName) und höchstens 825 Tage Gültigkeit.
- **Android:** **Einstellungen → Sicherheit → Verschlüsselung und Anmeldedaten → Zertifikat installieren → CA-Zertifikat**. Die App vertraut Zertifizierungsstellen, die du selbst installiert hast.

Ohne installiertes Zertifikat zeigt die App beim Verbinden Aussteller, Gültigkeit und SHA-256-Fingerabdruck. Auf **Android** kannst du dann **Diesem Zertifikat vertrauen** wählen: Die App vertraut genau diesem Zertifikat, nur für diese Instanz. Ändert es sich, lädt die App nichts und fragt erneut; entfernen kannst du es in den App-Einstellungen. Die Offline-Kopie funktioniert auf Android nur mit installierter Zertifizierungsstelle, nicht mit einem so bestätigten Zertifikat. Auf **iPhone und iPad** erklärt die App, wie du das Zertifikat installierst. Ab App-Version 1.0.12.
