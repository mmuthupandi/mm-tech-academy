export const Partners = () => {
  const companies = [
    "Aakash", "Aditya Birla", "Arcesium", "August AI", "Bizom", "Boston Consulting Group (BCG)", 
    "Capital2B", "Clix Capital", "DE Shaw", "Decision Tree", "Educational Initiatives", "Eggoz", 
    "Flipkart", "Fractal", "Global Data", "Growth Natives", "ICF", "Info Edge", "Jefferies", 
    "JM Financial", "LAT Aerospace", "McKinsey & Company", "Meru Capitals", "Nagarro", 
    "Pixxel", "Policy Bazaar", "Predli", "Wayground", "Sarvam AI", "Sunteck Realty", "Wayfair", "Whatfix"
  ];

  return (
    <section className="section" style={{ padding: '5rem 0', background: 'white', overflow: 'hidden' }}>
      <h2 className="section-title">Trusted by Industry Leaders</h2>
      <div className="marquee-container">
        <div className="marquee-content">
          {[...companies, ...companies].map((company, idx) => (
            <div key={idx} className="marquee-item">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
