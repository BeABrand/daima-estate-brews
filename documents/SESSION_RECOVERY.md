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

## Branches

```
main                                              ← origin/main, untouched
└── fix/css-import-order        47a2da5  CSS fix
    └── chore/remove-lovable-apply-daima-theme  1941d91  branding
        └── feat/seo-optimization  da87e24  SEO
```

Each branch is **cumulative on the previous** so `feat/seo-optimization` carries the CSS fix and the branding changes.

## Verification commands

```bash
npx vite build --mode development        # build verifies plugin chain + CSS
npm run dev                              # confirms PostCSS no longer errors on @import
```

## Open items (none blocking)

- `SITE_URL` defaults to `https://daimacoffee.com`. If the production domain differs, set `VITE_SITE_URL` in the deploy environment — `robots.txt` and `sitemap.xml` use the literal default and will need updating if the domain changes.
- `SITE_TWITTER = "@daimacoffee"` is a placeholder.
- `Organization` JSON-LD `sameAs: []` is empty — add social profile URLs when available.
- Branches are local; not pushed to origin (per user rules — no autonomous remote ops).
