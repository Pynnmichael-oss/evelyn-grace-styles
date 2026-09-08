import Nav from '../components/Nav'
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
//
// The width leg (mobile: 120vw, desktop: 100vh) is the one real lever
// against how much of the source gets cropped, and it is intentionally
// device-height-independent on mobile now — it used to be 75vh, which
// tied crop severity to whatever height the *phone* happens to have
// rather than to the width being filled. Because object-cover applies
// before the rotate, this leg maps to the FINAL width (not height) of
// the visible image, and container/source aspect mismatch is what
// decides how much of the source's vertical extent (where both faces
// sit) survives — see Hero.jsx's git history for the full derivation.
// 75vh forced a ~915px-tall scaled source into a ~410px-tall box, i.e.
// only the center ~44% of each photo's vertical extent survived,
// cropping both faces out entirely. 120vw brings that down to a ~915
// vs ~730px mismatch — about 60% of the source's vertical extent
// visible — while staying fully decoupled from device height, so the
// crop is the same at a given width on every phone. object-position is
// then used per-image (below) to choose *which* 60% survives, since
// the two photos don't frame their subjects at the same height.
const rotatedFillImageClassName =
  'absolute top-1/2 left-1/2 h-[calc(100vw+32px)] w-[120vw] md:w-[100vh] max-w-none max-h-none -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover'

/**
 * Home's entire page body: two full-bleed, rotated photos bookending
 * Nav. Nothing else — no intro copy, no CTA. Nav renders here with its
 * default className (no border, py-5/md:py-6) — the exact styling this
 * strip has always had; interior pages pass their own override for the
 * header-like treatment instead. Both images sit flush at the top/
 * bottom edges of the page.
 */
export default function Hero() {
  return (
    <section id="home">
      <div className="relative w-full h-[120vw] md:h-screen overflow-hidden">
        {/* Both faces sit in the top ~26% of the source (the rest is
            arms/dress/legs), so object-top anchors the visible band to
            the top of the frame instead of the default center — at
            mobile's ~60%-of-source-height visible band that comfortably
            keeps both faces and the v-neck in frame. Inert at md+,
            where the container is tall enough that ~100% of the
            source's vertical extent already survives regardless of
            position. */}
        <img
          src={heroPhoto1}
          alt="Evelyn Allen adjusting a black v-neck dress on a client during a styling session"
          className={`${rotatedFillImageClassName} object-top`}
        />

        {/* Wash layer, between the photo and the text: flattens the
            photo's own tone toward sand before the text-contrast math
            runs, so the two photos (originally quite different in
            average tone) read as one consistent surface for the
            wordmark to sit on. No z-index of its own needed — it's
            simply painted after the <img> (no z-index on that either)
            and before the z-20 text below, so normal DOM paint order
            already puts it above the photo and below the text. */}
        <div className="absolute inset-0 bg-sand/45" />

        {/* Brand overlay, not aria-hidden — this is the page's primary
            mark now that Nav's wordmark is suppressed on Home (see
            hideWordmark below), so it stays in the a11y tree as real
            text. Fraunces-italic classes reused verbatim from About's
            confirmed quote treatment (About.jsx's h1) — font-serif
            italic untouched; font-medium here replaces the old
            font-light for more presence now that the wash lightens
            what's behind it. z-20 (up from z-10) keeps it above the
            new wash layer.
            Color/opacity recalculated against the photo+wash composite,
            not the raw photo — see scripts/sample-hero-colors.py: the
            sand/45 wash lightens both photos enough that espresso now
            beats cream (4.60:1 vs 2.69:1 here), reversing the pre-wash
            choice. Full opacity, not a partial one: diluting dark
            espresso toward this now-light composite costs real
            contrast fast (~0.3-0.35:1 per 5%), so the minimal opacity
            that clears the margined 3.3:1 target (80% here) leaves
            almost no slack, while full opacity costs nothing visually
            — the wash alone already supplies the "faded into the
            photo" softness — and buys a real margin (4.60:1, clearing
            even the stricter 4.5:1 normal-text threshold). Flat color
            only — no shadow/blur/gradient per the locked design
            system. */}
        <p className="absolute inset-0 z-20 flex items-center justify-center text-center font-serif italic font-medium text-3xl md:text-5xl text-balance text-espresso">
          Evelyn Grace Styles
        </p>
      </div>

      <Nav hideWordmark />

      <div className="relative w-full h-[120vw] md:h-screen overflow-hidden">
        {/* Already black-and-white in the source file — no grayscale
            filter applied on top. Face and bag sit roughly 30%-82% down
            this source (not top-weighted like photo 1), so this crop is
            centered lower than default — 56% down rather than 50% —
            just enough to pull the full bag into frame instead of
            clipping its base off the bottom, without pushing the face
            out the top. */}
        <img
          src={heroPhoto2}
          alt="Close-up of a woven metallic bag worn on the shoulder, styled with a black dress"
          className={`${rotatedFillImageClassName} object-[50%_56%]`}
        />

        {/* Same wash treatment as photo 1's above. */}
        <div className="absolute inset-0 bg-sand/45" />

        {/* Same treatment as photo 1's overlay above, sampled
            independently against this photo's own post-wash composite
            (avg #474747 raw, composite #95928E — slightly darker than
            photo 1's composite) rather than reusing photo 1's numbers:
            espresso still wins here too (4.24:1 vs 2.93:1 for cream at
            full opacity), and full opacity is used for the same reason
            — the minimal opacity clearing the margined 3.3:1 here is
            85%, leaving little slack, while full opacity clears with
            real margin. */}
        <p className="absolute inset-0 z-20 flex items-center justify-center text-center font-serif italic font-medium text-3xl md:text-5xl text-balance text-espresso">
          Evelyn Grace Styles
        </p>
      </div>
    </section>
  )
}
