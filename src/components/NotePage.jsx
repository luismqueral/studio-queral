import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { notes } from '../notes'

const normalizeBaseUrl = (url) => {
  if (!url) return ''
  return url.replace(/\/+$/, '')
}

const rewriteNotesAssetUrls = (content) => {
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_NOTES_CDN_BASE_URL)
  if (!baseUrl) return content

  const notesPrefix = `${baseUrl}/notes/`

  return content
    // html attrs
    .replaceAll('src="/notes/', `src="${notesPrefix}`)
    .replaceAll("src='/notes/", `src='${notesPrefix}`)
    .replaceAll('href="/notes/', `href="${notesPrefix}`)
    .replaceAll("href='/notes/", `href='${notesPrefix}`)
    .replaceAll('poster="/notes/', `poster="${notesPrefix}`)
    .replaceAll("poster='/notes/", `poster='${notesPrefix}`)
    // markdown links/images
    .replaceAll('](/notes/', `](${notesPrefix}`)
}

// Strip the first # heading from markdown (title is handled by metadata)
const stripFirstHeading = (content) => {
  // Match first line if it's a # heading (with optional leading whitespace/newlines)
  return content.replace(/^\s*#\s+[^\n]+\n*/, '')
}

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

  const content = rewriteNotesAssetUrls(stripFirstHeading(note.content))

  return (
    <div className="pa4 mw7 center">
      <p className="f6 mb4"><Link to="/" className="blue underline hover-no-underline">← back home</Link></p>
      <article className="note-content">
        <h1 className="f3 near-black mb4 lh-title">{note.title}</h1>
        
        <div className="f5 lh-copy near-black">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content}</Markdown>
        </div>
      </article>
      
      {note.date && <p className="f6 gray mt5 mb0">last updated: {note.date}</p>}
      <footer className="mt4 pt4 bt b--light-gray">
        <Link to="/" className="f6 blue underline hover-no-underline">← back home</Link>
      </footer>
    </div>
  )
}

export default NotePage
