import React from "react";
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
}

const audiences: Audience[] = [
  {
    icon: "ti-school",
    title: "School students",
    description: "Foundation & coding basics",
    badge: "Grades 6-12",
    colorVar: "info",
    video: schoolVideo,
  },
  {
    icon: "ti-certificate",
    title: "College students",
    description: "Diploma & skill certifications",
    badge: "UG / PG",
    colorVar: "success",
    video: collegeVideo,
  },
  {
    icon: "ti-briefcase",
    title: "Working professionals",
    description: "Advanced & upskilling tracks",
    badge: "Evening / weekend",
    colorVar: "warning",
    video: workingVideo,
  },
];

const ExtraProgramCards: React.FC = () => {
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
      `}</style>

      {audiences.map((a, i) => (
        <div
          key={a.title}
          className="prog-card"
          style={{ animationDelay: `${i * 0.12}s` }}
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
    </div>
  );
};

export default ExtraProgramCards;
