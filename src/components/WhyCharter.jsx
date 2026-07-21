import { motion } from 'framer-motion';
import { Star, Shield, Heart, Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/WhyCharter.css';

const WhyCharter = () => {
    const { t } = useLanguage();
    const benefits = [
        {
            icon: <Shield size={32} />,
            title: t('whyCharter.benefit1Title'),
            description: t('whyCharter.benefit1Desc')
        },
        {
            icon: <Heart size={32} />,
            title: t('whyCharter.benefit2Title'),
            description: t('whyCharter.benefit2Desc')
        },
        {
            icon: <Map size={32} />,
            title: t('whyCharter.benefit3Title'),
            description: t('whyCharter.benefit3Desc')
        }
    ];

    return (
        <section className="why-charter-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t('whyCharter.title')}</h2>
                    <p className="section-subtitle">{t('whyCharter.subtitle')}</p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="benefit-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="testimonial-container">
                    <div className="testimonial-card">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#d4af37" color="#d4af37" />)}
                        </div>
                        <p className="testimonial-text">
                            {t('whyCharter.testimonialText')}
                        </p>
                        <p className="testimonial-author">{t('whyCharter.testimonialAuthor')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyCharter;
