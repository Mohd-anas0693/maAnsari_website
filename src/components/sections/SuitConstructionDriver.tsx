"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { Timeline } from "animejs";
import { constructionLayers } from "@/data/craft";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

const RANGES = constructionLayers.map(({ id, range }) => ({ id, range }));
const SECTION_ID = "how-a-suit-is-made";

/**
 * Drives the suit-construction section.
 *
 * Renders nothing. The markup is server-rendered by `SuitConstruction`; this
 * finds it and animates it, which keeps ten layers, ten captions and all of
 * their copy out of the client bundle.
 *
 * Anime.js is imported dynamically for the same reason. It is the only part
 * of the site that still needs it, the section is well below the fold, and a
 * static import would put the whole engine on the hydration path.
 *
 * Scroll progress never passes through React state — that would re-render on
 * every frame. The stage counter is written straight to its text node, which
 * is what it is: an animation readout, not application state.
 */
export function SuitConstructionDriver() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const seekRef = useRef<((t: Timeline, p: number) => void) | null>(null);
  const counterRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef(-1);

  // Layout effects run before passive effects, so the section is resolved
  // before `useScrollProgress` reads the ref below.
  useLayoutEffect(() => {
    sectionRef.current = document.getElementById(SECTION_ID);
    counterRef.current = document.querySelector<HTMLElement>("[data-stage-counter]");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stack = section.querySelector<HTMLElement>("[data-suit-stack]");
    const captions = section.querySelector<HTMLElement>("[data-suit-captions]");
    if (!stack || !captions) return;

    let cancelled = false;
    let timeline: Timeline | null = null;

    const pick = (root: HTMLElement, attr: string) =>
      new Map(
        constructionLayers
          .map(({ id }) => [id, root.querySelector<HTMLElement>(`[${attr}="${id}"]`)] as const)
          .filter((e): e is [string, HTMLElement] => e[1] !== null),
      );

    void (async () => {
      const mod = await import("@/animations/suitConstruction");
      if (cancelled) return;

      const elements = {
        layers: pick(stack, "data-layer"),
        captions: pick(captions, "data-caption"),
        progressBar: section.querySelector<HTMLElement>("[data-suit-rail]"),
        stack,
      };

      if (prefersReducedMotion()) {
        mod.showConstructionImmediately(elements);
        return;
      }

      timeline = mod.createSuitConstructionTimeline(RANGES, elements);
      timelineRef.current = timeline;
      seekRef.current = mod.seekConstruction;
      // Render frame zero so the first layer is correct before any scrolling.
      mod.seekConstruction(timeline, 0);
    })();

    return () => {
      cancelled = true;
      timeline?.revert();
      timelineRef.current = null;
      seekRef.current = null;
    };
  }, []);

  const onProgress = useCallback((progress: number) => {
    const timeline = timelineRef.current;
    const seek = seekRef.current;
    if (!timeline || !seek) return;

    seek(timeline, progress);

    // Resolve the stage without importing the animation module, so this stays
    // cheap on every frame.
    let next = 0;
    for (let i = RANGES.length - 1; i >= 0; i -= 1) {
      if (progress >= RANGES[i].range[0]) {
        next = i;
        break;
      }
    }
    if (next !== stageRef.current) {
      stageRef.current = next;
      const counter = counterRef.current;
      if (counter) counter.textContent = String(next + 1).padStart(2, "0");
    }
  }, []);

  useScrollProgress(sectionRef, { onProgress });

  return null;
}
