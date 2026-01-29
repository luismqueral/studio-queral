/**
 * Parser for Cursor conversation export format
 * Extracts structure: metadata, conversations, code blocks
 * 
 * Cursor exports follow this pattern:
 * - Title line with markdown heading
 * - Export metadata line
 * - Separator (---)
 * - Conversation blocks alternating **User** and **Cursor**
 * - Code blocks in triple backticks
 */

/**
 * Parses the Cursor log markdown into structured data
 * @param {string} markdown - Raw markdown content from Cursor export
 * @returns {Object} Parsed log with metadata, title, and conversation blocks
 */
export const parseCursorLog = (markdown) => {
  const lines = markdown.split('\n');
  
  // Extract title (first line, usually # Title)
  const titleLine = lines.find(line => line.startsWith('#'));
  const title = titleLine ? titleLine.replace(/^#+\s*/, '') : 'Untitled Conversation';
  
  // Extract export metadata (second line with timestamp)
  const metadataLine = lines.find(line => line.startsWith('_Exported on'));
  const metadata = parseMetadata(metadataLine);
  
  // Split content into conversation blocks
  // Each block starts with **User** or **Cursor**
  const conversations = [];
  let currentBlock = null;
  let inCodeBlock = false;
  let codeBlockContent = [];
  let codeLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect code block start/end
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting code block
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        // Ending code block
        inCodeBlock = false;
        if (currentBlock) {
          currentBlock.content += `\n\`\`\`${codeLanguage}\n${codeBlockContent.join('\n')}\n\`\`\`\n`;
        }
        codeBlockContent = [];
        codeLanguage = '';
      }
      continue;
    }
    
    // If inside code block, accumulate content
    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }
    
    // Detect conversation block start
    if (line === '**User**' || line === '**Cursor**') {
      // Save previous block if exists
      if (currentBlock) {
        conversations.push(currentBlock);
      }
      
      // Start new block
      currentBlock = {
        role: line === '**User**' ? 'user' : 'assistant',
        content: '',
        id: `block-${conversations.length}`,
      };
      continue;
    }
    
    // Skip separator lines and empty metadata
    if (line === '---' || line.startsWith('_Exported on')) {
      continue;
    }
    
    // Add content to current block
    if (currentBlock && line.trim()) {
      currentBlock.content += line + '\n';
    }
  }
  
  // Add final block
  if (currentBlock) {
    conversations.push(currentBlock);
  }
  
  // Extract questions from user blocks (for navigation)
  const questions = extractQuestions(conversations);
  
  return {
    title,
    metadata,
    conversations,
    questions,
  };
};

/**
 * Parses metadata line from Cursor export
 * Example: "_Exported on 11/30/2025 at 21:48:51 EST from Cursor (2.0.77)_"
 */
const parseMetadata = (metadataLine) => {
  if (!metadataLine) return null;
  
  const match = metadataLine.match(/_Exported on (.+) at (.+) from Cursor \((.+)\)_/);
  if (!match) return null;
  
  return {
    date: match[1],
    time: match[2],
    cursorVersion: match[3],
  };
};

/**
 * Extracts user questions for navigation
 * Takes first ~100 chars of each user message as the question
 */
const extractQuestions = (conversations) => {
  return conversations
    .filter(block => block.role === 'user')
    .map((block, index) => {
      // Get first paragraph or first ~100 chars as preview
      const firstPara = block.content.split('\n\n')[0];
      const preview = firstPara.length > 100 
        ? firstPara.slice(0, 97) + '...'
        : firstPara;
      
      return {
        id: block.id,
        text: preview.trim(),
        index: conversations.indexOf(block),
      };
    });
};

/**
 * Creates URL slug from log title
 * Example: "Rewriting surface-sniffer" → "rewriting-surface-sniffer"
 */
export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};


