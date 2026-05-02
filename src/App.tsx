import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { TopoBackground } from './components/TopoBackground';
import { Loader } from './components/Loader';
import { CoursesPage } from './pages/CoursesPage';
import { PartnerPage } from './pages/PartnerPage';
import './components/SectionFlow.css';

function HomePage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/partner" element={<PartnerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
