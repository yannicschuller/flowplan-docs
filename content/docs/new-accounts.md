---
keywords: Konto anlegen, Benutzer anlegen, Benutzer hinzufügen, neues Konto, Personen hinzufügen, Registrierung, Einladung, Familienmitglied, create user, add user
new: personen-hinzufuegen 2026-11-22
---

# Neue Konten

Wie Personen zu einem Konto kommen – sie registrieren sich selbst, werden eingeladen, melden sich über SSO oder LDAP an, ihr Identitätsanbieter legt sie über SCIM an, oder du legst das Konto für sie an.

**Mehr zum Thema:** [Benutzer verwalten](/user-management) · [Grenzen für Konten](/account-limits)

## Personen hinzufügen

Ein Konto entsteht auf einem dieser Wege:

- **Selbst registrieren**: Ist unter **Anmeldung & SSO** die **Registrierung mit E-Mail und Passwort** an, legt jede Person auf der Anmeldeseite mit **Konto erstellen** ein Konto an. Ohne diese Einstellung geht das nur für das erste Konto der Instanz und für eingeladene Adressen ([E-Mail und Passwort](/sign-in#e-mail-und-passwort)).
- **Einladung in einen Arbeitsbereich**: Unter **Einstellungen → Mitglieder → Mitglied einladen** lädt ein Eigentümer eine E-Mail-Adresse ein. Mit der Einladung entsteht ein Konto für genau diese Adresse, auch wenn die Registrierung sonst zu ist ([Mitglieder einladen](/workspaces-and-permissions#mitglieder-einladen)). Mit einem [Einladungslink für mehrere Personen](/workspaces-and-permissions#einladungslinks-fuer-mehrere-personen) legt jede Person, die ihn hat, ein Konto an, solange er gilt.
- **Single Sign-on**: Mit einem OIDC-Anbieter entsteht das Konto bei der ersten Anmeldung über **Mit SSO anmelden**; das Admin-Recht kommt aus der Gruppe beim Anbieter. `OIDC_NEW_ACCOUNTS=false` lässt nur bestehende Konten herein ([SSO mit OIDC](/sso-oidc)).
- **LDAP und SCIM**: Mit einem LDAP-Verzeichnis entsteht das Konto bei der ersten Anmeldung mit den Zugangsdaten aus dem Verzeichnis ([Anmeldung mit LDAP](/scim-and-ldap#anmeldung-mit-ldap)); mit SCIM legt dein Identitätsanbieter Konten an, bevor sich jemand anmeldet, und deaktiviert sie wieder ([SCIM](/scim-and-ldap#benutzer-bereitstellen-mit-scim)).

Wer bei der ersten Anmeldung noch in keinem Arbeitsbereich ist, bekommt einen eigenen – „Mein Arbeitsbereich“, mit der Willkommensseite oder dem [Startinhalt](/starter-content), den du festgelegt hast. Neue Konten mit E-Mail und Passwort bekommen kein Admin-Recht – außer dem ersten Konto der Instanz; du vergibst es unter **Benutzer** in der **Rolle**.

### Ein Konto für jemanden einrichten

Etwa für ein Familienmitglied, das seinen eigenen Platz bekommen soll:

::: steps

1. Lege einen Arbeitsbereich für die Person an: oben in der Seitenleiste auf den Namen des Arbeitsbereichs → **Arbeitsbereich erstellen**.
2. Lade sie dort unter **Einstellungen → Mitglieder → Mitglied einladen** mit ihrer E-Mail-Adresse ein. Verschickt deine Instanz keine E-Mails, kopierst du unter **Ausstehende Einladungen** mit **Link kopieren** den Einladungslink und schickst ihn ihr selbst.
3. Sie öffnet die Einladung, legt ein Passwort fest und landet in dem Arbeitsbereich.
4. Unter **Einstellungen → Mitglieder** gibst du ihr die Rolle **Eigentümer**. Willst du ihre Seiten nicht mitlesen können, verlässt du den Arbeitsbereich danach unter **Einstellungen → Allgemein** (**Gefahrenzone**). Ihre privaten Bereiche gehören ohnehin nur ihr: Admins und Eigentümer sehen sie nur, wenn sie geteilt werden ([Was Admins sehen](/user-management#was-admins-sehen)). {since=0.11.5}

:::

Oder sie registriert sich selbst: Schalte dafür die Registrierung mit E-Mail und Passwort ein (und danach wieder aus, wenn du magst). Dann bekommt sie „Mein Arbeitsbereich“, in dem nur sie Mitglied ist.

Danach findest du das Konto unter **Benutzer**; im Seitenfenster passt du bei Bedarf **Speicherlimit** und **Einstellungsstufe** an.

## Konto anlegen

Mit **Konto anlegen** über der [Tabelle der Benutzer](/user-management#benutzer) richtest du ein Konto mit E-Mail und Passwort für jemand anderen ein – auch wenn die Registrierung geschlossen ist. Du gibst **Name**, **E-Mail-Adresse** und **Rolle** (**Mitglied** oder **Admin**) an; **Auch einen Arbeitsbereich für die Person anlegen** (an) legt gleich einen eigenen Arbeitsbereich mit dem [Startinhalt](/starter-content) neuer Konten an, vorbelegt mit „Adas Arbeitsbereich“ – den Namen kannst du ändern. Ohne ihn bekommt die Person bei der ersten Anmeldung wie jedes neue Konto „Mein Arbeitsbereich“, wenn sie bis dahin in keinem Mitglied ist. Es gelten dieselben Regeln wie bei der Registrierung: Eine Adresse, zu der es schon ein Konto gibt (egal in welcher Schreibweise und wie es sich anmeldet), wird abgelehnt, und die Grenzen der Instanz gelten auch hier. {since=0.11.1}

Das Konto hat noch kein Passwort. Die Person legt es mit einem Link fest, der **7 Tage** und nur einmal gilt, und ist danach direkt angemeldet:

- **Verschickt die Instanz E-Mails**, bekommt die Person den Link per E-Mail („Dein Flowplan-Konto wurde angelegt“). Wer ihn öffnet, beweist, dass ihm das Postfach gehört: Die Adresse gilt danach als bestätigt, und Einladungen an sie werden übernommen.
- **Ohne E-Mail-Versand** zeigt der Dialog den Link zum Kopieren (**Link kopieren**) – gib ihn der Person selbst. Ein weitergegebener Link beweist nichts über die Adresse: Sie bleibt **unbestätigt**, wie bei jeder Registrierung ohne E-Mail, bis du sie im Konto mit **Als bestätigt markieren** bestätigst (siehe [Nur bestätigte Adressen](/workspaces-and-permissions#mitglieder-einladen)).

Bis zur ersten Anmeldung steht das Konto in der Tabelle mit **Eingeladen**; im Seitenfenster erzeugt **Link erneut senden** einen neuen Link (per E-Mail oder zum Weitergeben), der bisherige gilt dann nicht mehr. Das Anlegen steht im Aktivitätsprotokoll („Konto angelegt“ mit der Adresse) und in den Sicherheitsereignissen. Ist die Anmeldung mit Passwort ausgeschaltet (`FLOWPLAN_LOCAL_LOGIN=false`, nur SSO), gibt es **Konto anlegen** nicht – neue Personen kommen dann über SSO. Über API-Tokens geht das Anlegen nicht, wie alle Aktionen unter **Einstellungen → Instanz**.
