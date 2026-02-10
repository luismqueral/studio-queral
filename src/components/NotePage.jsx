import { useParams, Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { notes } from '../notes'

// On the subdomain, "back" should go to the main site (not the password-gated index)
const isNotesSubdomain = window.location.hostname === 'notes.queral.studio'

// Back link that's subdomain-aware: on notes.queral.studio it links to the main
// site via a full URL; on the main site it uses client-side routing to "/"
const BackLink = ({ className }) => {
  if (isNotesSubdomain) {
    return <a href="https://queral.studio" className={className}>← back</a>
  }
  return <Link to="/" className={className}>← back</Link>
}

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
const CodeBlock = ({ inline, className, children, node }) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  const code = String(children).replace(/\n$/, '')
  
  // Determine if this is truly inline: either explicitly inline, or no language and single line
  const isInline = inline || (!language && !code.includes('\n'))

  // Fenced code block with language
  if (!isInline && language) {
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

  // Fenced code block without language (multiline)
  if (!isInline) {
    return (
      <pre className="bg-near-white pa3 br2 overflow-auto f6 pre-wrap">
        <code>{code}</code>
      </pre>
    )
  }

  // Inline code
  return <code className="bg-light-gray ph1 br1 f6 di">{children}</code>
}

const normalizeBaseUrl = (url) => {
  if (url == null || typeof url !== 'string') return ''
  return url.trim().replace(/\/+$/, '')
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
        <BackLink className="f6 blue underline hover-no-underline" />
      </div>
    )
  }

  const content = rewriteNotesAssetUrls(stripFirstHeading(note.content))

  // Check if note has a custom header section (dark bg, etc.)
  if (note.headerSection) {
    const hasPageBg = !!note.headerSection.pageBgClass
    const headerLight = !!note.headerSection.headerLight
    const secondaryColor = headerLight ? 'gray' : 'white-70'
    const tertiaryColor = headerLight ? 'silver' : 'white-50'
    const textClass = hasPageBg ? (note.headerSection.pageTextClass || 'white') : 'near-black'
    const footerLinkClass = hasPageBg ? 'white-70 underline hover-white' : 'blue underline hover-no-underline'
    const footerBorderClass = hasPageBg ? 'b--white-20' : 'b--light-gray'
    const dateClass = hasPageBg ? 'white-50' : 'gray'

    return (
      <div className={note.headerSection.pageBgClass || ''}>
        <div className={note.headerSection.bgClass || "bg-near-black white"}>
          <div className={`ph4 ${note.headerSection.headerPadClass || 'pt4'} pb4 mw7 center`}>
            <p className="f6 mb3"><BackLink className={note.headerSection.linkClass || "white underline hover-no-underline"} /></p>
            <div className={note.headerSection.wrapperClass || "mw6 center tc"}>
              <h1 className={note.headerSection.titleClass || "font-blackletter f1 white mb0 lh-title normal"}>{note.title}</h1>
              {note.headerSection.subtitle && (
                <p className={`f6 ${secondaryColor} mt2 mb0`}>{note.headerSection.subtitle}</p>
              )}
              {(note.headerSection.projectLink || note.headerSection.sourceLink) && (
                <div className="mt3">
                  {note.headerSection.projectLink && (
                    <a href={note.headerSection.projectLink} target="_blank" rel="noopener noreferrer" className={`f6 ${secondaryColor} hover-${headerLight ? 'near-black' : 'white'} underline dib`}>view project →</a>
                  )}
                  {note.headerSection.projectLink && note.headerSection.sourceLink && (
                    <span className={`${tertiaryColor} mh2`}>·</span>
                  )}
                  {note.headerSection.sourceLink && (
                    <a href={note.headerSection.sourceLink} target="_blank" rel="noopener noreferrer" className={`f6 ${secondaryColor} hover-${headerLight ? 'near-black' : 'white'} underline dib`}>view source</a>
                  )}
                </div>
              )}
              {note.headerSection.description && (
                <div className={`mw6 center f5 lh-copy ${secondaryColor} mt3`}>
                  {note.headerSection.description.map((p, i) => (
                    <p key={i} className={i === 0 ? 'mt0' : ''}>{p}</p>
                  ))}
                </div>
              )}
              {note.headerSection.audioSrc && (
                <div className="tc mt4 mb2">
                  <audio controls loop>
                    <source src={note.headerSection.audioSrc} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              {note.headerSection.audioCaption && (
                <div className={`tc f6 ${note.headerSection.audioCaptionClass || `${tertiaryColor} i`}`} dangerouslySetInnerHTML={{ __html: note.headerSection.audioCaption }} />
              )}
            </div>
          </div>
        </div>
        <div className={`ph4 pb4 ${hasPageBg ? 'pt4' : 'pt4'} mw7 center`}>
          <article className="note-content">
            <div className={`f5 lh-copy ${textClass}`}>
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
          
          {note.date && <p className={`f6 ${dateClass} mt5 mb0`}>last updated: {note.date}</p>}
          <footer className={`mt4 pt4 bt ${footerBorderClass}`}>
            <BackLink className={`f6 ${footerLinkClass}`} />
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="pa4 mw7 center">
      <p className="f6 mb4"><BackLink className="blue underline hover-no-underline" /></p>
      <article className="note-content">
        {!note.skipDefaultHeader && (
          note.headerWrapperClass ? (
            <div className={note.headerWrapperClass}>
              <h1 className={note.headerClass || "f3 near-black mb4 lh-title"}>{note.title}</h1>
            </div>
          ) : (
            <h1 className={note.headerClass || "f3 near-black mb4 lh-title"}>{note.title}</h1>
          )
        )}
        
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
        <BackLink className="f6 blue underline hover-no-underline" />
      </footer>
    </div>
  )
}

export default NotePage
