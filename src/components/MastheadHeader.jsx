import { Monogram } from './Logo'

/**
 * Thin three-column signage bar — wordmark / tagline / location — shared
 * across Home, About, Experience, and Services. All three items share the
 * exact caption-label treatment used for the wordmark and nav in Header.jsx
 * (uppercase, tracked, 13px, espresso) so the center tagline reads as quiet
 * signage, never as a headline competing with the page's actual copy.
 *
 * Deliberately thin vertical padding only: this bar is meant to sit directly
 * between two full-bleed photos (see Hero.jsx) and read as a connective
 * strip, not its own section — do not bump py- up to section-level spacing.
 *
 * Three columns on desktop (left-aligned wordmark, centered tagline,
 * right-aligned location); collapses to a single centered column on mobile
 * in wordmark → tagline → location order, which is just the source order
 * below.
 */
export default function MastheadHeader({ tagline, className = '' }) {
  const itemClassName = 'caption-label text-[13px] text-espresso'

  return (
    <div
      className={`bg-cream px-6 sm:px-10 md:px-16 py-5 md:py-6 grid grid-cols-1 md:grid-cols-3 items-center gap-y-3 md:gap-x-8 text-center ${className}`}
    >
      {/* Monogram sits with the wordmark rather than replacing it: this
          strip is signage, and the left cell is the one that names the
          business. h-4 (16px) fits inside the ~19.5px line box the 13px
          text already generates, so the mark rides along without adding
          to the row's height — this element must not grow the band (see
          the padding note above). Decorative: the adjacent text already
          says the name, so an alt here would just repeat it. */}
      <p className={`${itemClassName} md:text-left flex items-center justify-center md:justify-start gap-2`}>
        <Monogram className="h-4 w-auto shrink-0" />
        Evelyn Grace Styles
      </p>
      <p className={itemClassName}>{tagline}</p>
      <p className={`${itemClassName} md:text-right whitespace-nowrap`}>
        Phoenix, AZ
      </p>
    </div>
  )
}
