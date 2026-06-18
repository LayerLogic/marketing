# Partner / investor logos

Drop logo files here using the exact names referenced in `src/lib/site.ts`.
SVG is preferred; PNG with transparency also works.

- `chalmers-ventures.png` — present
- `scientifica.svg` — present (positive / dark-on-transparent variant)
- `eit-food.png` — present
- `yeos-ventures.png` — present (dark avatar; uses the `.logo-avatar` treatment)
- `xy-invest.png` — present (typographic wordmark, SF/Avenir style)
- `business-angels.svg` — needed

Most logos are dark-on-transparent artwork. The `.logo-mark` class
(`global.css`) sits them on a fixed cream plate so they read in both the
light and dark themes — invisible against the cream tile in light mode.
Dark-background avatars (like Yeos) keep their own backdrop via a
`logoClass: "logo-avatar"` override on the entry in `site.ts`.

Until a file exists for a given tile, the grid renders the name as a
wordmark fallback (handled in `Investors.astro`).
