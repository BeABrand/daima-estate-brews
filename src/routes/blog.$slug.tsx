import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPostBySlug, posts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: "Article — Daima Coffee Estate" },
          { name: "description", content: "Daima Coffee Estate journal." },
        ],
      };
    }
    return {
      meta: [
        { title: `${post.title} — Daima Coffee Estate` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "author", content: post.author },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:image", content: post.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: post.image },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: [post.image],
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Daima Coffee Estate",
            },
            keywords: post.keywords.join(", "),
            articleSection: post.category,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-5xl">Article not found</h1>
      <p className="mt-4 text-muted-foreground">
        That story may have moved. Browse the journal for more.
      </p>
      <Link
        to="/blog"
        className="mt-8 inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm"
      >
        Back to journal
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background">
      <article>
        <header className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Link to="/blog" className="hover:text-foreground">Journal</Link>
            <span>·</span>
            <span className="text-accent">{post.category}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mt-5 leading-[1.08]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatted}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="prose-daima mx-auto max-w-2xl px-6 lg:px-10 py-14"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl">Keep reading</h2>
            <Link to="/blog" className="text-sm hover:text-accent">
              All articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">
                  {p.category}
                </p>
                <h3 className="font-display text-xl mt-2 group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
