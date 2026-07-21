import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import horizontalLogo from '../assets/diamantides-logo-white-wide.png';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { currentLang, t, localizePath, changeLanguage } = useLanguage();
    
    // Transparent check needs to support both / and /ru routes
    const transparentRoutes = ['/', '/ru', '/ru/'];
    const isTransparentStart = transparentRoutes.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const salesDropdown = {
        name: t('nav.sales'),
        links: [
            { name: t('nav.salesFleet'), href: '/sales/' },
            { name: t('nav.newBrands'), href: '/sales/brands/' },
            { name: t('nav.nauticClean'), href: '/sales/nautic-clean/' },
            { name: t('nav.redsharkBikes'), href: '/sales/redshark-bikes/' }
        ]
    };

    const navLinks = [
        { name: t('nav.charter'), href: '/charter-yacht/limassol/' },
    ];

    const servicesDropdown = {
        name: t('nav.services'),
        links: [
            { name: t('nav.management'), href: '/services/yacht-management/' },
            { name: t('nav.parking'), href: '/services/boat-parking/' },
            { name: t('nav.training'), href: '/training-academy/' }
        ]
    };

    const aboutDropdown = {
        name: t('nav.about'),
        links: [
            { name: t('nav.aboutUs'), href: '/about/' },
            { name: t('nav.blog'), href: '/blog' },
            { name: t('nav.contactUs'), href: '/contact/' }
        ]
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`navbar ${isScrolled || !isTransparentStart ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to={localizePath('/')} className="logo">
                    <div className="logo-wrapper">
                        <img src={horizontalLogo} alt="Diamantides Yachting - Luxury Yacht Charters & Sales Cyprus" className="logo-img" />
                        <span className="logo-motto">{t('nav.motto')}</span>
                    </div>
                </Link>

                <div className="desktop-menu">
                    {/* Sales Dropdown */}
                    <div className="nav-item-dropdown">
                        <span className="nav-link dropdown-trigger">
                            {salesDropdown.name}
                        </span>
                        <div className="dropdown-menu">
                            {salesDropdown.links.map((sublink) => (
                                <Link
                                    key={sublink.name}
                                    to={localizePath(sublink.href)}
                                    className="dropdown-link"
                                >
                                    {sublink.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {navLinks.map((link) => (
                        <Link key={link.name} to={localizePath(link.href)} className="nav-link">
                            {link.name}
                        </Link>
                    ))}

                    {/* Services Dropdown */}
                    <div className="nav-item-dropdown">
                        <span className="nav-link dropdown-trigger">
                            {servicesDropdown.name}
                        </span>
                        <div className="dropdown-menu">
                            {servicesDropdown.links.map((sublink) => (
                                <Link
                                    key={sublink.name}
                                    to={localizePath(sublink.href)}
                                    className="dropdown-link"
                                >
                                    {sublink.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* About Dropdown */}
                    <div className="nav-item-dropdown">
                        <span className="nav-link dropdown-trigger">
                            {aboutDropdown.name}
                        </span>
                        <div className="dropdown-menu">
                            {aboutDropdown.links.map((sublink) => (
                                <Link
                                    key={sublink.name}
                                    to={localizePath(sublink.href)}
                                    className="dropdown-link"
                                >
                                    {sublink.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <a href="tel:+35725010561" className="contact-btn">
                        <Phone size={18} />
                        <span>+357 25 010 561</span>
                    </a>

                    <div className="lang-switcher">
                        <button 
                            className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                            onClick={() => changeLanguage('en')}
                        >
                            EN
                        </button>
                        <span className="lang-divider">|</span>
                        <button 
                            className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
                            onClick={() => changeLanguage('ru')}
                        >
                            RU
                        </button>
                    </div>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    {/* Mobile Sales Section */}
                    <div className="mobile-dropdown-section">
                        <span className="mobile-nav-link mobile-dropdown-title">{salesDropdown.name}</span>
                        {salesDropdown.links.map((sublink) => (
                            <Link
                                key={sublink.name}
                                to={localizePath(sublink.href)}
                                className="mobile-nav-link sub-link"
                                onClick={handleNavClick}
                            >
                                {sublink.name}
                            </Link>
                        ))}
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={localizePath(link.href)}
                            className="mobile-nav-link"
                            onClick={handleNavClick}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {/* Mobile Services Section */}
                    <div className="mobile-dropdown-section">
                        <span className="mobile-nav-link mobile-dropdown-title">{servicesDropdown.name}</span>
                        {servicesDropdown.links.map((sublink) => (
                            <Link
                                key={sublink.name}
                                to={localizePath(sublink.href)}
                                className="mobile-nav-link sub-link"
                                onClick={handleNavClick}
                            >
                                {sublink.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile About Section */}
                    <div className="mobile-dropdown-section">
                        <span className="mobile-nav-link mobile-dropdown-title">{aboutDropdown.name}</span>
                        {aboutDropdown.links.map((sublink) => (
                            <Link
                                key={sublink.name}
                                to={localizePath(sublink.href)}
                                className="mobile-nav-link sub-link"
                                onClick={handleNavClick}
                            >
                                {sublink.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Language Switcher */}
                    <div className="mobile-lang-switcher">
                        <button 
                            className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                            onClick={() => { changeLanguage('en'); handleNavClick(); }}
                        >
                            EN
                        </button>
                        <span className="lang-divider">|</span>
                        <button 
                            className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
                            onClick={() => { changeLanguage('ru'); handleNavClick(); }}
                        >
                            RU
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
