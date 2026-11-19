---
keywords: KI, Kontingent, Limit, Grenze, Tokens, Kosten, Budget, Verbrauch, Gruppen, Ausnahme, Workflows, übrig
---

# KI-Kontingente

Die Administration kann begrenzen, wie viel KI über den [Anbieter der Instanz](/ai#anbieter) genutzt wird – für die ganze Instanz, als Standard je Person, für Rollen und Gruppen und für einzelne Konten, je Tag, Woche, Monat und Jahr. Jede Person sieht, wie viel ihr noch bleibt.

> [!NOTE]
> **Nur der Anbieter der Instanz zählt.** Ein [eigener Anbieter](/ai#fuer-nutzer) mit eigenem Schlüssel und die [KI auf dem Gerät](/ai#ki-auf-dem-geraet-apple) zählen nie und funktionieren weiter, wenn ein Kontingent aufgebraucht ist.

## Was gezählt wird {since=0.10.2}

- **Tokens:** Eingabe und Ausgabe zusammen, wie der Anbieter sie meldet – sonst schätzt Flowplan sie aus der Textlänge.
- **Oder Kosten:** Sind unter **Administration → KI → Preise** Preise je Modell eingetragen (je Million Tokens, Eingabe und Ausgabe getrennt), lassen sich die Grenzen auch als geschätzte Kosten in der Währung der Instanz setzen. Ein Modell ohne Preis zählt dann nicht mit – die Administration sieht dazu einen Hinweis.
- **Alle KI-Funktionen** mit dem Anbieter der Instanz: Schreibassistent, Zusammenfassungen, KI fragen, KI-Aktionen, KI in Datenbanken, Whiteboards, Handschrift, Lernkarten und Besprechungsnotizen. Die [Suche nach Bedeutung](/ask-ai#suche-nach-bedeutung-optional) zählt zur Grenze der ganzen Instanz, keiner Person.
- **Workflows** behalten ihr eigenes Tagesbudget. Ob ihre KI-Knoten zur Grenze der ganzen Instanz zählen, ist eine Einstellung (Standard: ja); zur Person, als die ein Workflow läuft, zählen sie nie.
- **Nicht gezählt** wird die Transkription von Sprachnotizen und Besprechungen: Sie läuft über den eigenen Whisper-Dienst, nicht über den KI-Anbieter.

Die Zeiträume sind Kalenderzeiträume in der Zeitzone, die die Administration festlegt: Ein Tag beginnt um Mitternacht, eine Woche am Montag (oder Sonntag), ein Monat am Ersten, ein Jahr am 1. Januar.

## Für Admins {since=0.10.2}

Unter **Administration → KI → Kontingente**:

::: steps

1. **Einheit** wählen: **Tokens** oder – mit Preisen je Modell – **Kosten**. Beim Wechsel der Einheit werden die eingetragenen Grenzen geleert.
2. **Zeitzone** und **Woche beginnt am** festlegen.
3. **Hinweis ab** (Standard 80 %): Ab diesem Anteil sehen Personen einen Hinweis; für die ganze Instanz bekommst du eine Benachrichtigung.
4. **Workflows zählen zur Instanzgrenze** an- oder ausschalten.
5. Unter **Grenzen** die Zahlen je Tag, Woche, Monat und Jahr eintragen. Leer heißt: keine Grenze für diesen Zeitraum. Mehrere Zeiträume gelten zugleich, etwa 50 000 Tokens am Tag und 1 Million im Monat.

:::

Die Ebenen:

| Ebene | Gilt für |
| --- | --- |
| **Ganze Instanz** | Alle zusammen – eine Obergrenze, damit die Rechnung nicht davonläuft. Sie gilt immer zusätzlich. |
| **Standard je Person** | Alle ohne eigene Grenze und ohne Gruppe mit Grenze. |
| **Rollen** | **Administratoren** und **Gäste** (Personen, die nur Gastzugänge haben). |
| **Gruppen** | Gruppen der Arbeitsbereiche – auch die, die über die [SSO-Zuordnungen](/sso-oidc#sso-gruppen-arbeitsbereichen-zuordnen) aus SSO-, SCIM- und LDAP-Gruppen gefüllt werden. |
| **Einzelne Personen** | Mehr, weniger oder **ausgenommen**. |

Welche Grenze für eine Person gilt: ihre eigene, sonst die **höchste** ihrer Gruppen und Rollen (je Zeitraum; lässt eine ihrer Gruppen einen Zeitraum offen, gibt es dort keine Grenze), sonst der Standard. **Ausgenommen** – eine Person oder eine Gruppe – hebt die persönlichen Grenzen auf; die Grenze der ganzen Instanz bleibt.

Unter **Nutzung und Grenzen** siehst du für den gewählten Zeitraum den Verbrauch der ganzen Instanz, je Person (sortierbar nach Verbrauch, Rest oder Name, mit der Grenze und woher sie kommt), je Gruppe und je Modell. Die [KI-Statistik](/administration#ueberwachung) zeigt die Grenzen der Instanz als Linie.

**Benachrichtigungen:** Erreicht die ganze Instanz den Hinweis-Anteil und später 100 %, bekommen alle Administratoren je Zeitraum einmal eine Nachricht (Art **KI-Kontingent der Instanz** unter **Einstellungen → Benachrichtigungen**).

## Für Nutzer {since=0.10.2}

- **Einstellungen → KI → KI-Kontingent** zeigt je Zeitraum einen Balken: „1.500 von 10.000 übrig“ und wann er neu beginnt – in Tokens oder, wenn die Administration Kosten eingestellt hat, in Geld.
- **In den KI-Fenstern** (KI fragen, Schreibassistent, Zusammenfassung) erscheint ein kleiner Hinweis, sobald weniger als 20 % übrig sind (oder was die Administration festgelegt hat).
- **Aufgebraucht:** Eine Anfrage, die eine Grenze überschreiten würde, wird abgelehnt, bevor sie an den Anbieter geht – mit dem Zeitpunkt, ab dem es wieder geht, und den Alternativen: ein eigener Anbieter (wenn erlaubt) oder die KI auf dem Gerät. Jede KI-Funktion zeigt dieselbe Meldung.

Skripte und KI-Assistenten lesen dasselbe mit `GET /api/ai/quota` (API-Token mit der Berechtigung **KI und Transkription**, siehe [OpenAPI](/openapi)).

## Häufige Fragen

**Wie genau wird vorher geschätzt?**
Vor dem Senden zählt Flowplan die Länge der Anfrage und die größte erlaubte Antwortlänge. Passt das nicht mehr ins Kontingent, wird abgelehnt. Gezählt wird danach, was die Antwort wirklich gebraucht hat.

**Zählen frühere Anfragen?**
Gezählt wird ab dieser Version. Die Zählung ist unabhängig von der Nutzungsstatistik unter Überwachung und läuft auch, wenn diese ausgeschaltet ist.

**Was passiert mit dem Verbrauch gelöschter Konten?**
Er bleibt im Verbrauch der ganzen Instanz, ohne Person.
