---
keywords: Startinhalt, Onboarding, neue Konten, Vorlagen, Willkommensseite, Startseiten, Admin
---

# Startinhalt für neue Konten

Neue Konten bekommen in ihrem persönlichen Arbeitsbereich die Seite **Willkommen bei Flowplan** und zwei Beispiele (eine Produkt-Roadmap und ein Team-Handbuch). Statt der Beispiele kannst du eigene Startseiten vorgeben – etwa eine Einführung, Richtlinien oder eine Aufgabenliste fürs Onboarding:

## Startinhalt festlegen {since=0.11.0}

1. Lege in einem deiner Arbeitsbereiche einen Bereich an, z. B. „Onboarding“, und fülle ihn mit den Seiten, die alle bekommen sollen.
2. Wähle ihn unter **Einstellungen → Instanz → Allgemein → Startinhalt für neue Konten → Bereich**. Zur Auswahl stehen die Bereiche, die du lesen kannst; Ende-zu-Ende-verschlüsselte Bereiche nicht.
3. **Eingebaute Willkommensseite behalten** (Standard: an) stellt „Willkommen bei Flowplan“ vor die Seiten des Bereichs; aus bekommen neue Konten nur die Seiten des Bereichs.

## Was kopiert wird {since=0.11.0}

Jedes Konto, dessen persönlicher Arbeitsbereich danach angelegt wird, bekommt eine Kopie der Seiten des Bereichs – bei der ersten Anmeldung mit E-Mail und Passwort ebenso wie über [SSO](/sso-oidc), [LDAP oder SCIM](/scim-and-ldap). Kopiert wird wie beim Duplizieren einer Seite: Unterseiten, Datenbanken mit Einträgen und Ansichten, Whiteboards, Notizbücher, Workflows (als Entwurf) und hochgeladene Dateien, die dann dem neuen Konto gehören; Links zeigen auf die Kopien. Nicht mitkopiert werden Kommentare, Versionen, Freigaben, öffentliche Links, Berechtigungen und Seiten im Papierkorb.

Die Seiten werden so kopiert, wie du sie lesen kannst – was dir verborgen ist, bekommt auch niemand sonst. Änderungen am Bereich erreichen nur Konten, die danach angelegt werden; bestehende Konten und ihre Arbeitsbereiche bleiben, wie sie sind. Konten, die über eine [SSO-Gruppe](/sso-oidc) gleich einem Arbeitsbereich beitreten, bekommen keinen persönlichen Arbeitsbereich und damit auch keinen Startinhalt. Demo-Gäste bekommen weiter ihre eigenen Beispielseiten.

Ist der Bereich weg oder nicht mehr lesbar, oder schlägt das Kopieren fehl, wird das Konto trotzdem angelegt – mit den eingebauten Seiten; das Server-Log nennt den Grund, und unter **Startinhalt für neue Konten** steht ein Hinweis. **Keiner – eingebaute Willkommensseite und Beispiele** kehrt zu den eingebauten Seiten zurück. Jede Änderung des Bereichs steht im [Aktivitätsprotokoll](/administration#aktivitaetsprotokoll).
