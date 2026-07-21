import { updateSEO } from '../utils/seo';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/NotFound.css';

const NotFoundPage = () => {
    const { t, localizePath, currentLang } = useLanguage();

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Страница не найдена | Diamantides Yachting', 'Запрашиваемая страница не существует. Вернитесь на главную страницу Diamantides Yachting или свяжитесь с нашей командой.');
        } else {
            updateSEO('Page Not Found | Diamantides Yachting', 'The page you are looking for does not exist. Return to Diamantides Yachting home page or contact our team.');
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    return (
        <div className="not-found-page">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="not-found-card"
                >
                    <div className="compass-icon-wrapper">
                        <Compass className="spinning-compass" size={80} />
                    </div>
                    <h1 className="not-found-title">{t('notFound.title')}</h1>
                    <h2 className="not-found-subtitle">{t('notFound.subtitle')}</h2>
                    <p className="not-found-description">
                        {t('notFound.desc')}
                    </p>
                    <div className="not-found-actions">
                        <Link to={localizePath('/')} className="btn btn-primary btn-not-found">
                            <Home size={20} /> {t('notFound.action')}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
