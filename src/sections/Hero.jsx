import InlineNavStrip from '../components/InlineNavStrip'
// Imported (not referenced as a raw "/hero-photo-1.jpg" string) so Vite
// resolves them through its asset pipeline — the site is built with
// base: '/evelyn-grace-styles/' for GitHub Pages, and a hardcoded
// root-absolute path silently 404s under that subpath in both dev and
// production.
import heroPhoto1 from '../assets/images/hero-photo-1.jpg'
import heroPhoto2 from '../assets/images/hero-photo-2.jpg'

// Both hero photos are portrait source files (853x1280) rotated 90°
// via CSS to read as the sideways/landscape composition in the
// reference mockup. The rotation is applied purely with a transform —
// never pre-rotated and flattened into the file — so the source stays
// reusable elsewhere and alt text stays attached to the real image.
//
// Rotating an element doesn't swap its own layout box, only its visual
// footprint, so naively rotating a w-full/h-full img would leave huge
// gaps top/bottom (or overflow) once its wide-short box gets flipped to
// tall-narrow. The fix: size the *pre-rotation* img box with width and
// height already swapped relative to the container (width = container
// height, height = container width), object-fit: cover to crop the
// portrait source into that swapped box without distorting it, then
// rotate — the visual result exactly fills the container edge-to-edge
// at any viewport width. object-cover has no aspect-ratio "faithful"
// requirement to preserve here since the source is being deliberately
// reframed sideways, not shown at its native orientation.
//
// The height leg of the swap uses 100vw + a fixed buffer rather than a
// bare 100vw: vw is defined against the full viewport including the
// scrollbar gutter, while the container (plain width: 100%) excludes
// it, so on any browser/OS with a classic (non-overlay) scrollbar a
// bare 100vw undershoots the container's real width and leaves a thin
// gap down one side after rotation — confirmed via measurement (a
// ~15px shortfall) rather than assumed. The extra buffer is cropped
// off by object-cover + the container's overflow-hidden, which is
// imperceptible against the actual photo.
const rotatedFillImageClassName =
  'absolute top-1/2 left-1/2 h-[calc(100vw+32px)] w-[75vh] md:w-[100vh] max-w-none max-h-none -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover'

/**
 * Home's entire page body: two full-bleed, rotated photos bookending
 * InlineNavStrip. Nothing else — no intro copy, no CTA, no persistent
 * Header (Home suppresses it entirely; see Home.jsx and
 * InlineNavStrip.jsx, which carries all of Home's navigation instead).
 * Both images sit flush at the top/bottom edges of the page.
 */
export default function Hero() {
  return (
    <section id="home">
      <div className="relative w-full h-[75vh] md:h-screen overflow-hidden">
        <img
          src={heroPhoto1}
          alt="Evelyn Allen adjusting a black v-neck dress on a client during a styling session"
          className={rotatedFillImageClassName}
        />
      </div>

      <InlineNavStrip />

      <div className="relative w-full h-[75vh] md:h-screen overflow-hidden">
        {/* Already black-and-white in the source file — no grayscale
            filter applied on top. */}
        <img
          src={heroPhoto2}
          alt="Close-up of a woven metallic bag worn on the shoulder, styled with a black dress"
          className={rotatedFillImageClassName}
        />
      </div>
    </section>
  )
}
