const https = require('https');

https.get('https://diamantidesyachting.com/services/yacht-charter/princess-30m/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // extract all image tags or anything resembling wp-content/uploads
        const imgRegex = /[^"'\s]*wp-content\/uploads[^"'\s]*\.(?:jpg|jpeg|png|webp)/gi;
        let match;
        const urls = new Set();
        while ((match = imgRegex.exec(data)) !== null) {
            urls.add(match[0]);
        }
        console.log(Array.from(urls).join('\n'));
    });
});
