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
import { CtaBand } from "@/components/sections/CtaBand";

import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { generalFaqs } from "@/data/faqs";
import { allGarmentSynonyms, brandKeywords, keywordsFor } from "@/data/keywords";

/**
 * The six questions a first-time visitor actually asks. The full set lives on
 * the contact and service pages, where there is room for them and where the
 * reader has already shown what they are interested in.
 */
const homeFaqs = generalFaqs.filter((faq) =>
  [
    "How long does a custom suit take?",
    "How does a bespoke fitting work?",
    "Can I choose my own fabric?",
    "Can you make wedding suits for the groom and the wedding party?",
    "Do you provide alterations?",
    "How do I book an appointment?",
  ].includes(faq.question),
);

export const metadata: Metadata = buildMetadata({
  keywords: keywordsFor(
    brandKeywords,
    ["coat pant stitching Ludhiana", "wedding suit tailor", "groom suit Ludhiana"],
    allGarmentSynonyms,
  ),
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
      <SuitConstruction compact />
      {/*
        Compact on the home page. These three sections exist in full on
        /our-craft; repeating every paragraph here made the page 35 screens
        tall on a phone and inflated the React payload the browser has to
        parse before it can respond to anything.
      */}
      <Craftsmanship compact />
      <FabricSection compact />
      <WeddingSection />
      <CustomFit compact />
      <Testimonials />
      <FaqSection
        faqs={homeFaqs}
        eyebrow="Questions"
        lines={["Before you book."]}
        standfirst="The things people ask most often. The rest are answered on the pages they belong to."
      />
      <LocationSection />
      {/*
        The home page closes with a call to action, not the booking form.
        The form is a client component and the most expensive thing on the
        page to hydrate — roughly 150ms of blocking time — and it sat below
        seventeen screens of content, where practically nobody reached it.
        It lives on /contact and on every service page, which is where
        someone ready to book actually is.
      */}
      <CtaBand
        primaryLabel="Book a Private Fitting"
        primaryHref="/contact"
        secondaryLabel="See how we work"
        secondaryHref="/our-craft"
      />

      {/* Emitted only because every question and answer above is visible on
          this page, which is the condition for FAQ rich results. */}
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
