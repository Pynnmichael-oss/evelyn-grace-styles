import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
// Imported rather than referenced as a raw string — the site builds with
// base: '/evelyn-grace-styles/' for GitHub Pages, and a hardcoded
// root-absolute path silently 404s under that subpath.
//
// Solo B&W portrait, per an earlier pass's audit: compared candidates
// pixel-by-pixel rather than trusting filenames. evelyn-portrait-wide.jpg
// is the same pose/session and also true grayscale, but this file was
// already the established pick from earlier work on this page.
// evelyn-portrait-close.jpg looks like a match by name/pose but isn't
// actually black-and-white — it retains a real color cast (91 max
// channel diff vs. 0 for this file). 853x1280 source, 52KB, well under
// the 300KB flag threshold.
import aboutPortrait from '../assets/images/about-portrait.jpg'

// Section 3's three lines. Plain strings (not JSX children), so real
// Unicode apostrophes/em dashes rather than HTML entities — entities
// only resolve inside JSX text, not JS string literals.
const BELIEFS = [
  'Great style isn’t an endless closet. It’s knowing what makes you feel your best.',
  'The pieces you already own should work harder before you buy anything new.',
  'My mood is only ever as good as my outfit — and I think that’s true for most of us.',
]

/**
 * Reordered per client-approved spec: portrait leads (right after Nav,
 * now the page's LCP element — see its eager/high-priority load below),
 * then philosophy, then the belief lines, then a "My style is" quote
 * closer immediately before Footer. The old opening quote section and
 * the old "Follow the Journey" social-feed embed section are both gone
 * entirely — not hidden, not relocated — per the same spec.
 *
 * Accessibility note, still applicable in the new layout: terracotta-deep
 * is now #9B5A3A, measured 4.61:1 on sand — already clears WCAG AA's 4.5:1
 * normal-text threshold outright, so the large-text sizing this note used
 * to require is no longer load-bearing for contrast. Both labels ("My
 * style is" in the closer, "What I believe" above the belief lines) stay
 * text-2xl (24px), not text-xs (kept as-is; this pass only updates the
 * cited figures).
 *
 * Nav renders first, unbordered-header style (pt-8/pb-8/lg:pt-10/
 * lg:pb-10 + bottom hairline) — unchanged from before.
 *
 * Spacing rhythm: pt-16/lg:pt-28 is the nav-to-content gap (now on the
 * portrait section, since it's first); pt-20/lg:pt-32 is the
 * between-sections gap (philosophy, beliefs, closer); pb-20/lg:pb-32 is
 * the page-end bottom padding (now on the closer, since it's last). The
 * portrait no longer carries its own pb- — the philosophy section's own
 * pt- supplies the gap below it instead, now that nothing follows the
 * portrait that needs a *different* gap than the standard rhythm.
 */
export default function About() {
  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* SECTION 1 — portrait. First thing on the page now, and the
            page's LCP (largest contentful paint) element, so it loads
            eager + fetchPriority="high" instead of the lazy-loading it
            used when it sat further down the page — a below-the-fold
            image can defer, the very first thing on the page shouldn't.
            Deliberately NOT wrapped in <Reveal>: a fade-in on the LCP
            element would delay when it visually finishes painting,
            working against the very eager/high-priority loading just
            added. Face sits in the upper third of the source, hence
            object-[center_20%] rather than the default center crop.
            Already black-and-white — no grayscale filter applied.
            Borderless: no frame, shadow, or rounded corners, and no
            caption beneath it. */}
        <div className="px-6 sm:px-10 pt-16 lg:pt-28 text-center">
          <img
            src={aboutPortrait}
            alt="Evelyn Grace, personal style consultant, seated black-and-white portrait"
            loading="eager"
            fetchPriority="high"
            className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[460px] mx-auto aspect-[3/4] object-cover object-[center_20%]"
          />
        </div>

        {/* SECTION 2 — philosophy statement, body copy, signature line.
            The philosophy statement is the page's <h1> now that the
            old opening quote section (which held the previous <h1>) is
            gone — this is the only <h1> on the page. */}
        <div className="px-6 sm:px-10 pt-20 lg:pt-32 text-center">
          <div className="max-w-[920px] mx-auto">
            <Reveal>
              <h1 className="font-serif font-light text-xl lg:text-3xl text-balance text-espresso mb-6">
                I build wardrobes that feel like you, not like a trend.
              </h1>
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

        {/* SECTION 3 — belief lines. Divider sits BETWEEN lines only
            (i > 0 guard) — none above the first, none below the last.
            No bottom padding of its own now — the closer below supplies
            the gap via its own pt-. */}
        <div className="px-6 sm:px-10 pt-20 lg:pt-32 text-center">
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

        {/* SECTION 4 — "My style is" closer, immediately before Footer.
            Replaces the old opening quote section (moved here per
            client-approved spec, not just restyled) — the copy itself
            is also different from the old quote, verbatim from the
            client; not edited. Curly quote characters, not straight
            ones, per spec. pb-20/lg:pb-32 is the page's end-of-content
            padding, same value Section 5 used to carry before it was
            removed. */}
        <div className="px-6 sm:px-10 pt-20 lg:pt-32 pb-20 lg:pb-32 text-center">
          <div className="max-w-[920px] mx-auto">
            <Reveal>
              <h2 className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-6">
                My style is
              </h2>
              <p className="font-serif italic font-light text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-balance text-espresso">
                “rooted in juxtaposition. I love mixing feminine pieces with tomboy elements or pairing something polished with something unexpected.”
              </p>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
