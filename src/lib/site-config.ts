export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://daimacoffee.com"
).replace(/\/$/, "");

export const SITE_NAME = "Daima Coffee Estate";
export const SITE_TAGLINE = "Highland Coffee, Grown with Care";
export const SITE_LOCALE = "en_US";
export const SITE_LANG = "en";
export const SITE_TWITTER = "@daimacoffee";

export const SITE_DESCRIPTION =
  "Daima Coffee Estate is a working highland farm producing single-origin Kenyan coffee with patience, care, and respect for the land.";

export const SITE_LOGO_URL = `${SITE_URL}/favicon.svg`;
export const SITE_OG_IMAGE = `${SITE_URL}/favicon.svg`;

export const SITE_KEYWORDS = [
  "Daima Coffee Estate",
  "Kenyan coffee",
  "highland coffee",
  "single origin coffee",
  "specialty coffee",
  "SL28",
  "SL34",
  "green coffee",
  "coffee estate Kenya",
];

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path;
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
};
