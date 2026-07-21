import { updateSEO } from '../utils/seo';
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import blogsData from '../data/blogs.json';
import '../styles/Blog.css';

const getCategory = (blog) => {
  const slug = blog.slug?.toLowerCase() || '';
  if (slug.includes('festival') || slug.includes('show') || slug.includes('event') || slug.includes('cannes') || slug.includes('monaco') || slug.includes('dusseldorf')) {
    return 'Events';
  } else if (slug.includes('guide') || slug.includes('buy') || slug.includes('how-to') || slug.includes('first-yacht')) {
    return 'Guides';
  } else if (slug.includes('interview') || slug.includes('news') || slug.includes('certification') || slug.includes('ceo')) {
    return 'News';
  } else {
    return 'Lifestyle';
  }
};

// Resolve a blog field for the active language, falling back to English
// when a Russian translation (field_ru) isn't available.
const localizedField = (blog, field, lang) =>
    (lang === 'ru' && blog[`${field}_ru`]) ? blog[`${field}_ru`] : blog[field];

const BlogDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t, localizePath, currentLang } = useLanguage();

    const blog = blogsData.find((b) => b.slug === slug);

    const categoryMap = {
        'Events': t('blog.events'),
        'Guides': t('blog.guides'),
        'News': t('blog.news'),
        'Lifestyle': t('blog.lifestyle')
    };

    useEffect(() => {
        if (blog) {
            updateSEO(
                `${localizedField(blog, 'title', currentLang)} | Diamantides Yachting`,
                localizedField(blog, 'excerpt', currentLang)?.substring(0, 155).replace(/<[^>]+>/g, '') || (currentLang === 'ru' ? 'Читайте эту статью от Diamantides Yachting.' : 'Read this article from Diamantides Yachting.')
            );
        }
        window.scrollTo(0, 0);
    }, [blog, slug, currentLang]);

    if (!blog) {
        return (
            <main className="blog-page" style={{ padding: '150px 20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--color-secondary)' }}>{t('blog.notFound')}</h1>
                    <p style={{ color: '#ccc', marginBottom: '40px' }}>{t('blog.notFoundDesc')}</p>
                    <Link to={localizePath('/blog')} className="category-btn active" style={{ display: 'inline-flex', padding: '12px 30px' }}>
                        {t('blog.backToJournal')}
                    </Link>
                </div>
            </main>
        );
    }

    const category = getCategory(blog);
    
    // Find related articles (same category or next ones)
    const relatedBlogs = blogsData
        .filter((b) => b.slug !== blog.slug)
        .filter((b) => getCategory(b) === category || getCategory(b) !== category)
        .sort((a, b) => {
            const catA = getCategory(a) === category ? 1 : 0;
            const catB = getCategory(b) === category ? 1 : 0;
            return catB - catA;
        })
        .slice(0, 3);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <main className="blog-detail-page">
            {/* Header / Hero with cover image */}
            <section 
                className="blog-detail-hero" 
                style={{ backgroundImage: `url(${blog.coverImage || '/assets/blog/yacht-placeholder.webp'})` }}
            >
                <div className="blog-detail-hero-content">
                    <motion.div 
                        className="blog-detail-meta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="blog-detail-category">{categoryMap[category] || category}</span>
                        <span className="blog-detail-date">{formatDate(blog.date)}</span>
                    </motion.div>
                    <motion.h1
                        className="blog-detail-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {localizedField(blog, 'title', currentLang)}
                    </motion.h1>
                </div>
            </section>

            {/* Navigation back */}
            <div className="blog-detail-nav">
                <Link to={localizePath('/blog')} className="blog-back-btn">
                    <ArrowLeft size={16} /> {t('blog.backToJournal')}
                </Link>
            </div>

            {/* Content Container */}
            <section className="blog-detail-container">
                <motion.article 
                    className="blog-detail-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    dangerouslySetInnerHTML={{ __html: localizedField(blog, 'content', currentLang) }}
                />
            </section>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
                <section className="blog-related-section">
                    <div className="blog-related-container">
                        <div className="blog-related-header">
                            <h2>{t('blog.relatedArticles')}</h2>
                        </div>
                        <div className="blog-grid">
                            {relatedBlogs.map((item) => {
                                const itemCategory = getCategory(item);
                                return (
                                    <article key={item.slug} className="blog-card">
                                        <Link to={localizePath(`/blog/${item.slug}`)} className="blog-card-image-link">
                                            <img
                                                src={item.coverImage || '/assets/blog/yacht-placeholder.webp'}
                                                alt={item.title}
                                                className="blog-card-image"
                                                loading="lazy"
                                            />
                                        </Link>
                                        <div className="blog-card-content">
                                            <span className="blog-card-date">
                                                {categoryMap[itemCategory] || itemCategory} &bull; {formatDate(item.date)}
                                            </span>
                                            <Link to={localizePath(`/blog/${item.slug}`)}>
                                                <h3 className="blog-card-title">{localizedField(item, 'title', currentLang)}</h3>
                                            </Link>
                                            <p className="blog-card-excerpt">
                                                {localizedField(item, 'excerpt', currentLang)?.replace(/<[^>]+>/g, '')}
                                            </p>
                                            <div className="blog-card-footer">
                                                <Link to={localizePath(`/blog/${item.slug}`)} className="blog-read-more">
                                                    {t('blog.readArticle')} <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default BlogDetailPage;
