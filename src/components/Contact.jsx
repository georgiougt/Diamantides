import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+357',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend or service like Formspree
        alert('Thank you for your enquiry. We will contact you shortly.');
        setFormData({ name: '', email: '', countryCode: '+357', phone: '', message: '' });
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
                                <p>Limassol Marina, Building D, Office 12<br />Limassol, Cyprus</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Phone size={24} /></div>
                            <div>
                                <h3>Call Us</h3>
                                <p><a href="tel:+35725010561">+357 25 010 561</a></p>
                                <p><a href="tel:+35799123456">+357 99 123 456</a></p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Mail size={24} /></div>
                            <div>
                                <h3>Email Us</h3>
                                <p><a href="mailto:info@diamantidesyachting.com">info@diamantidesyachting.com</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="map-placeholder">
                        {/* Google Maps Embed Placeholder - Using an image for static nature */}
                        <div className="google-map-static">
                            <span>Google Maps Embed Placeholder</span>
                        </div>
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

                        <div className="form-group phone-group">
                            <label htmlFor="phone">Phone Number</label>
                            <div className="phone-input-wrapper">
                                <select
                                    className="country-code-select"
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                >
                                    <option value="+357">+357 (CY)</option>
                                    <option value="+30">+30 (GR)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+1">+1 (US/CA)</option>
                                    <option value="+971">+971 (UAE)</option>
                                    <option value="+33">+33 (FR)</option>
                                    <option value="+39">+39 (IT)</option>
                                    <option value="+49">+49 (DE)</option>
                                </select>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                            </div>
                        </div>

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
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
