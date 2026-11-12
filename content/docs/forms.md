---
keywords: Formular, Umfrage, Fragebogen, Typeform, Google Forms, öffentlich
---

# Formulare

Eine Formularansicht sammelt Antworten direkt als Einträge in der Datenbank – von Mitgliedern oder, wenn freigegeben, von jeder Person mit dem Link.

## Formular gestalten

1. In der Datenbank eine Ansicht vom Typ **Formular** anlegen.
2. **Formular gestalten** öffnet den Editor:
   - Titel, Beschreibung und Beschriftung des Absenden-Knopfs,
   - Fragen: Reihenfolge, ausblenden, **Pflichtfeld**, Hilfetext je Frage,
   - Frageart: kurzer oder **langer Text**, **Auswahlknöpfe** statt Liste, **Lineare Skala 1–10** für Zahlen,
   - **Nur zeigen, wenn …** je Frage (siehe [Bedingungen und Seiten](#bedingungen-und-seiten)),
   - **Textblock davor**, **Textblock am Ende** und **Neue Seite ab hier** für Erklärungen und mehrere Seiten,
   - **Titel nach dem Absenden** und **Bestätigungstext**,
   - was **nach dem Absenden** passiert (siehe [Einstellungen](#einstellungen)).
3. **Formular speichern**.

Pflichtfelder und Eingabetypen prüft Flowplan im Browser und auf dem Server. Dateien-Eigenschaften erlauben Uploads im Formular.

### Bedingungen und Seiten

Jede Frage, jeder Textblock und jeder Seitenumbruch kann **Nur zeigen, wenn …** eine frühere Antwort passt – etwa „Art **ist** Fehler“, „Themen **enthält** Abrechnung“, „Betreff **enthält den Text** Rechnung“, „Wichtigkeit **ist größer als** 7“ oder „E-Mail **ist beantwortet**“. Ein ausgeblendeter Seitenumbruch blendet die ganze Seite aus.

- Ausgeblendete Fragen sind nicht Pflicht, und ihre Antworten werden nicht gespeichert – auch nicht, wenn sie trotzdem mitgeschickt werden. Der Server prüft dieselben Regeln wie der Browser.
- Hängt eine Frage an einer ausgeblendeten Frage, bleibt sie ebenfalls ausgeblendet.
- Bei mehreren Seiten zeigt ein **Fortschrittsbalken** den Stand (abschaltbar); **Zurück** und **Weiter** wechseln die Seite, Pflichtfragen werden je Seite geprüft.

### Einstellungen

Unter **Nach dem Absenden**, **Bestätigung per E-Mail** und **Team benachrichtigen** – im Formular-Editor wie in den Einstellungen einer Umfrage:

- **Danach weiterleiten zu**: eine Adresse mit `https://`, zu der die Dankeschön-Seite nach einigen Sekunden (0–60, Standard 3) weiterleitet.
- **Platzhalter**: `{Name der Frage}` setzt die Antwort auf diese Frage ein – im Titel und Text nach dem Absenden, in der Weiterleitung (dort nur nach dem Domainnamen, z. B. `https://example.com/danke?name={Name}`) und in der E-Mail. Unbekannte Namen bleiben stehen; Personen, Relationen und Dateien werden nicht eingesetzt.
- **Bestätigung per E-Mail an die Antwortenden**: Betreff und Text sind frei wählbar. Die E-Mail enthält den Text und die beantworteten Fragen als Liste – ohne ausgeblendete und interne Eigenschaften – und, mit [Kundenportal](#kundenportal), den Link zur Anfrage (dann kommt nur diese eine E-Mail). Sie geht an die erste beantwortete E-Mail-Frage; in Formularen, die nicht anonym sind, sonst an die Adresse des angemeldeten Kontos. Anonyme Formulare schreiben nur, wenn die Person ihre Adresse selbst eingibt. Voraussetzung ist eingerichtetes E-Mail ([Konfiguration](/configuration)); je Adresse gehen höchstens 5 E-Mails pro Stunde, je Absender 10 und je Formular 300.
- **Team benachrichtigen**: Die gewählten Mitglieder bekommen bei jeder neuen Antwort eine Benachrichtigung der Art „Gastkommentare und Gasteinträge“ – sofern sie den Eintrag sehen dürfen.

### Später weitermachen

In Formularen und Umfragen, die nicht anonym sind, speichert **Speichern und später weitermachen** die bisherigen Antworten als Entwurf für dich (ohne Dateien). Öffnest du den Link wieder, geht es auf derselben Seite weiter; nach dem Absenden ist der Entwurf weg. Entwürfe, die ein halbes Jahr nicht geändert wurden, werden gelöscht.

## Formular teilen

Unter **Formular teilen** das Formular einschalten und den Link kopieren.

- **Nur Mitglieder**: Antworten erfordern eine Anmeldung; die Antwort trägt den Namen der Person.
- **Anonym**: Jede Person mit dem Link kann antworten, ohne Konto und ohne Namen. Dateien aus anonymen Antworten zählen gegen ein Tagesbudget: 200 MB je Formular und `FLOWPLAN_ANONYMOUS_UPLOAD_MB` für die ganze Instanz ([Konfiguration](/configuration)); je Formular werden außerdem höchstens 1000 Antworten pro Stunde angenommen.

Personen- und Relationsfragen gibt es nur in Formularen für Mitglieder, weil sie Mitglieder und Einträge sichtbar machen würden.

> [!NOTE]
> Kopierte oder importierte Formulare starten ausgeschaltet und nur für Mitglieder. In der Demo lassen sich Formulare gestalten, aber nicht öffentlich schalten, und Bestätigungen per E-Mail lassen sich nicht einschalten.

## Antworten

Jede Antwort ist ein normaler Eintrag: Er erscheint in allen Ansichten und lässt sich filtern, zuweisen und kommentieren.

## Umfragen

Ein Formular wird mit **Als Umfrage gestalten** zur Umfrage – oder du legst eine neue Seite aus der Vorlage **Umfrage** an. Der Builder hat fünf Reiter: **Fragen**, **Vorschau**, **Einstellungen**, **Teilen** und **Ergebnisse**.

Links steht der Ablauf mit nummerierten Fragen, Textblöcken und Seitenumbrüchen, rechts bearbeitest du das gewählte Element. **Frage hinzufügen** zeigt die Fragetypen nach Auswahl, Bewertung sowie Text und Angaben geordnet. Alles wird **automatisch gespeichert**, kurz nachdem du aufhörst zu tippen – der Punkt oben rechts zeigt den Stand. Fehlt noch etwas (eine Frage ohne Text, eine leere Antwort, eine Weiterleitung ohne `https://`), wartet das Speichern und nennt den Grund.

### Fragetypen

Umfragen kennen {{facts.questionTypes}} Fragetypen:

- **Text**: kurze Antwort, langer Text, E-Mail, Telefon, Website, Zahl, Datum, Uhrzeit
- **Auswahl**: Einfachauswahl, Mehrfachauswahl, Dropdown, Ja / Nein – wahlweise mit „Andere“ samt Textfeld, zufälliger Reihenfolge und Mindest- oder Höchstzahl
- **Bewertung**: Sterne (3 bis 10), Weiterempfehlung (NPS, 0–10), Skala mit Beschriftung an beiden Enden, Schieberegler
- **Matrix (Likert)**: mehrere Aussagen mit denselben Antworten
- **Rangfolge**: Einträge in eine Reihenfolge bringen
- **Datei-Upload**
- Außerdem **Textblöcke** für Erklärungen und **Seitenumbrüche** für mehrere Seiten.

Mehrere Zeilen in ein Antwortfeld einfügen legt mehrere Antworten auf einmal an.

### Bedingungen

Jede Frage, jeder Textblock und jeder Seitenumbruch kann **Nur zeigen, wenn …** eine frühere Antwort passt – mit denselben Vergleichen wie in [Formularen](#bedingungen-und-seiten). Beispiel: „Was sollten wir besser machen?“ erscheint nur bei einer Weiterempfehlung bis 6. Ausgeblendete Fragen sind nicht Pflicht, und ihre Antworten werden nicht gespeichert.

### Umfrage-Einstellungen

- Begrüßungsseite, Fortschrittsbalken bei mehreren Seiten, Dankeschön-Text mit Platzhaltern
- Weiterleitung, Bestätigung per E-Mail und Team-Benachrichtigung wie bei [Formularen](#einstellungen)
- **Schließt am** und **Höchstens so viele Antworten** – danach nimmt die Umfrage nichts mehr an
- **Nur eine Antwort pro Person** – angemeldete Personen über ihr Konto, anonyme über ihre Verbindung
- eine Akzentfarbe

### Teilen und Auswerten

**Teilen** öffnet die Umfrage. Sie kann öffentlich sein, also für jede Person mit dem Link, und anonym, also ohne Anmeldung und ohne Namen.

Jede Antwort ist ein Eintrag in der Datenbank. Jede Frage ist eine Eigenschaft, eine Matrix eine Eigenschaft je Zeile. So kannst du Antworten filtern, sortieren, als CSV exportieren und mit Automationen weiterverarbeiten.

**Ergebnisse** zeigt:
- die Zahl der Antworten pro Tag,
- je Frage Anzahl und Anteil jeder Antwort,
- Durchschnitt, Minimum und Maximum,
- den NPS-Wert mit Promotoren, Passiven und Kritikern,
- Matrix-Tabellen, durchschnittliche Plätze der Rangfolge (Optionen, die noch niemand eingeordnet hat, stehen mit „–“ am Ende) und die neuesten Textantworten.

> [!NOTE]
> Benennst du eine Frage um, behält sie ihre Antworten. Wechselst du den Typ so, dass sich die gespeicherte Art ändert (z. B. von Text zu Zahl), entsteht eine neue Eigenschaft – die bisherigen Antworten bleiben in der alten.

## Kundenportal

Mit dem Kundenportal wird ein Formular zum Service-Desk: Wer es absendet, kann seine Anfrage danach verfolgen.

1. Unter **Formular teilen** das **Kundenportal** einschalten.
2. Auswählen, welche Eigenschaften im Portal sichtbar sind – etwa **Status** oder ein Fälligkeitsdatum. Eine Auswahl-Eigenschaft namens „Status“ ist beim Einschalten schon vorgewählt. Personen, Relationen und Dateien bleiben immer intern.

Nach dem Absenden sieht die Person einen privaten Link zu ihrer Anfrage. Hat sie eine E-Mail-Frage beantwortet und ist E-Mail eingerichtet, kommt der Link auch per E-Mail – in ihrer Sprache; mit eingeschalteter Bestätigung per E-Mail steht er in dieser einen E-Mail. Auf der Seite stehen der Stand, ihre Angaben und eine Unterhaltung mit dem Team.

Das Team antwortet im Eintrag unter **Kundenanfrage**. Antworten gehen per E-Mail an die Person; schreibt sie zurück, bekommen die Personen im Eintrag, alle, die schon geantwortet haben, und wer die Datenbank angelegt hat, eine Benachrichtigung. **Kundenlink kopieren** gibt den Link weiter, wenn keine E-Mail-Adresse vorliegt.

> [!NOTE]
> Der Link ist der Schlüssel: Wer ihn hat, sieht die Anfrage und kann antworten. Schaltest du das Kundenportal oder das Formular aus, funktionieren alle Links nicht mehr; eingeschaltet gehen sie wieder.

## Formularantworten weiterverarbeiten

Der Workflow-Auslöser **Formularantwort** startet einen [Workflow](/workflows) für jede Antwort – etwa mit der Vorlage **Formular → KI-Kategorie → Zuweisung**: die KI ordnet die Antwort einer Kategorie zu, die zuständige Person wird eingetragen und benachrichtigt.
