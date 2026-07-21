import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Ruler, Gauge, Anchor, Check, Shield, MessageCircle, Clock, CheckCircle, AlertCircle, Fan, Timer, Calendar, Ship, ChevronDown, ChevronUp } from 'lucide-react';
import { yachts } from '../data/yachts';
import { useEffect, useState } from 'react';
import { updateSEO } from '../utils/seo';
import { getSlug, getYachtPath } from '../utils/navigation';
import { useLanguage } from '../context/LanguageContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import PostcardCarousel from './PostcardCarousel';
import '../styles/YachtDetail.css';

const YachtDetail = () => {
    const { id, slug } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { t, localizePath, currentLang } = useLanguage();
    
    // The same slug can exist in both categories (e.g. "Princess 30M" is both a
    // charter and a sales listing), so disambiguate by the route the user is on.
    const isSalesRoute = pathname.startsWith('/sales');
    const isCharterRoute = pathname.startsWith('/charter-yacht');

    const yacht = id
        ? yachts.find(y => y.id === parseInt(id))
        : yachts.find(y => {
            if (getSlug(y.name) !== slug) return false;
            if (isSalesRoute) return y.category === 'sales';
            if (isCharterRoute) return y.category === 'charter';
            return true;
        });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openSection, setOpenSection] = useState('Description');
    const [phone, setPhone] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    const toggleFaq = (index) => {
        setOpenFaq(prev => prev === index ? null : index);
    };

    useEffect(() => {
        if (yacht) {
            const isCharter = yacht.category === 'charter';
            const priceNumeric = parseFloat(yacht.price?.replace(/[^0-9.]/g, '')) || null;
            const yachtSchema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": yacht.name,
                "image": yacht.image ? `https://diamantidesyachting.com${yacht.image}` : undefined,
                "description": yacht.description || `Luxury ${yacht.type} available for ${isCharter ? 'charter' : 'sale'} with Diamantides Yachting in Limassol, Cyprus.`,
                "offers": {
                    "@type": "Offer",
                    "url": `https://diamantidesyachting.com${pathname}`,
                    "priceCurrency": "EUR",
                    "price": priceNumeric || undefined,
                    "priceSpecification": !priceNumeric ? {
                        "@type": "PriceSpecification",
                        "price": "POA"
                    } : undefined,
                    "availability": "https://schema.org/InStock"
                }
            };

            if (currentLang === 'ru') {
                updateSEO(
                    `${yacht.name} | ${isCharter ? 'Аренда Люкс Яхты Лимассол' : 'Яхта на Продажу Лимассол'}, Кипр`,
                    `Характеристики, технические спецификации и информация об аренде/продаже ${yacht.name} в Лимассоле, Кипр. Длина: ${yacht.length || 'N/A'}.`,
                    yachtSchema
                );
            } else {
                updateSEO(
                    `${yacht.name} | ${isCharter ? 'Luxury Yacht Charter Limassol' : 'Yacht for Sale Limassol'}, Cyprus`,
                    `Explore details, technical specifications, and charter/sales information for ${yacht.name} in Limassol, Cyprus. Length: ${yacht.length || 'N/A'}.`,
                    yachtSchema
                );
            }
            
            const canonicalPath = localizePath(getYachtPath(yacht));
            if (pathname !== canonicalPath) {
                navigate(canonicalPath, { replace: true });
            }
        }
        window.scrollTo(0, 0);
    }, [id, slug, yacht, navigate, pathname]);

    const postcardImages = {
        fleet: [
            { url: '/assets/charter-optimized/princess-88-23.webp', title: 'Princess 88' },
            { url: '/assets/charter-optimized/azimut-27-grande.webp', title: 'Azimut 27 Grande' },
            { url: '/assets/charter-optimized/falcon-86.webp', title: 'Falcon 86' },
            { url: '/assets/charter-optimized/ferretti-69.webp', title: 'Ferretti 69' },
            { url: '/assets/charter-optimized/princess-62.webp', title: 'Princess 62' }
        ],
        cyprus: [
            { url: '/destinations/zapalo_v2.jpg', title: 'Zapalo Bay' },
            { url: '/destinations/pissouri.webp', title: 'Pissouri Bay' },
            { url: '/destinations/latsi_v2.jpg', title: 'Latsi & Blue Lagoon' },
            { url: '/destinations/governors.webp', title: 'Governors Beach' },
            { url: '/destinations/paphos.webp', title: 'Paphos Harbor' },
            { url: '/destinations/ayia_napa.webp', title: 'Ayia Napa Blue' },
            { url: '/destinations/protaras.webp', title: 'Protaras Coast' }
        ],
        world: [
            { url: '/world/santorini.webp', title: 'Santorini, Greece' },
            { url: '/world/amalfi.webp', title: 'Amalfi Coast, Italy' },
            { url: '/world/monaco.webp', title: 'Monaco Harbor' },
            { url: '/world/st_barts.webp', title: 'St. Barts, Caribbean' },
            { url: '/world/venice.webp', title: 'Venice, Italy' }
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
            phone: phone,
            message: form.message.value,
            yacht_name: yacht.name,
            yacht_type: yacht.type,
            category: yacht.category,
            to_email: yacht.category === 'charter' ? 'charter@diamantidesyachting.com' : 'administration@diamantidesyachting.com'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
            );
            setSendSuccess(true);
            form.reset();
            setPhone('');
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError(t('yachtDetail.enquiryError'));
        } finally {
            setSending(false);
        }
    };

    if (!yacht) {
        return (
            <div className="yacht-not-found">
                <h2>{t('yachtDetail.notFound')}</h2>
                <button onClick={() => navigate(-1)} className="btn-back"><ArrowLeft size={16} /> {t('yachtDetail.backToFleet')}</button>
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
                            alt={`${yacht.name} ${yacht.category === 'charter' ? 'luxury yacht charter' : 'premium yacht for sale'} Limassol Cyprus`}
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
                                    <img src={imgSrc} alt={`${yacht.name} gallery image ${index + 1} - Diamantides Yachting`} className="thumbnail-img" />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            <div className="detail-container">
                <button onClick={() => navigate(-1)} className="btn-back"><ArrowLeft size={16} /> {t('yachtDetail.backToFleet')}</button>

                <div className="detail-grid">
                    {/* Main Content */}
                    <div className="detail-main">
                        <section className="detail-section">
                            <h2>{t('yachtDetail.about')} {yacht.name}</h2>
                            <p className="detail-description">{yacht.description}</p>
                        </section>

                        {/* Sample Itinerary Section - Charter only */}
                        {yacht.category === 'charter' && (
                            <section className="detail-section itinerary-section">
                                <h2>{t('yachtDetail.itineraryTitle')}</h2>
                                <p className="itinerary-description" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--color-text-dark)' }}>
                                    {t('yachtDetail.itineraryText')}
                                </p>
                            </section>
                        )}

                        {/* FAQ Section - Charter only */}
                        {yacht.category === 'charter' && (
                            <section className="detail-section faq-section">
                                <h2>{t('yachtDetail.faqTitle')}</h2>
                                <div className="faq-accordion" style={{ marginTop: '1.5rem' }}>
                                    <div className="accordion-item">
                                        <button className="accordion-header" onClick={() => toggleFaq(0)}>
                                            <span>{t('yachtDetail.faq1Q')}</span>
                                            <ChevronDown size={20} className={`chevron-icon ${openFaq === 0 ? 'open' : ''}`} />
                                        </button>
                                        {openFaq === 0 && (
                                            <div className="accordion-content">
                                                {t('yachtDetail.faq1A')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="accordion-item">
                                        <button className="accordion-header" onClick={() => toggleFaq(1)}>
                                            <span>{t('yachtDetail.faq2Q')}</span>
                                            <ChevronDown size={20} className={`chevron-icon ${openFaq === 1 ? 'open' : ''}`} />
                                        </button>
                                        {openFaq === 1 && (
                                            <div className="accordion-content">
                                                {t('yachtDetail.faq2A')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="accordion-item">
                                        <button className="accordion-header" onClick={() => toggleFaq(2)}>
                                            <span>{t('yachtDetail.faq3Q')}</span>
                                            <ChevronDown size={20} className={`chevron-icon ${openFaq === 2 ? 'open' : ''}`} />
                                        </button>
                                        {openFaq === 2 && (
                                            <div className="accordion-content">
                                                {t('yachtDetail.faq3A')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="detail-section information-section">
                            <div className="section-title-wrapper">
                                <div className="nautical-divider">
                                    <hr className="gold-line" />
                                    <Anchor size={24} className="nautical-icon" />
                                    <hr className="gold-line" />
                                </div>
                                <h2>{yacht.category === 'sales' ? t('yachtDetail.listingDetails') : t('yachtDetail.charterPricing')}</h2>
                            </div>

                            <div className="info-columns">
                                {yacht.category === 'sales' ? (
                                    <div className="sales-details-layout">
                                        <div className="boat-details-card">
                                            <h3 className="card-title">{t('yachtDetail.listingDetails')}</h3>
                                            
                                            {/* Quick Specs Grid */}
                                            <div className="quick-specs-grid">
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Gauge size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">{t('yachtDetail.engines')}</span>
                                                        <span className="spec-value">{yacht.specs?.engines || yacht.specs?.engine || '-'}</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Only show Total Power and Type(Class) for Yachts, not Boats */}
                                                {yacht.specs?.subCategory !== 'boat' && (
                                                    <>
                                                        <div className="quick-spec-item">
                                                            <div className="spec-icon-wrapper"><Fan size={24} /></div>
                                                            <div className="spec-content">
                                                                <span className="spec-label">{t('yachtDetail.totalPower')}</span>
                                                                <span className="spec-value">{yacht.specs?.power || '-'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="quick-spec-item">
                                                            <div className="spec-icon-wrapper"><Shield size={24} /></div>
                                                            <div className="spec-content">
                                                                <span className="spec-label">{t('yachtDetail.type')}</span>
                                                                <span className="spec-value">{yacht.specs?.class || yacht.type || t('yachtDetail.unspecified')}</span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Ruler size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">{t('yachtDetail.length')}</span>
                                                        <span className="spec-value">{yacht.length || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Calendar size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">{t('yachtDetail.yearBuilt')}</span>
                                                        <span className="spec-value">{yacht.specs?.year || '-'}</span>
                                                    </div>
                                                </div>
                                                <div className="quick-spec-item">
                                                    <div className="spec-icon-wrapper"><Ship size={24} /></div>
                                                    <div className="spec-content">
                                                        <span className="spec-label">{t('yachtDetail.brandModel')}</span>
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
                                                            <span className="spec-label">{t('yachtDetail.capacity')}</span>
                                                            <span className="spec-value">{yacht.capacity || '-'}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="divider-line"></div>

                                            {/* Features */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Features')}>
                                                    <span>{t('yachtDetail.features')}</span>
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
                                                            <p>{t('yachtDetail.noFeatures')}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Propulsion */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Propulsion')}>
                                                    <span>{t('yachtDetail.propulsion')}</span>
                                                    <ChevronDown size={20} className={`chevron-icon ${openSection === 'Propulsion' ? 'open' : ''}`} />
                                                </button>
                                                {openSection === 'Propulsion' && (
                                                    <div className="accordion-content">
                                                        <div className="accordion-specs-list">
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.engineModel')}</span>
                                                                <span className="spec-value">{yacht.specs?.engines || yacht.specs?.engine || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.engineHours')}</span>
                                                                <span className="spec-value">{yacht.specs?.engineHours || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.generator')}</span>
                                                                <span className="spec-value">{yacht.specs?.generators || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.stabilizers')}</span>
                                                                <span className="spec-value">{yacht.specs?.stabilizers || '-'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Specifications */}
                                            <div className="accordion-item">
                                                <button className="accordion-header" onClick={() => toggleSection('Specifications')}>
                                                    <span>{t('yachtDetail.specifications')}</span>
                                                    <ChevronDown size={20} className={`chevron-icon ${openSection === 'Specifications' ? 'open' : ''}`} />
                                                </button>
                                                {openSection === 'Specifications' && (
                                                    <div className="accordion-content">
                                                        <div className="accordion-specs-list">
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.builder')}</span>
                                                                <span className="spec-value">{yacht.specs?.builder || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.lengthOverall')}</span>
                                                                <span className="spec-value">{yacht.length || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.beam')}</span>
                                                                <span className="spec-value">{yacht.specs?.beam || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.draft')}</span>
                                                                <span className="spec-value">{yacht.specs?.draft || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.volume')}</span>
                                                                <span className="spec-value">{yacht.specs?.volume || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.cabins')}</span>
                                                                <span className="spec-value">{yacht.specs?.cabins || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.crewCabins')}</span>
                                                                <span className="spec-value">{yacht.specs?.crew || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.cruiseSpeed')}</span>
                                                                <span className="spec-value">{yacht.speed || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.maxSpeed')}</span>
                                                                <span className="spec-value">{yacht.specs?.maxSpeed || '-'}</span>
                                                            </div>
                                                            <div className="accordion-spec-row">
                                                                <span className="spec-key">{t('yachtDetail.vatStatus')}</span>
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
                                                        <span className="info-label">{t('fleetSection.twoHours')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.twoHours}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.threeHours && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.threeHours')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.threeHours}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.fourHours && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.fourHours')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.fourHours}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.halfDay && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.halfDay')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.halfDay}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.fullDay && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.fullDay')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.fullDay}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.overnight && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.overnight')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.overnight}</span>
                                                    </div>
                                                )}
                                                {yacht.detailedPricing.weekly && (
                                                    <div className="info-row">
                                                        <span className="info-label">{t('fleetSection.weekly')}</span>
                                                        <span className="info-value">{yacht.detailedPricing.weekly}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : basePrice === 0 || yacht?.price?.toLowerCase().includes('request') ? (
                                            <div className="info-row">
                                                <span className="info-label">{t('fleetSection.charterRate')}</span>
                                                <span className="info-value">{t('yachtDetail.onRequest')}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="info-row">
                                                    <span className="info-label">{t('fleetSection.halfDay')}</span>
                                                    <span className="info-value">{halfDayPrice}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-label">{t('fleetSection.fullDay')}</span>
                                                    <span className="info-value">{fullDayPrice}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-label">{t('fleetSection.overnight')}</span>
                                                    <span className="info-value">{overnightPrice}</span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-label">{t('fleetSection.weekly')}</span>
                                                    <span className="info-value">{t('yachtDetail.uponRequest')}</span>
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
                                title={t('yachtDetail.allYachts')}
                                subtitle={t('yachtDetail.viewFleet')}
                                link="/#fleet"
                                images={postcardImages.fleet}
                            />
                            <PostcardCarousel
                                title={t('yachtDetail.topCyprus')}
                                images={postcardImages.cyprus}
                            />
                            <PostcardCarousel
                                title={t('yachtDetail.theWorld')}
                                images={postcardImages.world}
                            />
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="detail-sidebar">
                        <div className="enquiry-card">
                            <h3>{t('yachtDetail.interestedIn')} {yacht.name}?</h3>
                            <p>{t('yachtDetail.contactViewing')}</p>

                            <form className="detail-form" onSubmit={handleEnquirySubmit}>
                                <input type="text" name="name" placeholder={t('yachtDetail.yourName')} required />
                                <input type="email" name="email" placeholder={t('yachtDetail.emailAddress')} required />
                                <PhoneInput
                                    country={'cy'}
                                    value={phone}
                                    onChange={(val) => setPhone(val)}
                                    enableSearch={true}
                                    placeholder={t('yachtDetail.phoneNumber')}
                                    containerClass="custom-phone-input"
                                    inputProps={{
                                        name: 'phone_number',
                                        required: true
                                    }}
                                />
                                <textarea name="message" placeholder={t('yachtDetail.message')} rows="4"></textarea>
                                <button type="submit" className="btn-submit-detail" disabled={sending}>
                                    {sending ? (
                                        <>
                                            <Clock size={18} className="spin-icon" style={{ marginRight: '8px' }} /> {t('yachtDetail.sending')}
                                        </>
                                    ) : t('yachtDetail.sendEnquiry')}
                                </button>

                                {sendSuccess && (
                                    <div className="form-feedback success">
                                        <CheckCircle size={16} /> {t('yachtDetail.enquirySuccess')}
                                    </div>
                                )}
                                {sendError && (
                                    <div className="form-feedback error">
                                        <AlertCircle size={16} /> {sendError}
                                    </div>
                                )}
                            </form>

                            <div className="sidebar-contact">
                                <p>{t('yachtDetail.callDirectly')}</p>
                                <a href="tel:+35725010561" className="phone-link">
                                    +357 25 010 561
                                </a>

                                {yacht.category === 'charter' && (
                                    <>
                                        <p>{t('yachtDetail.emailUs')}</p>
                                        <a href="mailto:charter@diamantidesyachting.com" className="phone-link" style={{ fontSize: '0.9rem' }}>
                                            charter@diamantidesyachting.com
                                        </a>
                                    </>
                                )}

                                <p>{t('yachtDetail.whatsapp')}</p>
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
