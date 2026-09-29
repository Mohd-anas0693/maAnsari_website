import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

/** The closing call to action. Used at the foot of most pages. */
export function CtaBand({
  lines = ["Your suit is not selected.", "It is crafted for you."],
  body = "Bring the occasion, your dates and the way you want to wear it. We will take it from there.",
  primaryLabel = "Book a Private Fitting",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: {
  lines?: string[];
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  const wa = whatsappUrl("appointment");

  return (
    <section className="relative border-t border-hairline py-24 lg:py-32">
      <div className="shell">
        <div className="max-w-4xl">
          <TextReveal
            as="p"
            lines={lines}
            className="fluid-h2 font-display font-light text-ivory"
          />
          <Reveal className="prose-editorial mt-8 max-w-[52ch] text-[1.0625rem]" delay={160}>
            <p>{body}</p>
          </Reveal>
          <Reveal className="mt-11 flex flex-wrap items-center gap-4" delay={260}>
            <ButtonLink href={primaryHref} variant="primary" size="large" withRule>
              {primaryLabel}
            </ButtonLink>
            {secondaryLabel && secondaryHref ? (
              <ButtonLink href={secondaryHref} variant="outline" size="large">
                {secondaryLabel}
              </ButtonLink>
            ) : null}
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-2 py-5 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:text-champagne"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
