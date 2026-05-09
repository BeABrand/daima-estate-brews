import { createFileRoute } from "@tanstack/react-router";
import hands from "@/assets/farmer-hands.jpg";
import hero from "@/assets/hero-estate.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Daima Coffee Estate" },
      { name: "description", content: "Learn about Daima Coffee Estate — a highland farm rooted in patience, craft, and stewardship of the land." },
      { property: "og:title", content: "About Daima Coffee Estate" },
      { property: "og:description", content: "A highland farm rooted in patience, craft, and stewardship." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">About the estate</span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-4xl leading-[1.02]">
            A farm of patience, in a place that rewards it.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Daima Coffee Estate is a working highland farm. We grow, process, and steward coffee — and the broader operations of the land — with a long view in mind.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <img src={hero} alt="Daima estate landscape" loading="lazy" width={1920} height={1080} className="w-full aspect-[16/8] object-cover rounded-sm" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">Rooted in the highlands.</h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Daima — Swahili for <em>always</em> — was founded on a simple idea: that the most rewarding agriculture is also the most patient. Our estate sits in cool, mist-fed highlands where coffee ripens slowly and develops the dense, layered sweetness it is known for.
            </p>
            <p>
              Coffee is our flagship, but the estate is broader than a single crop. We treat farm operations as a craft — managing soil, water, shade, and labour with the same care we bring to a finished lot of green coffee.
            </p>
            <p>
              Our work is generational. The hands that pick today carry knowledge passed down across decades, and the trees we plant are intended for harvests we will not see ourselves.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">What guides us</span>
          <div className="mt-8 grid md:grid-cols-3 gap-10">
            {[
              { t: "Stewardship", d: "We farm for the next harvest, and the next generation. Soil health, biodiversity, and shade are not afterthoughts — they are the foundation of quality." },
              { t: "Craft", d: "From selective picking to careful fermentation and patient sun-drying, every step is done with attention. Quality is not a step; it is the whole process." },
              { t: "Partnership", d: "We work directly with our team, our community, and our buyers. Long relationships produce better coffee — and better outcomes for everyone." },
            ].map((v) => (
              <div key={v.t}>
                <div className="font-display text-2xl">{v.t}</div>
                <p className="mt-3 text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center">
          <img src={hands} alt="Farmer hands" loading="lazy" width={1280} height={1024} className="rounded-sm w-full aspect-[5/4] object-cover" />
          <div>
            <span className="eyebrow">The team</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Hands that know the land.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our pickers, processors, and field managers are the heart of Daima. We invest in fair wages, training, and conditions that make this work a livelihood worth returning to year after year.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
