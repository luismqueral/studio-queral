function FeaturedSection() {
  const featuredItems = [
    {
      year: '2025',
      title: 'The split-triple diamond process',
      description: 'a working model for designers and developers',
      url: '/split-triple-diamond-process',
      external: false,
      image: 'https://via.placeholder.com/400x200/e5e5e5/e5e5e5',
    },
    {
      year: '2025',
      title: 'On Creative Confidence',
      description: 'essay on building creative practice',
      url: '/on-creative-confidence',
      external: false,
      image: '/images/projects/rza.png',
    },
    {
      year: '2025',
      title: 'Crystal Legs',
      description: 'ambient music album',
      url: 'https://ieatthings.bandcamp.com/album/100',
      external: true,
      image: '/images/projects/crystal-legs.png',
      fullImage: true,
      hideTitle: true,
      hideDescription: true,
    },
    {
      year: '2025',
      title: 'spooky looper',
      description: 'a playground for looping sounds',
      url: '#',
      external: false,
      image: '/images/projects/spooky-looper.png',
      fullImage: true,
    },
    {
      year: '2025',
      title: 'Waves Vol. 1',
      description: 'experimental electronic music',
      url: 'https://ieatthings.bandcamp.com/album/waves-vol-1',
      external: true,
      image: '/images/projects/waves.png',
      fullImage: true,
      hideTitle: true,
      hideDescription: true,
    },
    {
      year: '2025',
      title: 'Lamar Gnome',
      description: 'interactive web project',
      url: '#',
      external: false,
      image: 'https://via.placeholder.com/400x200/e5e5e5/e5e5e5',
    },
  ]

  return (
    <section className="lh-copy">
      <p className="mb3 fw6 f4">
        <strong>recent work</strong>
      </p>

      <ul className="list pl0 mb4">
        {featuredItems.map((item, index) => (
          <li key={index} className="mb4">
            <a
              href={item.url}
              className="link blue hover-dark-blue hover-underline db"
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="flex items-start">
                <span className="gray f6 ibm-mono mr3 mt1" style={{ minWidth: '3rem', marginLeft: '-4rem' }}>
                  {item.year}
                </span>
                <div className="flex-auto">
                  {!item.hideTitle && <span className="f4 db mb1">{item.title}</span>}
                  {!item.hideDescription && <span className="f5 mid-gray db mb2">{item.description}</span>}
                  {item.image && (
                    item.fullImage ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="db br2 w-70"
                        style={{ height: 'auto' }}
                      />
                    ) : (
                      <div 
                        className="br2 bg-light-gray"
                        style={{ width: '400px', height: '200px' }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-100 h-100 br2"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FeaturedSection

