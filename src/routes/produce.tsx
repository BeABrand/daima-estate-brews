import { createFileRoute, Link } from "@tanstack/react-router";
import cherries from "@/assets/coffee-cherries.jpg";
import beans from "@/assets/roasted-beans.jpg";

export const Route = createFileRoute("/produce")({
  head: () => ({
    meta: [
      { title: "Produce — Daima Coffee Estate" },
      { name: "description", content: "Discover Daima's flagship single-origin coffee — heritage varietals, hand-picked, fully washed, and sun-dried." },
      { property: "og:title", content: "Produce — Daima Coffee Estate" },
      { property: "og:description", content: "Heritage varietals, hand-picked and fully washed." },
    ],
  }),
  component: Produce,
});

function Produce() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">Estate produce</span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[1.02]">
            Coffee — our flagship craft.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Daima Coffee Estate produces a small, considered range of single-origin coffees, grown and processed entirely on the farm.
          </p>
        </div>
      </section>

      {/* Coffee feature */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-stretch">
          <div className="relative overflow-hidden rounded-sm">
            <img src={cherries} alt="Coffee cherries on the branch" loading="lazy" width={1280} height={1280} className="w-full h-full object-cover aspect-square" />
          </div>
          <div className="bg-primary text-primary-foreground p-10 md:p-14 rounded-sm flex flex-col">
            <span className="eyebrow text-accent">Available now</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Daima Highland Reserve</h2>
            <p className="mt-6 text-primary-foreground/80 leading-relaxed">
              A bright, layered cup with notes of black currant, bergamot, and brown sugar. Cultivated at 1,750m and processed with the patient washed method that the highlands are known for.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
              {[
                ["Varietal", "SL28 · SL34 · Ruiru 11"],
                ["Altitude", "1,650 – 1,800 m"],
                ["Process", "Fully washed, sun-dried"],
                ["Harvest", "October – December"],
                ["Cup notes", "Blackcurrant, bergamot, brown sugar"],
                ["Available as", "Green · Roasted"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-primary-foreground/50 uppercase tracking-widest text-[10px]">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/contact" className="mt-10 inline-flex w-fit items-center rounded-full bg-cream text-bean px-6 py-3 text-sm hover:bg-cream/90 transition">
              Request samples →
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">From cherry to cup</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-3xl">A process measured in patience.</h2>
          <div className="mt-14 grid md:grid-cols-4 gap-10">
            {[
              { n: "01", t: "Selective picking", d: "Only ripe red cherries leave the tree, picked by hand across multiple passes." },
              { n: "02", t: "Wet milling", d: "Cherries are pulped and fermented to draw out clarity and structure in the cup." },
              { n: "03", t: "Sun-drying", d: "Beans rest on raised beds, turned by hand for even drying over 14–21 days." },
              { n: "04", t: "Resting & milling", d: "Parchment rests in cool storage before dry-milling, grading, and shipment." },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-cherry text-2xl">{s.n}</div>
                <div className="mt-3 font-medium">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">Beyond coffee</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-3xl">More from the estate, coming soon.</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            Daima is a diversified farm. As our other operations mature, we will share them here with the same care we bring to coffee.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { t: "Macadamia", d: "Intercropped on the estate. First commercial harvest pending." },
              { t: "Avocado", d: "Hass orchards being established on the lower terraces." },
              { t: "Honey", d: "Apiaries supporting pollination across the farm." },
            ].map((p) => (
              <div key={p.t} className="border border-border rounded-sm p-8 bg-card relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase bg-secondary px-2 py-1 rounded-full text-muted-foreground">
                  Coming soon
                </div>
                <div className="font-display text-2xl">{p.t}</div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={beans} alt="Roasted coffee beans" loading="lazy" width={1280} height={896} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bean/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 h-full flex flex-col justify-center text-center text-cream">
          <h2 className="font-display text-4xl md:text-5xl">Taste the highlands.</h2>
          <p className="mt-4 text-cream/80">Request a sample of Daima Highland Reserve.</p>
          <Link to="/contact" className="mt-8 mx-auto inline-flex items-center rounded-full bg-cream text-bean px-7 py-3 text-sm hover:bg-cream/90 transition">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
