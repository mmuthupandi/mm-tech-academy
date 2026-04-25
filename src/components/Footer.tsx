import { MapPin, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

const TwitterIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
const FacebookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;

export const Footer = () => {
  return (
    <footer id="contact" style={{ background: 'linear-gradient(135deg, #0d0b2e 0%, #1a1650 50%, #0f0d35 100%)', color: 'white', padding: '5rem 0 2rem' }}>
      <div className="container footer-grid" style={{ marginBottom: '4rem' }}>
        <div>
          <img src={logo} alt="MM Tech Academy" style={{ height: '72px', width: 'auto', objectFit: 'contain', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--gray-200)', opacity: 0.8, marginBottom: '2rem' }}>
            Empowering Innovation, Transforming Futures.
          </p>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--blue-light)' }}>
            <div style={{ cursor: 'pointer' }}><LinkedinIcon /></div>
            <div style={{ cursor: 'pointer' }}><TwitterIcon /></div>
            <div style={{ cursor: 'pointer' }}><FacebookIcon /></div>
          </div>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#about" style={{ color: 'var(--gray-200)' }}>About Us</a></li>
            <li><a href="#services" style={{ color: 'var(--gray-200)' }}>Our Pillars</a></li>
            <li><a href="#programs" style={{ color: 'var(--gray-200)' }}>Programs</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Contact & Campuses</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--gray-200)' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <MapPin size={20} style={{ flexShrink: 0, color: 'var(--blue-light)' }} />
              <span>Main Centre: Sundapalayam, Coimbatore</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <MapPin size={20} style={{ flexShrink: 0, color: 'var(--blue-light)' }} />
              <span>City Campuses: Vadavalli, Coimbatore</span>
            </li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Mail size={20} style={{ color: 'var(--blue-light)' }} />
              <span>contact@mmtech.academy</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Newsletter</h4>
          <p style={{ color: 'var(--gray-200)', marginBottom: '1rem' }}>Get the latest updates on courses and tech news.</p>
          <div style={{ display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ padding: '0.75rem 1rem', borderRadius: '8px 0 0 8px', border: 'none', outline: 'none', width: '100%' }}
            />
            <button style={{ padding: '0.75rem 1rem', background: 'var(--blue-vibrant)', color: 'white', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--gray-200)', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} MM Tech Academy (Integrating M M Digital Academy & AM2 Academy). All rights reserved.
      </div>
    </footer>
  );
};
