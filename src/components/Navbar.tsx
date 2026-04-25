import { useState, useRef, useEffect } from 'react';
import { Home, Info, Layers, BookOpen, Users, Phone, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     icon: Home,     href: '#'         },
  { id: 'about',    label: 'About',    icon: Users,    href: '#about'    },
  { id: 'services', label: 'Services', icon: Layers,   href: '#services' },
  { id: 'programs', label: 'Programs', icon: BookOpen, href: '#programs' },
  { id: 'partners', label: 'Partners', icon: Info,     href: '#partners' },
  { id: 'contact',  label: 'Contact',  icon: Phone,    href: '#contact'  },
];

/* ── Desktop: vertical left-side pill navbar ─────────────────────────────── */
const DesktopNav = () => {
  const [active, setActive]   = useState('home');
  const [hovered, setHovered] = useState<string | null>(null);

  /* scroll-spy */
  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.id).filter(id => id !== 'home');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.45, rootMargin: '-10% 0px -10% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    const onScroll = () => { if (window.scrollY < 80) setActive('home'); };
    window.addEventListener('scroll', onScroll);
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '30%',
      left: '12px',
      transform: 'translateY(-30%)',
      zIndex: 100,
      flexDirection: 'column',
      gap: '8px',
    }}
    className="desktop-nav-vertical"
    >
      {NAV_ITEMS.map(item => {
        const Icon     = item.icon;
        const isActive = active === item.id;
        const isHov    = hovered === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isActive ? '10px' : '0',
              padding: isActive ? '10px 18px 10px 12px' : '10px',
              borderRadius: '9999px',
              textDecoration: 'none',
              background: isActive
                ? '#6A63B7'
                : isHov
                  ? 'rgba(106,99,183,0.1)'
                  : 'rgba(255,255,255,0.85)',
              border: isActive
                ? '1px solid transparent'
                : '1px solid rgba(226,232,240,0.9)',
              boxShadow: isActive
                ? '0 4px 18px rgba(106,99,183,0.4)'
                : '0 2px 8px rgba(0,0,0,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: isActive ? '160px' : '44px',
            }}
          >
            <Icon
              size={20}
              strokeWidth={isActive ? 2.2 : 1.75}
              style={{
                color: isActive ? '#ffffff' : 'rgba(30,41,59,0.55)',
                flexShrink: 0,
                transition: 'color 0.3s ease',
              }}
            />
            {/* label — only visible when active */}
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#ffffff',
              opacity: isActive ? 1 : 0,
              maxWidth: isActive ? '100px' : '0',
              overflow: 'hidden',
              transition: 'opacity 0.3s ease, max-width 0.35s cubic-bezier(0.22,1,0.36,1)',
              fontFamily: 'var(--font-primary)',
            }}>
              {item.label}
            </span>
          </a>
        );
      })}

      {/* Enroll CTA at bottom */}
      <a
        href="#programs"
        style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 14px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #6A63B7, #9b96d4)',
          color: 'white',
          fontSize: '0.78rem',
          fontWeight: 700,
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(106,99,183,0.4)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          fontFamily: 'var(--font-primary)',
          letterSpacing: '0.02em',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 22px rgba(106,99,183,0.55)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(106,99,183,0.4)';
        }}
      >
        Enroll
      </a>
    </div>
  );
};

/* ── Mobile: top-right expandable card ──────────────────────────────────── */
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
    <div style={{ position: 'fixed', top: '20px', right: '16px', zIndex: 100 }}
         className="mobile-nav-card">
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
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
          padding: isOpen ? '12px' : '0',
          gap: isOpen ? '4px' : '0',
          width: showLabels ? '176px' : isOpen ? '58px' : '50px',
        }}
      >
        {/* toggle button */}
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

        {/* links */}
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

export const Navbar = () => (
  <>
    <DesktopNav />
    <MobileNav />
  </>
);
