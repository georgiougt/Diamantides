import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Ruler, Gauge, ArrowRight } from 'lucide-react';
import { yachts } from '../data/yachts';
import '../styles/Fleet.css';

const Fleet = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredYachts = activeFilter === 'all'
        ? yachts
        : yachts.filter(yacht => yacht.category === activeFilter);

    return (
        <section id="fleet" className="fleet-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Our Premium Fleet</h2>
                    <p className="section-subtitle">Discover our exclusive selection of yachts available for charter and sale.</p>
                </div>

                <div className="fleet-filters">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All Yachts
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'charter' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('charter')}
                    >
                        For Charter
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'sales' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('sales')}
                    >
                        For Sale
                    </button>
                </div>

                <div className="fleet-grid">
                    {filteredYachts.map((yacht) => (
                        <motion.div
                            key={yacht.id}
                            className="fleet-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            layout
                        >
                            <Link to={`/yacht/${yacht.id}`} className="fleet-card-link">
                                <div className="fleet-img-wrapper">
                                    <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} />
                                    <span className="fleet-tag">{yacht.category === 'charter' ? 'For Charter' : 'For Sale'}</span>
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

                                    {yacht.price && yacht.category === 'charter' && (() => {
                                        const basePrice = parseInt(yacht.price.replace(/[^\d]/g, '')) || 0;
                                        if (basePrice === 0) return null;

                                        const halfDayPrice = `€${(basePrice * 0.9).toLocaleString()}`;
                                        const fullDayPrice = yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
                                        const overnightPrice = `€${(basePrice * 1.2).toLocaleString()}`;

                                        return (
                                            <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Half Day</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{halfDayPrice}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Full Day</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{fullDayPrice}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Overnight</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{overnightPrice}</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {yacht.price && yacht.category === 'sales' && (
                                        <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Sale Price</span>
                                                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.price}</span>
                                            </div>
                                        </div>
                                    )}

                                    <span className="glass-cta">View Details</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fleet;
