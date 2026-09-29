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
export function CollectionGrid() {
  return (
    <section
      aria-labelledby="collections-heading"
      className="relative border-t border-hairline py-24 lg:py-36"
    >
      <div className="shell">
        <div className="mb-16 flex flex-col gap-10 lg:mb-24 lg:flex-row lg:items-end lg:justify-between">
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
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-20">
          {collections.map((collection, index) => (
            <li
              key={collection.slug}
              className={cn(
                collection.span === "wide" && "lg:col-span-4",
                collection.span === "tall" && "lg:col-span-2",
                collection.span === "standard" && "lg:col-span-2",
                // Offset the second row so the grid never reads as a table.
                index === 1 && "lg:mt-16",
                index === 4 && "lg:mt-12",
              )}
            >
              <Link href={collection.href} className="group block">
                <ImageReveal
                  src={collection.image.src}
                  alt={collection.image.alt}
                  ratio={collection.span === "wide" ? "16/11" : "4/5"}
                  parallax={collection.span === "wide"}
                  sizes={
                    collection.span === "wide"
                      ? "(min-width: 1024px) 62vw, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="border border-hairline transition-colors duration-500 group-hover:border-brass/50"
                  imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                <Reveal className="mt-6 flex items-start gap-5" delay={80}>
                  <span className="mt-1.5 font-sans text-[0.5625rem] tracking-[0.28em] text-brass">
                    {collection.index}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.625rem] leading-none text-ivory transition-colors duration-300 group-hover:text-champagne sm:text-[1.875rem]">
                      {collection.title}
                    </span>
                    <span className="prose-editorial mt-3 block max-w-[40ch] text-[0.9375rem]">
                      {collection.description}
                    </span>
                    <span className="mt-5 inline-flex items-center gap-3 font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-bone transition-colors duration-300 group-hover:text-champagne">
                      Explore
                      <span
                        aria-hidden="true"
                        className="h-px w-5 bg-current opacity-60 transition-all duration-300 group-hover:w-9 group-hover:opacity-100"
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
