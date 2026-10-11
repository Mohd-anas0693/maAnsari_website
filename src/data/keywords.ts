/**
 * KEYWORD MAP
 * ---------------------------------------------------------------------------
 * The search vocabulary this site is built to answer, grouped by intent and
 * attached to the page that genuinely serves each term.
 *
 * TWO RULES THIS FILE EXISTS TO ENFORCE
 *
 * 1. A term belongs here only if the page it points at actually answers it.
 *    Listing "sherwani" against a page that never mentions one is how a site
 *    earns impressions it cannot convert and, eventually, a manual action.
 *
 * 2. Nothing here is a substitute for the words on the page. The `keywords`
 *    meta tag has been ignored by Google since 2009; it is emitted because it
 *    costs nothing and some smaller engines still read it. The terms earn
 *    their rankings from headings, body copy, internal links and structured
 *    data — which is where every one of these also appears.
 *
 * ON LOCAL VOCABULARY
 *
 * A large share of real searches in this market are not in tailoring English.
 * "Coat pant" is what most customers in Punjab call a two-piece suit, and
 * "silai" is what they call stitching. Those are not synonyms to be bolted
 * on; they are the words the customer is actually using, and the copy uses
 * them where a person would.
 */

/** Terms that describe the business itself, used site-wide. */
export const brandKeywords = [
  "bespoke tailor",
  "men's tailor",
  "custom tailoring",
  "made to measure",
  "tailoring house",
  "gents tailor",
  "suit stitching",
  "suit silai",
  "coat pant stitching",
  "tailor in Ludhiana",
  "men's tailor Ludhiana",
  "custom suits Ludhiana",
  "bespoke tailoring Punjab",
];

/**
 * Garment vocabulary, including the local names for the same thing.
 * `alsoCalled` entries are genuine synonyms, not near-misses.
 */
export interface GarmentTerm {
  /** The term as the house would write it. */
  canonical: string;
  /** What customers call it when they search. */
  alsoCalled: string[];
  /** The page that answers this term. */
  href: string;
}

export const garmentTerms: GarmentTerm[] = [
  {
    canonical: "Two-piece suit",
    alsoCalled: ["coat pant", "coat pant suit", "2 piece suit", "jacket and trouser"],
    href: "/two-piece-suits",
  },
  {
    canonical: "Three-piece suit",
    alsoCalled: ["3 piece suit", "waistcoat suit", "vest suit", "coat pant with waistcoat"],
    href: "/three-piece-suits",
  },
  {
    canonical: "Wedding suit",
    alsoCalled: [
      "groom suit",
      "dulha coat pant",
      "marriage suit",
      "reception suit",
      "engagement suit",
      "wedding coat pant",
    ],
    href: "/wedding-suits",
  },
  {
    canonical: "Blazer",
    alsoCalled: ["sport coat", "party wear blazer", "designer blazer", "single coat"],
    href: "/blazers",
  },
  {
    canonical: "Custom shirt",
    alsoCalled: ["shirt stitching", "formal shirt", "shirt silai", "tailored shirt"],
    href: "/custom-shirts",
  },
  {
    canonical: "Custom trousers",
    alsoCalled: ["pant stitching", "formal pant", "trouser silai", "formal trousers"],
    href: "/custom-trousers",
  },
  {
    canonical: "Corporate suit",
    alsoCalled: ["office suit", "business suit", "interview suit", "formal suit for men"],
    href: "/corporate-suits",
  },
  {
    canonical: "Alterations",
    alsoCalled: ["suit alteration", "coat alteration", "pant alteration", "refitting", "resizing"],
    href: "/alterations",
  },
];

/**
 * Indian formalwear the house is regularly asked about.
 *
 * `handled` says plainly whether this is work we take. A term with
 * `handled: false` still belongs on the site — someone searching it deserves
 * a straight answer rather than a page that implies yes and wastes their
 * visit — but it is never presented as a service.
 *
 * >>> OWNER: VERIFY EVERY `handled` VALUE BELOW BEFORE LAUNCH. <<<
 * These are set to what a bespoke tailoring bench can normally take on —
 * structured jackets yes, surface embroidery no. They are claims about your
 * workshop, so they belong to you. Flip a flag here and the page, its FAQ
 * answer and its structured data all follow; there is no second place to
 * edit.
 */
export interface IndianFormalTerm {
  name: string;
  alsoCalled: string[];
  handled: boolean;
  /**
   * Phrased the way someone actually asks it, rather than generated from the
   * garment name — "Do you make jodhpuri suit?" is not a sentence anyone
   * types, and it is what a template produces.
   */
  question: string;
  /** The honest answer, shown on the page. */
  answer: string;
}

export const indianFormalTerms: IndianFormalTerm[] = [
  {
    name: "Bandhgala",
    alsoCalled: ["bandgala", "band gala", "closed neck jacket", "mandarin collar suit"],
    handled: true,
    question: "Do you tailor a bandhgala?",
    answer:
      "Yes. A bandhgala is a structured, closed-neck jacket, and structure is what a tailoring bench is for. It is cut, canvassed and fitted the same way a notch-lapel jacket is, with a mandarin collar and a higher closure. Worn with trousers or with churidar, depending on the function.",
  },
  {
    name: "Jodhpuri suit",
    alsoCalled: ["jodhpuri", "jodhpuri coat", "bandhgala suit"],
    handled: true,
    question: "Do you make Jodhpuri suits?",
    answer:
      "Yes. A Jodhpuri is a bandhgala cut as a matched set with its trousers. The tailoring questions are identical to any suit: shoulder, balance, closure height and the line of the front edge.",
  },
  {
    name: "Nehru jacket",
    alsoCalled: ["nehru coat", "modi jacket", "bandi", "waistcoat jacket"],
    handled: true,
    question: "Do you stitch Nehru jackets?",
    answer:
      "Yes. A Nehru jacket is a sleeveless or short-sleeved mandarin-collar jacket worn over a kurta or a shirt. It is quick to make relative to a full suit and is a common addition to a wedding wardrobe.",
  },
  {
    name: "Indo-western",
    alsoCalled: ["indo western outfit", "fusion wear", "draped jacket"],
    handled: true,
    question: "Can you make an indo-western outfit?",
    answer:
      "Within reason. Where an indo-western look is built on a tailored jacket — a longer body, an asymmetric front, a mandarin collar — that is tailoring and we will make it. Where it depends on draping, heavy embroidery or appliqué, a specialist in those crafts will do it better, and we will say so.",
  },
  {
    name: "Sherwani",
    alsoCalled: ["shervani", "groom sherwani", "achkan"],
    handled: false,
    question: "Do you make sherwanis?",
    answer:
      "Not as a traditional embroidered sherwani. That is its own craft, built around surface work we do not do. What we can make is sherwani-length tailored formalwear: the length and the closure of a sherwani with the structure and fit of a bespoke jacket. If you want the embroidered original, we will point you to someone who specialises in it.",
  },
  {
    name: "Tuxedo",
    alsoCalled: ["tux", "dinner jacket", "black tie", "shawl collar suit"],
    handled: true,
    question: "Do you tailor tuxedos?",
    answer:
      "Yes. A tuxedo is a suit with evening detailing: a shawl or peak lapel faced in silk, jetted pockets, a covered waistband and no vents in the classical form. Common for receptions and increasingly for the ceremony itself.",
  },
  {
    name: "Safari suit",
    alsoCalled: ["safari", "bush shirt suit"],
    handled: true,
    question: "Do you still make safari suits?",
    answer:
      "Yes, though we are asked for it less than we once were. A safari suit is a four-pocket bush jacket with matching trousers, cut softer than a formal jacket and usually in a lighter cloth.",
  },
  {
    name: "Kurta pyjama",
    alsoCalled: ["kurta", "pathani suit", "kurta set"],
    handled: false,
    question: "Do you stitch kurta pyjama?",
    answer:
      "No. Kurta work sits with specialists in Indian ethnic wear, and they will cut and finish it better than a Western tailoring bench would. We are glad to advise on what to wear a Nehru jacket over.",
  },
];

/** Occasion vocabulary. These map to pages that genuinely cover the occasion. */
export const occasionKeywords = [
  "wedding suit",
  "groom suit",
  "reception suit",
  "engagement suit",
  "sangeet outfit",
  "mehndi outfit",
  "barat",
  "party wear suit",
  "cocktail suit",
  "convocation suit",
  "interview suit",
  "office formals",
  "anniversary suit",
];

/**
 * Suiting and shirting the market actually names.
 *
 * Terry wool and poly wool are the two cloths most Indian customers have
 * heard of by name, so the fabric copy addresses them directly rather than
 * talking only about worsteds.
 */
export const fabricKeywords = [
  "worsted wool",
  "terry wool",
  "poly wool",
  "wool blend",
  "linen suit",
  "cotton suit",
  "tweed",
  "flannel",
  "herringbone",
  "velvet blazer",
  "raw silk",
  "brocade",
  "jacquard",
  "sharkskin",
  "birdseye",
  "suiting fabric",
  "shirting fabric",
];

/** Colours customers name when they arrive. */
export const colourKeywords = [
  "navy blue suit",
  "midnight blue suit",
  "black suit",
  "charcoal grey suit",
  "ivory suit",
  "cream suit",
  "beige suit",
  "maroon suit",
  "wine suit",
  "burgundy suit",
  "royal blue suit",
  "bottle green suit",
  "sand suit",
];

/** Cities with a page that says something true about serving them. */
export const locationKeywords = [
  "tailor in Ludhiana",
  "suit tailor Ludhiana",
  "bespoke suits Chandigarh",
  "custom suits Mohali",
  "suit tailor Jalandhar",
  "wedding suits Amritsar",
  "tailor in Patiala",
  "suit stitching Bathinda",
  "men's tailoring Punjab",
];

/**
 * Builds the `keywords` metadata value for a page.
 * Deduplicated, trimmed and capped — a list of two hundred terms signals
 * nothing to anything that still reads this tag.
 */
export function keywordsFor(...groups: string[][]): string[] {
  const seen = new Set<string>();
  for (const group of groups) {
    for (const term of group) {
      const key = term.trim().toLowerCase();
      if (key && !seen.has(key)) seen.add(key);
    }
  }
  return [...seen].slice(0, 24);
}

/** Every local name for a garment, for the vocabulary section. */
export const allGarmentSynonyms = garmentTerms.flatMap((g) => g.alsoCalled);
