# Marketplace

Im **Flowplan Marketplace** (marketplace.flowplan.org) teilen Menschen, was sie in Flowplan gebaut haben: Dokument- und Datenbankvorlagen, Workflows, Whiteboard-Vorlagen, Erscheinungsbilder und Regeln für automatische Links. Du kannst dort stöbern und Vorlagen mit einem Klick in deine Instanz übernehmen – oder eigene Vorlagen veröffentlichen. Die Vorlagen, die mit Flowplan kommen, stehen dort ebenfalls (gemeinfrei, CC0).

Zum Stöbern und Übernehmen brauchst du kein Konto beim Marketplace. Zum Veröffentlichen meldest du dich dort mit GitHub oder einem E-Mail-Link an. Jede Einreichung wird geprüft, bevor sie öffentlich wird.

## Was sich teilen lässt

| Art | Wo in Flowplan | Wer veröffentlichen darf | Was beim Übernehmen entsteht |
| --- | --- | --- | --- |
| Dokument- und Datenbankvorlagen | Vorlagengalerie → **Deine Vorlagen** | wer die Vorlage angelegt hat, Eigentümer | eine Vorlage in der Galerie (für den Arbeitsbereich, einen Bereich oder nur dich) |
| Workflows | Kopf der Workflow-Seite (Symbol **Marketplace**) | wer den Workflow bearbeiten darf | eine neue Workflow-Seite – **pausiert, als Entwurf** |
| Whiteboard-Vorlagen | Whiteboard → **Vorlagen → Eigene Vorlagen** | wer die Vorlage angelegt hat, Eigentümer | eine eigene Whiteboard-Vorlage des Arbeitsbereichs |
| Erscheinungsbild | Einstellungen → **Erscheinungsbild** | Eigentümer | ersetzt das Erscheinungsbild des Arbeitsbereichs (mit den Schriften) |
| Automatische Links | Einstellungen → **Automatische Links** | Eigentümer | die Regeln kommen zu den vorhandenen dazu |

Gäste veröffentlichen nie etwas.

## Veröffentlichen

1. Bei der Vorlage, dem Workflow oder in den Einstellungen **Im Marketplace veröffentlichen …** wählen.
2. Im Dialog Titel, Kurzbeschreibung (Deutsch und Englisch), Kategorie, Schlagwörter und Sprache prüfen und bis zu **vier Vorschaubilder** hinzufügen (PNG, JPEG oder WebP, je höchstens 1 MB). Für Dokumente und Datenbanken lohnt sich ein Bildschirmfoto – Flowplan erstellt selbst keins.
3. **Im Marketplace öffnen**: Flowplan erstellt die Datei, öffnet die Einreichungsseite des Marketplace in einem neuen Fenster und übergibt sie dort. Du meldest dich an, wählst die **Lizenz** (Standard CC BY 4.0, außerdem CC0 und MIT), bestätigst, dass du die Rechte am Inhalt hast, und reichst ein.
4. Alternativ **Als Datei herunterladen**: Die `.flowplan-template`-Datei lädst du dann auf der Einreichungsseite selbst hoch.

Was nie mitkommt: Zugangsdaten, Läufe und Webhook-Adressen eines Workflows, die Adresse deiner Instanz, Namen von Personen, hochgeladene Bilder eines Whiteboards (nur Bilder mit https-Adresse) und Datensatzkarten. Verweise eines Workflows auf Seiten, Datenbanken und Personen werden beim Übernehmen über den Namen neu zugeordnet oder bleiben leer. Bei Erscheinungsbildern mit eigenen Schriften: Veröffentliche nur Schriften, deren Lizenz das Weitergeben erlaubt.

## Übernehmen

1. Auf der Seite einer Vorlage im Marketplace **In Flowplan öffnen** wählen und einmal die Adresse deiner Instanz angeben (zum Beispiel `https://flowplan.example.org`). Sie bleibt nur in deinem Browser.
2. Flowplan öffnet sich in einem neuen Fenster und bekommt die Vorlage. Bist du nicht angemeldet, meldest du dich zuerst an – die Vorlage wartet so lange in deinem Browser (bis zu 24 Stunden).
3. Eine Vorschau zeigt Titel, Art, Autorin oder Autor, Lizenz und **was entsteht**. Bei Workflows siehst du alle Knoten, die externen Dienste, die er anspricht, ob er KI-Schritte nutzt oder E-Mails verschickt – und was du nach dem Import im Editor festlegen musst.
4. Arbeitsbereich und Bereich (bei Workflows auch die übergeordnete Seite) wählen und **Übernehmen**.

Workflows kommen immer **pausiert, als Entwurf** an. Prüfe sie, ergänze fehlende Angaben und aktiviere sie selbst.

Eine heruntergeladene `.flowplan-template`-Datei übernimmst du unter **Einstellungen → Import & Export → Vorlage aus dem Marketplace** oder in der Vorlagengalerie über **Vorlage importieren**.

Flowplan prüft jede Datei selbst noch einmal: Größe (höchstens 25 MB), Aufbau der Datei, Pfade, Kompression und den Inhalt jeder Art – genau wie beim Import aus einer anderen Instanz.

## Datenschutz

- **Deine Instanz verbindet sich nie mit dem Marketplace.** Die Übergabe läuft in deinem Browser zwischen den beiden Fenstern; Flowplan schickt nur an die eingestellte Marketplace-Adresse und nimmt nur von dort etwas an.
- Der Marketplace erfährt die Adresse deiner Instanz nicht. Er zählt nur anonym, wie oft eine Vorlage heruntergeladen oder in Flowplan geöffnet wurde – ohne IP-Adressen und ohne Cookies für Besucher.
- Beim Veröffentlichen geht nur die Datei an den Marketplace, die du im Dialog gesehen hast.

## Ausschalten

Administratoren schalten den Marketplace unter **Administration → Erweiterungen & Domains → Marketplace** für die ganze Instanz aus. Dann zeigt Flowplan keine Marketplace-Schaltflächen und nimmt keine Vorlagen mehr an.

Über die Umgebung geht es auch: `FLOWPLAN_MARKETPLACE_URL=off` schaltet den Marketplace ab, eine andere Adresse (etwa ein eigener Marketplace) ersetzt `https://marketplace.flowplan.org`.
