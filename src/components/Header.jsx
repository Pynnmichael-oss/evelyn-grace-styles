import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-taupe/30 transition-colors duration-300 ease-out ${
        scrolled ? 'bg-sand/90' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
        <a href="#home" className="caption-label text-[13px] text-espresso">
          Evelyn Grace Styles
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="caption-label text-[13px] text-espresso hover:text-terracotta transition-colors duration-200 ease-out"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="caption-label text-[13px] text-espresso whitespace-nowrap">
          Phoenix, AZ
        </span>
      </div>
    </header>
  )
}
