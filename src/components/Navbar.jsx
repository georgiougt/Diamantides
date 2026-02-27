import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Anchor } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const transparentRoutes = ['/', '/members-only'];
    const isTransparentStart = transparentRoutes.includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Charter Yachts', href: '/charter' },
        { name: 'Services', href: '/services' },
        { name: 'Fleet', href: '/fleet' },
        { name: 'Contact', href: '/contact' },
        { name: 'About', href: '/about' },
    ];

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`navbar ${isScrolled || !isTransparentStart ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="logo">
                    <Anchor className="logo-icon" />
                    <span className="logo-text">Diamantides Yachting</span>
                </Link>

                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.href} className="nav-link">
                            {link.name}
                        </Link>
                    ))}
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
                </div>
            )}
        </header>
    );
};

export default Navbar;
