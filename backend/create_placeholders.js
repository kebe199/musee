const fs = require('fs');
const path = require('path');

// Créer les dossiers nécessaires
const mediaDir = path.join(__dirname, 'public', 'media');
const qrcodesDir = path.join(__dirname, 'public', 'qrcodes');

if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });
if (!fs.existsSync(qrcodesDir)) fs.mkdirSync(qrcodesDir, { recursive: true });

// Créer des fichiers placeholder pour les images
const images = [
  'masque1.jpg',
  'statue1.jpg', 
  'tissu1.jpg',
  'yoruba1.jpg',
  'touareg1.jpg'
];

const audioFiles = [
  'masque1_fr.mp3',
  'statue1_fr.mp3',
  'tissu1_fr.mp3', 
  'yoruba1_fr.mp3',
  'touareg1_fr.mp3'
];

// Créer des fichiers placeholder
images.forEach(img => {
  const filePath = path.join(mediaDir, img);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`Créé placeholder: ${img}`);
  }
});

audioFiles.forEach(audio => {
  const filePath = path.join(mediaDir, audio);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`Créé placeholder: ${audio}`);
  }
});

console.log('✅ Placeholders créés avec succès!');
console.log('📁 Dossier media:', mediaDir);
console.log('📁 Dossier qrcodes:', qrcodesDir);
