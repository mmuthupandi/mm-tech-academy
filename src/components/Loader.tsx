import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    // Start fade after 1.8s (or when window load fires, whichever is later)
    const minTimer = setTimeout(startFade, 1800);

    function startFade() {
      setFading(true);
      setTimeout(() => setVisible(false), 500); // match CSS transition
    }

    const onLoad = () => {
      clearTimeout(minTimer);
      startFade();
    };

    if (document.readyState === 'complete') {
      // already loaded — respect minimum timer
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Spinner ring + logo wrapper */}
      <div style={{ position: 'relative', width: '180px', height: '180px' }}>

        {/* Rotating SVG ring */}
        <svg
          width="180" height="180"
          viewBox="0 0 180 180"
          style={{
            position: 'absolute', inset: 0,
            animation: 'loader-spin 1.1s linear infinite',
          }}
        >
          <circle
            cx="90" cy="90" r="82"
            fill="none"
            stroke="#6A63B7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="380 130"
          />
        </svg>

        {/* Logo centred inside ring */}
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
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
