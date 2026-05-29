import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { About, Contact, Education, Experience, Extracurricular, Hero, Navbar, Tech, Works, StarsCanvas } from './components' // if you want to use skills balls make sure to import tech and do the same for src\components\index.js

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Intercept clicks on local anchor links for smooth scrolling via Lenis
    const handleAnchorClick = (e) => {
      const targetLink = e.target.closest('a')
      if (targetLink && targetLink.hash && targetLink.origin === window.location.origin) {
        const element = document.querySelector(targetLink.hash)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, { 
            offset: -100, // offset slightly to align with navbar
            duration: 1.5,
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return (
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 origin-left z-50 shadow-[0_0_8px_rgba(139,92,246,0.3)] pointer-events-none"
            style={{ scaleX }}
          />
          <StarsCanvas />
          <div className="div bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Education />
          <Experience />
          <Tech />
          <Works />
          <div className="div relative z-0">
            <Contact />
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App
