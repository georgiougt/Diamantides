import { updateSEO } from '../utils/seo';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import blogsData from '../data/blogs.json';
import '../styles/Blog.css';

const getCategory = (blog) => {
  const slug = blog.slug?.toLowerCase() || '';
  const title = blog.title?.toLowerCase() || '';
  
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

const BlogPage = () => {
    const { t, localizePath, currentLang } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        if (currentLang === 'ru') {
            updateSEO(
                'Яхтенный Блог | Diamantides Yachting', 
                'Читайте последние новости, гиды и обновления от Diamantides Yachting на Кипре. Яхтенные фестивали, люксовый чартер и отраслевые события.'
            );
        } else {
            updateSEO(
                'Yachting Blog | Diamantides Yachting', 
                'Read the latest news, guides, and updates from Diamantides Yachting in Cyprus. Keep up with yacht festivals, luxury charter insights, and industry events.'
            );
        }
        window.scrollTo(0, 0);
    }, [currentLang]);

    const categoryMap = {
        'All': t('blog.all'),
        'Events': t('blog.events'),
        'Guides': t('blog.guides'),
        'News': t('blog.news'),
        'Lifestyle': t('blog.lifestyle')
    };

    const categories = ['All', 'Events', 'Guides', 'News', 'Lifestyle'];

    const filteredBlogs = blogsData.filter(blog => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
            localizedField(blog, 'title', currentLang)?.toLowerCase().includes(term) ||
            localizedField(blog, 'excerpt', currentLang)?.toLowerCase().includes(term) ||
            localizedField(blog, 'content', currentLang)?.toLowerCase().includes(term);

        const category = getCategory(blog);
        const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

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
        <main className="blog-page">
            {/* Premium Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t('blog.heroTitle')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t('blog.heroSubtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Controls: Search and Filters */}
            <section className="blog-controls-container">
                <div className="blog-controls">
                    <div className="blog-search">
                        <Search size={18} className="blog-search-icon" />
                        <input
                            type="text"
                            placeholder={t('blog.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="blog-categories">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {categoryMap[cat]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="blog-grid-section">
                <div className="blog-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredBlogs.map((blog, index) => {
                            const category = getCategory(blog);
                            return (
                                <motion.article
                                    key={blog.slug}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="blog-card"
                                >
                                    <Link to={localizePath(`/blog/${blog.slug}`)} className="blog-card-image-link">
                                        <img
                                            src={blog.coverImage || '/assets/blog/yacht-placeholder.webp'}
                                            alt={blog.title}
                                            className="blog-card-image"
                                            loading="lazy"
                                        />
                                    </Link>
                                    <div className="blog-card-content">
                                        <span className="blog-card-date">
                                            {categoryMap[category]} &bull; {formatDate(blog.date)}
                                        </span>
                                        <Link to={localizePath(`/blog/${blog.slug}`)}>
                                            <h2 className="blog-card-title">{localizedField(blog, 'title', currentLang)}</h2>
                                        </Link>
                                        <p className="blog-card-excerpt">
                                            {localizedField(blog, 'excerpt', currentLang)?.replace(/<[^>]+>/g, '')}
                                        </p>
                                        <div className="blog-card-footer">
                                            <Link to={localizePath(`/blog/${blog.slug}`)} className="blog-read-more">
                                                {t('blog.readArticle')} <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>

                    {filteredBlogs.length === 0 && (
                        <div className="no-blogs-found">
                            <h3>{t('blog.noResults')}</h3>
                            <p>{t('blog.noResultsHint')}</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BlogPage;
