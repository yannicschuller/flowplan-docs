---
keywords: sign-in, login, password, passkey, 2fa, session, forgot password
---

# Sign-in: password, passkeys and two-factor

Flowplan signs people in with e-mail and password, optionally with passkeys. In addition – or instead – sign-in can go through an OpenID Connect provider (single sign-on), whose groups decide who administers the instance.

The sign-in page shows the fastest way first: one large button for the way you last signed in with on this device (with “Last used” below it), the other ways as buttons underneath. **With e-mail and password** opens the form in place; **Create account** – when sign-ups are open – is in the line below. On a first visit single sign-on comes first if the instance offers it, otherwise the passkey, otherwise the form; ways the instance has turned off are not shown at all, and an instance with passwords only shows the form right away. On phones the app icon and “Welcome back.” are at the top and the buttons at the bottom, within reach of your thumb. From 960 px wide the page is split: on the left a panel in Flowplan's colours with the logo, on the right the sign-in. Sign-up, password reset, setting up the second factor and linking accounts use the same frame.

**More on this topic:** [Stay signed in](/sessions) · [Single sign-on with OIDC](/sso-oidc) · [Users from a directory: SCIM and LDAP](/scim-and-ldap)

## E-mail and password

Without further setup you sign in with e-mail and password – via **With e-mail and password** – or with a passkey once you have created one.

- **The first account** of a new instance administers it: the sign-in page then offers **Create account** right away. This account sees the **Administration**.
- **Instances reachable from the internet:** until the first account exists, anyone who opens the address could create it and administer the instance. Set `FLOWPLAN_SETUP_TOKEN` to a random value (e.g. `openssl rand -hex 24`): the first account can then only be created with the setup link `https://flowplan.example.com/register?setup=<token>`; without it the page offers no sign-up. The token also protects **Restore from a backup** on the setup screen. Once the first account exists the token has no effect. Without a token and with an `APP_URL` that does not point to this machine, Flowplan warns at start in the log and with a note on the setup screen. The Helm chart generates the token itself. If two people sign up first at the same moment, only one of them becomes administrator; the other gets a note. With single sign-on you can also never use the link – the administrators then come through the group in `OIDC_ADMIN_GROUP`, and everyone else joins by invitation.
- **Further accounts** are created when the administrators open sign-ups under **Instance → Allow sign-ups with e-mail and password** – or for addresses with an [invitation](/workspaces-and-permissions): the invitation link opens the form with the invited address and creates an account only for it; without e-mail it works only through the link. Workspaces someone was invited to appear as soon as the address is confirmed via the e-mail link.
- **Confirming the e-mail address:** if the instance sends e-mail (`SMTP_*` set), a new account signs in only after the address has been confirmed with the link from the e-mail – the link signs in right away. Trying earlier shows a notice and sends the link again (at most every five minutes); **Send the link again** also works after signing up. Without e-mail every account counts as confirmed immediately, as does the instance's first account. Admins can confirm an address by hand under **Administration → Users**, with **Mark as confirmed** in the account's side panel; resetting the password via a link confirms it too. If the address already has an account, signing up shows the same as for a new address, and the account's owner gets a note by e-mail instead – so the page does not reveal which addresses have an account.

  If you open the confirmation link in a different browser from the one you registered in, you set a new password there – the one chosen at registration no longer works. This way nobody can create and keep an account for someone else's address in advance.
- **Passwords** have at least 10 characters and are stored with scrypt. After 8 failed attempts for an account from the same IP address (or 30 failed attempts from one IP address in total) that address pauses for 15 minutes. Someone who knows your address cannot lock you out this way: from other IP addresses you still sign in. Against attempts from many IP addresses at once, every sign-in to an account with more than 10 failures in 15 minutes waits a little longer (up to 5 seconds), and after 100 the account is locked for the rest of the 15 minutes. Without a known client address (see `FLOWPLAN_TRUSTED_PROXIES`) the limit of 8 applies to the account itself. The same holds for signing in with LDAP. These limits – like those for codes, passkeys, confirming important steps and passwords of shared links – hold under many parallel requests too: every attempt counts before the password is checked.
- **Forgot password**: with [e-mail delivery](/configuration-integrations#e-mail-smtp) set up, **Forgot?** next to the password field on the sign-in page sends a link that is valid for two hours. Without e-mail, the administrators create a link to hand over under **Users**, with **Password → Create link** in the account's side panel. After a reset all previous sessions are ended.
- **Admin right**: under **Users**, the administrators pass it on (**Make admin**) or take it away; someone always has to administer the instance.
- Everyone changes their name and password under **Settings → Account & security** (card **Profile**, or **Change password …** in **Sign-in & security**). The name is saved when you leave the field. After a password change, turning on the authenticator app and removing a passkey, all other sessions end; the current one stays signed in. Starting a demo while signed in signs the previous account out. A wrong current password when changing it counts like a wrong code: too many failures block it for 15 minutes.
- Sign-ups and "Forgot password" are limited per address and network address (at most one reset e-mail every five minutes per account).

`FLOWPLAN_LOCAL_LOGIN=false` turns off e-mail, password and passkeys – then only single sign-on remains.

Under **Settings → Account & security**, the **Sign-in methods** card shows how you sign in: e-mail and password, the directory (LDAP) and connected SSO identities with provider, address, date connected and last use. That is where you connect and disconnect SSO identities and remove or set the password – see [Connect an existing account to SSO](/sso-oidc#connect-an-existing-account-to-sso).

## Passkeys

With a passkey you sign in with your fingerprint, face recognition or device PIN, without a password. Passkeys are created under **Settings → Account & security → Add a passkey**; afterwards **Sign in with a passkey** on the sign-in page is all it takes.

Under **Settings → Account & security**, the card **Sign-in & security** lists password, two-factor sign-in, passkeys and the signed-in devices, each with its state (“Off”, “On · 8 codes left”, “2 passkeys”). **Delete account** is at the very bottom, in the **Danger zone**. Addresses such as `/#settings/account/passkeys` or `/#settings/account/two-factor` open a card directly.

- Passkeys exist for accounts with e-mail and password. SSO accounts sign in with their provider, which may offer passkeys itself.
- Passkeys belong to the domain in `APP_URL`. They need HTTPS (or `http://localhost` during development); a bare IP address does not work. Whoever changes the domain creates the passkeys anew.
- A passkey can be removed in the settings at any time.
- In the desktop app, **Sign in with a passkey** and **Sign in with SSO** open the sign-in in the default browser and hand it back to the app afterwards ([Desktop apps](/operations#desktop-apps)).

## Two-factor sign-in

Accounts with e-mail and password can add an authenticator app (two-factor authentication, 2FA), such as Aegis, 2FAS, Google Authenticator or 1Password.

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
- Lost your phone and your codes? An administrator can reset two-factor sign-in ([Administration → Users](/user-management#users)).

Admins can require two-factor sign-in for all local accounts or only for admins ([Administration → Sign-in & SSO](/user-management#sign-in-sso)). Accounts without an app and without a passkey then set up a second factor right after signing in, before using Flowplan; accounts with a passkey but no app sign in with the passkey.

> [!IMPORTANT]
> The apps' keys are stored encrypted – with `FLOWPLAN_ENCRYPTION_KEY`, otherwise `FLOWPLAN_SECRETS_KEY`, otherwise with the generated file `secrets.key` in the data folder ([Configuration](/configuration-storage#stored-secrets)). Be sure to back up this file or the key: the instance backup deliberately leaves it out. Without it, only the recovery codes work after a restore.

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
