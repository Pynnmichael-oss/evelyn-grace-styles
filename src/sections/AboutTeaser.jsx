import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import portraitImage from '../assets/images/evelyn-portrait-close.jpg'

export default function AboutTeaser() {
  return (
    <section id="about" className="py-24 md:py-40 lg:py-48">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <Reveal>
          <img
            src={portraitImage}
            alt="Color portrait of Evelyn, a smiling blonde woman in a black long-sleeve top, seated and looking back over her shoulder"
            className="w-full aspect-[4/5] object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="md:text-left">
          <Eyebrow className="md:text-left">About Me</Eyebrow>
          <p className="font-sans text-espresso text-lg leading-relaxed mb-8 max-w-md">
            I&rsquo;m a personal style consultant with a passion for refined
            style and the art of thoughtful dressing. I curate timeless
            wardrobes with intention, creating an effortless sense of
            confidence that feels authentic to each client.
          </p>
          <a
            href="#about"
            className="font-sans text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out"
          >
            Learn more about Evelyn →
          </a>
        </Reveal>
      </div>
    </section>
  )
}
