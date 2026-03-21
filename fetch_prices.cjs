const https = require('https');

const urls = [
    'https://diamantidesyachting.com/services/yacht-charter/princess-30m/',
    'https://diamantidesyachting.com/services/yacht-charter/azimut-27-grande/',
    'https://diamantidesyachting.com/services/yacht-charter-old/princess-88-2/',
    'https://diamantidesyachting.com/services/yacht-charter-old/falcon-86/',
    'https://diamantidesyachting.com/services/yacht-charter-old/ferreti-69/',
    'https://diamantidesyachting.com/services/yacht-charter-old/azimut-64/',
    'https://diamantidesyachting.com/services/yacht-charter-old/ferretti-550/',
    'https://diamantidesyachting.com/services/yacht-charter-old/beneteau-monte-carlo-50/',
    'https://diamantidesyachting.com/services/yacht-charter-old/fairline-targa-48v/',
    'https://diamantidesyachting.com/services/yacht-charter-old/fairline-targa-48/',
    'https://diamantidesyachting.com/services/yacht-charter-old/atlantis-47/',
    'https://diamantidesyachting.com/services/yacht-charter-old/beneteau-monte-carlo-42/'
];

async function fetchPrices() {
    for (const url of urls) {
        await new Promise((resolve) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    console.log(`\nURL: ${url}`);

                    const hdMatch = data.match(/Half Day<\/td>\s*<td.*?>(.*?)<\/td>/i);
                    const fdMatch = data.match(/Full Day<\/td>\s*<td.*?>(.*?)<\/td>/i);
                    const weekMatch = data.match(/Weekly<\/td>\s*<td.*?>(.*?)<\/td>/i);
                    const perDayMatch = data.match(/Per Day<\/td>\s*<td.*?>(.*?)<\/td>/i);

                    let foundPrice = false;

                    if (hdMatch) {
                        console.log(`Half Day: ${hdMatch[1].replace(/\?/g, '€')}`); foundPrice = true;
                    }
                    if (fdMatch) {
                        console.log(`Full Day: ${fdMatch[1].replace(/\?/g, '€')}`); foundPrice = true;
                    }
                    if (weekMatch) {
                        console.log(`Weekly: ${weekMatch[1].replace(/\?/g, '€')}`); foundPrice = true;
                    }
                    if (perDayMatch) {
                        console.log(`Per Day: ${perDayMatch[1].replace(/\?/g, '€')}`); foundPrice = true;
                    }

                    if (!foundPrice) {
                        console.log('Prices: On Request');
                    }
                    resolve();
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                resolve();
            });
        });
    }
}

fetchPrices();
