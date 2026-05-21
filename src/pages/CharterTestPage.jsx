import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Send, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { yachts } from '../data/yachts';
import '../styles/CharterTest.css';

const CharterTestPage = () => {
    const topoRef = useRef(null);
    const charterYachts = yachts
        .filter(y => y.category === 'charter' || !y.category)
        .sort((a, b) => {
            const order = [1, 2, 13, 3, 6, 22, 4, 5, 23, 14, 15, 8, 7, 9, 11, 10, 12, 24];
            return order.indexOf(a.id) - order.indexOf(b.id);
        });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [sendSuccess, setSendSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSendError(null);
        setSendSuccess(false);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            category: 'Charter Inquiry (Premium Design Test)'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            setSendSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError('Failed to send inquiry. Please try again or call us directly.');
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (topoRef.current) {
                const x = (e.clientX / window.innerWidth) * 20;
                const y = (e.clientY / window.innerHeight) * 20;
                topoRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        const handleScroll = () => {
            const cards = document.querySelectorAll('.vessel-card-test');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const speed = 0.05;
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const img = card.querySelector('.vessel-img-test');
                    if (img) {
                        const yPos = -(rect.top * speed);
                        img.style.transform = `scale(1.1) translateY(${yPos}px)`;
                    }
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="charter-test-body">
            <svg ref={topoRef} className="topo-bg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,200 C200,150 300,300 500,250 S800,100 1000,150" />
                <path d="M0,400 C150,350 250,550 450,450 S750,300 1000,350" />
                <path d="M0,600 C250,550 350,750 550,650 S850,500 1000,550" />
                <path d="M0,800 C100,750 200,950 400,850 S700,700 1000,750" />
            </svg>

            <div className="charter-test-container">
                <header className="charter-test-header">
                    <div>
                        <span className="inventory-count-mono">COLLECTION // 2026</span>
                        <h1 className="brand-title-gold">Diamantides</h1>
                    </div>
                    <div className="header-subtitle-container">
                        <p className="header-subtitle-text">CURATED MARITIME ASSETS</p>
                    </div>
                </header>

                <main className="vessel-grid-test">
                    {charterYachts.map((yacht, index) => (
                        <Link 
                            key={yacht.id} 
                            to={`/yacht/${yacht.id}`}
                            className="vessel-card-test"
                            style={{ animationDelay: `${0.1 + (index % 3) * 0.2}s` }}
                        >
                            <div className="image-wrapper-test">
                                <div className="topography-overlay-test"></div>
                                <div className="price-tag-test">{yacht.price || 'POA'}</div>
                                <img 
                                    src={yacht.image} 
                                    alt={yacht.name} 
                                    className="vessel-img-test" 
                                />
                            </div>
                            <div className="vessel-info-test">
                                <div className="vessel-meta-mono">
                                    {yacht.specs?.builder || 'Luxury Charter'} // {yacht.type}
                                </div>
                                <h2 className="vessel-name-cinzel">{yacht.name}</h2>
                                {(() => {
                                    let prices = [];
                                    if (yacht.detailedPricing) {
                                        if (yacht.detailedPricing.twoHours) prices.push({ label: '2 Hours', value: yacht.detailedPricing.twoHours });
                                        if (yacht.detailedPricing.threeHours) prices.push({ label: '3 Hours', value: yacht.detailedPricing.threeHours });
                                        if (yacht.detailedPricing.fourHours) prices.push({ label: '4 Hours', value: yacht.detailedPricing.fourHours });
                                        if (yacht.detailedPricing.halfDay) prices.push({ label: 'Half Day', value: yacht.detailedPricing.halfDay });
                                        if (yacht.detailedPricing.fullDay) prices.push({ label: 'Full Day', value: yacht.detailedPricing.fullDay });
                                        if (yacht.detailedPricing.overnight) prices.push({ label: 'Overnight', value: yacht.detailedPricing.overnight });
                                        if (yacht.detailedPricing.weekly) prices.push({ label: 'Weekly', value: yacht.detailedPricing.weekly });
                                    } else if (yacht.price) {
                                        const basePrice = parseInt(yacht.price.replace(/[^\d]/g, '')) || 0;
                                        if (basePrice === 0 || yacht.price.toLowerCase().includes('request')) {
                                            prices.push({ label: 'Rate', value: yacht.price });
                                        } else {
                                            prices.push({ label: 'Half Day', value: `€${(basePrice * 0.9).toLocaleString()}` });
                                            prices.push({ label: 'Full Day', value: yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}` });
                                            prices.push({ label: 'Overnight', value: `€${(basePrice * 1.2).toLocaleString()}` });
                                        }
                                    }

                                    return (
                                        <div className="vessel-specs-test">
                                            <div className="spec-item-test"><b>{yacht.length}</b>Length</div>
                                            {prices.map((p, i) => (
                                                <div key={i} className="spec-item-test"><b>{p.value}</b>{p.label}</div>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </div>
                        </Link>
                    ))}
                </main>

                <section className="charter-cta-premium">
                    <div className="cta-premium-content">
                        <Anchor className="cta-premium-icon" size={32} />
                        <h2 className="premium-form-title">CURATE YOUR NEXT VOYAGE</h2>
                        <p className="premium-form-subtitle">Consult with our maritime experts for bespoke itineraries across the Mediterranean.</p>

                        <form className="charter-premium-form" onSubmit={handleSubmit}>
                            <div className="premium-form-row">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                />
                            </div>
                            <div className="premium-form-row">
                                <PhoneInput
                                    country={'cy'}
                                    value={formData.phone}
                                    onChange={(phone) => setFormData({ ...formData, phone })}
                                    enableSearch={true}
                                    placeholder="Phone Number"
                                    containerClass="premium-phone-container"
                                    inputClass="premium-phone-input"
                                />
                            </div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Describe your ideal charter experience..."
                                rows="4"
                                required
                            ></textarea>
                            <button type="submit" className="btn-premium-send" disabled={sending}>
                                {sending ? 'SENDING...' : 'DISPATCH INQUIRY'} <Send size={16} />
                            </button>
                            {sendSuccess && (
                                <div className="premium-feedback success">
                                    <CheckCircle size={16} /> Our specialists will contact you shortly.
                                </div>
                            )}
                            {sendError && (
                                <div className="premium-feedback error">
                                    <AlertCircle size={16} /> {sendError}
                                </div>
                            )}
                        </form>

                        <div className="premium-contact-footer">
                            <div className="direct-links">
                                <a href="tel:+35725010561" className="premium-link-item">CALL DIRECTLY</a>
                                <span className="premium-divider"></span>
                                <a href="mailto:charter@diamantidesyachting.com" className="premium-link-item">EMAIL SPECIALIST</a>
                            </div>
                            <a href="https://wa.me/35796340400" target="_blank" rel="noopener noreferrer" className="premium-whatsapp">
                                <MessageCircle size={16} />
                                <span>WHATSAPP // +357 96 340 400</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CharterTestPage;
