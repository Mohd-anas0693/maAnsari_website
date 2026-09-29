import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

/**
 * TESTIMONIALS
 * ---------------------------------------------------------------------------
 * Ships empty on purpose. No review is invented, and no Review or
 * AggregateRating structured data is emitted, because fabricated social proof
 * is both dishonest and a Google policy violation.
 *
 * To publish real reviews, add them to `testimonials` below. The section
 * renders the invitation state while the array is empty, and switches to the
 * quotes as soon as there are any.
 */

export interface Testimonial {
  /** The review text, as written by the customer. */
  quote: string;
  /** Attribution, as the customer agreed to it being published. */
  author: string;
  /** Optional context, e.g. "Wedding commission, 2026". */
  context?: string;
}

export const testimonials: Testimonial[] = [];

export function Testimonials() {
  const hasReviews = testimonials.length > 0;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative border-t border-hairline py-24 lg:py-32"
    >
      <div className="shell">
        {hasReviews ? (
          <>
            <SectionHeading
              eyebrow="In Their Words"
              lines={["What customers say."]}
              as="h2"
              className="mb-16 max-w-2xl"
            />
            <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <li key={testimonial.author}>
                  <Reveal className="border-t border-hairline pt-7">
                    <figure>
                      <blockquote className="prose-editorial text-[1.0625rem]">
                        <p>{testimonial.quote}</p>
                      </blockquote>
                      <figcaption className="mt-6">
                        <span className="block font-display text-[1.25rem] text-ivory">
                          {testimonial.author}
                        </span>
                        {testimonial.context ? (
                          <span className="mt-1 block font-sans text-[0.75rem] text-ash">
                            {testimonial.context}
                          </span>
                        ) : null}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <SectionHeading
              eyebrow="In Their Words"
              lines={["Reviews, when they", "are earned."]}
              as="h2"
              className="lg:col-span-6"
            />
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={140}>
              <p className="prose-editorial text-[0.9375rem]">
                We do not publish invented testimonials, and we would rather
                show none than write our own. Customer reviews appear here as
                they are given, with permission and attribution.
                {siteConfig.social.googleBusiness ? (
                  <>
                    {" "}
                    In the meantime, our{" "}
                    <a
                      href={siteConfig.social.googleBusiness}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Business Profile
                    </a>{" "}
                    carries reviews left directly by customers.
                  </>
                ) : null}
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
