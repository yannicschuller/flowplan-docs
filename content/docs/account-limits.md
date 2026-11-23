---
keywords: Grenzen, Speicher, Speicherlimit, Speicher & KI, Kontingent, Gruppe, Verzeichnisgruppe, SCIM, Größte Datei, Upload-Grenze, Eigene Arbeitsbereiche, mehr Speicher, quota, limits
---

# Grenzen für Konten

Wie viel Speicher jemand bekommt, wie viele Arbeitsbereiche ihm gehören dürfen und wie groß eine Datei sein darf – als Standard der Instanz, für die Mitglieder einer Gruppe oder für eine einzelne Person.

**Mehr zum Thema:** [Benutzer verwalten](/user-management) · [KI-Kontingente](/ai-quotas)

Den Standard legst du unter **Administration → Grenzen & Aufbewahrung** fest ([Grenzen & Aufbewahrung](/administration#grenzen-aufbewahrung)), eigene Werte einer Person in ihrem Seitenfenster unter [Benutzer](/user-management#benutzer): **Speicherlimit** und unter **Weitere** **Eigene Arbeitsbereiche** und **Größte Datei**. Wie viel KI jemand nutzen darf, regeln die [KI-Kontingente](/ai-quotas) – mit derselben Auswahl an Gruppen.

## Grenzen pro Gruppe {since=0.11.1}

Unter **Grenzen & Aufbewahrung → Grenzen pro Gruppe** gibst du den Mitgliedern einer Gruppe mehr (oder weniger) als den [Standard](/administration#grenzen-aufbewahrung): **Speicher**, **Eigene Arbeitsbereiche** und **Größte Datei**. Die Gruppe wählst du unter **Gruppe hinzufügen** – dieselbe Auswahl wie bei den [KI-Kontingenten](/ai#fuer-admins):

- **Gruppen der Arbeitsbereiche**: zählen für ihre Mitglieder, egal in welchem Arbeitsbereich die Gruppe liegt. Auch über die [SSO-Zuordnungen](/sso-oidc) gefüllte Gruppen.
- **Verzeichnisgruppen (SCIM, LDAP, SSO)**: eine Gruppe deines Identitätsanbieters direkt nach ihrem Namen – eine über [SCIM](/scim-and-ldap#benutzer-bereitstellen-mit-scim) bereitgestellte Gruppe, eine LDAP-Gruppe oder eine Gruppe aus der SSO-Anmeldung. Sie braucht weder Arbeitsbereich noch Zuordnung und gilt auch für Konten mit E-Mail und Passwort, die das Verzeichnis als Mitglied führt. Unter **Verzeichnisgruppe nach Name** trägst du auch eine Gruppe ein, die das Verzeichnis noch nicht geschickt hat.

Leer heißt: Die Gruppe legt diese Grenze nicht fest. Für eine Person gilt je Grenze:

1. ihr eigener Wert (im Seitenfenster unter **Benutzer**),
2. sonst der großzügigste Wert ihrer Gruppen – 0 (unbegrenzt) schlägt jede Zahl,
3. sonst der Standard der Instanz.

Für Admins gelten keine Grenzen. Die Person sieht unter [Einstellungen → Speicher & KI](#speicher-ki-in-den-einstellungen), woher ein Wert kommt („aus Gruppe Plus“). Änderungen gelten sofort, auch beim nächsten Hochladen; ist der Speicher voll oder eine Datei zu groß, nennt die Meldung die Grenze („Die Datei ist zu groß: Du kannst Dateien bis 10 MB hochladen.“).

### Speicher als Add-on {since=0.11.2}

Neben dem Speicher einer Gruppe wählst du **Grenze** (wie oben) oder **Zusätzlich (Add-on)**. Der Speicher einer Add-on-Gruppe wird nicht mit den anderen Gruppen verglichen, sondern dazugezählt – etwa für ein gekauftes „+50 GB“:

1. Grundwert: der großzügigste Speicher ihrer Gruppen mit **Grenze**, sonst der Standard der Instanz,
2. dazu die Summe aller Add-on-Gruppen, in denen die Person ist.

Beispiel: „Flowplan Plus“ mit 25 GB (25600 MB) und „Flowplan +50 GB“ als Add-on mit 50 GB (51200 MB) ergeben 75 GB; das Add-on allein ergibt den Standard plus 50 GB, zwei Add-ons werden zusammengezählt. Ist der Grundwert unbegrenzt (0), bleibt es dabei. Hat die Person einen **eigenen Wert**, gilt genau dieser – Add-ons kommen nicht dazu (im Seitenfenster unter **Benutzer** steht dann „Add-ons der Gruppen werden nicht dazugezählt“). Ein Add-on braucht mindestens 1 MB. **Eigene Arbeitsbereiche** und **Größte Datei** kennen kein Add-on: Dort gilt weiter der großzügigste Wert. Unter **Speicher & KI** steht dann zum Beispiel „25 GB aus Gruppe Flowplan Plus + 50 GB aus Gruppe Flowplan +50 GB“.

**Link für mehr Speicher oder KI** (unter **Speicher und Uploads**): eine Adresse, die Personen unter **Speicher & KI** und im Hinweis bei 80 % als Schaltfläche **Mehr Speicher oder KI?** sehen – etwa die Seite, auf der sie mehr bekommen. Ein einfacher Link ohne Anmeldedaten; leer = kein Link.

## Speicher & KI in den Einstellungen {since=0.11.3}

Jede Person sieht unter **Einstellungen → Speicher & KI** (die erste Kachel unter **Persönlich**, auf jeder [Einstellungsstufe](/settings#einstellungsstufen)) alles an einem Ort. Schon die Kachel zeigt zwei Balken – etwa „4,2 von 25 GB“ Speicher und „340 von 1.000 Tokens diesen Monat“ KI – und woher der Speicher kommt („Flowplan Plus“, „Standard“). „unbegrenzt“ heißt: keine Grenze; „KI aus“: KI ist für dich ausgeschaltet; ohne KI auf der Instanz fehlt der KI-Balken.

Die Seite zeigt:

- **Speicher**: belegt und Grenze mit Balken und die Herkunft („aus Gruppe Flowplan Plus“, mit Add-ons „25 GB aus Gruppe Flowplan Plus + 50 GB aus Gruppe Flowplan +50 GB“), **Nach Arbeitsbereich** (wenn deine Dateien in mehreren liegen), **Größte Datei beim Hochladen** und **Eigene Arbeitsbereiche** („1 von 3“).
- **KI-Kontingent**: je Zeitraum, was übrig ist und wann er neu beginnt, und was danach passiert – „Danach geht es mit … weiter.“ oder „Danach ist KI aus – bis …“. Die Grenze der ganzen Instanz erscheint nur, wenn sie bald erreicht ist. Dazu **Deine KI-Modelle** (das Modell der Instanz, eines für dich festgelegten oder deines eigenen Anbieters). Siehe [KI-Kontingente](/ai-quotas#fuer-nutzer).
- **Mehr Speicher oder KI?** als Schaltfläche, wenn die Administration einen [Link](#speicher-als-add-on) eingetragen hat.

**Hinweis bei 80 %:** Erreicht dein Speicher oder dein persönliches KI-Kontingent 80 % (bei der KI der Hinweis-Anteil der Administration) und noch einmal bei 100 %, erscheint oben ein ruhiger Hinweis mit **Speicher & KI ansehen** und gegebenenfalls **Mehr Speicher oder KI?**. Geschlossen bleibt er auf diesem Gerät geschlossen – beim Speicher, bis die Belegung unter die Schwelle fällt und wieder steigt, bei der KI bis zum nächsten Zeitraum.

Alte Links auf **Konto & Sicherheit → Deine Grenzen** und **KI → KI-Kontingent** führen auf die neue Seite.

Über SCIM: Ein Dienst mit SCIM-Token kann ein bestehendes Konto mit bestätigter Adresse verknüpfen, ohne es anzulegen – `POST /Users` mit `"urn:ietf:params:scim:schemas:extension:flowplan:2.0:User": {"linkExisting": true}` (ohne passendes Konto: 404) – und es dann per `PATCH /Groups/…` in eine Gruppe aufnehmen oder herausnehmen. Name, Adresse, Passwort und Zustand des Kontos bleiben dabei, wie sie sind, solange die Anfrage sie nicht nennt; deaktiviert wird ein Konto nur mit `"active": false` oder `DELETE /Users/…`.

## Export / Import {since=0.11.3}

Unter **Grenzen & Aufbewahrung → Export / Import** stellst du alles für die Tarife auf einmal ein – Grenzen pro Gruppe, KI-Kontingente, KI-Modelle und die Standards – mit einer JSON-Datei. Es ist dasselbe Format wie der Tarif-Import des Abrechnungsdienstes: Jede Seite liest ihre Felder und übergeht die der anderen (Preise, Namen, Beschreibungen, Reihenfolge, `_ids` …). Unter **KI → Kontingente** führt ein Link hierher.

- **Exportieren** lädt die aktuellen Einstellungen als Datei herunter und zeigt sie im Textfeld. Was sich nicht darstellen lässt (Regeln für Rollen oder einzelne Personen, ausgenommene Gruppen, Grenzen für weitere Zeiträume), steht unter `_skipped`. Zählen die Kontingente in Tokens, schreibt der Export die Grenzen als `aiTokens` und `defaultTokens`, sonst als `aiActions` und `defaultActions`.
- **Datei öffnen** oder einfügen, dann **Prüfen**: Die Datei wird ganz geprüft, ohne etwas zu speichern. Fehler stehen mit ihrer Stelle in der Datei da („plans[1].aiAfter: das Modell „gpt-9“ kennt die Instanz nicht – erlaubt: …“), sonst jede Änderung in Worten („Gruppe Flowplan Plus: Speicher 2.000 MB → 25.600 MB“, „KI-Regel für Flowplan Pro: neu, 5.000 Aktionen (100,00 USD) im Monat, danach claude-haiku-4-5“).
- **Übernehmen** speichert nach einer Rückfrage alle Änderungen auf einmal – alle oder keine. Jede steht im Aktivitätsprotokoll. Dieselbe Datei noch einmal ergibt „Keine Änderungen“.

Was nicht in der Datei steht, bleibt, wie es ist; ein fehlendes Feld ändert nichts, `null` entfernt den Wert. Mit `"removeMissing": true` (unter `flowplan`) verlieren Verzeichnisgruppen, die nicht in der Datei stehen, ihre Grenzen, KI-Regeln und KI-Modelle.

Jeder Eintrag unter `plans` ist eine [Verzeichnisgruppe](#grenzen-pro-gruppe) mit dem Namen aus `group`:

- `storageMb` – Speicher; bei `"kind": "addon"` als [Add-on](#speicher-als-add-on), sonst als Grenze (0 = unbegrenzt). `uploadMb` – größte Datei (Add-ons: keine; 0 = von der Gruppe nicht festgelegt; über 10240 MB (10 GB) wird mit Hinweis auf 10240 MB begrenzt {since=0.11.3}). `workspaces` – eigene Arbeitsbereiche.
- `aiTokens` – die [KI-Grenze](/ai-quotas) der Gruppe in Tokens je Zeitraum, ohne Umrechnung; so schreibt sie der Abrechnungsdienst. Nur, wenn die Kontingente in Tokens zählen (`"unit": "tokens"`); zählen sie in Kosten, ist `aiTokens` allein ein Fehler mit dem Hinweis, die Einheit auf `tokens` zu setzen oder die Grenze als Kosten anzugeben. {since=0.11.3}
- `aiActions` – dieselbe Grenze in Aktionen je Zeitraum, wie in älteren Dateien, umgerechnet in die Einheit der Kontingente: `tokensPerAction` (Standard 5.000 Tokens) oder `costPerAction` (Standard 0,02 in der Währung der Preise). Stehen beide da, gilt bei Tokens `aiTokens` und bei Kosten `aiActions` – **Prüfen** nennt das. `aiAfter` – „Danach“: `"off"` (KI aus), `"haiku"`, `"sonnet"`, `"opus"` (das Modell dieser Familie, das die Instanz kennt) oder eine Modell-ID der Instanz. `aiAfterTokens` – wie viele Tokens je Zeitraum danach mit diesem Modell gehen ([höchstens … für danach](/ai-quotas)); `null` = unbegrenzt, nur mit `"unit": "tokens"`. {since=0.11.3} Add-ons bekommen nur mit `aiTokens` oder `aiActions` über 0 eine KI-Regel.
- `aiModels` – das [KI-Modell](/ai-quotas) der Gruppe: `"haiku"` oder `"sonnet"` (das Modell dieser Familie), `"all"` (das leistungsfähigste: Opus, sonst Sonnet, sonst Haiku); oder genau ein Modell mit `aiModel`. Kennt die Instanz keins, ist das ein Fehler mit der Liste der erlaubten Modelle.

Unter `flowplan`: `defaults` (Speicher je Person, größte Datei, eigene Arbeitsbereiche), `moreLimitsUrl` (der [Link für mehr Speicher oder KI](#speicher-als-add-on)), `aiQuota` mit `period` (`day`, `week`, `month` – Standard –, `year`), `unit` (`tokens` oder `cost`; eine andere Einheit leert die Zahlen der übrigen Regeln), `defaultTokens` oder `defaultActions` (wie `aiTokens` und `aiActions`) und `defaultAfter` mit `defaultAfterTokens` (der Standard je Person) und der Grenze der ganzen Instanz: `instanceCapUsd` (Kosten in USD), `instanceCap` (Kosten in der Währung der Preise) oder `instanceCapTokens`. Unter `groups` stehen weitere Gruppen mit denselben Feldern – auch eine Gruppe eines Arbeitsbereichs als `"workspaceGroup": { "workspace": "…", "group": "…" }`.

```json
{
  "version": 1,
  "plans": [
    {
      "group": "Flowplan Plus",
      "kind": "plan",
      "storageMb": 25600,
      "uploadMb": 1024,
      "aiTokens": 5000000,
      "aiModels": "sonnet",
      "aiAfter": "haiku"
    },
    {
      "group": "Flowplan Pro",
      "kind": "plan",
      "storageMb": 102400,
      "uploadMb": 1024,
      "workspaces": 50,
      "aiTokens": 25000000,
      "aiModels": "all",
      "aiAfter": "haiku",
      "aiAfterTokens": 20000000
    },
    {
      "group": "Flowplan +50 GB",
      "kind": "addon",
      "storageMb": 51200
    }
  ],
  "flowplan": {
    "defaults": { "storageMb": 500, "uploadMb": 10 },
    "aiQuota": {
      "period": "month",
      "unit": "tokens",
      "defaultTokens": 150000,
      "defaultAfter": "off",
      "instanceCapTokens": 1000000000
    },
    "moreLimitsUrl": "https://billing.example.org/preise",
    "removeMissing": false,
    "groups": [
      { "workspaceGroup": { "workspace": "Agentur", "group": "Design" }, "storageMb": 3000 }
    ]
  }
}
```
