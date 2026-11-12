---
keywords: Obsidian, Tresor, Vault, Markdown, Logseq, GoodNotes, Handschrift, Import
---

# Von Obsidian und GoodNotes

Markdown-Ordner wie ein Obsidian-Tresor werden zu Seiten oder Datenbanken, handschriftliche Notizbücher aus GoodNotes zu Flowplan-Notizbüchern.

## Von Obsidian und anderen Markdown-Ordnern

- **Ein Tresor als Seiten:** den Tresor-Ordner (mit dem Ordner `.obsidian`) als ZIP packen und unter **Einstellungen → Import & Export → Import** importieren – über **AFFiNE, Confluence, Evernote, Google Docs, GoodNotes, Microsoft Word oder Obsidian** mit Vorschau oder über den Notion-/Markdown-Import, der einen Tresor ebenfalls erkennt.
  - **Ordner** werden zu Seiten mit ihren Notizen darunter. Eine **Ordnernotiz** (`Projekte/Projekte.md` oder `Projekte.md` neben dem Ordner) wird selbst zur Seite des Ordners.
  - **Wikilinks** `[[Seite]]`, `[[Seite|Text]]`, `[[Ordner/Seite]]` und `[[Seite#Überschrift]]` werden zu Links auf die importierten Seiten – aufgelöst wie in Obsidian über den Pfad oder den Dateinamen. Links auf Notizen, die es nicht gibt, bleiben Text.
  - `[[Seite#Überschrift]]`, `[[Seite#^id]]`, `[[#Überschrift]]` und Markdown-Links mit `#^id` werden zu Links auf die Überschrift bzw. den Block; die Markierungen `^id` am Zeilenende verschwinden aus dem Text und werden zur Kennung des Blocks.
  - **Eingebettete Dateien** `![[bild.png]]` werden zu Bildern, `![[datei.pdf]]` zu Dateilinks; eingebettete Notizen `![[Notiz]]` werden zu Links.
  - **Callouts** wie `> [!note]` oder `> [!warning] Titel` werden zu Hinweisblöcken der passenden Art.
  - **Aufgaben** behalten ihren [Status](/tasks-in-documents#status-einer-aufgabe): `- [ ]` offen, `- [/]` in Arbeit, `- [x]`/`- [X]` erledigt, `- [-]` abgebrochen, `- [>]` verschoben. Andere Symbole aus Obsidian-Themes oder dem Tasks-Plugin (`[?]`, `[!]`, `[*]`, `["]`, `[<]` …) bleiben erhalten: Die Aufgabe gilt als offen, zeigt das Symbol klein im Kästchen und wird beim Markdown-Export und in Git mit demselben Symbol geschrieben. Ziffern wie `[1]` bleiben normaler Text.
  - **Tags** aus dem Frontmatter (`tags:`) und im Text (`#tag`, nicht in Code) werden gesammelt: als Seiten als Tags der Seite, als neue Datenbank in der Eigenschaft *Tags* – zusammen mit *Ordner* für die Herkunft. Weitere Schlüssel des Frontmatters werden als Seiten zu [Eigenschaften](/import-export-versions#frontmatter-eintraege-als-markdown-dateien).
- **Notizen mit Frontmatter in eine vorhandene Datenbank:** in einer Datenbank **CSV oder Markdown importieren** wählen und die `.md`-Dateien oder ein ZIP nehmen. Die YAML-Eigenschaften werden zu Spalten – siehe [Frontmatter](/import-export-versions#frontmatter-eintraege-als-markdown-dateien).
- **Aliasse:** `aliases: [PAC, Pompe à chaleur]` (oder `alias:`) im Frontmatter wird zu den [Aliassen](/page-tags#aliasse) der Seite bzw. zur Eigenschaft [Aliasse](/properties-and-formulas#aliasse) des Eintrags. @-Erwähnungen, Suche und nicht verlinkte Erwähnungen finden „Chauffage“ dann auch über „PAC“, und der Markdown-Export schreibt sie wieder als `aliases:` zurück.

## Von GoodNotes

Notizbücher aus GoodNotes (5 und 6, iPad, iPhone und Mac) holst du als **PDF** herüber. Jedes PDF wird ein [Notizbuch](/notebooks) mit dem Dateinamen als Titel, jede Seite ein Blatt mit dieser Seite als Hintergrund – im selben Format und in derselben Ausrichtung. Darauf schreibst du in Flowplan weiter.

### Aus GoodNotes exportieren

**Ein Notizbuch:**

1. Das Notizbuch in GoodNotes öffnen.
2. Oben auf **Teilen** bzw. **Exportieren** tippen (je nach Version das Symbol mit dem Pfeil oder im Menü **⋯**) und **Dieses Notizbuch exportieren** wählen – nicht nur die aktuelle Seite.
3. Als Format **PDF** wählen. Bietet GoodNotes **Seitenvorlagen einschließen** an, lass es eingeschaltet, sonst fehlen Linien, Karos und eingefügte PDF-Seiten im Hintergrund.
4. Das PDF in **Dateien** sichern, per AirDrop an den Mac schicken oder direkt im Browser mit Flowplan öffnen.

**Mehrere Notizbücher:** In der Dokumentübersicht von GoodNotes über **Auswählen** mehrere Notizbücher markieren und gemeinsam als PDF exportieren. Ob GoodNotes dabei einzelne PDFs oder ein ZIP liefert, hängt von der Version ab – Flowplan nimmt beides.

**Alle Notizbücher auf einmal:** In den GoodNotes-Einstellungen die **automatische Sicherung** (Auto-Backup) einschalten, einen Cloud-Dienst wählen (iCloud Drive, Google Drive, Dropbox oder OneDrive) und als Format **PDF** einstellen. GoodNotes legt dann jedes Notizbuch als PDF in den Sicherungsordner, mit deinen Ordnern. Diesen Ordner lädst du als ZIP herunter (Google Drive und Dropbox bieten das im Browser an; auf dem Mac den Ordner im Finder mit **Komprimieren** packen). Die Menüs heißen je nach GoodNotes-Version etwas anders.

### In Flowplan importieren

1. **Einstellungen → Import & Export → Import** öffnen und den Zielbereich wählen.
2. Als Quelle **GoodNotes** wählen (ein PDF wird auch automatisch erkannt).
3. **Datei auswählen und prüfen** und das PDF wählen – oder mehrere PDFs auf einmal oder ein ZIP mit PDFs.
4. Die Vorschau zeigt, wie viele Notizbücher und Blätter entstehen und was übersprungen wird. **Importieren** legt die Notizbücher an und öffnet das erste.

Dabei gilt:

- **Mehrere PDFs** ergeben mehrere Notizbücher. **Ordner** im ZIP (etwa die Ordner der Sicherung) werden zu übergeordneten Seiten; Notizbücher stehen in natürlicher Reihenfolge („Heft 2“ vor „Heft 10“).
- **Handschrift und Hervorhebungen** aus GoodNotes stecken im PDF und bleiben scharf, sind in Flowplan aber Teil des Hintergrunds: Du kannst darüber weiterschreiben, die alten Striche aber nicht einzeln verschieben oder radieren.
- **Suche:** Der Text des PDFs – getippter Text und, wenn GoodNotes ihn mit exportiert, die erkannte Handschrift – wird wie bei jedem PDF indiziert (die ersten 200 Seiten je PDF). Neue Handschrift in Flowplan wird auf iPhone und iPad [erkannt](/notebooks#handschrift-erkennen-iphone-und-ipad).
- **Grenzen:** bis zu 500 Seiten je PDF (weitere Seiten nennt die Vorschau und lässt sie aus), 1000 Blätter je Notizbuch, ein PDF oder ZIP bis 100 MB. Beschädigte oder mit Passwort geschützte PDFs und andere Dateien im ZIP werden übersprungen und in der Vorschau genannt.
- Notizbücher entstehen nur beim Import **als Seiten**, nicht als neue Datenbank.

**Das GoodNotes-Format (`.goodnotes`)** und Sicherungen in diesem Format kann Flowplan nicht lesen: Es ist ein eigenes, nicht offengelegtes Format, das sich zwischen den GoodNotes-Versionen ändert. Flowplan erkennt solche Dateien und sagt, was zu tun ist – exportiere das Notizbuch als PDF oder stelle die automatische Sicherung auf PDF um. Liegen in einem ZIP `.goodnotes`-Dateien neben PDFs, werden die PDFs importiert und die übrigen in der Vorschau aufgeführt.

Auch PDFs aus anderen Notiz-Apps wie Notability, Noteshelf oder OneNote werden so zu Notizbüchern.
