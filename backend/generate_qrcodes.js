const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data', 'works.json');
const outputDir = path.join(__dirname, 'public', 'qrcodes');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const FRONTEND_BASE = process.env.FRONTEND_BASE || 'http://localhost:3000';
const works = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

(async () => {
  for (const w of works) {
    const url = `${FRONTEND_BASE}/work/${w.id}`;
    const outPath = path.join(outputDir, `work-${w.id}.png`);
    try {
      await QRCode.toFile(outPath, url, { type: 'png', width: 300 });
      console.log('Generated', outPath, '->', url);
    } catch (err) {
      console.error('QR error for', w.id, err);
    }
  }
})();
