import React, { useEffect } from 'react';
import '../styles/NauticClean.css';
import logo from '../assets/logos/logo-nauticclean.png';

const NauticCleanPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        {
            title: "Care & Protection",
            description: "Advanced ceramic coatings and protective sealants for gelcoat and stainless steel.",
            image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Internal Maintenance",
            description: "Eco-friendly cleaners for teak, leather, upholstery, and fine wood interiors.",
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Performance Cleaning",
            description: "High-concentration degreasers and hull cleaners for the toughest marine environments.",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <div className="nautic-clean-page">
            <section className="nc-hero">
                <div className="container">
                    <img src={logo} alt="Nautic Clean" className="nc-hero-logo" />
                    <h1 className="hero-title">Professional Marine Care</h1>
                    <p className="hero-subtitle">The European leader in high-performance nautical cleaning and maintenance products.</p>
                </div>
            </section>

            <section className="nc-intro">
                <div className="container">
                    <div className="intro-content glass-morphism">
                        <h2>Why Nautic Clean?</h2>
                        <p>
                            Born from a passion for yachting and precision engineering, Nautic Clean offers 
                            environmentally conscious solutions that deliver showroom results. As their 
                            exclusive partner, Diamantides Yachting provides professional-grade 
                            supplies for owners who demand nothing but perfection.
                        </p>
                    </div>
                </div>
            </section>

            <section className="nc-categories">
                <div className="container">
                    <div className="category-grid">
                        {categories.map((cat, index) => (
                            <div key={index} className="category-card">
                                <div className="card-image">
                                    <img src={cat.image} alt={cat.title} />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="card-info">
                                    <h3>{cat.title}</h3>
                                    <p>{cat.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="nc-contact">
                <div className="container">
                    <div className="contact-form-wrapper glass-morphism">
                        <h2>Inquire About Products</h2>
                        <form className="nc-form">
                            <div className="form-row">
                                <input type="text" placeholder="Full Name" required />
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <select required>
                                <option value="">Select Category</option>
                                <option value="exterior">Exterior Care</option>
                                <option value="interior">Interior Maintenance</option>
                                <option value="professional">Professional Range</option>
                            </select>
                            <textarea placeholder="Tell us about your vessel or specific needs..." rows="4" required></textarea>
                            <button type="submit" className="submit-btn highlight-btn">Send Inquiry</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NauticCleanPage;
