import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { AppointmentSection } from "@/components/sections/AppointmentSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/icons";
import { indianFormalTerms, keywordsFor, occasionKeywords } from "@/data/keywords";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Bandhgala & Indian Formalwear Tailoring",
    description:
      "Bandhgala, Jodhpuri suits, Nehru jackets, indo-western and tuxedos tailored in Ludhiana — and a straight answer on the garments we do not make.",
    path: "/indian-formalwear",
    image: "/images/collections/wedding-suit.webp",
    imageAlt: "A structured closed-neck bandhgala jacket on a tailor's form",
  }),
  keywords: keywordsFor(
    [
      "bandhgala tailor",
      "bandhgala stitching Ludhiana",
      "jodhpuri suit",
      "jodhpuri coat tailor",
      "nehru jacket stitching",
      "indo western for groom",
      "tuxedo tailor Ludhiana",
      "safari suit stitching",
      "mandarin collar suit",
      "closed neck jacket",
      "sherwani alternative",
    ],
    occasionKeywords,
  ),
};

/**
 * INDIAN FORMALWEAR
 * ---------------------------------------------------------------------------
 * The garments customers in Punjab ask for by name, answered one at a time.
 *
 * Two of the answers are "no". That is the point of the page: someone
 * searching for a sherwani tailor deserves to find out in one screen that
 * this is not the right bench, rather than through a wasted appointment. A
 * page that implied yes would rank for the term and convert nothing.
 *
 * Every claim here comes from `handled` in `src/data/keywords.ts`, which is
 * the one place to correct them.
 */
export default function IndianFormalwearPage() {
  const made = indianFormalTerms.filter((t) => t.handled);
  const notMade = indianFormalTerms.filter((t) => !t.handled);

  const faqs = indianFormalTerms.map((t) => ({
    question: t.question,
    answer: t.answer,
  }));

  return (
    <>
      <Breadcrumbs
        trail={[{ name: "Indian Formalwear", path: "/indian-formalwear" }]}
      />

      <PageHero
        eyebrow="Asked For By Name"
        titleLines={["Bandhgala, Jodhpuri", "and what we don't make."]}
        lede="Customers arrive asking for a specific garment, often in a word a Western tailoring glossary never uses. Here is what each one is, and whether this is the right bench for it."
        image={{
          src: "/images/collections/wedding-suit.webp",
          alt: "A closed-neck bandhgala jacket, cut and canvassed on a tailor's form",
        }}
      />

      <section className="shell pb-12 lg:pb-16">
        <Reveal className="prose-editorial max-w-[64ch] text-[1.0625rem]">
          <p>
            The line that matters is not Indian versus Western. It is whether a
            garment is built from structure or from surface. A bandhgala is a
            structured jacket with a different collar and a higher closure, and
            that is exactly what a tailoring bench does. An embroidered
            sherwani is a piece of surface craft that happens to be shaped like
            a coat, and a specialist in that work will always do it better.
          </p>
          <p>
            We would rather tell you which side of that line your garment falls
            on before you book than after.
          </p>
        </Reveal>
      </section>

      {/* What we make ---------------------------------------------------- */}
      <section
        aria-labelledby="made-heading"
        className="border-t border-hairline py-12 sm:py-16 lg:py-20"
      >
        <div className="shell">
          <h2 id="made-heading" className="eyebrow mb-10">
            Garments we tailor
          </h2>
          <dl>
            {made.map((term) => (
              <Reveal
                key={term.name}
                className="grid gap-3 border-t border-hairline py-7 lg:grid-cols-12 lg:gap-10 lg:py-9"
              >
                <dt className="lg:col-span-4">
                  <span className="block font-display text-[1.625rem] leading-none text-ivory sm:text-[2rem]">
                    {term.name}
                  </span>
                  <span className="mt-3 block font-sans text-[0.8125rem] leading-relaxed text-ash">
                    Also called {term.alsoCalled.join(", ")}
                  </span>
                </dt>
                <dd className="prose-editorial max-w-[58ch] text-[0.9375rem] lg:col-span-7 lg:col-start-6">
                  {term.answer}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* What we don't ---------------------------------------------------- */}
      <section
        aria-labelledby="not-made-heading"
        className="border-t border-hairline bg-ink-900 py-12 sm:py-16 lg:py-20"
      >
        <div className="shell">
          <h2
            id="not-made-heading"
            className="fluid-h3 mb-4 font-display font-light text-ivory"
          >
            What we don&rsquo;t make
          </h2>
          <p className="prose-editorial mb-10 max-w-[58ch] text-[0.9375rem]">
            Said plainly, because a wasted visit costs you more than it costs
            us.
          </p>
          <dl>
            {notMade.map((term) => (
              <Reveal
                key={term.name}
                className="grid gap-3 border-t border-hairline py-7 lg:grid-cols-12 lg:gap-10 lg:py-9"
              >
                <dt className="lg:col-span-4">
                  <span className="block font-display text-[1.625rem] leading-none text-ivory sm:text-[2rem]">
                    {term.name}
                  </span>
                  <span className="mt-3 block font-sans text-[0.8125rem] leading-relaxed text-ash">
                    Also called {term.alsoCalled.join(", ")}
                  </span>
                </dt>
                <dd className="prose-editorial max-w-[58ch] text-[0.9375rem] lg:col-span-7 lg:col-start-6">
                  {term.answer}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Internal links --------------------------------------------------- */}
      <section
        aria-labelledby="formal-related"
        className="border-t border-hairline py-12 sm:py-16 lg:py-20"
      >
        <div className="shell">
          <h2 id="formal-related" className="eyebrow mb-10">
            Continue
          </h2>
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Wedding and groom suits",
                href: "/wedding-suits",
                note: "Planning a groom's wardrobe across the ceremony, reception and engagement.",
              },
              {
                label: "Three-piece suits",
                href: "/three-piece-suits",
                note: "The waistcoat configuration most often chosen for a ceremony.",
              },
              {
                label: "Bespoke tailoring",
                href: "/bespoke-tailoring",
                note: "How the pattern, the fittings and the finishing work.",
              },
            ].map((link) => (
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
        defaultService="Wedding Suit"
        eyebrow="Appointments"
        lines={["Bring the garment", "you have in mind."]}
      />
      <CtaBand />

      <JsonLd
        data={[
          serviceSchema({
            name: "Indian formalwear tailoring",
            description:
              "Bandhgala, Jodhpuri suits, Nehru jackets, indo-western formalwear and tuxedos, cut and fitted to measure.",
            path: "/indian-formalwear",
          }),
          faqSchema(faqs),
        ]}
      />
    </>
  );
}
