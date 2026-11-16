---
keywords: sso, oidc, keycloak, authentik, entra id, azure ad, google, okta, yunohost, authelia, forward auth, reverse proxy, remote-user
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

## Check the admin group {since=0.9.7}

People who sign in with SSO get the **Administration** when the group from `OIDC_ADMIN_GROUP` is among the groups the provider sends in the claim from `OIDC_GROUPS_CLAIM` (default `groups`; a path such as `realm_access.roles` works too). Flowplan compares the names **exactly**, including case and slashes.

Whether it works shows under **Administration → Users** in the person's side panel: **Groups from the provider (last sign-in)** shows which claim was read, which groups arrived and whether the admin group was among them ([Users](/user-management#users)). Typical causes when it is missing:

- **"missing from token and userinfo":** the provider does not send the claim – usually the group mapper or the scope for groups (`OIDC_SCOPES`) is missing, or the claim has another name than `OIDC_GROUPS_CLAIM`.
- **Keycloak with "Full group path":** the group then arrives as `/flowplan-admins`, with a leading slash – which does not match `OIDC_ADMIN_GROUP=flowplan-admins`. Turn **Full group path** off in the "Group Membership" mapper, or enter the name exactly as it arrives (`OIDC_ADMIN_GROUP=/flowplan-admins`; for sub-groups the whole path, such as `/company/flowplan-admins`).
- **Entra ID:** object IDs arrive instead of names; enter the ID as `OIDC_ADMIN_GROUP`.

The display is renewed at every SSO sign-in; after a change at the provider or to the variables, the person signs in again once.

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

## Sign-in through a reverse proxy (YunoHost, Authelia, Authentik) {since=0.9.8}

If a portal in front of Flowplan already signs people in – YunoHost's SSO (SSOwat), or forward auth with Authelia or Authentik –, Flowplan takes that sign-in over: the proxy names the person in a request header, and Flowplan signs them in. Off while `AUTH_PROXY_USER_HEADER` is empty.

> **Warning:** Only turn this on when Flowplan's port is reachable **through the proxy alone** – anyone reaching it directly could set the header and sign in as anyone. The headers count only on connections from `AUTH_PROXY_TRUSTED_PROXIES` (default `127.0.0.1,::1`): the address of the TCP connection, never `X-Forwarded-For`. Bind the port to `127.0.0.1` (Docker: `127.0.0.1:3000:3000`) or to a network only the proxy reaches, and let the proxy drop such headers from the browser. SSOwat does that for every header starting with `ynh_`; in nginx `proxy_set_header` overwrites them.

### How it works

- **Signing in:** A request without a Flowplan session that carries the header from a trusted proxy gets a normal session – already on the first page load.
- **Which account:** the account that signed in through the proxy before (by user name, ignoring case); else an [LDAP](/scim-and-ldap#sign-in-with-ldap) or SCIM account with that user name; else a directory or SSO account with the same confirmed e-mail address; else a new account (unless `AUTH_PROXY_AUTO_CREATE=false`). An account with e-mail and password is never taken over – the sign-in is refused, as with LDAP. Disabled accounts are refused.
- **Name and address** come from the proxy at every sign-in (UTF-8, accents and other scripts included); the proxy vouches for the address.
- **Switching or signing out at the portal** ends the session the proxy started. Sessions from password, passkey, OIDC or the apps do not depend on the headers; API tokens, share links and webhooks work without the portal.
- **Signing out in Flowplan** leads to `AUTH_PROXY_LOGOUT_URL` – without it, the next page load signs you in again.
- **Sign-in page:** `AUTH_PROXY_LOGIN_URL` adds a button such as **Sign in with YunoHost** (name from `AUTH_PROXY_NAME`). `AUTH_PROXY_ONLY=true` hides password, passkeys and sign-up; `FLOWPLAN_LOCAL_LOGIN=false` also turns password sign-in off on the server.
- **Admins and groups:** with `AUTH_PROXY_GROUPS_HEADER`, `OIDC_ADMIN_GROUP` and the [SSO group mappings](#map-sso-groups-to-workspaces) work as with OIDC; without groups (YunoHost), `AUTH_PROXY_ADMIN_USERS` names the admins. The second factor is the portal's business, as with SSO.

**Administration → Sign-in & SSO** shows the settings read-only; trusted proxies beyond this machine are warned about there and under **Administration → Security**.

### Variables

| Variable | Default | Meaning |
| --- | --- | --- |
| `AUTH_PROXY_USER_HEADER` | *empty* | Header with the user name (`YNH_USER`, `Remote-User`). Empty: off. |
| `AUTH_PROXY_EMAIL_HEADER` | *empty* | Header with the e-mail address. |
| `AUTH_PROXY_NAME_HEADER` | *empty* | Header with the full name; without it the user name. |
| `AUTH_PROXY_GROUPS_HEADER` | *empty* | Header with the groups, separated by `,` or `\|`. |
| `AUTH_PROXY_TRUSTED_PROXIES` | `127.0.0.1,::1` | Addresses or networks (`172.18.0.0/16`) the headers count from. |
| `AUTH_PROXY_LOGIN_URL` | *empty* | The portal's sign-in page; `{return}` is the address to come back to, `{return_b64}` the same in Base64. |
| `AUTH_PROXY_LOGOUT_URL` | *empty* | The portal's sign-out page after signing out (also with `{return}`). |
| `AUTH_PROXY_NAME` | `SSO` | The portal's name on the sign-in button. |
| `AUTH_PROXY_ONLY` | `false` | `true`: the sign-in page shows the portal only. |
| `AUTH_PROXY_AUTO_CREATE` | `true` | `false`: only people with an account sign in. |
| `AUTH_PROXY_ADMIN_USERS` | *empty* | User names (comma-separated) that administer the instance. |
| `AUTH_PROXY_DEBUG` | `false` | `true`: one log line per decision, with user names only. |

### Example: YunoHost

The YunoHost package gives the app the permission "visitors" with the auth header on: portal users bring their headers, everyone else still reaches Flowplan (apps with tokens, share links, webhooks). Flowplan listens on `127.0.0.1`.

```dotenv
AUTH_PROXY_USER_HEADER=YNH_USER
AUTH_PROXY_EMAIL_HEADER=YNH_USER_EMAIL
AUTH_PROXY_NAME_HEADER=YNH_USER_FULLNAME
AUTH_PROXY_LOGIN_URL=https://example.org/yunohost/sso/?r={return_b64}
AUTH_PROXY_LOGOUT_URL=https://example.org/yunohost/sso/?action=logout
AUTH_PROXY_NAME=YunoHost
AUTH_PROXY_ADMIN_USERS=alice
```

### Example: Authelia (nginx)

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

**Authentik** (forward auth) sends `X-authentik-username`, `X-authentik-email`, `X-authentik-name` and `X-authentik-groups`. With Flowplan in Docker and the proxy on the host, the connection comes from the Docker network (often `172.17.0.1`): trust exactly that address. `AUTH_PROXY_DEBUG=true` logs when a header came from a proxy that is not trusted.
