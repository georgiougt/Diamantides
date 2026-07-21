const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const pagesSeo = {
    'AboutPage.jsx': {
        title: 'About Us | Diamantides Yachting',
        desc: 'Learn about the premier yachting company in Cyprus. Discover our commitment to excellence, luxury yachts fleet, and bespoke marine services in Limassol.'
    },
    'ServicesPage.jsx': {
        title: 'Yachting Services | Diamantides Yachting',
        desc: 'Explore our comprehensive yacht services including premium yacht management, professional boat parking, boat care, training, and sales in Cyprus.'
    },
    'BoatParkingPage.jsx': {
        title: 'Premium Boat Parking & Storage Limassol | Diamantides Yachting',
        desc: 'Secure covered hangar boat storage, professional yacht mooring, 24/7 CCTV security, and all-inclusive maintenance services in Limassol, Cyprus.'
    },
    'YachtManagementPage.jsx': {
        title: 'Exclusive Yacht Management Cyprus | Diamantides Yachting',
        desc: 'Bespoke yacht management, standard maintenance, professional crewing, technical servicing, and administrative support for yacht owners in Cyprus.'
    },
    'FleetPage.jsx': {
        title: 'Luxury Yachts Fleet Cyprus | Diamantides Yachting',
        desc: 'View our exclusive collection of luxury motor yachts and speedboats available for charter and sales in Limassol, Cyprus.'
    },
    'CharterTestPage.jsx': {
        title: 'Luxury Yacht Charter Cyprus | Diamantides Yachting',
        desc: 'Book a bespoke luxury yacht charter in Cyprus. Custom itineraries, gourmet catering, professional crew, and ultimate Mediterranean voyages.'
    },
    'SalesYachtsPage.jsx': {
        title: 'Premium Yachts for Sale Cyprus | Diamantides Yachting',
        desc: 'Browse luxury motor yachts and speedboats for sale in Limassol, Cyprus. Authorized dealer for Viper, Marinello, Axis, and Galeon yachts.'
    },
    'VIPCharterPage.jsx': {
        title: 'VIP Yacht Charter Membership | Diamantides Yachting',
        desc: 'Access exclusive members-only yacht charters, private VIP events, priority booking, and luxury concierge services in Cyprus.'
    },
    'ContactPage.jsx': {
        title: 'Contact Our Yacht Specialists | Diamantides Yachting',
        desc: 'Get in touch with our team at Limassol Marina for yacht bookings, sales inquiries, boat parking reservations, and professional consulting.'
    },
    'BrandsPage.jsx': {
        title: 'Official Yacht Brands Dealer Cyprus | Diamantides Yachting',
        desc: 'Discover our exclusive partner brands. Official dealer in Cyprus for premium yacht builders including Viper, Axis, Marinello, and Galeon.'
    },
    'NauticCleanPage.jsx': {
        title: 'Nautic Clean Marine Care Products | Diamantides Yachting',
        desc: 'Official distributor of Nautic Clean marine cleaning and maintenance products in Cyprus. Premium formulas for teak, gelcoat, and steel care.'
    },
    'RedsharkBikesPage.jsx': {
        title: 'Redshark Water Bikes Rentals Cyprus | Diamantides Yachting',
        desc: 'Experience the future of water fitness. Premium Redshark trimaran water bikes available for rental and purchase in Limassol, Cyprus.'
    },
    'FAQPage.jsx': {
        title: 'Frequently Asked Questions | Diamantides Yachting',
        desc: 'Everything you need to know about yacht charters, boat sales, brokerage, storage, and licensing in Limassol, Cyprus.'
    }
};

// 1. Process regular page files
for (const [filename, seo] of Object.entries(pagesSeo)) {
    const filePath = path.join(srcDir, 'pages', filename);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Add import if not present
    if (!content.includes('import { updateSEO }')) {
        content = `import { updateSEO } from '../utils/seo';\n` + content;
    }

    // Replace useEffect to include updateSEO call
    if (content.includes('window.scrollTo(0, 0);')) {
        content = content.replace(
            /window\.scrollTo\(0,\s*0\);/g,
            `updateSEO('${seo.title}', '${seo.desc}');\n        window.scrollTo(0, 0);`
        );
    } else {
        // Fallback if no scrollTo
        content = content.replace(
            /useEffect\(\(\) => \{/g,
            `useEffect(() => {\n        updateSEO('${seo.title}', '${seo.desc}');`
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected SEO to ${filename}`);
}

// 2. Process App.jsx (LandingPage component)
const appPath = path.join(srcDir, 'App.jsx');
if (fs.existsSync(appPath)) {
    let content = fs.readFileSync(appPath, 'utf8');
    
    // Add import
    if (!content.includes('import { updateSEO }')) {
        content = `import { updateSEO } from './utils/seo';\n` + content;
    }

    // Add useEffect with SEO inside LandingPage
    const targetLandingPage = `const LandingPage = () => {`;
    const replacementLandingPage = `const LandingPage = () => {
  useEffect(() => {
    updateSEO(
      'Diamantides Yachting | Luxury Yacht Charters & Sales Cyprus',
      'Experience the ultimate in Mediterranean luxury. Bespoke yacht charters, premium yacht sales, boat parking, yacht management, and speedboat training in Limassol, Cyprus.'
    );
    window.scrollTo(0, 0);
  }, []);`;

    if (content.includes(targetLandingPage) && !content.includes("updateSEO('Diamantides Yachting")) {
        content = content.replace(targetLandingPage, replacementLandingPage);
        fs.writeFileSync(appPath, content, 'utf8');
        console.log(`Injected SEO to App.jsx LandingPage`);
    }
}

// 3. Process YachtDetail.jsx (Dynamic SEO based on Yacht Name)
const detailPath = path.join(srcDir, 'components', 'YachtDetail.jsx');
if (fs.existsSync(detailPath)) {
    let content = fs.readFileSync(detailPath, 'utf8');

    // Add import
    if (!content.includes('import { updateSEO }')) {
        content = `import { updateSEO } from '../utils/seo';\n` + content;
    }

    // Update useEffect in YachtDetail
    const targetEffect = `    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);`;

    const replacementEffect = `    useEffect(() => {
        if (yacht) {
            updateSEO(
                \`\${yacht.name} | \${yacht.category === 'sales' ? 'Yacht for Sale' : 'Luxury Yacht Charter'} Cyprus\`,
                \`Explore details, technical specifications, and charter/sales information for \${yacht.name} in Limassol, Cyprus. \${yacht.description?.substring(0, 100)}...\`
            );
        }
        window.scrollTo(0, 0);
    }, [id, yacht]);`;

    if (content.includes(targetEffect)) {
        content = content.replace(targetEffect, replacementEffect);
        fs.writeFileSync(detailPath, content, 'utf8');
        console.log(`Injected Dynamic SEO to YachtDetail.jsx`);
    }
}
