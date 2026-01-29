import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Individual conversation block (User or Cursor message)
 * Renders markdown with syntax-highlighted code blocks
 */
export const ConversationBlock = ({ role, content, id }) => {
  return (
    <div 
      className={`conversation-block ${role}`}
      data-block-id={id}
      id={id}
    >
      <div className="message-header">
        <span className="role-badge">
          {role === 'user' ? 'User' : 'Cursor'}
        </span>
      </div>

      <div className="message-content">
        <ReactMarkdown
          components={{
            // Custom code block rendering with syntax highlighting
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';

              return !inline && language ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  className="code-block"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            
            // Style links
            a: ({ node, children, href, ...props }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};


