import Script from "next/script";
import { siteConfig } from "@/data/site";

/**
 * Google Analytics, loaded only when a measurement ID is configured.
 * No ID is hard-coded: set NEXT_PUBLIC_GA_MEASUREMENT_ID to enable.
 */
export function Analytics() {
  const id = siteConfig.analytics.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
