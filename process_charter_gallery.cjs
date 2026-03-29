const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, 'public', 'gallery', 'charter galleries', 'Charter');
const DEST_DIR = path.join(__dirname, 'public', 'assets', 'charter-gallery');
const UPDATES_FILE = path.join(__dirname, 'gallery_updates.json');

// Mapping between yacht names in yachts.js and folder names in source directory
const yachtToFolderMap = {
    'Princess 30M': 'Princess 30M',
    'Azimut 27 Grande': 'Azimut 27 Grande',
    'Princess 88': 'Princess 88',
    'Falcon 86': 'Falcon 86',
    'Ferretti 69': 'Ferretti 69',
    'Azimut 64': 'Azimut 64',
    'Ferretti 550': 'Ferretti 550',
    'Beneteau Monte Carlo 50 Fly': 'Beneteau Monte Carlo 50 Fly',
    'Fairline Targa 48 V': 'Fairline Targa 48V',
    'Fairline Targa 48': 'Fairline Targa 48',
    'Azimut 47': 'Azimut 47',
    'Beneteau Monte Carlo 42': 'Beneteau Monte Carlo 42',
    'Private Yacht 110ft': 'Private Yacht 110 ft',
    'Sunseeker Manhattan 56': 'Sunseeker Manhattan 56',
    'Beneteau Monte Carlo 52': 'Beneteau Monte Carlo 52',
    'Princess 62': 'Princess 62',
    'Cranchi Fifty 8 Fly': 'Cranchi fifty 8 Fly',
    'Navan C30 (Sea Taxi)': 'Sea Taxi'
};

// We need the ID to update gallery_updates.json
const yachts = [
    { id: 1, name: 'Princess 30M' },
    { id: 2, name: 'Azimut 27 Grande' },
    { id: 3, name: 'Princess 88' },
    { id: 4, name: 'Falcon 86' },
    { id: 5, name: 'Ferretti 69' },
    { id: 6, name: 'Azimut 64' },
    { id: 7, name: 'Ferretti 550' },
    { id: 8, name: 'Beneteau Monte Carlo 50 Fly' },
    { id: 9, name: 'Fairline Targa 48 V' },
    { id: 10, name: 'Fairline Targa 48' },
    { id: 11, name: 'Azimut 47' },
    { id: 12, name: 'Beneteau Monte Carlo 42' },
    { id: 13, name: 'Private Yacht 110ft' },
    { id: 14, name: 'Sunseeker Manhattan 56' },
    { id: 15, name: 'Beneteau Monte Carlo 52' },
    { id: 22, name: 'Princess 62' },
    { id: 23, name: 'Cranchi Fifty 8 Fly' },
    { id: 24, name: 'Navan C30 (Sea Taxi)' }
];

async function processGalleries() {
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR, { recursive: true });
    }

    const updates = {};

    for (const yacht of yachts) {
        const folderName = yachtToFolderMap[yacht.name];
        if (!folderName) {
            console.warn(`No mapping for yacht: ${yacht.name}`);
            continue;
        }

        const sourcePath = path.join(SOURCE_DIR, folderName);
        if (!fs.existsSync(sourcePath)) {
            console.warn(`Source directory not found: ${sourcePath}`);
            continue;
        }

        const destPath = path.join(DEST_DIR, folderName.replace(/\s+/g, '-').toLowerCase());
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }

        const files = fs.readdirSync(sourcePath).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        });

        console.log(`Processing ${files.length} images for ${yacht.name}...`);
        const galleryPaths = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const outputFilename = `image-${i + 1}.webp`;
            const outputPath = path.join(destPath, outputFilename);

            try {
                await sharp(path.join(sourcePath, file))
                    .webp({ quality: 85 })
                    .toFile(outputPath);
                
                // Construct the public URL
                const publicUrl = `/Diamantides/assets/charter-gallery/${path.basename(destPath)}/${outputFilename}`;
                galleryPaths.push(publicUrl);
            } catch (err) {
                console.error(`Error processing ${file} for ${yacht.name}:`, err.message);
            }
        }

        updates[yacht.id] = galleryPaths;
    }

    fs.writeFileSync(UPDATES_FILE, JSON.stringify(updates, null, 4));
    console.log(`Gallery processing complete. Updates written to ${UPDATES_FILE}`);
}

processGalleries().catch(console.error);
