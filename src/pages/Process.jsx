import Header from '../components/Header'
import Footer from '../components/Footer'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Reveal from '../components/Reveal'

/**
 * Intentionally text-only — no imagery. After Home's hero, About's
 * portraits, and the lookbook gallery, a quiet all-copy page is the
 * right contrast: its only job is to say exactly how to start, and a
 * photo here would compete with that instead of helping it.
 */
export default function Process() {
  return (
    <div className="bg-sand">
      <Header />
      <main className="pt-32 pb-24 md:pt-40 md:pb-40 lg:pt-48 lg:pb-48 min-h-screen flex items-center">
        <div className="mx-auto max-w-[640px] px-6 sm:px-10">
          <Reveal className="text-center">
            <Eyebrow>The Process</Eyebrow>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-espresso mb-8">
              Getting started is simple.
            </h2>

            <div className="text-left">
              <p className="font-sans text-espresso leading-relaxed mb-6">
                Text or email me with a brief description of what you need
                styled.
              </p>

              <p className="font-sans text-espresso leading-relaxed mb-3">
                Helpful details include:
              </p>
              <ul className="font-sans text-espresso leading-relaxed mb-6 list-disc pl-5 space-y-1">
                <li>Where you&rsquo;re going/your everyday lifestyle.</li>
                <li>The vibe or feeling you want to capture.</li>
                <li>
                  Whether you&rsquo;d like to style your current wardrobe or
                  shop for something new.
                </li>
              </ul>

              <p className="font-sans text-espresso leading-relaxed mb-10">
                We&rsquo;ll schedule a 15-minute consultation to discuss your
                needs and determine the best styling approach.
              </p>
            </div>

            {/* Points at the actual first action the copy describes
                ("text or email me"), same address as the Footer's
                contact link — not "#process", since this page IS
                that destination already. */}
            <Button as="a" href="mailto:hello@evelyngracestyles.com">
              Start the Process
            </Button>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  )
}
