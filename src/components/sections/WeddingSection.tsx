import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const OCCASIONS = [
  {
    title: "Engagement",
    body: "The least formal of the functions and the most personal. A strong blazer with contrasting trousers gives you something you will wear long after.",
  },
  {
    title: "Ceremony",
    body: "The most photographed and the most formal. A three-piece in a considered cloth, cut precisely, and judged in daylight as much as in the mirror.",
  },
  {
    title: "Reception",
    body: "Evening light, long hours and movement. Deeper tones and a cloth that holds its crease through the night.",
  },
  {
    title: "Wedding Party",
    body: "Brothers, friends and family coordinated as one project, with grouped fittings so anyone travelling in comes once rather than three times.",
  },
];

/**
 * WEDDINGS
 * Sophisticated rather than themed: no marigolds, no red-and-gold palette.
 * The Indian wedding context is carried by the content — the functions, the
 * seasons, the travel — not by decoration.
 */
export function WeddingSection() {
  return (
    <section
      id="weddings"
      aria-labelledby="weddings-heading"
      className="relative border-t border-hairline bg-ink-900 py-24 lg:py-36"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Weddings"
              lines={["Several functions.", "One plan."]}
              as="h2"
              standfirst={
                <p>
                  An Indian wedding is not one event, and a groom is rarely
                  dressed for only one. We map the functions first, then work
                  backwards from the earliest date so that nothing is rushed.
                </p>
              }
            />

            <Reveal className="mt-10 flex flex-wrap gap-4" delay={240}>
              <ButtonLink href="/wedding-suits" variant="primary" withRule>
                Plan Your Wedding Look
              </ButtonLink>
              <ButtonLink
                href="/journal/how-to-choose-a-wedding-suit-in-ludhiana"
                variant="ghost"
              >
                Read the groom&rsquo;s guide
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ImageReveal
              src="/images/collections/wedding-suit.webp"
              alt="An ivory three-piece wedding suit prepared for a groom's final fitting"
              ratio="16/11"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="border border-hairline"
              parallax
            />

            <dl className="mt-10 grid gap-px sm:grid-cols-2">
              {OCCASIONS.map((occasion) => (
                <Reveal
                  key={occasion.title}
                  className="border-t border-hairline py-6"
                >
                  <dt className="font-display text-[1.375rem] leading-none text-ivory">
                    {occasion.title}
                  </dt>
                  <dd className="prose-editorial mt-3 max-w-[40ch] text-[0.9375rem]">
                    {occasion.body}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal className="mt-10" delay={80}>
              <p className="prose-editorial text-[0.9375rem]">
                Some grooms want the length and formality of traditional Indian
                formalwear with the structure of a tailored jacket. That is a
                legitimate middle ground and we treat it as a tailoring problem.
                Where a specialist in traditional garments is the better answer,
                we will say so. Read more about{" "}
                <Link href="/wedding-suits">wedding and groom tailoring</Link>{" "}
                or about{" "}
                <Link href="/three-piece-suits">three-piece suits</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
