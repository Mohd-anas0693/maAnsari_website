/**
 * SITE-WIDE FAQ
 * Rendered as visible, indexable HTML on the home page and the contact page.
 * FAQPage structured data is emitted only where the answers are visible on
 * the page itself, in line with Google's guidance.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const generalFaqs: Faq[] = [
  {
    question: "How long does a custom suit take?",
    answer:
      "It depends on the garment, the construction and how many fittings it needs. Rather than quoting a standard figure, we agree a date at your consultation and work backwards from when you actually need it. If you are commissioning for a wedding, begin as soon as your dates are fixed.",
  },
  {
    question: "How does a bespoke fitting work?",
    answer:
      "At the first fitting the garment is basted together rather than finished, so it can be opened and corrected. It is fitted on your body, standing and seated, and marked. A second fitting confirms the corrections once the garment is finished. Bring the shoes and shirt you intend to wear with it.",
  },
  {
    question: "Can I choose my own fabric?",
    answer:
      "Yes. Cloth is selected with you before anything is cut, handled and draped rather than chosen from a photograph. You are also welcome to bring your own fabric — bring it to the consultation so the length and width can be checked against the garment you want.",
  },
  {
    question: "Do you make three-piece suits?",
    answer:
      "Yes. Jacket, waistcoat and trouser are cut as one commission, with the waistcoat fitted alongside the jacket so the two work together rather than merely matching in colour.",
  },
  {
    question: "Can you make wedding suits for the groom and the wedding party?",
    answer:
      "Yes. Wedding commissions are handled as a project rather than a purchase, with one point of contact, an agreed direction for cloth and cut, and fittings grouped so that people travelling in are not asked to visit repeatedly.",
  },
  {
    question: "Do you provide alterations?",
    answer:
      "Yes, for jackets, trousers and shirts. Every alteration starts with an in-person assessment on the body. If a garment cannot be genuinely improved — a jacket with the wrong shoulders, for instance — we will tell you rather than take the work.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "By phone, on WhatsApp, or through the appointment form on the contact page. Appointments are preferred over walk-ins because a first consultation deserves an uninterrupted hour and fittings need the room.",
  },
  {
    question: "Do you make custom shirts?",
    answer:
      "Yes. Collar style and height, cuff style, body fit and fabric are all specified at the consultation and the shirt is cut to your measurements. For a larger order we usually make and fit one shirt first, so any corrections carry into the rest.",
  },
  {
    question: "How many fittings are required?",
    answer:
      "Most commissions take two: a first fitting where the garment is corrected on the body, and a final fitting once it is finished. Some cloths and some garments call for a third. The number is agreed with you rather than fixed in advance.",
  },
];
