import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * An image in a fixed-ratio frame that wipes into view, with an optional
 * parallax drift.
 *
 * Server-rendered: both the wipe and the drift are CSS scroll-driven
 * animations. The frame carries the named timeline because the inner layer is
 * what moves under parallax.
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
  quality?: number;
}) {
  return (
    <div
      data-reveal-clip
      {...(parallax ? { "data-parallax-frame": "" } : {})}
      className={cn("relative overflow-hidden bg-ink-900", className)}
      style={{ aspectRatio: ratio }}
    >
      <div {...(parallax ? { "data-parallax": "" } : {})} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          loading="lazy"
          className={cn(
            "object-cover",
            // A touch of scale gives the parallax room to move without
            // exposing an edge.
            parallax && "scale-[1.1]",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}
