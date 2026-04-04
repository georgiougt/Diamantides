const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\Georg\\.gemini\\antigravity\\brain\\77f4c085-ae56-454c-82b8-9d062e6d526b';
const destDir = path.join(__dirname, 'public', 'destinations');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const images = [
    { src: 'pissouri_beach_cyprus_1774849484900.png', name: 'pissouri.webp' },
    { src: 'latsi_harbor_cyprus_1774849517144.png', name: 'latsi.webp' },
    { src: 'governors_beach_cyprus_1774849547897.png', name: 'governors.webp' },
    { src: 'paphos_harbor_cyprus_1774849579248.png', name: 'paphos.webp' },
    { src: 'ayia_napa_sea_caves_1774849609582.png', name: 'ayia_napa.webp' },
    { src: 'protaras_fig_tree_bay_1774849637441.png', name: 'protaras.webp' }
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
    console.log('All destination images processed.');
}

processImages().catch(err => {
    console.error('Error processing images:', err);
    process.exit(1);
});
