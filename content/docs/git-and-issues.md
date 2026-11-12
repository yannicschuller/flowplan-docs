---
keywords: GitHub, GitLab, Forgejo, Gitea, Issues, Pull Request, Commit, Branch
---

# Git und Issues

Datenbanken mit GitHub, GitLab und Forgejo verbinden: Branches, Commits und Pull Requests am Eintrag, Issues in beide Richtungen synchronisiert.

## Git-Anbindung

**… → Git-Anbindung** verbindet die Datenbank mit GitHub, GitLab oder Gitea/Forgejo:

1. **Git-Anbindung einrichten** erzeugt eine Webhook-Adresse und ein Secret.
2. **Im Repository** einen Webhook mit beiden anlegen:
   - Content type JSON,
   - Ereignisse für Pushes und Pull bzw. Merge Requests.
   Die genauen Schritte stehen im Dialog.
3. **Commits und Pull Requests**, die eine Ticketnummer dieser Datenbank wie `WEB-123` nennen, erscheinen im Eintrag unter **Entwicklung**. Nummern anderer Datenbanken bleiben unberührt – dort gibt es eine eigene Anbindung.
4. **„closes WEB-123“** (auch *fixes*, *resolves*, *schließt*, *behebt*) setzt den Eintrag auf erledigt. Das geschieht, sobald der Commit im Hauptbranch ist oder der Pull Request zusammengeführt wurde – über den Workflow und die Automationen der Datenbank.

Jede Anfrage wird gegen das Secret geprüft. Adresse und Secret sehen nur Personen, die die Datenbank bearbeiten dürfen. **Neue Adresse und neues Secret** macht die alten ungültig.

Pull Requests zeigen ihren Stand als Abzeichen: **Offen**, **Zusammengeführt** oder **Geschlossen**.

### Rückverweis im Pull Request

Wie bei Notion kann Flowplan im Pull bzw. Merge Request selbst auf den Eintrag verweisen. Dafür im Dialog unter **Rückverweis im Pull Request → Zugangstoken hinterlegen** Anbieter, Server (leer für github.com bzw. gitlab.com, Pflicht für Gitea/Forgejo) und ein Zugangstoken eintragen:

- **GitHub**: Fine-grained Token mit Zugriff auf das Repository und *Pull requests: Read and write* (oder *Issues: Read and write*).
- **GitLab**: Projekt- oder persönliches Zugangstoken mit dem Scope `api` (Rolle mindestens Reporter).
- **Gitea / Forgejo**: Token mit `write:issue` (bei privaten Repositorys zusätzlich `read:repository`).

Nennt ein Pull/Merge Request Ticketnummern dieser Datenbank, schreibt Flowplan **einen** Kommentar, z. B. `Linked in Flowplan: [WEB-123 Login-Formular](…)` – eine Zeile je Eintrag, mit Link zum Eintrag. Spätere Ereignisse (geänderter Titel, zusammengeführt, geschlossen) **aktualisieren denselben Kommentar**, statt neue zu schreiben; fallen alle Nummern weg, steht dort „No longer linked in Flowplan.“

- Der Kommentar zeigt Ticketnummer und Titel. Bei **privaten Einträgen** und Datenbanken hinter einer Journal-PIN steht nur die Ticketnummer; für Datenbanken im Papierkorb oder in verschlüsselten Bereichen wird nichts geschrieben.
- Das Token wird verschlüsselt gespeichert, nie wieder angezeigt und nur an den Server geschickt, für den es eingetragen wurde. Ein Webhook von einem anderen Anbieter oder Server bekommt es nicht. Eigene Server gibt die Administration wie bei der Issue-Synchronisierung mit [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration-integrations#integrationen) frei; interne Adressen sind gesperrt.
- Der Kommentar entsteht im Hintergrund – der Webhook antwortet sofort, auch wenn der Git-Server langsam ist. Fehler (z. B. `403` bei fehlender Berechtigung) stehen im Dialog unter **Letzter Rückverweis fehlgeschlagen**. Je Anbindung schreibt Flowplan höchstens 30 Kommentare pro Minute.
- Ohne Token bleibt alles wie bisher: Flowplan schreibt nichts in das Repository. **Token entfernen** schaltet den Rückverweis ab.

## GitHub-, GitLab- und Forgejo-Issues synchronisieren

Eine Datenbank kann sich mit den Issues eines GitHub-, GitLab- oder Forgejo/Gitea-Repositorys abgleichen – in beide Richtungen oder nur in eine. Anders als die [Git-Anbindung](#git-anbindung), die Commits und Pull Requests nur verlinkt, werden hier Einträge und Issues gegenseitig angelegt und aktualisiert.

**Verbindung einrichten** (Eigentümer des Arbeitsbereichs und Administratoren):

1. **Einstellungen → Kalender & Issues → GitHub, GitLab oder Forgejo verbinden**.
2. Anbieter wählen, bei eigenem Server dessen Adresse eintragen (leer für github.com bzw. gitlab.com), Repository (`besitzer/name`) bzw. Projekt (`gruppe/projekt`) und ein Zugangstoken, das Issues lesen und schreiben darf – bei GitHub ein Fine-grained Token mit *Issues: Read and write*, bei GitLab ein Token mit dem Scope `api`. Bei **Forgejo / Gitea** ist die Serveradresse Pflicht (z. B. `https://codeberg.org`); das Token entsteht dort unter **Einstellungen → Anwendungen → Token generieren** mit `write:issue` und `read:repository` (`read:organization` optional, damit auch Labels der Organisation gefunden werden).
3. **Verbindung testen** macht einen Aufruf mit dem Token; **Speichern** legt das Token verschlüsselt ab. Angezeigt wird es danach nie wieder.
4. Optional **Personen**: je Zeile `login = e-mail` eines Mitglieds. Darüber werden Zuständige (Assignees) zugeordnet.
5. Für sofortige Übernahme die angezeigte **Webhook-Adresse** mit dem **Secret** im Repository eintragen – bei GitHub mit Content type JSON und den Ereignissen *Issues* und *Issue comments*, bei GitLab als *Secret token* mit *Issues events* und *Comments*, bei Forgejo/Gitea unter **Einstellungen → Webhooks → Webhook hinzufügen → Forgejo** (bzw. Gitea) mit POST, Content type `application/json`, dem Secret und den eigenen Ereignissen *Issues* und *Issue-Kommentare*. Ohne Webhook gleicht Flowplan alle 10 Minuten ab.

Die Synchronisierung handelt als die Person, die die Verbindung eingerichtet hat: Sie braucht Bearbeitungsrechte an der Datenbank, und Einträge, die sie nicht lesen darf, werden übersprungen. Ist sie nicht mehr Eigentümer des Arbeitsbereichs, pausiert die Verbindung, bis jemand das Token neu speichert.

**Datenbank zuordnen**: **… → Issues synchronisieren** in der Datenbank. Dort wählst du Verbindung, Repository und Richtung (*beide*, *nur Issues → Datenbank*, *nur Datenbank → Issues*) und ordnest Eigenschaften zu:

| Issue | Eigenschaft |
| --- | --- |
| Titel | Titel |
| Beschreibung (Markdown) | eine Text-Eigenschaft oder das Dokument des Eintrags |
| offen/geschlossen und Labels | eine Auswahl – je Option „offen" oder „geschlossen", optional mit einem Label (z. B. *In Arbeit* → offen + `in progress`) |
| Labels | eine Mehrfachauswahl (nur Labels, die es als Option gibt) |
| Assignee | eine Person (über die Personen-Liste der Verbindung) |
| Fälligkeit des Meilensteins | ein Datum (gesetzt wird ein vorhandener Meilenstein mit diesem Datum) |
| Nummer und Adresse | Zahl/Text bzw. URL – nur lesen |

Dazu kommen zwei Schalter für **Kommentare**: Issue-Kommentare erscheinen als Kommentare am Eintrag (mit Name und Link), und Kommentare am Eintrag gehen als Issue-Kommentare hinaus. **Auch bestehende Issues übernehmen** holt beim ersten Lauf alle vorhandenen Issues; sonst nur, was sich nach dem Speichern ändert. Neue Einträge werden zu Issues, sobald die Zuordnung gespeichert ist – ältere Einträge bleiben, wie sie sind.

**Konflikte**: Wurden Eintrag und Issue seit dem letzten Abgleich beide geändert, gewinnt die spätere Änderung. Die Entscheidung steht im Prüfprotokoll. Jeder Eintrag ist höchstens mit einem Issue verknüpft; der Eintrag zeigt dann einen Chip wie **GitHub #123** mit Link.

**Status**: Der Dialog zeigt den letzten Abruf und die letzte Übertragung, Konflikte, übersprungene Einträge und Fehler; **Jetzt synchronisieren** startet einen Lauf sofort. Meldet der Anbieter ein Ratenlimit, wartet Flowplan die angegebene Zeit ab. Ein Repository lässt sich nur mit einer Datenbank verbinden. **Trennen** beendet den Abgleich; Einträge und Issues bleiben.

Pull Requests übernimmt der Abgleich nicht. Eigene Server (GitHub Enterprise, selbst betriebenes GitLab, eigenes Forgejo oder Gitea) gibt die Administration mit [`ISSUE_SYNC_ALLOWED_HOSTS`](/configuration-integrations#integrationen) frei.
