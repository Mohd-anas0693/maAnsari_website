import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, articlesByDate } from "@/data/journal";
import type { Block } from "@/data/journal";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { HeroMedia } from "@/components/sections/HeroMedia";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { keywordsFor } from "@/data/keywords";
import { ArrowIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/journal/${article.slug}`,
    image: article.image.src,
    imageAlt: article.image.alt,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
    keywords: keywordsFor(
      [article.shortTitle, article.category],
      article.tags ?? [],
    ),
  });
}

const formatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const article = getArticle(slug);
  if (!article) notFound();

  const headings = article.blocks.filter(
    (block): block is Extract<Block, { type: "h2" }> => block.type === "h2",
  );
  const more = articlesByDate.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: "Journal", path: "/journal" },
          { name: article.shortTitle, path: `/journal/${article.slug}` },
        ]}
      />

      <article>
        <header className="shell pt-12 pb-14 lg:pt-16 lg:pb-20">
          <p className="hero-eyebrow eyebrow mb-7">
            {article.category} · {article.readingMinutes} min read
          </p>

          <h1 className="fluid-h2 max-w-5xl font-display font-light text-ivory">
            <span className="mask-line">
              <span className="hero-word">{article.title}</span>
            </span>
          </h1>

          <p className="hero-support mt-8 font-sans text-[0.8125rem] text-ash">
            <time dateTime={article.published}>
              {formatter.format(new Date(article.published))}
            </time>
          </p>
        </header>

        <div className="shell pb-14">
          <HeroMedia
            src={article.image.src}
            alt={article.image.alt}
            ratio="16/9"
            sizes="(min-width: 1440px) 90rem, 100vw"
          />
        </div>

        <div className="shell grid gap-12 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
          {/* Contents. Anchors to real headings, useful on a long guide. */}
          {headings.length > 2 ? (
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <h2 className="eyebrow mb-5">Contents</h2>
                <nav aria-label="Article contents">
                  <ol className="flex flex-col gap-3 border-l border-hairline pl-5">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="font-sans text-[0.8125rem] leading-snug text-ash transition-colors hover:text-champagne"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </aside>
          ) : null}

          <div
            className={
              headings.length > 2
                ? "lg:col-span-8 lg:col-start-5"
                : "lg:col-span-8 lg:col-start-3"
            }
          >
            <div className="prose-editorial text-[1.0625rem]">
              {article.blocks.map((block, index) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </div>

            <Reveal className="mt-16 border-t border-hairline pt-10">
              <h2 className="eyebrow mb-7">Related</h2>
              <ul className="flex flex-col gap-5">
                {article.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group flex items-start gap-4">
                      <ArrowIcon className="mt-1.5 h-4 w-4 shrink-0 text-brass transition-transform duration-300 group-hover:translate-x-1" />
                      <span>
                        <span className="block font-display text-[1.375rem] leading-none text-ivory transition-colors duration-300 group-hover:text-champagne">
                          {link.label}
                        </span>
                        <span className="mt-2 block font-sans text-[0.9375rem] text-ash">
                          {link.note}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <section
          aria-labelledby="more-journal"
          className="border-t border-hairline py-14 sm:py-18 lg:py-20"
        >
          <div className="shell">
            <h2 id="more-journal" className="eyebrow mb-10">
              More from the journal
            </h2>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
              {more.map((item) => (
                <li key={item.slug}>
                  <Reveal>
                    <Link href={`/journal/${item.slug}`} className="group block">
                      <p className="eyebrow">{item.category}</p>
                      <h3 className="mt-4 font-display text-[1.5rem] leading-tight text-ivory transition-colors duration-300 group-hover:text-champagne">
                        {item.shortTitle}
                      </h3>
                      <p className="prose-editorial mt-3 text-[0.9375rem]">
                        {item.excerpt}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />

      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.metaDescription,
          path: `/journal/${article.slug}`,
          image: article.image.src,
          datePublished: article.published,
          dateModified: article.updated,
        })}
      />
    </>
  );
}

/** Renders one content block as semantic HTML. */
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return (
        <h2
          id={block.id}
          className="fluid-h3 mt-14 mb-5 scroll-mt-32 font-display font-light text-ivory"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 mb-3 font-display text-[1.5rem] leading-tight text-ivory">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="my-6 flex flex-col gap-3">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-4">
              <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-brass" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-6 flex flex-col gap-3">
          {block.items.map((item, index) => (
            <li key={index} className="flex gap-4">
              <span className="font-sans text-[0.75rem] tabular-nums text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "dl":
      return (
        <dl className="my-8 grid gap-px">
          {block.items.map((item) => (
            <div key={item.term} className="border-t border-hairline py-5">
              <dt className="font-display text-[1.375rem] leading-none text-ivory">
                {item.term}
              </dt>
              <dd className="mt-3 text-[0.9375rem]">{item.detail}</dd>
            </div>
          ))}
        </dl>
      );
    case "quote":
      return (
        // Set in the display serif at size rather than in italic: the italic
        // cut is not loaded, and a synthesised oblique on a serif looks wrong.
        <blockquote className="my-12 border-l border-brass pl-7">
          <p className="font-display text-[1.625rem] leading-snug font-light text-champagne sm:text-[2rem]">
            {block.text}
          </p>
        </blockquote>
      );
    case "link":
      return (
        <p className="my-8">
          <Link href={block.href} className="group inline-flex items-start gap-3">
            <ArrowIcon className="mt-1.5 h-4 w-4 shrink-0 text-brass transition-transform duration-300 group-hover:translate-x-1" />
            <span>
              <span className="block font-display text-[1.375rem] leading-none text-ivory no-underline transition-colors duration-300 group-hover:text-champagne">
                {block.label}
              </span>
              <span className="mt-1.5 block font-sans text-[0.9375rem] text-ash">
                {block.note}
              </span>
            </span>
          </Link>
        </p>
      );
    default:
      return null;
  }
}
