import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/Services.css';

const Services = () => {
    const { t, localizePath } = useLanguage();

    const services = [
        {
            id: 'sales-brokerage',
            title: t('nav.sales'),
            description: t('servicesSection.salesDesc'),
            image: '/assets/services/sales-brokerage.png',
            link: '/sales'
        },
        {
            id: 'management-maintenance',
            title: t('nav.management'),
            description: t('servicesSection.mgmtDesc'),
            image: '/assets/services/management-maintenance.png',
            link: '/services/yacht-management'
        },
        {
            id: 'boat-parking',
            title: t('nav.parking'),
            description: t('servicesSection.parkingDesc'),
            image: '/assets/services/parking-hangar.png',
            link: '/services/boat-parking'
        },
        {
            id: 'training-academy',
            title: t('nav.training'),
            description: t('servicesSection.trainingDesc'),
            image: '/assets/services/training-academy.png',
            link: '/training-academy'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">{t('servicesSection.title')}</h2>
                    <p className="section-subtitle">{t('servicesSection.subtitle')}</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            id={service.id}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="service-image-container">
                                <img src={service.image} alt={service.title} className="service-image" />
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to={localizePath(service.link)} className="learn-more">{t('common.learnMore')} →</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
