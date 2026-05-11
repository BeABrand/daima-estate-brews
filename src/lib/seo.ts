import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TWITTER,
  absoluteUrl,
} from "./site-config";

type MetaTag =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string };

type LinkTag = { rel: string; href: string; type?: string; crossOrigin?: "anonymous" | "use-credentials" | "" };

type SeoInput = {
  path: string;
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function buildSeoMeta(input: SeoInput): MetaTag[] {
  const url = absoluteUrl(input.path);
  const description = input.description ?? SITE_DESCRIPTION;
  const image = absoluteUrl(input.image ?? SITE_OG_IMAGE);
  const ogType = input.type ?? "website";

  const meta: MetaTag[] = [
    { title: input.title },
    { name: "description", content: description },
    { property: "og:title", content: input.title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE_TWITTER },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (input.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }

  return meta;
}

export function buildSeoLinks(input: { path: string }): LinkTag[] {
  return [{ rel: "canonical", href: absoluteUrl(input.path) }];
}
