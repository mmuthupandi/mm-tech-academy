import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Leadership } from './components/Leadership';
import { Services } from './components/Services';
import { Programs } from './components/Programs';
import { Partners } from './components/Partners';
import { Footer } from './components/Footer';
import { TopoBackground } from './components/TopoBackground';
import { Loader } from './components/Loader';
import { CoursesPage } from './pages/CoursesPage';
import { PartnerPage } from './pages/PartnerPage';
import { StudentInquiryModal } from './components/StudentInquiryModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AdvisorModal } from './components/AdvisorModal';
import { Toast } from './components/Toast';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
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
            <Leadership />
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
      <AnalyticsTracker />
      <Toast />
      <StudentInquiryModal />
      <EnrollmentModal />
      <AdvisorModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/partner" element={<PartnerPage />} />

        {/* Secure Admin Analytics Dashboard */}
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
