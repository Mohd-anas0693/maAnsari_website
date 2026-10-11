import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/data/services";
import { ServicePage } from "@/components/sections/ServicePage";
import { buildMetadata } from "@/lib/seo";
import { brandKeywords, garmentTerms, keywordsFor } from "@/data/keywords";

const SLUG = "custom-trousers";
const service = getService(SLUG);

/** Local names for this garment, from the one place they are recorded. */
const synonyms = garmentTerms.find((g) => g.href === service?.href);

export const metadata: Metadata = service
  ? buildMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.href,
      image: service.image.src,
      imageAlt: service.image.alt,
      keywords: keywordsFor(
        [service.title, ...(synonyms ? synonyms.alsoCalled : [])],
        brandKeywords,
      ),
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}
