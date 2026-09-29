import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { articles } from "@/data/journal";

/**
 * Generated from the same data that generates the pages, so a route can never
 * be in the sitemap without existing, or exist without being listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/our-craft`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/locations`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/journal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}${service.href}`,
    lastModified: now,
    changeFrequency: "yearly",
    // The umbrella pages carry more weight than the narrow ones.
    priority: ["suits", "wedding-suits", "bespoke-tailoring"].includes(service.slug)
      ? 0.9
      : 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${base}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: location.serviceModel === "studio" ? 0.9 : 0.6,
  }));

  const journalPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/journal/${article.slug}`,
    lastModified: new Date(article.updated ?? article.published),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...core, ...servicePages, ...locationPages, ...journalPages];
}
