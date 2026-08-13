import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'
import modelHandshake from '../../assets/images/evelyn-model-handshake.jpg'

/**
 * Narrower centered closing block, same rhythm as Home's Process
 * teaser. The handshake image is about the relationship, not the
 * clothes — it gets margin to breathe rather than bleeding edge to
 * edge like the previous section's image.
 */
export default function Closing() {
  return (
    <section className="py-24 md:py-40 lg:py-48 bg-sand">
      <div className="mx-auto max-w-xl px-6 sm:px-10 text-center">
        <Reveal>
          {/* object-top: at this 4:3 crop, center-anchored cover would
              cut through both faces (source is portrait, 0.674 ratio).
              Anchoring top keeps both faces and the joined hands in
              frame, cropping only the legs/floor below — the part of
              the photo that isn't the point. */}
          <img
            src={modelHandshake}
            alt="Evelyn and a client-style model facing each other and holding hands, both smiling, mid-conversation in a studio setting"
            className="w-full aspect-[4/3] object-cover object-top mb-10"
          />
          <p className="font-sans text-espresso leading-relaxed mb-10">
            Every wardrobe starts with a conversation, and I never forget
            that.
          </p>
          {/* Same Link + useScrollToHash reasoning as the intro section's CTA. */}
          <Button as={Link} to="/#process">
            Start the Process
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
