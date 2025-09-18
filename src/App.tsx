import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Homepage'
import ResearchIntro from './ResearchIntro'
import Publications from './Publications'
import Talks from './Talks'
import Teaching from './Teaching'
import Projects from './Projects'
import './App.css'

function App() {
  return (
    <Router>
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
