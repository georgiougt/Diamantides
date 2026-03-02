import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Ship, FileCheck, CheckCircle, MapPin, GraduationCap } from 'lucide-react';
import '../styles/TrainingAcademy.css';

const TrainingAcademyPage = () => {
    // Basic SEO handling without react-helmet
    useEffect(() => {
        document.title = "Speedboat Operator License Cyprus | Diamantides Yachting Training Academy";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Obtain your speedboat operator license in Cyprus with Diamantides Yachting. Official training, exam prep, and certification. Start your yachting journey today.');
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Obtain your speedboat operator license in Cyprus with Diamantides Yachting. Official training, exam prep, and certification. Start your yachting journey today.";
            document.head.appendChild(meta);
        }
        window.scrollTo(0, 0); // Scroll to top on load
    }, []);

    // SEO structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Speedboat Operator License Training",
        "description": "Comprehensive theoretical and practical training for the official Cyprus Speedboat Operator License. Includes exam preparation and documentation handling.",
        "provider": {
            "@type": "Organization",
            "name": "Diamantides Yachting",
            "sameAs": "https://www.diamantidesyachting.com"
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
                        <span className="academy-badge">Official Certification</span>
                        <h1 className="academy-title">Speedboat Operator's License</h1>
                        <p className="academy-subtitle">
                            Dreaming of piloting a speedboat through the picturesque waters of Cyprus?
                            Obtain your official license, open up a sea of possibilities, and set sail with confidence.
                        </p>
                        <a href="#enroll" className="academy-cta-button">Enroll Now</a>
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
                        <h2>A Step Toward Freedom on the Water</h2>
                        <p>
                            Want to feel confident at the helm, knowing you’re fully licensed and legally allowed to operate a vessel?
                            At Diamantides Yachting, you can not only complete the required training but also take the exam and be ready to set sail the very next day.
                        </p>
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
                            <h3>What can you do with this license?</h3>
                            <ul className="academy-list">
                                <li><CheckCircle size={20} className="icon-gold" /> Rent a boat and explore the coastline of Cyprus on your own.</li>
                                <li><CheckCircle size={20} className="icon-gold" /> Own a vessel and operate it in international waters.</li>
                                <li><CheckCircle size={20} className="icon-gold" /> Ensure the safety of passengers during leisure trips.</li>
                                <li><CheckCircle size={20} className="icon-gold" /> Work in the yachting industry or start a water tour service.</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="academy-content-card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3>Who Is This License For?</h3>
                            <ul className="academy-list">
                                <li><Compass size={20} className="icon-gold" /> <strong>Cyprus residents</strong> wishing to use boats for personal or commercial purposes.</li>
                                <li><Compass size={20} className="icon-gold" /> <strong>Tourists</strong> renting boats during their vacation.</li>
                                <li><Compass size={20} className="icon-gold" /> <strong>Motorboat owners</strong> planning independent operation.</li>
                                <li><Compass size={20} className="icon-gold" /> <strong>Yacht charter clients</strong> needing legal and practical training.</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </article>

            {/* The Process Section */}
            <section className="academy-process">
                <div className="academy-container">
                    <div className="section-header text-center">
                        <h2>How Does the Training Work?</h2>
                        <p className="section-subtitle">A convenient and transparent process from basic theory to your official license.</p>
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
                                <h3>Theoretical Lessons: Knowledge & Safety</h3>
                                <p>Learn marine terminology, international signals, map symbols, GPS navigation, maritime law, and emergency response. Our comfortable environment offers materials in English, Greek, and Russian.</p>
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
                                <h3>On-Water Practice: Confidence at the Helm</h3>
                                <p>Move to an actual boat to learn starting procedures, harbor maneuvering, safe docking, navigation via visual markers, and evaluating real-time weather conditions alongside expert instructors.</p>
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
                                <h3>The Exam: Proving Your Skills</h3>
                                <p>Administered by officially accredited examiners. Features a written test on rules and signals, and a practical water test. Pass to receive your license covering Cyprus and recognized in EU countries.</p>
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
                            <h3>Required Documents</h3>
                            <p>We handle the registration, documentation, and license issuance. You just need to provide:</p>
                            <ul className="docs-list">
                                <li><FileCheck size={24} /> A passport or ID (must be at least 18 years old)</li>
                                <li><FileCheck size={24} /> Two passport-size photographs</li>
                                <li><FileCheck size={24} /> A medical certificate (if required)</li>
                                <li><FileCheck size={24} /> A completed course application form</li>
                            </ul>
                        </motion.div>

                        <div className="benefits-wrapper">
                            <h3 className="mb-2">Why Choose Diamantides Yachting?</h3>
                            <div className="benefits-list">
                                <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                    <GraduationCap className="icon-gold" size={32} />
                                    <div>
                                        <h4>Licensed Instructors</h4>
                                        <p>Seasoned marine professionals offering real-world insights.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}>
                                    <Ship className="icon-gold" size={32} />
                                    <div>
                                        <h4>Modern Speedboats</h4>
                                        <p>Train on safe, up-to-date speedboats exactly like what you'll operate.</p>
                                    </div>
                                </motion.div>
                                <motion.div className="benefit-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
                                    <MapPin className="icon-gold" size={32} />
                                    <div>
                                        <h4>Scenic Coastal Location</h4>
                                        <p>Training from our Limassol base is beautiful and inspiring.</p>
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
                        <h2>Ready to Get Your License?</h2>
                        <p className="cta-subtitle">
                            Take the first step today. Discover Cyprus from a new perspective — at the helm of your own boat.
                            We offer flexible scheduling, including weekend classes.
                        </p>

                        <div className="cta-contact-box">
                            <p>For further information, pricing, and available course dates, please contact us:</p>
                            <a href="mailto:administration@diamantidesyachting.com" className="email-link">administration@diamantidesyachting.com</a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default TrainingAcademyPage;
