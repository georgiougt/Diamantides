const fs = require('fs');
const https = require('https');
const path = require('path');
const sharp = require('sharp');

const yachtLinks = [
    { id: 1, name: 'princess-30m', url: 'https://diamantidesyachting.com/services/yacht-charter/princess-30m/' },
    { id: 2, name: 'azimut-27-grande', url: 'https://diamantidesyachting.com/services/yacht-charter/azimut-27-grande/' },
    { id: 3, name: 'princess-88', url: 'https://diamantidesyachting.com/services/yacht-charter-old/princess-88-2/' },
    { id: 4, name: 'falcon-86', url: 'https://diamantidesyachting.com/services/yacht-charter-old/falcon-86/' },
    { id: 5, name: 'ferretti-69', url: 'https://diamantidesyachting.com/services/yacht-charter-old/ferreti-69/' },
    { id: 6, name: 'azimut-64', url: 'https://diamantidesyachting.com/services/yacht-charter-old/azimut-64/' },
    { id: 7, name: 'ferretti-550', url: 'https://diamantidesyachting.com/services/yacht-charter-old/ferretti-550/' },
    { id: 8, name: 'beneteau-monte-carlo-50', url: 'https://diamantidesyachting.com/services/yacht-charter-old/beneteau-monte-carlo-50/' },
    { id: 9, name: 'fairline-targa-48v', url: 'https://diamantidesyachting.com/services/yacht-charter-old/fairline-targa-48v/' },
    { id: 10, name: 'fairline-targa-48', url: 'https://diamantidesyachting.com/services/yacht-charter-old/fairline-targa-48/' },
    { id: 11, name: 'azimut-atlantis-47', url: 'https://diamantidesyachting.com/services/yacht-charter-old/atlantis-47/' },
    { id: 12, name: 'beneteau-monte-carlo-42', url: 'https://diamantidesyachting.com/services/yacht-charter-old/beneteau-monte-carlo-42/' }
    // Yachts 13, 14, 15 do not have known profile pages on the site, skipping.
];

const baseOutDir = path.join(__dirname, 'public', 'gallery', 'extracted');

async function fetchHtml(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch ${url} - Status ${response.status}`);
            return '';
        }
        return await response.text();
    } catch (e) {
        console.error(`Fetch error for ${url}:`, e);
        return '';
    }
}

function extractImages(html) {
    const lightboxRegex = /data-elementor-open-lightbox="yes"[^>]*href=['"]([^'"]+\.(?:jpg|jpeg|png|webp))['"]/gi;
    let match;
    const urls = new Set();
    while ((match = lightboxRegex.exec(html)) !== null) {
        urls.add(match[1]);
    }

    let extracted = Array.from(urls);
    if (extracted.length > 0) {
        return extracted;
    }

    // Fallback if no lightbox images exist
    const imgRegex = /(?:href|src|data-src)="([^"]+\.(?:jpg|jpeg|png))"/g;
    while ((match = imgRegex.exec(html)) !== null) {
        let url = match[1];
        if (url.startsWith('//')) {
            url = 'https:' + url;
        } else if (url.startsWith('/')) {
            url = 'https://diamantidesyachting.com' + url;
        }
        if (!url.match(/-\d+x\d+\.(jpg|jpeg|png)$/i) && url.includes('wp-content/uploads') && !url.includes('logo')) {
            urls.add(url);
        }
    }
    return Array.from(urls);
}

async function downloadAndOptimize(url, outPath) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                console.log(`Failed to fetch ${url} - Status ${res.statusCode}`);
                resolve(false);
                return;
            }
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', async () => {
                const buffer = Buffer.concat(chunks);
                try {
                    await sharp(buffer)
                        .resize({ width: 1200, withoutEnlargement: true })
                        .webp({ quality: 80 })
                        .toFile(outPath);
                    resolve(true);
                } catch (e) {
                    console.error(`Sharp error for ${url}:`, e);
                    resolve(false);
                }
            });
        }).on('error', (e) => {
            console.error(`Request error for ${url}:`, e);
            resolve(false);
        });
    });
}

async function main() {
    const yachtsDataUpdate = {};

    for (const yacht of yachtLinks) {
        console.log(`Processing ${yacht.name}...`);
        try {
            const html = await fetchHtml(yacht.url);
            const images = extractImages(html);

            console.log(`Found ${images.length} potential gallery images for ${yacht.name}`);

            const outDir = path.join(baseOutDir, yacht.name);
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }

            const savedImages = [];
            let i = 1;
            for (const imgUrl of images) {
                const outPath = path.join(outDir, `gallery-${i}.webp`);
                const relativePath = `/Diamantides/gallery/extracted/${yacht.name}/gallery-${i}.webp`;

                const success = await downloadAndOptimize(imgUrl, outPath);
                if (success) {
                    savedImages.push(relativePath);
                    i++;
                }

                // Let's limit to 15 images per yacht to capture the full gallery
                if (i > 15) break;
            }

            yachtsDataUpdate[yacht.id] = savedImages;
            console.log(`Successfully saved ${savedImages.length} images for ${yacht.name}`);

        } catch (err) {
            console.error(`Error processing ${yacht.name}:`, err);
        }
    }

    fs.writeFileSync(path.join(__dirname, 'gallery_updates.json'), JSON.stringify(yachtsDataUpdate, null, 2));
    console.log("Finished processing all yachts. Updates saved to gallery_updates.json.");
}

main();
