import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { NLPCourse } from './components/NLPCourse';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Programs />
      <NLPCourse />
      <Partners />
      <Footer />
    </div>
  );
}

export default App;
