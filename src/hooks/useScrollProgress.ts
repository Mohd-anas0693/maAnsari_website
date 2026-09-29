"use client";

import { useEffect, type RefObject } from "react";

/**
 * SCROLL PROGRESS
 * ---------------------------------------------------------------------------
 * Reports how far the viewport has travelled through an element, as 0 → 1.
 *
 * Deliberately callback-based rather than state-based. Storing scroll progress
 * in React state would re-render a subtree on every frame; the animation layer
 * only needs the number, not a render.
 *
 * Reads are batched into a single rAF and only run while the element is in or
 * near the viewport, so an off-screen section costs nothing.
 */

export interface ScrollProgressOptions {
  /** Called with a clamped 0–1 value whenever progress changes. */
  onProgress: (progress: number) => void;
  /** Skip entirely — used to honour reduced-motion without unmounting. */
  disabled?: boolean;
  /** Minimum change required to emit, to avoid pointless work. */
  epsilon?: number;
}

export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { onProgress, disabled = false, epsilon = 0.0015 }: ScrollProgressOptions,
): void {
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    let frame = 0;
    let lastEmitted = -1;
    let active = false;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Total scrollable distance: the element's height beyond one viewport.
      const travel = rect.height - viewportHeight;

      const progress =
        travel <= 0
          ? // Element is shorter than the viewport — fall back to how far it
            // has crossed the screen so the value still moves.
            clamp01((viewportHeight - rect.top) / (viewportHeight + rect.height))
          : clamp01(-rect.top / travel);

      if (Math.abs(progress - lastEmitted) >= epsilon) {
        lastEmitted = progress;
        onProgress(progress);
      }
    };

    const schedule = () => {
      if (frame || !active) return;
      frame = requestAnimationFrame(measure);
    };

    // Only listen while the section is anywhere near the viewport.
    const gate = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    gate.observe(element);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    // Emit once on mount so the visual matches the scroll position on load
    // or after a refresh partway down the page.
    active = true;
    measure();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      gate.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
