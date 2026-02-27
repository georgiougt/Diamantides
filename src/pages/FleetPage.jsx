import Fleet from '../components/Fleet';
import '../styles/PageHeader.css';

const FleetPage = () => {
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Our Fleet</h1>
                    <p>Explore our exquisite collection of luxury yachts.</p>
                </div>
            </div>
            <Fleet />
        </main>
    );
};

export default FleetPage;
