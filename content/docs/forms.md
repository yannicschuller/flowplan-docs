# Formulare

Eine Formularansicht sammelt Antworten direkt als Einträge in der Datenbank – von Mitgliedern oder, wenn freigegeben, von jeder Person mit dem Link.

## Formular gestalten

1. In der Datenbank eine Ansicht vom Typ **Formular** anlegen.
2. **Formular gestalten** öffnet den Editor:
   - Titel, Beschreibung und Beschriftung des Absenden-Knopfs,
   - Fragen: Reihenfolge, ausblenden, **Pflichtfeld**, Hilfetext je Frage,
   - Frageart: kurzer oder **langer Text**, **Auswahlknöpfe** statt Liste, **Lineare Skala 1–10** für Zahlen,
   - **Bestätigungstext** nach dem Absenden.
3. **Formular speichern**.

Pflichtfelder und Eingabetypen prüft Flowplan im Browser und auf dem Server. Dateien-Eigenschaften erlauben Uploads im Formular.

## Formular teilen

Unter **Formular teilen** das Formular einschalten und den Link kopieren.

- **Nur Mitglieder**: Antworten erfordern eine Anmeldung; die Antwort trägt den Namen der Person.
- **Anonym**: Jede Person mit dem Link kann antworten, ohne Konto und ohne Namen.

Personen- und Relationsfragen gibt es nur in Formularen für Mitglieder, weil sie Mitglieder und Einträge sichtbar machen würden.

> [!NOTE]
> Kopierte oder importierte Formulare starten ausgeschaltet und nur für Mitglieder. In der Demo lassen sich Formulare gestalten, aber nicht öffentlich schalten.

## Antworten

Jede Antwort ist ein normaler Eintrag: Er erscheint in allen Ansichten und lässt sich filtern, zuweisen und kommentieren.

## Umfragen

Ein Formular wird mit **Als Umfrage gestalten** zur Umfrage – oder du legst eine neue Seite aus der Vorlage **Umfrage** an. Der Builder hat fünf Reiter: **Fragen**, **Vorschau**, **Einstellungen**, **Teilen** und **Ergebnisse**.

### Fragetypen

- **Text**: kurze Antwort, langer Text, E-Mail, Telefon, Website, Zahl, Datum, Uhrzeit
- **Auswahl**: Einfachauswahl, Mehrfachauswahl, Dropdown, Ja / Nein – wahlweise mit „Andere“ samt Textfeld, zufälliger Reihenfolge und Mindest- oder Höchstzahl
- **Bewertung**: Sterne (3 bis 10), Weiterempfehlung (NPS, 0–10), Skala mit Beschriftung an beiden Enden, Schieberegler
- **Matrix (Likert)**: mehrere Aussagen mit denselben Antworten
- **Rangfolge**: Einträge in eine Reihenfolge bringen
- **Datei-Upload**
- Außerdem **Textblöcke** für Erklärungen und **Seitenumbrüche** für mehrere Seiten.

Mehrere Zeilen in ein Antwortfeld einfügen legt mehrere Antworten auf einmal an.

### Bedingungen

Jede Frage und jeder Textblock kann **Nur zeigen, wenn …** eine frühere Antwort passt. Beispiel: „Was sollten wir besser machen?“ erscheint nur bei einer Weiterempfehlung bis 6. Ausgeblendete Fragen sind nicht Pflicht, und ihre Antworten werden nicht gespeichert.

### Einstellungen

- Begrüßungsseite, Fortschrittsbalken bei mehreren Seiten, Dankeschön-Text und optional eine Weiterleitung
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
- Matrix-Tabellen, durchschnittliche Plätze der Rangfolge und die neuesten Textantworten.

> [!NOTE]
> Benennst du eine Frage um, behält sie ihre Antworten. Wechselst du den Typ so, dass sich die gespeicherte Art ändert (z. B. von Text zu Zahl), entsteht eine neue Eigenschaft – die bisherigen Antworten bleiben in der alten.

## Kundenportal

Mit dem Kundenportal wird ein Formular zum Service-Desk: Wer es absendet, kann seine Anfrage danach verfolgen.

1. Unter **Formular teilen** das **Kundenportal** einschalten.
2. Auswählen, welche Eigenschaften im Portal sichtbar sind – etwa **Status** oder ein Fälligkeitsdatum. Eine Auswahl-Eigenschaft namens „Status“ ist beim Einschalten schon vorgewählt. Personen, Relationen und Dateien bleiben immer intern.

Nach dem Absenden sieht die Person einen privaten Link zu ihrer Anfrage. Hat sie eine E-Mail-Frage beantwortet und ist E-Mail eingerichtet, kommt der Link auch per E-Mail – in ihrer Sprache. Auf der Seite stehen der Stand, ihre Angaben und eine Unterhaltung mit dem Team.

Das Team antwortet im Eintrag unter **Kundenanfrage**. Antworten gehen per E-Mail an die Person; schreibt sie zurück, bekommen die Personen im Eintrag, alle, die schon geantwortet haben, und wer die Datenbank angelegt hat, eine Benachrichtigung. **Kundenlink kopieren** gibt den Link weiter, wenn keine E-Mail-Adresse vorliegt.

> [!NOTE]
> Der Link ist der Schlüssel: Wer ihn hat, sieht die Anfrage und kann antworten. Schaltest du das Kundenportal oder das Formular aus, funktionieren alle Links nicht mehr; eingeschaltet gehen sie wieder.
