const QRCode = require('qrcode');
const fs = require('fs/promises');
const path = require('path');

const BASE_URL = 'https://el-primo-1.github.io/terzocomplex';
const START_DAY = 8;
const END_DAY = 25;  // December 25th (Christmas)
const OUTPUT_DIR = 'advent-calendar';

async function generateQR() {
    await fs.mkdir(path.join(OUTPUT_DIR, 'qr-codes'), { recursive: true });
    
    for (let day = START_DAY; day <= END_DAY; day++) {
        const pageUrl = `${BASE_URL}/advent-calendar/pages/december${day}.html`;
        const qrCodePath = path.join(OUTPUT_DIR, 'qr-codes', `december${day}.png`);
        await QRCode.toFile(qrCodePath, pageUrl);
    }
    
    console.log('Generated QR codes successfully!');
}

generateQR().catch(console.error);