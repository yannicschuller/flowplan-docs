// Counts about Flowplan that the pages state – views, property types,
// question types, languages, templates. They come from the app's facts.json
// (counted there from the code); scripts/app-files.mjs copies it into
// content/facts.json before every build, the committed copy is the fallback.
//
// In Markdown: {{facts.templates}} writes "26", {{facts.views|word}} writes
// "zehn" / "ten" (small numbers as words, larger ones as digits).
import data from "../content/facts.json" with { type: "json" };
import type { Locale } from "./i18n";

export type Facts = {
  views: number;
  fieldTypes: number;
  questionTypes: number;
  languages: number;
  templates: number;
  templateCategories: number;
};
export const FACTS: Readonly<Facts> = data;

const WORDS: Record<Locale, string[]> = {
  de: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"],
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
};
export const numberWord = (n: number, locale: Locale) => WORDS[locale][n] ?? String(n);

// Replaces the placeholders; an unknown name is an error (the tests render
// every page), not a silent "undefined" on the site.
export function fillFacts(text: string, locale: Locale, facts: Readonly<Facts> = FACTS) {
  return text.replace(/\{\{\s*facts\.([a-zA-Z]+)(\|word)?\s*\}\}/g, (match, key: string, word?: string) => {
    if (!Object.hasOwn(facts, key)) throw new Error(`Unknown fact in ${match}`);
    const n = facts[key as keyof Facts];
    return word ? numberWord(n, locale) : String(n);
  });
}
