import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AboutPage from './pages/AboutPage'
import NotePage from './components/NotePage'
import NotesIndexPage from './pages/NotesIndexPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/notes" element={<NotesIndexPage />} />
        <Route path="/notes/:slug" element={<NotePage />} />
      </Routes>
    </div>
  )
}

export default App
