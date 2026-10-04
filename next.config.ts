import type { NextConfig } from "next";

// The first docs addresses were German; old links keep working.
const renamed = [
  ["anmeldung-oidc", "sign-in"],
  ["ansichten", "views"],
  ["api-und-webhooks", "api-and-webhooks"],
  ["arbeitsbereiche-und-rechte", "workspaces-and-permissions"],
  ["betrieb", "operations"],
  ["coolify-und-proxy", "coolify-and-proxy"],
  ["datenbanken", "databases"],
  ["dokumente", "documents"],
  ["eigenschaften-und-formeln", "properties-and-formulas"],
  ["erste-schritte", "first-steps"],
  ["formulare", "forms"],
  ["import-export-versionen", "import-export-versions"],
  ["konfiguration", "configuration"],
  ["offline-und-apps", "offline-and-apps"],
  ["seiten-und-bereiche", "pages-and-spaces"],
  ["speicher-und-sicherung", "storage-and-backups"],
  ["suche-und-benachrichtigungen", "search-and-notifications"],
  ["tastenkuerzel", "keyboard-shortcuts"],
  ["teilen", "sharing"],
  ["vorlagen", "templates"],
  ["zusammenarbeit", "collaboration"],
];

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // The pages are read from Markdown files at runtime.
  outputFileTracingIncludes: { "/**": ["./content/docs/**/*.md"] },
  async redirects() {
    return [
      // docs.flowplan.org/docs/… (the old path under flowplan.org) → /…
      { source: "/docs", destination: "/", permanent: true },
      ...renamed.map(([from, to]) => ({ source: `/docs/${from}`, destination: `/${to}`, permanent: true })),
      { source: "/docs/:slug", destination: "/:slug", permanent: true },
      ...renamed.map(([from, to]) => ({ source: `/${from}`, destination: `/${to}`, permanent: true })),
    ];
  },
};
export default config;
