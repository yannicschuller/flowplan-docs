# Dashboards

Eine Seite aus Kacheln: Kennzahlen, Diagramme und Ansichten deiner Datenbanken, fällige Aufgaben, deine Journal-Serie und Notizen – auf einen Blick und für jede Person mit genau den Daten, die sie sehen darf.

## Dashboard anlegen

**Neue Seite → Dashboard** (oder `> Neues Dashboard` in der Schnellsuche). Ein neues Dashboard ist leer; **Erste Kachel hinzufügen** öffnet die Einstellungen der ersten Kachel.

## Kacheln

| Kachel | Zeigt |
| --- | --- |
| **Datenbankansicht** | Eine Ansicht einer Datenbank, wie sie die verknüpfte Datenbank im Dokument zeigt. Mit **Einträge hier bearbeitbar** lassen sich Einträge direkt im Dashboard ändern, sonst nur lesen. |
| **Kennzahl** | Die Anzahl der Einträge einer Ansicht (mit ihren Filtern) oder Summe, Mittelwert, Minimum bzw. Maximum einer Zahl-Eigenschaft. Mit einem **Ziel** erscheint ein Fortschrittsbalken. |
| **Diagramm** | Säulen, Balken, Linie oder Donut über eine Eigenschaft – gezeichnet wie die Diagrammansicht; ein Klick auf einen Eintrag öffnet ihn. |
| **Journal-Serie** | Wie viele Tage in Folge du in einem Journal geschrieben hast, dazu der heutige Eintrag oder **Heute schreiben**. |
| **Meine fälligen Aufgaben** | Deine Aufgaben aus **Meine Aufgaben**, die heute fällig oder überfällig sind. |
| **Zuletzt geändert** | Die zuletzt geänderten Seiten und die Zahl ungelesener Benachrichtigungen im [Posteingang](/search-and-notifications#posteingang). |
| **Text** | Freier Text in Markdown – für Überschriften, Hinweise oder Links. |

## Anordnen und Größe

**Bearbeiten** oben rechts schaltet in den Bearbeitungsmodus:

- **Kachel hinzufügen** legt eine neue Kachel an.
- Kacheln **ziehen**, um die Reihenfolge zu ändern – oder im Kachel-Menü (**…**) **Nach vorne**/**Nach hinten**.
- Im Kachel-Menü die **Größe** wählen: Klein (ein Viertel), Mittel (die Hälfte), Groß (zwei Drittel) oder Volle Breite. Auf dem Telefon stehen alle Kacheln untereinander.
- **Einstellen …** ändert Quelle, Titel und Werte; **Entfernen** löscht die Kachel.

**Fertig** beendet den Bearbeitungsmodus. Jede Änderung wird sofort gespeichert.

## Rechte

- Kacheln anlegen und ändern dürfen Personen mit Bearbeitungsrechten an der Seite; Leserinnen und Leser sehen das Dashboard nur an.
- Jede Kachel rechnet mit den Rechten der Person, die das Dashboard ansieht: Private Einträge zählen nur für die, die sie sehen dürfen. Eine Kachel über eine Datenbank oder ein Journal, das jemand nicht lesen darf (oder das per PIN gesperrt ist), zeigt dieser Person nur **Nicht verfügbar** – ohne Titel oder Werte.
- Quellen müssen im selben Arbeitsbereich liegen.

## Kopieren, Export und Papierkorb

- **Duplizieren** kopiert das Dashboard mit allen Kacheln; wird eine Datenbank mitkopiert, zeigt die Kachel in der Kopie auf die Kopie.
- Der Markdown-Export enthält eine Textübersicht der Kacheln (Titel, Art, Quelle, Texte), PDF, Word und EPUB ebenso. Die Werte selbst hängen davon ab, wer schaut, und werden deshalb nicht exportiert.
- Gelöschte Dashboards liegen wie jede Seite im Papierkorb und lassen sich mit allen Kacheln wiederherstellen.
- Über die [API](/api-and-webhooks) speichert die Aktion `dashboard.save` die Kacheln einer Dashboard-Seite.
