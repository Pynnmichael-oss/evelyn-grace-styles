import { Link } from 'react-router-dom'
import Button from './Button'

// Only place this URL exists in the codebase besides About's own
// "Follow the Journey" Instagram link (a separate, untouched section).
const INSTAGRAM_URL = 'https://www.instagram.com/evelyn123allen/'

/**
 * Site-wide footer. Cream band (differentiates it from the sand page
 * above), one terracotta hairline as its top border — the only
 * decorative terracotta anywhere in this component; the CTA button is
 * terracotta too, but that's Button's own styling, not this file's.
 *
 * `id="contact"` is preserved from the previous Footer on purpose:
 * Header's nav has a plain in-page anchor (`{ label: 'Contact', href:
 * '#contact' }`, not a route) that scrolls to whatever element carries
 * this id. Dropping it would silently break that nav link on every
 * page that renders this component.
 *
 * All four stacked blocks (headline+CTA, divider, meta row, contact
 * line) share ONE flex `gap-12` on their common parent rather than
 * per-element margins — a single spacing value, and no leftover gap to
 * clean up when `showCta` removes the first two children (CSS `gap`
 * only applies *between* the children that actually exist).
 *
 * showCta: true by default. Without a CTA, "Tell me what you need
 * styled." would be a dangling sentence, so both the headline and the
 * button are gated by the same flag — never one without the other.
 * Every page that already carries its own primary CTA passes false:
 * Services (booking calendar/request form) and Contact (contact form)
 * per spec, plus Experience ("Book Your 15-Minute Consultation") and
 * Shop ("Shop My Picks", an outbound ShopMy link) — both found while
 * wiring this in, both would otherwise violate this same spec's own
 * "one primary CTA per page" rule. Only About keeps the default.
 */
export default function Footer({ showCta = true }) {
  return (
    <footer id="contact" className="border-t border-terracotta bg-cream">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 py-16 lg:py-24">
        <div className="flex flex-col items-center gap-12">
          {showCta && (
            <p className="font-serif font-light text-2xl lg:text-4xl text-balance text-center text-espresso">
              Tell me what you need styled.
            </p>
          )}

          {showCta && (
            <Button as={Link} to="/services#consultation">
              Book Your Complimentary Consultation
            </Button>
          )}

          <div className="h-px w-full bg-taupe/30" />

          <div className="w-full flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-espresso">
              Evelyn Grace Styles
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-espresso">
              Phoenix, AZ
            </span>
          </div>

          <div className="w-full flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:justify-start sm:gap-6 sm:text-left">
            {/* py-4 -my-4 expands the tappable area to a real 44px+
                touch target (16px text-xs line-height + 16px top +
                16px bottom = 48px) without shifting anything visually —
                the negative margin cancels the padding's layout impact,
                so it only grows the hit box, not the visible spacing.
                Applied to both links for consistency; the spec only
                required it on the tel: link specifically. */}
            <a
              href="tel:+18304564916"
              className="font-sans text-xs text-espresso hover:text-terracotta py-4 -my-4 transition-colors duration-200 ease-out"
            >
              (830) 456-4916
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-espresso hover:text-terracotta py-4 -my-4 transition-colors duration-200 ease-out"
            >
              Instagram
            </a>
            {/* TODO: email pending confirmation from client */}
          </div>
        </div>
      </div>
    </footer>
  )
}
