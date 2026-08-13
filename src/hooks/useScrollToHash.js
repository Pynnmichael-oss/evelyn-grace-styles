import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route/hash change, scrolls to the element matching the URL hash
 * once it exists in the DOM. Needed because react-router doesn't
 * scroll-to-hash on its own, and cross-page links (e.g. Header's nav,
 * or About's CTAs -> Home's #process) land before fonts/images finish
 * loading, so the target hasn't settled into its final position yet
 * on the first frame — poll a few animation frames instead of
 * scrolling once.
 *
 * Uses `behavior: 'instant'`, not 'smooth' — global CSS sets
 * `scroll-behavior: smooth` on <html>, which 'auto' would inherit
 * too. A smooth scroll triggered here during a cross-page route
 * transition was reliably getting interrupted mid-animation and
 * landing back at scrollY 0 (confirmed via testing: identical calls
 * with 'instant' land correctly every time, 'smooth'/'auto' never
 * completed). Same-page anchor clicks still get the smooth CSS
 * behavior natively, since the browser handles those itself.
 */
export default function useScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)

    let attempts = 0
    let frame
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
      } else if (attempts < 20) {
        attempts += 1
        frame = requestAnimationFrame(tryScroll)
      }
    }
    tryScroll()

    return () => cancelAnimationFrame(frame)
  }, [hash, pathname])
}
