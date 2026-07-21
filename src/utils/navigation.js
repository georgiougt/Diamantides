export const getSlug = (name) => {
    if (!name) return '';
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

export const getYachtPath = (yacht) => {
    if (!yacht) return '/';
    const slug = getSlug(yacht.name);
    if (yacht.category === 'charter') {
        return `/charter-yacht/limassol/yacht/${slug}`;
    }
    
    // Determine if it is a boat or yacht for sales
    const isBoat = yacht.specs?.subCategory === 'boat' || 
                   ['RIB', 'Fiberglass', 'jetskis'].includes(yacht.vesselType);
    const subType = isBoat ? 'boat' : 'yacht';
    return `/sales/fleet/${subType}/${slug}`;
};

export const getAssetPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    
    // Detect if current path has a subdirectory base (like /Diamantides)
    const hasSubdirectoryBase = typeof window !== 'undefined' && window.location.pathname.startsWith('/Diamantides');
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    return hasSubdirectoryBase ? `/Diamantides/${cleanPath}` : `/${cleanPath}`;
};

