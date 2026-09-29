import { animate, onScroll, utils, type JSAnimation } from "animejs";
import { EASE } from "./config";

/**
 * SCROLL-LINKED MOTION
 * ---------------------------------------------------------------------------
 * Uses Anime.js' own ScrollObserver for effects that should track the scroll
 * position continuously, as opposed to entrance animations which fire once.
 *
 * Kept to two effects on purpose. A page where everything moves on scroll is
 * a page where nothing is worth looking at.
 */

export interface ParallaxOptions {
  /** Pixels of travel across the element's full pass through the viewport. */
  distance?: number;
  /** Lerp factor for the scrub. Lower is smoother and laggier. */
  smoothing?: number;
}

/**
 * Moves an element slowly against the scroll direction. Applied to imagery
 * inside a fixed-height frame with `overflow: hidden`, so nothing reflows.
 */
export function attachParallax(
  element: HTMLElement,
  container: HTMLElement,
  { distance = 60, smoothing = 0.25 }: ParallaxOptions = {},
): JSAnimation {
  return animate(element, {
    translateY: [-distance / 2, distance / 2],
    ease: "linear",
    autoplay: onScroll({
      target: container,
      enter: "bottom top",
      leave: "top bottom",
      sync: smoothing,
    }),
  });
}

/**
 * A slow horizontal drift for oversized editorial type. Purely decorative,
 * and skipped entirely when motion is reduced.
 */
export function attachTypeDrift(
  element: HTMLElement,
  container: HTMLElement,
  distance = 90,
): JSAnimation {
  return animate(element, {
    translateX: [distance, -distance],
    ease: "linear",
    autoplay: onScroll({
      target: container,
      enter: "bottom top",
      leave: "top bottom",
      sync: 0.3,
    }),
  });
}

/** Removes any inline transform an attached effect left behind. */
export function detachScrollEffect(
  animation: JSAnimation | null,
  element: HTMLElement | null,
): void {
  animation?.revert();
  if (element) {
    utils.set(element, { translateX: 0, translateY: 0 });
  }
}

/** Shared easing export so components never import easing names directly. */
export { EASE };
