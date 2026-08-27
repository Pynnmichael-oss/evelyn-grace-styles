import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
// Imported rather than referenced as a raw string — the site builds with
// base: '/evelyn-grace-styles/' for GitHub Pages, and a hardcoded
// root-absolute path silently 404s under that subpath.
//
// This is the fitting-scene photo per this rebuild's audit: found by
// visually opening candidate files, not guessing from filenames.
// evelyn-model-handshake.jpg is the same two people/backdrop but a
// handshake pose; this file is the actual fitting — Evelyn (blonde,
// navy top) adjusting the shoulder strap of the model's black V-neck
// dress, grey studio backdrop. 868x1288 source, full color, ~83KB —
// well under the 300KB flag threshold.
import fittingScene from '../assets/images/evelyn-styling-behind-scenes.jpg'

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
 * replacement for the real dynamic height. No layout shift results
 * either way: this floor is reserved before the iframe exists, not
 * added after.
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
    // background, not a color match to it.
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

// Section 4's three lines. Plain strings (not JSX children), so real
// Unicode apostrophes/em dashes rather than HTML entities — entities
// only resolve inside JSX text, not JS string literals.
const BELIEFS = [
  'Great style isn’t an endless closet. It’s knowing what makes you feel your best.',
  'The pieces you already own should work harder before you buy anything new.',
  'My mood is only ever as good as my outfit — and I think that’s true for most of us.',
]

/**
 * Full structural rebuild: the 50/50 grid, the seated portrait, its
 * "Evelyn Grace" caption, the three labeled sections, and the
 * "Personal style, with intention." headline are all gone — not
 * hidden, not relocated. This is six stacked, centered sections
 * (max-w-[920px] except Section 2's full-bleed image), same two
 * typefaces and same shared components (Header, Footer, Button,
 * Reveal) as the rest of the site.
 *
 * Accessibility conflict, flagged rather than silently resolved either
 * way: this spec asks for `terracotta-deep` (#A8623F) at `text-xs` on
 * two labels (Section 1's "My style is", Section 4's "What I believe"),
 * *and* separately asks — correctly — to fix any contrast failure by
 * increasing size rather than changing color. Measured precisely:
 * terracotta-deep on sand is 4.032:1, which clears WCAG AA's "large
 * text" 3:1 threshold but fails the 4.5:1 threshold that applies to
 * text this small. Large-text status needs either >=24px regular or
 * >=18.66px *bold* — and General Sans is only loaded at weights 400/500
 * site-wide (confirmed in index.html), so "bold" isn't actually
 * available without violating this same spec's "no new weights"
 * constraint. That leaves only the >=24px path: both labels are
 * text-2xl (24px), not text-xs — a real, visible departure from the
 * literal spec, made because it's the smallest size that legitimately
 * satisfies the spec's own stated priority (fix via size, not color).
 *
 * Only the persistent site-wide Header renders here — no MastheadHeader.
 * One nav element on this page, not two.
 */
export default function About() {
  return (
    <div className="bg-sand">
      <Header />
      <main className="pt-20">
        {/* SECTION 1 — lead-in + quote headline. The single largest
            element on the page; nothing else on it competes in scale. */}
        <div className="px-6 sm:px-10 pt-16 lg:pt-36 text-center">
          <div className="max-w-[920px] mx-auto">
            <Reveal>
              <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-6">
                My style is
              </p>
              <h1 className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-balance text-espresso mb-12 lg:mb-24">
                &ldquo;Rooted in juxtaposition — feminine with tomboy,
                polished with unexpected, investment pieces with
                something inexpensive.&rdquo;
              </h1>
            </Reveal>
          </div>
        </div>

        {/* SECTION 2 — full-bleed fitting-scene photo. Flush to both
            viewport edges: deliberately outside any px-6/sm:px-10
            wrapper, and outside the max-w-[920px] every other section
            uses. Full color — no grayscale filter. object-[50%_30%]
            (a static arbitrary-value class, not string-interpolated)
            keeps both faces in frame; the default 50% center crop on a
            portrait-orientation source this tall would land mid-torso. */}
        <div className="w-full h-[300px] md:h-[420px] lg:h-[560px] overflow-hidden">
          <img
            src={fittingScene}
            alt="Evelyn Grace adjusting a client's dress during a styling session"
            loading="lazy"
            className="w-full h-full object-cover object-[50%_30%]"
          />
        </div>

        {/* SECTION 3 — philosophy statement, body copy, signature line. */}
        <div className="px-6 sm:px-10 pt-14 lg:pt-24 text-center">
          <div className="max-w-[920px] mx-auto">
            <Reveal>
              <h2 className="font-serif font-light text-xl lg:text-3xl text-balance text-espresso mb-6">
                I build wardrobes that feel like you, not like a trend.
              </h2>
              <p className="font-sans text-base lg:text-lg leading-relaxed text-espresso max-w-[56ch] mx-auto mb-8">
                I&rsquo;m a personal style consultant with a background in
                luxury fashion retail and client service — work that
                taught me about quality, fit, and just how personal
                getting dressed really is. I work in Phoenix and
                remotely, one on one.
              </p>
              {/* espresso, not taupe — taupe (#B8A99A) on sand fails
                  WCAG AA badly at this size; espresso measures 11.3:1. */}
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-espresso">
                Evelyn Grace — Phoenix, AZ
              </p>
            </Reveal>
          </div>
        </div>

        {/* SECTION 4 — belief lines. Divider sits BETWEEN lines only
            (i > 0 guard) — none above the first, none below the last. */}
        <div className="px-6 sm:px-10 pt-20 lg:pt-36 pb-14 lg:pb-24 text-center">
          <div className="max-w-[920px] mx-auto">
            <Reveal>
              <h2 className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-2">
                What I believe
              </h2>
              {BELIEFS.map((line, i) => (
                <div key={line}>
                  {i > 0 && (
                    <div className="h-px bg-taupe/30 max-w-[30ch] mx-auto" />
                  )}
                  <p className="font-serif font-light text-lg lg:text-2xl text-espresso max-w-[30ch] mx-auto py-7 lg:py-10">
                    {line}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* SECTION 5 — CTA. Same Button/Link/label as every other CTA
            on the site; the only button on this page. */}
        <div className="px-6 sm:px-10 pb-20 lg:pb-32 text-center">
          <Reveal>
            <Button as={Link} to="/services#consultation">
              Book Your Complimentary Consultation
            </Button>
          </Reveal>
        </div>

        {/* SECTION 6 — Follow the Journey / Instagram feed. Untouched:
            identical JSX to the prior revision — same feed ID, bridge
            script, white/terracotta wrapper, same max-w-6xl outer
            container (not the 920px this rebuild uses elsewhere,
            deliberately, since this section is reused exactly as
            audited rather than restyled to match). */}
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
