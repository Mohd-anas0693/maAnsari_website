/**
 * SIGNATURE COLLECTIONS
 * Drives the editorial grid on the home page. `span` controls the asymmetric
 * layout so the grid never reads as a row of identical cards.
 */

export interface Collection {
  slug: string;
  title: string;
  /** Uppercase label above the title. */
  index: string;
  description: string;
  href: string;
  image: { src: string; alt: string };
  /** Layout weight within the asymmetric grid. */
  span: "wide" | "tall" | "standard";
}

export const collections: Collection[] = [
  {
    slug: "wedding-suits",
    index: "01",
    title: "Wedding Suits",
    description:
      "Ceremony, reception and engagement, planned together so no two looks repeat themselves.",
    href: "/wedding-suits",
    image: {
      src: "/images/collections/wedding-suit.webp",
      alt: "Ivory groom's wedding suit with peak lapels on a tailor's form",
    },
    span: "wide",
  },
  {
    slug: "three-piece-suits",
    index: "02",
    title: "Three-Piece Suits",
    description:
      "A waistcoat cut to hold the line when the jacket comes off.",
    href: "/three-piece-suits",
    image: {
      src: "/images/collections/three-piece-suit.webp",
      alt: "Three-piece suit with matching waistcoat under directional light",
    },
    span: "tall",
  },
  {
    slug: "two-piece-suits",
    index: "03",
    title: "Two-Piece Suits",
    description:
      "Jacket and trouser from one cloth. The most useful garment you will own.",
    href: "/two-piece-suits",
    image: {
      src: "/images/collections/two-piece-suit.webp",
      alt: "Charcoal two-piece suit jacket photographed against a dark ground",
    },
    span: "standard",
  },
  {
    slug: "blazers",
    index: "04",
    title: "Blazers",
    description:
      "Cut from the start to be worn alone, in cloth with something to say.",
    href: "/blazers",
    image: {
      src: "/images/collections/blazer.webp",
      alt: "Textured navy blazer with patch pockets",
    },
    span: "standard",
  },
  {
    slug: "custom-shirts",
    index: "05",
    title: "Custom Shirts",
    description:
      "Collar, cuff and body specified to your neck, your face and your jacket.",
    href: "/custom-shirts",
    image: {
      src: "/images/collections/custom-shirt.webp",
      alt: "White cotton shirt with a semi-spread collar",
    },
    span: "standard",
  },
  {
    slug: "custom-trousers",
    index: "06",
    title: "Custom Trousers",
    description:
      "Rise, leg and break decided deliberately, in the shoes you will wear.",
    href: "/custom-trousers",
    image: {
      src: "/images/collections/custom-trousers.webp",
      alt: "Tailored grey wool trousers with a pressed crease",
    },
    span: "standard",
  },
  {
    slug: "corporate-suits",
    index: "07",
    title: "Corporate Suits",
    description:
      "Engineered for two hundred wearings a year, not two.",
    href: "/corporate-suits",
    image: {
      src: "/images/collections/corporate-suit.webp",
      alt: "Navy business suit jacket on a studio backdrop",
    },
    span: "wide",
  },
];
