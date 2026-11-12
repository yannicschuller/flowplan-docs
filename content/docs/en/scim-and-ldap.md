---
keywords: scim, ldap, active directory, okta, entra id, provisioning, directory
---

# Users from a directory: SCIM and LDAP

Have the identity provider create and remove accounts via SCIM, or check sign-ins against an LDAP directory such as Active Directory.

## User provisioning (SCIM)

With SCIM 2.0 your identity provider creates accounts in Flowplan, keeps name and address up to date and deactivates accounts as soon as someone leaves – without the person having to sign in first. Flowplan speaks SCIM 2.0 as in RFC 7643/7644 (users and groups, filters, PATCH).

**Setting up**

::: steps

1. **Administration → Sign-in & SSO → SCIM tokens**: **Create token**. The token starts with `fpscim_` and is shown only once; only its hash is stored. You can revoke it at any time.
2. At the provider, enter the **SCIM base URL** `<APP_URL>/api/scim/v2` and the token as **bearer token**.
3. Assign people and groups to the app at the provider, or turn on "Push Groups".

:::

**What Flowplan does with it**

- **Accounts**: a new SCIM account is an SSO account. If an account with the same e-mail address exists, it is linked instead of duplicated. At the first OIDC sign-in the person takes over the prepared account – by the `externalId` (= the provider's `sub`) or a verified e-mail address.
- **Deactivating**: `active: false` disables the account like **Block** in the administration – all sessions end at once, API tokens stop working. `active: true` enables it again. **Deleting** (DELETE) deactivates and unlinks; the content and the account itself stay, final deletion is still done in the administration. The last admin account with a password cannot be deactivated over SCIM.
- **Groups**: SCIM groups do not create groups in Flowplan. Their **display name** counts like an SSO group from the token: the [SSO group mappings](/sso-oidc#map-sso-groups-to-workspaces) give the role and workspace groups, and all rules from there apply (the mapping always wins, the last owner stays). Membership changes take effect at once, not only at the next sign-in. A person's OIDC groups and SCIM groups are combined.
- Accounts with e-mail and password can be linked and deactivated, but mappings do not change their memberships.
- The **last SCIM requests** with their status are listed in the administration – useful when the provider reports errors.

Not supported: bulk, sorting, `/Me` and password changes (Flowplan stores no password for SCIM accounts).

### SCIM with common providers

- **Okta**: app integration (SAML or OIDC) → **Provisioning** → "SCIM connector base URL" = `<APP_URL>/api/scim/v2`, "Unique identifier field for users" = `userName`, authentication mode **HTTP Header** with the token. Under "To App" turn on *Create Users*, *Update User Attributes* and *Deactivate Users*; add groups under **Push Groups**.
- **Microsoft Entra ID**: enterprise application → **Provisioning** → mode *Automatic*, "Tenant URL" = `<APP_URL>/api/scim/v2`, "Secret Token" = the token, **Test connection**. Keep `userPrincipalName` → `userName` and `objectId` → `externalId` in the attribute mappings; set the scope to "Sync only assigned users and groups". Entra works in cycles of about 40 minutes.
- **Authentik**: **Applications → Providers → create a SCIM provider**, URL `<APP_URL>/api/scim/v2`, enter the token; attach the provider to the Flowplan application as **backchannel provider**. Groups are sent with their names.
- **Keycloak**: Keycloak has no SCIM client of its own; install a SCIM extension (e.g. "keycloak-scim") or use LDAP or OIDC groups.

## Sign-in with LDAP

With `LDAP_URL` set, the password field of the sign-in page checks names against an LDAP directory (OpenLDAP, 389 DS, Active Directory, …). The field is then called **E-mail address or user name**.

- **Accounts with e-mail and password** keep signing in with their Flowplan password. Every other name is searched with the search account (`LDAP_BIND_DN`) and `LDAP_USER_FILTER` below `LDAP_BASE_DN`, and the password is checked by binding as that person. Empty passwords are never sent; the name is escaped as in RFC 4515, so `*` or `)` in a name do not change the filter.
- An LDAP account is a directory account like an SSO account: the first time it is created by its DN or linked to an existing SSO/SCIM account with the same address. An account with e-mail and password of the same address is never taken over.
- **Groups** come from `LDAP_GROUP_ATTRIBUTE` (default `memberOf`): Flowplan takes the group's name (the first RDN, usually the CN, e.g. `flowplan-admins`) **and** the full DN. Either can be used in the [SSO group mappings](/sso-oidc#map-sso-groups-to-workspaces) and as `OIDC_ADMIN_GROUP`.
- **Hourly sync**: Flowplan reads all LDAP accounts again – groups, name, address. Whoever is missing from the directory or locked there (Active Directory `userAccountControl`, 389 DS `nsAccountLock`, OpenLDAP ppolicy `pwdAccountLockedTime`) is disabled; once they are back, they are enabled again. Accounts disabled by an admin stay disabled. A run that would disable more than half of the accounts (at least five) stops – that is more likely a wrong configuration.
- **Two-factor sign-in** applies as for passwords: LDAP accounts can set up an authenticator app, and the instance's policy ("admins" or "everyone") applies to them too.
- **Administration → Sign-in & SSO → LDAP directory** shows the status, **Test connection** and **Sync now** with the last result.

| Variable | Default | Meaning |
| --- | --- | --- |
| `LDAP_URL` | *empty* | `ldap://host:389` or `ldaps://host:636`. Without it, no LDAP. |
| `LDAP_BIND_DN` / `LDAP_BIND_PASSWORD` | *empty* | Search account. Without it, the search is anonymous. |
| `LDAP_BASE_DN` | – | Where people are searched, e.g. `ou=people,dc=example,dc=org`. |
| `LDAP_USER_FILTER` | `(\|(uid={user})(mail={user}))` | `{user}` is replaced by the escaped name. Active Directory: `(\|(sAMAccountName={user})(userPrincipalName={user})(mail={user}))`. |
| `LDAP_GROUP_ATTRIBUTE` | `memberOf` | Attribute with the person's groups. |
| `LDAP_TLS_CA` | *empty* | CA certificate for `ldaps://` or StartTLS (file path or PEM text). Certificates are always verified. |
| `LDAP_STARTTLS` | `false` | `true`: encrypt `ldap://` with StartTLS. |
| `LDAP_TIMEOUT_MS` | `8000` | Time limit per LDAP operation. |

### Examples

**OpenLDAP** (with the `memberof` overlay):

    LDAP_URL=ldaps://ldap.example.org
    LDAP_BIND_DN=cn=flowplan,ou=services,dc=example,dc=org
    LDAP_BIND_PASSWORD=…
    LDAP_BASE_DN=ou=people,dc=example,dc=org

**Active Directory**:

    LDAP_URL=ldaps://dc1.corp.example.com
    LDAP_BIND_DN=CN=svc-flowplan,OU=Service,DC=corp,DC=example,DC=com
    LDAP_BASE_DN=OU=Staff,DC=corp,DC=example,DC=com
    LDAP_USER_FILTER=(&(objectCategory=person)(|(sAMAccountName={user})(userPrincipalName={user})(mail={user})))

**Keycloak** as the source: Keycloak itself is no LDAP server – connect Flowplan to the same directory Keycloak uses through "User Federation", or use OIDC.

**Authentik**: create an LDAP outpost (provider "LDAP", base DN e.g. `dc=ldap,dc=goauthentik,dc=io`), a service account with "Search full LDAP directory" as `LDAP_BIND_DN` (`cn=<name>,ou=users,<base>`), `LDAP_USER_FILTER=(|(cn={user})(mail={user}))`. Groups are in `memberOf`.

### Contacts from LDAP

[Contacts databases](/contacts#contacts-from-the-ldap-directory) import people from the directory and keep them in sync (directory → Flowplan only). Flowplan uses the server, search account and TLS of the LDAP sign-in (`LDAP_URL`, `LDAP_BIND_DN`/`LDAP_BIND_PASSWORD`, `LDAP_TLS_CA`, `LDAP_STARTTLS`, `LDAP_TIMEOUT_MS`). Base and filter can be separate:

| Variable | Default | Meaning |
| --- | --- | --- |
| `LDAP_CONTACTS_BASE_DN` | `LDAP_BASE_DN` | Where contacts are searched; the OU tree of the import dialog starts here. Entries outside it cannot be reached. |
| `LDAP_CONTACTS_FILTER` | `(&(\|(objectClass=inetOrgPerson)(objectClass=user)(objectClass=contact))(!(objectClass=computer)))` | Which entries are people. |
| `LDAP_CONTACTS_SYNC_MINUTES` | `60` | Interval of the sync (15–1440). |
| `LDAP_CONTACTS_ATTRIBUTES` | – | More attributes mappings may use (separated by commas or spaces). Without it only the attributes of the default mapping are allowed. |
| `LDAP_CONTACTS` | on | `off` turns contacts from the directory off. |

For contacts alone, `LDAP_URL` with `LDAP_CONTACTS_BASE_DN` is enough; without `LDAP_BASE_DN`, sign-in with LDAP stays off.

**Administration → Sign-in & SSO → Contacts from LDAP** shows where base and filter come from and overrides them: base DN, filter, sync every … minutes, **More attributes** (attributes allowed on top of `LDAP_CONTACTS_ATTRIBUTES`, separated by commas) and **Allowed** (off: nobody can import, the sync rests). Stored values take precedence over the environment; empty fields fall back to the environment. **Test connection** checks the bind and the base. The search account's password stays in the environment and is never stored. Changes and imports are recorded as the security event “Security-relevant setting changed”.

Who may use the directory: instance administrators, accounts that sign in with LDAP and full members (not guests) of at least one workspace someone else created – never guests of the contacts database's workspace and never an API token. Someone with only workspaces of their own therefore cannot reach the directory, even though anyone may create workspaces. See [Contacts from the LDAP directory](/contacts#contacts-from-the-ldap-directory).

Limits: at most 500 people per list in the dialog (search for more), 2000 linked contacts and 20 OUs per database; every operation has the `LDAP_TIMEOUT_MS` time limit.
