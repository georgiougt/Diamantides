const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('charters@diamantidesyachting.com')) {
                content = content.replace(/charters@diamantidesyachting\.com/g, 'charter@diamantidesyachting.com');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed typo in ${fullPath}`);
            }
        }
    }
}

replaceInDir(path.join(__dirname, 'src'));
