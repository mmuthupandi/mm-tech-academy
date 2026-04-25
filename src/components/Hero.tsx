import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="hero">
      <motion.div 
        className="hero-content container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="hero-title" style={{ fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Empowering Innovation, <br />
          <span className="text-gradient">
            Transforming Futures.
          </span>
        </h1>
        <p className="hero-subtitle" style={{ opacity: 0.9, maxWidth: '600px' }}>
          Equipping students, professionals, and entrepreneurs with cutting-edge skills to solve our planet's toughest problems.
        </p>
        <div className="hero-buttons" style={{ justifyContent: 'center' }}>
          <button className="btn btn-primary">Explore Courses</button>
          <button className="btn btn-outline">Partner With Us</button>
        </div>
      </motion.div>
    </section>
  );
};
