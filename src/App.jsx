import { updateSEO } from './utils/seo';
import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import RollingBanner from './components/RollingBanner';
import Hero from './components/Hero';

// Ensure the root-level components remain if used by LandingPage
import About from './components/About';
import Services from './components/Services';
import Fleet from './components/Fleet';
import WhyCharter from './components/WhyCharter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Lazy load page-level routes to enable client-side code-splitting
const LazyAboutPage = React.lazy(() => import('./pages/AboutPage'));
const LazyServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const LazyFleetPage = React.lazy(() => import('./pages/FleetPage'));
const LazyContactPage = React.lazy(() => import('./pages/ContactPage'));
const LazyVIPCharterPage = React.lazy(() => import('./pages/VIPCharterPage'));
const LazySalesYachtsPage = React.lazy(() => import('./pages/SalesYachtsPage'));
const LazyYachtDetail = React.lazy(() => import('./components/YachtDetail'));
const LazyTrainingAcademyPage = React.lazy(() => import('./pages/TrainingAcademyPage'));
const LazyPrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const LazyTermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage'));
const LazyCharterTestPage = React.lazy(() => import('./pages/CharterTestPage'));
const LazyBrandsPage = React.lazy(() => import('./pages/BrandsPage'));
const LazyNauticCleanPage = React.lazy(() => import('./pages/NauticCleanPage'));
const LazyBoatParkingPage = React.lazy(() => import('./pages/BoatParkingPage'));
const LazyRedsharkBikesPage = React.lazy(() => import('./pages/RedsharkBikesPage'));
const LazyYachtManagementPage = React.lazy(() => import('./pages/YachtManagementPage'));
const LazyFAQPage = React.lazy(() => import('./pages/FAQPage'));
const LazyBlogPage = React.lazy(() => import('./pages/BlogPage'));
const LazyBlogDetailPage = React.lazy(() => import('./pages/BlogDetailPage'));
const LazyNotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));


// Component for the landing page content
const LandingPage = () => {
  const { currentLang } = useLanguage();
  useEffect(() => {
    if (currentLang === 'ru') {
      updateSEO(
        'Diamantides Yachting | Аренда и Продажа Люксовых Яхт на Кипре',
        'Непревзойдённая средиземноморская роскошь. Индивидуальная аренда яхт, продажа премиальных яхт, парковка катеров, управление яхтами и обучение судовождению в Лимассоле, Кипр.'
      );
    } else {
      updateSEO(
        'Diamantides Yachting | Luxury Yacht Charters & Sales Cyprus',
        'Experience the ultimate in Mediterranean luxury. Bespoke yacht charters, premium yacht sales, boat parking, yacht management, and speedboat training in Limassol, Cyprus.'
      );
    }
    window.scrollTo(0, 0);
  }, [currentLang]);
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

// Component to track Google Ads Pageviews on Route changes in React Router SPA
const GoogleAdsTracker = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag('config', 'AW-11054121004', {
                page_path: pathname,
            });
        }
    }, [pathname]);

    return null;
};

function App({ components = {} }) {
  const AboutPage = components.AboutPage || LazyAboutPage;
  const ServicesPage = components.ServicesPage || LazyServicesPage;
  const BoatParkingPage = components.BoatParkingPage || LazyBoatParkingPage;
  const YachtManagementPage = components.YachtManagementPage || LazyYachtManagementPage;
  const FleetPage = components.FleetPage || LazyFleetPage;
  const CharterTestPage = components.CharterTestPage || LazyCharterTestPage;
  const SalesYachtsPage = components.SalesYachtsPage || LazySalesYachtsPage;
  const BrandsPage = components.BrandsPage || LazyBrandsPage;
  const NauticCleanPage = components.NauticCleanPage || LazyNauticCleanPage;
  const RedsharkBikesPage = components.RedsharkBikesPage || LazyRedsharkBikesPage;
  const VIPCharterPage = components.VIPCharterPage || LazyVIPCharterPage;
  const ContactPage = components.ContactPage || LazyContactPage;
  const YachtDetail = components.YachtDetail || LazyYachtDetail;
  const TrainingAcademyPage = components.TrainingAcademyPage || LazyTrainingAcademyPage;
  const PrivacyPolicyPage = components.PrivacyPolicyPage || LazyPrivacyPolicyPage;
  const TermsOfServicePage = components.TermsOfServicePage || LazyTermsOfServicePage;
  const FAQPage = components.FAQPage || LazyFAQPage;
  const BlogPage = components.BlogPage || LazyBlogPage;
  const BlogDetailPage = components.BlogDetailPage || LazyBlogDetailPage;
  const NotFoundPage = components.NotFoundPage || LazyNotFoundPage;

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
    <div className="app-container">
      <GoogleAdsTracker />
      {showLoader && (
        <LoadingScreen isVisible={isLoading} onFinished={handleLoaderFinished} />
      )}
      <Navbar />
      <GlobalRollingBanner />
      <ScrollToHash />
      <Suspense fallback={null}>
        <Routes>
          {['', '/ru'].map(prefix => (
            <React.Fragment key={prefix}>
              <Route path={prefix || "/"} element={<LandingPage />} />
              <Route path={`${prefix}/about`} element={<AboutPage />} />
              <Route path={`${prefix}/services`} element={<ServicesPage />} />
              <Route path={`${prefix}/services/boat-parking`} element={<BoatParkingPage />} />
              <Route path={`${prefix}/services/yacht-management`} element={<YachtManagementPage />} />
              <Route path={`${prefix}/fleet`} element={<FleetPage />} />
              <Route path={`${prefix}/charter`} element={<CharterTestPage />} />
              <Route path={`${prefix}/charter-yacht/limassol`} element={<CharterTestPage />} />
              <Route path={`${prefix}/sales`} element={<SalesYachtsPage />} />
              <Route path={`${prefix}/sales/used`} element={<SalesYachtsPage />} />
              <Route path={`${prefix}/sales/fleet`} element={<SalesYachtsPage />} />
              <Route path={`${prefix}/sales/brands`} element={<BrandsPage />} />
              <Route path={`${prefix}/sales/nautic-clean`} element={<NauticCleanPage />} />
              <Route path={`${prefix}/sales/redshark-bikes`} element={<RedsharkBikesPage />} />
              <Route path={`${prefix}/members-only`} element={<VIPCharterPage />} />
              <Route path={`${prefix}/contact`} element={<ContactPage />} />
              <Route path={`${prefix}/charter-yacht/limassol/yacht/:slug`} element={<YachtDetail />} />
              <Route path={`${prefix}/sales/fleet/yacht/:slug`} element={<YachtDetail />} />
              <Route path={`${prefix}/sales/fleet/boat/:slug`} element={<YachtDetail />} />
              <Route path={`${prefix}/yacht/:id`} element={<YachtDetail />} />
              <Route path={`${prefix}/training-academy`} element={<TrainingAcademyPage />} />
              <Route path={`${prefix}/privacy-policy`} element={<PrivacyPolicyPage />} />
              <Route path={`${prefix}/terms-of-service`} element={<TermsOfServicePage />} />
              <Route path={`${prefix}/faq`} element={<FAQPage />} />
              <Route path={`${prefix}/blog`} element={<BlogPage />} />
              <Route path={`${prefix}/blog/:slug`} element={<BlogDetailPage />} />
            </React.Fragment>
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App;
