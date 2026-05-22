import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import '../styles/RedsharkBikes.css';

const RedsharkBikesPage = () => {
    const topoRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [sendSuccess, setSendSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setSendError(null);
        setSendSuccess(false);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            category: 'Redshark Bikes Inquiry'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            );
            setSendSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSendError('Failed to send inquiry. Please try again or call us directly.');
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleMouseMove = (e) => {
            if (topoRef.current) {
                const x = (e.clientX / window.innerWidth) * 20;
                const y = (e.clientY / window.innerHeight) * 20;
                topoRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const models = [
        {
            id: 'enjoy',
            name: 'ENJOY',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/2N3aGGV4nhc' 
        },
        {
            id: 'fitness',
            name: 'FITNESS',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/Nu5RBJZInFU'
        },
        {
            id: 'adventure',
            name: 'ADVENTURE',
            prefix: 'Bike Surf',
            videoUrl: 'https://www.youtube.com/embed/qiGsPudGtVI'
        },
        {
            id: 'scooter',
            name: 'Surf',
            prefix: 'E-SCOOTER',
            videoUrl: 'https://www.youtube.com/embed/Q3ZjqRujv1E'
        }
    ];

    return (
        <div className="redshark-page">
            <svg ref={topoRef} className="rs-topo-bg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,200 C200,150 300,300 500,250 S800,100 1000,150" />
                <path d="M0,400 C150,350 250,550 450,450 S750,300 1000,350" />
                <path d="M0,600 C250,550 350,750 550,650 S850,500 1000,550" />
                <path d="M0,800 C100,750 200,950 400,850 S700,700 1000,750" />
            </svg>

            <div className="redshark-container">
                <header className="redshark-header">
                    <span className="redshark-subtitle">WATER BIKES COLLECTION</span>
                    <h1 className="redshark-title">Redshark</h1>
                </header>

                <div className="redshark-grid">
                    {models.map((model, index) => (
                        <div 
                            key={model.id} 
                            className="redshark-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="redshark-video-wrapper">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={model.videoUrl} 
                                    title={`${model.prefix} ${model.name}`} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="redshark-info">
                                <h3 className="redshark-prefix">{model.prefix}</h3>
                                <h2 className="redshark-model-name">{model.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="redshark-contact-section">
                    <div className="redshark-contact-header">
                        <h2>INQUIRE NOW</h2>
                        <p>Speak with our specialists to configure your Redshark Bike.</p>
                    </div>
                    
                    <form className="redshark-contact-form" onSubmit={handleSubmit}>
                        <div className="redshark-form-row">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Full Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="Email Address"
                                required
                            />
                        </div>
                        <div className="redshark-form-row">
                            <PhoneInput
                                country={'cy'}
                                value={formData.phone}
                                onChange={(phone) => setFormData({ ...formData, phone })}
                                enableSearch={true}
                                placeholder="Phone Number"
                                containerClass="redshark-phone-container"
                                inputClass="redshark-phone-input"
                            />
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Please provide any details or ask questions about specific models..."
                            rows="4"
                            required
                        ></textarea>
                        <button type="submit" className="redshark-submit-btn" disabled={sending}>
                            {sending ? 'SENDING...' : 'DISPATCH INQUIRY'} <Send size={16} />
                        </button>
                        {sendSuccess && (
                            <div className="redshark-feedback success">
                                <CheckCircle size={16} /> Our specialists will contact you shortly.
                            </div>
                        )}
                        {sendError && (
                            <div className="redshark-feedback error">
                                <AlertCircle size={16} /> {sendError}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RedsharkBikesPage;
