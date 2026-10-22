# Verschlüsselte Bereiche

Ein verschlüsselter Bereich ist für Tagebücher, Passwörter und andere vertrauliche Notizen gedacht. Inhalte, Dateien und auf Wunsch die Titel werden in deinem Browser ver- und entschlüsselt. Der Server – und damit auch Betreiber, Sicherungen und der Speicheranbieter – sieht nur Chiffretext.

## Was geschützt ist – und was nicht

| | Verschlüsselt |
| --- | --- |
| Text der Dokumente | ja |
| Dateien und Bilder in den Dokumenten | ja, samt Dateiname und Typ |
| Seitentitel | nur mit **Titel verschlüsseln** beim Anlegen des Bereichs |
| Seitenstruktur, Symbole, Zeitpunkte, Größen | nein |
| Name des Bereichs und wer Mitglied ist | nein |

Die Verschlüsselung schützt vor dem Mitlesen auf dem Server und in Sicherungen. Sie schützt **nicht** vor einem Server, der absichtlich veränderten Programmcode ausliefert: Eine Web-App führt den Code aus, den der Server schickt. Wer dem Betreiber der Instanz grundsätzlich nicht vertraut, sollte vertrauliche Daten nicht über dessen Instanz bearbeiten.

## Schlüssel einrichten

Beim ersten verschlüsselten Bereich – oder unter **Einstellungen → Konto & Sicherheit → Ende-zu-Ende-Verschlüsselung** – richtest du deine Schlüssel ein:

1. Eine **Passphrase** wählen (mindestens 10 Zeichen, am besten ein ganzer Satz). Sie ist nicht dein Anmeldepasswort und verlässt deinen Browser nie.
2. Den **Wiederherstellungsschlüssel** sichern: 52 Zeichen in Vierergruppen, zum **Herunterladen** oder **Drucken**. Erst wenn du bestätigst, ihn sicher aufbewahrt zu haben, wird eingerichtet.

**Wichtig:** Wer Passphrase **und** Wiederherstellungsschlüssel verliert, verliert den Zugang zu seinen verschlüsselten Daten. Weder die Administration noch der Betreiber können sie wiederherstellen – der Server hat die Schlüssel nie gesehen.

Unter **Einstellungen → Konto & Sicherheit → Ende-zu-Ende-Verschlüsselung** lassen sich die Passphrase ändern und ein neuer Wiederherstellungsschlüssel erzeugen (der alte gilt dann nicht mehr). Nur wenn beides verloren ist: **Schlüssel zurücksetzen …** ganz unten in der **Gefahrenzone**. Danach muss dir ein Mitglied den Zugang zu jedem verschlüsselten Bereich neu geben.

## Entsperren und automatisches Sperren

Verschlüsselte Seiten zeigen zuerst **Entsperren**. Mit der Passphrase (oder dem Wiederherstellungsschlüssel und einer neuen Passphrase) entschlüsselst du deine Schlüssel – nur in diesem Browser-Tab und nur im Arbeitsspeicher. Neu laden, **Jetzt sperren** oder eine Zeit ohne Aktivität (Standard 15 Minuten, einstellbar auf 5, 15, 30 oder 60) sperren wieder. Auf dem Gerät bleibt keine lesbare Kopie zurück; offline bearbeiten lassen sich verschlüsselte Seiten deshalb nicht.

## Bereich anlegen

**Bereich hinzufügen** → Name → **Verschlüsselter Bereich** anhaken, auf Wunsch **Titel verschlüsseln** → **Bereich erstellen**. Ein verschlüsselter Bereich ist immer privat. In der Seitenleiste trägt er ein grünes Schloss.

Verschlüsselte Bereiche enthalten **nur Dokumente**. Datenbanken, Whiteboards, Dashboards und Journale sind hier (noch) nicht möglich – ein Tagebuch schreibst du als Dokumente, z. B. eine Seite pro Monat.

## Mitglieder

Über das Schloss neben dem Bereichsnamen (oder **Mitglieder** auf einer Seite) öffnet sich **Mitglieder und Schlüssel**:

- **Hinzufügen**: Eigentümer des Bereichs oder des Arbeitsbereichs geben einem Mitglied den Schlüssel (**Schlüssel geben**). Das geht nur entsperrt, und nur für Personen, die ihre eigenen Schlüssel schon eingerichtet haben. Neue Mitglieder lesen auch alle älteren Inhalte.
- **Entfernen** oder **Bereich verlassen**: Der Bereich bekommt sofort einen neuen Schlüssel; die entfernte Person kann neue Inhalte nicht mehr lesen. **Was sie vorher schon entschlüsseln konnte, kann sie behalten haben** – alte Inhalte werden nicht neu verschlüsselt. Wer aus dem Arbeitsbereich entfernt wird, verliert die Schlüssel ebenso.

## Was in verschlüsselten Bereichen nicht geht

Alles, wofür der Server den Inhalt lesen müsste, ist hier abgeschaltet und wird vom Server verweigert:

- Suche, KI, Vorschauen, „Verwandte Seiten“ und unverknüpfte Erwähnungen
- Kommentare und Textkommentare, Erwähnungen mit Benachrichtigung
- Freigabelinks, Teilen einzelner Seiten und Veröffentlichung
- Versionsverlauf, Vorlagen, Duplizieren, Verschieben in andere Bereiche (hinein wie heraus)
- Export als PDF, DOCX, EPUB, Markdown vom Server, Git-Export
- Webhooks erhalten nur die Seiten-ID, MCP-Clients nur Metadaten

## Export und Sicherung

Im Editor stehen zwei Wege bereit:

- **Markdown (entschlüsselt)**: Der Browser wandelt die Seite in Markdown um und speichert die Datei – der Klartext läuft nicht über den Server.
- **Verschlüsseltes Archiv**: alle Seiten des Bereichs als Chiffretext, dazu deine verschlüsselten Bereichsschlüssel und dein mit Passphrase und Wiederherstellungsschlüssel gesicherter Schlüssel. Ohne Passphrase oder Wiederherstellungsschlüssel ist es unlesbar.

Normale Instanzsicherungen enthalten verschlüsselte Bereiche ebenfalls nur als Chiffretext.

## Technik

X25519-Schlüsselpaare, AES-256-GCM, PBKDF2-SHA256 mit 600 000 Durchläufen für die Passphrase, alles über die WebCrypto-Schnittstelle des Browsers (aktuelle Versionen von Chrome, Edge, Firefox und Safari). Das vollständige Design mit Bedrohungsmodell steht in [`docs/e2ee-design.md`](https://github.com/yannicschuller/flowplan/blob/main/docs/e2ee-design.md).
