import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Static deployment served at the apex domain https://layerlogic.se
// (AWS S3 + CloudFront; Route 53 alias records point the domain at the
// distribution — see .github/workflows/deploy.yml for the publish pipeline).
//
// When you move back to Vercel (so the contact-form API can run server-side):
//   1. Reinstate `output: "server"` and add the Vercel adapter:
//        import vercel from "@astrojs/vercel";
//        ...
//        output: "server",
//        adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
//   2. Move src/_disabled/api-lead.ts back to src/pages/api/lead.ts
//   3. Restore the original DemoForm fetch (see comment in the component)

// https://astro.build/config
export default defineConfig({
  site: "https://layerlogic.se",
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
