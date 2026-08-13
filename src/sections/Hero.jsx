import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Reveal from '../components/Reveal'

/**
 * Full-bleed image on one side, hero copy on an adjacent SAND panel
 * (not overlaid on the photo) so the espresso-on-sand text-contrast
 * rule is never at risk from a busy background image.
 */
export default function Hero() {
  return (
    <section id="home" className="pt-20 grid md:grid-cols-2 min-h-[90vh] md:min-h-screen">
      <ImagePlaceholder
        alt="Model in cream wide-leg trousers and striped crop top, side profile, carrying woven leather bag"
        className="w-full h-[50vh] md:h-auto"
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
