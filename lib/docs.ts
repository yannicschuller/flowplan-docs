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
import { docsIssueUrl } from "./issue-url";
import { synonymKeywords } from "./search";
import type { AnchorMap } from "./anchors";
import { appUrl, DISCORD_URL, GITHUB_URL, marketplaceUrl, MARKETPLACE_DEFAULT, websiteUrl } from "./links";
import { outboundTarget } from "./track";
import { envRows, fillReference, hasReference, REFERENCE, type EnvRow } from "./reference";
import { calloutHtml, contentBlocks, type BlockState } from "./markdown-blocks";

export type DocGroup = { title: string; intro: string; area: AreaId; pages: { slug: string; title: string }[] };
export type AreaId = "use" | "extend" | "run";
export type DocArea = { id: AreaId; title: string; short: string; intro: string; groups: DocGroup[] };

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

type Pair = [de: string, en: string];
// Three areas – using Flowplan, extending it, running it – with groups of
// pages, each with one line on the overview. A page's title is the "# Title"
// of its Markdown file. English pages live in content/docs/en with the same
// file name; a missing one falls back to German.
const areas: { id: AreaId; title: Pair; short: Pair; intro: Pair; groups: { title: Pair; intro: Pair; pages: string[] }[] }[] = [
  {
    id: "use",
    title: ["Benutzen", "Using Flowplan"],
    short: ["Benutzen", "Using"],
    intro: ["Schreiben, planen, zeichnen und gemeinsam arbeiten – im Browser und in den Apps.", "Write, plan, draw and work together – in the browser and in the apps."],
    groups: [
      {
        title: ["Einstieg", "Getting started"],
        intro: ["Konto, erster Arbeitsbereich, Seitenbaum, Mitglieder und Rechte.", "Account, first workspace, page tree, members and permissions."],
        pages: ["first-steps", "pages-and-spaces", "page-tags", "workspaces-and-permissions", "workspace-appearance", "encrypted-spaces", "languages"],
      },
      {
        title: ["Umzug, Import und Export", "Moving, import and export"],
        intro: ["Von Notion, AFFiNE, Obsidian und anderen umziehen, importieren, exportieren, drucken.", "Move from Notion, AFFiNE, Obsidian and others, import, export, print."],
        pages: ["migrate", "migrate-affine", "migrate-office", "migrate-notes", "import-export-versions", "export", "print-and-pdf"],
      },
      {
        title: ["Dokumente", "Documents"],
        intro: ["Der Editor: Blöcke, Markdown, Formatierung, Aufgaben, Medien und Links.", "The editor: blocks, Markdown, formatting, tasks, media and links."],
        pages: ["documents", "blocks", "markdown-editor", "formatting", "tasks-in-documents", "media-and-files", "links-and-mentions"],
      },
      {
        title: ["Formeln, Zitate und Präsentieren", "Formulas, citations and presenting"],
        intro: ["Formeln, Diagramme und Code, wissenschaftliches Schreiben, Lesen und Präsentieren.", "Formulas, diagrams and code, academic writing, reading and presenting."],
        pages: ["math-and-code", "academic-writing", "reading-and-presenting"],
      },
      {
        title: ["Whiteboards und Dashboards", "Whiteboards and dashboards"],
        intro: ["Zeichnen, Diagramme, gemeinsam am Board, Racks und Dashboards.", "Drawing, diagrams, working together on a board, racks and dashboards."],
        pages: ["whiteboards", "whiteboard-diagrams", "whiteboard-collaboration", "whiteboard-racks", "dashboards"],
      },
      {
        title: ["Notizbücher und Journal", "Notebooks and journal"],
        intro: ["Handschrift mit Stift und der Tag im Rückblick.", "Handwriting with a pen and the day in review."],
        pages: ["notebooks", "notebook-tools", "journal", "journal-review"],
      },
      {
        title: ["Datenbanken", "Databases"],
        intro: ["Tabellen, Eigenschaften, Ansichten, Formeln, Formulare und Kontakte.", "Tables, properties, views, formulas, forms and contacts."],
        pages: ["databases", "database-properties", "views", "properties-and-formulas", "forms", "contacts"],
      },
      {
        title: ["Projekte und Automatisierung", "Projects and automation"],
        intro: ["Tickets, Sprints, Git, Workflows und Vorlagen.", "Tickets, sprints, Git, workflows and templates."],
        pages: ["projects-and-tickets", "git-and-issues", "workflows", "templates", "marketplace"],
      },
      {
        title: ["Zusammenarbeit und Suche", "Collaboration and search"],
        intro: ["Gemeinsam arbeiten, teilen, finden und benachrichtigt werden.", "Work together, share, find things and get notified."],
        pages: ["collaboration", "sharing", "search-and-notifications", "notifications"],
      },
      {
        title: ["Apps und Geräte", "Apps and devices"],
        intro: ["Offline, Desktop-App, Apps für iPhone, iPad und Android, Browser-Erweiterung.", "Offline, desktop app, apps for iPhone, iPad and Android, browser extension."],
        pages: ["offline-and-apps", "desktop-app", "mobile-apps", "mobile-widgets", "mobile-capture", "desktop-capture", "browser-extension"],
      },
      {
        title: ["Nachschlagen", "Reference"],
        intro: ["Alle Tastenkürzel, Befehle im Blockmenü und Workflow-Knoten, zum Filtern.", "Every keyboard shortcut, block menu command and workflow node, to filter."],
        pages: ["keyboard-shortcuts", "slash-commands", "workflow-nodes"],
      },
      {
        title: ["KI", "AI"],
        intro: ["Optionale KI – lokal oder mit eigenem Schlüssel: schreiben, fragen, Besprechungen.", "Optional AI – local or with your own key: writing, asking, meetings."],
        pages: ["ai", "ai-writing", "ask-ai", "ai-actions", "meetings"],
      },
    ],
  },
  {
    id: "extend",
    title: ["Erweitern", "Extending"],
    short: ["Erweitern", "Extending"],
    intro: ["Flowplan mit anderen Diensten verbinden und um eigene Blöcke erweitern.", "Connect Flowplan to other services and add your own blocks."],
    groups: [
      {
        title: ["API und Integrationen", "API and integrations"],
        intro: ["API, Webhooks, SDKs, E-Mail-Eingang, Chat, MCP und Block-Erweiterungen.", "API, webhooks, SDKs, inbound e-mail, chat, MCP and block extensions."],
        pages: ["api-and-webhooks", "openapi", "inbound-email", "chat-notifications", "mcp", "plugins"],
      },
    ],
  },
  {
    id: "run",
    title: ["Betreiben", "Running Flowplan"],
    short: ["Betreiben", "Running"],
    intro: ["Flowplan auf dem eigenen Server: installieren, anmelden, konfigurieren, sichern, überwachen, skalieren.", "Flowplan on your own server: install, sign-in, configure, back up, monitor, scale."],
    groups: [
      {
        title: ["Installieren und umziehen", "Installing and moving"],
        intro: ["Docker, ein Klick, Reverse Proxy und der Umzug auf einen neuen Server.", "Docker, one click, reverse proxies and moving to a new server."],
        pages: ["installation", "one-click-deploy", "coolify-and-proxy", "move-instance", "move-instance-tool"],
      },
      {
        title: ["Anmeldung und Administration", "Sign-in and administration"],
        intro: ["Die Administration der Instanz, Benutzer, Passwort, Passkeys, SSO, SCIM und LDAP.", "Administering the instance, users, password, passkeys, SSO, SCIM and LDAP."],
        pages: ["administration", "user-management", "sign-in", "sessions", "sso-oidc", "scim-and-ldap"],
      },
      {
        title: ["Konfiguration", "Configuration"],
        intro: ["Alle Umgebungsvariablen, nach Thema.", "Every environment variable, by topic."],
        pages: ["configuration", "configuration-storage", "configuration-integrations", "configuration-ai-push", "environment-variables"],
      },
      {
        title: ["Speicher und Betrieb", "Storage and operations"],
        intro: ["S3, Sicherungen, Verschlüsselung, Überwachung und Fehlersuche.", "S3, backups, encryption, monitoring and troubleshooting."],
        pages: ["storage-and-backups", "storage-encryption", "markdown-git-export", "operations", "monitoring", "security-monitoring"],
      },
      {
        title: ["Skalieren", "Scaling"],
        intro: [
          "PostgreSQL statt SQLite, der Wechsel zwischen beiden, mehrere Instanzen und die passende Größe.",
          "PostgreSQL instead of SQLite, switching between them, several instances and the right size.",
        ],
        pages: ["postgresql", "database-migration", "cluster", "sizing"],
      },
    ],
  },
];
const pick = (locale: Locale, [de, en]: [string, string]) => (locale === "en" ? en : de);
export const docSlugs = areas.flatMap((a) => a.groups.flatMap((g) => g.pages));
export function docAreas(locale: Locale = "de"): DocArea[] {
  return areas.map((a) => ({
    id: a.id,
    title: pick(locale, a.title),
    short: pick(locale, a.short),
    intro: pick(locale, a.intro),
    groups: a.groups.map((g) => ({
      title: pick(locale, g.title),
      intro: pick(locale, g.intro),
      area: a.id,
      pages: g.pages.map((slug) => ({ slug, title: docTitle(slug, locale) })),
    })),
  }));
}
export function docGroups(locale: Locale = "de"): DocGroup[] {
  return docAreas(locale).flatMap((a) => a.groups);
}
// The area a page belongs to.
export const docArea = (slug: string): AreaId | undefined => areas.find((a) => a.groups.some((g) => g.pages.includes(slug)))?.id;
// The pages of a page's area in sidebar order: "Previous" and "Next" stay
// within it, so the last page of "Using" does not lead on to "Extending".
export function areaPages(slug: string) {
  const area = areas.find((a) => a.groups.some((g) => g.pages.includes(slug)));
  return area ? area.groups.flatMap((g) => g.pages) : [];
}
export function neighbours(slug: string) {
  const pages = areaPages(slug);
  const i = pages.indexOf(slug);
  return { prev: i > 0 ? pages[i - 1] : undefined, next: i >= 0 ? pages[i + 1] : undefined };
}

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
  // Up to four pages on the same subject (relatedPages).
  related: { slug: string; title: string }[];
  // Minutes to read the lead and the article (readingMinutes).
  minutes: number;
  // Sections marked new in the front matter, newest first, while recent.
  fresh: { id: string; date: string }[];
  // The page's tables get a filter field (front matter "filter: true",
  // and every page with a {{reference:…}} table).
  filter: boolean;
};
// Where a page's Markdown can be edited.
export const editUrl = (source: string) => `https://github.com/yannicschuller/flowplan-docs/edit/main/${source}`;
// "War das hilfreich? Nein": the "Documentation" issue form of the flowplan
// repository (lib/issue-url.ts) with the page filled in.
export const feedbackUrl = (page: { title: string; url: string }, locale: Locale) =>
  docsIssueUrl({
    title: locale === "de" ? `Doku: „${page.title}“ hat nicht geholfen` : `Docs: “${page.title}” didn't help`,
    page: page.url,
  });

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

const newTab: Record<Locale, string> = { de: "öffnet in neuem Tab", en: "opens in a new tab" };
const fullSize: Record<Locale, string> = { de: "in voller Größe öffnen", en: "open in full size" };
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

// "/screenshots/x-light.webp" → "/screenshots/x-dark.webp" if that exists.
export function darkVariant(src: string) {
  if (!/^\/[\w/.-]+-light\.(webp|avif|png)$/.test(src) || src.includes("..")) return undefined;
  const dark = src.replace(/-light\.(\w+)$/, "-dark.$1");
  return existsSync(join(process.cwd(), "public", dark)) ? dark : undefined;
}

function render(markdown: string, locale: Locale) {
  const toc: TocEntry[] = [];
  const used = new Set<string>();
  const marked = new Marked({ gfm: true });
  // Callouts, steps, tabs and keys (lib/markdown-blocks.ts).
  const state: BlockState = { depth: 1, tabs: 0 };
  let images = 0;
  marked.use(contentBlocks(state));
  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = headingId(inner) || (locale === "en" ? "section" : "abschnitt");
        for (let n = 2; used.has(id); n++) id = `${headingId(inner)}-${n}`;
        used.add(id);
        state.depth = depth;
        if (depth === 2 || depth === 3) toc.push({ id, text: plain(inner), depth });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        // Links to other sites open in a new tab and say so for screen
        // readers; Flowplan's own sites open like internal links.
        const external = /^https?:\/\//.test(href) && !ownSite(href);
        // Links to the app, the website, GitHub or Discord count as
        // "outbound" in the statistics (lib/track.ts).
        const target = outboundTarget(href, { app: appUrl(), website: websiteUrl(), marketplace: marketplaceUrl() ?? MARKETPLACE_DEFAULT });
        return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ""}${
          external ? ' target="_blank" rel="noreferrer"' : ""
        }${target ? ` data-umami-event="outbound" data-umami-event-target="${target}"` : ""}>${inner}${external ? `<span class="sr-only"> (${newTab[locale]})</span>` : ""}</a>`;
      },
      code({ text, lang }: Tokens.Code) {
        const language = (lang || "").split(/\s/)[0];
        // Scrollable regions take keyboard focus, so long lines can be
        // scrolled without a mouse (WCAG 2.1.1, axe scrollable-region-focusable).
        return `<div class="code" data-lang="${escape(language)}"><pre tabindex="0"><code>${escape(text)}</code></pre></div>\n`;
      },
      // Screenshots: ![what it shows](/screenshots/name.webp "caption"). A
      // paragraph of just an image becomes a figure with the caption below.
      // A "-light" image with a "-dark" sibling in public/ follows the
      // colour scheme; an image before the first section heading (the top
      // of the page) loads at once, the others when they come near.
      image({ href, text }: Tokens.Image) {
        const size = imageSize(href);
        const top = images++ === 0 && state.depth < 2;
        const img = `<img src="${escape(href)}" alt="${escape(text)}"${size ? ` width="${size.width}" height="${size.height}"` : ""}${
          top ? ' fetchpriority="high"' : ' loading="lazy"'
        } decoding="async">`;
        const dark = darkVariant(href);
        return dark ? `<picture><source media="(prefers-color-scheme: dark)" srcset="${escape(dark)}">${img}</picture>` : img;
      },
      paragraph({ tokens }: Tokens.Paragraph) {
        const only = tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (only.length === 1 && only[0].type === "image") {
          const image = only[0] as Tokens.Image;
          const caption = image.title ? `<figcaption>${escape(image.title)}</figcaption>` : "";
          return `<figure class="shot">${this.parser.parseInline([image])}${caption}</figure>\n`;
        }
        // [![…](/screenshots/x.webp "caption")](/screenshots/x.webp): a large
        // diagram that opens in full size on click or tap.
        const link = only.length === 1 && only[0].type === "link" ? (only[0] as Tokens.Link) : undefined;
        const inner = link?.tokens.filter((t) => !(t.type === "text" && !t.raw.trim()));
        if (link && inner?.length === 1 && inner[0].type === "image" && link.href.startsWith("/screenshots/")) {
          const image = inner[0] as Tokens.Image;
          const caption = image.title ? `<figcaption>${escape(image.title)}</figcaption>` : "";
          return `<figure class="shot"><a class="zoom" href="${escape(link.href)}">${this.parser.parseInline([image])}<span class="sr-only"> (${fullSize[locale]})</span></a>${caption}</figure>\n`;
        }
        return `<p>${this.parser.parseInline(tokens)}</p>\n`;
      },
      blockquote({ tokens }: Tokens.Blockquote) {
        return calloutHtml(this.parser.parse(tokens), locale);
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

// Markdown to the HTML of a page body, with its table of contents (tests).
export const renderMarkdown = (markdown: string, locale: Locale = "de") => render(markdown, locale);

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

// Front matter at the top of a page, then the Markdown:
//
//   ---
//   keywords: Kanban, Board        search keywords
//   new: import-pruefen 2026-11-12 sections added then ("Neu" for 60 days)
//   filter: true                   a filter field for the page's tables
//   ---
export type FrontMatter = { keywords: string[]; fresh: { id: string; date: string }[]; filter: boolean; body: string };
export function frontMatter(text: string): FrontMatter {
  const m = text.match(/^---\n([\s\S]*?)\n---\n+/);
  if (!m) return { keywords: [], fresh: [], filter: false, body: text };
  const field = (name: string) => m[1].match(new RegExp(`^${name}:\\s*(.*)$`, "m"))?.[1]?.trim() ?? "";
  const list = (name: string) =>
    field(name)
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  const fresh = list("new").map((entry) => {
    const [id, date = ""] = entry.split(/\s+/);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`front matter "new: ${entry}": write "section-id YYYY-MM-DD"`);
    return { id, date };
  });
  return { keywords: list("keywords"), fresh, filter: field("filter") === "true", body: text.slice(m[0].length) };
}
// How long a section counts as new.
export const NEW_DAYS = 60;
export const freshSections = (marks: { id: string; date: string }[], now = Date.now()) =>
  marks
    .filter((m) => {
      const age = now - Date.parse(`${m.date}T00:00:00Z`);
      return age >= 0 && age < NEW_DAYS * 86_400_000;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

// Reading time: words of the lead and the article at 200 words a minute
// (code included – it is read too), at least one minute.
export const WORDS_PER_MINUTE = 200;
export function readingMinutes(html: string) {
  const words = blockText(html).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
const raw = (slug: string, locale: Locale) => frontMatter(readFileSync(fileOf(slug, locale), "utf8"));
// A page's Markdown without front matter, with the counts (lib/facts.ts) and
// the reference tables (lib/reference.ts) filled in.
export const docMarkdown = (slug: string, locale: Locale) => fillReference(fillFacts(raw(slug, locale).body, locale), locale, () => docEnvRows(locale));
// Every environment variable the pages describe (the reference page itself
// left out), for {{reference:env}}.
const envCache = new Map<Locale, EnvRow[]>();
export function docEnvRows(locale: Locale) {
  let rows = envCache.get(locale);
  if (!rows) {
    const pages = docSlugs
      .filter((slug) => !hasReference(raw(slug, locale).body))
      .map((slug) => ({ slug, title: docTitle(slug, locale), body: fillFacts(raw(slug, locale).body, locale) }));
    rows = envRows(pages, headingId);
    envCache.set(locale, rows);
  }
  return rows;
}
// Pages on the same subject, for "Related pages" under a page: points for
// each shared keyword (3), the same group (2) and a link between the two
// pages (2 each way); the page itself and its previous and next page are
// left out. Ties keep the sidebar order; at most `max`, none without points.
const linksOf = (slug: string, locale: Locale) =>
  new Set([...raw(slug, locale).body.matchAll(/\]\(\/([a-z0-9-]+)(?:#[^)]*)?\)/g)].map((m) => m[1]));
export function relatedPages(slug: string, locale: Locale, max = 4): string[] {
  const own = new Set(docKeywords(slug, locale).map((k) => k.toLowerCase()));
  const group = areas.flatMap((a) => a.groups).find((g) => g.pages.includes(slug));
  const out = linksOf(slug, locale);
  const { prev, next } = neighbours(slug);
  return docSlugs
    .filter((other) => other !== slug && other !== prev && other !== next)
    .map((other, order) => {
      const shared = docKeywords(other, locale).filter((k) => own.has(k.toLowerCase())).length;
      const score = shared * 3 + (group?.pages.includes(other) ? 2 : 0) + (out.has(other) ? 2 : 0) + (linksOf(other, locale).has(slug) ? 2 : 0);
      return { other, score, order };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, max)
    .map((x) => x.other);
}
// The keywords of a page's front matter.
export const docKeywords = (slug: string, locale: Locale) => raw(slug, locale).keywords;
// A page's title, its "# Title" line.
const titles = new Map<string, string>();
export function docTitle(slug: string, locale: Locale) {
  const k = `${locale}:${slug}`;
  let title = titles.get(k);
  if (title === undefined) {
    title = raw(slug, locale).body.match(/^# (.+)$/m)?.[1]?.trim() || slug;
    titles.set(k, title);
  }
  return title;
}

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
  const { prev, next } = neighbours(slug);
  const page = (s: string) => ({ slug: s, title: docTitle(s, locale) });
  const front = raw(slug, locale);
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
    prev: prev ? page(prev) : undefined,
    next: next ? page(next) : undefined,
    related: relatedPages(slug, locale).map(page),
    minutes: readingMinutes(`<p>${leadHtml}</p>${html}`),
    fresh: freshSections(front.fresh.filter((m) => toc.some((e) => e.id === m.id))),
    filter: front.filter || hasReference(front.body),
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
// search box also finds words that only appear in the body. "tags" are the
// keywords of the page's front matter ("Kanban" on Views, "Notion" on the
// move); "keywords" holds the synonyms of terms in the text (lib/search.ts),
// so "login" finds a section about the Anmeldung and "S3" one about
// Speicher. A level-3 section names its level-2 section as "parent", for the
// breadcrumb "Page › Section › Subsection".
export type DocSearchSection = { id: string; text: string; parent?: string; body: string; keywords: string };
export type DocSearchPage = { slug: string; title: string; group: string; summary: string; text: string; tags: string[]; keywords: string; sections: DocSearchSection[] };
export function docSearchIndex(locale: Locale = "de"): DocSearchPage[] {
  const pages: DocSearchPage[] = docSlugs.map((slug) => {
    const doc = loadDoc(slug, locale)!;
    const parts = doc.html.split(/(?=<h[23] id=")/);
    const intro = parts[0].startsWith("<h") ? "" : parts.shift()!;
    const text = blockText(intro);
    const tags = docKeywords(slug, locale);
    let parent: string | undefined;
    return {
      slug,
      title: doc.title,
      group: doc.group,
      summary: doc.summary,
      text,
      tags,
      keywords: synonymKeywords(`${doc.title} ${doc.summary} ${tags.join(" ")} ${text}`),
      sections: parts.map((part) => {
        const id = part.match(/^<h[23] id="([^"]+)"/)![1];
        const heading = plain(part.slice(0, part.indexOf("</h")).replace(/<a class="anchor"[^>]*>#<\/a>/, "")).trim();
        const body = blockText(part.slice(part.indexOf("</h") + 5));
        const level3 = part.startsWith("<h3");
        if (!level3) parent = heading;
        return { id, text: heading, ...(level3 && parent ? { parent } : {}), body, keywords: synonymKeywords(`${heading} ${body}`) };
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
    tags: locale === "en" ? ["changelog", "release notes", "new"] : ["Changelog", "Versionshinweise", "neu"],
    keywords: synonymKeywords(`${title} ${summary}`),
    sections: releases().map((r) => {
      const body = r.entries.map((e) => e.text).join(" ");
      return { id: r.id, text: `${r.version} – ${r.date}`, body, keywords: synonymKeywords(body) };
    }),
  });
  return pages;
}
export type DocSearchEntry = DocSearchPage;

// A short fingerprint of all Markdown files: the browser fetches the search
// index as /api/search-index/<locale>?v=<version>, so the address changes
// whenever the content does and the response can be cached for a long time.
let indexVersion: string | undefined;
export function searchIndexVersion() {
  if (!indexVersion) {
    const hash = createHash("sha1");
    for (const slug of docSlugs) for (const locale of ["de", "en"] as const) hash.update(readFileSync(fileOf(slug, locale)));
    hash.update(JSON.stringify(FACTS));
    hash.update(JSON.stringify(REFERENCE));
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
      ? `> Flowplan ist ein Open-Source-Arbeitsbereich (AGPL-3.0) für Dokumente, Datenbanken (Tabelle, Board, Kalender, Zeitleiste, Galerie, Liste, Feed, Diagramm, Formular), Whiteboards und ein tägliches Journal. Gehostet in Deutschland auf app.flowplan.org oder selbst gehostet als ein Docker-Container (Next.js, SQLite; optional PostgreSQL und mehrere Instanzen). Oberfläche auf ${languageList("de")}. KI ist optional und standardmäßig aus – auch komplett lokal mit Ollama.`
      : `> Flowplan is an open-source workspace (AGPL-3.0) for documents, databases (table, board, calendar, timeline, gallery, list, feed, chart, form), whiteboards and a daily journal. Hosted in Germany at app.flowplan.org or self-hosted as one Docker container (Next.js, SQLite; optionally PostgreSQL and several instances). Interface in ${languageList("en")}. AI is optional and off by default – also completely local with Ollama.`,
    "",
    de
      ? "Jede Seite gibt es als Markdown unter der verlinkten Adresse; die englische Fassung unter /en/…md."
      : "Every page is available as Markdown at the linked address; the German version is under /de/…md.",
    "",
  ];
  for (const group of docAreas(locale).flatMap((a) => a.groups.map((g) => ({ ...g, title: `${a.title}: ${g.title}` })))) {
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
    ...(marketplaceUrl() ? [`- [Flowplan Marketplace](${marketplaceUrl()}): ${de ? "Vorlagen aus der Community" : "templates from the community"}`] : []),
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

// Old anchors of a page that lead elsewhere now (lib/anchors.ts).
let anchorMap: AnchorMap | undefined;
export function docAnchors(slug: string) {
  if (!anchorMap) {
    try {
      anchorMap = JSON.parse(readFileSync(join(process.cwd(), "content", "anchor-map.json"), "utf8")) as AnchorMap;
    } catch {
      anchorMap = {};
    }
  }
  return anchorMap[slug];
}
