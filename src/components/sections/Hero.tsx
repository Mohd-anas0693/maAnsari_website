import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site";

const HEADING_LINES = [
  ["Tailored", "for"],
  ["your", "presence."],
];

/** Stagger between hero words and between the calls to action, in ms. */
const WORD_STAGGER = 55;
const ACTION_STAGGER = 60;

/**
 * THE HERO
 * ---------------------------------------------------------------------------
 * A server component, with no JavaScript of its own.
 *
 * The entrance is a CSS timeline (see the HERO ENTRANCE block in globals.css)
 * rather than an Anime.js one. That is the single most important performance
 * decision on the site: this section holds the Largest Contentful Paint
 * element, and a JS timeline cannot begin until React has hydrated. On a
 * throttled mid-range phone that difference measured 4.1s versus 2.4s.
 *
 * Keeping it server-rendered also means the hero costs nothing in the client
 * bundle, and the whole sequence still runs with JavaScript disabled.
 *
 * The backdrop is drawn in CSS rather than loaded as an image, so there is
 * exactly one image request in the first viewport — the framed portrait,
 * which is the only thing here worth spending bytes on.
 *
 * The heading is real text, split into words in the markup. Nothing is
 * injected on the client, so the sentence is intact for crawlers and screen
 * readers whether or not the animation runs.
 */
export function Hero() {
  const wa = whatsappUrl("appointment");

  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32 sm:pb-20 lg:min-h-screen lg:justify-center lg:pb-0 lg:pt-28"
      aria-labelledby="hero-heading"
    >
      {/* Backdrop — pure CSS, no image request. */}
      <div
        aria-hidden="true"
        className="hero-backdrop grain absolute inset-0 -z-10 origin-center"
      >
        <div className="absolute inset-0 bg-ink-950" />
        <div className="weave absolute inset-0 opacity-70" />
        {/* Warm directional light from the upper right, as if from a window. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 78% 8%, rgba(180,148,94,0.18) 0%, rgba(180,148,94,0.05) 32%, rgba(10,10,10,0) 62%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(100% 70% at 12% 100%, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 60%)",
          }}
        />
      </div>

      <div className="shell grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Type */}
        <div className="lg:col-span-7 xl:col-span-6">
          <p className="hero-eyebrow eyebrow flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-brass" />
            Bespoke Tailoring · {siteConfig.address.locality},{" "}
            {siteConfig.address.region}
          </p>

          <h1
            id="hero-heading"
            className="fluid-display mt-7 font-display font-light text-ivory"
          >
            {HEADING_LINES.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word, wordIndex) => {
                  // Running index across both lines, so the stagger reads as
                  // one sentence rather than restarting on the second line.
                  const order = lineIndex * HEADING_LINES[0].length + wordIndex;
                  return (
                    <span key={word} className="mask-line inline-block align-bottom">
                      <span
                        className="hero-word"
                        style={{ animationDelay: `${180 + order * WORD_STAGGER}ms` }}
                      >
                        {word}
                        {wordIndex < line.length - 1 ? " " : null}
                      </span>
                    </span>
                  );
                })}{" "}
              </span>
            ))}
          </h1>

          <p className="hero-support prose-editorial mt-8 max-w-[44ch] text-[1.0625rem] sm:text-[1.125rem]">
            Custom-crafted suits, blazers and shirts, measured and finished for
            the way you wear them. Your suit is not selected from a rail. It is
            drafted, cut and corrected on you.
          </p>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/contact"
              className="hero-action group inline-flex items-center justify-center gap-3 bg-ivory px-8 py-4.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-950 transition-colors duration-300 hover:bg-champagne"
            >
              Book a Private Fitting
              <span
                aria-hidden="true"
                className="h-px w-5 bg-current opacity-50 transition-all duration-300 group-hover:w-8 group-hover:opacity-100"
              />
            </Link>

            <Link
              href="/our-craft"
              className="hero-action group inline-flex items-center justify-center gap-3 border border-hairline-strong px-8 py-4.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-champagne hover:text-champagne"
              style={{ animationDelay: `${640 + ACTION_STAGGER}ms` }}
            >
              Explore Our Craft
            </Link>

            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-action inline-flex items-center justify-center gap-2.5 px-2 py-4.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:text-champagne"
                style={{ animationDelay: `${640 + ACTION_STAGGER * 2}ms` }}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book via WhatsApp
              </a>
            ) : null}
          </div>
        </div>

        {/* Framed portrait — the only image above the fold. */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="hero-media relative aspect-4/5 w-full overflow-hidden border border-hairline bg-ink-900 sm:mx-auto sm:max-w-md lg:max-w-none">
            <Image
              src="/images/hero/atelier.webp"
              alt="A finished bespoke suit on a tailor's form in the Ludhiana atelier"
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
              quality={80}
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="hero-indicator shell mt-14 hidden items-center gap-4 lg:absolute lg:bottom-9 lg:left-0 lg:mt-0 lg:flex"
      >
        <span className="font-sans text-[0.5625rem] uppercase tracking-[0.3em] text-ash">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-hairline-strong">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scrollHint_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-champagne" />
        </span>
      </div>
    </section>
  );
}
