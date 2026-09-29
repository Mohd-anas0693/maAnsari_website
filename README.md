# M.A. Ansari — Bespoke Tailoring

A production-ready website for a men's bespoke tailoring house in Ludhiana, Punjab.
Next.js App Router, TypeScript, Tailwind CSS v4 and Anime.js v4.

---

## Before you go live

The site is built to be truthful before it is complete. Every fact that depends
on the real business — phone number, address, opening hours, social profiles —
is read from an environment variable and **omitted entirely when unset**, from
both the page and the structured data. Nothing is invented, and no placeholder
is ever presented as fact.

That means the site runs fine today, and gets more useful as you fill it in.

### 1. Configure the business details

```bash
cp .env.example .env.local
```

Then fill in what is true. `.env.example` documents every field. The three that
matter most:

| Variable | Why it matters |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph tags and the sitemap all derive from it. **Until this is a real domain, `robots.txt` disallows all crawling** so a preview build cannot be indexed. |
| `NEXT_PUBLIC_WHATSAPP` | Digits only, country code first. Every WhatsApp button disappears without it rather than linking nowhere. |
| `NEXT_PUBLIC_PHONE` | Same rule: no number, no call buttons. |

### 2. Replace the placeholder imagery

Everything in `public/images/` is a generated placeholder. The photography
plates are deep, textured panels captioned with the shot that belongs there —
they look deliberate rather than broken, and the caption is the brief.

Drop real photographs in at the same paths and aspect ratios. No code changes
are needed; nothing references image dimensions.

| Folder | What belongs there |
| --- | --- |
| `hero/` | The atelier, a finished suit. `atelier.webp` is 4:5 and is the page's largest element. |
| `collections/` | One image per category, 4:5 (16:11 for the two wide tiles). |
| `craft/` | Measuring, cutting, stitching, pressing, the workshop, the fitting room. |
| `fabrics/` | Cloth close-ups, 1:1. The generated ones are real procedural weaves and are usable as-is. |
| `journal/` | One lead image per article, roughly 3:2. |
| `about/` | The founder's portrait. |

`public/images/suit-construction/` is different: ten layered SVGs that stack in
one coordinate system to build a jacket. See **The signature interaction** below
before replacing those.

### 3. Fill in what was deliberately left blank

Search the codebase for `To be completed`. Two sections on `/about` are
placeholders, marked as such on the page itself:

- **The founder** — where they trained, who they learned from, why they set up
  on their own.
- **The workshop and team** — who cuts, who stitches, who presses.

These were left empty rather than filled with a plausible invention. Nothing on
the site claims years in business, awards, certifications, celebrity clients or
heritage, because none of that was supplied.

**Testimonials** work the same way. `src/components/sections/Testimonials.tsx`
exports an empty `testimonials` array and renders an honest "reviews when they
are earned" state. Add real, attributed reviews and the section switches to
showing them. No `Review` or `AggregateRating` structured data is emitted,
because fabricated social proof is both dishonest and a Google policy violation.

---

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; 33 static routes
npm start
npm run lint
```

Node 20.9+ is required. The build is fully static — every route prerenders,
including the sitemap, robots file and Open Graph image.

---

## How the code is organised

```
src/
  app/                    routes; one folder per URL
    sitemap.ts            generated from the same data as the pages
    robots.ts             disallows everything until a real domain is set
    opengraph-image.tsx   social card, rendered at build time
  components/
    layout/               navbar, footer, breadcrumbs, mobile contact bar
    motion/               React↔animation bridges (Reveal, TextReveal, ImageReveal)
    sections/             page sections, composed by routes
    forms/                the appointment form
    ui/                   buttons, headings, icons
  animations/             all Anime.js code lives here and nowhere else
  hooks/                  viewport detection, scroll progress, motion preference
  data/                   all copy and business data
  lib/                    metadata, structured data, contact links
```

### Content lives in `src/data/`, not in components

Every page's words are data. To change what the site says, edit these files —
you should rarely need to touch a component.

| File | Drives |
| --- | --- |
| `site.ts` | Business details, navigation, footer |
| `services.ts` | The ten service pages, each with its own prose, specs, FAQs and outbound links |
| `locations.ts` | The location pages (see the honesty rules in the file header) |
| `journal.ts` | Articles, stored as typed blocks rather than MDX |
| `craft.ts` | The construction sequence, the eight process steps, fabrics, fit points |
| `collections.ts` | The home page collection grid, including each tile's weight in the asymmetric layout |
| `faqs.ts` | Site-wide questions |

Adding a service is a new entry in `services.ts` plus a four-line route file.
Removing a location removes its page, its sitemap entry and its internal links
in one edit — there is no second list to keep in sync.

---

## The three layers of motion

The rule is that **viewport detection, animation logic and scroll progress are
separate**, and no component contains animation code.

| Layer | Where | Responsibility |
| --- | --- | --- |
| Detection | `hooks/useInView.ts` | *When* something is on screen. Shares one IntersectionObserver per configuration across the whole page. |
| Progress | `hooks/useScrollProgress.ts` | *How far* through a section the reader is. Callback-based, never React state, so a scroll does not re-render a subtree. |
| Animation | `animations/*.ts` | *What happens.* Takes DOM elements, returns timelines. Knows nothing about React. |

Components import a named function and call it. `Reveal`, `TextReveal` and
`ImageReveal` are the bridges.

### The signature interaction

`components/sections/SuitConstruction.tsx` is the centrepiece: a suit that
assembles layer by layer as you scroll, in the order a tailor actually builds
one — cloth, pattern, cutting, canvas, interlining, lining, sleeves, buttons,
pressing, finished.

The timeline is built once, **paused, and seeked** by scroll progress. It never
plays on its own, so stopping mid-scroll leaves the jacket half-built. Each
layer owns a scroll range in `data/craft.ts`, and the ranges overlap on purpose:
a layer is still settling as the next begins, which reads as assembly rather
than as a slideshow.

To use photography instead of the SVGs, replace the files in
`public/images/suit-construction/` with transparent PNG or WebP at the same
aspect ratio, and update `LAYER_WIDTH` / `LAYER_HEIGHT` in the component. The
animation needs no other change.

### Motion is an enhancement, never a requirement

Initial hidden states live behind a `.motion-ready` class that a tiny inline
script adds **only when JavaScript is running and motion is not reduced**.

Verified with scripts disabled: `motion-ready` is absent, zero of 134 animated
elements are hidden, the full heading is present, and the construction section
falls back to ordinary document flow with every layer visible and every stage
written out. Reduced motion takes the same path.

### Why the hero is CSS and everything else is Anime.js

The hero entrance is a CSS keyframe timeline (see `HERO ENTRANCE` in
`globals.css`), and this is the one deliberate exception to the rule above.

Everything above the fold is the Largest Contentful Paint candidate. A
JavaScript timeline cannot start until React has hydrated, so hiding hero text
until then adds hydration time *plus* the animation to LCP. Measured on a
throttled mobile profile, the JavaScript version produced an LCP of **4.1s**;
moving the same sequence to CSS — which starts as soon as the stylesheet
applies — brought it to **2.0s** on service pages. The hero is now a server
component with no client JavaScript at all.

Anime.js still drives everything below the fold, where the cost is paid long
after first paint: the suit construction, section reveals, image wipes, the
navigation overlay and scroll-linked parallax.

---

## SEO

- **Metadata** is built by one function (`lib/seo.ts`), so no page can ship a
  duplicate title, a missing canonical or an inconsistent Open Graph block.
  Verified across all 27 indexable URLs: one `h1` each, no duplicate titles or
  descriptions, titles 38–56 characters, descriptions 129–162.
- **Structured data** (`lib/schema.ts`) emits `ClothingStore` (the most specific
  LocalBusiness subtype that fits), `WebSite`, `BreadcrumbList`, `Service`,
  `Article` and `FAQPage`. Every builder prunes unset properties, so an
  unconfigured address or price range is omitted rather than guessed.
- **FAQ markup** is emitted only where the questions and answers are visible on
  the page, which is Google's condition for it.
- **Location pages** carry an explicit `serviceModel`. Ludhiana is the studio.
  The other cities say plainly that there is no branch there and describe how
  travelling customers are actually served. Do not add a city without something
  genuinely true and useful to say about it.
- **`robots.ts`** refuses to invite crawlers until `NEXT_PUBLIC_SITE_URL` is a
  real domain.

### Google Business Profile

The contact page and the location section carry address, phone, opening hours,
a map embed and an appointment call to action, in the order a customer looks for
them. Keep these consistent with your Google Business Profile listing; where a
field is not configured here it is omitted rather than guessed, so the two
cannot contradict each other.

---

## Accessibility

Verified in a browser, not assumed:

- Landmarks present and every `nav` labelled; `lang="en-IN"`; skip link first in
  the tab order.
- Zero unnamed links or buttons, zero unlabelled form fields, zero images
  missing `alt`.
- The mobile overlay traps focus, moves focus into itself on open, closes on
  Escape and restores scroll.
- Focus rings are immediate. They were fading in over 300ms because Tailwind's
  `transition-colors` includes `outline-color`; the `:focus-visible` rule is
  deliberately unlayered so it outranks the utility layer.
- Contrast meets WCAG AA throughout. The muted text colour was lightened from
  `#6e6a62` to `#807c74` after it measured 3.7:1.

---

## Performance

Cumulative Layout Shift measures **0** on every page. Fonts are preloaded
deliberately: disabling preload frees bandwidth and can improve LCP, but it also
let the display face swap in late on an enormous heading and produced shifts as
large as 0.57, which is far worse for a reader than a slightly later paint.

Other decisions worth knowing:

- The hero backdrop is drawn in CSS, so the first viewport makes exactly one
  image request.
- Only the hero image is eager; everything else is lazy with an intrinsic
  aspect ratio reserved, which is why CLS is zero.
- `next.config.ts` declares `images.qualities`, which Next 16 requires — any
  quality not listed is silently coerced to the nearest one that is.
- Animations use `transform` and `opacity` only. `will-change` is set during an
  animation and cleared on completion.
- There is exactly one looping animation on the site: the hero's scroll hint.

If you benchmark, do it on a quiet machine. The absolute numbers above were
taken under load and the variance was large; the relative improvements are the
reliable part.

---

## Connecting the appointment form

The form has no backend and does not need one. Set `NEXT_PUBLIC_FORM_ENDPOINT`
to anything that accepts a JSON POST — Formspree, a Route Handler, a CRM
webhook — and it will post there. Leave it unset and the form composes the same
details into a WhatsApp message instead, which is how most enquiries in this
market arrive anyway.

Validation is the browser's own, which is better localised and better announced
than anything reimplemented. There is a honeypot field for bots.
