---
keywords: sso, oidc, keycloak, authentik, entra id, azure ad, google, okta
---

# Single sign-on with OIDC

Sign in through your own identity provider – Keycloak, Authentik, Entra ID, Google, Okta or any OpenID Connect service – with groups for admins and workspaces.

Optional. With `OIDC_ISSUER` set, the sign-in page shows **Sign in with SSO**; new people are created on their first sign-in. E-mail accounts and SSO accounts can exist side by side.

## Create a client at the provider

Register a **confidential web client** – or a **public client**: if `OIDC_CLIENT_SECRET` is empty, Flowplan signs in without a secret and relies on PKCE alone. That suits providers that serve many instances with one client. Providers that sign ID tokens with the client secret only (HS256) need a confidential client.

| Setting | Value |
| --- | --- |
| Redirect URI | `https://flowplan.example.com/api/auth/callback` |
| Flow | Authorization code with PKCE (S256) |
| Scopes | `openid profile email` and the scope for groups (often `groups`) |
| Groups | must be in the signed ID token or in the UserInfo answer |

The redirect URI is always `APP_URL` plus `/api/auth/callback`.

## Variables

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
| `SESSION_HOURS` | How long a browser session is valid in hours, as long as "Stay signed in" is not used; the apps stay signed in (see [Stay signed in](/sessions)). |

## Group names with common providers

- **Keycloak**: add the "Group Membership" mapper to the client, token claim name `groups`, turn off "Full group path" – otherwise the group is called `/flowplan-admins`. For realm roles use `OIDC_GROUPS_CLAIM=realm_access.roles` instead.
- **Authentik**: the `profile` scope already delivers `groups` with the group names – a scope `groups` is not needed. The issuer is the provider's address with the trailing slash, e.g. `https://auth.example.org/application/o/flowplan/`. Without a **signing key** on the provider Authentik signs the ID token with the client secret (HS256); Flowplan accepts that from version 0.8.3 on. With a signing key (RS256) Flowplan also checks the signature against the provider's published keys. When you create the OAuth2 provider through the API, set `grant_types` explicitly to `["authorization_code"]` (plus `"refresh_token"` if tokens should be refreshed): without it, Authentik 2026.8 gives it an empty list, and every sign-in fails with `invalid_request` ("The request is otherwise malformed"), which doesn't point at the cause.
- **Zitadel**: roles are under `urn:zitadel:iam:org:project:roles`; create a claim of your own with an action or enter the path.
- **Entra ID**: configure the groups claim in the token. Entra delivers object IDs by default; then enter the admin group's ID as `OIDC_ADMIN_GROUP`.

## When SSO sign-in fails

The server log names the reason: a line `OIDC sign-in failed:` with the kind of error, its code and – if the provider answered with an error – its `error` and `error_description` (never tokens or secrets). Common causes:

- **Redirect URI**: the provider must allow exactly `<APP_URL>/api/auth/callback`. `APP_URL` has to be the address in the browser – otherwise the provider rejects the redirect or the sign-in cookie is missing ("Sign-in expired").
- **Issuer**: `OIDC_ISSUER` must match the `issuer` in the provider's discovery character for character, including a trailing slash.
- **Client secret** wrong, or a secret set for a client the provider treats as public (or none for a confidential one): the token endpoint answers `invalid_client`.
- **`unexpected JWT "alg"`**: the provider signs ID tokens with another algorithm than it announces in its discovery.

## Connect an existing account to SSO

An account can sign in several ways: with e-mail and password, through LDAP and through one or more SSO identities (OIDC). Whoever created a local account first and gets SSO later connects the two – instead of ending up with a second profile.

**From the settings:** Under **Settings → Account & security → Sign-in methods**, choose **Connect SSO …**, confirm with your password, a code from the authenticator app or a passkey, then sign in with the provider. From then on the SSO identity (provider and subject) belongs to your account; you sign in with either. The flow only works for your account and the session you started it in, for ten minutes.

- If the SSO identity already belongs to another Flowplan account, nothing is connected. Ask the administrators to [merge the two accounts](/en/user-management#merge-accounts).
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

## Map SSO groups to workspaces

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
