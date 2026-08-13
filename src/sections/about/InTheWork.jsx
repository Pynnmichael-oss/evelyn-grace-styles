import Eyebrow from '../../components/Eyebrow'
import Reveal from '../../components/Reveal'
import stylingBehindScenes from '../../assets/images/evelyn-styling-behind-scenes.jpg'

/**
 * Photography-led section — the image carries this one. Just a small
 * centered eyebrow for orientation; no heading, no body copy.
 */
export default function InTheWork() {
  return (
    <section className="pb-24 md:pb-32 lg:pb-40">
      <Reveal>
        <Eyebrow>How She Works</Eyebrow>
      </Reveal>

      <Reveal delay={100}>
        {/* Full width, natural aspect ratio — no forced vh height/crop.
            The source is portrait-oriented (0.674 ratio); forcing it
            into a wide short banner via object-cover was cropping off
            both women's heads on wide viewports. This stays full-bleed
            horizontally without losing any of the frame. */}
        <img
          src={stylingBehindScenes}
          alt="Evelyn adjusting the neckline of a black V-neck dress on a model with curly hair, who is holding a silver chain-strap bag, mid fitting session"
          className="w-full h-auto"
        />
      </Reveal>
    </section>
  )
}
