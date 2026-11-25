---
keywords: SSO, OIDC, Keycloak, Authentik, Entra ID, Azure AD, Google, Okta, YunoHost, Authelia, Forward Auth, Reverse-Proxy, Remote-User
---

# Single Sign-on mit OIDC

Anmeldung über den eigenen Identitätsanbieter – Keycloak, Authentik, Entra ID, Google, Okta oder jeden OpenID-Connect-Dienst –, mit Gruppen für Admins und Arbeitsbereiche.

Optional. Mit gesetztem `OIDC_ISSUER` zeigt die Anmeldeseite **Mit SSO anmelden**; neue Personen entstehen beim ersten Anmelden. E-Mail-Konten und SSO-Konten können nebeneinander bestehen.

## Client beim Anbieter anlegen

Einen **vertraulichen Web-Client** registrieren – oder einen **öffentlichen Client**: Ist `OIDC_CLIENT_SECRET` leer, meldet sich Flowplan ohne Secret an und verlässt sich allein auf PKCE. Das passt zu Anbietern, die viele Instanzen mit einem Client bedienen. Anbieter, die ID-Tokens nur mit dem Client-Secret signieren (HS256), brauchen einen vertraulichen Client.

| Einstellung | Wert |
| --- | --- |
| Redirect-URI | `https://flowplan.example.com/api/auth/callback` |
| Flow | Authorization Code mit PKCE (S256) |
| Scopes | `openid profile email` und der Scope für Gruppen (oft `groups`) |
| Gruppen | müssen im signierten ID-Token oder in der UserInfo-Antwort stehen |

Die Redirect-URI ist immer `APP_URL` plus `/api/auth/callback`.

## Variablen

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
| `OIDC_ADMIN_GROUP` | Mitglieder dieser Gruppe sind Admins und sehen in den Einstellungen die **Instanz**. Der Name wird exakt verglichen. |
| `OIDC_ALLOWED_GROUP` | Wenn gesetzt, dürfen sich nur Mitglieder dieser Gruppe anmelden. |
| `OIDC_LINKED_SSO_ONLY` | `true`: Konten, die mit SSO verbunden sind, melden sich nur noch über SSO an (Standard aus). Anmelden mit Passwort oder Passkey wird mit einem Hinweis abgelehnt; Passkeys und die Authenticator-App bleiben zum Bestätigen wichtiger Schritte. Siehe [Bestehendes Konto mit SSO verbinden](#bestehendes-konto-mit-sso-verbinden). |
| `OIDC_NEW_ACCOUNTS` | `false`: Die SSO-Anmeldung legt keine neuen Konten an (Standard an) – nur bestehende, verbundene oder per SCIM bereitgestellte Konten melden sich an. Bei der ersten SSO-Anmeldung mit bekannter Adresse fehlt dann „Stattdessen ein eigenes Konto anlegen“. |
| `OIDC_PROMPT_CREATE` | `true`: **Registrieren** öffnet direkt die Registrierung des Anbieters (`prompt=create`). |
| `OIDC_PICTURE` | Profilbild aus dem Claim `picture` übernehmen (Standard an, `off` schaltet ab). Das Bild muss unter einer öffentlichen HTTPS-Adresse liegen; interne Adressen werden – auch über Weiterleitungen – nicht abgerufen. |
| `SESSION_HOURS` | Gültigkeit einer Browser-Sitzung in Stunden, solange „Angemeldet bleiben“ nicht genutzt wird; die Apps bleiben angemeldet (siehe [Angemeldet bleiben](/sessions)). |

## Gruppennamen bei verbreiteten Anbietern

- **Keycloak**: Mapper „Group Membership“ zum Client hinzufügen, Token Claim Name `groups`, „Full group path“ ausschalten – sonst heißt die Gruppe `/flowplan-admins`. Für Realm-Rollen stattdessen `OIDC_GROUPS_CLAIM=realm_access.roles`.
- **Authentik**: Der Scope `profile` liefert `groups` bereits mit den Gruppennamen – ein Scope `groups` ist nicht nötig. Der Issuer ist die Adresse des Providers mit Schrägstrich am Ende, z. B. `https://auth.example.org/application/o/flowplan/`. Ohne **Signaturschlüssel** (Signing Key) am Provider signiert Authentik das ID-Token mit dem Client-Secret (HS256); Flowplan akzeptiert das ab Version 0.8.3. Mit Signaturschlüssel (RS256) prüft Flowplan die Signatur zusätzlich gegen die veröffentlichten Schlüssel des Providers. Wird der OAuth2-Provider über die API angelegt, setze `grant_types` ausdrücklich auf `["authorization_code"]` (dazu `"refresh_token"`, wenn Tokens erneuert werden sollen): Ohne diese Angabe bekommt er in Authentik 2026.8 eine leere Liste, und jede Anmeldung scheitert mit `invalid_request` („The request is otherwise malformed“), ohne dass die Meldung auf die Ursache zeigt.
- **Zitadel**: Rollen stehen unter `urn:zitadel:iam:org:project:roles`; einen eigenen Claim per Action anlegen oder den Pfad eintragen.
- **Entra ID**: Gruppen-Claim im Token konfigurieren. Entra liefert standardmäßig Objekt-IDs; dann die ID der Admin-Gruppe als `OIDC_ADMIN_GROUP` eintragen.

## Admin-Gruppe prüfen {since=0.9.7}

Wer mit SSO angemeldet ist, wird Admin (und sieht in den Einstellungen die **Instanz**), wenn die Gruppe aus `OIDC_ADMIN_GROUP` unter den Gruppen steht, die der Anbieter im Claim aus `OIDC_GROUPS_CLAIM` schickt (Standard `groups`; auch ein Pfad wie `realm_access.roles`). Flowplan vergleicht die Namen **exakt**, auch Groß- und Kleinschreibung und Schrägstriche.

Ob das klappt, siehst du unter **Einstellungen → Instanz → Benutzer** im Seitenfenster der Person: **Gruppen vom Anbieter (letzte Anmeldung)** zeigt, welcher Claim gelesen wurde, welche Gruppen ankamen und ob die Admin-Gruppe dabei war ([Benutzer](/user-management#benutzer)). Typische Ursachen, wenn sie fehlt:

- **„fehlte in Token und Userinfo“:** Der Anbieter schickt den Claim nicht – meist fehlt der Gruppen-Mapper oder der Scope für Gruppen (`OIDC_SCOPES`), oder der Claim heißt anders als `OIDC_GROUPS_CLAIM`.
- **Keycloak mit „Full group path“:** Dann kommt die Gruppe als `/flowplan-admins` an, mit Schrägstrich vorn – das passt nicht zu `OIDC_ADMIN_GROUP=flowplan-admins`. Schalte im Mapper „Group Membership“ **Full group path** aus, oder trag den Namen genau so ein, wie er ankommt (`OIDC_ADMIN_GROUP=/flowplan-admins`; bei Untergruppen den ganzen Pfad, etwa `/firma/flowplan-admins`).
- **Entra ID:** Statt Namen kommen Objekt-IDs; dann die ID als `OIDC_ADMIN_GROUP` eintragen.

Die Anzeige erneuert sich bei jeder SSO-Anmeldung; nach einer Änderung am Anbieter oder an den Variablen meldet sich die Person also einmal neu an.

## Wenn die SSO-Anmeldung fehlschlägt

Das Server-Log nennt den Grund: eine Zeile `OIDC sign-in failed:` mit der Art des Fehlers, seinem Code und – wenn der Provider mit einem Fehler geantwortet hat – dessen `error` und `error_description` (nie Tokens oder Secrets). Häufige Ursachen:

- **Redirect-URI**: Der Provider muss genau `<APP_URL>/api/auth/callback` erlauben. `APP_URL` muss die Adresse im Browser sein – sonst lehnt der Provider die Weiterleitung ab oder das Anmelde-Cookie fehlt („Anmeldung abgelaufen“).
- **Issuer**: `OIDC_ISSUER` muss Zeichen für Zeichen dem `issuer` in der Discovery des Providers entsprechen, einschließlich Schrägstrich am Ende.
- **Client-Secret** falsch, oder ein Secret gesetzt für einen Client, den der Anbieter als öffentlich führt (bzw. keines für einen vertraulichen): Der Token-Endpunkt antwortet mit `invalid_client`.
- **`unexpected JWT "alg"`**: Der Provider signiert ID-Tokens mit einem anderen Verfahren, als er in seiner Discovery angibt.

## Bestehendes Konto mit SSO verbinden

Ein Konto kann sich auf mehreren Wegen anmelden: mit E-Mail und Passwort, über LDAP und über ein oder mehrere SSO-Konten (OIDC). Wer zuerst ein lokales Konto angelegt hat und später SSO bekommt, verbindet beides – statt ein zweites Profil zu bekommen.

**Aus den Einstellungen:** Unter **Einstellungen → Konto & Sicherheit → Anmeldemethoden** wählst du **SSO verbinden …**, bestätigst mit deinem Passwort, einem Code aus der Authenticator-App oder einem Passkey und meldest dich danach beim Anbieter an. Das SSO-Konto (Anbieter und Kennung) gehört ab dann zu deinem Konto; du meldest dich mit beidem an. Der Vorgang gilt nur für dein Konto und die Sitzung, in der du ihn gestartet hast, zehn Minuten lang.

- Gehört das SSO-Konto schon zu einem anderen Flowplan-Konto, wird nichts verbunden. Bitte dann die Administration, die beiden Konten [zusammenzuführen](/user-management#konten-zusammenfuehren).
- **Trennen** (Papierkorb neben dem SSO-Konto) geht nur, solange eine andere Anmeldemethode bleibt: ein Passwort, LDAP oder ein weiteres SSO-Konto.
- **Passwort entfernen …** gibt es, sobald ein SSO-Konto verbunden ist: Danach meldest du dich nur noch über SSO an. Passkeys und die Authenticator-App bleiben, um wichtige Schritte zu bestätigen. **Passwort festlegen …** gibt dem Konto jederzeit wieder ein Passwort.
- Verbinden, Trennen und das Passwort entfernen oder festlegen bestätigst du jedes Mal neu – mit dem Passwort, einem Code aus der App oder einem Passkey. Ein Konto ohne all das (nur SSO) bestätigt mit einer Anmeldung, die höchstens zehn Minuten zurückliegt.

**Bei der ersten SSO-Anmeldung:** Meldet sich ein SSO-Konto zum ersten Mal an, dessen E-Mail-Adresse der Anbieter **bestätigt** hat (`email_verified`), und gibt es genau ein Flowplan-Konto mit dieser Adresse, das sich mit Passwort, LDAP oder Passkey anmeldet, legt Flowplan kein neues Konto an. Stattdessen fragt eine Seite: „Es gibt schon ein Konto mit dieser E-Mail-Adresse – verbinden?“ Du bestätigst das bestehende Konto mit seinem Passwort (und dem Code aus der App, wenn sie eingeschaltet ist) oder seinem Passkey; danach sind beide verbunden und du bist angemeldet. **Stattdessen ein eigenes Konto anlegen** gibt es nur, wenn die Instanz neue SSO-Konten zulässt (siehe `OIDC_NEW_ACCOUNTS` unter [Konfiguration](/configuration#anmeldung)). Ohne Nachweis wird nie verbunden; falsche Passwörter und Codes zählen wie bei der normalen Anmeldung gegen die Sperre nach zu vielen Versuchen.

Gut zu wissen:

- Ein verbundenes Konto mit E-Mail und Passwort behält seinen Namen, sein Bild und sein Admin-Recht; SSO-Gruppenzuordnungen ändern seine Mitgliedschaften wie bisher nicht.
- Mit `OIDC_LINKED_SSO_ONLY=true` melden sich verbundene Konten nur noch über SSO an – mit Passwort oder Passkey kommt dann ein klarer Hinweis, „Mit SSO anmelden“ zu wählen. Passkeys und die App bleiben zum Bestätigen.
- Verbinden, Trennen, abgelehnte Verbindungen, das Entfernen des Passworts und Zusammenführungen stehen im Sicherheitsprotokoll (**Einstellungen → Instanz → Sicherheit**).
- LDAP-Konten bleiben über ihren DN verknüpft; sie können SSO genauso verbinden (Nachweis mit dem Verzeichnispasswort). Das LDAP-Konto selbst lässt sich nicht trennen.
- Beim Verbinden fragt Flowplan den Anbieter mit `prompt=login`, damit nicht versehentlich ein anderes, dort noch angemeldetes Konto verbunden wird.
- Mit `OIDC_ALLOWED_GROUP` lassen sich nur SSO-Konten dieser Gruppe verbinden – wie bei der Anmeldung.

## SSO-Gruppen Arbeitsbereichen zuordnen

Gruppen aus dem Identitätsanbieter (der Claim aus `OIDC_GROUPS_CLAIM`) können Mitgliedschaft und Gruppen in Arbeitsbereichen geben – so verwaltet ihr den Zugang zentral im Anbieter.

- **Admins** ordnen Gruppen zu – für jeden Arbeitsbereich zentral unter **Einstellungen → Instanz → Anmeldung & SSO → SSO-Gruppen zentral zuordnen** oder, wenn sie dort Eigentümer sind, unter **Einstellungen → Gruppen & Rechte → SSO-Gruppen**.
- **Eigentümer**, die keine Admins sind, sehen dort die Zuordnungen ihres Arbeitsbereichs, ändern sie aber nicht. Eine Zuordnung holt Personen der ganzen Instanz in einen Arbeitsbereich und zeigt dort ihre Adressen – das entscheidet die Administration.
- Eine Zuordnung gibt eine **Rolle** (Ansehen, Bearbeiten, Eigentümer), eine **Gruppe des Arbeitsbereichs** (für [Seitenrechte](/workspaces-and-permissions#gruppen)) oder beides.

Bei jeder SSO-Anmeldung gleicht Flowplan ab:

- Passende Personen kommen hinzu; bei mehreren passenden Gruppen gilt die höchste Rolle. Gäste bleiben höchstens bei „Bearbeiten“.
- Wer die SSO-Gruppe nicht mehr hat, verliert, was die Zuordnung gegeben hat.
- **Die Zuordnung hat immer Vorrang.** Passt eine Zuordnung auf eine Person, setzt Flowplan Rolle und Gruppen so, wie die Zuordnung sagt – auch wenn das Mitglied von Hand hinzugefügt oder geändert wurde. Ab dann wird die Mitgliedschaft über SSO verwaltet.
- Mitglieder und Gruppenmitgliedschaften, auf die keine Zuordnung passt und die nie aus SSO kamen, bleiben unberührt.
- Der letzte Eigentümer eines Arbeitsbereichs bleibt immer.
- Geänderte Zuordnungen gelten sofort für alle mit einer aktiven SSO-Sitzung, sonst bei der nächsten Anmeldung (mit „Angemeldet bleiben“ und gesetztem `SESSION_GROUPS_HOURS` spätestens danach).
- Konten mit E-Mail und Passwort sind nicht betroffen.

> **Hinweis: Änderungen von Hand bei aktivem SSO.** Ändert ein Eigentümer die Rolle oder eine Gruppe eines Mitglieds, das über eine SSO-Gruppe kommt (in der Mitgliederliste mit „über SSO-Gruppe …“ markiert), gilt die Änderung nur bis zur nächsten SSO-Anmeldung dieser Person oder bis zur nächsten Änderung der Zuordnungen. Danach setzt die Zuordnung Rolle und Gruppen wieder. Flowplan zeigt das direkt nach der Änderung an. Soll eine Rolle dauerhaft anders sein, ändert die Administration die Zuordnung – oder die Gruppen der Person im Identitätsanbieter.

In der Mitgliederliste und im Gruppendialog steht bei solchen Mitgliedern „über SSO-Gruppe „X““.

## Anmeldung über einen Reverse-Proxy (YunoHost, Authelia, Authentik) {since=0.9.8}

Meldet schon ein Portal vor Flowplan die Personen an – das SSO von YunoHost (SSOwat) oder Forward Auth mit Authelia oder Authentik –, übernimmt Flowplan diese Anmeldung: Der Proxy nennt die Person in einem Request-Header, und Flowplan meldet sie an. Aus, solange `AUTH_PROXY_USER_HEADER` leer ist.

> **Achtung:** Schalte das nur ein, wenn Flowplans Port **ausschließlich über den Proxy** erreichbar ist – wer ihn direkt erreicht, könnte den Header selbst setzen und sich als beliebige Person anmelden. Die Header zählen nur bei Verbindungen von `AUTH_PROXY_TRUSTED_PROXIES` (Standard `127.0.0.1,::1`): maßgeblich ist die Adresse der TCP-Verbindung, nie `X-Forwarded-For`. Binde den Port an `127.0.0.1` (Docker: `127.0.0.1:3000:3000`) oder an ein Netz, das nur der Proxy erreicht, und lass den Proxy solche Header vom Browser verwerfen. SSOwat macht das für alle Header, die mit `ynh_` beginnen; in nginx überschreibt `proxy_set_header` sie.

### So funktioniert es

- **Anmelden:** Eine Anfrage ohne Flowplan-Sitzung, die den Header von einem vertrauenswürdigen Proxy trägt, bekommt eine normale Sitzung – schon beim ersten Seitenaufruf.
- **Welches Konto:** das Konto, das sich schon einmal über den Proxy angemeldet hat (nach Benutzername, ohne Groß- und Kleinschreibung); sonst ein [LDAP-](/scim-and-ldap#anmeldung-mit-ldap) oder SCIM-Konto mit diesem Benutzernamen; sonst ein Verzeichnis- oder SSO-Konto mit derselben bestätigten E-Mail-Adresse; sonst ein neues Konto (außer mit `AUTH_PROXY_AUTO_CREATE=false`). Ein Konto mit E-Mail und Passwort übernimmt Flowplan nie – die Anmeldung wird abgelehnt, wie bei LDAP. Deaktivierte Konten werden abgelehnt.
- **Name und Adresse** kommen bei jeder Anmeldung vom Proxy (UTF-8, auch Umlaute und andere Schriften); der Proxy bürgt für die Adresse.
- **Wechseln oder Abmelden am Portal** beendet die Sitzung, die der Proxy gestartet hat. Sitzungen über Passwort, Passkey, OIDC oder die Apps hängen nicht an den Headern; API-Tokens, Freigabelinks und Webhooks funktionieren ohne Portal.
- **Abmelden in Flowplan** führt zu `AUTH_PROXY_LOGOUT_URL` – ohne sie meldet dich der nächste Seitenaufruf gleich wieder an.
- **Anmeldeseite:** `AUTH_PROXY_LOGIN_URL` ergänzt einen Knopf wie **Mit YunoHost anmelden** (Name aus `AUTH_PROXY_NAME`). `AUTH_PROXY_ONLY=true` blendet Passwort, Passkeys und Registrieren aus; `FLOWPLAN_LOCAL_LOGIN=false` schaltet die Anmeldung mit Passwort auch auf dem Server ab.
- **Admins und Gruppen:** Mit `AUTH_PROXY_GROUPS_HEADER` wirken `OIDC_ADMIN_GROUP` und die [SSO-Gruppen-Zuordnungen](#sso-gruppen-arbeitsbereichen-zuordnen) wie bei OIDC; ohne Gruppen (YunoHost) nennt `AUTH_PROXY_ADMIN_USERS` die Admins. Den zweiten Faktor fragt das Portal ab, wie bei SSO.

Unter **Einstellungen → Instanz → Anmeldung & SSO** siehst du die Einstellungen nur zum Lesen; vertraut Flowplan Proxys außerhalb dieses Rechners, warnen sie und **Einstellungen → Instanz → Sicherheit**.

### Variablen

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `AUTH_PROXY_USER_HEADER` | *leer* | Header mit dem Benutzernamen (`YNH_USER`, `Remote-User`). Leer: aus. |
| `AUTH_PROXY_EMAIL_HEADER` | *leer* | Header mit der E-Mail-Adresse. |
| `AUTH_PROXY_NAME_HEADER` | *leer* | Header mit dem vollen Namen; ohne ihn der Benutzername. |
| `AUTH_PROXY_GROUPS_HEADER` | *leer* | Header mit den Gruppen, getrennt durch `,` oder `\|`. |
| `AUTH_PROXY_TRUSTED_PROXIES` | `127.0.0.1,::1` | Adressen oder Netze (`172.18.0.0/16`), von denen die Header zählen. |
| `AUTH_PROXY_LOGIN_URL` | *leer* | Anmeldeseite des Portals; `{return}` ist die Rücksprungadresse, `{return_b64}` dieselbe als Base64. |
| `AUTH_PROXY_LOGOUT_URL` | *leer* | Abmeldeseite des Portals nach dem Abmelden (auch mit `{return}`). |
| `AUTH_PROXY_NAME` | `SSO` | Name des Portals auf dem Anmeldeknopf. |
| `AUTH_PROXY_ONLY` | `false` | `true`: Die Anmeldeseite zeigt nur das Portal. |
| `AUTH_PROXY_AUTO_CREATE` | `true` | `false`: Nur Personen mit Konto melden sich an. |
| `AUTH_PROXY_ADMIN_USERS` | *leer* | Benutzernamen (durch Kommas getrennt), die die Instanz administrieren. |
| `AUTH_PROXY_DEBUG` | `false` | `true`: eine Log-Zeile je Entscheidung, nur mit Benutzernamen. |

### Beispiel: YunoHost

Das YunoHost-Paket gibt der App die Berechtigung „Besucher“ mit eingeschaltetem Auth-Header: Portal-Nutzer bringen ihre Header mit, alle anderen erreichen Flowplan trotzdem (Apps mit Token, Freigabelinks, Webhooks). Flowplan hört auf `127.0.0.1`.

```dotenv
AUTH_PROXY_USER_HEADER=YNH_USER
AUTH_PROXY_EMAIL_HEADER=YNH_USER_EMAIL
AUTH_PROXY_NAME_HEADER=YNH_USER_FULLNAME
AUTH_PROXY_LOGIN_URL=https://example.org/yunohost/sso/?r={return_b64}
AUTH_PROXY_LOGOUT_URL=https://example.org/yunohost/sso/?action=logout
AUTH_PROXY_NAME=YunoHost
AUTH_PROXY_ADMIN_USERS=alice
```

### Beispiel: Authelia (nginx)

```nginx
auth_request /internal/authelia/authz;
auth_request_set $user $upstream_http_remote_user;
auth_request_set $email $upstream_http_remote_email;
auth_request_set $name $upstream_http_remote_name;
auth_request_set $groups $upstream_http_remote_groups;
proxy_set_header Remote-User $user;
proxy_set_header Remote-Email $email;
proxy_set_header Remote-Name $name;
proxy_set_header Remote-Groups $groups;
```

```dotenv
AUTH_PROXY_USER_HEADER=Remote-User
AUTH_PROXY_EMAIL_HEADER=Remote-Email
AUTH_PROXY_NAME_HEADER=Remote-Name
AUTH_PROXY_GROUPS_HEADER=Remote-Groups
AUTH_PROXY_LOGIN_URL=https://auth.example.org/?rd={return}
AUTH_PROXY_LOGOUT_URL=https://auth.example.org/logout
AUTH_PROXY_NAME=Authelia
```

**Authentik** (Forward Auth) schickt `X-authentik-username`, `X-authentik-email`, `X-authentik-name` und `X-authentik-groups`. Läuft Flowplan in Docker und der Proxy auf dem Host, kommt die Verbindung aus dem Docker-Netz (oft `172.17.0.1`): Trag genau diese Adresse ein. `AUTH_PROXY_DEBUG=true` schreibt ins Log, wenn ein Header von einem nicht vertrauenswürdigen Proxy kam.
