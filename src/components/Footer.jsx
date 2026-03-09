import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin } from 'lucide-react';
import horizontalLogo from '../assets/diamantides-logo-white-wide.png';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <img src={horizontalLogo} alt="Diamantides Yachting" className="footer-logo-img" />
                    </Link>
                    <p className="footer-desc">
                        Your premier partner for luxury yachting experiences in Cyprus.
                        Charter, sales, and management services of the highest caliber.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/fleet">Fleet</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Services</h3>
                    <ul>
                        <li><Link to="/charter">Yacht Charter</Link></li>
                        <li><Link to="/fleet">Yacht Sales</Link></li>
                        <li><Link to="/services">Management</Link></li>
                        <li><Link to="/training-academy">Training</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Diamantides Yachting. All rights reserved.</p>
                <div className="footer-legal">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
