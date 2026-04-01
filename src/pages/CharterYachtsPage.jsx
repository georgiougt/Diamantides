import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Users, Ruler, Send, Phone, Mail, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { yachts } from '../data/yachts';
import '../styles/CharterYachts.css';

const CharterYachtsPage = () => {
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
            category: 'Charter Inquiry (General)'
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

    return (
        <main className="charter-page">
            {/* Immersive Hero Section */}
            <section className="charter-hero">
                <div className="charter-hero-overlay"></div>
                <div className="charter-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Bespoke Charter Experiences
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Discover the ultimate freedom on the open water. Our meticulously curated fleet of luxury charter vessels offers unparalleled comfort, impeccable service, and unforgettable destinations.
                    </motion.p>
                </div>
            </section>

            {/* Asymmetrical Masonry Grid */}
            <section className="charter-fleet-section">
                <div className="charter-grid">
                    {charterYachts.map((yacht, index) => (
                        <motion.div
                            key={yacht.id}
                            className={`charter-card ${index % 3 === 0 ? 'large-card' : 'standard-card'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/yacht/${yacht.id}`} className="charter-card-link">
                                <div className="charter-img-wrapper">
                                    <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} />
                                </div>
                                <div className="charter-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <p className="fleet-type" style={{ margin: 0, fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{yacht.type || 'Luxury Motor Yacht'}</p>
                                    </div>
                                    <div className="glass-specs">
                                        <span className="spec-item"><Ruler size={14} /> {yacht.length || 'N/A'}</span>
                                    </div>

                                    {(() => {
                                        if (yacht.detailedPricing) {
                                            return (
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                    {yacht.detailedPricing.twoHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>2 Hours</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.twoHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.threeHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>3 Hours</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.threeHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.fourHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>4 Hours</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.fourHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.halfDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Half Day</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.halfDay}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.fullDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Full Day</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.fullDay}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.overnight && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Overnight</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.overnight}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.weekly && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Weekly</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.weekly}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }

                                        if (!yacht.price) return null;

                                        const basePrice = parseInt(yacht.price.replace(/[^\d]/g, '')) || 0;

                                        if (basePrice === 0 || yacht.price.toLowerCase().includes('request')) {
                                            return (
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Charter Rate</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.price}</span>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        const halfDayPrice = `€${(basePrice * 0.9).toLocaleString()}`;
                                        const fullDayPrice = yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
                                        const overnightPrice = `€${(basePrice * 1.2).toLocaleString()}`;

                                        return (
                                            <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Half Day</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{halfDayPrice}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Full Day</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{fullDayPrice}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Overnight</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{overnightPrice}</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <span className="glass-cta">View Details</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Immersive Bespoke Contact Form Banner */}
            <motion.section
                className="charter-cta-banner"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="cta-banner-content">
                    <Anchor className="cta-icon" size={32} />
                    <h2>A Canvas for Your Imagination</h2>
                    <p>Contact our charter specialists to design a bespoke itinerary tailored perfectly to your desires across the Mediterranean.</p>

                    <form className="charter-contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
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
                        <PhoneInput
                            country={'cy'}
                            value={formData.phone}
                            onChange={(phone) => setFormData({ ...formData, phone })}
                            enableSearch={true}
                            placeholder="Phone Number (Optional)"
                            containerClass="custom-phone-input"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your bespoke voyage..."
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="btn-bespoke" disabled={sending}>
                            {sending ? 'Sending...' : 'Send Inquiry'} <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                        {sendSuccess && (
                            <div className="form-feedback success" style={{ marginTop: '1rem', color: '#E0B253' }}>
                                <CheckCircle size={16} style={{ marginRight: '8px' }} /> Thank you! Our specialists will contact you shortly.
                            </div>
                        )}
                        {sendError && (
                            <div className="form-feedback error" style={{ marginTop: '1rem', color: '#ff4444' }}>
                                <AlertCircle size={16} style={{ marginRight: '8px' }} /> {sendError}
                            </div>
                        )}
                    </form>

                    <div className="charter-contact-info">
                        <div className="charter-contact-grid">
                            <div className="charter-info-item">
                                <h3>Call Directly</h3>
                                <a href="tel:+35725010561">+357 25 010 561</a>
                            </div>
                            <div className="charter-info-item">
                                <h3>Email Us</h3>
                                <a href="mailto:Charters@diamantidesyachting.com">Charters@diamantidesyachting.com</a>
                            </div>
                        </div>

                        <div className="charter-whatsapp-container">
                            <MessageCircle size={20} color="#E0B253" />
                            <span>Whatsapp Text</span>
                            <a href="https://wa.me/35796340400" target="_blank" rel="noopener noreferrer">
                                +357 96 340 400
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>
        </main>
    );
};

export default CharterYachtsPage;
