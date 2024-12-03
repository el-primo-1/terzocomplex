const QRCode = require('qrcode');
const fs = require('fs/promises');
const path = require('path');

const BASE_URL = 'https://el-primo-1.github.io/terzocomplex';
const TOTAL_DAYS = 18;
const OUTPUT_DIR = 'advent-calendar';


async function generateQR() {
        // Generate QR codes and HTML pages for each day
        for (let day = 1; day <= TOTAL_DAYS; day++) {
            const pageUrl = `${BASE_URL}/advent-calendar/pages/day${day}.html`;
            const qrCodePath = path.join(OUTPUT_DIR, 'qr-codes', `day${day}.png`);
            const htmlPath = path.join(OUTPUT_DIR, 'pages', `day${day}.html`);
    
            // Generate QR code
            await QRCode.toFile(qrCodePath, pageUrl);
        }
}

generateQR().catch(console.error);