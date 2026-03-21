const fs = require('fs');
const path = require('path');

const updatesFile = path.join(__dirname, 'gallery_updates.json');
if (!fs.existsSync(updatesFile)) {
    console.log("No updates file found. Exiting...");
    process.exit(0);
}

const updates = require(updatesFile);
const yachtsFilePath = path.join(__dirname, 'src', 'data', 'yachts.js');

let yachtsContent = fs.readFileSync(yachtsFilePath, 'utf8');

for (const [idStr, galleryPaths] of Object.entries(updates)) {
    const id = parseInt(idStr);
    if (!galleryPaths || galleryPaths.length === 0) continue;

    const galleryStr = '[\n            ' + galleryPaths.map(p => `'${p}'`).join(',\n            ') + '\n        ]';

    // Safely match the gallery associated with this specific ID.
    // We assume every yacht object has a `gallery:` property.
    const regex = new RegExp(`(id:\\s*${id},[\\s\\S]*?gallery:\\s*\\[)([\\s\\S]*?)(\\])`, 'g');
    yachtsContent = yachtsContent.replace(regex, (match, p1, p2, p3) => {
        // Return prefix and the new gallery string instead of the old array contents
        return p1.replace(/\[$/, '') + galleryStr;
    });
}

fs.writeFileSync(yachtsFilePath, yachtsContent, 'utf8');
console.log('Successfully updated src/data/yachts.js with new gallery paths!');
