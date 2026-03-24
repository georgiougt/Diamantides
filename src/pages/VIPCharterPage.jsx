import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Users, Ruler, Send, Star, Phone, Mail, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { yachts } from '../data/yachts';
import '../styles/CharterYachts.css'; // Reusing the high-end styles
import vipVideo from '../assets/vip_hero.mp4';

const VIPCharterPage = () => {
    const charterYachts = yachts.filter(y => 
        (y.category === 'charter' || !y.category) && 
        y.name !== 'Private Yacht 110ft' && 
        y.name !== 'Azimut 27 Grande'
    );

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
            category: 'VIP Membership Request (Priority)'
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
            setSendError('Failed to send priority request. Please try again or call our VIP line.');
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Helper to calculate 20% off
    const getDiscountedPrice = (priceString) => {
        const basePrice = parseInt(priceString.replace(/[^\d]/g, '')) || 0;
        if (basePrice === 0) return priceString.split('/')[0];
        const discounted = basePrice * 0.8;
        return `€${discounted.toLocaleString()}`;
    };

    return (
        <main className="charter-page vip-page">
            {/* Immersive Hero Section */}
            <section className="charter-hero" style={{ backgroundImage: 'none', backgroundColor: '#000' }}>
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                >
                    <source src={vipVideo} type="video/mp4" />
                </video>
                <div className="charter-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3))', zIndex: 1 }}></div>
                <div className="charter-hero-content" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '1.5rem', background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        <Star size={48} fill="url(#metallic-gold-gradient)" />
                        <svg width="0" height="0">
                            <linearGradient id="metallic-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#E0B253" />
                                <stop offset="45%" stopColor="#F5E6AD" />
                                <stop offset="55%" stopColor="#F5E6AD" />
                                <stop offset="100%" stopColor="#B88A44" />
                            </linearGradient>
                        </svg>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 300, letterSpacing: '-1px' }}
                    >
                        Members Exclusive
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Welcome to the inner circle. As a valued Exclusive member, enjoy an exclusive 20% privilege reduction on our entire charter fleet.
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
                                    {/* Exclusive Badge */}
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--gradient-metallic-gold)', color: 'var(--color-primary)', padding: '6px 20px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Exclusive -20%
                                    </div>
                                </div>
                                <div className="charter-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <p className="fleet-type" style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '1px' }}>{yacht.type || 'Luxury Motor Yacht'}</p>
                                    </div>
                                    <div className="glass-specs">
                                        <span className="spec-item"><Ruler size={14} /> {yacht.length || 'N/A'}</span>
                                    </div>

                                    {(() => {
                                        if (yacht.detailedPricing) {
                                            return (
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                    {yacht.detailedPricing.halfDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Half Day</span>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{yacht.detailedPricing.halfDay}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{getDiscountedPrice(yacht.detailedPricing.halfDay.toString())}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.fullDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Full Day</span>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{yacht.detailedPricing.fullDay}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{getDiscountedPrice(yacht.detailedPricing.fullDay.toString())}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.weekly && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Weekly</span>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{yacht.detailedPricing.weekly}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{getDiscountedPrice(yacht.detailedPricing.weekly.toString())}</span>
                                                            </div>
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
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Charter Rate</span>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{yacht.price}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{getDiscountedPrice(yacht.price)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        const halfDayOriginal = `€${(basePrice * 0.9).toLocaleString()}`;
                                        const fullDayOriginal = yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
                                        const overnightOriginal = `€${(basePrice * 1.2).toLocaleString()}`;

                                        const halfDayVIP = `€${(basePrice * 0.9 * 0.8).toLocaleString()}`;
                                        const fullDayVIP = `€${(basePrice * 0.8).toLocaleString()}`;
                                        const overnightVIP = `€${(basePrice * 1.2 * 0.8).toLocaleString()}`;

                                        return (
                                            <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Half Day</span>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{halfDayOriginal}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{halfDayVIP}</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Full Day</span>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{fullDayOriginal}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{fullDayVIP}</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Overnight</span>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <span style={{ display: 'block', fontSize: '0.75rem', textDecoration: 'line-through', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '2px' }}>{overnightOriginal}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>{overnightVIP}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <span className="glass-cta" style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Secure Exclusive Charter</span>
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
                style={{ borderTop: '2px solid rgba(224, 178, 83, 0.4)' }}
            >
                <div className="cta-banner-content">
                    <div style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2rem' }}>
                        <Star size={48} fill="url(#metallic-gold-gradient)" />
                    </div>
                    <h2 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3.5rem', marginBottom: '1.5rem' }}>Your Dedicated VIP Concierge</h2>
                    <p>Contact your private charter specialist to orchestrate your bespoke Mediterranean voyage.</p>

                    <form className="charter-contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VIP Member Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Preferred Email"
                                required
                            />
                        </div>
                        <PhoneInput
                            country={'cy'}
                            value={formData.phone}
                            onChange={(phone) => setFormData({ ...formData, phone })}
                            enableSearch={true}
                            placeholder="Direct Phone Number"
                            containerClass="custom-phone-input"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Details of your requested voyage..."
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="btn-bespoke" disabled={sending}>
                            {sending ? 'Sending...' : 'Send Priority Request'} <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                        {sendSuccess && (
                            <div className="form-feedback success" style={{ marginTop: '1rem', color: '#E0B253' }}>
                                <CheckCircle size={16} style={{ marginRight: '8px' }} /> Success! A concierge will contact you within 24 hours.
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
                                <h3 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Call Directly</h3>
                                <a href="tel:+35796340400" style={{ fontSize: '1.2rem', fontWeight: 500 }}>+357 96 340 400</a>
                            </div>
                            <div className="charter-info-item">
                                <h3 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Email Us</h3>
                                <a href="mailto:Charters@diamantidesyachting.com" style={{ fontSize: '1.2rem', fontWeight: 500 }}>Charters@diamantidesyachting.com</a>
                            </div>
                        </div>

                        <div className="charter-whatsapp-container" style={{ borderColor: 'rgba(224, 178, 83, 0.3)', background: 'rgba(224, 178, 83, 0.03)' }}>
                            <MessageCircle size={24} color="#E0B253" />
                            <span style={{ fontSize: '1rem' }}>Whatsapp Text</span>
                            <a href="https://wa.me/35796340400" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem' }}>
                                +357 96 340 400
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>
        </main >
    );
};

export default VIPCharterPage;
