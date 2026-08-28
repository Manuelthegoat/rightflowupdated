import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Chain3D from './components/Chain3D.jsx'
import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Press from './pages/Press.jsx'
import Contact from './pages/Contact.jsx'
import useMetaPixelPageview from './hooks/useMetaPixelPageview.js'
import './styles/jungle.css'
import './styles/overrides.css'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])

  return null
}

function App() {
  useMetaPixelPageview()

  return (
    <>
      <ScrollToTop />
      <Chain3D />
      <Preloader />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/press" element={<Press />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
