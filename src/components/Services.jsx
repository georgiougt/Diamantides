import { motion } from 'framer-motion';
import { DollarSign, Wrench, Warehouse, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
    const services = [
        {
            id: 'sales-brokerage',
            icon: <DollarSign size={40} />,
            title: 'Sales & Brokerage',
            description: 'Expert guidance in buying or selling your vessel, with a wide network of international buyers.',
            image: 'https://placehold.co/600x400/1a1a1a/e8c27a?text=Sales+%26+Brokerage',
            link: '/sales'
        },
        {
            id: 'management-maintenance',
            icon: <Wrench size={40} />,
            title: 'Management & Maintenance',
            description: 'Comprehensive technical support and management services to keep your yacht in pristine condition.',
            image: 'https://placehold.co/600x400/1a1a1a/e8c27a?text=Management+%26+Maintenance'
        },
        {
            id: 'boat-parking',
            icon: <Warehouse size={40} />,
            title: 'Boat Parking & Storage',
            description: 'Secure and convenient storage solutions for your vessel in premium facilities.',
            image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop'
        },
        {
            id: 'training-academy',
            icon: <GraduationCap size={40} />,
            title: 'Training Academy',
            description: 'Certified speedboat operator license training and navigation courses for all skill levels.',
            image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2070&auto=format&fit=crop',
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
                                <div className="service-icon-overlay">
                                    {service.icon}
                                </div>
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                {service.link ? (
                                    <Link to={service.link} className="learn-more">Learn More →</Link>
                                ) : (
                                    <a href={`/services#${service.id}`} className="learn-more">Learn More →</a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
