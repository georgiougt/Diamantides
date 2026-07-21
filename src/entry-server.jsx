import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

// Import components statically for server-side pre-rendering
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BoatParkingPage from './pages/BoatParkingPage';
import YachtManagementPage from './pages/YachtManagementPage';
import FleetPage from './pages/FleetPage';
import CharterTestPage from './pages/CharterTestPage';
import SalesYachtsPage from './pages/SalesYachtsPage';
import BrandsPage from './pages/BrandsPage';
import NauticCleanPage from './pages/NauticCleanPage';
import RedsharkBikesPage from './pages/RedsharkBikesPage';
import VIPCharterPage from './pages/VIPCharterPage';
import ContactPage from './pages/ContactPage';
import YachtDetail from './components/YachtDetail';
import TrainingAcademyPage from './pages/TrainingAcademyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const serverComponents = {
  AboutPage,
  ServicesPage,
  BoatParkingPage,
  YachtManagementPage,
  FleetPage,
  CharterTestPage,
  SalesYachtsPage,
  BrandsPage,
  NauticCleanPage,
  RedsharkBikesPage,
  VIPCharterPage,
  ContactPage,
  YachtDetail,
  TrainingAcademyPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  FAQPage,
  BlogPage,
  BlogDetailPage,
  NotFoundPage
};

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <LanguageProvider>
        <App components={serverComponents} />
      </LanguageProvider>
    </StaticRouter>
  );
}
