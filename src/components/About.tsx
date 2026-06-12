import { motion } from 'framer-motion';
import { Code, Users, Briefcase, Target, Sliders } from 'lucide-react';

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
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Connecting Classroom Learning <br/>
            <span style={{ color: '#FF6B00' }}>With Corporate Reality</span>
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--gray-700)', lineHeight: '1.8' }}>
            At <strong>MM Tech Academy</strong>, our core mission is to turn ambitious learners into highly sought-after professionals. We achieve this through advanced technical education, comprehensive behavioral coaching, and a dedicated career support system.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--gray-700)', lineHeight: '1.8' }}>
            Boasting an impressive <strong>95% placement record</strong>, our initiatives have guided countless graduates toward rewarding careers and innovative startups. By synchronizing our curriculum with the latest technological trends, immersive practical assignments, and exact employer expectations, we guarantee that our trainees possess the technical mastery and interpersonal finesse required to dominate the modern workforce.
          </p>
        </motion.div>

        <motion.div
          className="glass-card"
          style={{ padding: '2.5rem', background: 'linear-gradient(135deg, #0a3a00, #138808)', color: 'white' }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>Our Educational Strategy</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px' }}>
                <Code size={24} color="#86efac" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>Core Tech Mastery</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Intensive, practical exposure to the most sought-after tech stacks.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px' }}>
                <Users size={24} color="#86efac" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>Career & Communication Polish</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Refining personal presence and interview techniques for guaranteed success.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px' }}>
                <Briefcase size={24} color="#86efac" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>Dedicated Career Support</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Comprehensive backing to land roles in leading global enterprises.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px' }}>
                <Target size={24} color="#86efac" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>Immersive Live Projects</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>True-to-life industry assignments that build formidable portfolios.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem', borderRadius: '10px' }}>
                <Sliders size={24} color="#86efac" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', fontWeight: '600' }}>Personalized Learning Tracks</h4>
                <p style={{ fontSize: '0.95rem', opacity: 0.85 }}>Customized educational roadmaps catering specifically to varied academic backgrounds.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
