import { motion } from 'framer-motion';
import { Anchor, DollarSign, Wrench, Warehouse, GraduationCap, Utensils } from 'lucide-react';
import '../styles/Services.css';

const Services = () => {
    const services = [
        {
            icon: <Anchor size={40} />,
            title: 'Yacht Charter',
            description: 'Experience the freedom of the open sea with our exclusive fleet of luxury charter yachts.',
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop'
        },
        {
            icon: <DollarSign size={40} />,
            title: 'Sales & Brokerage',
            description: 'Expert guidance in buying or selling your vessel, with a wide network of international buyers.',
            image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe79b9eb?q=80&w=2070&auto=format&fit=crop'
        },
        {
            icon: <Wrench size={40} />,
            title: 'Management & Maintenance',
            description: 'Comprehensive technical support and management services to keep your yacht in pristine condition.',
            image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop'
        },
        {
            icon: <Warehouse size={40} />,
            title: 'Boat Parking & Storage',
            description: 'Secure and convenient storage solutions for your vessel in premium facilities.',
            image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop'
        },
        {
            icon: <GraduationCap size={40} />,
            title: 'Training Academy',
            description: 'Certified speedboat operator license training and navigation courses for all skill levels.',
            image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2070&auto=format&fit=crop'
        },
        {
            icon: <Utensils size={40} />,
            title: 'Luxury Add-ons',
            description: 'Bespoke catering, water sports equipment, and concierge services to elevate your journey.',
            image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
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
                                <a href="#contact" className="learn-more">Learn More →</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
