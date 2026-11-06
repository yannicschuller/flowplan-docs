# Sign-in: password, passkeys and OIDC

Flowplan signs people in with e-mail and password, optionally with passkeys. In addition – or instead – sign-in can go through an OpenID Connect provider (single sign-on), whose groups decide who administers the instance.

## E-mail and password

Without further setup, the sign-in page shows a form for e-mail and password.

- **The first account** of a new instance administers it: the sign-in page then offers **Create account** right away. This account sees the **Administration**.
- **Instances reachable from the internet:** until the first account exists, anyone who opens the address could create it and administer the instance. Set `FLOWPLAN_SETUP_TOKEN` to a random value (e.g. `openssl rand -hex 24`): the first account can then only be created with the setup link `https://flowplan.example.com/register?setup=<token>`; without it the page offers no sign-up. Once the first account exists the token has no effect. With single sign-on you can also never use the link – the administrators then come through the group in `OIDC_ADMIN_GROUP`, and everyone else joins by invitation.
- **Further accounts** are created when the administrators open sign-ups under **Instance → Allow sign-ups with e-mail and password** – or for addresses with an [invitation](/workspaces-and-permissions). Workspaces someone was invited to appear as soon as the address is confirmed via the e-mail link.
- **Confirming the e-mail address:** if the instance sends e-mail (`SMTP_*` set), a new account signs in only after the address has been confirmed with the link from the e-mail – the link signs in right away. Trying earlier shows a notice and sends the link again (at most every five minutes); **Send the link again** also works after signing up. Without e-mail every account counts as confirmed immediately, as does the instance's first account. Admins can confirm an address by hand under **Administration → Users → Manage**; resetting the password via a link confirms it too. If the address already has an account, signing up shows the same as for a new address, and the account's owner gets a note by e-mail instead – so the page does not reveal which addresses have an account.
- **Passwords** have at least 10 characters and are stored with scrypt. After 8 failed attempts for an address (or 30 from one IP address) there is a 15-minute pause.
- **Forgot password**: with [e-mail delivery](/configuration#e-mail-smtp) set up, the sign-in page sends a link that is valid for two hours. Without e-mail, the administrators create a link to hand over under **Users → Reset link**. After a reset all previous sessions are ended.
- **Admin right**: under **Users**, the administrators pass it on (**Make admin**) or take it away; someone always has to administer the instance.
- Everyone changes their name and password under **Settings → Account & security** (card **Profile**, or **Change password …** in **Sign-in & security**). The name is saved when you leave the field. After a password change all other sessions end; the current one stays signed in.
- Sign-ups and "Forgot password" are limited per address and network address (at most one reset e-mail every five minutes per account).

`FLOWPLAN_LOCAL_LOGIN=false` turns off e-mail, password and passkeys – then only single sign-on remains.

Under **Settings → Account & security**, the **Sign-in methods** card shows how you sign in: e-mail and password, the directory (LDAP) and connected SSO identities with provider, address, date connected and last use. That is where you connect and disconnect SSO identities and remove or set the password – see [Connect an existing account to SSO](#connect-an-existing-account-to-sso).

## Passkeys

With a passkey you sign in with your fingerprint, face recognition or device PIN, without a password. Passkeys are created under **Settings → Account & security → Add a passkey**; afterwards **Sign in with a passkey** on the sign-in page is all it takes.

Under **Settings → Account & security**, the card **Sign-in & security** lists password, two-factor sign-in, passkeys and the signed-in devices, each with its state (“Off”, “On · 8 codes left”, “2 passkeys”). **Delete account** is at the very bottom, in the **Danger zone**. Addresses such as `/#settings/account/passkeys` or `/#settings/account/two-factor` open a card directly.

- Passkeys exist for accounts with e-mail and password. SSO accounts sign in with their provider, which may offer passkeys itself.
- Passkeys belong to the domain in `APP_URL`. They need HTTPS (or `http://localhost` during development); a bare IP address does not work. Whoever changes the domain creates the passkeys anew.
- A passkey can be removed in the settings at any time.
- In the desktop app, **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser and hand it back to the app afterwards ([Desktop apps](/operations#desktop-apps)).

## Two-factor sign-in

Accounts with e-mail and password can add an authenticator app, such as Aegis, 2FAS, Google Authenticator or 1Password.

1. **Settings → Account & security → Two-factor sign-in → Set up an authenticator app.**
2. Scan the QR code with the app – or type the key shown.
3. Confirm with the current six-digit code.
4. Keep the ten **recovery codes** safe. They are shown only once, and each works exactly once.

When signing in, Flowplan asks for the code from the app (or a recovery code) after the password.

- A code counts only once; codes from the previous and the next 30-second window are accepted, so a slightly wrong clock doesn't matter.
- Too many wrong codes block sign-in for 15 minutes.
- **Passkeys** are enough on their own: signing in with a passkey needs no code – even with the app turned on. Whoever wants a code as well turns on **Also ask for a code after the passkey** under **Settings → Account & security → Two-factor sign-in → Manage**. Turning it off needs the password or a current code.
- **SSO accounts** get their second factor from the provider; **API tokens** are not affected.
- **Turning it off** and **new recovery codes** need the password or a current code.
- **Forgot password** does not skip the second step.
- Lost your phone and your codes? An administrator can reset two-factor sign-in ([Administration → Users](/administration#users)).

Admins can require two-factor sign-in for all local accounts or only for admins ([Administration → Sign-in & SSO](/administration#sign-in-sso)). Accounts without an app and without a passkey then set up a second factor right after signing in, before using Flowplan; accounts with a passkey but no app sign in with the passkey.

> [!IMPORTANT]
> The apps' keys are stored encrypted – with `FLOWPLAN_ENCRYPTION_KEY`, otherwise `FLOWPLAN_SECRETS_KEY`, otherwise with the generated file `secrets.key` in the data folder ([Configuration](/configuration#stored-secrets)). Be sure to back up this file or the key: the instance backup deliberately leaves it out. Without it, only the recovery codes work after a restore.

## Single sign-on with OIDC

Optional. With `OIDC_ISSUER` set, the sign-in page shows **Sign in with SSO**; new people are created on their first sign-in. E-mail accounts and SSO accounts can exist side by side.

### Create a client at the provider

Register a **confidential web client** – or a **public client**: if `OIDC_CLIENT_SECRET` is empty, Flowplan signs in without a secret and relies on PKCE alone. That suits providers that serve many instances with one client. Providers that sign ID tokens with the client secret only (HS256) need a confidential client.

| Setting | Value |
| --- | --- |
| Redirect URI | `https://flowplan.example.com/api/auth/callback` |
| Flow | Authorization code with PKCE (S256) |
| Scopes | `openid profile email` and the scope for groups (often `groups`) |
| Groups | must be in the signed ID token or in the UserInfo answer |

The redirect URI is always `APP_URL` plus `/api/auth/callback`.

### Variables

```dotenv
APP_URL=https://flowplan.example.com
OIDC_ISSUER=https://id.example.com/realms/company
OIDC_CLIENT_ID=flowplan
OIDC_CLIENT_SECRET=secret
OIDC_SCOPES=openid profile email groups
OIDC_GROUPS_CLAIM=groups
OIDC_ADMIN_GROUP=flowplan-admins
SESSION_HOURS=8
```

| Variable | Meaning |
| --- | --- |
| `OIDC_ISSUER` | The issuer URL; Flowplan reads the discovery from it (`/.well-known/openid-configuration`). |
| `OIDC_GROUPS_CLAIM` | The claim with the groups, also as a path such as `realm_access.roles`. |
| `OIDC_ADMIN_GROUP` | Members of this group see the **Administration**. The name is compared exactly. |
| `OIDC_ALLOWED_GROUP` | If set, only members of this group may sign in. |
| `OIDC_LINKED_SSO_ONLY` | `true`: accounts connected to SSO sign in through SSO only (off by default). A password or passkey sign-in is refused with a note; passkeys and the authenticator app stay for confirming important steps. See [Connect an existing account to SSO](#connect-an-existing-account-to-sso). |
| `OIDC_NEW_ACCOUNTS` | `false`: SSO sign-in creates no new accounts (on by default) – only existing, connected or SCIM-provisioned accounts sign in. At a first SSO sign-in with a known address, "Create a separate account instead" is then not offered. |
| `OIDC_PROMPT_CREATE` | `true`: **Sign up** opens the provider's registration directly (`prompt=create`). |
| `OIDC_PICTURE` | Take the profile picture from the `picture` claim (on by default, `off` turns it off). The image must be at a public HTTPS address; internal addresses are not fetched – not even via redirects. |
| `SESSION_HOURS` | How long a browser session is valid in hours, as long as "Stay signed in" is not used; the apps stay signed in (see [Stay signed in](/sign-in#stay-signed-in)). |

### Group names with common providers

- **Keycloak**: add the "Group Membership" mapper to the client, token claim name `groups`, turn off "Full group path" – otherwise the group is called `/flowplan-admins`. For realm roles use `OIDC_GROUPS_CLAIM=realm_access.roles` instead.
- **Authentik**: the `profile` scope already delivers `groups` with the group names – a scope `groups` is not needed. The issuer is the provider's address with the trailing slash, e.g. `https://auth.example.org/application/o/flowplan/`. Without a **signing key** on the provider Authentik signs the ID token with the client secret (HS256); Flowplan accepts that from version 0.8.3 on. With a signing key (RS256) Flowplan also checks the signature against the provider's published keys. When you create the OAuth2 provider through the API, set `grant_types` explicitly to `["authorization_code"]` (plus `"refresh_token"` if tokens should be refreshed): without it, Authentik 2026.8 gives it an empty list, and every sign-in fails with `invalid_request` ("The request is otherwise malformed"), which doesn't point at the cause.
- **Zitadel**: roles are under `urn:zitadel:iam:org:project:roles`; create a claim of your own with an action or enter the path.
- **Entra ID**: configure the groups claim in the token. Entra delivers object IDs by default; then enter the admin group's ID as `OIDC_ADMIN_GROUP`.

### When SSO sign-in fails

The server log names the reason: a line `OIDC sign-in failed:` with the kind of error, its code and – if the provider answered with an error – its `error` and `error_description` (never tokens or secrets). Common causes:

- **Redirect URI**: the provider must allow exactly `<APP_URL>/api/auth/callback`. `APP_URL` has to be the address in the browser – otherwise the provider rejects the redirect or the sign-in cookie is missing ("Sign-in expired").
- **Issuer**: `OIDC_ISSUER` must match the `issuer` in the provider's discovery character for character, including a trailing slash.
- **Client secret** wrong, or a secret set for a client the provider treats as public (or none for a confidential one): the token endpoint answers `invalid_client`.
- **`unexpected JWT "alg"`**: the provider signs ID tokens with another algorithm than it announces in its discovery.

### Connect an existing account to SSO

An account can sign in several ways: with e-mail and password, through LDAP and through one or more SSO identities (OIDC). Whoever created a local account first and gets SSO later connects the two – instead of ending up with a second profile.

**From the settings:** Under **Settings → Account & security → Sign-in methods**, choose **Connect SSO …**, confirm with your password, a code from the authenticator app or a passkey, then sign in with the provider. From then on the SSO identity (provider and subject) belongs to your account; you sign in with either. The flow only works for your account and the session you started it in, for ten minutes.

- If the SSO identity already belongs to another Flowplan account, nothing is connected. Ask the administrators to [merge the two accounts](/en/administration#merge-accounts).
- **Disconnect** (bin next to the SSO identity) works only while another sign-in method remains: a password, LDAP or another SSO identity.
- **Remove password …** is offered once an SSO identity is connected: you then sign in through SSO only. Passkeys and the authenticator app stay for confirming important steps. **Set password …** gives the account a password again at any time.
- Connecting, disconnecting and removing or setting the password are confirmed each time – with the password, a code from the app or a passkey. An account without any of these (SSO only) confirms with a sign-in at most ten minutes ago.

**At the first SSO sign-in:** When an SSO identity signs in for the first time, its provider has **verified** its e-mail address (`email_verified`), and exactly one Flowplan account with that address signs in with a password, LDAP or a passkey, Flowplan does not create a new account. A page asks instead: "An account with this e-mail already exists – connect it?" You confirm the existing account with its password (plus the code from the app when it is turned on) or its passkey; then both are connected and you are signed in. **Create a separate account instead** is offered only when the instance allows new SSO accounts (see `OIDC_NEW_ACCOUNTS` under [Configuration](/en/configuration#sign-in)). Nothing is ever connected without that proof; wrong passwords and codes count towards the lockout after too many attempts, as at a normal sign-in.

Good to know:

- A connected account with e-mail and password keeps its name, picture and admin right; SSO group mappings still do not change its memberships.
- With `OIDC_LINKED_SSO_ONLY=true`, connected accounts sign in through SSO only – a password or passkey sign-in then gets a clear note to choose "Sign in with SSO". Passkeys and the app stay for confirming steps.
- Connecting, disconnecting, refused connections, removing the password and merges are recorded in the security log (**Administration → Security**).
- LDAP accounts stay linked by their DN; they can connect SSO the same way (proof with the directory password). The LDAP link itself cannot be disconnected.
- When connecting, Flowplan asks the provider with `prompt=login`, so an account still signed in there is not connected by accident.
- With `OIDC_ALLOWED_GROUP`, only SSO identities in that group can be connected – as for signing in.

### Map SSO groups to workspaces

Groups from the identity provider (the claim in `OIDC_GROUPS_CLAIM`) can give membership and groups in workspaces – so you manage access centrally in the provider.

- **Admins** map groups – for any workspace centrally under **Administration → Sign-in & SSO → Map SSO groups centrally**, or, where they are owners, under **Settings → Groups & permissions → SSO groups**.
- **Owners** who aren't admins see their workspace's mappings there but can't change them. A mapping brings people of the whole instance into a workspace and shows their addresses there – that is the administration's decision.
- A mapping gives a **role** (View, Edit, Owner), a **workspace group** (for [page permissions](/workspaces-and-permissions#groups)) or both.

At every SSO sign-in Flowplan applies them:

- Matching people are added; with several matching groups the highest role wins. Guests stay at "Edit" at most.
- Whoever no longer has the SSO group loses what the mapping gave.
- **The mapping always wins.** If a mapping matches a person, Flowplan sets the role and groups to what the mapping says – even if the member was added or changed by hand. From then on the membership is managed through SSO.
- Members and group memberships that no mapping matches and that never came from SSO stay untouched.
- The last owner of a workspace always stays.
- Changed mappings apply right away to everyone with an active SSO session, otherwise at the next sign-in (with "Stay signed in" and `SESSION_GROUPS_HOURS` set, at the latest after that).
- Accounts with e-mail and password are not affected.

> **Note: changes by hand while SSO is active.** If an owner changes the role or a group of a member who comes from an SSO group (marked "via SSO group …" in the member list), the change lasts only until that person's next SSO sign-in or the next change of the mappings. Then the mapping sets the role and groups again. Flowplan says so right after the change. For a lasting difference, the administration changes the mapping – or the person's groups in the identity provider.

In the member list and the group dialog, such members show "via SSO group “X”".

## User provisioning (SCIM)

With SCIM 2.0 your identity provider creates accounts in Flowplan, keeps name and address up to date and deactivates accounts as soon as someone leaves – without the person having to sign in first. Flowplan speaks SCIM 2.0 as in RFC 7643/7644 (users and groups, filters, PATCH).

**Setting up**

1. **Administration → Sign-in & SSO → SCIM tokens**: **Create token**. The token starts with `fpscim_` and is shown only once; only its hash is stored. You can revoke it at any time.
2. At the provider, enter the **SCIM base URL** `<APP_URL>/api/scim/v2` and the token as **bearer token**.
3. Assign people and groups to the app at the provider, or turn on "Push Groups".

**What Flowplan does with it**

- **Accounts**: a new SCIM account is an SSO account. If an account with the same e-mail address exists, it is linked instead of duplicated. At the first OIDC sign-in the person takes over the prepared account – by the `externalId` (= the provider's `sub`) or a verified e-mail address.
- **Deactivating**: `active: false` disables the account as in the administration – all sessions end at once, API tokens stop working. `active: true` enables it again. **Deleting** (DELETE) deactivates and unlinks; the content and the account itself stay, final deletion is still done in the administration. The last admin account with a password cannot be deactivated over SCIM.
- **Groups**: SCIM groups do not create groups in Flowplan. Their **display name** counts like an SSO group from the token: the [SSO group mappings](#map-sso-groups-to-workspaces) give the role and workspace groups, and all rules from there apply (the mapping always wins, the last owner stays). Membership changes take effect at once, not only at the next sign-in. A person's OIDC groups and SCIM groups are combined.
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
- **Groups** come from `LDAP_GROUP_ATTRIBUTE` (default `memberOf`): Flowplan takes the group's name (the first RDN, usually the CN, e.g. `flowplan-admins`) **and** the full DN. Either can be used in the [SSO group mappings](#map-sso-groups-to-workspaces) and as `OIDC_ADMIN_GROUP`.
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
| `LDAP_CONTACTS` | on | `off` turns contacts from the directory off. |

For contacts alone, `LDAP_URL` with `LDAP_CONTACTS_BASE_DN` is enough; without `LDAP_BASE_DN`, sign-in with LDAP stays off.

**Administration → Sign-in & SSO → Contacts from LDAP** shows where base and filter come from and overrides them: base DN, filter, sync every … minutes and **Allowed** (off: nobody can import, the sync rests). Stored values take precedence over the environment; empty fields fall back to the environment. **Test connection** checks the bind and the base. The search account's password stays in the environment and is never stored. Changes and imports are recorded as the security event “Security-relevant setting changed”.

Limits: at most 500 people per list in the dialog (search for more), 2000 linked contacts and 20 OUs per database; every operation has the `LDAP_TIMEOUT_MS` time limit.

## Stay signed in

How long a session lasts is set under **Administration → Sign-in & SSO → Sessions** ([Administration](/administration#sign-in-sso)); without a setting there, the environment variables and their defaults apply.

| Where | How long (default) | Setting · variable |
| --- | --- | --- |
| Browser without **Stay signed in** | 8 hours after signing in – even while Flowplan is open | **Browser without “Stay signed in”** · `SESSION_HOURS` (1–24) |
| Browser with **Stay signed in** | 7 days after the last use, at most 30 days after signing in | **Offer “Stay signed in” in the browser** · `SESSION_REMEMBER` (default off), **Browser with “Stay signed in”** · `SESSION_IDLE_HOURS` |
| Desktop and mobile app | 90 days after the last use of the app or its widgets, at most 365 days after signing in | **Desktop and mobile apps** · `SESSION_APP_REMEMBER` (default on), **Apps: end without use** · `SESSION_APP_DAYS` |

- **In the browser** the sign-in page shows the **Stay signed in** box as soon as the administration offers it – for password, passkey and SSO (also through “Connect account”). It is meant for your own devices: when ticked, the session lives on while Flowplan is used. The longest lifetime (`SESSION_MAX_DAYS`, default 30 days, never shorter than the time without use) limits how long a stolen cookie is good for.
- **The apps** run on personal devices and always stay signed in – whether you signed in with a password in the app or with a passkey or SSO through the browser. The widgets keep the session alive as well. The app has to prove the sign-in is its own; that the app's name is in the user agent is not enough, because any browser can send it:
  - **Passkey, SSO or “Sign in in the browser”**: the hand-off back to the app is the proof – only the app that started the sign-in can redeem it. This works with every app version.
  - **Password in the app**: newer apps (iPhone, iPad and Android after 1.0.5, desktop after 1.3.0) create a random device key per server on first launch, keep it in the system's key store (Keychain, Android Keystore, the desktop's key store) and send it with the password. The first sign-in of an account on that device registers the key; later sign-ins need the same key. The server keeps only a hash.
  - **Older app versions** (such as 1.0.5) have no device key: after a password sign-in they stay signed in like a browser – 8 hours, or with **Stay signed in** where the instance offers it (the box then appears in the app as well). Sign-ins with a passkey or SSO keep the app's lifetime; so do app sessions that existed before this change. An instance that does not want this sets **Desktop and mobile apps** to **As in the browser without “Stay signed in”** (`SESSION_APP_REMEMBER=false`). The **app lock** in the app's settings (Face ID, Touch ID, fingerprint or device passcode, on iPhone, iPad and Android) protects the phone further.
- SSO sessions extend the same way. Group changes at the provider follow through SCIM, the LDAP sync or the next sign-in. Only when `SESSION_GROUPS_HOURS` is set does an SSO session that stays signed in end after that many hours already: signing in at the provider again fetches the current groups, so `OIDC_ALLOWED_GROUP` and `OIDC_ADMIN_GROUP` apply by then at the latest, even without SCIM.
- A disabled account loses access immediately, as before.
- When the same person signs in again on a device (for example because the session ran out), the app's registration survives – notifications, widgets, Live Activities and Shortcuts move over to the new session. Only an explicit **Sign out** (in the app or under **Signed-in devices**) removes it.
- Shorter times apply from the next sign-in; longer ones extend sessions that stay signed in the next time they are used. Turning “Stay signed in” or the apps' staying signed in off stops the extending; running sessions then end at their next expiry.

**Settings → Account & security → Signed-in devices** lists all your own sessions with device, last use and end; **Sign out** ends a single one, **Sign out all other devices** all but the current one.

## Security check

**Settings → Security check** (`/#settings/security`) shows everyone how well their account is protected – tailored to how they sign in:

- **The check:** second factor, passkey and recovery codes left (e-mail accounts), a confirmed e-mail address, devices unused for over a month, API tokens without an end date or unused for three months, edit links without a password and end date, whether security notices arrive by push or e-mail, and failed sign-ins on your own account. Open points come first, each with the way to fix it. With SSO and LDAP it points to the provider or the directory.
- **What you shared:** your share links (with right and protection), public pages you created, and people or open invitations with their own access to your pages – each to delete, stop or remove right there.
- **Sign-ins & changes** of the last 30 days with device and network, including failed attempts with your address.
- **Tips** that fit the account.

When someone signs in with a device not seen for 90 days, a security notice arrives as well.

## Security

With OIDC, Flowplan checks the discovery, issuer, audience, signature, PKCE, state and nonce. Sessions are random tokens, stored hashed in SQLite; cookies are `HttpOnly`, `SameSite=Lax` and `Secure` with HTTPS. Groups or roles are never taken from browser data.

- An account **deactivated** in the administration loses all sessions immediately; open live connections are closed within 15 seconds at the latest, as they are when read access is withdrawn.
- Every page carries a **content security policy**: scripts only run with a nonce that is new for every request, frames only come from the supported players (YouTube, Vimeo, Loom, Spotify, Figma, CodePen). The reverse proxy sets HSTS (usually active with Traefik/Coolify).
- Sessions can be revoked individually in the administration.
- Invitations to an e-mail address are only assigned after a sign-in with a confirmed address (`email_verified=true` with OIDC, the confirmation link for e-mail accounts).

## Common errors

| Symptom | Cause |
| --- | --- |
| An error about the redirect URI | The URI entered at the provider does not exactly match `APP_URL` + `/api/auth/callback`. |
| No administration visible | The group is missing in the token: check the scope, `OIDC_GROUPS_CLAIM` and the exact group name, then sign in again. |
| "Invalid request origin" | `APP_URL` differs from the address in use (e.g. `http` instead of `https`). |
| Sign-in refused | `OIDC_ALLOWED_GROUP` is set and the person is not a member. |
| "Create account" is missing | Sign-ups are closed: open them in the administration or invite the person. |
| A passkey cannot be created | `APP_URL` is not an HTTPS domain (an IP address or `http://` other than `localhost`). |
