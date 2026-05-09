export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  // HTML body — semantic, SEO friendly
  body: string;
};

import hero from "@/assets/hero-estate.jpg";
import cherries from "@/assets/coffee-cherries.jpg";
import hands from "@/assets/farmer-hands.jpg";
import logistics from "@/assets/logistics.jpg";
import beans from "@/assets/roasted-beans.jpg";

export const posts: BlogPost[] = [
  {
    slug: "what-makes-kenyan-highland-coffee-special",
    title: "What Makes Kenyan Highland Coffee Special",
    description:
      "Altitude, volcanic soils, and SL28/SL34 varietals shape the bright, blackcurrant character of Kenyan highland coffee. Here's how Daima's terroir delivers it.",
    excerpt:
      "From volcanic loam to cool nights at 1,800 metres, the Kenyan highlands produce one of the most distinctive cups in specialty coffee.",
    date: "2026-04-22",
    readingTime: "6 min read",
    category: "Origin",
    author: "Daima Estate",
    keywords: [
      "Kenyan coffee",
      "highland coffee",
      "SL28 SL34",
      "specialty coffee origin",
      "single origin coffee",
    ],
    image: hero,
    imageAlt: "Sunrise over the Daima highland coffee estate",
    body: `
<p>Ask any specialty roaster to describe a great Kenyan coffee and you'll hear the same notes — blackcurrant, tomato vine, grapefruit, a wine-like acidity that lingers. That cup isn't an accident. It's the product of altitude, soil, varietal, and the way the cherries are handled in the hours after they're picked.</p>

<h2>Altitude shapes acidity</h2>
<p>Daima Coffee Estate sits between 1,750 and 1,950 metres above sea level. At that elevation, nights are cool and days are warm, which slows cherry maturation. The longer the cherry takes to ripen, the more sugars and organic acids it develops — and acidity is what gives Kenyan coffee its sparkle in the cup.</p>

<h2>Volcanic soils, deep red and alive</h2>
<p>The estate's soils are weathered volcanic loam — high in iron, well-drained, and naturally rich in phosphorus. We supplement with composted coffee pulp from our own wet mill, which closes the nutrient loop and keeps soil microbiology thriving year after year.</p>

<h2>The SL28 and SL34 story</h2>
<p>Selected by Scott Agricultural Laboratories in the 1930s for drought tolerance and cup quality, SL28 and SL34 remain the heart of Kenyan specialty coffee. They are lower-yielding than modern hybrids, but the structure they bring — dense, sugar-rich beans with intense aromatics — is unmatched.</p>

<h2>Why processing matters as much as origin</h2>
<p>Even perfect cherries can be dulled by sloppy processing. Daima uses a 72-hour double-fermentation washed protocol with overnight soaking in clean spring water. The result is a clean, transparent cup that lets the terroir speak.</p>

<h2>Tasting the highlands</h2>
<p>A well-prepared Daima Highland Reserve will open with bright citrus, settle into ripe blackcurrant, and finish with a tea-like clarity. That arc — bright, fruited, clean — is the signature of Kenyan highland coffee, and it's what we work to protect from cherry to cup.</p>
    `,
  },
  {
    slug: "from-cherry-to-cup-coffee-processing-explained",
    title: "From Cherry to Cup: Coffee Processing Explained",
    description:
      "A practical, illustrated guide to how a coffee cherry becomes a green bean — washed, natural, and honey processing compared.",
    excerpt:
      "Processing is the most under-appreciated step in specialty coffee. Here's what actually happens between picking and export, and why it matters in the cup.",
    date: "2026-04-08",
    readingTime: "7 min read",
    category: "Craft",
    author: "Daima Estate",
    keywords: [
      "coffee processing",
      "washed process",
      "natural process",
      "honey process",
      "wet mill",
    ],
    image: cherries,
    imageAlt: "Ripe red coffee cherries on the branch",
    body: `
<p>Most coffee drinkers know the difference between a light and a dark roast. Far fewer know that almost every flavour distinction in a cup is decided long before roasting — at the wet mill, in the hours and days after the cherries are picked.</p>

<h2>The cherry, briefly</h2>
<p>A coffee cherry is a fruit. Inside the skin and pulp sit two seeds (the beans), wrapped in a sticky mucilage layer and a parchment shell. Processing is the art of separating bean from fruit while deciding how much of the fruit's character to leave behind.</p>

<h2>Washed process</h2>
<p>The classic East African method, and Daima's primary protocol. Cherries are pulped within hours of picking, then fermented in clean water for 36–72 hours to break down the mucilage. The result is a clean, transparent cup that highlights origin character — bright acidity, defined fruit notes, no muddiness.</p>

<h2>Natural process</h2>
<p>Cherries dry whole on raised beds for 14–28 days. The fruit ferments slowly around the bean, lending heavy berry, wine, and tropical fruit notes. It is harder to control and prone to defects if drying is uneven, but when done well it produces extraordinary cups.</p>

<h2>Honey process</h2>
<p>A middle path: cherries are pulped but the mucilage is left on for drying. Depending on how much mucilage stays (white, yellow, red, black honey), the cup gains body and stone-fruit sweetness while keeping much of the clarity of a washed coffee.</p>

<h2>Drying — the quiet make-or-break</h2>
<p>However a coffee is processed, drying is where lots are won or lost. Beans dried too fast crack; dried too slow they ferment. Daima dries on raised African beds with hand-turning every two hours during the first week, targeting a final moisture of 10.5–11.5%.</p>
    `,
  },
  {
    slug: "sustainable-farming-practices-at-daima",
    title: "Sustainable Farming Practices at Daima",
    description:
      "Shade trees, integrated pest management, water recycling, and pulp composting — the everyday practices that keep our highland soils alive.",
    excerpt:
      "Sustainability isn't a marketing claim at Daima. It's a daily set of decisions about shade, water, soil, and the people who tend the land.",
    date: "2026-03-19",
    readingTime: "5 min read",
    category: "Stewardship",
    author: "Daima Estate",
    keywords: [
      "sustainable coffee",
      "shade grown coffee",
      "regenerative agriculture",
      "coffee farming practices",
      "Rainforest Alliance",
    ],
    image: hands,
    imageAlt: "A farmer's hands holding freshly picked coffee cherries",
    body: `
<p>A coffee tree is a long-term commitment. The seedlings we plant this year will reach peak production in five and bear fruit for thirty. Farming sustainably isn't optional on that timescale — it's the only way the estate exists in 2050.</p>

<h2>Shade-grown by design</h2>
<p>Roughly 35% of Daima's productive area is interplanted with native Cordia, Grevillea, and Albizia. The canopy moderates temperature, reduces water stress, and supports the bird and pollinator populations that keep pests in check naturally.</p>

<h2>Closing the water loop</h2>
<p>Wet milling is water-intensive. Our mill recirculates water through three settling tanks before it reaches a constructed wetland that filters it back to irrigation quality. We use roughly one-third the water of a conventional pulping setup.</p>

<h2>Pulp becomes soil</h2>
<p>Coffee pulp — the wet fruit removed during processing — is composted with farm trimmings and returned to the fields as a mulch and soil amendment. It is one of the most nutrient-rich inputs available, and it's free.</p>

<h2>Integrated pest management</h2>
<p>We monitor coffee berry borer and leaf rust weekly during the wet season, deploying biological controls (Beauveria bassiana, predator wasps) before reaching for any chemical option. Most years, we don't need to.</p>

<h2>People are part of the ecosystem</h2>
<p>Our pickers are paid above the regional rate, and seasonal teams return year after year. Stable employment is what makes selective picking — only the ripe cherries — economically possible.</p>
    `,
  },
  {
    slug: "specialty-coffee-supply-chain-traceability",
    title: "Traceability in the Specialty Coffee Supply Chain",
    description:
      "Lot codes, ICO marks, and digital documentation — how Daima keeps every bag traceable from picking day to your roaster's hopper.",
    excerpt:
      "Traceability is what separates specialty coffee from commodity coffee. Here's the paper trail that follows every Daima lot from the estate to your roaster.",
    date: "2026-03-02",
    readingTime: "6 min read",
    category: "Logistics",
    author: "Daima Estate",
    keywords: [
      "coffee traceability",
      "specialty coffee supply chain",
      "green coffee export",
      "ICO mark",
      "coffee lot code",
    ],
    image: logistics,
    imageAlt: "Jute bags of green coffee stacked in a warehouse",
    body: `
<p>When a roaster opens a bag of Daima Highland Reserve, they should be able to tell you the picking week, the processing protocol, the moisture at export, and the container it shipped in. That level of detail isn't a luxury — it's the working definition of specialty coffee.</p>

<h2>The lot code</h2>
<p>Every micro-lot at Daima carries a code that encodes year, block, picking week, and processing protocol — for example <code>DM-26-B4-W14-W</code>: Daima, 2026, Block 4, Week 14, Washed. That code follows the coffee through milling, grading, bagging, and export documentation.</p>

<h2>From parchment to green</h2>
<p>After drying, parchment coffee rests for 30–60 days to stabilise before dry milling. Hulling, density sorting, screen sizing, and colour sorting each generate their own QC records, all linked back to the original lot code.</p>

<h2>Cupping and grading</h2>
<p>Every export lot is cupped at least three times — at the estate, at the dry mill, and by the buyer's QC. Score sheets, defect counts, and moisture readings are archived against the lot code.</p>

<h2>Export documentation</h2>
<p>An export bag carries the ICO mark, the lot code, weight, and origin marks. The accompanying paperwork — phytosanitary certificate, certificate of origin, ICO certificate of origin, bill of lading — references the same code, so a buyer can audit the chain end-to-end.</p>

<h2>Why it matters</h2>
<p>Traceability is what lets a roaster pay a premium with confidence, what lets a barista tell a story honestly, and what lets a farmer be rewarded for the lots that scored 88+. It is the spine of the specialty market.</p>
    `,
  },
  {
    slug: "how-to-brew-single-origin-coffee-at-home",
    title: "How to Brew Single-Origin Coffee at Home",
    description:
      "A no-nonsense guide to brewing single-origin coffee at home — grind, ratio, water, and the three pour-over recipes worth memorising.",
    excerpt:
      "You don't need a café setup to taste what a great single-origin can do. You need fresh beans, a decent grinder, a scale, and ten minutes.",
    date: "2026-02-14",
    readingTime: "8 min read",
    category: "Brewing",
    author: "Daima Estate",
    keywords: [
      "how to brew coffee",
      "single origin brewing",
      "pour over recipe",
      "V60 recipe",
      "specialty coffee at home",
    ],
    image: beans,
    imageAlt: "Freshly roasted coffee beans in soft morning light",
    body: `
<p>Specialty coffee gets a reputation for being fussy. It doesn't have to be. If you can boil water and weigh things, you can brew a cup at home that's better than 95% of café coffee.</p>

<h2>The four variables that actually matter</h2>
<p>Grind size, brew ratio, water temperature, and freshness. Get those right and almost any method works. Get them wrong and the most expensive grinder in the world won't save you.</p>

<h2>The Daima house ratio</h2>
<p>1:16 by weight — 20g of coffee to 320g of water. It's a forgiving starting point that works for V60, Chemex, Kalita Wave, and most flat-bottom drippers.</p>

<h2>A simple V60 recipe</h2>
<ol>
  <li>Rinse the filter with hot water; discard the rinse.</li>
  <li>Grind 20g of coffee at a medium-fine setting (table salt).</li>
  <li>Bloom: pour 60g of 94°C water, swirl, wait 40 seconds.</li>
  <li>Pour to 160g over 30 seconds, then to 320g by 1:45.</li>
  <li>Total brew time: 2:45–3:15. Stir gently if channelling.</li>
</ol>

<h2>Water is half the cup</h2>
<p>Aim for water with 75–150 ppm total dissolved solids. Distilled water tastes flat; very hard tap water mutes acidity. A simple carbon filter is usually enough.</p>

<h2>Storage</h2>
<p>Keep beans whole, in an opaque airtight container, at room temperature. Grind only what you'll brew. A bag opened today and a bag opened three weeks ago are not the same coffee.</p>

<h2>What to taste for in a Kenyan</h2>
<p>Brightness up front — citrus or blackcurrant. A round, juicy middle. A clean, slightly drying finish that invites the next sip. If your cup is dull or astringent, grind a touch coarser and brew again.</p>
    `,
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
