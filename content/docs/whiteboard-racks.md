---
keywords: Rack, Server, Rechenzentrum, Verkabelung, Ports, Switch, Patchpanel, HE
---

# Racks und Verkabelung

Auf einem Whiteboard planst du Server-Racks: Racks mit ihren Höheneinheiten (HE), Geräte darin, Ports an den Geräten und Kabel von Port zu Port. Racks und Geräte sind Elemente wie Zettel und Formen – du kombinierst sie frei mit Notizen, Text, Rahmen und Netzwerkdiagrammen aus der [Formenbibliothek](/whiteboard-diagrams#diagramme-formenbibliotheken). Gemeinsames Arbeiten, Rückgängig, Kommentare, Präsentieren und der Export als SVG, PNG oder PDF funktionieren wie bei allen anderen Elementen.

## Racks anlegen

**Racks** unter **+** öffnet die Gerätebibliothek (auf dem Smartphone unter **Weitere Werkzeuge** als Blatt). Oben legst du ein **Rack 42 HE**, **Rack 24 HE** oder einen **Wandschrank 12 HE** an – per Klick neben das letzte Rack oder per Ziehen an eine Stelle. Mehrere Racks stehen so nebeneinander.

Ein ausgewähltes Rack zeigt rechts seine **Details**: Name, Standort, Höhe in HE (1–60), Breite (10″, 19″ oder 23″), **Ansicht** Vorder- oder Rückseite, **Max. Leistung** (W) und **Max. Gewicht** (kg), dazu die belegten HE, die Summe aus Leistung und Gewicht und die Liste der Geräte. Die Höhe änderst du auch mit den Griffen oben und unten am Rack. **Vorne/Hinten** in der Leiste über dem Rack dreht es um.

## Geräte einbauen

Die Bibliothek enthält Server (1, 2 und 4 HE), Speicher/NAS, Switches (24 und 48 Ports, 24 × SFP+, jeweils mit SFP-Uplinks und Konsole), Patchfelder (24 und 48 Ports, LWL mit 24 × LC), Router, Firewall, USV, PDU (1 HE und senkrecht als 0 HE), Blindplatten, Kabelführung und Fachböden – jeweils mit Höhe, Ports, Leistung und Gewicht.

- **Ziehen** legt ein Gerät an eine Stelle: über einem Rack rastet es an ganzen HE ein, daneben liegt es frei auf dem Board.
- **Klicken** (oder <kbd>Enter</kbd> im Suchfeld) setzt es in das ausgewählte Rack – oder in das Rack in der Mitte der Ansicht – an den obersten freien Platz. Ist das Rack voll, liegt das Gerät daneben.
- Eingebaute Geräte verschiebst du mit der Maus in andere HE oder in ein anderes Rack; mit <kbd>↑</kbd>/<kbd>↓</kbd> um eine HE (<kbd>⇧</kbd>: fünf HE), mit <kbd>⌥</kbd> <kbd>↑</kbd>/<kbd>↓</kbd> änderst du die Höhe. Die Griffe oben und unten ändern die Höhe ebenfalls in ganzen HE.
- **Duplizieren** (<kbd>⌘</kbd> <kbd>D</kbd>) setzt die Kopie an den nächsten freien Platz desselben Racks. Wird ein Rack gelöscht, gehen seine Geräte mit.
- Überschneiden sich zwei Geräte oder ragt eines aus dem Rack, werden beide rot schraffiert und mit **!** markiert; das Rack zählt sie in seinen Details.

Geräte können **halbe Tiefe** haben (vorne oder hinten eingebaut): Ein vorderes und ein hinteres Gerät teilen sich dann dieselben HE. In der anderen Ansicht erscheinen sie nur als gestrichelter Umriss. Senkrechte PDUs baust du als **0 HE links/rechts** in den seitlichen Kanal.

Die **Details** eines Geräts: Name, Art, **Rollen**, Hersteller, Modell, Seriennummer, **Hostname**, **IP-Adressen**, **MAC-Adresse**, Höhe, Position (unterste HE), Einbau, Tiefe, Farbe, Leistung (W), Gewicht (kg), Notizen – bei PDU und USV auch **Belastbar bis** (W) mit der aktuellen Last. **Aus dem Rack nehmen** legt es neben das Rack.

- **Rollen** sind freie Schlagwörter mit Vorschlägen wie Docker-Host, Hypervisor, Bare-Metal, NAS, Router oder Firewall.
- **IP-Adressen** nimmt eine oder mehrere IPv4- oder IPv6-Adressen (auch mit `/24`), getrennt durch Komma, Leerzeichen oder Zeilenumbruch. Ungültige Einträge werden nicht gespeichert und beim Verlassen des Felds angezeigt. Die **MAC-Adresse** wird einheitlich als `aa:bb:cc:dd:ee:ff` gespeichert, egal ob mit `-`, `.` oder ohne Trennzeichen eingegeben.
- Netzwerk-Ports (RJ45, SFP/QSFP) haben zusätzlich eine eigene MAC- und IP-Adresse – jede Netzwerkkarte hat ihre eigene.
- Fährt die Maus kurz über ein Gerät, zeigt eine **Visitenkarte** alles auf einen Blick: Name, Art, Rollen, Hostname, IP- und MAC-Adressen (je mit Knopf zum Kopieren), Hersteller und Modell, Höhe und Position, Leistung, belegte Ports und den Anfang der Notizen. Auf dem Telefon oder Tablet öffnet langes Drücken die Karte, mit der Tastatur <kbd>I</kbd> für das ausgewählte Gerät; <kbd>Esc</kbd> schließt sie.
- Suche, Markdown- und CSV-Export und der [NetBox-Import](/whiteboard-racks) übernehmen Hostname, Adressen und Rollen (aus NetBox: primäre IP mit DNS-Name, MAC und IP der Schnittstellen, Rolle und Tags). **Als eigenes Gerät speichern** lässt Hostname und Adressen weg.

**Als eigenes Gerät speichern** legt das Gerät mit seinen Ports und Werten in der Bibliothek des Arbeitsbereichs ab (Abschnitt **Eigene Geräte**). Löschen dürfen es die Person, die es gespeichert hat, und Besitzer des Arbeitsbereichs.

## Ports

Jedes Gerät hat Ports mit Name, Typ (RJ45, SFP, SFP+, SFP28, QSFP+, QSFP28, LC, SC, MPO, Konsole, USB, C13, C14, C19, C20, Schuko, DC), Seite (vorne oder hinten), Bezeichnung und VLAN. Gezeichnet werden die Ports der Seite, die das Rack zeigt; verbundene Ports tragen die Farbe ihres Kabels, ein Tooltip nennt Name, Typ und Bezeichnung. In den Details änderst oder entfernst du Ports und fügst mit **Ports hinzufügen** mehrere auf einmal hinzu (Anzahl, Typ, Seite, Präfix wie `Gi1/0/`). Ein Klick auf einen Port auf dem Board zeigt ihn in den Details.

## Kabel

Kabel sind Verbindungslinien, deren Enden auf Ports sitzen: Mit dem **Verbindungswerkzeug** (<kbd>L</kbd>) ziehst du von einem Port zu einem anderen – auch zwischen zwei Racks. Eine Linie, die auf einem Port beginnt oder endet, wird zum Kabel; der Typ richtet sich nach den Ports (Strom, Konsole, Glasfaser, DAC oder Cat6a). Ohne Zeichnen geht es in den Details eines Geräts: **Verbinden …** am Port, dann Gerät und freien Port wählen.

Kabel laufen wie in einem aufgeräumten Rack: vom Port zur Kante des Geräts, durch den seitlichen Kanal und zwischen Racks über die Racks hinweg; jedes Kabel hat seine eigene Spur. Liegen sich zwei Ports direkt gegenüber – an der Unterkante des oberen und der Oberkante des unteren Geräts, oder an derselben Kante eines Geräts – und steht kein anderes Gerät dazwischen, läuft das Kabel gerade hinüber statt durch den Kanal. Farbe und Strich richten sich nach dem Typ (z. B. OM3 türkis, OM4 violett, OS2 gelb, Strom dick, DAC gestrichelt), eine eigene Farbe hat Vorrang. Fährst du über ein Kabel oder wählst es aus, leuchten beide Enden auf. **Kabel zeigen** im Menü der Ansicht blendet alle Kabel aus und wieder ein (die Wahl gilt in diesem Browser).

Die **Details** eines Kabels: die beiden Enden (ein Klick springt zum Gerät und Port), Kabeltyp (Cat5e, Cat6, Cat6a, Cat7, Cat8, OM3, OM4, OM5, OS2, DAC, AOC, Strom, Konsole, Sonstiges), Farbe, Beschriftung, Länge in Metern, VLAN und Notizen. Steckt auf einem Port mehr als ein Kabel, weisen die Details darauf hin.

## Strom und Gewicht

Leistung und Gewicht der Geräte ergeben die Summen je Rack (im Rack-Kopf und in den Details). Stromkabel von einer PDU oder USV zu einem Gerät ergeben die Last der PDU: Ein Gerät mit zwei Netzteilen an zwei PDUs verteilt seine Leistung auf beide, eine PDU an einer USV gibt ihre ganze Last an die USV weiter. Überschreitet ein Rack seine **Max. Leistung** oder sein **Max. Gewicht** oder eine PDU/USV ihre Belastbarkeit, erscheint eine Warnung im Rack-Kopf, am Gerät und in den Details.

## Ports und Kabel im Überblick

**Ports und Kabel** (im Menü der Ansicht und in der Gerätebibliothek) zeigt alle Ports des Boards als Tabelle – Rack, Gerät, Port, Typ, verbunden mit, Kabel, VLAN – und alle Kabel mit Beschriftung, Typ, Enden, Länge und VLAN. Filtern nach Text, Kategorie (Netzwerk, Glasfaser, Strom) und Belegung (verbunden, frei), Sortieren per Klick auf die Spaltenköpfe; ein Klick auf eine Zeile zeigt das Gerät oder Kabel auf dem Board. **Als CSV exportieren** lädt die gefilterte Liste herunter, **Etiketten drucken** druckt für jedes Kabel ein Etikett je Ende (Beschriftung, dieses Ende, das andere Ende, Typ, Länge, VLAN).

## Importieren und exportieren

- **JSON exportieren** (Gerätebibliothek) speichert die Racks mit Geräten, Ports und Kabeln – die ausgewählten oder alle – als Datei; **JSON importieren** legt sie auf ein Board. So übernimmst du Racks in andere Boards und Arbeitsbereiche.
- **Aus NetBox …** holt Racks aus [NetBox](https://netboxlabs.com/): NetBox-Adresse, ein API-Token (Lesen genügt) und optional Standort (Slug) und Racknamen eingeben. Flowplan fragt Racks, Geräte, Gerätetypen (Höhe, Tiefe, Gewicht), Schnittstellen, Front- und Rear-Ports, Konsole, Strom-Ports und Kabel einmal ab und legt sie auf das Board (bis 20 Racks). Adresse und Token werden nur für diese Abfrage verwendet und nicht auf dem Server gespeichert; **Adresse und Token in diesem Browser merken** speichert sie nur in deinem Browser. NetBox muss über eine öffentliche HTTPS-Adresse erreichbar sein – für ein NetBox im internen Netz siehe `NETBOX_ALLOW_PRIVATE` in der [Konfiguration](/configuration-integrations#integrationen).
- Der **SVG-, PNG- und PDF-Export** des Boards zeigt die Racks, wie sie auf dem Board stehen. Der **Markdown-Export** enthält zum SVG-Bild des Boards einen Abschnitt **Racks und Verkabelung** mit den Geräten je Rack, der Portbelegung und der Kabelliste als Tabellen.

Die KI und [MCP](/mcp) (`read_page`) lesen die Racks, Geräte, Ports und Kabel eines Boards als Text mit. Auf dem Smartphone siehst du Racks und bearbeitest sie: Tippen wählt ein Gerät, **Details** in der Leiste öffnet die Details als Blatt, die Gerätebibliothek liegt unter **Weitere Werkzeuge**.
