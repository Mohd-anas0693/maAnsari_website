/**
 * SERVICE PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Each entry drives one indexable page. Content is written to answer real
 * customer questions, not to hit keyword counts.
 *
 * Deliberate omissions: no prices, no guaranteed turnaround, no fabric brand
 * names, no claims about years in business. Anything that depends on the
 * actual operation is phrased as "confirmed at your consultation" so the page
 * is truthful before the owner fills in specifics.
 */

export interface ServiceSection {
  heading: string;
  body: string[];
  /** Optional definition list rendered as a semantic <dl>. */
  points?: { term: string; detail: string }[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  /** Descriptive anchor context, shown under the link. */
  note: string;
}

export interface Service {
  slug: string;
  /** Route path. Kept explicit so URLs never drift from the slug. */
  href: string;
  navLabel: string;
  /** <h1> */
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  /** Opening statement under the h1. */
  lede: string;
  /** Short intro paragraph(s) — the first indexable prose on the page. */
  intro: string[];
  image: { src: string; alt: string };
  /** Key-value facts rendered as a spec table. */
  specs: { label: string; value: string }[];
  sections: ServiceSection[];
  faqs: ServiceFaq[];
  related: RelatedLink[];
  /** Appointment service pre-selected when arriving from this page. */
  appointmentService: string;
}

const CONSULT = "Confirmed at your consultation";

export const services: Service[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "bespoke-tailoring",
    href: "/bespoke-tailoring",
    navLabel: "Bespoke Tailoring",
    title: "Bespoke Tailoring",
    eyebrow: "The House Discipline",
    metaTitle: "Bespoke Tailoring in Ludhiana",
    metaDescription:
      "Bespoke men's tailoring in Ludhiana. Personal measurements, fabric selection and fittings for suits, jackets, shirts and trousers made to your proportions.",
    lede: "A garment drafted to one set of measurements, corrected on your body, and finished to the way you actually wear it.",
    intro: [
      "Bespoke tailoring is a process before it is a product. It begins with a conversation about what the garment is for, moves through measurement and fabric, and arrives at a fitting where the garment is corrected on you rather than on a mannequin.",
      "The result is not simply a better fit in the abstract. It is a garment that accounts for the way your shoulders sit, how you carry your weight, which side you favour, and what you will be doing while wearing it.",
    ],
    image: {
      src: "/images/craft/pattern-drafting.webp",
      alt: "Tailor's chalk, measuring tape and paper pattern on a cutting table",
    },
    specs: [
      { label: "Measurements taken", value: "In person, at the studio" },
      { label: "Fittings", value: "Typically two, more if the cloth asks for it" },
      { label: "Fabric", value: "Selected with you before cutting" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "What separates bespoke from ready-made",
        body: [
          "A ready-made suit is cut to an averaged body. It assumes a fixed drop between chest and waist, a standard shoulder slope, and sleeve and trouser lengths that will be shortened later. For many people one or two of those assumptions happen to be close. Rarely are all of them.",
          "Bespoke reverses the order. The body is measured first, the pattern is made second, and the cloth is cut to that pattern. Nothing is averaged, and the compromises that a ready-made garment hides under alteration simply do not occur.",
        ],
        points: [
          {
            term: "Shoulder",
            detail:
              "The one part of a jacket that alteration cannot honestly fix. Cutting to your natural shoulder slope and width is the single largest difference you will see in a mirror.",
          },
          {
            term: "Balance",
            detail:
              "Front and back length are set independently so the jacket hangs level rather than pulling toward the collar or flaring at the hem.",
          },
          {
            term: "Posture",
            detail:
              "A forward head, a dropped shoulder or a fuller seat are all accommodated in the pattern. They are proportions, not problems.",
          },
        ],
      },
      {
        heading: "Bespoke, made-to-measure and alteration",
        body: [
          "These three terms are used loosely across the industry, so it is worth being precise about what you are buying.",
          "Bespoke means the pattern is drafted for you. Made-to-measure means an existing block pattern is adjusted to your measurements — faster, and entirely appropriate for many garments. Alteration means an already-finished garment is modified within the limits of its seams. We will tell you plainly which route suits your garment, your occasion and your timeline.",
        ],
      },
      {
        heading: "What we make",
        body: [
          "Jackets and full suits in two-piece and three-piece configurations, standalone blazers, trousers, and shirts. Wedding commissions and coordinated group orders are handled as a single project with one point of contact.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between bespoke and made-to-measure?",
        answer:
          "In bespoke, a paper pattern is drafted specifically for your measurements before any cloth is cut. In made-to-measure, a standard block pattern is adjusted to your measurements. Bespoke allows more correction for posture and asymmetry; made-to-measure is usually faster. We will recommend one based on your garment and timeline.",
      },
      {
        question: "How many fittings will I need?",
        answer:
          "Most commissions involve two fittings: a first fitting where the garment is basted together and corrected on the body, and a final fitting once it is finished. Some garments and some cloths call for a third. The number is agreed with you, not fixed in advance.",
      },
      {
        question: "Can I bring my own fabric?",
        answer:
          "Yes. Bring it to your consultation so the length and width can be checked against the garment you want, and so the cloth can be assessed for how it will cut, press and wear.",
      },
      {
        question: "What should I bring to a fitting?",
        answer:
          "Wear or bring the shoes you intend to wear with the garment, since they set trouser length. If the suit is for a specific event, bring the shirt and any accessories you have already chosen.",
      },
    ],
    related: [
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "The most versatile starting point for a first commission.",
      },
      {
        label: "Custom shirts",
        href: "/custom-shirts",
        note: "Collar and cuff specified to sit correctly under a jacket.",
      },
      {
        label: "How a suit is made",
        href: "/our-craft",
        note: "The full sequence from cloth to finished garment.",
      },
    ],
    appointmentService: "Custom Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "suits",
    href: "/suits",
    navLabel: "Suits",
    title: "Custom Suits",
    eyebrow: "Signature Commission",
    metaTitle: "Custom Suits in Ludhiana",
    metaDescription:
      "Custom men's suits tailored in Ludhiana. Two-piece, three-piece, wedding and business suits cut to your measurements with personal fittings.",
    lede: "One garment, three decisions: the cloth, the cut, and how you intend to wear it.",
    intro: [
      "A suit does more work than any other thing a man owns. It is asked to be formal at a wedding, credible in a meeting, and comfortable for the eleven hours in between. Getting that range out of one garment is a matter of choosing well at the start.",
      "This page covers the choices that actually change the outcome. If you already know the occasion, the dedicated pages for wedding, corporate, two-piece and three-piece commissions go further.",
    ],
    image: {
      src: "/images/collections/two-piece-suit.webp",
      alt: "Charcoal two-piece suit jacket on a tailor's form under directional light",
    },
    specs: [
      { label: "Configurations", value: "Two-piece, three-piece" },
      { label: "Closure", value: "Single or double-breasted" },
      { label: "Lapels", value: "Notch, peak or shawl" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "Choosing the cut",
        body: [
          "Cut is the silhouette the pattern produces: how close the jacket sits to the chest, where the waist is suppressed, how long the body runs, and how much room the trouser carries through the thigh.",
          "There is no universally correct answer. A closer cut reads sharper in photographs and suits a leaner frame. A cut with more room through the chest and a softer shoulder is more comfortable across a long day and ages better. Most commissions sit somewhere between, and the first fitting is where that is settled.",
        ],
        points: [
          {
            term: "Jacket length",
            detail:
              "Long enough to cover the seat, short enough to keep the leg line long. Height and torso proportion decide this, not fashion.",
          },
          {
            term: "Lapel width",
            detail:
              "Set in proportion to your chest and shoulder. A very narrow lapel on a broad frame looks borrowed; a very wide one overwhelms a slim one.",
          },
          {
            term: "Button stance",
            detail:
              "Where the waist button sits governs how long the leg appears and how the lapel rolls. A small change here is very visible.",
          },
        ],
      },
      {
        heading: "Choosing cloth for Indian conditions",
        body: [
          "Weight matters more than colour for how a suit actually performs. A lighter open-weave wool moves air and recovers from creasing; a heavier cloth holds its shape and drapes more cleanly but is punishing in a Punjab summer.",
          "For year-round use in the North, a mid-weight wool is the practical default. For summer daytime events, lighter wools, wool blends and linen-blend cloths are worth the trade-off in crease resistance. For winter weddings and evening functions, heavier cloths reward you with a much better drape.",
        ],
      },
      {
        heading: "Where the fit is won",
        body: [
          "Four measurements decide whether a suit looks made or bought: the shoulder, the collar, the sleeve pitch and the trouser rise. Everything else can be corrected later. These four are cut in from the beginning, and they are what the first fitting exists to verify.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a custom suit take?",
        answer:
          "It depends on the construction, the cloth and how many fittings the garment needs. We confirm a date at your consultation and work backwards from your event rather than quoting a standard figure. If you are commissioning for a wedding, start earlier than you think you need to.",
      },
      {
        question: "Should I choose a two-piece or a three-piece suit?",
        answer:
          "A two-piece is more versatile and more comfortable in heat. A three-piece adds a waistcoat, which reads more formal, photographs better, and lets you remove the jacket without losing the finished look. For weddings the three-piece is the more common choice; for daily business wear, the two-piece.",
      },
      {
        question: "What suit colour works for an Indian wedding?",
        answer:
          "For daytime functions, lighter and warmer tones: sand, stone, soft blue, and ivory for the groom. For evening receptions, deeper tones read better under artificial light: midnight blue, deep charcoal, forest, burgundy and black. Midnight blue photographs particularly well because it holds its colour where black can flatten.",
      },
    ],
    related: [
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "Jacket and trouser, for business and everyday formal wear.",
      },
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "With a waistcoat, for weddings and formal occasions.",
      },
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Groom, reception and wedding-party commissions.",
      },
      {
        label: "Corporate suits",
        href: "/corporate-suits",
        note: "Built for repetition, travel and long days.",
      },
    ],
    appointmentService: "Custom Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "two-piece-suits",
    href: "/two-piece-suits",
    navLabel: "Two-Piece Suits",
    title: "Two-Piece Suits",
    eyebrow: "Jacket & Trouser",
    metaTitle: "Two-Piece Suits Tailored in Ludhiana",
    metaDescription:
      "Custom two-piece suits tailored in Ludhiana. Jacket and trouser cut from one cloth to your measurements, for business, formal events and daily wear.",
    lede: "The most useful garment in a wardrobe, and the one that rewards precision most visibly.",
    intro: [
      "A two-piece suit is a jacket and trouser cut from the same cloth. Its value is range: worn together it is formal, and separated it gives you a jacket and a pair of trousers that still work on their own.",
      "Because there is no waistcoat to cover the shirt, the fit of the jacket front and the line of the trouser are fully exposed. That is why a two-piece is the honest test of a tailor.",
    ],
    image: {
      src: "/images/collections/two-piece-suit.webp",
      alt: "Two-piece suit jacket and trouser presented on a wooden hanger",
    },
    specs: [
      { label: "Pieces", value: "Jacket and trouser" },
      { label: "Best for", value: "Business, daily formal, warm weather" },
      { label: "Common closure", value: "Two-button single-breasted" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "When a two-piece is the right choice",
        body: [
          "Choose a two-piece when the suit needs to work more than once a year. It is cooler than a three-piece, less formal in the best sense, and it does not commit you to a single occasion.",
          "It is also the better choice in a Punjab summer. A waistcoat adds a full extra layer across the torso, and at an outdoor daytime function in May that is a decision you will feel.",
        ],
      },
      {
        heading: "Getting more than one outfit from it",
        body: [
          "A two-piece cut in a textured or patterned cloth separates far better than one cut in a flat, formal worsted. If you want the jacket to work as a blazer on its own, say so before the cloth is chosen — it changes the recommendation.",
          "Practical note: wear the jacket and trouser together or apart, but not unevenly. Cloth fades and wears. A jacket worn twice as often as its trouser will eventually stop matching it.",
        ],
        points: [
          {
            term: "Jacket alone",
            detail:
              "Works over flannel or cotton trousers if the suit cloth has visible texture or pattern.",
          },
          {
            term: "Trouser alone",
            detail:
              "Pairs with a knit or a shirt for smart-casual occasions. Consider a second trouser in the same cloth if the suit will be worn often.",
          },
        ],
      },
      {
        heading: "The details worth specifying",
        body: [
          "Two buttons or three, notch lapel or peak, vents at the sides or a single vent at the centre, flapped pockets or jetted. None of these are decorative accidents; each changes how the garment reads and how it moves.",
          "Side vents give better access to trouser pockets and sit more cleanly when you are seated. A peak lapel raises the formality of a single-breasted jacket noticeably. Jetted pockets are cleaner and more formal; flaps are more practical outdoors.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between a two-piece and a three-piece suit?",
        answer:
          "A two-piece is a jacket and trouser. A three-piece adds a matching waistcoat. The waistcoat raises formality, covers the shirt when the jacket comes off, and adds warmth. A two-piece is more versatile and more comfortable in heat.",
      },
      {
        question: "Can I wear the jacket as a blazer on its own?",
        answer:
          "Often yes, but it depends on the cloth. A textured or patterned suiting separates convincingly. A smooth, flat formal worsted tends to look like an orphaned suit jacket. Tell us at the consultation if separating matters to you and we will steer the cloth choice accordingly.",
      },
      {
        question: "Is a two-piece suit formal enough for a wedding?",
        answer:
          "For most wedding functions, yes — particularly daytime events. For the main ceremony or an evening reception where you are the groom, a three-piece or a more formal cloth is usually the stronger choice.",
      },
    ],
    related: [
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "When the occasion calls for a waistcoat.",
      },
      {
        label: "Custom trousers",
        href: "/custom-trousers",
        note: "Add a second trouser in the same cloth to double the suit's life.",
      },
      {
        label: "Custom shirts",
        href: "/custom-shirts",
        note: "A collar cut to sit correctly inside the jacket.",
      },
    ],
    appointmentService: "Custom Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "three-piece-suits",
    href: "/three-piece-suits",
    navLabel: "Three-Piece Suits",
    title: "Three-Piece Suits",
    eyebrow: "With Waistcoat",
    metaTitle: "Three-Piece Suits Tailored in Ludhiana",
    metaDescription:
      "Custom three-piece suits tailored in Ludhiana. Jacket, waistcoat and trouser cut to your measurements for weddings, receptions and formal occasions.",
    lede: "The waistcoat is what holds the outfit together when the jacket comes off.",
    intro: [
      "A three-piece adds a waistcoat to the jacket and trouser. It is the configuration most often chosen for weddings, and for good reason: it photographs better, it holds a cleaner line through the torso, and it means the groom can remove his jacket at the reception without the outfit collapsing into shirtsleeves.",
      "It is also the configuration where fit errors are least forgiving, because the waistcoat sits directly on the body with nothing to disguise it.",
    ],
    image: {
      src: "/images/collections/three-piece-suit.webp",
      alt: "Three-piece suit with waistcoat displayed on a tailor's dress form",
    },
    specs: [
      { label: "Pieces", value: "Jacket, waistcoat and trouser" },
      { label: "Best for", value: "Weddings, receptions, formal evenings" },
      { label: "Waistcoat front", value: "Single or double-breasted, notch optional" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "How a waistcoat should fit",
        body: [
          "A waistcoat has three jobs and each has a rule. It must cover the trouser waistband completely, so no shirt shows in the gap when you stand or sit. It must close without strain, so the fronts lie flat rather than pulling into an X at the buttons. And it must be short enough at the armhole and neckline to disappear under the jacket.",
          "The bottom button of a single-breasted waistcoat is traditionally left undone. This is not only convention: it lets the garment sit properly over the hips when you sit down.",
        ],
        points: [
          {
            term: "Length",
            detail:
              "The front point should fall just past the trouser waistband. Too short and the shirt shows; too long and it bunches when seated.",
          },
          {
            term: "Back",
            detail:
              "Traditionally cut in lining with an adjustable strap. A full-cloth back is warmer and cleaner if the jacket will come off in photographs.",
          },
          {
            term: "Armhole",
            detail:
              "Cut high and clean so it never appears below the jacket's own armhole.",
          },
        ],
      },
      {
        heading: "Three-piece suits and Indian weddings",
        body: [
          "For a winter wedding, an evening reception or an indoor ceremony, a three-piece is close to ideal. The extra layer is welcome, the silhouette is formal, and the waistcoat gives the groom a second look for the reception.",
          "For an outdoor daytime function in peak summer, be honest about the heat. If you want the three-piece look, a lighter cloth and a lining-backed waistcoat make it survivable. If comfort matters more, a well-cut two-piece in a lighter cloth is not a downgrade.",
        ],
      },
      {
        heading: "Matching or contrasting",
        body: [
          "The waistcoat can be cut from the suit cloth or from a contrasting one. A matching waistcoat is the more formal and more classical option, and it is what most grooms choose for the ceremony.",
          "A contrasting waistcoat — a different texture, a subtle pattern, or a tonal shift — reads as a deliberate choice rather than a mismatch, and gives the suit an additional configuration. It works best when the contrast is clearly intentional rather than nearly-but-not-quite the same colour.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you make three-piece suits?",
        answer:
          "Yes. Jacket, waistcoat and trouser are cut together from the same commission, with the waistcoat fitted at the same fittings as the jacket so the two work as one garment.",
      },
      {
        question: "Should the waistcoat match the suit?",
        answer:
          "A matching waistcoat is the more formal and traditional option and is the usual choice for a wedding ceremony. A contrasting waistcoat gives the suit a second configuration and reads well when the contrast is clearly deliberate.",
      },
      {
        question: "Is a three-piece suit too warm for an Indian summer wedding?",
        answer:
          "It can be for an outdoor daytime function. A lighter cloth and a lining-backed waistcoat reduce the load considerably. For evening receptions and winter weddings, a three-piece is comfortable and is usually the better-looking choice.",
      },
      {
        question: "Which waistcoat button do I leave undone?",
        answer:
          "The bottom one, on a single-breasted waistcoat. It allows the garment to sit correctly over the hips when you are seated.",
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Groom and wedding-party commissions, planned as one project.",
      },
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "The lighter, more versatile alternative.",
      },
      {
        label: "Choosing wedding suit colours",
        href: "/journal/best-suit-colours-indian-weddings",
        note: "What reads well in daylight and under reception lighting.",
      },
    ],
    appointmentService: "Three-Piece Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "wedding-suits",
    href: "/wedding-suits",
    navLabel: "Wedding Suits",
    title: "Wedding & Groom Suits",
    eyebrow: "For The Occasion",
    metaTitle: "Wedding & Groom Suits in Ludhiana",
    metaDescription:
      "Custom wedding and groom suits tailored in Ludhiana. Ceremony, reception and engagement outfits, plus coordinated tailoring for the wedding party.",
    lede: "Several functions, several looks, one plan — made early enough that nothing is rushed.",
    intro: [
      "An Indian wedding is not one event, and a groom is rarely dressed for only one. Engagement, ceremony, reception and the functions around them each have a different light, a different formality and a different temperature.",
      "We approach a wedding commission as a project rather than a purchase. That means mapping the functions first, deciding where tailoring is the right answer, and working backwards from the earliest date so that fittings are unhurried.",
    ],
    image: {
      src: "/images/collections/wedding-suit.webp",
      alt: "Ivory wedding suit with peak lapels arranged for a groom's fitting",
    },
    specs: [
      { label: "Typical scope", value: "Ceremony, reception, engagement" },
      { label: "Group orders", value: "Wedding party and family, coordinated" },
      { label: "Start planning", value: "As early as your dates are fixed" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "The groom's wardrobe, function by function",
        body: [
          "Different functions ask for different things. Planning them together avoids the common outcome where two outfits end up looking like the same outfit.",
        ],
        points: [
          {
            term: "Engagement",
            detail:
              "Usually the least formal and the most personal. A strong blazer with contrasting trousers, or a lighter two-piece, gives you something you will wear again.",
          },
          {
            term: "Ceremony",
            detail:
              "The most photographed and the most formal. A three-piece in a considered cloth, cut precisely, with attention to how it reads in daylight and in close-up photography.",
          },
          {
            term: "Reception",
            detail:
              "Evening, artificial light, and movement. Deeper tones, a cleaner silhouette, and a cloth that holds a crease through a long night.",
          },
          {
            term: "Sangeet and mehndi",
            detail:
              "Where tailored Western formalwear is worn, it tends toward lighter construction and more comfort. We will say plainly when tailoring is not the right answer for a function.",
          },
        ],
      },
      {
        heading: "Sherwani-informed formal tailoring",
        body: [
          "Some grooms want the formality and length of traditional Indian formalwear with the structure and fit of a tailored jacket. That is a legitimate middle ground, and it is handled as a tailoring problem: a longer body, a higher closure, a cleaner front, and a collar treatment chosen deliberately.",
          "We will discuss honestly what we can and cannot make, and where a specialist in traditional garments is the better referral. A clear no is more useful to you than an ambitious yes.",
        ],
      },
      {
        heading: "The wedding party",
        body: [
          "Coordinating brothers, friends and family is a scheduling problem as much as a tailoring one. Group commissions are handled with one point of contact, a single agreed direction for cloth and cut, and fittings grouped so that people travelling in from outside Ludhiana come once rather than three times.",
          "Coordination does not mean identical. A shared cloth family with varied configurations — some two-piece, some three-piece, a different lapel for the groom — photographs far better than a uniform.",
        ],
      },
      {
        heading: "Timing",
        body: [
          "The single most common regret is starting late. Fittings need space between them, cloth needs to be chosen without pressure, and the weeks before a wedding are the weeks you will least want to spend in a fitting room.",
          "Bring your dates to the consultation. We will work backwards from the earliest function and tell you honestly whether the timeline is realistic for what you want.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you make wedding suits for the groom and the wedding party?",
        answer:
          "Yes. Group commissions are handled as a single project with one point of contact, a shared direction for cloth and cut, and grouped fittings so that people travelling in are not asked to visit repeatedly.",
      },
      {
        question: "How early should I start my wedding suit?",
        answer:
          "As soon as your dates are fixed. Fittings need time between them and cloth should be chosen without pressure. Bring your dates to the consultation and we will tell you honestly whether the timeline works for what you have in mind.",
      },
      {
        question: "What colour should a groom's suit be?",
        answer:
          "For a daytime ceremony, lighter and warmer tones photograph well: ivory, sand, stone and soft blues. For an evening reception, deeper tones hold up better under artificial light: midnight blue, deep charcoal, burgundy and forest. Midnight blue is often the safest strong choice because it photographs with more depth than black.",
      },
      {
        question: "Do you make outfits for more than one wedding function?",
        answer:
          "Yes, and planning them together is the point. Mapping the functions in one consultation avoids two outfits ending up nearly identical, and lets us vary cloth weight for the temperature each function will actually be held in.",
      },
    ],
    related: [
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "The usual configuration for a wedding ceremony.",
      },
      {
        label: "How to choose a wedding suit",
        href: "/journal/how-to-choose-a-wedding-suit-in-ludhiana",
        note: "A planning guide for grooms, function by function.",
      },
      {
        label: "Blazers",
        href: "/blazers",
        note: "For engagements and less formal functions.",
      },
      {
        label: "Book a consultation",
        href: "/contact",
        note: "Bring your dates and we will plan backwards from them.",
      },
    ],
    appointmentService: "Wedding Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "corporate-suits",
    href: "/corporate-suits",
    navLabel: "Corporate Suits",
    title: "Corporate & Business Suits",
    eyebrow: "For Work",
    metaTitle: "Corporate & Business Suits in Ludhiana",
    metaDescription:
      "Custom business suits tailored in Ludhiana for professionals and executives. Durable cloth, comfortable cut and repeatable fit for daily corporate wear.",
    lede: "A suit worn two hundred times a year is a different engineering problem to one worn twice.",
    intro: [
      "Business tailoring is judged on the days when nobody is looking at it. It has to survive a car, a desk, a flight and an eleven-hour day, and still look deliberate at the end of it.",
      "That changes the priorities. Cloth is chosen for recovery and durability rather than pure hand-feel, the cut allows real movement, and the pattern is kept on file so a second or third suit can be commissioned without starting over.",
    ],
    image: {
      src: "/images/collections/corporate-suit.webp",
      alt: "Navy business suit jacket photographed against a dark studio background",
    },
    specs: [
      { label: "Best for", value: "Daily office wear, travel, client-facing work" },
      { label: "Cloth priority", value: "Crease recovery and durability" },
      { label: "Repeat orders", value: "Pattern retained after first commission" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "Cloth that survives the week",
        body: [
          "For daily wear, a mid-weight worsted wool with a tighter twist is the workhorse. It resists creasing, recovers overnight on a hanger, and holds a press far longer than a softer, loftier cloth.",
          "Very lightweight and very soft cloths feel excellent in the shop and disappoint in use: they crease at the elbow and the seat within hours. Save them for occasion wear and put the durable cloth into the suit you actually wear on Tuesdays.",
        ],
        points: [
          {
            term: "Navy",
            detail:
              "The most useful single business suit. Reads professional in every setting and pairs with the widest range of shirts.",
          },
          {
            term: "Charcoal",
            detail:
              "The second suit. More formal than navy, excellent in winter, and the stronger choice for conservative environments.",
          },
          {
            term: "Mid-grey",
            detail:
              "The third. Lighter, warmer in tone, and the most comfortable of the three in a North Indian summer.",
          },
        ],
      },
      {
        heading: "Cut for movement",
        body: [
          "A business suit needs a slightly higher, cleaner armhole than people expect. Counterintuitively, a higher armhole gives more freedom, not less: the sleeve moves with the arm instead of dragging the whole jacket body upward when you reach.",
          "Trousers for daily wear benefit from a marginally higher rise than fashion currently favours. The waistband sits where the body actually narrows, which means it stays put when you sit and does not require a belt to fight gravity all day.",
        ],
      },
      {
        heading: "Building a rotation",
        body: [
          "Three suits in rotation last dramatically longer than two, because wool needs a day to recover between wears. If you wear a suit daily, the most cost-effective commission is not one expensive suit but enough suits to rest each one.",
          "A second trouser cut with the first suit is the highest-value addition you can make. Trousers wear out roughly twice as fast as jackets, and a matched spare doubles the practical life of the suit.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which suit colour should I buy first for office wear?",
        answer:
          "Navy. It works in the widest range of professional settings, pairs with more shirts than any other colour, and is appropriate from a morning meeting to an evening function. Charcoal is the usual second suit, mid-grey the third.",
      },
      {
        question: "Can I order the same suit again later?",
        answer:
          "Yes. Your pattern and measurements are retained after the first commission, so a repeat order in the same or a different cloth does not require starting from the beginning. We do recommend a quick re-measure if significant time has passed.",
      },
      {
        question: "How do I stop a business suit wearing out so quickly?",
        answer:
          "Rest it. Wool recovers if given a day between wears, so a rotation of three suits lasts far more than 1.5 times as long as a rotation of two. Add a second trouser to each suit, since trousers wear roughly twice as fast as jackets, and brush rather than dry-clean where possible.",
      },
    ],
    related: [
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "The standard configuration for business wear.",
      },
      {
        label: "Custom shirts",
        href: "/custom-shirts",
        note: "Collars that hold their shape through a working day.",
      },
      {
        label: "Custom trousers",
        href: "/custom-trousers",
        note: "A second trouser doubles the life of a business suit.",
      },
    ],
    appointmentService: "Custom Suit",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "blazers",
    href: "/blazers",
    navLabel: "Blazers",
    title: "Custom Blazers",
    eyebrow: "The Single Jacket",
    metaTitle: "Custom Blazers in Ludhiana",
    metaDescription:
      "Custom blazers and sport jackets tailored in Ludhiana. Structured or soft construction, cut to your measurements for events, business-casual and daily wear.",
    lede: "A jacket designed from the start to be worn on its own, not one rescued from a suit.",
    intro: [
      "A blazer is not a suit jacket without its trousers. It is cut with different intentions: more texture in the cloth, often a softer shoulder, patch or flapped pockets, and a colour that is meant to contrast rather than match.",
      "Because it will be worn alone, everything about it is visible. That makes it the single most useful garment to have made properly.",
    ],
    image: {
      src: "/images/collections/blazer.webp",
      alt: "Textured navy blazer with patch pockets on a wooden hanger",
    },
    specs: [
      { label: "Construction", value: "Structured or soft-shouldered" },
      { label: "Common pockets", value: "Patch, flapped or jetted" },
      { label: "Best for", value: "Events, business-casual, engagements" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "Structured or soft",
        body: [
          "Structure is how much shape the jacket imposes versus how much it follows your own. A structured jacket with a firmer canvas and a defined shoulder creates a clean, formal line and a broader silhouette. A softer jacket with minimal shoulder padding follows the body and is markedly more comfortable, especially in heat.",
          "Neither is more expensive or more correct. Structure suits formal settings and slimmer frames; softness suits warm weather, relaxed occasions and anyone who dislikes feeling held by their clothes.",
        ],
        points: [
          {
            term: "Structured",
            detail:
              "Defined shoulder line, firmer chest, more formal. Reads sharper in photographs.",
          },
          {
            term: "Half-lined",
            detail:
              "Lining through the shoulders and sleeves only. Noticeably cooler with most of the cleanliness of a full lining.",
          },
          {
            term: "Unlined or soft",
            detail:
              "Minimal internal structure. The most comfortable option in summer, and the most dependent on good cutting, since there is nothing to hide behind.",
          },
        ],
      },
      {
        heading: "Choosing cloth for a blazer",
        body: [
          "Texture is what makes a blazer read as a blazer. A cloth with visible weave, a subtle check, or a mottled tone announces that it was never part of a suit.",
          "Navy is the most useful first blazer by a wide margin: it works with grey trousers, stone trousers, denim and almost every shirt colour. After navy, consider a textured mid-grey, a soft check, or an earth tone for warmth in autumn and winter.",
        ],
      },
      {
        heading: "How a blazer should fit",
        body: [
          "The shoulder seam should end where your shoulder ends. The collar should sit against your shirt collar without a gap. Roughly a centimetre of shirt cuff should show below the sleeve. The jacket should close without strain at the waist button, and the lapels should lie flat against the chest.",
          "A blazer worn alone is often worn open. Check the fit both ways at the fitting — a jacket that only looks correct when buttoned is not finished.",
        ],
      },
    ],
    faqs: [
      {
        question: "How should a blazer fit?",
        answer:
          "The shoulder seam should end at your shoulder, the collar should sit flat against your shirt collar with no gap, and about a centimetre of shirt cuff should show. It should close at the waist button without pulling, and the lapels should lie flat. Check it both buttoned and open, since a blazer is often worn open.",
      },
      {
        question: "What is the difference between a blazer and a suit jacket?",
        answer:
          "A suit jacket is cut to match a trouser in the same cloth. A blazer is designed to be worn alone, usually in a more textured cloth, often with a softer shoulder and patch or flapped pockets. Wearing a suit jacket as a blazer works only when the suiting has enough texture to stand on its own.",
      },
      {
        question: "Which blazer colour should I choose first?",
        answer:
          "Navy. It pairs with grey, stone and earth-toned trousers, works with almost any shirt, and is appropriate from a business-casual office to an engagement function. A textured mid-grey or a soft check is a good second.",
      },
    ],
    related: [
      {
        label: "Custom trousers",
        href: "/custom-trousers",
        note: "Contrasting trousers cut to pair with your blazer.",
      },
      {
        label: "Custom shirts",
        href: "/custom-shirts",
        note: "Collars with enough structure to hold when worn without a tie.",
      },
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "How the pattern and fittings work.",
      },
    ],
    appointmentService: "Blazer",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "custom-shirts",
    href: "/custom-shirts",
    navLabel: "Custom Shirts",
    title: "Custom Shirts",
    eyebrow: "Next To The Skin",
    metaTitle: "Custom Shirts in Ludhiana",
    metaDescription:
      "Custom men's shirts tailored in Ludhiana. Collar, cuff, fit and fabric specified to your measurements for formal, business and wedding wear.",
    lede: "The garment closest to your face, and the one most often bought without thought.",
    intro: [
      "A shirt is the only garment in a formal outfit that touches the skin all day and frames the face in every photograph. A collar that is a centimetre too large or a shoulder seam that sits too far out undermines a good jacket entirely.",
      "Custom shirting fixes the three things ready-made shirts get wrong most often: the collar, the sleeve length, and the amount of fabric through the body.",
    ],
    image: {
      src: "/images/collections/custom-shirt.webp",
      alt: "White cotton shirt with a spread collar and mother-of-pearl buttons",
    },
    specs: [
      { label: "Collar styles", value: "Spread, semi-spread, point, button-down" },
      { label: "Cuffs", value: "Single, double (French), mitred or rounded" },
      { label: "Fabrics", value: "Cotton, cotton blends, linen blends" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "The collar decides everything",
        body: [
          "The collar is the part of the shirt people look at. Its height, its spread and its point length should be chosen against your face and neck, not from a catalogue.",
          "A longer neck carries a taller collar band well; a shorter neck is crowded by one. A narrower face is balanced by a wider spread; a broader face by a narrower one. If you wear a tie, the spread also needs to accommodate the knot you actually tie.",
        ],
        points: [
          {
            term: "Semi-spread",
            detail:
              "The most useful default. Works with a tie and without, and suits most face shapes.",
          },
          {
            term: "Spread",
            detail:
              "Wider opening, more formal, and the right choice for a larger tie knot or a narrower face.",
          },
          {
            term: "Point",
            detail:
              "Narrow and classical. Elongates a rounder face and reads conservative.",
          },
          {
            term: "Button-down",
            detail:
              "The least formal. Excellent under a soft blazer and without a tie.",
          },
        ],
      },
      {
        heading: "Fit through the body",
        body: [
          "Most ready-made shirts are either tight across the chest or billowing at the waist, because they are cut to a single drop. A custom shirt takes the chest and waist independently, which is what allows a shirt to be clean at the waist without restricting the shoulders.",
          "The test is simple: you should be able to cross your arms in front of you fully, and the shirt should not balloon out when tucked. Both conditions can be met at once. Most shirts only meet one.",
        ],
      },
      {
        heading: "Fabric for the climate",
        body: [
          "For Punjab summers, lighter cottons in open weaves are the practical choice. They breathe, they wash well, and they are comfortable in humidity. Poplin is smooth and formal; oxford and royal oxford have more texture and hide creasing better; twill drapes well and resists wrinkling.",
          "For winter and formal evening wear, heavier cottons and twills give a better hand and a cleaner drape under a jacket. If the shirt is for a wedding, consider how it will look in photographs: very fine, smooth weaves can reflect flash unflatteringly.",
        ],
      },
      {
        heading: "Details worth specifying",
        body: [
          "Cuff style and depth, placket or no placket, pocket or none, the button choice, and the shape of the shirt tail. These are small decisions individually, and collectively they are the difference between a shirt that feels yours and one that feels generic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you make custom shirts?",
        answer:
          "Yes. Collar style and height, cuff style, body fit, fabric and finishing details are all specified at the consultation, and the shirt is cut to your measurements rather than to a standard size.",
      },
      {
        question: "How does custom shirt tailoring work?",
        answer:
          "We take measurements including neck, chest, waist, shoulder, sleeve and cuff, then discuss collar and cuff style against your face, your jacket and how you wear the shirt. A first shirt is usually made and fitted before a larger order, so any corrections carry into the rest.",
      },
      {
        question: "How much shirt cuff should show below a jacket sleeve?",
        answer:
          "About a centimetre, or a little more. This depends on the jacket sleeve length as much as the shirt, which is why sleeve length is checked against the jacket at the fitting rather than in isolation.",
      },
      {
        question: "Which collar should I choose?",
        answer:
          "A semi-spread collar is the most versatile and works with or without a tie for most face shapes. Choose a wider spread for a narrower face or a larger tie knot, a point collar for a rounder face or a more conservative look, and a button-down for informal wear under a soft jacket.",
      },
    ],
    related: [
      {
        label: "Blazers",
        href: "/blazers",
        note: "A collar with enough structure to be worn open under a jacket.",
      },
      {
        label: "Corporate suits",
        href: "/corporate-suits",
        note: "Shirts built for a rotation, not a single occasion.",
      },
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "How measurement and fitting work across garments.",
      },
    ],
    appointmentService: "Custom Shirt",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "custom-trousers",
    href: "/custom-trousers",
    navLabel: "Custom Trousers",
    title: "Custom Trousers",
    eyebrow: "The Lower Half",
    metaTitle: "Custom Trousers in Ludhiana",
    metaDescription:
      "Custom men's trousers tailored in Ludhiana. Rise, waist, leg line and break cut to your measurements for formal, business and separate wear.",
    lede: "Half of every outfit, and the half most often left to chance.",
    intro: [
      "Trousers do more visible work than they are given credit for. Rise sets where your waist appears, which changes the apparent length of your legs. Break sets how the trouser meets the shoe, which is the last thing a viewer's eye travels to.",
      "They are also the part of a suit that wears out first, which makes a well-cut spare one of the most practical commissions available.",
    ],
    image: {
      src: "/images/collections/custom-trousers.webp",
      alt: "Tailored grey wool trousers with a clean crease, hanging full length",
    },
    specs: [
      { label: "Front", value: "Flat front or pleated" },
      { label: "Waistband", value: "Standard, extended tab or side adjusters" },
      { label: "Finish", value: "Plain hem or turn-up" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "Rise, and why it matters more than you think",
        body: [
          "Rise is the distance from the crotch seam to the top of the waistband. A low rise sits on the hips; a higher rise sits at or near the natural waist, where the body actually narrows.",
          "A higher rise stays in place when you sit, requires less from a belt, and makes the leg look longer because the waistline is higher in the silhouette. It is also markedly more comfortable through a working day. Most ready-made trousers sit lower than is ideal for tailored wear.",
        ],
      },
      {
        heading: "Break: how the trouser meets the shoe",
        body: [
          "Break is the fold that forms where the trouser hem rests on the shoe. It is a matter of preference, but the choice should be deliberate and it should be made in the shoes you will wear.",
        ],
        points: [
          {
            term: "No break",
            detail:
              "The hem just clears the shoe. Modern and clean, and unforgiving of any error in length.",
          },
          {
            term: "Quarter break",
            detail:
              "A single soft fold. The most broadly flattering choice and the safest default.",
          },
          {
            term: "Half to full break",
            detail:
              "A fuller fold over the shoe. More traditional, and the better match for a wider leg or a heavier cloth.",
          },
        ],
      },
      {
        heading: "Pleats or flat front",
        body: [
          "A flat front is cleaner and reads more modern. Pleats add room through the hip and thigh where the body needs it, which makes them more comfortable for a fuller seat or thigh and better suited to a higher rise.",
          "Forward-facing pleats sit flatter and are the more subtle option. Pleats only look dated when they are cut into a low-rise trouser that does not need the room — the combination, not the pleat, is the problem.",
        ],
      },
      {
        heading: "The spare trouser",
        body: [
          "Trousers wear out roughly twice as fast as the jacket they were cut with, because they take friction at the seat and thigh that a jacket never sees. Commissioning a second trouser with the suit is the single most effective way to extend its usable life, and the cloth will match because it comes from the same length.",
        ],
      },
    ],
    faqs: [
      {
        question: "What trouser break should I choose?",
        answer:
          "A quarter break — one soft fold where the hem meets the shoe — is the most broadly flattering and the safest default. No break is cleaner and more modern but unforgiving of length errors. A half or full break suits a wider leg and heavier cloth. Choose it wearing the shoes you intend to wear.",
      },
      {
        question: "Are pleated trousers out of style?",
        answer:
          "No. Pleats add room through the hip and thigh and pair naturally with a higher rise. They look dated mainly when combined with a low rise that does not need the extra room. Forward-facing pleats are the most subtle option.",
      },
      {
        question: "Should I order a spare trouser with my suit?",
        answer:
          "If the suit will be worn regularly, yes. Trousers wear out roughly twice as fast as jackets, and a spare cut from the same cloth length will match exactly. It is the most cost-effective way to extend the life of a suit.",
      },
    ],
    related: [
      {
        label: "Two-piece suits",
        href: "/two-piece-suits",
        note: "Where a spare trouser makes the largest difference.",
      },
      {
        label: "Blazers",
        href: "/blazers",
        note: "Contrasting trousers to pair with a single jacket.",
      },
      {
        label: "Alterations",
        href: "/alterations",
        note: "Adjusting trousers you already own.",
      },
    ],
    appointmentService: "Trouser",
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "alterations",
    href: "/alterations",
    navLabel: "Alterations",
    title: "Alterations & Refitting",
    eyebrow: "Corrections",
    metaTitle: "Suit Alterations in Ludhiana",
    metaDescription:
      "Men's suit and garment alterations in Ludhiana. Refitting jackets, trousers and shirts, with an honest assessment of what can and cannot be corrected.",
    lede: "Some things can be fixed properly. We will tell you plainly which.",
    intro: [
      "Alteration is the most honest service a tailor offers, because it has clear limits. A garment can only be changed within the fabric and seam allowance it was built with.",
      "We start every alteration with an assessment rather than a quote. If a garment can be made genuinely better, we will say how. If it cannot, we will say that too, and explain why, so you are not paying to move a problem from one place to another.",
    ],
    image: {
      src: "/images/craft/alterations.webp",
      alt: "Hands pinning a jacket sleeve during an alteration fitting",
    },
    specs: [
      { label: "Assessed", value: "In person, on the body" },
      { label: "Common work", value: "Sleeves, waist, trouser length, taper" },
      { label: "Honest limits", value: "Shoulders and jacket length rarely" },
      { label: "Timeline", value: CONSULT },
    ],
    sections: [
      {
        heading: "What alters well",
        body: [
          "A great deal can be corrected on a well-made garment, and the work is often invisible when done properly.",
        ],
        points: [
          {
            term: "Trouser length and taper",
            detail:
              "Straightforward and reliable. The most common alteration and almost always worth doing.",
          },
          {
            term: "Trouser waist",
            detail:
              "Usually adjustable by a few centimetres either way, depending on the seam allowance left at the back seam.",
          },
          {
            term: "Jacket waist",
            detail:
              "Taking in or letting out through the side seams and back seam is routine within a limited range.",
          },
          {
            term: "Sleeve length",
            detail:
              "Adjustable from the cuff, or from the shoulder if the cuff has working buttonholes.",
          },
          {
            term: "Shirt body and sleeves",
            detail:
              "Shirts take alteration well. Taking in the body and shortening sleeves are both clean jobs.",
          },
        ],
      },
      {
        heading: "What does not alter well",
        body: [
          "Three things are worth knowing before you spend money.",
          "The shoulder is the hardest part of a jacket to change. Re-cutting a shoulder means dismantling the sleeve, the canvas and often the collar, and the result is rarely as clean as a correctly cut shoulder would have been. If a jacket's shoulders are wrong, that is usually the end of the conversation.",
          "Jacket length can technically be shortened, but doing so moves the pockets and the button stance out of proportion with the body, which is visible even to people who cannot name what is wrong.",
          "Letting anything out is limited by the seam allowance that exists. Some manufacturers leave generous allowances; many leave almost none. This can only be assessed by opening the garment or inspecting it closely in person.",
        ],
      },
      {
        heading: "Refitting after a change in size",
        body: [
          "If your measurements have changed, a well-made suit is often worth refitting rather than replacing. Jacket waist, trouser waist, seat and taper together give a useful range of adjustment.",
          "Bring the garment and wear the shirt and shoes you use with it. The assessment takes place on your body, because a garment on a hanger tells us very little about where it is actually failing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you provide alterations?",
        answer:
          "Yes, for jackets, trousers and shirts. Every alteration begins with an in-person assessment on the body, because what is possible depends entirely on how the garment was made and how much seam allowance it has.",
      },
      {
        question: "Can a suit jacket's shoulders be altered?",
        answer:
          "Rarely, and rarely well. Changing a shoulder requires dismantling the sleeve, the canvas and often the collar, and the result is seldom as clean as a correctly cut shoulder. If the shoulders are wrong, we will tell you honestly rather than take the work.",
      },
      {
        question: "Can you make a jacket larger?",
        answer:
          "Only within the seam allowance the garment was made with. Some jackets have generous allowances and can be let out noticeably; others have almost none. This has to be assessed in person, and we will tell you the realistic range before any work starts.",
      },
      {
        question: "Is it worth altering an old suit?",
        answer:
          "If the cloth is sound and the shoulders fit, usually yes. Waist, sleeve length, trouser length and taper together cover most of what goes wrong. If the shoulders no longer fit, a new commission is the better use of your money and we will say so.",
      },
    ],
    related: [
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "When correction is no longer the right answer.",
      },
      {
        label: "Custom trousers",
        href: "/custom-trousers",
        note: "Often more economical than heavily altering an old pair.",
      },
      {
        label: "Contact",
        href: "/contact",
        note: "Bring the garment in for an honest assessment.",
      },
    ],
    appointmentService: "Alteration",
  },
];

export const serviceBySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug);
}

/** Every service route, for the sitemap. */
export const serviceRoutes = services.map((s) => s.href);
