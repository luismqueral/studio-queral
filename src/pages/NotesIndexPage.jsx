import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { notes } from '../notes'

// Simple password protection (client-side only — not truly secure, just a casual gate)
const CORRECT_PASSWORD = 'queral2026'
const STORAGE_KEY = 'notes-index-auth'

function NotesIndexPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated this session
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="pa4 mw5 center" style={{ marginTop: '20vh' }}>
        <h1 className="f4 near-black mb3">Notes Index</h1>
        <p className="f6 gray mb4">This page is password protected.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-reset ba b--light-gray pa2 mb2 w-100 f6"
            autoFocus
          />
          {error && <p className="f6 red mb2">{error}</p>}
          <button 
            type="submit"
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-gray bn pointer w-100"
          >
            Enter
          </button>
        </form>
        <p className="f6 mt4"><Link to="/" className="blue underline hover-no-underline">← back home</Link></p>
      </div>
    )
  }

  const notesList = Object.entries(notes).map(([slug, note]) => {
    // Check if content is just placeholder or actually has content
    const isPublic = note.content && 
      !note.content.includes('*Coming soon...*') && 
      note.content.trim().length > 50
    
    return {
      slug,
      title: note.title,
      date: note.date,
      isPublic,
      contentLength: note.content?.length || 0
    }
  })

  // Sort: public first, then alphabetically
  notesList.sort((a, b) => {
    if (a.isPublic !== b.isPublic) return b.isPublic - a.isPublic
    return a.title.localeCompare(b.title)
  })

  const publicNotes = notesList.filter(n => n.isPublic)
  const drafts = notesList.filter(n => !n.isPublic)

  return (
    <div className="pa4 mw7 center">
      <p className="f6 mb4"><Link to="/" className="blue underline hover-no-underline">← back home</Link></p>
      
      <h1 className="f3 near-black mb2">Notes Index</h1>
      <p className="f6 gray mb4">Internal reference — {notesList.length} total notes</p>

      <div className="mb5">
        <h2 className="f5 near-black mb3 pb2 bb b--light-gray">
          Public ({publicNotes.length})
        </h2>
        <ul className="list pl0">
          {publicNotes.map(note => (
            <li key={note.slug} className="mb2 f6">
              <Link to={`/notes/${note.slug}`} className="blue underline hover-no-underline">
                {note.title}
              </Link>
              {note.date && <span className="gray ml2">({note.date})</span>}
              <span className="moon-gray ml2">— {Math.round(note.contentLength / 1000)}k chars</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="f5 near-black mb3 pb2 bb b--light-gray">
          Drafts ({drafts.length})
        </h2>
        <ul className="list pl0">
          {drafts.map(note => (
            <li key={note.slug} className="mb2 f6">
              <Link to={`/notes/${note.slug}`} className="gray underline hover-no-underline">
                {note.title}
              </Link>
              {note.date && <span className="moon-gray ml2">({note.date})</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NotesIndexPage
