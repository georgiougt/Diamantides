import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PostcardCarousel = ({ images, title, subtitle, link, isExternal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleNext = useCallback((e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback((e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    // Keyboard Navigation
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setIsLightboxOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, handleNext, handlePrev]);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLightboxOpen]);

    useEffect(() => {
        if (isLightboxOpen) return; // Pause rotation when lightbox is open
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 2300); // Rotate every 2.3 second

        return () => clearInterval(timer);
    }, [images.length, isLightboxOpen]);

    const activeImage = images[currentIndex];
    const imageUrl = typeof activeImage === 'string' ? activeImage : activeImage.url;
    const imageTitle = typeof activeImage === 'string' ? '' : activeImage.title;

    const content = (
        <>
            <div className="postcard-text">
                <h3>{title}</h3>
                <div className="postcard-subtitle-wrapper" style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {subtitle ? <span className="btn-view-all">{subtitle}</span> : null}
                </div>
            </div>
            <div className="postcard-img-wrapper" onClick={(e) => { e.stopPropagation(); !link && setIsLightboxOpen(true); }}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={imageUrl}
                        alt={`${title} ${currentIndex + 1}`}
                        className="postcard-img"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={!isLightboxOpen ? { scale: 1.05 } : {}}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            opacity: { duration: 0.8 },
                            scale: { duration: 0.4, ease: "easeOut" }
                        }}
                    />
                </AnimatePresence>
                {/* Optional: Dot indicators */}
                <div className="carousel-dots">
                    {images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );

    const lightbox = (
        <AnimatePresence>
            {isLightboxOpen && (
                <motion.div 
                    className="postcard-lightbox-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <motion.button 
                        className="lightbox-close"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLightboxOpen(false);
                        }}
                    >
                        <X size={28} />
                    </motion.button>

                    <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
                        <motion.button 
                            className="lightbox-nav-btn prev"
                            onClick={handlePrev}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft size={36} />
                        </motion.button>

                        <motion.div 
                            className="lightbox-image-wrapper"
                            key={currentIndex} // Trigger animation on index change
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={imageUrl} alt={imageTitle || title} className="lightbox-main-img" />
                            
                            {imageTitle && (
                                <div className="lightbox-caption-minimal">
                                    <span className="caption-category">{title}</span>
                                    <h2 className="caption-title">{imageTitle}</h2>
                                </div>
                            )}
                        </motion.div>

                        <motion.button 
                            className="lightbox-nav-btn next"
                            onClick={handleNext}
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight size={36} />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (link) {
        if (isExternal) {
            return (
                <a href={link} className="postcard" target="_blank" rel="noopener noreferrer">
                    {content}
                </a>
            );
        }
        return (
            <motion.div whileHover={{ y: -8 }} className="postcard-link-wrapper">
                <a href={link} className="postcard">
                    {content}
                </a>
            </motion.div>
        );
    }

    return (
        <div className="postcard">
            {content}
            {createPortal(lightbox, document.body)}
        </div>
    );
};

export default PostcardCarousel;
