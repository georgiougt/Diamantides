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

    const basePrice = yacht ? (parseInt(yacht.price.replace(/[^\d]/g, '')) || 8800) : 0;
    const halfDayPrice = `€${(basePrice * 0.9).toLocaleString()}`;
    const fullDayPrice = yacht && yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
    const overnightPrice = `€${(basePrice * 1.2).toLocaleString()}`;

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
                    </div>
                    {/* Thumbnail Strip */}
                    {yacht.gallery.length > 1 && (
                        <div className="gallery-thumbnails">
                            {yacht.gallery.map((imgSrc, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail-wrapper ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="thumbnail-img" />
                                </div>
                            ))}
                        </div>
                    )}
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

                        <section className="detail-section information-section">
                            <div className="section-title-wrapper">
                                <hr className="title-line" />
                                <h2>Information</h2>
                                <hr className="title-line" />
                            </div>

                            <div className="info-columns">
                                {/* Pricing Column */}
                                <div className="info-column pricing-column">
                                    <div className="info-row">
                                        <span className="info-label">Half Day</span>
                                        <span className="info-value">{halfDayPrice}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Full Day</span>
                                        <span className="info-value">{fullDayPrice}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Overnight</span>
                                        <span className="info-value">{overnightPrice}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Weekly</span>
                                        <span className="info-value">Upon Request</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 
                        <section className="detail-section">
                            <h2>Features & Amenities</h2>
                            <ul className="features-list">
                                {yacht.features?.map((feature, index) => (
                                    <li key={index}><Check size={16} className="check-icon" /> {feature}</li>
                                ))}
                            </ul>
                        </section>
                        */}

                        <section className="detail-bottom-columns">
                            <Link to="/" className="postcard">
                                <div className="postcard-img-wrapper yachts-mosaic-grid">
                                    <img src="/Diamantides/gallery/yacht_1.jpg" alt="All Yachts 1" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_2.jpg" alt="All Yachts 2" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_3.jpg" alt="All Yachts 3" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_4.jpg" alt="All Yachts 4" className="postcard-img" />
                                </div>
                                <div className="postcard-text">
                                    <h3>All Yachts</h3>
                                    <span className="btn-view-all">View Fleet</span>
                                </div>
                            </Link>
                            <div className="postcard">
                                <div className="postcard-img-wrapper multi-image-grid">
                                    <img src="/Diamantides/destinations/dest_1.jpg" alt="Cyprus Dest 1" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_2.jpg" alt="Cyprus Dest 2" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_3.jpg" alt="Cyprus Dest 3" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_4.jpg" alt="Cyprus Dest 4" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_5.jpg" alt="Cyprus Dest 5" className="postcard-img" />
                                </div>
                                <div className="postcard-text">
                                    <h3>Top Cyprus Destinations</h3>
                                </div>
                            </div>
                            <div className="postcard">
                                <div className="postcard-img-wrapper">
                                    <img src="https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=600&auto=format&fit=crop" alt="The World" className="postcard-img" />
                                </div>
                                <div className="postcard-text">
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
                                <div className="phone-input-wrapper-dark">
                                    <select className="country-code-select-dark" defaultValue="+357">
                                        <option value="+357">+357 (CY)</option>
                                        <option value="+30">+30 (GR)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+1">+1 (US/CA)</option>
                                        <option value="+971">+971 (UAE)</option>
                                        <option value="+33">+33 (FR)</option>
                                        <option value="+39">+39 (IT)</option>
                                        <option value="+49">+49 (DE)</option>
                                    </select>
                                    <input type="tel" placeholder="Phone Number" />
                                </div>
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
