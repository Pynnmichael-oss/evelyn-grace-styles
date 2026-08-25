import { Link } from 'react-router-dom'

// Contact is a plain anchor (every page renders its own Footer with
// id="contact"), same convention as Header.jsx's off-canvas panel;
// the rest are real routes.
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', href: '#contact' },
]

// Same size/weight for every item, wordmark included — this bar has no
// single emphasized element, unlike Header's wordmark+icon bar.
const itemClassName =
  'font-sans font-medium uppercase tracking-[0.15em] text-xs text-espresso hover:text-terracotta transition-colors duration-200 ease-out'

// Short hairline, not a full-height rule — sits centered between items
// with generous margin on either side, distinct from a divide-x border
// (which would stretch the full height of each 44px tap target).
function Divider({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`h-3 w-px bg-espresso ${className}`}
    />
  )
}

/**
 * Home-only replacement for the persistent Header: sits directly
 * between Hero's two full-bleed photos and reads as connective tissue,
 * not its own section (see Hero.jsx) — same "thin bar between two
 * photos" role MastheadHeader used to fill, but with real nav links
 * since Home no longer renders Header at all.
 *
 * Desktop: one centered row, wordmark included, hairline dividers
 * between every item. Mobile: wordmark alone on its own line, the five
 * links wrap into a centered group below it (still divider-separated)
 * rather than scrolling horizontally.
 *
 * Every link keeps a 44px-tall tap target (matching the w-11/h-11
 * convention Header.jsx uses for its own toggle button) even though
 * the visible text is small — padding on the link, not the text size,
 * does the work. Focus states come from the global :focus-visible
 * outline in index.css; espresso-on-sand contrast is ~11:1, well clear
 * of the 4.5:1 small-text threshold at any font weight.
 */
export default function InlineNavStrip() {
  return (
    <nav
      aria-label="Primary"
      className="bg-sand px-6 sm:px-10 py-5 md:py-6 flex flex-col md:flex-row items-center justify-center gap-y-3"
    >
      <Link to="/" className={`${itemClassName} inline-flex items-center min-h-11 md:min-h-0`}>
        Evelyn Grace Styles
      </Link>

      <Divider className="hidden md:inline-block mx-5" />

      <div className="flex flex-wrap items-center justify-center">
        {NAV_LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center">
            {i > 0 && <Divider className="mx-4 md:mx-5" />}
            {link.to ? (
              <Link
                to={link.to}
                className={`${itemClassName} inline-flex items-center min-h-11 md:min-h-0 px-1`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                className={`${itemClassName} inline-flex items-center min-h-11 md:min-h-0 px-1`}
              >
                {link.label}
              </a>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
