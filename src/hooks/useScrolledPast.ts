"use client";

import { useSyncExternalStore } from "react";

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * Scroll position is external state, so it is read through
 * `useSyncExternalStore` rather than mirrored into an effect. That avoids the
 * extra render an effect-based version performs on mount, and keeps the
 * server and first client render in agreement.
 */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    // The server cannot know the scroll position; assume the top of the page,
    // which is where a fresh navigation starts.
    () => false,
  );
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
