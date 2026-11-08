// Both marks are imported (not referenced as raw "/logo-monogram.png"
// strings) so Vite resolves them through its asset pipeline — the site
// builds with base: '/evelyn-grace-styles/' for GitHub Pages, and a
// hardcoded root-absolute path silently 404s under that subpath. Same
// reasoning as the hero photos in Hero.jsx.
import monogramSrc from '../assets/images/logo-monogram.png'
import monogramCreamSrc from '../assets/images/logo-monogram-cream.png'
import lockupSrc from '../assets/images/logo-lockup.png'

/**
 * The brand marks, extracted from the supplied logo artwork as
 * transparent PNGs inked in espresso (#3A2E27 — the same token the
 * wordmark text uses). Transparent rather than baked onto a cream
 * tile so each one sits correctly on both surface colors in use
 * (bg-sand in Nav, bg-cream in MastheadHeader/Footer) with no visible
 * patch edge.
 *
 * Two marks, deliberately:
 *
 * - <Monogram> is the EG cipher alone. Used wherever the words
 *   "Evelyn Grace Styles" are *already* present as live text beside
 *   it, so repeating them inside an image would be duplicate content
 *   for a screen reader and visual redundancy for everyone else.
 * - <Lockup> is cipher + wordmark. Used only where it's the sole
 *   statement of the brand name in its block (the footer's crown).
 *
 * Sizing is caller-controlled via `className` (always a complete,
 * static utility string — never interpolated), because the right
 * optical size differs per context and none of these are square:
 * the monogram is ~1.38:1 and the lockup ~1.92:1, so callers set a
 * height and let `w-auto` derive the width rather than guessing a
 * matching pair.
 *
 * `alt` defaults to '' (decorative, hidden from assistive tech) on
 * Monogram — that is the correct default for its intended use above.
 * Callers where the mark is the only brand identifier, or is itself
 * the link target, MUST pass a real alt; Nav does.
 *
 * `tone` ('espresso' default | 'cream') picks between two separate
 * pre-inked files rather than tinting one at runtime — a transparent
 * PNG can't be recolored in CSS without a filter hack, and the marks
 * are small enough that shipping both costs less than the hack would.
 * Use 'cream' ONLY over imagery dark enough to carry it: Hero's two
 * photos are the only such surface on the site, and the espresso mark
 * measurably fails there (2.74:1 and 2.37:1 against the post-wash
 * composite, vs 4.53:1 and 5.24:1 for cream — see
 * scripts/sample-hero-colors.py). On bg-sand and bg-cream the
 * relationship inverts and 'espresso' is the only legible choice, so
 * this is not a stylistic toggle.
 */
export function Monogram({ className = 'h-6 w-auto', alt = '', tone = 'espresso' }) {
  return (
    <img
      src={tone === 'cream' ? monogramCreamSrc : monogramSrc}
      alt={alt}
      // Intrinsic size of the asset. Declared so the browser reserves
      // the right box before the PNG decodes — without it these marks
      // land inside already-painted text rows (nav bar, signage strip)
      // and shift them on load.
      width={285}
      height={206}
      className={className}
      // The marks are small, above the fold, and part of the page's
      // identity — never lazy-loaded.
      decoding="async"
    />
  )
}

export function Lockup({ className = 'h-16 w-auto', alt = 'Evelyn Grace Styles' }) {
  return (
    <img
      src={lockupSrc}
      alt={alt}
      width={549}
      height={286}
      className={className}
      decoding="async"
    />
  )
}
