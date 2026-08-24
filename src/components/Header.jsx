import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// The wordmark is the ONLY way back to "/" — no separate "Home" entry
// anywhere. "Contact" is a plain anchor (every page renders its own
// Footer with id="contact"); the rest are real routes.
const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Minimal nav bar — wordmark left, three-vertical-bar menu toggle right.
 * No page list is ever visible in the bar itself; all navigation lives
 * in the off-canvas panel this toggle opens. Bar stays transparent
 * until scrolled past 80px, same as before.
 *
 * The toggle button doubles as the close control: the three bars morph
 * into an X (outer two rotate ±45°, middle fades) via the same
 * rotate-to-form-a-symbol trick AccordionItem uses for its +/× glyph,
 * so there's exactly one control, not a second dismiss button floating
 * inside the panel.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll while the panel is open, move focus into it,
  // and return focus to the toggle on close.
  useEffect(() => {
    if (!open) return

    const toggleEl = toggleRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      // Simple two-endpoint focus trap: the toggle button and the
      // panel's focusable links are the whole tab loop while open.
      const focusable = [toggleRef.current, ...panelRef.current.querySelectorAll('a')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      toggleEl?.focus()
    }
  }, [open])

  const closePanel = () => setOpen(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-taupe/30 transition-colors duration-300 ease-out ${
        scrolled ? 'bg-sand/90' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-sm uppercase tracking-[0.15em] text-espresso"
        >
          Evelyn Grace Styles
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="w-11 h-11 flex items-center justify-center -mr-2"
        >
          <span className="relative w-4 h-5" aria-hidden="true">
            <span
              className={`absolute top-0 left-0 w-[1.5px] h-5 bg-espresso transition-all duration-300 ease-out ${
                open ? 'rotate-45 translate-x-[7px]' : ''
              }`}
            />
            <span
              className={`absolute top-0 left-[7px] w-[1.5px] h-5 bg-espresso transition-opacity duration-200 ease-out ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute top-0 right-0 w-[1.5px] h-5 bg-espresso transition-all duration-300 ease-out ${
                open ? '-rotate-45 -translate-x-[7px]' : ''
              }`}
            />
          </span>
        </button>
      </div>

      {/* Backdrop — sits below the bar (so the wordmark/toggle stay
          crisp above it) but above page content; click to close. */}
      <div
        onClick={closePanel}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-espresso/40 transition-opacity duration-300 ease-out ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        id="nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed top-0 right-0 z-[60] h-full w-full max-w-xs bg-cream px-10 py-24 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav aria-label="Primary" className="flex flex-col items-start gap-8">
          {NAV_LINKS.map((link, i) =>
            link.to ? (
              <Link
                key={link.label}
                ref={i === 0 ? firstLinkRef : undefined}
                to={link.to}
                onClick={closePanel}
                className="font-serif font-light text-3xl text-espresso hover:text-terracotta transition-colors duration-200 ease-out"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={closePanel}
                className="font-serif font-light text-3xl text-espresso hover:text-terracotta transition-colors duration-200 ease-out"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  )
}
