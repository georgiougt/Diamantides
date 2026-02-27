import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import CharterYachtsPage from './pages/CharterYachtsPage';
import VIPCharterPage from './pages/VIPCharterPage';
// Ensure the root-level components remain if used by LandingPage
import About from './components/About';
import Services from './components/Services';
import Fleet from './components/Fleet';
import WhyCharter from './components/WhyCharter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import YachtDetail from './components/YachtDetail';

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

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/charter" element={<CharterYachtsPage />} />
          <Route path="/members-only" element={<VIPCharterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/yacht/:id" element={<YachtDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
