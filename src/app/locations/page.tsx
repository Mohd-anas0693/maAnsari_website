import type { Metadata } from "next";
import Link from "next/link";
import { locations, homeLocation } from "@/data/locations";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { LocationSection } from "@/components/sections/LocationSection";
import { buildMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve Across Punjab",
  description:
    "Our studio is in Ludhiana. Customers travel to us from Chandigarh, Mohali, Jalandhar and Amritsar, with visits planned to keep the journey to a minimum.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Areas We Serve", path: "/locations" }]} />

      <PageHero
        eyebrow="Areas We Serve"
        titleLines={["One studio.", "One journey, planned."]}
        lede={`The workshop is in ${homeLocation.city}, and every consultation, fitting and finishing pass happens there. There are no branches, and we will not pretend otherwise.`}
      />

      <section className="shell pb-16 lg:pb-24">
        <Reveal className="prose-editorial max-w-[62ch] text-[1.0625rem]">
          <p>
            What we can offer customers outside {homeLocation.city} is a
            schedule built around the fact that you are travelling: longer
            appointments, stages combined into single visits, and as much
            agreed by phone or WhatsApp beforehand as the garment allows.
          </p>
          <p>
            Each page below says honestly what is available, how many visits to
            expect, and where a commission is worth starting earlier than
            usual.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline">
        <div className="shell">
          <ul>
            {locations.map((location, index) => (
              <li key={location.slug}>
                <Reveal>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="group grid gap-4 border-b border-hairline py-9 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-12"
                  >
                    <span className="flex items-baseline gap-5 lg:col-span-4">
                      <span className="font-sans text-[0.5625rem] tracking-[0.28em] text-brass">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[2rem] leading-none text-ivory transition-colors duration-300 group-hover:text-champagne sm:text-[2.5rem]">
                        {location.city}
                      </span>
                    </span>

                    <span className="lg:col-span-3">
                      <span className="inline-block border border-hairline px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-stone">
                        {location.serviceModel === "studio"
                          ? "Studio location"
                          : "Customers travel in"}
                      </span>
                    </span>

                    <span className="prose-editorial text-[0.9375rem] lg:col-span-4">
                      {location.lede}
                    </span>

                    <span className="lg:col-span-1 lg:justify-self-end">
                      <ArrowIcon className="h-4 w-4 text-brass transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="prose-editorial mt-12 max-w-[62ch] text-[0.9375rem]">
            <p>
              If your city is not listed, that is not a judgement about whether
              we would like to work with you. It means we do not yet have
              anything genuinely useful to say about serving customers from
              there beyond what these pages already cover. Get in touch and we
              will tell you plainly whether a commission is practical.
            </p>
          </Reveal>
        </div>
      </section>

      <LocationSection />
      <CtaBand
        lines={["Travelling in?", "Tell us your dates."]}
        body={`We will combine the stages that can be combined and tell you honestly how many visits to ${homeLocation.city} your commission actually needs.`}
      />
    </>
  );
}
