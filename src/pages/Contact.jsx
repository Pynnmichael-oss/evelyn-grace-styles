import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
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
      {/* Shared page-frame pass: the previous turn deliberately left this
          bespoke pt-32/md:pt-40/lg:pt-48 + pb-24/md:pb-40/lg:pb-48
          untouched because it wasn't clear how much was "80px
          fixed-header clearance" vs. intentional vertical-centering
          headroom. This pass has an explicit directive to apply the
          site-wide pt-16/lg:pt-28 (nav-to-content) / pb-20/lg:pb-32
          (content-to-footer) rhythm everywhere, so it's applied here
          too now — min-h-screen/flex items-center (the centering
          mechanism itself, not a spacing value) is kept. Container
          widened max-w-[640px] -> max-w-[1200px] per spec (functional-UI
          page) — the form itself has no separate inner max-width, so it
          now spans meaningfully wider than before; worth a visual check
          after deploy. */}
      <main className="pt-16 pb-20 lg:pt-28 lg:pb-32 min-h-screen flex items-center">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 w-full">
          <Reveal className="text-center">
            {/* Shared heading pattern: existing copy kept verbatim
                ("Contact" label, "Let's get started." heading), only
                the styling and element type change — h2 -> h1, since
                this page previously had no h1 at all. */}
            {/* text-2xl, not the spec's literal text-xs — measured
                terracotta-deep on sand at 4.032:1, which fails WCAG AA's
                4.5:1 for normal-size text (General Sans only loads
                weights 400/500 site-wide, so the "large text" bold
                exception isn't available either). text-2xl (24px) is
                the smallest size that legitimately clears the large-text
                3:1 threshold at this color — same fix already applied
                on About's two terracotta-deep labels. */}
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep mb-4">
              Contact
            </p>
            <h1 className="font-serif font-light text-3xl lg:text-5xl text-balance text-espresso mb-4">
              Let&rsquo;s get started.
            </h1>
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
