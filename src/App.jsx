import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
          <Route path="/yacht/:id" element={<YachtDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
