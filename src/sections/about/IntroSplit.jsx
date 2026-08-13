import { Link } from 'react-router-dom'
import Eyebrow from '../../components/Eyebrow'
import Button from '../../components/Button'
import Reveal from '../../components/Reveal'
import portraitWide from '../../assets/images/evelyn-portrait-wide.jpg'

/**
 * Two-column intro: large portrait left (~50-55% width via md:w-[55%]
 * on the image column), copy right. Stacks image-on-top on mobile.
 * Eyebrow is deliberately left-aligned here (not the standard
 * centered treatment) to sit naturally against left-aligned body copy
 * in a two-column layout.
 */
export default function IntroSplit() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        <Reveal className="w-full md:w-[55%]">
          <img
            src={portraitWide}
            alt="Black-and-white portrait of Evelyn, seated and turned toward the camera with a warm smile, wearing a black long-sleeve top, hand resting on her knee"
            className="w-full aspect-[4/5] object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="w-full md:w-[45%] text-left">
          <Eyebrow className="text-left">About Me</Eyebrow>
          <h1 className="font-serif font-light text-[2.5rem] md:text-6xl leading-[1.1] text-espresso mb-6">
            Evelyn Grace
          </h1>
          <p className="font-sans text-espresso text-lg leading-relaxed mb-8 max-w-md">
            I&rsquo;m a personal style consultant with a passion for refined
            style and the art of thoughtful dressing. I curate timeless
            wardrobes with intention, creating an effortless sense of
            confidence that feels authentic to each client.
          </p>
          {/* Client-side link back to Home's Process section — there's
              no local #process target on this page, and this CTA's
              job is the same one it does everywhere else on the site.
              Using Link (not a hard <a href>) plus useScrollToHash in
              App.jsx avoids the cross-page hash-scroll race where the
              browser's one-time scroll-to-fragment fires before fonts
              and images finish loading and shift the layout. */}
          <Button as={Link} to="/#process">
            Start the Process
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
