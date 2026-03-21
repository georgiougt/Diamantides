import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Ruler, Gauge, Anchor, Check, Shield, MessageCircle } from 'lucide-react';
import { yachts } from '../data/yachts';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/YachtDetail.css';

const YachtDetail = () => {
    const { id } = useParams();
    const yacht = yachts.find(y => y.id === parseInt(id));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const galleryImages = yacht?.gallery?.length > 0 ? yacht.gallery : (yacht?.image ? [yacht.image] : []);

    const nextImage = () => {
        if (galleryImages.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }
    };

    const prevImage = () => {
        if (galleryImages.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
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
            {galleryImages.length > 0 && (
                <section className="spotlight-gallery">
                    <div className="spotlight-image-container">
                        <img
                            src={galleryImages[currentImageIndex]}
                            alt={`${yacht.name} spotlight`}
                            className="spotlight-image"
                        />
                        {galleryImages.length > 1 && (
                            <>
                                <button className="gallery-arrow left-arrow" onClick={prevImage}><ArrowLeft size={24} /></button>
                                <button className="gallery-arrow right-arrow" onClick={nextImage}><ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }} /></button>
                            </>
                        )}
                    </div>
                    {/* Thumbnail Strip */}
                    {galleryImages.length > 1 && (
                        <div className="gallery-thumbnails">
                            {galleryImages.map((imgSrc, index) => (
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
                                <div className="nautical-divider">
                                    <hr className="gold-line" />
                                    <Anchor size={24} className="nautical-icon" />
                                    <hr className="gold-line" />
                                </div>
                                <h2>{yacht.category === 'sales' ? 'Sale Details' : 'Charter Pricing'}</h2>
                            </div>

                            <div className="info-columns">
                                {/* Pricing Column */}
                                <div className="info-column pricing-column premium-pricing-card">
                                    {yacht.category === 'sales' ? (
                                        <>
                                            <div className="info-row">
                                                <span className="info-label">Brand</span>
                                                <span className="info-value">{yacht.specs?.builder || 'N/A'}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">Listing Status</span>
                                                <span className="info-value">{yacht.specs?.status || 'Available'}</span>
                                            </div>
                                            <div className="info-row">
                                                <span className="info-label">Asking Price</span>
                                                <span className="info-value" style={{ color: 'var(--color-secondary)', fontWeight: 700, fontSize: '1.5rem' }}>{yacht.price}</span>
                                            </div>
                                            {yacht.specs?.year && (
                                                <div className="info-row">
                                                    <span className="info-label">Year Built</span>
                                                    <span className="info-value">{yacht.specs.year}</span>
                                                </div>
                                            )}
                                            {yacht.specs?.model && (
                                                <div className="info-row">
                                                    <span className="info-label">Model</span>
                                                    <span className="info-value">{yacht.specs.model}</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // Charter Pricing
                                        yacht.detailedPricing ? (
                                            <>
                                                {yacht.detailedPricing.halfDay && (
                                                    <div className="info-row">
                                                        <span className="info-label">Half Day</span>
                                                        <span className="info-value">{yacht.detailedPricing.halfDay}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.fullDay && (
                                                    <div className="info-row">
                                                        <span className="info-label">Full Day</span>
                                                        <span className="info-value">{yacht.detailedPricing.fullDay}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.overnight && (
                                                    <div className="info-row">
                                                        <span className="info-label">Overnight</span>
                                                        <span className="info-value">{yacht.detailedPricing.overnight}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.weekly && (
                                                    <div className="info-row">
                                                        <span className="info-label">Weekly</span>
                                                        <span className="info-value">{yacht.detailedPricing.weekly}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : basePrice === 0 || yacht?.price?.toLowerCase().includes('request') ? (
                                            <div className="info-row">
                                                <span className="info-label">Charter Rate</span>
                                                <span className="info-value">On Request</span>
                                            </div>
                                        ) : (
                                            <>
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
                                            </>
                                        )
                                    )}
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
                                <div className="postcard-text">
                                    <h3>All Yachts</h3>
                                    <span className="btn-view-all">View Fleet</span>
                                </div>
                                <div className="postcard-img-wrapper multi-image-grid">
                                    <img src="/Diamantides/gallery/yacht_1.jpg" alt="All Yachts 1" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_2.jpg" alt="All Yachts 2" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_3.jpg" alt="All Yachts 3" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_4.jpg" alt="All Yachts 4" className="postcard-img" />
                                    <img src="/Diamantides/gallery/yacht_1.jpg" alt="All Yachts 5" className="postcard-img" />
                                </div>
                            </Link>
                            <div className="postcard">
                                <div className="postcard-text">
                                    <h3>Top Cyprus Destinations</h3>
                                </div>
                                <div className="postcard-img-wrapper multi-image-grid">
                                    <img src="/Diamantides/destinations/dest_1.jpg" alt="Cyprus Dest 1" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_2.jpg" alt="Cyprus Dest 2" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_3.jpg" alt="Cyprus Dest 3" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_4.jpg" alt="Cyprus Dest 4" className="postcard-img" />
                                    <img src="/Diamantides/destinations/dest_5.jpg" alt="Cyprus Dest 5" className="postcard-img" />
                                </div>
                            </div>
                            <div className="postcard">
                                <div className="postcard-text">
                                    <h3>The World</h3>
                                </div>
                                <div className="postcard-img-wrapper multi-image-grid">
                                    <img src="/Diamantides/world/world_1.jpg" alt="The World 1" className="postcard-img" />
                                    <img src="/Diamantides/world/world_2.jpg" alt="The World 2" className="postcard-img" />
                                    <img src="/Diamantides/world/world_3.jpg" alt="The World 3" className="postcard-img" />
                                    <img src="/Diamantides/world/world_4.jpg" alt="The World 4" className="postcard-img" />
                                    <img src="/Diamantides/world/world_5.jpg" alt="The World 5" className="postcard-img" />
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
                                <PhoneInput
                                    country={'cy'}
                                    value={''}
                                    onChange={(phone) => {}}
                                    enableSearch={true}
                                    placeholder="Phone Number"
                                    containerClass="custom-phone-input"
                                />
                                <textarea placeholder="Message" rows="4"></textarea>
                                <button type="submit" className="btn-submit-detail">Send Enquiry</button>
                            </form>

                            <div className="sidebar-contact">
                                <p>Call Directly</p>
                                <a href="tel:+35725010561" className="phone-link">+357 25 010 561</a>
                                <p style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Whatsapp Text</p>
                                <a href="https://wa.me/35799123456" target="_blank" rel="noopener noreferrer" className="phone-link" style={{ color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <MessageCircle size={20} /> +357 99 123 456
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YachtDetail;
