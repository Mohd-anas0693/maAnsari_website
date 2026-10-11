/**
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * ---------------------------------------------------------------------------
 * Nothing here is invented. Every field that depends on real-world business
 * data reads from an environment variable and falls back to `null`.
 *
 * When a field is `null` the UI hides the corresponding element entirely and
 * the structured data omits the property, rather than shipping a placeholder
 * that search engines or customers could mistake for fact.
 *
 * Set these in `.env.local` (see `.env.example`) before going live.
 */

/** Returns a trimmed env value, or null when unset/blank. */
function env(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export const BRAND_NAME = env(process.env.NEXT_PUBLIC_BRAND_NAME) ?? "M.A. Ansari";
export const BRAND_SUFFIX =
  env(process.env.NEXT_PUBLIC_BRAND_SUFFIX) ?? "Bespoke Tailoring";

/** Full legal/schema name used in metadata and structured data. */
export const BUSINESS_NAME = `${BRAND_NAME} ${BRAND_SUFFIX}`;

export const SITE_URL = (
  env(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.maansari.example"
).replace(/\/$/, "");

/**
 * True only once a real production domain is configured. Placeholder and
 * local hosts count as not-real, which is what keeps `robots.ts` from
 * inviting crawlers to a preview build.
 */
export const HAS_REAL_DOMAIN = !(
  SITE_URL.endsWith(".example") ||
  SITE_URL.includes("localhost") ||
  SITE_URL.includes("127.0.0.1") ||
  SITE_URL.includes(".local")
);

export interface PostalAddress {
  street: string | null;
  locality: string;
  region: string;
  postalCode: string | null;
  country: string;
  countryCode: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface OpeningHours {
  /** Schema.org day names. */
  days: string[];
  opens: string;
  closes: string;
  label: string;
}

function numberEnv(value: string | undefined): number | null {
  const raw = env(value);
  if (raw === null) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

const latitude = numberEnv(process.env.NEXT_PUBLIC_GEO_LAT);
const longitude = numberEnv(process.env.NEXT_PUBLIC_GEO_LNG);

export const siteConfig = {
  name: BUSINESS_NAME,
  shortName: BRAND_NAME,
  url: SITE_URL,
  locale: "en_IN",
  language: "en-IN",
  currency: "INR",

  /** One-line positioning statement. Used in metadata fallbacks. */
  tagline: "Bespoke suits, blazers and shirts, cut and finished in Ludhiana.",

  description:
    "A bespoke men's tailoring house in Ludhiana, Punjab. Custom suits, wedding and groom suits, blazers, trousers and shirts, measured and made to your proportions.",

  /**
   * Street address. Only `locality`, `region` and `country` are asserted
   * here because those are the stated service base. The street line reads
   * from the environment so no address is ever fabricated.
   */
  address: {
    street: env(process.env.NEXT_PUBLIC_ADDRESS_STREET),
    locality: "Ludhiana",
    region: "Punjab",
    postalCode: env(process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE),
    country: "India",
    countryCode: "IN",
  } satisfies PostalAddress,

  geo:
    latitude !== null && longitude !== null
      ? ({ latitude, longitude } satisfies GeoCoordinates)
      : null,

  /** E.164 preferred, e.g. +919876543210 */
  telephone: env(process.env.NEXT_PUBLIC_PHONE),
  /** Digits only, country code first, e.g. 919876543210 */
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP),
  email: env(process.env.NEXT_PUBLIC_EMAIL),

  /** Google Maps place or directions URL. */
  mapsUrl: env(process.env.NEXT_PUBLIC_MAPS_URL),
  /** Google Maps embed URL for the iframe on the contact page. */
  mapsEmbedUrl: env(process.env.NEXT_PUBLIC_MAPS_EMBED_URL),

  /**
   * Opening hours. Left as `null` until confirmed — publishing hours that
   * are wrong is worse than publishing none, both for customers and for
   * Google Business Profile consistency.
   */
  openingHours: (() => {
    const raw = env(process.env.NEXT_PUBLIC_OPENING_HOURS);
    if (!raw) return null;
    // Format: "Mon-Sat|11:00|20:00"
    const [daysPart, opens, closes] = raw.split("|");
    if (!daysPart || !opens || !closes) return null;
    const dayMap: Record<string, string> = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };
    const order = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const [startKey, endKey] = daysPart.toLowerCase().split("-");
    const startIndex = order.indexOf(startKey ?? "");
    const endIndex = order.indexOf(endKey ?? startKey ?? "");
    if (startIndex < 0 || endIndex < 0) return null;
    const days = order
      .slice(startIndex, endIndex + 1)
      .map((key) => dayMap[key])
      .filter(Boolean);
    return [
      {
        days,
        opens,
        closes,
        label: `${daysPart} · ${opens}–${closes}`,
      },
    ] satisfies OpeningHours[];
  })(),

  /** Price range in Google's `$`–`$$$$` notation, only if supplied. */
  priceRange: env(process.env.NEXT_PUBLIC_PRICE_RANGE),

  social: {
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE),
    googleBusiness: env(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS),
  },

  analytics: {
    gaMeasurementId: env(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    googleSiteVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  },
} as const;

/** Every configured social profile URL, for schema.org `sameAs`. */
export const sameAs: string[] = Object.values(siteConfig.social).filter(
  (value): value is string => typeof value === "string",
);

/** A single-line address string for display. Skips unknown parts. */
export function formatAddress(): string {
  const { street, locality, region, postalCode, country } = siteConfig.address;
  return [street, locality, region, postalCode, country]
    .filter(Boolean)
    .join(", ");
}

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Suits",
    href: "/suits",
    description: "Two-piece, three-piece, wedding and corporate tailoring.",
    children: [
      { label: "All Suits", href: "/suits" },
      { label: "Two-Piece Suits", href: "/two-piece-suits" },
      { label: "Three-Piece Suits", href: "/three-piece-suits" },
      { label: "Wedding Suits", href: "/wedding-suits" },
      { label: "Corporate Suits", href: "/corporate-suits" },
      { label: "Bandhgala & Indian Formalwear", href: "/indian-formalwear" },
    ],
  },
  {
    label: "Blazers",
    href: "/blazers",
    description: "Single jackets, built to be worn on their own.",
  },
  {
    label: "Shirts",
    href: "/custom-shirts",
    description: "Collar, cuff and fit, specified by you.",
    children: [
      { label: "Custom Shirts", href: "/custom-shirts" },
      { label: "Custom Trousers", href: "/custom-trousers" },
      { label: "Alterations", href: "/alterations" },
    ],
  },
  { label: "Our Craft", href: "/our-craft" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Tailoring",
    links: [
      { label: "Bespoke Tailoring", href: "/bespoke-tailoring" },
      { label: "Two-Piece Suits", href: "/two-piece-suits" },
      { label: "Three-Piece Suits", href: "/three-piece-suits" },
      { label: "Blazers", href: "/blazers" },
      { label: "Custom Shirts", href: "/custom-shirts" },
      { label: "Custom Trousers", href: "/custom-trousers" },
    ],
  },
  {
    title: "Occasions",
    links: [
      { label: "Wedding Suits", href: "/wedding-suits" },
      { label: "Bandhgala & Indian Formalwear", href: "/indian-formalwear" },
      { label: "Groom & Wedding Party", href: "/wedding-suits#wedding-party" },
      { label: "Corporate Suits", href: "/corporate-suits" },
      { label: "Alterations & Refitting", href: "/alterations" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Craft", href: "/our-craft" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Areas We Serve", href: "/locations" },
      { label: "Contact & Appointments", href: "/contact" },
    ],
  },
];
