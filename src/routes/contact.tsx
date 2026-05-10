import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { buildSeoMeta, buildSeoLinks } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: buildSeoMeta({
      path: "/contact",
      title: "Contact — Daima Coffee Estate",
      description:
        "Reach out to Daima Coffee Estate for sourcing, samples, partnerships, and estate visits in the Kenyan highlands.",
    }),
    links: buildSeoLinks({ path: "/contact" }),
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span className="eyebrow">Get in touch</span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl max-w-3xl leading-[1.02]">
            Let's talk coffee.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Whether you're a roaster, importer, or visitor — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-10">
            {[
              { Icon: Mail, t: "Email", v: "hello@daimacoffee.com" },
              { Icon: Phone, t: "Phone", v: "+254 700 000 000" },
              { Icon: MapPin, t: "Estate", v: "Central Highlands, Kenya" },
            ].map(({ Icon, t, v }) => (
              <div key={t} className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="eyebrow">{t}</div>
                  <div className="mt-1 text-lg">{v}</div>
                </div>
              </div>
            ))}
            <div className="pt-6 border-t border-border">
              <div className="eyebrow">Visiting hours</div>
              <p className="mt-2 text-muted-foreground">Estate tours by appointment, Tuesday – Saturday.</p>
            </div>
          </div>

          <form
            className="md:col-span-7 bg-card border border-border rounded-sm p-8 md:p-10"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            {sent ? (
              <div className="py-16 text-center">
                <h3 className="font-display text-3xl">Asante sana.</h3>
                <p className="mt-3 text-muted-foreground">Thank you — we'll be in touch shortly.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <div>
                  <label className="eyebrow">Interest</label>
                  <select className="mt-2 w-full bg-transparent border-b border-input py-2 focus:outline-none focus:border-primary">
                    <option>Green coffee — sourcing</option>
                    <option>Roasted coffee — wholesale</option>
                    <option>Estate visit</option>
                    <option>Press / media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="eyebrow">Message</label>
                  <textarea required rows={5} className="mt-2 w-full bg-transparent border-b border-input py-2 focus:outline-none focus:border-primary resize-none" />
                </div>
                <button className="mt-4 inline-flex w-fit items-center rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm hover:bg-primary/90 transition">
                  Send message →
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent border-b border-input py-2 focus:outline-none focus:border-primary"
      />
    </div>
  );
}
