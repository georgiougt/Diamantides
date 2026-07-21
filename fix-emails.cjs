const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function updateFile(filePath, toEmail) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has to_email to avoid duplicates
    if (content.includes('to_email:')) return;
    
    content = content.replace(/const templateParams = \{/g, `const templateParams = {\n            to_email: '${toEmail}',`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

// 1. Files getting charters email
updateFile(path.join(srcDir, 'pages', 'CharterTestPage.jsx'), 'charters@diamantidesyachting.com');

// YachtDetail - dynamic based on yacht category
let detailPath = path.join(srcDir, 'components', 'YachtDetail.jsx');
let detailContent = fs.readFileSync(detailPath, 'utf8');
if (!detailContent.includes('to_email:')) {
    detailContent = detailContent.replace(/const templateParams = \{/g, `const templateParams = {\n            to_email: yacht?.category === 'sales' ? 'administration@diamantidesyachting.com' : 'charters@diamantidesyachting.com',`);
    fs.writeFileSync(detailPath, detailContent, 'utf8');
    console.log(`Updated YachtDetail.jsx`);
}

// 2. Files getting administration email
updateFile(path.join(srcDir, 'pages', 'RedsharkBikesPage.jsx'), 'administration@diamantidesyachting.com');
