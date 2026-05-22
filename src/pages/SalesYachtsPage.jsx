import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Anchor, Ruler, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { yachts } from '../data/yachts';
import '../styles/SalesYachts.css';

const SalesYachtsPage = () => {
    // Filter/Sort State
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('price-desc'); // Highest to Lowest default
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, typeFilter, brandFilter, priceRange, sortOrder]);

    // Helper to parse price string to number
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const lower = priceStr.toLowerCase();
        if (lower.includes('request') || lower.includes('poa')) return 0;
        if (lower.includes('sold')) return 0; // Sold items at the bottom
        const numeric = priceStr.replace(/[^0-9]/g, '');
        return numeric ? parseInt(numeric) : 0;
    };

    // Brands derived from data
    const brands = ['All', ...new Set(yachts.filter(y => y.category === 'sales').map(y => y.specs?.builder).filter(Boolean))];
    const types = ['All', 'Yachts', 'RIB', 'Fiberglass', 'jetskis'];

    // Filtering and Sorting Logic
    const filteredAndSortedYachts = yachts
        .filter(y => y.category === 'sales')
        .filter(y => {
            const matchesName = y.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                               y.specs?.builder?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'All' || y.vesselType === typeFilter;
            const matchesBrand = brandFilter === 'All' || y.specs?.builder === brandFilter;
            
            const price = parsePrice(y.price);
            const matchesMinPrice = priceRange.min === '' || price >= parseInt(priceRange.min);
            const matchesMaxPrice = priceRange.max === '' || price <= parseInt(priceRange.max);

            return matchesName && matchesType && matchesBrand && matchesMinPrice && matchesMaxPrice;
        })
        .sort((a, b) => {
            const isSoldA = a.price && a.price.toLowerCase().includes('sold');
            const isSoldB = b.price && b.price.toLowerCase().includes('sold');

            if (isSoldA && !isSoldB) return 1;
            if (!isSoldA && isSoldB) return -1;

            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);

            if (sortOrder === 'price-desc') {
                return priceB - priceA;
            } else {
                return priceA - priceB;
            }
        });

    // Pagination Logic
    const totalPages = Math.ceil(filteredAndSortedYachts.length / ITEMS_PER_PAGE);
    const paginatedYachts = filteredAndSortedYachts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const fleetSection = document.querySelector('.sales-fleet-section');
        if (fleetSection) {
            fleetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry. Our sales specialists will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="sales-page">
            {/* Immersive Hero Section */}
            <section className="sales-hero">
                <div className="sales-hero-overlay"></div>
                <div className="sales-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Luxury Sales & Brokerage
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        Own a piece of the horizon. Our curated selection of pre-owned and new vessels represents the pinnacle of maritime luxury and engineering excellence.
                    </motion.p>
                </div>

                {/* Filters Bar pinned to bottom of hero */}
                <div className="hero-filters-container">
                    <div className="filters-bar-glass">
                        <div className="filter-group-main">
                            <div className="search-input-wrapper">
                                <input 
                                    type="text" 
                                    placeholder="Search by name or brand..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="filter-search"
                                />
                            </div>
                            
                            <div className="select-wrapper">
                                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                    <option value="All">All Types</option>
                                    {types.filter(t => t !== 'All').map(t => (
                                        <option key={t} value={t}>{t === 'jetskis' ? 'Jet Skis' : t}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="select-wrapper">
                                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                                    <option value="All">All Brands</option>
                                    {brands.filter(b => b !== 'All').map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="filter-group-secondary">
                            <div className="price-inputs">
                                <input 
                                    type="number" 
                                    placeholder="Min Price" 
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                                />
                                <span>-</span>
                                <input 
                                    type="number" 
                                    placeholder="Max Price" 
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                                />
                            </div>

                            <div className="sort-toggle">
                                <button 
                                    className={`sort-btn ${sortOrder === 'price-desc' ? 'active' : ''}`}
                                    onClick={() => setSortOrder(sortOrder === 'price-desc' ? 'price-asc' : 'price-desc')}
                                >
                                    {sortOrder === 'price-desc' ? 'Price: High to Low' : 'Price: Low to High'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Asymmetrical Masonry Grid */}
            <section className="sales-fleet-section">
                <div className="sales-grid">
                    {paginatedYachts.map((yacht, index) => (
                        <motion.div
                            key={yacht.id}
                            className={`sales-card ${index % 5 === 0 ? 'large-card' : 'standard-card'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: (index % ITEMS_PER_PAGE) * 0.1 }}
                        >
                            <Link to={`/yacht/${yacht.id}`} className="sales-card-link">
                                <div className="sales-img-wrapper" style={{ position: 'relative' }}>
                                    <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} loading="lazy" />
                                    {yacht.condition === 'new' && (
                                        <div className="new-condition-badge" style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                            background: 'var(--gradient-metallic-gold)',
                                            color: '#0a1118',
                                            padding: '5px 14px',
                                            borderRadius: '30px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            boxShadow: '0 4px 15px rgba(212,175,55,0.4)',
                                            zIndex: 10
                                        }}>
                                            Brand New
                                        </div>
                                    )}
                                    {yacht.price && <div className="image-price-badge">{yacht.price}</div>}
                                </div>
                                <div className="sales-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <p className="fleet-type" style={{ margin: 0, fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{yacht.type || 'Luxury Yacht'}</p>
                                    </div>
                                    <div className="glass-specs">
                                        <span className="spec-item"><Ruler size={14} /> {yacht.length || 'N/A'}</span>
                                    </div>

                                    {yacht.price && (
                                        <div className="sales-pricing-row">
                                            <span className="asking-label">Asking Price</span>
                                            <span className="asking-price">{yacht.price}</span>
                                        </div>
                                    )}

                                    <span className="glass-cta">View Details</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Premium Pagination Controls */}
                {totalPages > 1 && (
                    <div className="pagination-container">
                        <button 
                            className="pagination-arrow"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        <div className="pagination-numbers">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                // Simple logic to show a few pages around current
                                if (
                                    pageNum === 1 || 
                                    pageNum === totalPages || 
                                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                ) {
                                    return (
                                        <button
                                            key={pageNum}
                                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                                            onClick={() => handlePageChange(pageNum)}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (
                                    pageNum === currentPage - 2 || 
                                    pageNum === currentPage + 2
                                ) {
                                    return <span key={pageNum} className="pagination-ellipsis">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button 
                            className="pagination-arrow"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </section>

            {/* Immersive Bespoke Contact Form Banner */}
            <motion.section
                className="sales-cta-banner"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="cta-banner-content">
                    <Anchor className="cta-icon" size={32} />
                    <h2>Ready to Take the Helm?</h2>
                    <p>Contact our brokerage specialists to schedule a viewing or request exclusive details on our vessels for sale.</p>

                    <form className="sales-contact-form" onSubmit={handleSubmit}>
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
                        <PhoneInput
                            country={'cy'}
                            value={formData.phone}
                            onChange={(phone) => setFormData({ ...formData, phone })}
                            enableSearch={true}
                            placeholder="Phone Number (Optional)"
                            containerClass="custom-phone-input"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about the yacht you're interested in..."
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

export default SalesYachtsPage;
