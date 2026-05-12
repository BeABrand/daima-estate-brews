// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Netlify, @cloudflare/vite-plugin conflicts with TanStack Start's Node.js preview-server-plugin:
// the Cloudflare adapter outputs dist/server/index.js but the preview plugin expects
// dist/server/server.js, causing a module-not-found crash and 500s during prerender.
// Disabling cloudflare on Netlify switches to the Node.js SSR adapter which outputs the correct
// filename and lets prerender crawl all routes to static HTML that Netlify can serve.
// NETLIFY=true is set automatically by Netlify's build environment.
const isNetlifyBuild = process.env.NETLIFY === "true";

export default defineConfig({
  // Disable Cloudflare Workers adapter on Netlify; use Node.js SSR adapter instead.
  ...(isNetlifyBuild && { cloudflare: false }),
  tanstackStart: {
    server: { entry: "server" },
    // Prerender only on Netlify: crawl all routes to static HTML at build time.
    // Not needed locally (miniflare SSR serves dev) or on Cloudflare Pages (Worker SSR serves prod).
    ...(isNetlifyBuild && {
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
  },
});
