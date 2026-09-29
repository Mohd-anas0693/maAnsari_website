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
export function FabricSection() {
  return (
    <section
      id="fabric"
      aria-labelledby="fabric-heading"
      className="relative border-t border-hairline bg-ink-900 py-24 lg:py-36"
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
              Cloth is handled, draped over the shoulder and seen in daylight
              before it is chosen. How it behaves through a Punjab summer
              matters more in practice than how it looks on a shelf.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {fabricFamilies.map((fabric) => (
            <li key={fabric.name}>
              <ImageReveal
                src={fabric.image.src}
                alt={fabric.image.alt}
                ratio="1/1"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                className="border border-hairline"
              />
              <Reveal className="mt-6" delay={60}>
                <h3 className="font-display text-[1.5rem] leading-none text-ivory">
                  {fabric.name}
                </h3>
                <p className="mt-3 font-sans text-[0.875rem] italic text-champagne/75">
                  {fabric.character}
                </p>
                <dl className="mt-4">
                  <dt className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-brass">
                    Best for
                  </dt>
                  <dd className="mt-1.5 font-sans text-[0.875rem] text-bone">
                    {fabric.bestFor}
                  </dd>
                </dl>
                <p className="prose-editorial mt-4 text-[0.9375rem]">
                  {fabric.note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 lg:mt-20" delay={80}>
          <ButtonLink href="/contact" variant="outline" size="large" withRule>
            Discover Your Fabric
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
