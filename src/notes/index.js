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
  'looking-for-you': {
    title: 'Looking for Y O U',
    date: 'January 2023',
    headerSection: {
      bgClass: 'bg-purple white',
      linkClass: 'white underline hover-no-underline',
      wrapperClass: 'mw6 center tc',
      titleClass: 'f1 white mb0 lh-title i serif normal',
      subtitle: 'craigslist classifieds extended with the help of GPT-3',
    }
  },
  'we-are-open': {
    title: '"We Are Open"',
    date: '2020',
    headerSection: {
      pageBgClass: 'bg-near-black',
      bgClass: 'bg-near-white near-black',
      headerLight: true,
      linkClass: 'near-black underline hover-no-underline',
      wrapperClass: 'mw6 center tc',
      titleClass: 'font-brush-script f1 f-subheadline-l near-black mb0 lh-title normal',
      description: [
        'The days leading up to the 2020 elections were bleak and uneasy.',
        'This was peak covid. New York was traumatized and felt unhinged. Lockdowns were growing tiring.',
        'The sounds of neighbors banging pots and pans for front-line workers eased as the city hollowed out. Nowhere was that more true east of Lex.',
        'These are some photos from that time.',
      ],
      audioSrc: '/notes/we-are-open/disaster-decision.mp3',
      audioCaption: 'press play for the full experience',
    }
  },
  'gloves-of-new-york': {
    title: 'Gloves Of New York',
    date: '2020',
    headerSection: {
      pageBgClass: 'bg-dark-gray',
      bgClass: 'bg-dark-gray white',
      linkClass: 'white underline hover-no-underline',
      wrapperClass: 'mw6 center tc',
      titleClass: 'f1 white mb0 lh-title normal ttu',
    }
  },
  'richie-cigs': {
    title: 'Richie Cigs',
    headerSection: {
      bgClass: 'bg-darker-red white',
      linkClass: 'white underline hover-no-underline',
      wrapperClass: 'mw6 center tc',
      titleClass: 'font-blackletter f-subheadline white mt0 mb0 lh-title normal',
      audioSrc: '/notes/richie-cigs/holy-diver-audio.mp3',
      audioCaption: '<b>press play</b> for the full richard cigarette experience',
      audioCaptionClass: 'near-white',
    }
  },
  'introducing-data-synth': { 
    title: 'Data Synth',
    headerSection: {
      bgClass: 'bg-purple white',
      linkClass: 'white underline hover-no-underline',
      wrapperClass: 'mw6 center tc',
      titleClass: 'font-blackletter f1 white mb0 lh-title normal',
      subtitle: 'a browser-based modular synth for sonifying json/csv datasets',
      projectLink: 'https://datasynth.vercel.app',
      sourceLink: 'https://github.com/luismqueral/data-synth'
    }
  },
  'styling-ruleset': { title: 'styling ruleset for this site', date: 'February 2026' },
  'paella-recipe': { title: 'how to make paella', date: 'February 2026' },
  'wu-tang-final-tour': { title: 'why i love the wu-tang clan', date: 'January 2026' },
  'an-ode-to-interns': { title: 'an ode to interns', date: 'September 2013' },
  'forget-grades': { title: 'forget grades, break rules, build things', date: 'November 2013' },
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
