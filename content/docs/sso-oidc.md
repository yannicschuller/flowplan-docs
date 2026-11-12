---
keywords: SSO, OIDC, Keycloak, Authentik, Entra ID, Azure AD, Google, Okta
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
| `OIDC_ADMIN_GROUP` | Mitglieder dieser Gruppe sehen die **Administration**. Der Name wird exakt verglichen. |
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
- Verbinden, Trennen, abgelehnte Verbindungen, das Entfernen des Passworts und Zusammenführungen stehen im Sicherheitsprotokoll (**Administration → Sicherheit**).
- LDAP-Konten bleiben über ihren DN verknüpft; sie können SSO genauso verbinden (Nachweis mit dem Verzeichnispasswort). Das LDAP-Konto selbst lässt sich nicht trennen.
- Beim Verbinden fragt Flowplan den Anbieter mit `prompt=login`, damit nicht versehentlich ein anderes, dort noch angemeldetes Konto verbunden wird.
- Mit `OIDC_ALLOWED_GROUP` lassen sich nur SSO-Konten dieser Gruppe verbinden – wie bei der Anmeldung.

## SSO-Gruppen Arbeitsbereichen zuordnen

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
- Geänderte Zuordnungen gelten sofort für alle mit einer aktiven SSO-Sitzung, sonst bei der nächsten Anmeldung (mit „Angemeldet bleiben“ und gesetztem `SESSION_GROUPS_HOURS` spätestens danach).
- Konten mit E-Mail und Passwort sind nicht betroffen.

> **Hinweis: Änderungen von Hand bei aktivem SSO.** Ändert ein Eigentümer die Rolle oder eine Gruppe eines Mitglieds, das über eine SSO-Gruppe kommt (in der Mitgliederliste mit „über SSO-Gruppe …“ markiert), gilt die Änderung nur bis zur nächsten SSO-Anmeldung dieser Person oder bis zur nächsten Änderung der Zuordnungen. Danach setzt die Zuordnung Rolle und Gruppen wieder. Flowplan zeigt das direkt nach der Änderung an. Soll eine Rolle dauerhaft anders sein, ändert die Administration die Zuordnung – oder die Gruppen der Person im Identitätsanbieter.

In der Mitgliederliste und im Gruppendialog steht bei solchen Mitgliedern „über SSO-Gruppe „X““.
