import Link from "next/link";
import { BRAND_NAME, BRAND_SUFFIX } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * The wordmark is typographic rather than a logo file, so it stays crisp at
 * every size and needs no image request. Replace with an SVG mark here and
 * nothing else in the site changes.
 */
export function Wordmark({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      prefetch={false}
      className={cn(
        "group inline-flex shrink-0 flex-col whitespace-nowrap leading-none",
        className,
      )}
      aria-label={`${BRAND_NAME} — home`}
    >
      <span
        className={cn(
          "font-display font-normal tracking-[0.06em] text-ivory transition-colors duration-300 group-hover:text-champagne",
          compact ? "text-xl" : "text-[1.4rem] sm:text-[1.6rem]",
        )}
      >
        {BRAND_NAME}
      </span>
      <span
        className={cn(
          "font-sans uppercase text-stone transition-all duration-300",
          compact
            ? "text-[0.5rem] tracking-[0.3em] opacity-0 h-0 overflow-hidden"
            : "text-[0.5625rem] tracking-[0.34em] mt-1.5",
        )}
      >
        {BRAND_SUFFIX}
      </span>
    </Link>
  );
}
