import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { notes } from '../notes'

function NotePage() {
  const { slug } = useParams()
  const note = notes[slug]

  if (!note) {
    return (
      <div className="pa4 mw7 center">
        <h1 className="f4 near-black mb3">Note not found</h1>
        <p className="f5 gray mb4">The note "{slug}" doesn't exist yet.</p>
        <Link to="/" className="f6 blue underline hover-no-underline">← back home</Link>
      </div>
    )
  }

  return (
    <div className="pa4 mw7 center">
      <article className="note-content">
        <h1 className="f3 near-black mb2 lh-title">{note.title}</h1>
        {note.date && <p className="f6 gray mb4">{note.date}</p>}
        
        <div className="f5 lh-copy near-black">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{note.content}</Markdown>
        </div>
      </article>
      
      <footer className="mt5 pt4 bt b--light-gray">
        <Link to="/" className="f6 blue underline hover-no-underline">← back home</Link>
      </footer>
    </div>
  )
}

export default NotePage
