import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { LocationSection } from "@/components/sections/LocationSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { buildMetadata } from "@/lib/seo";
import { BRAND_NAME, siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "About Our Ludhiana Tailoring House",
  description:
    "The people, the workshop and the philosophy behind our Ludhiana tailoring house — and an honest account of how we work with every customer.",
  path: "/about",
  image: "/images/craft/workshop.webp",
  imageAlt: "The Ludhiana workshop, with benches, cloth and natural light",
});

/**
 * ABOUT
 * ---------------------------------------------------------------------------
 * No years in business, no awards, no celebrity clients, no heritage claims,
 * no team size. None of that has been supplied, and inventing any of it would
 * be the fastest way to make everything else on this site untrustworthy.
 *
 * Sections marked below are placeholders for the owner to complete. Each one
 * is written so the page reads as finished and honest in the meantime.
 */
export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "About", path: "/about" }]} />

      <PageHero
        eyebrow="The House"
        titleLines={["A workshop,", "not a showroom."]}
        lede={`${BRAND_NAME} is a bespoke men's tailoring house in ${siteConfig.address.locality}. What that means in practice is that the person who measures you is working in the same building as the person who cuts your cloth.`}
        image={{
          src: "/images/about/founder.webp",
          alt: "Portrait of the master tailor at the bench",
        }}
      />

      <section className="shell grid gap-12 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal className="prose-editorial text-[1.0625rem]">
            <p>
              We make one thing, and we try to make it properly: clothing cut
              for a specific person rather than for an average of several
              thousand. Suits, jackets, trousers and shirts, measured in person
              and corrected on the body.
            </p>
            <p>
              The commitments we can make are small and concrete. We will tell
              you honestly whether a timeline is realistic. We will say when
              alteration is a better use of your money than a new commission.
              We will tell you when a garment we have made is not right, rather
              than waiting to see whether you notice.
            </p>
            <p>
              And we will not claim anything here that we cannot show you at
              the bench.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={140} className="border border-hairline p-7">
            <p className="eyebrow mb-4">Our position</p>
            <p className="prose-editorial text-[0.9375rem]">
              This page carries no awards, no client list and no claims about
              how long we have been doing this. Those are easy to write and
              impossible for you to check. Judge the work at a first fitting
              instead.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          PLACEHOLDER — THE FOUNDER'S STORY
          Replace with the real account: who started the house, what they
          trained in, and why. Keep it specific and verifiable.
      ------------------------------------------------------------------ */}
      <section className="border-t border-hairline py-12 sm:py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="fluid-h3 font-display font-light text-ivory">
                The founder
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="border border-dashed border-hairline-strong p-7" delay={100}>
              <p className="eyebrow mb-4">To be completed</p>
              <p className="prose-editorial text-[0.9375rem]">
                This is where the founder&rsquo;s story belongs: where they
                trained, who they learned from, and what made them set up on
                their own. Written in the first person it carries far more than
                any adjective could.
              </p>
              <p className="prose-editorial mt-4 text-[0.9375rem]">
                It has been left empty rather than filled with a plausible
                invention. Edit{" "}
                <code className="font-sans text-champagne">
                  src/app/about/page.tsx
                </code>{" "}
                to add it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          PLACEHOLDER — THE WORKSHOP AND TEAM
      ------------------------------------------------------------------ */}
      <section className="border-t border-hairline py-12 sm:py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="fluid-h3 font-display font-light text-ivory">
                The workshop
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ImageReveal
              src="/images/craft/workshop.webp"
              alt="The workshop where cutting, stitching and pressing take place"
              ratio="8/5"
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="border border-hairline"
              parallax
            />
            <Reveal className="mt-8 border border-dashed border-hairline-strong p-7" delay={100}>
              <p className="eyebrow mb-4">To be completed</p>
              <p className="prose-editorial text-[0.9375rem]">
                A description of the workshop and the people in it: who cuts,
                who stitches, who presses, and what each of them is
                particularly good at. Replace the placeholder photography in{" "}
                <code className="font-sans text-champagne">
                  /public/images/craft/
                </code>{" "}
                with real photographs of the bench.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline py-12 sm:py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="fluid-h3 font-display font-light text-ivory">
                Philosophy
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="prose-editorial text-[1.0625rem]" delay={100}>
              <p>
                A suit is not a status object. It is a tool for appearing in
                public as the person you actually are, and it works best when
                nobody can say precisely why it works.
              </p>
              <p>
                That means resisting the things that photograph well and wear
                badly: a jacket cut so close it cannot be moved in, a cloth
                chosen for its hand rather than its behaviour, a silhouette
                borrowed from a season rather than from a body.
              </p>
              <p>
                It also means being direct about limits. Some garments cannot
                be saved by alteration. Some timelines cannot be met without
                cutting the part of the process that matters. Saying so is more
                useful to you than a confident yes.{" "}
                <Link href="/our-craft">See how the work is done</Link>.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />
      <LocationSection />
      <CtaBand />
    </>
  );
}
