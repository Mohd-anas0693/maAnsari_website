import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Marks an element to fade and rise as it scrolls into view.
 *
 * A server component with no JavaScript. The animation is a CSS `view()`
 * timeline declared in globals.css; this only applies the attribute that
 * selects it.
 *
 * It used to be a client component that registered an IntersectionObserver
 * and called into the Anime.js layer. The home page renders 98 of these, and
 * hydrating all of them cost 425ms of blocking time for motion that CSS can
 * drive on the compositor for nothing.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "rise";
  /**
   * Nudges this element later in the sequence, so a heading can land before
   * the paragraph under it. Expressed in milliseconds for readability at the
   * call site, and converted to a shift in the scroll range, capped so a
   * large value cannot push an element past its own entry.
   */
  delay?: number;
  className?: string;
  id?: string;
}) {
  const style =
    delay > 0
      ? ({ "--rv-delay": `${Math.min(delay / 25, 12)}%` } as CSSProperties)
      : undefined;

  return (
    <Tag data-reveal={variant} className={className} id={id} style={style}>
      {children}
    </Tag>
  );
}
