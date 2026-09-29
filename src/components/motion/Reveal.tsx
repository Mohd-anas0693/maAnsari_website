"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { observeInView } from "@/hooks/useInView";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { revealElement, showImmediately } from "@/animations/reveal";

/**
 * Connects an element to the entrance-animation layer.
 *
 * This component contains no animation code. It decides *when* something
 * should animate; `@/animations/reveal` decides *how*.
 *
 * The motion preference is read once, synchronously, inside the effect rather
 * than through a state hook — a hook would render once with the wrong answer
 * and cause a visible flash.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  staggerChildren,
  className,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "rise";
  delay?: number;
  /** Selector for children to stagger instead of moving the container. */
  staggerChildren?: string;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      showImmediately(element);
      return;
    }

    return observeInView(element, () =>
      revealElement(element, { delay, staggerChildren }),
    );
    // Options are fixed per mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} data-reveal={variant} className={className} id={id}>
      {children}
    </Tag>
  );
}
