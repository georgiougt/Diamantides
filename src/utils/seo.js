// SEO Utility helper to dynamically update document title, meta description, canonical url, and structured data schema
export const updateSEO = (title, description, schemaJson = null) => {
    document.title = title;
    
    // 1. Update/Create Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
    }

    // 2. Update/Create Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', title);
    } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = title;
        document.head.appendChild(meta);
    }

    // 3. Update/Create Open Graph Description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', description);
    } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = description;
        document.head.appendChild(meta);
    }

    // 4. Update/Create Canonical Link (reference to single production domain to avoid duplicates)
    let canonical = document.querySelector('link[rel="canonical"]');
    let cleanPath = window.location.pathname;
    if (cleanPath === '/') {
        cleanPath = '';
    } else if (!cleanPath.endsWith('/')) {
        cleanPath = cleanPath + '/';
    }
    const canonicalUrl = `https://diamantidesyachting.com${cleanPath}`;
    if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
    } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
    }

    // 5. Update/Create Dynamic JSON-LD Schema (remove previous dynamic schema script blocks if they exist)
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]:not(#faq-schema)');
    existingSchemas.forEach(el => el.remove());

    if (schemaJson) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.className = 'dynamic-seo-schema';
        script.text = JSON.stringify(schemaJson);
        document.head.appendChild(script);
    }
};
