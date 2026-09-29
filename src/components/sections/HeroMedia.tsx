import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The image at the top of a page.
 *
 * A server component with no JavaScript: its wipe is the CSS `heroMedia`
 * keyframe from globals.css. This matters because an above-the-fold image is
 * usually the Largest Contentful Paint element, and the client-side version
 * of this reveal could not start until React had hydrated — which measured
 * 4.1s on a throttled phone versus 2.4s here.
 *
 * Below the fold, `ImageReveal` remains the right component: it is driven by
 * Anime.js and the viewport, and its cost is paid long after first paint.
 */
export function HeroMedia({
  src,
  alt,
  sizes,
  ratio = "4/5",
  className,
  quality = 80,
}: {
  src: string;
  alt: string;
  sizes: string;
  ratio?: string;
  className?: string;
  quality?: number;
}) {
  return (
    <div
      className={cn(
        "hero-media relative overflow-hidden border border-hairline bg-ink-900",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
    </div>
  );
}
