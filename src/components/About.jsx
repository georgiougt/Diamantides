import { motion } from 'framer-motion';
import { Award, Users, Anchor, Globe } from 'lucide-react';
import '../styles/About.css';

const About = () => {
    const stats = [
        { icon: <Award size={32} />, value: '20+', label: 'Years Experience' },
        { icon: <Users size={32} />, value: '500+', label: 'Happy Clients' },
        { icon: <Anchor size={32} />, value: '50+', label: 'Yachts Managed' },
        { icon: <Globe size={32} />, value: 'Global', label: 'Reach' },
    ];

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">A Legacy of Excellence</h2>
                    <p className="about-text">
                        Diamantides Yachting has been a cornerstone of the Cyprus maritime industry for over two decades.
                        Based in the prestigious Limassol Marina, we specialize in providing bespoke yachting solutions
                        tailored to the unique needs of our discerning clientele.
                    </p>
                    <p className="about-text">
                        Our mission is simple: to deliver the ultimate yachting experience through unwavering dedication to
                        quality, safety, and personalized service. Whether you are looking to charter, buy, or manage a yacht,
                        our team of experts is here to guide you every step of the way.
                    </p>
                </motion.div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
