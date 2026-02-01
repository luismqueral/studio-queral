import { useState, useEffect } from 'react'
import WebGLMorpher from './WebGLMorpher'
import NewsletterSignup from './NewsletterSignup'
import blogPosts from '../content/blog/posts'

// =============================================================================
// LAYOUT A: "The Reveal" - WebGL hero at top, bio below
// Surprise: The morphing face greets you first
// =============================================================================
export function LayoutA() {
  const recentPosts = blogPosts.slice(0, 6)
  
  return (
    <>
      {/* Hero: WebGL first */}
      <section className="bg-near-white pv5">
        <div className="center ph3" style={{ maxWidth: '480px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>

      {/* Bio below */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <strong>Luis Queral</strong> is a product designer and creative technologist.
          </p>
          <p className="f4 lh-copy near-black">
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> designing tools and workflows for platforms.
          </p>
          <p className="f4 lh-copy near-black">
            In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <p className="f4 lh-copy mt4 near-black">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
      
      {/* Notes */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f5 fw6 gray mb3">Notes</p>
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post) => (
              <li key={post.slug} className="mb2">
                <a href={`/blog/${post.slug}`} className="f4 blue underline hover-no-underline lh-copy">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT B: "Side by Side" - Bio left, WebGL right on desktop
// Confident, gallery-like feel
// =============================================================================
export function LayoutB() {
  const recentPosts = blogPosts.slice(0, 5)
  
  return (
    <>
      <section className="bg-white pv5">
        <div className="center ph3 w-100" style={{ maxWidth: '1000px' }}>
          <div className="flex-ns items-center-ns">
            {/* Bio on left */}
            <div className="w-100 w-50-ns pr4-ns mb4 mb0-ns">
              <p className="f3 lh-title near-black mb3">
                <strong>Luis Queral</strong>
              </p>
              <p className="f4 lh-copy near-black">
                Product designer and creative technologist at <em>The New York Times</em>, designing tools and workflows for platforms.
              </p>
              <p className="f5 lh-copy gray mt3">
                Writing, audio-visual experiments, hanging out with kids :-).
              </p>
              <p className="f5 mt4 near-black">
                contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
              </p>
            </div>
            
            {/* WebGL on right */}
            <div className="w-100 w-50-ns">
              <WebGLMorpher
                image1Url="/images/luis.png"
                image2Url="/images/pelican.png"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Notes below */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '1000px' }}>
          <p className="f6 fw6 gray mb3 ttu tracked">Notes</p>
          <div className="flex-ns flex-wrap">
            {recentPosts.map((post) => (
              <div key={post.slug} className="w-100 w-50-ns pr3-ns mb3">
                <a href={`/blog/${post.slug}`} className="f5 blue underline hover-no-underline lh-copy">
                  {post.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT C: "The Business Card" - Minimal, centered, tight stack
// WebGL as small avatar, everything very condensed
// =============================================================================
export function LayoutC() {
  const recentPosts = blogPosts.slice(0, 4)
  
  return (
    <>
      <section className="bg-white pv5 flex items-center justify-center" style={{ minHeight: '70vh' }}>
        <div className="center ph3 tc" style={{ maxWidth: '400px' }}>
          {/* Small WebGL avatar */}
          <div className="center mb4" style={{ maxWidth: '200px' }}>
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />
          </div>
          
          <p className="f3 lh-title near-black mb2">
            <strong>Luis Queral</strong>
          </p>
          <p className="f5 lh-copy gray mb3">
            Product Designer & Creative Technologist
          </p>
          <p className="f6 lh-copy gray mb4">
            The New York Times · Baltimore
          </p>
          
          <p className="f6 near-black">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
      
      {/* Notes section */}
      <section id="notes" className="bg-near-white pv4">
        <div className="center ph3 tc" style={{ maxWidth: '500px' }}>
          <p className="f6 fw6 gray mb4 ttu tracked">Recent Notes</p>
          {recentPosts.map((post) => (
            <p key={post.slug} className="mb3">
              <a href={`/blog/${post.slug}`} className="f5 blue underline hover-no-underline lh-copy">
                {post.title}
              </a>
            </p>
          ))}
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT D: "The Wink" - Playful with rotating elements
// Random emoji/symbol adds surprise each visit
// =============================================================================
export function LayoutD() {
  const [randomEmoji, setRandomEmoji] = useState('◈')
  const [caption, setCaption] = useState('')
  const recentPosts = blogPosts.slice(0, 5)
  
  const emojis = ['◈', '◉', '◎', '●', '○', '◐', '◑', '◒', '◓']
  const captions = [
    'this is what I look like sometimes',
    'drag the slider',
    'that\'s me on the left',
    'I promise the right one is also me',
    '← human · bird →',
  ]
  
  useEffect(() => {
    setRandomEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    setCaption(captions[Math.floor(Math.random() * captions.length)])
  }, [])
  
  return (
    <>
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            <strong>Luis Queral</strong> is a product designer and creative technologist.
          </p>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            He works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> designing tools and workflows for platforms.
          </p>
          <p className="f4 lh-copy near-black">
            <span className="gray mr2">{randomEmoji}</span>
            In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
          </p>
          <p className="f4 lh-copy mt3 near-black">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>

      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '540px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
          <p className="f6 gray tc mt3 i">{caption}</p>
        </div>
      </section>
      
      {/* Notes with playful bullets */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f5 fw6 near-black mb3">Notes</p>
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post, index) => (
              <li key={post.slug} className="mb2 flex items-start">
                <span className="gray mr2">{emojis[index % emojis.length]}</span>
                <a href={`/blog/${post.slug}`} className="f4 blue underline hover-no-underline lh-copy">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT E: "Stacked Minimal" - Very clean, just the essentials
// Name big, details small, WebGL prominent
// =============================================================================
export function LayoutE() {
  const recentPosts = blogPosts.slice(0, 6)
  
  return (
    <>
      <section className="bg-white pv5">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <h1 className="f1 fw7 near-black mb2 mt0">Luis Queral</h1>
          <p className="f5 gray mt0 mb4">
            Product Designer · Creative Technologist · NYT
          </p>
          
          <div className="mv4" style={{ maxWidth: '480px' }}>
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />
          </div>
          
          <p className="f4 lh-copy near-black mt4">
            I design tools and workflows for platforms at The New York Times. 
            Outside of work, I write, make audio-visual experiments, and hang out with my kids.
          </p>
          
          <p className="f5 mt4 near-black">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
      
      {/* Notes - clean numbered list */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '580px' }}>
          <p className="f5 fw6 near-black mb4">Notes</p>
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post, index) => (
              <li key={post.slug} className="mb3 flex items-baseline">
                <span className="f6 gray mr3 fw5" style={{ minWidth: '1.5rem' }}>{String(index + 1).padStart(2, '0')}</span>
                <a href={`/blog/${post.slug}`} className="f4 near-black underline hover-blue lh-title">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT F: "The Magazine" - Bio + Notes side by side, WebGL as accent
// Editorial feel, content-forward
// =============================================================================
export function LayoutF() {
  const recentPosts = blogPosts.slice(0, 5)
  
  return (
    <>
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '900px' }}>
          <div className="flex-ns">
            {/* Left column: Bio + WebGL */}
            <div className="w-100 w-40-ns pr4-ns mb4 mb0-ns">
              <div className="mb4" style={{ maxWidth: '280px' }}>
                <WebGLMorpher
                  image1Url="/images/luis.png"
                  image2Url="/images/pelican.png"
                />
              </div>
              <p className="f4 lh-copy near-black">
                <strong>Luis Queral</strong> is a product designer and creative technologist at The New York Times.
              </p>
              <p className="f5 lh-copy gray mt2">
                Writing, experiments, kids :-).
              </p>
              <p className="f5 mt3 near-black">
                contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
              </p>
            </div>
            
            {/* Right column: Notes */}
            <div className="w-100 w-60-ns pl4-ns bl-ns b--light-gray">
              <p className="f5 fw6 gray mb3 ttu tracked">Notes</p>
              <ul className="list pl0 mt0 mb0">
                {recentPosts.map((post) => (
                  <li key={post.slug} className="mb3 pb3 bb b--light-gray">
                    <a href={`/blog/${post.slug}`} className="f4 near-black link hover-blue lh-title db">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT G: "Notes First" - Writing takes center stage, bio is secondary
// For when the work speaks louder than the intro
// =============================================================================
export function LayoutG() {
  const recentPosts = blogPosts.slice(0, 6)
  
  return (
    <>
      {/* Notes section first */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '620px' }}>
          <p className="f6 fw6 gray mb4 ttu tracked">Recent Writing</p>
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post, index) => (
              <li key={post.slug} className="mb3 flex items-baseline">
                <span className="f6 gray mr3" style={{ minWidth: '1.5rem' }}>{String(index + 1).padStart(2, '0')}</span>
                <a href={`/blog/${post.slug}`} className="f4 near-black underline hover-no-underline lh-title">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* Divider with WebGL */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '400px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>
      
      {/* Bio at bottom */}
      <section className="bg-white pv4">
        <div className="center ph3 tc" style={{ maxWidth: '500px' }}>
          <p className="f5 lh-copy gray">
            <strong className="near-black">Luis Queral</strong> · Product Designer at NYT
          </p>
          <p className="f5 lh-copy near-black mt2">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT H: "The Stream" - Everything flows in one continuous scroll
// Notes interspersed, casual feel
// =============================================================================
export function LayoutH() {
  const recentPosts = blogPosts.slice(0, 4)
  
  return (
    <section className="bg-white pv4">
      <div className="center ph3" style={{ maxWidth: '580px' }}>
        {/* Intro */}
        <p className="f4 lh-copy near-black mb4">
          <strong>Luis Queral</strong> is a product designer and creative technologist 
          at <em>The New York Times</em>. He designs tools and workflows for platforms.
        </p>
        
        {/* WebGL inline */}
        <div className="mv4" style={{ maxWidth: '450px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        {/* More about */}
        <p className="f4 lh-copy near-black mb4">
          In his spare time, he enjoys writing, making audio-visual experiments, 
          and hanging out with his kids :-).
        </p>
        
        {/* Notes inline */}
        <div className="mv4 pa3 bg-near-white br2">
          <p className="f6 fw6 gray mb3">Recent notes:</p>
          {recentPosts.map((post) => (
            <p key={post.slug} className="f5 mb2">
              → <a href={`/blog/${post.slug}`} className="blue underline hover-no-underline">{post.title}</a>
            </p>
          ))}
        </div>
        
        {/* Contact */}
        <p className="f4 lh-copy near-black">
          contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
        </p>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT I: "The Grid" - Notes as visual grid, bio minimal
// More experimental, gallery-like
// =============================================================================
export function LayoutI() {
  const recentPosts = blogPosts.slice(0, 8)
  const stars = ['★', '✦', '✧', '✩', '✫', '✭', '✯', '◆']
  
  return (
    <>
      {/* Minimal header */}
      <section className="bg-white pv4">
        <div className="center ph3 flex-ns items-center-ns justify-between-ns" style={{ maxWidth: '900px' }}>
          <div>
            <p className="f3 fw6 near-black mb1">Luis Queral</p>
            <p className="f5 gray">Product Designer · NYT</p>
          </div>
          <div className="mt3 mt0-ns">
            <span className="f5 near-black">contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a></span>
          </div>
        </div>
      </section>
      
      {/* WebGL */}
      <section className="bg-near-white pv4">
        <div className="center ph3" style={{ maxWidth: '500px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
      </section>
      
      {/* Notes grid */}
      <section className="bg-white pv4">
        <div className="center ph3" style={{ maxWidth: '900px' }}>
          <p className="f6 fw6 gray mb4 ttu tracked">Notes on art & technology</p>
          <div className="flex flex-wrap" style={{ margin: '-0.5rem' }}>
            {recentPosts.map((post, index) => (
              <div key={post.slug} className="w-100 w-50-ns pa2">
                <a 
                  href={`/blog/${post.slug}`} 
                  className="db pa3 bg-near-white hover-bg-light-gray br2 link near-black"
                >
                  <span className="f4 gray mr2">{stars[index % stars.length]}</span>
                  <span className="f5 lh-title">{post.title}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// =============================================================================
// LAYOUT J: "The Edge" - Content pushed hard left, massive negative space
// Tension through asymmetry, brutalist influence
// =============================================================================
export function LayoutJ() {
  const recentPosts = blogPosts.slice(0, 6)
  
  return (
    <section className="bg-white min-vh-100 pa4">
      <div style={{ maxWidth: '380px' }}>
        {/* Name as statement */}
        <p className="f2 fw7 near-black mb4 lh-solid" style={{ letterSpacing: '-0.02em' }}>
          Luis<br/>Queral
        </p>
        
        {/* WebGL - small, deliberate */}
        <div className="mb4" style={{ maxWidth: '280px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        {/* Bio - terse */}
        <p className="f5 lh-copy gray mb4">
          Product designer, creative technologist.<br/>
          The New York Times.<br/>
          Baltimore.
        </p>
        
        {/* Notes - numbered, clinical */}
        <div className="mb4">
          <p className="f7 ttu tracked gray mb3">Writing</p>
          {recentPosts.map((post, i) => (
            <p key={post.slug} className="f6 mb2">
              <span className="gray mr2">{String(i + 1).padStart(2, '0')}</span>
              <a href={`/blog/${post.slug}`} className="near-black link underline hover-no-underline">
                {post.title}
              </a>
            </p>
          ))}
        </div>
        
        {/* Contact */}
        <p className="f6 near-black">
          contact: <a href="mailto:hey@queral.studio" className="blue link underline hover-no-underline">hey@queral.studio</a>
        </p>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT K: "The Void" - Dark mode, content floating in space
// Mysterious, cinematic, the WebGL glows
// =============================================================================
export function LayoutK() {
  const recentPosts = blogPosts.slice(0, 5)
  
  return (
    <section 
      className="min-vh-100 pa4 flex flex-column justify-center"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="center w-100" style={{ maxWidth: '600px' }}>
        {/* WebGL as focal point */}
        <div className="mb5 center" style={{ maxWidth: '400px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        {/* Name - glowing */}
        <p className="f3 fw6 tc mb3" style={{ color: '#e0e0e0' }}>
          Luis Queral
        </p>
        
        {/* Role - dim */}
        <p className="f5 tc mb5" style={{ color: '#666' }}>
          Product Designer · Creative Technologist · NYT
        </p>
        
        {/* Notes - subtle links */}
        <div className="tc">
          <p className="f7 ttu tracked mb3" style={{ color: '#444' }}>Notes</p>
          {recentPosts.map((post) => (
            <p key={post.slug} className="mb2">
              <a 
                href={`/blog/${post.slug}`} 
                className="f5 link dim"
                style={{ color: '#888' }}
              >
                {post.title}
              </a>
            </p>
          ))}
        </div>
        
        {/* Contact - bottom */}
        <p className="f6 tc mt5" style={{ color: '#e0e0e0' }}>
          contact: <a href="mailto:hey@queral.studio" className="link dim" style={{ color: '#6699ff' }}>
            hey@queral.studio
          </a>
        </p>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT L: "The Overlap" - Layers that intersect, broken expectations
// Elements bleed into each other, depth through overlap
// =============================================================================
export function LayoutL() {
  const recentPosts = blogPosts.slice(0, 5)
  
  return (
    <section className="bg-white min-vh-100 relative overflow-hidden">
      {/* Background accent bar */}
      <div 
        className="absolute bg-near-white"
        style={{ 
          top: '20%', 
          left: 0, 
          right: 0, 
          height: '60%',
          zIndex: 0 
        }}
      />
      
      <div className="relative pa4" style={{ zIndex: 1 }}>
        {/* Name - overlapping the accent */}
        <p 
          className="f1 fw7 near-black mb0"
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em'
          }}
        >
          Luis
        </p>
        <p 
          className="f1 fw7 mb4"
          style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#bbb'
          }}
        >
          Queral
        </p>
        
        {/* Content grid - offset */}
        <div className="flex-ns mt5">
          {/* Left: Bio + Contact */}
          <div className="w-100 w-40-ns pr4-ns mb4 mb0-ns">
            <p className="f5 lh-copy gray mb4">
              Product designer and creative technologist at The New York Times. 
              Writing, experiments, kids.
            </p>
            <p className="f6 near-black">
              contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
            </p>
          </div>
          
          {/* Right: WebGL + Notes */}
          <div className="w-100 w-60-ns">
            <div className="mb4" style={{ maxWidth: '350px', marginLeft: 'auto' }}>
              <WebGLMorpher
                image1Url="/images/luis.png"
                image2Url="/images/pelican.png"
              />
            </div>
            
            <div className="pl4-ns">
              <p className="f7 ttu tracked gray mb3">Recent Notes</p>
              {recentPosts.map((post) => (
                <p key={post.slug} className="f5 mb2 lh-title">
                  <a href={`/blog/${post.slug}`} className="near-black link underline hover-no-underline">
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT M: "The Scroll" - Ultra-narrow, vertical reading experience
// Like an ancient scroll or mobile-first taken to extreme
// =============================================================================
export function LayoutM() {
  const recentPosts = blogPosts.slice(0, 8)
  
  return (
    <section className="bg-white min-vh-100 flex justify-center">
      <div className="pa4" style={{ maxWidth: '320px' }}>
        {/* WebGL - full width of narrow column */}
        <div className="mb4">
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        {/* Divider */}
        <div className="bb b--light-gray mb4" />
        
        {/* Name */}
        <p className="f4 fw6 near-black mb2">Luis Queral</p>
        <p className="f6 gray mb4">
          Product designer and creative technologist at The New York Times.
        </p>
        
        {/* Divider */}
        <div className="bb b--light-gray mb4" />
        
        {/* Notes - each as a block */}
        <p className="f7 ttu tracked gray mb3">Notes</p>
        {recentPosts.map((post) => (
          <div key={post.slug} className="mb3 pb3 bb b--light-gray">
            <a 
              href={`/blog/${post.slug}`} 
              className="f5 near-black link lh-title db hover-blue"
            >
              {post.title}
            </a>
          </div>
        ))}
        
        {/* Contact at bottom */}
        <p className="f6 near-black mt4">
          contact: <a href="mailto:hey@queral.studio" className="blue link underline hover-no-underline">hey@queral.studio</a>
        </p>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT N: "The Split" - Hard vertical divide, two worlds
// Bio and face on left, notes on right, no mixing
// =============================================================================
export function LayoutN() {
  const recentPosts = blogPosts.slice(0, 7)
  
  return (
    <div className="flex-ns min-vh-100">
      {/* Left half - Identity */}
      <div className="w-100 w-50-ns bg-near-white pa4 flex flex-column justify-center">
        <div style={{ maxWidth: '320px' }}>
          <div className="mb4">
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />
          </div>
          
          <p className="f3 fw6 near-black mb2">Luis Queral</p>
          <p className="f5 lh-copy gray mb3">
            Product designer and creative technologist at The New York Times. Baltimore.
          </p>
          <p className="f6 near-black">
            contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
          </p>
        </div>
      </div>
      
      {/* Right half - Notes */}
      <div className="w-100 w-50-ns bg-white pa4 flex flex-column justify-center">
        <div style={{ maxWidth: '400px' }}>
          <p className="f7 ttu tracked gray mb4">Notes on art & technology</p>
          
          {recentPosts.map((post, i) => (
            <div key={post.slug} className="mb3 flex items-baseline">
              <span 
                className="f5 gray mr3" 
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {i + 1}
              </span>
              <a 
                href={`/blog/${post.slug}`} 
                className="f4 near-black link lh-title hover-blue"
              >
                {post.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// LAYOUT O: "The Statement" - One big headline, everything else secondary
// Name as architecture, confidence through scale
// =============================================================================
export function LayoutO() {
  const recentPosts = blogPosts.slice(0, 4)
  
  return (
    <section className="bg-white min-vh-100 pa4 flex flex-column justify-between">
      {/* Giant name at top */}
      <div>
        <p 
          className="near-black fw7 mb0"
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em'
          }}
        >
          LUIS
        </p>
        <p 
          className="fw7 mb0"
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: '#ddd'
          }}
        >
          QUERAL
        </p>
      </div>
      
      {/* Middle: WebGL small, off to the side */}
      <div className="flex-ns items-end justify-between mv4">
        <div style={{ maxWidth: '250px' }}>
          <WebGLMorpher
            image1Url="/images/luis.png"
            image2Url="/images/pelican.png"
          />
        </div>
        
        <div className="mt4 mt0-ns tr-ns" style={{ maxWidth: '350px' }}>
          <p className="f5 lh-copy gray">
            Product designer and creative technologist at The New York Times.
          </p>
        </div>
      </div>
      
      {/* Bottom: Notes as inline list + contact */}
      <div className="flex-ns items-end justify-between">
        <div className="mb3 mb0-ns">
          <p className="f7 ttu tracked gray mb2">Recent</p>
          <div className="flex flex-wrap" style={{ gap: '0.5rem 1.5rem' }}>
            {recentPosts.map((post) => (
              <a 
                key={post.slug}
                href={`/blog/${post.slug}`} 
                className="f6 near-black link underline hover-no-underline"
              >
                {post.title}
              </a>
            ))}
          </div>
        </div>
        
        <span className="f6 near-black">
          contact: <a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">hey@queral.studio</a>
        </span>
      </div>
    </section>
  )
}

// =============================================================================
// LAYOUT P: "The Magazine Split" - Fixed left sidebar, scrollable right content
// Clean two-column layout: bio stays put, notes scroll
// =============================================================================
export function LayoutP() {
  const recentPosts = blogPosts.slice(0, 20)
  const sidebarWidth = 400
  
  // Light/washed background colors
  const bgColors = [
    '#faf8f0', // warm cream
    '#f0f4f8', // light blue-gray
    '#f5f0fa', // light lavender
    '#f0faf5', // light mint
    '#faf5f0', // light peach
    '#f8f8f0', // light yellow
    '#f0f8f8', // light cyan
    '#faf0f5', // light pink
    '#f5faf0', // light lime
    '#f8f0f0', // light rose
  ]
  
  const [bgColor] = useState(() => bgColors[Math.floor(Math.random() * bgColors.length)])
  
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
        <p className="f6 lh-copy near-black">
          <strong>Luis Queral</strong> is a product designer and creative technologist.
        </p>
        <p className="f6 lh-copy near-black">
          He currently works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> focusing on improving developer workflows and building our Generative Design Lab.
        </p>
        <p className="f6 lh-copy near-black">
          In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
        </p>
        <ul className="f6 lh-copy mt3 near-black pl3">
          <li className="mb1"><a href="#" className="blue underline hover-no-underline">about me</a></li>
          <li className="mb1"><a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">contact</a></li>
          <li><a href="https://instagram.com/studio.queral" className="blue underline hover-no-underline">instagram</a></li>
        </ul>
      </div>
      
      {/* Mobile: stacked layout (no fixed positioning) */}
      <div className="db-md">
        <div className="pa4" style={{ backgroundColor: bgColor }}>
          <div className="center" style={{ maxWidth: '400px' }}>
            <div className="mb3 center" style={{ maxWidth: '200px' }}>
              <WebGLMorpher
                image1Url="/images/luis.png"
                image2Url="/images/pelican.png"
                hideSlider={true}
              />
            </div>
            <p className="f6 lh-copy near-black">
              <strong>Luis Queral</strong> is a product designer and creative technologist.
            </p>
            <p className="f6 lh-copy near-black">
              He currently works for <em style={{ whiteSpace: 'nowrap' }}>The New York Times</em> focusing on improving developer workflows and building our Generative Design Lab.
            </p>
            <p className="f6 lh-copy near-black">
              In his spare time, he enjoys writing, making audio-visual experiments, and hanging out with his kids :-).
            </p>
            <ul className="f6 lh-copy mt3 near-black pl3">
              <li className="mb1"><a href="#" className="blue underline hover-no-underline">about me</a></li>
              <li className="mb1"><a href="mailto:hey@queral.studio" className="blue underline hover-no-underline">contact</a></li>
              <li><a href="https://instagram.com/studio.queral" className="blue underline hover-no-underline">instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="bg-white pa4">
          <div className="center" style={{ maxWidth: '500px' }}>
          <p className="f6 near-black mb4"><strong>selected thoughts</strong> on art and technology</p>
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post, index) => {
              const bullet = '*'
              const subtitles = {
                'mapping-generative-arena': 'breaking down emerging workflows in product design',
                'generating-software': 'a few things to keep in mind when generating software',
                'trading-floor-software-design': 'reflecting on my time at goldman sachs',
                'diagramming-with-llms': 'advice for designers and engineers alike',
                'generative-music-making': 'a framework for creative AI collaboration',
                'engineering-still-hard': 'practical advice from building with LLMs',
                'transcripts-are-gold': 'was Plato onto something??',
                'generative-design-thinking': 'product design in the age of the LLM',
                'how-designers-talk-about-ai': 'communication standards from the Generative Design Lab',
                'cursor-for-research': "it's more than just for prototypes!",
                'writing-design-superpower': 'reflections on my writing practice over the years',
                'introducing-data-synth': 'ever wondered what it would sound like to run a spreadsheet through a modular synth?',
                'media-toolkit': 'my personal workflow for automated media manipulation',
                'prompts-that-help': 'an ever growing, updated list of my personal favorites',
                'reflections-on-happyfood': 'my personal introduction to making art on the internet',
                'split-triple-diamond': 'a working model for design and engineering teams that block each other constantly.',
              }
              return (
                <li key={post.slug} className="mb4 flex items-start">
                  <span className="mr2 moon-gray" style={{ fontSize: '2em', lineHeight: '1', marginTop: '0.02em' }}>{bullet}</span>
                  <div>
                    <a href={`/blog/${post.slug}`} className="f5 blue underline hover-no-underline lh-title db">
                      {post.title}
                    </a>
                    {subtitles[post.slug] && (
                      <p className="f6 gray mt1 mb0 lh-copy">{subtitles[post.slug]}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          
          <div className="mt5 pt4 bt b--light-gray">
            <NewsletterSignup />
          </div>
          </div>
        </div>
      </div>
      
      {/* Desktop: scrollable right content with margin offset */}
      <div 
        className="dn-md bg-white pa4"
        style={{ marginLeft: `${sidebarWidth}px`, minHeight: '100vh' }}
      >
        <div style={{ maxWidth: '580px' }}>
          <p className="f6 near-black mb4"><strong>selected thoughts</strong> on art and technology</p>
          
          <ul className="list pl0 mt0 mb0">
            {recentPosts.map((post, index) => {
              const bullet = '*'
              const subtitles = {
                'mapping-generative-arena': 'breaking down emerging workflows in product design',
                'generating-software': 'a few things to keep in mind when generating software',
                'trading-floor-software-design': 'reflecting on my time at goldman sachs',
                'diagramming-with-llms': 'advice for designers and engineers alike',
                'generative-music-making': 'a framework for creative AI collaboration',
                'engineering-still-hard': 'practical advice from building with LLMs',
                'transcripts-are-gold': 'was Plato onto something??',
                'generative-design-thinking': 'product design in the age of the LLM',
                'how-designers-talk-about-ai': 'communication standards from the Generative Design Lab',
                'cursor-for-research': "it's more than just for prototypes!",
                'writing-design-superpower': 'reflections on my writing practice over the years',
                'introducing-data-synth': 'ever wondered what it would sound like to run a spreadsheet through a modular synth?',
                'media-toolkit': 'my personal workflow for automated media manipulation',
                'prompts-that-help': 'an ever growing, updated list of my personal favorites',
                'reflections-on-happyfood': 'my personal introduction to making art on the internet',
                'split-triple-diamond': 'a working model for design and engineering teams that block each other constantly.',
              }
              return (
                <li key={post.slug} className="mb4 flex items-start">
                  <span className="mr2 moon-gray" style={{ fontSize: '2em', lineHeight: '1', marginTop: '0.02em' }}>{bullet}</span>
                  <div>
                    <a href={`/blog/${post.slug}`} className="f5 blue underline hover-no-underline lh-title db">
                      {post.title}
                    </a>
                    {subtitles[post.slug] && (
                      <p className="f6 gray mt1 mb0 lh-copy">{subtitles[post.slug]}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          
          <div className="mt5 pt4 bt b--light-gray">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </>
  )
}
