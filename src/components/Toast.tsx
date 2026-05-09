import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export const Toast = () => {
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error', id: number } | null>(null);

  useEffect(() => {
    const handleShow = (e: Event) => {
      const customEvent = e as CustomEvent;
      const id = Date.now();
      setToast({ message: customEvent.detail.message, type: customEvent.detail.type || 'success', id });
      
      setTimeout(() => {
        setToast(current => current?.id === id ? null : current);
      }, 5000);
    };

    window.addEventListener('show-toast', handleShow);
    return () => window.removeEventListener('show-toast', handleShow);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{
            position: 'fixed', bottom: '2rem', left: '50%', translateX: '-50%',
            background: toast.type === 'success' ? '#0f172a' : '#ef4444',
            color: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 10000,
            minWidth: '320px', maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 size={24} color="#10b981" />
          ) : (
            <XCircle size={24} color="white" />
          )}
          <span style={{ fontSize: '0.95rem', fontWeight: 500, flex: 1, fontFamily: 'var(--font-primary)' }}>
            {toast.message}
          </span>
          <button onClick={() => setToast(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}>
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
