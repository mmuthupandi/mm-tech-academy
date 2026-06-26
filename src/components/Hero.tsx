import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Silk from './Silk';
import logo from '../assets/mm orange logo.png';

const AshokaChakra = ({ size = 140 }: { size?: number }) => {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.44;
  const innerR = size * 0.06;
  const ringW = size * 0.025;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#000080" strokeWidth={ringW} />
      <circle cx={cx} cy={cy} r={outerR * 0.12} fill="#000080" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15 - 90) * (Math.PI / 180);
        return (
          <line
            key={i}
            x1={cx + innerR * Math.cos(a)}
            y1={cy + innerR * Math.sin(a)}
            x2={cx + outerR * 0.92 * Math.cos(a)}
            y2={cy + outerR * 0.92 * Math.sin(a)}
            stroke="#000080"
            strokeWidth={ringW * 0.7}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

interface HeroProps {
  onOpenTeaser?: () => void;
}

export const Hero = ({ onOpenTeaser }: HeroProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale   = useTransform(scrollYProgress, [0, 1],   [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section ref={ref} className="hero" style={{ background: '#000', position: 'relative' }}>

      {/* ── Logo Top Left ───────────────────────────────────────────── */}
      <style>{`
        .hero-logo-wrapper {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 10;
          display: flex;
          align-items: center;
        }
        .hero-logo-img {
          height: 140px;
          width: auto;
        }
        @media (max-width: 768px) {
          .hero-logo-wrapper {
            top: 1.5rem;
            left: 1.5rem;
          }
          .hero-logo-img {
            height: 90px;
          }
        }
      `}</style>
      <div className="hero-logo-wrapper">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="MM Tech Academy" className="hero-logo-img" />
        </Link>
      </div>
      {/* ── Saffron band — top third ──────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        clipPath: 'inset(0 0 66.67% 0)',
      }}>
        <Silk speed={5} scale={1.1} color="#FF6B00" noiseIntensity={2} rotation={0} />
      </div>

      {/* ── White band — middle third ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        clipPath: 'inset(33.33% 0 33.33% 0)',
      }}>
        <Silk speed={5} scale={1.1} color="#e8e8e8" noiseIntensity={0.4} rotation={0} />
      </div>

      {/* ── Green band — bottom third ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        clipPath: 'inset(66.67% 0 0 0)',
      }}>
        <Silk speed={5} scale={1.1} color="#138808" noiseIntensity={2} rotation={0} />
      </div>

      {/* ── Ashoka Chakra — centred on white band ────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.45,
      }}>
        <AshokaChakra size={160} />
      </div>

      {/* ── Readable overlay ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'rgba(0,0,0,0.42)',
        pointerEvents: 'none',
      }} />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <motion.div
        className="hero-content container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 3, scale, opacity }}
      >
        <h1 className="hero-title" style={{ fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Get the best <br />
          <span className="text-gradient">in Everything.</span>
        </h1>
        <p className="hero-subtitle" style={{ opacity: 0.9, maxWidth: '600px' }}>
          Equipping students, professionals, and entrepreneurs with cutting-edge skills to solve our planet's toughest problems.
        </p>
        <div className="hero-buttons" style={{ justifyContent: 'center' }}>
          <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
          <Link to="/partner" className="btn btn-outline">Partner With Us</Link>
        </div>
      </motion.div>

      {/* ── Scroll Down Indicator ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'rgba(255, 255, 255, 0.9)',
          cursor: 'pointer',
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Teaser Badge - Now Absolute to Hero */}
      {onOpenTeaser && (
        <div className="news-link-badge" onClick={onOpenTeaser}>
          <div className="pulse-dot"></div>
          🚀 Sneak Peek: Traveloop
        </div>
      )}
    </section>
  );
};
