# LayerLogic diagrams — for decks & presentations

Standalone, self-contained versions of the schematics used in §02 Mechanism
and §03 The Science on the marketing site. All animations have been removed
so they render as clean static frames suitable for slides, one-pagers, and
investor decks.

## Files

| Diagram | Dark variant | Light variant |
| --- | --- | --- |
| Step 01 · Capture | `step-01-capture-dark.svg` / `.png` | `step-01-capture-light.svg` / `.png` |
| Step 02 · Transduce | `step-02-transduce-dark.svg` / `.png` | `step-02-transduce-light.svg` / `.png` |
| Step 03 · Read | `step-03-read-dark.svg` / `.png` | `step-03-read-light.svg` / `.png` |
| FIG. A · gFET cross-section | `gfet-cross-section-dark.svg` / `.png` | `gfet-cross-section-light.svg` / `.png` |

- Steps 01–03: PNG = 2400 × 1200 px
- gFET cross-section: PNG = 3200 × 2400 px
- SVGs scale to any size with no quality loss

Pick the **dark** variant for slides with a dark background, **light** for
slides with a cream/white background.

## How to use

### PowerPoint (2019 and newer), Keynote, Figma, Adobe (Illustrator / InDesign / Photoshop)
Drag the `.svg` straight onto a slide / canvas. Native vector — scales
cleanly, stays sharp at any size, you can recolor strokes/fills via the
shape tools.

### Google Slides
Slides doesn't import SVG directly. Use the `.png` instead — drag and drop
or `Insert → Image → Upload from computer`.

### Older PowerPoint (≤ 2016)
Use the `.png` — same drag-and-drop flow.

### Recolor / brand fit
If you need a different palette than the dark/light pairs:
1. Open the `.svg` in Figma or Illustrator
2. Bulk-select strokes and fills (the teal accent is `#06B6A7` dark / `#047A70` light)
3. Replace with your slide's accent color

## Animated GIFs

If you need motion (analyte falling, scan line, waveform draw, electron flow,
receptor pulse, etc.), the same diagrams are available as looping GIFs in
**`motion/`**:

| Diagram | Dark | Light |
| --- | --- | --- |
| Step 01 · Capture | `motion/step-01-capture-dark.gif` | `motion/step-01-capture-light.gif` |
| Step 02 · Transduce | `motion/step-02-transduce-dark.gif` | `motion/step-02-transduce-light.gif` |
| Step 03 · Read | `motion/step-03-read-dark.gif` | `motion/step-03-read-light.gif` |
| FIG. A · gFET cross-section | `motion/gfet-cross-section-dark.gif` | `motion/gfet-cross-section-light.gif` |

- 5-second seamless loops at 20 fps
- 1200×600 (steps) / 1280×960 (gFET), palette-optimized for small file size
- Native support in PowerPoint, Keynote, Google Slides, Figma — just drag and drop

Regenerate everything with:

```bash
pnpm diagrams:gifs
```

(Requires `ffmpeg` and the Playwright Chromium browser, both installed in
this repo already.)

## Re-generating the PNGs

If you edit an SVG and want a fresh PNG:

```bash
cd public/assets/diagrams
rsvg-convert -w 2400 -o step-01-capture-dark.png step-01-capture-dark.svg
# adjust -w (width in pixels) for higher / lower resolution
```

`rsvg-convert` is available via Homebrew: `brew install librsvg`.
