"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl, telUrl, hasWhatsapp, hasPhone } from "@/lib/contact";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useScrolledPast } from "@/hooks/useScrolledPast";

/**
 * A fixed contact bar for small screens.
 *
 * Deliberately restrained: it stays out of the way until the reader has
 * committed to the page, and it never covers content because the page
 * reserves space for it. Hidden entirely on the contact page, where the same
 * actions are already the main content.
 */
export function MobileContactBar() {
  const pathname = usePathname();
  // Appears once the reader is past the first screen, so it never competes
  // with the hero's own calls to action.
  const visible = useScrolledPast(
    typeof window === "undefined" ? 600 : window.innerHeight * 0.75,
  );

  const wa = whatsappUrl("appointment");
  const tel = telUrl();

  if (pathname === "/contact") return null;
  if (!hasWhatsapp && !hasPhone) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink-950/92 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // Kept out of the tab order while off-screen.
      aria-hidden={!visible}
    >
      <div className="flex items-stretch">
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="flex flex-1 items-center justify-center gap-2 py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory"
          >
            <WhatsAppIcon className="h-4 w-4 text-champagne" />
            WhatsApp
          </a>
        ) : null}

        {tel ? (
          <a
            href={tel}
            tabIndex={visible ? 0 : -1}
            className="flex flex-1 items-center justify-center gap-2 border-l border-hairline py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory"
          >
            <PhoneIcon className="h-4 w-4 text-champagne" />
            Call
          </a>
        ) : null}

        <Link
          href="/contact"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center border-l border-hairline bg-ivory py-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-950"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
