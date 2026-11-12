---
keywords: Schreibassistent, umschreiben, übersetzen, Zusammenfassung, ChatGPT
---

# Schreibassistent und Zusammenfassungen

Die KI schreibt, kürzt, übersetzt und verbessert Text an der Schreibmarke und fasst Seiten, Besprechungen und Kommentare zusammen.

## Schreibassistent

Der Schreibassistent bearbeitet markierten Text oder schreibt neuen Text an der Schreibmarke. Er steht Personen zur Verfügung, die die Seite bearbeiten dürfen – wenn die Administration KI und den Schreibassistenten erlaubt hat und du ihn unter **Einstellungen → KI** nicht ausgeschaltet hast.

So öffnest du ihn:

- Text markieren → im Textmenü **KI**.
- ++⌘ J++ (++Strg J++): wirkt auf die Markierung, ohne Markierung auf die aktuelle Zeile; in einer leeren Zeile öffnet sich ein freies Eingabefeld.
- `/ki` oder `/ai` im Blockmenü: freies Eingabefeld an der Schreibmarke.

| Aktion | Was passiert |
| --- | --- |
| **Verbessern** | Korrigiert Rechtschreibung, Grammatik und Zeichensetzung und ändert so wenig wie möglich. |
| **Umformulieren** | Gleicher Inhalt, andere Worte. |
| **Kürzen** | Etwa auf die Hälfte; das Wesentliche bleibt. |
| **Erweitern** | Mehr Erklärung und Beispiele, ohne Fakten zu erfinden. |
| **Einfacher erklären** | Kurze Sätze, einfache Wörter. |
| **Ton ändern** | Sachlich, freundlich oder locker. |
| **Übersetzen** | In eine wählbare Sprache – voreingestellt deutscher Text nach Englisch, anderer Text nach Deutsch. |
| **Als Liste** / **Als Tabelle** | Gliedert den Text um. |
| **Was soll die KI tun?** | Eine eigene Anweisung, z. B. „Mach daraus eine E-Mail“. |

**Freies Schreiben** (`/ki`, ++⌘ J++ in einer leeren Zeile): Beschreibe, was entstehen soll – etwa „Schreib eine Einleitung über …“. Mit **Seite als Kontext** (voreingestellt an) geht der Inhalt der Seite mit an die KI.

Die KI antwortet in der Sprache des Textes, beim freien Schreiben in der Sprache deiner Anweisung. Die Antwort erscheint zuerst in einer **Vorschau** unter dem Text, nicht direkt im Dokument; ein pulsierender Cursor zeigt, dass noch Text folgt, **Stopp** bricht ab. Danach:

- **Ersetzen** (beim freien Schreiben **Einfügen**) – die Antwort ersetzt die Markierung bzw. die leere Zeile.
- **Darunter einfügen** – unter dem Absatz bzw. der Liste.
- **Erneut** – dieselbe Anfrage noch einmal; **Andere Aktion** – zurück zur Auswahl; **Verwerfen** – nichts ändert sich.

Überschriften, Listen, Aufgaben, Tabellen, Code und Hinweise werden als echte Blöcke eingefügt. Das Einfügen ist ein einziger Schritt, den ++⌘ Z++ zurücknimmt, und funktioniert beim gemeinsamen Bearbeiten wie jede andere Änderung. Eingefügte Blöcke leuchten kurz in der Akzentfarbe auf – nur als Anzeige, nicht gespeichert und für andere unsichtbar.

> [!NOTE]
> Bilder aus Antworten werden nicht übernommen (nur ihr Alternativtext), Links nur, wenn sie auf `http(s)`, E-Mail oder Flowplan selbst zeigen. So kann ein manipulierter Text keine Inhalte über Bildadressen nach außen schicken.

### Bestehende Seiten verlinken

Mit **Mit bestehenden Seiten verlinken** (im Schreibassistenten, voreingestellt an; deine Wahl merkt sich der Browser) sucht Flowplan zu deiner Anweisung und dem markierten Text bis zu acht passende Seiten des Arbeitsbereichs – mit derselben Suche wie [Fragen an den Arbeitsbereich](/ask-ai) – und gibt der KI deren Titel und einen kurzen Auszug mit. Wo eine Seite wirklich passt, verlinkt die KI sie im Text. Das gilt für alle Aktionen, das freie Schreiben und die Zusammenfassung einer Sprachnotiz.

- Die Links sind schon in der **Vorschau** zu sehen; darunter steht **Verlinkt: …** mit den verlinkten Seiten. Eingefügt werden sie als echte Seitenlinks – wie mit `[[` im Editor: Sie erscheinen in den Rückverweisen, folgen einer Umbenennung und bleiben im Markdown-Export erhalten.
- Angeboten werden nur Seiten, die die KI für dich lesen darf (siehe [Worauf die KI zugreifen darf](/ai#worauf-die-ki-zugreifen-darf)) – nie die Seite, an der du schreibst, und nie gesperrte, private, gelöschte oder PIN-geschützte Inhalte. Die KI kennt die Seiten nur unter Nummern; Flowplan setzt die Links selbst. Adressen, die sich die KI ausdenkt, werden nie zu Links.
- **Listen von Seiten:** Bittest du um eine Liste („Liste alle Docker-Compose-Seiten mit Links auf“), bekommt die KI zusätzlich die Titel weiterer passender Seiten (höchstens 120, bei lokaler KI 30) – ohne Auszug. Ist die Antwort fertig, verlinkt Flowplan jeden Listeneintrag, der genau den Titel einer Seite nennt (auch am Anfang, etwa „**Gitea** – Git-Server“). Groß- und Kleinschreibung, Emojis, Bindestriche und Leerzeichen spielen dabei keine Rolle („it-tools“ findet „🛠️ IT-Tools“). Verlinkt wird nur, wenn genau **eine** Seite, die die KI für dich lesen darf, diesen Titel hat – bei zwei Seiten namens „Notizen“ bleibt der Eintrag Text, Flowplan rät nie.
- Einleitungen und Schlusssätze wie „Sicher! Hier ist die Liste:“ oder „Ich hoffe, das hilft!“ landen nicht im Dokument – auch nicht als eigener Listenpunkt.
- Mit der **KI auf dem Gerät** und in Ende-zu-Ende-verschlüsselten Bereichen wird nicht verlinkt: Dafür müsste der Text auf dem Server durchsucht werden.
- Die Administration kann die Funktion **Seiten verlinken** ausschalten, du selbst unter **Einstellungen → KI**.

## Zusammenfassungen

Die KI liefert eine kurze **Zusammenfassung**, die **Kernpunkte** und die **offenen Aufgaben** – in der Sprache des Inhalts.

- **Seite:** Seitenmenü **…** → **Mit KI zusammenfassen**. Das Ergebnis erscheint in einer Seitenleiste mit **Als Callout oben einfügen** (Zusammenfassung und Kernpunkte als Hinweis am Seitenanfang), **Aufgaben als Checkliste einfügen** (unter der Schreibmarke), **Kopieren** und **Erneut**.
- **Datenbank:** Der KI-Knopf in der Werkzeugleiste fasst die Einträge der **aktuellen Ansicht** zusammen – mit ihren Filtern, ihrer Suche und Sortierung, höchstens 300 Einträge. Die Leiste nennt, wie viele es waren („120 von 340 Einträgen“).
- **Eintrag:** KI-Knopf im Kopf des Eintrags; Callout und Checkliste landen im Dokument des Eintrags.
- **Sprachnotiz:** Wandelt der Server Sprachnotizen in Text um ([Sprachnotizen](/media-and-files#sprachnotizen-und-besprechungen)), fasst **Danach mit KI zusammenfassen** das Transkript zusammen; **Darunter einfügen** setzt die Zusammenfassung unter das Transkript.

Lange Seiten werden abschnittsweise gelesen: Jeder Teil wird zusammengefasst, dann werden die Teile zusammengeführt (bei lokaler KI in kleineren Teilen). Sehr lange Inhalte werden nach zwölf Teilen abgeschnitten; die Leiste weist darauf hin. Einträge, die du nicht sehen darfst oder die für die KI gesperrt sind, bleiben außen vor.

### Wohin die Daten gehen

Jedes KI-Fenster nennt unten den Anbieter, etwa „Ollama · llama3.1 · lokal“ oder „… · Daten gehen an api.openai.com“. Bei lokaler KI bleibt der Text auf deinem Server; sonst gehen der markierte Text, deine Anweisung und – bei **Seite als Kontext** und Zusammenfassungen – der Seiteninhalt an diesen Anbieter. Flowplan lädt Seiten- und Datenbankinhalte selbst auf dem Server und prüft vorher, ob die KI sie lesen darf.

Auf Seiten, die die KI nicht lesen darf, sind alle KI-Einträge ausgegraut mit dem Hinweis „KI hat keinen Zugriff auf diese Seite“ – auch für markierten Text. Der Server lehnt solche Anfragen ebenfalls ab.
