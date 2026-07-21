import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './PrivacyPolicy.css'; // Reusing the same styling for consistency

const content = {
    en: (
        <>
            <section>
                <h2>1. Agreement to Terms</h2>
                <p>Welcome to Diamantides Yachting. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our website or services.</p>
            </section>

            <section>
                <h2>2. Services Description</h2>
                <p>Diamantides Yachting provides luxury yachting services including, but not limited to, yacht chartering, yacht sales, and yacht management. All services are subject to availability and specific contract terms provided at the time of booking or purchase.</p>
            </section>

            <section>
                <h2>3. Use of Website</h2>
                <p>You agree to use this website for lawful purposes only. You are prohibited from using the site to transmit any material that is unlawful, harmful, threatening, or otherwise objectionable.</p>
            </section>

            <section>
                <h2>4. Intellectual Property</h2>
                <p>All content on this website, including text, graphics, logos, images, and software, is the property of Diamantides Yachting or its content suppliers and is protected by international copyright laws. Unauthorized use of this content is strictly prohibited.</p>
            </section>

            <section>
                <h2>5. Limitation of Liability</h2>
                <p>Diamantides Yachting shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website. This includes, but is not limited to, damages for loss of profits, use, or data.</p>
                <p>Yachting activities involve inherent risks. While we maintain the highest safety standards, participants acknowledge and assume these risks when engaging in our charter services.</p>
            </section>

            <section>
                <h2>6. Privacy</h2>
                <p>Your use of our website is also governed by our <a href="/#/privacy-policy">Privacy Policy</a>. Please review the policy to understand our practices regarding your personal information.</p>
            </section>

            <section>
                <h2>7. Governing Law</h2>
                <p>These terms and conditions are governed by and construed in accordance with the laws of the Republic of Cyprus. You irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            </section>

            <section>
                <h2>8. Changes to Terms</h2>
                <p>Diamantides Yachting reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site following the posting of changes constitutes your acceptance of such changes.</p>
            </section>

            <section>
                <h2>9. Contact Us</h2>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <p>
                    Email: <a href="mailto:administration@diamantidesyachting.com">administration@diamantidesyachting.com</a><br />
                    Phone: +357 25 010 561
                </p>
            </section>
        </>
    ),
    ru: (
        <>
            <section>
                <h2>1. Принятие условий</h2>
                <p>Добро пожаловать в Diamantides Yachting. Получая доступ к нашему сайту и услугам или используя их, вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны со всеми условиями, пожалуйста, не используйте наш сайт и услуги.</p>
            </section>

            <section>
                <h2>2. Описание услуг</h2>
                <p>Diamantides Yachting предоставляет услуги люксового яхтинга, включая, помимо прочего, аренду яхт, продажу яхт и управление яхтами. Все услуги предоставляются при наличии возможности и на конкретных договорных условиях, предоставляемых в момент бронирования или покупки.</p>
            </section>

            <section>
                <h2>3. Использование сайта</h2>
                <p>Вы соглашаетесь использовать данный сайт только в законных целях. Запрещается использовать сайт для передачи любых материалов, которые являются незаконными, вредоносными, угрожающими или иным образом неприемлемыми.</p>
            </section>

            <section>
                <h2>4. Интеллектуальная собственность</h2>
                <p>Весь контент данного сайта, включая тексты, графику, логотипы, изображения и программное обеспечение, является собственностью Diamantides Yachting или её поставщиков контента и защищён международным законодательством об авторском праве. Несанкционированное использование этого контента строго запрещено.</p>
            </section>

            <section>
                <h2>5. Ограничение ответственности</h2>
                <p>Diamantides Yachting не несёт ответственности за любые прямые, косвенные, случайные, особые или последующие убытки, возникшие в результате использования или невозможности использования наших услуг или сайта. Это включает, помимо прочего, убытки от потери прибыли, возможности использования или данных.</p>
                <p>Яхтенная деятельность связана с неотъемлемыми рисками. Хотя мы поддерживаем высочайшие стандарты безопасности, участники признают и принимают эти риски при использовании наших чартерных услуг.</p>
            </section>

            <section>
                <h2>6. Конфиденциальность</h2>
                <p>Использование нашего сайта также регулируется нашей <a href="/#/privacy-policy">Политикой конфиденциальности</a>. Пожалуйста, ознакомьтесь с ней, чтобы понять наши практики в отношении вашей персональной информации.</p>
            </section>

            <section>
                <h2>7. Применимое право</h2>
                <p>Настоящие условия регулируются и толкуются в соответствии с законодательством Республики Кипр. Вы безоговорочно подчиняетесь исключительной юрисдикции судов данной юрисдикции.</p>
            </section>

            <section>
                <h2>8. Изменение условий</h2>
                <p>Diamantides Yachting оставляет за собой право изменять настоящие Условия использования в любое время. Изменения вступают в силу немедленно после публикации на сайте. Продолжение использования сайта после публикации изменений означает ваше согласие с ними.</p>
            </section>

            <section>
                <h2>9. Связаться с нами</h2>
                <p>Если у вас есть вопросы по настоящим Условиям использования, свяжитесь с нами:</p>
                <p>
                    Email: <a href="mailto:administration@diamantidesyachting.com">administration@diamantidesyachting.com</a><br />
                    Телефон: +357 25 010 561
                </p>
            </section>
        </>
    )
};

const titles = {
    en: 'Terms of Service',
    ru: 'Условия использования'
};

const TermsOfServicePage = () => {
    const { currentLang } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-hero">
                <div className="container">
                    <h1>{titles[currentLang] || titles.en}</h1>
                </div>
            </div>

            <div className="privacy-policy-content container">
                {content[currentLang] || content.en}
            </div>
        </div>
    );
};

export default TermsOfServicePage;
