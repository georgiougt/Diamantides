import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import horizontalLogo from '../assets/diamantides-logo-white-wide.png';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/Footer.css';

const Footer = () => {
    const { t, localizePath } = useLanguage();

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to={localizePath('/')} className="footer-logo">
                        <img src={horizontalLogo} alt="Diamantides Yachting - Yacht Sales & Charter Limassol Marina" className="footer-logo-img" />
                    </Link>
                    <p className="footer-desc">
                        {t('footer.desc')}
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>{t('footer.company')}</h3>
                    <ul>
                        <li><Link to={localizePath('/')}>{t('common.home')}</Link></li>
                        <li><Link to={localizePath('/about')}>{t('nav.aboutUs')}</Link></li>
                        <li><Link to={localizePath('/services')}>{t('nav.services')}</Link></li>
                        <li><Link to={localizePath('/blog')}>{t('nav.blog')}</Link></li>
                        <li><Link to={localizePath('/contact')}>{t('nav.contactUs')}</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>{t('footer.services')}</h3>
                    <ul>
                        <li><Link to={localizePath('/charter-yacht/limassol')}>{t('nav.charter')}</Link></li>
                        <li><Link to={localizePath('/sales')}>{t('nav.sales')}</Link></li>
                        <li><Link to={localizePath('/services/yacht-management')}>{t('nav.management')}</Link></li>
                        <li><Link to={localizePath('/training-academy')}>{t('nav.training')}</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Diamantides Yachting. {t('footer.rights')}</p>
                <div className="footer-legal">
                    <Link to={localizePath('/privacy-policy')}>{t('footer.privacyPolicy')}</Link>
                    <Link to={localizePath('/terms-of-service')}>{t('footer.termsOfService')}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
