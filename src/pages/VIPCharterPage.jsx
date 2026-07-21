import { updateSEO } from '../utils/seo';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Users, Ruler, Send, Star, Phone, Mail, MessageCircle, Clock, CheckCircle, AlertCircle, Volume2, VolumeX, X, FileText } from 'lucide-react';
import { useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { yachts } from '../data/yachts';
import { getYachtPath } from '../utils/navigation';
import { useLanguage } from '../context/LanguageContext';
import '../styles/CharterYachts.css'; // Reusing the high-end styles
import vipVideo from '../assets/vip_hero.mp4';

const VIPCharterPage = () => {
    const { t, localizePath, currentLang } = useLanguage();
    const charterYachts = yachts
        .filter(y => 
            (y.category === 'charter' || !y.category) && 
            y.name !== 'Private Yacht 110ft' && 
            y.name !== 'Azimut 27 Grande' &&
            y.name !== 'Princess 62' &&
            y.name !== 'Princess 30M'
        )
        .sort((a, b) => {
            const order = [3, 14, 6, 4, 9, 12, 7, 5, 15, 10, 8, 23, 24, 11];
            return order.indexOf(a.id) - order.indexOf(b.id);
        });

    const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Start false, update on successful play
    const audioRef = useRef(null);

    // High-quality royalty-free seaside ambience (waves and birds)
    const audioUrl = "https://cdn.pixabay.com/audio/2021/08/03/audio_d9d49e5f71.mp3"; 

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('VIP-Членство на Аренду Яхт | Diamantides Yachting', 'Доступ к эксклюзивным чартерам только для членов клуба, частным VIP-мероприятиям, приоритетному бронированию и услугам консьержа на Кипре.');
        } else {
            updateSEO('VIP Yacht Charter Membership | Diamantides Yachting', 'Access exclusive members-only yacht charters, private VIP events, priority booking, and luxury concierge services in Cyprus.');
        }
        // Initialize audio
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Auto-play attempt
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => setIsAudioPlaying(true))
                    .catch(err => {
                        console.log("Autoplay blocked by browser. Sound will start on first interaction or toggle.", err);
                        // Optional: listen for first click to start if blocked
                        const startOnInteraction = () => {
                            if (audioRef.current && !isAudioPlaying) {
                                audioRef.current.play().then(() => setIsAudioPlaying(true));
                            }
                            window.removeEventListener('click', startOnInteraction);
                        };
                        window.addEventListener('click', startOnInteraction);
                    });
            }
        };

        playAudio();

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        
        if (isAudioPlaying) {
            audioRef.current.pause();
        } else {
            // Browsers may block this if no user interaction has occurred
            // but since this is a button click, it will work perfectly.
            audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
        }
        setIsAudioPlaying(!isAudioPlaying);
    };

    const [isTermsOpen, setIsTermsOpen] = useState(false);

    const termsContent = t('vip.termsList');

    const [formData, setFormData] = useState({
        name: '',
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
            to_email: 'charter@diamantidesyachting.com',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            category: 'VIP Membership Request (Priority)'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
            );
            setSendSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError(t('vip.errorMsg'));
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <main className="charter-page vip-page">
            {/* Immersive Hero Section */}
            <section className="charter-hero" style={{ backgroundImage: 'none', backgroundColor: '#000' }}>
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
                >
                    <source src={vipVideo} type="video/mp4" />
                </video>
                <div className="charter-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3))', zIndex: 1 }}></div>
                <div className="charter-hero-content" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Logo/Header spacing can be adjusted here if needed */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 300, letterSpacing: '-1px' }}
                    >
                        {t('vip.heroTitle')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        {t('vip.heroSubtitle')}
                    </motion.p>
                    <motion.button 
                        className="hero-terms-link"
                        onClick={() => setIsTermsOpen(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <FileText size={14} /> {t('vip.termsBtn')}
                    </motion.button>
                </div>
            </section>

            {/* Asymmetrical Masonry Grid */}
            <section className="charter-fleet-section">
                <div className="charter-grid">
                    {charterYachts.map((yacht, index) => (
                        <motion.div
                            key={yacht.id}
                            className={`charter-card ${index % 3 === 0 ? 'large-card' : 'standard-card'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={localizePath(getYachtPath(yacht))} className="charter-card-link">
                                <div className="charter-img-wrapper">
                                    <img src={yacht.image || yacht.gallery?.[0]} alt={yacht.name} />
                                    {/* Exclusive Badge */}
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--gradient-metallic-gold)', color: 'var(--color-primary)', padding: '6px 20px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {t('vip.badge')}
                                    </div>
                                </div>
                                <div className="charter-glass-panel">
                                    <div className="glass-header">
                                        <h2>{yacht.name}</h2>
                                        <p className="fleet-type" style={{ margin: 0, fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '1px' }}>{yacht.type || t('vip.luxuryMotorYacht')}</p>
                                    </div>
                                    <div className="glass-specs">
                                        <span className="spec-item"><Ruler size={14} /> {yacht.length || 'N/A'}</span>
                                    </div>

                                    {(() => {
                                        if (yacht.detailedPricing) {
                                            return (
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                    {yacht.detailedPricing.twoHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.twoHours')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.twoHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.threeHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.threeHours')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.threeHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.fourHours && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.fourHours')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.fourHours}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.halfDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.halfDay')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.halfDay}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.fullDay && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.fullDay')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.fullDay}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.overnight && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.overnight')}</span>
                                                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.detailedPricing.overnight}</span>
                                                        </div>
                                                    )}
                                                    {yacht.detailedPricing.weekly && (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                                <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.charterRate')}</span>
                                                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{yacht.price}</span>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        const halfDayOriginal = `€${(basePrice * 0.9).toLocaleString()}`;
                                        const fullDayOriginal = yacht.price.includes('€') ? yacht.price.split(' ')[0] : `€${basePrice.toLocaleString()}`;
                                        const overnightOriginal = `€${(basePrice * 1.2).toLocaleString()}`;

                                        return (
                                            <div className="fleet-pricing-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.halfDay')}</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{halfDayOriginal}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.fullDay')}</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{fullDayOriginal}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('fleetSection.overnight')}</span>
                                                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{overnightOriginal}</span>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <span className="glass-cta" style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>{t('vip.secureCta')}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Immersive Bespoke Contact Form Banner */}
            <motion.section
                className="charter-cta-banner"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ borderTop: '2px solid rgba(224, 178, 83, 0.4)' }}
            >
                <div className="cta-banner-content">
                    {/* Space for the removed star icon */}
                    <h2 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '3.5rem', marginBottom: '1.5rem' }}>{t('vip.contactTitle')}</h2>
                    <p>{t('vip.contactSubtitle')}</p>

                    <form className="charter-contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('vip.placeholderName')}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('vip.placeholderEmail')}
                                required
                            />
                        </div>
                        <PhoneInput
                            country={'cy'}
                            value={formData.phone}
                            onChange={(phone) => setFormData({ ...formData, phone })}
                            enableSearch={true}
                            placeholder={t('vip.placeholderPhone')}
                            containerClass="custom-phone-input"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t('vip.placeholderMessage')}
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="btn-bespoke" disabled={sending}>
                            {sending ? t('vip.sendingBtn') : t('vip.submitBtn')} <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                        {sendSuccess && (
                            <div className="form-feedback success" style={{ marginTop: '1rem', color: '#E0B253' }}>
                                <CheckCircle size={16} style={{ marginRight: '8px' }} /> {t('vip.successMsg')}
                            </div>
                        )}
                        {sendError && (
                            <div className="form-feedback error" style={{ marginTop: '1rem', color: '#ff4444' }}>
                                <AlertCircle size={16} style={{ marginRight: '8px' }} /> {sendError}
                            </div>
                        )}
                    </form>

                    <div className="charter-contact-info">
                        <div className="charter-contact-grid">
                            <div className="charter-info-item">
                                <h3 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('vip.callDirectly')}</h3>
                                <a href="tel:+35725010561" style={{ fontSize: '1.2rem', fontWeight: 500 }}>+357 25 010 561</a>
                            </div>
                            <div className="charter-info-item">
                                <h3 style={{ background: 'var(--gradient-metallic-gold)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('vip.emailUs')}</h3>
                                <a href="mailto:charter@diamantidesyachting.com" style={{ fontSize: '1.2rem', fontWeight: 500 }}>charter@diamantidesyachting.com</a>
                            </div>
                        </div>

                        <div className="charter-whatsapp-container" style={{ borderColor: 'rgba(224, 178, 83, 0.3)', background: 'rgba(224, 178, 83, 0.03)' }}>
                            <MessageCircle size={24} color="#E0B253" />
                            <span style={{ fontSize: '1rem' }}>{t('vip.whatsapp')}</span>
                            <a href="https://wa.me/35796340400" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.2rem' }}>
                                +357 96 340 400
                            </a>
                        </div>
                    </div>
                </div>
            </motion.section>
            {/* Premium Soundscape Toggle */}
            <motion.button
                className={`audio-toggle ${isAudioPlaying ? 'playing' : ''}`}
                onClick={toggleAudio}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                title={isAudioPlaying ? t('vip.muteTitle') : t('vip.unmuteTitle')}
            >
                <div className="audio-icon-wrapper">
                    {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </div>
                <span className="audio-label">{isAudioPlaying ? t('vip.ambienceOn') : t('vip.ambienceOff')}</span>
                {isAudioPlaying && (
                    <div className="audio-visualizer">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                )}
            </motion.button>

            {/* VIP Terms & Conditions Modal */}
            <AnimatePresence>
                {isTermsOpen && (
                    <div className="terms-modal-overlay">
                        <motion.div 
                            className="terms-modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button className="close-modal" onClick={() => setIsTermsOpen(false)}>
                                <X size={24} />
                            </button>
                            
                            <div className="modal-header">
                                <FileText size={32} className="header-icon" />
                                <h2>{t('vip.termsTitle')}</h2>
                                <div className="header-line"></div>
                            </div>
                            
                            <div className="modal-body">
                                <ul className="vip-terms-list">
                                    {termsContent.map((term, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                        >
                                            <div className="term-number">{(index + 1).toString().padStart(2, '0')}</div>
                                            <p>{term}</p>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="modal-footer">
                                <button className="btn-close-footer" onClick={() => setIsTermsOpen(false)}>{t('vip.backToPage')}</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main >
    );
};

export default VIPCharterPage;
