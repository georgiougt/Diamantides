import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import RollingBanner from './components/RollingBanner';
import Hero from './components/Hero';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';

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
import BrandsPage from './pages/BrandsPage';
import NauticCleanPage from './pages/NauticCleanPage';
import BoatParkingPage from './pages/BoatParkingPage';
import RedsharkBikesPage from './pages/RedsharkBikesPage';
import YachtManagementPage from './pages/YachtManagementPage';


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
  // Don't show on home page or pages with their own hero banners to avoid "dark band" at the top
  const heroPages = ['/'];
  if (heroPages.includes(pathname)) return null;

  return (
    <div className="global-banner-wrapper">
      <RollingBanner />
    </div>
  );
};

// Component to handle scrolling to hash anchors
const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                // Timeout to ensure the page has rendered
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [hash]);

    return null;
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
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/boat-parking" element={<BoatParkingPage />} />
          <Route path="/services/yacht-management" element={<YachtManagementPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/charter" element={<CharterTestPage />} />
          <Route path="/sales" element={<SalesYachtsPage />} />
          <Route path="/sales/used" element={<SalesYachtsPage />} />
          <Route path="/sales/brands" element={<BrandsPage />} />
          <Route path="/sales/nautic-clean" element={<NauticCleanPage />} />
          <Route path="/sales/redshark-bikes" element={<RedsharkBikesPage />} />
          <Route path="/members-only" element={<VIPCharterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/yacht/:id" element={<YachtDetail />} />
          <Route path="/training-academy" element={<TrainingAcademyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
