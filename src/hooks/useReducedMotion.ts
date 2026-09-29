"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** On the server, assume reduced motion so nothing is hidden before hydration. */
function getServerSnapshot(): boolean {
  return true;
}

/**
 * Tracks the user's motion preference and keeps tracking it — the setting can
 * change while the page is open, and an animation that ignores that is a
 * worse failure than one that never ran.
 *
 * Built on `useSyncExternalStore` rather than an effect: a media query is
 * external state, and reading it in an effect would render once with the
 * wrong answer and then render again.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Non-reactive read, for use inside animation setup where a hook cannot go. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia(QUERY).matches;
}
