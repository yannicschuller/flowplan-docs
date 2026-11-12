---
keywords: Anmeldung, Login, Passwort, Passkey, 2FA, Sitzung, Passwort vergessen
---

# Anmeldung: Passwort, Passkeys und Zwei-Faktor

Flowplan meldet Personen mit E-Mail und Passwort an, auf Wunsch mit Passkeys. Zusätzlich – oder stattdessen – geht die Anmeldung über einen OpenID-Connect-Anbieter (Single Sign-on), dessen Gruppen bestimmen, wer die Instanz verwaltet.

Die Anmeldeseite zeigt den schnellsten Weg zuerst: einen großen Knopf für den Weg, mit dem du dich auf diesem Gerät zuletzt angemeldet hast (darunter „Zuletzt verwendet“), die übrigen Wege als Knöpfe darunter. **Mit E-Mail und Passwort** öffnet das Formular an Ort und Stelle; **Konto erstellen** steht – wenn die Registrierung offen ist – in der Zeile darunter. Beim ersten Besuch steht Single Sign-on vorn, wenn die Instanz es anbietet, sonst der Passkey, sonst das Formular; Wege, die die Instanz abgeschaltet hat, erscheinen gar nicht, und eine Instanz nur mit Passwort zeigt gleich das Formular. Auf dem Telefon stehen oben das App-Symbol und „Willkommen zurück.“, die Knöpfe unten in Reichweite des Daumens. Ab 960 px Breite ist die Seite geteilt: links eine Fläche in den Farben von Flowplan mit Logo, rechts die Anmeldung. Registrierung, Passwort zurücksetzen, die Einrichtung des zweiten Faktors und das Verbinden von Konten haben denselben Rahmen.

**Mehr zum Thema:** [Angemeldet bleiben](/sessions) · [Single Sign-on mit OIDC](/sso-oidc) · [Benutzer aus dem Verzeichnis: SCIM und LDAP](/scim-and-ldap)

## E-Mail und Passwort

Ohne weitere Einrichtung meldest du dich mit E-Mail und Passwort an – über **Mit E-Mail und Passwort** – oder mit einem Passkey, sobald du einen angelegt hast.

- **Das erste Konto** einer neuen Instanz verwaltet sie: Die Anmeldeseite bietet dann direkt **Konto erstellen** an. Dieses Konto sieht die **Administration**.
- **Instanzen, die aus dem Internet erreichbar sind:** Solange es noch kein Konto gibt, könnte jede Person, die die Adresse öffnet, das erste Konto anlegen und die Instanz verwalten. Setze `FLOWPLAN_SETUP_TOKEN` auf einen zufälligen Wert (z. B. `openssl rand -hex 24`): Das erste Konto lässt sich dann nur über den Einrichtungslink `https://flowplan.example.com/register?setup=<token>` anlegen, ohne ihn bietet die Seite keine Registrierung an. Der Token schützt auch **Aus Sicherung wiederherstellen** auf dem Einrichtungsbildschirm. Sobald das erste Konto existiert, wirkt der Token nicht mehr. Ohne Token und mit einer `APP_URL`, die nicht auf diesen Rechner zeigt, warnt Flowplan beim Start im Log und mit einem Hinweis auf dem Einrichtungsbildschirm. Das Helm-Chart erzeugt den Token selbst. Melden sich zwei Personen gleichzeitig als Erste an, wird nur eine davon Admin; die andere bekommt einen Hinweis. Mit Single Sign-on kannst du den Link auch nie benutzen – Admins kommen dann über die Gruppe aus `OIDC_ADMIN_GROUP`, alle anderen per Einladung.
- **Weitere Konten** entstehen, wenn die Administration unter **Instanz → Registrierung mit E-Mail und Passwort erlauben** die Registrierung öffnet – oder für Adressen mit einer [Einladung](/workspaces-and-permissions): Der Einladungslink öffnet das Formular mit der eingeladenen Adresse und legt nur für sie ein Konto an; ohne E-Mail-Versand geht es nur über den Link. Eingeladene Arbeitsbereiche erscheinen, sobald die Adresse per E-Mail-Link bestätigt ist.
- **E-Mail bestätigen:** Verschickt die Instanz E-Mails (`SMTP_*` gesetzt), meldet sich ein neues Konto erst an, nachdem die Adresse über den Link in der E-Mail bestätigt ist – der Link meldet direkt an. Wer es vorher versucht, bekommt einen Hinweis und den Link erneut (höchstens alle fünf Minuten); **Link erneut senden** geht auch nach der Registrierung. Ohne E-Mail-Versand gilt jedes Konto sofort als bestätigt, ebenso das erste Konto der Instanz. Admins können eine Adresse unter **Administration → Benutzer** im Seitenfenster des Kontos mit **Als bestätigt markieren** von Hand bestätigen; ein Passwort-Zurücksetzen per Link bestätigt sie ebenfalls. Gibt es für die Adresse schon ein Konto, zeigt die Registrierung dasselbe wie bei einer neuen Adresse, und die Inhaberin bzw. der Inhaber bekommt stattdessen einen Hinweis per E-Mail – so verrät die Seite nicht, welche Adressen ein Konto haben.

  Öffnest du den Bestätigungslink in einem anderen Browser als dem, in dem du dich registriert hast, legst du dort ein neues Passwort fest – das bei der Registrierung gewählte gilt dann nicht mehr. So kann niemand ein Konto für eine fremde Adresse vorab anlegen und behalten.
- **Passwörter** haben mindestens 10 Zeichen und werden mit scrypt gespeichert. Nach 8 Fehlversuchen für ein Konto von derselben IP-Adresse (oder 30 Fehlversuchen von einer IP-Adresse insgesamt) ist dort für 15 Minuten Pause. Wer deine Adresse kennt, kann dich so nicht aussperren: Von anderen IP-Adressen meldest du dich weiter an. Gegen Versuche von vielen IP-Adressen zugleich wartet jede Anmeldung bei einem Konto mit mehr als 10 Fehlversuchen in 15 Minuten etwas länger (bis zu 5 Sekunden), und nach 100 ist das Konto für den Rest der 15 Minuten gesperrt. Ohne bekannte Client-Adresse (siehe `FLOWPLAN_TRUSTED_PROXIES`) gilt die Grenze von 8 für das Konto selbst. Dasselbe gilt für die Anmeldung mit LDAP. Diese Grenzen – wie die für Codes, Passkeys, Bestätigungen wichtiger Schritte und Passwörter geteilter Links – halten auch bei vielen gleichzeitigen Anfragen: Jeder Versuch zählt, bevor das Passwort geprüft wird.
- **Passwort vergessen**: Mit eingerichtetem [E-Mail-Versand](/configuration-integrations#e-mail-smtp) schickt die Anmeldeseite über **Vergessen?** neben dem Passwortfeld einen Link, der zwei Stunden gilt. Ohne E-Mail erzeugt die Administration unter **Benutzer** im Seitenfenster des Kontos mit **Passwort → Link erstellen** einen Link zum Weitergeben. Nach dem Zurücksetzen sind alle bisherigen Sitzungen beendet.
- **Admin-Recht**: Unter **Benutzer** gibt die Administration es weiter (**Zum Admin machen**) oder entzieht es; eine Person muss die Instanz immer verwalten.
- Name und Passwort ändert jede Person unter **Einstellungen → Konto & Sicherheit** (Karte **Profil** bzw. **Passwort ändern …** in **Anmeldung & Sicherheit**). Der Name wird gespeichert, sobald du das Feld verlässt. Nach einer Passwortänderung, dem Einschalten der Authenticator-App und dem Entfernen eines Passkeys sind alle anderen Sitzungen beendet; die aktuelle bleibt angemeldet. Wer angemeldet eine Demo startet, ist mit dem bisherigen Konto abgemeldet. Ein falsches bisheriges Passwort beim Ändern zählt wie ein falscher Code: Zu viele Fehlversuche sperren für 15 Minuten.
- Registrierung und „Passwort vergessen“ sind pro Adresse bzw. Netzwerkadresse begrenzt (höchstens eine Reset-Mail alle fünf Minuten pro Konto).

`FLOWPLAN_LOCAL_LOGIN=false` schaltet E-Mail, Passwort und Passkeys ab – dann gibt es nur Single Sign-on.

Unter **Einstellungen → Konto & Sicherheit** zeigt die Karte **Anmeldemethoden**, womit du dich anmeldest: E-Mail und Passwort, das Verzeichnis (LDAP) und verbundene SSO-Konten mit Anbieter, Adresse, Datum der Verbindung und letzter Nutzung. Dort verbindest und trennst du SSO-Konten und entfernst oder setzt das Passwort – siehe [Bestehendes Konto mit SSO verbinden](/sso-oidc#bestehendes-konto-mit-sso-verbinden).

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
- Telefon verloren und keine Codes mehr? Die Administration kann die Zwei-Faktor-Anmeldung zurücksetzen ([Administration → Benutzer](/user-management#benutzer)).

Admins können die Zwei-Faktor-Anmeldung für alle lokalen Konten oder nur für Admins verlangen ([Administration → Anmeldung & SSO](/user-management#anmeldung-sso)). Konten ohne App und ohne Passkey richten dann direkt nach der Anmeldung einen zweiten Faktor ein, bevor sie Flowplan nutzen; Konten mit Passkey, aber ohne App melden sich mit dem Passkey an.

> [!IMPORTANT]
> Die Schlüssel der Apps werden verschlüsselt gespeichert – mit `FLOWPLAN_ENCRYPTION_KEY`, sonst `FLOWPLAN_SECRETS_KEY`, sonst mit der automatisch angelegten Datei `secrets.key` im Datenordner ([Konfiguration](/configuration-storage#gespeicherte-geheimnisse)). Diese Datei oder den Schlüssel unbedingt mitsichern: Die Instanzsicherung enthält sie bewusst nicht. Ohne sie funktionieren nach einer Wiederherstellung nur noch die Wiederherstellungscodes.

## Sicherheitscheck

**Einstellungen → Sicherheitscheck** (`/#settings/security`) zeigt jeder Person, wie gut ihr Konto geschützt ist – zugeschnitten auf die Art der Anmeldung:

- **Der Check:** zweiter Faktor, Passkey und übrige Wiederherstellungscodes (bei E-Mail-Konten), bestätigte E-Mail-Adresse, Geräte, die seit über einem Monat ungenutzt sind, API-Tokens ohne Ablauf oder seit drei Monaten ungenutzt, Links zum Bearbeiten ohne Passwort und Ablaufdatum, ob Sicherheitshinweise per Push oder E-Mail ankommen, und fehlgeschlagene Anmeldungen am eigenen Konto. Offene Punkte stehen oben, jeweils mit dem Weg zur Lösung. Bei SSO und LDAP verweist er auf den Anbieter bzw. das Verzeichnis.
- **Was du geteilt hast:** eigene Freigabelinks (mit Recht und Schutz), öffentliche Seiten, die du angelegt hast, und Personen oder offene Einladungen mit eigenem Zugriff auf deine Seiten – jeweils direkt zu löschen, zu beenden oder zu entziehen.
- **Anmeldungen & Änderungen** der letzten 30 Tage mit Gerät und Netz, auch fehlgeschlagene Versuche mit deiner Adresse.
- **Tipps**, passend zum Konto.

Meldet sich jemand mit einem Gerät an, das 90 Tage nicht dabei war, kommt außerdem ein Sicherheitshinweis.

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
