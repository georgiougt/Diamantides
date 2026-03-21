const fs = require('fs');

async function fetchHtml() {
    try {
        const response = await fetch('https://diamantidesyachting.com/services/yacht-charter-old/atlantis-47/');
        if (!response.ok) {
            console.log(`Failed to fetch - Status ${response.status}`);
            return;
        }
        const html = await response.text();
        fs.writeFileSync('inspect.html', html);
        console.log('Saved to inspect.html');
    } catch (e) {
        console.error(`Fetch error:`, e);
    }
}

fetchHtml();
