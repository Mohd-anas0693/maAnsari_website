import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/data/services";
import { ServicePage } from "@/components/sections/ServicePage";
import { buildMetadata } from "@/lib/seo";

const SLUG = "custom-trousers";
const service = getService(SLUG);

export const metadata: Metadata = service
  ? buildMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.href,
      image: service.image.src,
      imageAlt: service.image.alt,
    })
  : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}
