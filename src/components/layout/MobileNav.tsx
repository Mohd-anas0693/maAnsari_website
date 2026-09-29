"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryNav, footerNav } from "@/data/site";
import { whatsappUrl, telUrl, displayPhone } from "@/lib/contact";
import { cn } from "@/lib/cn";
import {
  openNavOverlay,
  closeNavOverlay,
  setNavOverlayImmediate,
  type NavOverlayElements,
} from "@/animations/nav";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Full-screen navigation overlay.
 *
 * Kept mounted so focus management and the closing animation both have
 * something to work with. It is inert when closed: `hidden` on the container
 * removes it from the accessibility tree and from the tab order.
 */
export function MobileNav({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  // Tracks whether the overlay has ever opened, so the closing animation does
  // not run on the initial mount.
  const hasOpened = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const elements: NavOverlayElements = {
      panel,
      curtain: curtainRef.current,
      items: listRef.current
        ? (Array.from(listRef.current.children) as HTMLElement[])
        : [],
      footer: footerRef.current,
    };

    if (prefersReducedMotion()) {
      setNavOverlayImmediate(elements, open);
      if (open) firstLinkRef.current?.focus();
      return;
    }

    if (open) {
      hasOpened.current = true;
      panel.removeAttribute("hidden");
      openNavOverlay(elements);
      // Move focus once the panel is actually visible.
      const id = window.setTimeout(() => firstLinkRef.current?.focus(), 120);
      return () => window.clearTimeout(id);
    }

    if (hasOpened.current) {
      closeNavOverlay(elements, () => panel.setAttribute("hidden", ""));
    }
  }, [open]);

  // Escape closes, and focus is trapped inside while open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const wa = whatsappUrl("appointment");
  const tel = telUrl();
  const phone = displayPhone();

  return (
    <div
      ref={panelRef}
      id="mobile-navigation"
      hidden
      aria-label="Site menu"
      className="fixed inset-0 z-[60] lg:hidden"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <div
        ref={curtainRef}
        className="grain absolute inset-0 bg-ink-950"
        style={{ transform: "translateY(-100%)" }}
      />

      <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
        <nav aria-label="Mobile primary">
          <ul ref={listRef} className="flex flex-col">
            {primaryNav.map((item, index) => (
              <li key={item.href} style={{ opacity: 0 }}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 border-b border-hairline py-4"
                >
                  <span className="font-sans text-[0.5625rem] tracking-[0.22em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[2rem] leading-none transition-colors duration-300",
                      isActive(item.href) ? "text-champagne" : "text-ivory",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div ref={footerRef} className="mt-10" style={{ opacity: 0 }}>
          <p className="eyebrow mb-4">Tailoring</p>
          <ul className="mb-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {footerNav[0].links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-sans text-[0.8125rem] text-bone transition-colors hover:text-champagne"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center bg-ivory px-6 py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ink-950"
            >
              Book an Appointment
            </Link>
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 border border-hairline-strong px-6 py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            ) : null}
            {tel && phone ? (
              <a
                href={tel}
                className="mt-2 text-center font-sans text-[0.8125rem] tracking-[0.06em] text-stone"
              >
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
