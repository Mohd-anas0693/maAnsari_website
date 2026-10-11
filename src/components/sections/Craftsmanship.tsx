import Link from "next/link";
import { processSteps } from "@/data/craft";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * THE PROCESS
 * Eight stages, written out. Each entrance is staggered against the reader's
 * scroll rather than fired as one block, so the list is read rather than
 * skimmed — but every word is in the HTML from the first byte.
 */
export function Craftsmanship({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative border-t border-hairline py-14 sm:py-14 sm:py-18 lg:py-24"
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
                className="mt-10 hidden border border-hairline lg:block"
                parallax
              />

              {compact ? (
                <Reveal className="mt-8" delay={160}>
                  <Link
                    href="/our-craft"
                    className="group inline-flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-champagne"
                  >
                    Read the full process
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-champagne transition-all duration-300 group-hover:w-10"
                    />
                  </Link>
                </Reveal>
              ) : null}
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {processSteps.map((step, index) => (
              <li key={step.number}>
                <Reveal
                  className={cn(
                    "grid items-baseline gap-x-6 gap-y-2 border-t border-hairline sm:grid-cols-[auto_1fr] sm:gap-x-10",
                    compact ? "py-5 lg:py-6" : "py-9 lg:py-11",
                  )}
                >
                  <p className="font-sans text-[0.75rem] tracking-[0.24em] text-brass tabular-nums">
                    {step.number}
                  </p>
                  <div>
                    <h3
                      className={cn(
                        "font-display leading-none text-ivory",
                        compact
                          ? "text-[1.375rem] sm:text-[1.625rem]"
                          : "text-[1.75rem] sm:text-[2.125rem]",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 font-sans text-[0.9375rem] italic text-champagne/80">
                      {compact ? step.brief : step.summary}
                    </p>
                    {compact ? null : (
                      <p className="prose-editorial mt-5 max-w-[56ch] text-[0.9375rem]">
                        {step.body}
                      </p>
                    )}
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
