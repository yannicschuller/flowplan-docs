import { missDelete, missGet, missPost } from "@/lib/search-misses";

// Searches without results (lib/search-misses.ts): the search dialog
// counts them here, the maintainer reads them with SEARCH_MISSES_TOKEN.
export const dynamic = "force-dynamic";

export const POST = (request: Request) => missPost(request);
export const GET = (request: Request) => missGet(request);
export const DELETE = (request: Request) => missDelete(request);
