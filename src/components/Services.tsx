import { motion } from 'framer-motion';
import { BookOpen, Cpu, Presentation, LineChart, Lightbulb } from 'lucide-react';
import './Services.css';

const SERVICES = [
  {
    id: 'edu',
    title: 'Education Solutions',
    desc: 'Empowering institutions with cutting-edge curricula and pedagogical innovation.',
    icon: <BookOpen className="srv-icon" />,
    color: 'blue',
    features: ['Curriculum Design', 'Skill Gap Analysis', 'Faculty Training']
  },
  {
    id: 'consult',
    title: 'Consulting & Strategy',
    desc: 'Strategic roadmaps to navigate the complex landscape of digital transformation.',
    icon: <Presentation className="srv-icon" />,
    color: 'indigo',
    features: ['Digital Strategy', 'Operational Excellence', 'Market Intelligence']
  },
  {
    id: 'tech',
    title: 'Tech & Product',
    desc: 'Building robust, scalable products that define the next generation of tech.',
    icon: <Cpu className="srv-icon" />,
    color: 'emerald',
    features: ['Custom Development', 'Architecture Audit', 'UI/UX Design']
  },
  {
    id: 'finance',
    title: 'Finance & Analytics',
    desc: 'Data-driven insights to optimize performance and drive financial growth.',
    icon: <LineChart className="srv-icon" />,
    color: 'orange',
    features: ['Data Modeling', 'Business Intelligence', 'Financial Planning']
  },
  {
    id: 'startup',
    title: 'Start-ups & Emerging',
    desc: 'Accelerating high-potential ventures from ideation to market leadership.',
    icon: <Lightbulb className="srv-icon" />,
    color: 'rose',
    features: ['MVP Architecture', 'Seed Strategy', 'Technical Mentorship']
  }
];

export const Services = () => {
  return (
    <section id="services" className="srv-section">
      <div className="srv-container">
        <div className="srv-header">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="srv-badge"
          >
            OUR CORE PILLARS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="srv-title"
          >
            Empowering Through <span className="text-gradient">Excellence</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="srv-subtitle"
          >
            We provide a comprehensive ecosystem of services designed to bridge the gap between academic theory and industry reality.
          </motion.p>
        </div>

        <div className="srv-grid">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`srv-card srv-card-${service.color}`}
            >
              <div className="srv-card-glass" />
              <div className="srv-card-content">
                <div className="srv-icon-box">
                  {service.icon}
                </div>
                <h3 className="srv-card-title">{service.title}</h3>
                <p className="srv-card-desc">{service.desc}</p>
                
                <ul className="srv-feature-list">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="srv-feature-item">
                      <div className="srv-feature-dot" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="srv-card-border" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Background Elements */}
      <div className="srv-bg-glow-1" />
      <div className="srv-bg-glow-2" />
    </section>
  );
};
