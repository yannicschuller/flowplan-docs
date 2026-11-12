---
keywords: session, stay signed in, signed out, expiry, devices, remember me
---

# Stay signed in

How long a session lasts is set under **Administration → Sign-in & SSO → Sessions** ([Administration](/user-management#sign-in-sso)); without a setting there, the environment variables and their defaults apply.

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
