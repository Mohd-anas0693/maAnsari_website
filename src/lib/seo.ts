import type { Metadata } from "next";
import { siteConfig, BUSINESS_NAME } from "@/data/site";

/**
 * METADATA BUILDER
 * One function so no page can accidentally ship a duplicate title, a missing
 * canonical, or an Open Graph block that disagrees with the page content.
 */

export interface PageMetaInput {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/wedding-suits". */
  path: string;
  /** Absolute or root-relative image path for social cards. */
  image?: string;
  imageAlt?: string;
  /** Article pages emit `og:type=article`. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Set for pages that should exist but not be indexed. */
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE = "/opengraph-image";

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS_NAME,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
