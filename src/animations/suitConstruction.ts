import { createTimeline, utils, type Timeline } from "animejs";
import { EASE, SCRUB_LENGTH } from "./config";

/**
 * THE SIGNATURE INTERACTION
 * ---------------------------------------------------------------------------
 * A suit assembling layer by layer as the reader scrolls.
 *
 * The timeline is built once, paused, and then *seeked* by scroll progress.
 * It never plays on its own. That is the difference between an animation that
 * happens near a scroll position and one the reader is actually driving.
 *
 * Each layer owns a scroll range. Ranges overlap by design: a layer is still
 * settling as the next begins, which reads as assembly rather than as a
 * sequence of slides.
 *
 * This module knows nothing about React, scroll listeners or the viewport.
 * It is handed elements and returns a seekable timeline.
 */

export interface ConstructionRange {
  id: string;
  range: [number, number];
}

export interface SuitConstructionElements {
  /** Layer images, in stacking order, matched to `ranges` by id. */
  layers: Map<string, HTMLElement>;
  /** Stage captions, matched by id. */
  captions: Map<string, HTMLElement>;
  /** Optional progress indicator scaled from 0 → 1. */
  progressBar: HTMLElement | null;
  /** The whole stack, for a slow settle across the full scroll. */
  stack: HTMLElement | null;
}

export function createSuitConstructionTimeline(
  ranges: ConstructionRange[],
  elements: SuitConstructionElements,
): Timeline {
  const timeline = createTimeline({
    autoplay: false,
    defaults: { ease: EASE.linked },
  });

  const at = (fraction: number) => fraction * SCRUB_LENGTH;

  // The stack drifts very slightly upward across the whole section. Small
  // enough to read as depth rather than as movement.
  if (elements.stack) {
    timeline.add(
      elements.stack,
      {
        translateY: [18, -18],
        duration: SCRUB_LENGTH,
        ease: "linear",
      },
      0,
    );
  }

  ranges.forEach(({ id, range }, index) => {
    const [start, end] = range;
    const layer = elements.layers.get(id);
    const caption = elements.captions.get(id);

    // Each layer occupies the first 70% of its range appearing, then holds.
    const appearDuration = (end - start) * SCRUB_LENGTH * 0.7;

    if (layer) {
      timeline.add(
        layer,
        {
          opacity: [0, 1],
          scale: [1.035, 1],
          duration: appearDuration,
        },
        at(start),
      );
    }

    if (caption) {
      // Captions cross-fade: in at the start of the range, out as the next
      // one arrives. The last caption stays.
      const isLast = index === ranges.length - 1;
      const captionIn = (end - start) * SCRUB_LENGTH * 0.35;

      timeline.add(
        caption,
        {
          opacity: [0, 1],
          translateY: [22, 0],
          duration: captionIn,
        },
        at(start),
      );

      if (!isLast) {
        const nextStart = ranges[index + 1].range[0];
        timeline.add(
          caption,
          {
            opacity: [1, 0],
            translateY: [0, -22],
            duration: Math.max(60, (nextStart - start) * SCRUB_LENGTH * 0.28),
          },
          at(nextStart) - 40,
        );
      }
    }
  });

  if (elements.progressBar) {
    timeline.add(
      elements.progressBar,
      {
        scaleY: [0, 1],
        duration: SCRUB_LENGTH,
        ease: "linear",
      },
      0,
    );
  }

  timeline.pause();
  return timeline;
}

/** Maps 0–1 scroll progress onto the timeline. */
export function seekConstruction(timeline: Timeline, progress: number): void {
  timeline.seek(SCRUB_LENGTH * clamp01(progress));
}

/**
 * Resolves the stage index for a given progress value, so the React layer can
 * update text state without reading from the timeline every frame.
 */
export function stageIndexFor(ranges: ConstructionRange[], progress: number): number {
  const p = clamp01(progress);
  for (let i = ranges.length - 1; i >= 0; i -= 1) {
    if (p >= ranges[i].range[0]) return i;
  }
  return 0;
}

/**
 * Reduced-motion and no-JS fallback: show every layer and let the captions
 * render as an ordinary list in normal document flow.
 */
export function showConstructionImmediately(
  elements: SuitConstructionElements,
): void {
  const layers = Array.from(elements.layers.values());
  const captions = Array.from(elements.captions.values());
  if (layers.length > 0) {
    utils.set(layers, { opacity: 1, scale: 1 });
  }
  if (captions.length > 0) {
    utils.set(captions, { opacity: 1, translateY: 0 });
  }
  if (elements.stack) {
    utils.set(elements.stack, { translateY: 0 });
  }
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}
