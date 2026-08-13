import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// "to" items are react-router Links — needed for anything that isn't
// on the current page (About is its own route; Home/Services/Process
// only exist as sections on Home, so linking to them from the About
// page has to navigate there first). useScrollToHash (in App.jsx)
// handles the actual scroll once the target section is on-page.
// Contact is the one plain anchor: every page renders its own Footer
// with id="contact", so it should always target the CURRENT page's
// footer, not force a trip back to Home's.
const NAV_LINKS = [
  { label: 'Home', to: '/#home' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Sticky header — transparent over the hero, fades to a translucent
 * sand background once the page has scrolled past 80px. Nav links use
 * the same caption treatment as the wordmark/location so they never
 * compete visually with the page's one CTA button.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClassName =
    'caption-label text-[13px] text-espresso hover:text-terracotta transition-colors duration-200 ease-out'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-taupe/30 transition-colors duration-300 ease-out ${
        scrolled ? 'bg-sand/90' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
        <Link to="/#home" className="caption-label text-[13px] text-espresso">
          Evelyn Grace Styles
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className={linkClassName}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={linkClassName}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <span className="caption-label text-[13px] text-espresso whitespace-nowrap">
          Phoenix, AZ
        </span>
      </div>
    </header>
  )
}
