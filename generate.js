const QRCode = require('qrcode');
const fs = require('fs/promises');
const path = require('path');

// Configuration
const BASE_URL = 'https://el-primo-1.github.io/terzocomplex'; // Replace with your GitHub Pages URL
const TOTAL_DAYS = 18;
const OUTPUT_DIR = 'advent-calendar';

// Basic HTML template
const createHtmlContent = (day, message) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} - Calendario dell'Avvento 🎄</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <h1>Day ${day}</h1>
    <div class="content">
        ${message}
    </div>
</body>
</html>
`;

async function generateCalendar() {
    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'qr-codes'), { recursive: true });
    await fs.mkdir(path.join(OUTPUT_DIR, 'pages'), { recursive: true });

    // Generate QR codes and HTML pages for each day
    for (let day = 1; day <= TOTAL_DAYS; day++) {
        const pageUrl = `${BASE_URL}/pages/day${day}.html`;
        const qrCodePath = path.join(OUTPUT_DIR, 'qr-codes', `day${day}.png`);
        const htmlPath = path.join(OUTPUT_DIR, 'pages', `day${day}.html`);

        // Generate QR code
        await QRCode.toFile(qrCodePath, pageUrl);

        // Create HTML file
        const message = `Add your message or <img src="path-to-image.jpg" alt="Day ${day}"> here for day ${day}`;
        await fs.writeFile(htmlPath, createHtmlContent(day, message));
    }

    // Create index page
    const indexContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Calendario dell'Avvento 🎄</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .day { border: 1px solid #ccc; padding: 10px; text-align: center; }
    </style>
</head>
<body>
    <h1>Calendario dell'Avvento 🎄</h1>
    <div class="grid">
        ${Array.from({length: TOTAL_DAYS}, (_, i) => i + 1)
            .map(day => `<div class="day">
                <h2>Day ${day}</h2>
                <a href="pages/day${day}.html">View Page</a>
            </div>`).join('')}
    </div>
</body>
</html>`;
    
    await fs.writeFile(path.join(OUTPUT_DIR, 'index.html'), indexContent);
}

generateCalendar().catch(console.error);