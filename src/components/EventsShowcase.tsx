import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Star, Target, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './EventsShowcase.css';

import hackathonImg from '../assets/showcase/realistic_hackathon.png';
import networkingImg from '../assets/showcase/realistic_networking.png';
import summitImg from '../assets/showcase/realistic_summit.png';
import classroomImg from '../assets/showcase/realistic_classroom.png';

const showcaseImages = [
  { src: hackathonImg, alt: 'Hackathon Event' },
  { src: networkingImg, alt: 'Networking Event' },
  { src: summitImg, alt: 'Tech Summit' },
  { src: classroomImg, alt: 'EdTech Classroom' }
];

const achievements = [
  { icon: <Users size={24} />, text: '10,000+ Students Empowered' },
  { icon: <Trophy size={24} />, text: '50+ Corporate Partners' },
  { icon: <Calendar size={24} />, text: '100+ Masterclasses Conducted' },
  { icon: <Star size={24} />, text: '95% Placement Rate' },
  { icon: <Target size={24} />, text: '20+ Industry Specific Programs' },
  { icon: <Zap size={24} />, text: 'Award Winning EdTech Startup' }
];

const events = [
  {
    title: 'Future Tech Summit 2025',
    date: 'March 15, 2025',
    description: 'A gathering of industry leaders discussing the future of AI and Web3 technologies.',
    category: 'Conference',
    image: summitImg
  },
  {
    title: 'CodeHack Hackathon',
    date: 'April 22-24, 2025',
    description: '48-hour intensive coding competition for students across the country.',
    category: 'Competition',
    image: hackathonImg
  },
  {
    title: 'Corporate Connect',
    date: 'May 10, 2025',
    description: 'Networking event bridging the gap between top tech talent and hiring managers.',
    category: 'Networking',
    image: networkingImg
  }
];

export const EventsShowcase = () => {
  // Use a much larger array to prevent running out of items during long sessions
  const extendedImages = Array(250).fill(showcaseImages).flat(); // 1000 items

  // Start perfectly in the middle
  const [imageIndex, setImageIndex] = useState(500); // 500 % 4 === 0
  
  const [isHoveredImages, setIsHoveredImages] = useState(false);

  // Auto-play Images
  useEffect(() => {
    if (isHoveredImages) return;
    const timer = setInterval(() => {
      setImageIndex(prev => {
        if (prev >= extendedImages.length - 2) return 500; // safety wrap
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [isHoveredImages]);

  // Dot navigation logic for closest path
  const handleImageDotClick = (targetIndex: number) => {
    const currentMod = imageIndex % showcaseImages.length;
    const diff = targetIndex - currentMod;
    setImageIndex(imageIndex + diff);
  };

  return (
    <section className="events-showcase-section">
      <div className="container showcase-content">
        <div className="showcase-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-gradient">Impact & Events</span>
          </motion.h2>
          <motion.p 
            className="showcase-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the milestones we've achieved and the exclusive events shaping the future of tech education.
          </motion.p>
        </div>

        {/* Image Slider - Apple TV Style */}
        <div 
          className="apple-carousel-wrapper"
          onMouseEnter={() => setIsHoveredImages(true)}
          onMouseLeave={() => setIsHoveredImages(false)}
          onTouchStart={() => setIsHoveredImages(true)}
          onTouchEnd={() => setIsHoveredImages(false)}
        >
          <button className="slider-btn prev" onClick={() => setImageIndex(prev => prev <= 2 ? 500 : prev - 1)} aria-label="Previous Image">
            <ChevronLeft size={24} />
          </button>
          <button className="slider-btn next" onClick={() => setImageIndex(prev => prev >= extendedImages.length - 2 ? 500 : prev + 1)} aria-label="Next Image">
            <ChevronRight size={24} />
          </button>

          <motion.div 
            className="apple-carousel-track images-track"
            animate={{ x: `calc(var(--center-offset) - ${imageIndex} * var(--stride))` }}
            transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.8 }}
          >
            {extendedImages.map((img, i) => {
              const isActive = i === imageIndex;
              return (
                <div key={i} className={`apple-card image-card ${isActive ? 'active' : ''}`}>
                  <img src={img.src} alt={img.alt} className="apple-image" loading="lazy" />
                </div>
              );
            })}
          </motion.div>

          <div className="apple-pagination">
            {showcaseImages.map((_, i) => (
              <div 
                key={i} 
                className={`apple-dot ${i === (imageIndex % showcaseImages.length) ? 'active' : ''}`}
                onClick={() => handleImageDotClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Events Grid - Coursera Style */}
        <div className="events-grid" style={{ marginTop: '3rem' }}>
          {events.map((event, i) => (
            <div key={i} className="event-card">
              <div className="event-banner" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="event-banner-overlay"></div>
                <span className="event-category">{event.category}</span>
              </div>
              <div className="event-details">
                <div className="event-date">
                  <Calendar size={16} />
                  <span>{event.date}</span>
                </div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <button className="btn btn-primary event-btn">
                  <span>View Details</span>
                  <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="showcase-marquee-container" style={{ marginTop: '5rem', marginBottom: 0 }}>
        <motion.div 
          className="showcase-marquee"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {/* Render array twice to create seamless loop */}
          {[...achievements, ...achievements].map((item, index) => (
            <div key={index} className="achievement-pill">
              <span className="achievement-icon">{item.icon}</span>
              <span className="achievement-text">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
