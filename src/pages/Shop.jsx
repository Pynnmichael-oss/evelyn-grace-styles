import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MastheadHeader from '../components/MastheadHeader'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

// Same value as Home's Hero / About — one shared line site-wide.
const TAGLINE =
  'A considered approach to personal style that is versatile, enduring, and uniquely you.'

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
        {/* MastheadHeader still repeats the wordmark right below Nav —
            flagged as a known duplication in the audit, left as-is
            since redesigning/removing it wasn't part of this pass. */}
        <MastheadHeader tagline={TAGLINE} />

        <div className="mx-auto max-w-xl px-6 sm:px-10 py-24 md:py-40 lg:py-48 text-center">
          <Reveal>
            <Eyebrow>Shop</Eyebrow>
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
      {/* showCta=false — "Shop My Picks" (an outbound ShopMy link) is
          this page's one primary CTA; not named in the original ask
          but the same "one CTA per page" rule applies here too. */}
      <Footer showCta={false} />
    </div>
  )
}
