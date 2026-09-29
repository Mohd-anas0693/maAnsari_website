import Link from "next/link";
import {
  footerNav,
  siteConfig,
  BRAND_NAME,
  BRAND_SUFFIX,
  formatAddress,
} from "@/data/site";
import { locations } from "@/data/locations";
import { whatsappUrl, telUrl, mailtoUrl, displayPhone } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  const wa = whatsappUrl("general");
  const tel = telUrl();
  const mail = mailtoUrl("Tailoring enquiry");
  const phone = displayPhone();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-ink-950">
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity and contact */}
          <div className="lg:col-span-4">
            <p className="font-display text-[1.75rem] leading-none text-ivory">
              {BRAND_NAME}
            </p>
            <p className="mt-2 font-sans text-[0.5625rem] uppercase tracking-[0.34em] text-stone">
              {BRAND_SUFFIX}
            </p>

            <p className="prose-editorial mt-7 max-w-[34ch] text-[0.9375rem]">
              A bespoke men&rsquo;s tailoring house in {siteConfig.address.locality},{" "}
              {siteConfig.address.region}. Suits, blazers, trousers and shirts,
              measured and finished for the way you wear them.
            </p>

            <address className="mt-8 not-italic">
              <p className="font-sans text-[0.875rem] leading-relaxed text-bone">
                {formatAddress()}
              </p>
              <div className="mt-4 flex flex-col gap-1.5">
                {tel && phone ? (
                  <a
                    href={tel}
                    className="font-sans text-[0.875rem] text-bone transition-colors hover:text-champagne"
                  >
                    {phone}
                  </a>
                ) : null}
                {mail && siteConfig.email ? (
                  <a
                    href={mail}
                    className="font-sans text-[0.875rem] text-bone transition-colors hover:text-champagne"
                  >
                    {siteConfig.email}
                  </a>
                ) : null}
              </div>
            </address>

            {siteConfig.openingHours ? (
              <div className="mt-6">
                <p className="eyebrow mb-2">Studio Hours</p>
                {siteConfig.openingHours.map((entry) => (
                  <p
                    key={entry.label}
                    className="font-sans text-[0.875rem] text-bone"
                  >
                    {entry.label}
                  </p>
                ))}
              </div>
            ) : null}

            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 border border-hairline-strong px-5 py-3.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            ) : null}
          </div>

          {/* Link columns and areas served share the right two-thirds. */}
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:grid-cols-4">
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="eyebrow mb-6">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-[0.875rem] text-bone transition-colors duration-300 hover:text-champagne"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Areas served */}
            <div>
              <h2 className="eyebrow mb-6">Areas Served</h2>
              <ul className="flex flex-col gap-3">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="font-sans text-[0.875rem] text-bone transition-colors duration-300 hover:text-champagne"
                    >
                      {location.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[0.75rem] text-ash">
            &copy; {year} {BRAND_NAME} {BRAND_SUFFIX}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {siteConfig.social.instagram ? (
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-champagne"
              >
                Instagram
              </a>
            ) : null}
            {siteConfig.social.facebook ? (
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-champagne"
              >
                Facebook
              </a>
            ) : null}
            <Link
              href="/journal"
              className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-champagne"
            >
              Journal
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-champagne"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
