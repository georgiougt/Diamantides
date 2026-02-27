import Contact from '../components/Contact';
import '../styles/PageHeader.css';

const ContactPage = () => {
    return (
        <main className="page-wrapper">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Contact Us</h1>
                    <p>Get in touch for bespoke yachting inquiries.</p>
                </div>
            </div>
            <Contact />
        </main>
    );
};

export default ContactPage;
