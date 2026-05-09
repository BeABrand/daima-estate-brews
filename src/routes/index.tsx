import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-estate.jpg";
import cherries from "@/assets/coffee-cherries.jpg";
import hands from "@/assets/farmer-hands.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daima Coffee Estate — Highland Coffee, Grown with Care" },
      { name: "description", content: "A working highland coffee estate producing exceptional single-origin coffee with patience and care." },
      { property: "og:title", content: "Daima Coffee Estate" },
      { property: "og:description", content: "Highland single-origin coffee, grown with care." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img src={hero} alt="Daima Coffee Estate at golden hour" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-bean/20 via-bean/30 to-bean/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 h-full flex flex-col justify-end pb-20">
          <span className="eyebrow text-cream/90">Est. Highland Estate</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl text-cream max-w-4xl leading-[0.95]">
            Coffee, grown <em className="italic font-light">slowly</em>, handled with care.
          </h1>
          <p className="mt-6 max-w-xl text-cream/80 text-lg leading-relaxed">
            Daima Coffee Estate is a working farm in the highlands — patient stewards of the land, producing single-origin coffee from cherry to cup.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/produce" className="inline-flex items-center rounded-full bg-cream text-bean px-7 py-3.5 text-sm font-medium hover:bg-cream/90 transition">
              Explore the harvest
            </Link>
            <Link to="/about" className="inline-flex items-center rounded-full border border-cream/40 text-cream px-7 py-3.5 text-sm hover:bg-cream/10 transition">
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <span className="eyebrow">Our Philosophy</span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              We believe great coffee begins with great soil, patient hands, and a long view of the land we tend.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              From the first cherry to the final shipment, every step is considered. Daima — meaning <em>always</em> — is our promise of consistency, integrity, and craft, season after season.
            </p>
          </div>
        </div>
      </section>

      {/* Two-up feature */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-8">
          <Link to="/produce" className="group relative overflow-hidden rounded-sm aspect-[4/5] block">
            <img src={cherries} alt="Ripe coffee cherries" loading="lazy" width={1280} height={1280} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-bean/80 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-10 text-cream">
              <span className="eyebrow text-cream/80">Produce</span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">Single-origin coffee</h3>
              <p className="mt-2 text-cream/80 text-sm">Hand-picked, fully washed, sun-dried.</p>
            </div>
          </Link>
          <Link to="/about" className="group relative overflow-hidden rounded-sm aspect-[4/5] block">
            <img src={hands} alt="Farmer hands holding cherries" loading="lazy" width={1280} height={1024} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-bean/80 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-10 text-cream">
              <span className="eyebrow text-cream/80">The Estate</span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">Hands that know the land</h3>
              <p className="mt-2 text-cream/80 text-sm">Generational knowledge in every harvest.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { k: "1,750m", v: "Altitude" },
            { k: "SL28 / SL34", v: "Heritage varietals" },
            { k: "100%", v: "Hand-picked" },
            { k: "Year-round", v: "Estate operations" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-3xl md:text-4xl text-foreground">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground tracking-wide">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="eyebrow">Partner with the estate</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            Looking for green coffee, roasted lots, or a long-term sourcing partner?
          </h2>
          <Link to="/contact" className="mt-10 inline-flex items-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm hover:bg-primary/90 transition">
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
