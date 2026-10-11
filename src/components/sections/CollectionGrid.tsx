import Link from "next/link";
import { collections } from "@/data/collections";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * SIGNATURE COLLECTIONS
 * An asymmetric editorial grid rather than a row of equal cards. The `span`
 * on each collection decides its weight, so the rhythm is set in the content
 * layer and the component simply honours it.
 */
/**
 * Six of the seven categories. The grid is six columns wide, so one wide tile
 * plus one standard fills the first row and three standard fill the second —
 * a seventh tile would open a third row to hold a single item. Corporate
 * suits and custom trousers are reachable from the navigation, the footer and
 * the suits page, which is where someone looking for them actually goes.
 */
const shown = collections.filter(
  (c) => !["corporate-suits", "custom-trousers"].includes(c.slug),
);

export function CollectionGrid() {
  return (
    <section
      aria-labelledby="collections-heading"
      className="relative border-t border-hairline py-14 sm:py-14 sm:py-18 lg:py-24"
    >
      <div className="shell">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow="Signature Collections"
            lines={["What we make."]}
            as="h2"
            className="max-w-2xl"
          />
          <Reveal delay={180} className="shrink-0">
            <p className="prose-editorial max-w-[38ch] text-[0.9375rem]">
              Every commission begins the same way and ends somewhere
              different. Start where your occasion is.
            </p>
            <Link
              href="/suits"
              className="group mt-5 inline-flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-champagne"
            >
              See everything we tailor
              <span
                aria-hidden="true"
                className="h-px w-6 bg-champagne transition-all duration-300 group-hover:w-10"
              />
            </Link>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-16">
          {shown.map((collection, index) => (
            <li
              key={collection.slug}
              className={cn(
                // A wide tile spans the full width at every breakpoint.
                collection.span === "wide" && "col-span-2 lg:col-span-4",
                collection.span === "tall" && "lg:col-span-2",
                collection.span === "standard" && "lg:col-span-2",
                // Offset the second row so the grid never reads as a table.
                index === 1 && "lg:mt-10",
                index === 4 && "lg:mt-8",
              )}
            >
              <Link href={collection.href} className="group block">
                <ImageReveal
                  src={collection.image.src}
                  alt={collection.image.alt}
                  ratio={collection.span === "wide" ? "16/9" : "4/5"}
                  parallax={collection.span === "wide"}
                  sizes={
                    collection.span === "wide"
                      ? "(min-width: 1024px) 62vw, 100vw"
                      : "(min-width: 1024px) 31vw, 46vw"
                  }
                  className="border border-hairline transition-colors duration-500 group-hover:border-brass/50"
                  imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                <Reveal className="mt-4 flex items-start gap-3 lg:mt-6 lg:gap-5">
                  <span className="mt-1 font-sans text-[0.5625rem] tracking-[0.28em] text-brass">
                    {collection.index}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.25rem] leading-none text-ivory transition-colors duration-300 group-hover:text-champagne sm:text-[1.5rem] lg:text-[1.875rem]">
                      {collection.title}
                    </span>
                    <span className="prose-editorial mt-2 block max-w-[40ch] text-[0.8125rem] sm:text-[0.875rem] lg:mt-3 lg:text-[0.9375rem]">
                      {collection.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2.5 font-sans text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-bone transition-colors duration-300 group-hover:text-champagne lg:mt-5 lg:gap-3 lg:text-[0.625rem]">
                      Explore
                      <span
                        aria-hidden="true"
                        className="h-px w-4 bg-current opacity-60 transition-all duration-300 group-hover:w-8 group-hover:opacity-100 lg:w-5"
                      />
                    </span>
                  </span>
                </Reveal>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
