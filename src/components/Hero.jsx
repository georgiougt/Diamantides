import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-title"
                >
                    Exclusive Yachting Experiences <br />
                    <span className="hero-subtitle-text">from the Heart of the Mediterranean</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="hero-description"
                >
                    Discover the ultimate luxury on the crystal clear waters of Cyprus.
                    Unmatched service, premium fleet, and unforgettable memories.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="hero-actions"
                >
                    <a href="#fleet" className="btn btn-primary">
                        Discover Our Fleet <ArrowRight size={20} />
                    </a>
                    <a href="#contact" className="btn btn-secondary">
                        Contact Us
                    </a>
                </motion.div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
