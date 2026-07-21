import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Ruler, Gauge, ArrowRight } from 'lucide-react';
import { yachts } from '../data/yachts';
import { getYachtPath } from '../utils/navigation';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Fleet.css';

const Fleet = () => {
    const { t, localizePath } = useLanguage();
    const INITIAL_VISIBLE_COUNT = 8;
    const [activeFilter, setActiveFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    // Reset visible count when filter changes
    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    }, [activeFilter]);

    const filteredAndSortedYachts = yachts
        .filter(yacht => activeFilter === 'all' || yacht.category === activeFilter)
        .sort((a, b) => {
            const isSoldA = a.price?.toLowerCase().includes('sold') || false;
            const isSoldB = b.price?.toLowerCase().includes('sold') || false;
            
            if (isSoldA && !isSoldB) return 1;
            if (!isSoldA && isSoldB) return -1;
            return 0;
        });

    const visibleYachts = filteredAndSortedYachts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    return (
        <section id="fleet" className="fleet-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t('fleetSection.title')}</h2>
                    <p className="section-subtitle">{t('fleetSection.subtitle')}</p>
                </div>

                <div className="fleet-filters">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        {t('fleetSection.all')}
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'charter' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('charter')}
                    >
                        {t('fleetSection.charter')}
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'sales' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('sales')}
                    >
                        {t('fleetSection.sales')}
                    </button>
                </div>

                <div className="fleet-grid">
                    <AnimatePresence mode='popLayout'>
                        {visibleYachts.map((yacht) => (
                            <motion.div
                                key={yacht.id}
                                className="fleet-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                layout
                            >
                                <Link to={localizePath(getYachtPath(yacht))} className="fleet-card-link">
                                    <div className="fleet-img-wrapper">
                                        <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} />
                                        <span className="fleet-tag">{yacht.category === 'charter' ? t('fleetSection.charter') : t('fleetSection.sales')}</span>
                                        {yacht.price?.toLowerCase().includes('sold') && (
                                            <div className="sold-overlay">
                                                <span>{t('fleetSection.sold')}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="fleet-glass-panel">
                                        <div className="glass-header">
                                            <h3>{yacht.name}</h3>
                                            <p className="fleet-type">{yacht.type}</p>
                                        </div>

                                        <div className="glass-specs" style={{ marginBottom: '1rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                            <div className="spec-item">
                                                <Ruler size={14} /> {yacht.length}
                                            </div>
                                        </div>

                                        {yacht.category === 'charter' && (() => {
                                            if (yacht.detailedPricing) {
                                                return (
                                                    <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                        {yacht.detailedPricing.halfDay && (
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.halfDay')}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.halfDay}</span>
                                                            </div>
                                                        )}
                                                        {yacht.detailedPricing.fullDay && (
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.fullDay')}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.fullDay}</span>
                                                            </div>
                                                        )}
                                                        {yacht.detailedPricing.weekly && (
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.weekly')}</span>
                                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.weekly}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }

                                            if (!yacht.price) return null;

                                            const basePrice = parseInt(yacht.price.replace(/[^\d]/g, '')) || 0;

                                            if (basePrice === 0 || yacht.price.toLowerCase().includes('request')) {
                                                return (
                                                    <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.charterRate')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.price}</span>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            const halfDayPrice = `€${(basePrice * 0.9).toLocaleString()}`;
                                            const fullDayPrice = yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
                                            const overnightPrice = `€${(basePrice * 1.2).toLocaleString()}`;

                                            return (
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.halfDay')}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{halfDayPrice}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.fullDay')}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{fullDayPrice}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.overnight')}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{overnightPrice}</span>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {yacht.price && yacht.category === 'sales' && (
                                            <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.salePrice')}</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.price}</span>
                                                </div>
                                            </div>
                                        )}

                                        <span className="glass-cta">{t('fleetSection.viewDetails')}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {visibleCount < filteredAndSortedYachts.length && (
                    <div className="load-more-container">
                        <motion.button 
                            className="load-more-btn"
                            onClick={handleLoadMore}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('fleetSection.loadMore')}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Fleet;
