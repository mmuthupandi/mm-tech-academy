import { motion } from 'framer-motion';

const companies = [
  "Aakash", "Aditya Birla", "Arcesium", "August AI", "Bizom", "Boston Consulting Group (BCG)",
  "Capital2B", "Clix Capital", "DE Shaw", "Decision Tree", "Educational Initiatives", "Eggoz",
  "Flipkart", "Fractal", "Global Data", "Growth Natives", "ICF", "Info Edge", "Jefferies",
  "JM Financial", "LAT Aerospace", "McKinsey & Company", "Meru Capitals", "Nagarro",
  "Pixxel", "Policy Bazaar", "Predli", "Wayground", "Sarvam AI", "Sunteck Realty", "Wayfair", "Whatfix"
];

export const Partners = () => (
  <section id="partners" className="section" style={{ padding: '5rem 0', background: 'transparent', overflow: 'hidden' }}>
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Trusted by Industry Leaders
    </motion.h2>
    <div className="marquee-container">
      <div className="marquee-content">
        {[...companies, ...companies].map((company, idx) => (
          <div key={idx} className="marquee-item">{company}</div>
        ))}
      </div>
    </div>
  </section>
);
