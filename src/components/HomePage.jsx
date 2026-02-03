import { useState } from 'react'
import WebGLMorpher from './WebGLMorpher'
import NewsletterSignup from './NewsletterSignup'

// Hardcoded notes list
const notes = [
  { title: 'how to make paella', slug: 'paella-recipe', subtitle: 'a family recipe from Málaga' },
  { title: 'why i love the wu-tang clan', slug: 'wu-tang-final-tour', subtitle: 'thoughts on RZA, silliness, and creative leadership' },
  { title: 'a guidebook for product cowboys', slug: 'generating-software', subtitle: 'a few things to keep in mind when generating software' },
  // { title: 'mapping the "generative arena"', slug: 'mapping-generative-arena', subtitle: 'breaking down emerging workflows in product design' },
  // { title: 'how to attend meetings', slug: 'how-to-attend-meetings' },
  // { title: 'my design journal from when I worked for the NYC subway', slug: 'nyc-subway-design-journal' },
  // { title: 'designing software for trading floors', slug: 'trading-floor-software-design', subtitle: 'reflecting on my time at goldman sachs' },
  // { title: 'diagramming with LLMs', slug: 'diagramming-with-llms', subtitle: 'advice for designers and engineers alike' },
  // { title: 'a ux suggestion for customer service chat apps', slug: 'ux-customer-service-chat' },
  // { title: 'a case for generative music making', slug: 'generative-music-making', subtitle: 'a framework for creative AI collaboration' },
  // { title: 'how to get people to use AI? let them kind of fuck around', slug: 'let-them-fuck-around' },
  // { title: 'LLMs are making more work, not less', slug: 'llms-more-work-not-less' },
  // { title: 'sorry, engineering is still hard', slug: 'engineering-still-hard', subtitle: 'practical advice from building with LLMs' },
  // { title: 'transcripts are gold in the age of the LLM', slug: 'transcripts-are-gold', subtitle: 'was Plato onto something??' },
  // { title: '"generative design thinking"', slug: 'generative-design-thinking', subtitle: 'product design in the age of the LLM' },
  // { title: 'how designers should talk about AI', slug: 'how-designers-talk-about-ai', subtitle: 'communication standards from the Generative Design Lab' },
  // { title: 'how I use Cursor for design research', slug: 'cursor-for-research', subtitle: "it's more than just for prototypes!" },
  // { title: 'a writing habit is a design superpower', slug: 'writing-design-superpower', subtitle: 'reflections on my writing practice over the years' },
  // { title: 'Introducing Data Synth', slug: 'introducing-data-synth', subtitle: 'ever wondered what it would sound like to run a spreadsheet through a modular synth?' },
  // { title: 'the "split triple diamond"', slug: 'split-triple-diamond', subtitle: 'a working model for design and engineering teams that block each other constantly.' },
  // { title: 'media tool kit', slug: 'media-toolkit', subtitle: 'my personal workflow for automated media manipulation' },
  // { title: 'LLM prompts and techniques', slug: 'prompts-that-help', subtitle: 'an ever growing, updated list of my personal favorites' },
  // { title: 'introducing the generative design lab', slug: 'generative-design-lab' },
  // { title: 'my design advice so far', slug: 'design-advice-so-far' },
  // { title: 'reflections on Happyfood', slug: 'reflections-on-happyfood', subtitle: 'my personal introduction to making art on the internet' },
  // { title: "designing a generative 'happyfood' engine", slug: 'generative-happyfood-engine' },
  // { title: 'jump city records, a generative music project from 2014', slug: 'jump-city-records' },
  // { title: 'hamburger music (2013)', slug: 'hamburger-music' },
  // { title: 'my favorite prints 2011-2014', slug: 'favorite-prints-2011-2014' },
  // { title: 'things I learned making showhaus', slug: 'things-learned-showhaus' },
  // { title: 'on the joy of side projects', slug: 'joy-of-side-projects' },
  // { title: 'why I still keep a paper notebook', slug: 'paper-notebook' },
  // { title: 'the tools I actually use every day', slug: 'tools-i-use' },
  // { title: 'some thoughts on creative constraints', slug: 'creative-constraints' },
  // { title: 'learning in public vs. learning in private', slug: 'learning-in-public' },
  // { title: 'how I think about prototyping', slug: 'thinking-about-prototyping' },
  // { title: 'the difference between taste and skill', slug: 'taste-vs-skill' },
  // { title: 'notes on working with engineers', slug: 'working-with-engineers' },
]

// Color pairs for random sidebar background
const colorPairs = [
  { bg: '#faf8f0', accent: '#8b7355' }, // warm cream -> dark tan
  { bg: '#f0f4f8', accent: '#4a6fa5' }, // light blue-gray -> dark blue
  { bg: '#f5f0fa', accent: '#7b5aa6' }, // light lavender -> dark purple
  { bg: '#f0faf5', accent: '#3d8b6e' }, // light mint -> dark green
  { bg: '#faf5f0', accent: '#b5724c' }, // light peach -> dark orange
  { bg: '#f8f8f0', accent: '#8b8b3d' }, // light yellow -> dark olive
  { bg: '#f0f8f8', accent: '#3d7a7a' }, // light cyan -> dark teal
  { bg: '#faf0f5', accent: '#a65580' }, // light pink -> dark magenta
  { bg: '#f5faf0', accent: '#5a8b3d' }, // light lime -> dark green
  { bg: '#f8f0f0', accent: '#a65555' }, // light rose -> dark red
]

function HomePage() {
  const sidebarWidth = 400
  const [selectedPair] = useState(() => colorPairs[Math.floor(Math.random() * colorPairs.length)])
  const bgColor = selectedPair.bg

  // Notes list component (used in both mobile and desktop)
  const NotesList = () => (
    <ul className="list pl0 mt0 mb0">
      {notes.map((note) => (
        <li key={note.slug} className="mb4 flex items-start">
          <span className="mr2 moon-gray" style={{ fontSize: '2em', lineHeight: '1', marginTop: '0.02em' }}>*</span>
          <div>
            <a href={`/notes/${note.slug}`} className="f5 blue underline hover-no-underline lh-title db">
              {note.title}
            </a>
            {note.subtitle && (
              <p className="f6 gray mt1 mb0 lh-copy">{note.subtitle}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )

  // Bio component (used in both mobile and desktop)
  const Bio = () => (
    <>
      <p className="f6 lh-copy near-black">
        <strong>Luis Queral</strong> is a product designer and creative technologist.
      </p>
      <p className="f6 lh-copy near-black">
        He currently works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> focusing on improving developer workflows and building our Generative Design Lab.
      </p>
      <p className="f6 lh-copy near-black">
        In his spare time, he enjoys writing, making video art, and generally hanging out. <a href="/about" className="blue underline hover-no-underline">Learn more</a>
      </p>
      <div className="f6 mt3 near-black">
        <p className="mb2">contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a></p>
        <p className="mb0"><a href="#newsletter" className="blue underline hover-no-underline">join my mailing list</a></p>
      </div>
    </>
  )

  return (
    <>
      {/* Fixed left sidebar - only on desktop */}
      <div 
        className="dn-md pa4 hide-scrollbar"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${sidebarWidth}px`,
          height: '100vh',
          overflowY: 'auto',
          backgroundColor: bgColor
        }}
      >
        <div className="mb3 center" style={{ maxWidth: '250px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
            hideSlider={true}
          />
        </div>
        <Bio />
      </div>
      
      {/* Mobile: stacked layout (no fixed positioning) */}
      <div className="db-md">
        <div className="pa4" style={{ backgroundColor: bgColor }}>
          <div className="center" style={{ maxWidth: '400px' }}>
            <div className="mb3 center" style={{ maxWidth: '240px' }}>
              <WebGLMorpher
                image1Url="/images/luis.png"
                image2Url="/images/pelican.png"
                hideSlider={true}
              />
            </div>
            <Bio />
          </div>
        </div>
        <div className="pa4">
          <div className="center" style={{ maxWidth: '500px' }}>
            <p className="f6 near-black mb4">a few things I'm thinking about:</p>
            <NotesList />
          </div>
        </div>
        
        {/* Keep in touch section - full width, lightest gray */}
        <div className="bg-near-white pt3 pb5">
          <div className="center ph4" style={{ maxWidth: '500px' }}>
            <NewsletterSignup />
          </div>
        </div>
      </div>
      
      {/* Desktop: scrollable right content with margin offset */}
      <div 
        className="dn-md pa4"
        style={{ 
          marginLeft: `${sidebarWidth}px`, 
          minHeight: '100vh'
        }}
      >
        <div style={{ maxWidth: '580px' }}>
          <p className="f6 near-black mb4">a few things I'm thinking about:</p>
          <NotesList />
        </div>
      </div>
      
      {/* Desktop: Keep in touch section - full width, lightest gray */}
      <div 
        className="dn-md bg-near-white pt3 pb5"
        style={{ 
          marginLeft: `${sidebarWidth}px`
        }}
      >
        <div className="ph4" style={{ maxWidth: '580px' }}>
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}

export default HomePage
