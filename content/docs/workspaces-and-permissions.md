# Arbeitsbereiche, Mitglieder und Rechte

Ein Arbeitsbereich gehört einem Team: eigene Mitglieder, Gruppen, Bereiche und Vorlagen. Rechte wirken von Arbeitsbereich über Bereich bis zur einzelnen Seite und zum einzelnen Eintrag.

## Arbeitsbereiche

- **Anlegen**: Name oben in der Seitenleiste → **Arbeitsbereich erstellen**. Ob alle das dürfen, legt die Administration fest.
- **Wechseln**: über denselben Namen; jede Person kann Mitglied mehrerer Arbeitsbereiche sein.
- **Einstellungen → Allgemein**: Name und Symbol ändern, den Arbeitsbereich verlassen oder – als Eigentümer nach Eingabe des Namens – endgültig löschen.

Beim **Verlassen** muss ein letzter Eigentümer vorher jemand anderen zum Eigentümer machen; eigene Bereiche gehen an einen gewählten verbleibenden Eigentümer über. **Löschen** entfernt alle Inhalte, Vorlagen, Dateien und Freigaben für alle Mitglieder und lässt sich nicht rückgängig machen.

## Rollen

| Rolle | Darf |
| --- | --- |
| **Eigentümer** | Alles, dazu Mitglieder, Gruppen, Bereiche und den Arbeitsbereich selbst verwalten |
| **Bearbeiten** | Seiten anlegen und ändern, kommentieren, teilen |
| **Ansehen** | Lesen und kommentieren |
| **Gast** | Nur ausdrücklich freigegebene Seiten und Bereiche, mit Ansehen oder Bearbeiten |

## Mitglieder einladen

**Einstellungen → Mitglieder → Mitglied einladen**: E-Mail-Adresse und Rolle eingeben. Ist auf der Instanz E-Mail eingerichtet, bekommt die Person eine Einladung. Sie legt mit dieser Adresse ein Konto an – auch wenn die Registrierung sonst geschlossen ist – oder meldet sich per SSO an; der Arbeitsbereich erscheint, sobald die Adresse bestätigt ist. Ohne E-Mail-Versand kopierst du bei der offenen Einladung den **Einladungslink** (**Link kopieren**) und schickst ihn ihr selbst.

**Nur bestätigte Adressen:** Ein bestehendes Konto übernimmt eine Einladung automatisch nur, wenn seine Adresse nachweislich ihm gehört – bestätigt per E-Mail-Link, durch die Administration oder vom SSO-Anbieter. Sonst (etwa auf einer Instanz ohne E-Mail-Versand, auf der sich jede Adresse registrieren lässt) zählt nur der Einladungslink: Wer ihn öffnet und sich anmeldet oder registriert, nimmt die Einladung an. Gib den Link deshalb nur der eingeladenen Person.

**Wo die Einladung ankommt:** Offene Einladungen stehen unter **Einstellungen → Mitglieder → Ausstehende Einladungen** – mit Rolle, Gast-Status und geteilten Seiten, wann und von wem eingeladen wurde. Dort lassen sie sich **erneut senden** (mit E-Mail-Versand) oder **zurückziehen**. Die eingeladene Person findet den Arbeitsbereich im Arbeitsbereich-Wechsel oben links und eine Benachrichtigung im **Posteingang** – mit einem neuen Konto sofort, mit einem bestehenden beim nächsten Öffnen von Flowplan (bei Single Sign-on beim nächsten Anmelden). Eine Seite lässt sich auch einzeln teilen, ohne den ganzen Arbeitsbereich: [Eine Seite mit einer Person teilen](/sharing#eine-seite-mit-einer-person-teilen).

Bestehende Mitglieder lassen sich **Zum Gast machen** und umgekehrt **Zum Mitglied machen**.

## Gäste

Gäste sind Personen außerhalb des Teams, etwa Kunden oder Freelancer. Sie sehen nur Seiten und Bereiche, die für sie freigegeben wurden, samt Unterseiten, und können keine Seiten anlegen, niemanden einladen und keine Einstellungen ändern. Vorlagen des Arbeitsbereichs sehen sie nicht, nur eigene. Für Personen ganz ohne Konto gibt es stattdessen [Links mit eigenen Berechtigungen](/sharing#links-mit-eigenen-berechtigungen).

## Gruppen

**Einstellungen → Gruppen & Rechte**: Gruppen bilden, etwa „Design“ oder „Vertrieb“, Mitglieder hinzufügen und der Gruppe Zugriff auf Bereiche oder Seiten geben. Neue Mitglieder einer Gruppe erhalten sofort ihre Rechte.

Mit Single Sign-on können Gruppen des Identitätsanbieters Mitglieder und Gruppen automatisch pflegen – siehe [SSO-Gruppen zuordnen](/sign-in#sso-gruppen-arbeitsbereichen-zuordnen).

## Wie Rechte zusammenwirken

1. Der **Bereich** gibt die Grundlage: öffentlich für alle Mitglieder oder privat für Freigegebene.
2. **Seiten** erben die Rechte ihres Bereichs und ihrer übergeordneten Seiten; unter **Teilen** kommen Personen oder Gruppen dazu.
3. **Einträge** einer Datenbank lassen sich schreibgeschützt oder privat stellen (siehe [Datenbanken](/databases#rechte-pro-eintrag)).
4. **Eigenschaften** einer Datenbank lassen sich nur für Bearbeiter, Eigentümer oder ausgewählte Gruppen sichtbar oder bearbeitbar machen (siehe [Sichtbarkeit von Eigenschaften](/properties-and-formulas#sichtbarkeit-von-eigenschaften)).
5. Verknüpfte Datenbanken, Erwähnungen und Links geben nie zusätzliche Rechte: Wer die Quelle nicht lesen darf, sieht sie auch eingebettet nicht.

Eigentümer eines Arbeitsbereichs verwalten auch Bereiche anderer Mitglieder, erhalten dadurch aber keinen Lesezugriff auf deren private Seiten.

## Speicherkontingent

Jeder Arbeitsbereich kann ein Kontingent haben. Uploads, Kopien, Vorlagen und Importe darüber werden abgelehnt. Die Belegung sehen Admins unter **Administration → Arbeitsbereiche**.
