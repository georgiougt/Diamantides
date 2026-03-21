const fs = require('fs');
const html = fs.readFileSync('inspect.html', 'utf8');

const imgRegex = /data-elementor-open-lightbox="yes"[^>]*href=['"]([^'"]+\.(?:jpg|jpeg|png|webp))['"]/gi;
let match;
const urls = new Set();
while ((match = imgRegex.exec(html)) !== null) {
    urls.add(match[1]);
}

console.log(Array.from(urls));
