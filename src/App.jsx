import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import useScrollToHash from './hooks/useScrollToHash'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  useScrollToHash()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
