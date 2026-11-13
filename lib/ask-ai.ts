// "Ask Claude" and "Ask ChatGPT" under a page's title: plain links that open
// the assistant with a prompt pointing at the page's Markdown. Nothing is
// counted, no script of the assistants is loaded.
import type { Locale } from "./i18n";

export type AskTarget = { title: string; markdownUrl: string; mcpUrl: string; llmsUrl: string };

export function askPrompt(locale: Locale, page: AskTarget) {
  return locale === "de"
    ? `Lies die Seite „${page.title}“ der Flowplan-Dokumentation: ${page.markdownUrl} – und beantworte dann meine Fragen dazu. ` +
        `Die ganze Doku findest du unter ${page.llmsUrl}, durchsuchbar auch als MCP-Server: ${page.mcpUrl}`
    : `Read the page “${page.title}” of the Flowplan documentation: ${page.markdownUrl} – then answer my questions about it. ` +
        `The whole documentation is at ${page.llmsUrl}, also searchable as an MCP server: ${page.mcpUrl}`;
}

export function askLinks(locale: Locale, page: AskTarget) {
  const q = encodeURIComponent(askPrompt(locale, page));
  return { claude: `https://claude.ai/new?q=${q}`, chatgpt: `https://chatgpt.com/?q=${q}` };
}
