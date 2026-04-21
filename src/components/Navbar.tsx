import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo-text">MM Tech Academy</div>
        
        {/* Desktop Nav */}
        <div className="desktop-nav">
          <a href="#about" style={{ fontWeight: 500, color: scrolled ? 'var(--gray-800)' : 'white' }}>About</a>
          <a href="#services" style={{ fontWeight: 500, color: scrolled ? 'var(--gray-800)' : 'white' }}>Services</a>
          <a href="#programs" style={{ fontWeight: 500, color: scrolled ? 'var(--gray-800)' : 'white' }}>Programs</a>
          <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>Enroll Now</button>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)}>
           {mobileMenu ? <X color={scrolled ? 'var(--gray-800)' : 'white'} /> : <Menu color={scrolled ? 'var(--gray-800)' : 'white'} />}
        </div>
      </div>
      
      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
            <a href="#services" onClick={() => setMobileMenu(false)}>Services</a>
            <a href="#programs" onClick={() => setMobileMenu(false)}>Programs</a>
            <button className="btn btn-primary" onClick={() => setMobileMenu(false)}>Enroll Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
