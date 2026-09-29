import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { siteConfig, BUSINESS_NAME, BRAND_NAME } from "@/data/site";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { Analytics } from "@/components/layout/Analytics";

/**
 * Display serif. Loaded at the weights actually used — a variable axis range
 * would ship glyph data for weights that never appear on screen.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  /*
   * Only the weights and styles actually used. The italic cut is deliberately
   * absent: it appeared in exactly one component, and loading it added ~35KB
   * to the preloaded critical path of every page — bandwidth that competes
   * with the hero image, which is the Largest Contentful Paint element.
   *
   * (Declaring it as a second Cormorant_Garamond() instance with
   * `preload: false` does work in a production build, but the dev server's
   * font resolver rejects two instances of one family.)
   */
  weight: ["300", "400"],
  style: ["normal"],
  display: "swap",
  variable: "--font-cormorant",
});


const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

/*
 * Both faces are preloaded, which is next/font's default and a deliberate
 * choice rather than an oversight.
 *
 * Disabling preload does free bandwidth for the hero image on a slow
 * connection, and in some runs it improved LCP. It also let the display face
 * swap in late on an enormous heading, which produced layout shifts as large
 * as 0.57 — far worse for the reader than a slightly later paint. Preloaded,
 * cumulative layout shift measures 0 on every page.
 */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Bespoke Men's Tailoring in Ludhiana | ${BRAND_NAME}`,
    /*
     * Every page supplies its own title. The suffix is the SHORT brand name
     * on purpose: a long one consumes the ~60 characters a search result
     * actually shows, pushing the descriptive part out of view.
     */
    template: `%s · ${BRAND_NAME}`,
  },
  description: siteConfig.description,
  applicationName: BUSINESS_NAME,
  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  category: "Tailoring",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    locale: siteConfig.locale,
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
  ...(siteConfig.analytics.googleSiteVerification
    ? { verification: { google: siteConfig.analytics.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * Applies the animation gate before first paint.
 *
 * Initial hidden states live behind `.motion-ready`, which is added only when
 * JavaScript is running and motion is not reduced. Without this, a failed
 * script or a reduced-motion preference would leave content invisible.
 */
const MOTION_GATE = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ready")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-ink-950 text-cream antialiased">
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ivory focus:px-5 focus:py-3 focus:text-[0.75rem] focus:font-medium focus:uppercase focus:tracking-[0.16em] focus:text-ink-950"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" className="relative">
          {children}
        </main>

        <Footer />
        <MobileContactBar />

        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
