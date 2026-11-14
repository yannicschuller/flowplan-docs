---
keywords: Notfallzugriff, Vertrauensperson, Erbe, Angehörige, Inaktivität, Totmannschalter, digitaler Nachlass
---

# Notfallzugriff und Nachricht bei Inaktivität

Damit deine Angehörigen im Notfall an deine Inhalte kommen: Vertrauenspersonen mit Lesezugriff nach einer Wartezeit und eine Nachricht, die Flowplan verschickt, wenn du es lange nicht nutzt.

## Notfallzugriff {since=0.9.6}

Unter **Einstellungen → Konto & Sicherheit → Notfallzugriff** trägst du bis zu fünf **Vertrauenspersonen** ein – Personen mit einem Konto auf dieser Instanz –, jeweils mit einer Wartezeit (1, 2, 7, 14 oder 30 Tage) und einer Dauer des Zugriffs (bis du ihn beendest, oder 7, 30 oder 90 Tage). Die Person muss die Rolle annehmen.

- **Anfragen:** Im Notfall fragt sie unter „Ich bin Vertrauensperson für …“ Notfallzugriff an. Du wirst sofort benachrichtigt – in Flowplan, per Push, Chat-App und mit einer E-Mail, deren Link die Anfrage ohne Anmeldung ablehnt – und vor Ablauf der Wartezeit noch einmal erinnert. Nach einer Ablehnung kann sie frühestens nach 24 Stunden erneut fragen.
- **Freigabe:** Lehnst du nicht ab, kann die Person nach der Wartezeit deine privaten Bereiche lesen und als Markdown oder ZIP exportieren. Ändern, löschen, teilen oder deine Einstellungen anfassen kann sie nichts, und dein Konto übernimmt sie nicht; Anmeldedaten setzen weiterhin nur Admins zurück.
- **Nicht enthalten:** Teambereiche, Inhalte, die du nur über einen Arbeitsbereich siehst (dafür braucht die Person eine eigene Mitgliedschaft), mit dir geteilte private Bereiche anderer und Journale mit PIN.
- **Verschlüsselte Bereiche** sind enthalten, wenn die Person die Verschlüsselung eingerichtet hat: Dein Browser gibt die Schlüssel beim nächsten Entsperren für sie frei, der Server sieht sie nie im Klartext. Endet der Zugriff, bekommen diese Bereiche beim nächsten Besuch einen neuen Schlüssel.
- Du beendest einen Zugriff oder entfernst eine Vertrauensperson jederzeit; jeder Schritt steht im Aktivitätsprotokoll und bei den Sicherheitsereignissen, ein Export meldet sich zusätzlich bei dir.
- Admins schalten die Funktion unter **Administration → Anmeldung & SSO → Notfallzugriff** aus (oder mit `FLOWPLAN_EMERGENCY_ACCESS=off`); freigegebene Zugriffe ruhen dann.

## Nachricht bei Inaktivität {since=0.9.6}

Nutzt du Flowplan eine Zeit lang nicht, schickt Flowplan eine Notiz von dir an Menschen, die du auswählst – zum Beispiel, damit deine Familie weiß, wie sie an deine Daten kommt. Du richtest das unter **Einstellungen → Konto & Sicherheit → Nachricht bei Inaktivität** ein, für jeden Arbeitsbereich getrennt, in dem du Mitglied bist (nicht als Gast; höchstens drei).

- **Frist:** 30, 60, 90 (Standard), 180 oder 365 Tage ohne Nutzung.
- **Was als Nutzung zählt:** jede Nutzung deines Kontos (Anmelden, mit der geöffneten App arbeiten) oder nur die Nutzung dieses Arbeitsbereichs. Ein Tab, der nur im Hintergrund offen ist, und API-Tokens zählen nicht.
- **Notiz und Empfänger:** Text oder Markdown, bis zu 5000 Zeichen, an bis zu zehn E-Mail-Adressen. Die Empfänger brauchen kein Konto. Sie bekommen nur deine Notiz, als „<Dein Name> via Flowplan (<Instanz>)“, mit einem Hinweis, was die E-Mail ist – keine Inhalte aus dem Arbeitsbereich, keine Links, kein Tracking. Schreib keine Passwörter hinein.
- **Erinnerungen:** 7, 3 und 1 Tag vorher bekommst du eine Mitteilung, eine Push-Nachricht und eine E-Mail mit dem Knopf **Ich bin da**. Er funktioniert ohne Anmeldung, nur einmal und nur zehn Tage lang. Jede Anmeldung oder Nutzung setzt die Frist ebenfalls zurück. Ohne letzte Erinnerung einen Tag vorher wird nichts verschickt.
- **Verschicken:** Die Notiz geht genau einmal an jeden Empfänger; danach erfährst du, wann und an wen. Sobald du Flowplan wieder nutzt, ist die Nachricht wieder eingeschaltet.
- **Mit [Notfallzugriff](#notfallzugriff):** Mit **Notfallzugriff für meine Vertrauenspersonen sofort freigeben** bekommen deine Vertrauenspersonen beim Verschicken ohne Wartezeit Lesezugriff – nur wer die Rolle schon mindestens so lange angenommen hat wie die eigene Wartezeit.
- **Schutz:** Jede Änderung der Empfänger oder der Notiz melden wir dir sofort per E-Mail. Einrichten geht nur angemeldet im Browser, nicht mit API-Tokens. **Vorschau der E-Mail** zeigt dir die E-Mail, ohne sie zu verschicken.

Für die Administration: Die Funktion braucht den [E-Mail-Versand](/configuration-integrations#e-mail-smtp) (SMTP). Unter **Administration → Anmeldung & SSO → Nachricht bei Inaktivität erlauben** lässt sie sich ausschalten (Standard: an); `FLOWPLAN_DEAD_MAN_SWITCH=off` schaltet sie fest aus. Jedes Verschicken und jede Änderung der Empfänger steht bei den Sicherheitsereignissen. Gesperrte Konten verschicken ihre Nachricht weiterhin; ein wegen Inaktivität gelöschtes Konto verschickt sie direkt vor dem Löschen.
