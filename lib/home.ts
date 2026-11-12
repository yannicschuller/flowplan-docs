// The start page: "I want to …" tiles for common tasks and the popular
// pages (a fixed list – there are no per-page statistics to rank by). Each
// target is a page, or a page and the heading id in German and English.

export type Task = { icon: string; title: [de: string, en: string]; text: [de: string, en: string]; slug: string; hash?: [de: string, en: string] };

export const TASKS: Task[] = [
  { icon: "UsersThree", title: ["Team einladen", "Invite your team"], text: ["Mitglieder, Gäste und Rollen", "Members, guests and roles"], slug: "workspaces-and-permissions", hash: ["mitglieder-einladen", "invite-members"] },
  { icon: "ArrowsLeftRight", title: ["Von Notion umziehen", "Move from Notion"], text: ["Seiten und Datenbanken übernehmen", "Bring pages and databases along"], slug: "migrate", hash: ["von-notion", "from-notion"] },
  { icon: "CheckSquare", title: ["Aufgaben verwalten", "Manage tasks"], text: ["Abhaken, zuweisen, fällig", "Tick off, assign, due dates"], slug: "tasks-in-documents" },
  { icon: "Database", title: ["Datenbank anlegen", "Create a database"], text: ["Tabelle, Einträge, Eigenschaften", "Table, records, properties"], slug: "databases", hash: ["datenbank-anlegen", "create-a-database"] },
  { icon: "Kanban", title: ["Board oder Kalender nutzen", "Use a board or calendar"], text: ["Ansichten für jede Datenbank", "Views for every database"], slug: "views" },
  { icon: "FlowArrow", title: ["Workflow bauen", "Build a workflow"], text: ["Abläufe automatisieren", "Automate what repeats"], slug: "workflows" },
  { icon: "ShareNetwork", title: ["Seite teilen", "Share a page"], text: ["Links, Gäste, veröffentlichen", "Links, guests, publishing"], slug: "sharing" },
  { icon: "DeviceMobile", title: ["App installieren", "Install the app"], text: ["iPhone, iPad und Android", "iPhone, iPad and Android"], slug: "mobile-apps" },
  { icon: "Sparkle", title: ["KI einrichten", "Set up AI"], text: ["Lokal mit Ollama oder eigenem Schlüssel", "Local with Ollama or your own key"], slug: "ai" },
  { icon: "HardDrives", title: ["Selbst hosten", "Self-host"], text: ["Ein Docker-Container", "One Docker container"], slug: "installation" },
  { icon: "Key", title: ["SSO einrichten", "Set up single sign-on"], text: ["Keycloak, Entra ID, Okta …", "Keycloak, Entra ID, Okta …"], slug: "sso-oidc" },
  { icon: "CloudArrowUp", title: ["Sicherungen einrichten", "Set up backups"], text: ["S3, SFTP und Wiederherstellen", "S3, SFTP and restoring"], slug: "storage-and-backups", hash: ["sicherungen", "backups"] },
];

export const POPULAR = ["first-steps", "documents", "views", "databases", "workflows", "migrate", "installation", "configuration"];

export const taskHref = (task: Task, prefix: string, locale: "de" | "en") =>
  `${prefix}/${task.slug}${task.hash ? `#${task.hash[locale === "en" ? 1 : 0]}` : ""}`;
