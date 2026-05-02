import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, ShieldCheck, Monitor, BrainCircuit, Power, Camera,
  Rocket, Globe, Clock, Users, Star, ArrowRight, Search, Filter,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { useIsMobile } from '../hooks/useIsMobile';

const courses = [
  {
    id: 1, icon: BrainCircuit, category: 'AI & ML',
    title: 'AI & Machine Learning Fundamentals',
    description: 'Master neural networks, deep learning, and real-world AI applications with hands-on projects.',
    duration: '12 weeks', students: '2,400+', rating: 4.9, level: 'Beginner',
    accent: '#7c3aed', light: '#f5f3ff', tags: ['Python', 'TensorFlow', 'Neural Networks'], featured: true,
  },
  {
    id: 2, icon: ShieldCheck, category: 'Cybersecurity',
    title: 'Ethical Hacking & Cyber Defense',
    description: 'Learn penetration testing, threat analysis, and how to build robust security systems.',
    duration: '10 weeks', students: '1,800+', rating: 4.8, level: 'Intermediate',
    accent: '#059669', light: '#ecfdf5', tags: ['Kali Linux', 'Network Security', 'OWASP'], featured: false,
  },
  {
    id: 3, icon: Monitor, category: 'Web Dev',
    title: 'Full-Stack Web Development',
    description: 'Build modern, scalable web apps using React, Node.js, and cloud deployment strategies.',
    duration: '16 weeks', students: '3,200+', rating: 4.9, level: 'Beginner',
    accent: '#2563eb', light: '#eff6ff', tags: ['React', 'Node.js', 'PostgreSQL'], featured: false,
  },
  {
    id: 4, icon: Server, category: 'Cloud & DevOps',
    title: 'Cloud Architecture & DevOps',
    description: 'Design and deploy scalable cloud infrastructure using AWS, Docker, and Kubernetes.',
    duration: '14 weeks', students: '1,500+', rating: 4.7, level: 'Advanced',
    accent: '#d97706', light: '#fffbeb', tags: ['AWS', 'Docker', 'Kubernetes'], featured: false,
  },
  {
    id: 5, icon: Power, category: 'Green Tech',
    title: 'Green Tech & Renewable Energy',
    description: 'Explore solar, wind, and sustainable energy technologies with engineering applications.',
    duration: '8 weeks', students: '900+', rating: 4.8, level: 'Beginner',
    accent: '#16a34a', light: '#f0fdf4', tags: ['Solar Tech', 'IoT', 'Sustainability'], featured: false,
  },
  {
    id: 6, icon: Camera, category: 'Digital Media',
    title: 'Digital Content Creation & Marketing',
    description: 'Create compelling content, master social media strategy, and build your personal brand.',
    duration: '6 weeks', students: '2,100+', rating: 4.6, level: 'Beginner',
    accent: '#db2777', light: '#fdf2f8', tags: ['Video Editing', 'SEO', 'Branding'], featured: false,
  },
  {
    id: 7, icon: Rocket, category: 'Entrepreneurship',
    title: 'Tech Entrepreneurship & Startup Launchpad',
    description: 'From idea to MVP — validate, build, and pitch your tech startup to investors.',
    duration: '10 weeks', students: '1,200+', rating: 4.9, level: 'All Levels',
    accent: '#6A63B7', light: '#f5f3ff', tags: ['Lean Startup', 'Pitching', 'Product Design'], featured: false,
  },
  {
    id: 8, icon: Globe, category: 'Global',
    title: 'Tsangayar Fasaha — Hausa Digital Academy',
    description: 'Quality tech education in Hausa, expanding digital skills to diverse communities.',
    duration: '12 weeks', students: '600+', rating: 4.9, level: 'Beginner',
    accent: '#6A63B7', light: '#f5f3ff', tags: ['Hausa', 'Digital Literacy', 'Community'], featured: false,
  },
];

const categories = ['All', 'AI & ML', 'Cybersecurity', 'Web Dev', 'Cloud & DevOps', 'Green Tech', 'Digital Media', 'Entrepreneurship', 'Global'];

export const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = courses.find(c => c.featured)!;

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0f172a' }}>
      <Navbar />

      {/* ── Hero strip ───────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #0d0b2e 0%, #1a1650 100%)', paddingTop: '7rem', paddingBottom: '0', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(106,99,183,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 0' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#9b96d4' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#9b96d4' }}>MM Tech Academy</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
              Courses that<br />
              <span style={{ background: 'linear-gradient(90deg, #9b96d4, #c4c1e8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>move careers.</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.7, marginBottom: '3rem' }}>
              8 industry-aligned programs. Real skills. Real outcomes. Pick your path below.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
            {[['10K+', 'Students'], ['95%', 'Completion'], ['4.8★', 'Rating'], ['8', 'Programs']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* White curve transition */}
        <div style={{ height: 60, background: 'white', borderRadius: '60px 60px 0 0', marginTop: '-1px' }} />
      </div>

      {/* ── Featured course ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginTop: '-20px', marginBottom: '3rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#94a3b8', marginBottom: '1rem' }}>
            ✦ Featured Program
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -4 }}
            style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0',
              background: featured.light, borderRadius: 24,
              border: `1.5px solid ${featured.accent}22`,
              overflow: 'hidden', cursor: 'pointer',
              boxShadow: `0 8px 40px ${featured.accent}18`,
            }}
          >
            <div style={{ padding: isMobile ? '1.75rem' : '3rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${featured.accent}15`, border: `1px solid ${featured.accent}33`, borderRadius: '9999px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
                <featured.icon size={14} color={featured.accent} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: featured.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{featured.category}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{featured.title}</h2>
              <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1rem' }}>{featured.description}</p>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} />{featured.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Users size={14} />{featured.students}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Star size={14} color="#f59e0b" fill="#f59e0b" />{featured.rating}</span>
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: featured.accent, color: 'white', border: 'none', borderRadius: '9999px', padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'var(--font-primary)', boxShadow: `0 4px 20px ${featured.accent}44` }}>
                Enroll Now <ArrowRight size={16} />
              </button>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${featured.accent}22, ${featured.accent}08)`, display: isMobile ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${featured.accent}22 0%, transparent 70%)` }} />
              <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${featured.accent}15 0%, transparent 70%)` }} />
              <featured.icon size={120} color={`${featured.accent}33`} strokeWidth={0.8} />
            </div>
          </motion.div>
        </div>

        {/* ── Search + Filter ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text" placeholder="Search courses..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '9999px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-primary)', background: '#f8fafc', boxSizing: 'border-box' as const }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
            <Filter size={14} /> {filtered.length} courses
          </div>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: '9999px', border: '1.5px solid',
                borderColor: activeCategory === cat ? '#6A63B7' : '#e2e8f0',
                background: activeCategory === cat ? '#6A63B7' : 'white',
                color: activeCategory === cat ? 'white' : '#64748b',
                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.2s ease',
              }}
            >{cat}</button>
          ))}
        </div>

        {/* ── Course grid ──────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '6rem' }}>
            {filtered.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -6, boxShadow: `0 20px 48px ${course.accent}18` }}
                  style={{ background: 'white', borderRadius: 20, border: '1.5px solid #f1f5f9', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Top color band */}
                  <div style={{ height: 6, background: `linear-gradient(90deg, ${course.accent}, ${course.accent}88)` }} />
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: course.light, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${course.accent}22` }}>
                        <Icon size={22} color={course.accent} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, background: course.light, color: course.accent, padding: '0.25rem 0.75rem', borderRadius: '9999px', border: `1px solid ${course.accent}22` }}>{course.level}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: course.accent, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.4rem' }}>{course.category}</div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, fontFamily: 'var(--font-heading)' }}>{course.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{course.description}</p>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {course.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 600, background: '#f8fafc', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid #e2e8f0' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.78rem', color: '#94a3b8', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} />{course.duration}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={12} />{course.students}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={12} color="#f59e0b" fill="#f59e0b" />{course.rating}</span>
                    </div>
                    <button style={{ width: '100%', padding: '0.7rem', background: course.light, color: course.accent, border: `1.5px solid ${course.accent}33`, borderRadius: 10, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', fontFamily: 'var(--font-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = course.accent; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = course.light; e.currentTarget.style.color = course.accent; }}
                    >
                      Enroll Now <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '5rem 2rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
            Not sure where to start?
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: 460, margin: '0 auto 2rem' }}>
            Our advisors will build a personalised learning path for your goals.
          </p>
          <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#6A63B7', color: 'white', padding: '0.9rem 2.25rem', borderRadius: '9999px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(106,99,183,0.35)' }}>
            Talk to an Advisor <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
