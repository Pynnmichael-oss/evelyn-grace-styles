import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

const SHOPMY_URL = 'https://shopmy.us/shop?Curator_id=1044337&Section_id=4100706'

/**
 * A signpost, not a destination — one line of copy and one outbound
 * button, nothing else. No product grid, no attempt to pull in ShopMy
 * content; the whole point is to hand the visitor off to ShopMy.
 */
export default function Shop() {
  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* Shared page-frame pass: MastheadHeader removed (duplicated
            Nav's wordmark; see Experience.jsx for the fuller note).
            Container widened max-w-xl -> max-w-[1200px] (functional-UI
            page per spec, even though this page's own content is just
            one paragraph and a button) and the combined py-24/md:py-40/
            lg:py-48 split into the standardized pt-16/lg:pt-28
            (nav-to-content) and pb-20/lg:pb-32 (content-to-footer).
            No heading conversion: "Shop" is the only text above the
            button, no separate headline to convert — only "Shop" itself
            is restyled to the new label treatment. */}
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 pt-16 lg:pt-28 pb-20 lg:pb-32 text-center">
          <Reveal>
            {/* text-2xl, not the spec's literal text-xs — measured
                terracotta-deep on sand at 4.032:1, which fails WCAG AA's
                4.5:1 for normal-size text (General Sans only loads
                weights 400/500 site-wide, so the "large text" bold
                exception isn't available either). text-2xl (24px) is
                the smallest size that legitimately clears the large-text
                3:1 threshold at this color — same fix already applied
                on About's two terracotta-deep labels. */}
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-4">
              Shop
            </p>
            <p className="font-sans text-espresso text-lg leading-relaxed mb-10 max-w-md mx-auto">
              A curated edit of pieces I love and recommend — updated
              regularly.
            </p>
            <Button
              as="a"
              href={SHOPMY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop My Picks
            </Button>
          </Reveal>
        </div>
      </main>
      {/* showCta=false — kept, against this pass's own literal page
          list (which named Shop for showCta=true). "Shop My Picks" is
          still this page's one primary CTA; turning the footer's CTA on
          would give this page two, violating this same spec's "one
          primary CTA per page is a hard rule" — flagged as a conflict
          rather than applied literally. */}
      <Footer showCta={false} />
    </div>
  )
}
