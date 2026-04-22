import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Clock, Award, Target, CheckCircle2, Users, GraduationCap, Star, Calendar } from 'lucide-react';
import './NLPHero.css';

export const NLPHero = () => {
  const [openUnit, setOpenUnit] = useState(0);

  const units = [
    {
      title: 'Unit I: NLP Introduction',
      iconClass: 'nlp-icon-cyan',
      topics: ['Word Structure', 'Tokenization', 'TF-IDF', 'NLTK package basics']
    },
    {
      title: 'Unit II: Syntax Analysis',
      iconClass: 'nlp-icon-emerald',
      topics: ['Part-of-Speech Tagging', 'Context-Free Grammars', 'Dependency Parsing', 'Treebanks']
    },
    {
      title: 'Unit III: Language Modeling',
      iconClass: 'nlp-icon-orange',
      topics: ['N-Gram Models', 'Hidden Markov Models', 'Smoothing Techniques', 'Word Embeddings (Word2Vec)']
    },
    {
      title: 'Unit IV & V: Semantic & Discourse',
      iconClass: 'nlp-icon-purple',
      topics: ['Lexical Semantics', 'Transformers (BERT/GPT)', 'Coreference Resolution', 'Question Answering Systems']
    }
  ];

  const unitIcons = [
    <span key="u1" className="nlp-orb-number">1</span>,
    <span key="u2" className="nlp-orb-number">2</span>,
    <span key="u3" className="nlp-orb-number">3</span>,
    <span key="u4" className="nlp-orb-number">4</span>,
  ];

  const features = [
    { icon: <BookOpen className="w-5 h-5" />, label: '5 Comprehensive', sublabel: 'Modules', color: 'text-violet-400' },
    { icon: <Clock className="w-5 h-5" />, label: '30+ Hours of', sublabel: 'Learning', color: 'text-blue-400' },
    { icon: <Award className="w-5 h-5" />, label: 'Certificate of', sublabel: 'Completion', color: 'text-cyan-400' },
    { icon: <Target className="w-5 h-5" />, label: 'Hands-on Projects', sublabel: '& Assessments', color: 'text-teal-400' }
  ];

  const outcomes = [
    'Master NLP Fundamentals',
    'Build Real-world Models',
    'Solve Complex Problems',
    'Advance Your Career'
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '1,200+', label: 'Students Enrolled', color: 'text-violet-400' },
    { icon: <GraduationCap className="w-6 h-6" />, value: '98%', label: 'Satisfaction Rate', color: 'text-blue-400' },
    { icon: <Star className="w-6 h-6" />, value: '4.9/5', label: 'Course Rating', color: 'text-cyan-400' },
    { icon: <Calendar className="w-6 h-6" />, value: 'Lifetime', label: 'Access', color: 'text-teal-400' }
  ];

  return (
    <section className="nlp-hero-section" id="nlp">
      {/* Background Elements */}
      <div className="nlp-glow-left"></div>
      <div className="nlp-glow-right"></div>
      <div className="nlp-glow-bottom"></div>
      <div className="nlp-dot-grid"></div>

      {/* Brain SVG (Left) */}
      <div className="nlp-brain-svg">
        <svg viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#brainGlow)" />
          <g stroke="#8b5cf6" strokeWidth="0.5" fill="none" opacity="0.6">
            <path d="M200 50 Q250 50 280 80 T320 150 Q330 220 280 280 T200 320" />
            <path d="M200 50 Q150 50 120 80 T80 150 Q70 220 120 280 T200 320" />
            <path d="M200 70 Q230 70 260 100 T290 180 Q280 250 250 280" />
            <circle cx="250" cy="120" r="2" fill="#6366f1" />
            <circle cx="280" cy="180" r="2" fill="#06b6d4" />
            <circle cx="240" cy="240" r="1.5" fill="#8b5cf6" />
            <circle cx="160" cy="100" r="2" fill="#6366f1" />
            <circle cx="120" cy="160" r="1.5" fill="#8b5cf6" />
            <line x1="200" y1="50" x2="250" y2="120" />
            <line x1="250" y1="120" x2="280" y2="180" />
            <line x1="280" y1="180" x2="240" y2="240" />
          </g>
        </svg>
      </div>

      {/* Waves SVG (Right) */}
      <div className="nlp-waves-svg">
        <svg viewBox="0 0 600 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#6366f1" strokeWidth="1" fill="none" opacity="0.4">
            <path d="M0 200 Q150 150 300 250 T600 200" />
            <path d="M0 220 Q150 170 300 270 T600 220" />
            <path d="M0 240 Q150 190 300 290 T600 240" />
            <path d="M0 260 Q150 210 300 310 T600 260" />
            <path d="M0 280 Q150 230 300 330 T600 280" />
          </g>
        </svg>
      </div>

      <div className="nlp-container">
        <div className="nlp-grid">
          
          {/* LEFT SIDE */}
          <div className="nlp-left-col">
            <div className="nlp-badge">
              <span className="nlp-badge-icon">⭐</span>
              <span className="nlp-badge-text">Featured Premium Course</span>
            </div>

            <div>
              <h1 className="nlp-heading">
                <span>Natural Language</span><br/>
                <span>Processing </span>
                <span className="nlp-heading-gradient">(NLP)</span>
              </h1>
              <div className="nlp-heading-underline"></div>
            </div>

            <p className="nlp-desc">
              Dive deep into the intersection of linguistics, statistics, and computer science. Our flagship NLP course teaches you how to model linguistic phenomena with formal grammars and build state-of-the-art language models.
            </p>

            <div className="nlp-unified-box">
              <div className="nlp-box-glow"></div>
              
              {/* Features Grid */}
              <div className="nlp-features-grid">
                {features.map((feature, idx) => (
                  <div key={idx} className="nlp-feature-item">
                    <div className={`nlp-feature-icon-wrapper ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="nlp-feature-label">{feature.label}</div>
                      <div className="nlp-feature-sublabel">{feature.sublabel}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Outcomes */}
              <div className="nlp-outcomes">
                <div className="nlp-outcomes-header">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h3 className="nlp-outcomes-title">Course Outcomes</h3>
                </div>
                <p className="nlp-outcomes-desc">
                  Nurturing critical thinkers capable of designing, implementing, and analyzing advanced NLP algorithms and statistical models.
                </p>
                <div className="nlp-outcomes-list">
                  {outcomes.map((outcome, idx) => (
                    <div key={idx} className="nlp-outcome-item">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="nlp-outcome-text">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Accordion */}
          <div className="nlp-accordion-wrapper">
            {units.map((unit, idx) => (
              <div key={idx} className={`nlp-accordion-item ${openUnit === idx ? 'active' : ''}`}>
                <button onClick={() => setOpenUnit(openUnit === idx ? -1 : idx)} className="nlp-accordion-btn">
                  <div className="nlp-accordion-btn-left">
                    <div className={`nlp-accordion-icon-orb ${unit.iconClass}`}>
                      <div className="nlp-orb-glow"></div>
                      <div className="nlp-orb-icon">
                        {unitIcons[idx]}
                      </div>
                    </div>
                    <span className="nlp-accordion-title">{unit.title}</span>
                  </div>
                  <div className="nlp-accordion-chevron">
                    {openUnit === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {openUnit === idx && (
                  <div className="nlp-accordion-content">
                    <div className="nlp-topics-list" style={{ paddingTop: '1rem' }}>
                      {unit.topics.length > 0 ? (
                        unit.topics.map((topic, topicIdx) => (
                          <div key={topicIdx} className="nlp-topic-item">
                            <div className="nlp-topic-dot"></div>
                            <span className="nlp-topic-text">{topic}</span>
                          </div>
                        ))
                      ) : (
                        <div style={{color: '#9ca3af', fontStyle: 'italic', fontSize: '0.875rem'}}>
                          Curriculum details coming soon...
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="nlp-stats-wrapper">
          <div className="nlp-stats-inner">
            <div className="nlp-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="nlp-stat-item">
                  <div className={`nlp-stat-icon-wrap ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="nlp-stat-value">{stat.value}</div>
                    <div className="nlp-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};