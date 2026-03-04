import { useState } from 'react'

/**
 * AlbumCard — displays a single album's cover art, metadata, and expandable track listing.
 *
 * Props:
 *   album: { slug, album, artist, year, genre, coverUrl, trackCount, tracks }
 */
function AlbumCard({ album }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    // Only expand if there are tracks to show
    if (album.tracks && album.tracks.length > 0) {
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div className="mb4">
      {/* Album cover + basic info */}
      <div
        className="pointer"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleToggle()
          }
        }}
        aria-expanded={isExpanded}
        aria-label={`${album.album} by ${album.artist}. ${album.trackCount} tracks. Click to ${isExpanded ? 'collapse' : 'expand'} track listing.`}
      >
        {/* Cover art — square, fills the card width */}
        {album.coverUrl ? (
          <img
            src={album.coverUrl}
            alt={`${album.album} cover art`}
            className="db w-100 aspect-1x1 object-cover bg-light-gray"
            loading="lazy"
          />
        ) : (
          <div className="w-100 aspect-1x1 bg-light-gray flex items-center justify-center">
            <span className="f3 moon-gray">No Art</span>
          </div>
        )}

        {/* Album metadata */}
        <div className="mt2">
          <p className="f5 near-black fw6 mb1 lh-title">{album.album}</p>
          <p className="f6 gray mb0 lh-copy">
            {album.artist}
            {album.year && <span className="ml1">({album.year})</span>}
          </p>
          {album.genre && (
            <p className="f7 silver mb0 mt1">{album.genre}</p>
          )}
        </div>
      </div>

      {/* Expandable track listing */}
      {isExpanded && album.tracks && album.tracks.length > 0 && (
        <div className="mt2 f7 gray">
          <p className="silver mb2">{album.trackCount} track{album.trackCount !== 1 ? 's' : ''}</p>
          <ol className="list pl0 ma0">
            {album.tracks.map((track, i) => (
              <li key={i} className="pv1 bb b--near-white lh-copy">
                <span className="silver dib mr2" aria-hidden="true">
                  {track.number != null ? String(track.number).padStart(2, '0') : '—'}
                </span>
                <span className="near-black">{track.title}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default AlbumCard
