import { useEffect } from 'react';
import { updateSEO } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext.jsx';
import Contact from '../components/Contact';
import '../styles/PageHeader.css';

const ContactPage = () => {
    const { t, currentLang } = useLanguage();

    useEffect(() => {
        const localBusinessSchema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Diamantides Yachting",
            "image": "https://diamantidesyachting.com/assets/images/about_hero.webp",
            "@id": "https://diamantidesyachting.com/#localbusiness",
            "url": "https://diamantidesyachting.com",
            "telephone": "+35725010561",
            "email": "administration@diamantidesyachting.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Limassol Marina",
                "addressLocality": "Limassol",
                "postalCode": "3601",
                "addressCountry": "CY"
            }
        };

        if (currentLang === 'ru') {
            updateSEO(
                'Контакты | Diamantides Yachting',
                'Свяжитесь с нашей командой в Лимассол Марине для бронирования яхт, запросов по продаже, парковке катеров и профессиональных консультаций.',
                localBusinessSchema
            );
        } else {
            updateSEO(
                'Contact Our Yacht Specialists | Diamantides Yachting',
                'Get in touch with our team at Limassol Marina for yacht bookings, sales inquiries, boat parking reservations, and professional consulting.',
                localBusinessSchema
            );
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>{t('contactPage.title')}</h1>
                    <p>{t('contactPage.subtitle')}</p>
                </div>
            </div>
            <Contact />
        </main>
    );
};

export default ContactPage;
