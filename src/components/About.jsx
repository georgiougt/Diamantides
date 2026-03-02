import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import '../styles/About.css';
import companyLogo from '../assets/company-logo.png';

const About = () => {
    const stats = [
        { value: 6, suffix: '+', label: 'international markets' },
        { value: 250, suffix: '+', label: 'active clients' },
        { value: 15, suffix: '+', label: 'specialists' },
        { value: 20, suffix: '+', label: 'years of experience' },
    ];

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <img src={companyLogo} alt="Diamantides Yachting" className="about-company-logo" />
                    <p className="company-motto">All about Yachting</p>
                </motion.div>

                <div className="stats-divider"></div>

                <div className="stats-horizontal-bar">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item-wrapper">
                            <motion.div
                                className="stat-item-content"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <p className="stat-label-new">{stat.label}</p>
                                <h3 className="stat-value-new">
                                    <CountUp
                                        end={stat.value}
                                        duration={3}
                                        suffix={stat.suffix}
                                        enableScrollSpy={true}
                                        scrollSpyOnce={true}
                                    />
                                </h3>
                            </motion.div>
                            {/* Add a vertical divider except for the last item */}
                            {index < stats.length - 1 && <div className="stat-vertical-divider"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
