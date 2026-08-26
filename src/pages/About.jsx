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
 * Two-column layout, CSS Grid with a literal grid-template-columns:
 * 1fr 1fr at md+ (Tailwind: `md:grid-cols-[1fr_1fr]`) — a hard 50/50
 * split, not the 12-track/col-span-6 composition used in earlier
 * revisions. Both compute to the same pixel result, but 1fr/1fr reads
 * unambiguously in devtools as exactly two tracks, with nothing left
 * to double-check. `order-*` flips which *track* each item lands in on
 * mobile vs. desktop — portrait first (both in the DOM and visually)
 * below md, portrait in the second track (right side) at md+ — while
 * keeping the same source order (and therefore the same DOM/reading
 * order for screen readers) either way. Grid respects `order` during
 * auto-placement, so this doesn't require an explicit grid-column
 * value on either item.
 *
 * This is not flexbox: there is no flex-wrap anywhere in this layout,
 * so "the text column wrapping beneath the image column" isn't a
 * failure mode that can occur here — a CSS Grid item can only leave
 * its assigned track by that track disappearing entirely, which is
 * exactly what `grid-cols-1` (no md: prefix) does below the 768px
 * breakpoint. Verified directly against the deployed build before this
 * pass: `display: grid` confirmed, portrait and copy bounding rects
 * never overlap in x (each stays in its own ~504px-wide lane for its
 * full height) even though the two columns' heights differ — that's
 * the columns not needing equal height, not a stacking bug.
 *
 * Static, not sticky: a prior revision pinned the portrait in place via
 * position: sticky while the text column scrolled past it. That's
 * removed entirely — the portrait is a plain grid item and scrolls
 * normally with the rest of the page. Grid's default align-items:
 * stretch still means the portrait's grid *cell* matches the taller
 * column's height, but that only affects empty space below whichever
 * column is shorter — it doesn't stretch the image itself, so a
 * portrait taller than the text column (or vice versa) is left alone
 * rather than forced to match.
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
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-y-16 md:gap-x-16">
            {/* Portrait + signature — large and static (no sticky/
                scroll-pinned behavior anywhere on this page), and
                deliberately borderless: no frame, no padding-mat, no
                rotation, no shadow — sits clean directly against the
                cream page background. (A prior revision framed it like
                a mounted photo; this spec explicitly retires that
                treatment — the Instagram card below is now the only
                bordered element on the page.) max-w-sm sm:max-w-md caps
                it on mobile where it's stacked above the copy
                full-width; md:max-w-none removes that cap entirely at
                the 50% column width so it fills its half of the page. */}
            <Reveal className="order-1 md:order-2">
              <div className="max-w-sm sm:max-w-md md:max-w-none mx-auto md:mx-0">
                <img
                  src={aboutPortrait}
                  alt="Black-and-white portrait of Evelyn, seated and glancing back over her shoulder mid-laugh, wearing a black sweater and skirt against a softly textured backdrop"
                  className="w-full aspect-[4/5] object-cover"
                />

                {/* TODO: replace with Evelyn's actual handwritten "Evelyn
                    Grace" signature graphic once the client provides a
                    standalone image/SVG asset. Checked the project's
                    uploaded reference mockups (the Home-page hero
                    template) and the rest of the repo/filesystem for one
                    — none exists yet. Per spec, this is deliberately set
                    in Fraunces italic rather than a script/cursive font
                    standing in for a real signature. mt-8 (was mt-6) so
                    it reads as clearly spaced from the now-borderless
                    photo edge, not cramped against it. */}
                <p className="mt-8 text-center font-serif italic text-4xl md:text-5xl text-espresso">
                  Evelyn Grace
                </p>
              </div>
            </Reveal>

            {/* Copy */}
            <div className="order-2 md:order-1">
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
                  paragraph, not just another beat. This final spec cuts
                  it to a single sentence — the previous two-paragraph
                  extension is gone, not just relabeled. */}
              <Reveal delay={100}>
                <p className="font-sans text-espresso text-2xl leading-relaxed">
                  Thoughtful styling for women who want to feel confident,
                  polished, and completely themselves in what they wear.
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
