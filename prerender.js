import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Mock window and document globally for module-level browser APIs and Framer Motion layout projections
globalThis.window = {
  location: {
    pathname: '/',
    href: 'https://diamantidesyachting.com/'
  },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => true
};
globalThis.document = {
  querySelector: () => null,
  createElement: () => ({ setAttribute: () => {}, name: '', content: '' }),
  head: { appendChild: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {}
};

// 2. Import yachts data and slug utility
import { yachts } from './src/data/yachts.js';
import { getSlug } from './src/utils/navigation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 3. Define mapping of routes to page-specific SEO meta tags
const routeSeo = {
  '/': {
    title: 'Diamantides Yachting | Luxury Yacht Charters & Sales Cyprus',
    desc: 'Experience the ultimate in Mediterranean luxury with Diamantides Yachting. Bespoke yacht charters, premium yacht sales, boat parking, and management in Limassol, Cyprus.'
  },
  '/about': {
    title: 'About Us | Diamantides Yachting',
    desc: 'Learn about the premier yachting company in Cyprus. Discover our commitment to excellence, luxury yachts fleet, and bespoke marine services in Limassol.'
  },
  '/services': {
    title: 'Yachting Services | Diamantides Yachting',
    desc: 'Explore our comprehensive yacht services including premium yacht management, professional boat parking, boat care, training, and sales in Cyprus.'
  },
  '/services/boat-parking': {
    title: 'Premium Boat Parking & Storage Limassol | Diamantides Yachting',
    desc: 'Secure covered hangar boat storage, professional yacht mooring, 24/7 CCTV security, and all-inclusive maintenance services in Limassol, Cyprus.'
  },
  '/services/yacht-management': {
    title: 'Exclusive Yacht Management Cyprus | Diamantides Yachting',
    desc: 'Bespoke yacht management, standard maintenance, professional crewing, technical servicing, and administrative support for yacht owners in Cyprus.'
  },
  '/fleet': {
    title: 'Luxury Yachts Fleet Cyprus | Diamantides Yachting',
    desc: 'View our exclusive collection of luxury motor yachts and speedboats available for charter and sales in Limassol, Cyprus.'
  },
  '/charter': {
    title: 'Yacht Charter Limassol, Cyprus | Luxury Crewed Yacht Rentals | Diamantides Yachting',
    desc: 'Charter luxury motor yachts in Limassol, Cyprus with Diamantides Yachting. Princess, Azimut & more. Book your private skippered charter today.'
  },
  '/charter-yacht/limassol': {
    title: 'Yacht Charter Limassol, Cyprus | Luxury Crewed Yacht Rentals | Diamantides Yachting',
    desc: 'Charter luxury motor yachts in Limassol, Cyprus with Diamantides Yachting. Princess, Azimut & more. Book your private skippered charter today.'
  },
  '/sales': {
    title: 'Premium Yachts for Sale Cyprus | Diamantides Yachting',
    desc: 'Browse luxury motor yachts and speedboats for sale in Limassol, Cyprus. Authorized dealer for Viper, Marinello, Axis, and Galeon yachts.'
  },
  '/sales/brands': {
    title: 'Official Yacht Brands Dealer Cyprus | Diamantides Yachting',
    desc: 'Discover our exclusive partner brands. Official dealer in Cyprus for premium yacht builders including Viper, Axis, Marinello, and Galeon.'
  },
  '/sales/nautic-clean': {
    title: 'Nautic Clean Marine Care Products | Diamantides Yachting',
    desc: 'Official distributor of Nautic Clean marine cleaning and maintenance products in Cyprus. Premium formulas for teak, gelcoat, and steel care.'
  },
  '/sales/redshark-bikes': {
    title: 'Redshark Water Bikes Rentals Cyprus | Diamantides Yachting',
    desc: 'Experience the future of water fitness. Premium Redshark trimaran water bikes available for rental and purchase in Limassol, Cyprus.'
  },
  '/members-only': {
    title: 'VIP Yacht Charter Membership | Diamantides Yachting',
    desc: 'Access exclusive members-only yacht charters, private VIP events, priority booking, and luxury concierge services in Cyprus.'
  },
  '/contact': {
    title: 'Contact Our Yacht Specialists | Diamantides Yachting',
    desc: 'Get in touch with our team at Limassol Marina for yacht bookings, sales inquiries, boat parking reservations, and professional consulting.'
  },
  '/training-academy': {
    title: 'Speedboat Training Academy Cyprus | Diamantides Yachting',
    desc: 'Obtain your professional speedboat license in Limassol. Expert instruction, practical sea training, and international marine certifications.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Diamantides Yachting',
    desc: 'Read the privacy policy of Diamantides Yachting to learn how we protect and handle your personal data.'
  },
  '/terms-of-service': {
    title: 'Terms of Service | Diamantides Yachting',
    desc: 'Read the terms of service of Diamantides Yachting for charters, sales, boat parking, and marine services.'
  },
  '/faq': {
    title: 'Frequently Asked Questions | Diamantides Yachting',
    desc: 'Everything you need to know about yacht charters, boat sales, brokerage, storage, and licensing in Limassol, Cyprus.'
  },
  '/blog': {
    title: 'Yachting Journal | Diamantides Yachting',
    desc: 'Read the latest news, guides, and updates from Diamantides Yachting in Cyprus. Keep up with yacht festivals, luxury charter insights, and industry events.'
  },
  '/404': {
    title: 'Page Not Found | Diamantides Yachting',
    desc: 'The page you are looking for does not exist. Return to Diamantides Yachting home page or contact our team.'
  }
};

// 4.5 Generate dynamic blog routes
let blogs = [];
try {
  const blogsPath = path.join(__dirname, 'src/data/blogs.json');
  if (fs.existsSync(blogsPath)) {
    blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
  }
} catch (e) {
  console.warn('⚠️ Could not read blogs.json for prerendering:', e.message);
}

for (const blog of blogs) {
  routeSeo[`/blog/${blog.slug}`] = {
    title: `${blog.title} | Diamantides Yachting`,
    desc: blog.excerpt?.substring(0, 150).replace(/<[^>]+>/g, '').trim() || 'Read our latest blog post.'
  };
}

// 4. Generate dynamic yacht routes and link their corresponding meta tags
// legacyCanonical maps each legacy numeric route to its canonical slug route so
// the legacy pages can self-reference the canonical URL and be excluded from the sitemap.
const legacyCanonical = {};
for (const yacht of yachts) {
  const slug = getSlug(yacht.name);
  const isCharter = yacht.category === 'charter';
  const isBoat = yacht.specs?.subCategory === 'boat' || ['RIB', 'Fiberglass', 'jetskis'].includes(yacht.vesselType);

  const title = `${yacht.name} | ${isCharter ? 'Luxury Yacht Charter Limassol' : 'Yacht for Sale Limassol'}, Cyprus`;
  const desc = `Explore details, technical specifications, and charter/sales information for ${yacht.name} in Limassol, Cyprus. ${yacht.description?.substring(0, 120)}...`;

  let canonicalRoute;
  if (isCharter) {
    canonicalRoute = `/charter-yacht/limassol/yacht/${slug}`;
  } else {
    const subType = isBoat ? 'boat' : 'yacht';
    canonicalRoute = `/sales/fleet/${subType}/${slug}`;
  }
  routeSeo[canonicalRoute] = { title, desc };

  // Legacy / fallback numeric id route (still prerendered so direct hits work,
  // but it canonicalizes to the slug route and is omitted from the sitemap).
  const legacyRoute = `/yacht/${yacht.id}`;
  routeSeo[legacyRoute] = { title, desc };
  legacyCanonical[legacyRoute] = canonicalRoute;
}

// 4.6 Register Russian SEO routes and descriptions
const ruPageSeo = {
  '/': {
    title: 'Diamantides Yachting | Аренда и Продажа Яхт на Кипре',
    desc: 'Эксклюзивный средиземноморский отдых с Diamantides Yachting. Аренда роскошных яхт, продажа яхт премиум-класса, стоянка судов и профессиональное управление в Лимассоле, Кипр.'
  },
  '/about': {
    title: 'О нас | Diamantides Yachting',
    desc: 'Узнайте о ведущей яхтенной компании на Кипре. Наше стремление к совершенству, флот люксовых яхт и персонализированные морские услуги в Лимассоле.'
  },
  '/services': {
    title: 'Яхтенные услуги | Diamantides Yachting',
    desc: 'Комплексные яхтенные услуги на Кипре: профессиональное управление яхтами, охраняемая стоянка катеров, обслуживание, обучение судовождению и продажа.'
  },
  '/services/boat-parking': {
    title: 'Парковка и хранение катеров в Лимассоле | Diamantides Yachting',
    desc: 'Безопасное крытое хранение катеров, швартовка яхт, круглосуточное видеонаблюдение и комплексное обслуживание в Лимассоле, Кипр.'
  },
  '/services/yacht-management': {
    title: 'Управление яхтами на Кипре | Diamantides Yachting',
    desc: 'Индивидуальное управление яхтами, регулярное обслуживание, профессиональный подбор экипажа, технический сервис и административная поддержка на Кипре.'
  },
  '/fleet': {
    title: 'Флот роскошных яхт Кипра | Diamantides Yachting',
    desc: 'Наша эксклюзивная коллекция моторных яхт и катеров премиум-класса, доступных для аренды и покупки в Лимассоле, Кипр.'
  },
  '/charter': {
    title: 'Аренда яхт в Лимассоле | Аренда люксовых яхт с экипажем на Кипре | Diamantides Yachting',
    desc: 'Аренда роскошных моторных яхт в Лимассоле, Кипр с Diamantides Yachting. Бронируйте частный чартер со шкипером сегодня.'
  },
  '/charter-yacht/limassol': {
    title: 'Аренда яхт в Лимассоле | Аренда люксовых яхт с экипажем на Кипре | Diamantides Yachting',
    desc: 'Аренда роскошных моторных яхт в Лимассоле, Кипр с Diamantides Yachting. Бронируйте частный чартер со шкипером сегодня.'
  },
  '/sales': {
    title: 'Продажа яхт премиум-класса на Кипре | Diamantides Yachting',
    desc: 'Продажа моторных яхт и скоростных катеров в Лимассоле, Кипр. Официальный дилер Viper, Marinello, Axis и Galeon.'
  },
  '/sales/brands': {
    title: 'Официальный дилер яхтенных брендов на Кипре | Diamantides Yachting',
    desc: 'Наши эксклюзивные бренды-партнеры. Официальный представитель на Кипре ведущих верфей, включая Viper, Axis, Marinello и Galeon.'
  },
  '/sales/nautic-clean': {
    title: 'Средства для ухода за судами Nautic Clean | Diamantides Yachting',
    desc: 'Официальный дистрибьютор средств для очистки и ухода Nautic Clean на Кипре. Премиум формулы для тика, гелькоута и стали.'
  },
  '/sales/redshark-bikes': {
    title: 'Водные велосипеды Redshark на Кипре | Diamantides Yachting',
    desc: 'Испытайте будущее водного фитнеса. Премиальные водные велосипеды Redshark доступны для аренды и покупки в Лимассоле, Кипр.'
  },
  '/members-only': {
    title: 'VIP-членство и эксклюзивная аренда | Diamantides Yachting',
    desc: 'Эксклюзивный доступ к VIP-чартерам, закрытым мероприятиям, приоритетному бронированию и услугам консьержа на Кипре.'
  },
  '/contact': {
    title: 'Контакты | Diamantides Yachting',
    desc: 'Свяжитесь с нашей командой в Лимассол Марине для бронирования чартера, вопросов покупки, стоянки судов и консультаций.'
  },
  '/training-academy': {
    title: 'Обучение управлению скоростным катером на Кипре | Diamantides Yachting',
    desc: 'Получите права на управление катером в Лимассоле. Практическое обучение в море и получение международных сертификатов.'
  },
  '/privacy-policy': {
    title: 'Политика конфиденциальности | Diamantides Yachting',
    desc: 'Политика конфиденциальности Diamantides Yachting: защита и обработка ваших персональных данных.'
  },
  '/terms-of-service': {
    title: 'Условия предоставления услуг | Diamantides Yachting',
    desc: 'Условия предоставления услуг Diamantides Yachting по аренде, продаже, парковке и обслуживанию яхт.'
  },
  '/faq': {
    title: 'Часто задаваемые вопросы (FAQ) | Diamantides Yachting',
    desc: 'Все, что вам нужно знать об аренде яхт, покупке катеров, брокередже, хранении судов и обучении на Кипре.'
  },
  '/blog': {
    title: 'Морской журнал | Diamantides Yachting',
    desc: 'Морские новости Кипра, руководства по выбору яхт и инсайты чартеров от Diamantides Yachting.'
  },
  '/404': {
    title: 'Страница не найдена | Diamantides Yachting',
    desc: 'Страница не существует. Вернитесь на главную страницу Diamantides Yachting.'
  }
};

for (const [route, seo] of Object.entries(ruPageSeo)) {
  const ruRoute = route === '/' ? '/ru' : `/ru${route}`;
  routeSeo[ruRoute] = seo;
}

for (const blog of blogs) {
  routeSeo[`/ru/blog/${blog.slug}`] = {
    title: `${blog.title_ru || blog.title} | Diamantides Yachting`,
    desc: blog.excerpt_ru || blog.excerpt?.substring(0, 150).replace(/<[^>]+>/g, '').trim() || 'Морской журнал.'
  };
}

for (const yacht of yachts) {
  const slug = getSlug(yacht.name);
  const isCharter = yacht.category === 'charter';
  const isBoat = yacht.specs?.subCategory === 'boat' || ['RIB', 'Fiberglass', 'jetskis'].includes(yacht.vesselType);

  const title = `${yacht.name} | ${isCharter ? 'Аренда люксовых яхт Лимассол' : 'Продажа яхт в Лимассоле'}, Кипр`;
  const desc = `Подробные характеристики и информация о ${isCharter ? 'аренде' : 'продаже'} яхты ${yacht.name} в Лимассоле, Кипр.`;

  let canonicalRoute;
  if (isCharter) {
    canonicalRoute = `/ru/charter-yacht/limassol/yacht/${slug}`;
  } else {
    const subType = isBoat ? 'boat' : 'yacht';
    canonicalRoute = `/ru/sales/fleet/${subType}/${slug}`;
  }
  routeSeo[canonicalRoute] = { title, desc };

  const legacyRoute = `/ru/yacht/${yacht.id}`;
  routeSeo[legacyRoute] = { title, desc };
  legacyCanonical[legacyRoute] = canonicalRoute;
}

// Schema.org Structured Data definitions
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Diamantides Yachting",
  "image": "https://diamantidesyachting.com/assets/images/about_hero.webp",
  "@id": "https://diamantidesyachting.com/#localbusiness",
  "url": "https://diamantidesyachting.com",
  "telephone": "+35725010561",
  "email": "administration@diamantidesyachting.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Limassol Marina",
    "addressLocality": "Limassol",
    "postalCode": "3601",
    "addressCountry": "CY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.6706,
    "longitude": 33.0425
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/diamantidesyachting/",
    "https://www.instagram.com/diamantidesyachting/"
  ]
};

const charterServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Luxury Yacht Charter Limassol",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Diamantides Yachting",
    "image": "https://diamantidesyachting.com/assets/images/about_hero.webp",
    "telephone": "+35725010561",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Limassol Marina",
      "addressLocality": "Limassol",
      "addressCountry": "CY"
    }
  },
  "areaServed": {
    "@type": "Place",
    "name": "Limassol, Cyprus"
  },
  "description": "Premium crewed yacht rentals and custom itineraries in Limassol, Cyprus. Princess, Azimut, Falcon, and Ferretti yachts."
};

function getYachtSchema(yacht, route) {
  const isCharter = yacht.category === 'charter';
  const priceNumeric = parseFloat(yacht.price?.replace(/[^0-9.]/g, '')) || null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": yacht.name,
    "image": yacht.image ? `https://diamantidesyachting.com${yacht.image}` : undefined,
    "description": yacht.description || `Luxury ${yacht.type} available for ${isCharter ? 'charter' : 'sale'} with Diamantides Yachting in Limassol, Cyprus.`,
    "offers": {
      "@type": "Offer",
      "url": `https://diamantidesyachting.com${route}`,
      "priceCurrency": "EUR",
      "price": priceNumeric || undefined,
      "priceSpecification": !priceNumeric ? {
        "@type": "PriceSpecification",
        "price": "POA"
      } : undefined,
      "availability": "https://schema.org/InStock"
    }
  };
}

async function runPrerender() {
  console.log('🏁 Starting static pre-rendering...');

  const distPath = path.join(__dirname, 'dist');
  const templatePath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(templatePath)) {
    console.error('❌ Build template index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');

  // Dynamic import of the Vite SSR server bundle
  const serverBundlePath = './dist/server/entry-server.js';
  const { render } = await import(serverBundlePath);

  for (const [route, seo] of Object.entries(routeSeo)) {
    console.log(`Rendering route: ${route}`);

    try {
      const appHtml = render(route);

      // Build canonical and schema.org markup dynamically during pre-rendering.
      // Legacy numeric routes point their canonical at the slug route to avoid duplicate content.
      const canonicalRoute = legacyCanonical[route] || route;
      const canonicalUrl = canonicalRoute === '/'
        ? 'https://diamantidesyachting.com'
        : `https://diamantidesyachting.com${canonicalRoute.endsWith('/') ? canonicalRoute : canonicalRoute + '/'}`;

      // Inject rendered markup and update SEO tags
      let html = template
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace(/<title>.*?<\/title>/g, `<title>${seo.title}</title>`)
        .replace(/<link rel="canonical" href=".*?"\s*\/?>/g, `<link rel="canonical" href="${canonicalUrl}" />`)
        .replace(/<meta name="description" content=".*?"/g, `<meta name="description" content="${seo.desc}"`)
        .replace(/<meta property="og:title" content=".*?"/g, `<meta property="og:title" content="${seo.title}"`)
        .replace(/<meta property="og:description" content=".*?"/g, `<meta property="og:description" content="${seo.desc}"`)
        .replace(/<meta name="twitter:title" content=".*?"/g, `<meta name="twitter:title" content="${seo.title}"`)
        .replace(/<meta name="twitter:description" content=".*?"/g, `<meta name="twitter:description" content="${seo.desc}"`);

      let extraHeadHtml = '';

      let routeSchemas = [];
      if (route === '/') {
        routeSchemas.push(localBusinessSchema);
      } else if (route === '/charter-yacht/limassol') {
        routeSchemas.push(localBusinessSchema);
        routeSchemas.push(charterServiceSchema);
      } else if (route === '/contact') {
        routeSchemas.push(localBusinessSchema);
      } else if (route.includes('/yacht/') || route.includes('/boat/')) {
        const slugOrId = route.split('/').pop();
        let yacht = null;
        if (isNaN(slugOrId)) {
          // The same slug can exist in both categories (e.g. "Princess 30M"), so
          // match the category to the route to avoid emitting the wrong schema.
          const isSalesRoute = route.startsWith('/sales');
          const isCharterRoute = route.startsWith('/charter-yacht');
          yacht = yachts.find(y => {
            if (getSlug(y.name) !== slugOrId) return false;
            if (isSalesRoute) return y.category === 'sales';
            if (isCharterRoute) return y.category === 'charter';
            return true;
          });
        } else {
          yacht = yachts.find(y => y.id === parseInt(slugOrId));
        }
        if (yacht) {
          routeSchemas.push(getYachtSchema(yacht, route));
        }
      }

      routeSchemas.forEach((schema, idx) => {
        extraHeadHtml += `\n  <script type="application/ld+json" id="static-schema-${idx}">${JSON.stringify(schema)}</script>`;
      });

      // Inject JSON-LD Schema markup for the FAQ page
      if (route === '/faq') {
        const faqSchemaJson = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Where do your yacht and boat charters in Limassol depart from?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All charters depart from and return to Limassol Marina. Alternative departure points can be arranged by prior agreement."
              }
            },
            {
              "@type": "Question",
              "name": "What types of boats are available in your charter fleet?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Motor yachts ranging from 42 feet to 36 metres, with capacity for 1 to 25 guests."
              }
            },
            {
              "@type": "Question",
              "name": "Can I book a half-day or full-day boat charter in Limassol?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Charter durations range from 4–6 hours up to 7 days."
              }
            },
            {
              "@type": "Question",
              "name": "Are charters skippered or bareboat?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All charters are fully crewed with a skipper, deckhand, and stewardess. Bareboat charters are not offered."
              }
            },
            {
              "@type": "Question",
              "name": "What is included in a yacht charter price?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The price includes fuel for Limassol Bay, soft drinks, coffee, tea, and fresh fruit, plus the full professional crew."
              }
            },
            {
              "@type": "Question",
              "name": "What yacht brands does Diamantides Yachting represent?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Diamantides Yachting is the authorized dealer in Cyprus for Malibu, Axis, Agilis, Viper, and the Ferretti Group."
              }
            },
            {
              "@type": "Question",
              "name": "Do you offer boat storage in Limassol?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We operate Cyprus's only privately owned boatyard offering open, shedded, and fully covered storage, with on-site engineers, electricians, and maintenance specialists."
              }
            }
          ]
        };
        extraHeadHtml += `\n  <script type="application/ld+json" id="faq-schema">${JSON.stringify(faqSchemaJson)}</script>`;
      }

      html = html.replace('</head>', `${extraHeadHtml}\n</head>`);

      // Write HTML output file to its corresponding folder structure
      if (route === '/') {
        fs.writeFileSync(templatePath, html, 'utf8');
      } else {
        const routeFolder = path.join(distPath, route.startsWith('/') ? route.slice(1) : route);
        fs.mkdirSync(routeFolder, { recursive: true });
        fs.writeFileSync(path.join(routeFolder, 'index.html'), html, 'utf8');
      }
    } catch (err) {
      console.error(`❌ Failed to pre-render route ${route}:`, err);
    }
  }

  // Cleanup: Delete compiled SSR server files as they are no longer needed in the deployment directory
  console.log('🧹 Cleaning up compiled server bundle...');
  try {
    fs.rmSync(path.join(distPath, 'server'), { recursive: true, force: true });
  } catch (err) {
    console.warn('⚠️ Warning: Could not clean up compiled server bundle directory (might be locked by the import):', err.message);
  }

  // 5. Generate sitemap.xml dynamically
  console.log('Generating dynamic sitemap.xml...');
  const today = new Date().toISOString().split('T')[0];
  let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of Object.keys(routeSeo)) {
    // Skip legacy numeric /yacht/:id routes — they canonicalize to the slug route,
    // so listing them here would submit duplicate content to search engines.
    if (legacyCanonical[route] || route === '/404') continue;

    const loc = route === '/'
      ? 'https://diamantidesyachting.com'
      : `https://diamantidesyachting.com${route.endsWith('/') ? route : route + '/'}`;
    let priority = '0.5';
    let changefreq = 'weekly';

    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (['/fleet', '/charter-yacht/limassol', '/sales'].includes(route)) {
      priority = '0.9';
      changefreq = 'weekly';
    } else if (['/about', '/services', '/contact', '/blog'].includes(route)) {
      priority = '0.8';
      changefreq = 'monthly';
    } else if (route.startsWith('/services/')) {
      priority = '0.8';
      changefreq = 'monthly';
    } else if (route.startsWith('/charter-yacht/limassol/yacht/') || route.startsWith('/sales/fleet/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (route.startsWith('/blog/')) {
      priority = '0.7';
      changefreq = 'weekly';
    } else if (route.startsWith('/privacy-policy') || route.startsWith('/terms-of-service')) {
      priority = '0.3';
      changefreq = 'yearly';
    }

    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${loc}</loc>\n`;
    sitemapXml += `    <lastmod>${today}</lastmod>\n`;
    sitemapXml += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemapXml += `    <priority>${priority}</priority>\n`;
    sitemapXml += `  </url>\n`;
  }

  sitemapXml += '</urlset>\n';

  // Write to both dist/sitemap.xml and public/sitemap.xml
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('🎉 sitemap.xml generated successfully in dist/ and public/!');

  console.log('🎉 Static pre-rendering completed successfully!');
}

runPrerender();
