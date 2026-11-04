import { analytics, analyticsLoader } from "@/lib/analytics";

// Adds Umami's script when UMAMI_URL is set (lib/analytics.ts); read at
// runtime, so the same image works with and without statistics.
export const dynamic = "force-dynamic";
export function GET() {
  return new Response(analyticsLoader(analytics()), {
    headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
