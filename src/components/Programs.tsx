import { motion } from 'framer-motion';
import { Server, ShieldCheck, Monitor, BrainCircuit, Power, Globe, Camera, Rocket } from 'lucide-react';

export const Programs = () => {
  const programs = [
    { icon: <Server />, name: 'Hardware & Software Maintenance' },
    { icon: <ShieldCheck />, name: 'Networking & Cybersecurity' },
    { icon: <Monitor />, name: 'Programming & Web Dev' },
    { icon: <BrainCircuit />, name: 'Data Science & AI' },
    { icon: <Power />, name: 'Renewable Energy (Solar PV)' },
    { icon: <Globe />, name: 'Digital Marketing' },
    { icon: <Camera />, name: 'Photography & Video Editing' },
    { icon: <Rocket />, name: 'Tech for Business' },
  ];

  return (
    <section id="programs" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Academic & Training Programs</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--gray-700)', maxWidth: '800px', margin: '0 auto' }}>
          We offer world-class Certificate, Professional Diploma, and Advanced Diploma programs, alongside workshops, seminars, and webinars.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {programs.map((prog, idx) => (
          <motion.div 
            key={idx}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', 
              padding: '1.5rem', borderRadius: '12px', background: 'white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--gray-100)'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
          >
            <div style={{ color: 'var(--green-main)' }}>{prog.icon}</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{prog.name}</h4>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="programs-banner glass-card"
        style={{ 
          background: 'linear-gradient(135deg, var(--green-dark), var(--green-main))',
          padding: '3rem', borderRadius: '24px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem'
        }}
        whileInView={{ scale: [0.95, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Globe color="#4ade80" />
            <h3 style={{ fontSize: '1.5rem', color: '#4ade80' }}>Global Inclusion Spotlight</h3>
          </div>
          <h4 className="programs-banner-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Tsangayar Fasaha</h4>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Our dedicated Hausa-language version of the Digital Academy, expanding our global accessibility and bringing quality tech education to diverse linguistic communities.
          </p>
        </div>
        <button className="btn btn-outline" style={{ background: 'white', color: 'var(--green-dark)', borderColor: 'white' }}>Learn More</button>
      </motion.div>
    </section>
  );
};
