import type { MetadataRoute } from "next";

// Addresses come from DOCS_URL at runtime.
export const dynamic = "force-dynamic";
import { absolute } from "@/lib/seo";

// Open to search engines and to AI crawlers alike: the documentation should
// be found and quoted. The Markdown sources are listed in /llms.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/markdown/"] },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: absolute("/sitemap.xml"),
    host: absolute(""),
  };
}
