import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Divider from '../components/Divider'
import Reveal from '../components/Reveal'

export default function ProcessTeaser() {
  return (
    <section id="process" className="py-24 md:py-32 bg-sand">
      <div className="mx-auto max-w-xl px-6 sm:px-10 text-center">
        <Reveal>
          <Eyebrow>The Process</Eyebrow>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-espresso mb-6">
            Getting started is simple.
          </h2>
          <p className="font-sans text-espresso leading-relaxed mb-10">
            Text or email a brief description of what you need styled, and
            we&rsquo;ll schedule a 15-minute consultation.
          </p>
          <Button as="a" href="#contact">
            Start the Process
          </Button>
        </Reveal>
      </div>
      <Divider />
    </section>
  )
}
