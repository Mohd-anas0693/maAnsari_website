import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMedia } from "@/components/sections/HeroMedia";

/**
 * The opening of an inner page. Lighter than the home hero — no full-screen
 * takeover, because a reader who arrived from search wants the content, not
 * a second front door.
 *
 * Server-rendered with the same CSS entrance as the home hero. Nothing above
 * the fold waits for hydration, on any page.
 */
export function PageHero({
  eyebrow,
  titleLines,
  lede,
  image,
  children,
}: {
  eyebrow: string;
  titleLines: string[];
  lede?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <header className="shell pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
          <div className="hero-eyebrow mb-7">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>

          <h1 className="fluid-h2 font-display font-light text-ivory">
            {titleLines.map((line, index) => (
              <span key={index} className="mask-line">
                <span
                  className="hero-word"
                  style={{ animationDelay: `${180 + index * 70}ms` }}
                >
                  {line}
                  {index < titleLines.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h1>

          {lede ? (
            <p className="hero-support prose-editorial mt-8 max-w-[48ch] text-[1.125rem]">
              {lede}
            </p>
          ) : null}

          {children}
        </div>

        {image ? (
          <div className="lg:col-span-4 lg:col-start-9">
            <HeroMedia
              src={image.src}
              alt={image.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
