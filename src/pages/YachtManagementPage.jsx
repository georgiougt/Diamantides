import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/YachtManagement.css';

// Import local images scraped from legacy site
import slider1 from '../assets/services/management-slider-new-1-475x600.jpg';
import slider2 from '../assets/services/management-slider-new-2-475x600.jpg';
import slider3 from '../assets/services/management-slider-new-3-475x600.jpg';
import slider4 from '../assets/services/management-slider-new-4-475x600.jpg';
import slider5 from '../assets/services/management-slider-new-5-475x600.jpg';
import slider6 from '../assets/services/management-slider-new-6-475x600.jpg';
import slider7 from '../assets/services/management-slider-new-7-475x600.jpg';
import slider8 from '../assets/services/management-slider-new-8-475x600.jpg';

const pillars = [
    {
        title: "Technical Maintenance and Inspections",
        description: "Regular technical servicing is the foundation of safe and uninterrupted yacht operation. We organize scheduled and unscheduled inspections, routine and major repairs, and maintenance of onboard systems, engines, navigation equipment, and electronics. Our specialists work exclusively with certified contractors and trusted suppliers."
    },
    {
        title: "Crew Recruitment and Management",
        description: "A professional crew is key to onboard comfort. We recruit captains, deckhands, stewards, and chefs who meet the standards of premium yacht service. Crew management covers recruitment, contract administration, payroll, training coordination, and performance monitoring."
    },
    {
        title: "Financial Planning and Budgeting",
        description: "Diamantides Yachting helps yacht owners manage their budgets wisely by providing transparent reports on income and expenses. We account for fuel costs, technical work, crew salaries, insurance, mooring, taxes, and other expenditures. This is especially important for owners who charter their yachts."
    },
    {
        title: "Yacht Safety and Insurance",
        description: "We select the most suitable insurance programs for each vessel — from standard to premium policies that comprehensively cover potential risks. Our team also ensures compliance with international safety standards and conducts regular checks to confirm operational adherence."
    },
    {
        title: "Legal and Administrative Support",
        description: "Yacht owners face numerous legal and bureaucratic tasks: vessel registration, flag selection, license acquisition, and customs procedures. We handle all necessary documentation to ensure full compliance with international and Cypriot maritime regulations."
    }
];

const galleryImages = [
    slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8
];

const YachtManagementPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="yacht-management-page">
            {/* Hero Section */}
            <section className="ym-hero">
                <h1>Yacht Management</h1>
                <p>Ensure smooth and hassle-free yacht operations with our expert support.</p>
            </section>

            {/* Introduction Container */}
            <div className="container">
                <div className="ym-intro-content glass-morphism">
                    <p>
                        Owning a yacht is not only a matter of pleasure and prestige — it also involves a complex range 
                        of responsibilities related to maintenance, operation, and legal compliance. To ensure your yacht 
                        delivers only positive experiences, it’s essential to entrust it to professionals. 
                        <strong> Diamantides Yachting</strong> offers a full range of yacht management services in Cyprus, 
                        handling all technical, administrative, and financial matters on behalf of yacht owners.
                    </p>
                </div>
            </div>

            {/* Core Pillars */}
            <section className="ym-section">
                <div className="container">
                    <div className="ym-section-header">
                        <h2>Our Management Pillars</h2>
                        <p>The Diamantides Yachting team takes an individual approach to each project, taking into account the type of vessel, usage patterns, and client preferences.</p>
                    </div>
                    
                    <div className="ym-pillars-grid">
                        {pillars.map((pillar, index) => (
                            <div key={index} className="ym-pillar-card glass-morphism">
                                <h3>{pillar.title}</h3>
                                <p>{pillar.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Split Information Section */}
            <section className="ym-section" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <div className="ym-info-grid">
                        {/* Who is this for */}
                        <div className="ym-list-block glass-morphism">
                            <h3>Who Is This Service For?</h3>
                            <p style={{ color: '#aaa', marginBottom: '20px' }}>Engaging our yacht management services is more than a convenience — it’s a strategic partnership ideal for:</p>
                            <ul className="ym-styled-list">
                                <li>
                                    <span>Private Yacht Owners</span>
                                    Who want to enjoy the sea without being distracted by logistics and planning.
                                </li>
                                <li>
                                    <span>Investors</span>
                                    Chartering out their yachts, who want to maintain the vessel in perfect condition and ensure steady income.
                                </li>
                                <li>
                                    <span>Charter Business Owners</span>
                                    Who need professional fleet and client management.
                                </li>
                            </ul>
                        </div>

                        {/* Why Choose Us */}
                        <div className="ym-list-block glass-morphism">
                            <h3>Why Choose Diamantides?</h3>
                            <p style={{ color: '#aaa', marginBottom: '20px' }}>Our clients trust us with their most valuable assets — their yachts. Here’s why they choose us:</p>
                            <ul className="ym-styled-list">
                                <li>
                                    <span>Over 15 Years of Experience</span>
                                    In-depth knowledge of the region’s yachting industry and established relationships with top suppliers.
                                </li>
                                <li>
                                    <span>Personal Manager Available 24/7</span>
                                    Your yacht remains under constant supervision by a dedicated manager to handle any issue.
                                </li>
                                <li>
                                    <span>Transparent Reporting</span>
                                    Every client has access to clear financial data — monthly/annual reports and forecasts.
                                </li>
                                <li>
                                    <span>Verified Crew Members</span>
                                    We work only with experienced professionals who hold international certifications.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Image Gallery */}
            <section className="ym-section">
                <div className="container">
                    <div className="ym-section-header">
                        <h2>Immaculate Fleet Standards</h2>
                        <p>A glimpse into the vessels maintained under our premium management services.</p>
                    </div>
                    
                    <div className="ym-gallery-grid">
                        {galleryImages.map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`Yacht Management ${index + 1}`} 
                                className="ym-gallery-img"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Information Required */}
            <section className="ym-section" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <div className="ym-section-header">
                        <h2>Getting Started</h2>
                        <p>Arranging yacht management services is simple. We will provide a free consultation and help you choose the best service package.</p>
                    </div>
                    <div className="glass-morphism" style={{ padding: '40px', borderRadius: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        <h4 style={{ color: '#d4af37', marginBottom: '15px', fontSize: '1.2rem' }}>Required Documentation:</h4>
                        <ul style={{ color: '#ccc', lineHeight: '1.8', marginLeft: '20px', marginBottom: '20px' }}>
                            <li>A valid passport or ID of the charterer</li>
                            <li>Skipper’s license (if you intend to operate the yacht personally)</li>
                            <li>Crew information (if already selected)</li>
                            <li>Financial data for budget planning (optional)</li>
                        </ul>
                        <p style={{ color: '#aaa', fontStyle: 'italic' }}>
                            If you don’t intend to manage the yacht personally, our specialists will take full control. We also offer online consultations via video call for international clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="ym-cta-section">
                <div className="container ym-cta-content">
                    <h2>Ready to elevate your yachting experience?</h2>
                    <p>Contact us today to discuss the management of your yacht in Cyprus. The Diamantides Yachting team is always here to make your yachting experience comfortable, secure, and financially rewarding.</p>
                    <Link to="/contact" className="ym-cta-button">Contact Our Experts</Link>
                </div>
            </section>

        </div>
    );
};

export default YachtManagementPage;
