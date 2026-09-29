import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, getLocation, homeLocation } from "@/data/locations";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/sections/FaqSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/icons";

/** Only cities with real, distinct content exist as routes. */
export function generateStaticParams() {
  return locations.map((location) => ({ city: location.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/locations/[city]">,
): Promise<Metadata> {
  const { city } = await props.params;
  const location = getLocation(city);
  if (!location) return {};

  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default async function LocationPage(
  props: PageProps<"/locations/[city]">,
) {
  const { city } = await props.params;
  const location = getLocation(city);
  if (!location) notFound();

  const isStudio = location.serviceModel === "studio";

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Areas We Serve", path: "/locations" },
          { name: location.city, path: `/locations/${location.slug}` },
        ]}
      />

      <PageHero
        eyebrow={`${location.city}, ${location.region}`}
        titleLines={splitTitle(location.title)}
        lede={location.lede}
      />

      <section className="shell grid gap-12 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal className="prose-editorial text-[1.0625rem]">
            {location.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={140} className="border border-hairline p-7">
            <p className="eyebrow mb-4">How we serve you</p>
            <p className="font-display text-[1.5rem] leading-tight text-ivory">
              {isStudio
                ? "The studio is here."
                : `The studio is in ${homeLocation.city}.`}
            </p>
            <p className="prose-editorial mt-4 text-[0.9375rem]">
              {isStudio
                ? "Consultation, measuring, cutting, fittings and finishing all happen at one bench."
                : `There is no branch in ${location.city}. Commissions are made at the ${homeLocation.city} studio, with visits planned to keep the journey to a minimum.`}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="shell grid gap-8 border-b border-hairline py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="fluid-h3 font-display font-light text-ivory">
                {location.availability.heading}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="prose-editorial text-[1.0625rem]" delay={100}>
              {location.availability.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="shell grid gap-8 border-b border-hairline py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="fluid-h3 font-display font-light text-ivory">
                {isStudio ? "Finding us" : "Getting here"}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="prose-editorial text-[1.0625rem]" delay={100}>
              {location.gettingHere.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Reveal>

            {location.nearbyAreas ? (
              <Reveal className="mt-10" delay={160}>
                <h3 className="eyebrow mb-5">{location.nearbyAreas.heading}</h3>
                <ul className="flex flex-wrap gap-2.5">
                  {location.nearbyAreas.areas.map((area) => (
                    <li
                      key={area}
                      className="border border-hairline px-3.5 py-2 font-sans text-[0.8125rem] text-bone"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="prose-editorial mt-5 max-w-[52ch] text-[0.875rem]">
                  {location.nearbyAreas.note}
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <FaqSection
        faqs={location.faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
        eyebrow="Questions"
        lines={[`From ${location.city}.`]}
      />

      <section
        aria-labelledby="loc-related"
        className="border-t border-hairline py-20 lg:py-24"
      >
        <div className="shell">
          <h2 id="loc-related" className="eyebrow mb-10">
            Continue
          </h2>
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {location.related.map((link) => (
              <li key={link.href}>
                <Reveal>
                  <Link
                    href={link.href}
                    className="group flex h-full flex-col justify-between gap-6 border-t border-hairline py-7 pr-6"
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
        eyebrow="Appointments"
        lines={["Book a", "consultation."]}
      />
      <CtaBand />

      <JsonLd data={faqSchema(location.faqs)} />
    </>
  );
}

function splitTitle(title: string): string[] {
  const words = title.split(" ");
  if (words.length < 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
