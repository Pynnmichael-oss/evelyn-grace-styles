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
      <p className={`${itemClassName} md:text-left`}>Evelyn Grace Styles</p>
      <p className={itemClassName}>{tagline}</p>
      <p className={`${itemClassName} md:text-right whitespace-nowrap`}>
        Phoenix, AZ
      </p>
    </div>
  )
}
