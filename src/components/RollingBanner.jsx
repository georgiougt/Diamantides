import React from 'react';
import '../styles/RollingBanner.css';

import logo1 from '../assets/logos/2021_Black_Axis.png';
import logo2 from '../assets/logos/2021_Color_White_Text.png';
import logo4 from '../assets/logos/Marinello logo2.png';
import logo5 from '../assets/logos/VIPER-LOGO.png';
import logo7 from '../assets/logos/galeon_logo (1).png';
import logo8 from '../assets/logos/logo-nauticclean.png';
import logo9 from '../assets/logos/redshark-logo-pr.png';
import logo11 from '../assets/logos/agilis_logo.webp';

const logos = [
    { src: logo1, alt: 'Axis Logo' },
    { src: logo2, alt: 'Axis White Logo' },
    { src: logo4, alt: 'Marinello Logo' },
    { src: logo5, alt: 'Viper Logo' },
    { src: logo7, alt: 'Galeon Logo', customClass: 'scale-xxxl' },
    { src: logo8, alt: 'Nautic Clean Logo', customClass: 'scale-xl' },
    { src: logo9, alt: 'Redshark Logo', customClass: 'scale-lg' },
    { src: logo11, alt: 'Agilis Logo' },
];

const RollingBanner = () => {
    return (
        <div className="rolling-banner-container">
            <div className="rolling-banner-track">
                {/* Original set of logos */}
                {logos.map((logo, index) => (
                    <div key={`logo-${index}`} className="rolling-logo-wrapper">
                        <img src={logo.src} alt={logo.alt} className={`rolling-logo ${logo.customClass || ''}`} />
                    </div>
                ))}
                {/* Duplicate set for infinite scroll effect */}
                {logos.map((logo, index) => (
                    <div key={`logo-dup-${index}`} className="rolling-logo-wrapper">
                        <img src={logo.src} alt={logo.alt} className={`rolling-logo ${logo.customClass || ''}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RollingBanner;
