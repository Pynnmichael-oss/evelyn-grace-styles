import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import heroImage from '../assets/images/hero-striped-side-profile.jpg'

/**
 * Full-bleed image on one side, hero copy on an adjacent SAND panel
 * (not overlaid on the photo) so the espresso-on-sand text-contrast
 * rule is never at risk from a busy background image.
 */
export default function Hero() {
  return (
    <section id="home" className="pt-20 grid md:grid-cols-2 min-h-[90vh] md:min-h-screen">
      <img
        src={heroImage}
        alt="Model in profile wearing a striped long-sleeve cropped top and cream wide-leg trousers, carrying a black woven leather handbag"
        // object-top keeps the crop anchored to the upper-center of the
        // frame so narrow viewports don't cut off her face.
        className="w-full h-[50vh] md:h-auto object-cover object-top"
        fetchPriority="high"
      />

      <div className="flex items-center bg-sand px-6 sm:px-10 md:px-16 py-16 md:py-0">
        <Reveal className="max-w-md mx-auto md:mx-0">
          <Eyebrow>Evelyn Grace Styles</Eyebrow>
          <h1 className="font-serif font-light text-[2.5rem] md:text-6xl leading-[1.1] text-espresso mb-10">
            A considered approach to styling timeless pieces that are
            versatile, enduring, and uniquely you.
          </h1>
          <Button as="a" href="#process">
            Start the Process
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
