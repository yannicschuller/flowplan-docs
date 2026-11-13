import { mcpNotAllowed, mcpOptions, mcpPost } from "@/lib/mcp";

// The documentation's MCP server (lib/mcp.ts). Public address:
// https://docs.flowplan.org/mcp – proxy.ts forwards MCP requests there to
// this route, while a browser opening /mcp gets the page about MCP.
export const dynamic = "force-dynamic";

export const POST = (request: Request) => mcpPost(request);
export const GET = () => mcpNotAllowed();
export const DELETE = () => mcpNotAllowed();
export const OPTIONS = () => mcpOptions();
