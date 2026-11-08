# Brand source artwork

`logo-source-original.png` is the logo as supplied — a phone screenshot
(1179x2556, PNG despite the original `.jpeg` filename) with black
letterbox bars above and below a 1179x1179 cream panel.

Everything the site actually renders was derived from it:

| Derived asset | What it is |
| --- | --- |
| `src/assets/images/logo-monogram.png` | EG cipher alone, transparent, inked `#3A2E27` (espresso) |
| `src/assets/images/logo-lockup.png` | Cipher + "EVELYN GRACE STYLES" wordmark, transparent |
| `public/favicon-32.png` | Monogram on a sand tile |
| `public/apple-touch-icon.png` | Monogram on a sand tile, 180x180 |
| `public/og-image.png` | Lockup centered on cream, 1200x630 |

The transparent marks were cut by mapping the source's flat cream
background (`#F6EEE3`) to alpha 0 and the ink to alpha 1, then
re-inking to the espresso token — so edges stay antialiased against
both `bg-sand` and `bg-cream` with no visible patch.

This is a raster source, so the marks don't scale indefinitely: the
monogram is 285x206 native and starts softening much above ~100px
tall. If vector artwork (SVG/AI/EPS) ever turns up, regenerate from
that instead and these PNGs can go.
