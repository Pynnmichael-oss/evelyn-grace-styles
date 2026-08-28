import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Divider from '../components/Divider'
import Reveal from '../components/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Start with a conversation',
    paragraphs: [
      'Book your complimentary 15-minute consultation directly through my calendar.',
      'We’ll talk about what you’re looking for, how you currently get dressed, where you feel stuck, and what you’d like your wardrobe to do better for you.',
      'Whether you need help styling pieces you already own, are looking for something specific, or want ongoing guidance, we’ll determine the approach that makes the most sense for you.',
    ],
    cta: { label: 'Book Your 15-Minute Consultation', to: '/services#consultation' },
  },
  {
    number: '02',
    title: 'Define your styling needs',
    paragraphs: [
      'After our consultation, I’ll create a personalized styling approach based on your lifestyle, personal aesthetic, wardrobe, upcoming plans, and goals.',
      'You may want to maximize what you already have. You may need a few new pieces to complete your wardrobe. Or you may have a specific trip, event, or season in mind.',
      'We’ll focus on what will make the biggest difference.',
    ],
  },
  {
    number: '03',
    title: 'Style with intention',
    paragraphs: [
      'Your styling experience can take place virtually or in the comfort of your Phoenix home.',
      'We’ll create complete looks, experiment with new combinations, refine proportions and details, and identify the pieces that make everything else in your wardrobe work harder.',
      'When new pieces are needed, I’ll thoughtfully source options that complement what you already own — rather than simply adding more to your closet.',
    ],
  },
  {
    number: '04',
    title: 'Leave with clarity',
    paragraphs: [
      'You’ll walk away with a clearer understanding of your personal style and practical ways to put it into action.',
      'The goal isn’t simply to create beautiful outfits for one day.',
      'It’s to make getting dressed feel easier, more confident, and more like you.',
    ],
  },
]

/**
 * The 4 numbered steps get an sr-only h2 ("The process, step by step")
 * directly above them so the document outline reads h1 -> h2 -> h3 (each
 * step as h3) without a visible level skip, then Pricing's own h2 sits
 * as a sibling after it — no visual change, just a correct heading tree.
 */
export default function Experience() {
  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* Shared page-frame pass: MastheadHeader (which duplicated Nav's
            own "Evelyn Grace Styles" wordmark directly beneath it) is
            removed entirely, not just hidden. Its tagline/"Phoenix, AZ"
            text goes with it — treated as nav-adjacent signage, not page
            content; the same tagline never appeared as unique content
            elsewhere on this page, and "Phoenix, AZ" still appears in
            Footer's meta row. Container widened max-w-2xl -> max-w-[920px]
            and the nav-to-content gap standardized to pt-16/lg:pt-28,
            both per the site-wide page frame. */}
        <div className="mx-auto max-w-[920px] px-6 sm:px-10 pt-16 lg:pt-28 pb-24 md:pb-40 lg:pb-48">
          {/* Shared heading pattern: the small uppercase label replaces
              Eyebrow's own treatment (13px/tracking-[0.18em]/espresso,
              parens) with the new one (text-xs/tracking-[0.22em]/
              terracotta-deep, no parens) per spec. Existing heading copy
              ("PERSONAL STYLE, CONSIDERED.") kept verbatim — only its
              size changed, text-4xl/md:text-6xl -> text-3xl/lg:text-5xl,
              to match the shared pattern; that's a real, visible
              reduction from the previous size, done because the pattern
              itself calls for it. */}
          <Reveal className="text-center">
            {/* text-2xl, not the spec's literal text-xs — measured
                terracotta-deep on sand at 4.032:1, which fails WCAG AA's
                4.5:1 for normal-size text (General Sans only loads
                weights 400/500 site-wide, so the "large text" bold
                exception isn't available either). text-2xl (24px) is
                the smallest size that legitimately clears the large-text
                3:1 threshold at this color — same fix already applied
                on About's two terracotta-deep labels. */}
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-4">
              The Experience
            </p>
            <h1 className="font-serif font-light text-3xl lg:text-5xl text-balance text-espresso mb-10">
              PERSONAL STYLE, CONSIDERED.
            </h1>
          </Reveal>

          <Reveal delay={100} className="text-center space-y-5 mb-4">
            <p className="font-sans text-espresso text-lg leading-relaxed">
              Your wardrobe should work for your life.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed">
              Together, we&rsquo;ll identify what you love, uncover new
              possibilities within what you already own, and thoughtfully
              add pieces when something is missing.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed">
              From everyday dressing to travel, special occasions, and
              everything in between, I create polished, wearable looks that
              feel natural to you — with just enough guidance to help you
              step outside your usual routine when you&rsquo;re ready.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed">
              No unnecessary shopping. No pressure to reinvent yourself. No
              one-size-fits-all formulas.
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed">
              Just a more intentional approach to getting dressed.
            </p>
          </Reveal>

          <h2 className="sr-only">The process, step by step</h2>

          <div className="mt-20 md:mt-28">
            {STEPS.map((step, i) => (
              <div key={step.number}>
                {i > 0 && <Divider className="my-20 md:my-28 lg:my-36" />}

                <Reveal className="text-center">
                  <p className="font-serif text-lg text-terracotta mb-3">
                    {step.number}
                  </p>
                  <h3 className="font-serif font-light text-3xl md:text-4xl text-espresso mb-6">
                    {step.title}
                  </h3>
                </Reveal>

                <Reveal delay={100} className="text-left space-y-4 max-w-xl mx-auto">
                  {step.paragraphs.map((p) => (
                    <p key={p} className="font-sans text-espresso leading-relaxed">
                      {p}
                    </p>
                  ))}
                </Reveal>

                {step.cta && (
                  <Reveal delay={200} className="text-center mt-10">
                    <Button as={Link} to={step.cta.to}>
                      {step.cta.label}
                    </Button>
                  </Reveal>
                )}
              </div>
            ))}
          </div>

          <Divider className="my-20 md:my-28 lg:my-36" />

          <Reveal className="text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-espresso mb-6">
              A personalized experience, tailored to you.
            </h2>
            <p className="font-sans text-espresso leading-relaxed mb-8 max-w-xl mx-auto">
              Every styling experience is different. After your
              complimentary consultation, I&rsquo;ll recommend the service
              and amount of time that best suits your needs and provide
              your investment before we move forward.
            </p>
            {/* Quiet text link, not a Button — step 01 already carries
                the page's one filled CTA, so this stays secondary. */}
            <Link
              to="/services"
              className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
            >
              Explore Services →
            </Link>
          </Reveal>
        </div>
      </main>
      {/* showCta=false — kept, against this pass's own literal page
          list (which named Experience for showCta=true). Step 01 still
          carries this page's one primary CTA ("Book Your 15-Minute
          Consultation"); turning the footer's CTA on would give this
          page two, violating this same spec's "one primary CTA per
          page is a hard rule" — flagged as a conflict rather than
          applied literally. */}
      <Footer showCta={false} />
    </div>
  )
}
