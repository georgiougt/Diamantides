import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Ruler, Gauge, Anchor, Check, Shield } from 'lucide-react';
import { yachts } from '../data/yachts';
import { useEffect, useState } from 'react';
import '../styles/YachtDetail.css';

const YachtDetail = () => {
    const { id } = useParams();
    const yacht = yachts.find(y => y.id === parseInt(id));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const nextImage = () => {
        if (yacht && yacht.gallery) {
            setCurrentImageIndex((prev) => (prev + 1) % yacht.gallery.length);
        }
    };

    const prevImage = () => {
        if (yacht && yacht.gallery) {
            setCurrentImageIndex((prev) => (prev - 1 + yacht.gallery.length) % yacht.gallery.length);
        }
    };

    if (!yacht) {
        return (
            <div className="yacht-not-found">
                <h2>Yacht not found</h2>
                <Link to="/" className="btn-back"><ArrowLeft size={16} /> Back to Fleet</Link>
            </div>
        );
    }

    return (
        <div className="yacht-detail-page">
            {/* Title Section */}
            <section className="detail-header">
                <div className="detail-header-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {yacht.name}
                    </motion.h1>
                    <motion.p
                        className="detail-price"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {yacht.price}
                    </motion.p>
                </div>
            </section>

            {/* Spotlight Gallery */}
            {yacht.gallery && yacht.gallery.length > 0 && (
                <section className="spotlight-gallery">
                    <div className="spotlight-image-container">
                        <img
                            src={yacht.gallery[currentImageIndex]}
                            alt={`${yacht.name} spotlight`}
                            className="spotlight-image"
                        />
                        {yacht.gallery.length > 1 && (
                            <>
                                <button className="gallery-arrow left-arrow" onClick={prevImage}><ArrowLeft size={24} /></button>
                                <button className="gallery-arrow right-arrow" onClick={nextImage}><ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }} /></button>
                            </>
                        )}
                        <div className="gallery-dots">
                            {yacht.gallery.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="detail-container">
                <Link to="/" className="btn-back"><ArrowLeft size={16} /> Back to Fleet</Link>

                <div className="detail-grid">
                    {/* Main Content */}
                    <div className="detail-main">
                        <section className="detail-section">
                            <h2>About {yacht.name}</h2>
                            <p className="detail-description">{yacht.description}</p>
                        </section>

                        <section className="detail-section">
                            <h2>Specifications</h2>
                            <div className="specs-grid">
                                <div className="spec-card">
                                    <Ruler className="spec-icon" />
                                    <span>Length</span>
                                    <strong>{yacht.length}</strong>
                                </div>
                                <div className="spec-card">
                                    <Users className="spec-icon" />
                                    <span>Capacity</span>
                                    <strong>{yacht.capacity}</strong>
                                </div>
                                <div className="spec-card">
                                    <Gauge className="spec-icon" />
                                    <span>Speed</span>
                                    <strong>{yacht.speed}</strong>
                                </div>
                                {Object.entries(yacht.specs).map(([key, value]) => (
                                    <div className="spec-card" key={key}>
                                        <Shield className="spec-icon" />
                                        <span style={{ textTransform: 'capitalize' }}>{key}</span>
                                        <strong>{value}</strong>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="detail-section">
                            <h2>Features & Amenities</h2>
                            <ul className="features-list">
                                {yacht.features?.map((feature, index) => (
                                    <li key={index}><Check size={16} className="check-icon" /> {feature}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="detail-bottom-columns">
                            <Link to="/" className="bottom-col-card all-yachts-card">
                                <div className="bottom-col-content">
                                    <h3>All Yachts</h3>
                                </div>
                            </Link>
                            <div className="bottom-col-card destination-card">
                                <div className="bottom-col-content">
                                    <h3>Top Cyprus Destinations</h3>
                                </div>
                            </div>
                            <div className="bottom-col-card world-card">
                                <div className="bottom-col-content">
                                    <h3>The World</h3>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="detail-sidebar">
                        <div className="enquiry-card">
                            <h3>Interested in {yacht.name}?</h3>
                            <p>Contact us to arrange a viewing or booking.</p>

                            <form className="detail-form" onSubmit={(e) => { e.preventDefault(); alert('Enquiry sent!'); }}>
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Email Address" required />
                                <input type="tel" placeholder="Phone Number" />
                                <textarea placeholder="Message" rows="4"></textarea>
                                <button type="submit" className="btn-submit-detail">Send Enquiry</button>
                            </form>

                            <div className="sidebar-contact">
                                <p>Or call us directly:</p>
                                <a href="tel:+35725010561" className="phone-link">+357 25 010 561</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YachtDetail;
