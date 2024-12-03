const QRCode = require('qrcode');
const fs = require('fs/promises');
const path = require('path');

// Configuration
const BASE_URL = 'https://el-primo-1.github.io/terzocomplex';
const TOTAL_DAYS = 18;
const OUTPUT_DIR = 'advent-calendar';

// Enhanced HTML template
const createHtmlContent = (day, message) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giorno ${day} - Calendario dell'Avvento 🎄</title>
    <style>
        body {
            font-family: 'Cormorant Garamond', Georgia, serif;
            margin: 0;
            min-height: 100vh;
            background: linear-gradient(to bottom, #f8f4e6, #eae0cc);
            color: #2c1810;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2.5rem;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #66392c;
            font-weight: normal;
            border-bottom: 2px solid #d4b59e;
            padding-bottom: 0.5rem;
        }

        .content {
            font-size: 1.4rem;
            line-height: 1.8;
            margin: 2rem 0;
            padding: 0 1rem;
        }

        .psalm-decoration {
            color: #8b5e3c;
            font-style: italic;
            margin-top: 1.5rem;
            font-size: 1.1rem;
        }

        .olive-branch {
            width: 150px;
            height: 150px;
            margin: 2rem auto;
        }

        @media (max-width: 600px) {
            .container {
                margin: 1rem;
                padding: 1.5rem;
            }
            
            .content {
                font-size: 1.2rem;
                padding: 0;
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Giorno ${day}</h1>
        <svg class="olive-branch" viewBox="0 0 100 100">
            <path d="M50,90 C30,60 70,60 50,30" fill="none" stroke="#4a6741" stroke-width="2"/>
            <path d="M45,85 C35,65 65,65 45,35" fill="none" stroke="#4a6741" stroke-width="2"/>
            <path d="M55,85 C35,65 75,65 55,35" fill="none" stroke="#4a6741" stroke-width="2"/>
            <g fill="#718e5c">
                <ellipse cx="50" cy="40" rx="4" ry="8" transform="rotate(-20)"/>
                <ellipse cx="45" cy="50" rx="4" ry="8" transform="rotate(-10)"/>
                <ellipse cx="55" cy="60" rx="4" ry="8" transform="rotate(10)"/>
                <ellipse cx="48" cy="70" rx="4" ry="8" transform="rotate(-15)"/>
                <ellipse cx="52" cy="80" rx="4" ry="8" transform="rotate(15)"/>
            </g>
        </svg>
        <div class="content">
            ${message}
        </div>
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

        // Create HTML file with placeholder message
        const message = `Aggiungi messaggio per giorno ${day} quì`; // You can customize this for each day
        await fs.writeFile(htmlPath, createHtmlContent(day, message));
    }

    console.log('Generated QR codes and HTML pages successfully!');
}

generateCalendar().catch(console.error);