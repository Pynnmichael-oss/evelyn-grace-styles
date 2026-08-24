import { Link } from 'react-router-dom'
import MastheadHeader from '../components/MastheadHeader'
import Reveal from '../components/Reveal'
// TODO: swap these placeholder images for final photography. Imported
// (not referenced as a raw "/hero-photo-1.jpg" string) so Vite resolves
// them through its asset pipeline — the site is built with
// base: '/evelyn-grace-styles/' for GitHub Pages, and a hardcoded
// root-absolute path silently 404s under that subpath in both dev and
// production.
import heroPhoto1 from '../assets/images/hero-photo-1.jpg'
import heroPhoto2 from '../assets/images/hero-photo-2.jpg'

/**
 * Two full-bleed photos bookending a MastheadHeader, then centered intro
 * copy below. Both images sit flush at the top/edges of the page — the
 * fixed Header is transparent until scrolled (see Header.jsx), so it
 * floats over image 1 rather than pushing it down.
 *
 * The second photo mirrors the first (-scale-x-100) for the flipped,
 * bookended composition; neither image is cropped or repositioned
 * otherwise, so object-position stays centered on both.
 */
export default function Hero() {
  return (
    <section id="home">
      <img
        src={heroPhoto1}
        // TODO: replace with real descriptive alt text once the final photo is in
        alt="TODO: hero photo 1 — final alt text pending"
        className="w-full h-[75vh] md:h-screen object-cover"
      />

      <MastheadHeader tagline="A considered approach to personal style that is versatile, enduring, and uniquely you." />

      <img
        src={heroPhoto2}
        // TODO: replace with real descriptive alt text once the final photo is in
        alt="TODO: hero photo 2 — final alt text pending"
        className="w-full h-[75vh] md:h-screen object-cover -scale-x-100"
      />

      <div className="py-24 md:py-40 px-6 sm:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="font-sans text-espresso text-lg leading-relaxed mb-8">
            Thoughtful styling for women who want to feel confident,
            polished, and completely themselves in what they wear.
          </p>
          <p className="font-sans text-espresso text-lg leading-relaxed mb-8">
            I believe getting dressed should feel effortless — not because
            you have more clothes, but because you have the right pieces,
            know how to wear them, and understand what truly feels like
            you.
          </p>
          <p className="font-sans text-espresso text-lg leading-relaxed mb-10">
            Whether we&rsquo;re working with pieces already in your
            wardrobe or thoughtfully introducing something new, every
            recommendation is personal, intentional, and designed around
            the way you actually live.
          </p>
          <Link
            to="/about"
            className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
          >
            Learn More →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
