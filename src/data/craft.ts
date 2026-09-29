/**
 * CRAFT CONTENT
 * The construction sequence that drives the signature scroll experience,
 * the process steps, and the fabric section.
 */

/* ------------------------------------------------------------------ */
/* SUIT CONSTRUCTION — the layered scroll story                        */
/* ------------------------------------------------------------------ */

export interface ConstructionLayer {
  id: string;
  /** Uppercase stage name shown alongside the visual. */
  stage: string;
  /** The editorial line for this stage. */
  statement: string;
  /** Short supporting sentence. Indexable, never hidden from crawlers. */
  detail: string;
  /** Scroll range this layer owns, as a fraction of the section. */
  range: [number, number];
  /**
   * Layered asset. Replace these SVGs with transparent WebP/PNG photography
   * of the same dimensions and the animation continues to work unchanged.
   */
  asset: string;
  /** Alt text for the layer image. */
  alt: string;
}

/**
 * Layers are stacked in array order — index 0 is furthest back.
 * Ranges overlap slightly so each layer fades in while the previous
 * is still settling, which reads as assembly rather than as a slideshow.
 */
export const constructionLayers: ConstructionLayer[] = [
  {
    id: "fabric",
    stage: "Fabric",
    statement: "It starts with the fabric.",
    detail:
      "Weight, weave and drape are chosen against the season and the occasion before a single measurement is transferred.",
    range: [0, 0.12],
    asset: "/images/suit-construction/01-fabric.svg",
    alt: "A length of suiting cloth laid flat on the cutting table",
  },
  {
    id: "pattern",
    stage: "Pattern",
    statement: "Every cut begins with precision.",
    detail:
      "Your measurements become a paper pattern. Shoulder slope, balance and posture are resolved here, on paper, where correction costs nothing.",
    range: [0.1, 0.24],
    asset: "/images/suit-construction/02-pattern.svg",
    alt: "Paper pattern pieces chalked onto the cloth",
  },
  {
    id: "cutting",
    stage: "Cutting",
    statement: "The silhouette takes shape.",
    detail:
      "The cloth is cut with the grain running true. Nothing is reversible after this, which is why the pattern is checked twice.",
    range: [0.22, 0.38],
    asset: "/images/suit-construction/03-cut-pieces.svg",
    alt: "Cut panels of the jacket body arranged in sequence",
  },
  {
    id: "canvas",
    stage: "Canvas",
    statement: "Structure creates character.",
    detail:
      "The canvas is the jacket's internal frame. It shapes the chest and lapel, and it is what allows a jacket to hold its line for years.",
    range: [0.36, 0.5],
    asset: "/images/suit-construction/04-canvas.svg",
    alt: "Canvas interlining positioned across the jacket chest",
  },
  {
    id: "interlining",
    stage: "Interlining",
    statement: "Support you never see.",
    detail:
      "Interlining reinforces the collar, the front edge and the buttonholes. It is invisible in the finished garment and obvious by its absence.",
    range: [0.48, 0.6],
    asset: "/images/suit-construction/05-interlining.svg",
    alt: "Interlining applied along the jacket front edge and collar",
  },
  {
    id: "lining",
    stage: "Lining",
    statement: "The details you feel matter.",
    detail:
      "Lining lets the jacket move over a shirt without dragging, and it is the surface your arm meets every time you put the garment on.",
    range: [0.58, 0.7],
    asset: "/images/suit-construction/06-lining.svg",
    alt: "Lining fitted to the inside of the jacket body",
  },
  {
    id: "sleeves",
    stage: "Sleeves",
    statement: "Crafted piece by piece.",
    detail:
      "Sleeves are set by hand so the pitch matches the natural hang of your arm. Set them wrong and the whole jacket twists.",
    range: [0.68, 0.82],
    asset: "/images/suit-construction/07-sleeves.svg",
    alt: "Sleeves set into the jacket armholes",
  },
  {
    id: "buttons",
    stage: "Buttons",
    statement: "Finished with intention.",
    detail:
      "Buttonholes are worked, buttons are positioned against your actual stance, and the waist button is placed where it flatters rather than where it is convenient.",
    range: [0.8, 0.9],
    asset: "/images/suit-construction/08-buttons.svg",
    alt: "Buttons and worked buttonholes on the jacket front and cuff",
  },
  {
    id: "pressing",
    stage: "Pressing",
    statement: "Shape, set by hand.",
    detail:
      "Pressing is not ironing. Heat, moisture and pressure are used to mould the cloth into three dimensions and hold it there.",
    range: [0.88, 0.95],
    asset: "/images/suit-construction/09-pressing.svg",
    alt: "The finished jacket under a tailor's press",
  },
  {
    id: "finished",
    stage: "Finished Suit",
    statement: "Made for you.",
    detail:
      "A final fitting confirms the garment on your body. Only then is it yours.",
    range: [0.93, 1],
    asset: "/images/suit-construction/10-finished-suit.svg",
    alt: "The completed bespoke suit on a tailor's form",
  },
];

/* ------------------------------------------------------------------ */
/* THE PROCESS                                                         */
/* ------------------------------------------------------------------ */

export interface ProcessStep {
  number: string;
  title: string;
  summary: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    summary: "What the garment is for, before what it looks like.",
    body: "We start with the occasion, the setting and how often the garment will be worn. A suit for one wedding and a suit for four days a week are different commissions, and the decisions that follow all depend on knowing which one this is.",
  },
  {
    number: "02",
    title: "Measurements",
    summary: "Taken on the body, in the posture you actually hold.",
    body: "Beyond the obvious dimensions, we record shoulder slope, stance, and the asymmetries almost everyone has. These are noted as proportions to work with, not as faults to correct, and they are what allow the finished garment to hang cleanly rather than merely fit numerically.",
  },
  {
    number: "03",
    title: "Fabric Selection",
    summary: "Weight and weave chosen against season and use.",
    body: "Cloth is handled, draped over the shoulder and seen in daylight before it is chosen. We will be direct about how a cloth behaves in a Punjab summer, how it recovers from creasing, and how it will photograph, because those matter more in practice than how it looks folded on a shelf.",
  },
  {
    number: "04",
    title: "Pattern",
    summary: "Your measurements, drafted into paper.",
    body: "The pattern is where posture and proportion are resolved. Front and back balance, shoulder slope and sleeve pitch are all decided at this stage, on paper, where a correction costs nothing but a pencil line.",
  },
  {
    number: "05",
    title: "Cutting",
    summary: "The irreversible step, checked twice.",
    body: "Cloth is laid, the pattern positioned with the grain running true, and the panels cut. Pattern matching across the front, the pockets and the collar is planned before the shears move, because there is no second attempt on a single length of cloth.",
  },
  {
    number: "06",
    title: "Stitching",
    summary: "Assembly, with structure built in.",
    body: "Panels are joined, canvas and interlining are set, pockets are made and the lining is fitted. This is the longest stage and the least visible one, and it is where the difference between a garment that holds its shape and one that collapses is decided.",
  },
  {
    number: "07",
    title: "Fitting",
    summary: "Corrected on you, not on a form.",
    body: "The garment is fitted on your body and marked. Sleeve pitch, waist suppression, jacket length and trouser break are all confirmed here, standing and seated, in the shoes you intend to wear. More than one fitting is normal and is a sign of care, not of error.",
  },
  {
    number: "08",
    title: "Final Finish",
    summary: "Buttonholes, pressing, and a last look.",
    body: "Buttonholes are worked and buttons set against your stance. The garment is pressed to shape rather than flat, and then checked once more on you before it leaves. If something is not right, it goes back.",
  },
];

/* ------------------------------------------------------------------ */
/* FABRIC                                                              */
/* ------------------------------------------------------------------ */

export interface FabricFamily {
  name: string;
  character: string;
  bestFor: string;
  note: string;
  image: { src: string; alt: string };
}

export const fabricFamilies: FabricFamily[] = [
  {
    name: "Worsted Wool",
    character: "Smooth, tightly twisted, resilient.",
    bestFor: "Business suits, year-round formal wear",
    note: "The workhorse of tailoring. A tighter twist resists creasing and recovers overnight, which is what lets a suit survive daily wear without looking tired by Wednesday.",
    image: {
      src: "/images/fabrics/worsted-wool.webp",
      alt: "Close-up of charcoal worsted wool suiting showing a fine twill weave",
    },
  },
  {
    name: "Wool Blends",
    character: "Lighter, more forgiving, often cooler.",
    bestFor: "Warm-weather suits, daytime functions",
    note: "Blending wool with other fibres can reduce weight and improve crease resistance. The trade-off is usually in drape and in how the cloth takes a press, so the blend is chosen for the garment rather than as a default.",
    image: {
      src: "/images/fabrics/wool-blend.webp",
      alt: "Close-up of a light grey wool blend cloth with visible weave texture",
    },
  },
  {
    name: "Linen & Linen Blends",
    character: "Open, breathable, deliberately relaxed.",
    bestFor: "Summer daytime events, engagement functions",
    note: "Linen creases. That is its nature, not a defect, and pretending otherwise leads to disappointment. In exchange it moves air better than almost anything else, which matters at an outdoor function in May.",
    image: {
      src: "/images/fabrics/linen.webp",
      alt: "Close-up of natural linen cloth showing an open, irregular weave",
    },
  },
  {
    name: "Cotton",
    character: "Crisp, matte, informal in the best sense.",
    bestFor: "Shirts, summer trousers, soft jackets",
    note: "For shirting, cotton is the default and the weave does the work: poplin is smooth and formal, oxford has texture and hides creasing, twill drapes well and wrinkles less.",
    image: {
      src: "/images/fabrics/cotton.webp",
      alt: "Close-up of white cotton shirting fabric with a fine poplin weave",
    },
  },
  {
    name: "Winter Weights",
    character: "Heavier, with a fuller hand and better drape.",
    bestFor: "Winter weddings, evening receptions",
    note: "A heavier cloth hangs more cleanly, holds a press longer and photographs with more depth. North Indian winters are one of the few Indian contexts where the full benefit of a heavier cloth is available without discomfort.",
    image: {
      src: "/images/fabrics/winter-weight.webp",
      alt: "Close-up of a heavy wool flannel in deep navy",
    },
  },
  {
    name: "Texture & Pattern",
    character: "Checks, herringbones, and tonal weaves.",
    bestFor: "Blazers, separates, second and third suits",
    note: "Texture is what lets a jacket be worn on its own. It is also what keeps a dark suit from reading flat in photographs, where a smooth cloth can lose all its detail under a flash.",
    image: {
      src: "/images/fabrics/texture-pattern.webp",
      alt: "Close-up of a herringbone weave in charcoal and grey",
    },
  },
];

/* ------------------------------------------------------------------ */
/* FIT — what custom fitting actually addresses                        */
/* ------------------------------------------------------------------ */

export interface FitPoint {
  title: string;
  body: string;
}

export const fitPoints: FitPoint[] = [
  {
    title: "Shoulder Width",
    body: "The seam should end where your shoulder ends. This is the one line on a jacket that alteration cannot honestly correct, so it is cut right from the beginning.",
  },
  {
    title: "Shoulder Slope",
    body: "Shoulders are rarely level and almost never the standard slope a factory pattern assumes. Cutting to your actual slope is what stops a collar gapping or a sleeve twisting.",
  },
  {
    title: "Sleeve Length & Pitch",
    body: "Length is set against your shirt cuff and your shoes. Pitch — the angle the sleeve is set at — is matched to the natural hang of your arm so the sleeve stays clean when you stand still.",
  },
  {
    title: "Jacket Length",
    body: "Long enough to cover the seat, short enough to keep the leg line long. Decided by your torso proportion rather than by a chart.",
  },
  {
    title: "Waist Suppression",
    body: "How much the jacket narrows between chest and hip. Enough to give shape, not so much that the garment strains or the vents flare when you move.",
  },
  {
    title: "Trouser Rise",
    body: "Where the waistband sits. A rise at the natural waist stays in place when seated, needs less from a belt, and lengthens the leg in the silhouette.",
  },
  {
    title: "Trouser Break",
    body: "How the hem meets the shoe. Chosen deliberately, in the shoes you will actually wear, because it is where the eye finishes travelling.",
  },
  {
    title: "Posture & Proportion",
    body: "A forward head, a fuller seat, a dropped shoulder: these are measurements, not verdicts. The pattern accounts for them so the finished garment hangs level on you specifically.",
  },
];
