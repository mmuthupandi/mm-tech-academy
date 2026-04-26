import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';

export const About = () => {
  return (
    <motion.section 
      id="about" 
      className="section container"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid-2-cols">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>A Global Footprint</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--gray-700)' }}>
            Learning at MM Tech Academy is structured around one idea: children and young adults learn best in environments that evolve with them. Our learning journey unfolds across four distinct campuses in Coimbatore, Tamil Nadu, created for every stage of development.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: '#6A63B7', padding: '1rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Main Centre</h4>
                <p style={{ color: 'var(--gray-700)' }}>Two adjacent campuses in Sundapalayam for focused exploration.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: '#6A63B7', padding: '1rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>City Campuses</h4>
                <p style={{ color: 'var(--gray-700)' }}>Located in Vadavalli for easy global and urban connectivity.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass-card"
          style={{ padding: '3rem', background: 'linear-gradient(135deg, #3d3880, #6A63B7)', color: 'white' }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <Globe size={48} style={{ marginBottom: '1.5rem', color: '#c4c1e8' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Global Reach</h3>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>
            In 2022, we joined the International Education Partnership—a prestigious network of 95+ schools and universities across 25 countries. This strengthens our international learning standards, academic continuity, and prepares students for a world beyond the classroom.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
