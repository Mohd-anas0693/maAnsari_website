import Link from "next/link";
import { siteConfig, formatAddress } from "@/data/site";
import { locations, homeLocation } from "@/data/locations";
import { telUrl, mailtoUrl, displayPhone, whatsappUrl } from "@/lib/contact";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PinIcon, PhoneIcon, ClockIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";

/**
 * LOCATION
 * Everything a Google Business Profile listing needs, in the same order a
 * customer looks for it: where, when, how to get in touch, how to get there.
 * Fields with no configured value are omitted rather than left blank.
 */
export function LocationSection() {
  const tel = telUrl();
  const mail = mailtoUrl("Studio enquiry");
  const phone = displayPhone();
  const wa = whatsappUrl("appointment");
  const travelCities = locations.filter((l) => l.serviceModel !== "studio");

  return (
    <section
      id="visit"
      aria-labelledby="visit-heading"
      className="relative border-t border-hairline py-24 lg:py-32"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Visit"
            lines={[`The studio in`, `${homeLocation.city}.`]}
            as="h2"
            standfirst={
              <p>
                Consultations, fittings and finishing all happen in one place.
                Appointments are preferred so a first consultation gets an
                uninterrupted hour.
              </p>
            }
          />

          <Reveal className="mt-10 flex flex-col gap-6" delay={200}>
            <div className="flex gap-4">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
              <address className="not-italic">
                <p className="font-sans text-[0.9375rem] leading-relaxed text-bone">
                  {formatAddress()}
                </p>
                {siteConfig.mapsUrl ? (
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-sans text-[0.75rem] uppercase tracking-[0.16em] text-champagne underline decoration-champagne/40 underline-offset-4 transition-colors hover:decoration-champagne"
                  >
                    Get directions
                  </a>
                ) : null}
              </address>
            </div>

            {siteConfig.openingHours ? (
              <div className="flex gap-4">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <div>
                  {siteConfig.openingHours.map((entry) => (
                    <p
                      key={entry.label}
                      className="font-sans text-[0.9375rem] text-bone"
                    >
                      {entry.label}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {tel && phone ? (
              <div className="flex gap-4">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <a
                  href={tel}
                  className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                >
                  {phone}
                </a>
              </div>
            ) : null}

            {mail && siteConfig.email ? (
              <div className="flex gap-4">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <a
                  href={mail}
                  className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                >
                  {siteConfig.email}
                </a>
              </div>
            ) : null}

            {wa ? (
              <div className="flex gap-4">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                >
                  Message us on WhatsApp
                </a>
              </div>
            ) : null}
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {siteConfig.mapsEmbedUrl ? (
            <Reveal className="border border-hairline">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                title={`Map showing the location of our studio in ${homeLocation.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-16/11 w-full grayscale-[0.4] contrast-[1.1]"
              />
            </Reveal>
          ) : (
            <Reveal className="flex aspect-16/11 items-center justify-center border border-dashed border-hairline-strong bg-ink-900 p-10 text-center">
              <p className="prose-editorial max-w-[34ch] text-[0.875rem]">
                A Google Maps embed appears here once{" "}
                <code className="font-sans text-champagne">
                  NEXT_PUBLIC_MAPS_EMBED_URL
                </code>{" "}
                is configured. No map is shown rather than a map of the wrong
                place.
              </p>
            </Reveal>
          )}

          <Reveal className="mt-10" delay={120}>
            <h3 className="eyebrow mb-5">Customers travel to us from</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-3">
              {travelCities.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="inline-block border border-hairline px-4 py-2.5 font-sans text-[0.75rem] tracking-[0.06em] text-bone transition-colors duration-300 hover:border-champagne hover:text-champagne"
                  >
                    {location.city}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="prose-editorial mt-5 max-w-[48ch] text-[0.875rem]">
              There is one studio, and it is in {homeLocation.city}. For
              customers travelling in, visits are combined so the journey is
              made as few times as possible.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
