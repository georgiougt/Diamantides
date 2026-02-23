import { motion } from 'framer-motion';
import { Star, Shield, Heart, Map } from 'lucide-react';
import '../styles/WhyCharter.css';

const WhyCharter = () => {
    const benefits = [
        {
            icon: <Shield size={32} />,
            title: 'Safety First',
            description: 'Your safety is our priority. All our vessels are maintained to the highest standards and operated by certified crew.'
        },
        {
            icon: <Heart size={32} />,
            title: 'Personalized Service',
            description: 'We tailor every aspect of your journey to your preferences, ensuring a truly bespoke experience.'
        },
        {
            icon: <Map size={32} />,
            title: 'Exclusive Routes',
            description: 'Access hidden gems and secluded bays around Cyprus that only the locals know about.'
        }
    ];

    return (
        <section className="why-charter-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Why Choose Diamantides</h2>
                    <p className="section-subtitle">More than just a boat rental, we offer an unforgettable lifestyle experience.</p>
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
                            "An absolutely magical experience. The crew was professional, the yacht was stunning, and the sunset cruise was the highlight of our vacation in Cyprus."
                        </p>
                        <p className="testimonial-author">- Elena & Marc, Switzerland</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyCharter;
