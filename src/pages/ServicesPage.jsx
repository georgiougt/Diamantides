import { useEffect } from 'react';
import { updateSEO } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext.jsx';
import Services from '../components/Services';
import '../styles/PageHeader.css';

const ServicesPage = () => {
    const { t, currentLang } = useLanguage();

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO('Услуги Яхтенной Компании | Diamantides Yachting', 'Эксклюзивные услуги по управлению яхтами, чартеру, продаже и хранению катеров на Кипре.');
        } else {
            updateSEO('Yacht Services Cyprus | Diamantides Yachting', 'Exclusive yacht management, charter, sales, and boat storage services in Cyprus.');
        }
    }, [currentLang]);

    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>{t('servicesPage.title')}</h1>
                    <p>{t('servicesPage.subtitle')}</p>
                </div>
            </div>
            <Services />
        </main>
    );
};

export default ServicesPage;
