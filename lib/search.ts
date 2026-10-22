// Search helpers shared by the index builder (lib/docs.ts, on the server) and
// the search box (components/docs/docs-nav.tsx, in the browser).

// Words people search for that the docs say differently: the other language,
// an abbreviation, the technical term. Each group is one meaning; folded
// (lower case, no accents) and in both languages, since the English pages
// keep some German terms and the other way round.
export const SYNONYMS: string[][] = [
  ["login", "log in", "anmeldung", "anmelden", "einloggen", "sign-in", "sign in", "signin"],
  ["logout", "abmelden", "abmeldung", "sign out", "sign-out"],
  ["registrierung", "registrieren", "sign-up", "sign up", "signup", "konto anlegen"],
  ["env", "umgebungsvariable", "umgebungsvariablen", "environment variable", "konfiguration", "configuration", ".env"],
  ["s3", "speicher", "storage", "bucket", "object storage", "minio", "garage"],
  ["sso", "single sign-on", "oidc", "openid", "openid connect"],
  ["ki", "ai", "kuenstliche intelligenz", "kunstliche intelligenz", "artificial intelligence", "llm", "ollama"],
  ["backup", "backups", "sicherung", "sicherungen", "datensicherung"],
  ["passwort", "password", "kennwort"],
  ["2fa", "zwei-faktor", "two-factor", "totp", "authenticator"],
  ["passkey", "passkeys", "webauthn"],
  ["export", "exportieren", "exporting"],
  ["import", "importieren", "importing", "umzug", "migration", "migrate"],
  ["berechtigung", "berechtigungen", "rechte", "permissions", "permission", "zugriff", "access"],
  ["vorlage", "vorlagen", "template", "templates"],
  ["datenbank", "datenbanken", "database", "databases"],
  ["tastenkuerzel", "tastenkurzel", "shortcut", "shortcuts", "hotkey", "keyboard"],
  ["benachrichtigung", "benachrichtigungen", "notification", "notifications", "push"],
  ["dunkel", "dark mode", "dunkler modus", "dark"],
  ["sprache", "sprachen", "language", "languages", "uebersetzung", "translation"],
  ["proxy", "reverse proxy", "nginx", "traefik", "caddy"],
  ["update", "updates", "aktualisieren", "aktualisierung", "upgrade"],
  ["papierkorb", "trash", "geloscht", "deleted", "wiederherstellen", "restore"],
];

// Lower case without accents; ß becomes "ss", ä/ö/ü their bare letters.
export const fold = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss");

const folded = SYNONYMS.map((group) => group.map(fold));
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const boundary = "[^\\p{L}\\p{N}]";
// A term is found where a word starts; short terms (ai, ki, s3, env) must
// also end there, so "ai" does not hit "mail". Longer ones may go on, so
// "speicher" finds "Speicherort".
const termRe = (term: string) =>
  new RegExp(`(?:^|${boundary})${escapeRe(term)}${term.length <= 3 ? `(?=${boundary}|$)` : ""}`, "u");
const termRes = folded.map((group) => group.map(termRe));

// For the index: the synonyms of every term that occurs in a text, so a
// search for "login" finds a section that only says "Anmeldung".
export function synonymKeywords(text: string): string {
  const haystack = fold(text);
  const found = new Set<string>();
  folded.forEach((group, i) => {
    if (termRes[i].some((re) => re.test(haystack))) for (const term of group) found.add(term);
  });
  return [...found].join(" ");
}

// The terms a query word stands for: itself and, when it names a synonym
// group, every term of it ("anmel" → anmeldung, login, sign-in …).
export function expandWord(word: string): string[] {
  const out = new Set([word]);
  if (word.length >= 2)
    for (const group of folded)
      if (group.some((term) => term === word || (word.length >= 3 && term.startsWith(word)))) for (const term of group) out.add(term);
  return [...out];
}

export type Piece = { text: string; hit: boolean };

// Splits a text into pieces, marking every occurrence of the given folded
// terms (case and accents ignored). Positions are mapped back character by
// character, so the original spelling is kept.
export function highlight(text: string, terms: string[]): Piece[] {
  const chars: string[] = [];
  const origin: number[] = [];
  for (let i = 0; i < text.length; i++)
    for (const c of fold(text[i])) {
      chars.push(c);
      origin.push(i);
    }
  const haystack = chars.join("");
  const marks = new Array<boolean>(text.length).fill(false);
  for (const term of terms.filter((t) => t.length > 0)) {
    for (let at = haystack.indexOf(term); at >= 0; at = haystack.indexOf(term, at + term.length))
      for (let k = origin[at]; k <= origin[at + term.length - 1]; k++) marks[k] = true;
  }
  const pieces: Piece[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = pieces[pieces.length - 1];
    if (last && last.hit === marks[i]) last.text += text[i];
    else pieces.push({ text: text[i], hit: marks[i] });
  }
  return pieces;
}

// A short excerpt of a text around the first occurrence of any of the terms.
export function excerpt(text: string, terms: string[], width = 110): string | undefined {
  const haystack = fold(text);
  let at = -1;
  for (const term of terms) {
    const i = haystack.indexOf(term);
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0) return undefined;
  const start = Math.max(0, text.lastIndexOf(" ", Math.max(0, at - 40)) + 1);
  return (start > 0 ? "… " : "") + text.slice(start, start + width).trim() + (start + width < text.length ? " …" : "");
}
