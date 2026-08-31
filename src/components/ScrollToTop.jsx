import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position to the top on every route change, sitewide.
 * Renders nothing — behavior-only.
 *
 * Explicitly passes `behavior: 'instant'` rather than omitting it.
 * Global CSS sets `scroll-behavior: smooth` on <html> (see index.css),
 * which the default 'auto' behavior would inherit, animating the jump
 * instead of snapping to it — the same issue already documented in
 * useScrollToHash. Smooth scroll on a route change is disorienting,
 * so this forces an instant jump regardless of that global setting.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
