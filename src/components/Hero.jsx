import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAssetPath } from '../utils/navigation.js';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Hero.css';
import RollingBanner from './RollingBanner';

const Hero = () => {
    const { t } = useLanguage();
    return (
        <section id="hero" className="hero-section">
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                poster={getAssetPath('/assets/Yacht_Drone_poster.webp')}
            >
                <source src={getAssetPath('/assets/Yacht_Drone_hero-clip-small.mp4')} type="video/mp4" />
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-title"
                >
                    {t('hero.title')} <br />
                    <span className="hero-subtitle-text">{t('hero.subtitle')}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="hero-description"
                >
                    {t('hero.desc')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="hero-actions"
                >
                    <a href="#fleet" className="btn btn-primary">
                        {t('hero.discover')} <ArrowRight size={20} />
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        {t('hero.contact')}
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <RollingBanner />
                </motion.div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
