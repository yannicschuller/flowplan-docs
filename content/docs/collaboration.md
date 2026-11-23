---
keywords: Kommentare, gemeinsam, Live, Echtzeit, Erwähnung, Vorschläge
---

# Zusammenarbeit und Kommentare

Mehrere Personen schreiben gleichzeitig in derselben Seite, ohne sich zu überschreiben. Kommentare, Erwähnungen und der Posteingang halten Gespräche beim Inhalt.

## Gleichzeitig bearbeiten

- Dokumente und Eintragsinhalte werden über Yjs (CRDT) zusammengeführt: Jede Änderung bleibt erhalten, auch wenn zwei Personen im selben Absatz tippen.
- Änderungen erscheinen bei den anderen nach Sekundenbruchteilen: Der Server schiebt jede gespeicherte Änderung sofort an alle, die dasselbe Dokument offen haben (Server-Sent Events). Übertragen wird nur das Geänderte, nicht das ganze Dokument.
- **Farbige Cursor und Auswahlen** mit Namen zeigen, wo andere gerade schreiben; Bewegungen kommen ebenfalls sofort an.
- Auch **Seitenleiste, offene Datenbanken und Posteingang** bleiben aktuell, ohne neu zu laden: Legt jemand eine Seite an, benennt sie um, ändert einen Eintrag in der Datenbank, die du offen hast, oder erwähnt dich, siehst du das nach wenigen Sekunden. Der Server meldet nur, *dass* sich etwas geändert hat – nie Titel oder Seiten, die du nicht sehen darfst; dein Browser holt dann das Geänderte mit deinen Rechten. Mehrere Tabs teilen sich dafür eine Verbindung. Ohne diese Verbindung (etwa hinter einem Proxy, der Server-Sent Events puffert) gleicht Flowplan wie bisher alle 10 Sekunden ab. {since=0.11.0}
- Ohne Verbindung arbeitest du weiter; die Änderungen werden abgeglichen, sobald das Netz zurück ist.
- Datenbank-Änderungen werden auf Versionskonflikte geprüft: Hat jemand denselben Eintrag inzwischen geändert, wird deine Änderung nicht stillschweigend darübergeschrieben, sondern abgelehnt, und du siehst den neuen Stand.
- Gäste mit Bearbeitungslink arbeiten ebenfalls live mit und sehen die Cursor der Mitglieder; Mitglieder sehen die Gäste als „Gast · <Linkname>“.
- Auf Whiteboards gibt es zusätzlich [Live-Cursor](/whiteboard-collaboration#gemeinsam-arbeiten) wie in Miro.

## Änderungen vorschlagen

Der Stift-Knopf **Vorschlagen** in der Werkzeugleiste schaltet den Vorschlagsmodus ein. Dann ändert Tippen den Text nicht direkt:

- **Eingefügter Text** erscheint grün unterstrichen, **gelöschter Text** bleibt rot durchgestrichen stehen. Überschreiben einer Markierung erzeugt beides.
- Wer den eigenen Vorschlag wieder löscht, entfernt ihn ganz.
- Über dem Text zeigt eine Leiste die Zahl der offenen Vorschläge. Aufgeklappt listet sie jeden mit Person und Text; ein Klick springt zur Stelle. **✓** nimmt einen Vorschlag an (Einfügung bleibt, Gelöschtes verschwindet), **✗** lehnt ihn ab. **Alle annehmen** und **Alle ablehnen** erledigen alles auf einmal.
- Vorschläge sind Teil des Dokuments: Sie erscheinen bei allen sofort und bleiben gespeichert, bis jemand sie annimmt oder ablehnt. Annehmen und ablehnen kann jeder, der die Seite bearbeiten darf.
- Formatierungen, Absatzwechsel und verschobene Blöcke werden auch im Vorschlagsmodus direkt übernommen; Änderungen anderer Personen werden nie zu deinen Vorschlägen.
- Auch in **Codeblöcken** werden Änderungen als Vorschläge markiert. Wird ein Absatz oder Listenpunkt durch Annehmen oder Ablehnen ganz leer (ein vorgeschlagener neuer Absatz abgelehnt, ein ganz gelöschter angenommen), verschwindet er mit.
- **Vorschläge der KI:** In [KI fragen](/ask-ai) setzt **Als Änderungsvorschlag einfügen** die Antwort genauso als Vorschläge in die Seite – mit deinem Namen und „(KI)“.

## Reaktionen

- **Kommentare**: Unter jedem Seiten- und Eintragskommentar fügt das Smiley eine Reaktion hinzu (👍 ❤️ 🎉 😄 👀 ✅ 🙏 🔥). Ein Klick auf eine vorhandene Reaktion schließt sich an oder nimmt die eigene zurück; der Tooltip zeigt, wer reagiert hat. Reagieren kann jeder, der die Seite sehen darf.
- **Absätze und Überschriften**: Text markieren oder mit der rechten Maustaste in den Text klicken öffnet das Textmenü. Oben stehen die Reaktionen für den Absatz, darunter Formatierung (fett, kursiv, unterstrichen, durchgestrichen, markieren, Code, Link), **Kommentieren** und **Kopieren**, in Aufgaben auch **Fälligkeit**. Die Reaktionen stehen als kleine Pillen am Block, werden im Dokument gespeichert und erscheinen bei allen sofort; ein Klick auf die eigene nimmt sie zurück. Das geht für alle, die die Seite bearbeiten dürfen. Mit <kbd>Umschalt</kbd> + Rechtsklick kommt das Menü des Browsers.
- Textkommentare haben ihre eigenen Reaktionen im Thread.

## Seiten folgen

Die Glocke oben auf einer Seite (auf dem Telefon **Folgen** oben im Menü `⋯`) schaltet **Folgen** ein oder aus. Wer einer Seite folgt, bekommt eine Benachrichtigung, sobald jemand anderes sie ändert – eine pro Seite, bis du sie wieder angesehen hast – und bei jedem neuen Kommentar darauf (bei einer Datenbank: auch zu ihren Einträgen). Mit E-Mail-Versand landet sie in der E-Mail-Zusammenfassung. Wer eine Seite anlegt, folgt ihr automatisch. Unter **Einstellungen → Benachrichtigungen** lässt sich die Art „Änderungen an Seiten, denen du folgst“ für Posteingang, Push und E-Mail einzeln abschalten.

## Wer hat die Seite gesehen?

Das Auge neben der Glocke zeigt, wer die Seite geöffnet hat und wann. Ein Haken bedeutet, dass die Person den neuesten Stand gesehen hat; „älter“, dass sich die Seite seitdem geändert hat. Angezeigt werden nur Personen, die die Seite noch sehen dürfen.

## Änderungen seit deinem letzten Besuch

Hat jemand anderes eine Seite geändert, seit du sie zuletzt geöffnet hast, erscheint oben ein Hinweis mit den Namen. Bei Dokumenten zeigt **Änderungen zeigen** die Textänderungen seit deinem letzten Besuch (eingefügt und gelöscht, wie im Versionsverlauf). Bei Datenbanken nennt der Hinweis die Zahl der bearbeiteten Einträge.

Die Startseite listet unter **Zuletzt angesehen** die Seiten, die du zuletzt geöffnet hast; die [Schnellsuche](/search-and-notifications#reihenfolge-pfad-und-zuletzt-angesehen) zeigt ohne Suchtext auch Einträge, nach Tagen gruppiert.

## Seitenkommentare

Das Sprechblasen-Symbol in der Kopfzeile öffnet die Kommentare der Seite (auf dem Telefon steht es dort nur bei offenen Kommentaren, mit ihrer Anzahl, sonst **Kommentare** im Menü `⋯`); Kommentare an Datenbankeinträgen stehen unter dem Eintrag. ++⌘ Enter++ sendet. Seiten- und Eintragskommentare schreibst du wie Textkommentare: formatiert (Listen, Links, Zitate, Code), mit `@` für Personen und Seiten, mit [Anhängen und Linkvorschauen](#anhaenge-seiten-und-links-in-kommentaren). Ein Klick ins Feld öffnet die Werkzeugleiste. Über die API geht weiterhin reiner Text; dort erwähnt `@` mit dem vollen Namen oder der E-Mail-Adresse eines Mitglieds – etwa `@Anna Berg` – die Person. Eine erwähnte Person bekommt eine Benachrichtigung, sofern sie die Seite und den Eintrag sehen darf.

Deine eigenen Seiten- und Eintragskommentare kannst du nachträglich ändern oder löschen {since=0.11.4}: Der Stift neben den Reaktionen öffnet den Kommentar im Editor, wo du Text, Erwähnungen und Anhänge änderst; **Änderung speichern** übernimmt sie, und der Kommentar zeigt danach „bearbeitet“. Hat jemand den Kommentar inzwischen geändert (etwa du selbst in einem anderen Tab), bleibt dein Entwurf erhalten. Wen du beim Bearbeiten neu erwähnst, bekommt eine Benachrichtigung, sonst niemand. Der Papierkorb löscht den Kommentar nach einer Rückfrage samt Reaktionen. Entfernte Anhänge und die eines gelöschten Kommentars kommen in den Papierkorb der Dateien, sofern sie nirgends sonst verwendet werden. Kommentare anderer Personen und von Gästen kann niemand ändern oder löschen, auch Bearbeiter und Admins nicht.

## Textkommentare

Unter einem Dokument und im Inhalt eines Datenbankeintrags öffnet **Textkommentare (n)** das Kommentarfeld mit allen Threads und dem Filter **Anzeigen**. Markiere Text oder einen Block und klicke im Feld oben auf **Neu**, um einen Kommentar zu schreiben; ohne Markierung erinnert dich Flowplan daran. Direkt zum neuen Kommentar kommst du über das Sprechblasen-Symbol in der Werkzeugleiste, im Textmenü oder mit ++⌘/Strg ⌥/Alt M++. Das X oder ein erneuter Klick auf **Textkommentare** schließt das Feld. {since=0.9.8}

- Der kommentierte Text wird markiert; Klick darauf öffnet den Thread.
- Antworten, Emoji-Reaktionen, **Erledigen** und **Wieder öffnen**.
- Beiträge können formatiert sein (Listen, Links, Zitate, Code); `@` sucht Personen und Seiten.
- Eigene Beiträge lassen sich bearbeiten und löschen. Wer beim Bearbeiten neu erwähnt wird, bekommt eine Benachrichtigung; bereits Erwähnte nicht noch einmal.
- Wird der Text später gelöscht, bleibt das Zitat im Thread erhalten.
- Zeilenumbrüche der Textstelle bleiben im Zitat erhalten, eingebettete Medien erscheinen als „Medienblock“. Verschiebst du einen Block nach oben oder unten (oder ziehst ihn), wandern seine Kommentare mit. {since=0.9.8}
- Entwürfe bleiben gespeichert, bis du sie sendest oder verwirfst.

### Am Rand neben dem Text {since=0.11.0}

Ist neben dem Text genug Platz – mit offener Seitenleiste etwa ab 1180 Pixel Fensterbreite –, stehen offene Textkommentare als Karten am rechten Rand, jeweils auf der Höhe ihrer Textstelle, auf Seiten wie auf [als Seite geöffneten Einträgen](/databases#eintraege). Eine Karte zeigt den Anfang des ersten Beitrags, wer ihn geschrieben hat, und wie viele Antworten es gibt. Liegen Textstellen dicht beieinander, rücken die Karten untereinander, in der Reihenfolge im Text. Kommentare zu Bildern und anderen Blöcken stehen neben ihrem Block.

- Ein Klick auf die Markierung oder die Karte öffnet den Thread direkt in der Karte, mit Antworten, Reaktionen, Erwähnungen und **Thread erledigen**; die Textstelle wird kräftiger markiert, die Seite springt nicht weg. ++Esc++ oder ein Klick in den Text klappt die Karte wieder zu.
- Ein neuer Kommentar (++⌘/Strg ⌥/Alt M++ oder **Kommentieren** im Textmenü) öffnet sein Eingabefeld gleich am Rand neben der Textstelle.
- Erledigte Threads verlassen den Rand. **Textkommentare (n)** unter dem Dokument bleibt die Übersicht über alle Threads mit dem Filter **Anzeigen**.
- Solange Karten am Rand stehen, klappt das [Inhaltsverzeichnis](/reading-and-presenting#inhaltsverzeichnis) zu seiner kleinen Schaltfläche am Textrand zusammen; ein Klick darauf öffnet es als Liste.

Unter **Einstellungen → Darstellung & Sprache → Editor** stellst du **Textkommentare** auf **Am Rand** (Standard) oder **Unter dem Dokument**. Mit **Unter dem Dokument** öffnet ein Klick auf eine Markierung den Thread im Kommentarfeld unter dem Dokument. Die Einstellung gilt für dein Konto auf allen Geräten.

### Neben der Textstelle, wenn der Rand fehlt {since=0.11.4}

Ist neben dem Text zu wenig Platz – ein schmales Fenster, ein Eintrag im Dialog, die Seitenkommentare sind offen –, öffnen ein Klick auf die Markierung und ein neuer Kommentar den Thread als Fenster direkt neben oder unter der Textstelle, mit allen Antworten, dem Antwortfeld, Reaktionen und **Thread erledigen**. Auf dem Telefon kommt der Thread als Blatt von unten: Die Textstelle bleibt darüber sichtbar, das Blatt sitzt beim Schreiben auf der Tastatur, und Wischen nach unten schließt es.

### Farbe, Anzahl und Vorschau {since=0.11.4}

- **Farbe:** Wer einen Textkommentar beginnt, wählt mit dem Farbpunkt neben **Abbrechen** die Farbe der Markierung – Gelb (Standard) oder eine der anderen Hintergrundfarben des Textmenüs. Ändern können sie später die Verfasserin oder der Verfasser und alle, die die Seite bearbeiten dürfen (Farbpunkt im Thread); alle sehen dieselbe Farbe.
- **Anzahl:** Eine kleine hochgestellte Zahl hinter der markierten Textstelle zeigt, wie viele Beiträge der Thread hat (bei Bildern und Blöcken an deren Ecke). Sie gehört nicht zum Text – beim Kopieren und in Exporten fehlt sie.
- **Vorschau:** Bleibt der Mauszeiger kurz auf einer Markierung, zeigt eine kleine Karte, wer kommentiert hat, den Anfang des Kommentars, die Zahl der Antworten und ob der Thread erledigt ist. Ein Klick darauf öffnet den Thread; ++Esc++ schließt die Vorschau.
- **Antworten im Kommentarfeld rechts:** Unter jedem offenen Textkommentar in den Seitenkommentaren steht ein Antwortfeld; **n Antworten zeigen** blendet die bisherigen Antworten ein.

Textkommentare gibt es in Dokumenten und in den Inhalten von Datenbankeinträgen, auch in Exporten und Inhaltsarchiven.

## Anhänge, Seiten und Links in Kommentaren {since=0.11.4}

In Seiten-, Eintrags- und Textkommentaren und in Antworten:

- **Anhänge:** Die Büroklammer, Ziehen oder Einfügen hängt Dateien und Bilder an, bis zu 10 pro Kommentar. Bilder erscheinen als Vorschau und öffnen sich groß, PDFs im PDF-Viewer, Videos spielen direkt; andere Dateien stehen mit Name und Größe da. Ein Kommentar darf auch nur aus Anhängen bestehen. Es gelten die üblichen Grenzen für Dateien, und die Anhänge zählen zu deinem Speicher. Sehen kann sie nur, wer die Seite – beim Eintrag auch den Eintrag – lesen darf. Entfernst du einen Anhang beim Bearbeiten oder löschst du den Kommentar, wandert die Datei in den Papierkorb, sofern sie sonst nirgends verwendet wird. In verschlüsselten Bereichen gibt es keine Kommentare und damit keine Anhänge.
- **Seiten erwähnen:** `@` schlägt neben Personen auch Seiten und Einträge vor, die du lesen darfst. Die Erwähnung zeigt Symbol und aktuellen Titel; ein Klick öffnet die Seite, ++⌘/Strg++-Klick einen neuen Tab. Wer die Seite nicht lesen darf, sieht nur „Kein Zugriff“. Eine erwähnte Seite benachrichtigt niemanden.
- **Links:** Adressen werden zu Links. Die ersten beiden bekommen eine kleine Vorschau mit Titel, Website und Bild; im Entwurf entfernst du sie mit ×.
- Benachrichtigungen nennen nur die Zahl der Anhänge („📎 2 Anhänge“), nie ihren Inhalt.

## Erwähnungen

- `@Name` in Text oder Kommentar benachrichtigt die Person. Die Personensuche zeigt nur Mitglieder, die die Seite lesen dürfen.
- Benachrichtigt wird nur, wer die Seite und – bei einem Eintrag – den Eintrag sehen darf; die verfassende Person selbst nie. Wer ohnehin vom Kommentar erfährt, bekommt nur eine Benachrichtigung, die Erwähnung. Liegt die Seite in einem [Journal mit PIN](/journal), zeigt die Benachrichtigung nur „Dieses Journal ist gesperrt.“, bis die PIN eingegeben ist.
- Gäste sehen keine anderen Mitglieder; ihre Erwähnungen benachrichtigen niemanden.

## Posteingang

Der **Posteingang** in der Seitenleiste sammelt Erwähnungen, Kommentare und Antworten, die dich betreffen ([wer von Kommentaren erfährt](/notifications#wer-von-kommentaren-erfaehrt)), Datums-Erinnerungen sowie Kommentare und Einträge von Gästen. Ungelesenes ist markiert; ein Klick springt zur Stelle – bei Textkommentaren direkt in den Thread. Welche Ereignisse als Push-Nachricht kommen, stellst du unter **Einstellungen → Benachrichtigungen** ein (siehe [Suche, Posteingang und Push](/search-and-notifications)).
