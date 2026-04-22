import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <video 
        className="hero-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        poster="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2940"
      >
        <source src="https://player.vimeo.com/external/477759537.sd.mp4?s=d00e57ba541170701dd9a473fe3ba0b0ec8ce5b7&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
      </video>
      <motion.div 
        className="hero-content container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="hero-title" style={{ fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Empowering Innovation, <br />
          <span className="text-gradient" style={{ background: 'linear-gradient(to right, #4d94ff, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
