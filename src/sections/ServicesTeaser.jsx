import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'

const SERVICES = [
  {
    title: 'Virtual Styling',
    body: 'Curated outfit recommendations and direct shopping links, wherever you are.',
  },
  {
    title: 'In-Home Styling (Phoenix)',
    body: 'A personalized try-on session in the comfort of your home. You purchase only what you love.',
  },
]

export default function ServicesTeaser() {
  return (
    <section id="services" className="py-24 md:py-32 bg-sand">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>

        <div className="mt-4 grid md:grid-cols-2 gap-12 md:gap-20">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 100}>
              <h3 className="font-sans font-bold text-xl text-espresso mb-3">
                {service.title}
              </h3>
              <p className="font-sans text-espresso leading-relaxed">
                {service.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <a
            href="#process"
            className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
          >
            See how it works →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
