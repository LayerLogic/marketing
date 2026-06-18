# LayerLogic — Marketing site

Astro 5 + Tailwind v4 + React islands. Currently configured for static
deployment to **GitHub Pages** as a demo. Set up to switch back to Vercel
(for the server-side lead-capture API) by following the notes in
`astro.config.mjs`.

## Stack

- **Astro 5** (static output, served at the apex `layerlogic.se`)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React 18** islands for interactive bits (`@astrojs/react`)
- **Framer Motion**, **GSAP + ScrollTrigger**, **Lenis**, **React Three Fiber** for motion
- **Fontsource** self-hosted Inter Tight + JetBrains Mono
- **lucide-react** icons (when needed)
- **Resend** for lead email
- **Zod** for request validation

## Local dev

Requires Node ≥ 18.20.8 / 20.3 / 22. The system Node here is 16; use the
modern Node from Homebrew or nvm.

```bash
# from this directory
PATH="$HOME/.nvm/versions/node/v22.21.1/bin:$PATH" pnpm install
PATH="$HOME/.nvm/versions/node/v22.21.1/bin:$PATH" pnpm dev
```

Open http://localhost:4321.

## Environment

Copy `.env.example` to `.env` and fill:

```
RESEND_API_KEY=re_...
LEAD_FROM_EMAIL=hello@layerlogic.se   # must be on a verified Resend domain
LEAD_TO_EMAIL=hello@layerlogic.se     # destination inbox
```

## Project layout

```
src/
  layouts/Base.astro            # head, OG, JSON-LD, smooth scroll wrapper
  pages/
    index.astro                 # composes section components
    api/lead.ts                 # POST /api/lead — Resend + Zod
  components/
    astro/                      # static markup (Header, Hero, ...)
    react/                      # interactive islands
      HeroLattice3D.tsx         # WebGL graphene lattice (R3F)
      SmoothScroll.tsx          # Lenis + GSAP ticker
      SciencePin.tsx            # GSAP ScrollTrigger pin for §04
      ScrollReveal.tsx          # IntersectionObserver fade-up
      StatCounter.tsx           # count-up on view
      HeroTicker.tsx            # ΔV_g live ticker
      ThemeToggle.tsx           # dark/light, persisted
      DemoForm.tsx              # /api/lead client
  styles/global.css             # Tailwind v4 entry + design tokens
  lib/
    site.ts                     # nav, copy, founders, investors
    utils.ts                    # cn() helper

design-reference/               # decoded source HTML + assets (do not edit)
```

## Build

```bash
pnpm build
pnpm preview
```

## Deploy — GitHub Pages (current setup)

The site is served at the custom apex domain `https://layerlogic.se`
(via `public/CNAME`).

First-time setup (already done for this repo):

```bash
git init
git add .
git commit -m "feat: marketing site"
git branch -M main
git remote add origin https://github.com/LayerLogic/marketing-beta.git
git push -u origin main
```

2. On GitHub: **Settings → Pages → Source = "GitHub Actions"**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically. The Pages URL shows on the Action run when it succeeds.

Subsequent deploys: every push to `main` triggers the workflow.

### Notes on the static build

- The contact form's POST handler can't run on Pages (no server). It's been
  stubbed to show a "Received" confirmation locally so the demo flow looks
  clean — no email is actually sent.
- The original API handler is preserved at `src/_disabled/api-lead.ts` for
  when the site moves back to a server host.
- The site serves at the apex (no `base` sub-path). The custom domain is
  claimed by `public/CNAME` (`layerlogic.se`); point the domain's DNS at
  GitHub Pages and enable the custom domain under **Settings → Pages**.

## Deploy — Vercel (future, with working form)

When you want the lead form working again:

1. Restore `src/pages/api/lead.ts` from `src/_disabled/api-lead.ts`
2. Edit `astro.config.mjs` to use the Vercel adapter (notes inline)
3. Restore the real `fetch('/api/lead', ...)` call in
   `src/components/react/DemoForm.tsx` (also commented inline)
4. Then:

```bash
vercel link
vercel env add RESEND_API_KEY
vercel env add LEAD_FROM_EMAIL
vercel env add LEAD_TO_EMAIL
vercel deploy
```
