import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, UserCheck, Clock, CheckCircle, ArrowRight, Anchor, Camera, Warehouse, AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { updateSEO } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/BoatParking.css';
import inclusiveCareImg from '../assets/services/parking_care_hd.webp';
import hangarImg from '../assets/services/parking_hangar_exact.webp';
import monitoringImg from '../assets/services/parking_monitoring_exact.webp';

const BoatParkingPage = () => {
    const { t, currentLang } = useLanguage();

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Парковка и Хранение Катеров Лимассол | Diamantides Yachting', 'Крытое хранение катеров, профессиональная стоянка яхт, круглосуточная охрана и видеонаблюдение, комплексное обслуживание в Лимассоле, Кипр.');
        } else {
            updateSEO('Premium Boat Parking & Storage Limassol | Diamantides Yachting', 'Secure covered hangar boat storage, professional yacht mooring, 24/7 CCTV security, and all-inclusive maintenance services in Limassol, Cyprus.');
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    const [formData, setFormData] = useState({
        name: '',
        vessel: '',
        email: '',
        phone: '',
        message: ''
    });

    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [sendSuccess, setSendSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSendError(null);
        setSendSuccess(false);

        const templateParams = {
            yacht_name: '',
            yacht_type: '',
            to_email: 'administration@diamantidesyachting.com',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: `Vessel Type & Dimensions: ${formData.vessel}\n\nRequirements: ${formData.message}`,
            category: 'Boat Parking Request'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
            );
            setSendSuccess(true);
            setFormData({ name: '', vessel: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError(t('boatParking.errorMsg'));
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const services = [
        {
            title: t('boatParking.coveredTitle'),
            description: t('boatParking.coveredDesc'),
            icon: <Warehouse size={32} />,
            image: hangarImg
        },
        {
            title: t('boatParking.maintenanceTitle'),
            description: t('boatParking.maintenanceDesc'),
            icon: <Clock size={32} />,
            image: monitoringImg
        }
    ];

    const benefits = [
        {
            title: t('boatParking.securedTitle'),
            text: t('boatParking.securedText'),
            icon: <Shield className="benefit-icon" />
        },
        {
            title: t('boatParking.managerTitle'),
            text: t('boatParking.managerText'),
            icon: <UserCheck className="benefit-icon" />
        },
        {
            title: t('boatParking.locationTitle'),
            text: t('boatParking.locationText'),
            icon: <MapPin className="benefit-icon" />
        }
    ];

    const careItems = t('boatParking.careItems');
    const includedServices = Array.isArray(careItems) ? careItems : [
        "Specialized lifting & placement equipment",
        "Hull & bottom deformation protection",
        "Continuous condition monitoring",
        "Optional engine winterization",
        "Available electricity & water supply",
        "Regular ventilation of interiors",
        "Transportation and rinse after each use"
    ];

    return (
        <div className="boat-parking-page">
            {/* SEO Structured Hero Section */}
            <section className="bp-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>{t('boatParking.heroTitle')}</h1>
                        <p className="hero-subtitle">{t('boatParking.heroSubtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bp-benefits">
                <div className="container">
                    <div className="section-header">
                        <h2>{t('boatParking.whyTitle')} <br />{t('boatParking.whyTitleBr')}</h2>
                        <div className="title-underline"></div>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="benefit-card glass-morphism"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="icon-wrapper">
                                    {benefit.icon}
                                </div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Storage Formats Section */}
            <section className="bp-services">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>{t('boatParking.storageTitle')}</h2>
                        <p>{t('boatParking.storageSubtitle')}</p>
                    </div>
                    <div className="services-detailed-grid">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-detail-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="card-image-box">
                                    <img src={service.image} alt={service.title} />
                                    <div className="image-overlay-gradient"></div>
                                </div>
                                <div className="card-content-box">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <ul className="include-list">
                                        <li><CheckCircle size={16} /> {t('boatParking.fullyInsured')}</li>
                                        <li><CheckCircle size={16} /> {t('boatParking.techSupport')}</li>
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Included Services Section */}
            <section className="bp-included">
                <div className="container">
                    <div className="included-inner glass-morphism">
                        <div className="included-text">
                            <h2>{t('boatParking.careTitle')}</h2>
                            <p>{t('boatParking.careDesc')}</p>
                            <div className="included-grid">
                                {includedServices.map((item, index) => (
                                    <div key={index} className="included-item">
                                        <CheckCircle className="check-icon" size={20} />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="included-visual">
                            <img src={inclusiveCareImg} alt="Boat Maintenance" />
                            <div className="visual-badge">
                                <Anchor size={30} />
                                <span>{t('boatParking.expertCare')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Form Section */}
            <section id="booking" className="bp-booking">
                <div className="container">
                    <div className="booking-wrapper">
                        <div className="booking-info">
                            <h2>{t('boatParking.bookTitle')}</h2>
                            <p>{t('boatParking.bookDesc')}</p>
                            <div className="contact-quick">
                                <div className="quick-item">
                                    <Clock size={24} />
                                    <span>{t('boatParking.access247')}</span>
                                </div>
                                <div className="quick-item">
                                    <Camera size={24} />
                                    <span>{t('boatParking.monitoring247')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="booking-form-box glass-morphism">
                            <form className="bp-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>{t('boatParking.labelName')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t('boatParking.placeholderName')}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('boatParking.labelVessel')}</label>
                                    <input
                                        type="text"
                                        name="vessel"
                                        value={formData.vessel}
                                        onChange={handleChange}
                                        placeholder={t('boatParking.placeholderVessel')}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('boatParking.labelEmail')}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('boatParking.placeholderEmail')}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('boatParking.labelPhone')}</label>
                                        <PhoneInput
                                            country={'cy'}
                                            value={formData.phone}
                                            onChange={(phone) => setFormData({ ...formData, phone })}
                                            enableSearch={true}
                                            placeholder={t('boatParking.placeholderPhone')}
                                            containerClass="custom-phone-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('boatParking.labelDuration')}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder={t('boatParking.placeholderDuration')}
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn highlight-btn" disabled={sending}>
                                    {sending ? t('boatParking.sendingBtn') : t('boatParking.submitBtn')} <ArrowRight size={18} />
                                </button>
                                {sendSuccess && (
                                    <div className="form-feedback success" style={{ marginTop: '1rem', color: '#E0B253', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle size={16} /> {t('boatParking.successMsg')}
                                    </div>
                                )}
                                {sendError && (
                                    <div className="form-feedback error" style={{ marginTop: '1rem', color: '#ff4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AlertCircle size={16} /> {sendError}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BoatParkingPage;
