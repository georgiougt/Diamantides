const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Georg\\.gemini\\antigravity\\brain\\77f4c085-ae56-454c-82b8-9d062e6d526b';
const destDir = path.join(__dirname, 'public', 'world');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const images = [
    { src: 'santorini_greece_luxury_1774851937686.png', name: 'santorini.webp' },
    { src: 'amalfi_coast_italy_luxury_1774851954678.png', name: 'amalfi.webp' },
    { src: 'monaco_monte_carlo_yachts_1774851972122.png', name: 'monaco.webp' },
    { src: 'st_barts_caribbean_yachts_1774851989937.png', name: 'st_barts.webp' },
    { src: 'venice_italy_canals_1774852005835.png', name: 'venice.webp' }
];

async function processImages() {
    for (const img of images) {
        const sourcePath = path.join(sourceDir, img.src);
        const destPath = path.join(destDir, img.name);
        
        console.log(`Processing ${img.src} to ${img.name}...`);
        await sharp(sourcePath)
            .resize(800, 600, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: 80 })
            .toFile(destPath);
    }
    console.log('All world images processed.');
}

processImages().catch(err => {
    console.error('Error processing images:', err);
    process.exit(1);
});
