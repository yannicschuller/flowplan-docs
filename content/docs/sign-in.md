# Anmeldung: Passwort, Passkeys und OIDC

Flowplan meldet Personen mit E-Mail und Passwort an, auf Wunsch mit Passkeys. Zusätzlich – oder stattdessen – geht die Anmeldung über einen OpenID-Connect-Anbieter (Single Sign-on), dessen Gruppen bestimmen, wer die Instanz verwaltet.

## E-Mail und Passwort

Ohne weitere Einrichtung zeigt die Anmeldeseite ein Formular für E-Mail und Passwort.

- **Das erste Konto** einer neuen Instanz verwaltet sie: Die Anmeldeseite bietet dann direkt **Konto erstellen** an. Dieses Konto sieht die **Administration**.
- **Weitere Konten** entstehen, wenn die Administration unter **Instanz → Registrierung mit E-Mail und Passwort erlauben** die Registrierung öffnet – oder für Adressen mit einer [Einladung](/workspaces-and-permissions). Eingeladene Arbeitsbereiche erscheinen, sobald die Adresse per E-Mail-Link bestätigt ist.
- **E-Mail bestätigen:** Verschickt die Instanz E-Mails (`SMTP_*` gesetzt), meldet sich ein neues Konto erst an, nachdem die Adresse über den Link in der E-Mail bestätigt ist – der Link meldet direkt an. Wer es vorher versucht, bekommt einen Hinweis und den Link erneut (höchstens alle fünf Minuten); **Link erneut senden** geht auch nach der Registrierung. Ohne E-Mail-Versand gilt jedes Konto sofort als bestätigt, ebenso das erste Konto der Instanz. Admins können eine Adresse unter **Administration → Benutzer → Verwalten** von Hand bestätigen; ein Passwort-Zurücksetzen per Link bestätigt sie ebenfalls. Gibt es für die Adresse schon ein Konto, zeigt die Registrierung dasselbe wie bei einer neuen Adresse, und die Inhaberin bzw. der Inhaber bekommt stattdessen einen Hinweis per E-Mail – so verrät die Seite nicht, welche Adressen ein Konto haben.
- **Passwörter** haben mindestens 10 Zeichen und werden mit scrypt gespeichert. Nach 8 Fehlversuchen für eine Adresse (oder 30 von einer IP-Adresse) ist für 15 Minuten Pause.
- **Passwort vergessen**: Mit eingerichtetem [E-Mail-Versand](/configuration#e-mail-smtp) schickt die Anmeldeseite einen Link, der zwei Stunden gilt. Ohne E-Mail erzeugt die Administration unter **Benutzer → Link zum Zurücksetzen** einen Link zum Weitergeben. Nach dem Zurücksetzen sind alle bisherigen Sitzungen beendet.
- **Admin-Recht**: Unter **Benutzer** gibt die Administration es weiter (**Zum Admin machen**) oder entzieht es; eine Person muss die Instanz immer verwalten.
- Name und Passwort ändert jede Person unter **Einstellungen → Allgemein → Dein Profil**. Nach einer Passwortänderung sind alle anderen Sitzungen beendet; die aktuelle bleibt angemeldet.
- Registrierung und „Passwort vergessen“ sind pro Adresse bzw. Netzwerkadresse begrenzt (höchstens eine Reset-Mail alle fünf Minuten pro Konto).

`FLOWPLAN_LOCAL_LOGIN=false` schaltet E-Mail, Passwort und Passkeys ab – dann gibt es nur Single Sign-on.

## Passkeys

Mit einem Passkey meldest du dich per Fingerabdruck, Gesichtserkennung oder Geräte-PIN an, ohne Passwort. Angelegt werden Passkeys unter **Einstellungen → Allgemein → Dein Profil → Passkey hinzufügen**; danach genügt auf der Anmeldeseite **Mit Passkey anmelden**.

- Passkeys gibt es für Konten mit E-Mail und Passwort. SSO-Konten melden sich beim Anbieter an, der seinerseits Passkeys anbieten kann.
- Passkeys gehören zur Domain aus `APP_URL`. Sie brauchen HTTPS (oder `http://localhost` beim Entwickeln); eine reine IP-Adresse funktioniert nicht. Wer die Domain wechselt, legt die Passkeys neu an.
- Ein Passkey lässt sich in den Einstellungen jederzeit wieder entfernen.
- In der Desktop-App öffnen **Mit Passkey anmelden** und **Mit SSO anmelden** die Anmeldung im Standardbrowser und geben sie danach an die App zurück ([Desktop-Apps](/operations#desktop-apps)).

## Zwei-Faktor-Anmeldung

Konten mit E-Mail und Passwort können zusätzlich eine Authenticator-App nutzen, etwa Aegis, 2FAS, Google Authenticator oder 1Password.

1. **Einstellungen → Allgemein → Zwei-Faktor-Anmeldung → Authenticator-App einrichten.**
2. Den QR-Code mit der App scannen – oder den angezeigten Schlüssel abtippen.
3. Mit dem aktuellen sechsstelligen Code bestätigen.
4. Die zehn **Wiederherstellungscodes** sicher aufbewahren. Sie werden nur einmal angezeigt, jeder funktioniert genau einmal.

Bei der Anmeldung fragt Flowplan nach dem Passwort nach dem Code aus der App (oder einem Wiederherstellungscode).

- Ein Code gilt nur einmal; Codes aus dem vorigen und nächsten 30-Sekunden-Fenster werden angenommen, damit eine leicht falsch gehende Uhr nicht stört.
- Zu viele falsche Codes sperren für 15 Minuten.
- **Passkeys** zählen als zweiter Faktor: Wer sich mit einem Passkey anmeldet, braucht keinen Code.
- **SSO-Konten** regeln den zweiten Faktor beim Anbieter; **API-Tokens** sind nicht betroffen.
- **Ausschalten** und **neue Wiederherstellungscodes** verlangen das Passwort oder einen aktuellen Code.
- Auch nach **Passwort vergessen** bleibt der zweite Schritt bestehen.
- Telefon verloren und keine Codes mehr? Die Administration kann die Zwei-Faktor-Anmeldung zurücksetzen ([Administration → Benutzer](/administration#benutzer)).

Admins können die Zwei-Faktor-Anmeldung für alle lokalen Konten oder nur für Admins verlangen ([Administration → Instanz](/administration#instanz)). Konten ohne App und ohne Passkey richten dann direkt nach der Anmeldung einen zweiten Faktor ein, bevor sie Flowplan nutzen; Konten mit Passkey, aber ohne App melden sich mit dem Passkey an.

> [!IMPORTANT]
> Die Schlüssel der Apps werden verschlüsselt gespeichert – mit `FLOWPLAN_ENCRYPTION_KEY`, sonst `FLOWPLAN_SECRETS_KEY`, sonst mit der automatisch angelegten Datei `secrets.key` im Datenordner ([Konfiguration](/configuration#gespeicherte-geheimnisse)). Diese Datei oder den Schlüssel unbedingt mitsichern: Die Instanzsicherung enthält sie bewusst nicht. Ohne sie funktionieren nach einer Wiederherstellung nur noch die Wiederherstellungscodes.

## Single Sign-on mit OIDC

Optional. Mit gesetztem `OIDC_ISSUER` zeigt die Anmeldeseite **Mit SSO anmelden**; neue Personen entstehen beim ersten Anmelden. E-Mail-Konten und SSO-Konten können nebeneinander bestehen.

### Client beim Anbieter anlegen

Einen **vertraulichen Web-Client** registrieren:

| Einstellung | Wert |
| --- | --- |
| Redirect-URI | `https://flowplan.example.com/api/auth/callback` |
| Flow | Authorization Code mit PKCE (S256) |
| Scopes | `openid profile email` und der Scope für Gruppen (oft `groups`) |
| Gruppen | müssen im signierten ID-Token oder in der UserInfo-Antwort stehen |

Die Redirect-URI ist immer `APP_URL` plus `/api/auth/callback`.

### Variablen

```dotenv
APP_URL=https://flowplan.example.com
OIDC_ISSUER=https://id.example.com/realms/company
OIDC_CLIENT_ID=flowplan
OIDC_CLIENT_SECRET=geheim
OIDC_SCOPES=openid profile email groups
OIDC_GROUPS_CLAIM=groups
OIDC_ADMIN_GROUP=flowplan-admins
SESSION_HOURS=8
```

| Variable | Bedeutung |
| --- | --- |
| `OIDC_ISSUER` | Issuer-URL; Flowplan liest daraus die Discovery (`/.well-known/openid-configuration`). |
| `OIDC_GROUPS_CLAIM` | Claim mit den Gruppen, auch als Pfad wie `realm_access.roles`. |
| `OIDC_ADMIN_GROUP` | Mitglieder dieser Gruppe sehen die **Administration**. Der Name wird exakt verglichen. |
| `OIDC_ALLOWED_GROUP` | Wenn gesetzt, dürfen sich nur Mitglieder dieser Gruppe anmelden. |
| `OIDC_PROMPT_CREATE` | `true`: **Registrieren** öffnet direkt die Registrierung des Anbieters (`prompt=create`). |
| `OIDC_PICTURE` | Profilbild aus dem Claim `picture` übernehmen (Standard an, `off` schaltet ab). Das Bild muss unter einer öffentlichen HTTPS-Adresse liegen; interne Adressen werden – auch über Weiterleitungen – nicht abgerufen. |
| `SESSION_HOURS` | Gültigkeit einer Sitzung in Stunden. Gruppenänderungen wirken spätestens danach. |

### Gruppennamen bei verbreiteten Anbietern

- **Keycloak**: Mapper „Group Membership“ zum Client hinzufügen, Token Claim Name `groups`, „Full group path“ ausschalten – sonst heißt die Gruppe `/flowplan-admins`. Für Realm-Rollen stattdessen `OIDC_GROUPS_CLAIM=realm_access.roles`.
- **Authentik**: Der Scope `profile` liefert `groups` bereits mit den Gruppennamen.
- **Zitadel**: Rollen stehen unter `urn:zitadel:iam:org:project:roles`; einen eigenen Claim per Action anlegen oder den Pfad eintragen.
- **Entra ID**: Gruppen-Claim im Token konfigurieren. Entra liefert standardmäßig Objekt-IDs; dann die ID der Admin-Gruppe als `OIDC_ADMIN_GROUP` eintragen.

### SSO-Gruppen Arbeitsbereichen zuordnen

Gruppen aus dem Identitätsanbieter (der Claim aus `OIDC_GROUPS_CLAIM`) können Mitgliedschaft und Gruppen in Arbeitsbereichen geben – so verwaltet ihr den Zugang zentral im Anbieter.

- **Eigentümer** ordnen Gruppen unter **Einstellungen → Gruppen & Rechte → SSO-Gruppen** zu (der Abschnitt erscheint, wenn `OIDC_ISSUER` gesetzt ist).
- **Admins** ordnen sie für jeden Arbeitsbereich zentral unter **Administration → Arbeitsbereiche → SSO-Gruppen zentral zuordnen** zu.
- Eine Zuordnung gibt eine **Rolle** (Ansehen, Bearbeiten, Eigentümer), eine **Gruppe des Arbeitsbereichs** (für [Seitenrechte](/workspaces-and-permissions#gruppen)) oder beides.

Bei jeder SSO-Anmeldung gleicht Flowplan ab:

- Passende Personen kommen hinzu; bei mehreren passenden Gruppen gilt die höchste Rolle. Gäste bleiben höchstens bei „Bearbeiten“.
- Wer die SSO-Gruppe nicht mehr hat, verliert, was die Zuordnung gegeben hat.
- Von Hand hinzugefügte Mitglieder und Gruppenmitgliedschaften bleiben unberührt. Ändert ein Eigentümer die Rolle oder Gruppen eines über SSO verwalteten Mitglieds von Hand, wird die Mitgliedschaft ab dann von Hand verwaltet.
- Der letzte Eigentümer eines Arbeitsbereichs bleibt immer.
- Geänderte Zuordnungen gelten sofort für alle mit einer aktiven SSO-Sitzung, sonst bei der nächsten Anmeldung (mit „Angemeldet bleiben“ spätestens nach `SESSION_GROUPS_HOURS`).
- Konten mit E-Mail und Passwort sind nicht betroffen.

In der Mitgliederliste und im Gruppendialog steht bei solchen Mitgliedern „über SSO-Gruppe „X““.

## Angemeldet bleiben

Normalerweise endet eine Sitzung `SESSION_HOURS` nach der Anmeldung (Standard 8 Stunden). Mit `SESSION_REMEMBER=true` zeigt die Anmeldeseite **Auf diesem Gerät angemeldet bleiben** – für Passwort, Passkey und SSO. Mit Haken lebt die Sitzung weiter, solange Flowplan genutzt wird:

- Sie endet `SESSION_IDLE_HOURS` nach der letzten Nutzung (Standard 168 = 7 Tage) und spätestens `SESSION_MAX_DAYS` nach der Anmeldung (Standard 30). Danach heißt es neu anmelden – das begrenzt, wie lange ein gestohlenes Cookie taugt.
- Mit SSO zusätzlich spätestens nach `SESSION_GROUPS_HOURS` (Standard 168): Die neue Anmeldung beim Anbieter holt die aktuellen Gruppen, so wirken `OIDC_ALLOWED_GROUP` und `OIDC_ADMIN_GROUP` auch bei langen Sitzungen.
- Ein deaktiviertes Konto verliert den Zugriff sofort, wie bisher.
- Die Desktop- und Handy-Apps bleiben angemeldet, sobald die Option eingeschaltet ist.

Ohne `SESSION_REMEMBER` ändert sich nichts. Wer die Option nachträglich ausschaltet, beendet das Verlängern; laufende Sitzungen enden dann zu ihrem nächsten Ablauf.

**Einstellungen → Konto → Angemeldete Geräte** listet alle eigenen Sitzungen mit Gerät, letzter Nutzung und Ende; **Abmelden** beendet eine einzelne, **Alle anderen Geräte abmelden** alle bis auf die aktuelle.

## Sicherheit

Bei OIDC prüft Flowplan Discovery, Issuer, Audience, Signatur, PKCE, State und Nonce. Sitzungen sind zufällige Tokens, gehasht in SQLite gespeichert; Cookies sind `HttpOnly`, `SameSite=Lax` und bei HTTPS `Secure`. Gruppen oder Rollen werden nie aus Browserdaten übernommen.

- Ein in der Administration **deaktiviertes Konto** verliert sofort alle Sitzungen; offene Live-Verbindungen werden spätestens nach 15 Sekunden geschlossen, ebenso wenn Leserechte entzogen werden.
- Jede Seite trägt eine **Content-Security-Policy**: Skripte laufen nur mit einer pro Anfrage neuen Nonce, Frames nur von den unterstützten Playern (YouTube, Vimeo, Loom, Spotify, Figma, CodePen). HSTS setzt der Reverse Proxy (bei Traefik/Coolify in der Regel aktiv).
- Sitzungen lassen sich in der Administration gezielt widerrufen.
- Einladungen an eine E-Mail-Adresse werden erst nach einer Anmeldung mit `email_verified=true` zugeordnet.

## Häufige Fehler

| Symptom | Ursache |
| --- | --- |
| Fehler zur Redirect-URI | Beim Anbieter eingetragene URI passt nicht exakt zu `APP_URL` + `/api/auth/callback`. |
| Keine Administration sichtbar | Gruppe fehlt im Token: Scope, `OIDC_GROUPS_CLAIM` und exakten Gruppennamen prüfen, danach neu anmelden. |
| „Ungültiger Anfrageursprung“ | `APP_URL` weicht von der aufgerufenen Adresse ab (z. B. `http` statt `https`). |
| Anmeldung abgelehnt | `OIDC_ALLOWED_GROUP` gesetzt und die Person ist nicht Mitglied. |
| „Konto erstellen“ fehlt | Die Registrierung ist geschlossen: in der Administration öffnen oder die Person einladen. |
| Passkey lässt sich nicht anlegen | `APP_URL` ist keine HTTPS-Domain (IP-Adresse oder `http://` außer `localhost`). |
