import WebGLMorpher from './WebGLMorpher'
import FeaturedSection from './FeaturedSection'

function HomePage() {
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
                  This website is where I publish my work, write about my process, and share
                  scraps of inspiration.
                </p>
                <p className="mb4 f4 near-black">
                  You can reach me at{' '}
                  <a href="mailto:hey@queral.studio" className="link blue hover-dark-blue">
                    hey@queral.studio
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="pt2 pb3 mw5-5 center">
          <FeaturedSection />
        </div>
      </div>
    </>
  )
}

export default HomePage

