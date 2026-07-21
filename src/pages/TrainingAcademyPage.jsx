import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Ship, FileCheck, CheckCircle, MapPin, GraduationCap, BookAIcon, Book } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/TrainingAcademy.css';

const TrainingAcademyPage = () => {
    const { t, currentLang } = useLanguage();

    useEffect(() => {
        if (currentLang === 'ru') {
            document.title = "Обучение Судовождению Кипр | Diamantides Yachting";
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Получите права на управление скоростным катером на Кипре с Diamantides Yachting. Официальное обучение, подготовка к экзамену и сертификация.');
            }
        } else {
            document.title = "Speed Boat Training Cyprus | Diamantides Yachting";
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', 'Obtain your speedboat operator license in Cyprus with Diamantides Yachting. Official training, exam prep, and certification. Start your yachting journey today.');
            } else {
                const meta = document.createElement('meta');
                meta.name = "description";
                meta.content = "Obtain your speedboat operator license in Cyprus with Diamantides Yachting. Official training, exam prep, and certification. Start your yachting journey today.";
                document.head.appendChild(meta);
            }
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    // SEO structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Speedboat Operator License Training",
        "description": "Comprehensive theoretical and practical training for the official Cyprus Speedboat Operator License. Includes exam preparation and documentation handling.",
        "provider": {
            "@type": "Organization",
            "name": "Diamantides Yachting",
            "sameAs": "https://diamantidesyachting.com"
        },
        "offers": {
            "@type": "Offer",
            "price": "350",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://diamantidesyachting.com/training-academy/"
        },
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "InPerson",
            "courseLocation": {
                "@type": "Place",
                "name": "Limassol Marina Base",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Limassol",
                    "addressCountry": "CY"
                }
            }
        }
    };

    return (
        <main className="academy-wrapper">
            {/* Inject JSON-LD structured data for SEO */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            {/* Hero Section */}
            <section className="academy-hero">
                <div className="academy-hero-overlay"></div>
                <div className="academy-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="academy-badge">{t('training.badge')}</span>
                        <h1 className="academy-title">{t('training.heroTitle')}</h1>
                        <p className="academy-subtitle">{t('training.heroSubtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Article */}
            <article className="academy-article">
                <div className="academy-container">
                    <motion.div
                        className="academy-intro-text"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2>{t('training.introTitle')}</h2>
                        <p>{t('training.introDesc')}</p>
                    </motion.div>

                    {/* Who Is This For - Grid */}
                    <div className="academy-grid two-cols mt-4">
                        <motion.div
                            className="academy-content-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('training.whatCanTitle')}</h3>
                            <ul className="academy-list">
                                <li><CheckCircle size={20} className="icon-gold" /> {t('training.whatCan1')}</li>
                                <li><CheckCircle size={20} className="icon-gold" /> {t('training.whatCan2')}</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="academy-content-card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('training.whoTitle')}</h3>
                            <ul className="academy-list">
                                <li><Compass size={20} className="icon-gold" /> <strong>{t('training.who1Label')}</strong> {t('training.who1Desc')}</li>
                                <li><Compass size={20} className="icon-gold" /> <strong>{t('training.who2Label')} </strong> {t('training.who2Desc')}</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </article>

            {/* The Process Section */}
            <section className="academy-process">
                <div className="academy-container">
                    <div className="section-header text-center">
                        <h2>{t('training.processTitle')}</h2>
                        <p className="section-subtitle">{t('training.processSubtitle')}</p>
                    </div>

                    <div className="process-timeline">
                        <motion.div
                            className="process-step"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>{t('training.step1Title')}</h3>
                                <p>{t('training.step1Desc')}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="process-step"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>{t('training.step2Title')}</h3>
                                <p>{t('training.step2Desc')}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="process-step"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>{t('training.step3Title')}</h3>
                                <p>{t('training.step3Desc')}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us & Requirements */}
            <section className="academy-details">
                <div className="academy-container">
                    <div className="academy-grid two-cols">

                        <motion.div
                            className="details-panel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3>{t('training.docsTitle')}</h3>
                            <p>{t('training.docsSubtitle')}</p>
                            <ul className="docs-list">
                                <li><FileCheck size={24} /> {t('training.doc1')}</li>
                                <li><FileCheck size={24} /> {t('training.doc2')}</li>
                                <li><FileCheck size={24} /> {t('training.doc3')}</li>
                                <li><FileCheck size={24} /> {t('training.doc4')}</li>
                            </ul>
                        </motion.div>

                        <div className="benefits-wrapper">
                            <h3 className="mb-2">{t('training.whyChooseTitle')}</h3>
                            <div className="benefits-list">
                                    <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                                    <Ship className="icon-gold" size={32} />
                                    <div>
                                        <h4>{t('training.benefit1Title')}</h4>
                                        <p>{t('training.benefit1Desc')}</p>
                                    </div>
                                </motion.div>
                                <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                                    <MapPin className="icon-gold" size={32} />
                                    <div>
                                        <h4>{t('training.benefit2Title')}</h4>
                                        <p>{t('training.benefit2Desc')}</p>
                                    </div>
                                </motion.div>
                                <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                                    <Book className="icon-gold" size={32} />
                                    <div>
                                        <h4>{t('training.benefit3Title')}</h4>
                                        <p>{t('training.benefit3Desc')}</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="enroll" className="academy-cta-section">
                <div className="academy-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2>{t('training.ctaTitle')}</h2>
                        <p className="cta-subtitle">{t('training.ctaSubtitle')}</p>

                        <div className="cta-contact-box">
                            <p>{t('training.ctaContact')}</p>
                            <a href="mailto:administration@diamantidesyachting.com" className="email-link">administration@diamantidesyachting.com</a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default TrainingAcademyPage;
