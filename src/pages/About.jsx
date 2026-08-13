import Header from '../components/Header'
import Footer from '../components/Footer'
import IntroSplit from '../sections/about/IntroSplit'
import InTheWork from '../sections/about/InTheWork'
import Closing from '../sections/about/Closing'

export default function About() {
  return (
    <div className="bg-sand">
      <Header />
      <main>
        <IntroSplit />
        <InTheWork />
        <Closing />
      </main>
      <Footer />
    </div>
  )
}
