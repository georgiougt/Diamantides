import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../data/translations.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Determine language prefix from current path
    const isRu = location.pathname.startsWith('/ru');
    const currentLang = isRu ? 'ru' : 'en';

    // Simple lookup function for keys like 'nav.about'
    const t = (pathKey) => {
        const keys = pathKey.split('.');
        let value = translations[currentLang];
        
        for (const key of keys) {
            if (value && value[key] !== undefined) {
                value = value[key];
            } else {
                return pathKey; // Fallback to raw key if translation doesn't exist
            }
        }
        return value;
    };

    // Helper to automatically prepend or strip /ru prefix based on active language
    const localizePath = (path) => {
        if (!path) return '';
        // If external link, don't modify
        if (path.startsWith('http') || path.startsWith('tel:') || path.startsWith('mailto:')) {
            return path;
        }

        const cleanPath = path.startsWith('/ru') 
            ? path.replace(/^\/ru/, '') || '/' 
            : path;

        if (currentLang === 'en') {
            return cleanPath;
        } else {
            return cleanPath === '/' ? '/ru' : `/ru${cleanPath}`;
        }
    };

    // Change language and redirect to the localized URL path
    const changeLanguage = (lang) => {
        if (lang === currentLang) return;
        
        const cleanPath = location.pathname.startsWith('/ru') 
            ? location.pathname.replace(/^\/ru/, '') || '/' 
            : location.pathname;

        const newPath = lang === 'ru' 
            ? (cleanPath === '/' ? '/ru' : `/ru${cleanPath}`) 
            : cleanPath;

        navigate(newPath + location.search + location.hash);
    };

    return (
        <LanguageContext.Provider value={{ currentLang, t, localizePath, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
