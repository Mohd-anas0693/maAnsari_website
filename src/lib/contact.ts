import { siteConfig } from "@/data/site";

/**
 * CONTACT CHANNEL HELPERS
 * Every helper returns `null` when the underlying detail has not been
 * configured, so callers can hide the control rather than render a dead link.
 */

/** Pre-written WhatsApp openers, so a tap starts a real conversation. */
export const whatsappPresets = {
  general: "Hello, I would like to ask about custom tailoring.",
  appointment: "Hello, I would like to book a fitting appointment.",
  suit: "Hello, I would like to ask about a custom suit.",
  wedding: "Hello, I am planning a wedding and would like to discuss tailoring.",
  blazer: "Hello, I would like to ask about a custom blazer.",
  shirt: "Hello, I would like to ask about custom shirts.",
  alteration: "Hello, I would like to ask about alterations.",
} as const;

export type WhatsappPreset = keyof typeof whatsappPresets;

/**
 * Builds a wa.me link. Returns null when no number is configured — a
 * WhatsApp button with no number is worse than no button.
 */
export function whatsappUrl(
  message: string | WhatsappPreset = "general",
): string | null {
  if (!siteConfig.whatsapp) return null;
  const digits = siteConfig.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  const text =
    message in whatsappPresets
      ? whatsappPresets[message as WhatsappPreset]
      : message;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function telUrl(): string | null {
  if (!siteConfig.telephone) return null;
  return `tel:${siteConfig.telephone.replace(/[^\d+]/g, "")}`;
}

export function mailtoUrl(subject?: string): string | null {
  if (!siteConfig.email) return null;
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${siteConfig.email}${query}`;
}

/** Human-readable phone for display. Falls back to the raw configured value. */
export function displayPhone(): string | null {
  return siteConfig.telephone;
}

export const hasWhatsapp = Boolean(siteConfig.whatsapp);
export const hasPhone = Boolean(siteConfig.telephone);
export const hasEmail = Boolean(siteConfig.email);
export const hasStreetAddress = Boolean(siteConfig.address.street);
export const hasMap = Boolean(siteConfig.mapsEmbedUrl ?? siteConfig.mapsUrl);
