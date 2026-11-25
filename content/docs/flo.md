---
keywords: Frag Flo, Flo, Doku-Assistent, Chat, Frage, Antwort, Claude, Anthropic, Quellen, Datenschutz, Grenzen, Discord /ask, KI-Hilfe
---

# Frag Flo

Flo ist der Assistent dieser Dokumentation: Stell eine Frage zu Flowplan in deinen eigenen Worten und bekomm eine kurze Antwort aus diesen Seiten – mit Links zu den Abschnitten, aus denen sie stammt.

## Was Flo ist

Flo – der kleine Otter mit dem Notizblock – wohnt im Knopf **Frag Flo** unten rechts auf jeder Seite. Klick darauf, tipp deine Frage ein und drück Enter. Flo antwortet in wenigen Sätzen und nennt die Seiten unter **Quellen**, damit du dort weiterlesen kannst. Links in diese Doku öffnen sich im selben Tab, und das Gespräch ist noch da, wenn du Flo auf der nächsten Seite wieder öffnest.

Du kannst auch in der Suche anfangen: Tipp ein, was du suchst (⌘K, Strg+K oder `/`), und wähl am Ende der Treffer **Flo fragen: …**. Flo öffnet sich mit deinem Suchbegriff im Eingabefeld – du kannst ihn noch ändern, und er geht erst an Flo, wenn du ihn abschickst.

Flo versteht Nachfragen – „und unter Android?“ –, weil die letzten Fragen und Antworten des Gesprächs mit der nächsten Frage mitgehen. **Neu anfangen** leert das Gespräch. Auf dem Handy öffnet sich Flo als Blatt vom unteren Bildschirmrand.

Flo antwortet auf Deutsch oder Englisch – je nachdem, in welcher Sprache du die Doku liest und deine Frage schreibst.

## Wie Flo antwortet

Flo antwortet **nur aus dieser Dokumentation**. Für jede Frage durchsucht der Flo-Dienst die öffentlichen Seiten von docs.flowplan.org, wählt die passendsten Abschnitte aus und gibt sie zusammen mit deiner Frage an das Sprachmodell Claude von Anthropic. Claude soll nur aus diesen Abschnitten antworten und die verwendeten Seiten nennen. Flo hat keinen Zugang zum Internet, kann keine Werkzeuge benutzen und sieht weder deine Flowplan-Instanz noch deine Seiten oder dein Konto.

Flo kennt außerdem den aktuellen Zustand der Dienste, die Flowplan selbst betreibt – Flowplan Cloud unter app.flowplan.org, die Website, diese Doku und die anderen gehosteten Dienste – von der [Statusseite](https://status.flowplan.org). Fragst du, ob etwas ausgefallen, langsam oder nicht erreichbar ist, oder hat ein gehosteter Dienst gerade ein Problem, liest der Flo-Dienst die öffentlichen Daten der Statusseite (alle fünf Minuten geprüft) und gibt sie zusammen mit der Doku an Claude; Claude selbst ruft weiterhin nichts ab. Über einen Flowplan-Server, den du selbst betreibst, weiß die Statusseite nichts – dafür verweist Flo dich auf die Fehlersuche in dieser Doku.

Steht etwas nicht in der Doku, sagt Flo das und verweist dich auf die Doku, die Community auf Discord oder GitHub. Fragen, die nichts mit Flowplan zu tun haben, lehnt Flo kurz ab.

Antworten sind Text mit wenig Formatierung – Listen, Fett, Code – und enthalten nur Links in diese Doku, auf flowplan.org, zur Statusseite, zu Flowplans GitHub-Repositorys und zur Discord-Einladung. Alles andere in einer Antwort erscheint als Text, nie als klickbarer Link oder als Code, der ausgeführt wird.

> [!WARNING]
> Antworten können falsch sein. Ein Sprachmodell kann einen Abschnitt falsch verstehen, zwei Funktionen verwechseln oder eine Bedingung weglassen. Bei allem, was wichtig ist – einem Update, einer Sicherung, einer Einstellung auf deinem Server –, lies den verlinkten Abschnitt, bevor du danach handelst.

## Datenschutz

Kurz gesagt, und so steht es auch unter dem Eingabefeld: **Deine Frage geht an Anthropic (Claude) und wird nur aus den öffentlichen Docs beantwortet.**

Was an Anthropic geht:

- deine Frage,
- die letzten Fragen und Antworten dieses Gesprächs (höchstens die letzten sechs Nachrichten – jede Frage und jede Antwort zählt einzeln – und zusammen höchstens etwa 4.000 Zeichen), damit Nachfragen funktionieren,
- die Ausschnitte aus dieser Doku, die Flo für die Antwort ausgewählt hat,
- wenn es für die Frage wichtig ist, der aktuelle Zustand der gehosteten Dienste von Flowplan von der öffentlichen Statusseite.

Was nicht an Anthropic geht: dein Name, deine IP-Adresse, Cookies, der unten beschriebene Sitzungsschlüssel oder sonst etwas über dich. Flo weiß nicht, wer du bist, und muss es auch nicht wissen. Schreib keine persönlichen oder vertraulichen Angaben in eine Frage – sie würden als Teil des Textes mitgeschickt.

Was in deinem Browser bleibt:

- **Kein Cookie.** Flo setzt keins und schickt keins. Anfragen gehen ohne Cookies und ohne die Adresse der Seite hinaus; nur der Name der Seite, die du gerade liest, geht als Hinweis für die Suche nach den passenden Abschnitten mit.
- **Das Gespräch bleibt in diesem Tab.** Es liegt im Sitzungsspeicher des Tabs, übersteht also den Wechsel zwischen Seiten und ist weg, sobald du den Tab schließt – oder sobald du **Neu anfangen** wählst.
- **Ein Sitzungsschlüssel.** Vor der ersten Frage löst dein Browser eine kleine Rechenaufgabe, die etwa eine Sekunde dauert („Flo wird vorbereitet …“). Dafür gibt der Dienst einen Sitzungsschlüssel aus, der zwei Stunden gilt. Er hängt an nichts Persönlichem und liegt ebenfalls nur im Tab. Er hält Skripte davon ab, massenhaft zu fragen, und lässt den Dienst die Grenzen unten zählen.
- **Auf dieser Seite wird nichts gezählt.** Fragen sind nicht Teil der Besucherstatistik der Doku.

Beim Flo-Dienst:

- **Grenzen** werden pro Sitzungsschlüssel gezählt und – als Rückfall – unter einem Hash der IP-Adresse mit geheimem Schlüssel. Die IP-Adresse selbst wird nie gespeichert.
- **Protokolle sind standardmäßig aus.** Schaltet der Betreiber sie ein, um Flo zu verbessern, werden nur anonymisierte Frage-Antwort-Paare aufbewahrt – ohne Sitzungsschlüssel, Adresse oder andere Kennung – und nach einer festen Zahl von Tagen automatisch gelöscht.

Anthropic verarbeitet den Text, den es bekommt, nach den Bedingungen für seine API.

## Grenzen

Damit Flo für alle erreichbar bleibt und die Kosten planbar sind, gibt es Grenzen:

| Grenze | Was passiert |
| --- | --- |
| Länge einer Frage | Standardmäßig etwa 500 Zeichen; der Zähler unter dem Feld zeigt, wie viele noch übrig sind |
| Fragen pro Sitzung | Einige pro Minute, Stunde und Tag. Erreichst du eine Grenze, sagt dir Flo, ab wann du wieder fragen kannst |
| Alle Fragen zusammen | Eine Tages- und Monatsgrenze für alle. Ist sie erreicht, macht Flo Pause und der Knopf verschwindet bis dahin |
| Monatsbudget | Ist das Budget des Monats aufgebraucht, pausiert Flo bis zum nächsten Monat |

Macht Flo Pause, schließt sich das Fenster, ein kurzer Hinweis sagt dir warum, und der Knopf verschwindet. Die Doku, die Suche und alles andere auf dieser Seite funktionieren wie immer.

## Flo auf Discord

Im [Flowplan-Discord](https://discord.gg/bCEdB6MPrR) antwortet Flo auf den Slash-Befehl `/ask` in den Kanälen, die dafür vorgesehen sind: Tipp `/ask` und dann deine Frage. Die Antwort öffnet einen **öffentlichen Thread** im Kanal – alle im Kanal können deine Frage und die Antwort lesen –, und Nachfragen stellst du direkt im Thread.

Dort gelten dieselben Regeln: Antworten nur aus dieser Doku, mit Quellen, und Grenzen pro Person und insgesamt. Flo schickt deinen Discord-Namen und deine ID nicht an Anthropic; der Dienst bekommt nur einen pseudonymen Schlüssel, den der Discord-Bot aus deinem Konto ableitet, um die Grenzen zu zählen. Ist Flo aus oder eine Grenze erreicht, sagt dir `/ask` das in einer Nachricht, die nur du siehst.

## Andere Wege zu fragen

- [Flowplan-Doku in deiner KI](/docs-in-your-ai): Nutze diese Doku in Claude, ChatGPT, Cursor oder einem anderen eigenen Assistenten – als MCP-Server oder mit den Knöpfen **In Claude fragen** und **In ChatGPT fragen** unter jedem Seitentitel.
- Die Community auf [Discord](https://discord.gg/bCEdB6MPrR) – dort helfen sich Leute, die Flowplan nutzen und betreiben.
- Ein Fehler oder etwas fehlt in der Doku: Öffne ein Issue auf [GitHub](https://github.com/yannicschuller/flowplan/issues).
