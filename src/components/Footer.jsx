import { Anchor, Instagram, Facebook, Linkedin } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-brand">
                    <a href="#" className="footer-logo">
                        <Anchor className="footer-logo-icon" size={32} />
                        <span className="footer-logo-text">Diamantides Yachting</span>
                    </a>
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
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#fleet">Fleet</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#">Yacht Charter</a></li>
                        <li><a href="#">Yacht Sales</a></li>
                        <li><a href="#">Management</a></li>
                        <li><a href="#">Training</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Diamantides Yachting. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
