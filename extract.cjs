const fs = require('fs');
const https = require('https');

https.get('https://diamantidesyachting.com/services/yacht-charter/', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        // Find all img tags and extract their src attribute
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        let match;
        const urls = new Set();

        while ((match = imgRegex.exec(data)) !== null) {
            let url = match[1];
            if (url.startsWith('//')) {
                url = 'https:' + url;
            } else if (url.startsWith('/')) {
                url = 'https://diamantidesyachting.com' + url;
            }
            if (url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg')) {
                urls.add(url);
            }
        }

        console.log("Found images:");
        console.log(Array.from(urls).join('\n'));
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
