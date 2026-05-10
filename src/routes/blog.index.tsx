import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/lib/blog-posts";
import { buildSeoLinks, buildSeoMeta } from "@/lib/seo";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site-config";

const blogJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `Journal — ${SITE_NAME}`,
  url: `${SITE_URL}/blog`,
  description:
    "Field notes, brewing guides, and supply-chain writing from a working highland coffee estate.",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE_URL}/blog/${p.slug}`,
    datePublished: p.date,
    author: { "@type": "Organization", name: p.author },
    image: absoluteUrl(p.image),
    keywords: p.keywords.join(", "),
  })),
});

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: buildSeoMeta({
      path: "/blog",
      title: "Journal — Daima Coffee Estate",
      description:
        "Field notes, brewing guides, and supply-chain writing from a working highland coffee estate. Insights on Kenyan specialty coffee from Daima.",
    }),
    links: buildSeoLinks({ path: "/blog" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(blogJsonLd()),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <div className="bg-background">
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-12">
        <p className="eyebrow">Journal</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 max-w-3xl leading-[1.05]">
          Field notes from a working coffee estate.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Writing on Kenyan highland coffee, processing, sustainability, and the
          quiet craft of getting a cherry to a cup.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-12">
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group grid md:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden border border-border bg-card hover:shadow-[var(--shadow-elegant)] transition-shadow"
        >
          <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              loading="eager"
            />
          </div>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="text-accent">{featured.category}</span>
              <span>·</span>
              <span>{featured.readingTime}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-block text-sm font-medium border-b border-foreground/40 group-hover:border-foreground pb-0.5">
              Read article →
            </span>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <article>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="text-accent">{p.category}</span>
                  <span>·</span>
                  <span>{p.readingTime}</span>
                </div>
                <h3 className="font-display text-2xl mt-3 leading-snug group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                  {p.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
