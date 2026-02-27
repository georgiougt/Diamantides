import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Users, Ruler, Send, Star } from 'lucide-react';
import { yachts } from '../data/yachts';
import '../styles/CharterYachts.css'; // Reusing the high-end styles

const VIPCharterPage = () => {
    const charterYachts = yachts.filter(y => y.category === 'charter' || !y.category);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your VIP charter inquiry. Our executive team will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
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
            <section className="charter-hero">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}
                >
                    <source src="https://videos.pexels.com/video-files/30346376/13007434_1920_1080_60fps.mp4" type="video/mp4" />
                </video>
                <div className="charter-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3))', zIndex: -1 }}></div>
                <div className="charter-hero-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}
                    >
                        <Star size={48} fill="currentColor" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        style={{ color: 'var(--color-secondary)' }}
                    >
                        VIP Members Exclusive
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Welcome to the inner circle. As a valued VIP member, enjoy an exclusive 20% privilege reduction on our entire charter fleet.
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
                                    {/* VIP Badge */}
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--color-secondary)', color: 'var(--color-primary)', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                                        VIP -20%
                                    </div>
                                </div>
                                <div className="charter-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ display: 'block', fontSize: '0.9rem', textDecoration: 'line-through', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                                                {yacht.price.split('/')[0]}
                                            </span>
                                            <span className="glass-price" style={{ color: 'var(--color-secondary)' }}>
                                                {getDiscountedPrice(yacht.price)} <small style={{ color: 'rgba(255,255,255,0.7)' }}>/ day</small>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="glass-specs">
                                        {yacht.length && (
                                            <span className="spec-item"><Ruler size={14} /> {yacht.length}</span>
                                        )}
                                        {yacht.capacity && (
                                            <span className="spec-item"><Users size={14} /> {yacht.capacity}</span>
                                        )}
                                        {yacht.specs?.cabins && (
                                            <span className="spec-item"><span className="dot">•</span> {yacht.specs.cabins.split('(')[0].trim()} Cabins</span>
                                        )}
                                    </div>
                                    <span className="glass-cta" style={{ color: 'var(--color-secondary)' }}>Secure VIP Charter</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Immersive Bespoke Contact Form Banner */}
            <motion.section
                className="charter-cta-banner"
                style={{ borderTop: '2px solid var(--color-secondary)' }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="cta-banner-content">
                    <Star className="cta-icon" size={32} color="var(--color-secondary)" fill="var(--color-secondary)" />
                    <h2 style={{ color: 'var(--color-secondary)' }}>Your Dedicated VIP Concierge</h2>
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
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Direct Phone Number"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Details of your requested voyage..."
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="btn-bespoke" style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                            Send Priority Request <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>
            </motion.section>
        </main>
    );
};

export default VIPCharterPage;
