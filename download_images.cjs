const fs = require('fs');
const https = require('https');
const path = require('path');
const sharp = require('sharp');

const urls = [
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-86.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-87.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-88.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-94.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-95.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-96.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-97.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-98.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-99.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-100.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-101.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-102.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-103.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/07/img-20250711-wa0009.jpg",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-105.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-106.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/07/6-scaled.jpg",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-107.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-108.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-109.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-70.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-71.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-82.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-83.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-84.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-85.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-72.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-73.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-74.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-75.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-76.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-77.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-78.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-79.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-80.png",
    "https://diamantidesyachting.com/wp-content/uploads/2025/05/frame-81.png"
];

const dir = path.join(__dirname, 'public', 'gallery', 'extracted');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function processImage(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', async () => {
                const buffer = Buffer.concat(chunks);
                const filename = url.split('/').pop().split('.')[0] + '.webp';
                const output = path.join(dir, filename);

                try {
                    await sharp(buffer)
                        .resize({ width: 1200, withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(output);
                    console.log(`Optimized: ${filename}`);
                    resolve();
                } catch (e) {
                    console.error(`Failed to process ${url}:`, e);
                    resolve();
                }
            });
        }).on('error', (e) => {
            console.error(`Failed to download ${url}:`, e);
            resolve();
        });
    });
}

async function main() {
    for (const url of urls) {
        await processImage(url);
    }
    console.log("Optimization complete.");
}
main();
