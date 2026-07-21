import { updateSEO } from '../utils/seo';
import Fleet from '../components/Fleet';
import { useLanguage } from '../context/LanguageContext';
import '../styles/PageHeader.css';

const FleetPage = () => {
    const { t } = useLanguage();
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>{t('fleetPage.title')}</h1>
                    <p>{t('fleetPage.subtitle')}</p>
                </div>
            </div>
            <Fleet />
        </main>
    );
};

export default FleetPage;
