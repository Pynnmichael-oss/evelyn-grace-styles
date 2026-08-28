import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
// Fitting-scene photo, confirmed by opening the file rather than
// trusting its name: Evelyn (blonde, navy top) adjusting the shoulder
// strap of the model's black V-neck dress, grey studio backdrop.
// evelyn-model-handshake.jpg is the same two people/backdrop but a
// handshake pose — ruled out. 868x1288 source, full color, ~83KB,
// well under the 300KB flag threshold.
import fittingScene from '../assets/images/evelyn-styling-behind-scenes.jpg'

// Static, complete strings only — no `step-${n}`-style construction.
// Each step's own number/title/body are literal JSX below, not built
// from this array's index.
const STEPS = [
  {
    number: '01',
    title: 'Reach out',
    body: 'Text or email me with a brief description of what you need styled.',
  },
  {
    number: '02',
    title: 'Tell me the details',
    body: 'Where you’re going, or what your everyday looks like. The vibe you want to capture. Whether you’d like to style what you already own or shop for something new.',
  },
  {
    number: '03',
    title: 'We talk',
    body: 'A 15-minute consultation to discuss your needs and determine the best styling approach.',
  },
  {
    number: '04',
    title: 'We get to work',
    body: 'Virtual styling with curated outfit recommendations, direct shopping links, and styling notes. Or in-home in Phoenix, where I bring pieces to you for a try-on session.',
  },
]

/**
 * Full page rebuild — this replaces the previous Experience page (hero
 * intro paragraphs, 4 detailed steps each with its own CTA, and a
 * closing Pricing section) entirely, not incrementally. Six sections,
 * single max-w-[920px] column except Section 4's full-bleed photo,
 * matching About's frame conventions.
 *
 * Accessibility note, same fix as About/Contact/Services/Shop: the
 * spec's literal text-xs for terracotta-deep labels measures 4.032:1
 * on sand, which fails WCAG AA's 4.5:1 for normal-size text (General
 * Sans only loads weights 400/500 site-wide, so the large-text bold
 * exception isn't available). Both terracotta-deep labels here (the
 * page label and the four step numbers) are sized up instead of
 * recolored — see each element's own comment for the specific size
 * and why.
 *
 * sr-only h2 above the steps (kept from the previous version, not
 * asked for here but not forbidden either) preserves a clean h1 -> h2
 * -> h3 outline without a visible level skip, since the four step
 * titles are meaningful headings in their own right.
 */
export default function Experience() {
  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* SECTION 1 — heading */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-16 lg:pt-28 text-center">
          <Reveal>
            {/* text-2xl, not the spec's literal text-xs — see file-level
                comment for the contrast math. */}
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-6">
              {'( The Experience )'}
            </p>
            <h1 className="font-serif font-light text-3xl lg:text-5xl text-balance text-espresso">
              What working together looks like.
            </h1>
          </Reveal>
        </div>

        {/* SECTION 2 — four numbered steps. Left-aligned (not centered)
            so the sequence reads with one consistent edge; a hairline
            sits BETWEEN steps only via the i > 0 guard — none above
            step 01, none below step 04. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-20 lg:pt-32">
          <h2 className="sr-only">The process, step by step</h2>

          {STEPS.map((step, i) => (
            <div key={step.number}>
              {i > 0 && <div className="h-px bg-taupe/30" />}

              <Reveal className="py-10 lg:py-14 text-left">
                {/* text-2xl, not the spec's literal text-xs — same
                    contrast fix as the page label above. */}
                <p className="font-sans tracking-[0.2em] text-2xl text-terracotta-deep mb-3">
                  {step.number}
                </p>
                <h3 className="font-serif font-light text-xl lg:text-2xl text-espresso mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-base lg:text-lg leading-relaxed text-espresso max-w-[52ch]">
                  {step.body}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        {/* SECTION 3 — standalone reassurance line. Deliberately sparse:
            generous py-16/lg:py-28 on both sides, no divider, no quote
            marks, nothing else in this section. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 py-16 lg:py-28 text-center">
          <Reveal>
            <p className="font-serif font-light text-xl lg:text-3xl text-balance max-w-[34ch] mx-auto text-espresso">
              You purchase only what you love, and I handle returning the
              rest.
            </p>
          </Reveal>
        </div>

        {/* SECTION 4 — full-bleed fitting-scene photo. Flush to both
            viewport edges: deliberately outside any px-6/sm:px-10
            wrapper and outside the max-w-[920px] every other section
            uses, same pattern as About's old full-bleed section. Full
            color — no grayscale filter. object-[50%_30%] (a static
            arbitrary-value class, not string-interpolated) keeps both
            faces and hands in frame; the default center crop on this
            portrait-orientation source would land mid-torso. */}
        <div className="w-full h-[300px] md:h-[420px] lg:h-[560px] overflow-hidden">
          <img
            src={fittingScene}
            alt="Evelyn Grace adjusting a client's dress during a styling session"
            loading="lazy"
            className="w-full h-full object-cover object-[50%_30%]"
          />
        </div>

        {/* SECTION 5 — CTA. This page's one primary CTA, linking to the
            exact same /services#consultation anchor Footer's own CTA
            uses (confirmed in the audit — Services.jsx wraps
            BookingCalendar in an AccordionItem with id="consultation"). */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-16 lg:pt-24 pb-20 lg:pb-32 text-center">
          <Reveal>
            <Button as={Link} to="/services#consultation">
              Book a 15-minute consultation
            </Button>
          </Reveal>
        </div>
      </main>

      {/* SECTION 6 — showCta=false: the CTA above is this page's one
          primary CTA; the footer's own would be a second, competing
          one. */}
      <Footer showCta={false} />
    </div>
  )
}
