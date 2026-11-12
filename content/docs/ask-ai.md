---
keywords: KI fragen, Fragen, Chat, Antworten, Quellen, semantische Suche, verwandte Seiten
---

# Fragen an den Arbeitsbereich

**KI fragen** (Seitenleiste, ++⌘ ⌥ A++ bzw. ++Strg Alt A++, ++⌘ K++ → „KI fragen …“ oder der Knopf in der Suche) beantwortet Fragen zu deinen Seiten und Datenbanken – etwa „Wann ist die nächste Wartung der Heizung fällig?“ oder „Was haben wir zum Thema Onboarding beschlossen?“.

**Als Leiste am rechten Rand:** Auf dem Computer und dem iPad öffnet sich **KI fragen** als Leiste rechts neben der Seite; die Seite wird schmaler, nichts wird verdeckt. Du kannst weiterschreiben, scrollen und andere Seiten öffnen, während die Antwort entsteht – sie läuft weiter, und das Gespräch bleibt beim Seitenwechsel erhalten. Ein Klick auf eine Quelle öffnet die Seite daneben, die Leiste bleibt offen. Die Leiste ist anfangs etwa 420 px breit und höchstens 45 % des Fensters; die Breite änderst du am linken Rand (ziehen oder mit den Pfeiltasten, Doppelklick setzt zurück), dieser Browser merkt sie sich. Die Seite daneben ordnet sich nach dem Platz, der ihr bleibt: Wird es eng, zeigt sie ihre schmale Ansicht, und das **Inhaltsverzeichnis** klappt zu einem Knopf zusammen, der die Gliederung als Liste öffnet. In schmalen Fenstern (unter etwa 1100 px) liegt die Leiste über der Seite, statt sie zusammenzudrücken; **Anheften** stellt sie wieder daneben, **Lösen** legt sie wieder darüber – auch das merkt sich der Browser. <kbd>Esc</kbd> in der Leiste, das <kbd>×</kbd> oder derselbe Kurzbefehl schließen sie wieder. **KI fragen** und die **Kommentare** teilen sich den rechten Rand: Öffnest du das eine, schließt sich das andere. Im Fokusmodus ist die Leiste ausgeblendet. Auf dem Handy erscheint **KI fragen** als Blatt über der unteren Leiste; nach unten wischen (oder der Pfeil oben) verkleinert es zu einem Knopf „KI antwortet …“ – die Antwort läuft weiter.

- **Diese Seite:** Ist eine Seite geöffnet, steht über dem Eingabefeld der Schalter **Diese Seite** – voreingestellt an. Dann geht die ganze Seite mit der Frage an die KI: Text, Überschriften, Listen, Tabellen und Codeblöcke als Markdown. So beantwortet die KI Fragen wie „Was macht dieser Codeblock?“ oder „Fass diese Seite zusammen“ aus der Seite selbst; sie erscheint als Quelle [1] mit dem Hinweis **Diese Seite**, die Suche im gewählten Bereich läuft zusätzlich. Ist die Seite zu lang für das Modell, geht nur ihr Anfang mit (etwa 60.000 Zeichen, bei lokaler KI 12.000), und unter der Antwort steht ein Hinweis. Der Server prüft vorher, ob du die Seite lesen darfst und die KI sie lesen darf; für gesperrte Seiten und in Ende-zu-Ende-verschlüsselten Bereichen gibt es den Schalter nicht. Ein Klick schaltet ihn für diese Seite aus; beim nächsten Seitenwechsel ist er wieder an.
- **Als Änderungsvorschlag einfügen:** Unter einer Antwort mit **Diese Seite** übernimmt dieser Knopf die Antwort als [Änderungsvorschläge](/collaboration#aenderungen-vorschlagen) in die Seite – etwa nach „Stell den Stack auf Postgres 16 um“ oder „Korrigiere die Rechtschreibung im zweiten Abschnitt“. Nichts wird überschrieben: Entfernte Wörter erscheinen durchgestrichen, neue markiert, jede Änderung als eigener Vorschlag mit deinem Namen und „(KI)“, den du in der Leiste **Vorschläge** einzeln annimmst oder ablehnst (oder alle auf einmal). In einem **Codeblock** wird Zeile für Zeile verglichen – nur die geänderten Zeilen werden vorgeschlagen. Neue Absätze, Listenpunkte oder Codeblöcke kommen an die passende Stelle; lehnst du sie ab, verschwinden sie wieder ganz. Hat sich eine Stelle inzwischen geändert oder findet Flowplan sie nicht eindeutig wieder, wird sie nicht angewendet – die Leiste sagt, wie viele Vorschläge eingefügt wurden und wie viele nicht. Den Knopf gibt es nur, wenn du die Seite bearbeiten darfst (und sie nicht gesperrt ist); wer nur lesen darf, bekommt die Antwort. Das funktioniert mit jedem Anbieter, auch lokal.
- Die Antwort nennt ihre **Quellen** als nummerierte Verweise [1], [2] …; ein Klick öffnet die Seite oder den Eintrag. Die Verweise stammen aus der Suche, nie aus dem Text der KI. Unter der Antwort stehen die Quellen, die sie wirklich zitiert; weitere gefundene Quellen liegen hinter **n weitere Quellen** und klappen auf Klick auf (zitiert eine Antwort nichts, stehen die ersten drei da).
- Findet die KI nichts Passendes, antwortet sie „Dazu habe ich nichts gefunden.“ statt etwas zu erfinden.
- **Wo gesucht wird:** ganzer Arbeitsbereich, die geöffnete Seite mit ihren Unterseiten oder ein Bereich – in der Auswahl oben links. Mit **Alle meine Arbeitsbereiche** (letzter Eintrag dort) sucht die Frage in allen Arbeitsbereichen, in denen du Mitglied bist – in jedem nur, wenn KI dort für dich nutzbar ist (etwa nicht als Gast, wenn Gäste keine KI haben), und mit deinen Regeln für jeden Arbeitsbereich. Quellen aus anderen Arbeitsbereichen tragen dessen Namen; ein Klick wechselt dorthin.
- **Fragen zu Flowplan selbst:** Die Flowplan-Hilfe – diese Dokumentation, auf Deutsch und Englisch – ist in die App eingebaut und wird bei **Ganzer Arbeitsbereich** und **Alle meine Arbeitsbereiche** mit durchsucht. Fragen wie „Wie richte ich die Zwei-Faktor-Anmeldung ein?“ oder „Wo stelle ich den KI-Anbieter ein?“ beantwortet die KI also aus der Hilfe; solche Quellen tragen den Hinweis **Flowplan-Hilfe** und öffnen den passenden Abschnitt auf docs.flowplan.org. **Nur Flowplan-Hilfe** in der Auswahl fragt ausschließlich dort. Die Hilfe liegt in der App selbst – für sie geht keine Anfrage nach außen, und sie passt zur installierten Version.
- **Journal und Datum:** Tage eines Journals gehen mit ihrem Datum an die KI, ebenso das heutige Datum. Fragen wie „Was war das Letzte mit Batu?“ oder „Was habe ich zuletzt …“ nehmen den jüngsten passenden Tag. Ein Name oder ein seltenes Wort findet seine Seiten auch dann, wenn ein häufiges Wort der Frage viele andere Seiten trifft.
- **Darstellung:** Antworten erscheinen formatiert – fett, kursiv, Listen (auch verschachtelt), Code und Links; die Quellen-Nummern bleiben anklickbar.
- **Kopieren:** **Kopieren** unter den Quellen übernimmt die ganze Antwort. Jeder Codeblock hat zusätzlich oben rechts einen eigenen Knopf **Code kopieren** – praktisch, wenn die KI einen Befehl, ein Snippet oder einen fertigen Text (etwa eine Fehlermeldung für ein Issue) in einen Codeblock schreibt. Das gilt überall, wo KI-Antworten formatiert erscheinen.
- **Aktionen vorschlagen:** Unter einer Antwort schlägt die KI auf Wunsch vor, was sich daraus anlegen lässt – siehe [KI-Aktionen](/ai-actions#ki-aktionen).
- **Gespräch:** Rückfragen beziehen die letzten Fragen und Antworten ein; **Neues Gespräch** beginnt von vorn. Das Gespräch bleibt nur in diesem Browser-Tab und wird nicht auf dem Server gespeichert.
- Gesucht wird über den Volltextindex; die passendsten Absätze gehen mit deiner Frage an den Anbieter, der oben in der Leiste steht. Die KI liest dabei nur, was du lesen darfst und was für die KI freigegeben ist ([Worauf die KI zugreifen darf](/ai#worauf-die-ki-zugreifen-darf)). [Tags und Eigenschaftswerte](/page-tags#tags-und-eigenschaften) einer Seite gehören zu ihrem Text.
- Während die Antwort entsteht, zeigen ein Schimmer und ein Schreibcursor den Fortschritt; die Quellen erscheinen nacheinander.

Fragen nach dem Letzten oder Neuesten („Was war zuletzt mit …?“) berücksichtigen immer die jüngsten Journaltage, die zur Frage passen. Die KI liest auch Handschrift in Zeichenblöcken und Notizbüchern (getippter Text und auf dem iPhone/iPad erkannter Text) sowie den Text von PDFs, Office-Dateien und Bildern einer Seite – mit denselben Rechten wie die Seite; Journale mit PIN bleiben für die KI gesperrt.

## Suche nach Bedeutung (optional)

Fragen auf Chinesisch, Japanisch, Koreanisch oder Thai zerlegt Flowplan in Wörter, obwohl diese Sprachen keine Leerzeichen nutzen. „浦东新区的发票在哪里“ sucht also nach 浦东新区 und 发票, kleine Füllwörter wie 的 bleiben außen vor.

Zusätzlich zum Volltext kann Flowplan Inhalte als Vektoren („Embeddings“) speichern. Dann findet **KI fragen** passende Stellen auch ohne gleiche Wörter – „Reise“ findet „Betriebsausflug“.

::: steps

1. Beim Anbieter der Instanz ein **Modell für Embeddings** eintragen:
   - **Ollama:** `nomic-embed-text` herunterladen (unter **Administration → KI → Modell herunterladen** oder `ollama pull nomic-embed-text`) und eintragen.
   - **OpenAI-kompatibel:** z. B. `text-embedding-3-small`; **Gemini:** `text-embedding-004`. Anthropic bietet keine Embeddings.
2. **Suche nach Bedeutung einschalten** und speichern. Alternativ per Umgebung: `FLOWPLAN_AI_SEMANTIC_SEARCH=on` und `FLOWPLAN_AI_EMBEDDING_MODEL=nomic-embed-text`.

:::

- Ein Hintergrundauftrag bettet geänderte Seiten und Einträge abschnittsweise ein; unveränderte Abschnitte werden nicht erneut eingebettet. Höchstens `FLOWPLAN_AI_EMBED_PER_HOUR` Abschnitte pro Stunde (Standard 5.000).
- **Nie eingebettet** werden Journale mit PIN, für die KI gesperrte Seiten und Bereiche und der Papierkorb. Rechte und persönliche KI-Regeln gelten bei jeder Frage.
- Die Suche nach Bedeutung nutzt immer den Anbieter der Instanz. Wer einen eigenen Anbieter verwendet, sucht nur im Volltext.
- **Speicherbedarf:** 4 Byte je Dimension und Abschnitt (bis etwa 900 Zeichen) – mit `nomic-embed-text` (768 Dimensionen) rund 3 KB je Abschnitt, etwa das Drei- bis Vierfache des Textes; mit 1.536 Dimensionen rund 6 KB. Gespeichert wird nur ein Prüfwert jedes Abschnitts, nicht sein Text. Die Administration zeigt Anzahl und Größe.
- **Ausschalten** löscht alle Vektoren; ein **Modellwechsel** baut sie neu auf.
- Für sehr große Instanzen (Hunderttausende Abschnitte) gibt es noch keinen Vektorindex; die Suche bleibt dann korrekt, wird aber langsamer.

## Verwandte Seiten

Unter einer Seite und im Eintrag einer Datenbank zeigt **Verwandte Seiten** bis zu acht Seiten und Einträge, die dazugehören. Das funktioniert auch ohne KI:

- **Ohne Suche nach Bedeutung** zählen Links von der Seite, Links auf die Seite, Seiten mit denselben Verweisen, bei Einträgen gleiche Tags (Mehrfachauswahl) und ähnliche Titel im Volltextindex.
- **Mit Suche nach Bedeutung** kommen Seiten mit ähnlichem Inhalt dazu („nach Bedeutung“). Dafür werden nur die schon gespeicherten Vektoren verglichen – es geht keine Anfrage an den Anbieter, kein Text verlässt den Server. Die geöffnete Seite muss für die KI lesbar sein; jeder Treffer durchläuft dieselben Regeln wie bei **KI fragen**.

Angezeigt wird nur, was du lesen darfst – keine privaten Bereiche anderer, keine verborgenen Einträge, nichts aus dem Papierkorb oder gesperrten Journalen.
