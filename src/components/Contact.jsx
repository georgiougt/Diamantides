import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend or service like Formspree
        alert('Thank you for your enquiry. We will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">

                <div className="contact-info">
                    <h2 className="contact-title">Get in Touch</h2>
                    <p className="contact-subtitle">
                        Ready to start your yachting journey? Contact our team for personalized assistance.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon"><MapPin size={24} /></div>
                            <div>
                                <h3>Visit Us</h3>
                                <p>Limassol Marina, Building D2, Shop 7<br />Limassol, Cyprus</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Phone size={24} /></div>
                            <div>
                                <h3>Call Directly</h3>
                                <p>
                                    <a href="tel:+35725010561">+357 25 010 561</a><br />
                                    <a href="tel:+35799241025">+357 99 241 025</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Mail size={24} /></div>
                            <div>
                                <h3>Email Us</h3>
                                <p><a href="mailto:administration@diamantidesyachting.com">administration@diamantidesyachting.com</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="map-placeholder">
                        <iframe
                            title="Diamantides Yachting Location"
                            src="https://www.google.com/maps?q=Building+D2,+Limassol+Marina+St-Shop+7,+Limassol+3601,+Cyprus&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="contact-form-container">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                            <PhoneInput
                                country={'cy'}
                                value={formData.phone}
                                onChange={(phone) => setFormData({ ...formData, phone })}
                                enableSearch={true}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    id: 'phone'
                                }}
                                containerClass="custom-phone-input"
                            />

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell us about your yachting needs..."
                                rows="5"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-submit">
                            Send Message <Send size={18} />
                        </button>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', color: '#666' }}>
                            <p style={{ margin: 0 }}>
                                Whatsapp Text <a href="https://wa.me/35799241025" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', verticalAlign: 'middle' }}><MessageCircle size={18} /> +357 99 241 025</a>
                            </p>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
