import { useState, useEffect } from 'react'
import WebGLMorpher from './WebGLMorpher'
import FeaturedSection from './FeaturedSection'
import NewsletterSignup from './NewsletterSignup'

// Random takes - add more here
const takes = [
  "The Fifth Element is the greatest sci-fi movie ever made.",
]

function HomePage() {
  const [randomTake, setRandomTake] = useState('')

  useEffect(() => {
    // Pick a random take on component mount
    const randomIndex = Math.floor(Math.random() * takes.length)
    setRandomTake(takes[randomIndex])
  }, [])
  return (
    <>
      {/* Introduction Section */}
      <div className="center bg-white-gray-gradient" id="logo-header">
        <div className="pt4 pb2">
          <div className="mw5-5 center">
            <div className="mw5-5 center">
              <p className="f4 lh-copy near-black">
                Hello, my name is <strong>Luis Queral</strong>.
              </p>

              <p className="f4 lh-copy">
                I am a product designer and hypermedia artist based in Baltimore, Maryland.
              </p>
              <p className="f4">
                I currently work for <em style={{ whiteSpace: 'nowrap' }}>The New York Times.</em>
              </p>
            </div>

            {/* WebGL Morphing Canvas and slider */}
            <WebGLMorpher
              image1Url="/images/luis.png"
              image2Url="/images/pelican.png"
            />

            {/* Body content */}
            <div className="mw5-5 center">
              <section className="lh-copy">
                <p className="mb3 f4">
                  I'm still working on this site, will be posting projects and an about section soon.
                </p>

                {/* Random Take */}
                {/* {randomTake && (
                  <p className="mb3 f4 near-black">
                    {randomTake}
                  </p>
                )} */}

                <p className="mb3 f4 near-black">
                  You can reach me at{' '}
                  <a href="mailto:hey@queral.studio" className="link blue hover-dark-blue">
                    hey@queral.studio
                  </a>
                </p>
                
                {/* Newsletter Signup */}
                <NewsletterSignup />
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {/* <div className="content-section">
        <div className="pt2 pb3 mw5-5 center">
          <FeaturedSection />
        </div>
      </div> */}
    </>
  )
}

export default HomePage

