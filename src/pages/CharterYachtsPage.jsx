import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Users, Ruler, Send } from 'lucide-react';
import { yachts } from '../data/yachts';
import '../styles/CharterYachts.css';

const CharterYachtsPage = () => {
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
        alert('Thank you for your charter inquiry. Our specialists will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
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
                                        <span className="glass-price">{yacht.price.split('/')[0]} <small>/ day</small></span>
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
                            placeholder="Tell us about your bespoke voyage..."
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

export default CharterYachtsPage;
