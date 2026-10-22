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
- Name und Passwort ändert jede Person unter **Einstellungen → Konto & Sicherheit** (Karte **Profil** bzw. **Passwort ändern …** in **Anmeldung & Sicherheit**). Der Name wird gespeichert, sobald du das Feld verlässt. Nach einer Passwortänderung sind alle anderen Sitzungen beendet; die aktuelle bleibt angemeldet.
- Registrierung und „Passwort vergessen“ sind pro Adresse bzw. Netzwerkadresse begrenzt (höchstens eine Reset-Mail alle fünf Minuten pro Konto).

`FLOWPLAN_LOCAL_LOGIN=false` schaltet E-Mail, Passwort und Passkeys ab – dann gibt es nur Single Sign-on.

## Passkeys

Mit einem Passkey meldest du dich per Fingerabdruck, Gesichtserkennung oder Geräte-PIN an, ohne Passwort. Angelegt werden Passkeys unter **Einstellungen → Konto & Sicherheit → Passkey hinzufügen**; danach genügt auf der Anmeldeseite **Mit Passkey anmelden**.

Unter **Einstellungen → Konto & Sicherheit** stehen in der Karte **Anmeldung & Sicherheit** Passwort, Zwei-Faktor-Anmeldung, Passkeys und die angemeldeten Geräte untereinander, jeweils mit ihrem Zustand („Aus“, „An · 8 Codes übrig“, „2 Passkeys“). **Konto löschen** steht ganz unten in der **Gefahrenzone**. Direkt öffnen lassen sich die Karten mit Adressen wie `/#settings/account/passkeys` oder `/#settings/account/two-factor`.

- Passkeys gibt es für Konten mit E-Mail und Passwort. SSO-Konten melden sich beim Anbieter an, der seinerseits Passkeys anbieten kann.
- Passkeys gehören zur Domain aus `APP_URL`. Sie brauchen HTTPS (oder `http://localhost` beim Entwickeln); eine reine IP-Adresse funktioniert nicht. Wer die Domain wechselt, legt die Passkeys neu an.
- Ein Passkey lässt sich in den Einstellungen jederzeit wieder entfernen.
- In der Desktop-App öffnen **Mit Passkey anmelden** und **Mit SSO anmelden** die Anmeldung im Standardbrowser und geben sie danach an die App zurück ([Desktop-Apps](/operations#desktop-apps)).

## Zwei-Faktor-Anmeldung

Konten mit E-Mail und Passwort können zusätzlich eine Authenticator-App nutzen, etwa Aegis, 2FAS, Google Authenticator oder 1Password.

1. **Einstellungen → Konto & Sicherheit → Zwei-Faktor-Anmeldung → Authenticator-App einrichten.**
2. Den QR-Code mit der App scannen – oder den angezeigten Schlüssel abtippen.
3. Mit dem aktuellen sechsstelligen Code bestätigen.
4. Die zehn **Wiederherstellungscodes** sicher aufbewahren. Sie werden nur einmal angezeigt, jeder funktioniert genau einmal.

Bei der Anmeldung fragt Flowplan nach dem Passwort nach dem Code aus der App (oder einem Wiederherstellungscode).

- Ein Code gilt nur einmal; Codes aus dem vorigen und nächsten 30-Sekunden-Fenster werden angenommen, damit eine leicht falsch gehende Uhr nicht stört.
- Zu viele falsche Codes sperren für 15 Minuten.
- **Passkeys** reichen allein: Wer sich mit einem Passkey anmeldet, braucht keinen Code – auch wenn die App eingeschaltet ist. Wer zusätzlich einen Code möchte, schaltet unter **Einstellungen → Konto & Sicherheit → Zwei-Faktor-Anmeldung → Verwalten** die Option **Auch nach dem Passkey einen Code verlangen** ein. Ausschalten verlangt das Passwort oder einen aktuellen Code.
- **SSO-Konten** regeln den zweiten Faktor beim Anbieter; **API-Tokens** sind nicht betroffen.
- **Ausschalten** und **neue Wiederherstellungscodes** verlangen das Passwort oder einen aktuellen Code.
- Auch nach **Passwort vergessen** bleibt der zweite Schritt bestehen.
- Telefon verloren und keine Codes mehr? Die Administration kann die Zwei-Faktor-Anmeldung zurücksetzen ([Administration → Benutzer](/administration#benutzer)).

Admins können die Zwei-Faktor-Anmeldung für alle lokalen Konten oder nur für Admins verlangen ([Administration → Anmeldung & SSO](/administration#anmeldung-sso)). Konten ohne App und ohne Passkey richten dann direkt nach der Anmeldung einen zweiten Faktor ein, bevor sie Flowplan nutzen; Konten mit Passkey, aber ohne App melden sich mit dem Passkey an.

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

- **Admins** ordnen Gruppen zu – für jeden Arbeitsbereich zentral unter **Administration → Anmeldung & SSO → SSO-Gruppen zentral zuordnen** oder, wenn sie dort Eigentümer sind, unter **Einstellungen → Gruppen & Rechte → SSO-Gruppen**.
- **Eigentümer**, die keine Admins sind, sehen dort die Zuordnungen ihres Arbeitsbereichs, ändern sie aber nicht. Eine Zuordnung holt Personen der ganzen Instanz in einen Arbeitsbereich und zeigt dort ihre Adressen – das entscheidet die Administration.
- Eine Zuordnung gibt eine **Rolle** (Ansehen, Bearbeiten, Eigentümer), eine **Gruppe des Arbeitsbereichs** (für [Seitenrechte](/workspaces-and-permissions#gruppen)) oder beides.

Bei jeder SSO-Anmeldung gleicht Flowplan ab:

- Passende Personen kommen hinzu; bei mehreren passenden Gruppen gilt die höchste Rolle. Gäste bleiben höchstens bei „Bearbeiten“.
- Wer die SSO-Gruppe nicht mehr hat, verliert, was die Zuordnung gegeben hat.
- **Die Zuordnung hat immer Vorrang.** Passt eine Zuordnung auf eine Person, setzt Flowplan Rolle und Gruppen so, wie die Zuordnung sagt – auch wenn das Mitglied von Hand hinzugefügt oder geändert wurde. Ab dann wird die Mitgliedschaft über SSO verwaltet.
- Mitglieder und Gruppenmitgliedschaften, auf die keine Zuordnung passt und die nie aus SSO kamen, bleiben unberührt.
- Der letzte Eigentümer eines Arbeitsbereichs bleibt immer.
- Geänderte Zuordnungen gelten sofort für alle mit einer aktiven SSO-Sitzung, sonst bei der nächsten Anmeldung (mit „Angemeldet bleiben“ spätestens nach `SESSION_GROUPS_HOURS`).
- Konten mit E-Mail und Passwort sind nicht betroffen.

> **Hinweis: Änderungen von Hand bei aktivem SSO.** Ändert ein Eigentümer die Rolle oder eine Gruppe eines Mitglieds, das über eine SSO-Gruppe kommt (in der Mitgliederliste mit „über SSO-Gruppe …“ markiert), gilt die Änderung nur bis zur nächsten SSO-Anmeldung dieser Person oder bis zur nächsten Änderung der Zuordnungen. Danach setzt die Zuordnung Rolle und Gruppen wieder. Flowplan zeigt das direkt nach der Änderung an. Soll eine Rolle dauerhaft anders sein, ändert die Administration die Zuordnung – oder die Gruppen der Person im Identitätsanbieter.

In der Mitgliederliste und im Gruppendialog steht bei solchen Mitgliedern „über SSO-Gruppe „X““.

## Benutzer bereitstellen mit SCIM

Mit SCIM 2.0 legt der Identitätsanbieter Konten in Flowplan an, hält Name und Adresse aktuell und deaktiviert Konten, sobald jemand das Unternehmen verlässt – ohne dass sich die Person vorher anmelden muss. Flowplan spricht SCIM 2.0 nach RFC 7643/7644 (Benutzer und Gruppen, Filter, PATCH).

**Einrichten**

1. **Administration → Anmeldung & SSO → SCIM-Token**: **Token erstellen**. Der Token beginnt mit `fpscim_` und wird nur einmal angezeigt; gespeichert ist nur sein Hash. Widerrufen geht jederzeit.
2. Beim Anbieter die **SCIM-Basis-URL** `<APP_URL>/api/scim/v2` und den Token als **Bearer-Token** eintragen.
3. Im Anbieter Personen und Gruppen der App zuweisen bzw. „Push Groups“ einschalten.

**Was Flowplan daraus macht**

- **Konten**: Ein neues SCIM-Konto ist ein SSO-Konto. Gibt es schon ein Konto mit derselben E-Mail-Adresse, wird es verknüpft statt verdoppelt. Bei der ersten OIDC-Anmeldung übernimmt die Person das vorbereitete Konto – über die `externalId` (= `sub` des Anbieters) oder eine bestätigte E-Mail-Adresse.
- **Deaktivieren**: `active: false` deaktiviert das Konto wie in der Administration – alle Sitzungen enden sofort, API-Tokens hören auf zu funktionieren. `active: true` aktiviert es wieder. **Löschen** (DELETE) deaktiviert und trennt die Verknüpfung; Inhalte und das Konto selbst bleiben, endgültig löscht weiterhin die Administration. Das letzte Admin-Konto mit Passwort lässt sich über SCIM nicht deaktivieren.
- **Gruppen**: SCIM-Gruppen legen keine Gruppen in Flowplan an. Ihr **Anzeigename** zählt wie eine SSO-Gruppe aus dem Token: Die [SSO-Zuordnungen](#sso-gruppen-arbeitsbereichen-zuordnen) geben Rolle und Arbeitsbereichsgruppen, und alle Regeln von dort gelten (die Zuordnung hat Vorrang, der letzte Eigentümer bleibt). Änderungen an Mitgliedschaften wirken sofort, nicht erst bei der nächsten Anmeldung. OIDC-Gruppen und SCIM-Gruppen einer Person werden zusammengezählt.
- Konten mit E-Mail und Passwort können verknüpft und deaktiviert werden; Zuordnungen ändern ihre Mitgliedschaften aber nicht.
- Die **letzten SCIM-Anfragen** mit Status stehen in der Administration – hilfreich, wenn der Anbieter Fehler meldet.

Nicht unterstützt: Bulk, Sortierung, `/Me` und Passwortänderungen (Flowplan speichert für SCIM-Konten kein Passwort).

### SCIM bei verbreiteten Anbietern

- **Okta**: App-Integration (SAML oder OIDC) → **Provisioning** → „SCIM connector base URL“ = `<APP_URL>/api/scim/v2`, „Unique identifier field for users“ = `userName`, Authentication Mode **HTTP Header** mit dem Token. Unter „To App“ *Create Users*, *Update User Attributes* und *Deactivate Users* einschalten; Gruppen unter **Push Groups** hinzufügen.
- **Microsoft Entra ID**: Unternehmensanwendung → **Bereitstellung** → Modus *Automatisch*, „Mandanten-URL“ = `<APP_URL>/api/scim/v2`, „Geheimes Token“ = der Token, **Verbindung testen**. In den Attributzuordnungen `userPrincipalName` → `userName` und `objectId` → `externalId` belassen; Bereich auf „Nur zugewiesene Benutzer und Gruppen“. Entra arbeitet in Zyklen von etwa 40 Minuten.
- **Authentik**: **Anwendungen → Provider → SCIM-Provider anlegen**, URL `<APP_URL>/api/scim/v2`, Token eintragen; den Provider als **Backchannel-Provider** an die Flowplan-Anwendung hängen. Gruppen werden mit ihrem Namen übertragen.
- **Keycloak**: Keycloak bringt kein SCIM-Client mit; dafür eine SCIM-Erweiterung (z. B. „keycloak-scim“) installieren oder LDAP bzw. OIDC-Gruppen nutzen.

## Anmeldung mit LDAP

Ist `LDAP_URL` gesetzt, prüft das Passwortfeld der Anmeldeseite Namen gegen ein LDAP-Verzeichnis (OpenLDAP, 389 DS, Active Directory, …). Das Feld heißt dann **E-Mail-Adresse oder Benutzername**.

- **Konten mit E-Mail und Passwort** melden sich weiter mit ihrem Flowplan-Passwort an. Alle anderen Namen sucht Flowplan mit dem Suchkonto (`LDAP_BIND_DN`) und `LDAP_USER_FILTER` unter `LDAP_BASE_DN` und prüft das Passwort mit einem Bind als diese Person. Leere Passwörter werden nie gesendet; der Name wird nach RFC 4515 maskiert, `*` oder `)` im Namen ändern den Filter also nicht.
- Ein LDAP-Konto ist ein Verzeichniskonto wie ein SSO-Konto: Beim ersten Mal wird es über den DN angelegt oder mit einem vorhandenen SSO-/SCIM-Konto derselben Adresse verknüpft. Ein Konto mit E-Mail und Passwort derselben Adresse wird nie übernommen.
- **Gruppen** kommen aus `LDAP_GROUP_ATTRIBUTE` (Standard `memberOf`): Flowplan nimmt den Gruppennamen (das erste RDN, meist der CN, z. B. `flowplan-admins`) **und** den vollständigen DN. Beides kann in den [SSO-Zuordnungen](#sso-gruppen-arbeitsbereichen-zuordnen) und als `OIDC_ADMIN_GROUP` stehen.
- **Stündlicher Abgleich**: Flowplan liest alle LDAP-Konten neu – Gruppen, Name, Adresse. Wer im Verzeichnis fehlt oder dort gesperrt ist (Active Directory `userAccountControl`, 389 DS `nsAccountLock`, OpenLDAP-ppolicy `pwdAccountLockedTime`), wird deaktiviert; ist die Person wieder da, wird sie wieder aktiviert. Von Admins deaktivierte Konten bleiben deaktiviert. Würde ein Lauf mehr als die Hälfte (mindestens fünf) der Konten deaktivieren, bricht er ab – das ist eher eine falsche Konfiguration.
- Die **Zwei-Faktor-Anmeldung** gilt wie bei Passwörtern: LDAP-Konten können eine Authenticator-App einrichten, und die Vorgabe der Instanz („Admins“ oder „alle“) gilt auch für sie.
- **Administration → Anmeldung & SSO → LDAP-Verzeichnis** zeigt den Status, **Verbindung testen** und **Jetzt abgleichen** mit dem letzten Ergebnis.

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `LDAP_URL` | *leer* | `ldap://host:389` oder `ldaps://host:636`. Ohne sie kein LDAP. |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *leer* | Suchkonto. Ohne es wird anonym gesucht. |
| `LDAP_BASE_DN` | – | Wo Personen gesucht werden, z. B. `ou=people,dc=example,dc=org`. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | `{user}` wird durch den maskierten Namen ersetzt. Active Directory: `(\|(sAMAccountName={user})(userPrincipalName={user})(mail={user}))`. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Attribut mit den Gruppen der Person. |
| `LDAP_TLS_CA` | *leer* | CA-Zertifikat für `ldaps://` oder StartTLS (Dateipfad oder PEM-Text). Zertifikate werden immer geprüft. |
| `LDAP_STARTTLS` | `false` | `true`: `ldap://` mit StartTLS verschlüsseln. |
| `LDAP_TIMEOUT_MS` | `8000` | Zeitlimit je LDAP-Operation. |

### Beispiele

**OpenLDAP** (mit `memberof`-Overlay):

    LDAP_URL=ldaps://ldap.example.org
    LDAP_BIND_DN=cn=flowplan,ou=services,dc=example,dc=org
    LDAP_BIND_PASSWORD=…
    LDAP_BASE_DN=ou=people,dc=example,dc=org

**Active Directory**:

    LDAP_URL=ldaps://dc1.corp.example.com
    LDAP_BIND_DN=CN=svc-flowplan,OU=Service,DC=corp,DC=example,DC=com
    LDAP_BASE_DN=OU=Staff,DC=corp,DC=example,DC=com
    LDAP_USER_FILTER=(&(objectCategory=person)(|(sAMAccountName={user})(userPrincipalName={user})(mail={user})))

**Keycloak** als Quelle: Keycloak ist selbst kein LDAP-Server – verbindet Flowplan mit demselben Verzeichnis, an das Keycloak per „User Federation“ angebunden ist, oder nutzt OIDC.

**Authentik**: LDAP-Outpost anlegen (Provider „LDAP“, Base DN z. B. `dc=ldap,dc=goauthentik,dc=io`), ein Dienstkonto mit „Search full LDAP directory“ als `LDAP_BIND_DN` (`cn=<name>,ou=users,<base>`), `LDAP_USER_FILTER=(|(cn={user})(mail={user}))`. Gruppen stehen in `memberOf`.

## Angemeldet bleiben

Normalerweise endet eine Sitzung `SESSION_HOURS` nach der Anmeldung (Standard 8 Stunden). Mit `SESSION_REMEMBER=true` zeigt die Anmeldeseite **Auf diesem Gerät angemeldet bleiben** – für Passwort, Passkey und SSO. Mit Haken lebt die Sitzung weiter, solange Flowplan genutzt wird:

- Sie endet `SESSION_IDLE_HOURS` nach der letzten Nutzung (Standard 168 = 7 Tage) und spätestens `SESSION_MAX_DAYS` nach der Anmeldung (Standard 30). Danach heißt es neu anmelden – das begrenzt, wie lange ein gestohlenes Cookie taugt.
- Mit SSO zusätzlich spätestens nach `SESSION_GROUPS_HOURS` (Standard 168): Die neue Anmeldung beim Anbieter holt die aktuellen Gruppen, so wirken `OIDC_ALLOWED_GROUP` und `OIDC_ADMIN_GROUP` auch bei langen Sitzungen.
- Ein deaktiviertes Konto verliert den Zugriff sofort, wie bisher.
- Die Desktop- und Handy-Apps bleiben angemeldet, sobald die Option eingeschaltet ist.

Ohne `SESSION_REMEMBER` ändert sich nichts. Wer die Option nachträglich ausschaltet, beendet das Verlängern; laufende Sitzungen enden dann zu ihrem nächsten Ablauf.

**Einstellungen → Konto & Sicherheit → Angemeldete Geräte** listet alle eigenen Sitzungen mit Gerät, letzter Nutzung und Ende; **Abmelden** beendet eine einzelne, **Alle anderen Geräte abmelden** alle bis auf die aktuelle.

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
