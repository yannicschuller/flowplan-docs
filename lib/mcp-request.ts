import { docsUrl } from "./links";

// Whether a request to /mcp is meant for the MCP server (proxy.ts): anything
// but GET and HEAD (POST, the CORS preflight), or a GET that asks for an
// event stream and not for HTML. Browsers opening /mcp get the page.
export const isMcpRequest = (method: string, accept: string | null) =>
  !(method === "GET" || method === "HEAD") || (/text\/event-stream/i.test(accept || "") && !/text\/html/i.test(accept || ""));

// The public address of the docs' MCP server.
export const mcpUrl = () => `${docsUrl()}/mcp`;
