import https from 'https';
import fs from 'fs';

const url = 'https://videos.pexels.com/video-files/30346376/13007433_1280_720_60fps.mp4';
const dest = 'public/vip_hero.mp4';

const file = fs.createWriteStream(dest);

https.get(url, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log('Following redirect to:', response.headers.location);
        https.get(response.headers.location, (redirectResponse) => {
            redirectResponse.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download Completed (followed redirect)');
            });
        });
    } else {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download Completed');
        });
    }
}).on('error', (err) => {
    fs.unlink(dest, () => { });
    console.error('Error downloading file:', err.message);
});
