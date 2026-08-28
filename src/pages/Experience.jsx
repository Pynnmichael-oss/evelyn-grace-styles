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

// Shared by every step's body paragraphs — one static, complete class
// string reused verbatim, not built per-step (no `step-${n}` anywhere
// on this page; Tailwind can't see through that and would purge it).
const stepBodyClassName =
  'font-sans text-base lg:text-lg leading-relaxed text-espresso max-w-[58ch]'

/**
 * One step in Section 4. py-12/lg:py-16 lives here once so every step
 * gets it identically — impossible to accidentally vary between steps
 * this way, which the spec calls out as a real failure mode ("uneven
 * step spacing will read as sloppy"). `dividerAbove` defaults true;
 * steps 01 (first) and 03 (the full-bleed photo already provides the
 * separation from 02) pass false explicitly at the call site.
 */
function Step({ number, title, dividerAbove = true, children, cta }) {
  return (
    <>
      {dividerAbove && <div className="h-px bg-taupe/30" />}
      <Reveal className="py-12 lg:py-16 text-left">
        {/* text-2xl, not the spec's literal text-xs — see file-level
            comment for the contrast math. */}
        <p className="font-sans tracking-[0.2em] text-2xl text-terracotta-deep mb-3">
          {number}
        </p>
        <h3 className="font-serif font-light text-xl lg:text-2xl text-espresso mb-4">
          {title}
        </h3>
        <div className="space-y-4">{children}</div>
        {cta && <div className="mt-8">{cta}</div>}
      </Reveal>
    </>
  )
}

/**
 * Full page rebuild — replaces the previous (shorter-copy) Experience
 * page entirely, not incrementally. Structure: heading + intro flow
 * centered together (Section 1 pt-16/lg:pt-28 is the only top padding
 * between them; a plain mb-10 separates the h1 from the paragraphs),
 * the three "No" lines as their own section with explicit padding on
 * both sides, four left-aligned steps (a deliberate asymmetry against
 * the centered sections around them), a full-bleed photo breaking out
 * of the column between steps 02 and 03, and a centered Pricing close.
 *
 * Accessibility note, same fix as every other interior page: the
 * spec's literal text-xs for terracotta-deep labels measures 4.032:1
 * on sand, which fails WCAG AA's 4.5:1 for normal-size text (General
 * Sans only loads weights 400/500 site-wide, so the large-text bold
 * exception isn't available). Both terracotta-deep labels (page label,
 * "( Pricing )") and the four step numerals are text-2xl instead of
 * text-xs — the smallest size that legitimately clears the large-text
 * 3:1 threshold at this color.
 *
 * sr-only h2 above the steps preserves a clean h1 -> h2 -> h3 outline,
 * since the four step titles are meaningful headings in their own
 * right — not asked for here, not forbidden either.
 */
export default function Experience() {
  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* SECTION 1 — heading, SECTION 2 — intro. One flowing centered
            block; only the h1 -> paragraphs gap (mb-10 on the heading
            block) separates them, since neither section specifies its
            own bottom padding. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-16 lg:pt-28 text-center">
          <Reveal>
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-6">
              {'( The Experience )'}
            </p>
            <h1 className="font-serif font-light text-3xl lg:text-5xl text-balance text-espresso mb-10">
              Personal style, considered.
            </h1>
          </Reveal>

          <Reveal delay={100} className="space-y-5">
            <p className="font-sans text-base lg:text-lg leading-relaxed max-w-[58ch] mx-auto text-espresso">
              Your wardrobe should work for your life.
            </p>
            <p className="font-sans text-base lg:text-lg leading-relaxed max-w-[58ch] mx-auto text-espresso">
              Together, we&rsquo;ll identify what you love, uncover new
              possibilities within what you already own, and thoughtfully
              add pieces when something is missing.
            </p>
            <p className="font-sans text-base lg:text-lg leading-relaxed max-w-[58ch] mx-auto text-espresso">
              From everyday dressing to travel, special occasions, and
              everything in between, I create polished, wearable looks
              that feel natural to you — with just enough guidance to
              help you step outside your usual routine when
              you&rsquo;re ready.
            </p>
          </Reveal>
        </div>

        {/* SECTION 3 — the three "No" lines + closing line. Own explicit
            padding on both sides is what separates this from Section 2
            above and Section 4 below — neither of those adds its own
            padding at this boundary. Dividers use the About convention
            (h-px bg-taupe/30 max-w-[Nch] mx-auto) since this content is
            centered, unlike the steps below. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-16 lg:pt-24 pb-16 lg:pb-24 text-center">
          <Reveal>
            <p className="font-serif font-light text-lg lg:text-2xl max-w-[40ch] mx-auto py-6 lg:py-8 text-espresso">
              No unnecessary shopping.
            </p>
            <div className="h-px bg-taupe/30 max-w-[40ch] mx-auto" />
            <p className="font-serif font-light text-lg lg:text-2xl max-w-[40ch] mx-auto py-6 lg:py-8 text-espresso">
              No pressure to reinvent yourself.
            </p>
            <div className="h-px bg-taupe/30 max-w-[40ch] mx-auto" />
            <p className="font-serif font-light text-lg lg:text-2xl max-w-[40ch] mx-auto py-6 lg:py-8 text-espresso">
              No one-size-fits-all formulas.
            </p>
            <p className="font-serif font-light text-lg lg:text-2xl max-w-[40ch] mx-auto pt-10 lg:pt-14 text-espresso">
              Just a more intentional approach to getting dressed.
            </p>
          </Reveal>
        </div>

        {/* SECTION 4 (part 1) — steps 01-02. Left-aligned: a deliberate
            asymmetry against the centered sections above/below — this
            is a sequence, not a statement, and needs one consistent
            left edge to read as one. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10">
          <h2 className="sr-only">The process, step by step</h2>

          <Step
            number="01"
            title="Start with a conversation"
            dividerAbove={false}
            cta={
              <Button as={Link} to="/services#consultation">
                Book your complimentary consultation
              </Button>
            }
          >
            <p className={stepBodyClassName}>
              Book your complimentary 15-minute consultation directly
              through my calendar.
            </p>
            <p className={stepBodyClassName}>
              We&rsquo;ll talk about what you&rsquo;re looking for, how
              you currently get dressed, where you feel stuck, and what
              you&rsquo;d like your wardrobe to do better for you.
            </p>
            <p className={stepBodyClassName}>
              Whether you need help styling pieces you already own, are
              looking for something specific, or want ongoing guidance,
              we&rsquo;ll determine the approach that makes the most
              sense for you.
            </p>
          </Step>

          <Step number="02" title="Define your styling needs">
            <p className={stepBodyClassName}>
              After our consultation, I&rsquo;ll create a personalized
              styling approach based on your lifestyle, personal
              aesthetic, wardrobe, upcoming plans, and goals.
            </p>
            <p className={stepBodyClassName}>
              You may want to maximize what you already have. You may
              need a few new pieces to complete your wardrobe. Or you
              may have a specific trip, event, or season in mind.
            </p>
            <p className={stepBodyClassName}>
              We&rsquo;ll focus on what will make the biggest difference.
            </p>
          </Step>
        </div>

        {/* SECTION 6 — full-bleed photo, between steps 02 and 03.
            Flush to both viewport edges: deliberately outside any
            px-6/sm:px-10 wrapper and the max-w-[920px] column. Full
            color — no grayscale filter. object-[50%_30%] (a static
            arbitrary-value class, not string-interpolated) keeps both
            faces and hands in frame; the default center crop on this
            portrait-orientation source would land mid-torso. my-16/
            lg:my-24 is this section's own spacing; the hairline that
            would normally sit between steps 02/03 is omitted (dividerAbove
            false on step 03 below) since the photo is the separation. */}
        <div className="w-full h-[300px] md:h-[420px] lg:h-[560px] overflow-hidden my-16 lg:my-24">
          <img
            src={fittingScene}
            alt="Evelyn Grace adjusting a client's dress during a styling session"
            loading="lazy"
            className="w-full h-full object-cover object-[50%_30%]"
          />
        </div>

        {/* SECTION 4 (part 2) — steps 03-04. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10">
          <Step number="03" title="Style with intention" dividerAbove={false}>
            <p className={stepBodyClassName}>
              Your styling experience can take place virtually or in the
              comfort of your Phoenix home.
            </p>
            <p className={stepBodyClassName}>
              We&rsquo;ll create complete looks, experiment with new
              combinations, refine proportions and details, and identify
              the pieces that make everything else in your wardrobe work
              harder.
            </p>
            <p className={stepBodyClassName}>
              When new pieces are needed, I&rsquo;ll thoughtfully source
              options that complement what you already own — rather
              than simply adding more to your closet.
            </p>
          </Step>

          <Step number="04" title="Leave with clarity">
            <p className={stepBodyClassName}>
              You&rsquo;ll walk away with a clearer understanding of your
              personal style and practical ways to put it into action.
            </p>
            <p className={stepBodyClassName}>
              The goal isn&rsquo;t simply to create beautiful outfits for
              one day.
            </p>
            <p className={stepBodyClassName}>
              It&rsquo;s to make getting dressed feel easier, more
              confident, and more like you.
            </p>
          </Step>
        </div>

        {/* SECTION 7 — Pricing. No numbers/rates/figures anywhere — the
            body copy explains the approach, not a price. "Explore
            services" is a plain text link (permanent 1px terracotta
            underline, not a hover-reveal), never a Button — this page's
            only button is step 01's CTA above. */}
        <div className="max-w-[920px] mx-auto px-6 sm:px-10 pt-20 lg:pt-32 pb-20 lg:pb-32 text-center">
          <Reveal>
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-6">
              {'( Pricing )'}
            </p>
            <h2 className="font-serif font-light text-xl lg:text-3xl text-balance text-espresso mb-6">
              A personalized experience, tailored to you.
            </h2>
            <p className="font-sans text-base lg:text-lg leading-relaxed max-w-[58ch] mx-auto text-espresso mb-8">
              Every styling experience is different. After your
              complimentary consultation, I&rsquo;ll recommend the
              service and amount of time that best suits your needs and
              provide your investment before we move forward.
            </p>
            <Link
              to="/services"
              className="font-sans text-xs uppercase tracking-[0.16em] text-espresso underline decoration-terracotta decoration-1 underline-offset-4 hover:text-terracotta transition-colors duration-200 ease-out"
            >
              Explore services
            </Link>
          </Reveal>
        </div>
      </main>

      {/* SECTION 8 — showCta=false: step 01's CTA above is this page's
          one button; the footer's own would be a second, competing one. */}
      <Footer showCta={false} />
    </div>
  )
}
