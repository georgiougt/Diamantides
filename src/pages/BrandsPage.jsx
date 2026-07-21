import { updateSEO } from '../utils/seo';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, ChevronRight } from 'lucide-react';
import { yachts } from '../data/yachts';
import { getYachtPath } from '../utils/navigation';
import { useLanguage } from '../context/LanguageContext';
import '../styles/BrandsPage.css';
import '../styles/SalesYachts.css'; 
import axisLogo from '../assets/logos/2021_Black_Axis.png';
import malibuLogo from '../assets/logos/2021_Color_White_Text.png';
import viperLogo from '../assets/logos/VIPER-LOGO.png';
import galeonLogo from '../assets/logos/galeon_logo.png';
import agilisLogo from '../assets/logos/agilis_logo.webp';

const BrandsPage = () => {
    const { t, localizePath, currentLang } = useLanguage();
    const [selectedBrand, setSelectedBrand] = useState('All');
    
    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Официальный Дилер Яхтенных Брендов на Кипре | Diamantides Yachting', 'Откройте наши эксклюзивные бренды-партнёры. Официальный дилер на Кипре премиальных производителей яхт, включая Viper, Axis, Marinello и Galeon.');
        } else {
            updateSEO('Official Yacht Brands Dealer Cyprus | Diamantides Yachting', 'Discover our exclusive partner brands. Official dealer in Cyprus for premium yacht builders including Viper, Axis, Marinello, and Galeon.');
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    const partners = [
        { id: 'Axis', name: 'Axis', logo: axisLogo },
        { id: 'Malibu', name: 'Malibu', logo: malibuLogo },
        { id: 'Viper', name: 'Viper', logo: viperLogo },
        { id: 'Galeon', name: 'Galeon', logo: galeonLogo },
        { id: 'Agilis', name: 'Agilis', logo: agilisLogo }
    ];

    const filteredVessels = yachts.filter(y => 
        y.category === 'sales' && 
        y.condition === 'new' && 
        (selectedBrand === 'All' 
            ? partners.some(p => p.id.toLowerCase() === y.specs?.builder?.toLowerCase())
            : y.specs?.builder?.toLowerCase() === selectedBrand.toLowerCase())
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
                        {t('brandsPage.title')}
                    </motion.h1>
                    <motion.p 
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('brandsPage.subtitle')}
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
                            <span>{t('brandsPage.allBrands')}</span>
                        </button>
                        {partners.map((brand) => (
                            <button 
                                key={brand.id}
                                className={`brand-filter-item ${selectedBrand === brand.id ? 'active' : ''}`}
                                onClick={() => setSelectedBrand(brand.id)}
                            >
                                <img src={brand.logo} alt={brand.name} className={`filter-logo ${brand.id.toLowerCase()}-logo`} />
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
                                    <Link to={localizePath(getYachtPath(vessel))} className="sales-card-link">
                                        <div className="sales-img-wrapper">
                                            <img src={vessel.image} alt={vessel.name} loading="lazy" />
                                            {vessel.price && <div className="image-price-badge">{vessel.price}</div>}
                                        </div>
                                        <div className="sales-glass-panel">
                                            <div className="glass-header">
                                                <h2>{vessel.name}</h2>
                                                <p className="fleet-type">{vessel.type || t('brandsPage.luxuryBrand')}</p>
                                            </div>
                                            <div className="glass-specs">
                                                <span className="spec-item"><Ruler size={14} /> {vessel.length || 'N/A'}</span>
                                            </div>
                                            <span className="glass-cta">{t('brandsPage.exploreCta')} <ChevronRight size={16} /></span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {filteredVessels.length === 0 && (
                        <div className="no-results">
                            <p>{t('brandsPage.noResults')}</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BrandsPage;
