import { useState } from 'react'
import Button from '../../components/Button'

// Same Formspree endpoint as Contact.jsx and BookingCalendar — the
// `service` field tells submissions apart in the inbox.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoealjwp'

const fieldClassName =
  'w-full bg-cream border border-taupe/40 px-4 py-3 font-sans text-espresso placeholder:text-espresso/40'

/**
 * The name/email/message request form repeated (with different copy)
 * across the Virtual, In Home, and Travel/Event accordion items — pulled
 * out once rather than duplicated three times.
 */
export default function RequestForm({ idPrefix, serviceLabel, messagePlaceholder, buttonLabel }) {
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
        body: JSON.stringify({
          _subject: `New ${serviceLabel} request`,
          service: serviceLabel,
          ...form,
        }),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-sans text-espresso leading-relaxed" aria-live="polite">
        Thanks — I&rsquo;ll be in touch within a day or two.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor={`${idPrefix}-name`}
          className="caption-label text-[13px] text-espresso block mb-2"
        >
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
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
          htmlFor={`${idPrefix}-email`}
          className="caption-label text-[13px] text-espresso block mb-2"
        >
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
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
          htmlFor={`${idPrefix}-message`}
          className="caption-label text-[13px] text-espresso block mb-2"
        >
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={messagePlaceholder}
          className={`${fieldClassName} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="font-sans text-espresso leading-relaxed" aria-live="polite">
          Something went wrong sending that — please try again.
        </p>
      )}

      <div className="text-center pt-2">
        <Button
          type="submit"
          disabled={status === 'sending'}
          className="disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : buttonLabel}
        </Button>
      </div>
    </form>
  )
}
