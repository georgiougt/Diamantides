const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Georg/Desktop/Portfolio/Diamantides Yachting/src/styles';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.css'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Replace background-color
    const bgRegex = /background-color:\s*var\(--color-secondary\);/g;
    if (bgRegex.test(content)) {
        content = content.replace(bgRegex, 'background: var(--gradient-metallic-gold);');
        modified = true;
    }

    // 2. Replace text color
    const colorRegex = /color:\s*var\(--color-secondary\);/g;
    if (colorRegex.test(content)) {
        // We add the background clip properties.
        content = content.replace(colorRegex, 'background: var(--gradient-metallic-gold);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    color: transparent;');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}
