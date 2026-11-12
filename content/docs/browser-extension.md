---
keywords: Browser, Erweiterung, Chrome, Firefox, Web-Clipper, Lesezeichen
---

# Browser-Erweiterung

Mit der Browser-Erweiterung speicherst du Webseiten mit einem Klick in Flowplan: den ganzen Artikel, nur die Auswahl, ein Lesezeichen oder einzelne Markierungen. Sie läuft in Chrome, Edge, Brave, Opera und Firefox.

## Einrichten

1. Lege in Flowplan unter **Einstellungen → API & KI-Assistenten** (oder **Einstellungen → Web-Clipper → Token anlegen**) ein [persönliches API-Token](/api-and-webhooks) an und wähle als Recht **Nur Browser-Erweiterung**. Ein solches Token kann nichts anderes: Es öffnet weder die API noch MCP und kann nichts lesen außer der Liste deiner Ziele.
2. Installiere die Erweiterung (siehe unten) und klicke auf ihr Symbol.
3. Trage die Adresse deiner Instanz ein, zum Beispiel `https://flowplan.example.com`, und das Token. Der Browser fragt jetzt einmal nach dem Zugriff auf genau diese Adresse – auf andere Seiten greift die Erweiterung nie zu.

**Abmelden** im Fenster der Erweiterung löscht das Token aus dem Browser und gibt den Zugriff auf die Instanz wieder ab. Widerrufen kannst du das Token jederzeit in den Einstellungen.

## Speichern

Klicke auf das Symbol der Erweiterung oder drücke **Alt+Umschalt+F**. Wähle das Ziel – die Erweiterung merkt es sich – und optional Tags:

- **Ganze Seite:** Die Erweiterung sucht den eigentlichen Artikel und lässt Navigation, Werbung, Cookie-Hinweise, Kommentare und Seitenleisten weg. Links und Bilder zeigen weiter auf die Originalseite. Oben auf der neuen Seite steht der Link zur Quelle.
- **Auswahl:** Nur der markierte Teil der Seite, mit Formatierung und Links.
- **Nur Lesezeichen:** Titel, Adresse, Beschreibung und Favicon landen in der Datenbank **Lesezeichen** des Bereichs (siehe [Web-Clipper](/import-export-versions)). Doppelte Links werden abgelehnt.

Je nach Ziel entsteht:

| Ziel | Ganze Seite / Auswahl | Lesezeichen |
| --- | --- | --- |
| Ein Bereich | eine neue Seite im Bereich | ein Eintrag in seiner Lesezeichen-Datenbank |
| Eine Seite | eine neue Unterseite | ein Eintrag in der Lesezeichen-Datenbank ihres Bereichs |
| Eine Datenbank | ein neuer Eintrag mit dem Text als Dokument; der Link kommt in die erste Link-Eigenschaft | wie bei der Seite |

**Tags** landen in einer Eigenschaft namens *Tags* (oder *Schlagwörter*, *Labels*), wenn die Datenbank eine hat; neue Tags werden als Optionen ergänzt. In der Lesezeichen-Datenbank legt die Erweiterung die Eigenschaft *Tags* beim ersten Mal an. Auf Seiten stehen die Tags als `#tag` unter dem Quell-Link.

Der Inhalt wird auf dem Server noch einmal bereinigt: Skripte, Formulare, eingebettete Fremdseiten und Ereignis-Attribute fallen weg, so wie beim Einfügen in den Editor.

## Markierungen

Markiere Text auf einer Webseite und wähle im Kontextmenü **In Flowplan markieren** (oder drücke **Alt+Umschalt+H**). Die Stelle wird als Zitat mit einem Link zur Quelle angehängt:

- Ist das Ziel eine **Seite**, landen alle Markierungen untereinander auf dieser Seite.
- Ist das Ziel ein **Bereich**, legt die erste Markierung einer Webseite eine neue Seite für diese Quelle an; weitere Markierungen derselben Webseite kommen auf dieselbe Seite.
- Ist das Ziel eine **Datenbank**, wird jede Markierung ein Eintrag.

Ein grünes Häkchen am Symbol bestätigt das Speichern, ein rotes Ausrufezeichen meldet einen Fehler (etwa ein abgelaufenes Token).

Die Tastenkürzel änderst du in Chrome unter `chrome://extensions/shortcuts`, in Firefox unter **Add-ons → Zahnrad → Tastenkombinationen für Erweiterungen verwalten**.

## Installieren

Die Erweiterung liegt im Quellcode unter `extensions/browser/` und braucht keinen Build-Schritt.

- **Chrome, Edge, Brave:** `chrome://extensions` öffnen, **Entwicklermodus** einschalten, **Entpackte Erweiterung laden** und den Ordner `extensions/browser` wählen.
- **Firefox:** `about:debugging#/runtime/this-firefox` öffnen und **Temporäres Add-on laden** → `extensions/browser/manifest.json`. Für eine dauerhafte Installation die ZIP-Datei bei addons.mozilla.org signieren lassen.
- **Paket bauen:** `npm run extension:zip` schreibt `extensions/browser/dist/flowplan-<version>.zip` – diese Datei lädst du im Chrome Web Store, bei Edge Add-ons oder addons.mozilla.org hoch.

## Datenschutz und Rechte

- Die Erweiterung liest eine Seite nur, wenn du sie aufrufst (Symbol, Kontextmenü oder Tastenkürzel) – sie läuft nicht im Hintergrund auf jeder Seite mit.
- Rechte: `activeTab` (die aktuelle Seite, nur nach deinem Klick), `scripting` (um sie dann zu lesen), `contextMenus`, `storage` (Adresse, Token, zuletzt gewähltes Ziel) und der Zugriff auf genau deine Flowplan-Adresse, erst beim Verbinden erfragt.
- Sie sendet nur an deine Instanz. Cookies werden nicht mitgeschickt; die Anmeldung ist allein das Token.
- Ende-zu-Ende-verschlüsselte Bereiche erscheinen nicht als Ziel: Der Server schreibt nie Klartext hinein.
- Der Server erlaubt Anfragen von Browser-Erweiterungen (CORS) nur für die beiden Clipper-Adressen `/api/clipper/targets` und `/api/clipper/save` und nur mit Token – siehe [API und Webhooks](/api-and-webhooks).
