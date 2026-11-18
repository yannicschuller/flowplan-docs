---
keywords: apps, HTTP, HTTPS, own network, LAN, home network, certificate, self-signed, private CA, fingerprint
---

# Apps: own network and certificates

The apps for iPhone, iPad, Android and the desktop also connect to an instance on your own network without HTTPS, or with a certificate of your own. How the apps work otherwise is under [Mobile apps](/mobile-apps) and [Desktop app](/desktop-app).

## An instance on your own network without HTTPS

On first start (or under **Add profile**) you enter your instance's address. Without `http://` in front, the app always assumes HTTPS. It accepts a plain `http://` address only when the instance runs **on your local network** – public domains and addresses always need HTTPS.

| Works with `http://` | iPhone and iPad | Android |
| --- | --- | --- |
| Private IP addresses: `192.168.x.x`, `10.x.x.x`, `172.16.x.x`–`172.31.x.x` | yes | yes |
| Tailscale and CGNAT addresses `100.64.x.x`–`100.127.x.x`, link-local `169.254.x.x` | yes | yes |
| Local IPv6 (`fd…`, `fe80…`), `localhost` | yes | yes |
| Names without a dot, e.g. `http://nas:3000` | yes | yes |
| `.local` names, e.g. `http://flowplan.local:3000` | yes | yes |
| `.lan`, `.home.arpa`, `.internal`, e.g. `http://flowplan.lan` | **no** | yes |
| Public domains and IPs, also Tailscale names `*.ts.net` | no (HTTPS only) | no (HTTPS only) |

On iPhone and iPad, iOS allows unencrypted connections only to IP addresses, names without a dot and `.local` names. For an instance at `flowplan.lan`, enter its IP address there (`http://192.168.1.20:3000`) – or set up HTTPS. The app tells you so when connecting instead of showing an empty page. On the first connection iOS also asks whether Flowplan may access devices on your local network: tap **Allow**.

As soon as an `http://` address is in the field, the app warns before connecting:

- **Passwords and all content cross the network unencrypted.** That is fine only on a network you trust.
- **Without HTTPS there are no** passkeys, encrypted spaces, voice notes on pages and, on Android, no offline copy (on iPhone and iPad the app keeps the offline copy itself, so it works there).
- **Notifications** from an instance that is only reachable on your local network usually don't arrive: the [push relay](/configuration-ai-push#push-relay-and-end-to-end-encryption) has to reach the instance from the internet.

For real use, set up HTTPS, see [Without HTTPS](/installation#without-https). With a Tailscale name (`*.ts.net`) you get HTTPS even without a public domain.

## Own certificates

If your instance uses a self-signed certificate or a private certificate authority (CA), ideally install the CA certificate on the device:

- **iPhone/iPad:** download it (for example in Safari or via AirDrop), install it in **Settings → General → VPN & Device Management** and turn on full trust in **Settings → General → About → Certificate Trust Settings**. iOS requires the server name in the Subject Alternative Name and at most 825 days of validity.
- **Android:** **Settings → Security → Encryption & credentials → Install a certificate → CA certificate**. The app trusts CAs you installed yourself.

Without an installed certificate, the app shows issuer, validity and SHA-256 fingerprint when connecting. On **Android** you can then choose **Trust this certificate**: the app trusts exactly that certificate, only for that instance. If it changes, the app loads nothing and asks again; you can remove it in the app settings. On Android, the offline copy works only with an installed CA, not with a certificate confirmed this way. On **iPhone and iPad** the app explains how to install the certificate. From app version 1.0.12.
