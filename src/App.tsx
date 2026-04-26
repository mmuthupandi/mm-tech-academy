import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { TopoBackground } from './components/TopoBackground';
import { Loader } from './components/Loader';
import './components/SectionFlow.css';

function App() {
  return (
    <>
      <Loader />
      <div className="app">
        <Navbar />
        <Hero />
        <div className="content-wrapper">
          <TopoBackground />
          <div className="content-sections">
            <About />
            <Services />
            <Programs />
            <Partners />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
