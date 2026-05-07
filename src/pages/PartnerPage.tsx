import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Building2, Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useIsMobile } from '../hooks/useIsMobile';

const companies = [
  "Aakash", "Aditya Birla", "Arcesium", "August AI", "Bizom", "Boston Consulting Group (BCG)",
  "Capital2B", "Clix Capital", "DE Shaw", "Decision Tree", "Educational Initiatives", "Eggoz",
  "Flipkart", "Fractal", "Global Data", "Growth Natives", "ICF", "Info Edge", "Jefferies",
  "JM Financial", "LAT Aerospace", "McKinsey & Company", "Meru Capitals", "Nagarro",
  "Pixxel", "Policy Bazaar", "Predli", "Wayground", "Sarvam AI", "Sunteck Realty", "Wayfair", "Whatfix"
];

const orgSizes = ['1–10', '11–50', '51–200', '200+'];

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem 0.75rem 2.75rem',
  border: 'none',
  borderBottom: '1.5px solid #e2e8f0',
  outline: 'none',
  fontSize: '0.92rem',
  fontFamily: 'var(--font-primary)',
  background: 'transparent',
  color: '#0f172a',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s ease',
};

const inputFocusStyle: CSSProperties = {
  ...inputStyle,
  borderBottomColor: '#FF6B00',
};

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
    {children}
  </span>
);

export const PartnerPage = () => {
  const isMobile = useIsMobile();
  const [focused, setFocused] = useState<string | null>(null);
  const [orgSize, setOrgSize] = useState<string | null>(null);
  const gs = (n: string): CSSProperties => focused === n ? inputFocusStyle : inputStyle;

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar />

      {/* ── Page hero ────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a0800 0%, #2d1200 100%)',
        paddingTop: '8rem', paddingBottom: '5rem',
        textAlign: 'center', color: 'white',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(19,136,8,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', zIndex: 1, padding: '0 2rem' }}
        >
          <span style={{ display: 'inline-block', background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.5)', borderRadius: '9999px', padding: '0.35rem 1.2rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#ffb366', marginBottom: '1.5rem' }}>
            Partner With Us
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            Grow together.<br />
            <span style={{ background: 'linear-gradient(90deg, #FF6B00, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Impact millions.
            </span>
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.7, maxWidth: 500, margin: '0 auto' }}>
            Join 30+ organisations co-creating the next generation of tech talent across 25 countries.
          </p>
        </motion.div>
      </div>

      {/* ── Partner form card ─────────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? '3rem 1.25rem 4rem' : '4rem 2rem 6rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: 900,
            margin: '0 auto',
            background: 'white',
            borderRadius: 24,
            boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr',
          }}
        >
          {/* ── Left panel ─────────────────────────────────────────────── */}
          <div style={{
            background: 'linear-gradient(160deg, #f5f3ff 0%, #ede9fe 100%)',
            padding: isMobile ? '2.5rem 2rem' : '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem',
          }}>
            {/* Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
                  <circle key={`${row}-${col}`} cx={20 + col * 18} cy={20 + row * 18} r="2" fill="#c4b5fd" opacity="0.5" />
                )))}
                <ellipse cx="72" cy="148" rx="22" ry="8" fill="#ddd6fe" />
                <rect x="58" y="90" width="28" height="52" rx="6" fill="#4c1d95" />
                <rect x="54" y="100" width="12" height="30" rx="6" fill="#4c1d95" />
                <rect x="72" y="100" width="12" height="30" rx="6" fill="#4c1d95" />
                <circle cx="72" cy="82" r="14" fill="#fbbf24" />
                <ellipse cx="66" cy="79" rx="3" ry="3.5" fill="#92400e" />
                <ellipse cx="78" cy="79" rx="3" ry="3.5" fill="#92400e" />
                <path d="M58 80 Q72 60 86 80" fill="#92400e" />
                <rect x="82" y="88" width="10" height="28" rx="5" fill="#4c1d95" transform="rotate(-30 82 88)" />
                <ellipse cx="132" cy="148" rx="22" ry="8" fill="#ddd6fe" />
                <rect x="118" y="92" width="28" height="50" rx="6" fill="#FF6B00" />
                <rect x="114" y="102" width="12" height="28" rx="6" fill="#FF6B00" />
                <rect x="132" y="102" width="12" height="28" rx="6" fill="#FF6B00" />
                <circle cx="132" cy="84" r="14" fill="#fed7aa" />
                <ellipse cx="126" cy="81" rx="2.5" ry="3" fill="#138808" />
                <ellipse cx="138" cy="81" rx="2.5" ry="3" fill="#138808" />
                <path d="M118 82 Q132 65 146 82" fill="#d97706" />
                <rect x="118" y="90" width="10" height="28" rx="5" fill="#FF6B00" transform="rotate(30 128 90)" />
                <circle cx="100" cy="72" r="6" fill="#fbbf24" opacity="0.8" />
                <line x1="100" y1="60" x2="100" y2="52" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <line x1="112" y1="64" x2="118" y2="58" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                <line x1="88" y1="64" x2="82" y2="58" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                Become a<br />partner
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Join our partner programs to co-create the next generation of tech talent and provide your network with world-class education.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Co-branded certifications', 'Talent pipeline access', 'Global network of 95+ institutions'].map((perk, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.83rem', color: '#374151' }}>
                    <CheckCircle size={14} color="#FF6B00" style={{ flexShrink: 0 }} />
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '1rem', borderTop: '1px solid #ddd6fe' }}>
              {[
                { icon: <Mail size={13} />, text: 'contact@mmtech.academy' },
                { icon: <MapPin size={13} />, text: '4/4a, Pongaliammam Koil Street, Vadavalli, Coimbatore – 641041' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#FF6B00' }}>
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right panel — form ──────────────────────────────────────── */}
          <div style={{ padding: isMobile ? '2.5rem 2rem' : '3rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.75rem', fontFamily: 'var(--font-heading)' }}>
              Tell us about yourself
            </h4>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }} onSubmit={e => e.preventDefault()}>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <IconWrap><User size={15} /></IconWrap>
                <input type="text" placeholder="Full Name" required onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={gs('name')} />
              </div>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <IconWrap><Briefcase size={15} /></IconWrap>
                <input type="text" placeholder="Title" onFocus={() => setFocused('title')} onBlur={() => setFocused(null)} style={gs('title')} />
              </div>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <IconWrap><Building2 size={15} /></IconWrap>
                <input type="text" placeholder="Company" required onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} style={gs('company')} />
              </div>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <IconWrap><Mail size={15} /></IconWrap>
                <input type="email" placeholder="Work Email" required onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={gs('email')} />
              </div>
              <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                <IconWrap><Phone size={15} /></IconWrap>
                <input type="tel" placeholder="Work Phone" onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={gs('phone')} />
              </div>
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <IconWrap><MapPin size={15} /></IconWrap>
                <select onFocus={() => setFocused('loc')} onBlur={() => setFocused(null)}
                  style={{ ...gs('loc'), appearance: 'none' as const, color: focused === 'loc' ? '#0f172a' : '#94a3b8' }}>
                  <option value="">Location</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                  What size is your organisation?
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {orgSizes.map(size => (
                    <button key={size} type="button" onClick={() => setOrgSize(size)}
                      style={{
                        padding: '0.45rem 1.1rem', borderRadius: 8, border: '1.5px solid',
                        borderColor: orgSize === size ? '#FF6B00' : '#e2e8f0',
                        background: orgSize === size ? '#FF6B00' : 'white',
                        color: orgSize === size ? 'white' : '#64748b',
                        fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'var(--font-primary)', transition: 'all 0.15s ease',
                      }}
                    >{size}</button>
                  ))}
                </div>
              </div>
              <button type="submit"
                style={{
                  width: '100%', padding: '0.9rem',
                  background: '#FF6B00', color: 'white',
                  border: 'none', borderRadius: 10,
                  fontWeight: 700, fontSize: '0.9rem',
                  cursor: 'pointer', fontFamily: 'var(--font-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                  boxShadow: '0 4px 16px rgba(255,107,0,0.35)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#cc5500')}
                onMouseLeave={e => (e.currentTarget.style.background = '#FF6B00')}
              >
                Become a Partner <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ── Partners marquee ─────────────────────────────────────────────── */}
      <div style={{ padding: '3rem 0 5rem', overflow: 'hidden', borderTop: '1px solid #e2e8f0', background: 'white' }}>
        <p style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#94a3b8', marginBottom: '2rem' }}>
          Trusted by 30+ organisations
        </p>
        <div className="marquee-container">
          <div className="marquee-content">
            {[...companies, ...companies].map((company, idx) => (
              <div key={idx} className="marquee-item">{company}</div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
