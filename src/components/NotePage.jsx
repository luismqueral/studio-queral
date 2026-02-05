import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { notes } from '../notes'

/**
 * CodeBlock - Renders fenced code blocks with syntax highlighting
 * 
 * Usage in markdown:
 *   ```javascript
 *   const x = 1;
 *   ```
 * 
 * Supports all Prism languages (js, python, markdown, bash, etc.)
 */
const CodeBlock = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  const code = String(children).replace(/\n$/, '')

  // Fenced code block with language
  if (!inline && language) {
    return (
      <SyntaxHighlighter
        style={solarizedlight}
        language={language}
        PreTag="pre"
        customStyle={{
          margin: '1rem 0',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    )
  }

  // Fenced code block without language
  if (!inline) {
    return (
      <pre className="bg-near-white pa3 br2 overflow-auto f6" style={{ whiteSpace: 'pre-wrap' }}>
        <code>{code}</code>
      </pre>
    )
  }

  // Inline code
  return <code className="bg-light-gray ph1 br1 f6">{children}</code>
}

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
          <Markdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{ 
              code: CodeBlock,
              pre: ({ children }) => <>{children}</>
            }}
          >
            {content}
          </Markdown>
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
