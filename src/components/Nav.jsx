import { Link, useLocation } from 'react-router-dom'

// Contact is a plain anchor (every page renders its own Footer with
// id="contact"), same convention as the old Header.jsx's off-canvas
// panel used; the rest are real routes. Note this means "Contact" here
// never points at the real /contact route — a pre-existing quirk, not
// something this pass introduced or was asked to fix.
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', href: '#contact' },
]

// Same size/weight for every item, wordmark included — this bar has no
// single emphasized element. Smaller/tighter at the base (mobile)
// breakpoint than at md+: six items wrapping to two lines at narrow
// widths reads better a step down in both size and tracking than the
// desktop treatment, which is unchanged from the original inline strip.
const itemClassName =
  'font-sans font-medium uppercase tracking-[0.1em] text-[11px] md:tracking-[0.15em] md:text-xs text-espresso hover:text-terracotta transition-colors duration-200 ease-out'

// Active-page indicator: underline only — no color/weight/size change,
// so it layers on top of itemClassName rather than replacing anything
// in it.
const activeClassName = 'underline decoration-terracotta decoration-1 underline-offset-4'

// Hidden below md, not just visually de-emphasized: at the mobile
// wrap point a divider can end up orphaned at the start/end of a
// wrapped line. Below md, gap-x-4/gap-y-3 on the links wrapper (see
// below) is the only separation between items instead.
function Divider({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`hidden md:inline-block h-3 w-px bg-espresso ${className}`}
    />
  )
}

/**
 * Site-wide nav strip — the sole navigation on every page now that the
 * hamburger/off-canvas Header is gone. Not sticky, not fixed: it's a
 * normal-flow element and scrolls with the page everywhere it's used.
 *
 * `className` controls only the outer band's padding/border, because
 * that's the one thing that legitimately differs between Home (sits
 * between two full-bleed photos, no border, py-5/md:py-6 — the exact
 * classes InlineNavStrip used) and interior pages (reads as a header,
 * so it gets pt-8/pb-8/lg:pt-10/lg:pb-10 and a bottom hairline — see
 * each page for its own override). This follows the same
 * className-prop-with-a-default pattern Button/Reveal/MastheadHeader/
 * Divider already use elsewhere in this codebase, not a one-off.
 * Both the default and every override passed in are complete, static
 * strings — no interpolated/constructed class names anywhere.
 *
 * Active state: compares the current route (useLocation) against each
 * link's `to`. Underline only, per spec — text color/weight/size never
 * change for the active item, and "Evelyn Grace Styles" never receives
 * it (it's rendered outside the NAV_LINKS.map/active check entirely,
 * not just skipped by a condition). "Contact" can't become active via
 * this check either, since it's an anchor (href, no `to`) rather than
 * a route — consistent with it never having been a route.
 */
export default function Nav({ className = 'px-6 sm:px-10 py-5 md:py-6' }) {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Primary"
      className={`bg-sand flex flex-col md:flex-row items-center justify-center gap-y-3 ${className}`}
    >
      <Link to="/" className={`${itemClassName} inline-flex items-center min-h-11 md:min-h-0`}>
        Evelyn Grace Styles
      </Link>

      <Divider className="mx-5" />

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 md:gap-x-0 md:gap-y-0">
        {NAV_LINKS.map((link, i) => {
          const isActive = link.to === pathname

          return (
            <span key={link.label} className="flex items-center">
              {i > 0 && <Divider className="mx-4 md:mx-5" />}
              {link.to ? (
                <Link
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`${itemClassName} inline-flex items-center min-h-11 md:min-h-0 px-1 ${isActive ? activeClassName : ''}`}
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
          )
        })}
      </div>
    </nav>
  )
}
