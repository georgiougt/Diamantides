import About from '../components/About';
import '../styles/PageHeader.css';

const AboutPage = () => {
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>About Us</h1>
                    <p>Discover the legacy and vision of Diamantides Yachting.</p>
                </div>
            </div>
            <About />
        </main>
    );
};

export default AboutPage;
