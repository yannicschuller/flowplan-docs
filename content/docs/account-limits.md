---
keywords: Grenzen, Speicher, Speicherlimit, Kontingent, Gruppe, Verzeichnisgruppe, SCIM, Größte Datei, Upload-Grenze, Eigene Arbeitsbereiche, mehr Speicher, quota, limits
---

# Grenzen für Konten

Wie viel Speicher jemand bekommt, wie viele Arbeitsbereiche ihm gehören dürfen und wie groß eine Datei sein darf – als Standard der Instanz, für die Mitglieder einer Gruppe oder für eine einzelne Person.

**Mehr zum Thema:** [Benutzer verwalten](/user-management) · [KI-Kontingente](/ai-quotas)

Den Standard legst du unter **Administration → Grenzen & Aufbewahrung** fest ([Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung)), eigene Werte einer Person in ihrem Seitenfenster unter [Benutzer](/user-management#benutzer): **Speicherlimit** und unter **Weitere** **Eigene Arbeitsbereiche** und **Größte Datei**. Wie viel KI jemand nutzen darf, regeln die [KI-Kontingente](/ai-quotas) – mit derselben Auswahl an Gruppen.

## Grenzen pro Gruppe {since=0.11.1}

Unter **Grenzen & Aufbewahrung → Grenzen pro Gruppe** gibst du den Mitgliedern einer Gruppe mehr (oder weniger) als den [Standard](/administration#grenzen-aufbewahrung): **Speicher**, **Eigene Arbeitsbereiche** und **Größte Datei**. Die Gruppe wählst du unter **Gruppe hinzufügen** – dieselbe Auswahl wie bei den [KI-Kontingenten](/ai#fuer-admins):

- **Gruppen der Arbeitsbereiche**: zählen für ihre Mitglieder, egal in welchem Arbeitsbereich die Gruppe liegt. Auch über die [SSO-Zuordnungen](/sso-oidc) gefüllte Gruppen.
- **Verzeichnisgruppen (SCIM, LDAP, SSO)**: eine Gruppe deines Identitätsanbieters direkt nach ihrem Namen – eine über [SCIM](/scim-and-ldap#benutzer-bereitstellen-mit-scim) bereitgestellte Gruppe, eine LDAP-Gruppe oder eine Gruppe aus der SSO-Anmeldung. Sie braucht weder Arbeitsbereich noch Zuordnung und gilt auch für Konten mit E-Mail und Passwort, die das Verzeichnis als Mitglied führt. Unter **Verzeichnisgruppe nach Name** trägst du auch eine Gruppe ein, die das Verzeichnis noch nicht geschickt hat.

Leer heißt: Die Gruppe legt diese Grenze nicht fest. Für eine Person gilt je Grenze:

1. ihr eigener Wert (im Seitenfenster unter **Benutzer**),
2. sonst der großzügigste Wert ihrer Gruppen – 0 (unbegrenzt) schlägt jede Zahl,
3. sonst der Standard der Instanz.

Für Admins gelten keine Grenzen. Die Person sieht unter **Einstellungen → Konto & Sicherheit → Deine Grenzen**, woher ein Wert kommt („aus Gruppe Plus“). Änderungen gelten sofort, auch beim nächsten Hochladen; ist der Speicher voll oder eine Datei zu groß, nennt die Meldung die Grenze („Die Datei ist zu groß: Du kannst Dateien bis 10 MB hochladen.“).

**Link für mehr Speicher oder KI** (unter **Speicher und Uploads**): eine Adresse, die Personen unter **Deine Grenzen** sehen („Mehr Speicher oder KI? →“) – etwa die Seite, auf der sie mehr bekommen. Ein einfacher Link ohne Anmeldedaten; leer = kein Link.

Über SCIM: Ein Dienst mit SCIM-Token kann ein bestehendes Konto mit bestätigter Adresse verknüpfen, ohne es anzulegen – `POST /Users` mit `"urn:ietf:params:scim:schemas:extension:flowplan:2.0:User": {"linkExisting": true}` (ohne passendes Konto: 404) – und es dann per `PATCH /Groups/…` in eine Gruppe aufnehmen oder herausnehmen. Name, Adresse, Passwort und Zustand des Kontos bleiben dabei, wie sie sind, solange die Anfrage sie nicht nennt; deaktiviert wird ein Konto nur mit `"active": false` oder `DELETE /Users/…`.
