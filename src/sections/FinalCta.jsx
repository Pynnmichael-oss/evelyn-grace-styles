import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

/**
 * Home's closing CTA — replaces the old ProcessTeaser slot now that
 * Process has been retired in favor of the Experience page. Same
 * canonical button used on About/Experience/Footer, so Home ends on
 * the same one action as the rest of the site.
 */
export default function FinalCta() {
  return (
    <section className="py-24 md:py-40 lg:py-48 bg-sand text-center">
      <Reveal>
        <Button as={Link} to="/services#consultation">
          Book Your Complimentary Consultation
        </Button>
      </Reveal>
    </section>
  )
}
