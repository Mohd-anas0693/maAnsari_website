import { fitPoints } from "@/data/craft";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * WHY FIT MATTERS
 * Written about garments and proportions, never about bodies as problems.
 * A dropped shoulder or a fuller seat is a measurement to cut for, and the
 * copy here says exactly that.
 */
export function CustomFit() {
  return (
    <section
      id="fit"
      aria-labelledby="fit-heading"
      className="relative border-t border-hairline py-24 lg:py-36"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The Fit"
            lines={["Balanced to you,", "not to an average."]}
            as="h2"
            standfirst={
              <p>
                The aim is a comfortable, balanced silhouette that suits your
                proportions. Everyone is asymmetric to some degree. That is a
                set of measurements to cut for, not something to correct.
              </p>
            }
          />
          <ImageReveal
            src="/images/craft/fitting-room.webp"
            alt="A jacket being checked on the body in the fitting room mirror"
            ratio="7/5"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="mt-12 border border-hairline"
            parallax
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl className="grid gap-px sm:grid-cols-2">
            {fitPoints.map((point) => (
              <Reveal
                key={point.title}
                className="border-t border-hairline py-7"
              >
                <dt className="font-display text-[1.375rem] leading-none text-ivory">
                  {point.title}
                </dt>
                <dd className="prose-editorial mt-3.5 max-w-[42ch] text-[0.9375rem]">
                  {point.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
