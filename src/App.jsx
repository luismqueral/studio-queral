import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import AboutPage from './pages/AboutPage'
import NotePage from './components/NotePage'
import NotesIndexPage from './pages/NotesIndexPage'
import StyleGuidePage from './pages/StyleGuidePage'

const isNotesSubdomain = window.location.hostname === 'notes.queral.studio'

function App() {
  return (
    <div>
      <Routes>
        {isNotesSubdomain ? (
          <>
            <Route path="/" element={<NotesIndexPage />} />
            <Route path="/:slug" element={<NotePage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/notes" element={<NotesIndexPage />} />
            <Route path="/notes/:slug" element={<NotePage />} />
            <Route path="/styles" element={<StyleGuidePage />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App
