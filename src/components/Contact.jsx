import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/Contact.css';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        const templateParams = {
            yacht_name: '',
            yacht_type: '',
            to_email: 'administration@diamantidesyachting.com',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            category: 'General Contact Form'
        };

        try {
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
            );
            alert(t('contactPage.successAlert'));
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert(t('contactPage.errorAlert'));
        } finally {
            setSending(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">

                <div className="contact-info">
                    <h2 className="contact-title">{t('contactPage.getInTouch')}</h2>
                    <p className="contact-subtitle">
                        {t('contactPage.ready')}
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <div className="contact-icon"><MapPin size={24} /></div>
                            <div>
                                <h3>{t('contactPage.visitUs')}</h3>
                                <p>{t('contactPage.visitAddr')}<br />{t('contactPage.visitCity')}</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Phone size={24} /></div>
                            <div>
                                <h3>{t('contactPage.callDirectly')}</h3>
                                <p>
                                    <a href="tel:+35725010561">+357 25 010 561</a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon"><Mail size={24} /></div>
                            <div>
                                <h3>{t('contactPage.emailUs')}</h3>
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
                            <label htmlFor="name">{t('contactPage.labelName')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder={t('contactPage.placeholderName')}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{t('contactPage.labelEmail')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder={t('contactPage.placeholderEmail')}
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
                            <label htmlFor="message">{t('contactPage.labelMessage')}</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder={t('contactPage.placeholderMsg')}
                                rows="5"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-submit" disabled={sending}>
                            {sending ? t('contactPage.sendingBtn') : t('contactPage.sendBtn')} <Send size={18} />
                        </button>


                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
