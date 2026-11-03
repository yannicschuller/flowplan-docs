// Documentation under /docs: Markdown files in content/docs, rendered on the
// server. The order and grouping of the pages lives here; each file starts
// with "# Title" and a one-line summary as its first paragraph.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { Marked, type Tokens } from "marked";
import { releases } from "./changelog";
import { FACTS, fillFacts } from "./facts";
import type { Locale } from "./i18n";
import { synonymKeywords } from "./search";
import { DISCORD_URL, GITHUB_URL, websiteUrl } from "./links";

export type DocGroup = { title: string; intro: string; pages: { slug: string; title: string }[] };

// The languages of Flowplan's interface, in both languages of the docs; the
// llms.txt blurb and the overview are written from this list.
export const INTERFACE_LANGUAGES: Record<Locale, string[]> = {
  de: ["Deutsch", "Englisch", "Französisch", "vereinfachtes Chinesisch"],
  en: ["German", "English", "French", "Simplified Chinese"],
};
// "Deutsch, Englisch, Französisch und vereinfachtes Chinesisch" / "German, English, French and Simplified Chinese".
export const languageList = (locale: Locale) => {
  const names = INTERFACE_LANGUAGES[locale];
  return `${names.slice(0, -1).join(", ")} ${locale === "de" ? "und" : "and"} ${names[names.length - 1]}`;
};

// Page order, groups and titles in both languages, with one line under each
// group on the overview. English pages live in content/docs/en with the same
// file name; a missing one falls back to German.
const groups: {
  title: [de: string, en: string];
  intro: [de: string, en: string];
  pages: [slug: string, de: string, en: string][];
}[] = [
  {
    title: ["Einstieg", "Getting started"],
    intro: [
      "Konto, erster Arbeitsbereich, Seitenbaum, Mitglieder und Rechte.",
      "Account, first workspace, page tree, members and permissions.",
    ],
    pages: [
      ["first-steps", "Erste Schritte", "First steps"],
      ["pages-and-spaces", "Seiten und Bereiche", "Pages and spaces"],
      ["workspaces-and-permissions", "Arbeitsbereiche, Mitglieder und Rechte", "Workspaces, members and permissions"],
      ["encrypted-spaces", "Verschlüsselte Bereiche", "Encrypted spaces"],
      [
        "migrate",
        "Umzug von Notion, AppFlowy, AFFiNE, Obsidian, Confluence, Evernote und Google Docs",
        "Moving from Notion, AppFlowy, AFFiNE, Obsidian, Confluence, Evernote and Google Docs",
      ],
      ["keyboard-shortcuts", "Tastenkürzel", "Keyboard shortcuts"],
      ["languages", "Sprachen und Übersetzungen", "Languages and translations"],
    ],
  },
  {
    title: ["Inhalte", "Content"],
    intro: ["Schreiben, zeichnen, Tag für Tag festhalten.", "Write, draw, keep a record day by day."],
    pages: [
      ["documents", "Dokumente und Editor", "Documents and the editor"],
      ["whiteboards", "Whiteboards", "Whiteboards"],
      ["notebooks", "Notizbücher und Handschrift", "Notebooks and handwriting"],
      ["dashboards", "Dashboards", "Dashboards"],
      ["journal", "Journal", "Journal"],
      ["templates", "Vorlagen", "Templates"],
      ["import-export-versions", "Import, Export und Versionen", "Import, export and versions"],
    ],
  },
  {
    title: ["Datenbanken und Projekte", "Databases and projects"],
    intro: [
      "Tabellen, Ansichten, Formeln, Formulare und Projektarbeit.",
      "Tables, views, formulas, forms and project work.",
    ],
    pages: [
      ["databases", "Datenbanken", "Databases"],
      ["views", "Ansichten", "Views"],
      ["contacts", "Kontakte", "Contacts"],
      ["properties-and-formulas", "Eigenschaften, Formeln und Rollups", "Properties, formulas and rollups"],
      ["forms", "Formulare", "Forms"],
      ["projects-and-tickets", "Projekte, Tickets und Sprints", "Projects, tickets and sprints"],
    ],
  },
  {
    title: ["Zusammenarbeit und Teilen", "Collaboration and sharing"],
    intro: [
      "Gemeinsam arbeiten, veröffentlichen, finden – auch offline und in den Apps.",
      "Work together, publish, find things – offline and in the apps too.",
    ],
    pages: [
      ["collaboration", "Zusammenarbeit und Kommentare", "Collaboration and comments"],
      ["sharing", "Teilen und Veröffentlichen", "Sharing and publishing"],
      ["search-and-notifications", "Suche, Posteingang und Push", "Search, inbox and push"],
      ["offline-and-apps", "Offline, Web-App und Desktop", "Offline, web app and desktop"],
      ["desktop-capture", "Schnell erfassen (Desktop)", "Quick capture (desktop)"],
    ],
  },
  {
    title: ["Erweiterungen", "Extensions"],
    intro: [
      "API, Webhooks, KI, MCP, eigene Blöcke und die Browser-Erweiterung.",
      "API, webhooks, AI, MCP, custom blocks and the browser extension.",
    ],
    pages: [
      ["api-and-webhooks", "API und Webhooks", "API and webhooks"],
      ["ai", "KI", "AI"],
      ["mcp", "MCP: KI-Assistenten", "MCP: AI assistants"],
      ["browser-extension", "Browser-Erweiterung", "Browser extension"],
      ["plugins", "Block-Erweiterungen", "Block extensions"],
    ],
  },
  {
    title: ["Selbst hosten", "Self-hosting"],
    intro: [
      "Flowplan auf dem eigenen Server: Docker, Anmeldung, Speicher, Sicherung und Betrieb.",
      "Flowplan on your own server: Docker, sign-in, storage, backups and operations.",
    ],
    pages: [
      ["installation", "Installation mit Docker", "Installation with Docker"],
      ["administration", "Administration der Instanz", "Administering the instance"],
      ["sign-in", "Anmeldung: Passwort, Passkeys und OIDC", "Sign-in: password, passkeys and OIDC"],
      ["configuration", "Konfiguration", "Configuration"],
      ["storage-and-backups", "Speicher, S3 und Sicherung", "Storage, S3 and backups"],
      ["move-instance", "Instanz umziehen", "Moving an instance"],
      ["coolify-and-proxy", "Coolify und Reverse Proxy", "Coolify and reverse proxies"],
      ["operations", "Betrieb und Fehlersuche", "Operations and troubleshooting"],
    ],
  },
];
const pick = (locale: Locale, [de, en]: [string, string]) => (locale === "en" ? en : de);
export function docGroups(locale: Locale = "de"): DocGroup[] {
  return groups.map((g) => ({
    title: pick(locale, g.title),
    intro: pick(locale, g.intro),
    pages: g.pages.map(([slug, de, en]) => ({ slug, title: pick(locale, [de, en]) })),
  }));
}
export const docSlugs = groups.flatMap((g) => g.pages.map(([slug]) => slug));

export type TocEntry = { id: string; text: string; depth: number };
export type Doc = {
  slug: string;
  title: string;
  summary: string;
  leadHtml: string;
  group: string;
  html: string;
  toc: TocEntry[];
  // False on an English address whose page exists only in German yet.
  translated: boolean;
  // The Markdown file, relative to the repository (content/docs/en/….md).
  source: string;
  // Date of the last commit that touched the file (content/last-modified.json,
  // written before the build); undefined without it.
  modified?: string;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
};
// Where a page's Markdown can be edited.
export const editUrl = (source: string) => `https://github.com/yannicschuller/flowplan-docs/edit/main/${source}`;

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
// Text of rendered HTML; &amp; last, so "&amp;lt;" stays the text "&lt;".
export const plain = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const callouts: Record<Locale, Record<string, string>> = {
  de: { NOTE: "Hinweis", TIP: "Tipp", WARNING: "Achtung" },
  en: { NOTE: "Note", TIP: "Tip", WARNING: "Warning" },
};
const newTab: Record<Locale, string> = { de: "öffnet in neuem Tab", en: "opens in a new tab" };
// flowplan.org and its subdomains (the website, the app, these docs).
export function ownSite(href: string) {
  try {
    return /(^|\.)flowplan\.org$/.test(new URL(href).hostname);
  } catch {
    return false;
  }
}

// Width and height of a WebP or PNG in public/ (screenshots), so the page
// keeps its place for an image while it loads; undefined if unreadable.
const imageSizes = new Map<string, { width: number; height: number } | undefined>();
export function imageSize(src: string) {
  if (imageSizes.has(src)) return imageSizes.get(src);
  let size: { width: number; height: number } | undefined;
  try {
    if (!/^\/[\w/.-]+$/.test(src) || src.includes("..")) throw new Error("not a local image");
    const b = readFileSync(join(process.cwd(), "public", src));
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const kind = b.toString("ascii", 12, 16);
      if (kind === "VP8X") size = { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      else if (kind === "VP8 ") size = { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      else if (kind === "VP8L") {
        const bits = b.readUInt32LE(21);
        size = { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
      }
    } else if (b.readUInt32BE(0) === 0x89504e47) size = { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  } catch {
    size = undefined;
  }
  imageSizes.set(src, size);
  return size;
}

function render(markdown: string, locale: Locale) {
  const toc: TocEntry[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = headingId(inner) || (locale === "en" ? "section" : "abschnitt");
        for (let n = 2; used.has(id); n++) id = `${headingId(inner)}-${n}`;
        used.add(id);
        if (depth === 2 || depth === 3) toc.push({ id, text: plain(inner), depth });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        // Links to other sites open in a new tab and say so for screen
        // readers; Flowplan's own sites open like internal links.
        const external = /^https?:\/\//.test(href) && !ownSite(href);
        return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ""}${
          external ? ' target="_blank" rel="noreferrer"' : ""
        }>${inner}${external ? `<span class="sr-only"> (${newTab[locale]})</span>` : ""}</a>`;
      },
      code({ text, lang }: Tokens.Code) {
        const language = (lang || "").split(/\s/)[0];
        // Scrollable regions take keyboard focus, so long lines can be
        // scrolled without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
        return `<div class="code" data-lang="${escape(language)}"><pre tabindex="0"><code>${escape(text)}</code></pre></div>\n`;
      },
      // Screenshots: ![what it shows](/screenshots/name.webp "caption"). A
      // paragraph of just an image becomes a figure with the caption below.
      image({ href, title, text }: Tokens.Image) {
        const size = imageSize(href);
        return `<img src="${escape(href)}" alt="${escape(text)}"${size ? ` width="${size.width}" height="${size.height}"` : ""} loading="lazy" decoding="async">`;
      },
      paragraph({ tokens }: Tokens.Paragraph) {
        const only = tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (only.length === 1 && only[0].type === "image") {
          const image = only[0] as Tokens.Image;
          const caption = image.title ? `<figcaption>${escape(image.title)}</figcaption>` : "";
          return `<figure class="shot">${this.parser.parseInline([image])}${caption}</figure>\n`;
        }
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
      },
      blockquote({ tokens }: Tokens.Blockquote) {
        let body = this.parser.parse(tokens);
        const match = body.match(/^<p>\[!(NOTE|TIP|WARNING)\]\s*/);
        if (!match) return `<blockquote>${body}</blockquote>\n`;
        body = body.replace(match[0], "<p>");
        const kind = match[1];
        return `<aside class="callout" data-kind="${kind.toLowerCase()}"><strong class="callout-label">${callouts[locale][kind]}</strong>${body}</aside>\n`;
      },
      table(token: Tokens.Table) {
        const head = token.header
          .map((cell) => `<th${cell.align ? ` style="text-align:${cell.align}"` : ""}>${this.parser.parseInline(cell.tokens)}</th>`)
          .join("");
        const rows = token.rows
          .map(
            (row) =>
              `<tr>${row
                .map((cell) => `<td${cell.align ? ` style="text-align:${cell.align}"` : ""}>${this.parser.parseInline(cell.tokens)}</td>`)
                .join("")}</tr>`,
          )
          .join("");
        return `<div class="table" tabindex="0"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(markdown, { async: false }) as string;
  return { html, toc };
}

const directory = () => join(process.cwd(), "content", "docs");
const fileOf = (slug: string, locale: Locale) => {
  const english = join(directory(), "en", `${slug}.md`);
  return locale === "en" && existsSync(english) ? english : join(directory(), `${slug}.md`);
};

// The Markdown file of a page (English falls back to German).
export const docSource = (slug: string, locale: Locale) => fileOf(slug, locale);
// The same, relative to the repository: content/docs/en/first-steps.md.
const sourceOf = (slug: string, locale: Locale) => relative(process.cwd(), fileOf(slug, locale)).split("\\").join("/");
// Date of the last commit that touched a page's file, if known.
export const docModified = (slug: string, locale: Locale) => lastModified(sourceOf(slug, locale));

// Last commit dates per file, written by scripts/last-modified.mjs before
// the build: { "content/docs/first-steps.md": "2026-10-16T21:33:33+00:00" }.
// Without the file (development, shallow clone) no dates are shown.
let modifiedDates: Record<string, string> | undefined;
export function lastModified(source: string): string | undefined {
  if (!modifiedDates) {
    try {
      modifiedDates = JSON.parse(readFileSync(join(process.cwd(), "content", "last-modified.json"), "utf8"));
    } catch {
      modifiedDates = {};
    }
  }
  return modifiedDates![source];
}

// A page's Markdown with the counts filled in (see lib/facts.ts).
export const docMarkdown = (slug: string, locale: Locale) => fillFacts(readFileSync(fileOf(slug, locale), "utf8"), locale);

function read(slug: string, locale: Locale) {
  const text = docMarkdown(slug, locale);
  const title = text.match(/^# (.+)$/m)?.[1]?.trim() || slug;
  const rest = text.replace(/^[\s\S]*?^# .+\n+/m, "");
  // The first paragraph is the lead, the rest the article.
  const cut = rest.search(/\n\s*\n/);
  const lead = (cut < 0 ? rest : rest.slice(0, cut)).replace(/\s+/g, " ").trim();
  return { title, lead, body: cut < 0 ? "" : rest.slice(cut), source: sourceOf(slug, locale) };
}

export function loadDoc(slug: string, locale: Locale = "de"): Doc | null {
  if (!docSlugs.includes(slug)) return null;
  const { title, lead, body, source } = read(slug, locale);
  const { html, toc } = render(body, locale);
  const leadHtml = new Marked({ gfm: true }).parseInline(lead, { async: false }) as string;
  const all = docGroups(locale);
  const pages = all.flatMap((g) => g.pages);
  const index = docSlugs.indexOf(slug);
  return {
    slug,
    title,
    summary: plain(leadHtml),
    leadHtml,
    group: all.find((g) => g.pages.some((p) => p.slug === slug))?.title || "",
    html,
    toc,
    translated: locale === "de" || source.startsWith("content/docs/en/"),
    source,
    modified: lastModified(source),
    prev: index > 0 ? pages[index - 1] : undefined,
    next: pages[index + 1],
  };
}

// Plain text of a rendered part; block ends become spaces so table cells
// and list items do not run together.
const blockText = (html: string) =>
  plain(html.replace(/<\/(p|li|td|th|tr|h\d|div|pre|aside|blockquote)>/g, " $&"))
    .replace(/\s+/g, " ")
    .trim();

// The "What's new" page (app/(docs)/whats-new): its address and title.
export const WHATS_NEW = { slug: "whats-new", title: ["Was ist neu", "What's new"] as [string, string] };
export const whatsNewTitle = (locale: Locale) => pick(locale, WHATS_NEW.title);

// Search index: every page with its sections and their plain text, so the
// search box also finds words that only appear in the body. "keywords" holds
// the synonyms of terms in the text (lib/search.ts), so "login" finds a
// section about the Anmeldung and "S3" one about Speicher.
export function docSearchIndex(locale: Locale = "de") {
  const pages = docSlugs.map((slug) => {
    const doc = loadDoc(slug, locale)!;
    const parts = doc.html.split(/(?=<h[23] id=")/);
    const intro = parts[0].startsWith("<h") ? "" : parts.shift()!;
    const text = blockText(intro);
    return {
      slug,
      title: doc.title,
      group: doc.group,
      summary: doc.summary,
      text,
      keywords: synonymKeywords(`${doc.title} ${doc.summary} ${text}`),
      sections: parts.map((part) => {
        const id = part.match(/^<h[23] id="([^"]+)"/)![1];
        const heading = plain(part.slice(0, part.indexOf("</h")).replace(/<a class="anchor"[^>]*>#<\/a>/, ""));
        const body = blockText(part.slice(part.indexOf("</h") + 5));
        return { id, text: heading.trim(), body, keywords: synonymKeywords(`${heading} ${body}`) };
      }),
    };
  });
  // Releases are searchable too ("v0.5", "passkeys" in a release note).
  const title = whatsNewTitle(locale);
  const summary =
    locale === "en" ? "The changes in every release of Flowplan, newest first." : "Die Änderungen jeder Flowplan-Version, die neueste zuerst.";
  pages.push({
    slug: WHATS_NEW.slug,
    title,
    group: title,
    summary,
    text: "",
    keywords: synonymKeywords(`${title} ${summary}`),
    sections: releases().map((r) => {
      const body = r.entries.map((e) => e.text).join(" ");
      return { id: r.id, text: `${r.version} – ${r.date}`, body, keywords: synonymKeywords(body) };
    }),
  });
  return pages;
}
export type DocSearchEntry = ReturnType<typeof docSearchIndex>[number];

// A short fingerprint of all Markdown files: the browser fetches the search
// index as /api/search-index/<locale>?v=<version>, so the address changes
// whenever the content does and the response can be cached for a long time.
let indexVersion: string | undefined;
export function searchIndexVersion() {
  if (!indexVersion) {
    const hash = createHash("sha1");
    for (const slug of docSlugs) for (const locale of ["de", "en"] as const) hash.update(readFileSync(fileOf(slug, locale)));
    hash.update(JSON.stringify(FACTS));
    hash.update(JSON.stringify(releases()));
    indexVersion = hash.digest("hex").slice(0, 12);
  }
  return indexVersion;
}

// llms.txt (https://llmstxt.org): what Flowplan is and where each page's
// Markdown lives; llms-full.txt has all pages in one file.
export function llmsIndex(base: string, locale: Locale) {
  const de = locale === "de";
  const lines = [
    de ? "# Flowplan-Dokumentation" : "# Flowplan documentation",
    "",
    de
      ? `> Flowplan ist ein Open-Source-Arbeitsbereich (AGPL-3.0) für Dokumente, Datenbanken (Tabelle, Board, Kalender, Zeitleiste, Galerie, Liste, Feed, Diagramm, Formular), Whiteboards und ein tägliches Journal. Gehostet in Deutschland auf app.flowplan.org oder selbst gehostet als ein Docker-Container (Next.js, SQLite). Oberfläche auf ${languageList("de")}. KI ist optional und standardmäßig aus – auch komplett lokal mit Ollama.`
      : `> Flowplan is an open-source workspace (AGPL-3.0) for documents, databases (table, board, calendar, timeline, gallery, list, feed, chart, form), whiteboards and a daily journal. Hosted in Germany at app.flowplan.org or self-hosted as one Docker container (Next.js, SQLite). Interface in ${languageList("en")}. AI is optional and off by default – also completely local with Ollama.`,
    "",
    de
      ? "Jede Seite gibt es als Markdown unter der verlinkten Adresse; die englische Fassung unter /en/…md."
      : "Every page is available as Markdown at the linked address; the German version is under /de/…md.",
    "",
  ];
  for (const group of docGroups(locale)) {
    lines.push(`## ${group.title}`, "");
    for (const page of group.pages) {
      const doc = loadDoc(page.slug, locale)!;
      lines.push(`- [${doc.title}](${base}/${locale}/${page.slug}.md): ${doc.summary}`);
    }
    lines.push("");
  }
  lines.push(
    "## Optional",
    "",
    `- [${de ? "Alle Seiten in einer Datei" : "All pages in one file"}](${base}${de ? "/de" : ""}/llms-full.txt)`,
    `- [${de ? "Quellcode auf GitHub" : "Source code on GitHub"}](${GITHUB_URL})`,
    `- [${de ? "Community auf Discord" : "Community on Discord"}](${DISCORD_URL})`,
    `- [Website](${websiteUrl()})`,
    "",
  );
  return lines.join("\n");
}
export function llmsFull(base: string, locale: Locale) {
  return docSlugs
    .map((slug) => {
      const text = docMarkdown(slug, locale).trim();
      return `<!-- ${base}/${locale}/${slug} -->\n\n${text}`;
    })
    .join("\n\n---\n\n");
}
