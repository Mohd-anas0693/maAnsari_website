"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeInView } from "@/hooks/useInView";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { animateMaskReveal, showImmediately } from "@/animations/reveal";
import { cn } from "@/lib/cn";

/**
 * A heading whose lines rise from behind their own baseline.
 *
 * Lines are real text nodes in the server-rendered HTML — nothing is injected
 * on the client, so crawlers and screen readers see the complete heading
 * whether or not the animation ever runs.
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      showImmediately(element);
      return;
    }

    return observeInView(element, () => animateMaskReveal(element, { delay }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} id={id} data-reveal-mask className={className}>
      {lines.map((line, index) => (
        <span key={index} className={cn("mask-line", lineClassName)}>
          <span data-mask-line>
            {line}
            {/* A trailing space keeps the accessible text readable when a
                screen reader concatenates the lines. */}
            {index < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Splits a sentence into lines at a marker, for convenience in content. */
export function splitLines(text: string, marker = " / "): string[] {
  return text.split(marker).map((line) => line.trim()).filter(Boolean);
}

export type { ReactNode };
