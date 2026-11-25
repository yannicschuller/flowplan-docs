---
keywords: Funktionen, Module, ausschalten, abschalten, Instanz, Workflows, KI, Lernkarten, Formulare, Hintergrundjobs, Admin
---

# Funktionen dieser Instanz

Unter **Einstellungen → Instanz → Name & Version → Funktionen dieser Instanz** schaltest du Funktionen für die ganze Instanz aus – dieselbe Liste wie bei [Funktionen ein- und ausblenden](/settings#funktionen-ein-und-ausblenden). Anders als dort ist die Funktion dann nicht nur ausgeblendet, sondern aus: Vor dem Ausschalten fragt Flowplan nach.

## Ausschalten und wieder einschalten {since=0.11.0}

- **Für alle ausgeblendet**, egal was jemand selbst gewählt hat. In den eigenen Einstellungen steht der Schalter auf aus, ist gesperrt und trägt den Hinweis **Von der Administration für diese Instanz ausgeschaltet**; bei **Funktionen für neue Konten** ebenso.
- **Der Server lehnt sie ab:** Neue Seiten dieser Art, ihre Befehle, die zugehörigen API-Routen und MCP-Werkzeuge antworten mit 403 und „… auf dieser Instanz ausgeschaltet“. MCP-Clients bekommen die Werkzeuge der Funktion gar nicht erst angezeigt.
- **Keine Hintergrundarbeit:** Was für die Funktion im Hintergrund läuft, pausiert – jede Runde prüft die Einstellung neu, im Cluster-Betrieb auf jeder Instanz.
- **Vorhandenes bleibt unverändert:** Seiten dieser Art stehen weiter in der Seitenleiste, in der Suche und im Papierkorb und öffnen sich nur zum Lesen, mit dem Hinweis **Auf dieser Instanz ausgeschaltet**. Umbenennen, Verschieben, Löschen, Wiederherstellen, Exporte und Sicherungen funktionieren wie immer.
- **Öffentliche Links** zu solchen Seiten zeigen „nicht verfügbar“.

Schaltest du die Funktion wieder ein, ist alles wie vorher: Es wurde nichts gelöscht oder umgebaut. Jede Änderung steht im [Aktivitätsprotokoll](/administration#aktivitaetsprotokoll) (`admin.modulesOff`, etwa „off: workflows“).

| Funktion | Ausgeschaltet |
| --- | --- |
| Lernkarten | Keine Lernkarten-Befehle und kein Lernen (auch nicht über geteilte Links); vorhandene Ansichten **Lernen** zeigen einen Hinweis, Karten und Lernstand bleiben. Die tägliche Lernerinnerung pausiert. |
| Whiteboards, Notizbücher, Dashboards | Keine neuen Seiten dieser Art, vorhandene nur zum Lesen; Whiteboard-Vorlagen, Racks und Moderation sowie die Live-Bearbeitung über Links sind gesperrt. |
| Journal | Keine neuen Journale und keine Journal-Befehle; Journal und Tagesseiten nur zum Lesen. |
| Workflows | Keine neuen Workflows und keine Läufe. Die Warteschlange und die Zeitpläne laufen nicht, Ereignisse werden nicht aufgezeichnet (es staut sich nichts für später) und Webhooks antworten mit 403. Was schon in der Warteschlange stand, läuft nach dem Einschalten weiter; von einem verpassten Zeitplan läuft dann höchstens der letzte Termin, wie nach einem Neustart. |
| draw.io | Der draw.io-Editor öffnet sich nicht mehr; vorhandene Diagramme bleiben als Bild in den Seiten. |
| KI | Wie der Hauptschalter unter **Einstellungen → Instanz → KI**: keine KI-Funktion, auch nicht auf dem Gerät. KI-Eigenschaften, die Warteschlange und der semantische Index pausieren und werden nach dem Einschalten abgearbeitet. |
| Weitere Ansichten | Keine neuen Ansichten dieser Arten; vorhandene bleiben, wie sie sind. |
| Formulare | Alle Formulare sind geschlossen – auch öffentliche – mit dem Hinweis, dass Formulare auf dieser Instanz ausgeschaltet sind; die Ansicht **Formular** zeigt einen Hinweis, Antworten bleiben. |
| Besprechungen | Nichts wird aufgenommen, transkribiert oder zusammengefasst, Erinnerungen an Besprechungen pausieren. Aufbewahrtes Audio lässt sich weiter löschen und wird nach Ablauf der Aufbewahrung weiter entfernt. |
