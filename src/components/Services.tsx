import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BookOpen, Cpu, Presentation, LineChart, Lightbulb, ArrowRight, GraduationCap, Wrench, FolderKanban, Briefcase } from 'lucide-react';

const SERVICES = [
  {
    id: 'edu',
    title: 'Education Solutions',
    desc: 'Empowering institutions with cutting-edge curricula and pedagogical innovation that bridges theory and practice.',
    icon: BookOpen,
    accent: '#6366f1',
    lightAccent: '#eef2ff',
    tag: 'Learning',
    features: ['Curriculum Design', 'Skill Gap Analysis', 'Faculty Training'],
  },
  {
    id: 'consult',
    title: 'Consulting & Strategy',
    desc: 'Strategic roadmaps to navigate the complex landscape of digital transformation with clarity and confidence.',
    icon: Presentation,
    accent: '#0ea5e9',
    lightAccent: '#f0f9ff',
    tag: 'Strategy',
    features: ['Digital Strategy', 'Operational Excellence', 'Market Intelligence'],
  },
  {
    id: 'tech',
    title: 'Tech & Product',
    desc: 'Building robust, scalable products that define the next generation of technology experiences.',
    icon: Cpu,
    accent: '#10b981',
    lightAccent: '#f0fdf4',
    tag: 'Engineering',
    features: ['Custom Development', 'Architecture Audit', 'UI/UX Design'],
  },
  {
    id: 'finance',
    title: 'Finance & Analytics',
    desc: 'Data-driven insights to optimize performance and drive measurable financial growth.',
    icon: LineChart,
    accent: '#f59e0b',
    lightAccent: '#fffbeb',
    tag: 'Analytics',
    features: ['Data Modeling', 'Business Intelligence', 'Financial Planning'],
  },
  {
    id: 'startup',
    title: 'Start-ups & Emerging',
    desc: 'Accelerating high-potential ventures from ideation to market leadership with precision and purpose.',
    icon: Lightbulb,
    accent: '#f43f5e',
    lightAccent: '#fff1f2',
    tag: 'Growth',
    features: ['MVP Architecture', 'Seed Strategy', 'Technical Mentorship'],
  },
];

const STEPS = [
  { num: '01', title: 'Learn Fundamentals', desc: 'Understand core concepts like word structure, tokenization, and text processing.', icon: GraduationCap },
  { num: '02', title: 'Practice & Apply',   desc: 'Implement models using libraries like Scikit-learn, TensorFlow, and PyTorch.',  icon: Wrench },
  { num: '03', title: 'Build Projects',     desc: 'Apply knowledge to real-world scenarios and capstone projects.',                icon: FolderKanban },
  { num: '04', title: 'Career Prep',        desc: 'Resume building, interview coaching, and placement assistance.',                icon: Briefcase },
];

/* ── Process Timeline Component ─────────────────────────────────────────── */
function ProcessStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className="process-step-row"
    >
      {/* Left slot — desktop only */}
      <div className="process-left-slot">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', maxWidth: '380px' }}
          >
            <StepCard step={step} />
          </motion.div>
        )}
      </div>

      {/* Centre node */}
      <div className="process-node-col">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.45, delay: index * 0.12 + 0.1, type: 'spring', stiffness: 220 }}
          style={{
            width: '48px', height: '48px',
            borderRadius: '12px',
            transform: 'rotate(45deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #6A63B7, #9b96d4)',
            boxShadow: '0 4px 18px rgba(106,99,183,0.4)',
            border: '4px solid white',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <div style={{ transform: 'rotate(-45deg)', display: 'flex' }}>
            <Icon size={18} strokeWidth={2} />
          </div>
        </motion.div>
      </div>

      {/* Right slot — desktop: odd cards / mobile: all cards */}
      <div className="process-right-slot">
        {/* Desktop: only odd-index cards */}
        {!isLeft && (
          <motion.div
            className="process-card-desktop"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%', maxWidth: '380px' }}
          >
            <StepCard step={step} />
          </motion.div>
        )}
        {/* Mobile: all cards appear here */}
        <motion.div
          className="process-card-mobile"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ width: '100%' }}
        >
          <StepCard step={step} />
        </motion.div>
      </div>
    </div>
  );
}

function StepCard({ step }: { step: typeof STEPS[0] }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderRadius: '18px',
        padding: '1.75rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid rgba(106,99,183,0.12)',
        transition: 'all 0.4s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 8px 36px rgba(106,99,183,0.18)';
        el.style.borderColor = 'rgba(106,99,183,0.35)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
        el.style.borderColor = 'rgba(106,99,183,0.12)';
        el.style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '4px 14px', borderRadius: '9999px',
        background: 'linear-gradient(135deg, #6A63B7, #9b96d4)',
        color: 'white', fontSize: '0.75rem', fontWeight: 700,
        marginBottom: '0.875rem', letterSpacing: '0.06em',
      }}>
        {step.num}
      </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem', fontFamily: 'Fraunces, serif' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>
        {step.desc}
      </p>
    </div>
  );
}

function ProcessTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="svc-process">
      <div className="wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 4rem' }}
        >
          <div className="svc-section-label">How we work</div>
          <h2 className="svc-h2">A Process Built for<br />Lasting Results</h2>
          <p className="svc-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
            From first conversation to final delivery — every phase is intentional.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
            <div style={{ width: '48px', height: '4px', background: '#6A63B7', borderRadius: '9999px' }} />
            <div style={{ width: '10px', height: '10px', background: '#6A63B7', borderRadius: '50%' }} />
            <div style={{ width: '48px', height: '4px', background: '#6A63B7', borderRadius: '9999px' }} />
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          {/* static track */}
          <div className="process-track" />
          {/* animated fill */}
          <motion.div className="process-track-fill" style={{ height: lineHeight }} />

          {/* steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
            {STEPS.map((step, i) => (
              <ProcessStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Services = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: 'transparent', minHeight: '100vh', color: '#1a1a2e' }}>

      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Fraunces:ital,wght@0,300;0,600;0,700;1,300;1,600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .wrap { max-width: 1160px; margin: 0 auto; padding: 0 4rem; }

        .svc-section { padding: 80px 0 100px; scroll-margin-top: 80px; }
        .svc-section-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #6366f1; font-weight: 700; margin-bottom: 14px; }
        .svc-h2 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; line-height: 1.15; color: #1a1a2e; margin-bottom: 16px; }
        .svc-sub { font-size: 1rem; color: #6b7280; line-height: 1.6; max-width: 480px; }

        .svc-cards { margin-top: 64px; display: flex; flex-direction: column; gap: 1.5px; }

        .svc-card-row {
          display: grid; grid-template-columns: 64px 1fr 1fr auto;
          align-items: center; gap: 2rem;
          padding: 28px 36px; background: #fff;
          border: 1px solid #ebebeb;
          transition: all 0.3s ease; cursor: default; position: relative;
        }
        .svc-card-row:first-child { border-radius: 20px 20px 0 0; }
        .svc-card-row:last-child { border-radius: 0 0 20px 20px; }

        .svc-card-row.active { z-index: 2; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border-color: transparent; }

        .svc-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease;
        }
        .svc-card-row.active .svc-icon-wrap { transform: scale(1.08); }

        .svc-card-tag { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin-bottom: 6px; }
        .svc-card-name { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 600; color: #1a1a2e; }

        .svc-card-desc { font-size: 0.9rem; color: #6b7280; line-height: 1.6; }

        .svc-card-features { display: flex; flex-direction: column; gap: 6px; }
        .svc-feat { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: #9ca3af; font-weight: 500; }
        .svc-feat-dot { width: 5px; height: 5px; border-radius: 50%; background: #d1d5db; flex-shrink: 0; transition: background 0.3s; }
        .svc-card-row.active .svc-feat-dot { background: currentColor; }

        .svc-card-arrow {
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid #e5e7eb;
          display: flex; align-items: center; justify-content: center;
          color: #d1d5db; transition: all 0.3s ease; flex-shrink: 0;
        }
        .svc-card-row.active .svc-card-arrow { background: #1a1a2e; border-color: #1a1a2e; color: #fff; }

        /* ---- PROCESS ---- */
        .svc-process { padding: 5rem 0; background: transparent; }

        /* Desktop: 3-col grid */
        .process-step-row { display: grid; grid-template-columns: 1fr 72px 1fr; align-items: center; width: 100%; }
        .process-left-slot  { padding-right: 2.5rem; display: flex; justify-content: flex-end; }
        .process-node-col   { display: flex; justify-content: center; align-items: center; z-index: 20; }
        .process-right-slot { padding-left: 2.5rem; display: flex; justify-content: flex-start; }

        .process-card-mobile  { display: none; }
        .process-card-desktop { display: block; }

        .process-track {
          position: absolute; left: 50%; transform: translateX(-50%);
          top: 0; bottom: 0; width: 4px;
          background: rgba(106,99,183,0.12); border-radius: 9999px;
        }
        .process-track-fill {
          position: absolute; left: 50%; transform: translateX(-50%);
          top: 0; width: 4px;
          background: linear-gradient(to bottom, #6A63B7, #9b96d4);
          border-radius: 9999px; transform-origin: top;
        }

        /* Mobile: line on left, node on left, card fills right */
        @media (max-width: 640px) {
          .wrap { padding: 0 1.25rem; }

          .process-step-row { grid-template-columns: 56px 1fr; }
          .process-left-slot  { display: none; }
          .process-node-col   { grid-column: 1; grid-row: 1; justify-content: center; padding: 0; }
          .process-right-slot { grid-column: 2; grid-row: 1; padding-left: 0.875rem; }

          .process-card-mobile  { display: block; }
          .process-card-desktop { display: none !important; }

          .process-track      { left: 27px; transform: none; }
          .process-track-fill { left: 27px; transform: none; }
        }
        .svc-process { padding: 100px 0; background: transparent; }
        .svc-process-steps { margin-top: 64px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
        .svc-process-steps::before {
          content: ''; position: absolute; top: 32px; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, #d1d5db 20%, #d1d5db 80%, transparent);
        }
        .svc-step { padding: 0 24px; position: relative; }
        .svc-step-num {
          width: 64px; height: 64px; border-radius: 50%; background: #fff;
          border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-size: 1.125rem; font-weight: 600; color: #6366f1;
          margin-bottom: 28px; position: relative; z-index: 1;
        }
        .svc-step-title { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 600; color: #1a1a2e; margin-bottom: 12px; }
        .svc-step-desc { font-size: 0.875rem; color: #9ca3af; line-height: 1.65; }

        /* ---- CTA ---- */
        .svc-cta { padding: 80px 0; }
        .svc-cta-box {
          background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
          border-radius: 28px; padding: 72px 80px;
          display: flex; align-items: center; justify-content: space-between; gap: 48px;
          position: relative; overflow: hidden;
        }
        .svc-cta-orb { position: absolute; right: -60px; top: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%); }
        .svc-cta-h { font-family: 'Fraunces', serif; font-size: clamp(1.75rem, 3vw, 2.75rem); font-weight: 600; color: #fff; line-height: 1.2; margin-bottom: 16px; }
        .svc-cta-sub { font-size: 1rem; color: rgba(255,255,255,0.5); line-height: 1.6; }
        .svc-cta-btn {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px; border-radius: 14px; background: #fff; color: #1a1a2e;
          font-weight: 700; font-size: 0.9375rem; border: none; cursor: pointer;
          transition: all 0.25s ease; white-space: nowrap; text-decoration: none;
        }
        .svc-cta-btn:hover { background: #a5b4fc; transform: translateY(-2px); }

        @media (max-width: 900px) {
          .svc-card-row { grid-template-columns: 52px 1fr; }
          .svc-card-row > .svc-card-desc, .svc-card-row > .svc-card-features, .svc-card-row > .svc-card-arrow { display: none; }
          .svc-strengths-grid { grid-template-columns: 1fr 1fr; }
          .svc-process-steps { grid-template-columns: 1fr 1fr; gap: 40px; }
          .svc-process-steps::before { display: none; }
          .svc-cta-box { flex-direction: column; padding: 48px 36px; }
        }
        @media (max-width: 600px) {
          .svc-strengths-grid { grid-template-columns: 1fr; }
          .svc-process-steps { grid-template-columns: 1fr; }
          .svc-card-row { grid-template-columns: 48px 1fr; padding: 22px 20px; }
        }
      `}</style>

      {/* ── SERVICES ── */}
      <section id="services" className="svc-section" style={{ paddingTop: '80px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '16px' }}>
            <div>
              <div className="svc-section-label">What we offer</div>
              <h2 className="svc-h2">Empowering Through<br />Excellence</h2>
            </div>
            <p className="svc-sub">
              Each service is built around measurable outcomes, not just deliverables.
            </p>
          </div>

          <div className="svc-cards">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const isActive = hovered === s.id;
              return (
                <div
                  key={s.id}
                  className={`svc-card-row${isActive ? ' active' : ''}`}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ borderLeftColor: isActive ? s.accent : undefined, borderLeftWidth: isActive ? '3px' : '1px' }}
                >
                  {/* Icon */}
                  <div className="svc-icon-wrap" style={{ background: s.lightAccent, color: s.accent }}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>

                  {/* Name + Tag */}
                  <div>
                    <div className="svc-card-tag" style={{ color: s.accent }}>{s.tag}</div>
                    <div className="svc-card-name">{s.title}</div>
                  </div>

                  {/* Desc */}
                  <div className="svc-card-desc">{s.desc}</div>

                  {/* Features */}
                  <div className="svc-card-features" style={{ color: s.accent }}>
                    {s.features.map((f) => (
                      <div key={f} className="svc-feat">
                        <div className="svc-feat-dot" style={{ background: isActive ? s.accent : undefined }} />
                        <span style={{ color: isActive ? '#374151' : undefined }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="svc-card-arrow">
                    <ArrowRight size={15} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessTimeline />

      {/* ── CTA ── */}
      <section className="svc-cta">
        <div className="wrap">
          <div className="svc-cta-box">
            <div className="svc-cta-orb" />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="svc-cta-h">Ready to start your<br />transformation?</div>
              <div className="svc-cta-sub">Let's build something that lasts. Talk to our team today.</div>
            </div>
            <a href="#contact" className="svc-cta-btn" style={{ position: 'relative', zIndex: 1 }}>
              Get in touch <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};