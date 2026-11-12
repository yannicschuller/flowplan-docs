---
keywords: Umgebungsvariablen, env, Variablen, Konfiguration, Referenz, .env
filter: true
---

# Alle Umgebungsvariablen

Jede Umgebungsvariable von Flowplan in einer Tabelle, von A bis Z – mit Standardwert, der Bedeutung in einem Satz und dem Abschnitt, der sie genau beschreibt.

Die Variablen werden beim Start des Containers gelesen, etwa aus der `.env`-Datei neben der `compose.yaml` oder den Umgebungsvariablen in Coolify ([Installation](/installation)). Viele Werte lassen sich auch in der **Administration** setzen; was dort gespeichert ist, hat Vorrang ([In der Oberfläche](/configuration#in-der-oberflaeche)).

Die Liste wird aus den Seiten dieser Dokumentation zusammengestellt; ein Test prüft gegen den Code von Flowplan, dass keine Variable fehlt. Das Feld über der Tabelle filtert sie, auch nach Teilen wie `S3_` oder `OIDC`.

{{reference:env}}
