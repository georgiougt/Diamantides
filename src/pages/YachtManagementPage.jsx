import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { updateSEO } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/YachtManagement.css';

// Import local images scraped from legacy site
import slider1 from '../assets/services/management-slider-new-1-475x600.jpg';
import slider2 from '../assets/services/management-slider-new-2-475x600.jpg';
import slider3 from '../assets/services/management-slider-new-3-475x600.jpg';
import slider4 from '../assets/services/management-slider-new-4-475x600.jpg';
import slider5 from '../assets/services/management-slider-new-5-475x600.jpg';
import slider6 from '../assets/services/management-slider-new-6-475x600.jpg';
import slider7 from '../assets/services/management-slider-new-7-475x600.jpg';
import slider8 from '../assets/services/management-slider-new-8-475x600.jpg';

const galleryImages = [
    slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8
];

const YachtManagementPage = () => {
    const { t, localizePath, currentLang } = useLanguage();
    const [expandedPillar, setExpandedPillar] = useState(null);

    const togglePillar = (index) => {
        setExpandedPillar(expandedPillar === index ? null : index);
    };

    const pillars = [
        { title: t('yachtMgmt.pillar1Title'), description: t('yachtMgmt.pillar1Desc') },
        { title: t('yachtMgmt.pillar2Title'), description: t('yachtMgmt.pillar2Desc') },
        { title: t('yachtMgmt.pillar3Title'), description: t('yachtMgmt.pillar3Desc') },
        { title: t('yachtMgmt.pillar4Title'), description: t('yachtMgmt.pillar4Desc') },
        { title: t('yachtMgmt.pillar5Title'), description: t('yachtMgmt.pillar5Desc') }
    ];

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Управление Яхтами на Кипре | Diamantides Yachting', 'Комплексное управление яхтами, техническое обслуживание, подбор экипажа и административная поддержка для владельцев яхт на Кипре.');
        } else {
            updateSEO('Exclusive Yacht Management Cyprus | Diamantides Yachting', 'Bespoke yacht management, standard maintenance, professional crewing, technical servicing, and administrative support for yacht owners in Cyprus.');
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    return (
        <div className="yacht-management-page">
            {/* Hero Section */}
            <section className="ym-hero">
                <h1>{t('yachtMgmt.heroTitle')}</h1>
                <p>{t('yachtMgmt.heroSubtitle')}</p>
            </section>

            {/* Introduction Container */}
            <div className="container">
                <div className="ym-intro-content glass-morphism">
                    <p dangerouslySetInnerHTML={{ __html: t('yachtMgmt.introText') }} />
                </div>
            </div>

            {/* Core Pillars */}
            <section className="ym-section">
                <div className="container">
                    <div className="ym-section-header">
                        <h2>{t('yachtMgmt.pillarsTitle')}</h2>
                        <p>{t('yachtMgmt.pillarsSubtitle')}</p>
                    </div>
                    
                    <div className="ym-accordion-list">
                        {pillars.map((pillar, index) => (
                            <div 
                                key={index} 
                                className={`ym-accordion-item glass-morphism ${expandedPillar === index ? 'expanded' : ''}`}
                                onClick={() => togglePillar(index)}
                            >
                                <div className="ym-accordion-header">
                                    <h3>{pillar.title}</h3>
                                    <div className="ym-accordion-icon">
                                        <ChevronDown size={24} className={expandedPillar === index ? 'rotate' : ''} />
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {expandedPillar === index && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="ym-accordion-content"
                                        >
                                            <p>{pillar.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split Information Section */}
            <section className="ym-section" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <div className="ym-info-grid">
                        {/* Who is this for */}
                        <div className="ym-list-block glass-morphism">
                            <h3>{t('yachtMgmt.whoTitle')}</h3>
                            <p style={{ color: '#aaa', marginBottom: '20px' }}>{t('yachtMgmt.whoSubtitle')}</p>
                            <ul className="ym-styled-list">
                                <li>
                                    <span>{t('yachtMgmt.whoPrivate')}</span>
                                    {t('yachtMgmt.whoPrivateDesc')}
                                </li>
                                <li>
                                    <span>{t('yachtMgmt.whoInvestors')}</span>
                                    {t('yachtMgmt.whoInvestorsDesc')}
                                </li>
                                <li>
                                    <span>{t('yachtMgmt.whoCharter')}</span>
                                    {t('yachtMgmt.whoCharterDesc')}
                                </li>
                            </ul>
                        </div>

                        {/* Why Choose Us */}
                        <div className="ym-list-block glass-morphism">
                            <h3>{t('yachtMgmt.whyTitle')}</h3>
                            <p style={{ color: '#aaa', marginBottom: '20px' }}>{t('yachtMgmt.whySubtitle')}</p>
                            <ul className="ym-styled-list">
                                <li>
                                    <span>{t('yachtMgmt.why1Title')}</span>
                                    {t('yachtMgmt.why1Desc')}
                                </li>
                                <li>
                                    <span>{t('yachtMgmt.why2Title')}</span>
                                    {t('yachtMgmt.why2Desc')}
                                </li>
                                <li>
                                    <span>{t('yachtMgmt.why3Title')}</span>
                                    {t('yachtMgmt.why3Desc')}
                                </li>
                                <li>
                                    <span>{t('yachtMgmt.why4Title')}</span>
                                    {t('yachtMgmt.why4Desc')}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="ym-section">
                <div className="container">
                    <div className="ym-section-header">
                        <h2>{t('yachtMgmt.galleryTitle')}</h2>
                        <p>{t('yachtMgmt.gallerySubtitle')}</p>
                    </div>
                    
                    <div className="ym-gallery-grid">
                        {galleryImages.map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`Yacht Management ${index + 1}`} 
                                className="ym-gallery-img"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Information Required */}
            <section className="ym-section" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <div className="ym-section-header">
                        <h2>{t('yachtMgmt.startTitle')}</h2>
                        <p>{t('yachtMgmt.startSubtitle')}</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ym-cta-section">
                <div className="container ym-cta-content">
                    <h2>{t('yachtMgmt.ctaTitle')}</h2>
                    <p>{t('yachtMgmt.ctaDesc')}</p>
                    <Link to={localizePath('/contact')} className="ym-cta-button">{t('yachtMgmt.ctaBtn')}</Link>
                </div>
            </section>

        </div>
    );
};

export default YachtManagementPage;
