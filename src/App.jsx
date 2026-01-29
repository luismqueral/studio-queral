import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import BlogPostPage from './pages/BlogPostPage'
import { CursorLogPage } from './pages/CursorLogPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/logs/:logSlug" element={<CursorLogPage />} />
      </Routes>
    </div>
  )
}

export default App
