import { motion } from 'framer-motion';
import { DollarSign, Wrench, Warehouse, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
    const services = [
        {
            id: 'sales-brokerage',
            title: 'Sales & Brokerage',
            description: 'Expert guidance in buying or selling your vessel, with a wide network of international buyers.',
            image: '/Diamantides/assets/services/sales-brokerage.png',
            link: '/sales'
        },
        {
            id: 'management-maintenance',
            title: 'Management & Maintenance',
            description: 'Comprehensive technical support and management services to keep your yacht in pristine condition.',
            image: '/Diamantides/assets/services/management-maintenance.png',
            link: '/services/yacht-management'
        },
        {
            id: 'boat-parking',
            title: 'Boat Parking & Storage',
            description: 'Secure and convenient storage solutions for your vessel in premium facilities.',
            image: '/Diamantides/assets/services/parking-hangar.png',
            link: '/services/boat-parking'
        },
        {
            id: 'training-academy',
            title: 'Speed Boat Training',
            description: 'Certified speedboat operator license training and navigation courses for all skill levels.',
            image: '/Diamantides/assets/services/training-academy.png',
            link: '/training-academy'
        }
    ];

    return (
        <section id="services" className="services-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Our Expertise</h2>
                    <p className="section-subtitle">Comprehensive solutions for every aspect of yachting life.</p>
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
                                <Link to={service.link} className="learn-more">Learn More →</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
