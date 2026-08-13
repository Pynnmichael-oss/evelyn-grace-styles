import Eyebrow from '../components/Eyebrow'
import MasonryGrid, { MasonryItem } from '../components/MasonryGrid'
import Reveal from '../components/Reveal'
import blackDressFull from '../assets/images/black-dress-silver-bag-full.jpg'
import denimSkirtVestFull from '../assets/images/denim-skirt-vest-full.jpg'
import silverBagDetailBw from '../assets/images/silver-bag-detail-bw.jpg'
import denimSkirtVestCrop from '../assets/images/denim-skirt-vest-crop.jpg'
import blackDressCrop from '../assets/images/black-dress-silver-bag-crop.jpg'

const LOOKBOOK_IMAGES = [
  {
    src: blackDressFull,
    alt: 'Full-length shot of a model in a black sleeveless V-neck midi dress, holding a silver beaded bucket bag, wearing black mesh flats',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: denimSkirtVestFull,
    alt: 'Full-length shot of a model in a black button-front halter vest and a blue denim A-line midi skirt, carrying a black leather shoulder bag, with black crossover sandals',
    span: 'sm:col-span-1 sm:row-span-2',
  },
  {
    src: silverBagDetailBw,
    alt: 'Black-and-white close-up of a silver chainmail shoulder bag against bare skin, hand resting on the strap',
    span: 'sm:col-span-1 sm:row-span-1',
  },
  {
    src: denimSkirtVestCrop,
    alt: 'Waist-up crop of the black halter vest and blue denim A-line skirt, bag carried on the shoulder',
    span: 'sm:col-span-2 sm:row-span-1',
  },
  {
    src: blackDressCrop,
    alt: 'Waist-up crop of the black V-neck dress, hands clasped in front holding the silver chain-strap bag',
    span: 'sm:col-span-1 sm:row-span-1',
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
              <MasonryItem key={image.alt} span={image.span}>
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
