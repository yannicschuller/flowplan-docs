---
keywords: Team einladen, Mitglieder, Rollen, Gäste, Gruppen, Rechte, Arbeitsbereich
---

# Mitglieder, Rollen und Rechte

Ein Arbeitsbereich gehört einem Team: eigene Mitglieder, Gruppen, Bereiche und Vorlagen. Rechte wirken von Arbeitsbereich über Bereich bis zur einzelnen Seite und zum einzelnen Eintrag.

**Mehr zum Thema:** [Arbeitsbereich gestalten](/workspace-appearance)

## Arbeitsbereiche

- **Anlegen**: Name oben in der Seitenleiste → **Arbeitsbereich erstellen**. Ob alle das dürfen, legt die Administration fest.
- **Wechseln**: über denselben Namen; jede Person kann Mitglied mehrerer Arbeitsbereiche sein.
- **Einstellungen → Allgemein**: Name und Symbol ändern (**Name & Symbol**). Verlassen und Löschen stehen am Ende in der **Gefahrenzone**; ist ein Knopf ausgegraut, steht darüber, warum.

Beim **Verlassen** muss ein letzter Eigentümer vorher unter **Einstellungen → Mitglieder** jemand anderen zum Eigentümer machen; eigene Bereiche gehen an einen gewählten verbleibenden Eigentümer über. **Löschen** geht erst, wenn du einen weiteren Arbeitsbereich hast, entfernt alle Inhalte, Vorlagen, Dateien und Freigaben für alle Mitglieder und lässt sich nicht rückgängig machen. Beides bestätigst du mit dem Namen des Arbeitsbereichs.

## Rollen

| Rolle | Darf |
| --- | --- |
| **Eigentümer** | Alles, dazu Mitglieder, Gruppen, Bereiche (auch ihre Reihenfolge in der Seitenleiste), [Tags und Seiteneigenschaften](/page-tags#tags-und-eigenschaften) und den Arbeitsbereich selbst verwalten |
| **Bearbeiten** | Seiten anlegen und ändern, Tags und Eigenschaftswerte vergeben, neue Tags anlegen, kommentieren, teilen |
| **Ansehen** | Lesen und kommentieren |
| **Gast** | Nur ausdrücklich freigegebene Seiten und Bereiche, mit Ansehen oder Bearbeiten |

## Mitglieder einladen

**Einstellungen → Mitglieder → Mitglied einladen** öffnet ein Fenster (auf dem Handy von unten): E-Mail-Adresse, Rolle und – wenn nötig – **Als Gast einladen**. Ist auf der Instanz E-Mail eingerichtet, bekommt die Person eine Einladung. Sie legt mit dieser Adresse ein Konto an – auch wenn die Registrierung sonst geschlossen ist – oder meldet sich per SSO an; der Arbeitsbereich erscheint, sobald die Adresse bestätigt ist. Ohne E-Mail-Versand kopierst du danach unter **Ausstehende Einladungen** den **Einladungslink** (**Link kopieren**) und schickst ihn ihr selbst.

**Einladungslink:** Der Link öffnet die Registrierung mit der eingeladenen Adresse schon eingetragen – auch wenn die Registrierung sonst geschlossen ist. Ein Konto lässt sich damit nur für diese Adresse anlegen. Ohne E-Mail-Versand braucht die Person den Link; die Adresse allein reicht dann nicht.

**Nur bestätigte Adressen:** Ein bestehendes Konto übernimmt eine Einladung automatisch nur, wenn seine Adresse nachweislich ihm gehört – bestätigt per E-Mail-Link, durch die Administration oder vom SSO-Anbieter. Sonst (etwa auf einer Instanz ohne E-Mail-Versand, auf der sich jede Adresse registrieren lässt) zählt nur der Einladungslink: Wer ihn öffnet und sich anmeldet oder registriert, nimmt die Einladung an. Gib den Link deshalb nur der eingeladenen Person.

**Wo die Einladung ankommt:** Offene Einladungen stehen unter **Einstellungen → Mitglieder → Ausstehende Einladungen** – mit Rolle, Gast-Status und geteilten Seiten, wann und von wem eingeladen wurde. Dort lassen sie sich **erneut senden** (mit E-Mail-Versand) oder **zurückziehen**. Die eingeladene Person findet den Arbeitsbereich im Arbeitsbereich-Wechsel oben links und eine Benachrichtigung im **Posteingang** – mit einem neuen Konto sofort, mit einem bestehenden beim nächsten Öffnen von Flowplan (bei Single Sign-on beim nächsten Anmelden). Eine Seite lässt sich auch einzeln teilen, ohne den ganzen Arbeitsbereich: [Eine Seite mit einer Person teilen](/sharing#eine-seite-mit-einer-person-teilen).

**Registrierte Personen kommen sofort dazu:** Gehört die Adresse zu einem Konto mit bestätigter Adresse, ist die Person gleich Mitglied – ohne ausstehende Einladung, sie steht unter **Mitglieder**. Nach wenigen Sekunden erscheint der Arbeitsbereich in ihrem Wechsel, und der Posteingang meldet „Ada hat dich zu ‚Team‘ hinzugefügt“ mit **Öffnen** und **Verlassen** (Verlassen fragt wie unter **Einstellungen → Allgemein** nach dem Namen des Arbeitsbereichs). Für dich sieht die Antwort in beiden Fällen gleich aus – das Einladen verrät also nicht, welche Adressen ein Konto haben. Unbestätigte Adressen behalten die Einladung wie oben beschrieben. {since=0.9.8}

### Einladungslinks für mehrere Personen {since=0.9.8}

**Einstellungen → Mitglieder → Einladungslink erstellen** macht einen Link für mehrere Personen: Du wählst die Rolle (**Bearbeiten** oder **Ansehen**, auf Wunsch **Als Gast beitreten** – nie Eigentümer), wie lange er gilt (**24 Stunden**, **7 Tage** oder **30 Tage**) und auf Wunsch **Höchstens so viele Beitritte**. Links erstellen nur Eigentümer. Wer den Link öffnet, meldet sich an oder legt ein Konto an – auch wenn die Registrierung sonst geschlossen ist – und tritt mit der Rolle des Links bei. Öffnet ein Mitglied ihn noch einmal, ändert sich nichts und es zählt kein Beitritt.

Unter **Einladungslinks** stehen die offenen Links mit ihren Beitritten („1 von 5 Beitritten“), Ablauf und wer sie erstellt hat; **Kopieren** kopiert einen Link erneut, **Zurückziehen** beendet ihn sofort – wer schon beigetreten ist, bleibt Mitglied. Ein abgelaufener, zurückgezogener oder ausgeschöpfter Link sagt das beim Öffnen. Wer den Link hat, kann beitreten, solange er gilt – teile ihn also nur dort, wo er hingehört. Die Administration kann Einladungslinks für die ganze Instanz ausschalten ([Registrierung & Zugang](/user-management#anmeldung-sso)).

Bestehende Mitglieder lassen sich **Zum Gast machen** und umgekehrt **Zum Mitglied machen**.

## Gäste

Gäste sind Personen außerhalb des Teams, etwa Kunden oder Freelancer. Sie sehen nur Seiten und Bereiche, die für sie freigegeben wurden, samt Unterseiten, und können keine Seiten anlegen, niemanden einladen und keine Einstellungen ändern. Vorlagen des Arbeitsbereichs sehen sie nicht, nur eigene. Für Personen ganz ohne Konto gibt es stattdessen [Links mit eigenen Berechtigungen](/sharing#links-mit-eigenen-berechtigungen).

## Gruppen

**Einstellungen → Gruppen & Rechte**: Unter **Gruppen** eine Gruppe anlegen, etwa „Design“ oder „Vertrieb“, und mit **Verwalten** Mitglieder an- oder abhaken (mit Suche bei vielen Mitgliedern). Unter **Zugriff auf Bereiche** stellst du je Bereich die Sichtbarkeit ein und darunter je Gruppe **Ansehen** oder **Bearbeiten**; einzelnen Seiten gibst du eine Gruppe über **Teilen**. Neue Mitglieder einer Gruppe erhalten sofort ihre Rechte.

Mit Single Sign-on können Gruppen des Identitätsanbieters Mitglieder und Gruppen automatisch pflegen – siehe [SSO-Gruppen zuordnen](/sso-oidc#sso-gruppen-arbeitsbereichen-zuordnen).

Regale und Bücher der [Bibliothek](/library#rechte-fuer-regale-und-buecher) folgen denselben Rechten: Ein Regal ist ein Bereich, ein Buch eine Seite. {since=0.11.0}

## Wie Rechte zusammenwirken

1. Der **Bereich** gibt die Grundlage: öffentlich für alle Mitglieder oder privat für Freigegebene.
2. **Seiten** erben die Rechte ihres Bereichs und ihrer übergeordneten Seiten; unter **Teilen** kommen Personen oder Gruppen dazu.
3. **Einträge** einer Datenbank lassen sich schreibgeschützt oder privat stellen (siehe [Datenbanken](/databases#rechte-pro-eintrag)).
4. **Eigenschaften** einer Datenbank lassen sich nur für Bearbeiter, Eigentümer oder ausgewählte Gruppen sichtbar oder bearbeitbar machen (siehe [Sichtbarkeit von Eigenschaften](/properties-and-formulas#sichtbarkeit-von-eigenschaften)).
5. Verknüpfte Datenbanken, Erwähnungen und Links geben nie zusätzliche Rechte: Wer die Quelle nicht lesen darf, sieht sie auch eingebettet nicht.

Eigentümer eines Arbeitsbereichs verwalten auch Bereiche anderer Mitglieder, erhalten dadurch aber keinen Lesezugriff auf deren private Seiten.

Auch Admin-Rechte der Instanz geben keinen Zugriff auf Inhalte: Admins sehen nur, was ihnen Mitgliedschaft und Freigaben erlauben – was die Administration über Konten und Arbeitsbereiche zeigt, steht unter [Was Admins sehen](/user-management#was-admins-sehen).

**Verschlüsselte Bereiche** gehen einen Schritt weiter: Dort entscheidet nicht nur das Recht auf dem Server, sondern der Schlüssel. Wer keinen Bereichsschlüssel bekommen hat, liest nichts – auch nicht Eigentümer des Arbeitsbereichs oder die Administration. Siehe [Verschlüsselte Bereiche](/encrypted-spaces).

## Workflows: Rechte und „läuft als“

[Workflow-Seiten](/workflows) folgen den normalen Seitenrechten: Lesende sehen Status, Ablauf und Läufe; Bearbeitende (Vollmitglieder mit Bearbeitungsrecht) bauen, testen, aktivieren und pausieren. **Gäste** sehen Workflow-Seiten nicht und können keinen Workflow starten oder freigeben. Ein aktiver Workflow **läuft als** die Person, die ihn zuletzt aktiviert hat – er sieht und ändert nur, was sie darf, und pausiert, wenn sie ihre Rechte verliert.

## Speicherkontingent

Jeder Arbeitsbereich kann ein Kontingent haben. Uploads, Kopien, Vorlagen und Importe darüber werden abgelehnt. Die Belegung sehen Admins unter **Administration → Arbeitsbereiche**.
