import Link from "next/link";
import { primaryNav } from "@/data/site";
import { articlesByDate } from "@/data/journal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * 404. Next marks this noindex automatically.
 *
 * It offers a way onward rather than an apology: the main sections, and the
 * most-read guides, which are the pages people most often arrive looking for.
 */
export default function NotFound() {
  return (
    <div className="shell flex min-h-svh flex-col justify-center py-36">
      <div className="max-w-3xl">
        <Eyebrow className="mb-8">404 — Not Found</Eyebrow>

        <h1 className="fluid-h2 font-display font-light text-ivory">
          This page has been unpicked.
        </h1>

        <p className="prose-editorial mt-8 max-w-[48ch] text-[1.0625rem]">
          The address you followed does not lead anywhere on this site. It may
          have been moved, or it may never have existed. Either way, here is
          where to go next.
        </p>

        <div className="mt-11 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="primary" withRule>
            Return Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Book an Appointment
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-12 border-t border-hairline pt-10 sm:grid-cols-2">
          <nav aria-label="Main sections">
            <h2 className="eyebrow mb-5">Main sections</h2>
            <ul className="flex flex-col gap-2.5">
              {primaryNav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-label="Guides">
            <h2 className="eyebrow mb-5">Guides</h2>
            <ul className="flex flex-col gap-2.5">
              {articlesByDate.slice(0, 5).map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="font-sans text-[0.9375rem] text-bone transition-colors hover:text-champagne"
                  >
                    {article.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
