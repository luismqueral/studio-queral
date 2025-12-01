import { useEffect, useRef } from 'react';

/**
 * Asciinema Player Component
 * Uses the standalone asciinema-player library
 */
export function AsciinemaPlayer({ 
  src, 
  rows = 24, 
  cols = 80, 
  autoPlay = true, 
  loop = false, 
  speed = 1,
  idleTimeLimit = 2 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Load CSS
    if (!document.getElementById('asciinema-css')) {
      const link = document.createElement('link');
      link.id = 'asciinema-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/asciinema-player@3.6.1/dist/bundle/asciinema-player.css';
      document.head.appendChild(link);
    }

    // Load and create player
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/asciinema-player@3.6.1/dist/bundle/asciinema-player.min.js';
    script.onload = () => {
      if (containerRef.current && window.AsciinemaPlayer) {
        // Clear any existing content
        containerRef.current.innerHTML = '';
        
        window.AsciinemaPlayer.create(
          src,
          containerRef.current,
          {
            cols,
            rows,
            autoPlay,
            loop,
            speed,
            idleTimeLimit,
            theme: 'monokai',
            fit: 'width',
            poster: 'npt:0:3', // Show frame at 3 seconds as poster
          }
        );
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="asciinema-container" 
      style={{ 
        width: '100%', 
        borderRadius: '8px', 
        overflow: 'hidden',
        margin: '1.5em 0',
      }} 
    />
  );
}

export default AsciinemaPlayer;
