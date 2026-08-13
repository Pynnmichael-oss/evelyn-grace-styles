import Eyebrow from '../components/Eyebrow'
import MasonryGrid, { MasonryItem } from '../components/MasonryGrid'
import ImagePlaceholder from '../components/ImagePlaceholder'
import Reveal from '../components/Reveal'

const LOOKBOOK_IMAGES = [
  {
    alt: 'Full-length outfit shot, tailored camel coat over a cream knit and trousers, studio light',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    alt: 'Close-up of layered gold jewelry and a silk scarf detail',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    alt: 'Editorial shot, model in a black tailored blazer leaning against a stone wall',
    span: 'sm:col-span-1 sm:row-span-2',
  },
  {
    alt: 'Flat lay of a curated capsule wardrobe, neutral tones, folded on linen',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    alt: 'Model walking outdoors in a linen midi dress and woven sandals',
    span: 'sm:col-span-2 sm:row-span-1',
  },
  {
    alt: 'Close-up of a hand adjusting a leather belt over wide-leg trousers',
    span: 'sm:col-span-1 sm:row-span-1',
  },
]

export default function LookbookGallery() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <Eyebrow>The Lookbook</Eyebrow>
        </Reveal>

        <Reveal delay={100}>
          <MasonryGrid className="mt-4">
            {LOOKBOOK_IMAGES.map((image) => (
              <MasonryItem key={image.alt} span={image.span}>
                <ImagePlaceholder alt={image.alt} className="w-full h-full" />
              </MasonryItem>
            ))}
          </MasonryGrid>
        </Reveal>
      </div>
    </section>
  )
}
