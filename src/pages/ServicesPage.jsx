import Services from '../components/Services';
import '../styles/PageHeader.css';

const ServicesPage = () => {
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Our Services</h1>
                    <p>Exclusive management, chartering, and sales services.</p>
                </div>
            </div>
            <Services />
        </main>
    );
};

export default ServicesPage;
