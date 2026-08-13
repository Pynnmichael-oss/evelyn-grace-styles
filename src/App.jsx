import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Process from './pages/Process'
import useScrollToHash from './hooks/useScrollToHash'

export default function App() {
  useScrollToHash()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/process" element={<Process />} />
    </Routes>
  )
}
