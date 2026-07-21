import { updateSEO } from '../utils/seo';
import React, { useEffect, useState } from 'react';
import '../styles/NauticClean.css';
import logo from '../assets/logos/logo-nauticclean.png';
import { nauticCleanProducts } from '../data/nautic_clean';
import { useLanguage } from '../context/LanguageContext';

const NauticCleanPage = () => {
    const { t, currentLang } = useLanguage();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Средства по Уходу за Судном Nautic Clean | Diamantides Yachting', 'Официальный дистрибьютор средств Nautic Clean для чистки и обслуживания судов на Кипре. Премиальные формулы для ухода за тиком, гелькоутом и сталью.');
        } else {
            updateSEO('Nautic Clean Marine Care Products | Diamantides Yachting', 'Official distributor of Nautic Clean marine cleaning and maintenance products in Cyprus. Premium formulas for teak, gelcoat, and steel care.');
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    // Helper to format newlines to paragraphs
    const formatDescription = (text) => {
        if (!text) return null;
        return text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="modal-description-paragraph">{paragraph}</p>
        ));
    };

    return (
        <div className="nautic-clean-page">
            <section className="nc-hero">
                <div className="container">
                    <img src={logo} alt="Nautic Clean" className="nc-hero-logo" />
                    <h1 className="hero-title">{t('nauticClean.heroTitle')}</h1>
                    <p className="hero-subtitle">{t('nauticClean.heroSubtitle')}</p>
                </div>
            </section>

            <section className="nc-intro">
                <div className="container">
                    <div className="intro-content glass-morphism">
                        <h2>{t('nauticClean.whyTitle')}</h2>
                        <p>
                            {t('nauticClean.whyText')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="nc-categories nc-products">
                <div className="container">
                    <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2.5rem', background: 'var(--gradient-metallic-gold)', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('nauticClean.collectionTitle')}</h2>
                        <p style={{ color: '#aaa' }}>{t('nauticClean.collectionSubtitle')}</p>
                    </div>
                    <div className="products-grid">
                        {nauticCleanProducts.map((product) => (
                            <div 
                                key={product.id} 
                                className="product-card glass-morphism clickable-card"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <div className="product-image-box">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="product-info">
                                    <h3>{product.title}</h3>
                                    <span className="view-details-btn">{t('nauticClean.viewDetails')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Details Modal */}
            {selectedProduct && (
                <div className="nc-modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="nc-modal-content glass-morphism" onClick={e => e.stopPropagation()}>
                        <button className="nc-modal-close" onClick={() => setSelectedProduct(null)}>×</button>
                        
                        <div className="nc-modal-grid">
                            <div className="nc-modal-visuals">
                                <div className="nc-modal-image">
                                    <img src={selectedProduct.image} alt={selectedProduct.title} />
                                </div>
                                {selectedProduct.youtube && (
                                    <div className="nc-modal-video">
                                        <iframe 
                                            src={selectedProduct.youtube} 
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                            
                            <div className="nc-modal-details">
                                <h2 className="nc-modal-title">{selectedProduct.title}</h2>
                                <div className="nc-modal-scrollable-text">
                                    {formatDescription(selectedProduct.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NauticCleanPage;
