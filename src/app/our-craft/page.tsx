import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { SuitConstruction } from "@/components/sections/SuitConstruction";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { FabricSection } from "@/components/sections/FabricSection";
import { CustomFit } from "@/components/sections/CustomFit";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "How a Bespoke Suit Is Made",
  description:
    "The tailoring process from consultation to final finish: pattern drafting, cutting, canvas and construction, fabric selection and how fit is actually achieved.",
  path: "/our-craft",
  image: "/images/craft/stitching.webp",
  imageAlt: "Hand-padding the lapel canvas at the tailor's bench",
});

export default function OurCraftPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Our Craft", path: "/our-craft" }]} />

      <PageHero
        eyebrow="Our Craft"
        titleLines={["Everything that", "happens before", "you wear it."]}
        lede="A jacket is built in layers, in a fixed order, and each one depends on the last being right. This is the whole sequence, written out."
        image={{
          src: "/images/craft/pattern-drafting.webp",
          alt: "Chalk, measuring tape and a paper pattern on the cutting table",
        }}
      />

      <section className="shell pb-16 lg:pb-20">
        <Reveal className="prose-editorial max-w-[64ch] text-[1.0625rem]">
          <p>
            Most of what makes a garment good is invisible once it is finished.
            The canvas that shapes the chest, the balance that decides whether
            a jacket hangs level, the pitch that stops a sleeve twisting — none
            of it announces itself. You notice its absence, not its presence.
          </p>
          <p>
            What follows is not a marketing description of a process. It is the
            process: what happens, in what order, and why each step exists.
          </p>
        </Reveal>
      </section>

      <SuitConstruction />
      <Craftsmanship />
      <FabricSection />
      <CustomFit />

      <CtaBand
        lines={["See it happen", "at the bench."]}
        body="A consultation starts with the occasion and ends with cloth in your hands. Bring your dates and we will plan backwards from them."
        secondaryLabel="Explore bespoke tailoring"
        secondaryHref="/bespoke-tailoring"
      />
    </>
  );
}
