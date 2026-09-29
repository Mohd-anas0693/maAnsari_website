import { animate, stagger, utils, createTimeline, type Timeline } from "animejs";
import { DURATION, EASE, STAGGER } from "./config";

/**
 * NAVIGATION MOTION
 * The full-screen mobile overlay. Kept short — a menu that takes a second to
 * open is a menu that feels broken.
 */

export interface NavOverlayElements {
  panel: HTMLElement;
  /** The sliding curtain behind the links. */
  curtain: HTMLElement | null;
  items: HTMLElement[];
  footer: HTMLElement | null;
}

export function openNavOverlay(elements: NavOverlayElements): Timeline {
  const { panel, curtain, items, footer } = elements;

  utils.set(panel, { opacity: 1, pointerEvents: "auto" });

  const timeline = createTimeline({
    defaults: { ease: EASE.editorial },
  });

  if (curtain) {
    timeline.add(
      curtain,
      {
        translateY: ["-100%", "0%"],
        duration: DURATION.base,
        ease: EASE.drape,
      },
      0,
    );
  }

  if (items.length > 0) {
    timeline.add(
      items,
      {
        opacity: [0, 1],
        translateY: [26, 0],
        duration: DURATION.base,
        delay: stagger(STAGGER.tight),
      },
      220,
    );
  }

  if (footer) {
    timeline.add(
      footer,
      { opacity: [0, 1], translateY: [16, 0], duration: DURATION.base },
      380,
    );
  }

  return timeline;
}

export function closeNavOverlay(
  elements: NavOverlayElements,
  onComplete: () => void,
): void {
  const { panel, curtain, items, footer } = elements;

  const targets = [...items, footer].filter(
    (node): node is HTMLElement => node !== null,
  );

  const finish = () => {
    utils.set(panel, { opacity: 0, pointerEvents: "none" });
    onComplete();
  };

  if (targets.length > 0) {
    animate(targets, {
      opacity: 0,
      translateY: -14,
      duration: DURATION.quick,
      ease: EASE.silk,
    });
  }

  if (curtain) {
    animate(curtain, {
      translateY: "-100%",
      duration: DURATION.base,
      delay: 120,
      ease: EASE.drape,
      onComplete: finish,
    });
    return;
  }

  finish();
}

/** Instant open/close for reduced motion. */
export function setNavOverlayImmediate(
  elements: NavOverlayElements,
  open: boolean,
): void {
  const { panel, curtain, items, footer } = elements;
  utils.set(panel, { opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" });
  if (curtain) utils.set(curtain, { translateY: open ? "0%" : "-100%" });
  const targets = [...items, footer].filter(
    (node): node is HTMLElement => node !== null,
  );
  if (targets.length > 0) {
    utils.set(targets, { opacity: open ? 1 : 0, translateY: 0 });
  }
}
