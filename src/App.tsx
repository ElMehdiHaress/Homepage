import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Homepage from './Homepage'
import ResearchIntro from './ResearchIntro'
import Publications from './Publications'
import Talks from './Talks'
import Teaching from './Teaching'
import Projects from './Projects'
import { initGA, trackPageView } from './lib/analytics'
import './App.css'

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return

    // Initialize GA on first load
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (measurementId && typeof window.gtag !== 'function') {
      initGA(measurementId)
    }
    
    // Track page view on route change
    if (measurementId && typeof window.gtag === 'function') {
      trackPageView(location.pathname + location.search, measurementId)
    }
  }, [location])

  return null
}

function App() {
  return (
    <Router>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/research-intro" element={<ResearchIntro />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  )
}

export default App
