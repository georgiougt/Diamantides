import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, Users, Heart } from 'lucide-react';
import '../styles/About.css';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const milestones = [
        {
            year: "2002",
            title: "Founding",
            content: "Antonis and Marios Diamantides founded the company with a focus on quality management and premium marine services in Cyprus."
        },
        {
            year: "2009",
            title: "Global Expansion",
            content: "The company expanded its reach into global yacht brokerage, establishing partnerships across 6+ international markets."
        },
        {
            year: "2015",
            title: "New Generation",
            content: "Demetris Diamantides joined the leadership, bringing a fresh outlook and introducing theoretical and practical operator's license lessons."
        },
        {
            year: "Today",
            title: "Leading the Industry",
            content: "Operating from 3 major locations in Limassol with a massive 17,000 sq/m boatyard, serving 250+ elite clients."
        }
    ];

    const values = [
        {
            icon: <Shield size={32} />,
            title: "Integrity",
            desc: "Unwavering commitment to moral principles and professional standards."
        },
        {
            icon: <Target size={32} />,
            title: "Accountability",
            desc: "Taking ownership of our actions and delivering on every promise."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Evolution",
            desc: "Continuously learning and evolving with the yachting industry."
        },
        {
            icon: <Heart size={32} />,
            title: "Respect",
            desc: "Building lasting relationships through mutual respect and support."
        },
        {
            icon: <Users size={32} />,
            title: "Transparency",
            desc: "Ensuring clarity and honesty in every client interaction."
        }
    ];

    const stats = [
        { label: "Years Experience", value: "22+" },
        { label: "Global Markets", value: "6+" },
        { label: "Elite Clients", value: "250+" },
        { label: "Vessel Specialists", value: "15+" }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <span className="hero-tag">Since 2002</span>
                        <h1>
                            <span className="text-highlight">Crafting Unforgettable Journeys at Sea.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* History Section */}
            <section className="about-history">
                <div className="container">
                    <div className="history-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="history-image"
                        >
                            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop" alt="Founders Story" />
                        </motion.div>
                        <div className="history-text">
                            <h2>Our Story</h2>
                            <p>
                                What began as a passionate family endeavor in 2002 has evolved into
                                one of the Mediterranean's most respected yachting organizations.
                                Founded by Antonis and Marios Diamantides, our company was built
                                on the belief that luxury seafaring should be a seamless,
                                personalized experience.
                            </p>
                            <p>
                                For over two decades, we have balanced tradition with innovation,
                                treating every vessel under our care with the same precision and
                                respect as if it were our own.
                            </p>

                            <div className="timeline-section">
                                {milestones.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="timeline-item"
                                    >
                                        <span className="timeline-year">{item.year}</span>
                                        <div className="timeline-content">
                                            <strong>{item.title}</strong> — {item.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="stat-item"
                            >
                                <h4>{stat.value}</h4>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="about-values">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Mission & Core Values</h2>
                        <p className="subtitle">Driven by Passion, Guided by Principles.</p>
                    </div>
                    <div className="values-grid">
                        {values.map((v, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="value-card"
                            >
                                <div className="value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-team">
                <div className="container">
                    <div className="section-header">
                        <h2>Leadership Team</h2>
                    </div>
                    <div className="team-grid">
                        <div className="team-card">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="Antonis Diamantides" />
                            <div className="team-info">
                                <h3>Antonis Diamantides</h3>
                                <span>Co-Founder</span>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" alt="Marios Diamantides" />
                            <div className="team-info">
                                <h3>Marios Diamantides</h3>
                                <span>Co-Founder & Captain</span>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" alt="Demetris Diamantides" />
                            <div className="team-info">
                                <h3>Demetris Diamantides</h3>
                                <span>Marketing & Sales Director</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="about-partners">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Strategic Partners</h2>
                    </div>
                    <div className="partners-logos">
                        {/* Placeholder logos - would normally use actual brand SVGs */}
                        <div className="partner-item">Malibu Boats</div>
                        <div className="partner-item">Viper RIBs</div>
                        <div className="partner-item">Nautic Clean</div>
                        <div className="partner-item">Mercury Marine</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
