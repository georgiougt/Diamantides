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
                            <div className="fleet-image-container">
                                <img src={yacht.image} alt={yacht.name} className="fleet-image" />
                                <span className="fleet-tag">{yacht.category === 'charter' ? 'For Charter' : 'For Sale'}</span>
                            </div>
                            <div className="fleet-content">
                                <h3>{yacht.name}</h3>
                                <p className="fleet-type">{yacht.type}</p>

                                <div className="fleet-specs">
                                    <div className="spec-item">
                                        <Ruler size={16} /> {yacht.length}
                                    </div>
                                    <div className="spec-item">
                                        <Users size={16} /> {yacht.capacity}
                                    </div>
                                    <div className="spec-item">
                                        <Gauge size={16} /> {yacht.speed}
                                    </div>
                                </div>

                                <Link to={`/yacht/${yacht.id}`} className="btn-enquire">
                                    View Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fleet;
