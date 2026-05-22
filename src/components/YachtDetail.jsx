import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Ruler, Gauge, Anchor, Check, Shield, MessageCircle, Clock, CheckCircle, AlertCircle, Fan, Timer, Calendar, Ship, ChevronDown, ChevronUp } from 'lucide-react';
import { yachts } from '../data/yachts';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import PostcardCarousel from './PostcardCarousel';
import '../styles/YachtDetail.css';

const YachtDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const yacht = yachts.find(y => y.id === parseInt(id));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openSection, setOpenSection] = useState('Description');

    const toggleSection = (section) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const postcardImages = {
        fleet: [
            { url: '/Diamantides/assets/charter-optimized/princess-88-23.webp', title: 'Princess 88' },
            { url: '/Diamantides/assets/charter-optimized/azimut-27-grande.webp', title: 'Azimut 27 Grande' },
            { url: '/Diamantides/assets/charter-optimized/falcon-86.webp', title: 'Falcon 86' },
            { url: '/Diamantides/assets/charter-optimized/ferretti-69.webp', title: 'Ferretti 69' },
            { url: '/Diamantides/assets/charter-optimized/princess-62.webp', title: 'Princess 62' }
        ],
        cyprus: [
            { url: '/Diamantides/destinations/zapalo_v2.jpg', title: 'Zapalo Bay' },
            { url: '/Diamantides/destinations/pissouri.webp', title: 'Pissouri Bay' },
            { url: '/Diamantides/destinations/latsi_v2.jpg', title: 'Latsi & Blue Lagoon' },
            { url: '/Diamantides/destinations/governors.webp', title: 'Governors Beach' },
            { url: '/Diamantides/destinations/paphos.webp', title: 'Paphos Harbor' },
            { url: '/Diamantides/destinations/ayia_napa.webp', title: 'Ayia Napa Blue' },
            { url: '/Diamantides/destinations/protaras.webp', title: 'Protaras Coast' }
        ],
        world: [
            { url: '/Diamantides/world/santorini.webp', title: 'Santorini, Greece' },
            { url: '/Diamantides/world/amalfi.webp', title: 'Amalfi Coast, Italy' },
            { url: '/Diamantides/world/monaco.webp', title: 'Monaco Harbor' },
            { url: '/Diamantides/world/st_barts.webp', title: 'St. Barts, Caribbean' },
            { url: '/Diamantides/world/venice.webp', title: 'Venice, Italy' }
        ]
    };

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

    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [sendSuccess, setSendSuccess] = useState(false);

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSendError(null);
        setSendSuccess(false);

        const form = e.target;
        
        const templateParams = {
            from_name: form.name.value,
            from_email: form.email.value,
            phone: form.phone_number.value,
            message: form.message.value,
            yacht_name: yacht.name,
            yacht_type: yacht.type,
            category: yacht.category
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            setSendSuccess(true);
            form.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError('Failed to send enquiry. Please try again or call us directly.');
        } finally {
            setSending(false);
        }
    };

    if (!yacht) {
        return (
            <div className="yacht-not-found">
                <h2>Yacht not found</h2>
                <button onClick={() => navigate(-1)} className="btn-back"><ArrowLeft size={16} /> Back to Fleet</button>
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
                        {yacht.category === 'sales' && <div className="image-price-badge">{yacht.price}</div>}
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
                <button onClick={() => navigate(-1)} className="btn-back"><ArrowLeft size={16} /> Back to Fleet</button>

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
                                <h2>{yacht.category === 'sales' ? 'Listing Details' : 'Charter Pricing'}</h2>
                            </div>

                            <div className="info-columns">
                                {yacht.category === 'sales' ? (
                                    <div className="sales-details-layout">
                                        <div className="boat-details-card">
                                            <h3 className="card-title">Listing Details</h3>
                                            
                                            {/* Quick Specs Grid */}
                                            <div className="quick-specs-grid">
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Gauge size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">Engines</span>
                                                        <span className="spec-value">{yacht.specs?.engines || yacht.specs?.engine || '-'}</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Only show Total Power and Type(Class) for Yachts, not Boats */}
                                                {yacht.specs?.subCategory !== 'boat' && (
                                                    <>
                                                        <div className="quick-spec-item">
                                                            <div className="spec-icon-wrapper"><Fan size={24} /></div>
                                                            <div className="spec-content">
                                                                <span className="spec-label">Total Power</span>
                                                                <span className="spec-value">{yacht.specs?.power || '-'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="quick-spec-item">
                                                            <div className="spec-icon-wrapper"><Shield size={24} /></div>
                                                            <div className="spec-content">
                                                                <span className="spec-label">Type</span>
                                                                <span className="spec-value">{yacht.specs?.class || yacht.type || 'Unspecified'}</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Ruler size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">Length</span>
                                                        <span className="spec-value">{yacht.length || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Calendar size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">Year Built/Refit</span>
                                                        <span className="spec-value">{yacht.specs?.year || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Ship size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">Brand/Model</span>
                                                        <span className="spec-value">
                                                            {yacht.specs?.builder && !yacht.name.toLowerCase().startsWith(yacht.specs.builder.toLowerCase()) 
                                                                ? `${yacht.specs.builder} ${yacht.name}` 
                                                                : yacht.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Only show Capacity for Yachts, not Boats */}
                                                {yacht.specs?.subCategory !== 'boat' && (
                                                    <div className="quick-spec-item">
                                                        <div className="spec-icon-wrapper"><Users size={24} /></div>
                                                        <div className="spec-content">
                                                            <span className="spec-label">Capacity</span>
                                                            <span className="spec-value">{yacht.capacity || '-'}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="divider-line"></div>

                                            {/* Features */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Features')}>
                                                    <span>Features</span>
                                                    <ChevronDown size={20} className={`chevron-icon ${openSection === 'Features' ? 'open' : ''}`} />
                                                </button>
                                                {openSection === 'Features' && (
                                                    <div className="accordion-content">
                                                        {yacht.features && yacht.features.length > 0 ? (
                                                            <ul className="accordion-features-list">
                                                                {yacht.features.map((feature, i) => (
                                                                    <li key={i}><Check size={16} className="feature-check" /> {feature}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <p>No extra features listed.</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Propulsion */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Propulsion')}>
                                                    <span>Propulsion</span>
                                                    <ChevronDown size={20} className={`chevron-icon ${openSection === 'Propulsion' ? 'open' : ''}`} />
                                                </button>
                                                {openSection === 'Propulsion' && (
                                                    <div className="accordion-content">
                                                        <div className="accordion-specs-list">
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Engine Model</span>
                                                                <span className="spec-value">{yacht.specs?.engines || yacht.specs?.engine || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Engine Hours</span>
                                                                <span className="spec-value">{yacht.specs?.engineHours || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Generator</span>
                                                                <span className="spec-value">{yacht.specs?.generators || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Stabilizers</span>
                                                                <span className="spec-value">{yacht.specs?.stabilizers || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Specifications */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Specifications')}>
                                                    <span>Specifications</span>
                                                    <ChevronDown size={20} className={`chevron-icon ${openSection === 'Specifications' ? 'open' : ''}`} />
                                                </button>
                                                {openSection === 'Specifications' && (
                                                    <div className="accordion-content">
                                                        <div className="accordion-specs-list">
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Builder</span>
                                                                <span className="spec-value">{yacht.specs?.builder || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Length Overall</span>
                                                                <span className="spec-value">{yacht.length || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Beam</span>
                                                                <span className="spec-value">{yacht.specs?.beam || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Draft</span>
                                                                <span className="spec-value">{yacht.specs?.draft || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Volume</span>
                                                                <span className="spec-value">{yacht.specs?.volume || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Cabins</span>
                                                                <span className="spec-value">{yacht.specs?.cabins || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Crew Cabins</span>
                                                                <span className="spec-value">{yacht.specs?.crew || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Cruise Speed</span>
                                                                <span className="spec-value">{yacht.speed || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">Max Speed</span>
                                                                <span className="spec-value">{yacht.specs?.maxSpeed || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">VAT Status</span>
                                                                <span className="spec-value" style={{ color: 'var(--color-secondary)' }}>{yacht.specs?.vatPaid || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Charter Pricing
                                    <div className="info-column pricing-column premium-pricing-card">
                                        {yacht.detailedPricing ? (
                                            <>
                                                {yacht.detailedPricing.twoHours && (
                                                    <div className="info-row">
                                                        <span className="info-label">2 Hours</span>
                                                        <span className="info-value">{yacht.detailedPricing.twoHours}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.threeHours && (
                                                    <div className="info-row">
                                                        <span className="info-label">3 Hours</span>
                                                        <span className="info-value">{yacht.detailedPricing.threeHours}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.fourHours && (
                                                    <div className="info-row">
                                                        <span className="info-label">4 Hours</span>
                                                        <span className="info-value">{yacht.detailedPricing.fourHours}</span>
                                                    </div>
                                                )}
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
                                        )}
                                        
                                        {yacht.priceNote && (
                                            <div className="price-note-box" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                                                <p className="price-note-text" style={{ fontSize: '0.85rem', color: '#4a5568', fontStyle: 'italic', lineHeight: '1.6', textAlign: 'center' }}>
                                                    {yacht.priceNote}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                            <PostcardCarousel 
                                title="All Yachts"
                                subtitle="View Fleet"
                                link="/#fleet"
                                images={postcardImages.fleet}
                            />
                            <PostcardCarousel 
                                title="Top Cyprus Destinations"
                                images={postcardImages.cyprus}
                            />
                            <PostcardCarousel 
                                title="The World"
                                images={postcardImages.world}
                            />
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="detail-sidebar">
                        <div className="enquiry-card">
                            <h3>Interested in {yacht.name}?</h3>
                            <p>Contact us to arrange a viewing or booking.</p>

                            <form className="detail-form" onSubmit={handleEnquirySubmit}>
                                <input type="text" name="name" placeholder="Your Name" required />
                                <input type="email" name="email" placeholder="Email Address" required />
                                <PhoneInput
                                    country={'cy'}
                                    value={''}
                                    onChange={(phone) => {}}
                                    enableSearch={true}
                                    placeholder="Phone Number"
                                    containerClass="custom-phone-input"
                                    inputProps={{
                                        name: 'phone_number',
                                        required: true
                                    }}
                                />
                                <textarea name="message" placeholder="Message" rows="4"></textarea>
                                <button type="submit" className="btn-submit-detail" disabled={sending}>
                                    {sending ? (
                                        <>
                                            <Clock size={18} className="spin-icon" style={{ marginRight: '8px' }} /> Sending...
                                        </>
                                    ) : 'Send Enquiry'}
                                </button>
                                
                                {sendSuccess && (
                                    <div className="form-feedback success">
                                        <CheckCircle size={16} /> Thank you! Our specialists will contact you shortly.
                                    </div>
                                )}
                                {sendError && (
                                    <div className="form-feedback error">
                                        <AlertCircle size={16} /> {sendError}
                                    </div>
                                )}
                            </form>

                            <div className="sidebar-contact">
                                <p>Call Directly</p>
                                <a href="tel:+35725010561" className="phone-link">
                                    +357 25 010 561
                                </a>

                                {yacht.category === 'charter' && (
                                    <>
                                        <p>Email Us</p>
                                        <a href="mailto:charter@diamantidesyachting.com" className="phone-link" style={{ fontSize: '0.9rem' }}>
                                            charter@diamantidesyachting.com
                                        </a>
                                    </>
                                )}

                                <p>Whatsapp Text</p>
                                <a href={`https://wa.me/${yacht.category === 'charter' ? '35796340400' : '35799241025'}`} target="_blank" rel="noopener noreferrer" className="phone-link" style={{ color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <MessageCircle size={20} /> {yacht.category === 'charter' ? '+357 96 340 400' : '+357 99 241 025'}
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
