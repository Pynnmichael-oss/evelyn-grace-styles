import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Divider from '../components/Divider'
import Reveal from '../components/Reveal'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoealjwp'

const CONTACT_PHONE = '(830) 456-4916'
const CONTACT_PHONE_TEL = 'tel:+18304564916'

// TODO: replace with confirmed email address — source slide has
// a typo (missing "." before "com"), do not use as-is
const CONTACT_EMAIL = 'hello@evelyngracestyles.com'

const linkClassName =
  'text-espresso hover:text-terracotta underline decoration-transparent hover:decoration-terracotta underline-offset-4 transition-colors duration-200 ease-out'

const fieldClassName =
  'w-full bg-cream border border-taupe/40 px-4 py-3 font-sans text-espresso placeholder:text-espresso/40'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      {/* main's own pt-32/md:pt-40/lg:pt-48 is left exactly as it was
          before this pass — unlike About/Experience/Services/Shop,
          these values don't cleanly decompose into "80px fixed-header
          clearance + something else" (pt and pb only converge at
          md/lg, and this layout is also min-h-screen-centered), so
          reducing them risked guessing wrong at the vertical balance
          rather than fixing a real problem. Flagged in the audit;
          checked the rendered result visually instead of assuming. */}
      <main className="pt-32 pb-24 md:pt-40 md:pb-40 lg:pt-48 lg:pb-48 min-h-screen flex items-center">
        <div className="mx-auto max-w-[640px] px-6 sm:px-10 w-full">
          <Reveal className="text-center">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-espresso mb-4">
              Let&rsquo;s get started.
            </h2>
            <p className="font-sans text-espresso leading-relaxed mb-10 max-w-md mx-auto">
              Send a few details about what you&rsquo;re looking for, and
              I&rsquo;ll follow up to schedule a 15-minute consultation.
            </p>

            {/* Live region so screen readers announce the submit result. */}
            <div aria-live="polite">
              {status === 'success' && (
                <p className="font-sans text-espresso leading-relaxed mb-10">
                  Thanks — I&rsquo;ll be in touch within a day or two.
                </p>
              )}
              {status === 'error' && (
                <p className="font-sans text-espresso leading-relaxed mb-6">
                  Something went wrong sending that — please try again, or
                  reach out directly below.
                </p>
              )}
            </div>

            {status !== 'success' && (
              <form
                onSubmit={handleSubmit}
                className="text-left space-y-6 mb-16"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="caption-label text-[13px] text-espresso block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="caption-label text-[13px] text-espresso block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="caption-label text-[13px] text-espresso block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about what you need styled — where you're headed, the vibe you're going for, and whether you'd like to work with your current wardrobe or shop for something new."
                    className={`${fieldClassName} resize-none`}
                  />
                </div>

                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    disabled={status === 'sending'}
                    className="disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Start the Process'}
                  </Button>
                </div>
              </form>
            )}

            <Divider />

            <p className="font-sans text-espresso leading-relaxed mb-3">
              Prefer to reach out directly?
            </p>
            <p className="font-sans leading-relaxed">
              <a href={CONTACT_PHONE_TEL} className={linkClassName}>
                {CONTACT_PHONE}
              </a>
            </p>
            <p className="font-sans leading-relaxed">
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </main>
      {/* showCta=false — the contact form on this page is its own
          primary CTA. */}
      <Footer showCta={false} />
    </div>
  )
}
