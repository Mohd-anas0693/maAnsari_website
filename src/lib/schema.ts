import { siteConfig, BUSINESS_NAME, sameAs } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import type { Faq } from "@/data/faqs";

/**
 * STRUCTURED DATA
 * ---------------------------------------------------------------------------
 * Every builder omits properties whose underlying business data has not been
 * configured. Emitting a property with a placeholder value would be worse
 * than omitting it: it is a factual claim to a search engine.
 */

type Json = Record<string, unknown>;

/** Strips null, undefined and empty arrays/objects, recursively. */
function prune<T extends Json>(input: T): T {
  const out: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      out[key] = value;
      continue;
    }
    if (typeof value === "object") {
      const nested = prune(value as Json);
      if (Object.keys(nested).length === 0) continue;
      out[key] = nested;
      continue;
    }
    out[key] = value;
  }
  return out as T;
}

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

function postalAddress(): Json | null {
  const { street, locality, region, postalCode, countryCode } = siteConfig.address;
  return prune({
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: countryCode,
  });
}

function openingHoursSpecification(): Json[] | null {
  if (!siteConfig.openingHours) return null;
  return siteConfig.openingHours.map((entry) =>
    prune({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    }),
  );
}

/**
 * `ClothingStore` is the most specific schema.org type that describes a
 * tailoring house with a physical location. It inherits from LocalBusiness.
 */
export function localBusinessSchema(): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": ORG_ID,
    name: BUSINESS_NAME,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currency,
    address: postalAddress(),
    geo: siteConfig.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        }
      : null,
    hasMap: siteConfig.mapsUrl,
    openingHoursSpecification: openingHoursSpecification(),
    sameAs: sameAs.length > 0 ? sameAs : null,
    image: absoluteUrl("/opengraph-image"),
    /**
     * The geographic area customers are genuinely served from. Only cities
     * with a real, content-bearing page on this site are listed.
     */
    areaServed: [
      { "@type": "City", name: "Ludhiana" },
      { "@type": "City", name: "Chandigarh" },
      { "@type": "City", name: "Mohali" },
      { "@type": "City", name: "Jalandhar" },
      { "@type": "City", name: "Amritsar" },
      { "@type": "State", name: "Punjab" },
    ],
    knowsAbout: [
      "Bespoke tailoring",
      "Men's suits",
      "Wedding suits",
      "Made-to-measure clothing",
      "Custom shirts",
      "Garment alterations",
    ],
  });
}

export function websiteSchema(): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: BUSINESS_NAME,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ORG_ID },
  });
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

/**
 * FAQPage markup. Only call this where the questions and answers are
 * genuinely visible on the same page, per Google's guidelines.
 */
export function faqSchema(faqs: Faq[]): Json | null {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
}

export function serviceSchema({ name, description, path }: ServiceSchemaInput): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "City", name: "Ludhiana" },
      { "@type": "State", name: "Punjab" },
    ],
  });
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}

export function articleSchema({
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: ArticleSchemaInput): Json {
  return prune({
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: absoluteUrl(image),
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: siteConfig.language,
  });
}
