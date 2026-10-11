import type { Metadata } from "next";
import Link from "next/link";
import { articlesByDate } from "@/data/journal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal: Guides to Suits & Fit",
  description:
    "Practical guides on choosing a wedding suit, how a suit should fit, two-piece versus three-piece, fabric selection and how long custom tailoring takes.",
  path: "/journal",
});

const formatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalPage() {
  const [lead, ...rest] = articlesByDate;

  return (
    <>
      <Breadcrumbs trail={[{ name: "Journal", path: "/journal" }]} />

      <PageHero
        eyebrow="Journal"
        titleLines={["Written to be", "useful."]}
        lede="Guides that answer the questions customers actually ask, before they spend anything. No filler, and nothing written to fill a keyword."
      />

      {lead ? (
        <section className="shell pb-20 lg:pb-28">
          <Reveal>
            <Link href={`/journal/${lead.slug}`} className="group block">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-7">
                  <ImageReveal
                    src={lead.image.src}
                    alt={lead.image.alt}
                    ratio="16/11"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="border border-hairline"
                    imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="lg:col-span-5">
                  <p className="eyebrow">
                    {lead.category} · {lead.readingMinutes} min read
                  </p>
                  <h2 className="fluid-h3 mt-6 font-display font-light text-ivory transition-colors duration-300 group-hover:text-champagne">
                    {lead.title}
                  </h2>
                  <p className="prose-editorial mt-5 max-w-[46ch] text-[1.0625rem]">
                    {lead.excerpt}
                  </p>
                  <p className="mt-7 font-sans text-[0.75rem] uppercase tracking-[0.16em] text-ash">
                    <time dateTime={lead.published}>
                      {formatter.format(new Date(lead.published))}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="border-t border-hairline py-12 sm:py-16 lg:py-20">
        <div className="shell">
          <h2 className="eyebrow mb-12">More from the journal</h2>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <li key={article.slug}>
                <Reveal>
                  <article>
                    <Link href={`/journal/${article.slug}`} className="group block">
                      <ImageReveal
                        src={article.image.src}
                        alt={article.image.alt}
                        ratio="3/2"
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                        className="border border-hairline"
                        imageClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                      <p className="eyebrow mt-6">
                        {article.category} · {article.readingMinutes} min
                      </p>
                      <h3 className="mt-4 font-display text-[1.625rem] leading-tight text-ivory transition-colors duration-300 group-hover:text-champagne">
                        {article.title}
                      </h3>
                      <p className="prose-editorial mt-3 text-[0.9375rem]">
                        {article.excerpt}
                      </p>
                      <p className="mt-5 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ash">
                        <time dateTime={article.published}>
                          {formatter.format(new Date(article.published))}
                        </time>
                      </p>
                    </Link>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        lines={["Questions the journal", "does not answer?"]}
        body="Bring them to a consultation. We would rather talk through your occasion than have you guess from a page."
      />
    </>
  );
}
