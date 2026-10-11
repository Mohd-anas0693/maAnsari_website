# Launch checklist

The site is built. Whether it ranks depends mostly on the items below, and
most of them are not code.

---

## Blocking — the site cannot rank until these are done

**1. Set a real domain.**
`NEXT_PUBLIC_SITE_URL` is still `http://localhost:3000`. While it is not a
real domain, `robots.txt` serves `Disallow: /` and the site is invisible to
every search engine. That guard exists so a preview build cannot be indexed
and then compete with the real one. Setting the variable lifts it.

**2. Deploy it.** Nothing ranks from a laptop.

**3. Fill in the business details.** `.env.local` currently holds a phone
number of all zeros. Every detail left blank is omitted from the page *and*
from the structured data, so the site stays truthful — but a tailoring
business with no phone number and no address will not rank locally, because
Google has nothing to match against a real-world entity.

- `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_ADDRESS_STREET`, `NEXT_PUBLIC_ADDRESS_POSTAL_CODE`
- `NEXT_PUBLIC_GEO_LAT`, `NEXT_PUBLIC_GEO_LNG`
- `NEXT_PUBLIC_OPENING_HOURS`, `NEXT_PUBLIC_MAPS_URL`, `NEXT_PUBLIC_MAPS_EMBED_URL`

**4. Verify the claims you have not checked.**
`src/data/keywords.ts` marks each Indian garment `handled: true` or `false`.
Those are claims about your workshop. Correct them there and the page, its
FAQ answer and its structured data all follow.
`src/app/about/page.tsx` has two sections marked "To be completed".

---

## What actually decides local ranking

For a tailor in Ludhiana, the map pack and local results are won mostly
off-site. In rough order of weight:

**1. Google Business Profile.** This matters more than the entire website
for "tailor near me" style searches. Claim it, choose the most specific
category available, add real photos of the workshop and finished garments,
set the hours, and keep them accurate. The site is built to agree with it:
the contact page carries the same name, address, phone and hours, and the
structured data omits anything you have not confirmed, so the two cannot
contradict each other.

**2. Reviews.** Volume, recency and replies all count. Ask every customer at
collection — that is the moment they are happiest. `Testimonials.tsx` takes
real, attributed reviews when you have them; it deliberately emits no review
structured data, because inventing that is a policy violation and a fast way
to lose the listing entirely.

**3. Name, address and phone consistency.** Identical formatting everywhere:
Google, Justdial, IndiaMART, Facebook, Instagram, any directory you are
listed in. Inconsistent NAP is the most common reason a local business
underperforms.

**4. Links from real local sources.** Wedding planners, photographers,
banquet venues, local press. A handful of genuine local links outperforms
hundreds of directory submissions. Do not buy links.

**5. Photographs.** Every image in `public/images/` is a generated
placeholder. Real photographs of your workshop, your cloth and finished
garments will do more for conversion than any further technical work, and
Google Business Profile photos feed the local ranking directly.

---

## What is already done on-site

- 30 indexable URLs, all reachable within two clicks of the home page, zero
  broken links, zero orphans, sitemap matching the crawl exactly.
- Unique title, description and canonical on every page. No duplicates.
- `ClothingStore` structured data with 18 `knowsAbout` entries, a 10-item
  offer catalogue and 7 served cities — all derived from the page data, so a
  claim cannot exist in the schema without a page behind it.
- `FAQPage` markup only where the answers are visible on the page.
- Local search vocabulary covered: coat pant, suit silai, bandhgala,
  Jodhpuri, Nehru jacket, indo-western, terry wool, poly wool and the colour
  names customers actually type.
- Core Web Vitals in good standing: LCP ~1.1s and CLS 0 on a throttled
  mobile profile.
- Content works with JavaScript disabled and with reduced motion.

---

## Measure, don't guess

Once live: register the property in Google Search Console, submit
`/sitemap.xml`, and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Then watch
Search Console's query report rather than checking rankings by hand — your
own searches are personalised and will mislead you.

Local SEO is slow. A new domain with a new Business Profile usually takes
months, not weeks, to settle into position.
