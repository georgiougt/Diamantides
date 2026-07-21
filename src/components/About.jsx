import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import '../styles/About.css';
import companyLogo from '../assets/company-logo.png';

const About = () => {
    const { t } = useLanguage();
    const [CountUpComponent, setCountUpComponent] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Dynamically import react-countup on the client side only after mount
        import('react-countup')
            .then((module) => {
                setCountUpComponent(() => module.default);
            })
            .catch((err) => console.error('Failed to load react-countup:', err));
    }, []);

    const stats = [
        { value: 6, suffix: '+', label: t('aboutSection.markets') },
        { value: 250, suffix: '+', label: t('aboutSection.clients') },
        { value: 15, suffix: '+', label: t('aboutSection.specialists') },
        { value: 20, suffix: '+', label: t('aboutSection.experience') },
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
                    <img src={companyLogo} alt="Diamantides Yachting Logo - Professional Marine Services Cyprus" className="about-company-logo" />
                    <p className="company-motto">{t('nav.motto')}</p>
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
                                    {mounted && CountUpComponent ? (
                                        <CountUpComponent
                                            end={stat.value}
                                            duration={3}
                                            suffix={stat.suffix}
                                            enableScrollSpy={true}
                                            scrollSpyOnce={true}
                                        />
                                    ) : (
                                        <span>{stat.value}{stat.suffix}</span>
                                    )}
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
