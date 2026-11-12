// Content building blocks of the Markdown pages, on top of GitHub Markdown
// (see "Building blocks" in the README):
//
//   > [!TIP]            callouts: NOTE, TIP, WARNING, IMPORTANT, CAUTION,
//   > Text …            ADMIN ("Nur Admin") and DESKTOP ("Nur Desktop")
//
//   ::: steps           a numbered list in the step style
//   1. …
//   :::
//
//   ::: tabs            tabs, one panel per "== Label" line; platform
//   == Web              labels (Web, Desktop, iPhone/iPad, Android) share
//   …                   the reader's choice across pages (public/tabs.js).
//   == Android          Without JavaScript every panel shows, each under
//   …                   its label as a heading.
//   :::
//
//   ++⌘ K++             a key combination: one <kbd> per key, keys split
//                       by spaces; "⌘/Strg" is one key with alternatives.
//
// Everything a writer types here is escaped; only the Markdown inside a
// container is rendered as Markdown.
import type { MarkedExtension, Tokens } from "marked";
import type { Locale } from "./i18n";

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// ---------------------------------------------------------------- callouts
export const CALLOUT_KINDS = ["NOTE", "TIP", "WARNING", "IMPORTANT", "CAUTION", "ADMIN", "DESKTOP"] as const;
export type CalloutKind = (typeof CALLOUT_KINDS)[number];
const calloutLabels: Record<Locale, Record<CalloutKind, string>> = {
  de: { NOTE: "Hinweis", TIP: "Tipp", WARNING: "Achtung", IMPORTANT: "Wichtig", CAUTION: "Vorsicht", ADMIN: "Nur Admin", DESKTOP: "Nur Desktop" },
  en: { NOTE: "Note", TIP: "Tip", WARNING: "Warning", IMPORTANT: "Important", CAUTION: "Caution", ADMIN: "Admin only", DESKTOP: "Desktop only" },
};
// Style of each kind: blue (note), green (tip), orange (warning), violet
// (who or where it applies).
const calloutStyle: Record<CalloutKind, string> = {
  NOTE: "note",
  IMPORTANT: "note",
  TIP: "tip",
  WARNING: "warning",
  CAUTION: "warning",
  ADMIN: "scope",
  DESKTOP: "scope",
};
const icon = (path: string) =>
  `<svg class="callout-icon" viewBox="0 0 256 256" width="16" height="16" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
// Phosphor icons (regular, MIT, the same set as @phosphor-icons/react), decorative.
const ICON_PATHS = {
  NOTE: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z",
  IMPORTANT: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z",
  TIP: "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Z",
  WARNING: "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z",
  ADMIN: "M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z",
  DESKTOP: "M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z",
};
const calloutIcons: Record<CalloutKind, string> = {
  NOTE: icon(ICON_PATHS.NOTE),
  IMPORTANT: icon(ICON_PATHS.IMPORTANT),
  TIP: icon(ICON_PATHS.TIP),
  WARNING: icon(ICON_PATHS.WARNING),
  CAUTION: icon(ICON_PATHS.WARNING),
  ADMIN: icon(ICON_PATHS.ADMIN),
  DESKTOP: icon(ICON_PATHS.DESKTOP),
};
const CALLOUT = new RegExp(`^<p>\\[!(${CALLOUT_KINDS.join("|")})\\]\\s*`);
// A rendered blockquote whose first line is "[!KIND]" becomes a callout;
// any other blockquote stays one.
export function calloutHtml(body: string, locale: Locale) {
  const match = body.match(CALLOUT);
  if (!match) return `<blockquote>${body}</blockquote>\n`;
  const kind = match[1] as CalloutKind;
  // "[!TIP]" alone in its paragraph, or followed by text in the same one.
  const rest = body.slice(match[0].length);
  const inner = rest.startsWith("</p>") ? rest.replace(/^<\/p>\s*/, "") : `<p>${rest}`;
  return `<div class="callout" role="note" data-kind="${calloutStyle[kind]}"><strong class="callout-label">${calloutIcons[kind]}${calloutLabels[locale][kind]}</strong>${inner}</div>\n`;
}

// ---------------------------------------------------------------- platforms
// The platform a tab label names, so a choice carries over to every tab
// group of the docs: "iPhone und iPad" and "iOS" are both "ios"; web, ios,
// android, desktop, or macos / windows / linux for one system alone.
export function platformKey(label: string) {
  const l = label.toLowerCase();
  if (/iphone|ipad|\bios\b/.test(l)) return "ios";
  if (/android/.test(l)) return "android";
  if (/desktop/.test(l)) return "desktop";
  if (/\bweb\b|browser/.test(l)) return "web";
  // One system names itself ("macOS"); several together are the desktop.
  const systems = [/\bmac(os)?\b/.test(l) && "macos", /windows/.test(l) && "windows", /linux/.test(l) && "linux"].filter(Boolean) as string[];
  if (systems.length) return systems.length > 1 ? "desktop" : systems[0];
  return (
    l
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "tab"
  );
}

// ---------------------------------------------------------------- keys
// "⌘ ⇧ K" → three keys; "⌘/Strg" → two alternatives in one place.
export function keysHtml(text: string) {
  const one = (key: string) => `<kbd>${esc(key)}</kbd>`;
  const keys = text
    .trim()
    .split(/\s+/)
    .map((key) => (key.length > 1 && /^[^/]+(\/[^/]+)+$/.test(key) ? key.split("/").map(one).join("/") : one(key)));
  return `<kbd class="keys">${keys.join("")}</kbd>`;
}

// ---------------------------------------------------------------- containers
type Container = { name: "steps" | "tabs"; body: string; raw: string };
const OPEN = /^ {0,3}(:{3,})[ \t]*(steps|tabs)[ \t]*(?:\n|$)/;
// "::: name" … ":::" with nesting; ":::" inside fenced code does not count.
// Unclosed containers are left to Markdown (they show as text).
export function readContainer(src: string): Container | undefined {
  const open = OPEN.exec(src);
  if (!open) return;
  let pos = open[0].length;
  let depth = 1;
  let fence: string | null = null;
  while (pos <= src.length) {
    const nl = src.indexOf("\n", pos);
    const end = nl < 0 ? src.length : nl;
    const line = src.slice(pos, end);
    const fenceMark = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      if (fenceMark && fenceMark[0] === fence[0] && fenceMark.length >= fence.length && !line.trim().slice(fenceMark.length).trim()) fence = null;
    } else if (fenceMark) fence = fenceMark;
    else if (/^ {0,3}:{3,}[ \t]*[a-z]/.test(line)) depth++;
    else if (/^ {0,3}:{3,}[ \t]*$/.test(line) && --depth === 0) {
      return { name: open[2] as Container["name"], body: src.slice(open[0].length, pos), raw: src.slice(0, nl < 0 ? end : end + 1) };
    }
    if (nl < 0) break;
    pos = nl + 1;
  }
  return;
}
// The panels of a tab container: "== Label" lines outside fenced code.
export function splitTabs(body: string) {
  const panels: { label: string; text: string }[] = [];
  let fence: string | null = null;
  for (const line of body.split("\n")) {
    const fenceMark = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      if (fenceMark && fenceMark[0] === fence[0] && fenceMark.length >= fence.length) fence = null;
    } else if (fenceMark) fence = fenceMark;
    const label = !fence && !fenceMark ? /^== +(\S.*?)\s*$/.exec(line)?.[1] : undefined;
    if (label) panels.push({ label, text: "" });
    else if (panels.length) panels[panels.length - 1].text += `${line}\n`;
  }
  return panels;
}

// State shared with the renderer in lib/docs.ts: the level of the last
// heading (tab titles sit one below it) and a counter for unique ids.
export type BlockState = { depth: number; tabs: number };

export function contentBlocks(state: BlockState): MarkedExtension {
  return {
    extensions: [
      {
        name: "container",
        level: "block",
        start: (src) => src.match(/^ {0,3}:{3,}[ \t]*(?:steps|tabs)/m)?.index,
        tokenizer(src) {
          const c = readContainer(src);
          if (!c) return;
          if (c.name === "steps") return { type: "container", raw: c.raw, kind: "steps", tokens: this.lexer.blockTokens(c.body, []) };
          const panels = splitTabs(c.body).map((p) => ({ label: p.label, tokens: this.lexer.blockTokens(p.text, []) }));
          if (!panels.length) return;
          return { type: "container", raw: c.raw, kind: "tabs", panels, tokens: panels.flatMap((p) => p.tokens) };
        },
        renderer(token) {
          if (token.kind === "steps") return `<div class="steps">${this.parser.parse(token.tokens ?? [])}</div>\n`;
          const id = `tabs-${++state.tabs}`;
          const level = Math.min(state.depth + 1, 6);
          const used = new Set<string>();
          const panels = (token.panels as { label: string; tokens: Tokens.Generic[] }[]).map((p) => {
            let key = platformKey(p.label);
            for (let n = 2; used.has(key); n++) key = `${platformKey(p.label)}-${n}`;
            used.add(key);
            return `<section class="tab-panel" id="${id}-${key}" data-tab="${key}"><div class="tab-title" role="heading" aria-level="${level}">${esc(p.label)}</div>${this.parser.parse(p.tokens)}</section>`;
          });
          return `<div class="tabs" data-tabs id="${id}">${panels.join("")}</div>\n`;
        },
      },
      {
        name: "keys",
        level: "inline",
        start: (src) => {
          const i = src.indexOf("++");
          return i < 0 ? undefined : i;
        },
        tokenizer(src) {
          // "++⌘ +++" is ⌘ and +: the closing "++" is the last of a run.
          const m = /^\+\+([^\s+](?:[^\n]{0,38}?[^\s])?)\+\+(?!\+)/.exec(src);
          if (!m || m[1].includes("++")) return;
          return { type: "keys", raw: m[0], text: m[1] };
        },
        renderer: (token) => keysHtml(token.text),
      },
    ],
  };
}
