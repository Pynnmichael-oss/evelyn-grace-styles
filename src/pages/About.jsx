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

/**
 * Labeled section: a small tracked kicker sitting just above its
 * paragraph(s), separated from the section before it by a thin espresso
 * hairline. Repeated five times down the left column — this rhythm,
 * not one dense paragraph block, is what gives the page its
 * "conversational beats" feel. Generous mt/pt (bumped further on md)
 * keeps that rhythm from compressing on a long mobile scroll.
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
    <div className="mt-12 pt-8 md:mt-16 md:pt-10 border-t border-espresso/15">
      <p className="font-sans font-medium text-[13px] uppercase tracking-[0.14em] text-[#8F5336] mb-4">
        {label}
      </p>
      <div className="font-sans text-espresso text-lg leading-relaxed space-y-4">
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
            {/* Portrait + signature */}
            <Reveal className="order-1 md:order-2 md:col-span-5">
              <div className="max-w-xs sm:max-w-sm md:max-w-none mx-auto md:mx-0">
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
              </div>
            </Reveal>

            {/* Copy */}
            <div className="order-2 md:order-1 md:col-span-7">
              <Reveal>
                <p className="font-serif text-sm uppercase tracking-[0.18em] text-espresso mb-5">
                  {'( About Evelyn )'}
                </p>
                <h1 className="font-serif font-light text-4xl md:text-5xl text-espresso mb-10">
                  Personal style, with intention.
                </h1>
              </Reveal>

              {/* Opening statement — the page's thesis, no label, set a
                  step larger than standard body copy (text-xl vs the
                  text-lg used everywhere below it) so it reads as a
                  lead-in rather than another labeled beat. */}
              <Reveal delay={100}>
                <p className="font-sans text-espresso text-xl leading-relaxed mb-6 md:mb-8">
                  Thoughtful styling for women who want to feel confident,
                  polished, and completely themselves in what they wear.
                </p>
                <p className="font-sans text-espresso text-xl leading-relaxed mb-6 md:mb-8">
                  I believe getting dressed should feel effortless — not
                  because you have more clothes, but because you have the
                  right pieces, know how to wear them, and understand
                  what truly feels like you.
                </p>
                <p className="font-sans text-espresso text-xl leading-relaxed">
                  Whether we&rsquo;re working with pieces already in your
                  wardrobe or thoughtfully introducing something new,
                  every recommendation is personal, intentional, and
                  designed around the way you actually live.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <SectionLabel label="Where it started">
                  <p>
                    I&rsquo;m a Personal Style Consultant with a
                    background working in luxury fashion retail and
                    client service. Working closely with clients has
                    given me a firsthand understanding of quality, fit,
                    and, most importantly, how personal getting dressed
                    really is.
                  </p>
                  <p>
                    I have a degree in Fashion Merchandising and Product
                    Development.
                  </p>
                </SectionLabel>

                <SectionLabel label="Why I do this">
                  <p>
                    I have always loved clothes. I enjoy the work that
                    goes into finding the perfect outfit because I live
                    in a world where my mood can only ever be as good as
                    my outfit is. When I feel good in what I&rsquo;m
                    wearing, I feel like myself.
                  </p>
                </SectionLabel>

                <SectionLabel label="My approach">
                  <p>
                    My personal style has always been rooted in
                    juxtaposition. I love mixing feminine pieces with
                    tomboy elements, dressing something polished with
                    something unexpected, and pairing investment pieces
                    with something inexpensive. That would absolutely be
                    my first style tip to anyone. Contrast makes an
                    outfit interesting.
                  </p>
                </SectionLabel>

                <SectionLabel label="What I believe">
                  <p>
                    I believe great personal style isn&rsquo;t about
                    following every trend or having an endless wardrobe.
                    It&rsquo;s about understanding what makes you feel
                    your best and learning how to make the pieces you
                    own — and the pieces you choose to add — work
                    beautifully together.
                  </p>
                </SectionLabel>

                <SectionLabel label="How we’ll work together">
                  <p>
                    I work in Phoenix and remotely with each client
                    individually to create a repertoire of outfits that
                    feels polished, effortless, and authentically yours.
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
