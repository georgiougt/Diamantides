import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronRight } from 'lucide-react';
import { yachts } from '../data/yachts';
import '../styles/BrandsPage.css';
import '../styles/SalesYachts.css'; 
import axisLogo from '../assets/logos/2021_Black_Axis.png';
import malibuLogo from '../assets/logos/2021_Color_White_Text.png';
import viperLogo from '../assets/logos/VIPER-LOGO.png';

const BrandsPage = () => {
    const [selectedBrand, setSelectedBrand] = useState('All');
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const partners = [
        { id: 'Axis', name: 'Axis', logo: axisLogo },
        { id: 'Malibu', name: 'Malibu', logo: malibuLogo },
        { id: 'Viper', name: 'Viper', logo: viperLogo }
    ];

    const filteredVessels = yachts.filter(y => 
        y.category === 'sales' && 
        y.condition === 'new' && 
        (selectedBrand === 'All' || y.specs?.builder?.toLowerCase() === selectedBrand.toLowerCase())
    );

    return (
        <main className="brands-page">
            {/* Premium Hero Section */}
            <section className="brands-hero">
                <div className="brands-hero-overlay"></div>
                <div className="container">
                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Exclusive New Brands
                    </motion.h1>
                    <motion.p 
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Discover the latest marine engineering excellence from the world's leading manufacturers.
                    </motion.p>
                </div>
            </section>

            {/* Brand Selection Bar */}
            <section className="brand-selector-section">
                <div className="container">
                    <div className="brand-filter-grid">
                        <button 
                            className={`brand-filter-item ${selectedBrand === 'All' ? 'active' : ''}`}
                            onClick={() => setSelectedBrand('All')}
                        >
                            <span>All Brands</span>
                        </button>
                        {partners.map((brand) => (
                            <button 
                                key={brand.id}
                                className={`brand-filter-item ${selectedBrand === brand.id ? 'active' : ''}`}
                                onClick={() => setSelectedBrand(brand.id)}
                            >
                                <img src={brand.logo} alt={brand.name} className="filter-logo" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet Grid */}
            <section className="brands-fleet-section">
                <div className="container">
                    <div className="sales-grid">
                        <AnimatePresence mode="popLayout">
                            {filteredVessels.map((vessel, index) => (
                                <motion.div
                                    key={vessel.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
                                    className="sales-card standard-card"
                                >
                                    <Link to={`/yacht/${vessel.id}`} className="sales-card-link">
                                        <div className="sales-img-wrapper">
                                            <img src={vessel.image} alt={vessel.name} loading="lazy" />
                                            {vessel.price && <div className="image-price-badge">{vessel.price}</div>}
                                        </div>
                                        <div className="sales-glass-panel">
                                            <div className="glass-header">
                                                <h2>{vessel.name}</h2>
                                                <p className="fleet-type">{vessel.type || 'Luxury Brand'}</p>
                                            </div>
                                            <div className="glass-specs">
                                                <span className="spec-item"><Ruler size={14} /> {vessel.length || 'N/A'}</span>
                                            </div>
                                            <span className="glass-cta">Explore Brand New <ChevronRight size={16} /></span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {filteredVessels.length === 0 && (
                        <div className="no-results">
                            <p>No new vessels currently available for this brand. Please contact us for custom orders.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BrandsPage;
