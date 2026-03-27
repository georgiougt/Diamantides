const fs = require('fs');
const path = require('path');

// Array of images found on the site representing the yachts in order
// Note: We'll map the primary 15 yachts to these downloaded images, 
// skipping duplicates and logos.
const yachtImages = [
    // 1. Princess 30M
    '/Diamantides/gallery/extracted/frame-86.webp',
    // 2. Azimut 27 Grande
    '/Diamantides/gallery/extracted/frame-87.webp',
    // 3. Princess 88
    '/Diamantides/gallery/extracted/frame-88.webp',
    // 4. Falcon 86
    '/Diamantides/gallery/extracted/frame-94.webp',
    // 5. Ferretti 69
    '/Diamantides/gallery/extracted/frame-95.webp',
    // 6. Azimut 64
    '/Diamantides/gallery/extracted/frame-96.webp',
    // 7. Ferretti 550
    '/Diamantides/gallery/extracted/frame-97.webp',
    // 8. Beneteau Monte Carlo 50 Fly
    '/Diamantides/gallery/extracted/frame-98.webp',
    // 9. Fairline Targa 48 V
    '/Diamantides/gallery/extracted/frame-99.webp',
    // 10. Fairline Targa 48
    '/Diamantides/gallery/extracted/frame-100.webp',
    // 11. Azimut 47
    '/Diamantides/gallery/extracted/frame-101.webp',
    // 12. Beneteau Monte Carlo 42
    '/Diamantides/gallery/extracted/frame-102.webp',
    // 13. Amore 110
    '/Diamantides/gallery/extracted/frame-103.webp',
    // 14. Platinum 56
    '/Diamantides/gallery/extracted/frame-105.webp',
    // 15. Beneteau Monte Carlo 52
    '/Diamantides/gallery/extracted/frame-106.webp'
];

const yachtsFilePath = path.join(__dirname, 'src', 'data', 'yachts.js');

let yachtsContent = fs.readFileSync(yachtsFilePath, 'utf8');

// The file exports an array `export const yachts = [ ... ]`
// We will use regex to replace the `image:` strings for the charter yachts (ids 1-15)
for (let id = 1; id <= 15; id++) {
    const imagePath = yachtImages[id - 1];

    // We look for the block containing `id: <id>,` and replace its `image: '...',` line
    const regex = new RegExp(`(id:\\s*${id},[\\s\\S]*?image:\\s*')(.*?)(',)`, 'g');
    yachtsContent = yachtsContent.replace(regex, `$1${imagePath}$3`);
}

fs.writeFileSync(yachtsFilePath, yachtsContent, 'utf8');
console.log('Successfully updated src/data/yachts.js with local extracted images!');
