import { useState, useEffect } from 'react';

export function StrategyCard() {
  const [strategies, setStrategies] = useState([]);
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch strategies on mount
  useEffect(() => {
    fetch('/assets/strategy-cards.json')
      .then(res => res.json())
      .then(data => {
        setStrategies(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load strategies:', err);
        setIsLoading(false);
      });
  }, []);

  const drawCard = () => {
    if (strategies.length === 0) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * strategies.length);
      setCurrentStrategy(strategies[randomIndex]);
      setIsFlipping(false);
    }, 150);
  };

  if (isLoading) {
    return (
      <div style={{ 
        margin: '2em 0',
        padding: '3em 2em',
        background: '#1a1a1a',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#666'
      }}>
        Loading strategies...
      </div>
    );
  }

  return (
    <div style={{ margin: '2em 0' }}>
      <div
        onClick={drawCard}
        style={{
          background: currentStrategy ? '#1a1a1a' : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: currentStrategy ? '2em' : '3em 2em',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          transform: isFlipping ? 'scale(0.98)' : 'scale(1)',
          minHeight: currentStrategy ? 'auto' : '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: currentStrategy ? 'flex-start' : 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.01)';
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        }}
      >
        {currentStrategy ? (
          <>
            <div style={{ 
              fontSize: '0.75em', 
              color: '#888', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '0.5em'
            }}>
              {currentStrategy.theme}
            </div>
            <h3 style={{ 
              margin: '0 0 0.75em 0', 
              color: '#fff',
              fontSize: '1.25em',
              fontWeight: 600
            }}>
              {currentStrategy.title}
            </h3>
            <p style={{ 
              margin: 0, 
              color: '#ccc',
              lineHeight: 1.6,
              fontSize: '0.95em',
              whiteSpace: 'pre-line'
            }}>
              {currentStrategy.prompt}
            </p>
            <div style={{
              marginTop: '1.5em',
              fontSize: '0.8em',
              color: '#666'
            }}>
              Click for another · {strategies.length} cards total
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2em', 
              marginBottom: '0.5em',
              opacity: 0.8
            }}>
              🎴
            </div>
            <div style={{ 
              color: '#999',
              fontSize: '1em'
            }}>
              Click to draw a strategy card
            </div>
            <div style={{
              marginTop: '0.5em',
              fontSize: '0.8em',
              color: '#666'
            }}>
              {strategies.length} cards available
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StrategyCard;
