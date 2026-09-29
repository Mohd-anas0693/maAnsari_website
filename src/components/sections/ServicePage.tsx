import Link from "next/link";
import type { Service } from "@/data/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { ArrowIcon } from "@/components/ui/icons";

/**
 * One template, driven entirely by `@/data/services`.
 *
 * This is not a doorway pattern: each service carries its own unique
 * prose, its own specification table, its own questions and its own outbound
 * links. The template only decides where those sit on the page.
 */
export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: service.navLabel, path: service.href }]} />

      <PageHero
        eyebrow={service.eyebrow}
        titleLines={splitTitle(service.title)}
        lede={service.lede}
        image={service.image}
      />

      {/* Introduction */}
      <section className="shell grid gap-12 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal className="prose-editorial text-[1.0625rem]">
            {service.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={140}>
            <h2 className="eyebrow mb-6">At a glance</h2>
            <dl className="border-t border-hairline">
              {service.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-4"
                >
                  <dt className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-ash">
                    {spec.label}
                  </dt>
                  <dd className="font-sans text-[0.9375rem] text-bone">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Body sections */}
      <div className="border-t border-hairline">
        {service.sections.map((section, index) => (
          <section
            key={section.heading}
            className="shell grid gap-8 border-b border-hairline py-16 lg:grid-cols-12 lg:gap-12 lg:py-24"
          >
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-sans text-[0.5625rem] uppercase tracking-[0.3em] text-brass">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="fluid-h3 mt-5 font-display font-light text-ivory">
                  {section.heading}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal className="prose-editorial text-[1.0625rem]" delay={100}>
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </Reveal>

              {section.points ? (
                <dl className="mt-10 grid gap-px">
                  {section.points.map((point) => (
                    <Reveal
                      key={point.term}
                      className="border-t border-hairline py-6"
                    >
                      <dt className="font-display text-[1.375rem] leading-none text-ivory">
                        {point.term}
                      </dt>
                      <dd className="prose-editorial mt-3 max-w-[56ch] text-[0.9375rem]">
                        {point.detail}
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <FaqSection
        faqs={service.faqs}
        eyebrow="Questions"
        lines={["What people ask."]}
      />

      {/* Internal links, with descriptive anchors and context */}
      <section
        aria-labelledby="related-heading"
        className="border-t border-hairline py-20 lg:py-28"
      >
        <div className="shell">
          <h2 id="related-heading" className="eyebrow mb-10">
            Continue
          </h2>
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {service.related.map((link) => (
              <li key={link.href}>
                <Reveal>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col justify-between gap-6 border-t border-hairline py-7 pr-6 transition-colors duration-300"
                  >
                    <span>
                      <span className="block font-display text-[1.5rem] leading-none text-ivory transition-colors duration-300 group-hover:text-champagne">
                        {link.label}
                      </span>
                      <span className="prose-editorial mt-3 block max-w-[36ch] text-[0.9375rem]">
                        {link.note}
                      </span>
                    </span>
                    <ArrowIcon className="h-4 w-4 text-brass transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppointmentSection
        defaultService={service.appointmentService}
        eyebrow="Appointments"
        lines={["Start with a", "consultation."]}
      />

      <CtaBand />

      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.metaDescription,
            path: service.href,
          }),
          faqSchema(service.faqs),
        ]}
      />
    </>
  );
}

/** Splits a short page title into two lines when it has more than one word. */
function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 3) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
