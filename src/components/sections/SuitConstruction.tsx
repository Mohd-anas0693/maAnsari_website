"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Timeline } from "animejs";
import { constructionLayers } from "@/data/craft";
import {
  createSuitConstructionTimeline,
  seekConstruction,
  showConstructionImmediately,
  stageIndexFor,
  type SuitConstructionElements,
} from "@/animations/suitConstruction";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const RANGES = constructionLayers.map(({ id, range }) => ({ id, range }));

/** Intrinsic size of the layer artwork. Every layer shares this frame. */
const LAYER_WIDTH = 544;
const LAYER_HEIGHT = 700;

/**
 * HOW A SUIT IS MADE
 * ---------------------------------------------------------------------------
 * The reader scrolls; the suit assembles. Each layer of construction appears
 * in the order a tailor would actually build it.
 *
 * Three concerns are kept apart:
 *   - `useScrollProgress` measures how far through the section we are.
 *   - `@/animations/suitConstruction` builds a paused Anime.js timeline.
 *   - This component wires one to the other and owns the markup.
 *
 * The timeline is seeked, never played. The reader is driving it, so pausing
 * mid-scroll leaves the suit half-built, which is the point.
 *
 * Scroll progress does not pass through React state — that would re-render
 * this subtree on every frame. Only the stage number does, and only when it
 * actually changes.
 */
export function SuitConstruction() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const stageRef = useRef(0);

  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const captions = captionsRef.current;
    if (!section || !stack || !captions) return;

    const elements: SuitConstructionElements = {
      layers: new Map(
        constructionLayers
          .map(({ id }) => [id, stack.querySelector<HTMLElement>(`[data-layer="${id}"]`)] as const)
          .filter((entry): entry is [string, HTMLElement] => entry[1] !== null),
      ),
      captions: new Map(
        constructionLayers
          .map(({ id }) => [id, captions.querySelector<HTMLElement>(`[data-caption="${id}"]`)] as const)
          .filter((entry): entry is [string, HTMLElement] => entry[1] !== null),
      ),
      progressBar: railRef.current,
      stack,
    };

    if (prefersReducedMotion()) {
      showConstructionImmediately(elements);
      return;
    }

    const timeline = createSuitConstructionTimeline(RANGES, elements);
    timelineRef.current = timeline;
    // Render frame zero so the first layer is correct before any scrolling.
    seekConstruction(timeline, 0);

    return () => {
      timeline.revert();
      timelineRef.current = null;
    };
  }, []);

  const onProgress = useCallback((progress: number) => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    seekConstruction(timeline, progress);

    const next = stageIndexFor(RANGES, progress);
    if (next !== stageRef.current) {
      stageRef.current = next;
      setStage(next);
    }
  }, []);

  // Attached unconditionally. `onProgress` returns immediately while
  // `timelineRef` is empty — which is the whole time under reduced motion,
  // since no timeline is ever built.
  useScrollProgress(sectionRef, { onProgress });

  const total = String(constructionLayers.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="how-a-suit-is-made"
      aria-labelledby="construction-heading"
      className="construction relative border-t border-hairline bg-ink-950"
      style={
        {
          "--construction-height": "560vh",
          "--construction-height-sm": "420vh",
        } as React.CSSProperties
      }
    >
      <div className="construction__viewport flex flex-col justify-center overflow-hidden">
        {/* Bottom padding on small screens clears the fixed contact bar. */}
        <div className="shell grid w-full gap-6 pt-24 pb-24 sm:pt-20 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-0 lg:pb-0">
          {/* Written introduction. Always present, never behind an animation. */}
          <div className="lg:col-span-4 lg:pr-4">
            <Eyebrow className="mb-4 lg:mb-7">The Making</Eyebrow>
            <h2
              id="construction-heading"
              className="font-display text-[1.75rem] leading-none font-light text-ivory sm:text-[2.25rem] lg:text-[clamp(1.75rem,2.6vw,2.5rem)]"
            >
              How a suit is made
            </h2>
            {/* The standfirst is desktop-only: on a phone the sticky frame
                has to hold the garment and its caption, and this paragraph is
                the least load-bearing thing in it. */}
            <p className="prose-editorial mt-6 hidden max-w-[38ch] text-[0.9375rem] lg:block">
              A jacket is built in layers, in a fixed order, and each one
              depends on the last being right. What follows is the sequence as
              it happens at the bench.
            </p>

            {/* Stage counter and rail — only meaningful while scroll-driven. */}
            <div className="construction__counter mt-4 lg:mt-10">
              <div className="flex items-center gap-4 lg:gap-5">
                <span className="font-sans text-[1.5rem] font-light leading-none text-champagne tabular-nums lg:text-[2.25rem]">
                  {String(stage + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.22em] text-ash">
                  / {total}
                </span>
              </div>
              {/* The rail needs vertical room it does not have on a phone. */}
              <span
                aria-hidden="true"
                className="construction__rail mt-6 h-24 w-px bg-hairline-strong"
              >
                <span
                  ref={railRef}
                  className="block h-full w-full origin-top bg-champagne"
                  style={{ transform: "scaleY(0)" }}
                />
              </span>
            </div>
          </div>

          {/* The layered visual */}
          {/* A flex parent so the stack can be sized by height: as a flex
              item, `width: auto` shrinks to fit the aspect ratio, where a
              block would stretch to the column and shrink the garment. */}
          <div className="flex justify-center lg:col-span-4 lg:order-none">
            <div
              ref={stackRef}
              className="relative h-[min(34svh,17rem)] max-w-full sm:h-[min(42svh,20rem)] lg:h-[min(72svh,36rem)]"
              /* The ratio belongs to the artwork, so it is declared here
                 rather than as a utility class that could drift from it. */
              style={{ aspectRatio: `${LAYER_WIDTH} / ${LAYER_HEIGHT}` }}
              role="img"
              aria-label="An illustration of a suit jacket assembling layer by layer, from cloth to finished garment"
            >
              {/* A soft halo so the dark garment separates from the dark page. */}
              <div
                aria-hidden="true"
                className="absolute -inset-[18%] -z-10"
                style={{
                  background:
                    "radial-gradient(58% 48% at 50% 46%, rgba(180,148,94,0.10) 0%, rgba(180,148,94,0.035) 45%, rgba(10,10,10,0) 72%)",
                }}
              />
              {constructionLayers.map((layer) => (
                <div
                  key={layer.id}
                  data-layer={layer.id}
                  className="construction__layer absolute inset-0"
                >
                  {/*
                    Plain <img> rather than next/image: these are SVGs, which
                    the image optimiser passes through untouched, so routing
                    them through it would add a request for no benefit.
                    Individually decorative — the stack as a whole carries the
                    description, and the captions beside it carry the meaning.
                  */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={layer.asset}
                    alt=""
                    aria-hidden="true"
                    width={LAYER_WIDTH}
                    height={LAYER_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Stage captions. Every one is in the DOM at all times. */}
          <div className="lg:col-span-4 lg:pl-4">
            <div ref={captionsRef} className="construction__captions">
              {constructionLayers.map((layer, index) => (
                <div
                  key={layer.id}
                  data-caption={layer.id}
                  className={cn("construction__caption")}
                >
                  <p className="font-sans text-[0.5625rem] uppercase tracking-[0.3em] text-brass">
                    {String(index + 1).padStart(2, "0")} — {layer.stage}
                  </p>
                  <h3 className="mt-4 font-display text-[1.75rem] leading-[1.1] text-ivory sm:text-[2.125rem]">
                    {layer.statement}
                  </h3>
                  <p className="prose-editorial mt-4 max-w-[38ch] text-[0.9375rem]">
                    {layer.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 hidden lg:mt-12 lg:block">
              <ButtonLink href="/contact" variant="outline" size="base" withRule>
                Book a Private Fitting
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
