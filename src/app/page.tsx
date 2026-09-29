import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { CollectionGrid } from "@/components/sections/CollectionGrid";
import { SuitConstruction } from "@/components/sections/SuitConstruction";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { FabricSection } from "@/components/sections/FabricSection";
import { WeddingSection } from "@/components/sections/WeddingSection";
import { CustomFit } from "@/components/sections/CustomFit";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { AppointmentSection } from "@/components/sections/AppointmentSection";

import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { generalFaqs } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "Bespoke Men's Tailoring in Ludhiana",
  description:
    "A bespoke men's tailoring house in Ludhiana, Punjab. Custom suits, wedding suits, blazers, trousers and shirts, made to your proportions.",
  path: "/",
  image: "/images/hero/atelier-wide.webp",
  imageAlt: "A finished bespoke suit in the Ludhiana atelier",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <CollectionGrid />
      <SuitConstruction />
      <Craftsmanship />
      <FabricSection />
      <WeddingSection />
      <CustomFit />
      <Testimonials />
      <FaqSection
        faqs={generalFaqs}
        eyebrow="Questions"
        lines={["Before you book."]}
        standfirst="The things people ask most often, answered plainly."
      />
      <LocationSection />
      <AppointmentSection />

      {/* Emitted only because every question and answer above is visible on
          this page, which is the condition for FAQ rich results. */}
      <JsonLd data={faqSchema(generalFaqs)} />
    </>
  );
}
