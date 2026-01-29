import { useEffect, useState } from 'react';

/**
 * Sticky navigation for Cursor conversation logs
 * Shows all user questions as navigation links
 * Highlights current section based on scroll position
 */
export const StickyNav = ({ questions, onQuestionClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Track scroll position to highlight current question
    const handleScroll = () => {
      const blocks = document.querySelectorAll('[data-block-id]');
      let currentIndex = 0;

      // Find which block is currently in view
      blocks.forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        // If block is in upper half of viewport, it's the current one
        if (rect.top < window.innerHeight / 3) {
          const blockId = block.getAttribute('data-block-id');
          const questionIndex = questions.findIndex(q => q.id === blockId);
          if (questionIndex !== -1) {
            currentIndex = questionIndex;
          }
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [questions]);

  const handleQuestionClick = (question) => {
    onQuestionClick(question.id);
  };

  return (
    <nav className={`cursor-log-nav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="nav-header">
        <h3>Questions</h3>
        <button
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {!isCollapsed && (
        <ol className="question-list">
          {questions.map((question, index) => (
            <li
              key={question.id}
              className={index === activeIndex ? 'active' : ''}
            >
              <button
                onClick={() => handleQuestionClick(question)}
                className="question-link"
              >
                <span className="question-number">{index + 1}</span>
                <span className="question-text">{question.text}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
};


