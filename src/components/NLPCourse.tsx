import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const NLPCourse = () => {
  const units = [
    { title: 'Unit I: NLP Introduction', content: 'Word Structure, Tokenization, TF-IDF, NLTK package basics.' },
    { title: 'Unit II: Syntax Analysis', content: 'Parsing Algorithms (CYK, Shift Reduce), Probabilistic Context-Free Grammar.' },
    { title: 'Unit III: Language Modeling', content: 'N-Gram Models, Parameter Estimation and mathematical foundations.' },
    { title: 'Unit IV & V: Semantic & Discourse', content: 'Semantic Parsing, Word Sense Systems, Predicate-Argument Structure, and Discourse Processing.' },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section section-dark" style={{ background: 'var(--gray-900)', color: 'white' }}>
      <div className="container">
        <div className="grid-2-cols">
          <div>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(0, 102, 255, 0.2)', color: 'var(--blue-light)', borderRadius: '99px', fontWeight: 600, marginBottom: '1.5rem' }}>
              Featured Premium Course
            </div>
            <h2 className="nlp-title" style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>
              Natural Language Processing <span className="text-gradient">(NLP)</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-200)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Dive deep into the intersection of linguistics, statistics, and computer science. Our flagship NLP course teaches you how to model linguistic phenomena with formal grammars and build state-of-the-art language models.
            </p>
            <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ color: 'var(--blue-light)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Course Outcomes</h4>
              <p style={{ color: 'var(--gray-200)' }}>
                Nurturing critical thinkers capable of designing, implementing, and analyzing advanced NLP algorithms and statistical models.
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {units.map((unit, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
                <div 
                  className="accordion-header" 
                  style={{ padding: '1.5rem', background: 'var(--gray-800)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                >
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{unit.title}</span>
                  {openIdx === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div 
                      style={{ padding: '1.5rem', background: 'var(--gray-50)', color: 'var(--gray-800)' }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      {unit.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
