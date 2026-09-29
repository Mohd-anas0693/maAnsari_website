"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { observeInView } from "@/hooks/useInView";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { animateClipReveal, showImmediately } from "@/animations/reveal";
import { attachParallax, detachScrollEffect } from "@/animations/scroll";
import { cn } from "@/lib/cn";
import type { JSAnimation } from "animejs";

/**
 * An image in a fixed-ratio frame that wipes into view, with an optional
 * parallax drift driven by Anime.js' scroll observer.
 *
 * The frame has an intrinsic aspect ratio, so the layout is reserved before
 * the image loads and the reveal costs nothing in layout shift.
 */
export function ImageReveal({
  src,
  alt,
  ratio = "4/5",
  sizes,
  className,
  imageClassName,
  parallax = false,
  eager = false,
  delay = 0,
  quality,
}: {
  src: string;
  alt: string;
  /** CSS aspect-ratio value. */
  ratio?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  parallax?: boolean;
  /** Only the LCP image should set this. */
  eager?: boolean;
  delay?: number;
  quality?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame) return;

    if (prefersReducedMotion()) {
      showImmediately(frame);
      return;
    }

    const stopObserving = observeInView(frame, () =>
      animateClipReveal(frame, { delay }),
    );

    let drift: JSAnimation | null = null;
    if (parallax && inner) {
      drift = attachParallax(inner, frame, { distance: 56 });
    }

    return () => {
      stopObserving();
      detachScrollEffect(drift, inner);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={frameRef}
      data-reveal-clip
      className={cn("relative overflow-hidden bg-ink-900", className)}
      style={{ aspectRatio: ratio }}
    >
      <div ref={innerRef} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className={cn(
            "object-cover",
            // A touch of scale gives the parallax room to move without
            // exposing an edge.
            parallax && "scale-[1.12]",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}
