---
keywords: Markdown, Git, Export, Repository, GitHub, Notfall, lesbare Kopie
---

# Markdown-Export und Git

Eine lesbare Kopie außerhalb von Flowplan – für den Notfall, wenn die Instanz nicht läuft, oder als Archiv in einem Git-Repository. **Administration → Markdown- & Git-Export** wählt Seiten und Datenbanken; mit jeder geplanten Sicherung (und mit **Jetzt sichern**) wird jede davon samt Unterseiten, Kommentaren und früheren Versionen zu einem Markdown-ZIP:

- mit S3 im Bucket unter `<S3_PREFIX>/exports/`, sonst im Datenordner unter `exports/`; es bleiben so viele wie Sicherungen (**Aufbewahrte Sicherungen**). Mit `FLOWPLAN_ENCRYPTION_KEY` sind die ZIPs verschlüsselt (`.zip.enc`), die Übertragung nach Git nicht;
- exportiert wird mit den Leserechten der Person, die die Auswahl gespeichert hat – private Einträge und Journale mit PIN bleiben draußen;
- Dateinamen und Pfade im ZIP enthalten Kennungen, damit sie zwischen zwei Läufen gleich bleiben (sauberer Git-Diff). Einträge beginnen mit YAML-Frontmatter, Kommentare stehen in `<Datei>.comments.md`, frühere Versionen unter `<Datei>.versions/`.

## In ein Git-Repository übertragen

> [!IMPORTANT]
> Der Git-Export der Instanz (`EXPORT_GIT_*`) ist veraltet. Er läuft weiter, wird aber durch den [Git-Export eines Bereichs](#git-export-eines-bereichs) ersetzt, den Bereichseigentümer selbst einrichten; die Administration zeigt dazu einen Hinweis. Der geplante Markdown-Export nach S3 oder in den Datenordner bleibt unverändert.

Mit diesen Variablen überträgt Flowplan jeden Export selbst in ein Repository (Forgejo, Gitea, GitHub, GitLab) – jede Seite in einem eigenen Ordner, ein Commit pro Lauf mit Änderungen:

| Variable | Bedeutung |
| --- | --- |
| `EXPORT_GIT_URL` | `https://`-Adresse des Repositorys, ohne Zugangsdaten. |
| `EXPORT_GIT_TOKEN` | Token mit Schreibrecht auf dieses Repository. Steht nur in der Umgebung, nie in der Datenbank oder einer Sicherung. |
| `EXPORT_GIT_USERNAME` | Benutzername zum Token (Standard `flowplan`; GitLab: `oauth2`). |
| `EXPORT_GIT_BRANCH` | Zweig, Standard `main`. Ein leeres Repository bekommt ihn beim ersten Lauf. |
| `EXPORT_GIT_AUTHOR`, `EXPORT_GIT_EMAIL` | Autor der Commits. |
| `EXPORT_GIT_IMPORT` | `true`: Änderungen, die seit dem letzten Lauf im Repository gemacht wurden, übernimmt Flowplan vor dem Export. |

Mit `EXPORT_GIT_IMPORT=true` gilt für geänderte Dateien:

- **Einträge** (`records/<Datenbank>/…md`) werden über `flowplan.id` im Frontmatter aktualisiert; neue Dateien werden neue Einträge.
- **Dokumentseiten** (`index.md`, `pages/…-<Kennung>.md`) bekommen den Text der Datei; der vorige Stand bleibt als Version erhalten.
- **Journaltage** (`<Journalordner>/2026/10/2026-10-27.md`) werden über ihr Journal (den Ordner) und das Datum gefunden; `flowplan.id` im Frontmatter zählt nur, wenn sie einen Tag desselben Journals nennt. Repositorys aus älteren Versionen, in denen Tage noch als `pages/<Titel>-<Kennung>.md` lagen, funktionieren weiter: Änderungen an diesen Dateien werden vor dem Export noch übernommen, danach schreibt der Export die Tage an die neuen Pfade und entfernt die alten Dateien. Dabei entsteht kein Tag doppelt; ein umbenanntes Journal behält seine Tage, weil der Ordner über die Kennung zugeordnet wird.
- Datenbanktabellen, Kommentare und Versionen sind Kopien und werden nicht zurückgelesen.

Markdown kennt nicht alle Blöcke von Flowplan (etwa Spalten). Whiteboards liegen als SVG-Bild im Repository; ein eingebettetes Board trägt eine unsichtbare Markierung (`<!-- flowplan:whiteboard … -->`), mit der es beim Übernehmen aus Git wieder eingebettet wird – Bild und Link darunter bitte stehen lassen. Wer in Git Seiten mit anderen solchen Blöcken bearbeitet, findet den vorigen Stand im Versionsverlauf. Den Stand der letzten Übertragung (Commit, übernommene Änderungen, Fehler) zeigt die Administration.

## Git-Export eines Bereichs

Statt eines Repositorys für die ganze Instanz richtet die Eigentümerin oder der Eigentümer eines Bereichs selbst ein Repository für diesen Bereich ein: **Bereich verwalten → Git-Export** (über `…` neben dem Bereich oder **Einstellungen → Bereiche**). Die Administration schaltet die Funktion nur ein:

| Variable | Standard | Bedeutung |
| --- | --- | --- |
| `SPACE_GIT_EXPORT` | *leer* | `true` schaltet den Git-Export der Bereiche ein. Ohne die Variable sehen Bereichseigentümer ihn nicht, und eingerichtete Exporte laufen nicht. |
| `SPACE_GIT_ALLOWED_HOSTS` | *leer* | Git-Server, durch Komma getrennt, z. B. `git.example.org,codeberg.org`. Gesetzt sind nur diese erlaubt; ohne die Variable jeder öffentliche `https://`-Server. |
| `SPACE_GIT_ALLOW_PRIVATE` | *leer* | `true` erlaubt den in `SPACE_GIT_ALLOWED_HOSTS` genannten Servern auch interne Adressen – etwa ein Forgejo auf demselben Host, den der Container über `--add-host git.example.org:host-gateway` erreicht. Wirkt nur zusammen mit der Liste; alle anderen Server bleiben auf öffentliche Adressen beschränkt. |

Im Bereich trägt die Eigentümerin oder der Eigentümer ein:

- **Repository-Adresse** (`https://`, ohne Zugangsdaten), **Branch** (Standard `main`), **Benutzername** und ein **Zugangstoken mit Schreibrechten** (GitLab: Benutzername `oauth2`);
- **Häufigkeit**: täglich oder wöchentlich, dazu **Jetzt ausführen**;
- auf Wunsch **Kommentare und frühere Versionen** (`<Datei>.comments.md`, `<Datei>.versions/`).

Was dabei passiert:

- Ins Repository kommt der [Markdown-Export des Bereichs](/import-export-versions) – jede Seite der obersten Ebene in einem eigenen Ordner (`<Titel>-<Kennung>/`), dazu `index.md` und `README.txt`. Andere Dateien im Repository (etwa `LICENSE` oder CI-Dateien) bleiben unberührt.
- Ein Commit je Lauf, und nur, wenn sich etwas geändert hat; Seiten, die nicht mehr im Bereich sind, werden im selben Commit gelöscht.
- Anhänge über 10 MB gehen mit, wie im Markdown-Export.
- Exportiert wird mit den Leserechten der Eigentümerin oder des Eigentümers: private Einträge anderer und Journale mit PIN bleiben draußen.
- Nur Export: Änderungen im Repository übernimmt Flowplan nicht.
- Die Einstellungen zeigen den letzten Lauf (Commit, geänderte Dateien, Fehler) und ab wann der nächste fällig ist. Ein fehlgeschlagener Lauf wird nach einer Stunde wiederholt.

Sicherheit:

- Das Token speichert Flowplan nur verschlüsselt (wie die anderen [gespeicherten Geheimnisse](/configuration-storage#gespeicherte-geheimnisse), an den Bereich gebunden). Nach dem Speichern zeigt die Oberfläche nur noch, ob eines gespeichert ist; in Exporten steht es nicht, in der Instanzsicherung nur verschlüsselt. Eine neue Repository-Adresse braucht das Token erneut.
- Jede Adresse wird aufgelöst und geprüft: Interne Adressen (localhost, private Netze) sind nicht erreichbar, Weiterleitungen werden nicht verfolgt. Einzige Ausnahme: Server, die die Administration in `SPACE_GIT_ALLOWED_HOSTS` nennt, wenn zusätzlich `SPACE_GIT_ALLOW_PRIVATE=true` gesetzt ist – etwa ein Git-Server auf demselben Host. Auch dann bleibt es bei HTTPS, festgelegter Adresse und ohne Weiterleitungen.
- Der Export endet, und Token und Arbeitskopie (`git-export/spaces/<Bereich>/` im Datenordner) werden gelöscht, wenn die Eigentümerin oder der Eigentümer ihn ausschaltet, den Arbeitsbereich verlässt, Gast wird oder das Konto löscht – oder wenn der Bereich eine neue Eigentümerin oder einen neuen Eigentümer bekommt oder in den Papierkorb wandert.

**Administration → Markdown- & Git-Export** zeigt, wie viele Bereiche den Git-Export nutzen, und ihre letzten Fehler – ohne Adressen und Inhalte.
