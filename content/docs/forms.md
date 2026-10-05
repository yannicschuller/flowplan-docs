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

## Kundenportal

Mit dem Kundenportal wird ein Formular zum Service-Desk: Wer es absendet, kann seine Anfrage danach verfolgen.

1. Unter **Formular teilen** das **Kundenportal** einschalten.
2. Auswählen, welche Eigenschaften im Portal sichtbar sind – etwa **Status** oder ein Fälligkeitsdatum. Eine Auswahl-Eigenschaft namens „Status“ ist beim Einschalten schon vorgewählt. Personen, Relationen und Dateien bleiben immer intern.

Nach dem Absenden sieht die Person einen privaten Link zu ihrer Anfrage. Hat sie eine E-Mail-Frage beantwortet und ist E-Mail eingerichtet, kommt der Link auch per E-Mail – in ihrer Sprache. Auf der Seite stehen der Stand, ihre Angaben und eine Unterhaltung mit dem Team.

Das Team antwortet im Eintrag unter **Kundenanfrage**. Antworten gehen per E-Mail an die Person; schreibt sie zurück, bekommen die Personen im Eintrag, alle, die schon geantwortet haben, und wer die Datenbank angelegt hat, eine Benachrichtigung. **Kundenlink kopieren** gibt den Link weiter, wenn keine E-Mail-Adresse vorliegt.

> [!NOTE]
> Der Link ist der Schlüssel: Wer ihn hat, sieht die Anfrage und kann antworten. Schaltest du das Kundenportal oder das Formular aus, funktionieren alle Links nicht mehr; eingeschaltet gehen sie wieder.
