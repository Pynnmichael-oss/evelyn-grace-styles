import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import consultationImage from '../assets/images/evelyn-model-handshake.jpg'
import virtualStylingImage from '../assets/images/home-front-striped-trousers.jpg'
import inHomeStylingImage from '../assets/images/striped-top-angle.jpg'
import travelEventImage from '../assets/images/hero-striped-side-profile.jpg'

// The four canonical services, matching the Services page's accordion
// ids exactly — each card deep-links straight to its section there.
// Body copy reuses each item's own quote line from Services.jsx rather
// than inventing separate blurbs, so the two pages stay in one voice.
const SERVICES = [
  {
    title: '15 Minute Consultation',
    body: 'Personal Styling, start the conversation',
    image: consultationImage,
    alt: 'Evelyn and a client-style model facing each other and holding hands, both smiling, mid-conversation in a studio setting',
    to: '/services#consultation',
  },
  {
    title: 'Virtual Styling',
    body: 'Personal styling, wherever you are.',
    image: virtualStylingImage,
    alt: 'Front-facing full-length shot of a model in a striped crop top and cream wide-leg trousers, holding a black woven leather bag with both hands, white flats',
    to: '/services#virtual',
  },
  {
    title: 'In Home Styling',
    body: 'Personal styling, in the comfort of your home.',
    image: inHomeStylingImage,
    alt: 'Three-quarter angle, waist-up shot of the same striped crop top and cream trousers, one hand holding the black woven bag',
    to: '/services#in-home',
  },
  {
    title: 'Travel/Event Styling',
    body: 'Personal Styling, for every occasion.',
    image: travelEventImage,
    alt: 'Model in profile wearing a striped long-sleeve cropped top and cream wide-leg trousers, carrying a black woven leather handbag',
    to: '/services#travel-event',
  },
]

export default function ServicesTeaser() {
  return (
    <section id="services" className="py-24 md:py-40 lg:py-48 bg-sand">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>

        {/* 2x2 grid at every breakpoint per spec — deliberately not
            stacking to a single column on mobile. */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 md:gap-x-12 md:gap-y-16">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 100}>
              <Link to={service.to} className="group block">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full aspect-[4/5] object-cover mb-3 md:mb-6 transition-opacity duration-200 ease-out group-hover:opacity-90"
                />
                <h3 className="font-sans font-bold text-sm md:text-xl text-espresso mb-1 md:mb-3 group-hover:text-terracotta transition-colors duration-200 ease-out">
                  {service.title}
                </h3>
                <p className="font-sans text-espresso text-xs md:text-base leading-relaxed">
                  {service.body}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          {/* Process is gone — Experience now covers "how it works". */}
          <Link
            to="/experience"
            className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
          >
            See how it works →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
