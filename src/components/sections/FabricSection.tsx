import Link from "next/link";
import { cn } from "@/lib/cn";
import { fabricFamilies } from "@/data/craft";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

/**
 * FABRIC
 * Deliberately no brand names and no claims about mill or provenance —
 * those are facts about a supply chain this site cannot verify. What it can
 * describe honestly is how weave and weight behave.
 */
export function FabricSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="fabric"
      aria-labelledby="fabric-heading"
      className="relative border-t border-hairline bg-ink-900 py-14 sm:py-14 sm:py-18 lg:py-24"
    >
      <div className="shell">
        <div className="mb-16 grid gap-10 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow="Cloth"
            lines={["Chosen by weight,", "weave and season."]}
            as="h2"
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={160}>
            <p className="prose-editorial text-[0.9375rem]">
              {compact
                ? "Weight decides how a suit behaves. Colour only decides how it looks."
                : "Cloth is handled, draped over the shoulder and seen in daylight before it is chosen. How it behaves through a Punjab summer matters more in practice than how it looks on a shelf."}
            </p>
          </Reveal>
        </div>

        <ul
          className={cn(
            "grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12",
            // Four compact families fill one desktop row; six fill two.
            compact ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {(compact ? fabricFamilies.slice(0, 4) : fabricFamilies).map((fabric) => (
            <li key={fabric.name}>
              <ImageReveal
                src={fabric.image.src}
                alt={fabric.image.alt}
                ratio="5/4"
                sizes={compact ? "(min-width: 1024px) 23vw, 46vw" : "(min-width: 1024px) 30vw, 46vw"}
                className="border border-hairline"
              />
              <Reveal className="mt-4 lg:mt-6">
                <h3 className="font-display text-[1.25rem] leading-none text-ivory sm:text-[1.5rem]">
                  {fabric.name}
                </h3>
                <p className="mt-2 font-sans text-[0.8125rem] italic text-champagne/75 sm:text-[0.875rem]">
                  {compact ? fabric.brief : fabric.character}
                </p>
                {compact ? null : (
                  <dl className="mt-3">
                    <dt className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-brass">
                      Best for
                    </dt>
                    <dd className="mt-1.5 font-sans text-[0.8125rem] text-bone sm:text-[0.875rem]">
                      {fabric.bestFor}
                    </dd>
                  </dl>
                )}
                {compact ? null : (
                  <p className="prose-editorial mt-4 text-[0.9375rem]">
                    {fabric.note}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-16">
          <ButtonLink href="/contact" variant="outline" size="base" withRule>
            Discover Your Fabric
          </ButtonLink>
          {compact ? (
            <Link
              href="/our-craft#fabric"
              className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-champagne"
            >
              How each cloth behaves
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
