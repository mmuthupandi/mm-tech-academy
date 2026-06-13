import { motion } from 'framer-motion';
import ceoImg from '../assets/Dr.Angel.jpeg';
import acadImg from '../assets/Mr mirthunmoorthy.jpeg';
import saravanaImg from '../assets/Dr.R.Saravana Moorthy.jpg';
import './Leadership.css';

const leaders = [
  {
    name: 'Dr. S. Angel',
    role: 'Chief Executive Officer',
    image: ceoImg,
    bio: 'With over 15 years of experience in ed-tech and global strategy, Dr. Angel leads MM Tech Academy with a vision to democratize elite technology education for all.',
  },
  {
    name: 'Dr. R. Saravanamoorthy',
    role: 'Executive Director',
    image: saravanaImg,
    bio: 'A passionate advocate for continuous learning, Dr. Saravanamoorthy oversees operations, strategic partnerships, and ensures our programs consistently deliver measurable career outcomes.',
  },
  {
    name: 'Mr. Mirthunmoorthy',
    role: 'Academic Director',
    image: acadImg,
    bio: 'An industry veteran in AI and emerging tech, Mr. Mirthunmoorthy meticulously designs our cutting-edge curricula to bridge the gap between academia and real-world industry requirements.',
  }
];

export const Leadership = () => {
  return (
    <section id="leadership" className="leadership-section">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}
        >
          <div className="svc-section-label" style={{ color: '#FF6B00' }}>Leadership Team</div>
          <h2 className="svc-h2">The Visionaries Behind<br />MM Tech Academy</h2>
          <p className="svc-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
            Meet the dedicated minds driving innovation, excellence, and career success for learners at every stage of their journey.
          </p>
        </motion.div>

        <div className="leadership-grid">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="leadership-card"
            >
              <img src={leader.image} alt={leader.name} className="leadership-img" />
              <div className="leadership-overlay">
                <div className="leadership-info">
                  <h3 className="leadership-name">{leader.name}</h3>
                  <div className="leadership-role">{leader.role}</div>
                  <p className="leadership-bio">{leader.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
