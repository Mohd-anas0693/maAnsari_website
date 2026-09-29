import type { MetadataRoute } from "next";
import { siteConfig, HAS_REAL_DOMAIN } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Until a real domain is configured, keep the site out of the index
  // entirely rather than have a preview URL crawled and ranked.
  if (!HAS_REAL_DOMAIN) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next's own build output has no reason to be crawled.
        disallow: ["/_next/static/chunks/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
