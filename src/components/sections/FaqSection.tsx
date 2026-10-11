import type { Faq } from "@/data/faqs";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * FAQ
 * Built on native <details>/<summary>: keyboard accessible, announced
 * correctly by screen readers, and fully readable by crawlers with the
 * answers present in the HTML — which is also the condition for emitting
 * FAQPage structured data honestly.
 */
export function FaqSection({
  faqs,
  eyebrow = "Questions",
  lines = ["Before you book."],
  standfirst,
  className,
}: {
  faqs: Faq[];
  eyebrow?: string;
  lines?: string[];
  standfirst?: string;
  className?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className={className ?? "relative border-t border-hairline py-14 sm:py-18 lg:py-24"}
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow={eyebrow}
              lines={lines}
              as="h2"
              size="small"
              standfirst={standfirst ? <p>{standfirst}</p> : undefined}
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <dl>
            {faqs.map((faq) => (
              <Reveal key={faq.question} as="div">
                <details className="group border-t border-hairline">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <dt className="font-display text-[1.25rem] leading-snug text-ivory transition-colors duration-300 group-open:text-champagne sm:text-[1.5rem]">
                      {faq.question}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="relative mt-2.5 block h-3 w-3 shrink-0"
                    >
                      <span className="absolute top-1/2 left-0 block h-px w-3 -translate-y-1/2 bg-brass" />
                      <span className="absolute top-1/2 left-0 block h-px w-3 -translate-y-1/2 rotate-90 bg-brass transition-transform duration-300 group-open:rotate-0" />
                    </span>
                  </summary>
                  <dd className="prose-editorial max-w-[62ch] pb-8 text-[0.9375rem]">
                    {faq.answer}
                  </dd>
                </details>
              </Reveal>
            ))}
          </dl>
          <div className="border-t border-hairline" />
        </div>
      </div>
    </section>
  );
}
