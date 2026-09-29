/**
 * ANIMATION CONSTANTS
 * ---------------------------------------------------------------------------
 * One place for timing and easing so the whole site moves with a single
 * character. Nothing here bounces, overshoots or rotates: the reference is a
 * fashion film, not a title sequence.
 */

export const EASE = {
  /** Long, decelerating. The house default for anything entering. */
  editorial: "outExpo",
  /** Slightly firmer. For smaller elements and staggered groups. */
  silk: "outQuart",
  /** Symmetrical. For things that move and settle, like the hero backdrop. */
  drape: "inOutQuart",
  /** Gentle. For scroll-linked scrubbing where sharp easing reads as jitter. */
  linked: "outSine",
} as const;

export const DURATION = {
  quick: 320,
  base: 620,
  slow: 900,
  cinematic: 1400,
  /** Image wipes. Long enough to read as deliberate, short enough that a
      fast scroller never meets an empty frame. */
  reveal: 900,
  /** The hero backdrop settle, which runs under everything else. It holds
      no text, so its length is free of any LCP cost. */
  backdrop: 1900,
} as const;

export const STAGGER = {
  tight: 45,
  base: 80,
  loose: 130,
} as const;

/** Normalised length of a scroll-linked timeline. Progress maps 0 → this. */
export const SCRUB_LENGTH = 1000;

/**
 * Clears the compositor hint an animation set. Leaving `will-change` on after
 * an element has finished moving costs memory for no benefit.
 */
export function settle(element: Element | null): void {
  if (!element) return;
  (element as HTMLElement).style.willChange = "auto";
  element.setAttribute("data-revealed", "");
}
/** Shared by the hero timeline and the navbar so the two land together
    without either component reaching into the other. */
export const NAV_ENTRANCE_DELAY = 120;
