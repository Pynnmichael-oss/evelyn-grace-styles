import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AccordionItem from '../components/AccordionItem'
import BookingCalendar from '../components/BookingCalendar'
import Reveal from '../components/Reveal'
import RequestForm from '../sections/services/RequestForm'

const REQUEST_MESSAGE_PLACEHOLDER =
  'Message including preferred dates and times for your consultation'

// Bullet lists repeat constantly in this page's copy (all in the same
// font-sans/leading-relaxed treatment) — pulled the <ul> markup out once
// rather than retyping the same classes a dozen times.
function List({ items }) {
  return (
    <ul className="list-disc pl-5 space-y-2 font-sans text-espresso leading-relaxed mb-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Lead({ children }) {
  return <p className="font-sans font-medium text-espresso mb-3">{children}</p>
}

/**
 * Four-item accordion, single-open (click a closed one to swap which
 * panel is expanded — see AccordionItem for the height-transition
 * mechanics). Item 1 ("consultation") is the only one wired to
 * BookingCalendar; items 2–4 share the RequestForm pattern instead,
 * since they're a plain request-a-time-that-works-for-you form rather
 * than a date/time picker.
 */
export default function Services() {
  const [openId, setOpenId] = useState('consultation')

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="bg-sand">
      <Nav className="px-6 sm:px-10 pt-8 pb-8 lg:pt-10 lg:pb-10 border-b border-taupe/30" />
      <main>
        {/* Shared page-frame pass: MastheadHeader removed (duplicated
            Nav's wordmark; see Experience.jsx for the fuller note on
            what that drops — same reasoning applies here). Container
            widened max-w-3xl -> max-w-[1200px] (functional-UI page per
            spec — this accordion needs the width) and the nav-to-content
            gap standardized to pt-16/lg:pt-28.
            No heading conversion here: "Services" is the only text this
            page had above the accordion — no separate Fraunces headline
            exists to convert, and the spec says not to invent one. Only
            "Services" itself is restyled to the new label treatment. */}
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 pt-16 lg:pt-28 pb-24 md:pb-40 lg:pb-48">
          <Reveal className="text-center mb-4">
            {/* text-2xl, not the spec's literal text-xs — measured
                terracotta-deep on sand at 4.032:1, which fails WCAG AA's
                4.5:1 for normal-size text (General Sans only loads
                weights 400/500 site-wide, so the "large text" bold
                exception isn't available either). text-2xl (24px) is
                the smallest size that legitimately clears the large-text
                3:1 threshold at this color — same fix already applied
                on About's two terracotta-deep labels. */}
            <p className="font-sans uppercase tracking-[0.22em] text-2xl text-terracotta-deep">
              Services
            </p>
          </Reveal>

          <div>
            <AccordionItem
              id="consultation"
              title="15 Minute Consultation"
              quote="Personal Styling, start the conversation"
              isOpen={openId === 'consultation'}
              onToggle={() => toggle('consultation')}
            >
              <p className="font-sans text-espresso leading-relaxed mb-6">
                A complimentary consultation for first-time clients who are
                interested in working together. This is a chance for us to
                get to know each other, talk through your personal style,
                and figure out what kind of styling support would be most
                helpful to you.
              </p>

              <Lead>This service is perfect for you if:</Lead>
              <List
                items={[
                  'You’re ready to reconnect with your personal style but aren’t sure where to start.',
                  'You’re looking for guidance before investing in new pieces.',
                  'You have an event, trip, or change in your life coming up that you’d like help dressing for.',
                  'You want a second set of eyes—and someone to occasionally push you just outside your comfort zone.',
                ]}
              />

              <Lead>What you get:</Lead>
              <List
                items={[
                  'A complimentary styling consultation',
                  'A conversation about your personal style, lifestyle, wardrobe, and goals',
                  'The opportunity to talk through your styling challenges, upcoming events, or travel plans',
                  'Personalized recommendations for how we might work together',
                ]}
              />

              <p className="font-sans text-espresso leading-relaxed mb-8">
                No prerequisites necessary — I&rsquo;m here to answer any
                questions.
              </p>

              <BookingCalendar />
            </AccordionItem>

            <AccordionItem
              id="virtual"
              title="Virtual Styling"
              quote="Personal styling, wherever you are."
              isOpen={openId === 'virtual'}
              onToggle={() => toggle('virtual')}
            >
              <Lead>This service is perfect for you if:</Lead>
              <List
                items={[
                  'You have pieces in your closet you love but aren’t quite sure how to wear.',
                  'You find yourself reaching for the same outfits and want new ways to style what you already own.',
                  'You’re looking to add a few thoughtful pieces to your wardrobe, but aren’t sure where to start.',
                  'You want a second opinion when shopping or getting dressed—and someone to help you see your wardrobe a little differently.',
                ]}
              />

              <Lead>What you get:</Lead>
              <List
                items={[
                  'A 1-2 hour styling consultation',
                  'Help styling outfits built around pieces you already own',
                  'Thoughtful recommendations for pieces that fill gaps or complete your wardrobe',
                  'Styling notes and repeatable outfit formulas to help you feel more confident creating future looks',
                  'Curated shopping selections with direct links on ShopMy',
                  'Personalized feedback articulating your style, lifestyle, wardrobe, and goals',
                ]}
              />

              <Lead>Before we meet:</Lead>
              <p className="font-sans text-espresso leading-relaxed mb-3">
                A little preparation will help us make the most of our time
                together.
              </p>
              <List
                items={[
                  'Have a few of your go-to pieces nearby. Pull out the items you find yourself wearing most often, along with anything you love but aren’t quite sure how to style.',
                  'Share a little inspiration. Send over a few photos of outfits or styles you love. They can be looks you’ve worn yourself or images you’ve saved for inspiration. This helps me get a feel for what you’re drawn to.',
                  'Set yourself up for the session. Choose a space with a full-length mirror, good lighting, and a reliable internet connection. If possible, join from your computer, so your phone is free to take photos.',
                  'Take photos as we go. We’ll capture the looks we create together so you’ll have them to reference later—including the unexpected combinations you might not think to try on your own.',
                ]}
              />

              <RequestForm
                idPrefix="virtual"
                serviceLabel="Virtual Styling"
                messagePlaceholder={REQUEST_MESSAGE_PLACEHOLDER}
                buttonLabel="Request a Consultation"
              />
            </AccordionItem>

            <AccordionItem
              id="in-home"
              title="In Home Styling"
              quote="Personal styling, in the comfort of your home."
              isOpen={openId === 'in-home'}
              onToggle={() => toggle('in-home')}
            >
              <Lead>This service is perfect for you if:</Lead>
              <List
                items={[
                  'You feel like you have a closet full of clothes but nothing to wear',
                  'You want to find new ways to style pieces you already own',
                  'You want a second set of eyes when shopping and are ready to invest in a few key pieces.',
                  'You want a more cohesive wardrobe that feels like you.',
                ]}
              />

              <Lead>What you get:</Lead>
              <List
                items={[
                  'A 2 hour in-person styling consultation',
                  'Help reviving existing pieces by styling new outfit combinations using what you already own',
                  'Thoughtful recommendations for pieces that fill gaps or complete your wardrobe',
                  'Styling notes and repeatable outfit formulas to help you feel more confident creating future looks',
                  'Guidance on what to keep, tailor, replace, or let go',
                  'Curated shopping selections with direct links on ShopMy',
                  'Pictures of all of the looks we style for you to reference later',
                ]}
              />

              <Lead>Before we meet:</Lead>
              <List
                items={[
                  'Have your wardrobe ready to explore.',
                  'Set aside any pieces you’re unsure about. Bring out the things you love but don’t wear often, as well as anything you’ve been struggling to style.',
                  'Think about where you feel stuck. Whether it’s getting dressed for work, creating everyday outfits, or knowing what to shop for next, we’ll use our time to focus on what would be most helpful to you.',
                  'Come ready to try things on. We’ll experiment with different combinations and photograph the looks you want to remember.',
                ]}
              />

              <RequestForm
                idPrefix="in-home"
                serviceLabel="In Home Styling"
                messagePlaceholder={REQUEST_MESSAGE_PLACEHOLDER}
                buttonLabel="Book a Consultation"
              />
            </AccordionItem>

            <AccordionItem
              id="travel-event"
              title="Travel/Event Styling"
              quote="Personal Styling, for every occasion."
              isOpen={openId === 'travel-event'}
              onToggle={() => toggle('travel-event')}
            >
              <Lead>This service is perfect for you if:</Lead>
              <List
                items={[
                  'You have a trip coming up and aren’t sure what to pack.',
                  'You want to look and feel your best for a wedding, celebration, or special event.',
                  'You need outfits for a specific itinerary, dress code, destination, or occasion.',
                  'You’d rather have a plan than spend the night before your trip trying on everything in your closet.',
                  'You want to make sure the pieces you buy will work with what you already own.',
                ]}
              />

              <Lead>What&rsquo;s included:</Lead>
              <List
                items={[
                  'A 1-2 hour styling consultation (optional: in-home)',
                  'Complete outfit ideas for your trip or event',
                  'Styling using pieces you already own',
                  'Thoughtful recommendations for anything that’s missing',
                  'Curated shopping selections with direct links on ShopMy',
                  'Guidance on maximizing how to mix and match styling each item you pack.',
                  'Pictures of your looks so you walk away confident and prepared for your trip or event.',
                ]}
              />

              <Lead>Before we meet:</Lead>
              <List
                items={[
                  'Share your itinerary or event details, including any dress codes, activities, and reservations.',
                  'Let me know what you already have in mind to wear. We’ll build around the pieces you love and identify anything else you’ll need.',
                  'Share a few inspiration images if there’s a particular look or feeling you’re going for.',
                  'If we’re styling for travel, have your luggage or preferred suitcase size in mind so we can keep the wardrobe realistic and easy to pack.',
                  'Be ready to try things on. We’ll put complete looks together and photograph your favorites so you can refer back to them when you’re getting dressed.',
                ]}
              />

              <RequestForm
                idPrefix="travel-event"
                serviceLabel="Travel/Event Styling"
                messagePlaceholder={REQUEST_MESSAGE_PLACEHOLDER}
                buttonLabel="Book a Consultation"
              />
            </AccordionItem>
          </div>
        </div>
      </main>
      {/* showCta=false — this page's booking calendar / request form is
          its own primary CTA. */}
      <Footer showCta={false} />
    </div>
  )
}
