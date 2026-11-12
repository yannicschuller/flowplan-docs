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

// The sentence around the first occurrence of any of the terms, for the
// result list; a window around the hit when the sentence is long.
export function sentence(text: string, terms: string[], max = 180): string | undefined {
  const haystack = fold(text);
  let at = -1;
  for (const term of terms) {
    const i = haystack.indexOf(term);
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0) return undefined;
  const before = text.slice(0, at);
  const ends = [...before.matchAll(/[.!?:]\s+(?=[\p{Lu}\p{N}„"*(])/gu)];
  const start = ends.length ? ends[ends.length - 1].index! + ends[ends.length - 1][0].length : 0;
  const next = text.slice(at).search(/[.!?](\s|$)/);
  const end = next < 0 ? text.length : at + next + 1;
  if (end - start <= max) return (start > 0 ? "… " : "") + text.slice(start, end).trim() + (end < text.length ? " …" : "");
  return excerpt(text, terms, max);
}

// The first sentence of a text, at most about 160 characters.
export function opening(text: string, max = 160): string | undefined {
  const t = text.trim();
  if (!t) return undefined;
  const end = t.search(/[.!?](\s|$)/);
  const first = end < 0 ? t : t.slice(0, end + 1);
  if (first.length <= max) return first + (first.length < t.length ? " …" : "");
  return t.slice(0, t.lastIndexOf(" ", max)).trim() + " …";
}

// The shape of the search index (lib/docs.ts docSearchIndex) as far as the
// search needs it.
export type SearchSection = { id: string; text: string; parent?: string; body: string; keywords: string };
export type SearchPage = { slug: string; title: string; group: string; summary: string; text: string; tags?: string[]; keywords: string; sections: SearchSection[] };
export type SearchHit = {
  href: string;
  slug: string;
  // The page; for a section also its heading and, below level 2, the level-2 heading.
  page: string;
  section?: string;
  parent?: string;
  group: string;
  snippet?: string;
  score: number;
};

// Every page and section matching all words of the query (each word or one
// of its synonyms), best first: titles, then keywords, then text.
export function searchDocs(index: SearchPage[], query: string, prefix = "", limit = 12): { results: SearchHit[]; terms: string[] } {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return { results: [], terms: [] };
  const expanded = words.map(expandWord);
  const terms = [...new Set(expanded.flat())];
  const hits: SearchHit[] = [];
  const all = (text: string) => words.every((w) => text.includes(w));
  // Synonyms count only after the words themselves: in a title through the
  // expanded query, in a text through the keywords of the index.
  const named = (text: string) => expanded.every((alternatives) => alternatives.some((t) => text.includes(t)));
  const loose = (text: string, keywords: string) => all(`${text} ${keywords}`);
  for (const page of index) {
    const base = { slug: page.slug, page: page.title, group: page.group };
    const head = fold(`${page.title} ${page.summary}`);
    const tags = fold((page.tags || []).join(" "));
    const body = fold(page.text);
    if (all(head) || named(fold(page.title)))
      hits.push({ ...base, href: `${prefix}/${page.slug}`, snippet: page.summary, score: all(fold(page.title)) ? 0 : all(head) ? 2 : 2.5 });
    else if (tags && (all(tags) || named(tags)))
      hits.push({ ...base, href: `${prefix}/${page.slug}`, snippet: page.summary, score: 1.5 });
    else if (all(body) || loose(`${head} ${body}`, page.keywords))
      hits.push({ ...base, href: `${prefix}/${page.slug}`, snippet: sentence(page.text, terms) ?? page.summary, score: all(body) ? 4 : 6 });
    for (const section of page.sections) {
      const heading = fold(`${section.text} ${section.parent ?? ""} ${page.title}`);
      const text = fold(`${section.text} ${section.body}`);
      const at = { ...base, href: `${prefix}/${page.slug}#${section.id}`, section: section.text, parent: section.parent };
      if (all(heading) || named(fold(section.text)))
        hits.push({ ...at, snippet: sentence(section.body, terms) ?? opening(section.body), score: all(fold(section.text)) ? 1 : all(heading) ? 3 : 3.5 });
      else if (all(text) || loose(text, section.keywords)) hits.push({ ...at, snippet: sentence(section.body, terms), score: all(text) ? 5 : 7 });
    }
  }
  return { results: hits.sort((a, b) => a.score - b.score).slice(0, limit), terms };
}

// Edit distance with swapped neighbours counting once ("kanbna" → "kanban").
export function editDistance(a: string, b: string, cap = 3): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let best = cap + 1;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      best = Math.min(best, d[i][j]);
    }
    if (best > cap) return cap + 1;
  }
  return d[a.length][b.length];
}

// The words of titles, headings and keywords – what a suggestion may offer.
const vocabularies = new WeakMap<SearchPage[], string[]>();
function vocabulary(index: SearchPage[]) {
  let words = vocabularies.get(index);
  if (!words) {
    const set = new Set<string>();
    const add = (text: string) => {
      for (const w of fold(text).split(/[^\p{L}\p{N}.-]+/u)) if (w.length >= 3 && !/^\d+$/.test(w)) set.add(w.replace(/^[.-]+|[.-]+$/g, ""));
    };
    for (const page of index) {
      add(page.title);
      add((page.tags || []).join(" "));
      for (const s of page.sections) add(s.text);
    }
    for (const group of SYNONYMS) for (const term of group) if (!term.includes(" ")) set.add(fold(term));
    set.delete("");
    words = [...set];
    vocabularies.set(index, words);
  }
  return words;
}

// For a query without results: up to three corrected queries that do find
// something ("kanbna" → "kanban", "pasword" → "password").
export function suggest(index: SearchPage[], query: string, max = 3): string[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const vocab = vocabulary(index);
  const options = words.map((w) => {
    if (w.length < 3 || searchDocs(index, w).results.length) return [w];
    const allowed = w.length <= 4 ? 1 : 2;
    return vocab
      .map((v) => ({ v, d: editDistance(w, v, allowed) }))
      .filter((x) => x.d <= allowed)
      .sort((a, b) => a.d - b.d || a.v.length - b.v.length)
      .slice(0, 4)
      .map((x) => x.v);
  });
  if (options.some((o) => !o.length)) return [];
  const out: string[] = [];
  // Combinations of the best candidates, first those closest to the query.
  const combine = (i: number, acc: string[]) => {
    if (out.length >= max) return;
    if (i === options.length) {
      const q = acc.join(" ");
      if (q !== words.join(" ") && !out.includes(q) && searchDocs(index, q).results.length) out.push(q);
      return;
    }
    for (const o of options[i]) combine(i + 1, [...acc, o]);
  };
  combine(0, []);
  return out;
}
