import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { telUrl, displayPhone, whatsappUrl } from "@/lib/contact";
import { siteConfig } from "@/data/site";

export function AppointmentSection({
  defaultService,
  eyebrow = "Appointments",
  lines = ["Book a private", "fitting."],
}: {
  defaultService?: string;
  eyebrow?: string;
  lines?: string[];
}) {
  const tel = telUrl();
  const phone = displayPhone();
  const wa = whatsappUrl("appointment");

  return (
    <section
      id="appointment"
      aria-labelledby="appointment-heading"
      className="relative border-t border-hairline bg-ink-900 py-24 lg:py-32"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow={eyebrow}
              lines={lines}
              as="h2"
              standfirst={
                <p>
                  Tell us the occasion and your dates. We will confirm a time
                  and, if you are commissioning for a wedding, work backwards
                  from your earliest function.
                </p>
              }
            />

            <Reveal className="mt-10 flex flex-col gap-4" delay={220}>
              {tel && phone ? (
                <div>
                  <p className="eyebrow mb-2">Call</p>
                  <a
                    href={tel}
                    className="font-sans text-[1.25rem] font-light tracking-[0.02em] text-ivory tabular-nums transition-colors hover:text-champagne"
                  >
                    {phone}
                  </a>
                </div>
              ) : null}
              {wa ? (
                <div className="mt-2">
                  <p className="eyebrow mb-2">WhatsApp</p>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                  >
                    Ask about suits, or book a fitting
                  </a>
                </div>
              ) : null}
              {siteConfig.openingHours ? (
                <div className="mt-2">
                  <p className="eyebrow mb-2">Studio hours</p>
                  {siteConfig.openingHours.map((entry) => (
                    <p
                      key={entry.label}
                      className="font-sans text-[0.9375rem] text-bone"
                    >
                      {entry.label}
                    </p>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={100}>
            <AppointmentForm defaultService={defaultService} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
