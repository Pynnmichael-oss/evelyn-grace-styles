import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
// Imported rather than referenced as a raw "/about-portrait.jpg" string —
// the site builds with base: '/evelyn-grace-styles/' for GitHub Pages,
// and a hardcoded root-absolute path silently 404s under that subpath.
//
// Pose check: the alternate frame on file (photo_20260813_144830.jpg) was
// compared pixel-by-pixel against this one — both are the same seated,
// over-the-shoulder pose from the same burst, so there's no pose
// difference to flag. 144824 (used here) is also the technically cleaner
// file: it's a true, fully desaturated grayscale conversion, while
// 144830 retains a faint color cast (a yellow-green tint bleeding
// through from nail polish), so it's the correct pick on both counts.
import aboutPortrait from '../assets/images/about-portrait.jpg'

// Mirror App Instagram feed embed for "Follow the Journey". Evelyn's
// account: https://www.instagram.com/evelyn123allen/
const MIRROR_BRIDGE_SRC =
  'https://cdn.jsdelivr.net/npm/@mirrorapp/iframe-bridge@latest/dist/index.umd.js'
const MIRROR_FEED_SRC =
  'https://app.mirror-app.com/feed-instagram/444f6370-e2f3-45ff-80ec-ad8ca1a4d69e/preview'

/**
 * Instagram feed embed via Mirror App. The tricky part is sequencing:
 * the raw snippet is `<iframe onload="iFrameSetup(this)">` next to a
 * `<script src=".../iframe-bridge@latest/...">` that defines
 * `iFrameSetup` on `window` — loaded as plain HTML, the browser
 * guarantees the script runs before a later element's onload can fire,
 * but React doesn't execute `<script>` tags it renders (JSX or
 * dangerouslySetInnerHTML), so that ordering has to be rebuilt by hand.
 *
 * This loads the bridge script itself via a manually-created <script>
 * appended to <head> (async, so it never blocks initial page render —
 * see the earlier performance note) and only renders the <iframe> once
 * that script's own `load` event has fired. That makes the race
 * impossible by construction: `iFrameSetup` is guaranteed to exist
 * before the iframe can mount, so before it can ever fire its onLoad.
 * A `cancelled` flag guards against setting state after unmount, and a
 * `document.querySelector` check avoids double-inserting the script tag
 * under StrictMode's dev-only double effect invocation.
 *
 * The snippet ships with no fixed iframe height — Mirror's bridge script
 * is expected to auto-resize it via a postMessage handshake once
 * mounted. min-h-[480px] on the wrapper is only a fallback for the
 * window between "script loaded" and "bridge has actually resized the
 * iframe" (or a graceful floor if the resize never happens), not a
 * replacement for the real dynamic height.
 */
function InstagramFeed() {
  const [bridgeReady, setBridgeReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const markReady = () => {
      if (!cancelled) setBridgeReady(true)
    }

    const existing = document.querySelector(`script[src="${MIRROR_BRIDGE_SRC}"]`)
    if (existing) {
      // Already loaded (or loading) — e.g. a fast StrictMode re-run.
      if (window.iFrameSetup) {
        markReady()
      } else {
        existing.addEventListener('load', markReady, { once: true })
      }
    } else {
      const script = document.createElement('script')
      script.src = MIRROR_BRIDGE_SRC
      script.async = true
      script.onload = markReady
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
    }
  }, [])

  return (
    // The iframe's internal background is pure white and can't be
    // restyled from here (cross-origin), so the padding is white too
    // (bg-white, not the page's cream) — padding and iframe now read as
    // one continuous white surface with no seam between them. The
    // terracotta border is what separates this card from the page's
    // cream background, not a color match to it — and per this spec,
    // this white card is now the ONE place on the page that keeps a
    // border at all (the portrait's own frame was retired). Padding is
    // 16px/24px (p-4/md:p-6), inside the spec'd 16-24px comfortable
    // range at every breakpoint.
    //
    // TODO: check Mirror App's widget editor for a background
    // color/transparency setting — if available, set it to #FFFFFF (or
    // transparent) there directly instead of relying on this wrapper.
    <div className="bg-white border border-terracotta p-4 md:p-6">
      <div className="min-h-[480px] flex items-center justify-center">
        {bridgeReady ? (
          <iframe
            title="Evelyn Grace Styles Instagram feed"
            src={MIRROR_FEED_SRC}
            scrolling="no"
            style={{ width: '100%', border: 'none', overflow: 'hidden' }}
            onLoad={(e) => window.iFrameSetup?.(e.currentTarget)}
          />
        ) : (
          <p className="font-sans text-espresso/60 text-sm">Loading feed…</p>
        )}
      </div>
    </div>
  )
}

/**
 * Beat 3's two-column labeled block: "( LABEL )" set in General Sans
 * (not Fraunces — this deliberately combines the SITE's bracket
 * convention with the previous SectionLabel's font/tracking/color
 * treatment), with the hairline BENEATH the label rather than above
 * it like the retired SectionLabel this replaces.
 *
 * Color/size note: neither the `terracotta` token (2.8:1 on sand) nor
 * `terracotta-deep` (4.03:1) clears WCAG AA's 4.5:1 small-text
 * threshold — checked against sand #F4EDE4. This spec's own fallback
 * ("if borderline, use terracotta-deep") doesn't hold: terracotta-deep
 * isn't borderline, it fails outright, so switching to it would be a
 * regression. Kept the same one-off darker tint (#8F5336, ~5.2:1)
 * verified earlier. Bumped text-[13px] -> text-sm (14px) to satisfy
 * this spec's explicit "at least 14px equivalent."
 */
function LabeledBlock({ label, children }) {
  return (
    <div>
      <p className="font-sans font-medium text-sm uppercase tracking-[0.14em] text-[#8F5336] mb-5">
        {label}
      </p>
      <div className="border-t border-espresso/15 mb-6" />
      <p className="font-sans text-espresso text-xl leading-loose">
        {children}
      </p>
    </div>
  )
}

/**
 * Five-beat restructure (content reduction, not a redesign — same
 * tokens, same shared components throughout):
 *
 * 1. Headline + portrait, true CSS Grid 50/50 (grid-template-columns:
 *    1fr 1fr via `md:grid-cols-[1fr_1fr]`, not flex — no wrap-collapse
 *    failure mode exists here at all). `items-center` is new: the left
 *    column dropped from three labeled sections to one paragraph, so
 *    it's now much shorter than the portrait: centering it against the
 *    portrait's height (rather than the previous default top-aligned
 *    stretch) is what keeps this beat feeling intentional instead of
 *    top-heavy on one side.
 * 2. Full-width pull quote on its own `bg-cream` band — this is the
 *    one place on the page that isn't `bg-sand`, and it's a full-bleed
 *    sibling `<div>` (not nested in beat 1's max-w-6xl container) for
 *    exactly that reason: the cream has to run edge to edge.
 * 3. Two labeled blocks (LabeledBlock, above), replacing the three
 *    SectionLabel sections beat 1 used to carry. "My approach" isn't
 *    relocated here — its one memorable line survives as beat 2's pull
 *    quote, the rest of that paragraph is genuinely cut.
 * 4. The CTA, unchanged internally (same Button, same Link, same
 *    label) — only its wrapper changed, from a margin-based offset
 *    inside the old shared container to its own beat-spaced section,
 *    consistent with the rest of this page now.
 * 5. The Instagram section — untouched, byte-for-byte the same JSX as
 *    before, just re-parented as the next sibling after beat 4 instead
 *    of a child of the old shared wrapper. Its own `mt-24 md:mt-32`
 *    top margin plus `border-t border-taupe/30` still do their job
 *    identically as a sibling in normal flow.
 *
 * Beat spacing (2, 3, 4) is `py-20 lg:py-32` per this pass's spec — a
 * deliberate switch from the rest of the page's `md:` (768px) prefix
 * to `lg:` (1024px) for this specific inter-beat rhythm. Beat 1 keeps
 * that same py-20/lg:py-32 pattern too, since nothing in the spec
 * exempted it and it reads as "beat 0" in the same rhythm as 2-4.
 *
 * Only the persistent site-wide Header renders here — no MastheadHeader.
 * One nav element on this page, not two.
 */
export default function About() {
  return (
    <div className="bg-sand">
      <Header />
      <main className="pt-20">
        {/* BEAT 1 — headline + portrait */}
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-20 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-y-16 md:gap-x-16 items-center">
            {/* Portrait only — no caption. The "Evelyn Grace" signature
                line (and its own mt-8 top margin) that used to sit
                beneath it is removed entirely per this pass, not just
                hidden — this div now wraps nothing but the <img>, so
                there's no leftover empty space where the caption was.
                Static (no sticky/scroll-pinned behavior anywhere on
                this page), borderless: no frame, no padding-mat, no
                rotation, no shadow — sits clean directly against the
                page background. max-w-sm sm:max-w-md caps it on mobile
                where it's stacked above the copy full-width;
                md:max-w-none removes that cap entirely at the 50%
                column width so it fills its half of the page. */}
            <Reveal className="order-1 md:order-2">
              <div className="max-w-sm sm:max-w-md md:max-w-none mx-auto md:mx-0">
                <img
                  src={aboutPortrait}
                  alt="Evelyn Grace, personal style consultant, seated black-and-white portrait"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </Reveal>

            {/* Copy — kicker, headline, and the single opening
                paragraph. The three labeled sections that used to live
                here are gone: two moved to Beat 3, one distilled into
                Beat 2's pull quote. */}
            <div className="order-2 md:order-1">
              <Reveal>
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-espresso mb-5">
                  {'( About Evelyn )'}
                </p>
                <h1 className="font-serif font-light text-5xl md:text-7xl text-espresso mb-10">
                  Personal style, with intention.
                </h1>
              </Reveal>

              <Reveal delay={100}>
                <p className="font-sans text-espresso text-2xl leading-relaxed">
                  Thoughtful styling for women who want to feel confident,
                  polished, and completely themselves in what they wear.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* BEAT 2 — full-width pull quote, cream band. Deliberately
            mostly whitespace: one hairline, one line of type, nothing
            else. */}
        <div className="bg-cream">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 py-24 lg:py-40 text-center">
            <Reveal>
              {/* "max-w-24" per spec named a width, not a max-width, so
                  this is a fixed w-24 (96px) — a max-width alone
                  wouldn't render a visible line without a base width. */}
              <div className="w-24 mx-auto border-t border-terracotta mb-10" />
              <p className="font-serif italic text-3xl lg:text-5xl text-espresso">
                &ldquo;Contrast makes an outfit interesting.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>

        {/* BEAT 3 — two labeled blocks, side by side */}
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-20 lg:py-32">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <LabeledBlock label={'( Where it started )'}>
                My background is in luxury fashion retail and client
                service — work that taught me just how personal getting
                dressed really is. Clothes have been a lifelong love: my
                mood is only ever as good as my outfit.
              </LabeledBlock>

              <LabeledBlock label={'( How we’ll work together )'}>
                I work with clients in Phoenix and remotely, one on one,
                to build outfits that feel polished, versatile, and true
                to you. Great style isn&rsquo;t an endless closet —
                it&rsquo;s making what you already own work harder, and
                adding only what earns its place.
              </LabeledBlock>
            </div>
          </Reveal>
        </div>

        {/* BEAT 4 — CTA. Same Button/Link/label as always; only the
            wrapper (now its own beat-spaced section rather than a
            margin offset inside the old shared container) changed. */}
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-20 lg:py-32 text-center">
          <Reveal>
            <Button as={Link} to="/services#consultation">
              Book Your Complimentary Consultation
            </Button>
          </Reveal>
        </div>

        {/* BEAT 5 — Follow the Journey / Instagram feed. The Reveal
            below is untouched — identical className to before this
            pass (same taupe top hairline, same mt-24/md:mt-32 +
            pt-16/md:pt-20), just re-parented as the next sibling after
            Beat 4 instead of a child of the old shared max-w-6xl
            wrapper. pb-20 lg:pb-32 lives on this new outer wrapper
            instead, standing in for the bottom padding the old single
            shared container used to provide for the whole page. */}
        <div className="mx-auto max-w-6xl px-6 sm:px-10 pb-20 lg:pb-32">
          <Reveal className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-taupe/30 text-center">
            <h2 className="font-serif text-sm uppercase tracking-[0.18em] text-espresso mb-10">
              {'( Follow the Journey )'}
            </h2>

            <div className="max-w-2xl mx-auto">
              <InstagramFeed />
            </div>

            <a
              href="https://www.instagram.com/evelyn123allen/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
            >
              @evelyn123allen on Instagram
            </a>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
