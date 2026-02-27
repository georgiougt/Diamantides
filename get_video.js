const response = await fetch('https://www.pexels.com/video/luxurious-yachts-docked-at-dubai-marina-30346376/');
const text = await response.text();
const matches = text.match(/https:\/\/videos\.pexels\.com\/[^"']+\.mp4/g);
if (matches) {
    console.log([...new Set(matches)]);
} else {
    console.log('No mp4 links found at all');
}
