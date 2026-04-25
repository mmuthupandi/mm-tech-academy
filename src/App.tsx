import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { TopoBackground } from './components/TopoBackground';
import './components/SectionFlow.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="content-wrapper">
        <TopoBackground />
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
