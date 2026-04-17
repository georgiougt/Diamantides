import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, UserCheck, Clock, CheckCircle, ArrowRight, Anchor, Camera, Warehouse } from 'lucide-react';
import '../styles/BoatParking.css';

const BoatParkingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            title: "Covered Hangars",
            description: "Maximum protection from UV rays, salt, and temperature fluctuations. Ideal for long-term preservation of your vessel's exterior and interior.",
            icon: <Warehouse size={32} />,
            image: "https://diamantidesyachting.com/wp-content/webp-express/webp-images/uploads/2023/10/COVER-SOLUTION-DEMO-13-600x450.jpg.webp"
        },
        {
            title: "Open-Air Guarded Storage",
            description: "Economical and secure solution in specially equipped zones. Features 24/7 video surveillance and protection from heavy winds.",
            icon: <Shield size={32} />,
            image: "https://diamantidesyachting.com/wp-content/webp-express/webp-images/uploads/2022/04/boat-parking-diam-4-600x450.jpg.webp"
        },
        {
            title: "Maintenance & Monitoring",
            description: "Regular technical inspections, hull washing, battery charging, and engine maintenance during the storage period.",
            icon: <Clock size={32} />,
            image: "https://diamantidesyachting.com/wp-content/webp-express/webp-images/uploads/2023/10/DSCF4588-600x450.jpg.webp"
        }
    ];

    const benefits = [
        {
            title: "Secured Facility",
            text: "24/7 physical security and high-definition video surveillance for total peace of mind.",
            icon: <Shield className="benefit-icon" />
        },
        {
            title: "Personal Manager",
            text: "A dedicated manager assigned to oversee your vessel's storage and maintenance routine.",
            icon: <UserCheck className="benefit-icon" />
        },
        {
            title: "Prime Location",
            text: "Strategically located near Cyprus's major marinas for quick launching and easy access.",
            icon: <MapPin className="benefit-icon" />
        }
    ];

    const includedServices = [
        "Specialized lifting & placement equipment",
        "Hull & bottom deformation protection",
        "Continuous condition monitoring",
        "Optional engine winterization",
        "Available electricity & water supply",
        "Regular ventilation of interiors"
    ];

    return (
        <div className="boat-parking-page">
            {/* SEO Structured Hero Section */}
            <section className="bp-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>
                            Boat Parking & Secure <br />
                            Yacht Storage in Cyprus
                        </h1>
                        <p className="hero-subtitle">
                            Protect your investment with professional mooring and maintenance services 
                            designed for the elite yachting community of Cyprus.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* Why Choose Us Section */}
            <section className="bp-benefits">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Boat Owners Trust <br />Diamantides Yachting</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <motion.div 
                                key={index} 
                                className="benefit-card glass-morphism"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="icon-wrapper">
                                    {benefit.icon}
                                </div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Storage Formats Section */}
            <section className="bp-services">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Professional Storage Options</h2>
                        <p>Flexible terms including daily, monthly, and seasonal packages.</p>
                    </div>
                    <div className="services-detailed-grid">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index} 
                                className="service-detail-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="card-image-box">
                                    <img src={service.image} alt={service.title} />
                                    <div className="image-overlay-gradient"></div>
                                    <div className="service-tag-icon">{service.icon}</div>
                                </div>
                                <div className="card-content-box">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="include-list">
                                        <li><CheckCircle size={16} /> Fully Insured Facility</li>
                                        <li><CheckCircle size={16} /> Technical Support Available</li>
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Included Services Section */}
            <section className="bp-included">
                <div className="container">
                    <div className="included-inner glass-morphism">
                        <div className="included-text">
                            <h2>All-Inclusive Care</h2>
                            <p>Our commitment to your vessel's longevity goes beyond just parking. We provide comprehensive care during the entire storage period.</p>
                            <div className="included-grid">
                                {includedServices.map((item, index) => (
                                    <div key={index} className="included-item">
                                        <CheckCircle className="check-icon" size={20} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="included-visual">
                            <img src="https://diamantidesyachting.com/wp-content/webp-express/webp-images/uploads/2023/10/IMG_1736-600x450.jpg.webp" alt="Boat Maintenance" />
                            <div className="visual-badge">
                                <Anchor size={30} />
                                <span>Expert Care</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section id="booking" className="bp-booking">
                <div className="container">
                    <div className="booking-wrapper">
                        <div className="booking-info">
                            <h2>Ready to Book?</h2>
                            <p>Contact us today for a personalized quote based on your vessel's dimensions and specific requirements.</p>
                            <div className="contact-quick">
                                <div className="quick-item">
                                    <Clock size={24} />
                                    <span>Response within 24 hours</span>
                                </div>
                                <div className="quick-item">
                                    <Camera size={24} />
                                    <span>Live Monitoring Access</span>
                                </div>
                            </div>
                        </div>
                        <div className="booking-form-box glass-morphism">
                            <form className="bp-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Vessel Type & Dimensions</label>
                                    <input type="text" placeholder="e.g. Azimut 60' / 18m" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="john@example.com" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" placeholder="+357 00 000 000" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Duration & Requirements</label>
                                    <textarea rows="4" placeholder="How long do you need storage for? (Daily/Seasonal)"></textarea>
                                </div>
                                <button type="submit" className="submit-btn highlight-btn">
                                    Request Personalized Quote <ArrowRight size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BoatParkingPage;
