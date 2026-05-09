import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { addExampleDocument } from '../services/firestore';
import { sendEmailNotification } from '../services/emailjs';

export const AdvisorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', goal: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-advisor-modal', handleOpen);
    return () => window.removeEventListener('open-advisor-modal', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addExampleDocument('advisor_requests', {
        ...formData,
        timestamp: new Date().toISOString()
      });
      await sendEmailNotification({
        title: 'Advisor Consultation Request',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Career Goals: ${formData.goal}`,
      });
      setFormData({ name: '', email: '', phone: '', goal: '' });
      setIsOpen(false);
      setLoading(false);
      setTimeout(() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Request received! An advisor will reach out to you to schedule a consultation.', type: 'success' } })), 10);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setTimeout(() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Error submitting form.', type: 'error' } })), 10);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', width: '100%', maxWidth: '440px',
        padding: '2.5rem 2rem', position: 'relative', boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
      }}>
        <button onClick={() => setIsOpen(false)} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#94a3b8'
        }}>
          <X size={20} />
        </button>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a', fontFamily: 'Fraunces, serif' }}>
          Talk to an Advisor
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Book a free consultation to map out your tech career with our experts.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><User size={16} /></span>
            <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><Mail size={16} /></span>
            <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}><Phone size={16} /></span>
            <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8' }}><MessageSquare size={16} /></span>
            <textarea required placeholder="What are your career goals?" value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <button type="submit" disabled={loading} style={{
            marginTop: '0.5rem', width: '100%', padding: '0.9rem', borderRadius: '12px',
            background: '#FF6B00', color: 'white', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'background 0.2s'
          }}>
            {loading ? 'Submitting...' : 'Request Consultation'}
          </button>
        </form>
      </div>
    </div>
  );
};
