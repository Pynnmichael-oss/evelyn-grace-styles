import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MastheadHeader from '../components/MastheadHeader'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
// Imported rather than referenced as a raw "/about-portrait.jpg" string —
// the site builds with base: '/evelyn-grace-styles/' for GitHub Pages,
// and a hardcoded root-absolute path silently 404s under that subpath.
import aboutPortrait from '../assets/images/about-portrait.jpg'

// Same value as Home's Hero — one shared line site-wide for brand
// consistency. A single prop, trivial to diverge later if a
// page-specific tagline is ever wanted here instead.
const TAGLINE =
  'A considered approach to personal style that is versatile, enduring, and uniquely you.'

/**
 * Copy-led page: MastheadHeader, then a moderate (not full-bleed) portrait
 * so the photo anchors the page rather than dominating it, then two
 * distinct copy blocks in a single centered column. pt-20 on <main>
 * exists only to clear the fixed Header's own height (h-20) — Header
 * stays transparent until scrolled, but its wordmark/nav text is always
 * visible, so content starting right at the top (unlike Home's
 * full-bleed hero) needs that exact offset to avoid colliding with it.
 *
 * The philosophy statement and the personal bio are deliberately two
 * separate Reveal blocks in two different voices — direct-address vs.
 * first-person narrative — separated by generous pb-24/md:pb-40 on the
 * philosophy block so they read as distinct beats rather than running
 * together into one dense block of copy.
 */
export default function About() {
  return (
    <div className="bg-sand">
      <Header />
      <main className="pt-20">
        <MastheadHeader tagline={TAGLINE} />

        <Reveal className="mx-auto max-w-sm px-6 sm:px-10 mt-16 mb-16 md:mt-24 md:mb-24">
          <img
            src={aboutPortrait}
            alt="Black-and-white portrait of Evelyn, seated and glancing back over her shoulder mid-laugh, wearing a black sweater and skirt against a softly textured backdrop"
            className="w-full aspect-[4/5] object-cover"
          />
        </Reveal>

        <div className="mx-auto max-w-2xl px-6 sm:px-10 pb-24 md:pb-40 lg:pb-48">
          <Reveal className="text-center">
            {/* Same "( ... )" bracket convention as Eyebrow, but set in
                Fraunces rather than General Sans — a deliberate, page-
                local departure from the shared component so this kicker
                reads in the same register as the serif subheading right
                below it. */}
            <p className="font-serif text-sm uppercase tracking-[0.18em] text-espresso mb-5">
              {'( About Evelyn )'}
            </p>
            <h1 className="font-serif font-light text-4xl md:text-5xl text-espresso mb-12">
              Personal style, with intention.
            </h1>
          </Reveal>

          {/* Philosophy statement — direct address to the client, distinct
              from the first-person bio below it. pb-24/md:pb-40 is the
              generous separator called for between the two voices; the
              bio's own Reveal carries no matching top padding, so this is
              the single source of that gap (avoids doubling it on mobile
              where the two would otherwise stack). */}
          <Reveal delay={100} className="text-center pb-24 md:pb-40">
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              Thoughtful styling for women who want to feel confident,
              polished, and completely themselves in what they wear.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              I believe getting dressed should feel effortless — not
              because you have more clothes, but because you have the
              right pieces, know how to wear them, and understand what
              truly feels like you.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed">
              Whether we&rsquo;re working with pieces already in your
              wardrobe or thoughtfully introducing something new, every
              recommendation is personal, intentional, and designed
              around the way you actually live.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              I&rsquo;m a Personal Style Consultant with a background
              working in luxury fashion retail and client service. Working
              closely with clients has given me a firsthand understanding
              of quality, fit, and, most importantly, how personal getting
              dressed really is.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              I have a degree in Fashion Merchandising and Product
              Development.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              I have always loved clothes. I enjoy the work that goes into
              finding the perfect outfit because I live in a world where my
              mood can only ever be as good as my outfit is. When I feel
              good in what I&rsquo;m wearing, I feel like myself.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              My personal style has always been rooted in juxtaposition. I
              love mixing feminine pieces with tomboy elements, dressing
              something polished with something unexpected, and pairing
              investment pieces with something inexpensive. That would
              absolutely be my first style tip to anyone. Contrast makes an
              outfit interesting.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-6 md:mb-8">
              I believe great personal style isn&rsquo;t about following
              every trend or having an endless wardrobe. It&rsquo;s about
              understanding what makes you feel your best and learning how
              to make the pieces you own — and the pieces you choose to
              add — work beautifully together.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-12 md:mb-14">
              I work in Phoenix and remotely with each client individually
              to create a repertoire of outfits that feels polished,
              effortless, and authentically yours.
            </p>
          </Reveal>

          <Reveal delay={200} className="text-center">
            {/* The site's one recurring primary action — same Button
                style as everywhere else, not a competing second CTA.
                /services doesn't exist as a page yet; wired ahead of it
                per spec. */}
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
