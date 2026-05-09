import { createFileRoute } from "@tanstack/react-router";
import logistics from "@/assets/logistics.jpg";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: "Logistics — Daima Coffee Estate" },
      { name: "description", content: "From estate warehouse to global shipment — Daima's logistics keep our coffee traceable, protected, and on time." },
      { property: "og:title", content: "Logistics — Daima Coffee Estate" },
      { property: "og:description", content: "Traceable, protected, on time — from estate to destination." },
    ],
  }),
  component: Logistics,
});

function Logistics() {
  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <span className="eyebrow">Logistics & supply</span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.02]">
              From estate to destination, with full traceability.
            </h1>
          </div>
          <p className="md:col-span-5 text-lg text-muted-foreground leading-relaxed">
            We handle every link in the chain — milling, grading, warehousing, and export — so each lot arrives in the condition it left the farm.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <img src={logistics} alt="Sacks of green coffee being prepared for shipment" loading="lazy" width={1600} height={1024} className="w-full aspect-[16/8] object-cover rounded-sm" />
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-3 gap-10">
          {[
            { t: "Estate warehousing", d: "Climate-managed storage of parchment and milled green coffee, with lot-level segregation from harvest through dispatch." },
            { t: "Milling & grading", d: "Dry-milling, screen sizing, density sorting, and hand-picking for defects — every lot meets our cup and physical specs." },
            { t: "Export & freight", d: "GrainPro-lined jute bags, palletised loading, and direct coordination with freight forwarders for FOB Mombasa or door-to-door." },
            { t: "Documentation", d: "ICO marks, phytosanitary certificates, certificates of origin, and full traceability documents prepared in-house." },
            { t: "Sample programs", d: "Pre-shipment and arrival samples on request, with cupping notes and lot-specific data sheets." },
            { t: "Long-term contracts", d: "Forward contracts and multi-year sourcing partnerships available for serious roasters and importers." },
          ].map((s) => (
            <div key={s.t} className="border-t border-border pt-6">
              <div className="font-display text-2xl">{s.t}</div>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">How a lot moves</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-3xl">A clear path from estate to door.</h2>
          <ol className="mt-12 space-y-8 max-w-3xl">
            {[
              ["Harvest & wet mill", "Cherries picked, pulped, fermented, and dried on the estate."],
              ["Resting & dry mill", "Parchment rests, then is hulled, graded, and sorted."],
              ["Cupping & approval", "Each lot is cupped and signed off against contract specs."],
              ["Bagging & loading", "GrainPro-lined bags, palletised, sealed, and dispatched."],
              ["Shipment & arrival", "Documentation handled; arrival samples follow on request."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-6">
                <div className="font-display text-cherry text-2xl w-10 shrink-0">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="font-medium">{t}</div>
                  <p className="text-muted-foreground mt-1">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
