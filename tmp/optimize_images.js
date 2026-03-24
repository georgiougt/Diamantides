import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'c:/Users/Georg/Desktop/Portfolio/Diamantides Yachting/src/assets/charter info/Profile Pictures Charters';
const outputDir = 'c:/Users/Georg/Desktop/Portfolio/Diamantides Yachting/src/assets/charter-optimized';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

async function optimize() {
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const inputPath = path.join(inputDir, file);
            // Replace spaces with hyphens and remove special characters for cleaner filenames
            const cleanName = file.replace(/\s+/g, '-').replace(/[()]/g, '').toLowerCase().replace(/\.(jpg|jpeg|png)$/i, '.webp');
            const outputPath = path.join(outputDir, cleanName);
            
            console.log(`Optimizing: ${file} -> ${cleanName}`);
            
            await sharp(inputPath)
                .resize(1200, null, { withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);
        }
    }
}

optimize().then(() => console.log('Optimization complete')).catch(err => console.error(err));
