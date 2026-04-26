import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(startFade, 2200);

    function startFade() {
      setFading(true);
      setTimeout(() => setVisible(false), 600);
    }

    const onLoad = () => {
      clearTimeout(minTimer);
      startFade();
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', onLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!visible) return null;

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
      gap: '2rem',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>

      {/* Spinner + logo */}
      <div style={{ position: 'relative', width: '140px', height: '140px' }}>

        {/* Outer track ring */}
        <svg width="140" height="140" viewBox="0 0 140 140"
          style={{ position: 'absolute', inset: 0 }}>
          <circle cx="70" cy="70" r="64"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="3"
          />
        </svg>

        {/* Spinning arc */}
        <svg width="140" height="140" viewBox="0 0 140 140"
          style={{
            position: 'absolute', inset: 0,
            animation: 'loader-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}>
          <circle cx="70" cy="70" r="64"
            fill="none"
            stroke="#6A63B7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="80 322"
            strokeDashoffset="0"
          />
        </svg>

        {/* Logo centred */}
        <img
          src={logo}
          alt="MM Tech Academy"
          style={{
            position: 'absolute',
            inset: '20px',
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            objectFit: 'contain',
            animation: 'loader-pulse 1.8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: '#6A63B7',
            animation: `loader-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(0.95); }
        }
        @keyframes loader-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
};
