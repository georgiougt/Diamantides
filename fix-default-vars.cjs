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
            if (content.includes('const templateParams = {') && !content.includes('yacht_name:')) {
                // Insert yacht_name and yacht_type as empty strings to avoid Handlebars compilation errors
                content = content.replace(
                    /const templateParams = \{/g,
                    `const templateParams = {\n            yacht_name: '',\n            yacht_type: '',`
                );
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Added default yacht variables to ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
