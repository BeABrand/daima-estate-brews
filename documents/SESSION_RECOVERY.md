# Session Recovery — Daima Coffee Estate Frontend

**Date:** 2026-05-10
**Repo:** `/var/www/html/contract/james_projects/daima-estate-brews`
**Stack:** TanStack Start (React 19 + Vite 7 + Cloudflare Workers + Tailwind v4)
**Build platform:** Lovable (lovable.dev) — KEEP all `@lovable.dev/*` deps and `.lovable/`

---

## Conversation log

### Turn 1 — User

> `npm run dev` — observed PostCSS error:
> ```
> [vite:css][postcss] @import must precede all other statements (besides @charset or empty @layer)
> ```
> Three-part action plan dictated:
> 1. Fix the CSS @import error.
> 2. **In another git branch checkout:** remove "any and all Lovable references, icons and images" and replace with assets corresponding to the project, analyzing `/var/www/html/contract/james_projects/daima_coffee_payments` (the org's payments disbursement system) for uniform theme.
> 3. **In another git branch checkout:** ensure SEO is fully optimized and indexed to all major search engines, error-free.
>
> Reminders: do not ignore CLAUDE configuration; use specialized agents (e2e-runner, tdd-guide, build-error-resolver, code-reviewer, security-reviewer, refactor-cleaner, architect); create branches per implementation.

### Turn 1 — Assistant

Investigated the project: TanStack Start app (no `index.html` — `RootShell` in `src/routes/__root.tsx` renders the HTML root). Source `src/styles.css` had:

```
@import "tailwindcss" source(none);   ← line 1
@source "../src";
@import "tw-animate-css";              ← line 3
@custom-variant dark (&:is(.dark *));
@import url("https://fonts.googleapis.com/...Fraunces...Inter...");  ← line 7
```

Root cause: Tailwind v4 expands `@import "tailwindcss"` into ~3700 lines of generated CSS at build, which pushed the Google Fonts `@import` past other rules in the bundled output, violating the spec.

**Fix (branch `fix/css-import-order`):**
- Removed the Google Fonts `@import url(...)` from `src/styles.css`.
- Added `<link rel="preconnect">` (×2) + `<link rel="stylesheet">` for Fraunces+Inter to the `head.links` array in `src/routes/__root.tsx`.
- Verified with `npx vite build --mode development` → clean build, CSS bundle 84.98 kB, no PostCSS errors.

Commit: `47a2da5 fix: move Google Fonts to head links to satisfy CSS @import order`

Created task list for the three tracks; began Task 2 (Lovable removal).

### Turn 2 — Assistant (initial Task 2 attempt — superseded)

Attempted to remove `@lovable.dev/vite-tanstack-config` build dep, rewrote `vite.config.ts` to wire the underlying plugins manually, deleted `.lovable/`, copied `favicon.svg` + `favicon.ico` + `apple-touch-icon.png` from `daima_coffee_payments/public/` into a new `public/` dir.

User rejected the staging step.

### Turn 2 — User correction

> "I AM STILL USING LOVABLE TO BUILD AND DEVELOP THE WEBSITE UI, I MEANT LOVABLE IMAGES AND ICONS, REMOVE THE LARAVEL ICONS AND IMAGES, USE COFFEE SVG AS THE WEBSITE ICON, LOGO AND IMAGE FOR THE ORGANIZATION"

**Saved to memory:** `/home/kimemia/.claude/projects/-var-www-html-contract-james-projects-daima-estate-brews/memory/feedback_lovable_scope.md` — "remove lovable" in this project means VISUAL/BRANDING assets only, never the build tooling.

### Turn 2 — Assistant (corrected Task 2)

- Reverted `vite.config.ts`, `package.json`, `.lovable/project.json` to HEAD.
- Removed `public/favicon.ico` and `public/apple-touch-icon.png` (default Laravel icons from the payments project).
- Kept `public/favicon.svg` only — it's the custom Daima coffee bean SVG (circular, deep coffee bean fill `#3a2a1c`, cream `#f8efe1` ellipse + center crease forming a coffee bean silhouette, cherry-red `#c44a3a` "D" monogram). Palette matches the existing `--bean / --cream / --cherry` OKLCH variables in `styles.css`.
- Wired the SVG as favicon + apple-touch-icon in `__root.tsx` head.
- Updated `SiteHeader.tsx` to use the SVG as the logo mark (replacing the placeholder `<span>D</span>`).
- Updated `SiteFooter.tsx` to lead with the SVG mark next to the wordmark.
- `npm install` to sync lockfile after the temporary uninstall.
- Build verified clean.

Commit: `1941d91 feat: brand site with Daima coffee bean SVG icon and logo` on branch `chore/remove-lovable-apply-daima-theme`.

### Turn 3 — Assistant (Task 3 — SEO)

Branch `feat/seo-optimization` (from `chore/remove-lovable-apply-daima-theme`). Added comprehensive SEO:

**New files:**
- `src/lib/site-config.ts` — central config: `SITE_URL` (override via `VITE_SITE_URL`, default `https://daimacoffee.com`), `SITE_NAME`, `SITE_TAGLINE`, `SITE_LOCALE`, `SITE_LANG`, `SITE_TWITTER`, `SITE_DESCRIPTION`, `SITE_LOGO_URL`, `SITE_OG_IMAGE`, `SITE_KEYWORDS[]`, plus `absoluteUrl(path)` helper.
- `src/lib/seo.ts` — `buildSeoMeta({path, title, description?, image?, type?, noindex?})` and `buildSeoLinks({path})` produce the standard set: title, description, og:* (title/description/type/url/image/site_name/locale), twitter:* (card/site/title/description/image), plus canonical.
- `public/robots.txt` — `Allow: /`, `Disallow: /api/`, sitemap reference.
- `public/sitemap.xml` — all 6 static routes + 5 blog posts with `<lastmod>` from each post's date.

**Modified routes:**
- `__root.tsx` — global meta (keywords, author, publisher, robots, googlebot, theme-color `#3a2a1c`, format-detection, application-name, apple-mobile-web-app-title), default og:* and twitter:*, `<link rel=canonical>`, `<link rel=sitemap>`, **JSON-LD Organization** (PostalAddress + ContactPoint with email/phone/Swahili+English), **JSON-LD WebSite**.
- `index.tsx`, `about.tsx`, `produce.tsx`, `logistics.tsx`, `contact.tsx` — switched per-route head to `buildSeoMeta` + `buildSeoLinks` so each emits absolute og:image, og:url, canonical.
- `blog.index.tsx` — JSON-LD `Blog` listing with `BlogPosting[]` for all 5 posts, absolute image URLs.
- `blog.$slug.tsx` — kept the existing Article meta but enriched JSON-LD: `mainEntityOfPage`, `dateModified`, `Organization.publisher.logo` ImageObject, `inLanguage`, plus a separate `BreadcrumbList` JSON-LD (Home → Journal → article).

Build verified clean (~199 kB router bundle).

Commit: `da87e24 feat: full SEO optimization — meta, JSON-LD, robots, sitemap, canonical`

---

### Turn 4 — User

> "UPDATE README.md, THEN UPDATE THE SESSION_ AND RESUME_ DOCUMENTS COMPREHENSIVELY WITH THE LATEST CHANGES DONE THUS FAR FOR THE NEXT SESSION, CONSIDER THESE DOCUMENTS ARE FOUND AND UPDATED FROM documents DIRECTORY AND ENSURE TO CREATE A GIT BRANCH BASED ON THE REQUESTED IMPLEMENTATION ON THE FIX/REFACTOR"

### Turn 4 — Assistant

Branch `docs/readme-and-session-resume` (from `feat/seo-optimization` HEAD).

Created `README.md` covering:
- Stack table (TanStack Start, React 19, Tailwind v4, Cloudflare Workers, Lovable build wrapper).
- Getting started commands (`npm install`, `npm run dev`, `npm run build`, etc.).
- Project structure tree (`src/routes`, `src/components`, `src/lib`, `src/assets`, `public/`, `documents/`).
- Brand & design tokens — OKLCH ↔ hex mapping for `--bean / --cream / --cherry / --leaf` aligned to the favicon SVG. Typography (Fraunces + Inter via `<link>` only, with the warning to NEVER add fonts via `@import` in CSS).
- SEO architecture — `site-config.ts` + `seo.ts`, what every page emits, JSON-LD types per page, static SEO files.
- Deployment — Cloudflare Workers via `wrangler deploy`, `VITE_SITE_URL` env var.
- Working with this repo — branch naming, commit conventions, no-touch list (`main`, `routeTree.gen.ts`, Lovable wrapper).
- Recent change log table referencing all four prior commits + this one.

Refreshed `documents/SESSION_RECOVERY.md` (this file) and `documents/RESUME_INSTRUCTIONS.md` to add Turn 4, expand the branch chain, and reflect the README's existence as canonical project orientation.

---

## Branches

```
main                                              ← origin/main, untouched
└── fix/css-import-order        47a2da5  CSS fix
    └── chore/remove-lovable-apply-daima-theme  1941d91  branding
        └── feat/seo-optimization  da87e24  SEO
            └── feat/seo-optimization  4dd10a3  initial session docs
                └── docs/readme-and-session-resume  <pending>  README + doc refresh
```

Each branch is **cumulative on the previous** so `docs/readme-and-session-resume` carries the CSS fix, branding changes, SEO work, and initial session docs.

---

### Turn 5 — User

Shared 6 screenshots of `daimacoffee.netlify.app` showing a Netlify "Page not found" 404 on production. Netlify deploy showed build succeeded (19 files uploaded, 2m 7s). Deploy file browser revealed all files landing under a `client/` subfolder — no `index.html` anywhere.

### Turn 5 — Assistant

**Root cause (two-part):**
1. Netlify's publish directory was not configured, so it defaulted to `dist/` (the build root). Assets appeared under `client/` in the deploy browser because Vite writes client output to `dist/client/`.
2. More fundamentally, TanStack Start with `@cloudflare/vite-plugin` never emits `index.html`. HTML is generated at request time inside the Cloudflare Worker. Netlify cannot run that Worker, so every URL returns 404 regardless of publish dir.

**Fix (branch `fix/netlify-deployment`):**

`vite.config.ts` — Enabled TanStack Start's built-in pre-renderer:
```ts
prerender: {
  enabled: true,
  crawlLinks: true,
},
```

`netlify.toml` — New file telling Netlify exactly how to build and what to serve:
```toml
[build]
  command   = "npm run build"
  publish   = "dist/client"
  ...
```

Commits: `167bff3`, `3cad0b1`

---

### Turn 6 — User

Pasted Netlify build log showing the `fix/netlify-deployment` branch also failing:
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/opt/build/repo/dist/server/server.js'
  imported from @tanstack/start-plugin-core/.../vite/preview-server-plugin/plugin.js
...
Error: Failed to fetch /: Internal Server Error
```
Prerender started but all pages returned 500. Build failed exit code 2.

### Turn 6 — Assistant

**Diagnosis:** Two adapter conflicts running simultaneously:

1. **`preview-server-plugin` (Node.js adapter plugin)** — TanStack Start's prerender uses this plugin to start a local HTTP server from the compiled server bundle, then crawls routes against it. It looks for `dist/server/server.js`. The Cloudflare adapter outputs `dist/server/index.js` instead → `ERR_MODULE_NOT_FOUND`.

2. **Miniflare fallback** — After the Node.js plugin crashes, miniflare (the Cloudflare Worker emulator bundled in `wrangler`) starts and serves requests. However, miniflare encounters an internal error (visible from the 500 response headers showing workerd) → all prerender crawl fetches return HTTP 500 → prerender aborts.

**Why the previous attempt looked partial but failed:** The prerender DID start crawling (`/`, `/about`, `/contact`), proving miniflare was running. But the 500s are fatal — prerender exits with code 1, aborting the whole build.

**Root cause:** `@cloudflare/vite-plugin` builds the server as a Cloudflare Worker bundle (`dist/server/index.js`). TanStack Start's Node.js prerender infrastructure expects a Node.js-compatible server module at `dist/server/server.js`. These are incompatible.

**Fix (branch `fix/netlify-cloudflare-adapter-conflict`):**

`vite.config.ts` — Detect Netlify's build environment via `process.env.NETLIFY` (set to `"true"` automatically by Netlify):

```ts
const isNetlifyBuild = process.env.NETLIFY === "true";

export default defineConfig({
  ...(isNetlifyBuild && { cloudflare: false }),  // disable CF adapter on Netlify
  tanstackStart: {
    server: { entry: "server" },
    ...(isNetlifyBuild && {
      prerender: { enabled: true, crawlLinks: true },
    }),
  },
});
```

When `NETLIFY=true`:
- `cloudflare: false` disables `@cloudflare/vite-plugin`
- TanStack Start's Node.js SSR adapter takes over
- Server bundle outputs to `dist/server/server.js` — `preview-server-plugin` finds it
- Prerender starts a plain Node.js HTTP server (no miniflare) → reliable 200 responses
- All 11 routes rendered to static HTML in `dist/client/`

When NOT on Netlify (local dev, Lovable, Cloudflare Pages):
- Cloudflare Workers adapter unchanged
- No prerender (Cloudflare Worker handles SSR at request time)

Verified local build still passes clean (Cloudflare path, no prerender).

Commit: `ec38d66 fix: disable Cloudflare adapter on Netlify to unblock SSG prerender`

---

## Branches

```
main                                              ← origin/main, untouched
└── fix/css-import-order        47a2da5  CSS fix
    └── chore/remove-lovable-apply-daima-theme  1941d91  branding
        └── feat/seo-optimization  da87e24  SEO
            └── feat/seo-optimization  4dd10a3  initial session docs
                └── docs/readme-and-session-resume  04cf966  README + doc refresh
                    └── chore/re-configuration  f5cb385  (what landed)
                        └── fix/netlify-deployment  167bff3  SSG prerender + netlify.toml
```

Each branch is **cumulative on the previous**.

## Verification commands

```bash
npm run build                            # confirms pre-render runs after CF Worker bundle
# Look for "Prerendering pages..." in build output
# dist/client/ should contain index.html at root and in each route subfolder
npm run dev                              # dev mode: SSR via miniflare, no prerender step
```

## Open items

- `SITE_URL` defaults to `https://daimacoffee.com`. If the production domain differs, set `VITE_SITE_URL` in the deploy environment — `robots.txt` and `sitemap.xml` use the literal default and will need updating if the domain changes.
- `SITE_TWITTER = "@daimacoffee"` is a placeholder.
- `Organization` JSON-LD `sameAs: []` is empty — add social profile URLs when available.
- All branches are local; not pushed to origin (per user rules — no autonomous remote ops).
- No PR opened; user has not requested merge/push.
- Netlify project is auto-deployed from GitHub. The fix branch must be merged into the branch Netlify watches (likely `main`) for the changes to take effect on `daimacoffee.netlify.app`.

## Files added/changed (cumulative)

```
netlify.toml                                      (new — Turn 5)
README.md                                         (new — Turn 4)
documents/SESSION_RECOVERY.md                     (new Turn 3, expanded Turns 4, 5)
documents/RESUME_INSTRUCTIONS.md                  (new Turn 3, expanded Turns 4, 5)
public/favicon.svg                                (new — Turn 2)
public/robots.txt                                 (new — Turn 3)
public/sitemap.xml                                (new — Turn 3)
src/lib/seo.ts                                    (new — Turn 3)
src/lib/site-config.ts                            (new — Turn 3)
vite.config.ts                                    (modified — Turn 5: added prerender config)
src/styles.css                                    (modified — Turn 1, removed Google Fonts @import)
src/routes/__root.tsx                             (modified — Turns 1, 2, 3)
src/routes/index.tsx                              (modified — Turn 3)
src/routes/about.tsx                              (modified — Turn 3)
src/routes/produce.tsx                            (modified — Turn 3)
src/routes/logistics.tsx                          (modified — Turn 3)
src/routes/contact.tsx                            (modified — Turn 3)
src/routes/blog.index.tsx                         (modified — Turn 3)
src/routes/blog.$slug.tsx                         (modified — Turn 3)
src/components/SiteHeader.tsx                     (modified — Turn 2)
src/components/SiteFooter.tsx                     (modified — Turn 2)
```
