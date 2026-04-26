import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const FILL_DURATION = 1.6; // seconds to draw the full circle
const TOTAL_MS = FILL_DURATION * 1000 + 400; // fill + brief pause before fade

export const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }, TOTAL_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>

      <div style={{ position: 'relative', width: '160px', height: '160px' }}>

        {/* Grey track */}
        <svg width="160" height="160" viewBox="0 0 160 160"
          style={{ position: 'absolute', inset: 0 }}>
          <circle cx="80" cy="80" r="64"
            fill="none" stroke="#e2e8f0" strokeWidth="3" />
        </svg>

        {/* Circle that draws itself fully, starting from top */}
        <svg width="160" height="160" viewBox="0 0 160 160"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r="64"
            fill="none"
            stroke="#6A63B7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="402"
            strokeDashoffset="402"
            style={{
              animation: `draw-circle ${FILL_DURATION}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            }}
          />
        </svg>

        {/* Logo */}
        <img
          src={logo}
          alt="MM Tech Academy"
          style={{
            position: 'absolute',
            inset: '22px',
            width: 'calc(100% - 44px)',
            height: 'calc(100% - 44px)',
            objectFit: 'contain',
          }}
        />
      </div>

      <style>{`
        @keyframes draw-circle {
          from { stroke-dashoffset: 402; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};
