import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { updateSEO } from '../utils/seo';
import { useLanguage } from '../context/LanguageContext';
import '../styles/FAQPage.css';

// Answers are stored as blocks: { type: 'p', text } or { type: 'ul', items }
// where items are strings or { strong, text } pairs.
const faqContent = {
    en: {
        heroTitle: 'Frequently Asked Questions',
        heroSubtitle: 'Everything you need to know about yacht charters, boat sales, brokerage, storage, and licensing in Cyprus.',
        categories: [
            { id: 'all', name: 'All Questions' },
            { id: 'charters', name: 'Yacht & Boat Charters' },
            { id: 'licensing', name: 'Speedboat Licensing' },
            { id: 'sales', name: 'Sales & Brokerage' },
            { id: 'management', name: 'Management & Storage' }
        ],
        sectionTitles: {
            charters: 'Yacht & Boat Charters in Limassol',
            licensing: 'Speedboat Licensing in Cyprus',
            sales: 'Yacht Sales & Brokerage in Cyprus',
            management: 'Yacht Management, Maintenance & Storage in Limassol'
        },
        ctaTitle: 'Still Have Questions?',
        ctaText: 'Our dedicated team at Limassol Marina is here to assist you with any inquiries regarding charters, purchases, or services.',
        ctaBtn: 'Get In Touch',
        items: [
            {
                id: 'departures',
                category: 'charters',
                question: 'Where do your yacht and boat charters in Limassol depart from?',
                answer: [
                    { type: 'p', text: "All Diamantides Yachting charters depart from and return to Limassol Marina, one of Cyprus's premier berthing facilities. Alternative departure or arrival points can be arranged on request, subject to availability and prior agreement at the time of booking." },
                    { type: 'p', text: 'Limassol Marina is centrally located on the southern coast of Cyprus, making it the ideal starting point for cruising Limassol Bay, the Akrotiri Peninsula, and beyond.' }
                ]
            },
            {
                id: 'fleet-types',
                category: 'charters',
                question: 'What types of boats and luxury yachts are available in your charter fleet?',
                answer: [
                    { type: 'p', text: 'Our charter fleet consists exclusively of motor yachts, ranging from 42 feet to 36 metres in length with passenger capacities from 1 to 25 guests. Whether you are planning an intimate private cruise or a larger group excursion, we match each client with the vessel best suited to their requirements.' },
                    { type: 'p', text: 'All yachts in our fleet are professionally maintained and equipped to the highest standards of comfort and safety.' }
                ]
            },
            {
                id: 'durations',
                category: 'charters',
                question: 'Can I book a boat for a half-day or full-day cruise, or do you only offer weekly rentals?',
                answer: [
                    { type: 'p', text: 'We offer flexible charter durations to suit every itinerary. Options include:' },
                    { type: 'ul', items: [
                        'Half-day charters (approximately 4 hours)',
                        'Full-day charters (approximately 6 hours)',
                        'Multi-day charters of up to 7 days'
                    ] },
                    { type: 'p', text: 'Whether you need a short afternoon cruise along the Limassol coastline or a week-long voyage around Cyprus and the Eastern Mediterranean, we can accommodate your plans.' }
                ]
            },
            {
                id: 'crew-bareboat',
                category: 'charters',
                question: 'Are your boat charters skippered, or is there a self-drive (bareboat) option available?',
                answer: [
                    { type: 'p', text: 'All Diamantides Yachting charters are fully crewed. Every vessel departs with a professional skipper, supported by a deckhand and a stewardess for your comfort and safety. We do not offer bareboat (self-drive) charters.' },
                    { type: 'p', text: 'This ensures that every guest — regardless of sailing experience — enjoys a relaxed, safe, and professionally managed experience on the water.' }
                ]
            },
            {
                id: 'inclusions',
                category: 'charters',
                question: 'What is typically included in the price of a private yacht charter in Limassol?',
                answer: [
                    { type: 'p', text: 'Your charter price includes:' },
                    { type: 'ul', items: [
                        'Fuel for cruising within Limassol Bay',
                        'Soft drinks, coffee, and tea',
                        'Fresh seasonal fruit',
                        'Full professional crew (skipper, deckhand, stewardess)'
                    ] },
                    { type: 'p', text: 'Additional catering, premium beverages, water sports equipment, or extended itineraries outside Limassol Bay can be arranged at an additional cost. Contact our team to discuss a bespoke package.' }
                ]
            },
            {
                id: 'special-events',
                category: 'charters',
                question: 'Can you accommodate special events, corporate charters, or private parties on board?',
                answer: [
                    { type: 'p', text: 'Yes. Diamantides Yachting regularly hosts corporate events, private parties, anniversary celebrations, team-building experiences, product launches, and other bespoke occasions on board. We act as a single point of contact and can coordinate supplementary services — including catering, entertainment, floral arrangements, photography, and more — through our trusted network of partners.' },
                    { type: 'p', text: 'Contact us to discuss your event and we will design a tailored experience around your vision.' }
                ]
            },
            {
                id: 'bad-weather',
                category: 'charters',
                question: 'What happens if there is bad weather on the day of my scheduled boat trip?',
                answer: [
                    { type: 'p', text: 'Guest safety is always our first priority. We monitor weather conditions continuously and will send you a detailed weather forecast 48 hours before your departure. If sea or wind conditions are unsuitable for a safe and enjoyable charter, we will work with you to reschedule your booking at the earliest convenient date.' },
                    { type: 'p', text: 'We never depart if conditions pose any risk to crew or passengers.' }
                ]
            },
            {
                id: 'speedboat-training',
                category: 'licensing',
                question: 'Do you offer certified speedboat training or licensing courses in Limassol?',
                answer: [
                    { type: 'p', text: "Yes. Diamantides Yachting provides individual, hands-on practical training for candidates seeking to obtain the official Speedboat Operator's License in Cyprus. Our instruction is tailored to each student's existing experience level, focusing on the practical skills required to pass the licensing examination." },
                    { type: 'p', text: 'For more information about enrollment, prerequisites, and scheduling, please contact our team directly.' }
                ]
            },
            {
                id: 'buying-process',
                category: 'sales',
                question: 'How does buying a new or pre-owned yacht in Cyprus work through Diamantides Yachting?',
                answer: [
                    { type: 'p', text: 'Purchasing a yacht through Diamantides Yachting gives you access to both the new boat market and the pre-owned brokerage market in Cyprus and internationally.' },
                    { type: 'p', text: 'For new vessels, we maintain working relationships with shipyards and boat builders worldwide and are the official authorized dealers for the following brands in Cyprus:' },
                    { type: 'ul', items: [
                        'Malibu',
                        'Axis',
                        'Agilis',
                        'Viper',
                        'Ferretti Group (including Ferretti Yachts, Riva, Pershing, Itama, CRN, Custom Line, and Wally)'
                    ] },
                    { type: 'p', text: 'Our team guides you through specification, ordering, delivery, registration, and commissioning.' }
                ]
            },
            {
                id: 'brands-represented',
                category: 'sales',
                question: 'What luxury yacht brands does Diamantides Yachting officially represent?',
                answer: [
                    { type: 'p', text: 'Diamantides Yachting is the authorized dealer in Cyprus for Malibu, Axis, Agilis, Viper, and the prestigious Ferretti Group — one of the world\'s leading luxury yacht manufacturers, whose portfolio includes iconic brands such as Riva and Pershing.' },
                    { type: 'p', text: 'Whether you are seeking a performance sports boat, a day cruiser, or a superyacht, our representation spans a wide range of styles, sizes, and price points.' }
                ]
            },
            {
                id: 'selling-boat',
                category: 'sales',
                question: 'I want to sell my boat — how can Diamantides Yachting help me find a buyer?',
                answer: [
                    { type: 'p', text: 'Our brokerage service gives your vessel maximum exposure through multiple channels:' },
                    { type: 'ul', items: [
                        'Listing on leading national and international boat-sale platforms',
                        'Direct marketing to our established client network in Cyprus and abroad',
                        'Off-market introductions, as we continuously receive buyer inquiries and maintain knowledge of off-market opportunities'
                    ] },
                    { type: 'p', text: 'Beyond marketing, we handle the full transfer process, including flag registration procedures, insurance coordination, survey management, and all legal documentation required for a successful and compliant change of ownership.' }
                ]
            },
            {
                id: 'management-services',
                category: 'management',
                question: 'Do you offer comprehensive yacht management and maintenance services at Limassol Marina?',
                answer: [
                    { type: 'p', text: 'Yes. Diamantides Yachting provides personalized yacht management and maintenance packages for vessels berthed at Limassol Marina as well as at other marinas and harbors locally and internationally.' },
                    { type: 'p', text: "Services are tailored to each owner's requirements and can include routine inspections, technical maintenance, crew management, insurance administration, and operational oversight — giving you full peace of mind whether you are on board or abroad." }
                ]
            },
            {
                id: 'storage-options',
                category: 'management',
                question: 'What options do you provide for secure boat storage, winterization, or dry storage in Limassol?',
                answer: [
                    { type: 'p', text: "Diamantides Yachting operates Cyprus's only privately owned boatyard offering the full spectrum of storage solutions under one roof:" },
                    { type: 'ul', items: [
                        { strong: 'Open storage', text: ' — for cost-effective seasonal lay-up' },
                        { strong: 'Shedded storage', text: ' — offering weather protection for medium-term storage' },
                        { strong: 'Fully covered (indoor) storage', text: ' — maximum protection for long-term lay-up or sensitive vessels' }
                    ] },
                    { type: 'p', text: "Our on-site team includes marine engineers, electricians, anti-fouling specialists, and upholstery professionals, ensuring that every aspect of your vessel's care and winterization is managed by qualified specialists without the need to transport your boat elsewhere." },
                    { type: 'p', text: 'This comprehensive in-house capability makes Diamantides Yachting the leading choice for boat storage in Limassol and Cyprus.' }
                ]
            }
        ]
    },
    ru: {
        heroTitle: 'Часто задаваемые вопросы',
        heroSubtitle: 'Всё, что нужно знать об аренде яхт, продаже судов, брокераже, хранении и получении лицензий на Кипре.',
        categories: [
            { id: 'all', name: 'Все вопросы' },
            { id: 'charters', name: 'Аренда яхт и катеров' },
            { id: 'licensing', name: 'Права на катер' },
            { id: 'sales', name: 'Продажа и брокераж' },
            { id: 'management', name: 'Управление и хранение' }
        ],
        sectionTitles: {
            charters: 'Аренда яхт и катеров в Лимассоле',
            licensing: 'Права на управление катером на Кипре',
            sales: 'Продажа яхт и брокераж на Кипре',
            management: 'Управление, обслуживание и хранение яхт в Лимассоле'
        },
        ctaTitle: 'Остались вопросы?',
        ctaText: 'Наша команда в Лимассол Марине готова помочь вам с любыми вопросами по аренде, покупке или услугам.',
        ctaBtn: 'Связаться с нами',
        items: [
            {
                id: 'departures',
                category: 'charters',
                question: 'Откуда отправляются ваши чартеры яхт и катеров в Лимассоле?',
                answer: [
                    { type: 'p', text: 'Все чартеры Diamantides Yachting отправляются из Лимассол Марины и возвращаются туда же — это одна из лучших стоянок Кипра. Альтернативные точки отправления или прибытия возможны по запросу, при наличии и предварительном согласовании на момент бронирования.' },
                    { type: 'p', text: 'Лимассол Марина расположена в центре южного побережья Кипра, что делает её идеальной отправной точкой для прогулок по заливу Лимассола, полуострову Акротири и дальше.' }
                ]
            },
            {
                id: 'fleet-types',
                category: 'charters',
                question: 'Какие типы катеров и люксовых яхт доступны в вашем чартерном флоте?',
                answer: [
                    { type: 'p', text: 'Наш чартерный флот состоит исключительно из моторных яхт длиной от 42 футов до 36 метров с вместимостью от 1 до 25 гостей. Планируете ли вы уединённый частный круиз или прогулку для большой компании — мы подберём судно, наилучшим образом соответствующее вашим требованиям.' },
                    { type: 'p', text: 'Все яхты нашего флота профессионально обслуживаются и оснащены по высочайшим стандартам комфорта и безопасности.' }
                ]
            },
            {
                id: 'durations',
                category: 'charters',
                question: 'Можно ли арендовать судно на полдня или на целый день, или вы предлагаете только понедельную аренду?',
                answer: [
                    { type: 'p', text: 'Мы предлагаем гибкую продолжительность чартера под любой маршрут. Варианты включают:' },
                    { type: 'ul', items: [
                        'Чартер на полдня (около 4 часов)',
                        'Чартер на целый день (около 6 часов)',
                        'Многодневный чартер до 7 дней'
                    ] },
                    { type: 'p', text: 'Нужна ли вам короткая дневная прогулка вдоль побережья Лимассола или недельное путешествие вокруг Кипра и по Восточному Средиземноморью — мы организуем всё под ваши планы.' }
                ]
            },
            {
                id: 'crew-bareboat',
                category: 'charters',
                question: 'Ваши чартеры проходят с капитаном, или возможна самостоятельная аренда (bareboat)?',
                answer: [
                    { type: 'p', text: 'Все чартеры Diamantides Yachting проходят с полным экипажем. Каждое судно выходит в море с профессиональным капитаном, матросом и стюардессой для вашего комфорта и безопасности. Самостоятельную аренду (bareboat) мы не предлагаем.' },
                    { type: 'p', text: 'Это гарантирует, что каждый гость — независимо от опыта мореплавания — получит спокойный, безопасный и профессионально организованный отдых на воде.' }
                ]
            },
            {
                id: 'inclusions',
                category: 'charters',
                question: 'Что обычно включено в стоимость частного чартера яхты в Лимассоле?',
                answer: [
                    { type: 'p', text: 'В стоимость чартера входят:' },
                    { type: 'ul', items: [
                        'Топливо для плавания в пределах залива Лимассола',
                        'Безалкогольные напитки, кофе и чай',
                        'Свежие сезонные фрукты',
                        'Полный профессиональный экипаж (капитан, матрос, стюардесса)'
                    ] },
                    { type: 'p', text: 'Дополнительный кейтеринг, премиальные напитки, оборудование для водных видов спорта или расширенные маршруты за пределами залива Лимассола организуются за дополнительную плату. Свяжитесь с нашей командой для обсуждения индивидуального пакета.' }
                ]
            },
            {
                id: 'special-events',
                category: 'charters',
                question: 'Можно ли провести на борту особое мероприятие, корпоративный чартер или частную вечеринку?',
                answer: [
                    { type: 'p', text: 'Да. Diamantides Yachting регулярно проводит на борту корпоративные мероприятия, частные вечеринки, юбилеи, тимбилдинги, презентации продуктов и другие события под ключ. Мы выступаем единой точкой контакта и можем организовать дополнительные услуги — кейтеринг, развлечения, цветочное оформление, фотосъёмку и многое другое — через нашу проверенную сеть партнёров.' },
                    { type: 'p', text: 'Свяжитесь с нами, чтобы обсудить ваше мероприятие, и мы разработаем программу под ваше видение.' }
                ]
            },
            {
                id: 'bad-weather',
                category: 'charters',
                question: 'Что произойдёт, если в день запланированной прогулки будет плохая погода?',
                answer: [
                    { type: 'p', text: 'Безопасность гостей — всегда наш главный приоритет. Мы непрерывно отслеживаем погодные условия и отправим вам подробный прогноз за 48 часов до отправления. Если состояние моря или ветер не позволяют провести безопасный и приятный чартер, мы вместе с вами перенесём бронирование на ближайшую удобную дату.' },
                    { type: 'p', text: 'Мы никогда не выходим в море, если условия представляют хоть какой-то риск для экипажа или пассажиров.' }
                ]
            },
            {
                id: 'speedboat-training',
                category: 'licensing',
                question: 'Предлагаете ли вы сертифицированное обучение или курсы для получения прав на катер в Лимассоле?',
                answer: [
                    { type: 'p', text: 'Да. Diamantides Yachting проводит индивидуальное практическое обучение для кандидатов, желающих получить официальные права на управление скоростным катером на Кипре. Обучение адаптируется под текущий уровень опыта каждого ученика с упором на практические навыки, необходимые для сдачи экзамена.' },
                    { type: 'p', text: 'Для получения информации о записи, требованиях и расписании, пожалуйста, свяжитесь с нашей командой напрямую.' }
                ]
            },
            {
                id: 'buying-process',
                category: 'sales',
                question: 'Как происходит покупка новой или подержанной яхты на Кипре через Diamantides Yachting?',
                answer: [
                    { type: 'p', text: 'Покупка яхты через Diamantides Yachting открывает вам доступ как к рынку новых судов, так и к брокеражному рынку подержанных яхт на Кипре и за рубежом.' },
                    { type: 'p', text: 'Что касается новых судов, мы поддерживаем рабочие отношения с верфями и производителями по всему миру и являемся официальными авторизованными дилерами следующих брендов на Кипре:' },
                    { type: 'ul', items: [
                        'Malibu',
                        'Axis',
                        'Agilis',
                        'Viper',
                        'Ferretti Group (включая Ferretti Yachts, Riva, Pershing, Itama, CRN, Custom Line и Wally)'
                    ] },
                    { type: 'p', text: 'Наша команда сопровождает вас на всех этапах: спецификация, заказ, доставка, регистрация и ввод в эксплуатацию.' }
                ]
            },
            {
                id: 'brands-represented',
                category: 'sales',
                question: 'Какие люксовые яхтенные бренды официально представляет Diamantides Yachting?',
                answer: [
                    { type: 'p', text: 'Diamantides Yachting — авторизованный дилер на Кипре брендов Malibu, Axis, Agilis, Viper и престижной Ferretti Group — одного из ведущих мировых производителей люксовых яхт, в портфолио которого входят такие знаковые бренды, как Riva и Pershing.' },
                    { type: 'p', text: 'Ищете ли вы спортивный катер, дневной круизер или суперяхту — наше представительство охватывает широкий диапазон стилей, размеров и ценовых категорий.' }
                ]
            },
            {
                id: 'selling-boat',
                category: 'sales',
                question: 'Я хочу продать свою лодку — как Diamantides Yachting поможет мне найти покупателя?',
                answer: [
                    { type: 'p', text: 'Наша брокеражная служба обеспечивает вашему судну максимальный охват через несколько каналов:' },
                    { type: 'ul', items: [
                        'Размещение на ведущих национальных и международных площадках продажи судов',
                        'Прямой маркетинг по нашей устоявшейся клиентской сети на Кипре и за рубежом',
                        'Закрытые предложения — мы постоянно получаем запросы покупателей и владеем информацией о внебиржевых возможностях'
                    ] },
                    { type: 'p', text: 'Помимо маркетинга, мы берём на себя весь процесс передачи: процедуры регистрации флага, координацию страхования, организацию сюрвея и всю юридическую документацию, необходимую для успешной и законной смены владельца.' }
                ]
            },
            {
                id: 'management-services',
                category: 'management',
                question: 'Предлагаете ли вы комплексные услуги по управлению и обслуживанию яхт в Лимассол Марине?',
                answer: [
                    { type: 'p', text: 'Да. Diamantides Yachting предоставляет индивидуальные пакеты по управлению и обслуживанию яхт для судов, стоящих в Лимассол Марине, а также в других маринах и гаванях на Кипре и за рубежом.' },
                    { type: 'p', text: 'Услуги подбираются под требования каждого владельца и могут включать плановые осмотры, техническое обслуживание, управление экипажем, страховое администрирование и операционный контроль — полное спокойствие, находитесь ли вы на борту или за границей.' }
                ]
            },
            {
                id: 'storage-options',
                category: 'management',
                question: 'Какие варианты вы предлагаете для безопасного хранения, консервации или сухого хранения лодок в Лимассоле?',
                answer: [
                    { type: 'p', text: 'Diamantides Yachting управляет единственной на Кипре частной судоверфью, предлагающей полный спектр решений для хранения под одной крышей:' },
                    { type: 'ul', items: [
                        { strong: 'Открытое хранение', text: ' — экономичный вариант для сезонного отстоя' },
                        { strong: 'Хранение под навесом', text: ' — защита от погодных условий для среднесрочного хранения' },
                        { strong: 'Полностью крытое (закрытое) хранение', text: ' — максимальная защита для длительного отстоя или чувствительных судов' }
                    ] },
                    { type: 'p', text: 'Наша команда на месте включает судовых инженеров, электриков, специалистов по необрастающим покрытиям и обивке — каждый аспект ухода и консервации вашего судна выполняется квалифицированными специалистами без необходимости перевозить лодку куда-либо ещё.' },
                    { type: 'p', text: 'Эти комплексные собственные возможности делают Diamantides Yachting лучшим выбором для хранения лодок в Лимассоле и на Кипре.' }
                ]
            }
        ]
    }
};

const renderAnswer = (blocks) => blocks.map((block, idx) => {
    if (block.type === 'ul') {
        return (
            <ul key={idx}>
                {block.items.map((item, i) => (
                    typeof item === 'string'
                        ? <li key={i}>{item}</li>
                        : <li key={i}><strong>{item.strong}</strong>{item.text}</li>
                ))}
            </ul>
        );
    }
    return <p key={idx}>{block.text}</p>;
});

const FAQPage = () => {
    const { currentLang, localizePath } = useLanguage();
    const content = faqContent[currentLang] || faqContent.en;

    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedItem, setExpandedItem] = useState(null);

    // JSON-LD Schema provided by client to maximize AEO/GEO visibility
    const faqSchema = {
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

    useEffect(() => {
        // Update SEO metadata dynamically
        if (currentLang === 'ru') {
            updateSEO(
                'Часто задаваемые вопросы | Diamantides Yachting',
                'Всё, что нужно знать об аренде яхт, продаже судов, брокераже, хранении и получении лицензий в Лимассоле, Кипр.'
            );
        } else {
            updateSEO(
                'Frequently Asked Questions | Diamantides Yachting',
                'Everything you need to know about yacht charters, boat sales, brokerage, storage, and licensing in Limassol, Cyprus.'
            );
        }
        window.scrollTo(0, 0);

        // Client-side JSON-LD injection (complementing build-time inject)
        let script = document.getElementById('faq-schema');
        if (!script) {
            script = document.createElement('script');
            script.id = 'faq-schema';
            script.type = 'application/ld+json';
            script.text = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }

        return () => {
            // Clean up schema on unmount
            const existingScript = document.getElementById('faq-schema');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    const filteredFaq = activeCategory === 'all'
        ? content.items
        : content.items.filter(item => item.category === activeCategory);

    const toggleAccordion = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    // Grouping for render when category is 'all'
    const renderFaqSection = (title, items) => {
        if (items.length === 0) return null;
        return (
            <div className="faq-section-group">
                <h2 className="faq-section-title">{title}</h2>
                <div className="faq-list">
                    {items.map((item) => {
                        const isExpanded = expandedItem === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq-item ${isExpanded ? 'active' : ''}`}
                            >
                                <button
                                    className="faq-trigger"
                                    onClick={() => toggleAccordion(item.id)}
                                    aria-expanded={isExpanded}
                                    aria-controls={`faq-panel-${item.id}`}
                                    id={`faq-trigger-${item.id}`}
                                >
                                    <h3>{item.question}</h3>
                                    <div className="faq-icon-wrapper">
                                        <ChevronDown size={18} />
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            id={`faq-panel-${item.id}`}
                                            role="region"
                                            aria-labelledby={`faq-trigger-${item.id}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="faq-panel"
                                        >
                                            <div className="faq-panel-content">
                                                {renderAnswer(item.answer)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // Filtered lists for each category
    const charterItems = filteredFaq.filter(item => item.category === 'charters');
    const licensingItems = filteredFaq.filter(item => item.category === 'licensing');
    const salesItems = filteredFaq.filter(item => item.category === 'sales');
    const managementItems = filteredFaq.filter(item => item.category === 'management');

    return (
        <main className="faq-page">
            {/* Premium Hero Section */}
            <section className="faq-hero">
                <div className="faq-hero-overlay"></div>
                <div className="container">
                    <motion.h1
                        className="faq-hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {content.heroTitle}
                    </motion.h1>
                    <motion.p
                        className="faq-hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {content.heroSubtitle}
                    </motion.p>
                </div>
            </section>

            {/* Category Filter Bar */}
            <section className="faq-categories">
                <div className="faq-categories-container">
                    {content.categories.map((category) => (
                        <button
                            key={category.id}
                            className={`faq-category-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(category.id);
                                setExpandedItem(null); // Reset accordions on category change
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Accordions Section */}
            <section className="faq-content-section">
                {(activeCategory === 'all' || activeCategory === 'charters') &&
                    renderFaqSection(content.sectionTitles.charters, charterItems)}

                {(activeCategory === 'all' || activeCategory === 'licensing') &&
                    renderFaqSection(content.sectionTitles.licensing, licensingItems)}

                {(activeCategory === 'all' || activeCategory === 'sales') &&
                    renderFaqSection(content.sectionTitles.sales, salesItems)}

                {(activeCategory === 'all' || activeCategory === 'management') &&
                    renderFaqSection(content.sectionTitles.management, managementItems)}

                {/* Call to Action Card */}
                <div className="faq-cta-section">
                    <div className="faq-cta-card">
                        <h3>{content.ctaTitle}</h3>
                        <p>{content.ctaText}</p>
                        <Link to={localizePath('/contact')} className="faq-cta-btn">
                            {content.ctaBtn}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FAQPage;
