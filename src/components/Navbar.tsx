import { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Info, Layers, BookOpen, Users, Phone } from 'lucide-react';
import logo from '../assets/logo-full.png';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: Home,     href: '#'         },
  { id: 'about',    label: 'About',    icon: Users,    href: '#about'    },
  { id: 'services', label: 'Services', icon: Layers,   href: '#services' },
  { id: 'programs', label: 'Programs', icon: BookOpen, href: '#programs' },
  { id: 'partners', label: 'Partners', icon: Info,     href: '#partners' },
  { id: 'contact',  label: 'Contact',  icon: Phone,    href: '#contact'  },
];

/* ── Desktop: original horizontal top navbar ─────────────────────────────── */
const DesktopNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="MM Tech Academy"
            style={{
              height: '70px',
              width: 'auto',
              display: 'block'
            }}
          />
        </a>
        <div className="desktop-nav">
          <a href="#about"    style={{ fontWeight: 500, color: 'white' }}>About</a>
          <a href="#services" style={{ fontWeight: 500, color: 'white' }}>Services</a>
          <a href="#programs" style={{ fontWeight: 500, color: 'white' }}>Programs</a>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Enroll Now</button>
        </div>
      </div>
    </nav>
  );
};

/* ── Mobile: top-right expandable card navbar ────────────────────────────── */
const MobileNav = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [showLabels, setLabels] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const open  = () => { setIsOpen(true);  setTimeout(() => setLabels(true),  280); };
  const close = () => { setLabels(false); setTimeout(() => setIsOpen(false), 200); };
  const toggle = () => (isOpen ? close() : open());

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 200 }}>
      <div
        ref={menuRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(226,232,240,0.9)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          padding: isOpen ? '12px' : '0',
          gap: isOpen ? '4px' : '0',
          width: showLabels ? '176px' : isOpen ? '58px' : '50px',
        }}
      >
        {/* Toggle button */}
        <button
          onClick={toggle}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            alignSelf: isOpen ? 'flex-end' : 'center',
            width: isOpen ? '36px' : '50px',
            height: isOpen ? '36px' : '50px',
            borderRadius: '14px',
            background: '#6A63B7',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {isOpen ? <X size={17} color="white" /> : <Menu size={21} color="white" />}
        </button>

        {/* Nav links */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '2px',
          maxHeight: isOpen ? '480px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.3s ease',
          paddingTop: isOpen ? '6px' : '0',
        }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={close}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  height: '40px', padding: '0 8px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(106,99,183,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Icon size={19} strokeWidth={1.75} style={{ color: '#6A63B7', flexShrink: 0 }} />
                <span style={{
                  fontSize: '0.875rem', fontWeight: 500, color: '#1e293b',
                  whiteSpace: 'nowrap',
                  opacity: showLabels ? 1 : 0,
                  transform: showLabels ? 'translateX(0)' : 'translateX(8px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                  fontFamily: 'var(--font-primary)',
                }}>
                  {item.label}
                </span>
              </a>
            );
          })}

          {/* Enroll CTA */}
          <a
            href="#programs"
            onClick={close}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: '6px', padding: '10px',
              borderRadius: '10px',
              background: '#6A63B7', color: 'white',
              fontSize: '0.85rem', fontWeight: 600,
              textDecoration: 'none',
              opacity: showLabels ? 1 : 0,
              transition: 'opacity 0.25s ease',
              fontFamily: 'var(--font-primary)',
            }}
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Combined export ─────────────────────────────────────────────────────── */
export const Navbar = () => (
  <>
    {/* Desktop: horizontal top bar */}
    <div className="navbar-desktop-only">
      <DesktopNav />
    </div>
    {/* Mobile: expandable card */}
    <div className="navbar-mobile-only">
      <MobileNav />
    </div>
  </>
);
