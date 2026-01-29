import { useState, useEffect } from 'react';
import { parseCursorLog } from '../../utils/parseCursorLog';
import { StickyNav } from './StickyNav';
import { ConversationBlock } from './ConversationBlock';

/**
 * Main log viewer component
 * Loads and displays Cursor conversation exports
 * Handles parsing, navigation, and scroll behavior
 */
export const LogViewer = ({ logPath }) => {
  const [logData, setLogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch and parse the log file
    const loadLog = async () => {
      try {
        setLoading(true);
        const response = await fetch(logPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load log: ${response.statusText}`);
        }
        
        const markdown = await response.text();
        const parsed = parseCursorLog(markdown);
        setLogData(parsed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLog();
  }, [logPath]);

  const handleQuestionClick = (blockId) => {
    // Smooth scroll to the question block
    const element = document.getElementById(blockId);
    if (element) {
      const navHeight = 80; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="log-loading">
        <div className="loading-spinner" />
        <p>Loading conversation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="log-error">
        <h2>Failed to Load Log</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!logData) {
    return null;
  }

  return (
    <div className="cursor-log-container">
      <StickyNav 
        questions={logData.questions}
        onQuestionClick={handleQuestionClick}
      />

      <main className="log-content">
        <header className="log-header">
          <h1>{logData.title}</h1>
          {logData.metadata && (
            <div className="log-metadata">
              <span>Exported {logData.metadata.date} at {logData.metadata.time}</span>
              <span>Cursor {logData.metadata.cursorVersion}</span>
            </div>
          )}
        </header>

        <div className="conversation-list">
          {logData.conversations.map((block) => (
            <ConversationBlock
              key={block.id}
              role={block.role}
              content={block.content}
              id={block.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};


