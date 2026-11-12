---
keywords: SCIM, LDAP, Active Directory, Okta, Entra ID, Provisionierung, Verzeichnis
---

# Benutzer aus dem Verzeichnis: SCIM und LDAP

Konten aus dem Identitätsanbieter per SCIM anlegen und entfernen lassen oder die Anmeldung gegen ein LDAP-Verzeichnis wie Active Directory prüfen.

## Benutzer bereitstellen mit SCIM

Mit SCIM 2.0 legt der Identitätsanbieter Konten in Flowplan an, hält Name und Adresse aktuell und deaktiviert Konten, sobald jemand das Unternehmen verlässt – ohne dass sich die Person vorher anmelden muss. Flowplan spricht SCIM 2.0 nach RFC 7643/7644 (Benutzer und Gruppen, Filter, PATCH).

**Einrichten**

1. **Administration → Anmeldung & SSO → SCIM-Token**: **Token erstellen**. Der Token beginnt mit `fpscim_` und wird nur einmal angezeigt; gespeichert ist nur sein Hash. Widerrufen geht jederzeit.
2. Beim Anbieter die **SCIM-Basis-URL** `<APP_URL>/api/scim/v2` und den Token als **Bearer-Token** eintragen.
3. Im Anbieter Personen und Gruppen der App zuweisen bzw. „Push Groups“ einschalten.

**Was Flowplan daraus macht**

- **Konten**: Ein neues SCIM-Konto ist ein SSO-Konto. Gibt es schon ein Konto mit derselben E-Mail-Adresse, wird es verknüpft statt verdoppelt. Bei der ersten OIDC-Anmeldung übernimmt die Person das vorbereitete Konto – über die `externalId` (= `sub` des Anbieters) oder eine bestätigte E-Mail-Adresse.
- **Deaktivieren**: `active: false` deaktiviert das Konto wie **Sperren** in der Administration – alle Sitzungen enden sofort, API-Tokens hören auf zu funktionieren. `active: true` aktiviert es wieder. **Löschen** (DELETE) deaktiviert und trennt die Verknüpfung; Inhalte und das Konto selbst bleiben, endgültig löscht weiterhin die Administration. Das letzte Admin-Konto mit Passwort lässt sich über SCIM nicht deaktivieren.
- **Gruppen**: SCIM-Gruppen legen keine Gruppen in Flowplan an. Ihr **Anzeigename** zählt wie eine SSO-Gruppe aus dem Token: Die [SSO-Zuordnungen](/sso-oidc#sso-gruppen-arbeitsbereichen-zuordnen) geben Rolle und Arbeitsbereichsgruppen, und alle Regeln von dort gelten (die Zuordnung hat Vorrang, der letzte Eigentümer bleibt). Änderungen an Mitgliedschaften wirken sofort, nicht erst bei der nächsten Anmeldung. OIDC-Gruppen und SCIM-Gruppen einer Person werden zusammengezählt.
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
- **Gruppen** kommen aus `LDAP_GROUP_ATTRIBUTE` (Standard `memberOf`): Flowplan nimmt den Gruppennamen (das erste RDN, meist der CN, z. B. `flowplan-admins`) **und** den vollständigen DN. Beides kann in den [SSO-Zuordnungen](/sso-oidc#sso-gruppen-arbeitsbereichen-zuordnen) und als `OIDC_ADMIN_GROUP` stehen.
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

### Kontakte aus LDAP

[Kontakte-Datenbanken](/contacts#kontakte-aus-dem-ldap-verzeichnis) übernehmen Personen aus dem Verzeichnis und gleichen sie ab (nur Verzeichnis → Flowplan). Dafür nutzt Flowplan den Server, das Suchkonto und TLS der LDAP-Anmeldung (`LDAP_URL`, `LDAP_BIND_DN`/`LDAP_BIND_PASSWORD`, `LDAP_TLS_CA`, `LDAP_STARTTLS`, `LDAP_TIMEOUT_MS`). Basis und Filter können eigene sein:

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `LDAP_CONTACTS_BASE_DN` | `LDAP_BASE_DN` | Wo Kontakte gesucht werden; der OU-Baum im Import-Dialog beginnt hier. Einträge außerhalb sind nicht erreichbar. |
| `LDAP_CONTACTS_FILTER` | `(&(\|(objectClass=inetOrgPerson)(objectClass=user)(objectClass=contact))(!(objectClass=computer)))` | Welche Einträge Personen sind. |
| `LDAP_CONTACTS_SYNC_MINUTES` | `60` | Abstand des Abgleichs (15–1440). |
| `LDAP_CONTACTS_ATTRIBUTES` | – | Weitere Attribute, die Zuordnungen nutzen dürfen (durch Komma oder Leerzeichen getrennt). Ohne sie sind nur die Attribute der Standardzuordnung erlaubt. |
| `LDAP_CONTACTS` | an | `off` schaltet Kontakte aus dem Verzeichnis ab. |

Für Kontakte allein reicht `LDAP_URL` mit `LDAP_CONTACTS_BASE_DN`; ohne `LDAP_BASE_DN` bleibt die Anmeldung mit LDAP aus.

**Administration → Anmeldung & SSO → Kontakte aus LDAP** zeigt, woher Basis und Filter kommen, und überschreibt sie: Basis-DN, Filter, Abgleich alle … Minuten, **Weitere Attribute** (zusätzlich zu `LDAP_CONTACTS_ATTRIBUTES` freigegebene Attribute, durch Kommas getrennt) und **Erlaubt** (aus: niemand kann importieren, der Abgleich ruht). Gespeicherte Werte gehen der Umgebung vor; leere Felder nehmen wieder den Wert aus der Umgebung. **Verbindung testen** prüft Bind und Basis. Das Passwort des Suchkontos bleibt in der Umgebung und wird nie gespeichert. Änderungen und Importe stehen als Sicherheitsereignis „Sicherheitsrelevante Einstellung geändert“ im Protokoll.

Wer das Verzeichnis nutzen darf: Administratoren der Instanz, Konten mit LDAP-Anmeldung und Vollmitglieder (keine Gäste) mindestens eines Arbeitsbereichs, den jemand anderes angelegt hat – nie Gäste des Arbeitsbereichs der Kontakte-Datenbank und nie ein API-Token. Wer nur eigene Arbeitsbereiche hat, kommt also nicht ans Verzeichnis, auch wenn jeder Arbeitsbereiche anlegen darf. Siehe [Kontakte aus dem LDAP-Verzeichnis](/contacts#kontakte-aus-dem-ldap-verzeichnis).

Grenzen: höchstens 500 Personen je Liste im Dialog (dann suchen), 2000 verknüpfte Kontakte und 20 OUs je Datenbank; jede Operation hat das Zeitlimit `LDAP_TIMEOUT_MS`.
