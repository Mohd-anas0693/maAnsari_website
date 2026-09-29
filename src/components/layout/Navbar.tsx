"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { primaryNav } from "@/data/site";

/** The wordmark already links home, so the bar starts at the first section. */
const desktopNav = primaryNav.filter((item) => item.href !== "/");
import { whatsappUrl, telUrl, hasPhone } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * The site navigation.
 *
 * Transparent over the hero, then compacts on scroll: a hairline appears, the
 * background gains opacity and a backdrop blur, and the vertical rhythm
 * tightens. The wordmark never disappears.
 */
export function Navbar() {
  const pathname = usePathname();
  // Compact-on-scroll. The threshold sits well below one viewport so the
  // transition happens as the hero starts to leave, not after it has gone.
  const scrolled = useScrolledPast(48);
  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * Close the overlay whenever the route changes, including on browser back
   * and forward. Adjusted during render rather than in an effect: React
   * re-runs this component before committing, so the menu never paints open
   * on the new page.
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Lock the page behind the overlay without losing scroll position.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname],
  );

  const wa = whatsappUrl("appointment");
  const tel = telUrl();

  return (
    <>
      <header
        className={cn(
          "site-nav fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter,padding] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
          /*
           * A fixed, z-indexed header is its own stacking context, so the
           * close button's z-index is scoped to it. While the overlay is open
           * the whole header has to sit above the overlay, or there is no
           * visible way to close the menu.
           */
          menuOpen ? "z-[70]" : "z-50",
          menuOpen
            ? "border-b border-transparent bg-transparent py-6 backdrop-blur-none"
            : scrolled
              ? "border-b border-hairline bg-ink-950/82 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/68"
              : "border-b border-transparent bg-transparent py-6",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex items-center justify-between gap-6"
        >
          <Wordmark compact={scrolled} />

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative block whitespace-nowrap py-1 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 xl:text-[0.6875rem] xl:tracking-[0.18em]",
                    isActive(item.href)
                      ? "text-champagne"
                      : "text-bone hover:text-ivory",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]",
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 whitespace-nowrap border border-hairline-strong px-4 py-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-champagne hover:text-champagne xl:inline-flex"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            {hasPhone && tel ? (
              <a
                href={tel}
                className="hidden whitespace-nowrap font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:text-champagne 2xl:inline-block"
              >
                Call
              </a>
            ) : null}

            <Link
              href="/contact"
              className="hidden whitespace-nowrap bg-ivory px-5 py-3.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-ink-950 transition-colors duration-300 hover:bg-champagne sm:inline-block xl:px-6"
            >
              Book an Appointment
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="group relative flex h-11 w-11 shrink-0 items-center justify-center lg:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-ivory transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-ivory transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]",
                    menuOpen ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3 group-hover:w-full",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isActive={isActive}
      />
    </>
  );
}
