import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route/hash change, scrolls smoothly to the element matching the
 * URL hash once it exists in the DOM. Needed because react-router
 * doesn't scroll-to-hash on its own, and cross-page links (e.g. About
 * -> Home's #process) land before fonts/images finish loading, so the
 * target hasn't settled into its final position yet on the first
 * frame — poll a few animation frames instead of scrolling once.
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
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (attempts < 20) {
        attempts += 1
        frame = requestAnimationFrame(tryScroll)
      }
    }
    tryScroll()

    return () => cancelAnimationFrame(frame)
  }, [hash, pathname])
}
