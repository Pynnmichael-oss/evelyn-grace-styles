import { useMemo, useState } from 'react'
import Button from './Button'

// Reuses the site's one Formspree endpoint (same as Contact.jsx) —
// submissions are distinguished by the _subject/service fields below
// rather than a separate form ID.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xoealjwp'

const TIME_SLOTS = [
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '1:00',
  '1:30',
  '2:00',
  '2:30',
]

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})
const FULL_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// Mon–Fri grid for one calendar month, padded with `null` cells so every
// week lines up under the Sun–Sat header regardless of what day the 1st
// falls on.
function buildMonthGrid(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const leadingBlanks = new Date(year, month, 1).getDay() // 0 = Sun
  const cells = []
  for (let i = 0; i < leadingBlanks; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const fieldClassName =
  'w-full bg-sand border border-taupe/40 px-4 py-3 font-sans text-espresso placeholder:text-espresso/40'

/**
 * Month-view request-a-time calendar. Not a live-availability
 * scheduler — every weekday in the current and next month is offered
 * as a request slot; weekends are shown but inert. Selecting a date
 * reveals a time dropdown, then a name/email/message form; submitting
 * posts everything to Formspree and swaps in a short confirmation.
 *
 * Standalone by design (no props required) so it can be dropped into
 * any page/section that needs a booking request flow.
 */
export default function BookingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [monthOffset, setMonthOffset] = useState(0) // 0 = this month, 1 = next month (only two offered)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const viewDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [today, monthOffset]
  )

  const cells = useMemo(
    () => buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  )

  const isAvailable = (date) => {
    if (!date || date < today) return false
    const day = date.getDay()
    return day !== 0 && day !== 6 // weekdays only
  }

  const isSelected = (date) =>
    selectedDate && startOfDay(selectedDate).getTime() === startOfDay(date).getTime()

  const handleSelectDate = (date) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const handleFieldChange = (e) => {
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
          _subject: 'New consultation booking request',
          date: FULL_DATE_FORMATTER.format(selectedDate),
          time: selectedTime,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-cream px-6 py-10 md:px-10 md:py-12 text-center" aria-live="polite">
        <p className="font-sans text-espresso leading-relaxed">
          Thanks — I&rsquo;ll confirm your time by email shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-cream px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => setMonthOffset(0)}
          disabled={monthOffset === 0}
          aria-label="Previous month"
          className="caption-label text-[13px] text-espresso hover:text-terracotta transition-colors duration-200 ease-out disabled:opacity-30 disabled:pointer-events-none px-2 py-2"
        >
          ←
        </button>
        <p aria-live="polite" className="font-serif text-lg text-espresso">
          {MONTH_FORMATTER.format(viewDate)}
        </p>
        <button
          type="button"
          onClick={() => setMonthOffset(1)}
          disabled={monthOffset === 1}
          aria-label="Next month"
          className="caption-label text-[13px] text-espresso hover:text-terracotta transition-colors duration-200 ease-out disabled:opacity-30 disabled:pointer-events-none px-2 py-2"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2" aria-hidden="true">
        {WEEKDAY_LABELS.map((label) => (
          <p key={label} className="caption-label text-[11px] text-espresso/60 text-center">
            {label}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />

          if (!isAvailable(date)) {
            // Weekend / past day — plain, non-interactive, greyed out.
            return (
              <div key={i} className="flex items-center justify-center">
                <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm font-sans text-taupe">
                  {date.getDate()}
                </span>
              </div>
            )
          }

          const selected = isSelected(date)

          return (
            <div key={i} className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleSelectDate(date)}
                aria-pressed={selected}
                aria-label={`${FULL_DATE_FORMATTER.format(date)} — available`}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm font-sans transition-colors duration-200 ease-out ${
                  selected
                    ? // Filled with terracotta-deep rather than the
                      // lighter base terracotta used for the outline:
                      // cream text on base terracotta only clears
                      // ~3:1 contrast, well under the 4.5:1 normal-text
                      // minimum. terracotta-deep (the same fill already
                      // used for the site's one Button style) clears it.
                      'border border-terracotta-deep bg-terracotta-deep text-cream'
                    : 'border border-terracotta text-espresso hover:bg-terracotta/10'
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>

      {selectedDate && (
        <div className="mt-8 pt-8 border-t border-taupe/40">
          <label
            htmlFor="booking-time"
            className="caption-label text-[13px] text-espresso block mb-2"
          >
            Time
          </label>
          <select
            id="booking-time"
            name="time"
            required
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className={`${fieldClassName} mb-6`}
          >
            <option value="" disabled>
              Select a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {selectedTime && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="booking-name"
                  className="caption-label text-[13px] text-espresso block mb-2"
                >
                  Enter your name
                </label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleFieldChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="booking-email"
                  className="caption-label text-[13px] text-espresso block mb-2"
                >
                  Enter your email
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleFieldChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="booking-message"
                  className="caption-label text-[13px] text-espresso block mb-2"
                >
                  Message (optional)
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleFieldChange}
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
                  {status === 'sending' ? 'Sending…' : 'Book a Time'}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
