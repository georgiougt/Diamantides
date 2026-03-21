const https = require('https');

https.get('https://diamantidesyachting.com/services/yacht-charter/', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const linkRegex = /href="([^"]+)"/g;
        let match;
        const urls = new Set();
        while ((match = linkRegex.exec(data)) !== null) {
            urls.add(match[1]);
        }

        // Filter out common links that aren't specific boat profiles if possible
        const boatLinks = Array.from(urls).filter(u => u.includes('diamantidesyachting.com/yachts/') || (u.includes('diamantidesyachting.com/') && !u.includes('wp-content')));
        console.log("Found links:");
        console.log(boatLinks.join('\n'));
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
