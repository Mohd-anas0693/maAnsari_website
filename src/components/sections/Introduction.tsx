import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The editorial introduction. Entirely server-rendered prose — the animation
 * only changes when it appears, never whether it exists.
 */
export function Introduction() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative border-t border-hairline py-14 sm:py-14 sm:py-18 lg:py-24"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal className="mb-8">
            <Eyebrow>The Philosophy</Eyebrow>
          </Reveal>

          <TextReveal
            as="h2"
            id="intro-heading"
            lines={["The difference", "is in the fit."]}
            className="fluid-h2 font-display font-light text-ivory"
          />

          <Reveal className="mt-10" delay={200}>
            <Link
              href="/bespoke-tailoring"
              className="group inline-flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-champagne"
            >
              How bespoke works
              <span
                aria-hidden="true"
                className="h-px w-6 bg-champagne transition-all duration-300 group-hover:w-10"
              />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="prose-editorial text-[1.0625rem]" delay={120}>
            <p>
              Two men with the same chest measurement rarely need the same
              jacket. One carries his weight forward, the other stands square.
              One has a shoulder that sits lower than the other, as most people
              do. A garment cut to an average accommodates neither, and the
              alterations that follow only move the problem somewhere less
              obvious.
            </p>
            <p>
              Bespoke reverses the order of operations.{" "}
              <strong>
                The body is measured first, the pattern is made second, and the
                cloth is cut to that pattern.
              </strong>{" "}
              Shoulder slope, front and back balance, sleeve pitch and trouser
              rise are resolved on paper, where a correction costs nothing but a
              pencil line.
            </p>
            <p>
              What follows is a sequence of decisions rather than a purchase:
              cloth chosen by weight and weave against the season it will be
              worn in, silhouette settled against your frame, details specified
              rather than inherited. Then the garment is fitted on your body,
              standing and seated, in the shoes you will actually wear, and it
              is opened, corrected and remade. That step is the whole point,
              and it is the one a ready-made garment can never offer.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px border-t border-hairline sm:grid-cols-3">
            {[
              { label: "Measured", value: "In person" },
              { label: "Fittings", value: "Typically two" },
              { label: "Cut", value: "To your pattern" },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 120} className="pt-6">
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.3em] text-brass">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-[1.5rem] leading-none text-ivory">
                  {item.value}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
