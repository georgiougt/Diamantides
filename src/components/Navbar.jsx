import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import horizontalLogo from '../assets/diamantides-logo-white-wide.png';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const transparentRoutes = ['/'];
    const isTransparentStart = transparentRoutes.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const salesDropdown = {
        name: 'Sales & Brokerage',
        links: [
            { name: 'Used Vessels', href: '/sales/used' },
            { name: 'New Brands', href: '/sales/brands' },
            { name: 'Nautic Clean', href: '/sales/nautic-clean' }
        ]
    };

    const navLinks = [
        { name: 'Charter Yachts', href: '/charter' },
    ];

    const servicesDropdown = {
        name: 'Services',
        links: [
            { name: 'Management & Maintenance', href: '/services#management-maintenance' },
            { name: 'Boat Parking & Storage', href: '/services#boat-parking' },
            { name: 'Speed Boat Training', href: '/training-academy' }
        ]
    };

    const aboutDropdown = {
        name: 'About',
        links: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' }
        ]
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`navbar ${isScrolled || !isTransparentStart ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <img src={horizontalLogo} alt="Diamantides Yachting" className="logo-img" />
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
                                    to={sublink.href} 
                                    className="dropdown-link"
                                >
                                    {sublink.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.href} className="nav-link">
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
                                    to={sublink.href} 
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
                                    to={sublink.href} 
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
                                to={sublink.href}
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
                            to={link.href}
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
                                to={sublink.href}
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
                                to={sublink.href}
                                className="mobile-nav-link sub-link"
                                onClick={handleNavClick}
                            >
                                {sublink.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
