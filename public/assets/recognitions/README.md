# Recognition logos

Drop logo files here using the exact names referenced in `src/lib/site.ts`.
SVG is preferred; PNG with transparency also works.

- `masschallenge.png` — present (baked white bg keyed to transparent)
- `forbes-30u30.png` — present (white-on-black; uses `.logo-avatar`)
- `eit-food.png` — present
- `sio-grafen.png` — present
- `formas.png` — present

Logos use the `.logo-mark` cream-plate treatment (see `global.css`) so they
read in both the light and dark themes. Until a file exists for a tile, the
grid renders the name as a wordmark fallback (handled in `Investors.astro`).
