import { updateSEO } from '../utils/seo';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, TrendingUp, Users, Handshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import '../styles/About.css';

const AboutPage = () => {
    const { currentLang } = useLanguage();
    const isRu = currentLang === 'ru';

    useEffect(() => {
        if (isRu) {
            updateSEO('О нас | Diamantides Yachting', 'Узнайте о ведущей яхтенной компании на Кипре. Наше стремление к совершенству, флот люксовых яхт и персонализированные морские услуги в Лимассоле.');
        } else {
            updateSEO('About Us | Diamantides Yachting', 'Learn about the premier yachting company in Cyprus. Discover our commitment to excellence, luxury yachts fleet, and bespoke marine services in Limassol.');
        }
        window.scrollTo(0, 0);
    }, [isRu]);

    const milestones_en = [
        {
            year: "2002",
            title: "Pioneering Services",
            content: "Introduced the first one-stop comprehensive yacht and boat service with a privately operated yard in Cyprus."
        },
        {
            year: "2008",
            title: "Global Expansion",
            content: "Expanded our operations globally, bringing the Diamantides standard of excellence to international markets."
        },
        {
            year: "2017",
            title: "Viper RIB Dealership",
            content: "Acquired the exclusive dealership for Viper RIB boats, marking a significant milestone in our brand portfolio."
        },
        {
            year: "2018",
            title: "Nautic Clean Partnership",
            content: "Became the exclusive dealer for Nautic Clean products, elevating our yacht care and maintenance standards."
        },
        {
            year: "2020",
            title: "Limassol Expansion",
            content: "Successfully expanded to 3 key locations across Limassol to provide unparalleled service to our local clients."
        },
        {
            year: "2021",
            title: "Malibu & Axis Growth",
            content: "Became authorized resellers of world-leading Malibu and Axis boats, strengthening our market position."
        },
        {
            year: "2025",
            title: "Future Horizons",
            content: "Official dealers of Galeon Yachts and exclusive dealers of Agilis Jet Tenders & Redshark Bikes. Introducing the first luxury sea taxi service in Limassol."
        },
        {
            year: "Today",
            title: "Continuous Presence",
            content: "Maintaining a continuous presence in all major yachting events worldwide, staying at the forefront of the industry."
        }
    ];

    const milestones_ru = [
        {
            year: "2002",
            title: "Первоклассный сервис",
            content: "Представили первую комплексную систему обслуживания яхт и катеров с частным сухим доком на Кипре."
        },
        {
            year: "2008",
            title: "Международный рост",
            content: "Расширили деятельность на глобальном уровне, принеся стандарты превосходства Diamantides на международные рынки."
        },
        {
            year: "2017",
            title: "Дилерство Viper RIB",
            content: "Получили эксклюзивное право дилерства катеров Viper RIB, что стало важной вехой в портфолио наших брендов."
        },
        {
            year: "2018",
            title: "Партнерство с Nautic Clean",
            content: "Стали эксклюзивным дилером премиальной линейки Nautic Clean, подняв стандарты ухода за яхтами на новый уровень."
        },
        {
            year: "2020",
            title: "Расширение в Лимассоле",
            content: "Успешно расширили присутствие до 3 ключевых офисов в Лимассоле для обеспечения непревзойденного сервиса."
        },
        {
            year: "2021",
            title: "Дилерство Malibu и Axis",
            content: "Стали официальным дилером мировых лидеров по производству катеров-буксиров Malibu и Axis."
        },
        {
            year: "2025",
            title: "Будущие горизонты",
            content: "Стали официальными дилерами Galeon Yachts, Agilis Jet Tenders и Redshark Bikes. Запустили первую службу люксового водного такси в Лимассоле."
        },
        {
            year: "Сегодня",
            title: "Мировое присутствие",
            content: "Поддерживаем постоянное участие во всех крупнейших мировых яхтенных выставках, оставаясь в авангарде индустрии."
        }
    ];

    const milestones = isRu ? milestones_ru : milestones_en;

    const values_en = [
        {
            icon: <Shield size={32} />,
            title: "Integrity",
            desc: "Unwavering commitment to moral principles and professional standards."
        },
        {
            icon: <Target size={32} />,
            title: "Accountability",
            desc: "Taking ownership of our actions and delivering on every promise."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Evolution",
            desc: "Continuously learning and evolving with the yachting industry."
        },
        {
            icon: <Handshake size={32} />,
            title: "Respect",
            desc: "Building lasting relationships through mutual respect and support."
        },
        {
            icon: <Users size={32} />,
            title: "Transparency",
            desc: "Ensuring clarity and honesty in every client interaction."
        }
    ];

    const values_ru = [
        {
            icon: <Shield size={32} />,
            title: "Честность",
            desc: "Неукоснительное соблюдение моральных принципов и профессиональных стандартов."
        },
        {
            icon: <Target size={32} />,
            title: "Ответственность",
            desc: "Мы полностью отвечаем за свои действия и выполняем каждое данное обещание."
        },
        {
            icon: <TrendingUp size={32} />,
            title: "Развитие",
            desc: "Постоянное обучение и движение вперед вместе с мировой яхтенной индустрией."
        },
        {
            icon: <Handshake size={32} />,
            title: "Уважение",
            desc: "Строим прочные отношения на основе взаимного уважения и всесторонней поддержки."
        },
        {
            icon: <Users size={32} />,
            title: "Прозрачность",
            desc: "Обеспечиваем полную открытость и честность в каждом взаимодействии с клиентами."
        }
    ];

    const values = isRu ? values_ru : values_en;

    const stats_en = [
        { label: "Years Experience", value: "22+" },
        { label: "Global Markets", value: "6+" },
        { label: "Elite Clients", value: "250+" },
        { label: "Vessel Specialists", value: "15+" }
    ];

    const stats_ru = [
        { label: "Лет Опыта", value: "22+" },
        { label: "Мировых Рынков", value: "6+" },
        { label: "VIP Клиентов", value: "250+" },
        { label: "Тех. Специалистов", value: "15+" }
    ];

    const stats = isRu ? stats_ru : stats_en;

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <span className="hero-tag">{isRu ? "С 2002 года" : "Since 2002"}</span>
                        <h1>
                            <span className="text-highlight">
                                {isRu ? "Создаем незабываемые путешествия в море." : "Crafting Unforgettable Journeys at Sea."}
                            </span>
                        </h1>
                    </motion.div>
                </div>
                <div className="scroll-indicator">
                    <div className="mouse"></div>
                </div>
            </section>

            {/* History Section */}
            <section className="about-history">
                <div className="container">
                    <div className="history-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="history-image"
                        >
                            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop" alt="Founders Story" />
                        </motion.div>
                        <div className="history-text">
                            <h2>{isRu ? "Наша история" : "Our Story"}</h2>
                            <p>
                                {isRu 
                                    ? "То, что началось как увлеченное семейное дело в 2002 году, превратилось в одну из самых уважаемых яхтенных организаций в Средиземноморье. Основанная Антонисом и Мариосом Диамантидес, к которым позже присоединился Димитрис Диамантидес, наша компания строилась на вере в то, что роскошные морские путешествия должны быть легкими и персонализированными."
                                    : "What began as a passionate family endeavor in 2002 has evolved into one of the Mediterranean's most respected yachting organizations. Founded by Antonis and Marios Diamantides and later joined by Demetris Diamantides, our company was built on the belief that luxury seafaring should be a seamless, personalized experience."
                                }
                            </p>
                            <p>
                                {isRu
                                    ? "Более двух десятилетий мы сочетаем традиции с инновациями, относясь к каждому судну, находящемуся под нашей опекой, с той же точностью и уважением, как если бы оно было нашим собственным."
                                    : "For over two decades, we have balanced tradition with innovation, treating every vessel under our care with the same precision and respect as if it were our own."
                                }
                            </p>

                            <div className="timeline-section">
                                {milestones.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="timeline-item"
                                    >
                                        <span className="timeline-year">{item.year}</span>
                                        <div className="timeline-content">
                                            <strong>{item.title}</strong> — {item.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="stat-item"
                            >
                                <h4>{stat.value}</h4>
                                <p>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="about-values">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>{isRu ? "Миссия и Ключевые Ценности" : "Mission & Core Values"}</h2>
                        <p className="subtitle">
                            {isRu ? "Движимые страстью, ведомые принципами." : "Driven by Passion, Guided by Principles."}
                        </p>
                    </div>
                    <div className="values-grid">
                        {values.map((v, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="value-card"
                            >
                                <div className="value-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="about-partners">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>{isRu ? "Стратегические Партнеры" : "Strategic Partners"}</h2>
                    </div>
                    <div className="partners-logos">
                        <div className="partner-item">Malibu/Axis Boats</div>
                        <div className="partner-item">Viper RIBs</div>
                        <div className="partner-item">Galeon Yachts</div>
                        <div className="partner-item">Agilis Jet Tenders</div>
                        <div className="partner-item">Nautic Clean</div>
                        <div className="partner-item">RedShark Bikes</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
