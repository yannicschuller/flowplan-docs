# Arbeitsbereiche, Mitglieder und Rechte

Ein Arbeitsbereich gehört einem Team: eigene Mitglieder, Gruppen, Bereiche und Vorlagen. Rechte wirken von Arbeitsbereich über Bereich bis zur einzelnen Seite und zum einzelnen Eintrag.

## Arbeitsbereiche

- **Anlegen**: Name oben in der Seitenleiste → **Arbeitsbereich erstellen**. Ob alle das dürfen, legt die Administration fest.
- **Wechseln**: über denselben Namen; jede Person kann Mitglied mehrerer Arbeitsbereiche sein.
- **Einstellungen → Allgemein**: Name und Symbol ändern (**Name & Symbol**). Verlassen und Löschen stehen am Ende in der **Gefahrenzone**; ist ein Knopf ausgegraut, steht darüber, warum.

Beim **Verlassen** muss ein letzter Eigentümer vorher unter **Einstellungen → Mitglieder** jemand anderen zum Eigentümer machen; eigene Bereiche gehen an einen gewählten verbleibenden Eigentümer über. **Löschen** geht erst, wenn du einen weiteren Arbeitsbereich hast, entfernt alle Inhalte, Vorlagen, Dateien und Freigaben für alle Mitglieder und lässt sich nicht rückgängig machen. Beides bestätigst du mit dem Namen des Arbeitsbereichs.

## Erscheinungsbild

Eigentümer geben dem Arbeitsbereich unter **Einstellungen → Erscheinungsbild** ein eigenes Aussehen, etwa in den Farben und Schriften eurer Organisation. Es gilt für alle Mitglieder und Gäste, sobald dieser Arbeitsbereich offen ist – beim Wechsel in einen anderen wechselt auch das Aussehen –, und ebenso für seine [veröffentlichten Seiten](/sharing) und [Formulare](/forms). Zwei Vorschaukarten zeigen die Änderungen hell und dunkel, bevor du speicherst; **Auf Standard zurücksetzen** stellt Flowplans eigenes Aussehen wieder her.

- **Akzentfarbe**: eine Farbe aus der Auswahl oder eine eigene. Daraus leitet Flowplan die Farben für Links, Schaltflächen, Auswahl und Markierungen ab, getrennt für den hellen und den dunklen Modus. Damit Text auf der Farbe und die Farbe als Text gut lesbar bleiben (mindestens 4,5 : 1 nach WCAG), dunkelt Flowplan eine zu helle Farbe ab (im dunklen Modus hellt es eine zu dunkle auf) und zeigt dir, welche Farbe tatsächlich verwendet wird.
- **Hintergrund**: Standard (warm), Neutral, Kühl oder Sepia – jeweils mit passender dunkler Fassung. Freie Hintergrundfarben gibt es nicht, damit Texte überall lesbar bleiben.
- **Schriften**: je eine für die Oberfläche, für große Überschriften und für Code. Zur Wahl stehen Flowplans eigene Schriften, die Systemschrift und rund fünfzehn weitere, darunter Inter, Atkinson Hyperlegible Next, IBM Plex, Source Sans/Serif/Code, Lora, Literata, Merriweather, EB Garamond und Fira Code. Alle liegen auf deinem Flowplan-Server: Der Browser lädt nur die gewählten, und keine Anfrage geht an einen fremden Schriftdienst. Seiten, deren Schrift auf Serif gewechselt wurde, verwenden die Überschriftenschrift.
- **Eigene Schriften**: Eine Hausschrift lässt sich als WOFF2, WOFF, TTF oder OTF hochladen (bis 5 MB, bis zu 20 je Arbeitsbereich) und dann für jeden der drei Bereiche wählen. Sie zählt zum [Speicherkontingent](#speicherkontingent) des Arbeitsbereichs und wird mit ihm gelöscht. Lade nur Schriften hoch, deren Lizenz die Nutzung im Web erlaubt.

Hell oder dunkel wählt weiterhin jede Person selbst. Wer lieber Flowplans eigenes Aussehen behält, schaltet **Einstellungen → Darstellung & Sprache → Darstellung des Arbeitsbereichs verwenden** aus; das gilt für das eigene Konto in allen Arbeitsbereichen und auf allen Geräten.

Eigenes CSS ist bewusst nicht möglich: Mit CSS ließen sich Inhalte unbemerkt nach außen schicken, und es würde bei Updates der App brechen.

Das Aussehen und die hochgeladenen Schriften stecken im [Inhaltsarchiv](/import-export-versions#inhaltsarchiv) des Arbeitsbereichs. Beim Import übernimmt es ein Eigentümer in einen Arbeitsbereich, der noch Flowplans eigenes Aussehen hat; ein schon gewähltes Aussehen bleibt.

## Automatische Links

Eigentümer legen unter **Einstellungen → Arbeitsbereich → Automatische Links** Regeln an, die Text wie `ABC-123` beim Schreiben zu einem Link machen – etwa auf das Ticket in Jira oder das Issue auf GitHub. Die Regeln gelten für alle Mitglieder und Gäste des Arbeitsbereichs. Jede Regel hat einen optionalen Namen, ein **Muster** (ein regulärer Ausdruck, höchstens 200 Zeichen), eine **Link-Vorlage** und einen Schalter zum Aus- und Einschalten; bis zu 50 Regeln sind möglich.

In der Vorlage steht `{match}` für den ganzen Treffer, `$1` bis `$9` (oder `{1}` bis `{9}`) für die Gruppen in Klammern. Die Werte werden URL-kodiert eingesetzt, und die Vorlage muss mit `https://`, `http://` oder `mailto:` beginnen. Beispiele:

| Muster | Link-Vorlage | Aus | wird |
| --- | --- | --- | --- |
| `\bABC-\d+\b` | `https://jira.example.com/browse/{match}` | ABC-123 | https://jira.example.com/browse/ABC-123 |
| `#(\d+)` | `https://github.com/acme/app/issues/$1` | #42 | https://github.com/acme/app/issues/42 |

Unter **Ausprobieren** gibst du einen Beispieltext ein und siehst sofort, welche Stellen zu welchem Link werden. Ungültige Muster, Muster, die auf leeren Text passen, verschachtelte Wiederholungen wie `(a+)+` (sie können den Browser ausbremsen) und Vorlagen ohne gültige Adresse werden markiert und nicht gespeichert.

## Rollen

| Rolle | Darf |
| --- | --- |
| **Eigentümer** | Alles, dazu Mitglieder, Gruppen, Bereiche (auch ihre Reihenfolge in der Seitenleiste), [Tags und Seiteneigenschaften](/pages-and-spaces#tags-und-eigenschaften) und den Arbeitsbereich selbst verwalten |
| **Bearbeiten** | Seiten anlegen und ändern, Tags und Eigenschaftswerte vergeben, neue Tags anlegen, kommentieren, teilen |
| **Ansehen** | Lesen und kommentieren |
| **Gast** | Nur ausdrücklich freigegebene Seiten und Bereiche, mit Ansehen oder Bearbeiten |

## Mitglieder einladen

**Einstellungen → Mitglieder → Mitglied einladen** öffnet ein Fenster (auf dem Handy von unten): E-Mail-Adresse, Rolle und – wenn nötig – **Als Gast einladen**. Ist auf der Instanz E-Mail eingerichtet, bekommt die Person eine Einladung. Sie legt mit dieser Adresse ein Konto an – auch wenn die Registrierung sonst geschlossen ist – oder meldet sich per SSO an; der Arbeitsbereich erscheint, sobald die Adresse bestätigt ist. Ohne E-Mail-Versand kopierst du danach unter **Ausstehende Einladungen** den **Einladungslink** (**Link kopieren**) und schickst ihn ihr selbst.

**Einladungslink:** Der Link öffnet die Registrierung mit der eingeladenen Adresse schon eingetragen – auch wenn die Registrierung sonst geschlossen ist. Ein Konto lässt sich damit nur für diese Adresse anlegen. Ohne E-Mail-Versand braucht die Person den Link; die Adresse allein reicht dann nicht.

**Nur bestätigte Adressen:** Ein bestehendes Konto übernimmt eine Einladung automatisch nur, wenn seine Adresse nachweislich ihm gehört – bestätigt per E-Mail-Link, durch die Administration oder vom SSO-Anbieter. Sonst (etwa auf einer Instanz ohne E-Mail-Versand, auf der sich jede Adresse registrieren lässt) zählt nur der Einladungslink: Wer ihn öffnet und sich anmeldet oder registriert, nimmt die Einladung an. Gib den Link deshalb nur der eingeladenen Person.

**Wo die Einladung ankommt:** Offene Einladungen stehen unter **Einstellungen → Mitglieder → Ausstehende Einladungen** – mit Rolle, Gast-Status und geteilten Seiten, wann und von wem eingeladen wurde. Dort lassen sie sich **erneut senden** (mit E-Mail-Versand) oder **zurückziehen**. Die eingeladene Person findet den Arbeitsbereich im Arbeitsbereich-Wechsel oben links und eine Benachrichtigung im **Posteingang** – mit einem neuen Konto sofort, mit einem bestehenden beim nächsten Öffnen von Flowplan (bei Single Sign-on beim nächsten Anmelden). Eine Seite lässt sich auch einzeln teilen, ohne den ganzen Arbeitsbereich: [Eine Seite mit einer Person teilen](/sharing#eine-seite-mit-einer-person-teilen).

Bestehende Mitglieder lassen sich **Zum Gast machen** und umgekehrt **Zum Mitglied machen**.

## Gäste

Gäste sind Personen außerhalb des Teams, etwa Kunden oder Freelancer. Sie sehen nur Seiten und Bereiche, die für sie freigegeben wurden, samt Unterseiten, und können keine Seiten anlegen, niemanden einladen und keine Einstellungen ändern. Vorlagen des Arbeitsbereichs sehen sie nicht, nur eigene. Für Personen ganz ohne Konto gibt es stattdessen [Links mit eigenen Berechtigungen](/sharing#links-mit-eigenen-berechtigungen).

## Gruppen

**Einstellungen → Gruppen & Rechte**: Unter **Gruppen** eine Gruppe anlegen, etwa „Design“ oder „Vertrieb“, und mit **Verwalten** Mitglieder an- oder abhaken (mit Suche bei vielen Mitgliedern). Unter **Zugriff auf Bereiche** stellst du je Bereich die Sichtbarkeit ein und darunter je Gruppe **Ansehen** oder **Bearbeiten**; einzelnen Seiten gibst du eine Gruppe über **Teilen**. Neue Mitglieder einer Gruppe erhalten sofort ihre Rechte.

Mit Single Sign-on können Gruppen des Identitätsanbieters Mitglieder und Gruppen automatisch pflegen – siehe [SSO-Gruppen zuordnen](/sign-in#sso-gruppen-arbeitsbereichen-zuordnen).

## Wie Rechte zusammenwirken

1. Der **Bereich** gibt die Grundlage: öffentlich für alle Mitglieder oder privat für Freigegebene.
2. **Seiten** erben die Rechte ihres Bereichs und ihrer übergeordneten Seiten; unter **Teilen** kommen Personen oder Gruppen dazu.
3. **Einträge** einer Datenbank lassen sich schreibgeschützt oder privat stellen (siehe [Datenbanken](/databases#rechte-pro-eintrag)).
4. **Eigenschaften** einer Datenbank lassen sich nur für Bearbeiter, Eigentümer oder ausgewählte Gruppen sichtbar oder bearbeitbar machen (siehe [Sichtbarkeit von Eigenschaften](/properties-and-formulas#sichtbarkeit-von-eigenschaften)).
5. Verknüpfte Datenbanken, Erwähnungen und Links geben nie zusätzliche Rechte: Wer die Quelle nicht lesen darf, sieht sie auch eingebettet nicht.

Eigentümer eines Arbeitsbereichs verwalten auch Bereiche anderer Mitglieder, erhalten dadurch aber keinen Lesezugriff auf deren private Seiten.

**Verschlüsselte Bereiche** gehen einen Schritt weiter: Dort entscheidet nicht nur das Recht auf dem Server, sondern der Schlüssel. Wer keinen Bereichsschlüssel bekommen hat, liest nichts – auch nicht Eigentümer des Arbeitsbereichs oder die Administration. Siehe [Verschlüsselte Bereiche](/encrypted-spaces).

## Workflows: Rechte und „läuft als“

[Workflow-Seiten](/workflows) folgen den normalen Seitenrechten: Lesende sehen Status, Ablauf und Läufe; Bearbeitende (Vollmitglieder mit Bearbeitungsrecht) bauen, testen, aktivieren und pausieren. **Gäste** sehen Workflow-Seiten nicht und können keinen Workflow starten oder freigeben. Ein aktiver Workflow **läuft als** die Person, die ihn zuletzt aktiviert hat – er sieht und ändert nur, was sie darf, und pausiert, wenn sie ihre Rechte verliert.

## Speicherkontingent

Jeder Arbeitsbereich kann ein Kontingent haben. Uploads, Kopien, Vorlagen und Importe darüber werden abgelehnt. Die Belegung sehen Admins unter **Administration → Arbeitsbereiche**.
