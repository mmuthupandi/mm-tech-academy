import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import img1 from '../assets/Screenshot 2026-06-17 161139.png';
import img2 from '../assets/Screenshot 2026-06-17 161157.png';
import img3 from '../assets/Screenshot 2026-06-17 161210.png';
import img4 from '../assets/Screenshot 2026-06-17 161224.png';
import img5 from '../assets/Screenshot 2026-06-17 161256.png';
import img6 from '../assets/Screenshot 2026-06-17 161310.png';
import './ProjectTeaserModal.css';

interface ProjectTeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectTeaserModal = ({ isOpen, onClose }: ProjectTeaserModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const screenshots = [img1, img2, img3, img4, img5, img6];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div className="teaser-modal-overlay" onClick={onClose}>
      <div className="teaser-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="teaser-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="teaser-header">
          <span className="teaser-badge">Upcoming Project</span>
          <h2 className="teaser-title">Traveloop</h2>
          <p className="teaser-desc">Get a sneak peek at our upcoming ultimate travel planning experience.</p>
        </div>

        <div className="teaser-carousel-container">
          <button className="teaser-nav-btn prev" onClick={scrollLeft}>
            <ChevronLeft size={28} />
          </button>
          
          <div className="teaser-carousel-track" ref={scrollRef}>
            {screenshots.map((src, index) => (
              <div key={index} className="teaser-slide">
                <img src={src} alt={`Traveloop Screenshot ${index + 1}`} className="teaser-image" />
                <div className="teaser-slide-caption">Screenshot {index + 1}</div>
              </div>
            ))}
          </div>

          <button className="teaser-nav-btn next" onClick={scrollRight}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
