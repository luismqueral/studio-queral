// Notes registry
// Content lives in separate .md files in ./content/
// Vite imports them as raw strings using import.meta.glob

// Import all markdown files as raw strings
const contentModules = import.meta.glob('./content/*.md', { eager: true, query: '?raw', import: 'default' })

// Helper to get content by slug
const getContent = (slug) => {
  const path = `./content/${slug}.md`
  return contentModules[path] || '*Coming soon...*'
}

// Notes metadata - title is required, date is optional
// Content is loaded from ./content/{slug}.md
const notesMetadata = {
  'wu-tang-final-tour': { title: 'why i love the wu-tang clan', date: 'January 2026' },
  'mapping-generative-arena': { title: 'mapping the "generative arena"' },
  'how-to-attend-meetings': { title: 'how to attend meetings' },
  'generating-software': { title: 'a guidebook for product cowboys' },
  'nyc-subway-design-journal': { title: 'my design journal from when I worked for the NYC subway' },
  'trading-floor-software-design': { title: 'designing software for trading floors' },
  'diagramming-with-llms': { title: 'diagramming with LLMs' },
  'ux-customer-service-chat': { title: 'a ux suggestion for customer service chat apps' },
  'generative-music-making': { title: 'a case for generative music making' },
  'let-them-fuck-around': { title: 'how to get people to use AI? let them kind of fuck around' },
  'llms-more-work-not-less': { title: 'LLMs are making more work, not less' },
  'engineering-still-hard': { title: 'sorry, engineering is still hard' },
  'transcripts-are-gold': { title: 'transcripts are gold in the age of the LLM' },
  'generative-design-thinking': { title: '"generative design thinking"' },
  'how-designers-talk-about-ai': { title: 'how designers should talk about AI' },
  'cursor-for-research': { title: 'how I use Cursor for design research' },
  'writing-design-superpower': { title: 'a writing habit is a design superpower' },
  'introducing-data-synth': { title: 'Introducing Data Synth' },
  'split-triple-diamond': { title: 'the "split triple diamond"' },
  'media-toolkit': { title: 'media tool kit' },
  'prompts-that-help': { title: 'LLM prompts and techniques' },
  'generative-design-lab': { title: 'introducing the generative design lab' },
  'design-advice-so-far': { title: 'my design advice so far' },
  'reflections-on-happyfood': { title: 'reflections on Happyfood' },
  'generative-happyfood-engine': { title: "designing a generative 'happyfood' engine" },
  'jump-city-records': { title: 'jump city records, a generative music project from 2014' },
  'hamburger-music': { title: 'hamburger music (2013)' },
  'favorite-prints-2011-2014': { title: 'my favorite prints 2011-2014' },
  'things-learned-showhaus': { title: 'things I learned making showhaus' },
  'joy-of-side-projects': { title: 'on the joy of side projects' },
  'paper-notebook': { title: 'why I still keep a paper notebook' },
  'tools-i-use': { title: 'the tools I actually use every day' },
  'creative-constraints': { title: 'some thoughts on creative constraints' },
  'learning-in-public': { title: 'learning in public vs. learning in private' },
  'thinking-about-prototyping': { title: 'how I think about prototyping' },
  'taste-vs-skill': { title: 'the difference between taste and skill' },
  'working-with-engineers': { title: 'notes on working with engineers' },
}

// Build notes object with content
export const notes = Object.fromEntries(
  Object.entries(notesMetadata).map(([slug, meta]) => [
    slug,
    { ...meta, content: getContent(slug) }
  ])
)
