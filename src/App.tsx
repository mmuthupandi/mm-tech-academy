import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import './components/SectionFlow.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--gray-50)' }}>
        <About />
        <Services />
        <Programs />
        <Partners />
        <Footer />
      </div>
    </div>
  );
}

export default App;
