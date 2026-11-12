---
keywords: Sitzung, angemeldet bleiben, abgemeldet, Ablauf, Geräte, Session
---

# Angemeldet bleiben

Wie lange eine Sitzung dauert, legt die Administration unter **Administration → Anmeldung & SSO → Sitzungen** fest ([Administration](/user-management#anmeldung-sso)); ohne Einstellung dort gelten die Umgebungsvariablen und ihre Standards.

| Wo | Wie lange (Standard) | Einstellung · Variable |
| --- | --- | --- |
| Browser ohne **Angemeldet bleiben** | 8 Stunden nach der Anmeldung – auch wenn Flowplan offen ist | **Browser ohne „Angemeldet bleiben“** · `SESSION_HOURS` (1–24) |
| Browser mit **Angemeldet bleiben** | 7 Tage nach der letzten Nutzung, höchstens 30 Tage nach der Anmeldung | **„Angemeldet bleiben“ im Browser anbieten** · `SESSION_REMEMBER` (Standard aus), **Browser mit „Angemeldet bleiben“** · `SESSION_IDLE_HOURS` |
| Desktop- und Handy-App | 90 Tage nach der letzten Nutzung der App oder ihrer Widgets, höchstens 365 Tage nach der Anmeldung | **Desktop- und Mobil-Apps** · `SESSION_APP_REMEMBER` (Standard an), **Apps: Ende ohne Nutzung** · `SESSION_APP_DAYS` |

- **Im Browser** zeigt die Anmeldeseite das Kästchen **Angemeldet bleiben**, sobald die Administration es anbietet – für Passwort, Passkey und SSO (auch über den Umweg „Konto verbinden“). Gedacht ist es für eigene Geräte: Mit Haken lebt die Sitzung weiter, solange Flowplan genutzt wird. Die längste Dauer (`SESSION_MAX_DAYS`, Standard 30 Tage, nie kürzer als die Zeit ohne Nutzung) begrenzt, wie lange ein gestohlenes Cookie taugt.
- **Die Apps** laufen auf persönlichen Geräten und bleiben immer angemeldet – egal ob mit Passwort in der App oder mit Passkey bzw. SSO über den Browser angemeldet. Die Widgets halten die Sitzung ebenfalls am Leben. Die App muss die Anmeldung als ihre belegen; dass ihr Name im User-Agent steht, reicht nicht, denn den kann jeder Browser senden:
  - **Passkey, SSO oder „Im Browser anmelden“**: Die Übergabe zurück an die App ist der Beleg – einlösen kann sie nur die App, die die Anmeldung gestartet hat. Das funktioniert mit jeder App-Version.
  - **Passwort in der App**: Neuere Apps (iPhone, iPad und Android nach 1.0.5, Desktop nach 1.3.0) erzeugen beim ersten Start pro Server einen zufälligen Geräteschlüssel, bewahren ihn im Schlüsselspeicher des Systems auf (Schlüsselbund, Android Keystore, Schlüsselspeicher des Computers) und senden ihn mit dem Passwort. Die erste Anmeldung eines Kontos auf dem Gerät registriert den Schlüssel, spätere Anmeldungen brauchen denselben. Der Server speichert nur einen Hash.
  - **Ältere App-Versionen** (etwa 1.0.5) haben keinen Geräteschlüssel: Nach einer Anmeldung mit Passwort bleiben sie so lange angemeldet wie ein Browser – 8 Stunden oder mit **Angemeldet bleiben**, wo die Instanz es anbietet (das Kästchen erscheint dann auch in der App). Anmeldungen mit Passkey oder SSO behalten die Laufzeit der App, ebenso App-Sitzungen, die schon vorher bestanden. Wer das für die Instanz nicht will, stellt **Desktop- und Mobil-Apps** auf **Wie im Browser ohne „Angemeldet bleiben“** (`SESSION_APP_REMEMBER=false`). Zusätzlichen Schutz auf dem Handy gibt die **App-Sperre** in den Einstellungen der App (Face ID, Touch ID, Fingerabdruck oder Gerätecode, auf iPhone, iPad und Android).
- SSO-Sitzungen verlängern sich genauso. Gruppenänderungen beim Anbieter wirken über SCIM, den LDAP-Abgleich oder die nächste Anmeldung. Nur wenn `SESSION_GROUPS_HOURS` gesetzt ist, endet eine SSO-Sitzung, die angemeldet bleibt, schon nach so vielen Stunden: Die neue Anmeldung beim Anbieter holt die aktuellen Gruppen, so wirken `OIDC_ALLOWED_GROUP` und `OIDC_ADMIN_GROUP` auch ohne SCIM spätestens dann.
- Ein deaktiviertes Konto verliert den Zugriff sofort, wie bisher.
- Meldet sich dieselbe Person auf einem Gerät neu an (etwa weil die Sitzung abgelaufen ist), bleibt die Registrierung der App erhalten – Mitteilungen, Widgets, Live Activities und Kurzbefehle gehen auf die neue Sitzung über. Erst ausdrückliches **Abmelden** (in der App oder unter **Angemeldete Geräte**) entfernt sie.
- Kürzere Zeiten gelten ab der nächsten Anmeldung; längere verlängern Sitzungen, die angemeldet bleiben, bei ihrer nächsten Nutzung. Wer „Angemeldet bleiben“ oder das Angemeldet-Bleiben der Apps ausschaltet, beendet das Verlängern; laufende Sitzungen enden dann zu ihrem nächsten Ablauf.

**Einstellungen → Konto & Sicherheit → Angemeldete Geräte** listet alle eigenen Sitzungen mit Gerät, letzter Nutzung und Ende; **Abmelden** beendet eine einzelne, **Alle anderen Geräte abmelden** alle bis auf die aktuelle.
