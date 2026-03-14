import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Ruler, Send } from 'lucide-react';
import { yachts } from '../data/yachts';
import '../styles/SalesYachts.css';

const SalesYachtsPage = () => {
    // Filter out only yachts meant for sales
    const salesYachts = yachts.filter(y => y.category === 'sales').sort((a, b) => b.id - a.id);

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
        alert('Thank you for your inquiry. Our sales specialists will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="sales-page">
            {/* Immersive Hero Section */}
            <section className="sales-hero">
                <div className="sales-hero-overlay"></div>
                <div className="sales-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Exclusive Sales Fleet
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Own a piece of the horizon. Our curated selection of pre-owned and new vessels represents the pinnacle of maritime luxury and engineering excellence.
                    </motion.p>
                </div>
            </section>

            {/* Asymmetrical Masonry Grid */}
            <section className="sales-fleet-section">
                <div className="sales-grid">
                    {salesYachts.map((yacht, index) => (
                        <motion.div
                            key={yacht.id}
                            className={`sales-card ${index === 0 ? 'large-card' : 'standard-card'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/yacht/${yacht.id}`} className="sales-card-link">
                                <div className="sales-img-wrapper">
                                    <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} />
                                </div>
                                <div className="sales-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <p className="fleet-type" style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{yacht.type || 'Luxury Yacht'}</p>
                                    </div>
                                    <div className="glass-specs">
                                        <span className="spec-item"><Ruler size={14} /> {yacht.length || 'N/A'}</span>
                                    </div>

                                    {yacht.price && (
                                        <div className="sales-pricing-row">
                                            <span className="asking-label">Asking Price</span>
                                            <span className="asking-price">{yacht.price}</span>
                                        </div>
                                    )}

                                    <span className="glass-cta">View Details</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Immersive Bespoke Contact Form Banner */}
            <motion.section
                className="sales-cta-banner"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="cta-banner-content">
                    <Anchor className="cta-icon" size={32} />
                    <h2>Ready to Take the Helm?</h2>
                    <p>Contact our brokerage specialists to schedule a viewing or request exclusive details on our vessels for sale.</p>

                    <form className="sales-contact-form" onSubmit={handleSubmit}>
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
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number (Optional)"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about the yacht you're interested in..."
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="btn-bespoke">
                            Send Inquiry <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>
            </motion.section>
        </main>
    );
};

export default SalesYachtsPage;
