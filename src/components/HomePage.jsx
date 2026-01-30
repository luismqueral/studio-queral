import { useState, useEffect } from 'react'
import WebGLMorpher from './WebGLMorpher'
import FeaturedSection from './FeaturedSection'
import NewsletterSignup from './NewsletterSignup'
import blogPosts from '../content/blog/posts'
import { 
  LayoutA, LayoutB, LayoutC, LayoutD, LayoutE, 
  LayoutF, LayoutG, LayoutH, LayoutI,
  LayoutJ, LayoutK, LayoutL, LayoutM, LayoutN, LayoutO
} from './HomePageLayouts'

// =============================================================================
// LAYOUT SWITCHER - Change this to try different layouts
// Options: 'current', 'A'-'I' (standard), 'J'-'O' (experimental)
// =============================================================================
const ACTIVE_LAYOUT = 'J'

// Random takes - add more here
const takes = [
  "The Fifth Element is the greatest sci-fi movie ever made.",
]

// Current layout (original)
function CurrentLayout() {
  return (
    <>
      {/* Section 1: Introduction - White */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <strong>Luis Queral</strong> is a product designer and creative technologist.
          </p>
          <p className="f4 lh-copy near-black">
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> <br className="dn-ns" />designing tools and workflows for platforms.
          </p>
          <p className="f4 lh-copy near-black">
            In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <div className="mt3">
            <div className="flex items-center">
              <span className="mr2 gray f4">→</span>
              <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline f4">Contact</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: WebGL Applet - Light Gray */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '540px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>
    </>
  )
}

function HomePage() {
  const [randomTake, setRandomTake] = useState('')

  useEffect(() => {
    // Pick a random take on component mount
    const randomIndex = Math.floor(Math.random() * takes.length)
    setRandomTake(takes[randomIndex])
  }, [])

  // Render the active layout
  const renderLayout = () => {
    switch (ACTIVE_LAYOUT) {
      case 'A': return <LayoutA />
      case 'B': return <LayoutB />
      case 'C': return <LayoutC />
      case 'D': return <LayoutD />
      case 'E': return <LayoutE />
      case 'F': return <LayoutF />
      case 'G': return <LayoutG />
      case 'H': return <LayoutH />
      case 'I': return <LayoutI />
      // Experimental layouts
      case 'J': return <LayoutJ />
      case 'K': return <LayoutK />
      case 'L': return <LayoutL />
      case 'M': return <LayoutM />
      case 'N': return <LayoutN />
      case 'O': return <LayoutO />
      default: return <CurrentLayout />
    }
  }

  return (
    <>
      {renderLayout()}

      {/* Section 3: Notes - White - COMMENTED OUT
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 mb2 near-black fw6">Notes</p>
          <p className="f5 mb3 near-black lh-copy">Essays and observations about art and technology.</p>
          <ul className="list pl0 mt2 mb0">
            {blogPosts.map((post, index) => {
              // Unicode star characters (no religious symbols)
              const stars = ['★', '✦', '✧', '✩', '✫', '✭', '✯']
              const star = stars[index % stars.length]
              return (
                <li key={post.slug} className="mb3 f4 near-black lh-copy flex items-start">
                  <span 
                    className="mr2 gray" 
                    style={{ fontSize: '0.9em', lineHeight: 1.6 }}
                  >
                    {star}
                  </span>
                  <a href={`/blog/${post.slug}`} className="blue underline hover-no-underline">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      */}

      {/* Section 4: Newsletter - Light Gray - COMMENTED OUT
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <NewsletterSignup />
        </div>
      </section>
      */}
    </>
  )
}

export default HomePage

