/**
 * LOCATION PAGES
 * ---------------------------------------------------------------------------
 * HOW TO USE THIS FILE HONESTLY
 *
 * Each entry here becomes an indexable page. A page should exist only when
 * there is something genuinely true and genuinely useful to say about serving
 * customers from that city.
 *
 * `serviceModel` makes the claim explicit and the copy follows from it:
 *   'studio'   — the workshop is physically in this city.
 *   'travel-in'— customers travel to the studio; we help them do it in
 *                fewer visits. No branch is claimed or implied.
 *
 * DO NOT add a city here unless the business genuinely serves customers from
 * it. Removing an entry removes the page, its sitemap entry and its internal
 * links automatically. There is no separate list to keep in sync.
 */

export type ServiceModel = "studio" | "travel-in";

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface Location {
  slug: string;
  city: string;
  region: string;
  serviceModel: ServiceModel;
  metaTitle: string;
  metaDescription: string;
  /** <h1> */
  title: string;
  lede: string;
  /** Opening prose. Unique per city — never a template with the name swapped. */
  intro: string[];
  /** What is genuinely available to someone from this city. */
  availability: { heading: string; body: string[] };
  /** Distance/travel context. Only included where it is actually relevant. */
  gettingHere: string[];
  /** Neighbourhoods or nearby areas, where meaningful. */
  nearbyAreas?: { heading: string; areas: string[]; note: string };
  faqs: LocationFaq[];
  /** Descriptive internal links out of this page. */
  related: { label: string; href: string; note: string }[];
}

export const locations: Location[] = [
  {
    slug: "ludhiana",
    city: "Ludhiana",
    region: "Punjab",
    serviceModel: "studio",
    metaTitle: "Men's Suit Tailor in Ludhiana",
    metaDescription:
      "Bespoke men's tailoring in Ludhiana. Custom suits, wedding and groom suits, blazers, trousers and shirts measured and made at our Ludhiana studio.",
    title: "Bespoke Tailoring in Ludhiana",
    lede: "The workshop, the fittings and the finishing all happen here.",
    intro: [
      "Ludhiana is where the studio is, which means everything that matters to a commission happens in one place: the consultation, the measuring, the cutting, the fittings and the final press.",
      "That matters more than it sounds. A garment that is measured in one city, cut in another and fitted by someone who never met you is a different product to one where the person marking the chalk is the person who will see it on your body.",
    ],
    availability: {
      heading: "What is available here",
      body: [
        "The full range of the house: two-piece and three-piece suits, wedding and groom commissions, blazers, trousers, shirts, corporate tailoring and alterations.",
        "Appointments are preferred over walk-ins, simply because a consultation deserves an uninterrupted hour and fittings need the room. If you are planning for a wedding, come with your dates so the schedule can be built backwards from the earliest function.",
      ],
    },
    gettingHere: [
      "Visit the contact page for the studio address, directions and a map. Appointments can be booked by phone, by WhatsApp or through the appointment form.",
    ],
    nearbyAreas: {
      heading: "Across the city",
      areas: [
        "Civil Lines",
        "Model Town",
        "Sarabha Nagar",
        "BRS Nagar",
        "Dugri",
        "Pakhowal Road",
        "Ferozepur Road",
        "Gill Road",
        "Rajguru Nagar",
      ],
      note: "Customers come to the studio from across Ludhiana. These are simply the areas we hear most often, not separate locations.",
    },
    faqs: [
      {
        question: "Where in Ludhiana is the studio?",
        answer:
          "The studio address, directions and a map are on the contact page. Appointments are preferred so that a consultation gets an uninterrupted hour and fittings have the room they need.",
      },
      {
        question: "Do I need an appointment?",
        answer:
          "It is strongly preferred. A first consultation involves discussion, measurement and fabric selection, which takes time that a walk-in visit cannot always be given. Appointments can be made by phone, on WhatsApp or through the form on the contact page.",
      },
      {
        question: "How many visits will a suit take?",
        answer:
          "Typically three: the consultation and measurement, a first fitting, and a collection visit where the finished garment is checked on you. Some commissions need an additional fitting, which is agreed with you rather than assumed.",
      },
    ],
    related: [
      {
        label: "Custom suits",
        href: "/suits",
        note: "Two-piece, three-piece, wedding and business commissions.",
      },
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Groom and wedding-party tailoring, planned around your dates.",
      },
      {
        label: "Book an appointment",
        href: "/contact",
        note: "Studio address, map, phone and the appointment form.",
      },
    ],
  },

  {
    slug: "chandigarh",
    city: "Chandigarh",
    region: "Chandigarh",
    serviceModel: "travel-in",
    metaTitle: "Bespoke Suits for Chandigarh Customers",
    metaDescription:
      "Custom suits and wedding tailoring for customers travelling from Chandigarh to our Ludhiana studio. Grouped fittings to reduce the number of trips.",
    title: "For Customers Travelling from Chandigarh",
    lede: "No branch in Chandigarh. A schedule built so you travel less.",
    intro: [
      "We do not have a Chandigarh location, and it would be dishonest to imply otherwise. What we do have is a way of working that makes commissioning from Chandigarh practical rather than tedious.",
      "The studio is in Ludhiana, roughly an hour and a half by road. The question that actually matters is not distance but how many times you have to make the trip — and that is something we can plan around.",
    ],
    availability: {
      heading: "How a commission works from Chandigarh",
      body: [
        "The standard sequence is three visits: consultation and measurement, a first fitting, and collection. For customers travelling in, we compress this wherever the garment allows.",
        "Consultation and measurement happen in one longer sitting, with fabric selected the same day. Where you are commissioning more than one garment, all of them are measured and discussed in that single visit rather than spread across trips. Fittings for multiple garments are then scheduled together.",
        "Before you travel, we can discuss the commission by phone or on WhatsApp so the direction is settled and the visit is spent on measurement and cloth rather than on questions that could have been answered earlier.",
      ],
    },
    gettingHere: [
      "Ludhiana is connected to Chandigarh by road via the Chandigarh–Ludhiana highway, and by rail with frequent services on the Chandigarh–Ludhiana route.",
      "If you are travelling for a fitting, tell us your likely arrival time when booking. Fittings are appointment-only and we would rather hold a slot than have you wait.",
    ],
    faqs: [
      {
        question: "Do you have a showroom in Chandigarh?",
        answer:
          "No. The studio is in Ludhiana and all measuring, fitting and finishing happens there. We plan commissions for Chandigarh customers so that the number of trips is kept to a minimum, usually three and sometimes two.",
      },
      {
        question: "Can I reduce the number of trips to Ludhiana?",
        answer:
          "Often yes. Consultation, measurement and fabric selection are combined into one longer visit, and if you are commissioning several garments they are all handled together. Discussing the brief by phone or WhatsApp beforehand means the visit is spent on measurement rather than on preliminaries.",
      },
      {
        question: "Can a wedding commission be managed from Chandigarh?",
        answer:
          "Yes, and it is worth starting earlier than a local customer would. Fittings need space between them, and building in travel time means beginning as soon as your dates are fixed rather than in the month before.",
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Planning a wedding commission around travel and fitting dates.",
      },
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "What happens at each stage, and how many fittings to expect.",
      },
      {
        label: "Contact",
        href: "/contact",
        note: "Discuss your commission before you travel.",
      },
    ],
  },

  {
    slug: "mohali",
    city: "Mohali",
    region: "Punjab",
    serviceModel: "travel-in",
    metaTitle: "Custom Suits for Mohali Customers",
    metaDescription:
      "Bespoke suits and wedding tailoring for customers from Mohali, made at our Ludhiana studio. Combined consultations and grouped fittings to minimise travel.",
    title: "For Customers Travelling from Mohali",
    lede: "The studio is in Ludhiana. Mohali commissions are scheduled around that.",
    intro: [
      "There is no Mohali branch. Customers from Mohali and the surrounding Sahibzada Ajit Singh Nagar area commission from the Ludhiana studio, and the practical questions are the same as for Chandigarh: how many visits, and how to make each one count.",
      "Mohali's proximity to Chandigarh means the route and the timings are effectively shared, and we schedule accordingly.",
    ],
    availability: {
      heading: "How a commission works from Mohali",
      body: [
        "Consultation, measurement and fabric selection are handled in a single extended visit. Where more than one garment is being commissioned, all are measured at the same sitting.",
        "Group commissions — a wedding party, a family, or a set of colleagues — are worth coordinating deliberately. Bringing everyone on the same day turns what would be several separate journeys into one, and it produces a better result because the cloth and direction are agreed in the same room.",
      ],
    },
    gettingHere: [
      "Mohali connects to Ludhiana by road via Chandigarh and the Ludhiana highway. Rail options run through Chandigarh station.",
      "For group visits, let us know the number of people when booking so enough time and fitting space is held.",
    ],
    faqs: [
      {
        question: "Is there a Mohali branch?",
        answer:
          "No. All work is done at the Ludhiana studio. Commissions for Mohali customers are scheduled to keep travel to a minimum, typically two or three visits in total.",
      },
      {
        question: "Can a group from Mohali come together for fittings?",
        answer:
          "Yes, and it is the sensible way to handle a wedding party or a family order. Booking everyone on the same day means one journey instead of several, and agreeing cloth and cut in the same room produces a more coherent result than deciding separately.",
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Coordinated tailoring for the groom and the wedding party.",
      },
      {
        label: "Three-piece suits",
        href: "/three-piece-suits",
        note: "The usual choice for a wedding ceremony.",
      },
      {
        label: "Contact",
        href: "/contact",
        note: "Book a consultation and plan the visit.",
      },
    ],
  },

  {
    slug: "jalandhar",
    city: "Jalandhar",
    region: "Punjab",
    serviceModel: "travel-in",
    metaTitle: "Bespoke Suits for Jalandhar Customers",
    metaDescription:
      "Custom suits, wedding suits and blazers for customers travelling from Jalandhar to our Ludhiana tailoring studio. Consultations and fittings planned together.",
    title: "For Customers Travelling from Jalandhar",
    lede: "The shortest journey of the cities we regularly serve.",
    intro: [
      "Jalandhar is the closest of the Punjab cities outside Ludhiana, which makes commissioning from there genuinely straightforward. The road connection is direct and the journey is short enough that a fitting does not have to consume a day.",
      "There is no Jalandhar branch. Everything happens at the Ludhiana studio.",
    ],
    availability: {
      heading: "How a commission works from Jalandhar",
      body: [
        "Because the journey is short, Jalandhar commissions usually follow the standard three-visit sequence without needing to be compressed: consultation and measurement, first fitting, and collection.",
        "If you would rather still combine stages, that can be arranged. Tell us at booking and we will structure the appointments accordingly.",
      ],
    },
    gettingHere: [
      "Jalandhar and Ludhiana are connected directly by the national highway and by frequent rail services on the Amritsar–Delhi line.",
      "Morning appointments tend to work best for customers travelling in, and they leave room for the fitting to run long if the garment needs it.",
    ],
    faqs: [
      {
        question: "Do you serve customers from Jalandhar?",
        answer:
          "Yes. Customers travel to the Ludhiana studio for consultation, measurement and fittings. The journey is direct by road or rail, and the standard three-visit sequence is usually comfortable without compressing anything.",
      },
      {
        question: "Can I come for a fitting and return the same day?",
        answer:
          "Yes. The journey between Jalandhar and Ludhiana is short enough that a morning appointment leaves the rest of the day free, even if the fitting runs longer than planned.",
      },
    ],
    related: [
      {
        label: "Custom suits",
        href: "/suits",
        note: "Choosing cut and cloth for your first commission.",
      },
      {
        label: "Blazers",
        href: "/blazers",
        note: "A single jacket is often the easiest first commission.",
      },
      {
        label: "Contact",
        href: "/contact",
        note: "Book a morning appointment at the studio.",
      },
    ],
  },

  {
    slug: "amritsar",
    city: "Amritsar",
    region: "Punjab",
    serviceModel: "travel-in",
    metaTitle: "Bespoke Suits for Amritsar Customers",
    metaDescription:
      "Custom wedding suits and bespoke tailoring for customers from Amritsar, made at our Ludhiana studio with consultations and fittings grouped to reduce travel.",
    title: "For Customers Travelling from Amritsar",
    lede: "A longer journey, which is exactly why the schedule is planned first.",
    intro: [
      "Amritsar is the furthest of the cities we regularly serve, and pretending otherwise would waste your time. The honest position is that a commission from Amritsar needs planning that a Ludhiana commission does not.",
      "In practice that means fewer, longer visits, more agreed in advance by phone, and a start date earlier than you would otherwise choose. For wedding commissions in particular, beginning early is the difference between a considered garment and a rushed one.",
    ],
    availability: {
      heading: "How a commission works from Amritsar",
      body: [
        "We aim for two visits where the garment allows it. The first combines consultation, measurement and fabric selection in one extended sitting. The second combines the fitting and collection, with the garment prepared so that corrections can be made while you are still in Ludhiana wherever possible.",
        "This is not always achievable. A garment that needs significant correction at the first fitting will need a third visit, and we will tell you that rather than rush a compromise. Which route is realistic depends on the garment, and we will say so honestly at the consultation.",
      ],
    },
    gettingHere: [
      "Amritsar connects to Ludhiana by the national highway and by frequent rail services on the Amritsar–Delhi route, which stop at Ludhiana Junction.",
      "Because the journey is longer, we hold longer appointment slots for customers travelling from Amritsar. Tell us at booking so the time is reserved.",
    ],
    faqs: [
      {
        question: "Is it practical to commission a suit from Amritsar?",
        answer:
          "Yes, with planning. Visits are combined so that consultation, measurement and fabric selection happen in one sitting and the fitting and collection in another. Where a garment needs more correction than that allows, a third visit is required, and we will say so rather than compromise the fit.",
      },
      {
        question: "How early should an Amritsar customer start a wedding commission?",
        answer:
          "Earlier than a local customer would. Travel adds scheduling constraints to a process that already needs space between fittings. As soon as your dates are fixed is the right time to have the first conversation, even if the first visit is later.",
      },
      {
        question: "Can we discuss the commission before I travel?",
        answer:
          "Yes, and for Amritsar customers we recommend it. A phone or WhatsApp conversation settles the brief, the occasion and the broad direction, so the visit itself is spent on measurement and cloth rather than on preliminaries.",
      },
    ],
    related: [
      {
        label: "Wedding suits",
        href: "/wedding-suits",
        note: "Planning a groom's wardrobe around travel and fitting dates.",
      },
      {
        label: "Bespoke tailoring",
        href: "/bespoke-tailoring",
        note: "What each stage involves and how many fittings to expect.",
      },
      {
        label: "Contact",
        href: "/contact",
        note: "Start with a call before you plan the journey.",
      },
    ],
  },
];

export const locationBySlug = new Map(locations.map((l) => [l.slug, l]));

export function getLocation(slug: string): Location | undefined {
  return locationBySlug.get(slug);
}

/** The city the workshop is actually in. */
export const homeLocation = locations.find((l) => l.serviceModel === "studio")!;

/**
 * Cities mentioned in the "areas we serve" summary. These are cities we have
 * a real page for. Nothing is listed that does not have genuine content.
 */
export const servedCities = locations.map((l) => l.city);
