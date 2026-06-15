import React from "react";
import { School, GraduationCap, Briefcase } from "lucide-react";
import schoolVideo from '../assets/school.mp4';
import collegeVideo from '../assets/college.mp4';
import workingVideo from '../assets/working professtional.mp4';

interface Audience {
  icon: string;
  title: string;
  description: string;
  badge: string;
  colorVar: string;
  video?: string;
  curriculum: string[];
  LucideIcon: React.ElementType<any>;
}

const audiences: Audience[] = [
  {
    icon: "ti-school",
    title: "School students",
    description: "Foundation & coding basics",
    badge: "Grades 6-12",
    colorVar: "info",
    video: schoolVideo,
    LucideIcon: School,
    curriculum: [
      "Block-based coding (Scratch)",
      "Introduction to Python & Logic Building",
      "Web Basics (HTML, CSS)",
      "Mathematics & Analytical Thinking"
    ]
  },
  {
    icon: "ti-certificate",
    title: "College students",
    description: "Diploma & skill certifications",
    badge: "UG / PG",
    colorVar: "success",
    video: collegeVideo,
    LucideIcon: GraduationCap,
    curriculum: [
      "Advanced Data Structures & Algorithms",
      "Full-stack Web Development",
      "Mobile App Development",
      "Interview Preparation & Projects"
    ]
  },
  {
    icon: "ti-briefcase",
    title: "Working professionals",
    description: "Advanced & upskilling tracks",
    badge: "Evening / weekend",
    colorVar: "warning",
    video: workingVideo,
    LucideIcon: Briefcase,
    curriculum: [
      "Advanced System Design & Architecture",
      "Cloud Computing (AWS, Azure, GCP)",
      "DevOps & CI/CD pipelines",
      "Emerging Technologies (AI, Machine Learning)"
    ]
  },
];

const ExtraProgramCards: React.FC = () => {
  const [selectedAudience, setSelectedAudience] = React.useState<Audience | null>(null);

  return (
    <div className="cards-grid-wrapper">
      <style>{`
        :root {
          --color-background-primary: #ffffff;
          --color-border-tertiary: #e5e7eb;
          --border-radius-lg: 12px;
          --color-border-secondary: #9ca3af;
          --border-radius-md: 6px;
          --color-text-info: #2563eb;
          --color-background-info: #dbeafe;
          --color-text-success: #16a34a;
          --color-background-success: #dcfce7;
          --color-text-warning: #ca8a04;
          --color-background-warning: #fef08a;
          --color-text-secondary: #6b7280;
        }
        .cards-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 1rem 0;
        }
        @media (max-width: 900px) {
          .cards-grid-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
          /* Center the 3rd card perfectly without breaking its size */
          .prog-card:nth-child(3):last-child {
            grid-column: 1 / -1;
            justify-self: center;
            width: calc(50% - 6px);
          }
        }
        @media (max-width: 600px) {
          .cards-grid-wrapper {
            grid-template-columns: 1fr;
          }
          .prog-card:nth-child(3):last-child {
            grid-column: auto;
            justify-self: stretch;
            width: 100%;
          }
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .prog-card {
          position: relative;
          background: transparent;
          border: none;
          box-shadow: none;
          outline: none;
          border-radius: var(--border-radius-lg);
          padding: 0;
          overflow: hidden;
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          animation: popIn 0.5s ease both;
          transition: transform 0.3s ease;
          cursor: pointer;
          aspect-ratio: 16 / 9;
        }
        .prog-card:hover {
          transform: translateY(-4px);
        }
        .prog-card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 20, 0.75);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .prog-card:hover .prog-card-overlay {
          opacity: 1;
        }
        .audience {
          display: flex;
          gap: 6px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .badge {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: var(--border-radius-md);
        }
        .epc-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 1rem;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          backdrop-filter: blur(4px);
        }
        .epc-modal-content {
          background: var(--color-background-primary);
          border-radius: var(--border-radius-lg);
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          position: relative;
          transform: translateY(20px);
          animation: slideUp 0.3s forwards;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .epc-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--color-text-secondary);
          line-height: 1;
          padding: 0.25rem;
          transition: color 0.2s;
        }
        .epc-modal-close:hover {
          color: #111827;
        }
        .epc-modal-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.5rem;
        }
        .epc-modal-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }
        .epc-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }
        .epc-modal-desc {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin: 4px 0 0 0;
        }
        .epc-modal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .epc-modal-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 1rem;
          color: #374151;
          background: #f9fafb;
          padding: 12px 16px;
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-border-tertiary);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .epc-modal-list li:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .epc-modal-list li i {
          color: var(--color-text-success);
          font-size: 1.25rem;
          margin-top: 2px;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes slideUp {
          to { transform: translateY(0); }
        }
      `}</style>

      {audiences.map((a, i) => (
        <div
          key={a.title}
          className="prog-card"
          style={{ animationDelay: `${i * 0.12}s` }}
          onClick={() => setSelectedAudience(a)}
        >
          {a.video ? (
            <>
              <video
                src={a.video}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  minHeight: "100%",
                  objectFit: "cover",
                  transform: "scale(1.02)",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent"
                }}
              />
              <div className="prog-card-overlay">
                <i
                  className={`ti ${a.icon}`}
                  style={{ fontSize: "28px", color: "#ffffff", marginBottom: "8px" }}
                  aria-hidden="true"
                />
                <p style={{ fontWeight: 600, fontSize: "16px", color: "#ffffff", margin: "0 0 6px" }}>
                  {a.title}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.8)", margin: "0 0 12px" }}>
                  {a.description}
                </p>
                <div className="audience" style={{ marginTop: 0, justifyContent: 'center' }}>
                  <span
                    className="badge"
                    style={{
                      background: `var(--color-background-${a.colorVar})`,
                      color: `var(--color-text-${a.colorVar})`,
                    }}
                  >
                    {a.badge}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div style={{ padding: "1rem 1.25rem" }}>
              <i
                className={`ti ${a.icon}`}
                style={{ fontSize: "22px", color: `var(--color-text-${a.colorVar})` }}
                aria-hidden="true"
              />
              <p style={{ fontWeight: 500, fontSize: "15px", margin: "10px 0 4px" }}>
                {a.title}
              </p>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: 0 }}>
                {a.description}
              </p>
              <div className="audience">
                <span
                  className="badge"
                  style={{
                    background: `var(--color-background-${a.colorVar})`,
                    color: `var(--color-text-${a.colorVar})`,
                  }}
                >
                  {a.badge}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {selectedAudience && (
        <div className="epc-modal-overlay" onClick={() => setSelectedAudience(null)}>
          <div className="epc-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="epc-modal-close" onClick={() => setSelectedAudience(null)}>
              &times;
            </button>
            <div className="epc-modal-header">
              <div 
                className="epc-modal-icon"
                style={{
                  background: `var(--color-background-${selectedAudience.colorVar})`,
                  color: `var(--color-text-${selectedAudience.colorVar})`,
                }}
              >
                {React.createElement(selectedAudience.LucideIcon as any, { size: 28 })}
              </div>
              <div>
                <h3 className="epc-modal-title">{selectedAudience.title}</h3>
                <p className="epc-modal-desc">{selectedAudience.description}</p>
              </div>
            </div>
            
            <ul className="epc-modal-list">
              {selectedAudience.curriculum.map((item, idx) => (
                <li key={idx}>
                  <i className="ti ti-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtraProgramCards;
