import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Process from './pages/Process'
import Contact from './pages/Contact'
import useScrollToHash from './hooks/useScrollToHash'

export default function App() {
  useScrollToHash()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/services" element={<Services />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/process" element={<Process />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}
