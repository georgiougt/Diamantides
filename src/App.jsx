import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import RollingBanner from './components/RollingBanner';
import Hero from './components/Hero';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import CharterYachtsPage from './pages/CharterYachtsPage';
import VIPCharterPage from './pages/VIPCharterPage';
import SalesYachtsPage from './pages/SalesYachtsPage';
// Ensure the root-level components remain if used by LandingPage
import About from './components/About';
import Services from './components/Services';
import Fleet from './components/Fleet';
import WhyCharter from './components/WhyCharter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import YachtDetail from './components/YachtDetail';
import TrainingAcademyPage from './pages/TrainingAcademyPage';
import LoadingScreen from './components/LoadingScreen';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CharterTestPage from './pages/CharterTestPage';

// Component for the landing page content
const LandingPage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Fleet />
      <WhyCharter />
      <Contact />
    </main>
  );
};

// Component to handle the brand banner on all pages except Home
const GlobalRollingBanner = () => {
  const { pathname } = useLocation();
  // Don't show on home page or if it's explicitly excluded
  if (pathname === '/') return null;

  return (
    <div className="global-banner-wrapper">
      <RollingBanner />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoaderFinished = () => {
    setShowLoader(false);
  };

  return (
    <Router>
      <div className="app-container">
        {showLoader && (
          <LoadingScreen isVisible={isLoading} onFinished={handleLoaderFinished} />
        )}
        <Navbar />
        <GlobalRollingBanner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/charter" element={<CharterYachtsPage />} />
          <Route path="/sales" element={<SalesYachtsPage />} />
          <Route path="/members-only" element={<VIPCharterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/yacht/:id" element={<YachtDetail />} />
          <Route path="/training-academy" element={<TrainingAcademyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/charter-test" element={<CharterTestPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
