import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const RADIUS = 64;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~402px
const DURATION = 2800; // ms for circle to complete

export const Loader = () => {
  const [visible, setVisible]   = useState(true);
  const [fading, setFading]     = useState(false);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const start = performance.now();

    // Animate progress 0 → 1 over DURATION
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Circle complete — short pause then fade
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 600);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>

      {/* Circle progress + logo */}
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>

        {/* Track */}
        <svg width="160" height="160" viewBox="0 0 160 160"
          style={{ position: 'absolute', inset: 0 }}>
          <circle cx="80" cy="80" r={RADIUS}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
          />
        </svg>

        {/* Progress arc — starts at top, fills clockwise */}
        <svg width="160" height="160" viewBox="0 0 160 160"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
          <circle cx="80" cy="80" r={RADIUS}
            fill="none"
            stroke="#6A63B7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
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

      {/* Percentage */}
      <span style={{
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#6A63B7',
        fontFamily: 'var(--font-primary)',
        letterSpacing: '0.05em',
      }}>
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
};
