/**
 * JOURNAL
 * ---------------------------------------------------------------------------
 * Articles are stored as structured blocks rather than MDX so that content
 * stays fully server-rendered with no extra dependency and no client-side
 * markdown parsing. Every block renders to semantic HTML.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "dl"; items: { term: string; detail: string }[] }
  | { type: "quote"; text: string }
  | { type: "link"; href: string; label: string; note: string };

export interface Article {
  slug: string;
  title: string;
  /** Short title for cards and breadcrumbs. */
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** ISO date. Used for `datePublished` and sitemap `lastModified`. */
  published: string;
  updated?: string;
  readingMinutes: number;
  category: string;
  /** Search terms this article genuinely answers. */
  tags?: string[];
  excerpt: string;
  image: { src: string; alt: string };
  blocks: Block[];
  related: { label: string; href: string; note: string }[];
}

export const articles: Article[] = [
  {
    slug: "how-to-choose-a-wedding-suit-in-ludhiana",
    title: "How to Choose a Wedding Suit: A Planning Guide for Grooms",
    shortTitle: "Choosing a Wedding Suit",
    metaTitle: "How to Choose a Wedding Suit in Ludhiana",
    metaDescription:
      "A practical guide to planning a groom's wedding suit in Ludhiana: mapping the functions, choosing cloth, timing fittings and coordinating the party.",
    published: "2026-01-14",
    readingMinutes: 9,
    category: "Weddings",
    tags: ["wedding suit Ludhiana", "groom suit", "dulha coat pant", "reception suit", "engagement suit", "wedding suit colour", "groom wardrobe"],
    excerpt:
      "Most wedding suit regrets are scheduling problems, not taste problems. Here is how to plan the wardrobe function by function.",
    image: {
      src: "/images/journal/wedding-suit-planning.webp",
      alt: "Ivory and midnight blue suiting cloths laid out for a groom's selection",
    },
    blocks: [
      {
        type: "p",
        text: "Almost every complaint a groom has about his wedding outfit traces back to one of two things: he started too late, or he planned one function at a time. Neither is a matter of taste, and both are avoidable.",
      },
      {
        type: "p",
        text: "This guide works through the decisions in the order they actually need to be made.",
      },
      { type: "h2", id: "map-the-functions", text: "Start by mapping the functions" },
      {
        type: "p",
        text: "Before any conversation about cloth or colour, write down every function, its date, its approximate time of day, and whether it is indoors or outdoors. That single sheet answers most of the questions that follow.",
      },
      {
        type: "p",
        text: "A ceremony at eleven in the morning in November and a reception at nine at night in May are different climates, different lighting and different levels of formality. Treating them as one problem is how grooms end up wearing an evening-weight three-piece outdoors in summer.",
      },
      {
        type: "dl",
        items: [
          {
            term: "Engagement",
            detail:
              "Usually the least formal. A strong blazer with contrasting trousers gives you something genuinely wearable afterwards, which is rarely true of anything else in the wardrobe.",
          },
          {
            term: "Ceremony",
            detail:
              "The most photographed. This is where the budget and the fittings should concentrate. A three-piece is the conventional choice and it photographs well.",
          },
          {
            term: "Reception",
            detail:
              "Evening, artificial light, long hours and movement. Deeper tones and a cloth that holds a crease matter more here than anywhere else.",
          },
        ],
      },
      { type: "h2", id: "cloth-and-season", text: "Choose cloth for the season, not the photo" },
      {
        type: "p",
        text: "Cloth weight is the decision that determines whether you enjoy your own wedding. A heavier cloth drapes beautifully and photographs with depth, and at an outdoor function in Punjab in May it is genuinely punishing.",
      },
      {
        type: "ul",
        items: [
          "Winter ceremonies and evening receptions: mid to heavier weight wool. The drape is worth it and you will be comfortable.",
          "Summer daytime functions: lighter wools, wool blends and linen blends. Accept some creasing in exchange for being able to stand outside.",
          "Monsoon-season functions: prioritise crease recovery over hand-feel. A tighter twist recovers; a soft, lofty cloth does not.",
        ],
      },
      {
        type: "p",
        text: "If you are having a three-piece made for a summer function, a lining-backed waistcoat rather than a full-cloth back removes a surprising amount of heat for no visible difference under the jacket.",
      },
      { type: "h2", id: "colour", text: "Colour, and how it behaves in photographs" },
      {
        type: "p",
        text: "Colour choice is more constrained by lighting than by fashion. Under a photographer's flash, pure black tends to flatten into a shape with no visible texture or detail. Midnight blue reads as black to the eye but retains depth in the image, which is why it is so often recommended for evening events.",
      },
      {
        type: "p",
        text: "For daytime ceremonies, warmer and lighter tones photograph well in natural light: ivory, sand, stone, soft blues and warm greys. For evening receptions, depth works better: midnight blue, deep charcoal, burgundy and forest.",
      },
      {
        type: "link",
        href: "/journal/best-suit-colours-indian-weddings",
        label: "Best suit colours for Indian weddings",
        note: "A longer treatment of colour by function, season and lighting.",
      },
      { type: "h2", id: "timing", text: "Timing: work backwards, not forwards" },
      {
        type: "p",
        text: "The correct way to build the schedule is to take the date of your earliest function and work backwards through collection, final fitting, first fitting, cutting, cloth selection and consultation. Doing it forwards from today produces a plan that always seems to have enough time until suddenly it does not.",
      },
      {
        type: "p",
        text: "Fittings need space between them. A garment corrected at a first fitting has to be taken apart and remade before the second, and compressing that gap is where quality is lost. The weeks immediately before a wedding are also the weeks you will least want to spend standing in a fitting room.",
      },
      {
        type: "quote",
        text: "Bring your dates to the consultation. A tailor who tells you the timeline is tight is doing you a favour.",
      },
      { type: "h2", id: "wedding-party", text: "Coordinating the wedding party" },
      {
        type: "p",
        text: "Coordination is not uniformity. A wedding party in identical suits photographs like a corporate offsite. What works far better is a shared cloth family with deliberate variation: the groom in a different configuration or a distinguishing lapel, the party in a related tone.",
      },
      {
        type: "ol",
        items: [
          "Agree the direction in one room, with everyone present if possible. Decisions made separately do not converge.",
          "Group the fittings. People travelling in from Chandigarh, Jalandhar or further should come once, not three times.",
          "Give the groom a point of difference. A peak lapel, a different waistcoat, or a distinct cloth within the same family.",
          "Fix a cut-off date for additions. Someone always asks to join late, and there is a point past which the answer has to be no.",
        ],
      },
      { type: "h2", id: "fitting-day", text: "What to bring to the fitting" },
      {
        type: "ul",
        items: [
          "The shoes you will actually wear. Trouser length cannot be set without them.",
          "The shirt, if it is already chosen, so sleeve length can be checked against the cuff.",
          "Anything that will be worn with the outfit: a watch you always wear, a kalgi or brooch, a pocket square.",
          "Your function schedule, if it has changed since the consultation.",
        ],
      },
      { type: "h2", id: "summary", text: "The short version" },
      {
        type: "ol",
        items: [
          "Map every function with its date, time and setting before discussing cloth.",
          "Choose cloth weight for the season the function actually falls in.",
            "Favour midnight blue over black for evening events that will be photographed.",
          "Build the schedule backwards from the earliest function.",
          "Coordinate the party in one room, and group their fittings.",
          "Bring your shoes to every fitting.",
        ],
      },
    ],
    related: [
      {
        label: "Wedding and groom suits",
        href: "/wedding-suits",
        note: "How wedding commissions are planned and fitted.",
      },
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "The usual configuration for a wedding ceremony.",
      },
      {
        label: "Book a consultation",
        href: "/contact",
        note: "Bring your dates and we will work backwards from them.",
      },
    ],
  },

  {
    slug: "two-piece-vs-three-piece-suits",
    title: "Two-Piece vs Three-Piece Suits: Which One You Actually Need",
    shortTitle: "Two-Piece vs Three-Piece",
    metaTitle: "Two-Piece vs Three-Piece Suits",
    metaDescription:
      "The practical differences between a two-piece and a three-piece suit: formality, heat, versatility and when each is the right choice.",
    published: "2026-02-03",
    readingMinutes: 6,
    category: "Guides",
    tags: ["two piece vs three piece", "3 piece suit", "waistcoat suit", "coat pant with waistcoat", "which suit to choose"],
    excerpt:
      "The waistcoat is not a decoration. It changes the formality, the warmth and the number of occasions a suit can cover.",
    image: {
      src: "/images/journal/two-vs-three-piece.webp",
      alt: "A two-piece and a three-piece suit displayed side by side",
    },
    blocks: [
      {
        type: "p",
        text: "A two-piece suit is a jacket and a trouser. A three-piece adds a matching waistcoat. That is the whole technical difference, and it changes more than it sounds like it should.",
      },
      { type: "h2", id: "formality", text: "Formality" },
      {
        type: "p",
        text: "A waistcoat raises the formality of an outfit by a clear step. The same cloth, the same cut and the same shirt read noticeably more formal with a waistcoat than without one. This is why three-piece suits dominate wedding ceremonies and why they are relatively rare in a modern office.",
      },
      {
        type: "p",
        text: "It also solves a specific problem: what the groom looks like when the jacket comes off. At a reception, in the heat, or on a dance floor, a two-piece leaves you in shirtsleeves. A three-piece leaves you in a waistcoat, which is still a finished outfit.",
      },
      { type: "h2", id: "heat", text: "Heat, honestly assessed" },
      {
        type: "p",
        text: "A waistcoat is a complete extra layer across the torso. In a Punjab summer at an outdoor daytime function, that is not a small consideration.",
      },
      {
        type: "p",
        text: "There are ways to reduce the penalty. A traditional lining-backed waistcoat is considerably cooler than a full-cloth back, and it is invisible under the jacket. A lighter cloth throughout helps more. But the layer is still there, and it is better to decide with that in mind than to discover it at the function.",
      },
      { type: "h2", id: "versatility", text: "Versatility and cost per wearing" },
      {
        type: "p",
        text: "A two-piece is the more useful garment across a year. It works for business, for daytime events, for travel, and it separates more readily into a jacket and trousers that can be worn independently.",
      },
      {
        type: "p",
        text: "A three-piece is more occasion-specific. If you buy one, it will be worn for weddings and formal evenings and will spend most of the year in a wardrobe. That is not an argument against it — the occasions it serves are the ones where it matters most — but it should be a conscious trade.",
      },
      {
        type: "dl",
        items: [
          {
            term: "Choose a two-piece if",
            detail:
              "the suit will be worn regularly, you work in an office, the occasion is in summer, or this is your first tailored suit.",
          },
          {
            term: "Choose a three-piece if",
            detail:
              "the occasion is a wedding ceremony or a formal evening, you want a second look for when the jacket comes off, or the event falls in winter.",
          },
        ],
      },
      { type: "h2", id: "waistcoat-fit", text: "If you choose a three-piece, get the waistcoat right" },
      {
        type: "p",
        text: "The waistcoat is the least forgiving garment in a suit because it sits directly on the body with nothing over it when the jacket is off. Three rules cover most of it.",
      },
      {
        type: "ol",
        items: [
          "It must fully cover the trouser waistband, standing and seated. Any gap where the shirt shows is a fit failure, not a style.",
          "It must close without strain. Fronts that pull into an X shape at the buttons are too tight, and the fabric will show it in every photograph.",
          "The armhole and neckline must sit high enough to stay hidden under the jacket.",
        ],
      },
      {
        type: "p",
        text: "And leave the bottom button undone. It is not only convention — it lets the garment sit properly over the hips when you sit down.",
      },
      { type: "h2", id: "verdict", text: "The short answer" },
      {
        type: "p",
        text: "If you are having one suit made and it needs to work often, make it a two-piece. If you are having one suit made for a wedding you will be photographed at, make it a three-piece. If you are having two made, make one of each and choose different cloth weights so they cover different seasons.",
      },
    ],
    related: [
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "Configuration, cloth and how to get two outfits from one suit.",
      },
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "Waistcoat fit, matching versus contrasting, and heat.",
      },
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Planning a groom's wardrobe across several functions.",
      },
    ],
  },

  {
    slug: "how-should-a-mens-suit-fit",
    title: "How Should a Men's Suit Fit? Eight Checks You Can Do in a Mirror",
    shortTitle: "How a Suit Should Fit",
    metaTitle: "How Should a Men's Suit Fit?",
    metaDescription:
      "A practical checklist for suit fit: shoulder, collar, chest, sleeve length, jacket length, waist, trouser rise and break, with what can and cannot be altered.",
    published: "2026-02-21",
    readingMinutes: 8,
    category: "Fit",
    tags: ["suit fit guide", "how should a suit fit", "shoulder fit", "trouser break", "coat pant fitting"],
    excerpt:
      "Most fit problems are visible to anyone once they know where to look. Here is the order to look in.",
    image: {
      src: "/images/journal/suit-fit-checks.webp",
      alt: "A jacket shoulder and collar being checked during a fitting",
    },
    blocks: [
      {
        type: "p",
        text: "You do not need to be a tailor to assess a suit. You need to know the order to check things in, and which problems can be fixed afterwards.",
      },
      {
        type: "p",
        text: "Work down the body. Stand naturally, in the shoes you would wear, with the jacket buttoned.",
      },
      { type: "h2", id: "shoulder", text: "1. The shoulder" },
      {
        type: "p",
        text: "The shoulder seam should end where your shoulder ends — at the bone, not past it and not short of it. If the seam overhangs, you will see a dent or a ripple just below it. If it sits inside your shoulder, the sleeve will pull.",
      },
      {
        type: "p",
        text: "This is the one to check first because it is the one that cannot be honestly fixed. Altering a shoulder means dismantling the sleeve, the canvas and often the collar, and the result is rarely as clean as cutting it correctly would have been. If the shoulders are wrong, nothing else matters.",
      },
      { type: "h2", id: "collar", text: "2. The collar" },
      {
        type: "p",
        text: "The jacket collar should rest against your shirt collar along its whole length, with no gap. A gap that opens and closes as you move usually means a balance problem — the jacket is being pulled backwards or forwards by how it hangs.",
      },
      {
        type: "p",
        text: "A collar gap on a ready-made jacket is common and is often treated as normal. It is not normal. It is the garment telling you its balance does not match your posture.",
      },
      { type: "h2", id: "chest", text: "3. The chest and the button" },
      {
        type: "p",
        text: "With the jacket buttoned, the lapels should lie flat against your chest. If they bow outward, or if an X-shaped crease radiates from the waist button, the jacket is too tight through the chest or the waist.",
      },
      {
        type: "p",
        text: "You should be able to slide a flat hand between your chest and the buttoned jacket, but not a fist.",
      },
      { type: "h2", id: "sleeve", text: "4. Sleeve length" },
      {
        type: "p",
        text: "The jacket sleeve should end where your wrist meets your hand, leaving about a centimetre of shirt cuff visible. A little more is a matter of taste; none at all makes the jacket look borrowed.",
      },
      {
        type: "p",
        text: "Also watch how the sleeve hangs when you stand still with your arms down. Twisting or a diagonal ripple at the top of the sleeve is a pitch problem — the sleeve is set at the wrong angle for how your arm naturally hangs.",
      },
      { type: "h2", id: "jacket-length", text: "5. Jacket length" },
      {
        type: "p",
        text: "The jacket should cover your seat. Beyond that, length is proportional: the longer the jacket, the shorter your legs appear, and the shorter the jacket, the more torso shows.",
      },
      {
        type: "p",
        text: "A reasonable check is that the hem falls somewhere around the knuckles of your relaxed hand. This is a starting point, not a law — a long torso or long arms will move it.",
      },
      { type: "h2", id: "waist", text: "6. Waist and vents" },
      {
        type: "p",
        text: "The jacket should narrow visibly between chest and hip. If it does not, it reads as a box. If it narrows too much, the vents will flare open when you stand still, which is the most reliable sign of a jacket taken in too far.",
      },
      { type: "h2", id: "trouser-rise", text: "7. Trouser rise" },
      {
        type: "p",
        text: "The waistband should sit where your body actually narrows, at or near your natural waist, rather than on your hips. A trouser sitting at the natural waist stays in place when you sit, needs less from a belt, and makes the leg look longer.",
      },
      {
        type: "p",
        text: "Most ready-made trousers sit lower than is ideal for a suit, which is why so many suit trousers need constant adjustment through the day.",
      },
      { type: "h2", id: "break", text: "8. Trouser break" },
      {
        type: "p",
        text: "Break is the fold where the hem meets the shoe. A quarter break — one soft fold — is the most broadly flattering and the safest default. No break is cleaner and more modern but unforgiving of any error. A half or full break suits a wider leg and heavier cloth.",
      },
      {
        type: "p",
        text: "Whatever you choose, choose it in the shoes you will wear. A two-centimetre difference in heel height changes the break entirely.",
      },
      { type: "h2", id: "what-can-be-fixed", text: "What can be fixed afterwards" },
      {
        type: "dl",
        items: [
          {
            term: "Readily altered",
            detail:
              "Trouser length and taper, trouser waist within a few centimetres, jacket waist, sleeve length, shirt body and sleeves.",
          },
          {
            term: "Difficult or unwise",
            detail:
              "Jacket length, since shortening it moves the pockets and button stance out of proportion. Letting anything out beyond the seam allowance that exists.",
          },
          {
            term: "Effectively not fixable",
            detail:
              "The shoulder. Check it first, and walk away if it is wrong.",
          },
        ],
      },
      {
        type: "link",
        href: "/alterations",
        label: "Alterations and refitting",
        note: "An honest assessment of what a garment you already own can become.",
      },
    ],
    related: [
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "How these points are addressed in the pattern rather than afterwards.",
      },
      {
        label: "Alterations",
        href: "/alterations",
        note: "What can and cannot be corrected on an existing garment.",
      },
      {
        label: "Custom trousers",
        href: "/custom-trousers",
        note: "Rise and break explained in more detail.",
      },
    ],
  },

  {
    slug: "best-suit-colours-indian-weddings",
    title: "Best Suit Colours for Indian Weddings",
    shortTitle: "Wedding Suit Colours",
    metaTitle: "Best Suit Colours for Indian Weddings",
    metaDescription:
      "Which suit colours work for Indian wedding ceremonies, receptions and engagements, how each behaves in daylight and under flash photography, and what to avoid.",
    published: "2026-03-09",
    readingMinutes: 7,
    category: "Weddings",
    tags: ["wedding suit colour", "maroon suit", "royal blue suit", "ivory groom suit", "midnight blue suit", "best suit colour for wedding"],
    excerpt:
      "Colour choice is a lighting decision more than a fashion one. What reads well at noon rarely reads well at ten at night.",
    image: {
      src: "/images/journal/wedding-suit-colours.webp",
      alt: "Suiting swatches in midnight blue, ivory, burgundy and charcoal",
    },
    blocks: [
      {
        type: "p",
        text: "The most common mistake in choosing a wedding suit colour is choosing it in a showroom under white light, for an event that will happen outdoors at noon or indoors at ten at night. Colour behaves differently in each, and photographs differently again.",
      },
      { type: "h2", id: "black-problem", text: "The problem with black" },
      {
        type: "p",
        text: "Black is the default assumption for formality, and it is the colour most likely to disappoint in photographs. Under a photographer's flash, black absorbs almost everything and flattens into a silhouette with no visible lapel roll, no texture and no detail.",
      },
      {
        type: "p",
        text: "Midnight blue solves this. It reads as black to the eye in low light, but it retains enough reflectance to show structure in an image. If you want the authority of black in evening photographs, midnight blue is very often the better executed version of that idea.",
      },
      { type: "h2", id: "daytime", text: "Daytime ceremonies" },
      {
        type: "p",
        text: "Natural light is generous and lets warmer, lighter tones do their work. It also exposes anything harsh.",
      },
      {
        type: "dl",
        items: [
          {
            term: "Ivory and cream",
            detail:
              "The classic groom's choice for a daytime ceremony. Warm against most Indian skin tones and it photographs beautifully in natural light. It also shows every mark, so plan accordingly.",
          },
          {
            term: "Sand, stone and beige",
            detail:
              "More forgiving than ivory and less stark. Excellent in strong daylight and genuinely wearable again afterwards.",
          },
          {
            term: "Soft blue and powder tones",
            detail:
              "Light and modern without being loud. Works well for engagements and daytime functions, less so for a formal evening.",
          },
          {
            term: "Warm mid-grey",
            detail:
              "The most versatile daytime choice. Formal enough for a ceremony and useful long after the wedding.",
          },
        ],
      },
      { type: "h2", id: "evening", text: "Evening receptions" },
      {
        type: "p",
        text: "Artificial light is directional and unforgiving. Depth of colour matters more than lightness, and texture becomes valuable because it catches light that a flat cloth would swallow.",
      },
      {
        type: "dl",
        items: [
          {
            term: "Midnight blue",
            detail:
              "The strongest evening choice. Formal, deep, and it photographs with visible structure where black does not.",
          },
          {
            term: "Deep charcoal",
            detail:
              "Slightly softer than midnight blue and more useful afterwards. A good choice if the suit needs a second life.",
          },
          {
            term: "Maroon, wine and burgundy",
            detail:
              "The same family, and the one asked for most often for receptions in Punjab. Distinctive without being costume, and particularly good in a textured cloth under warm lighting.",
          },
          {
            term: "Royal blue",
            detail:
              "Brighter and more photographic than navy, and a common choice for a sangeet or an engagement where the ceremony suit is more restrained.",
          },
          {
            term: "Deep forest and bottle green",
            detail:
              "Increasingly common and genuinely flattering under warm light. Reads richer in person than in a swatch.",
          },
        ],
      },
      { type: "h2", id: "skin-tone", text: "Working with your own colouring" },
      {
        type: "p",
        text: "The useful principle is contrast, not rules. If your hair, eyes and skin sit close together in tone, softer and lower-contrast combinations will look harmonious and a very dark suit with a very white shirt may overwhelm you. If your natural colouring is high in contrast, stronger contrasts will look intentional rather than harsh.",
      },
      {
        type: "p",
        text: "Test this the simple way: hold the cloth up beside your face in daylight, not under shop lighting, and look at what happens to your face rather than to the cloth.",
      },
      { type: "h2", id: "texture", text: "Texture is a colour decision" },
      {
        type: "p",
        text: "Two suits in the same colour can photograph completely differently depending on weave. A flat, smooth worsted in deep charcoal reads almost as a block of colour. The same charcoal in a herringbone or a subtle twill shows movement and depth.",
      },
      {
        type: "p",
        text: "For a heavily photographed function, texture is a low-risk way to make a conservative colour interesting without doing anything that will look dated in ten years.",
      },
      { type: "h2", id: "coordination", text: "Coordinating with the wedding party" },
      {
        type: "p",
        text: "Give the groom the highest-contrast or most distinct position in the group, not a different universe. If the party is in charcoal, the groom in midnight blue or in a distinctly different texture reads correctly. The groom in a completely unrelated colour reads as an error.",
      },
      {
        type: "p",
        text: "Also consider the bride's outfit before finalising. This sounds obvious and is skipped constantly.",
      },
      { type: "h2", id: "avoid", text: "What to be careful with" },
      {
        type: "ul",
        items: [
          "Very shiny cloths. They read cheaply under flash even when they are not, and they age badly in photographs.",
          "Pure black for evening photography, unless you have seen how your photographer handles it.",
          "Colours chosen only from a phone screen. Screen calibration and cloth are not the same thing.",
          "A colour you would not wear again, unless the occasion genuinely justifies a single-use garment.",
        ],
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "How a groom's wardrobe is planned across functions.",
      },
      {
        label: "Choosing a wedding suit",
        href: "/journal/how-to-choose-a-wedding-suit-in-ludhiana",
        note: "The full planning guide, from dates to fittings.",
      },
      {
        label: "Fabric",
        href: "/our-craft#fabric",
        note: "How weave and weight change how a colour behaves.",
      },
    ],
  },

  {
    slug: "custom-vs-ready-made-suits",
    title: "Custom vs Ready-Made Suits: What You Are Actually Paying For",
    shortTitle: "Custom vs Ready-Made",
    metaTitle: "Custom vs Ready-Made Suits",
    metaDescription:
      "An honest comparison of bespoke, made-to-measure and ready-made suits: what changes, what does not, when ready-made is the right answer, and where the money goes.",
    published: "2026-03-28",
    readingMinutes: 7,
    category: "Guides",
    tags: ["custom vs readymade suit", "bespoke vs made to measure", "stitched suit vs readymade"],
    excerpt:
      "Ready-made is sometimes the correct choice. Knowing when is worth more than knowing that bespoke is better.",
    image: {
      src: "/images/journal/custom-vs-ready-made.webp",
      alt: "A paper pattern beside a finished jacket on a cutting table",
    },
    blocks: [
      {
        type: "p",
        text: "Three terms get used interchangeably and mean quite different things. Understanding them is the difference between paying for what you wanted and paying for what you were sold.",
      },
      { type: "h2", id: "definitions", text: "The three categories" },
      {
        type: "dl",
        items: [
          {
            term: "Ready-made",
            detail:
              "Cut to a standard size from an averaged pattern, finished before you saw it. Any adjustment happens afterwards, within the limits of the seams.",
          },
          {
            term: "Made-to-measure",
            detail:
              "An existing block pattern is modified to your measurements before cutting. Faster than bespoke, and capable of a genuinely good result on a body close to the block.",
          },
          {
            term: "Bespoke",
            detail:
              "A pattern is drafted from your measurements before any cloth is cut. Posture, asymmetry and proportion are resolved on paper, and the garment is corrected on your body at fittings.",
          },
        ],
      },
      {
        type: "p",
        text: "The line that matters is the second one: whether a pattern existed before you did. Everything downstream follows from that.",
      },
      { type: "h2", id: "what-changes", text: "What actually changes" },
      {
        type: "p",
        text: "The visible difference is concentrated in a few places, and it is worth knowing which, because it tells you what you are buying.",
      },
      {
        type: "ul",
        items: [
          "The shoulder, which is cut to your slope and width rather than to an average. This is the single most visible difference.",
          "Balance, the relationship between front and back length, which decides whether a jacket hangs level or pulls.",
          "Sleeve pitch, the angle the sleeve is set at, which decides whether the sleeve is clean when you stand still.",
          "Trouser rise, which decides whether the waistband stays where you put it.",
        ],
      },
      {
        type: "p",
        text: "Note what is not on that list: chest, waist and length are all adjustable afterwards to some degree. If those are your only complaints with ready-made, alteration may be the efficient answer.",
      },
      { type: "h2", id: "when-ready-made", text: "When ready-made is the right choice" },
      {
        type: "p",
        text: "If your proportions happen to sit close to a standard size, a good ready-made suit with competent alteration can look excellent and can be had immediately. There is no honour in over-commissioning.",
      },
      {
        type: "p",
        text: "Ready-made makes sense when the need is urgent, when the suit is for a single occasion you do not expect to repeat, or when your body is genuinely close to the pattern the manufacturer used. The test is the shoulder: try it on, and if the shoulder fits, the rest is negotiable.",
      },
      { type: "h2", id: "when-custom", text: "When custom earns its cost" },
      {
        type: "ul",
        items: [
          "When ready-made jackets never fit your shoulders, whatever size you try.",
          "When you have asymmetry — a dropped shoulder, a forward stance, a fuller seat — that alteration keeps failing to resolve.",
          "When the garment will be worn often enough that fit and durability compound.",
          "When the occasion is significant and heavily photographed.",
          "When you want a specific cloth, a specific configuration, or details that simply are not sold.",
        ],
      },
      { type: "h2", id: "where-money-goes", text: "Where the money actually goes" },
      {
        type: "p",
        text: "Three things drive the cost of a tailored garment: the cloth, the hours, and the internal construction you never see. The third is the one most often cut to reach a price.",
      },
      {
        type: "p",
        text: "A canvas that is sewn into the jacket allows the chest and lapel to mould to your body over time. A fused alternative is glued, faster and cheaper, and it is the reason some jackets develop bubbling at the chest after a few dry-cleans. This is worth asking about directly, whatever you are buying.",
      },
      { type: "h2", id: "honest-answer", text: "The honest answer" },
      {
        type: "p",
        text: "A well-fitting ready-made suit beats a badly made custom one. The category is not the guarantee; the execution is. Ask what the construction is, ask how many fittings are included, and ask what happens if it is not right at the final fitting. The answers will tell you more than the label does.",
      },
    ],
    related: [
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "The process, stage by stage, and what each fitting is for.",
      },
      {
        label: "How a suit should fit",
        href: "/journal/how-should-a-mens-suit-fit",
        note: "Eight checks to judge any suit, custom or not.",
      },
      {
        label: "Alterations",
        href: "/alterations",
        note: "When correcting what you own is the efficient answer.",
      },
    ],
  },

  {
    slug: "how-long-does-a-custom-suit-take",
    title: "How Long Does a Custom Suit Take?",
    shortTitle: "Custom Suit Timelines",
    metaTitle: "How Long Does a Custom Suit Take?",
    metaDescription:
      "What determines how long a custom suit takes, why fittings need space between them, how to plan a wedding commission, and when a timeline is genuinely too tight.",
    published: "2026-04-16",
    readingMinutes: 5,
    category: "Guides",
    tags: ["suit stitching time", "how long does a suit take", "wedding suit timeline"],
    excerpt:
      "The honest answer is that it depends, and the reasons it depends are the same reasons the garment will be good.",
    image: {
      src: "/images/journal/suit-timeline.webp",
      alt: "A basted jacket at first fitting stage, marked with chalk and pins",
    },
    blocks: [
      {
        type: "p",
        text: "This is the most common question and the one with the least satisfying answer, because a specific number given upfront is usually either a guess or a marketing figure.",
      },
      {
        type: "p",
        text: "What is genuinely useful is understanding what the time is spent on, so you can judge for yourself whether a timeline is realistic.",
      },
      { type: "h2", id: "stages", text: "Where the time goes" },
      {
        type: "ol",
        items: [
          "Consultation and measurement. One sitting, unhurried. This is the cheapest place to spend time and the most valuable.",
          "Cloth selection and ordering. If the cloth is in stock, immediate. If it has to come in, this is often the longest single wait and it is outside the tailor's control.",
          "Pattern drafting and cutting. Skilled work, and not the bottleneck.",
          "Basting and assembly to first-fitting stage. The garment is put together loosely so it can be taken apart again.",
          "First fitting, then correction. The garment is opened, re-cut where needed, and remade.",
          "Finishing: buttonholes, buttons, final pressing.",
          "Final fitting and collection.",
        ],
      },
      { type: "h2", id: "gaps", text: "Why the gaps between fittings matter" },
      {
        type: "p",
        text: "The waiting between fittings is not idle time. After a first fitting, the garment has to be dismantled, corrected and reassembled, and that is real work on a real bench alongside other commissions.",
      },
      {
        type: "p",
        text: "Compressing those gaps is the most common way quality is lost on a rushed job. The cutting does not get worse; the correction gets skipped.",
      },
      { type: "h2", id: "what-affects", text: "What makes a commission take longer" },
      {
        type: "ul",
        items: [
          "A three-piece rather than a two-piece, since the waistcoat is a third garment to fit.",
          "Cloth that has to be ordered in, or a pattern that must be matched across panels.",
          "A first commission rather than a repeat, since no pattern exists yet.",
          "Wedding season, when the bench is busiest. This is worth planning around.",
          "Any correction at first fitting that turns out to be significant.",
        ],
      },
      { type: "h2", id: "weddings", text: "Planning a wedding commission" },
      {
        type: "p",
        text: "Work backwards from your earliest function, not forwards from today. Allow for collection before the event rather than on the day of it, and build in one more fitting than you expect to need.",
      },
      {
        type: "p",
        text: "If you are coordinating a wedding party, add time again. Group commissions move at the speed of the slowest participant, and there is always one.",
      },
      { type: "h2", id: "too-tight", text: "When a timeline is genuinely too tight" },
      {
        type: "p",
        text: "A tailor who tells you a deadline is not achievable is giving you useful information, not losing your business. The alternative — agreeing to a date and then compressing the fittings — produces a garment you will be disappointed by at the exact moment it matters most.",
      },
      {
        type: "p",
        text: "If the timeline is short, there are honest options: a simpler construction, a cloth that is already in stock, a two-piece rather than a three-piece, or a made-to-measure route rather than a full bespoke draft. Any of these is better than a rushed bespoke commission.",
      },
      {
        type: "link",
        href: "/contact",
        label: "Bring your dates to a consultation",
        note: "We will work backwards from your event and tell you honestly what is realistic.",
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "How wedding commissions are scheduled around functions.",
      },
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "What happens at each stage of a commission.",
      },
      {
        label: "Our craft",
        href: "/our-craft",
        note: "The full process, from consultation to final finish.",
      },
    ],
  },
];

export const articleBySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return articleBySlug.get(slug);
}

/** Newest first. */
export const articlesByDate = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);
