import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, type BreadcrumbEntry } from "@/lib/schema";

/**
 * Visible breadcrumbs plus the matching BreadcrumbList structured data, so
 * the markup and the schema can never drift apart.
 */
export function Breadcrumbs({ trail }: { trail: BreadcrumbEntry[] }) {
  if (trail.length === 0) return null;
  const full: BreadcrumbEntry[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <nav aria-label="Breadcrumb" className="shell pt-32 lg:pt-36">
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {full.map((entry, index) => {
            const isLast = index === full.length - 1;
            return (
              <li key={entry.path} className="flex items-center gap-2.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-stone"
                  >
                    {entry.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={entry.path}
                      className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ash transition-colors hover:text-champagne"
                    >
                      {entry.name}
                    </Link>
                    <span aria-hidden="true" className="text-ink-500">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(full)} />
    </>
  );
}
