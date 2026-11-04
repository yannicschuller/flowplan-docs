# KI

Optionale KI für Texte, Zusammenfassungen, Fragen an den Arbeitsbereich und Datenbanken – standardmäßig aus, auf Wunsch komplett lokal mit Ollama oder mit einem Schlüssel für OpenAI, Anthropic, Gemini oder jeden OpenAI-kompatiblen Dienst. In den Apps für iPhone, iPad und Mac auf Wunsch auch [direkt auf dem Gerät mit Apple Intelligence](#ki-auf-dem-geraet-apple).

> [!NOTE]
> **KI ist in Flowplan immer optional.** Nach der Installation ist sie aus. Die Administration entscheidet, ob es sie gibt, welcher Anbieter verwendet wird, wer sie nutzen darf und welche Funktionen erlaubt sind. Jede Person kann sie für sich wieder ausschalten und festlegen, welche Seiten die KI lesen darf. Mit [Ollama](#ollama-komplett-lokal) verlassen deine Texte den Server nicht. Einzige Ausnahme vom „standardmäßig aus“: [KI auf dem Gerät (Apple)](#ki-auf-dem-geraet-apple) ist erlaubt, weil dabei nichts das Gerät verlässt – Administration und jede Person können auch sie ausschalten.

## Grundsätze

- **Aus, bis jemand sie einschaltet** – auf der Instanz und für jede Person. Einzige Ausnahme ist die [KI auf dem Gerät (Apple)](#ki-auf-dem-geraet-apple): Sie ist erlaubt, weil nichts das Gerät verlässt, und lässt sich ebenso abschalten.
- **Jede Funktion einzeln:** Schreibassistent, Zusammenfassungen, Fragen an den Arbeitsbereich, KI in Datenbanken, KI-Aktionen und KI auf Whiteboards lassen sich von der Administration und von jeder Person getrennt erlauben oder ausschalten.
- **Nur mit deinen Rechten:** Die KI liest nie mehr, als du selbst sehen darfst – und nur, was du ihr erlaubst ([Worauf die KI zugreifen darf](#worauf-die-ki-zugreifen-darf)).
- **Du siehst, wohin deine Texte gehen:** Jede KI-Funktion nennt den Anbieter und ob die Daten den Server verlassen.
- **Schlüssel bleiben geheim:** API-Schlüssel werden verschlüsselt gespeichert und nie wieder angezeigt ([Sicherheit der Schlüssel](#sicherheit-der-schluessel)).

## Anbieter

| Anbieter | Daten verlassen den Server | Typische Adresse |
| --- | --- | --- |
| **Ollama** | nein (wenn Ollama auf dem eigenen Server oder im eigenen Netz läuft) | `http://ollama:11434` |
| **OpenAI-kompatibel** | ja, an den gewählten Dienst – außer bei lokalen Servern wie LM Studio, vLLM oder LocalAI | `https://api.openai.com/v1`, `https://api.mistral.ai/v1`, `https://openrouter.ai/api/v1` |
| **Anthropic** (Claude) | ja, an Anthropic | `https://api.anthropic.com` |
| **Google Gemini** | ja, an Google | `https://generativelanguage.googleapis.com` |

Das Modell trägst du frei ein – jede Modell-ID, die der Anbieter kennt. **Verbindung testen** prüft Adresse, Schlüssel und Modell mit einer kurzen Anfrage.

### Ollama: komplett lokal

[Ollama](https://ollama.com) führt offene Modelle auf deinem eigenen Server aus. Die `compose.yaml` von Flowplan bringt einen passenden Dienst mit, der nur auf Wunsch startet:

```bash
docker compose --profile ai up -d
```

In der `.env`:

```env
OLLAMA_URL=http://ollama:11434
```

Danach unter **Administration → KI** den Anbieter **Ollama** wählen. **Installierte Modelle laden** zeigt, was schon da ist; unter **Modell herunterladen** lädt Flowplan weitere Modelle mit Fortschrittsanzeige, etwa `llama3.1`, `qwen2.5` oder `mistral`. Für die [Suche nach Bedeutung](#fragen-an-den-arbeitsbereich) zusätzlich ein Embedding-Modell wie `nomic-embed-text` laden und unter **Modell für Embeddings** eintragen.

> [!TIP]
> Wie gut und schnell lokale Modelle antworten, hängt vom Server ab. Kleine Modelle (3–8 Milliarden Parameter) laufen auf aktuellen CPUs; mit einer Grafikkarte werden sie deutlich schneller. Läuft Ollama auf einem anderen Rechner im Netz, trage dessen Adresse ein – Adressen im eigenen Netz sind für den Anbieter der Instanz erlaubt.

## KI auf dem Gerät (Apple)

> [!NOTE]
> **Optional und jederzeit abschaltbar.** In den Flowplan-Apps für iPhone, iPad und Mac kann Flowplan **Apple Intelligence direkt auf dem Gerät** nutzen. **Der Text verlässt das Gerät dabei nicht** – er geht weder an den Flowplan-Server noch an einen KI-Anbieter. Die KI über den Server bleibt davon unberührt und weiter verfügbar.

**Was du brauchst:** die Flowplan-App für iPhone oder iPad mit **iOS/iPadOS 26** oder neuer bzw. die Desktop-App ab 1.2.0 auf einem Mac mit **macOS 26** oder neuer, ein Gerät, das Apple Intelligence unterstützt (etwa iPhone 15 Pro oder neuer, iPad und Mac mit M-Chip), und **Apple Intelligence eingeschaltet** (Einstellungen → Apple Intelligence & Siri). Im Browser und auf anderen Geräten gibt es diesen Weg nicht. Auf dem Server braucht es eine Flowplan-Version neuer als 0.7.0 (derzeit das Beta-Image).

**Was auf dem Gerät läuft** – die leichten Aktionen auf einer geöffneten Seite:

- der [Schreibassistent](#schreibassistent) für markierten Text (Verbessern, Umformulieren, Kürzen, Erweitern, Einfacher erklären, Ton ändern, Übersetzen, Als Liste/Tabelle, eigene Anweisung) und das freie Schreiben an der Schreibmarke,
- die [Zusammenfassung](#zusammenfassungen) der geöffneten Seite, eines Eintrags oder einer Sprachnotiz – mit Kernpunkten und **offenen Aufgaben**, die das Modell strukturiert herausliest.

**Was auf dem Server bleibt:** Fragen an den Arbeitsbereich, KI in Datenbanken, KI-Aktionen und Zusammenfassungen von Datenbank-Ansichten. Sie brauchen weiter einen Anbieter der Instanz.

Ergebnisse vom Gerät tragen das Kennzeichen **Auf diesem Gerät**, unten steht „Apple Intelligence · nur auf diesem Gerät“. Die Antwort erscheint wie gewohnt Stück für Stück, **Stopp** bricht auch auf dem Gerät ab.

**Grenzen:** Das Modell auf dem Gerät ist klein und hat wenig Platz (etwa 4000 Token für Anweisung, Text und Antwort zusammen). Für den Schreibassistenten reicht das für einige Absätze; längere Seiten fasst es in Teilen zusammen. Was zu lang ist, übernimmt der Server, wenn du dort KI nutzen darfst – sonst sagt Flowplan, dass der Text zu lang ist, bzw. fasst nur den Anfang zusammen. Lehnt das Modell eine Anfrage nach Apples Sicherheitsregeln ab, geht sie nicht stattdessen an den Server.

**Ein- und ausschalten:**

- **Jede Person** unter **Einstellungen → KI → Auf diesem Gerät (Apple)**: **Wenn möglich (Standard)** – auf dem Gerät, wenn es kann, sonst auf dem Server; **Nur ohne KI auf dem Server** – das Gerät nur, wenn der Server keine KI anbietet; **Aus** – Flowplan fragt das Gerät nie. Dort steht auch, ob Apple Intelligence auf diesem Gerät **verfügbar**, **in den Einstellungen ausgeschaltet** oder **nicht unterstützt** ist. **KI-Funktionen verwenden** aus schaltet auch die KI auf dem Gerät ab.
- **Die Administration** unter **Administration → KI → KI auf dem Gerät (Apple)** für die ganze Instanz (oder mit `FLOWPLAN_AI_DEVICE=off`, [Konfiguration](/configuration#ki)). Der Hauptschalter **KI einschalten** gilt für die KI über den Server; die KI auf dem Gerät hat ihren eigenen Schalter und ist standardmäßig erlaubt – auch ohne Anbieter.
- **Auf dem Mac** zusätzlich in der Desktop-App unter **Einstellungen … → Apple Intelligence (optional) → Apple Intelligence auf diesem Mac nutzen** – standardmäßig an, wo es verfügbar ist. Aus startet die App das Modell nie, und die Instanz erreicht es nicht. Dieser Schalter gilt nur für diesen Mac.
- **Für KI gesperrte Seiten und Bereiche** bleiben gesperrt, ebenso deine eigenen Regeln, die Schalter der einzelnen Funktionen, **Ausgewählte Personen** und **Auch Gäste**.

**Verschlüsselte Bereiche:** In [Ende-zu-Ende-verschlüsselten Bereichen](/encrypted-spaces) gibt es sonst keine KI, weil der Server den Text nicht kennt. Auf dem Gerät schon: Schreibassistent (KI-Knopf in der Werkzeugleiste) und Zusammenfassung arbeiten mit dem entschlüsselten Text auf dem Gerät – an den Server geht dabei nichts, auch nicht ersatzweise.

> [!TIP]
> Apples **Schreibtools** (Korrekturlesen, Umschreiben, Zusammenfassen im Textmenü) funktionieren in der App für iPhone und iPad ebenfalls direkt im Editor. Sie gehören zum System und laufen unabhängig von diesen Einstellungen.

## Schreibassistent

Der Schreibassistent bearbeitet markierten Text oder schreibt neuen Text an der Schreibmarke. Er steht Personen zur Verfügung, die die Seite bearbeiten dürfen – wenn die Administration KI und den Schreibassistenten erlaubt hat und du ihn unter **Einstellungen → KI** nicht ausgeschaltet hast.

So öffnest du ihn:

- Text markieren → im Textmenü **KI**.
- <kbd>⌘</kbd> <kbd>J</kbd> (<kbd>Strg</kbd> <kbd>J</kbd>): wirkt auf die Markierung, ohne Markierung auf die aktuelle Zeile; in einer leeren Zeile öffnet sich ein freies Eingabefeld.
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

**Freies Schreiben** (`/ki`, <kbd>⌘</kbd> <kbd>J</kbd> in einer leeren Zeile): Beschreibe, was entstehen soll – etwa „Schreib eine Einleitung über …“. Mit **Seite als Kontext** (voreingestellt an) geht der Inhalt der Seite mit an die KI.

Die KI antwortet in der Sprache des Textes, beim freien Schreiben in der Sprache deiner Anweisung. Die Antwort erscheint zuerst in einer **Vorschau** unter dem Text, nicht direkt im Dokument; ein pulsierender Cursor zeigt, dass noch Text folgt, **Stopp** bricht ab. Danach:

- **Ersetzen** (beim freien Schreiben **Einfügen**) – die Antwort ersetzt die Markierung bzw. die leere Zeile.
- **Darunter einfügen** – unter dem Absatz bzw. der Liste.
- **Erneut** – dieselbe Anfrage noch einmal; **Andere Aktion** – zurück zur Auswahl; **Verwerfen** – nichts ändert sich.

Überschriften, Listen, Aufgaben, Tabellen, Code und Hinweise werden als echte Blöcke eingefügt. Das Einfügen ist ein einziger Schritt, den <kbd>⌘</kbd> <kbd>Z</kbd> zurücknimmt, und funktioniert beim gemeinsamen Bearbeiten wie jede andere Änderung. Eingefügte Blöcke leuchten kurz in der Akzentfarbe auf – nur als Anzeige, nicht gespeichert und für andere unsichtbar.

> [!NOTE]
> Bilder aus Antworten werden nicht übernommen (nur ihr Alternativtext), Links nur, wenn sie auf `http(s)`, E-Mail oder Flowplan selbst zeigen. So kann ein manipulierter Text keine Inhalte über Bildadressen nach außen schicken.

### Bestehende Seiten verlinken

Mit **Mit bestehenden Seiten verlinken** (im Schreibassistenten, voreingestellt an; deine Wahl merkt sich der Browser) sucht Flowplan zu deiner Anweisung und dem markierten Text bis zu acht passende Seiten des Arbeitsbereichs – mit derselben Suche wie [Fragen an den Arbeitsbereich](#fragen-an-den-arbeitsbereich) – und gibt der KI deren Titel und einen kurzen Auszug mit. Wo eine Seite wirklich passt, verlinkt die KI sie im Text. Das gilt für alle Aktionen, das freie Schreiben und die Zusammenfassung einer Sprachnotiz.

- Die Links sind schon in der **Vorschau** zu sehen; darunter steht **Verlinkt: …** mit den verlinkten Seiten. Eingefügt werden sie als echte Seitenlinks – wie mit `[[` im Editor: Sie erscheinen in den Rückverweisen, folgen einer Umbenennung und bleiben im Markdown-Export erhalten.
- Angeboten werden nur Seiten, die die KI für dich lesen darf (siehe [Worauf die KI zugreifen darf](#worauf-die-ki-zugreifen-darf)) – nie die Seite, an der du schreibst, und nie gesperrte, private, gelöschte oder PIN-geschützte Inhalte. Die KI kennt die Seiten nur unter Nummern; Flowplan setzt die Links selbst. Adressen, die sich die KI ausdenkt, werden nie zu Links.
- Mit der **KI auf dem Gerät** und in Ende-zu-Ende-verschlüsselten Bereichen wird nicht verlinkt: Dafür müsste der Text auf dem Server durchsucht werden.
- Die Administration kann die Funktion **Seiten verlinken** ausschalten, du selbst unter **Einstellungen → KI**.

## Zusammenfassungen

Die KI liefert eine kurze **Zusammenfassung**, die **Kernpunkte** und die **offenen Aufgaben** – in der Sprache des Inhalts.

- **Seite:** Seitenmenü **…** → **Mit KI zusammenfassen**. Das Ergebnis erscheint in einer Seitenleiste mit **Als Callout oben einfügen** (Zusammenfassung und Kernpunkte als Hinweis am Seitenanfang), **Aufgaben als Checkliste einfügen** (unter der Schreibmarke), **Kopieren** und **Erneut**.
- **Datenbank:** Der KI-Knopf in der Werkzeugleiste fasst die Einträge der **aktuellen Ansicht** zusammen – mit ihren Filtern, ihrer Suche und Sortierung, höchstens 300 Einträge. Die Leiste nennt, wie viele es waren („120 von 340 Einträgen“).
- **Eintrag:** KI-Knopf im Kopf des Eintrags; Callout und Checkliste landen im Dokument des Eintrags.
- **Sprachnotiz:** Wandelt der Server Sprachnotizen in Text um ([Sprachnotizen](/documents#sprachnotizen-und-besprechungen)), fasst **Danach mit KI zusammenfassen** das Transkript zusammen; **Darunter einfügen** setzt die Zusammenfassung unter das Transkript.

Lange Seiten werden abschnittsweise gelesen: Jeder Teil wird zusammengefasst, dann werden die Teile zusammengeführt (bei lokaler KI in kleineren Teilen). Sehr lange Inhalte werden nach zwölf Teilen abgeschnitten; die Leiste weist darauf hin. Einträge, die du nicht sehen darfst oder die für die KI gesperrt sind, bleiben außen vor.

### Wohin die Daten gehen

Jedes KI-Fenster nennt unten den Anbieter, etwa „Ollama · llama3.1 · lokal“ oder „… · Daten gehen an api.openai.com“. Bei lokaler KI bleibt der Text auf deinem Server; sonst gehen der markierte Text, deine Anweisung und – bei **Seite als Kontext** und Zusammenfassungen – der Seiteninhalt an diesen Anbieter. Flowplan lädt Seiten- und Datenbankinhalte selbst auf dem Server und prüft vorher, ob die KI sie lesen darf.

Auf Seiten, die die KI nicht lesen darf, sind alle KI-Einträge ausgegraut mit dem Hinweis „KI hat keinen Zugriff auf diese Seite“ – auch für markierten Text. Der Server lehnt solche Anfragen ebenfalls ab.

## Fragen an den Arbeitsbereich

**KI fragen** (Seitenleiste, <kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>A</kbd> bzw. <kbd>Strg</kbd> <kbd>Alt</kbd> <kbd>A</kbd>, <kbd>⌘</kbd> <kbd>K</kbd> → „KI fragen …“ oder der Knopf in der Suche) beantwortet Fragen zu deinen Seiten und Datenbanken – etwa „Wann ist die nächste Wartung der Heizung fällig?“ oder „Was haben wir zum Thema Onboarding beschlossen?“.

**Als Leiste am rechten Rand:** Auf dem Computer und dem iPad öffnet sich **KI fragen** als Leiste rechts neben der Seite; die Seite wird schmaler, nichts wird verdeckt. Du kannst weiterschreiben, scrollen und andere Seiten öffnen, während die Antwort entsteht – sie läuft weiter, und das Gespräch bleibt beim Seitenwechsel erhalten. Ein Klick auf eine Quelle öffnet die Seite daneben, die Leiste bleibt offen. Die Leiste ist anfangs etwa 420 px breit und höchstens 45 % des Fensters; die Breite änderst du am linken Rand (ziehen oder mit den Pfeiltasten, Doppelklick setzt zurück), dieser Browser merkt sie sich. Die Seite daneben ordnet sich nach dem Platz, der ihr bleibt: Wird es eng, zeigt sie ihre schmale Ansicht, und das **Inhaltsverzeichnis** klappt zu einem Knopf zusammen, der die Gliederung als Liste öffnet. In schmalen Fenstern (unter etwa 1100 px) liegt die Leiste über der Seite, statt sie zusammenzudrücken; **Anheften** stellt sie wieder daneben, **Lösen** legt sie wieder darüber – auch das merkt sich der Browser. <kbd>Esc</kbd> in der Leiste, das <kbd>×</kbd> oder derselbe Kurzbefehl schließen sie wieder. **KI fragen** und die **Kommentare** teilen sich den rechten Rand: Öffnest du das eine, schließt sich das andere. Im Fokusmodus ist die Leiste ausgeblendet. Auf dem Handy erscheint **KI fragen** als Blatt über der unteren Leiste; nach unten wischen (oder der Pfeil oben) verkleinert es zu einem Knopf „KI antwortet …“ – die Antwort läuft weiter.

- Die Antwort nennt ihre **Quellen** als nummerierte Verweise [1], [2] …; ein Klick öffnet die Seite oder den Eintrag. Die Verweise stammen aus der Suche, nie aus dem Text der KI.
- Findet die KI nichts Passendes, antwortet sie „Dazu habe ich nichts gefunden.“ statt etwas zu erfinden.
- **Wo gesucht wird:** ganzer Arbeitsbereich, die geöffnete Seite mit ihren Unterseiten oder ein Bereich – in der Auswahl oben links. Mit **Alle meine Arbeitsbereiche** (letzter Eintrag dort) sucht die Frage in allen Arbeitsbereichen, in denen du Mitglied bist – in jedem nur, wenn KI dort für dich nutzbar ist (etwa nicht als Gast, wenn Gäste keine KI haben), und mit deinen Regeln für jeden Arbeitsbereich. Quellen aus anderen Arbeitsbereichen tragen dessen Namen; ein Klick wechselt dorthin.
- **Fragen zu Flowplan selbst:** Die Flowplan-Hilfe – diese Dokumentation, auf Deutsch und Englisch – ist in die App eingebaut und wird bei **Ganzer Arbeitsbereich** und **Alle meine Arbeitsbereiche** mit durchsucht. Fragen wie „Wie richte ich die Zwei-Faktor-Anmeldung ein?“ oder „Wo stelle ich den KI-Anbieter ein?“ beantwortet die KI also aus der Hilfe; solche Quellen tragen den Hinweis **Flowplan-Hilfe** und öffnen den passenden Abschnitt auf docs.flowplan.org. **Nur Flowplan-Hilfe** in der Auswahl fragt ausschließlich dort. Die Hilfe liegt in der App selbst – für sie geht keine Anfrage nach außen, und sie passt zur installierten Version.
- **Journal und Datum:** Tage eines Journals gehen mit ihrem Datum an die KI, ebenso das heutige Datum. Fragen wie „Was war das Letzte mit Batu?“ oder „Was habe ich zuletzt …“ nehmen den jüngsten passenden Tag. Ein Name oder ein seltenes Wort findet seine Seiten auch dann, wenn ein häufiges Wort der Frage viele andere Seiten trifft.
- **Darstellung:** Antworten erscheinen formatiert – fett, kursiv, Listen (auch verschachtelt), Code und Links; die Quellen-Nummern bleiben anklickbar.
- **Aktionen vorschlagen:** Unter einer Antwort schlägt die KI auf Wunsch vor, was sich daraus anlegen lässt – siehe [KI-Aktionen](#ki-aktionen).
- **Gespräch:** Rückfragen beziehen die letzten Fragen und Antworten ein; **Neues Gespräch** beginnt von vorn. Das Gespräch bleibt nur in diesem Browser-Tab und wird nicht auf dem Server gespeichert.
- Gesucht wird über den Volltextindex; die passendsten Absätze gehen mit deiner Frage an den Anbieter, der oben in der Leiste steht. Die KI liest dabei nur, was du lesen darfst und was für die KI freigegeben ist ([Worauf die KI zugreifen darf](#worauf-die-ki-zugreifen-darf)). [Tags und Eigenschaftswerte](/pages-and-spaces#tags-und-eigenschaften) einer Seite gehören zu ihrem Text.
- Während die Antwort entsteht, zeigen ein Schimmer und ein Schreibcursor den Fortschritt; die Quellen erscheinen nacheinander.

### Suche nach Bedeutung (optional)

Zusätzlich zum Volltext kann Flowplan Inhalte als Vektoren („Embeddings“) speichern. Dann findet **KI fragen** passende Stellen auch ohne gleiche Wörter – „Reise“ findet „Betriebsausflug“.

1. Beim Anbieter der Instanz ein **Modell für Embeddings** eintragen:
   - **Ollama:** `nomic-embed-text` herunterladen (unter **Administration → KI → Modell herunterladen** oder `ollama pull nomic-embed-text`) und eintragen.
   - **OpenAI-kompatibel:** z. B. `text-embedding-3-small`; **Gemini:** `text-embedding-004`. Anthropic bietet keine Embeddings.
2. **Suche nach Bedeutung einschalten** und speichern. Alternativ per Umgebung: `FLOWPLAN_AI_SEMANTIC_SEARCH=on` und `FLOWPLAN_AI_EMBEDDING_MODEL=nomic-embed-text`.

- Ein Hintergrundauftrag bettet geänderte Seiten und Einträge abschnittsweise ein; unveränderte Abschnitte werden nicht erneut eingebettet. Höchstens `FLOWPLAN_AI_EMBED_PER_HOUR` Abschnitte pro Stunde (Standard 5.000).
- **Nie eingebettet** werden Journale mit PIN, für die KI gesperrte Seiten und Bereiche und der Papierkorb. Rechte und persönliche KI-Regeln gelten bei jeder Frage.
- Die Suche nach Bedeutung nutzt immer den Anbieter der Instanz. Wer einen eigenen Anbieter verwendet, sucht nur im Volltext.
- **Speicherbedarf:** 4 Byte je Dimension und Abschnitt (bis etwa 900 Zeichen) – mit `nomic-embed-text` (768 Dimensionen) rund 3 KB je Abschnitt, etwa das Drei- bis Vierfache des Textes; mit 1.536 Dimensionen rund 6 KB. Gespeichert wird nur ein Prüfwert jedes Abschnitts, nicht sein Text. Die Administration zeigt Anzahl und Größe.
- **Ausschalten** löscht alle Vektoren; ein **Modellwechsel** baut sie neu auf.
- Für sehr große Instanzen (Hunderttausende Abschnitte) gibt es noch keinen Vektorindex; die Suche bleibt dann korrekt, wird aber langsamer.

### Verwandte Seiten

Unter einer Seite und im Eintrag einer Datenbank zeigt **Verwandte Seiten** bis zu acht Seiten und Einträge, die dazugehören. Das funktioniert auch ohne KI:

- **Ohne Suche nach Bedeutung** zählen Links von der Seite, Links auf die Seite, Seiten mit denselben Verweisen, bei Einträgen gleiche Tags (Mehrfachauswahl) und ähnliche Titel im Volltextindex.
- **Mit Suche nach Bedeutung** kommen Seiten mit ähnlichem Inhalt dazu („nach Bedeutung“). Dafür werden nur die schon gespeicherten Vektoren verglichen – es geht keine Anfrage an den Anbieter, kein Text verlässt den Server. Die geöffnete Seite muss für die KI lesbar sein; jeder Treffer durchläuft dieselben Regeln wie bei **KI fragen**.

Angezeigt wird nur, was du lesen darfst – keine privaten Bereiche anderer, keine verborgenen Einträge, nichts aus dem Papierkorb oder gesperrten Journalen.

## KI-Aktionen

Aus einer Antwort von **KI fragen**, aus dem Schreibassistenten (**Aktionen vorschlagen** unter der Antwort) oder aus dem Transkript einer [Besprechung](/documents#sprachnotizen-und-besprechungen) schlägt die KI Aktionen vor:

| Aktion | Was passiert |
| --- | --- |
| **Seite anlegen** | Neue Seite mit Titel und Inhalt in einem Bereich, in dem du Seiten anlegen darfst. |
| **Aufgaben anlegen** | Aufgaben am Ende eines Dokuments, auf Wunsch mit verantwortlicher Person (@Erwähnung) und Fälligkeitsdatum – sie erscheinen in **Meine Aufgaben** wie selbst geschriebene. |
| **Text anfügen** | Etwa eine Zusammenfassung am Ende eines Dokuments. |
| **Eintrag anlegen** / **Eintrag ändern** | In einer Datenbank, nur in Eigenschaften, die du ändern darfst, und nur mit gültigen Werten (vorhandene Auswahloptionen, Mitglieder, Datumsangaben). |

**Nichts geschieht ohne dich:** Die Vorschläge erscheinen als **Vorschau mit Kästchen**. Was nicht möglich ist – etwa ein Bereich ohne Schreibrecht, eine gesperrte Eigenschaft oder eine für die KI gesperrte Datenbank –, steht ausgegraut mit dem Grund daneben. Erst **Ausführen** legt die gewählten Aktionen an.

- Ausgeführt wird **in deinem Namen und mit deinen Rechten**; der Server prüft jede Aktion beim Ausführen noch einmal. Versionsverlauf, Benachrichtigungen, Automationen und Webhooks laufen wie bei einer eigenen Änderung, das Protokoll vermerkt `ai.action`.
- **Rückgängig:** Angelegte Seiten und Einträge lassen sich direkt im Ergebnis zurücknehmen (sie landen im Papierkorb); angefügter Text und geänderte Einträge stehen im Versionsverlauf.
- Die KI sieht nur einen Katalog der Bereiche, Datenbanken, Eigenschaften und Mitglieder, in die du schreiben darfst und die die KI lesen darf – keine Inhalte darüber hinaus. Die Antwort der KI ist reines JSON und wird nie direkt ausgeführt.
- Die Funktion **KI-Aktionen** lässt sich wie alle anderen von der Administration und unter **Einstellungen → KI** ausschalten.

### Daten aus Datenbanken verwenden

Wenn du eine Datenbank in deinem Auftrag nennst, liest die KI ihre Einträge und arbeitet mit den echten Werten statt mit einer Vorlage voller Platzhalter. Beispiel: „Erstelle eine Dokumentation aus der Tabelle Server“ ergibt eine Tabelle mit deinen Servern, ihren IP-Adressen und URLs.

Die KI liest eine Datenbank, wenn
- du ihren Titel im Auftrag nennst (Groß- und Kleinschreibung egal, gern in Anführungszeichen, z. B. „Server“),
- du sie im Auftrag oder im Text verlinkst (Seitenlink mit `[[`),
- sie im geöffneten Dokument verlinkt oder als Ansicht eingebettet ist und dein Auftrag von einer Tabelle oder Datenbank spricht („Fasse die verlinkte Tabelle zusammen“) – im Schreibassistenten nur mit „Seite als Kontext“,
- bei „KI fragen“ die Frage auf die geöffnete Datenbank beschränkt ist, oder eine gefundene Quelle die Datenbank selbst ist.

Das gilt für KI-Aktionen, den Schreibassistenten (freier Auftrag mit `/ki` und eigene Anweisung zu einer Auswahl) und „KI fragen“. Unter der Antwort bzw. über den vorgeschlagenen Aktionen steht, welche Daten gelesen wurden, z. B. „Daten aus: Server (12 Einträge)“. Bei „KI fragen“ erscheint die Datenbank als Quelle.

Was die KI sieht:
- nur Einträge, die du sehen darfst und die die KI lesen darf – keine privaten Einträge anderer, nichts aus Journalen mit PIN, aus Seiten und Bereichen, die [für KI gesperrt](#seiten-und-bereiche-fuer-die-ki-sperren) sind, aus Ende-zu-Ende-verschlüsselten Bereichen, aus dem Papierkorb oder aus Bereichen, die du in deinen KI-Einstellungen ausgeschlossen hast,
- nur Eigenschaften, die für dich sichtbar sind (Lese-Rechte pro Eigenschaft gelten); Verknüpfungen, Formeln, Rollups, Dateien, Fortschritt, Zeit und Sprints werden nicht mitgeschickt, ebenso wenig der Text in den Eintragsdokumenten,
- die Einträge in der Reihenfolge der Datenbank.

Grenzen: höchstens 3 Datenbanken und 200 Einträge pro Anfrage und etwa 40 000 Zeichen (mit einem Modell auf dem eigenen Server im Schreibassistenten etwa 8 000). Passt nicht alles hinein, steht das in den Daten („… und 57 weitere Einträge“), und die KI weist darauf hin. Die Apple-KI auf dem Gerät liest keine Datenbanken.

## KI auf Whiteboards

Auf [Whiteboards](/whiteboards#ki-auf-dem-whiteboard) öffnet **KI** in der Werkzeugleiste drei Funktionen:

- **Nach Thema gruppieren (KI):** ausgewählte Zettel – oder alle im sichtbaren Bereich – nach Themen in beschrifteten Spalten ordnen.
- **Zusammenfassen als Seite:** eine neue Seite neben dem Board mit Zusammenfassung, Themen, Entscheidungen, offenen Fragen und Aufgaben (auf Wunsch als echte Aufgaben mit Person und Termin), mit Link zurück.
- **Mit KI erzeugen …:** eine Mindmap oder ein Flussdiagramm aus einer Beschreibung.

Dazu kommt beim Anlegen von [Datenbankeinträgen aus Zetteln](/whiteboards#zettel-als-datenbankeintraege) **Mit KI aufteilen**: Die KI füllt aus dem Zetteltext weitere Eigenschaften, mit Vorschau vor dem Anlegen. Das Anlegen selbst braucht keine KI.

- Nutzen können es Personen, die das Board bearbeiten dürfen. Die Antwort der KI wird streng geprüft (nur bekannte Zettel, Formen und Eigenschaften, Höchstgrenzen) und dann wie eine eigene Änderung angewendet – live für alle, mit einem Schritt rückgängig zu machen.
- An den Anbieter gehen nur die Texte der betroffenen Elemente – ohne verdeckte Zettel und ohne verknüpfte Seiten oder Einträge, die die KI nicht lesen darf. Beim Erzeugen geht nur deine Beschreibung hin, nichts vom Board. Das Protokoll vermerkt `ai.whiteboard`.
- Die Funktion **KI auf Whiteboards** lässt sich wie alle anderen von der Administration und unter **Einstellungen → KI** ausschalten; sie ist an, sobald KI an ist.

## KI in Datenbanken

### KI-Eigenschaft

Beim Hinzufügen einer Eigenschaft **KI-Eigenschaft** wählen und einen Auftrag schreiben, der andere Eigenschaften in geschweiften Klammern nennt:

- `Fasse {Beschreibung} in einem Satz zusammen`
- `Kategorie aus {Titel}: eine von Roman, Sachbuch, Krimi`
- `{Inhalt}` steht für den Seiteninhalt des Eintrags.

Die **Ausgabe** ist Text, Auswahl, Mehrfachauswahl (nur vorhandene Optionen – erfundene werden verworfen) oder Zahl. Da eine KI-Eigenschaft eine normale Eigenschaft ist, funktionieren Filter, Sortierung, Gruppierung, Formulare und Exporte wie gewohnt.

- **Für alle ausfüllen** im Eigenschaftsdialog berechnet alle Einträge im Hintergrund; eine Anzeige nennt, wie viele Werte noch berechnet werden.
- Im Eintrag berechnet **Neu berechnen** einen Wert sofort und zeigt, wann und mit welchem Modell er entstand.
- **Automatisch neu berechnen, wenn sich verwendete Eigenschaften ändern:** Werte folgen Änderungen mit kurzer Verzögerung und im Rahmen der KI-Grenzen. Das läuft im Namen der Person, die es eingeschaltet oder den Auftrag zuletzt geändert hat. Verliert sie den Zugriff, stoppt es; ist KI auf der Instanz aus, pausiert es.
- Werte entstehen wie Bearbeitungen: mit Versionsverlauf, Automationen und Webhooks. Frisch berechnete Zellen leuchten kurz auf.
- Leser, Gäste und API-Tokens können keine KI-Werte schreiben. Private Einträge und für die KI gesperrte Datenbanken werden übersprungen.

### Felder mit KI ausfüllen

Einträge in der Tabelle auswählen → **Mit KI ausfüllen** → eine Eigenschaft wählen (etwa Tags). Die KI füllt nur **leere** Felder – aus Titel, übrigen Eigenschaften und Inhalt; bei Auswahlen nur mit vorhandenen Optionen.

### Datenbank mit KI erstellen

Neue Seite → Datenbank → **Mit KI erstellen** und beschreiben, z. B. „Leseliste mit Autor, Genre, Status, Bewertung“. Die KI schlägt Eigenschaften mit Typen, Auswahloptionen und ein paar Beispieleinträge vor. Du benennst um, entfernst Eigenschaften oder lässt die Beispiele weg – erst **Seite erstellen** legt die Datenbank an. Der Vorschlag wird streng geprüft (erlaubte Typen, höchstens 25 Eigenschaften und 30 Optionen, passende Beispielwerte); aus der Antwort der KI wird nichts ausgeführt.

## Für Admins

Unter **Administration → KI**:

1. **KI einschalten.**
2. **Anbieter der Instanz** wählen (oder **Kein Anbieter**, siehe unten), Adresse, Modell und – falls nötig – den **API-Schlüssel** eintragen. **Verbindung testen.**
3. **Wer KI nutzen darf:**
   - **Alle** oder **Ausgewählte Personen** – Letztere schaltest du unter **Administration → Benutzer → Verwalten** pro Person frei (**KI-Funktionen**).
   - **Auch Gäste** – ausgeschaltet haben Gäste keine KI-Funktionen.
   - **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** – dann richtet jede Person in ihren Einstellungen einen eigenen Anbieter mit eigenem Schlüssel ein. Das geht auch ganz ohne Anbieter der Instanz: So nutzen Personen KI mit ihrem eigenen Konto bei einem Anbieter, ohne dass die Instanz dafür bezahlt.
4. **Funktionen:** jede einzeln erlauben oder verbieten. Optional die [Suche nach Bedeutung](#suche-nach-bedeutung-optional) einschalten.
5. **KI auf dem Gerät (Apple):** standardmäßig erlaubt, unabhängig vom Schalter in Schritt 1 ([KI auf dem Gerät](#ki-auf-dem-geraet-apple)). Ausschalten, wenn es auf der Instanz gar keine KI geben soll.
6. **Speichern.**

So lassen sich drei typische Varianten einrichten:

| Variante | Einstellung |
| --- | --- |
| Alle nutzen dieselbe KI | Anbieter der Instanz, **Alle** |
| Nur bestimmte Personen | Anbieter der Instanz, **Ausgewählte Personen**, unter Benutzer freischalten |
| Jede Person mit eigener Lösung | **Kein Anbieter** (oder zusätzlich einer), **Nutzer dürfen eigene Anbieter/Schlüssel hinterlegen** |

Alle Einstellungen lassen sich auch über [Umgebungsvariablen](/configuration#ki) vorbelegen, etwa für automatisierte Installationen. Sie gelten, bis jemand in der Administration speichert.

### Seiten und Bereiche für die KI sperren

Eigentümer eines Arbeitsbereichs oder eines Bereichs können eine **Seite** (im Teilen-Dialog) oder einen **Bereich** (in den Bereichseinstellungen) **für KI sperren**. Das gilt für alle Personen und für alles darunter – Unterseiten und Datenbankeinträge. Keine KI-Funktion liest dann diese Inhalte, auch wenn eine Person sie in ihren eigenen Regeln erlaubt hat.

Neue [Kontakte-Datenbanken](/contacts) sind von Anfang an für die KI gesperrt; wer die Seite verwaltet, kann sie öffnen.

## Für Nutzer

Unter **Einstellungen → KI**:

- **Verwendeter Anbieter:** welcher Anbieter für dich arbeitet und ob deine Texte den Server verlassen („Deine Texte werden auf diesem Server verarbeitet und verlassen ihn nicht.“ bei Ollama).
- **KI-Funktionen verwenden:** KI für dich ganz ausschalten – oder einzelne Funktionen.
- **Auf diesem Gerät (Apple):** ob Apple Intelligence hier verfügbar ist und ob Flowplan es nutzen soll – **Wenn möglich (Standard)**, **Nur ohne KI auf dem Server** oder **Aus** ([KI auf dem Gerät](#ki-auf-dem-geraet-apple)).
- **Eigenen Anbieter einrichten** (wenn die Administration es erlaubt): Anbieter, Adresse, Modell und dein Schlüssel. Eigene Anbieter müssen öffentliche `https`-Adressen haben. Gibt es auch einen Anbieter der Instanz, wählst du unter **Welchen Anbieter verwenden** zwischen **Den der Instanz** und **Meinen eigenen**.

### Worauf die KI zugreifen darf

Du bestimmst, welche Inhalte die KI lesen darf:

- **Alles, was ich sehen darf** (Standard) – mit Ausnahmen, die du ausschließt.
- **Nur ausgewählte** – nur Arbeitsbereiche, Bereiche, Seiten und Datenbanken, die du erlaubst.

Mit **Regel hinzufügen** wählst du einen Arbeitsbereich, Bereich, eine Seite oder Datenbank und **erlauben** oder **ausschließen**. Regeln gelten für Unterseiten und Einträge mit; die nächstgelegene Regel gewinnt. So lässt sich etwa ein ganzer Arbeitsbereich erlauben und darin eine Seite mit Gehaltsdaten ausschließen.

**Nie** liest die KI:

- Seiten und Einträge, die du nicht sehen darfst,
- private Einträge anderer Personen,
- den Papierkorb,
- Journale mit PIN-Sperre (auch entsperrt),
- Seiten und Bereiche, die für KI gesperrt sind.

Auf einer Seite, die die KI nicht lesen darf, sind KI-Funktionen ausgegraut, mit dem Hinweis, warum.

## Sicherheit der Schlüssel

- **Verschlüsselt gespeichert:** API-Schlüssel – der Instanz und jeder Person – liegen nur verschlüsselt in der Datenbank (AES-256-GCM, an ihren Besitzer gebunden; ein kopierter Wert lässt sich an anderer Stelle nicht entschlüsseln). Der Schlüssel dafür kommt aus `FLOWPLAN_ENCRYPTION_KEY`, `FLOWPLAN_SECRETS_KEY` oder der Datei `secrets.key` im Datenordner ([Gespeicherte Geheimnisse](/configuration#gespeicherte-geheimnisse)).
- **Nur schreibbar:** Ein gespeicherter Schlüssel wird nie wieder angezeigt – weder in der Oberfläche noch über die API, in Exporten, Sicherungen oder Protokollen. Sichtbar ist nur „gespeichert · endet auf …abcd“ mit **Ersetzen** und **Entfernen**.
- **An die Adresse gebunden:** Ändert sich Anbieter oder Adresse, wird der gespeicherte Schlüssel gelöscht. Ein Schlüssel geht also nie an einen anderen Server als den, für den er eingegeben wurde. Schlüssel stehen nur in Kopfzeilen, nie in Adressen; Weiterleitungen werden nicht befolgt.
- **Keine internen Adressen für eigene Anbieter:** Eigene Anbieter von Personen erreichen nur öffentliche `https`-Adressen – keine Adressen im internen Netz oder des Servers selbst.
- **Aus Umgebungsvariablen:** Ein Schlüssel aus `FLOWPLAN_AI_API_KEY` wird nie in der Datenbank gespeichert und nur für den Anbieter aus den Variablen verwendet.
- **Fehlermeldungen** von Anbietern werden von Schlüsseln bereinigt, bevor sie angezeigt oder protokolliert werden.
- **Kein Zugriff über API-Tokens und Demo:** API-Tokens können KI-Einstellungen weder lesen noch ändern und keine KI-Funktionen nutzen; in der Demo ist KI über den Server aus (KI auf dem Gerät gibt es dort mit den Standardeinstellungen).
- **Grenzen:** höchstens 30 Anfragen pro Minute, 300 pro Stunde (`FLOWPLAN_AI_REQUESTS_PER_HOUR`) und 3 gleichzeitig pro Person.
- **Sicherungen:** `secrets.key` ist nicht Teil der Instanzsicherung. Nach einer Wiederherstellung auf einem anderen Server ohne diese Datei zeigt Flowplan „gespeichert, aber nicht lesbar – bitte ersetzen“, und die Schlüssel werden neu eingegeben.

## Häufige Fragen

**Muss ich KI nutzen?** Nein. KI über den Server ist aus, bis die Administration sie einschaltet, und jede Person kann sie für sich ausschalten. Die KI auf Apple-Geräten ist erlaubt, weil der Text das Gerät nicht verlässt, und ebenso optional: **Einstellungen → KI → Auf diesem Gerät (Apple) → Aus**.

**Geht bei der KI auf dem Gerät etwas an den Server?** Nein. Der Text wird auf dem iPhone, iPad oder Mac verarbeitet; der Server erfährt nur, dass du die Einstellung gewählt hast.

**Geht es ganz ohne Cloud?** Ja, mit Ollama auf dem eigenen Server. Dann verlässt kein Text den Server.

**Trainiert der Anbieter mit meinen Daten?** Das regeln die Bedingungen des jeweiligen Anbieters. Flowplan schickt nur, was für eine Anfrage nötig ist, und nur Inhalte, die die KI lesen darf. Wer sicher gehen will, nutzt Ollama.

**Werden Gespräche gespeichert?** Flowplan speichert Anfragen und Antworten nicht dauerhaft; was in Seiten eingefügt wird, ist normaler Inhalt mit Versionsverlauf.

**Kann die KI selbst etwas ändern?** Nein. KI-Aktionen sind Vorschläge; erst wenn du sie auswählst und **Ausführen** drückst, werden sie mit deinen Rechten angelegt.

**Was ist mit dem MCP-Server?** Der [MCP-Server](/mcp) ist ein anderer Weg: Dort arbeitet ein externer Assistent wie Claude Desktop mit deinem Flowplan. Er ist unabhängig von den Einstellungen hier.
