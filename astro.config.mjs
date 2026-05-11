import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Configured for static deployment to GitHub Pages at
//   https://<username>.github.io/marketing-beta/
//
// When you move back to Vercel (so the contact-form API can run server-side):
//   1. Reinstate `output: "server"` and add the Vercel adapter:
//        import vercel from "@astrojs/vercel";
//        ...
//        output: "server",
//        adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
//   2. Move src/_disabled/api-lead.ts back to src/pages/api/lead.ts
//   3. Remove the `base` config below (Vercel serves at the apex)
//   4. Restore the original DemoForm fetch (see comment in the component)

// https://astro.build/config
export default defineConfig({
  site: "https://layerlogic.se",
  base: "/marketing-beta",
  output: "static",
  trailingSlash: "always",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
