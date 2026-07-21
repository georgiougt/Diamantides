const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('EMAILJS_CONFIG.PUBLIC_KEY') && !content.includes('{ publicKey: EMAILJS_CONFIG.PUBLIC_KEY }')) {
                // Replace raw public key string parameter with v4-compliant options object
                content = content.replace(
                    /EMAILJS_CONFIG\.PUBLIC_KEY\s*\n*\s*\)/g,
                    `{ publicKey: EMAILJS_CONFIG.PUBLIC_KEY }\n            )`
                );
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated EmailJS call in ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
