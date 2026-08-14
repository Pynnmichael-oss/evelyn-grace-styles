import Eyebrow from '../components/Eyebrow'
import MasonryGrid, { MasonryItem } from '../components/MasonryGrid'
import Reveal from '../components/Reveal'
import blackDressFull from '../assets/images/black-dress-silver-bag-full.jpg'
import denimSkirtVestFull from '../assets/images/denim-skirt-vest-full.jpg'
import silverBagDetailBw from '../assets/images/silver-bag-detail-bw.jpg'
import denimSkirtVestCrop from '../assets/images/denim-skirt-vest-crop.jpg'
import blackDressCrop from '../assets/images/black-dress-silver-bag-crop.jpg'

// Hand-verified explicit layout, 3 cols x 2 rows, zero gaps:
// col 1 = one tile spanning both rows; cols 2 and 3 each hold two
// stacked 1x1 tiles. Every tile gets both col-start and row-start so
// nothing depends on auto-placement/source order.
const LOOKBOOK_IMAGES = [
  {
    src: blackDressFull,
    alt: 'Full-length shot of a model in a black sleeveless V-neck midi dress, holding a silver beaded bucket bag, wearing black mesh flats',
    position: 'sm:col-start-1 sm:row-start-1 sm:row-span-2',
  },
  {
    src: denimSkirtVestFull,
    alt: 'Full-length shot of a model in a black button-front halter vest and a blue denim A-line midi skirt, carrying a black leather shoulder bag, with black crossover sandals',
    position: 'sm:col-start-2 sm:row-start-1',
  },
  {
    src: silverBagDetailBw,
    alt: 'Black-and-white close-up of a silver chainmail shoulder bag against bare skin, hand resting on the strap',
    position: 'sm:col-start-3 sm:row-start-1',
  },
  {
    src: denimSkirtVestCrop,
    alt: 'Waist-up crop of the black halter vest and blue denim A-line skirt, bag carried on the shoulder',
    position: 'sm:col-start-2 sm:row-start-2',
  },
  {
    src: blackDressCrop,
    alt: 'Waist-up crop of the black V-neck dress, hands clasped in front holding the silver chain-strap bag',
    position: 'sm:col-start-3 sm:row-start-2',
  },
]

export default function LookbookGallery() {
  return (
    <section className="py-24 md:py-40 lg:py-48">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <Eyebrow>The Lookbook</Eyebrow>
        </Reveal>

        <Reveal delay={100}>
          <MasonryGrid className="mt-4">
            {LOOKBOOK_IMAGES.map((image) => (
              <MasonryItem key={image.alt} position={image.position}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </MasonryItem>
            ))}
          </MasonryGrid>
        </Reveal>
      </div>
    </section>
  )
}
