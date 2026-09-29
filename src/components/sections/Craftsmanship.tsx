import { processSteps } from "@/data/craft";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * THE PROCESS
 * Eight stages, written out. Each entrance is staggered against the reader's
 * scroll rather than fired as one block, so the list is read rather than
 * skimmed — but every word is in the HTML from the first byte.
 */
export function Craftsmanship() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative border-t border-hairline py-24 lg:py-36"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="The Process"
                lines={["From consultation", "to final finish."]}
                as="h2"
                standfirst={
                  <p>
                    Eight stages, in order. Each one exists because skipping it
                    shows up somewhere later, usually in the mirror.
                  </p>
                }
              />
              <ImageReveal
                src="/images/craft/measuring.webp"
                alt="A tailor taking a chest measurement during a first consultation"
                ratio="7/5"
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="mt-12 border border-hairline"
                parallax
              />
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {processSteps.map((step, index) => (
              <li key={step.number}>
                <Reveal
                  className="grid gap-5 border-t border-hairline py-9 sm:grid-cols-[auto_1fr] sm:gap-10 lg:py-11"
                  delay={0}
                >
                  <p className="font-sans text-[0.75rem] tracking-[0.24em] text-brass tabular-nums sm:pt-2">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="font-display text-[1.75rem] leading-none text-ivory sm:text-[2.125rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-[0.9375rem] italic text-champagne/80">
                      {step.summary}
                    </p>
                    <p className="prose-editorial mt-5 max-w-[56ch] text-[0.9375rem]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
                {index === processSteps.length - 1 ? (
                  <div className="border-t border-hairline" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
