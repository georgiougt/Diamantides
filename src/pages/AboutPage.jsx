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
            title: "Pioneering Services",
            content: "Introduced the first one-stop comprehensive yacht and boat service with a privately operated yard in Cyprus."
        },
        {
            year: "2008",
            title: "Global Expansion",
            content: "Expanded our operations globally, bringing the Diamantides standard of excellence to international markets."
        },
        {
            year: "2017",
            title: "Viper RIB Dealership",
            content: "Acquired the exclusive dealership for Viper RIB boats, marking a significant milestone in our brand portfolio."
        },
        {
            year: "2018",
            title: "Nautic Clean Partnership",
            content: "Became the exclusive dealer for Nautic Clean products, elevating our yacht care and maintenance standards."
        },
        {
            year: "2020",
            title: "Limassol Expansion",
            content: "Successfully expanded to 3 key locations across Limassol to provide unparalleled service to our local clients."
        },
        {
            year: "2021",
            title: "Malibu & Axis Growth",
            content: "Became authorized resellers of world-leading Malibu and Axis boats, strengthening our market position."
        },

        {
            year: "2025",
            title: "Future Horizons",
            content: "Official dealers of Galeon Yachts and exclusive dealers of Agilis Jet Tenders & Redshark Bikes. Introducing the first luxury sea taxi service in Limassol."
        },
        {
            year: "Today",
            title: "Continuous Presence",
            content: "Maintaining a continuous presence in all major yachting events worldwide, staying at the forefront of the industry."
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
                <div className="scroll-indicator">
                    <div className="mouse"></div>
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
                        <div className="partner-item">Galeon Yachts</div>
                        <div className="partner-item">Agilis Jet Tenders</div>
                        <div className="partner-item">Nautic Clean</div>
                        <div className="partner-item">Mercury Marine</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
