import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Silk from './Silk';

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Gently scale down and fade as content-wrapper slides over
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section ref={ref} className="hero">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Silk
          speed={5}
          scale={1}
          color="#6A63B7"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <motion.div 
        className="hero-content container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 2, scale, opacity }}
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
