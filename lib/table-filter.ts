// Matching for the filter field of the reference pages
// (components/docs/table-filter.tsx): case, umlauts and accents do not
// matter, and the names of the modifier keys are one key each – "strg l"
// finds ⌘ L, "alt" finds ⌥, "shift" finds ⇧.
const KEYS: [RegExp, string][] = [
  [/⌘|\bcmd\b|\bcommand\b|\bstrg\b|\bctrl\b|\bmod\b|\bcontrol\b/g, " mod "],
  [/⌥|\boption\b|\bopt\b|\balt\b/g, " alt "],
  [/⇧|\bshift\b|\bumschalt\b/g, " shift "],
  [/↵|\benter\b|\breturn\b|\beingabe\b/g, " enter "],
];
export function normalizeFilter(text: string) {
  let out = text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  for (const [re, to] of KEYS) out = out.replace(re, to);
  return out.replace(/\s+/g, " ").trim();
}
// The words of a query, at most ten.
export const filterWords = (query: string) => normalizeFilter(query).split(" ").filter(Boolean).slice(0, 10);
// Every word appears in the row; a single character ("l" in "strg l") only
// as a key or word of its own, not inside other words.
export function rowMatches(text: string, words: string[]) {
  if (!words.length) return true;
  const row = normalizeFilter(text);
  let tokens: Set<string> | undefined;
  return words.every((w) => {
    if (w.length > 1) return row.includes(w);
    tokens ??= new Set(row.split(/[\s,;:()"'„“/–-]+/));
    return tokens.has(w);
  });
}
