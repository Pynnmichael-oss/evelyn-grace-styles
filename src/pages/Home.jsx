import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import AboutTeaser from '../sections/AboutTeaser'
import ServicesTeaser from '../sections/ServicesTeaser'
import LookbookGallery from '../sections/LookbookGallery'
import ProcessTeaser from '../sections/ProcessTeaser'

export default function Home() {
  return (
    <div className="bg-sand">
      <Header />
      <main>
        <Hero />
        <AboutTeaser />
        <ServicesTeaser />
        <LookbookGallery />
        <ProcessTeaser />
      </main>
      <Footer />
    </div>
  )
}
