import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { generalFaqs } from "@/data/faqs";
import { homeLocation } from "@/data/locations";

export const metadata: Metadata = buildMetadata({
  title: `Book a Fitting in ${homeLocation.city}`,
  description: `Book a fitting at our ${homeLocation.city} tailoring studio. Appointment form, WhatsApp, phone, studio address, opening hours and directions.`,
  path: "/contact",
});

/** Appointment-focused FAQs, drawn from the site-wide set. */
const contactFaqs = generalFaqs.filter((faq) =>
  [
    "How do I book an appointment?",
    "How does a bespoke fitting work?",
    "How many fittings are required?",
    "Can I choose my own fabric?",
    "How long does a custom suit take?",
  ].includes(faq.question),
);

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Contact", path: "/contact" }]} />

      <PageHero
        eyebrow="Contact"
        titleLines={["Book a private", "fitting."]}
        lede="Appointments are preferred over walk-ins, because a first consultation deserves an uninterrupted hour and a fitting needs the room. Tell us the occasion and your dates."
      />

      <AppointmentSection
        eyebrow="Request an appointment"
        lines={["Tell us the", "occasion."]}
      />

      <LocationSection />

      <FaqSection
        faqs={contactFaqs}
        eyebrow="Before you come"
        lines={["What to expect."]}
      />

      <JsonLd data={faqSchema(contactFaqs)} />
    </>
  );
}
