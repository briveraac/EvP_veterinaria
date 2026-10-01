import { useEffect } from 'react'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import SkipLink from './components/layout/SkipLink'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import { initSiteUi } from './features/site/initSiteUi'

function App() {
  useEffect(() => initSiteUi(), [])

  return (
    <>
      <SkipLink />
      <Header />

      <main id="contenido-principal">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
