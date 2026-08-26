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
    // Framed like the About portrait (cream mat + thin terracotta
    // border) so the iframe's white internal background reads as a
    // deliberate card/print rather than a clash against the page's
    // cream/sand tones — the iframe is cross-origin, so we can't
    // restyle its background directly. Padding is >=24px on every side
    // at every breakpoint (p-6 = 24px, md:p-8 = 32px). No rotation/tilt
    // here unlike the portrait frame: this holds a live, interactive
    // widget (a real "Follow" button, real links), and skewing that
    // would read as broken rather than informal.
    //
    // TODO: check Mirror App's widget editor for a background
    // color/transparency setting — if available, set it to #F4EDE4 to
    // match the page instead of relying on this frame workaround.
    <div className="bg-cream border border-terracotta p-6 md:p-8">
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
 * Labeled section: a small tracked kicker sitting just above its
 * paragraph(s), separated from the section before it by a thin espresso
 * hairline. Repeated three times down the left column — this rhythm,
 * not one dense paragraph block, is what gives the page its
 * "conversational beats" feel.
 *
 * Spacing audit: the gap from one section's end to the
 * next kicker is `mt-16` + `pt-8` = 64px + 32px = 96px on mobile,
 * `md:mt-20` + `md:pt-10` = 80px + 40px = 120px on desktop — both
 * static, complete class names (no template-literal/dynamic class
 * construction, so no Tailwind JIT purge risk), confirmed via
 * getComputedStyle against the built page, not just presence in
 * source. Both clear the requested 48px/space-y-12 floor with real
 * margin, not a marginal bump — this was previously mt-12/pt-8
 * (80px) and md:mt-16/md:pt-10 (104px), a change small enough to
 * read as "did nothing."
 *
 * Color note: neither the `terracotta` token (2.8:1 on sand) nor
 * `terracotta-deep` (4.03:1) clears WCAG AA's 4.5:1 small-text
 * threshold — checked against sand #F4EDE4 — so the kicker uses a
 * one-off darker tint (#8F5336, ~5.2:1) scoped to this label only. The
 * locked `terracotta`/`terracotta-deep` tokens are untouched everywhere
 * else on the site.
 */
function SectionLabel({ label, children }) {
  return (
    <div className="mt-16 pt-8 md:mt-20 md:pt-10 border-t border-espresso/15">
      <p className="font-sans font-medium text-[13px] uppercase tracking-[0.14em] text-[#8F5336] mb-4">
        {label}
      </p>
      <div className="font-sans text-espresso text-xl leading-loose space-y-4">
        {children}
      </div>
    </div>
  )
}

/**
 * Asymmetric two-column layout: left column (7/12 ≈ 58%) carries all the
 * copy, right column (5/12 ≈ 42%) carries the framed, slightly rotated
 * portrait with the signature centered beneath it. `order-*` flips the
 * stacking on mobile — portrait and signature first, then copy — while
 * keeping the same source order (and therefore the same DOM/reading
 * order for screen readers) as the desktop layout implies.
 *
 * Only the persistent site-wide Header renders here — no MastheadHeader.
 * One nav element on this page, not two.
 */
export default function About() {
  return (
    <div className="bg-sand">
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-16">
            {/* Portrait + signature — sticky on desktop so it stays in
                view while the (much longer) text column scrolls past.
                The grid item is a plain, non-animated div so it can
                stretch to the full row height (default grid
                align-items: stretch) and act as the sticky containing
                block; that stretch is what gives the sticky child room
                to "travel" and is also what makes it release cleanly
                the instant the text column ends, rather than pinning
                for the rest of the page. Reveal — whose fade-in leaves
                a permanent (if visually 0) `transform: translate(...)`
                on its own div even at rest — is deliberately the sticky
                element itself rather than an ancestor of one: a
                transformed ancestor is a well-documented way to
                silently break position: sticky on a descendant, so
                sticky lives on the same node as the transform instead.
                md:top-[104px] = Header's fixed 80px height + 24px
                clearance, so the pinned portrait never sits underneath
                the nav bar. */}
            <div className="order-1 md:order-2 md:col-span-5">
              <Reveal className="max-w-xs sm:max-w-sm md:max-w-none mx-auto md:mx-0 md:sticky md:top-[104px]">
                <div className="inline-block bg-cream border border-terracotta p-3 sm:p-4 -rotate-1 shadow-md">
                  <img
                    src={aboutPortrait}
                    alt="Black-and-white portrait of Evelyn, seated and glancing back over her shoulder mid-laugh, wearing a black sweater and skirt against a softly textured backdrop"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>

                {/* TODO: replace with Evelyn's actual handwritten "Evelyn
                    Grace" signature graphic once the client provides a
                    standalone image/SVG asset. Checked the project's
                    uploaded reference mockups (the Home-page hero
                    template) and the rest of the repo/filesystem for one
                    — none exists yet. Per spec, this is deliberately set
                    in Fraunces italic rather than a script/cursive font
                    standing in for a real signature. */}
                <p className="mt-6 text-center font-serif italic text-3xl md:text-4xl text-espresso">
                  Evelyn Grace
                </p>
              </Reveal>
            </div>

            {/* Copy */}
            <div className="order-2 md:order-1 md:col-span-7">
              <Reveal>
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-espresso mb-5">
                  {'( About Evelyn )'}
                </p>
                <h1 className="font-serif font-light text-5xl md:text-7xl text-espresso mb-10">
                  Personal style, with intention.
                </h1>
              </Reveal>

              {/* Opening statement — the page's thesis, no label, sized
                  between the headline and the labeled-section body copy
                  below it (text-2xl vs. the section body's text-xl) so
                  it reads as a lead-in with more weight than a regular
                  paragraph, not just another beat. */}
              <Reveal delay={100}>
                <p className="font-sans text-espresso text-2xl leading-relaxed mb-6 md:mb-8">
                  Thoughtful styling for women who want to feel confident,
                  polished, and completely themselves in what they wear.
                </p>
                <p className="font-sans text-espresso text-2xl leading-relaxed mb-6 md:mb-8">
                  I believe getting dressed should feel effortless — not
                  because you have more clothes, but because you have the
                  right pieces, know how to wear them, and understand
                  what truly feels like you.
                </p>
                <p className="font-sans text-espresso text-2xl leading-relaxed">
                  Whether we&rsquo;re working with pieces already in your
                  wardrobe or thoughtfully introducing something new,
                  every recommendation is personal, intentional, and
                  designed around the way you actually live.
                </p>
              </Reveal>

              {/* Three short beats, not five paragraph-length ones — cut
                  down from the original bio rather than just relabeled;
                  each is 2-3 sentences. */}
              <Reveal delay={150}>
                <SectionLabel label="Where it started">
                  <p>
                    My background is in luxury fashion retail and client
                    service — work that taught me just how personal
                    getting dressed really is. I have a degree in Fashion
                    Merchandising and Product Development, and clothes
                    have been a lifelong love: my mood is only ever as
                    good as my outfit.
                  </p>
                </SectionLabel>

                <SectionLabel label="My approach">
                  <p>
                    My style has always been rooted in juxtaposition —
                    feminine with tomboy, polished with unexpected,
                    investment pieces with something inexpensive.
                    Contrast makes an outfit interesting, and
                    that&rsquo;s the first thing I tell every client.
                    Great style isn&rsquo;t about trends or an endless
                    closet — it&rsquo;s making what you already own work
                    harder, and adding only what truly earns its place.
                  </p>
                </SectionLabel>

                <SectionLabel label="How we’ll work together">
                  <p>
                    I work with clients in Phoenix and remotely, one on
                    one, to build a repertoire of outfits that feels
                    polished, effortless, and completely yours.
                  </p>
                </SectionLabel>
              </Reveal>
            </div>
          </div>

          {/* Full-width CTA — deliberately breaks out of the two-column
              grid above rather than sitting in the left column. */}
          <Reveal delay={200} className="text-center mt-20 md:mt-28">
            <Button as={Link} to="/services#consultation">
              Book Your Complimentary Consultation
            </Button>
          </Reveal>

          {/* Follow the Journey — Instagram feed. A taupe hairline (the
              same weight Footer uses to open its own section) marks this
              as a new page section, distinct from the finer espresso
              hairlines separating the labeled bio beats above. Sits below
              the CTA with its own top margin so the feed's async render
              can never shift the CTA's position. */}
          <Reveal delay={250} className="mt-24 md:mt-32 pt-16 md:pt-20 border-t border-taupe/30 text-center">
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
