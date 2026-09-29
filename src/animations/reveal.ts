import { animate, stagger, utils } from "animejs";
import { DURATION, EASE, STAGGER, settle } from "./config";

/**
 * ENTRANCE ANIMATIONS
 * ---------------------------------------------------------------------------
 * Three reveal modes, chosen by data attribute in the markup:
 *
 *   data-reveal="up" | "rise"   translate + fade
 *   data-reveal-mask            children slide up from behind a clipped edge
 *   data-reveal-clip            a clip-path wipe, for images
 *
 * The functions here take a DOM element and nothing else. They know nothing
 * about React, about when to run, or about what the content is.
 */

export interface RevealOptions {
  delay?: number;
  duration?: number;
  /** Stagger children of the target instead of animating it as one unit. */
  staggerChildren?: string;
}

/** Fade and translate an element into place. */
export function animateReveal(
  element: HTMLElement,
  { delay = 0, duration = DURATION.slow, staggerChildren }: RevealOptions = {},
): void {
  const distance = element.dataset.reveal === "rise" ? 56 : 28;

  if (staggerChildren) {
    const children = Array.from(
      element.querySelectorAll<HTMLElement>(staggerChildren),
    );
    if (children.length > 0) {
      animate(children, {
        opacity: [0, 1],
        translateY: [distance, 0],
        duration,
        delay: stagger(STAGGER.base, { start: delay }),
        ease: EASE.editorial,
        onComplete: () => {
          children.forEach(settle);
          settle(element);
        },
      });
      // The container itself is only a wrapper — show it immediately.
      utils.set(element, { opacity: 1 });
      return;
    }
  }

  animate(element, {
    opacity: [0, 1],
    translateY: [distance, 0],
    duration,
    delay,
    ease: EASE.editorial,
    onComplete: () => settle(element),
  });
}

/**
 * Slides the inner content of a masked element up from behind its own edge.
 * Used for headings, where the effect should read as typesetting rather than
 * as a transition.
 */
export function animateMaskReveal(
  element: HTMLElement,
  { delay = 0, duration = DURATION.cinematic }: RevealOptions = {},
): void {
  const lines = Array.from(
    element.querySelectorAll<HTMLElement>("[data-mask-line]"),
  );
  if (lines.length === 0) return;

  animate(lines, {
    translateY: ["110%", "0%"],
    duration,
    delay: stagger(STAGGER.loose, { start: delay }),
    ease: EASE.editorial,
    onComplete: () => {
      lines.forEach(settle);
      settle(element);
    },
  });
}

/** Wipes an image into view from the bottom edge. */
export function animateClipReveal(
  element: HTMLElement,
  { delay = 0, duration = DURATION.reveal }: RevealOptions = {},
): void {
  animate(element, {
    clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
    duration,
    delay,
    ease: EASE.drape,
    onComplete: () => settle(element),
  });
}

/**
 * Dispatches to the right reveal based on the element's own markup. This is
 * the single entry point the React layer calls.
 */
export function revealElement(element: HTMLElement, options: RevealOptions = {}): void {
  if (element.hasAttribute("data-reveal-mask")) {
    animateMaskReveal(element, options);
    return;
  }
  if (element.hasAttribute("data-reveal-clip")) {
    animateClipReveal(element, options);
    return;
  }
  animateReveal(element, options);
}

/**
 * Makes an element immediately visible without animating. Used when motion is
 * reduced, or when an animation is cancelled mid-flight.
 */
export function showImmediately(element: HTMLElement): void {
  utils.set(element, {
    opacity: 1,
    translateY: 0,
    clipPath: "none",
  });
  const lines = Array.from(
    element.querySelectorAll<HTMLElement>("[data-mask-line]"),
  );
  if (lines.length > 0) {
    utils.set(lines, { translateY: 0, opacity: 1 });
  }
  settle(element);
}
