---
keywords: Erscheinungsbild, Logo, Farben, Schrift, Branding, automatische Links, Druckvorlage
---

# Arbeitsbereich gestalten

Name, Symbol, Farben und Schrift eines Arbeitsbereichs, automatische Links für wiederkehrende Begriffe und eigene Druckvorlagen – eingestellt von den Eigentümern.

## Erscheinungsbild

Eigentümer geben dem Arbeitsbereich unter **Einstellungen → Erscheinungsbild** ein eigenes Aussehen, etwa in den Farben und Schriften eurer Organisation. Es gilt für alle Mitglieder und Gäste, sobald dieser Arbeitsbereich offen ist – beim Wechsel in einen anderen wechselt auch das Aussehen –, und ebenso für seine [veröffentlichten Seiten](/sharing) und [Formulare](/forms). Zwei Vorschaukarten zeigen die Änderungen hell und dunkel, bevor du speicherst; **Auf Standard zurücksetzen** stellt Flowplans eigenes Aussehen wieder her.

- **Akzentfarbe**: eine Farbe aus der Auswahl oder eine eigene. Daraus leitet Flowplan die Farben für Links, Schaltflächen, Auswahl und Markierungen ab, getrennt für den hellen und den dunklen Modus. Damit Text auf der Farbe und die Farbe als Text gut lesbar bleiben (mindestens 4,5 : 1 nach WCAG), dunkelt Flowplan eine zu helle Farbe ab (im dunklen Modus hellt es eine zu dunkle auf) und zeigt dir, welche Farbe tatsächlich verwendet wird.
- **Hintergrund**: Standard (warm), Neutral, Kühl oder Sepia – jeweils mit passender dunkler Fassung. Freie Hintergrundfarben gibt es nicht, damit Texte überall lesbar bleiben.
- **Schriften**: je eine für die Oberfläche, für große Überschriften und für Code. Zur Wahl stehen Flowplans eigene Schriften, die Systemschrift und rund fünfzehn weitere, darunter Inter, Atkinson Hyperlegible Next, IBM Plex, Source Sans/Serif/Code, Lora, Literata, Merriweather, EB Garamond und Fira Code. Alle liegen auf deinem Flowplan-Server: Der Browser lädt nur die gewählten, und keine Anfrage geht an einen fremden Schriftdienst. Seiten, deren Schrift auf Serif gewechselt wurde, verwenden die Überschriftenschrift.
- **Eigene Schriften**: Eine Hausschrift lässt sich als WOFF2, WOFF, TTF oder OTF hochladen (bis 5 MB, bis zu 20 je Arbeitsbereich) und dann für jeden der drei Bereiche wählen. Sie zählt zum [Speicherkontingent](/workspaces-and-permissions#speicherkontingent) des Arbeitsbereichs und wird mit ihm gelöscht. Lade nur Schriften hoch, deren Lizenz die Nutzung im Web erlaubt.

Hell oder dunkel wählt weiterhin jede Person selbst. Wer lieber Flowplans eigenes Aussehen behält, schaltet **Einstellungen → Darstellung & Sprache → Darstellung des Arbeitsbereichs verwenden** aus; das gilt für das eigene Konto in allen Arbeitsbereichen und auf allen Geräten.

Eigenes CSS ist bewusst nicht möglich: Mit CSS ließen sich Inhalte unbemerkt nach außen schicken, und es würde bei Updates der App brechen.

Das Aussehen und die hochgeladenen Schriften stecken im [Inhaltsarchiv](/import-export-versions#inhaltsarchiv) des Arbeitsbereichs. Beim Import übernimmt es ein Eigentümer in einen Arbeitsbereich, der noch Flowplans eigenes Aussehen hat; ein schon gewähltes Aussehen bleibt.

Fertige Erscheinungsbilder, auch mit Schriften, findest du im [Flowplan Marketplace](https://marketplace.flowplan.org).

## Automatische Links

Eigentümer legen unter **Einstellungen → Arbeitsbereich → Automatische Links** Regeln an, die Text wie `ABC-123` beim Schreiben zu einem Link machen – etwa auf das Ticket in Jira oder das Issue auf GitHub. Die Regeln gelten für alle Mitglieder und Gäste des Arbeitsbereichs. Jede Regel hat einen optionalen Namen, ein **Muster** (ein regulärer Ausdruck, höchstens 200 Zeichen), eine **Link-Vorlage** und einen Schalter zum Aus- und Einschalten; bis zu 50 Regeln sind möglich.

In der Vorlage steht `{match}` für den ganzen Treffer, `$1` bis `$9` (oder `{1}` bis `{9}`) für die Gruppen in Klammern. Die Werte werden URL-kodiert eingesetzt, und die Vorlage muss mit `https://`, `http://` oder `mailto:` beginnen. Beispiele:

| Muster | Link-Vorlage | Aus | wird |
| --- | --- | --- | --- |
| `\bABC-\d+\b` | `https://jira.example.com/browse/{match}` | ABC-123 | https://jira.example.com/browse/ABC-123 |
| `#(\d+)` | `https://github.com/acme/app/issues/$1` | #42 | https://github.com/acme/app/issues/42 |

Unter **Ausprobieren** gibst du einen Beispieltext ein und siehst sofort, welche Stellen zu welchem Link werden. Ungültige Muster, Muster, die auf leeren Text passen, verschachtelte Wiederholungen wie `(a+)+` (sie können den Browser ausbremsen) und Vorlagen ohne gültige Adresse werden markiert und nicht gespeichert.

Fertige Link-Regeln für gängige Dienste findest du im [Flowplan Marketplace](https://marketplace.flowplan.org).

## Druckvorlagen

Unter **Einstellungen → Arbeitsbereich → Druckvorlagen** legen Eigentümerinnen und Eigentümer [Druckvorlagen](/print-and-pdf#druckvorlagen) für alle im Arbeitsbereich an – benannte Druckoptionen wie „Sauber für extern“ – und wählen mit dem Stern eine Standardvorlage. Mitglieder und Gäste wählen sie im Druckfenster, ändern können sie sie nicht.
